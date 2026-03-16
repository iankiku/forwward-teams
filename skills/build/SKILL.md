---
name: build
description: Use when implementing features, writing fullstack code, shipping UI + API + DB changes, or any hands-on engineering work in TypeScript, Python, React, Next.js, FastAPI, or SQL
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

1. Does this need code, or can I configure it?
2. Is there an existing pattern I should follow?
3. What's the simplest thing that could work?

## Step 0: Pick a Design Pattern

Before building, identify which pattern the codebase uses — or pick one if greenfield:

| Pattern | When to Use | Structure |
|---------|-------------|-----------|
| **Service Layer** | Most CRUD apps, APIs | Route → Service → Repository → DB |
| **Repository** | Data-heavy apps, multiple data sources | Domain → Repository interface → Implementation |
| **MVC** | Traditional web apps, Rails-style | Model → Controller → View |
| **Hexagonal** | Complex domains, many integrations | Core domain → Ports → Adapters |
| **Feature Modules** | Large apps, team-per-feature | Feature folder with its own routes, services, types |

**Default:** Service Layer for new projects. Follow what exists for established codebases.

## Stack: TypeScript

| Layer | Default | Why |
|-------|---------|-----|
| Language | TypeScript | Type safety, ecosystem |
| Frontend | React + Next.js | SSR, routing, ecosystem |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| API | Next.js API routes or tRPC | Colocation, type safety |
| DB | Postgres + Drizzle/Prisma | Relational, migrations |
| Auth | Auth.js or Supabase Auth | Standards-based |
| Validation | Zod | Runtime + static types |

## Stack: Python

| Layer | Default | Why |
|-------|---------|-----|
| Language | Python 3.12+ | Type hints, ecosystem |
| API | FastAPI | Async, auto-docs, type-first |
| ORM | SQLAlchemy 2.0 | Mature, flexible, async support |
| Validation | Pydantic v2 | FastAPI native, fast |
| Testing | pytest | Fixtures, plugins, standard |
| Package mgr | uv or Poetry | Lock files, reproducible |
| Task queue | Celery or arq | Background jobs |

Adapt to whatever the project already uses. Don't introduce new tools without reason.

## Code Patterns

### Every component handles 4 states
1. **Empty** — no data yet
2. **Loading** — fetching
3. **Error** — something failed
4. **Loaded** — data available

### API routes (TypeScript)
- Validate input with Zod at the boundary
- Return consistent shape: `{ data }` or `{ error }`
- Auth check before business logic

### API routes (Python)
- Validate with Pydantic models on request/response
- Return consistent shape: `{"data": ...}` or `{"error": ...}`
- Use Depends() for auth, DB sessions, shared logic

### Database
- Migrations for schema changes, never manual SQL
- Transactions for multi-table writes
- Index columns used in WHERE and JOIN

## Security Defaults

- Validate all user input (Zod / Pydantic)
- Auth check on every protected route
- Parameterized queries (never string concat SQL)
- Secrets in env vars, never in code
- HTTPS everywhere

## When Done

Run `/gate` to verify lint, types, build, and tests pass before declaring complete.
