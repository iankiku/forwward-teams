#!/usr/bin/env node

import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  chmodSync,
  cpSync,
  realpathSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, dirname, isAbsolute, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { select, input, confirm, checkbox } from "@inquirer/prompts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PLUGIN_ROOT = join(__dirname, "..");
const REPO = "iankiku/forwward-teams";
const VERSION = "0.2.0";

const BANNER = `
  forwward-teams v${VERSION}
  lean skills · zero bloat
`;

// ─── Helpers ───

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { stdio: "inherit", ...opts });
    return true;
  } catch {
    return false;
  }
}

function runQuiet(cmd, opts = {}) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      ...opts,
    }).trim();
  } catch {
    return null;
  }
}

function log(msg) { console.log(`  ${msg}`); }
function ok(msg) { console.log(`  ✓ ${msg}`); }
function skip(msg) { console.log(`  - ${msg}`); }
function warn(msg) { console.log(`  ! ${msg}`); }
function fail(msg) { console.log(`  ✗ ${msg}`); }

// Catch Ctrl+C / ESC from inquirer prompts gracefully
function handleCancel(err) {
  if (err?.name === "ExitPromptError") {
    console.log("\n  Cancelled.\n");
    process.exit(0);
  }
  throw err;
}

// ─── Find project root ───

function findProjectRoot() {
  const git = runQuiet("git rev-parse --show-toplevel");
  if (git && existsSync(git)) return git;
  if (existsSync(join(process.cwd(), "package.json"))) return process.cwd();
  if (existsSync(join(process.cwd(), "pyproject.toml"))) return process.cwd();
  return process.cwd();
}

// ─── Platform definitions ───
//
// Each platform describes where its config lives, how to detect it, and
// where forwward skills should be installed. Only platforms the user
// explicitly selects get written to — no bloat from auto-installing to 33
// agent systems the user doesn't use.

const PLATFORMS = [
  {
    value: "claude-code",
    name: "Claude Code (recommended)",
    description: "Native skill support via .claude/skills/forwward/",
    detect: (cwd) =>
      existsSync(join(cwd, ".claude")) ||
      existsSync(join(homedir(), ".claude")),
    destDir: (cwd, scope) =>
      scope === "global"
        ? join(homedir(), ".claude", "skills", "forwward")
        : join(cwd, ".claude", "skills", "forwward"),
  },
  {
    value: "cursor",
    name: "Cursor",
    description: "Rules in .cursor/rules/forwward/",
    detect: (cwd) => existsSync(join(cwd, ".cursor")),
    destDir: (cwd) => join(cwd, ".cursor", "rules", "forwward"),
  },
  {
    value: "windsurf",
    name: "Windsurf",
    description: "Rules in .windsurf/rules/forwward/",
    detect: (cwd) =>
      existsSync(join(cwd, ".windsurf")) ||
      existsSync(join(cwd, ".windsurfrules")),
    destDir: (cwd) => join(cwd, ".windsurf", "rules", "forwward"),
  },
  {
    value: "codex",
    name: "OpenAI Codex",
    description: "Skills in .codex/skills/forwward/",
    detect: (cwd) =>
      existsSync(join(cwd, ".codex")) ||
      existsSync(join(homedir(), ".codex")),
    destDir: (cwd, scope) =>
      scope === "global"
        ? join(homedir(), ".codex", "skills", "forwward")
        : join(cwd, ".codex", "skills", "forwward"),
  },
  {
    value: "gemini",
    name: "Gemini CLI",
    description: "Skills in .gemini/skills/forwward/",
    detect: (cwd) =>
      existsSync(join(cwd, ".gemini")) || existsSync(join(cwd, "GEMINI.md")),
    destDir: (cwd) => join(cwd, ".gemini", "skills", "forwward"),
  },
  {
    value: "agents",
    name: "Universal AGENTS.md",
    description:
      "Works with Amp, Factory, Aider, and any AGENTS.md-compatible tool",
    detect: (cwd) => existsSync(join(cwd, "AGENTS.md")),
    destDir: (cwd) => join(cwd, ".agents", "skills", "forwward"),
  },
];

