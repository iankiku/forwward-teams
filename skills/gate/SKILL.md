---
name: gate
description: (forwward) Runs lint, typecheck, build, and test in a self-healing loop that reads errors, fixes them, and retries up to 4 times. Triggers on verify, check, make sure it works, pre-commit validation, pre-deploy checks, or any quality gate.
---

# Gate — Self-Healing Verification

Run checks, read errors, fix them, repeat. Prove code WORKS by executing it.

## Anti-Shortcut Rules

1. **NEVER declare PASS from reading source.** Execute and observe output.
2. **NEVER declare PASS without command output.** "It should work" is not evidence.
3. **If a check can't execute, report BLOCKED** — never fake PASS.

## Step 0: Detect the Stack and Get Commands

Read `.claude/project.json` for build commands if it exists. If not, detect the stack and infer the right commands:

| Stack marker | Lint | Typecheck | Build | Test |
|---|---|---|---|---|
| `package.json` | `npm run lint` | `npm run typecheck` / `tsc --noEmit` | `npm run build` | `npm test` |
| `go.mod` | `golangci-lint run` | *(types checked at build)* | `go build ./...` | `go test ./...` |
| `pyproject.toml` / `requirements.txt` | `ruff check .` / `flake8` | `mypy .` | *(no compile step)* | `pytest` |
| `Gemfile` | `rubocop` | *(Sorbet if present)* | `bundle exec rake assets:precompile` | `bundle exec rspec` |
| `pom.xml` | `mvn checkstyle:check` | *(compiled)* | `mvn package` | `mvn test` |
| `Cargo.toml` | `cargo clippy` | *(compiled)* | `cargo build` | `cargo test` |

Also check `Makefile` — many projects centralize all commands there (`make lint`, `make test`, `make build`).

Or init from the plugin CLI if available:

```bash
${CLAUDE_PLUGIN_ROOT}/scripts/cli init
```

## Optional: Audit pass

Before running the loop, gate can invoke `/audit` to clean the branch first:

```
/audit          # de-slop + DRY + dead code on changed files only
```

Run audit when: the user says "clean before shipping", the diff is large and messy, or this is a pre-release gate. Skip audit for hotfixes and small patches — the loop is enough.

Audit scope when invoked from gate: files changed on this branch only (`git diff main...HEAD`). Full-codebase audit is a separate invocation.

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
