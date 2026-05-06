---
name: buildit
description: (forwward) Guides fullstack feature development with clean code patterns across any stack — TypeScript, Python, Go, Ruby, Java, Rust, and more. Detects the project's stack before advising. Triggers on implementing features, writing code, shipping UI + API + DB changes, or any hands-on engineering work.
---

# Build — Ship Features

You are the builder. Write clean, working code. Ship fast, ship right.

## Principles

1. **Make it work, make it right, make it fast** — in that order.
2. **Read before write.** Understand existing patterns before adding code.
3. **Smallest diff wins.** Don't refactor what you don't need to touch.
4. **Delete > comment out.** Dead code is noise.

## Step 0: Detect the Stack

Before writing a single line, identify what the project uses. Check for these files:

| File | Stack |
|------|-------|
| `package.json` | Node.js / TypeScript / JavaScript |
| `pyproject.toml` / `requirements.txt` | Python |
| `go.mod` | Go |
| `Gemfile` | Ruby / Rails |
| `pom.xml` / `build.gradle` | Java / Kotlin |
| `Cargo.toml` | Rust |
| `mix.exs` | Elixir |
| `*.csproj` / `*.sln` | .NET / C# |

Then look at framework markers: `next.config.*` (Next.js), `vite.config.*` (Vite), `config/routes.rb` (Rails), `main.go` (Go), `manage.py` (Django), etc.

**Never assume TypeScript or Python.** Read first, then advise with the actual stack.

## Step 1: Pick a Design Pattern

Identify which pattern the codebase uses — or pick one if greenfield:

| Pattern | When to Use | Structure |
|---------|-------------|-----------|
| **Service Layer** | Most CRUD apps, APIs | Route → Service → Repository → DB |
| **Repository** | Data-heavy apps, multiple data sources | Domain → Repository interface → Implementation |
| **MVC** | Traditional web apps (Rails, Django, Spring) | Model → Controller → View |
| **Hexagonal** | Complex domains, many integrations | Core domain → Ports → Adapters |
| **Feature Modules** | Large apps, team-per-feature | Feature folder with its own routes, services, types |

**Default:** Service Layer for new projects. Follow what exists for established codebases.

## Stack Reference Examples

These are examples. Apply the same principles in whatever stack the project uses.

### TypeScript (Next.js / Node)
- Validation: Zod at the boundary
- ORM: Drizzle or Prisma
- Auth: standard OAuth library for the framework
- API: REST, tRPC, or GraphQL depending on client needs

### Python (FastAPI / Django)
- Validation: Pydantic (FastAPI) or Django forms/serializers
- ORM: SQLAlchemy or Django ORM
- Testing: pytest
- Package management: uv or Poetry

### Go
- Validation: manual struct validation or `go-playground/validator`
- DB: `sqlx`, `pgx`, or `GORM`
- HTTP: `net/http` stdlib, `chi`, `gin`, or `echo`
- Testing: stdlib `testing` package + `testify`

### Ruby (Rails)
- Validation: ActiveRecord validations
- ORM: ActiveRecord
- Testing: RSpec or Minitest
- Background jobs: Sidekiq

### Java / Kotlin (Spring Boot)
- Validation: Bean Validation / Hibernate Validator
- ORM: Spring Data JPA / Hibernate
- Testing: JUnit 5 + Mockito

For any other stack: follow the same principles — validate at the boundary, keep business logic in services, keep routes thin.

## Code Patterns

### Every UI component handles 4 states
1. **Empty** — no data yet
2. **Loading** — fetching
3. **Error** — something failed
4. **Loaded** — data available

### API routes (any stack)
- Validate input at the boundary using the stack's schema/validation tool
- Return consistent shape: `{ data }` or `{ error }` (or equivalent)
- Auth check before business logic
- Keep routes thin — validate, call service, respond

### Database
- Migrations for schema changes, never manual SQL in production
- Transactions for multi-table writes
- Index columns used in WHERE and JOIN

## Security Defaults

- Validate all user input at the boundary
- Auth check on every protected route
- Parameterized queries — never string-concatenate SQL
- Secrets in env vars, never in code or git
- HTTPS everywhere

## When Done

Run `/gate` to verify lint, types, build, and tests pass before declaring complete.
