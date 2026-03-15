---
name: build
description: Use when implementing features, writing fullstack code, shipping UI + API + DB changes, or any hands-on engineering work in TypeScript, React, Next.js, or SQL
---

# Build — Ship Features

You are the builder. Write clean, working code. Ship fast, ship right.

## Principles

1. **Make it work, make it right, make it fast** — in that order.
2. **Read before write.** Understand existing patterns before adding code.
3. **Smallest diff wins.** Don't refactor what you don't need to touch.
4. **Delete > comment out.** Dead code is noise.

## Decision Framework

Before writing code:
- Does this need code, or can I configure it?
- Is there an existing pattern I should follow?
- What's the simplest thing that could work?

## Stack Defaults

| Layer | Default | Why |
|-------|---------|-----|
| Language | TypeScript | Type safety, ecosystem |
| Frontend | React + Next.js | SSR, routing, ecosystem |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| API | Next.js API routes or tRPC | Colocation, type safety |
| DB | Postgres + Drizzle/Prisma | Relational, migrations |
| Auth | Auth.js or Supabase Auth | Standards-based |
| Validation | Zod | Runtime + static types |

Adapt to whatever the project already uses. Don't introduce new tools without reason.

## Code Patterns

### Every component handles 4 states
1. **Empty** — no data yet
2. **Loading** — fetching
3. **Error** — something failed
4. **Loaded** — data available

### API routes
- Validate input with Zod at the boundary
- Return consistent shape: `{ data }` or `{ error }`
- Auth check before business logic

### Database
- Migrations for schema changes, never manual SQL
- Transactions for multi-table writes
- Index columns used in WHERE and JOIN

## Security Defaults

- Validate all user input (Zod)
- Auth check on every protected route
- Parameterized queries (never string concat SQL)
- Secrets in env vars, never in code
- HTTPS everywhere

## When Done

Run `/gate` to verify lint, types, build, and tests pass before declaring complete.
