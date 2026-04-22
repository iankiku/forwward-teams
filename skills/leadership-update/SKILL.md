---
name: leadership-update
description: (forwward) Writes status updates leaders actually read — outcome-first, with options + lean for blockers. Always invoke for: "write an update for [name/team/client]", "status report", "progress update", "weekly update", "standup note", "executive summary", "update on [project]", "what do I tell [person] about [X]". Also invoke proactively when the user pastes project details without saying what to do — they probably want an update drafted. Pulls from git log, open PRs, project tracker, and meeting notes, then applies the outcome-reasoning-next structure with a clear ask at the end. Not for PRDs, postmortems, or peer engineering discussion.
---

# Leadership Update

## Core principle

Leaders don't remember data. They remember clarity. Start with the outcome, not the activity. Every update earns its length. If a sentence doesn't move the reader toward a decision or a clearer picture of state, cut it.

## Step 1: Gather context before writing anything

Pull from these four sources. Ask for what's missing rather than guessing — guessing produces vague updates, and vague updates damage credibility faster than bad news.

1. **Codebase**: `git log --oneline -20`, open PRs, branches with recent activity, test status
2. **Project tracker** (Notion, Linear, GitHub Projects): what shipped, what's in flight, what slipped since last update
3. **Meetings**: decisions made, blockers raised, commitments made since last update (transcripts, notes, Slack threads)
4. **Prior update**: what was told to this person last time, so the update neither contradicts nor repeats

## Step 2: Choose the mode

### Mode 1: Progress update (things are moving)

Use when work is on track or course-correcting without help needed.

```
Outcome:   "We're on track to ship the Bedrock RAG MVP by Friday."
Reasoning: "Ingestion and retrieval are done. Eval runs clean on the PNM corpus at 87% accuracy."
Next:      "Wiring the UI this week. Demo to leadership Thursday."
Ask:       "Nothing needed from you. I'll flag early if the demo slot needs to shift."
```

### Mode 2: Blocker update (a decision is needed)

Use when work is stuck and a decision unblocks it. Still outcome-first — the outcome is "we're stuck, here's the shape of it."

```
Problem:  "We've hit a blocker with the UCP checkout proxy: Stripe webhook timing conflicts with SD-JWT mandate verification."
Options:  "Two paths: (A) verify post-confirmation, adds 200ms latency, or (B) pre-verify with shorter TTL, adds infra complexity."
Lean:     "I'm leaning A. Latency is recoverable, infra complexity isn't."
Ask:      "Need your call by Thursday to stay on timeline."
```

Rules for blocker mode:
- Always present exactly 2 options. More than 2 means it hasn't been thought through.
- Always state the lean. Never dump the raw decision on the reader.
- Always give a deadline. Open-ended asks sit forever.

## Step 3: Apply the structure (three beats, always)

Every update, regardless of channel or length, follows this order:

1. **Where we are** — the outcome or current state, in one line
2. **What informed that** — the reasoning, the data, the why
3. **What happens next** — the timeline, the next move

Then end with the ask.

## Step 4: Calibrate for the channel

Same structure, different shape per channel.

| Channel | Format |
|---|---|
| Slack message | 3-5 sentences. No bold, no headers. One paragraph. **Hard ceiling: 80 words.** If the reasoning sentence pushes you over, cut it to one clause. |
| Email | Subject line = the outcome. Body = three beats + ask. Under 150 words. |
| Standup / verbal | 30–45 seconds, spoken in the same order. |
| Written status report | Opening paragraph = three beats on one screen. Depth sections come after, not before. |
| Investor or board update | Three beats per workstream, grouped. Still outcome-first per line. |

## Step 5: Write the mandatory ask

Every update ends with exactly one of these, explicit:

- "Nothing needed from you, just keeping you informed."
- "Need a decision on X by [date] to stay on track."
- "Want your read on Y if you have 10 minutes this week."
- "Flagging so you're not surprised when Z hits your inbox."

Leaders are juggling 20 things. Make the role they play here obvious. No ambiguous asks.

## Templates

### Progress mode

