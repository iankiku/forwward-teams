# forwward-teams

Your startup's crack team — in a Claude Code plugin. 9 skills that cover building, shipping, strategy, and growth.

Born from [forwward](https://forwward.com) — built for founders who code.

## What You Get

| Skill | Your Team Member | Does What |
|-------|-----------------|-----------|
| `/team-lead` | Lead | Composes agent teams, coordinates parallel work |
| `/cto` | CTO | Architecture decisions, build-vs-buy, PRDs, tech debt |
| `/build` | Engineer | Fullstack — TypeScript, React, Next.js, SQL |
| `/gate` | QA | Self-healing verification: lint → types → build → tests |
| `/strategy` | Strategist | Customer discovery, ICP, pricing, competitive intel |
| `/write` | Writer | Blog posts, X threads, newsletters — founder voice |
| `/gtm` | Growth | Viral loops, launch playbooks, K-factor optimization |
| `/review` | Reviewer | Paranoid code review — races, N+1s, trust boundaries |
| `/ship` | Release Eng | Sync, verify, push, PR — release automation |

## Install

### Quick (into your project)

```bash
git clone https://github.com/iankiku/forwward-teams.git /tmp/forwward-teams \
  && /tmp/forwward-teams/scripts/setup \
  && rm -rf /tmp/forwward-teams
```

### Global (all projects)

```bash
git clone https://github.com/iankiku/forwward-teams.git ~/.claude/skills/forwward-teams
cd ~/.claude/skills/forwward-teams && ./scripts/setup --global
```

### In Claude Code

Just paste:
```
Clone git@github.com:iankiku/forwward-teams.git and run scripts/setup to install.
```

## Quick Start

```bash
# Initialize — detects your build system, caches config
.claude/scripts/cli init

# Now use your team
/team-lead Build user authentication with OAuth
/cto Should we build or buy payments?
/build Add Stripe checkout to the pricing page
/strategy Define our ICP for enterprise sales
/write Thread about what we learned shipping v2
/gtm Design the referral loop for our waitlist
/gate
/review
/ship
```

## CLI

Auto-detects your build system. Works with Bun, npm, pnpm, Yarn, Cargo, Go, Python, Make.

```bash
.claude/scripts/cli init          # Detect project, write .claude/project.json
.claude/scripts/cli gate          # lint + typecheck + build + test
.claude/scripts/cli gatekeep -g   # Same, with PASS/FAIL report
.claude/scripts/cli lint          # Individual checks
.claude/scripts/cli test
.claude/scripts/cli build
.claude/scripts/cli dev           # Start dev server
```

## How It Works

```
scripts/setup installs skills → cli init detects your stack → skills use cli for verification
```

- **Skills** are lean SKILL.md files (~70 lines each) that Claude Code loads on demand
- **CLI** is a bash script that caches your build commands in `project.json` — agents read this instead of re-detecting
- **Hooks** block destructive commands and lint on edit
- **No dependencies** — pure bash + markdown, works in any repo

## Uninstall

```bash
.claude/skills/forwward-teams/scripts/setup --uninstall
```

## Philosophy

- **Lean** — 9 skills, 3,300 words total. Each one earns its place.
- **Scaffold** — Basics that teams extend, not a rigid framework.
- **CLI-first** — Shell scripts for deterministic operations, not prose.
- **Plugin-friendly** — Install, uninstall, update cleanly.
- **No lock-in** — Delete any skill independently. They're self-contained.

## Contributing

1. Fork and clone
2. Add or edit skills in `skills/`
3. Keep SKILL.md under 100 lines — lean is the point
4. Test in a real project: `./scripts/setup` then use the skill
5. Open a PR

## License

Apache 2.0

---

Built by [@iankiku](https://github.com/iankiku) for [forwward](https://forwward.com)
