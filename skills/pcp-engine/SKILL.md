---
name: pcp-engine
description: Use when building landing pages, auditing conversion copy, writing email sequences, social posts, or any persuasive content that needs to resonate rather than direct. Triggers on requests involving ICP targeting, conversion optimization, landing page creation, copy audits, perception shifting, micro-compliance, or SEO-friendly persuasive writing.
---

# Dual-PCP Conversion Engine

## Core Philosophy

> "Language should be resonating, not directing."

This skill creates conversion copy (landing pages, emails, posts) by entering the reader's **current mental model**, reframing their perception of the problem, establishing new context, and granting them permission to act. The reader's decision should feel **self-generated**, not pushed.

**Dual-PCP** blends two frameworks:
- **Behavioral PCP** (Internal): Perception → Context → Permission (psychological cascade)
- **Structural PCP** (External): Problem → Cause → Prescription (page architecture)

Both layers work together. The behavioral layer discovers *what to say*. The structural layer determines *where and how to say it*.

---

## When to Use

- Building a new landing page from scratch
- Auditing an existing landing page, email, or sales copy
- Writing email sequences that convert
- Creating social media copy that drives action
- Any persuasive content targeting a specific ICP
- Rewriting copy that "directs" into copy that "resonates"

## When NOT to Use

- Pure informational content (documentation, FAQs)
- Technical writing without a conversion goal
- Brand storytelling without a CTA

---

## Operating Modes

### Mode: BUILD
Generate new conversion copy from inputs (ICP, offer, industry, keywords).

### Mode: AUDIT
Stress-test existing copy against the PCP framework and return a scored report with rewrites.

### Mode: REFINE
Take existing draft through iterative PCP refinement loop (used after BUILD or AUDIT).

---

## STEP 0: CLARIFYING QUESTIONS (MANDATORY)

**Before writing a single word, the agent MUST extract these inputs.** If any are missing, ask. Do not guess. Do not skip.

### Required Inputs

```
1. MODE: build | audit | refine
2. CONTENT TYPE: landing-page | email | social-post | ad-copy | sales-page
3. INDUSTRY: What industry/vertical?
4. ICP (Ideal Customer Profile):
   - Role/title
   - Company size/stage
   - Daily frustrations
   - What they've already tried
   - What they believe is the problem (the "Broken Story")
5. OFFER: What are we selling/promoting?
6. PRIMARY KEYWORD: (for SEO — landing pages only)
7. SECONDARY KEYWORDS: (optional, for SEO depth)
8. MARKET AWARENESS STAGE:
   - Unaware: doesn't know they have a problem
   - Problem-aware: knows the pain, not the solution
   - Solution-aware: knows solutions exist, comparing
   - Product-aware: knows your product, needs a push
9. TRAFFIC SOURCE: seo | paid | outbound | social | email
10. TONE: authoritative | conversational | technical | empathetic
11. EXISTING COPY: (for audit/refine modes — paste URL or text)
12. NUMBER OF VARIANTS: How many versions to generate? (default: 1)
```

### Clarifying Question Protocol

Ask questions in **batches of 3-5**, not all at once. Start with the most critical:

