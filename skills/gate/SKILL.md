---
name: gate
description: Use when verifying code works — after feature work, before committing, before deploy, or any request to "verify", "check", or "make sure it works"
---

# Gate — Self-Healing Verification

Run checks, read errors, fix them, repeat. Prove code WORKS by executing it.

## Anti-Shortcut Rules

1. **NEVER declare PASS from reading source.** Execute and observe output.
2. **NEVER declare PASS without command output.** "It should work" is not evidence.
3. **If a check can't execute, report BLOCKED** — never fake PASS.

## Step 0: Get Commands

Read `.claude/project.json` for build commands. If missing:

```bash
.claude/scripts/cli init
```

Or run checks directly via CLI:

```bash
.claude/scripts/cli gate        # lint + typecheck + build + test
.claude/scripts/cli gatekeep -g  # same, with PASS/FAIL report
.claude/scripts/cli gatekeep -l  # lint only
.claude/scripts/cli gatekeep -t  # test only
```

## The Loop

Run up to 4 iterations:

1. Execute: **lint → typecheck → build → test**
2. All pass? → **GATE PASSED** — stop.
3. Any fail? → Read full error, fix it, run again.

## Fix Rules

| Error Type | Fix | Don't |
|-----------|-----|-------|
| Type errors | Fix the type, add the import | Use `@ts-ignore` |
| Build errors | Fix imports, exports, modules | Skip the check |
| Lint errors | Fix the actual issue | Blanket `disable` |
| Test failures | Fix the code or the test | Delete the test |

**NEVER change business logic** during gate. Only fix types, imports, lint.

## Circuit Breaker

After 4 iterations without full pass:
1. Report which checks still fail with last error output
2. Do NOT fake a PASS
3. Inform user or team lead

## CLI Reference

| Flag | What |
|------|------|
| `-l` | Lint only |
| `-c` | Typecheck only |
| `-b` | Build only |
| `-t` | Tests only |
| `-a` | App startup (dev server + health check) |
| `-u` | UI tests (Playwright/Cypress) |
| `-g` | Full gate: lint + typecheck + build + test |
| `--all` | Everything including app + UI |
