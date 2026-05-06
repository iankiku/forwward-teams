---
name: deck
description: (forwward) Structures slide content for pitches, QBRs, board updates, investor updates, strategy decks, and all-hands. Produces slide-by-slide outlines with titles, talking points, and key data per slide — content, not visual design. Use when the user says "help me build a deck", "pitch deck", "QBR", "board update", "what slides do I need", or is preparing a high-stakes presentation without structure yet.
---

# Deck

## Core principle

A deck is not a document with pictures. It's a sequenced argument. Every slide answers one question and hands the reader to the next question. If a slide doesn't advance the argument, it doesn't belong. The structure is the product — nail that before touching a design tool.

## Step 1: Understand the presentation before structuring anything

Answer these before writing slides:

1. **Audience**: Who is in the room? What do they already know? What do they care about?
2. **Goal**: What decision or action do you want from this presentation?
3. **Format**: Live presentation, leave-behind, or async read? (Changes density and annotation needs)
4. **Time**: How many minutes? Rule of thumb: 2 minutes per slide for live presentations.
5. **Context**: Is this the first time this audience is seeing this topic, or a recurring update?

## Step 2: Choose the deck type

Different decks follow different spine structures. Match the type first.

---

## Pitch Deck (Investor / Partner)

Use for: fundraising, partnership pitches, first-time investor conversations.

| # | Slide | What it answers |
|---|-------|----------------|
| 1 | Problem | What's broken in the world and for whom? |
| 2 | Solution | What do you do, in one sentence? |
| 3 | Why now | What changed that makes this the moment? |
| 4 | Market | How big? TAM/SAM/SOM if you have it — narrative if you don't |
| 5 | Product | What does it do? (Screenshots or demo beats description) |
| 6 | Traction | What have you proven? (Revenue, users, retention, logos) |
| 7 | Business model | How do you make money? |
| 8 | Go-to-market | How do you reach customers? |
| 9 | Team | Why are you the right people for this? |
| 10 | The ask | How much, for what milestones, by when? |

Rules:
- Slide 1 (Problem) should make the investor feel the pain before you name your company.
- Slide 6 (Traction) is the most important slide for early-stage. Lead with the most impressive number.
- Slide 10 (Ask) should name the exact amount and the 2-3 milestones it funds.

---

## QBR Deck (Quarterly Business Review)

Use for: customer success reviews, executive updates on account health.

| # | Slide | What it answers |
|---|-------|----------------|
| 1 | Executive summary | One slide: status, top achievement, top risk |
| 2 | Q[N] results | What were the goals? What was achieved? |
| 3 | Key metrics | The 3-5 numbers that define account health |
| 4 | Wins | Specific outcomes delivered this quarter |
| 5 | Challenges | What went wrong, what was done about it |
| 6 | Product roadmap highlights | What's coming that's relevant to this client |
| 7 | Q[N+1] plan | Goals, initiatives, and owners for next quarter |
| 8 | Asks | What you need from the customer to succeed |

---

## Board / Investor Update

Use for: recurring board meetings, monthly/quarterly investor updates.

| # | Slide | What it answers |
|---|-------|----------------|
| 1 | Summary | Headline metrics: revenue, growth, runway |
| 2 | Scorecard | OKRs or goals from last period — red/yellow/green |
| 3 | Key achievements | 3-5 things that moved the needle |
| 4 | Challenges | Honest assessment of what's hard |
| 5 | Financial snapshot | P&L, burn, runway, forecast |
| 6 | Next period priorities | What you're focused on and why |
| 7 | Asks | Decisions needed from the board |

Rule: Board members read the deck before the meeting. Every slide should be able to stand alone. Don't rely on verbal explanation for a board deck.

---

## Internal All-Hands / Strategy Deck

Use for: team-wide alignment, strategy rollouts, OKR kickoffs.

| # | Slide | What it answers |
|---|-------|----------------|
| 1 | Where we are | Current state — honest, specific |
| 2 | What we learned | From the last period: what worked, what didn't |
| 3 | Where we're going | The goal or strategy for the next period |
| 4 | Why this direction | The reasoning — make the logic visible |
| 5 | What changes | Specific decisions or direction changes |
| 6 | What stays the same | Anchors — what people can count on |
| 7 | The plan | Priorities, owners, timeline |
| 8 | How to ask questions | Feedback channel, Q&A, follow-up |

---

## How to write each slide

For every slide, produce:

```
Slide N: [Title — the one-sentence claim of this slide]

Talking points:
- [Key point 1]
- [Key point 2]
- [Key point 3 — max 3 per slide for live presentations]

Key data / visual: [What should be on this slide visually — chart, screenshot, table, single number]

Presenter note: [What the presenter needs to say that's NOT on the slide]
```

## Slide title rules

The title is the claim, not the topic.

| Weak (topic) | Strong (claim) |
|---|---|
| "Revenue" | "ARR hit $2M — up 40% QoQ" |
| "The problem" | "Enterprises lose $200K/year to manual reconciliation" |
| "Our team" | "We've done this before — twice" |
| "Next steps" | "Two decisions needed by Friday" |

## Narrative flow test

Read the slide titles in sequence. They should tell the story without the slides. If the titles don't flow as an argument, the structure is wrong. Fix the structure before writing the content.

## Anti-patterns

| Pattern | Fix |
|---------|-----|
| Slides with 6+ bullet points | One claim per slide. Excess becomes speaker notes. |
| Weak titles that name the topic | Titles should make the claim |
| No "ask" or decision slide at the end | Every presentation ends with what you need from the audience |
| Data without context | "Revenue grew 40%" not "Revenue: $2M" |
| Deck built as a document | If it needs to be read top to bottom, write a doc |

## What this skill does NOT do

- Visual design, layout, or color — use a designer or `/design`
- Actual slide creation in PowerPoint/Google Slides — this outputs an outline
- Financial modeling — use `/finance` for the numbers, then bring them here
- Copywriting for marketing decks — use `/pcp-engine` for conversion-focused copy
