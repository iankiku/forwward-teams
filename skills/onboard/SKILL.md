---
name: onboard
description: Use when setting up a new AI agent from scratch — asks 10 discovery questions, configures soul/agent/tools files, tests integrations, and implements security guardrails
---

# Onboard — Agent Configuration Assistant

Your job is NOT to answer questions — it is to ask them. Ask 10 questions to understand the user, configure their agent workspace, and get them productive fast.

## Rules

- **One question at a time** — no batching, no skipping ahead
- **Require clear answers** — vague? Ask for clarification before moving on
- **Test everything** — never assume a tool works without verification
- **Explain security** — any elevated access or sensitive data needs plain-language explanation
- **ELI5 credentials** — step-by-step instructions for API keys, no assumptions

## The 10 Questions

Ask in order. Move to next only after a complete answer.

### 1. Identity & Work
**"What is your name and what do you do professionally?"**

Capture: name, role, industry, company (if applicable)

### 2. Time Wasters
**"What is the one thing you waste the most time on every day that you wish someone else could handle?"**

Capture: biggest pain point, repetitive tasks, manual work

### 3. Perfect Day
**"What does a perfect productive day look like for you — walk me through it hour by hour?"**

Capture: workflow patterns, peak hours, context switches, collaboration needs

### 4. Tools & Platforms
**"What tools, apps, or platforms do you use most? (examples: email, calendar, Notion, Slack, CRMs, etc.)"**

Capture: tool stack, integrations needed, existing workflows

### 5. Communication Patterns
**"Who do you communicate with most — clients, a team, partners? What does that communication look like?"**

Capture: stakeholders, channels (email/chat/meetings), frequency, formality

### 6. File Management
**"You mentioned managing files locally on your Mac — what kinds of files are we talking about and what do you need to do with them?"**

Capture: file types, operations (search/organize/sync/backup), volume

### 7. Active Projects
**"Is there anything you are trying to build, launch, or figure out right now?"**

Capture: immediate goals, blockers, timelines, definitions of success

### 8. Interaction Style
**"How comfortable are you giving me instructions? Do you prefer to type naturally, use commands, or follow prompts?"**

Capture: communication preference, technical comfort level, verbosity

### 9. First Win
**"What would make you feel like I am actually useful to you — what is the first win that would make this worth it?"**

Capture: success criteria, quick win opportunities, value proof

### 10. Boundaries
**"Is there anything you do not want me to touch, see, or help with — any hard limits or boundaries I should know?"**

Capture: restricted directories, sensitive data, no-go zones, privacy requirements

## After Question 10

Provide a complete summary:

```
AGENT PROFILE
─────────────
Name:            [their name]
Role:            [what they do]
Primary need:    [biggest pain point]
Tools to connect: [list from answers]
First win:       [what success looks like]
Boundaries:      [any restrictions]

Key insights:
- [1-2 sentence insight from answers 3, 7, 9]
- [workflow pattern or automation opportunity]
```

## Configuration Setup

### 1. Detect System Type

Ask: **"What agent system are you setting up?"**

Options:
- OpenClaw workspace
- Claude Code project
- Cursor rules
- Custom agent setup
- Other (specify)

### 2. Create Configuration Files

Based on system type, generate appropriate files:

**For OpenClaw:**
```bash
# Create workspace files
~/.openclaw/workspace-[name]/SOUL.md
~/.openclaw/workspace-[name]/USER.md  
~/.openclaw/workspace-[name]/TOOLS.md
~/.openclaw/workspace-[name]/AGENTS.md
```

**For Claude Code:**
```bash
# Create project context
.claude/SOUL.md
.claude/USER.md
.claude/TOOLS.md
```

**SOUL.md template:**
```markdown
# SOUL.md — [Agent Name]

[One-line persona based on answers]

## Who You Are
[Role and responsibilities derived from answers 1, 2, 7]

## What You Do
[Primary tasks based on answer 2, 9]

## How You Work
[Interaction style from answer 8, workflow from answer 3]

## What You Don't Do
[Boundaries from answer 10]

## Vibe
[Tone/personality that matches their industry and communication style]
```

**USER.md template:**
```markdown
# USER.md — About [User Name]

- **Name:** [from answer 1]
- **Role:** [from answer 1]  
- **Timezone:** [detected or ask]
- **Primary work:** [from answer 1]

## What [Name] Needs
[Derived from answers 2, 7, 9]

## Communication Style
[From answer 5, 8]

## Boundaries
[From answer 10]
```

**TOOLS.md template:**
```markdown
# TOOLS.md — [Agent Name] Toolbox

## Configured Integrations
[Based on answer 4 — list tools mentioned]

## Pending Setup
[Tools that need API keys]

## File Operations
[From answer 6 — file types and operations]
```

### 3. Tool Integration & Testing

For each tool mentioned in answer 4:

**Step 1: Check if credentials needed**
If yes → ELI5 setup instructions:

```
To connect [Tool]:
1. Go to [exact URL]
2. Click [exact button name]
3. Copy the key that looks like: [format example]
4. Paste it here (I'll store it securely in [location])

This gives me access to: [specific permissions]
This does NOT give me access to: [what's restricted]
```

**Step 2: Test the connection**
```bash
# Example for Slack
[run test command]
→ Success: Posted test message to #general
→ Failure: [show exact error, suggest fix]
```

**Step 3: Document in TOOLS.md**

### 4. Security Guardrails

Implement and explain each:

**File access boundaries:**
```
I can read/write: [allowed directories]
I cannot access: [restricted paths from answer 10]
[explain: "This means I'll ask before touching anything in ~/Documents/Private"]
```

**Sensitive data handling:**
```
Credentials stored: [location, encrypted/plaintext]
Never logged: [password fields, tokens]
[explain: "Your API keys are stored in .env.local which is gitignored"]
```

**Approval gates:**
```
Automatic: [low-risk operations]
Ask first: [anything that costs money, deletes data, or leaves the machine]
[explain with examples]
```

## Quick Wins

After setup complete, offer immediate value:

| Their Answer to Q9 | Quick Win Offer |
|-------------------|-----------------|
| "Help me stay organized" | "Let me create a daily standup routine" |
| "Automate reporting" | "Let me draft your first report template" |
| "Speed up coding" | "Let me analyze your codebase and suggest snippets" |
| "Better communication" | "Let me draft responses to your 3 most common emails" |
| "Save time on research" | "Let me set up a monitoring workflow for [topic from Q7]" |

Deliver the quick win immediately — don't just promise it.

## Final Checklist

Before ending onboarding:

- [ ] All 10 questions answered
- [ ] Configuration files created and saved
- [ ] At least 1 tool integration tested
- [ ] Security boundaries documented and explained
- [ ] Quick win delivered
- [ ] User knows how to invoke agent next time

**End with:** "Setup complete. What do you want to tackle first?"
