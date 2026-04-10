# Document Type Templates

Structures and templates for each document type. Use these as starting frameworks — adapt based on the discovery interview.

## Contents
- How-To Guide
- Explainer
- API Reference
- SOP / Runbook
- Architecture Doc
- Decision Record
- README
- Release Notes
- Onboarding Doc
- Process Doc

---

## How-To Guide

**Purpose:** Get the reader from "I need to do X" to "I did X."

```
# How to [Specific Task]

## Before You Start
- [Prerequisite 1]
- [Prerequisite 2]

## Steps

### 1. [First action]
[Instruction]

**Example:**
[Show the command/action and expected result]

### 2. [Second action]
[Instruction]

### 3. [Third action]
[Instruction]

## Verify It Worked
[How to confirm success]

## Troubleshooting
| Problem | Cause | Fix |
|---------|-------|-----|
| [Symptom] | [Why] | [What to do] |
```

**Rules:**
- Every step starts with a verb
- Include "Before You Start" — nothing worse than getting to step 5 and realizing you needed something from step 0
- End with verification — the reader should know they succeeded

---

## Explainer

**Purpose:** Build understanding of a concept, system, or decision.

```
# [Topic]: What It Is and Why It Matters

## In One Sentence
[The concept explained in plain language]

## Why This Matters
[What changes or breaks if you don't understand this]

## How It Works
[Core mechanics in 3-5 paragraphs, with diagrams or examples]

## Example
[Concrete scenario showing the concept in action]

## Common Misconceptions
| People think... | Actually... |
|----------------|------------|
| [Wrong assumption] | [Correct understanding] |

## Related Topics
- [Link to related doc 1]
- [Link to related doc 2]
```

**Rules:**
- Lead with the "so what" — why should the reader care
- Use analogies for complex concepts, but only when they genuinely clarify
- Keep it under 1,500 words. If longer, it's probably two documents

---

## API Reference

**Purpose:** Every endpoint, every parameter, every response — no ambiguity.

```
# [API Name] Reference

## Base URL
`https://api.example.com/v1`

## Authentication
[Method, where to get credentials, example header]

## Endpoints

### [METHOD] /path

**Description:** [One sentence — what this does]

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | Yes | The resource identifier |
| `limit` | integer | No | Max results (default: 20, max: 100) |

**Request Example:**
```bash
curl -X GET https://api.example.com/v1/users/123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Response (200):**
```json
{
  "id": "123",
  "name": "Jane Smith",
  "email": "jane@company.com"
}
```

**Errors:**

| Code | Meaning | Fix |
|------|---------|-----|
| 401 | Invalid or missing token | Check your API key |
| 404 | Resource not found | Verify the ID exists |
| 429 | Rate limit exceeded | Wait 60 seconds, retry |
```

**Rules:**
- Every endpoint has a request example AND a response example
- Error codes include what to do about them, not just what they mean
- Default values stated explicitly — never "depends" without saying on what

---

## SOP / Runbook

**Purpose:** A repeatable procedure anyone on the team can follow, even at 3am.

```
# [Procedure Name]

**When to use:** [Trigger condition — what event or situation starts this]
**Who runs this:** [Role or team]
**Estimated time:** [How long it takes]

## Steps

### 1. [Action]
```command
[Exact command to run]
```
**Expected output:** [What you should see]
**If it fails:** [What to do instead]

### 2. [Action]
[Instruction]

### 3. [Action]
[Instruction]

## Verify
[How to confirm the procedure succeeded]

## Rollback
[How to undo this if something goes wrong]

## Escalation
| Condition | Contact | Channel |
|-----------|---------|---------|
| [Problem] | [Person/team] | [Slack/phone/page] |
```

**Rules:**
- Commands are copy-pasteable — no pseudocode in runbooks
- Every step has a failure path ("If it fails...")
- Include rollback — assume things will go wrong
- Time estimate helps the operator know if something is stuck

---

## Architecture Doc

**Purpose:** Explain how a system is built and why those choices were made.

```
# [System Name] Architecture

## Overview
[2-3 sentences: what it does, who uses it, scale]

## Diagram
[System diagram — components and how they connect]

## Components

### [Component Name]
- **What:** [One sentence]
- **Tech:** [Language, framework, hosting]
- **Talks to:** [Other components it depends on]

## Data Flow
[How data moves through the system, step by step]

## Key Decisions

| Decision | Choice | Why | Alternatives Considered |
|----------|--------|-----|------------------------|
| Database | PostgreSQL | ACID compliance, team expertise | MongoDB, DynamoDB |
| Hosting | Vercel | Zero-config deploys, edge network | AWS ECS, Railway |

## Constraints
[Hard limits: compliance requirements, budget, team size, latency targets]

## Known Limitations
[What the system can't do or doesn't handle well]
```

