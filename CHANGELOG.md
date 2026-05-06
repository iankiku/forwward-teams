# @iankiku/forwward-teams

## 0.4.6

### Patch Changes

- - Restore `.claude-plugin/plugin.json` (was missing on disk) with explicit 32-skill array, version mirroring `package.json`, and a 13-keyword set covering both AI-tool discovery (`claude-code`, `agent-skills`, `ai-agents`, `gemini`, `cursor`, `codex`, `opencode`) and founder discovery (`startup`, `founder`, `engineering`, `growth`, `strategy`, `skills`).
  - Sync `marketplace.json` plugin entry — version, description, and keywords now match `plugin.json` and `package.json`.
  - **Behavior change** in `hooks/task-gate.sh` — was silent advisory (always exit 0, output discarded). Now surfaces lint failures via `exit 2` so Claude can fix them in-loop. Missing-binary case (exit 127) carved out so machines without `eslint`/`ruff` don't get spurious failures.
  - Strengthen `hooks/validate-command.sh` regex — now also blocks `git push -f`, `--force-with-lease`, `git clean -fd`, `rm -rf ~`, `rm -rf $HOME`, `rm -rf *`, `sudo rm -rf`, `TRUNCATE TABLE`, and `DROP DATABASE`. Honest comment added that this is defense-in-depth, not a security boundary.
  - Remove undocumented `"async": true` field from `hooks/hooks.json` (silently ignored by the harness).
  - Trim eight skill descriptions that exceeded the ~500-char auto-activation soft cap: `audit`, `deck`, `hire`, `meeting`, `ops`, `ship`, `standup`, `team-memory`. All now ≤ 462 chars. Removes per-turn skill-index bloat — matches the "no context bloat" tagline.
  - Strip cross-skill `/command` references from skill descriptions. Was misleading: `audit` referenced `/gate`, `standup` referenced `/team-memory`, `team-memory` referenced `/standup` — none of those slash commands exist in this plugin (skill-only, no `commands/` directory).

## 0.4.5

### Patch Changes

- Upgrade `/ship` — rewritten as a full-stack shipping engineer + SRE playbook. Three flows: PR (gate → squash → push), release (gate → version bump → changelog → tag → dry-run → confirm → deploy → health check → /team-memory), hotfix (fast-track gate → merge → monitor → regression test). Stack detection across Node, Go, Python, Ruby/Rails, Rust, Java, Terraform, Pulumi, AWS SAM/Lambda, and CDK. SRE gates: change freeze detection, deploy-window warnings, rollback reference, post-deploy health verification. Rollback table for every stack.
- Add release notes step to `/ship` release flow — user-facing notes (New / Improved / Fixed + how-to-update) saved to `RELEASE_NOTES.md` and posted to GitHub Releases via `gh release create`.
- Upgrade `/team-memory` — monorepo-aware recursive discovery: finds all `CLAUDE.md`, `AGENTS.md`, and `.claude/` directories across the repo before consolidating. Uses the latest watermark across all discovered memory files. Multi-package write strategy: per-package memory for independent packages, cross-package root summary for shared decisions.
- Add frontend slop patterns to `/audit` — visual defaults (purple gradients, pill buttons, cardocalypse), typography slop (Inter monoculture, overused display fonts), CSS technical debt (hardcoded hex, magic numbers, duplicate shadows), component slop (prop drilling, untouched Shadcn, god components), AI-specific noise (hallucinated imports, any-type abuse, key={index}), and content slop (em dashes, vague CTAs, lorem ipsum).
- Add GitHub issue templates — skill output quality, new skill requests, install/CLI problems. Feedback section added to README with direct links.

## 0.4.4

### Patch Changes

- Add `/audit` skill — aggressively removes slop, dead code, DRY violations, and SOLID violations in one behavior-preserving commit. Detects the stack, respects team-memory decisions, and verifies with /gate. Invocable standalone or from /gate as a pre-ship clean pass.
- Update `/gate` to support optional `/audit` invocation before the verification loop.

## 0.4.3

### Patch Changes

- Add `/meeting` skill — turns transcripts or rough notes into decisions, action items (with owner + deadline), and open questions. Works for standups, 1:1s, client calls, retros, and all-hands.
- Add `/hire` skill — job descriptions, interview rubrics, scorecards, and offer letter templates for any role, technical or non-technical.
- Add `/ops` skill — SOPs, process docs, runbooks, and handoff docs for CS, ops, finance, HR, and cross-functional teams.
- Add `/deck` skill — slide-by-slide structure and content for pitches, QBRs, board updates, and all-hands. Narrative and argument, not design.
- De-bias all technical skills — `/build`, `/architect`, `/devops`, `/security`, `/review`, `/gate` now detect the project stack first (Go, Ruby/Rails, Java, Rust, Python, TypeScript, .NET) and adapt advice accordingly. No more TypeScript/Next.js assumptions.

## 0.4.2

### Patch Changes

- Add new `/standup` skill — writes status updates leaders actually read (outcome-first, options + lean for blockers).
- Add new `/team-memory` skill — REM sleep for the team. Consolidates commits, PRs, decisions, and bug-fix root causes into a shared, git-tracked `team-memory/MEMORY.md` so humans and AI agents share the same history of what shipped and _why_.

## 0.4.1

### Patch Changes

- Prefix plugin.json and marketplace.json descriptions with (forwward) for consistent branding across all skill and plugin descriptions.
- Add missing `/voice` and `/technical-writer` skills to the README skills table.
- Expand .gitignore to cover all session and planning file variants.
- Add package-lock.json to fix CI npm ci failures.
