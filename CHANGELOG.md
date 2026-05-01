# @iankiku/forwward-teams

## 0.4.3

### Patch Changes

- Add `/meeting` skill — turns transcripts or rough notes into decisions, action items (with owner + deadline), and open questions. Works for standups, 1:1s, client calls, retros, and all-hands.
- Add `/hire` skill — job descriptions, interview rubrics, scorecards, and offer letter templates for any role, technical or non-technical.
- Add `/ops` skill — SOPs, process docs, runbooks, and handoff docs for CS, ops, finance, HR, and cross-functional teams.
- Add `/deck` skill — slide-by-slide structure and content for pitches, QBRs, board updates, and all-hands. Narrative and argument, not design.

## 0.4.2

### Patch Changes

- Add new `/standup` skill — writes status updates leaders actually read (outcome-first, options + lean for blockers).
- Add new `/team-memory` skill — REM sleep for the team. Consolidates commits, PRs, decisions, and bug-fix root causes into a shared, git-tracked `team-memory/MEMORY.md` so humans and AI agents share the same history of what shipped and *why*.

## 0.4.1

### Patch Changes

- Prefix plugin.json and marketplace.json descriptions with (forwward) for consistent branding across all skill and plugin descriptions.
- Add missing `/voice` and `/technical-writer` skills to the README skills table.
- Expand .gitignore to cover all session and planning file variants.
- Add package-lock.json to fix CI npm ci failures.
