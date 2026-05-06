---
name: hire
description: (forwward) Writes hiring artifacts — job descriptions, interview rubrics, scorecards, structured questions, and offer letter templates. Use when the user says "write a JD", "interview questions for", "hiring rubric", "scorecard", "offer letter", "hiring process", or describes a role they need to fill (even without saying "hire"). Works for any role: technical or non-technical, IC or leadership, FT or contractor.
---

# Hire

## Core principle

A job description is a filter, not a wish list. A rubric is a commitment device, not a checklist. The goal of hiring artifacts is to make good decisions consistently — before the candidate walks in the room, not during the debrief when recency bias has already won.

## Step 1: Understand the role before writing anything

Ask these questions before producing any artifact. A JD written without answers to these produces a generic, forgettable post.

1. **What does this person own?** Not tasks — outcomes. What will they be accountable for in 90 days? In a year?
2. **What's the team and reporting structure?**
3. **What stage is the company / team?** Early startup vs. scaled org changes what "good" looks like.
4. **What's the honest must-have vs. nice-to-have?** Most JDs over-specify. Push the user to cut.
5. **What's the compensation range and timeline?**

If the user has answered these (in the message or prior context), proceed. If not, ask for the one or two that are blocking.

## Step 2: Choose the artifact

Produce the artifact the user asked for. If they didn't specify, produce the full hiring kit (JD + rubric + scorecard template).

---

## Job Description

Structure every JD in this order:

```
[Role title] — [Location / Remote]

About us (2-3 sentences — stage, mission, what makes this interesting)

What you'll own (3-5 bullet outcomes, not tasks)

What we're looking for (must-haves only — 4-6 bullets max)

Nice to have (3 bullets max — or omit entirely)

What we offer (comp range, equity, benefits — honest and specific)

How to apply
```

Rules:
- Lead with outcomes, not requirements. "You'll own our outbound pipeline from cold to close" beats "5+ years of sales experience."
- Must-haves are genuinely blocking. If the person could learn it in 30 days, it's not a must-have.
- Include comp range. Hiding it wastes everyone's time.
- Keep the total under 400 words. Longer JDs get fewer quality applications.

---

## Interview Rubric

A rubric defines what "good" looks like before you meet the candidate. Build it per-role, per-signal.

Structure:

```
Signal: [What you're assessing — e.g., "Structured problem-solving"]
Why it matters for this role: [One sentence]
Strong: [What a strong candidate looks like]
Adequate: [What a passing but not exceptional candidate looks like]
Weak: [What a weak candidate looks like]
Interview question(s): [1-2 questions that surface this signal]
```

For most roles, 4-6 signals is the right number. More than 6 and interviewers can't hold it in their head.

Common signals by role type:
- **IC engineer**: problem decomposition, debugging under ambiguity, ownership, cross-functional communication
- **Engineering manager**: developing people, technical judgment without doing the work, navigating conflict, hiring bar
- **Sales**: discovery discipline, handling objections, pipeline rigor, coachability
- **Ops / CS**: process thinking, written communication, stakeholder management, calm under pressure
- **Executive**: long-range thinking, team building, judgment in ambiguity, board/investor communication

---

## Scorecard Template

Used during or after each interview. One per candidate, one per interviewer.

```
Candidate: [Name]
Role: [Title]
Interviewer: [Name]
Date: [Date]
Stage: [Screen / Technical / Values / Final]

Signal ratings (1-4):
1 = Strong no-hire  2 = Lean no-hire  3 = Lean hire  4 = Strong hire

| Signal | Rating (1-4) | Evidence (specific quote or example) |
|--------|-------------|--------------------------------------|
| [Signal 1] | | |
| [Signal 2] | | |
| [Signal 3] | | |
| [Signal 4] | | |

Overall recommendation: [ ] Strong hire  [ ] Lean hire  [ ] Lean no-hire  [ ] Strong no-hire

One thing that most impressed you:

One thing that would make you hesitate:

Would you work with this person? (Yes / No / Unsure):
```

---

## Offer Letter Template

Keep it clean, factual, and human. Leave the legalese for the contract.

```
[Date]

[Candidate name],

We'd love to have you join [Company] as [Title].

Here's what we're offering:
- Start date: [Date]
- Compensation: [Base salary] per year
- Equity: [X% / X options] vesting over [4 years, 1-year cliff]
- Benefits: [Health, dental, vision / etc.]
- [Any other key terms: signing bonus, remote/hybrid, etc.]

This offer is contingent on [background check / reference check / other].

Please let us know by [deadline — give them at least 3 business days].

We're excited to build with you.

[Your name]
[Title]
```

## Anti-patterns

| Pattern | Fix |
|---------|-----|
| 15 "requirements" on a JD | Cut to 5 must-haves. The rest is noise. |
| "Culture fit" as a signal | Name the actual thing: "collaborative under pressure", "direct feedback style" |
| Scorecard with no evidence column | Ratings without quotes are just vibes |
| Offer with no deadline | Always give a deadline — open-ended offers create anxiety |
| JD that doesn't mention comp | Include the range. It saves time for everyone. |

## When NOT to use

- Detailed people strategy, OKRs, or team structure → use `/ceo` or `/strategy`
- Employment contracts, IP agreements, or equity plan details → use `/legal`
- Onboarding plan for the new hire after they join → use `/ops`
