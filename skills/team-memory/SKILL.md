---
name: team-memory
description: (forwward) Consolidates recent team work — commits, PRs, decisions, bug fixes, learnings — into a shared `team-memory/MEMORY.md` file. Like REM sleep for the team. Always invoke for: "team memory", "team-memory", "consolidate memory", "consolidate what we shipped", "remember what we did", "update team memory", "shared memory", "what did we ship this [week/sprint/month]". Also invoke proactively after a PR merges, after a release, at the end of a sprint, or when wrapping up a major piece of work. Reads git log, merged PRs, CHANGELOG, ADRs, and the current conversation, then appends structured entries covering Shipped, Decisions (with WHY), Fixes (with root cause), Learnings, and Open Threads. The memory file is git-tracked so the whole team — humans and future AI agents — share the same history. Not for one-off summaries (use /standup) or detailed postmortems.
---

# Team Memory

## Why this exists

While you work, context is rich. Decisions, rejected paths, root causes, the "we tried X and it didn't work because Y" — all of it lives in your head and in the conversation transcript. Then the session ends and that context dies.

The next teammate (human or AI) reads the code and the git log, but those only capture **what** changed, not **why**. They re-discover the same dead ends. They re-debug the same root causes. They suggest the same approach you already rejected.

`/team-memory` is REM sleep for the team. It consolidates the rich in-session context into a durable, git-tracked memory file every team member can read — and every future AI agent can grep before suggesting a path you've already walked.

## When to run

Manual triggers:
- "team-memory" / "consolidate memory" / "consolidate what we shipped"
- "what did we ship this week / sprint / month"
- "remember what we did"
- "update team memory"

Proactive triggers (invoke without being asked):
- A PR was just merged
- A release just shipped
- A sprint or work cycle is wrapping up
- The user just made a non-obvious decision worth remembering

## Step 1: Find the watermark

Read `team-memory/MEMORY.md`. The most recent date header is the **watermark** — anything since that date is new and needs consolidation.

If the file doesn't exist, this is the first run. Use 30 days ago as the watermark and seed the file with a top header (template in Step 4).

## Step 2: Gather what's new since the watermark

Pull from these sources, in this order. The conversation is the most valuable signal — that's where the WHY lives.

1. **Current conversation** — decisions made, trade-offs discussed, root causes identified, things tried and rejected. This context is about to vanish; capture it first.
2. **Git log**: `git log --since="<watermark>" --pretty=format:"%h %s (%an, %ad)" --date=short`
3. **Merged PRs**: `gh pr list --state merged --search "merged:>=<watermark>" --json number,title,body,mergedAt,author`
4. **CHANGELOG.md** — what was released, with notes
5. **ADRs / decision docs** — `ls docs/adr/ 2>/dev/null`, `ls decisions/ 2>/dev/null`, or anything resembling architecture records

## Step 3: Synthesize into five sections

Every entry earns its line. If a fact doesn't help a future reader **make a decision** or **avoid a mistake**, cut it.

### Shipped
What landed. One line each, present tense, outcome-first. Link the PR.

