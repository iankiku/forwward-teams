---
name: audit
description: (forwward) Aggressively audits and cleans a codebase — removes slop, dead code, and AI-generated noise; fixes DRY/SOLID violations; restructures toward the simplest correct implementation. One commit, no behavior changes. Use when the user says "audit the code", "clean up tech debt", "remove dead code", "deslop", "this codebase is a mess", or asks for a code-quality pass. Detects stack and applies idiomatic patterns. Works on full codebase or specific paths.
---

# Audit — De-Slop, Prune, Restructure

You are a senior engineer who finds bloat offensive. Code that compiles is not the bar. Code that earns its existence is. This pass is surgical, aggressive, and behavior-preserving.

**The rule that overrides everything: never change observable behavior.** Tests must pass before and after. If a change would alter behavior, flag it — don't make it.

## Step 0: Detect the stack

Read `package.json`, `go.mod`, `Gemfile`, `pyproject.toml`, `pom.xml`, or `Cargo.toml`. Every cleanup decision must use the idioms of the project's actual stack — not generic patterns, not the wrong language's conventions.

## Step 1: Determine scope

```bash
git diff main...HEAD --name-only        # changed files on this branch
git diff --name-only                    # unstaged changes
```

**Default scope:** files changed in the current branch or working tree. If the user says "full codebase" or "everything", expand to all source files.

Also read:
- `CLAUDE.md` / `AGENTS.md` — project conventions to respect
- `team-memory/MEMORY.md` — recent decisions not to reverse

If a decision in team memory says "we chose X over Y", don't refactor X back to Y.

## Step 2: Slop audit

Slop is code that compiles and passes tests but silently rots the codebase. It looks polished — consistent naming, passing tests, clean PRs — while eroding architecture underneath.

**Mark every instance of:**

