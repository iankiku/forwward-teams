---
name: devops
description: (forwward) Configures CI/CD pipelines, Docker, monitoring, alerting, and infrastructure with reliability-first defaults. Triggers on CI/CD, Docker, deployment, monitoring, alerting, infrastructure setup, or production debugging.
---

# DevOps — Infrastructure & Deployment

Ship reliably. Monitor everything. Fix fast.

## Deployment Checklist

Before any deploy:

1. All tests pass in CI (not just locally)
2. Environment variables set in target environment
3. Database migrations tested against production-like data
4. Rollback plan documented (even if it's "revert this commit")
5. Health check endpoint exists and returns 200

## CI/CD Pipeline

```
push → lint → typecheck → test → build → deploy staging → smoke test → deploy prod
```

| Stage | Fails? | Action |
|-------|--------|--------|
| Lint/Types | Block merge | Fix locally |
| Tests | Block merge | Fix or update tests |
| Build | Block merge | Fix build errors |
| Staging deploy | Block prod | Debug in staging |
| Smoke test | Block prod | Rollback staging, investigate |
| Prod deploy | Alert on-call | Rollback immediately |

## Docker

Always use multi-stage builds to keep images small. Detect the stack and use the appropriate base image.

### Node.js / TypeScript
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

### Python
```dockerfile
FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
COPY --from=builder /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Go
```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server ./cmd/api

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"]
```

### Ruby on Rails
```dockerfile
FROM ruby:3.3-slim AS builder
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install --without development test

FROM ruby:3.3-slim
WORKDIR /app
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY . .
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
```

For other stacks (Java/JVM, .NET, Rust): same pattern — build stage compiles, final stage is minimal. Never copy the build toolchain into the final image.

**Rules for all stacks:**
- Always pin base image versions (not `latest`)
- Use `.dockerignore` — never ship build artifacts, `.git`, or `.env` files
- One process per container
- Add a health check: `HEALTHCHECK CMD curl -f http://localhost:<PORT>/health || exit 1`

## Monitoring

| What | Tool Options | Alert When |
|------|-------------|------------|
| Uptime | UptimeRobot, Checkly | Down > 30 seconds |
| Errors | Sentry, Datadog | Error rate > 1% |
| Latency | Grafana, Datadog | p95 > 2 seconds |
| Resources | Cloud provider metrics | CPU > 80%, memory > 85% |
| Logs | Datadog, Axiom, CloudWatch | Error patterns, keywords |

**Rules:**
- Every alert must have a runbook (even a one-liner)
- If an alert fires and needs no action, delete it — alert fatigue kills
- Log structured JSON, not printf strings
- Include request ID in every log line for tracing

## Infrastructure Defaults

| Decision | Default | Why |
|----------|---------|-----|
| Hosting | Vercel / Railway / Fly.io | Zero-config, scales |
| Database | Managed Postgres (Supabase, Neon, RDS) | Don't manage your own DB |
| Cache | Upstash Redis | Serverless, no ops |
| Queue | Inngest, Trigger.dev, or SQS | Managed, retries built-in |
| Storage | S3 / R2 / Supabase Storage | Cheap, reliable |
| DNS | Cloudflare | Fast, free tier |
| Secrets | Environment variables via platform | Never in code or git |

## Incident Response

1. **Detect** — alert fires or user report
2. **Acknowledge** — someone owns it (within 5 min)
3. **Mitigate** — rollback, feature flag off, or scale up (fix the bleeding)
4. **Investigate** — root cause after bleeding stops
5. **Fix** — proper fix with tests
6. **Postmortem** — blameless, focus on systems not people