**Batch 1 (Identity):**
- What's the mode? (build/audit/refine)
- Who is the ICP? (role, pain, what they've tried)
- What's the offer?

**Batch 2 (Context):**
- What industry?
- Where is traffic coming from?
- What awareness stage?

**Batch 3 (Refinement):**
- Primary keyword?
- Desired tone?
- How many variants?

If the user provides a URL or existing copy, switch to audit mode automatically unless told otherwise.

---

## PHASE 1: BEHAVIORAL PCP (Internal Modeling)

This phase happens BEFORE any copy is written. It produces the psychological blueprint.

### 1.1 PERCEPTION — Extract the Current Frame

**Task:** Identify the ICP's "Broken Story" — what they tell themselves about why things aren't working.

**Agent must determine:**

| Element | Question | Example |
|---------|----------|---------|
| Current Belief | What do they think is wrong? | "We need more leads" |
| False Cause | What do they blame? | "Our marketing team isn't good enough" |
| Emotional State | What are they feeling? | Frustration, confusion, skepticism |
| Identity Hook | Who do they believe they are? | "We're a scrappy team doing everything right" |
| Internal Script | What autopilot narrative is running? | "If I just work harder, results will come" |

**Output — Perception Map:**
```yaml
perception_map:
  broken_story: ""
  false_cause: ""
  emotional_state: []
  identity_hook: ""
  internal_script: ""
  new_frame: ""  # The shifted perception we'll introduce
```

### 1.2 PERCEPTION SHIFT — Design the Reframe

**Rules:**
- ALWAYS acknowledge before reframing
- NEVER contradict directly
- Must feel like an observation about the world, NOT aimed at the reader

**Pattern:**
```
Acknowledge → Align → Slight Reframe → New Lens
```

**Techniques available:**

| Technique | When to Use | Pattern |
|-----------|-------------|---------|
| Negative Dissociation | Separate reader from failure | "It's not that you're doing X wrong... it's that Y changed" |
| Script Surfacing | Weaken autopilot resistance | "You've probably been told..." / "The conventional wisdom says..." |
| Identity Alignment | Covert "I am" commitment | Describe admirable group + trait, reader self-assigns |
| Frame Setting | Define what this interaction means | "This isn't about selling... it's about showing you what changed" |

**Example Perception Shift:**
> "You're already putting in the work. You're publishing. You're optimizing. The problem isn't effort — it's that the rules of how customers discover businesses have quietly changed. And nobody told you."

### 1.3 CONTEXT — Establish the "Why Now"

**Task:** Introduce a systemic shift that makes inaction costly. Use **novelty** to hijack attention.

**Agent must inject ONE of these context triggers:**

| Trigger Type | Description | Example |
|-------------|-------------|---------|
| Technology Shift | New tech made old ways obsolete | "AI-generated content flooded search in 2025" |
| Market Shift | Buyer behavior fundamentally changed | "B2B buyers now complete 80% of research before talking to sales" |
| Regulatory Shift | New rules changed the game | "Privacy regulations killed third-party tracking" |
| Competitive Shift | Industry dynamics flipped | "Your competitors adopted X six months ago" |
| Algorithm Shift | Platform rules changed | "Google's latest update penalizes thin content" |

**Output — Context Blueprint:**
```yaml
context_blueprint:
  trigger_event: ""
  why_now: ""
  consequence_of_inaction: ""
  novelty_factor: ""  # What's genuinely new/surprising
```

### 1.4 PERMISSION — Remove the Barrier

**Task:** Identify what prevents action and grant psychological release.

**Common barriers:**

| Barrier | Fear | Permission Language |
|---------|------|-------------------|
| Failure anxiety | "What if it doesn't work?" | "You can test this without committing to anything" |
| Social judgment | "What will people think?" | "The smartest operators in your space are already doing this" |
| Sunk cost | "I've invested so much in the current way" | "What you built isn't wasted — it's the foundation" |
| Complexity | "This seems too hard" | "It's one change, not a complete overhaul" |
| Cost | "Can I afford this?" | "Compare it to what inaction is costing you monthly" |

**Output — Permission Map:**
```yaml
permission_map:
  primary_barrier: ""
  secondary_barriers: []
  permission_statements: []
  identity_permission: ""  # "You're the kind of person/team that..."
```

---

## PHASE 2: STRUCTURAL PCP (Page Architecture)

This phase maps the psychological blueprint to physical page sections.

### SECTION 1: HERO (Perception Alignment)

**Purpose:** Enter the reader's river. Make them feel "this page gets me."

| Element | Rule | Anti-Pattern |
|---------|------|-------------|
| H1 | Resonance statement with primary keyword. NOT a command. | "Buy Our Tool" |
| Subheadline | Expand the contradiction between effort and results | Generic value prop |
| Micro-compliance line | One small "yes" moment | Jumping to features |
| Hero CTA | Low commitment, curiosity-driven | "Sign Up Now" |

**H1 Formula:**
```
[Acknowledge their effort/identity] + [but/yet] + [the real issue they haven't seen]
```

**Examples by awareness stage:**

| Stage | H1 Pattern |
|-------|-----------|
| Unaware | "The Hidden Shift That's Quietly Changing [Industry]" |
| Problem-aware | "You're [Doing The Right Things] — Here's Why [Results Aren't Coming]" |
| Solution-aware | "Most [Solutions] Fix the Symptom. This Fixes the Cause." |
| Product-aware | "[Product] — Built for [ICP Identity], Not [Generic Audience]" |

### SECTION 2: MICRO-COMPLIANCE CHAIN (Problem Expansion)

**Purpose:** Get 3-5 internal "yes" responses before any ask.

**Structure:**
```
Observation (yes) →
Observation (yes) →
Observation (yes) →
Contrast (wait, what?) →
Curiosity gap (tell me more)
```

**Rules:**
- Each statement must be independently true
- Each must feel like an observation, not a pitch
- The contrast must create genuine cognitive tension
- Never ask for agreement explicitly ("Right?" "Don't you agree?")

**Example chain for B2B SaaS:**
1. "You're investing in content marketing." (yes)
2. "Your team is publishing consistently." (yes)
3. "You're tracking the right metrics." (yes)
4. "But organic traffic has been flat for months." (wait...)
5. "Here's what changed — and why your current playbook can't account for it." (tell me more)

### SECTION 3: CAUSE (Context Shift)

**Purpose:** Shift blame from the reader to a systemic change.

| Element | Rule |
|---------|------|
| H2 | Long-tail keyword as "Why" or "How" question |
| Body | Explain the systemic failure with specifics |
| Tone | Educational, not alarmist |
| Evidence | Data point, trend, or industry shift |

**H2 Formula:**
```
"Why [Old Approach] [Stopped Working / Isn't Enough] in [Current Year]"
```

**Key technique — Negative Dissociation:**
> "It's not that your [effort/strategy/team] is [failing/wrong]. It's that [external system] has [changed/shifted/evolved] — and [the old playbook/conventional wisdom] hasn't caught up."

### SECTION 4: REFRAME (New Perception)

**Purpose:** Install the new frame that makes your solution the logical next step.

**Pattern:**
```
Old Way (what they've been doing) →
Why It Fails (the systemic reason) →
New Way (what the solution addresses) →
Why It Works (connected to the context shift)
```

**Rules:**
- The "New Way" should feel inevitable given the context
- Never position it as "our product" — position it as "the approach"
- Use third-person proof: "Teams that made this shift saw..."

### SECTION 5: PRESCRIPTION (Permission + Solution)

**Purpose:** Present the solution as a natural next step, not a pitch.

**Rules:**
- DO NOT hard sell
- Frame as the inevitable conclusion of the argument
- Use permission language
- Connect to identity: "You're already the kind of [team/person] that..."

**Language patterns:**
- "Now you can..."
- "You're in a position to..."
- "The teams that act on this early..."
- "Given what you now know..."

### SECTION 6: CTA (Micro-Compliance Close)

**Purpose:** Convert with the lowest possible friction.

| Instead of | Use |
|-----------|-----|
| "Buy now" | "See if your [thing] is affected" |
| "Sign up" | "Get your free [specific audit/report]" |
| "Schedule a demo" | "See how this works for [their industry]" |
| "Subscribe" | "Get the [specific deliverable]" |
| "Contact us" | "Ask us one question — no strings" |

**CTA Formula:**
```
[Action Verb] + [Specific Value] + [For Their Identity]
```

### SECTION 7: SOCIAL PROOF (Identity Reinforcement)

**Purpose:** Reinforce the identity commitment the reader has made.

**Rules:**
- Testimonials should mirror the reader's identity, not just praise the product
- Case studies should show the BEFORE (old perception) → AFTER (new perception) shift
- Logos/names should be aspirational peers, not just big brands

### SECTION 8: FAQ (Objection Dissolution)

**Purpose:** Handle remaining barriers as "permission questions."

**Rules:**
- Each FAQ should be a real barrier disguised as a question
- Answers should grant permission, not argue
- Include SEO long-tail keywords naturally

---

## PHASE 3: SEO OVERLAY (Landing Pages Only)

### Keyword Architecture

```yaml
seo_map:
  primary_keyword: ""          # H1 + title tag + meta
  secondary_keywords: []        # H2s + body
  intent_keywords:
    informational: []           # "why" / "how" questions
    transactional: []           # "best" / "top" / "vs"
    navigational: []            # brand + feature terms
  lsi_terms: []                 # Semantically related
```

### On-Page Rules

| Element | Rule |
|---------|------|
| Title Tag | Primary keyword + perception shift (under 60 chars) |
| Meta Description | Micro-compliance hook (under 155 chars) |
| H1 | Primary keyword + resonance statement |
| H2s | Secondary keywords as "Why/How" questions |
| Body | Natural keyword density, never forced |
| Image Alt | Descriptive + keyword where natural |
| URL Slug | Primary keyword, short, hyphenated |
| Schema | FAQ schema for objection section, Organization/Product schema |
| Internal Links | Link to supporting content (blog, case studies) |

### Content Depth Requirements

For SEO landing pages, include these expansion blocks:

1. **"What Changed" Block** — Explains the context shift (builds topical authority)
2. **"Common Mistakes" Block** — Lists what the ICP has tried (captures long-tail)
3. **"How to Check" Block** — Interactive/diagnostic content (drives engagement)
4. **FAQ Block** — 5-8 questions with schema markup

---

## PHASE 4: MICRO-COMPLIANCE ENGINE

### Chain Construction Rules

Every piece of copy (landing page, email, post) must include a micro-compliance chain.

**Chain anatomy:**
```yaml
chain:
  step_1:
    type: agreement
    content: "Obvious truth the reader will nod to"
  step_2:
    type: shared_frustration
    content: "Something they've experienced and feel validated hearing"
  step_3:
    type: identity_alignment
    content: "Covert 'I am' statement — describe an admirable group, reader self-assigns"
  step_4:
    type: curiosity_gap
    content: "Contrast or question that creates tension"
  step_5:
    type: low_friction_cta
    content: "Small ask that feels like natural next step"
```

**Rules:**
- Minimum 3 steps before ANY ask
- Each step must be independently true
- Never make the compliance explicit ("You agree, right?")
- The CTA should feel like relief from the curiosity gap, not a new demand

### Adaptation by Content Type

| Content Type | Chain Length | CTA Type |
|-------------|-------------|----------|
| Landing page | 5-7 steps | Diagnostic/audit CTA |
| Email | 3-5 steps | Reply or single click |
| Social post | 2-3 steps | Comment or save |
| Ad copy | 2-3 steps | Click-through |
| Sales page | 7-10 steps | Purchase or trial |

---

## PHASE 5: ITERATIVE REFINEMENT LOOP

**Every output goes through refinement. The agent MUST iterate, not ship first drafts.**

### Loop Protocol

```
FOR each variant (1 to N):
  1. Generate initial draft using Phases 1-4
  2. Run AUDIT checks (see below)
  3. Log version with scores
  4. Identify weakest section
  5. Rewrite weakest section only
  6. Re-run AUDIT checks
  7. Log new version with scores
  8. REPEAT until all scores >= 7/10 OR 3 iterations reached
  9. Present final version with change log
```

### Version Log Format

```yaml
version_log:
  variant: 1
  iteration: 1
  timestamp: ""
  scores:
    resonance_vs_direction: 0  # 1-10
    perception_shift_clarity: 0
    context_urgency: 0
    permission_presence: 0
    micro_compliance_chain: 0
    seo_alignment: 0           # landing pages only
    identity_encoding: 0
    overall: 0
  weakest_section: ""
  changes_made: ""

  # Next iteration...
```

### Audit Checklist (Applied Each Iteration)

| Check | Question | Pass Criteria |
|-------|----------|--------------|
| Resonance | Does the H1 resonate or direct? | Reader thinks "this gets me," not "they want my money" |
| Perception Shift | Is there a clear before/after frame? | Old belief → New lens is explicit |
| Context | Is there a "Why Now" trigger? | Specific, novel, verifiable |
| Permission | Are barriers addressed? | At least 2 permission statements |
| Micro-Compliance | Are there progressive agreements? | 3+ "yes" moments before CTA |
| Identity | Does copy encode identity? | Reader self-assigns to aspirational group |
| Script Surfacing | Are internal scripts called out? | At least 1 "you've been told..." moment |
| Non-Performative | Does it feel like truth or marketing? | No hype words, no exclamation marks in body |
| SEO | Keywords natural and well-placed? | Primary in H1, secondaries in H2s |
| CTA | Is the CTA low-friction? | Value-first, not command-first |

### Scoring Guide

| Score | Meaning |
|-------|---------|
| 1-3 | Fundamentally broken — rewrites needed |
| 4-6 | Functional but generic — lacks PCP depth |
| 7-8 | Strong — PCP framework applied well |
| 9-10 | Elite — would study this as a case study |

---

## AUDIT MODE (Stress Test an Existing Page)

When auditing existing copy, run these 5 tests:

### Test 1: Resonance vs Direction
- Read the first 3 lines. Do they enter the reader's world or push a product?
- **Fail:** Copy starts with features, commands, or "we" statements
- **Pass:** Copy starts with the reader's experience, frustration, or identity

### Test 2: Contextual "Why Now"
- Is there a novel, specific reason to act today?
- **Fail:** Generic urgency ("limited time") or no urgency at all
- **Pass:** Specific industry/technology/market shift that's verifiable

### Test 3: Permission Layer
- Does the copy remove guilt, fear, or confusion?
- **Fail:** Copy creates pressure without release
- **Pass:** At least 2 permission-granting statements

### Test 4: Micro-Compliance Chain
- Are there progressive agreements leading to the CTA?
- **Fail:** Jumps from headline to CTA, or uses only logical arguments
- **Pass:** 3+ observation-based "yes" moments before the ask

### Test 5: SEO Integrity (Landing Pages)
- Is keyword placement natural and complete?
- **Fail:** Keyword stuffing, missing from H1/H2s, no schema
- **Pass:** Primary keyword in H1, secondaries in H2s, FAQ schema present

### Audit Output Format

```yaml
audit_report:
  url_or_title: ""
  overall_score: 0  # /10

  test_results:
    resonance_vs_direction:
      score: 0
      finding: ""
      rewrite_suggestion: ""

    contextual_why_now:
      score: 0
      finding: ""
      rewrite_suggestion: ""

    permission_layer:
      score: 0
      finding: ""
      rewrite_suggestion: ""

    micro_compliance:
      score: 0
      finding: ""
      rewrite_suggestion: ""

    seo_integrity:
      score: 0
      finding: ""
      rewrite_suggestion: ""

  priority_fixes:
    1: ""
    2: ""
    3: ""

  full_rewrite_available: true  # Offer to rewrite in BUILD mode
```

---

## CONTENT TYPE ADAPTATIONS

### Email Sequences

**Structure per email:**
1. Subject line = Micro-compliance opener (curiosity, not clickbait)
2. Opening line = Enter their river (acknowledge current state)
3. Body = 1 perception shift + 1 context point
4. Close = Permission + micro-CTA (reply, click, read)

**Sequence arc (3-5 emails):**
```
Email 1: Perception (enter their world, shift one belief)
Email 2: Context (introduce the "why now")
Email 3: Permission (remove the barrier, low-friction CTA)
Email 4: Identity (social proof that mirrors their identity)
Email 5: Prescription (the offer as inevitable next step)
```

### Social Posts

**Structure:**
1. Hook = Perception shift in one line
2. Body = 2-3 micro-compliance observations
3. Close = Curiosity gap or identity statement
4. CTA = Comment, save, or link click

**Rules:**
- No "I" in the first line
- No exclamation marks
- Sound like an observation, not a pitch
- Under 280 chars for the hook

### Ad Copy

**Structure:**
1. Headline = Resonance statement (NOT feature)
2. Body = One micro-compliance chain (2-3 steps)
3. CTA = Value-first ("See if..." not "Sign up for...")

---

## ADVANCED TECHNIQUES

### Identity Encoding

Every piece of copy should subtly answer: "What kind of person takes this action?"

**Pattern:**
- Describe an admirable group and assign the desired trait
- Reader self-assigns without being told
- Never aim language directly at the reader

**Example:**
> "The operators who figured this out early didn't have more resources. They just stopped following the playbook everyone else was using."

Reader thinks: "I'm that kind of operator."

### Script Surfacing

Call out internal narratives to weaken their power:

**Patterns:**
- "You've probably been told that..."
- "The conventional wisdom says..."
- "Most people in [industry] assume..."
- "There's this persistent belief that..."

Then introduce the reframe.

### Context Engineering

Don't ask someone to buy. Create a world where buying is the obvious move.

**Instead of:** "Buy this because it's good."
**Create:** A context where NOT buying requires justification.

**How:** Stack enough perception shifts + context triggers + permission statements that the CTA is relief, not a new demand.

### Non-Performative Tone

The copy must feel like truth, not marketing.

**Rules:**
- No hype words (revolutionary, game-changing, amazing)
- No exclamation marks in body copy
- No false urgency ("Only 3 spots left!")
- Admit limitations where authentic
- Use specific numbers over vague claims
- Write like you're explaining to a smart friend, not selling to a stranger

---

## OUTPUT FORMAT

### For BUILD Mode

```
## PCP Blueprint
[Perception Map + Context Blueprint + Permission Map]

## Landing Page / Email / Post
[Full copy organized by sections]

## SEO Keyword Map (if applicable)
[Primary, secondary, intent keywords]

## Micro-Compliance Chain
[Numbered chain with annotations]

## Version Log
[Iteration history with scores]
```

### For AUDIT Mode

```
## Audit Report
[5-test results with scores]

## Priority Fixes
[Top 3 changes ranked by impact]

## Suggested Rewrites
[Section-by-section improvements]

## Offer: Full Rewrite
[Ask if they want BUILD mode applied]
```

---

## RED FLAGS — Copy That Violates PCP

If you catch yourself writing any of these, STOP and rewrite:

| Red Flag | Problem | Fix |
|----------|---------|-----|
| "We are the leading..." | Directing, not resonating | Start with reader's experience |
| "Buy now / Sign up today" | Command, not permission | "See if [value proposition]" |
| "Don't miss out!" | False urgency | Use real context shift instead |
| Feature list as hero | Product-first, not reader-first | Lead with perception shift |
| "I/We" in first paragraph | Self-centered framing | "You" or third-person observation |
| Exclamation marks in body | Hype tone | Remove. Period. |
| Generic testimonials | "Great product!" | Identity-mirroring proof |
| No "why now" | Missing context trigger | Add specific systemic shift |
| CTA before micro-compliance | Premature ask | Build chain first |
| Aimed language | "You are the kind of person..." | Third-person group attribution |

---

## QUICK REFERENCE — PCP Cheat Sheet

```
BEHAVIORAL PCP (What to Say):
P = Perception  → What broken story are they telling themselves?
C = Context     → What systemic shift makes "why now" urgent?
P = Permission  → What fear/guilt prevents action?

STRUCTURAL PCP (Where to Say It):
P = Problem     → Hero section (resonance + micro-compliance)
C = Cause       → Context section (negative dissociation + novelty)
P = Prescription → Solution section (permission + low-friction CTA)

MICRO-COMPLIANCE CHAIN:
Agreement → Frustration → Identity → Curiosity → CTA

KEY RULES:
- Resonate before persuading
- Acknowledge before reframing
- Grant permission before asking
- 3+ "yes" moments before any CTA
- Sound like truth, not marketing
```
