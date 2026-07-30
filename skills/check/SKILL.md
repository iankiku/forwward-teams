---
name: check
description: (forwward) Scans how a project is set up and reports what's missing before work starts — is there a .env, is every .env.example key set, and are localhost / staging / prod each wired? Triggers on "check my setup", "is this project ready to run", "am I ready to run this", onboarding to a codebase, or before /gate on a fresh clone.
---

# Check — Is This Project Ready to Run?

One pass tells you whether a repo is actually set up to run, and exactly what's missing if not. The
deliverable is a ✓/✗ checklist across **localhost / staging / prod**, built by *discovering* the
project's own expected setup — never by reciting generic advice.

**North star:** no one should discover a missing `.env` key or an unwired environment by hitting a
runtime error — this surfaces it up front, with the fix.

## Step 0 — Discover what SHOULD exist (never hardcode)

1. **Env contract** — `.env.example` (or `env.example`): the list of vars the app expects. This is the
   source of truth for "what must be set."
2. **Environments doc** — the repo's README/CLAUDE.md should describe how localhost, staging, and prod
   are each configured (compose file, secret manager, deploy target). Missing this is itself a ✗.
3. **Run path** — `make help` / `grep -E '^[a-z-]+:.*##' Makefile`, `docker-compose*.yml`, or
   `package.json` scripts: the real targets to set up and run locally.
4. **Cloud auth** — does the local stack need an SSO/CLI login before it can start (AWS/GCP/Azure profile)?

## Step 1 — Localhost readiness

Report ✓/✗ for each:

- [ ] **`.env` exists** and is gitignored. ✗ → run the project's env-bootstrap target, or copy
      `.env.example` to `.env`.
- [ ] **Every `.env.example` key is present in `.env`** and non-empty. Diff the key sets — don't eyeball:
  ```bash
  comm -23 <(grep -oE '^[A-Z][A-Z0-9_]+' .env.example | sort -u) \
           <(grep -oE '^[A-Z][A-Z0-9_]+' .env 2>/dev/null | sort -u)
  ```
  Any line printed is a missing key (✗).
- [ ] **No placeholder values** left where a real one is needed (`changeme`, `xxx`, `TODO`).
- [ ] **Local stack present** — the run target exists and its deps are installed (Docker running?
      `node_modules` / venv present?).
- [ ] **Cloud auth active** if the local stack calls real cloud services.

## Step 2 — Staging + prod wiring

For each non-local environment, confirm it's actually wired (don't assume parity with localhost):

- [ ] Every var the app reads has a value in **that environment's** config source — not just localhost.
      A var set locally but unset in staging/prod is a latent outage.
- [ ] Env-specific values (URLs, account IDs, buckets) are configured per environment, not hardcoded.
- [ ] Secrets exist in the secret store in the format the app expects, with a non-empty placeholder so
      an unset secret can't crash boot.
- [ ] The deploy/promotion path is documented and the running service references the current config.

This is a *static* check of the contract — it reads config sources, it does not deploy.

## Step 3 — Report

Emit a compact checklist grouped by environment, ✓/✗ each, and for every ✗ the one command or edit that
fixes it. End with a one-line verdict: **ready to run locally? What blocks it?** If there's no
environments doc, recommend adding one — it's what makes this check repeatable next time.

## Anti-patterns

- Assuming staging/prod parity from a green localhost — the unset-in-prod var is the classic outage.
- Eyeballing `.env` vs `.env.example` instead of diffing the key sets.
- Treating an undocumented environment setup as "nothing to check" — it means the contract is unwritten.
- Printing secret *values* in the report. Report key names and presence, never the value.
