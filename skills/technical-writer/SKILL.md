---
name: technical-writer
description: (forwward) Writes clear, jargon-free technical documents through a structured discovery and drafting workflow. Interviews the user to determine document type, audience, and purpose before writing. Triggers on writing documentation, user guides, SOPs, runbooks, API docs, README files, process docs, decision records, release notes, or any request to document, explain, or write up something technical.
---

# Technical Writer — Clear Documents, Zero Jargon

Write documents that a smart person outside your field can understand on first read. Interview first, draft second, iterate until the reader can act on it without asking questions.

## Core Principles

1. **Clarity over completeness.** A short document people read beats a long one they don't.
2. **Audience determines everything.** Engineers get code examples. Executives get outcomes. New hires get context.
3. **Jargon is a bug.** If a term needs a glossary entry, rewrite the sentence instead.
4. **Structure is navigation.** Readers scan before they read. Headings, tables, and numbered steps let them find what they need.
5. **Examples prove understanding.** An abstract explanation followed by a concrete example is always better than either alone.

---

## Step 0: Discovery Interview (Mandatory)

Before writing anything, gather these inputs. Ask in conversational batches — not all at once.

**Batch 1 — What and Why:**
- What needs to be documented? (feature, process, system, decision, API, etc.)
- Why does this document need to exist? What problem does it solve?
- Is there existing documentation to update or replace?

**Batch 2 — Who and How:**
- Who is the primary reader? (engineers, customers, executives, new hires, regulators)
- What should the reader be able to DO after reading this?
- How will they find this document? (repo, wiki, shared drive, onboarding packet)

**Batch 3 — Constraints:**
- Any required format or template? (company standard, regulatory, platform-specific)
- Length preference? (quick reference vs comprehensive guide)
- Anything that must NOT be included? (internal details, sensitive data, deprecated info)

If the user provides source material (code, notes, specs), read it before asking questions — answer what the material already tells, only ask what it doesn't.

---

## Step 1: Select Document Type

Based on discovery, select the closest match. Read [references/document-types.md](references/document-types.md) for the template and structure of the selected type.

| Type | When to Use | Audience |
|------|-------------|----------|
| **How-To Guide** | Step-by-step task completion | Users doing the thing |
| **Explainer** | Conceptual understanding | Anyone needing context |
| **API Reference** | Endpoint/method documentation | Developers integrating |
| **SOP / Runbook** | Repeatable operational procedure | Operators, on-call |
| **Architecture Doc** | System design and decisions | Engineers, new team members |
| **Decision Record** | Why a choice was made | Future team, stakeholders |
| **README** | Project entry point | First-time contributors |
| **Release Notes** | What changed and why it matters | Users, customers |
| **Onboarding Doc** | Getting a new person productive | New hires, new team members |
| **Process Doc** | How a recurring workflow works | Team following the process |

If the document doesn't fit a type cleanly, combine elements — but state the primary purpose up front.

---

## Step 2: Draft

### Writing Rules

**Sentences:**
- One idea per sentence. If a sentence has "and" connecting two distinct thoughts, split it.
- Active voice. "The system sends a notification" not "A notification is sent by the system."
- Lead with the action. "Run `npm install`" not "The next step is to run `npm install`."

**Jargon handling:**
- Replace jargon with plain language on first use. If unavoidable, define inline: "the load balancer (the server that distributes traffic across machines)."
- Never assume acronyms are known. Spell out on first use.
- Test: could a smart new hire at the company understand this without Googling?

**Structure:**
- Front-load the point. First paragraph answers: what is this, who is it for, what can you do with it.
- Use numbered steps for procedures (order matters) and bullets for lists (order doesn't).
- One heading level = one level of specificity. Don't skip from H2 to H4.
- Tables for comparisons, decisions, or structured data. Prose for narrative and explanation.

**Examples:**
- Include at least one concrete example per major section.
- Examples come AFTER the explanation, not instead of it.
- Use realistic data. `user@example.com` over `foo@bar.baz`. `Jane from accounting` over `User A`.
- For code: show the command AND the expected output.

**Length:**
- Match length to purpose. A runbook for a 3-step process should be half a page, not five.
- If a section exceeds one screen (~40 lines), break it into subsections or split into a separate document.

---

## Step 3: Self-Review

Before presenting the draft, check against this list:

| Check | Question |
|-------|----------|
| **Purpose** | Does the first paragraph tell the reader what this is and why they care? |
| **Audience** | Would the stated audience understand every sentence without help? |
| **Actionable** | Can the reader DO the thing this document describes? |
| **Scannable** | Can someone find what they need in under 10 seconds by scanning headings? |
| **Examples** | Does every abstract concept have a concrete example? |
| **Jargon-free** | Would a smart non-specialist understand this? |
| **Current** | Are all commands, URLs, and references still accurate? |
| **Complete** | Are there gaps where the reader would get stuck and not know what to do next? |

If any check fails, fix it before presenting.

---

## Step 4: Present and Iterate

Present the draft with:
1. A one-line summary of what the document covers
2. The document itself
3. A note on any decisions made (e.g., "I kept the API reference as a table because there are only 5 endpoints — would you prefer expanded sections?")

Ask: "Does this match what you need? Anything to add, cut, or rewrite?"

Iterate until the user confirms. Each revision should be a clean rewrite of the changed sections, not inline comments.

---

## Document Metadata

Every document should include at the top:

```
Title: [Clear, descriptive title]
Last updated: [Date]
Author: [Who wrote/owns this]
Audience: [Who should read this]
```

For versioned docs (SOPs, architecture), add:
```
Version: [X.Y]
Review date: [Next scheduled review]
Approved by: [If applicable]
```

---

## Reference Files

For detailed templates and structures for each document type, read [references/document-types.md](references/document-types.md).
