#!/usr/bin/env node

import { execSync } from "node:child_process";
import { createInterface } from "node:readline";

const REPO = "iankiku/forwward-teams";
const VERSION = "0.1.0";

const BANNER = `
  forwward-teams v${VERSION}
  22 skills · ~8,500 words · zero bloat

  Most agents drown in skills. Every skill you add
  inflates context, burns tokens, and degrades output.
  This is the opposite: everything you need, nothing you don't.
`;

const COMMANDS = {
  update: () => {
    console.log("\n  Updating forwward-teams skills...\n");
    run(`npx skills update`);
    console.log("\n  Done.\n");
  },
  help: () => {
    console.log(`
  Usage:
    npx @forwward/teams              Interactive install
    npx @forwward/teams --global     Install globally (all projects)
    npx @forwward/teams --project    Install to current project
    npx @forwward/teams update       Update installed skills
    npx @forwward/teams help         Show this message
`);
  },
};

function run(cmd) {
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    process.exit(1);
  }
}

function ask(question, fallback) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim() || fallback);
    });
  });
}

async function install(global) {
  const flags = global ? "-g -y" : "-y";
  console.log(
    `\n  Installing to ${global ? "~/ (global)" : "./ (project)"}...\n`
  );
  run(`npx skills add ${REPO} ${flags}`);
  console.log(`
  Installed. Next steps:

    /team-lead Build user auth with OAuth
    /build     Add Stripe checkout
    /ceo       Should we raise or bootstrap?
    /cto       Build vs buy payments?
    /strategy  Define ICP for enterprise
    /gate      Verify everything passes
    /ship      Branch, push, PR

  Docs: https://github.com/${REPO}
`);
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command && COMMANDS[command]) {
    COMMANDS[command]();
    return;
  }

  if (args.includes("--global") || args.includes("-g")) {
    console.log(BANNER);
    await install(true);
    return;
  }

  if (args.includes("--project") || args.includes("-p")) {
    console.log(BANNER);
    await install(false);
    return;
  }

  console.log(BANNER);
  const answer = await ask(
    "  Install globally or per-project? [global/project] (global): ",
    "global"
  );
  const global = answer.toLowerCase().startsWith("g");
  await install(global);
}

main();
