---
name: vet
description: (forwward) Go/no-go readiness audit before promoting to production — checks for unsigned commits (which can silently block a signed-main PR), real drift between branches, green CI, and migration presence, then produces a dependency-ordered report. Read-only — it never promotes. Triggers on "are we ready to promote", "release readiness", "can we ship to prod", or before running a deploy.
---

# Vet — Promotion Readiness, Go/No-Go

Answer "is this safe to promote?" before touching a release, so the actual deploy doesn't stall on a
surprise. Read-only: it audits and returns a report — it never promotes anything.

**North star:** a clear go/no-go per repo, in deploy order, with every blocker named — especially the
ones that fail silently.

## Why this matters

The costliest promotion failures are the quiet ones. The classic one: an **unsigned commit anywhere in
the range being promoted silently blocks a signed-main PR** — the PR shows approved, green, and
mergeable, with no stated reason. This audit catches it, along with stale drift, red CI, and missing
migrations, before you're mid-release.

## Step 0 — Identify the repos and branches

If this is a multi-repo service (e.g. infra / platform / app tiers), list each repo, its integration
branch, and its production branch. For a single repo, this is just `<integration> → main`.

```bash
gh repo view --json defaultBranchRef
git branch -a
```

## Step 1 — Run the checks (per repo)

- **Signed commits** — list the commits between the integration branch and main
  (`git rev-list main..integration`), then confirm each has a valid signature
  (`git cat-file commit <sha> | grep -q gpgsig`). Avoid signature-verification flags that hang on
  SSH allowed-signers configs (e.g. `--show-signature`, `%G?` in `git log`) — use the raw commit-object
  check above instead.
- **Real delta** — `git diff integration..main --stat` (two-dot). The GitHub compare UI's "diverged" or
  "N commits behind" is a false signal after squash-merges; trust the two-dot diff, not the UI.
- **Main ahead** — `git log integration..main --oneline` — hotfixes on main that need reconciling into
  the integration branch before promoting, or they'll be reverted by the next promotion.
- **CI** — is the latest run on the integration branch green? (`gh run list --branch <integration>`)
- **Migrations** — does the delta include new migration files? Flag for a rollout-plan check.

## Step 2 — Report the go/no-go

Present the report in deploy order (infra → platform → app, or your project's equivalent). For each
NO-GO, give the concrete next step:

| Blocker | Fix before promoting |
|---|---|
| Unsigned commits in range | Rebuild a clean signed branch off main carrying the integration tree, or re-sign the offending commits |
| Main ahead (hotfixes) | Reconcile main → integration first, re-check |
| Red CI | Fix the failing check — never promote anyway |
| No real delta | Nothing to promote — stop, ignore the UI's "N behind" |
| New migrations | Confirm reversible + a rollout plan before shipping |

## Step 3 — Hand off

If all repos are go, proceed with the deploy (which should re-verify as it goes). If any is a no-go,
resolve the blocker, re-run this check, and only then promote. This skill never promotes on its own.

## Anti-patterns

- Trusting the GitHub compare "diverged / N behind" instead of the two-dot diff.
- Using signature-verification flags that hang on SSH allowed-signers configs.
- Treating an approved + green + mergeable-but-blocked PR as a mystery — it's almost always an
  unsigned commit somewhere in the range.
- Promoting a downstream tier before its dependency, or promoting with hotfixes stranded on main.
