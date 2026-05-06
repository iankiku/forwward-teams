---
name: team-memory
description: (forwward) Consolidates recent team work — commits, PRs, decisions, fixes, learnings — into a shared `team-memory/MEMORY.md`. Like REM sleep for the team. Use after a PR merges, after a release, at sprint-end, or when the user says "team memory", "what did we ship this week". Reads git log, PRs, CHANGELOG, ADRs, and the conversation; appends Shipped, Decisions (with WHY), Fixes (root cause), Learnings, Open Threads. Not for one-off summaries or PII.
---

# Team Memory

## Why this exists

While you work, context is rich. Decisions, rejected paths, root causes, the "we tried X and it didn't work because Y" — all of it lives in your head and in the conversation transcript. Then the session ends and that context dies.

The next teammate (human or AI) reads the code and the git log, but those only capture **what** changed, not **why**. They re-discover the same dead ends. They re-debug the same root causes. They suggest the same approach you already rejected.

`/team-memory` is REM sleep for the team. It consolidates the rich in-session context into a durable, git-tracked memory file every team member can read — and every future AI agent can grep before suggesting a path you've already walked.

## Directory boundary

`team-memory/MEMORY.md` lives at the **repo root** and is intentionally separate from:
- Claude's auto-memory (`~/.claude/projects/.../memory/`) — personal, agent-specific
- `CLAUDE.md` / `AGENTS.md` — project instructions, not history
- Personal notes, conversation transcripts, or agent preferences

This file is **project-scoped team history** only. It belongs to the team, not to any individual agent or user.

## When to run

Manual triggers:
- "team-memory" / "consolidate memory" / "consolidate what we shipped"
- "what did we ship this week / sprint / month"
- "remember what we did" / "update team memory"

Proactive triggers (invoke without being asked):
- A PR was just merged
- A release just shipped
- A sprint or work cycle is wrapping up
- A non-obvious decision was just made

## Step 0: PII and scope filter

Before writing anything, apply this filter. The memory file is git-tracked and visible to the whole team — it must never contain:

**Strip out:**
- Full names, emails, Slack handles, or personal identifiers (use role or initials only if attribution is needed: "BE engineer", "@user")
- Personal chat or DM content — conversations between individuals about non-project matters
- Individual performance observations, feedback on specific people, HR-adjacent content
- Personal preferences or opinions not tied to a project decision
- Customer PII: customer names, emails, contract values, support tickets identifying individuals
- Financial details that are confidential: specific salaries, investor terms not already public
- Anything from personal agent memory (`~/.claude/`) — that stays personal

**Keep:**
- Technical decisions and their rationale
- Bugs and root causes
- What shipped and why
- Patterns that helped or hurt
- Open questions the team needs to resolve

If you encounter content that mixes project signal with personal content (e.g., a chat log where someone describes a bug but also mentions personal details), extract only the technical signal and discard the rest.

## Step 0.5: Recursive discovery

Before reading anything, find all context files across the whole repo. This handles monorepos, multi-package workspaces, and projects where sub-teams maintain their own CLAUDE.md or local memory.

```bash
# All CLAUDE.md / AGENTS.md files (exclude node_modules, .git, generated dirs)
find . \( -name "CLAUDE.md" -o -name "AGENTS.md" \) \
  -not -path "*/node_modules/*" -not -path "*/.git/*" -not -path "*/dist/*"

# All .claude/ directories (local project settings, hooks, nested memory)
find . -type d -name ".claude" \
  -not -path "*/node_modules/*" -not -path "*/.git/*"

# All existing team-memory files (nested packages may have their own)
find . -path "*/team-memory/MEMORY.md" \
  -not -path "*/node_modules/*" -not -path "*/.git/*"
```

**For each CLAUDE.md found:** read it — nested packages often declare their own tracker, conventions, or off-limits decisions that root CLAUDE.md doesn't know about.

**For each `.claude/` found:** check for local `project.json` (build commands), `hooks/` (automation decisions), or `settings.json` (team-level tool permissions). These are signal for the Decisions section.

**For each nested `team-memory/MEMORY.md` found:** read it as an additional watermark source. Use the most recent date across all memory files as the global watermark in Step 2. When writing, append to each file that covers the affected package — don't collapse a multi-package monorepo into the root memory if the packages have independent histories.

## Step 1: Detect the tracker

Read all discovered `CLAUDE.md` / `AGENTS.md` files (not just root) for signals about where work is tracked:

| Signal in CLAUDE.md | Tracker |
|---------------------|---------|
| `linear.app` URL or "Linear" | Linear |
| `jira` URL or "Jira" | Jira |
| `github.com/*/issues` or "GitHub Issues" | GitHub Issues |
| `notion.so` or "Notion" | Notion |
| `.json` ticket file path | Local JSON |
| `.md` ticket file path | Local markdown |
| None found | Git log + PRs only |

If a tracker is identified, pull from it after pulling git data. Use the appropriate tool or MCP if available (Linear MCP, Jira MCP, GitHub Issues via `gh`). If no integration is available, note the tracker name in the memory entry so humans can cross-reference.

## Step 2: Find the watermark

Read all `team-memory/MEMORY.md` files discovered in Step 0.5. Scan each for its most recent date header (`## YYYY-MM-DD`). Take the **latest date across all files** as the global watermark — anything since that date is new and needs consolidation.

If no memory file exists anywhere, this is the first run. Use 30 days ago as the watermark and create the file(s) in Step 5.

## Step 3: Gather what's new since the watermark

Pull from these sources in this order. The conversation is the most valuable signal — that's where the WHY lives.

