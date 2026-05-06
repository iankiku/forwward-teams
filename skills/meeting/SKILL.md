---
name: meeting
description: (forwward) Turns transcripts, rough notes, or voice memos into a clean summary with decisions, action items (owner + deadline), and open questions. Use when the user pastes unstructured notes or asks "summarize this meeting", "meeting notes", "what were the action items", "write up from this call", "debrief", "what did we decide". Works for any meeting type — standups, 1:1s, client calls, all-hands, retrospectives.
---

# Meeting

## Core principle

A meeting summary is not a transcript. It's a decision log and a task list. The person reading it wasn't there — or was there but needs to act on it. Every line either records a decision, assigns work, or flags a risk. Nothing else earns a line.

## Step 1: Understand what you have

Assess the input before writing anything:

- **Transcript** (full dialogue): extract signal, ignore filler
- **Rough notes** (bullets, shorthand, fragments): fill gaps with reasonable inference, flag anything uncertain
- **Voice memo / stream of consciousness**: restructure entirely, don't preserve the rambling order

Ask if unclear: "Is this a transcript, notes, or raw thoughts?" Then proceed.

## Step 2: Identify the meeting type

The output shape changes by type:

| Type | What matters most |
|------|-------------------|
| Standup / sync | Blockers, status, handoffs |
| 1:1 | Decisions made, commitments, feedback |
| Client call | What was promised, open questions, next steps |
| Strategy / planning | Decisions with rationale, rejected options, open threads |
| Retrospective | What to change, who owns the change |
| All-hands / board | Key messages, decisions, follow-ups |

## Step 3: Extract the four sections

Pull from the input in this priority order. If a section is empty, omit it.

### Decisions
What was resolved. One line each. Past tense, specific.

> - Approved Q3 hiring plan for 3 engineers and 1 designer.
> - Agreed to delay the enterprise launch to September to hit the compliance milestone first.
> - Dropped the white-label feature from v1 scope — revisit in Q4.

### Action items
Who does what by when. Every item needs an owner. If no deadline was stated, leave it blank — don't invent one.

> - [ ] @Sara — send revised contract to Acme by Friday
> - [ ] @Jae — share onboarding doc draft with the team before next sync
> - [ ] @Ian — follow up with legal on the data processing agreement (no deadline set)

### Open questions
Unresolved issues that need a decision or more information before work can proceed.

> - Do we need SOC 2 Type II before enterprise can sign? (Owner: legal — Ian to confirm)
> - What's the pricing model for the agency tier? (Still open — needs finance input)

### Summary
Two to four sentences. The current state, what changed, and what's next. Enough for someone who wasn't there to understand the outcome without reading the sections above.

## Step 4: Apply format for the channel

**Slack / async message:**
Summary paragraph first, then a short bulleted list of action items. No headers. Under 120 words. Link to the full doc if it exists.

**Written doc / Notion / Confluence:**
Full four-section structure with headers. Include date, meeting type, and attendees at the top.

**Email follow-up:**
Subject: `[Meeting recap] <topic> — <date>`
Body: summary paragraph + action items table. Under 200 words.

## Anti-patterns

| Pattern | Fix |
|---------|-----|
| Transcribing instead of summarizing | Extract decisions and tasks, not dialogue |
| Action items without owners | Every item gets a name, even if it's "TBD" |
| Vague decisions: "we discussed X" | "We decided X" or "No decision reached on X" |
| Burying the decisions in narrative | Decisions section always comes first |
| Fabricating deadlines | If no deadline was stated, leave the field blank |

## What goes in vs. what stays out

**In:**
- Explicit decisions and the reasoning given
- Named commitments (who said they would do what)
- Blockers and risks raised
- Explicitly unresolved questions

**Out:**
- Who said what (attribution, unless it matters for the decision)
- Tangents that didn't produce a decision or task
- Pleasantries, filler, "does that make sense?" moments
- Speculation that wasn't agreed on

## When NOT to use

- Long-form project retrospective with root cause analysis → write a proper postmortem
- Client-facing meeting report with narrative and relationship context → use `/write` for tone and structure
- Board deck with financial detail → use `/deck`
