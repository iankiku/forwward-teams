---
name: prlist
description: (forwward) Lists every open PR and who it's on — a plain terminal table (PR#, title, author, assignee, review-requested, status, age), with a "just mine" view of what's assigned to or waiting on you. Read-only. Triggers on "show me the open PRs", "what PRs are assigned to me", "what's waiting on my review", or wanting a quick at-a-glance board without opening GitHub.
---

# PR List — Open PRs at a Glance

One glance in the terminal shows every open PR and who it's on — no tab switching, no GitHub UI. This
skill only reads and prints; to review or act on them, pair it with `/review`.

## Step 0 — Discover scope (don't hardcode)

- **Repo vs org.** Default to the current repo — `gh` infers it from the remote. For an org-wide view,
  discover the owner from the remote, never hardcode an org name:
  `owner=$(gh repo view --json owner -q .owner.login)`.
- **Who "me" is.** `gh` resolves `@me` to the authenticated user — no need to ask their handle.
- Requires `gh` authenticated (`gh auth status`). If it isn't, say so and stop.

## Step 1 — Pull the data

Everyone's open PRs in the current repo:

```bash
gh pr list --state open \
  --json number,title,author,assignees,reviewRequests,isDraft,updatedAt \
  --limit 100
```

Just what's on **me** — assigned to me, my review requested, or authored by me — across the whole org:

```bash
owner=$(gh repo view --json owner -q .owner.login 2>/dev/null)
gh search prs --state open --owner "$owner" --review-requested @me --json number,title,repository,author,updatedAt
gh search prs --state open --owner "$owner" --assignee        @me --json number,title,repository,author,updatedAt
gh search prs --state open --owner "$owner" --author          @me --json number,title,repository,author,updatedAt
```

## Step 2 — Print a clean table

Render a compact, aligned table. Keep titles to ~50 chars, show age from `updatedAt`, flag drafts.
Columns: **PR · Title · Author · Assignee · Review → · Age · State**.

If a `gh --template` gets fussy, prefer clarity over cleverness: pull the `--json`, then format rows
yourself (a short script or `jq` pass) into the same columns. A readable table beats a broken template.

- **`mine` view** — group by three buckets, each with a header: `Awaiting my review`, `Assigned to me`,
  `My open PRs`. Print `(none)` under an empty bucket — silence reads as broken.
- End with a one-line tally: `N open · M awaiting your review · K yours`.

## Step 3 — Offer the next step, don't take it

This is a viewer. After printing, offer — don't auto-run — the follow-ups: `/review` on a specific PR,
or `gh pr view <n> --web` to open one in the browser.

## Anti-patterns

- Hardcoding the org or repo — discover both from `gh` / the remote.
- Mutating anything. No comments, labels, assignments, or merges from this skill.
- Hiding empty buckets — an empty bucket prints `(none)`; a hidden one looks like a bug.
- Paging past the first 100 without asking — a wall of stale PRs isn't "at a glance." Note if truncated.