1. **Current conversation** — decisions made, trade-offs discussed, root causes identified, things tried and rejected. This context is about to vanish; capture it first.
2. **Git log**: `git log --since="<watermark>" --pretty=format:"%h %s (%ad)" --date=short`
3. **Merged PRs**: `gh pr list --state merged --search "merged:>=<watermark>" --json number,title,body,mergedAt`
4. **Tracker** (if detected in Step 1): closed tickets / completed issues since watermark
5. **CHANGELOG.md** — what was released
6. **ADRs / decision docs** — `ls docs/adr/ 2>/dev/null`, `ls decisions/ 2>/dev/null`

Apply the PII filter from Step 0 to everything before writing.

## Step 4: Synthesize into five sections

Every entry earns its line. If a fact doesn't help a future reader **make a decision** or **avoid a mistake**, cut it.

### Shipped
What landed. One line each, present tense, outcome-first. Link the PR or ticket.

> - `/standup` skill — outcome-first status updates with options + lean for blockers (#11)
> - Auth service migrated to OIDC — removed legacy session tokens (#34)

### Decisions
What was chosen, **WHY**, and what was rejected. The why is non-negotiable.

> - **Chose cursor-based pagination over offset.** Why: offset breaks on concurrent inserts; cursor is stable at scale. Rejected: keyset (more complex, no benefit at current volume).
> - **Deferred SSO to v1.1.** Why: protects the Friday demo milestone and the margin. Client agreed.

### Fixes
Bug + root cause + symptom. Helps future debugging when the same shape recurs.

> - **CI publish failed with ENEEDAUTH.** Symptom: `npm publish` rejected. Root cause: NPM_TOKEN not set on repo. Fix: add secret or use OIDC trusted publishing.
> - **N+1 on dashboard load.** Root cause: `user.posts` called inside a loop without eager loading. Fix: added `include: { posts: true }` to the parent query.

### Learnings
Surprises. Things that would have saved time if known earlier.

> - GitHub Actions `release` trigger fires on `release: published`, not on tag push.
> - Hook `if` filters use permission-rule syntax, not shell glob syntax.

### Open threads
Work in flight. What's NOT done. What's blocked and on whom.

> - SSO scoped to v1.1 — revisit after Friday demo.
> - Linear integration for team-memory not yet wired — tickets tracked manually for now.

## Step 5: Append to the memory file

Decide where to write based on what Step 0.5 found:

- **Single-package repo** (one root CLAUDE.md, no nested packages): write to `team-memory/MEMORY.md` at the root.
- **Monorepo with independent packages** (each has its own CLAUDE.md or existing `team-memory/`): write to each package's own `team-memory/MEMORY.md`, scoping each entry to that package's changes only. Also write a brief cross-package summary to root `team-memory/MEMORY.md` — major decisions that span multiple packages belong at the root level.
- **Monorepo without per-package memory yet**: default to root-only unless the user says otherwise.

Open the target file(s) and append a new dated section. Do not rewrite earlier sections — memory is append-only.

If the file doesn't exist, create it with this header first:

```markdown
# Team Memory

Consolidated by `/team-memory`. Each section is a snapshot of what shipped, what was decided and why, what broke and why, what to remember, and what's still open.

Append-only. Read top-to-bottom for chronological history; grep for the topic you're about to work on before you start.

This file is project-scoped team history. It contains no PII, personal content, or individual performance data.
```

Then append:

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

Skip empty sections. If there were no fixes, omit the heading.

## Step 6: Commit the memory

```bash
git add team-memory/MEMORY.md
git commit -m "memory: consolidate <YYYY-MM-DD>"
```

If you can't commit (dirty working tree, no auth), tell the user the file is updated and give them the command.

## What goes in vs. what stays out

**In:**
- Decisions with stated WHY — especially when the why is non-obvious from the code
- Bugs whose root cause was surprising or could recur in another shape
- Trade-offs taken (chose A over B because Z)
- Learnings that contradict default assumptions
- In-flight work future teammates need context on

**Out:**
- PII, personal identifiers, customer names, individual performance data
- Personal conversations, DMs, or agent-to-agent chatter not about project work
- Trivial commits (typo fixes, dependency bumps with no behavior change)
- WHAT-the-code-does descriptions (read the code or `git log`)
- Restatements of CHANGELOG.md (link to the release instead)
- Speculation about future work that isn't decided
- Content from personal agent memory files (`~/.claude/`, `CLAUDE.md` preferences)

## How other skills use this memory

- **`/standup`** — reads `team-memory/MEMORY.md` to find what shipped since the last update
- **`/onboard`** and **`/start`** — point a new teammate at the memory file as the canonical "what's been built and why" doc
- **`/architect`**, **`/buildit`**, **`/cto`** — grep the memory before suggesting an approach the team already tried and rejected
- **`/review`** — reads recent Decisions to know what conventions are in force

## File location

`team-memory/MEMORY.md` at repo root.

- **Git-tracked** so the whole team has it
- **Plain markdown** so any agent can read or grep it
- **Append-only** so history is preserved
- **One file** so it's easy to grep; date headers split it visually
- **No PII** — safe to commit and share across the team

## When NOT to use

- Single status update for one stakeholder → `/standup`
- Postmortem of a specific incident → write a real postmortem doc, root-cause-first
- **Personal notes, preferences, or agent memory** → use your agent's auto-memory (`~/.claude/`)
- **PII, individual feedback, or HR content** → never goes here, full stop
- Marketing changelog for end users → `CHANGELOG.md`
- Daily journal of every commit → too noisy; consolidate, don't transcribe
