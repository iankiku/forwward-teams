---
name: promote
description: (forwward) Safely promotes a change through environments to production — discovers the branch flow, drift-checks correctly, applies in the right order via the project's own automation, and avoids the destructive footguns. For multi-repo services (infra/platform/app), promotes in dependency order. Triggers on "promote to prod", "ship to production", "release this", "cut prod", or after a feature has merged and needs to reach production.
---

# Promote — Release Runbook

Get a merged change from the integration branch to production safely, using the project's *own*
automation (`make` targets, CI workflows, deploy scripts) — not ad-hoc CLI commands run by hand. This
codifies release discipline so a routine promotion doesn't cause an outage, a silent config revert, or
an orphaned secret.

**North star:** the right diff, applied in the right order, through the project's automation, with
production gated by human approval — zero destructive surprises.

## Step 0 — Discover the flow (never hardcode; projects differ)

Every project's promotion flow is different — always read the repo before acting:

| What to find | How | Why it varies |
|---|---|---|
| Integration branch name | Default branch + `git branch -a`; the repo's README/CLAUDE.md | Some use `dev`, others `staging` |
| Promotion mechanism | Grep the Makefile for a promote target; check `.github/workflows/` | Some do a manual PR, others script it |
| Deploy trigger | Read the deploy workflow | Push-to-branch auto-deploys; prod is usually gated by an approval step |
| Repo set + order | Which tiers exist (infra / platform / app, or just one repo) | Not every service has all three |
| Config model | Is config deployed separately from the app image, or bundled together? | If separate, config can ship with *no* deploy-gate — treat config edits as reviewed code |

Write down the discovered flow before touching anything. If the mechanism is unclear, ask once — guessing
the base branch or the order is how outages happen.

## Step 1 — Drift-check the right way (the "false diverged" trap)

A GitHub branch compare view shows a three-dot diff and will report the integration branch as "diverged"
from `main` purely because of squash-merge or promotion-bubble commits — commits that look distinct but
carry no real content delta. Do not trust that.

- **Trust the two-dot diff** for the actual content delta:
  ```bash
  git fetch --all
  git diff <integration>..main            # real file delta in main not yet promoted (and the reverse)
  git diff <integration>..main --stat     # scope at a glance
  ```
- Compare tree SHAs to confirm true equality: `git rev-parse <integration>^{tree} main^{tree}`.
- If the two-dot diff is empty, the branches are content-equal — nothing to promote, even if the compare
  UI says "N commits behind."
- If `main` has real commits not in the integration branch (hotfixes), reconcile first
  (`main → integration`) so the promotion doesn't revert them.

## Step 2 — Order across tiers: infra → platform → app

For a multi-repo/multi-tier service, promote and deploy in dependency order, finishing each before the
next:

1. **Infra** — IaC changes. New permissions, secrets, storage, or CI roles land here first. A downstream
   deploy will silently break if it needs infra it doesn't have yet.
2. **Platform** — the API/backend, plus migrations.
3. **App** — the frontend, which depends on platform endpoints and infra networking/CDN.

Within each repo: open the promotion PR (or run the project's promote target), get non-author approval,
then let the gated deploy run. Never push straight to `main`.

## Step 3 — Apply via the project's automation, not ad-hoc CLI

Use the wrappers the team built — they encode ordering and idempotency. Don't hand-run raw infra
commands (e.g. setting a cloud config value directly, or applying IaC ad hoc) "to just fix it" — that
bypasses the source of truth and causes state-vs-code drift (see Step 5).

- Provision: whatever bootstrap target the project defines. On production, it should preview and require
  confirmation — never pass an auto-approve flag to a prod bring-up.
- Config: apply config, then deploy, in that order, every time, for projects with decoupled config.
- Deploy: the project's deploy command, which should dispatch the gated CI workflow.

### Config flags
If flags live in a YAML file, indentation is often load-bearing — a wrong-indent edit can silently
no-op. After applying, probe the *deployed* value (read it back from the config store or running
service); never assume the file edit took effect.

## Step 4 — Reconcile drift after promotion

Promotion (especially squash-merge) can leave the integration branch looking "behind" main. Reconcile so
the next promotion's drift-check is clean: merge `main → integration` treating the promotion bubble as a
no-op, confirm the two-dot diff is empty, push.

## Step 5 — ⚠️ Destructive footguns — never run these as part of a routine promote

- **Force-deleting a secret** with no recovery window — if it's still required, the next restart fails
  to boot.
- **Bypassing a soft-delete/recovery window** on production resources — irreversible by design.
- **Setting cloud config values directly** instead of through committed IaC — a later apply from a clean
  clone reverts it, or the in-state-only value silently persists.
- **Applying infrastructure changes from an unmerged branch** — the next apply from `main` deletes
  whatever isn't in the merged definition (state ≠ code).
- **Deploying config with no approval gate** for decoupled-config projects — review every production
  config edit like code, and check for drift before applying.
- **Destroying or scaling a stack to zero** — full outage or data loss. Not part of any promote.
- **Force-overwriting CI secrets non-interactively** — a stale value can silently break every future
  deploy until caught.
- **Granting elevated self-bootstrap permissions without revoking them** — privilege escalation persists
  if the revoke step is skipped.
- **Seeding a secret JSON-wrapped** when the app wants the raw value — silent no-op (see `/alert`).

## Pre-promote checklist

```
[ ] Discovered: integration branch, promotion mechanism, deploy trigger, tier order, config model (Step 0)
[ ] Two-dot diff (not the compare UI) reviewed; tree-SHA equality checked; main hotfixes reconciled first
[ ] Order planned: infra → platform → app, each fully deployed before the next
[ ] Promotion via the project's automation/PR; prod gated by non-author + environment approval — never push main
[ ] Config applied before deploy; flag YAML indentation verified by probing the deployed value
[ ] No forced secret deletion, no uncommitted config changes, no apply-from-unmerged-branch
[ ] Drift check clean before any prod config/infra change
[ ] Post-promote: drift reconciled so the next promotion's diff is clean
[ ] Verified live: prod healthy, expected revision running, alerts intact
```

## Anti-patterns

- Trusting the GitHub "N commits behind / diverged" compare instead of the two-dot diff.
- Promoting app before infra and wondering why the frontend deploy 403s.
- "Just apply this real quick from my branch" — the next production apply deletes it.
- Editing production config and deploying it without a reviewed PR.
- Pushing directly to `main`, or self-approving the production promotion PR.
- Passing an auto-approve flag to a production bring-up to skip the preview.
