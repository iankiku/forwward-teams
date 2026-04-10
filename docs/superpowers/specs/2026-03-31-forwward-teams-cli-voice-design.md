# forwward-teams: CLI Restructure + Voice Directory

**Date:** 2026-03-31
**Status:** Approved

---

## Problem

When users run `npx skills add iankiku/forwward-teams`, they receive the entire package — hooks, shell scripts, bin, plugin config — not just the skills. The package also lacks a structured way for users to bring their own voice guidelines into content-writing skills.

## Goals

1. `npx skills add iankiku/forwward-teams` installs **only** skill files
2. `npx forwward-teams` is a standalone setup CLI that configures hooks, scripts, and voice scaffolding
3. Content skills (`write`, `gtm`, `pcp-engine`, `sales`) pull from a shared `voice/` directory the user owns

---

## Architecture

### Package Structure (published to npm)

```
@forwward/teams
├── skills/            ← SKILL.md files only — what npx skills copies
├── bin/
│   └── cli.mjs        ← npx forwward-teams entrypoint
├── .claude-plugin/
│   └── plugin.json
├── marketplace.json
└── package.json
```

**Not published** (stays in repo, not in `files[]`):
- `hooks/` — embedded as template strings in `bin/cli.mjs`
- `scripts/` — embedded as template strings in `bin/cli.mjs`
- `assets/`

### package.json `files[]`

```json
"files": [
  "skills/",
  "bin/",
  ".claude-plugin/",
  "marketplace.json"
]
```

---

## CLI (`npx forwward-teams`)

### Commands

| Command | Description |
|---------|-------------|
| `npx forwward-teams` | Interactive setup wizard |
| `npx forwward-teams update` | Re-runs `npx skills update` |
| `npx forwward-teams help` | Usage info |

### Setup Wizard Flow

```
1. Banner + version
2. Install scope?          [global / project]
3. Install skills          → npx skills add iankiku/forwward-teams (-g or -y)
4. Install hooks?          [yes / no]
   → writes hooks.json to ~/.claude/settings.json (global)
     or .claude/settings.json (project)
5. Scaffold voice/?        [yes / no]
   → creates voice/default.md, voice/twitter.md,
     voice/blog.md, voice/newsletter.md, voice/linkedin.md
6. Done                    → prints quick-start command list
```

### Hooks Embedding

`hooks.json` and shell scripts (`task-gate.sh`, `validate-command.sh`) are stored as template strings inside `bin/cli.mjs`. They are written to disk **only** when the user explicitly opts in during setup. Nothing is installed unless the user says yes.

---

## Voice Directory

### Structure (scaffolded by setup wizard)

```
voice/
├── default.md       ← fallback for any unmatched platform
├── twitter.md
├── blog.md
├── newsletter.md
└── linkedin.md
```

### Template Format (all files identical structure, blank content)

```markdown
# Voice — [Platform]

## Tone
<!-- How you sound: direct, warm, irreverent, etc. -->

## What I always do
<!-- Patterns you repeat: short sentences, hooks, specifics -->

## What I never do
<!-- Things that feel wrong: jargon, hedging, corporate speak -->

## Examples
<!-- Paste 2-3 real posts you liked writing -->
```

### Skill Integration

Skills that produce platform content (`write`, `gtm`, `pcp-engine`, `sales`) include this instruction in their body:

> Before writing, check for a `voice/` directory in the project root. If `voice/<platform>.md` exists, load it. Fall back to `voice/default.md`. Apply the user's voice rules before any output.

Frontmatter declares intent for discoverability:

```yaml
---
name: write
description: ...
voice: ./voice
platforms: [twitter, blog, newsletter, linkedin]
---
```

---

## Install Flow (end-to-end)

```
# Step 1 — get skills only
npx skills add iankiku/forwward-teams

# Step 2 — run setup (hooks + voice scaffolding)
npx forwward-teams
```

Skills work immediately after step 1. Step 2 is optional but recommended for full configuration.

---

## Out of Scope

- No changes to individual skill content beyond adding voice lookup instructions
- No changes to `.claude-plugin/plugin.json` structure
- No GitHub Packages publishing (npm only for now)