// Walk up `dest` to find the first ancestor that exists, then realpath it.
// Returns true if that resolved path equals or is inside the source directory.
// This catches the case where `.claude/skills` is a symlink back to the
// source, which would otherwise create a self-copy via mkdirSync + cpSync.
function destResolvesIntoSource(dest, src) {
  try {
    const realSrc = realpathSync(src);
    let current = dest;
    // Walk up to find an existing path (dest itself may not exist yet)
    while (!existsSync(current)) {
      const parent = dirname(current);
      if (parent === current) return false;
      current = parent;
    }
    const realCurrent = realpathSync(current);
    return realCurrent === realSrc || realCurrent.startsWith(realSrc + sep);
  } catch {
    return false;
  }
}

async function chooseAndInstallSkills(projectRoot, scope) {
  const srcSkillsDir = join(PLUGIN_ROOT, "skills");
  if (!existsSync(srcSkillsDir)) {
    fail(`Skills directory not found at ${srcSkillsDir}`);
    return [];
  }

  // Pre-check platforms the user already has configured
  const detectedValues = new Set(
    PLATFORMS.filter((p) => p.detect(projectRoot)).map((p) => p.value)
  );

  const selected = await checkbox({
    message: "Which AI agents should receive the forwward skills?",
    instructions:
      " (space to toggle, a to toggle all, enter to confirm)",
    choices: PLATFORMS.map((p) => ({
      name: p.name,
      value: p.value,
      description: p.description,
      checked: detectedValues.has(p.value),
    })),
    validate: (values) =>
      values.length > 0 || "Pick at least one platform (or Ctrl+C to cancel)",
  });

  const installed = [];
  for (const value of selected) {
    const platform = PLATFORMS.find((p) => p.value === value);
    const dest = platform.destDir(projectRoot, scope);

    // Detect symlink loops: if dest (or its first existing ancestor)
    // resolves into the source skills directory, we'd be copying the
    // source into itself. This happens when a dev has .claude/skills
    // symlinked back to the repo's skills/ directory.
    if (destResolvesIntoSource(dest, srcSkillsDir)) {
      warn(
        `${platform.name}: skipping — destination resolves into source via symlink`
      );
      warn(`  ${dest}`);
      warn(`  → ${realpathSync(dirname(dest))}`);
      continue;
    }

    try {
      mkdirSync(dest, { recursive: true });
      cpSync(srcSkillsDir, dest, { recursive: true, force: true });
      ok(`${platform.name}: ${dest}`);
      installed.push({ platform: platform.value, dest });
    } catch (err) {
      fail(`${platform.name}: ${err.message}`);
    }
  }

  return installed;
}

// ─── Copy hook scripts into project ───

function copyHookScripts(projectRoot) {
  const srcDir = join(PLUGIN_ROOT, "hooks");
  const destDir = join(projectRoot, ".claude", "hooks", "forwward");

  if (!existsSync(srcDir)) return null;

  mkdirSync(destDir, { recursive: true });

  const scripts = ["task-gate.sh", "validate-command.sh"];
  const copied = [];

  for (const script of scripts) {
    const src = join(srcDir, script);
    if (existsSync(src)) {
      const dest = join(destDir, script);
      copyFileSync(src, dest);
      chmodSync(dest, 0o755);
      copied.push(script);
    }
  }

  return copied.length > 0 ? destDir : null;
}

// ─── Setup project settings (merges — never replaces) ───