**Rules:**
- Always include "Why" for decisions — the choice without reasoning is useless in 6 months
- Constraints explain what shaped the architecture — without them, choices look arbitrary
- Known limitations prevent future engineers from expecting what doesn't exist

---

## Decision Record

**Purpose:** Record why a choice was made so future team members don't relitigate it.

```
# DR-[Number]: [Decision Title]

**Date:** [When decided]
**Status:** Accepted | Superseded by DR-XX | Deprecated
**Deciders:** [Who was in the room]

## Context
[What situation prompted this decision]

## Decision
[What was decided, in one paragraph]

## Alternatives Considered

| Option | Pros | Cons |
|--------|------|------|
| [Option A — chosen] | [Pros] | [Cons] |
| [Option B] | [Pros] | [Cons] |
| [Option C] | [Pros] | [Cons] |

## Consequences
- [What changes as a result]
- [What we gain]
- [What we give up or accept as trade-off]
```

**Rules:**
- Record the context — decisions only make sense in the context they were made
- Always list alternatives — shows the decision was deliberate, not default
- "Consequences" includes trade-offs, not just benefits

---

## README

**Purpose:** First thing someone sees when they encounter the project. Get them oriented in 60 seconds.

```
# [Project Name]

[One sentence: what this does]

## Quick Start

```bash
[3-5 commands to get running]
```

## What This Does
[2-3 paragraphs explaining the project purpose and scope]

## Prerequisites
- [Tool/dependency 1] (version X+)
- [Tool/dependency 2]

## Installation
[Step-by-step setup]

## Usage
[Most common operation with example]

## Project Structure
```
src/
├── [directory] — [what it contains]
└── [directory] — [what it contains]
```

## Contributing
[How to submit changes]

## License
[License type]
```

**Rules:**
- Quick Start within the first screen — no scrolling to get started
- Installation must be copy-pasteable and tested on a fresh machine
- Project structure only if >5 directories — otherwise it's noise

---

## Release Notes

**Purpose:** Tell users what changed and whether they need to act.

```
# v[X.Y.Z] — [Release Date]

## Highlights
[1-2 sentences on the most important change]

## What's New
- **[Feature name]** — [What it does and why it matters to the user]

## Improvements
- [Change] — [User benefit]

## Fixes
- Fixed [bug description] ([#issue-number])

## Breaking Changes
- **[What broke]** — [Migration path]

## Upgrade Guide
[Steps to upgrade from previous version]
```

**Rules:**
- Lead with what matters to users, not internal refactoring
- Breaking changes always include migration steps
- Link to issues/PRs for readers who want details

---

## Onboarding Doc

**Purpose:** Get a new person productive as fast as possible.

```
# Onboarding: [Role/Team]

## Your First Day
- [ ] [Setup task 1]
- [ ] [Setup task 2]
- [ ] [Meet with person/team]

## Your First Week
- [ ] [Task with learning goal]
- [ ] [Task with learning goal]

## Key Resources
| What | Where | When to Use |
|------|-------|-------------|
| [Resource] | [Link] | [Situation] |

## Who to Ask
| Topic | Person | Contact |
|-------|--------|---------|
| [Domain] | [Name] | [Slack/email] |

## Common Gotchas
[Things that trip up every new person — save them the pain]
```

---

## Process Doc

**Purpose:** Describe how a recurring workflow operates so anyone can follow or improve it.

```
# [Process Name]

## Purpose
[Why this process exists — what goes wrong without it]

## When This Runs
[Trigger: weekly, on-demand, per-release, etc.]

## Who's Involved
| Role | Responsibility |
|------|---------------|
| [Role] | [What they do] |

## Steps

### 1. [Phase/Step]
[What happens, who does it, what the output is]

### 2. [Phase/Step]
[What happens]

## Outputs
[What this process produces — reports, artifacts, decisions]

## How to Improve This Process
[Where to suggest changes, how often it's reviewed]
```

**Rules:**
- Include "How to Improve" — processes that can't be questioned become bureaucracy
- Every step has an owner or role attached
- Outputs are explicit — the reader should know what "done" looks like