```
[One-line outcome or state]

[1-2 sentences: what drove that, what the data shows, what changed since last update]

[1 sentence: what's next and by when]

[Explicit ask: "Nothing needed" OR "Need decision on X by [date]" OR "Want your read on Y"]
```

### Blocker mode

```
[One-line statement of the blocker in outcome terms]

[2 sentences: option A with tradeoff, option B with tradeoff]

[1 sentence: lean and the one-line reason]

[Ask with deadline: "Need your call by [date]"]
```

## Worked examples

### Weekly update to Shawn (Team Nebula CEO)

```
RS21 engagement is on track for the Friday demo.

Core RAG pipeline is deployed on Bedrock, PNM corpus indexed, eval accuracy at 87% (ahead of the 80% committed in the SOW).

This week: UI polish Tuesday, internal dry run Thursday, client demo Friday 10am CT.

Nothing needed from you. I'll flag early if the demo slot needs to shift.
```

### Blocker update to Shawn

```
Decision needed on the RS21 scope before Friday.

Client wants SSO added to the v1 deliverable. Two options: (A) include it, pushes demo to the following Friday and burns a week of margin, or (B) scope it to v1.1, ship Friday on the current contract.

Leaning B. Protects the milestone and the margin, and SSO is a clean v1.1 story.

Need your call by EOD Wednesday so I can respond to their PM.
```

### Client update to RS21

```
PNM deployment is ready for your review Thursday.

We're at 87% retrieval accuracy against your eval set, 40% faster than the baseline you shared, and the audit log schema matches the compliance doc you sent last week.

Thursday's session will walk through the pipeline, the evals, and the operator runbook. Recording available after.

No prep needed from your side. If you want any specific queries tested live, send them by Tuesday.
```

### Blocker update to an advisor or investor

```
Hit a scope decision on AgentsAuthority that could use your take.

The WooCommerce plugin works, but bundling the MCP server doubles install complexity. I can (A) ship MCP as a separate optional module, keeps v1.2 clean but fragments the story, or (B) bundle it, heavier onboarding but one narrative.

Leaning A. Protects time-to-first-value for the long tail of WooCommerce stores.

If you have 10 minutes this week, would value your read.
```

### Standup to the team (verbal, same spine)

> "RS21 pipeline is green, hitting eval targets. Last blocker was the Stripe webhook timing, resolved yesterday with post-confirmation verification. This week I'm on UI polish and the Thursday dry run. Nothing blocking me right now."

## Anti-patterns — cut on sight

| Pattern | Fix |
|---|---|
| Leading with activity: "We've been working on..." | Lead with the state you're in now |
| Burying the outcome in the last paragraph | Outcome is always sentence one |
| Task lists / standup dumps | Leaders want state, not a sprint backlog |
| No ask at the end | Every update ends with a named ask or "nothing needed" |
| Qualifier padding: "It seems like we might possibly be close to..." | Say it or don't |
| Decision-irrelevant technical detail | If it doesn't change a choice, cut it |
| Passive voice for bad news: "A delay was encountered" | Own it in first person |

## Sharpening vague phrases

| Vague | Sharp |
|---|---|
| "Almost done" | "Shipping Thursday, one blocker on X" |
| "Making good progress" | "Cut the flow from 14 days to 7" |
| "Looking into it" | "Investigating, decision by Friday" |
| "Working on the pitch" | "Deck v3 lands Wednesday, video records Thursday" |
| "There were some issues" | "Hit two issues: A (resolved), B (still open, see below)" |

## Final check before handing the draft to Ian

1. Can the reader tell the current state from the first sentence alone?
2. Is there exactly one ask, with a named owner and a deadline (or an explicit "nothing needed")?
3. Was every sentence that doesn't change a decision or update a picture of state cut?
4. Would a busy CEO read this in 20 seconds and know what to do?

If any answer is no, rewrite.

## When NOT to use this skill

This skill is for updates. Not for:

- PRDs, architecture docs, or specs (those earn their length)
- Postmortems (different structure, root cause first)
- Pitch decks or proposals (different genre)
- Peer technical discussion (depth over compression)

If the stakeholder has explicitly asked for depth, give it — but the opening paragraph still follows the three beats.