function setupSettings(projectRoot) {
  const copied = copyHookScripts(projectRoot);
  if (!copied) return { ok: false };

  const claudeDir = join(projectRoot, ".claude");
  const settingsPath = join(claudeDir, "settings.json");

  // Read existing settings (if any) — preserve everything we don't touch
  let settings = {};
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf8"));
    } catch {
      settings = {};
    }
  }

  const summary = { hooks: [], env: [], teammateMode: null };

  // ─── Hooks (merge, skip if already present) ───

  if (!settings.hooks) settings.hooks = {};

  const taskGatePath = "$CLAUDE_PROJECT_DIR/.claude/hooks/forwward/task-gate.sh";
  const validatePath = "$CLAUDE_PROJECT_DIR/.claude/hooks/forwward/validate-command.sh";

  if (!settings.hooks.PostToolUse) settings.hooks.PostToolUse = [];
  const hasLintHook = settings.hooks.PostToolUse.some((h) =>
    h.hooks?.some((hh) => hh.command?.includes("forwward/task-gate"))
  );
  if (!hasLintHook) {
    settings.hooks.PostToolUse.push({
      matcher: "Write|Edit",
      hooks: [{ type: "command", command: taskGatePath, async: true }],
    });
    summary.hooks.push("PostToolUse (task-gate)");
  }

  if (!settings.hooks.PreToolUse) settings.hooks.PreToolUse = [];
  const hasGuardHook = settings.hooks.PreToolUse.some((h) =>
    h.hooks?.some((hh) => hh.command?.includes("forwward/validate-command"))
  );
  if (!hasGuardHook) {
    settings.hooks.PreToolUse.push({
      matcher: "Bash",
      hooks: [{ type: "command", command: validatePath }],
    });
    summary.hooks.push("PreToolUse (validate-command)");
  }

  // ─── Teams env vars (merge into existing env — don't overwrite others) ───

  if (!settings.env) settings.env = {};
  const teamsEnv = {
    CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS: "1",
  };
  for (const [key, value] of Object.entries(teamsEnv)) {
    if (settings.env[key] !== value) {
      settings.env[key] = value;
      summary.env.push(key);
    }
  }

  // ─── Teammate mode (only set if user hasn't picked one) ───

  if (!settings.teammateMode) {
    settings.teammateMode = "tmux";
    summary.teammateMode = "tmux";
  }

  mkdirSync(claudeDir, { recursive: true });
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
  return { ok: true, summary };
}

// ─── Run project detection and return parsed config ───

function setupGate(projectRoot) {
  const cliPath = join(PLUGIN_ROOT, "scripts", "cli");
  if (!existsSync(cliPath)) return null;

  try {
    execSync(`bash "${cliPath}" init`, {
      cwd: projectRoot,
      stdio: ["ignore", "ignore", "ignore"],
      env: { ...process.env, CLAUDE_PLUGIN_ROOT: PLUGIN_ROOT },
    });
  } catch {
    return null;
  }

  const configPath = join(projectRoot, ".claude", "project.json");
  if (!existsSync(configPath)) return null;

  try {
    return JSON.parse(readFileSync(configPath, "utf8"));
  } catch {
    return null;
  }
}

// ─── Configure project (settings + gate) ───

function configureProject(projectRoot) {
  log(`Project: ${projectRoot}`);
  console.log("");

  const result = setupSettings(projectRoot);
  if (!result.ok) {
    fail("Could not set up hooks");
  } else {
    const { summary } = result;

    // Hooks
    if (summary.hooks.length > 0) {
      ok("Hooks copied to .claude/hooks/forwward/");
      ok(`Hooks added: ${summary.hooks.join(", ")}`);
    } else {
      skip("Hooks already registered (no changes)");
    }

    // Env
    if (summary.env.length > 0) {
      ok(`Teams enabled: ${summary.env.join(", ")}`);
    } else {
      skip("Teams env vars already set (no changes)");
    }

    // Teammate mode
    if (summary.teammateMode) {
      ok(`teammateMode set to "${summary.teammateMode}"`);
    } else {
      skip("teammateMode already configured (preserved)");
    }
  }

  const config = setupGate(projectRoot);
  if (!config) {
    skip("Could not detect project — gate not configured");
    return;
  }

  const cmds = config.commands || {};
  const cmdCount = Object.keys(cmds).length;

  if (cmdCount === 0) {
    warn("No build/test commands detected");
    warn("Add scripts to package.json (lint, test, build) then run `fwd init` again");
    return;
  }

  ok(`Gate configured (${cmdCount} commands: ${Object.keys(cmds).join(", ")})`);
}

