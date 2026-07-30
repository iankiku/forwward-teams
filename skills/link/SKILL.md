---
name: link
description: (forwward) Keeps every PR linked to a tracker issue — detects the project's tracker (Linear, Jira, or GitHub Issues), validates the PR body has a closing keyword, and if it's missing, creates the issue and adds the reference. Triggers on "link this PR to a ticket", "make an issue for this", "does this PR have a ticket", or before merging work that has none.
---

# Link — Every PR Traces to an Issue

No work should merge untracked. This enforces the convention — a PR links to a tracker issue via a
closing keyword — and closes the gap when one's missing by creating the issue and wiring the reference.

**North star:** every PR body carries a valid `Closes|Refs <ISSUE-KEY>` for the project's actual tracker,
and the issue exists — done with one command, not a manual hunt.

## Step 0 — Detect the tracker (never assume)

Resolve which tracker this repo uses, in order:
- The repo's PR template or contributing doc, if it states a convention.
- Config or references in the repo pointing at a Linear team, a Jira project key, or GitHub Issues.
- If genuinely ambiguous, ask once rather than guessing — creating a ticket in the wrong system is
  worse than asking.

Key formats: Linear uses a team prefix (`TEAM-123`), Jira uses a project key (`PROJ-123`), GitHub Issues
uses `#123` in the same repo or `owner/repo#123` cross-repo.

## Step 1 — Check the PR for a valid link

```bash
gh pr view <num> --json body,title,headRefName
```

Look in the body (and the branch name as a fallback) for a closing keyword + a real issue key:
`Closes|Close|Closed|Fixes|Fix|Fixed|Resolves|Resolve|Resolved|Refs|Ref <KEY>`.

- **Present and the issue exists** (verify against the tracker) → nothing to do, report it.
- **Present but the issue doesn't exist or is in the wrong project** → flag it, treat as missing.
- **Absent** → Step 2.

## Step 2 — Create the issue (when missing)

Draft from the PR, then create it in the detected tracker:
- **Title** — the PR title, tightened to an imperative.
- **Description** — a 2-3 line what/why from the PR body, plus a link back to the PR.
- **Team/project** — the repo's mapped destination; confirm rather than guess if there's more than one.
- **Status/labels** — sensible defaults only (e.g. "In Progress" since a PR already exists) — don't
  over-set fields the team doesn't use.

Capture the returned key.

## Step 3 — Wire the reference back

Add the closing keyword to the PR body so the link is bidirectional and the merge can auto-close the
issue:

```bash
gh pr edit <num> --body "<updated body with 'Closes TEAM-456' appended>"
```

Prefer `Closes`/`Fixes` when the PR fully resolves the issue (auto-closes on merge); use `Refs` when
it's partial. Confirm the tracker now shows the PR linked.

## Optional: retro sweep

To backfill a whole repo: list open PRs, run Steps 1-3 per unlinked PR. Skip drafts and already-linked
PRs.

## Anti-patterns

- Guessing the tracker instead of detecting it from the repo's own convention.
- Creating a duplicate issue when a valid one is already referenced — verify existence first.
- Inventing an issue key instead of creating a real one.
- Over-populating tracker fields; set the minimum that makes it useful.
- Using `Closes` on a PR that only partially addresses the issue (it wrongly auto-closes) — use `Refs`.
