---
name: ship
description: Use when ready to release — syncing branches, running final checks, pushing code, opening PRs, or automating any part of the release workflow
---

# Ship — Release Automation

Get code from "done on my branch" to "merged and deployed" safely.

## Pre-Ship Checklist

Before shipping, verify:

1. **Gate passes** — Run `/gate` (lint, types, build, tests all green)
2. **Branch is current** — Rebased on latest main
3. **No leftover debug code** — `console.log`, `debugger`, `TODO REMOVE`
4. **Env vars documented** — Any new secrets added to `.env.example`
5. **Migration tested** — DB changes apply cleanly on fresh + existing data

## Ship Flow

### 1. Sync with main

```bash
git fetch origin
git rebase origin/main
```

If conflicts: resolve, run `/gate` again.

### 2. Final verification

```bash
.claude/scripts/cli gate
```

All checks must pass. No exceptions.

### 3. Push

```bash
git push origin HEAD
```

### 4. Open PR

```bash
gh pr create \
  --title "Short descriptive title" \
  --body "## What
Brief description of changes.

## Why
Problem this solves.

## Testing
How this was verified."
```

### 5. Post-merge

After PR is merged:
```bash
git checkout main
git pull origin main
git branch -d feature-branch
```

## PR Best Practices

- **Title**: imperative mood, under 70 chars ("Add user auth", not "Added user authentication system")
- **Body**: What changed, why, how to test
- **Size**: Under 400 lines. Split larger work into stacked PRs.
- **Screenshots**: Include for any UI change

## Hotfix Flow

For urgent production fixes:

1. Branch from `main` (not your feature branch)
2. Minimal fix — no refactoring, no "while I'm here" changes
3. Run `/gate`
4. PR with `hotfix:` prefix
5. Request expedited review

## Rules

- Never force push to main
- Never skip `/gate` because "it's a small change"
- Never merge your own PR without at least one review (unless solo)
- Tag the PR with relevant labels if your repo uses them