// ─── Resolve target path with validation ───

async function resolveTargetPath(detected) {
  const choice = await select({
    message: "Where to install forwward?",
    default: "detected",
    choices: [
      {
        name: `Current project (${detected})`,
        value: "detected",
        description: "Detected from git or package.json",
      },
      {
        name: "Different path",
        value: "custom",
        description: "Pick another directory",
      },
      {
        name: "Cancel",
        value: "cancel",
      },
    ],
  });

  if (choice === "cancel") return null;
  if (choice === "detected") return detected;

  const customPath = await input({
    message: "Path to install into:",
    default: detected,
    validate: (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Path is required";
      const abs = isAbsolute(trimmed) ? trimmed : resolve(process.cwd(), trimmed);
      if (!existsSync(abs)) return `Does not exist: ${abs}`;
      return true;
    },
  });

  return isAbsolute(customPath)
    ? customPath
    : resolve(process.cwd(), customPath);
}

// ─── Install flow (skills + per-project setup) ───

async function install() {
  console.log(BANNER);

  const scope = await select({
    message: "Install scope?",
    default: "global",
    choices: [
      {
        name: "Global (all projects)",
        value: "global",
        description: "Install skills to ~/ — available everywhere",
      },
      {
        name: "This project only",
        value: "project",
        description: "Install skills to current project's node_modules",
      },
    ],
  });

  log(`\nInstalling skills (${scope})...\n`);

  const detectedRoot = findProjectRoot();
  const targetRoot = scope === "global" ? homedir() : detectedRoot;
  const installed = await chooseAndInstallSkills(targetRoot, scope);

  if (installed.length === 0) {
    warn("No skills installed. Run `fwd install` later to retry.\n");
    return;
  }
  ok(`Skills installed to ${installed.length} platform(s)`);
  console.log("");

  const detected = findProjectRoot();
  const setupHooksNow = await confirm({
    message: `Set up hooks and gate in ${detected}?`,
    default: true,
  });

  if (!setupHooksNow) {
    log("\nSkills installed. Run `fwd init` later to set up hooks per project.");
    return;
  }

  console.log("");
  configureProject(detected);
  printNextSteps();
}

function printNextSteps() {
  console.log(`
  ─────────────────────────────────────
  Setup complete. Try these:

    /start       Get oriented, pick your first skill
    /build       Ship a feature
    /gate        Verify lint + types + build + tests
    /strategy    Define your ICP and positioning
    /write       Draft a blog post or thread

  Docs: https://github.com/${REPO}
  ─────────────────────────────────────
`);
}

// ─── Top-level commands ───

async function cmdInit(args) {
  console.log(BANNER);
  const detected = findProjectRoot();
  const target = await resolveTargetPath(detected);
  if (!target) {
    log("Cancelled.\n");
    return;
  }
  console.log("");
  configureProject(target);
  printNextSteps();
}

function cmdHelp() {
  console.log(`
  forwward-teams v${VERSION} — lean skills · zero bloat

  USAGE
    fwd <command> [args]

  PROJECT SETUP
    fwd init                    Set up hooks, gate, and settings for current project

  SKILLS
    fwd skills install          Install forwward skills (interactive scope + platform select)
    fwd skills install -g       Install globally (~/), still asks for platforms
    fwd skills install -p       Install to current project, still asks for platforms
    fwd skills update           Update installed skills
    fwd skills help             Show skills subcommand help

  OTHER
    fwd help                    Show this message

  GETTING STARTED
    fwd skills install          Pick the agents to install skills to
    fwd init                    Set up hooks/gate for the current project

  ALIASES
    Also available as: forwward, forwward-teams, npx @iankiku/forwward-teams
`);
}

