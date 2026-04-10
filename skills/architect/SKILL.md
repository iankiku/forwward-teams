---
name: architect
description: (forwward) Designs system architecture, selects databases, structures projects, plans APIs, and defines caching strategies with scale-appropriate defaults. Triggers on system design, database selection, project structure, tech stack, API design, caching, or codebase organization.
---

# Architect — System Design

Structure the system before building it. Good architecture makes everything easier. Bad architecture makes everything a rewrite.

## Step 0: Understand Constraints

Before designing, answer:

1. **Scale** — 100 users or 100,000? Determines everything.
2. **Team size** — Solo founder or 10 engineers? Simpler systems for smaller teams.
3. **Budget** — Bootstrapped or funded? Managed services vs self-hosted.
4. **Timeline** — MVP in 2 weeks or v1 in 3 months?
5. **Compliance** — HIPAA, SOC 2, GDPR? Constrains architecture choices.

## Architecture Patterns

| Pattern | When to Use | When to Avoid |
|---------|-------------|---------------|
| **Monolith** | <10 engineers, single product, moving fast | Multiple teams needing independent deploys |
| **Modular monolith** | Growing team, want boundaries without infra cost | Need independent scaling per service |
| **Microservices** | 20+ engineers, distinct domains, independent scaling | Small team, early stage, unclear boundaries |
| **Serverless** | Event-driven, spiky traffic, want zero ops | Long-running processes, cost-sensitive at scale |
| **Event-driven** | Async workflows, decoupled systems, audit trails | Simple CRUD, real-time requirements |

**Default:** Monolith until it hurts. Premature microservices is the #1 architecture mistake.

## Database Selection

| Need | Database | Why |
|------|----------|-----|
| General purpose, relational | **PostgreSQL** | ACID, JSON support, extensions, ecosystem |
| Key-value, caching | **Redis / Valkey** | Sub-ms reads, TTL, pub/sub |
| Document store, flexible schema | **MongoDB** | Rapid prototyping, nested documents |
| Full-text search | **PostgreSQL FTS** or **Meilisearch** | Postgres built-in is good enough until it isn't |
| Time-series | **TimescaleDB** (Postgres extension) | Keep one database engine |
| Graph relationships | **PostgreSQL** with recursive CTEs | Don't add Neo4j unless graph is the core product |
| Vector / embeddings | **pgvector** (Postgres extension) | Same — keep one database |

**Rules:**
- Start with Postgres. Add specialized databases only when Postgres can't do the job.
- Managed always (Supabase, Neon, RDS). Don't manage your own database.
- One database engine until you have a DBA. Two databases = two problems.

## Project Structure

### TypeScript / Next.js
```
src/
├── app/                    # Next.js app router — pages and layouts
│   ├── (auth)/             # Route groups for auth pages
│   ├── (dashboard)/        # Route groups for app pages
│   └── api/                # API routes
├── lib/                    # Shared utilities, config, constants
│   ├── db/                 # Database client, schema, migrations
│   ├── auth/               # Auth config and helpers
│   └── utils/              # Pure utility functions
├── services/               # Business logic — one file per domain
│   ├── user.service.ts
│   └── billing.service.ts
├── components/             # React components
│   ├── ui/                 # Primitives (button, input, card)
│   └── features/           # Feature-specific composites
└── types/                  # Shared TypeScript types
```

### Python / FastAPI
```
src/
├── api/                    # Route handlers
│   ├── v1/                 # Versioned endpoints
│   └── deps.py             # Shared dependencies (auth, db session)
├── core/                   # Config, security, constants
├── models/                 # SQLAlchemy models
├── schemas/                # Pydantic request/response schemas
├── services/               # Business logic — one file per domain
├── repositories/           # Data access layer
└── tests/
    ├── unit/
    └── integration/
```

**Rules:**
- Feature code stays together. Don't scatter a feature across 8 directories.
- Services contain business logic. Routes are thin — validate, call service, respond.
- One service per domain. `user.service.ts` not `getUserById.ts`, `updateUser.ts`, etc.

## API Design

| Decision | Default |
|----------|---------|
| Protocol | REST for CRUD, tRPC for type-safe full-stack, GraphQL only if multiple clients need different shapes |
| Versioning | URL path: `/api/v1/` — simple, explicit |
| Auth | Bearer token in Authorization header |
| Pagination | Cursor-based for feeds, offset for admin tables |
| Errors | `{ error: { code: "NOT_FOUND", message: "User not found" } }` |
| Rate limiting | 100 req/min default, lower for auth endpoints |

## Caching Strategy

| Layer | Tool | TTL | Use When |
|-------|------|-----|----------|
| Browser | Cache-Control headers | Varies | Static assets, API responses |
| CDN | Cloudflare / Vercel Edge | 1-60 min | Public pages, images |
| Application | Redis / in-memory | 5-60 min | Expensive queries, session data |
| Database | Materialized views | Refresh on write | Aggregations, dashboards |

**Rules:**
- Cache reads, not writes. Invalidate on mutation.
- Start with no cache. Add caching when you measure a bottleneck.
- Every cache needs an invalidation strategy. "TTL and hope" works until it doesn't.

## Scaling Checklist

Only optimize when you hit the problem:

| Users | Likely Bottleneck | Fix |
|-------|-------------------|-----|
| 0-1K | Nothing | Don't optimize |
| 1K-10K | Database queries | Add indexes, optimize N+1s |
| 10K-100K | Database connections | Connection pooling (PgBouncer) |
| 100K-1M | Read throughput | Add Redis cache layer |
| 1M+ | Write throughput | Read replicas, sharding, queue writes |

**The best architecture is the simplest one that handles your current scale + 10×.**
