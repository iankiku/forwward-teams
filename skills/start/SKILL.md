---
name: start
description: (forwward) Onboards founders to forwward-teams by learning what they build, initializing the environment, and recommending which skills to use first. Triggers on first install, new project setup, getting started, or when a user asks what forwward-teams can do.
---

# Start — Team Onboarding

Welcome the user. Learn what they need. Point them to the right skills. Works for engineers, founders, operators, and anyone in between.

## Step 1: Welcome & Discovery

Introduce yourself and ask these questions **one at a time** — conversational, not interrogation:

1. **What are you working on?** — Product, business, project, or problem. One sentence.
2. **What stage are you at?** — Idea, MVP, launched, scaling? (Or: just getting started, mid-project, established)
3. **Who's your customer or audience?** — B2B, B2C, internal team? What industry?
4. **What kind of help do you need most?** — Building software, business strategy, content & marketing, operations, legal & finance, or a mix?
5. **What's your biggest bottleneck right now?** — The one thing that, if solved, would unblock everything else.

**Tone:** Casual, direct. Not corporate. Not overly enthusiastic. Like a capable colleague sitting down and asking "okay, what are we working with?"

**Read the room:**
- If they say "just help me build X" — skip discovery, go to `/build`
- If they say "I need a landing page" — skip to `/pcp-engine`
- If they're clearly non-technical, don't ask about stacks or architecture

## Step 2: Detect Mode

Based on answer 4, the user falls into one of two modes:

### Builder Mode (building software)
Ask one follow-up: **"What's your stack?"** — Or "I haven't decided yet" (that's fine — `/architect` helps)

Then initialize the environment:
```bash
${CLAUDE_PLUGIN_ROOT}/scripts/cli init
```

If `cli init` isn't available, skip — skills work without it.

Check for existing project context:
- Read `README.md`, `package.json`, `pyproject.toml` if they exist
- Read `CLAUDE.md` or `AGENTS.md` if present
- Don't ask questions you can answer from the codebase

### Operator Mode (business, strategy, content, operations)
Skip environment init. No stack questions. Focus on understanding their workflow and connecting them to the right business skills immediately.

## Step 3: Build the Profile

```
USER PROFILE
────────────
Name:        [if given]
Role:        [what they do]
Product:     [what they're working on]
Stage:       [idea / MVP / launched / scaling]
Customer:    [who pays or benefits]
Mode:        [builder / operator / both]
Stack:       [if builder — detected or stated]
Bottleneck:  [what's blocking them]
```

Save this context so future skill invocations can reference it.

## Step 4: Recommend First Actions

Based on mode, stage, and bottleneck, suggest 2-3 skills:

### Builder Recommendations

| Stage | Bottleneck | Start With |
|-------|-----------|------------|
| Idea | "Don't know what to build" | `/strategy` → `/ceo` |
| Idea | "Know what, don't know how" | `/architect` → `/build` |
| MVP | "Need to ship faster" | `/build` → `/gate` → `/ship` |
| MVP | "Don't know if anyone wants this" | `/strategy` → `/sales` |
| Launched | "Code is a mess" | `/architect` → `/review` → `/build` |
| Scaling | "Infra is breaking" | `/devops` → `/architect` → `/data` |

### Operator Recommendations

| Bottleneck | Start With |
|-----------|------------|
| "Need more users / customers" | `/gtm` → `/pcp-engine` → `/sales` |
| "Need content but it sounds generic" | `/voice` → `/write` |
| "Need to write docs or guides" | `/technical-writer` |
| "Need funding / financial clarity" | `/finance` → `/ceo` → `/strategy` |
| "Need legal docs before launch" | `/legal` |
| "Need to figure out positioning / pricing" | `/strategy` → `/pcp-engine` |
| "Need to prepare for investor meetings" | `/ceo` → `/finance` → `/write` |
| "Need sales outreach" | `/sales` → `/strategy` |
| "Need to hire / grow the team" | `/ceo` → `/legal` |

### Universal Recommendations

| Situation | Start With |
|-----------|------------|
| Health-tech | Include `/medic` + `/security` (HIPAA) |
| "Need funding" | `/ceo` → `/finance` → `/strategy` |
| "Need a landing page" | `/pcp-engine` → `/design` |
| "Want to set up my AI agent properly" | `/onboard` |

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

### Builder Quick Wins

| Situation | Quick Win |
|-----------|-----------|
| Has code, no CI | "Let me run `/gate` on your codebase — see where you stand" |
| Has code, no tests | "Want me to review the riskiest file? `/review`" |
| No analytics | "Let me add basic event tracking. `/data`" |

### Operator Quick Wins

| Situation | Quick Win |
|-----------|-----------|
| No landing page | "Let me draft your hero section and positioning. `/pcp-engine`" |
| No legal docs | "You need a privacy policy before launch. `/legal`" |
| No clear positioning | "Let me draft your one-liner positioning. `/strategy`" |
| Writes content but it sounds AI-generated | "Let me capture your voice first. `/voice`" |
| Needs a document written | "Tell me what needs documenting. `/technical-writer`" |
| Preparing for a pitch | "Let me help structure your investor narrative. `/ceo`" |

## Rules

- **One question at a time.** Don't dump all 5 questions in one message.
- **Don't assume technical.** If they say "I run a clinic" — they're in operator mode, not builder mode.
- **Don't over-onboard.** If they're experienced, keep it short. If they're new, take time.
- **Remember context.** Everything learned here informs every skill invocation after.
- **Be useful immediately.** Discovery should take < 5 minutes, then deliver value.