// ─── Skills namespace ───

async function cmdSkillsInstall(args) {
  console.log(BANNER);

  // Determine scope from flags or ask
  let scope;
  if (args.includes("--global") || args.includes("-g")) {
    scope = "global";
    log("Installing globally...\n");
  } else if (args.includes("--project") || args.includes("-p")) {
    scope = "project";
    log("Installing to current project...\n");
  } else {
    scope = await select({
      message: "Install scope?",
      default: "global",
      choices: [
        {
          name: "Global (all projects)",
          value: "global",
          description: "Install skills to ~/ — available everywhere",
        },
        {
          name: "This project only",
          value: "project",
          description: "Install skills to current project",
        },
      ],
    });
  }

  const targetRoot = scope === "global" ? homedir() : findProjectRoot();
  const installed = await chooseAndInstallSkills(targetRoot, scope);

  if (installed.length === 0) {
    warn("No skills installed.\n");
    return;
  }
  console.log("");
  ok(`Skills installed to ${installed.length} platform(s)`);

  // Offer to also set up hooks/gate for the project
  if (scope === "project") {
    console.log("");
    const setupHooks = await confirm({
      message: "Also set up hooks and gate for this project? (fwd init)",
      default: true,
    });
    if (setupHooks) {
      console.log("");
      configureProject(targetRoot);
    }
  }

  printNextSteps();
}

function cmdSkillsUpdate() {
  log("Updating forwward-teams skills...\n");
  log(
    "To update skills, re-run: fwd skills install (it will overwrite existing copies)"
  );
  log("Or: cd to forwward-teams repo and `git pull && fwd skills install`\n");
}

function cmdSkillsHelp() {
  console.log(`
  forwward-teams skills — manage forwward skills

  USAGE
    fwd skills <command> [flags]

  COMMANDS
    install              Install skills (interactive scope + platform select)
    update               Update installed skills
    help                 Show this message

  FLAGS (for install)
    --global, -g         Install globally to ~/  (skip scope prompt)
    --project, -p        Install to current project (skip scope prompt)

  EXAMPLES
    fwd skills install                    # Asks scope, then platforms
    fwd skills install -g                 # Global, still asks platforms
    fwd skills install -p                 # Project, still asks platforms
`);
}

// ─── Command dispatch ───

const TOP_LEVEL = {
  help: cmdHelp,
  init: cmdInit,
};

const NAMESPACES = {
  skills: {
    description: "Manage forwward skills",
    commands: {
      install: cmdSkillsInstall,
      update: cmdSkillsUpdate,
      help: cmdSkillsHelp,
    },
    helpFn: cmdSkillsHelp,
  },
};

// ─── Main ───

async function main() {
  const args = process.argv.slice(2);
  const first = args[0];

  // No args → show help
  if (!first) {
    cmdHelp();
    return;
  }

  // Top-level command (init, help)
  if (TOP_LEVEL[first]) {
    await TOP_LEVEL[first](args.slice(1));
    return;
  }

  // Namespaced command (skills <action>, agent <action>, ...)
  if (NAMESPACES[first]) {
    const ns = NAMESPACES[first];
    const subcommand = args[1];

    if (!subcommand || subcommand === "help" || subcommand === "--help") {
      ns.helpFn();
      return;
    }

    if (ns.commands[subcommand]) {
      await ns.commands[subcommand](args.slice(2));
      return;
    }

    fail(`Unknown command: ${first} ${subcommand}`);
    console.log("");
    ns.helpFn();
    process.exit(1);
  }

  fail(`Unknown command: ${first}`);
  console.log("");
  cmdHelp();
  process.exit(1);
}

main().catch(handleCancel);
