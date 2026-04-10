#!/usr/bin/env node

import { execSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  copyFileSync,
  chmodSync,
} from "node:fs";
import { join, dirname, isAbsolute, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { select, input, confirm } from "@inquirer/prompts";

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

// ─── Setup hooks in project settings (portable paths) ───

function setupHooks(projectRoot) {
  const copied = copyHookScripts(projectRoot);
  if (!copied) return false;

  const claudeDir = join(projectRoot, ".claude");
  const settingsPath = join(claudeDir, "settings.json");

  let settings = {};
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf8"));
    } catch {
      settings = {};
    }
  }

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
  }

  mkdirSync(claudeDir, { recursive: true });
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
  return true;
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

// ─── Configure project (hooks + gate) ───

function configureProject(projectRoot) {
  log(`Project: ${projectRoot}`);
  console.log("");

  if (setupHooks(projectRoot)) {
    ok("Hooks copied to .claude/hooks/forwward/");
    ok("Hooks registered in .claude/settings.json");
  } else {
    fail("Could not set up hooks");
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

  const flags = scope === "global" ? "-g -y" : "-y";
  if (!run(`npx skills add ${REPO} ${flags}`)) {
    fail("Skills install failed");
    process.exit(1);
  }
  ok("Skills installed");
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

// ─── Commands ───

const COMMANDS = {
  install: async () => {
    await install();
  },
  update: () => {
    log("Updating forwward-teams skills...\n");
    run(`npx skills update`);
    ok("Done.\n");
  },
  init: async () => {
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
  },
  help: () => {
    console.log(`
  Usage:
    fwd                    Interactive install
    fwd init               Set up hooks + gate for current project
    fwd install            Same as interactive install
    fwd update             Update installed skills
    fwd help               Show this message

  Flags:
    --global, -g           Install globally (all projects)
    --project, -p          Install to current project

  Also available as: forwward, forwward-teams, npx @iankiku/forwward-teams
`);
  },
};

// ─── Main ───

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command && COMMANDS[command]) {
    await COMMANDS[command]();
    return;
  }

  // --global and --project skip prompts, keep fast path
  if (args.includes("--global") || args.includes("-g")) {
    console.log(BANNER);
    log("Installing globally...\n");
    if (!run(`npx skills add ${REPO} -g -y`)) process.exit(1);
    ok("Skills installed");
    printNextSteps();
    return;
  }

  if (args.includes("--project") || args.includes("-p")) {
    console.log(BANNER);
    log("Installing to current project...\n");
    if (!run(`npx skills add ${REPO} -y`)) process.exit(1);
    ok("Skills installed");
    console.log("");
    configureProject(findProjectRoot());
    printNextSteps();
    return;
  }

  // Default: interactive install
  await install();
}

main().catch(handleCancel);
