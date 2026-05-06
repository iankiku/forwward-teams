---
name: team-lead
description: (forwward) Orchestrates multi-agent engineering and business teams by analyzing tasks, selecting team shapes, assigning specialist roles, and coordinating parallel agent work with skill dispatch. Triggers on tasks needing 2+ agents, feature dev with frontend + backend, quality audits, research sprints, bug hunts, or any work that benefits from parallel specialization.
---

# Team Lead — Compose & Coordinate Agent Teams

Analyze a task, pick the right team shape, spawn agents with the right skills, coordinate work.

## Step 0: Detect the Stack and Project Config

Before spawning agents, check for `.claude/project.json` (build commands) and read `CLAUDE.md` / `AGENTS.md` for project conventions. Then detect the stack:

```bash
${CLAUDE_PLUGIN_ROOT}/scripts/cli init   # creates .claude/project.json if missing
```

All spawned agents read this file — no per-agent re-detection needed.

## Model Tiers

| Tier | Model | Use for |
|------|-------|---------|
| Think | `sonnet` | Planning, architecture, debugging, review, decisions |
| Execute | `haiku` | Implementation, commands, edits, fixes, formatting |

Default to `haiku`. Use `sonnet` only when reasoning depth matters.

## Engineering Role Roster

Each role maps to a skill. Spawn the agent and tell it which skill to use.

| Role | Skill | Owns |
|------|-------|------|
| **Architect** | `/architect` | System design, DB selection, API contracts, project structure |
| **Backend** | `/buildit` | API routes, services, business logic, background jobs |
| **Frontend** | `/buildit` + `/design` | Components, UI state, client-side logic, responsiveness |
| **Database** | `/architect` | Schema design, migrations, query optimization, indexes |
| **API** | `/buildit` + `/architect` | Endpoint design, versioning, auth, request/response contracts |
| **UI/UX** | `/design` | Layout, component patterns, accessibility, visual consistency |
| **Reviewer** | `/review` | Cross-cutting quality gate — trust boundaries, N+1s, races |
| **DevOps** | `/devops` | CI/CD, Docker, infra, monitoring, deployment |
| **Security** | `/security` | Auth, OWASP, compliance, encryption |

## Business Role Roster

| Role | Skill | Owns |
|------|-------|------|
| **Strategist** | `/strategy` | ICP, competitive intel, positioning, pricing |
| **Growth** | `/gtm` | Launch, viral loops, acquisition |
| **Copywriter** | `/pcp-engine` + `/voice` | Landing pages, email sequences, conversion |
| **Finance** | `/finance` | Unit economics, burn, runway, models |
| **Sales** | `/sales` | Outreach, demos, objection handling |

## Team Recipes

### Full-Stack Feature (3-4 agents)
**Trigger**: New features touching UI + API + DB.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| architect | sonnet | API contracts, shared types, system design | `/architect` |
| backend | haiku | Routes, services, DB | `/buildit` |
| frontend | haiku | Components, UI (blocked by backend API contract) | `/buildit` + `/design` |
| reviewer | sonnet | Quality gate after both ship | `/review` |

### API-Only / Backend Sprint (2 agents)
**Trigger**: Backend features, API design, DB changes.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| backend | sonnet | Design + implement | `/architect` + `/buildit` |
| reviewer | haiku | Review after done | `/review` |

### UI / Design Sprint (2 agents)
**Trigger**: UI overhaul, component library, design system work.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| designer | sonnet | Layout, patterns, component spec | `/design` |
| frontend | haiku | Implement (blocked by designer) | `/buildit` |

### Code Quality (2 agents)
**Trigger**: Tech debt, security audit, pre-release review.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| reviewer | sonnet | Correctness, security, patterns | `/review` + `/security` |
| debt | haiku | Duplicates, dead code, over-engineering | `/buildit` |

### Bug Hunt (2 agents)
**Trigger**: Bug fixes, debugging, production incidents.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| investigator | sonnet | Root cause, reproduction | `/review` |
| fixer | haiku | Implement fix (blocked by investigator) | `/buildit` |

### Strategic Sprint (2-3 agents)
**Trigger**: Market research, fundraising, competitive analysis, OKR planning.

| Name | Model | Role | Skill |
|------|-------|------|-------|
| researcher | sonnet | Market intelligence, competitors | `/strategy` |
| strategist | sonnet | Prioritization, roadmap (blocked by researcher) | `/cto` or `/ceo` |
| synthesizer | sonnet | Decisions, OKRs, resource calls (blocked by strategist) | `/ceo` |

## Workflow

1. **Analyze** — Read task, identify roles needed, pick closest recipe (or compose one — cap at 4 agents)
2. **Create team** — `TeamCreate`, then `TaskCreate` for each work item
3. **Spawn agents** — `Agent` tool with model tier, role, skill instruction, and team name
4. **Coordinate** — `TaskUpdate` to assign, `SendMessage` for blockers and handoffs
5. **Gate** — Each agent runs `/gate` before declaring done
6. **Memory** — After a significant milestone, run `/team-memory` to consolidate
7. **Ship** — Run `/shipit` to push and open PR

## How to instruct an agent to use a skill

When spawning, include the skill in the agent's prompt:

```
You are the backend engineer on this team. Use /buildit to implement the payments API.
Read the API contract from the architect agent's output before starting.
Run /gate before declaring done.
```

The agent will invoke the skill by name — no additional wiring needed.

## Rules

- Smallest team possible. 2 agents over 3 when feasible.
- Skip the team for single-focus tasks — do it yourself.
- `mode: "acceptEdits"` for builders and fixers, `mode: "default"` for reviewers.
- Never spawn duplicates — shut down stuck agents first.
- Always assign a reviewer for any work that will be merged.
- Simple tasks don't need teams. Use judgment.
