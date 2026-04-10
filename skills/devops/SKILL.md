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

```dockerfile
# Multi-stage build — keep images small
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

**Rules:**
- Always pin base image versions (not `latest`)
- Use `.dockerignore` — never ship `node_modules`, `.git`, `.env`
- One process per container
- Health check in Dockerfile: `HEALTHCHECK CMD curl -f http://localhost:3000/health`

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
