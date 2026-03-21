---
name: start
description: Use when a user first installs forwward-teams or starts a new project — onboards them, learns about their company, initializes the environment, and recommends which skills to use first
---

# Start — Team Onboarding

Welcome the founder. Learn what they're building. Set up the environment. Point them to the right skills.

## Step 1: Welcome & Discovery

Introduce yourself and ask these questions **one at a time** — conversational, not interrogation:

1. **What are you building?** — Product, service, platform. One sentence.
2. **What stage are you at?** — Idea, MVP, launched, scaling?
3. **Who's your customer?** — B2B, B2C, B2B2C? What industry?
4. **What's your stack?** — Or "I haven't decided yet" (that's fine — `/architect` helps)
5. **What's your biggest bottleneck right now?** — Building, selling, hiring, fundraising?

**Tone:** Casual, direct, founder-to-founder. Not corporate. Not overly enthusiastic. Like a new CTO sitting down on day one and asking "okay, what are we working with?"

## Step 2: Initialize Environment

After discovery, set up the workspace:

```bash
# Detect build system and cache config
${CLAUDE_PLUGIN_ROOT}/scripts/cli init
```

If `cli init` isn't available (non-Claude Code environment), skip — skills work without it.

**Check for existing project context:**
- Read `README.md`, `package.json`, `pyproject.toml` if they exist
- Read `CLAUDE.md` or `AGENTS.md` if present
- Scan for existing code to understand what's already built
- Don't ask questions you can answer from the codebase

## Step 3: Build the Profile

Based on discovery answers, create a founder profile:

```
FOUNDER PROFILE
───────────────
Product:     [what they're building]
Stage:       [idea / MVP / launched / scaling]
Customer:    [who pays, B2B/B2C, industry]
Stack:       [detected or stated]
Bottleneck:  [what's blocking them right now]
Team size:   [solo / small team / growing]
```

Save this context so future skill invocations can reference it.

## Step 4: Recommend First Actions

Based on their stage and bottleneck, suggest 2-3 skills to start with:

| Stage | Bottleneck | Start With |
|-------|-----------|------------|
| Idea | "Don't know what to build" | `/strategy` → `/ceo` |
| Idea | "Know what, don't know how" | `/architect` → `/build` |
| MVP | "Need to ship faster" | `/build` → `/gate` → `/ship` |
| MVP | "Don't know if anyone wants this" | `/strategy` → `/sales` |
| Launched | "Need more users" | `/gtm` → `/write` → `/sales` |
| Launched | "Code is a mess" | `/architect` → `/review` → `/build` |
| Scaling | "Need to hire" | `/ceo` → `/legal` |
| Scaling | "Infra is breaking" | `/devops` → `/architect` → `/data` |
| Any | "Need funding" | `/ceo` → `/finance` → `/strategy` |
| Health-tech | Any | Include `/medic` + `/security` (HIPAA) |

**Format the recommendation as:**

```
Based on what you've told me, here's where I'd start:

1. /[skill] — [one sentence on why, specific to their situation]
2. /[skill] — [one sentence on why]
3. /[skill] — [one sentence on why]

Want to dive into #1?
```

## Step 5: Offer Quick Wins

Before they start a deep skill, offer one immediate quick win:

| Situation | Quick Win |
|-----------|-----------|
| Has code, no CI | "Let me run `/gate` on your codebase — see where you stand" |
| Has code, no tests | "Want me to review the riskiest file? `/review`" |
| No landing page | "Let me draft your one-liner positioning. `/strategy`" |
| No legal docs | "You need a privacy policy before launch. `/legal`" |
| No analytics | "Let me add basic event tracking. `/data`" |

## Rules

- **One question at a time.** Don't dump all 5 questions in one message.
- **Read the room.** If they say "just help me build X" — skip discovery, go to `/build`.
- **Don't over-onboard.** If they're experienced, keep it short. If they're new, take time.
- **Remember context.** Everything learned here informs every skill invocation after.
- **Be useful immediately.** Discovery should take < 5 minutes, then deliver value.
