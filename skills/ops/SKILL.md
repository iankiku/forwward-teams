---
name: ops
description: (forwward) Writes operational artifacts for non-technical and cross-functional teams — SOPs, process docs, runbooks, workflow guides, handoff and escalation docs. Use when the user says "write an SOP", "document this process", "create a runbook", "how do we handle", "onboarding doc", "escalation process", or describes a repeatable workflow they want written down. Works for CS, ops, finance, HR, sales, support.
---

# Ops

## Core principle

A process document exists to transfer knowledge from the person who knows how to do something to the person who doesn't — without that person needing to ask. If someone has to ask a follow-up question after reading it, the doc failed. Write for the new hire on their first day, not for the expert who already knows the steps.

## Step 1: Understand the process before writing

Ask these before drafting:

1. **What triggers this process?** (What event or condition kicks it off?)
2. **Who does it?** (Role, not person — people leave, roles stay)
3. **What does "done" look like?** (The specific outcome or deliverable)
4. **What are the top 2-3 ways it goes wrong?** (Edge cases, failure modes)
5. **Where does it live?** (Which tool, system, or channel)

If the user has described these (or most of them), proceed. Otherwise ask for the one that's blocking.

## Step 2: Choose the format

| Use this | When |
|----------|------|
| **SOP** | Formal, compliance-relevant, or high-stakes process that needs version control and sign-off |
| **Process doc** | Everyday team workflow — informal, living document, quick to update |
| **Runbook** | Step-by-step guide for a specific incident or operational scenario (often under pressure) |
| **Handoff doc** | Transfers ongoing work from one person to another — context-heavy, time-sensitive |
| **Onboarding guide** | Orients a new team member to a role or workflow |

If the user doesn't specify, default to **process doc** for general requests and **runbook** for incident/ops-under-pressure scenarios.

---

## SOP Format

```
SOP: [Title]
Version: [1.0]
Owner: [Role]
Last updated: [Date]
Approved by: [Name / Role]

---

## Purpose
[One sentence: what this process accomplishes and why it exists]

## Scope
[Who this applies to. Who it does NOT apply to.]

## Trigger
[What event or condition starts this process]

## Steps

1. [Step — active voice, clear actor]
   - Detail or sub-step if needed
   - Tool or system: [name]

2. [Step]
   ...

## Completion criteria
[How you know the process is done]

## Exceptions and escalation
[Edge cases. Who to contact if something falls outside this process.]

## Related docs
[Links to relevant templates, tools, or policies]
```

---

## Process Doc Format

Lighter than an SOP. Used for everyday team workflows.

```
## [Process name]

**What it is:** [One sentence]
**Who does it:** [Role]
**When:** [Trigger or schedule]
**Tools:** [List]

### Steps

1. [Step]
2. [Step]
3. [Step]

### What "done" looks like
[Specific outcome or deliverable]

### Common mistakes
- [Mistake and how to avoid it]

### Questions? Ask [Role or channel]
```

---

## Runbook Format

For operational tasks run under time pressure (incidents, deployments, escalations).

```
## Runbook: [Title]

**Use when:** [Trigger scenario]
**Time to complete:** [Estimate]
**Owner:** [Role]

---

### Pre-checks
- [ ] [Confirm X before starting]
- [ ] [Confirm Y]

### Steps

**Step 1: [Title]**
Do: [Specific action]
Tool: [System or link]
Expected result: [What you should see]
If it fails: [What to do instead]

**Step 2: [Title]**
...

### Post-checks
- [ ] [Verify outcome A]
- [ ] [Notify stakeholder B]

### Escalation
If unresolved after [time]: contact [Role] via [channel].
```

---

## Handoff Doc Format

When someone is leaving a role, going on leave, or transitioning work.

```
## Handoff: [Role / Project]

**From:** [Name]
**To:** [Name or TBD]
**Date:** [Handoff date]

---

### What I own
[List of active responsibilities, projects, and recurring tasks]

### In-flight work
| Item | Status | Next action | Deadline | Notes |
|------|--------|-------------|----------|-------|
| ... | ... | ... | ... | ... |

### Key relationships
| Person | Company / Role | Why they matter | How to reach them |
|--------|---------------|-----------------|-------------------|
| ... | ... | ... | ... |

### Where things live
| Resource | Location | Notes |
|----------|----------|-------|
| ... | ... | ... |

### Gotchas and things I wish I'd known earlier
- [Non-obvious thing 1]
- [Non-obvious thing 2]

### Open loops (things I didn't finish)
- [Item and context]
```

---

## Writing principles for all ops docs

**Active voice, named roles.** "The CS manager reviews the ticket" not "tickets are reviewed."

**Numbered steps for sequential processes.** Bullets for unordered lists. Never mix them.

**One action per step.** "Log in to Stripe, navigate to Customers, and export the CSV" is three steps. Write them as three steps.

**Specify the tool, not just the action.** "Send the invoice" is incomplete. "Send the invoice via QuickBooks → Sales → Invoices" is usable.

**Include expected outcomes.** After each step, describe what the person should see or have when that step is complete. This turns a vague list into a self-verifying checklist.

## Anti-patterns

| Pattern | Fix |
|---------|-----|
| Writing for the expert, not the new hire | Add the "obvious" detail — it's not obvious to everyone |
| Steps with no owner | Every step has a named role |
| No "what done looks like" | Always include completion criteria |
| No escalation path | If it can go wrong, say who to call |
| Doc that lives only in someone's head | Write it down, link to it from the team wiki |

## When NOT to use

- Technical runbooks for infrastructure incidents → use `/devops`
- Architecture or system design docs → use `/architect` or `/technical-writer`
- Hiring process documentation → use `/hire`
- Legal or compliance policies → use `/legal`
- Personal productivity systems → not a team process, no skill needed