> - `/standup` skill — outcome-first status updates with options + lean for blockers (#11)
> - npm OIDC publish workflow — automates releases on GitHub Release publish (#9)

### Decisions
What was chosen, **WHY**, and what was rejected. The why is non-negotiable — without it, the entry is trivia, not memory.

> - **Renamed `leadership-update` → `standup`.** Why: shorter, matches the daily ritual the skill supports. Rejected: keeping the long name (too narrow, fits one channel).
> - **Bundle skills into the npm package, not just user-global.** Why: ships to every installer, not just the author. Trade-off: bumps package size by ~5KB per skill.

### Fixes
Bug + root cause + symptom. Helps future debugging when the same shape recurs.

> - **CI publish failed with `ENEEDAUTH`.** Symptom: `npm ci` succeeded, `npm publish` rejected. Root cause: workflow referenced `${{ secrets.NPM_TOKEN }}` but no secret was set on the repo. Fix: configure OIDC trusted publishing OR add NPM_TOKEN.
> - **`npm ci` failed with `EUSAGE`.** Root cause: no `package-lock.json` committed. Fix: generated lockfile with `npm install --package-lock-only` and committed it.

### Learnings
Surprises. Things that would have saved time if known earlier. Default assumptions that turned out wrong.

> - GitHub Actions `release` trigger fires on `release: published`, **not** on push of a tag or version bump commit. Bumping `package.json` alone doesn't ship.
> - Hook `if` filters use permission-rule syntax: `"Bash(gh pr merge *)"` matches the bash command, not the whole tool input JSON.

### Open threads
Work in flight. What's NOT done. What's blocked, and on whom.

> - npm `0.4.1` not yet on registry — blocked on user configuring NPM_TOKEN or OIDC trust.
> - `/team-memory` itself just shipped — first real consolidation run pending.

## Step 4: Append to the memory file

Open `team-memory/MEMORY.md` and append a new section dated with today. Do not rewrite earlier sections — memory is append-only.

If the file doesn't exist, create it with this header first:

```markdown
# Team Memory

Consolidated by `/team-memory`. Each section is REM sleep for the team — what shipped, what was decided and why, what broke and why, what to remember, and what's still open.

Append-only. Read top-to-bottom for chronological history; grep for the topic you're about to work on before you start.
```

Then append the new section:

```markdown
## YYYY-MM-DD

### Shipped
- ...

### Decisions
- ...

### Fixes
- ...

### Learnings
- ...

### Open threads
- ...
```

Skip empty sections — if there were no fixes since last time, omit the heading rather than write "None."

## Step 5: Commit the memory

```bash
git add team-memory/MEMORY.md
git commit -m "memory: consolidate <YYYY-MM-DD>"
```

If you can't commit (e.g., dirty working tree, no auth), tell the user the file is updated and give them the command to run.

## What goes in vs. what stays out

**In:**
- Decisions with stated WHY — especially when the why is non-obvious from the code
- Bugs whose root cause was surprising or could recur in another shape
- Trade-offs taken (chose A over B because Z)
- Learnings that contradict default assumptions
- In-flight work future teammates need context on

**Out:**
- Trivial commits (typo fixes, dependency bumps with no behavior change)
- WHAT-the-code-does descriptions (read the code or `git log`)
- Personal notes / preferences (use `/switch` for personal memory exports)
- Restatements of CHANGELOG.md (link to the release instead)
- Speculation about future work that isn't decided

## How other skills use this memory

- **`/standup`** — reads `team-memory/MEMORY.md` to find what shipped since the last update, saving re-discovery of the same context.
- **`/onboard`** and **`/start`** — point a new teammate (or new AI agent) at the memory file as the canonical "what's been built and why" doc.
- **`/architect`**, **`/build`**, **`/cto`** — should grep the memory before suggesting an approach the team already tried and rejected.
- **`/review`** — reads recent Decisions to know what conventions are in force.

## File location

`team-memory/MEMORY.md` at repo root.

- **Git-tracked** so the whole team has it
- **Plain markdown** so any agent can read or grep it
- **Append-only** so history is preserved across hands
- **One file** so it's easy to grep; date headers split it visually

For very large repos that accumulate years of memory, this skill can later roll older entries into `team-memory/archive/<year>.md`. Don't pre-optimize — start with one file.

## When NOT to use

- Single status update for one stakeholder → `/standup` (one update, not consolidation)
- Postmortem of a specific incident → write a real postmortem doc, root-cause-first
- Personal notes or preferences → `/switch` or your agent's auto-memory
- Marketing changelog for end users → `CHANGELOG.md` (different audience)
- Daily journal of every commit → too noisy, defeats the point; consolidate, don't transcribe