### Verbosity slop
- Comments that describe *what* the code does instead of *why*: `// loop through users` above a users.forEach
- Docstrings on 3-line functions with self-evident names
- Inline comments that restate the variable name: `const userId = user.id // get user id`
- TODO/FIXME/HACK comments with no ticket reference that have sat untouched (check `git log` — if older than 30 days and no one touched it, it's dead)

### Defensive cargo-cult slop
- `try/catch` around code that cannot throw
- Null checks on values that are typed non-null and cannot be null
- Type casts to `any` / `interface{}` / `object` without a comment explaining why
- Retry logic on operations that aren't idempotent or where retry makes no sense
- Feature flags for features that shipped months ago and the flag is always true

### Structural slop
- Copy-paste blocks — same logic in 2+ places, slightly varied
- Functions that only call one other function with the same arguments (wrapper for no reason)
- Abstraction for a single use case — if an interface has one implementation, it's not an abstraction, it's noise
- Barrel files (`index.ts`) that re-export every single thing in a directory with no filtering
- Constants files with one constant

### AI noise
- Generic planning files in the repo root: `PLAN.md`, `SCRATCH.md`, `NOTES.md`, `TODO.md` (unless they have real team content)
- Debug `console.log` / `print` / `fmt.Println` / `logger.debug` left in production code
- Commented-out code blocks that haven't been uncommented in 30+ days (check `git log`)
- Placeholder text: "Lorem ipsum", "TODO: implement", "example value"

### Frontend slop (skip if no frontend in scope)

Check for a `components/`, `pages/`, `app/`, `src/` with `.tsx`/`.jsx`/`.vue`/`.svelte` before running this section.

**Visual defaults — the AI aesthetic fingerprint:**
- Purple or blue gradient backgrounds: `background: linear-gradient(...)` as a default, not a deliberate brand choice
- Pill-shaped buttons everywhere: `border-radius: 9999px` on all buttons regardless of context
- Symmetric three-card grids used as a default layout for any list of items
- Oversized hero sections with centered headline + subtext + CTA — the AI landing page template
- Gradient text (`background-clip: text`) applied to headings with no design rationale
- Nested card-in-card-in-card layouts ("cardocalypse") — visual hierarchy through nesting instead of spacing/type

**Typography slop:**
- `font-family: 'Inter', sans-serif` globally with no hierarchy — Inter as the only typeface
- Display/hero fonts (Fraunces, Geist, Mona Sans, Plus Jakarta Sans, Space Grotesk, Recoleta, Instrument Sans) applied to ALL headings, not just display moments
- No size/weight hierarchy — every heading the same weight, only size differs
- Hero copy that word-wraps awkwardly on mobile (no `max-width` or responsive sizing)

**CSS technical slop:**
- Hardcoded hex colors inline instead of CSS custom properties or design tokens: `color: #6366f1` not `color: var(--primary)`
- Magic number pixel values: `margin-top: 73px`, `padding: 17px 23px` — numbers no one can explain
- Duplicate shadow recipes defined multiple times: `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)` copy-pasted across components
- Inconsistent `border-radius` — `4px` in one component, `6px` in another, `8px` in a third, no token
- Inline styles in JSX/TSX instead of CSS classes or utility classes

**Component slop:**
- Prop drilling 3+ levels deep — passing `userId` through components that don't use it to reach one that does
- Shadcn/Radix/headless-UI components used as-is with zero customization — shipped exactly as the CLI generated them
- Cookie-cutter components that ignore context — a `<Card>` that looks identical whether it's a user profile, a product, or an error message
- God components — one component that renders the whole page, handles all state, and calls all APIs

**AI-specific frontend noise:**
- Hallucinated imports: `import { useRouter } from 'react'` (should be `'next/router'`), `import { useState } from 'react-dom'`
- `any` type abuse in TypeScript props: `props: any`, `event: any`, `data: any`
- Unused component props that are accepted but never used (check with TypeScript or grep)
- `key={index}` on lists where items have stable IDs available

**Content slop:**
- Em dashes in every sentence — the AI prose fingerprint
- Vague CTAs: "Get Started", "Learn More", "Click Here" with no specificity
- Lorem ipsum or placeholder copy that made it to a real environment
- Marketing superlatives with no evidence: "blazing fast", "enterprise-grade", "seamlessly"

## Step 3: Tech debt audit

**Mark every instance of:**

### DRY violations
- Same logic duplicated in 2+ files — consolidate into a shared util/helper/service
- Same query written multiple times — extract to a repository function
- Same validation logic scattered across handlers — extract to a validator
- Same constant hard-coded in multiple files — extract to a constants module

### SOLID violations

| Principle | Smell |
|-----------|-------|
| Single Responsibility | A service/class that handles 3 unrelated concerns |
| Open/Closed | Switch/if-else chains that grow with every new type |
| Liskov Substitution | Subclass that throws on methods the parent supports |
| Interface Segregation | Interface with 10 methods, most implementations only use 3 |
| Dependency Inversion | Business logic that directly instantiates infrastructure (new DB(), new EmailClient()) |

### Structural debt
- God files — files over 400 lines that own too much
- Long parameter lists — functions with 5+ parameters that should take a config object
- Feature envy — a function that uses more of another module's data than its own
- Primitive obsession — passing raw strings/ints where a typed value object would prevent bugs
- Dead routes, dead API endpoints, dead DB columns that nothing reads or writes (verify with grep before deleting)

## Step 4: Triage — what to act on

Not all debt is worth paying now. Apply this filter:

**Act immediately:**
- Slop that adds noise without adding value (obvious comments, dead console.logs, commented-out code)
- DRY violations where the duplication is exact or near-exact
- Dead code confirmed dead by grep (nothing imports or calls it)
- Cargo-cult patterns with no defensive value

**Act if straightforward:**
- Extractions that don't require changing callers (utility functions, constants)
- Removing wrappers that add no value
- Collapsing single-implementation abstractions

**Flag, don't act:**
- SOLID violations that require broader refactoring (note them in the commit message or a code comment)
- Structural issues that need a design decision (`// DEBT: this service owns too much — split when X grows`)
- Anything that touches a test boundary or changes an interface

**Never act:**
- Anything where behavior change is needed to fix the debt
- Database schema changes
- Changes to public APIs or external contracts
- Anything team-memory says was a deliberate choice

## Step 5: Execute — one pass, no second-guessing

Make all the changes identified in Step 4. In order:

1. **Delete** — dead code, slop noise, commented-out blocks, dead files first. Deletion is the safest operation.
2. **Extract** — DRY violations. Create the shared function/constant, update all callers.
3. **Collapse** — unnecessary wrappers and abstractions.
4. **Rename** — only if the current name is actively misleading. Don't rename for style.
5. **Reorganize** — only if files are in the wrong place by the project's own structure conventions.

Do not refactor what you don't need to touch. If a function is ugly but works and isn't in scope, leave it.

## Step 6: Verify

Run `/gate` — lint, typecheck, build, tests. All must pass.

If gate fails:
- Fix the failure (it's your change that broke it)
- Do NOT revert to passing tests by removing the test
- If the breakage reveals that the "dead code" wasn't dead, restore it and update your slop assessment

Gate must return PASSED before the commit. If it can't pass after 2 fix attempts, revert the specific change that broke it and note it in the commit message.

## Step 7: One commit

Stage all changes and commit as a single atomic unit:

```bash
git add -A
git commit -m "refactor: audit pass — remove slop, resolve DRY violations, prune dead code

- [list the 3-5 most significant changes]
- [note any flagged-but-not-fixed debt for future pass]
- Gate: PASSED (lint + types + build + tests)"
```

One commit. Not one per file, not one per category. The entire audit is one reviewable, revertable unit.

## What never gets touched

- Test files — don't "clean up" tests. Tests are specifications. If a test looks redundant, flag it; don't delete it.
- Database migrations — never edit a committed migration
- Lock files (`package-lock.json`, `go.sum`, `Gemfile.lock`) — only update if a dependency changed
- Generated files — if a file has a `// generated` header or lives in a `generated/` dir, leave it
- `.env`, config files, secrets — not in scope

## The smell test

Before committing, ask: "Would a senior engineer on this team be embarrassed to show this code in a review?" If yes after the pass, something was missed. If no before the pass, the audit was unnecessary.

The complementary question: "Which file in this diff would I be most nervous to change in 6 months?" That file had debt. Make sure it's cleaner now.

## Integration with /gate

`/gate` can invoke `/audit` as an optional pre-ship step. When called from gate:
- Scope is limited to files changed in the current branch (`git diff main...HEAD`)
- Audit runs before the final gate check
- Gate is re-run after audit changes
- If audit introduces a gate failure, audit reverts and gate reports the specific file

## When NOT to use

- Greenfield code written in the last hour — too early to audit, let it stabilize
- Mid-feature work — audit at the end of a feature, not during it
- Before understanding the codebase — read first, audit second
- As a substitute for a design discussion — if the architecture is wrong, audit doesn't fix it; use `/architect`
- On generated code, migrations, or lock files
