---
name: harden
description: (forwward) Project-agnostic adversarial hardening pass — security red-team, end-to-end observability, bottleneck removal, and anti-over-engineering. Triggers on "harden this", "red team this", "adversarial review", "find security holes", "add logging/traces so we can debug", or "find where it hangs/fails". Works on any project or codebase.
---

# Harden — Adversarial Review, Security, Observability, Lean

Make a system production-robust without over-building it. Red-team it, refute each finding before
accepting it, then land patches. Composes `/review` (correctness passes) and `/security` (auth,
encryption, secrets), plus `/gate` to prove fixes hold.

**North star:** no security holes · full debuggable observability at every stage · no bottlenecks ·
no over-engineering AND no shortcuts — never trade away performance, cost, or output quality to simplify.

## Step 0 — Detect stack & map the pipeline

Detect language/framework from manifests (`package.json`, `pyproject.toml`, `go.mod`, IaC files). Then
map every stage data flows through — this map drives every later pass:

- **Entry points** — uploads, API routes, webhooks, queue consumers, scheduled jobs.
- **Processing** — pipeline/graph stages, agent or LLM calls, external service calls.
- **Exit** — report generation, persistence, notifications.

Output a stage map: `entry → … → exit`, with the trust boundary and failure surface at each hop.

## Step 1 — Ground before patching

Research the unknowns before touching code. Check current library docs (versions matter for auth,
retries, streaming, deprecations) and any prior decisions or known gotchas documented in the project.
Verify anything security- or infra-relevant against at least two primary sources before acting on it —
don't patch from assumption.

## Step 2 — Adversarial review (`/review`, max detail)

Run `/review` framed adversarially — assume the code is wrong and prove it: correctness, trust
boundaries, races, N+1s, unhandled rejections, partial failures, resource leaks, contract drift
(API ↔ UI ↔ shared packages). Use distinct lenses per pass; have a second pass try to **refute** each
finding before it's accepted. Only confirmed findings become work.

## Step 3 — Security red-team (`/security`) — close holes with patches, not reports

- **API** — authN/authZ on every route, IDOR/object-level access, input validation, mass-assignment,
  rate limits, SSRF, injection (SQL/command/prompt), body-size/DoS limits, presigned-URL scope.
- **UI** — XSS/sanitization, CSRF, auth state, secrets in the bundle, exposed internal endpoints.
- **Dependencies** — known CVEs, unpinned/transitive risk, supply-chain exposure.
- **Secrets & data** — encryption at rest/in transit, PII handling, log redaction, least-privilege
  IAM/roles.

For each finding: severity, exploit path, patch — then re-run the attack to confirm it's closed.

## Step 4 — Observability: log & trace every stage

Goal: a full picture for debugging and metric validation, when things go right *and* wrong.

- **Structured logs** (JSON) at every stage, with a correlation/trace id threaded end-to-end: stage
  name, status, duration, key dimensions, and cause on failure. Queryable, not prose — log success
  transitions too, not only errors.
- **Error handlers** wrap each stage — failures caught, logged with context, and surfaced (route to
  `/alert` if you have it wired up). No silent swallow, no error masked as a generic 500/HTML. Include
  retryability + idempotency key.
- **Traces / action audit** — record inputs, tool calls, model, tokens, latency, and outcome so a run is
  fully reconstructable, whether to a DB table or a tracing backend.
- Deliverable: pick one log line, reconstruct the entire run, and pinpoint where it failed.

## Step 5 — Bottlenecks & failure modes

Find where it hangs, fails, or wastes: missing timeouts, no retry/backoff, non-idempotent retries, sync
calls that should be async, N+1 or other hot paths, unbounded concurrency, cold caches, oversized LLM
calls. Add timeouts and circuit breakers on every external call. Remove the bottleneck, or document why
it stays.

## Step 6 — Anti-over-engineering (the balance gate)

Two-sided and explicit: **simplify** where complexity earns nothing (needless abstraction, dead config,
premature generality), but **never** by cutting corners, reducing performance, raising cost, or
degrading output quality. For each simplification, prove correctness, performance, cost, and quality all
still hold — if any is at risk, don't make it.

## Step 7 — Patch, verify, ship

Land patches through the project's normal flow (feature → integration branch). Run `/gate` plus the
project's own tests and any end-to-end checks. Open PRs only once the fix holds and CI is green.

## Checklist

```
[ ] Stage map produced: entry → … → exit, trust boundary + failure surface per hop
[ ] Findings grounded against ≥2 primary sources where security/infra is involved
[ ] Adversarial review run; every finding refuted before acceptance
[ ] Every security hole closed with a patch, re-tested against the attack
[ ] Trace id threaded end-to-end; a single log line reconstructs a full run
[ ] Every stage wrapped in an error handler; failures surfaced, never swallowed
[ ] Timeouts + circuit breakers on every external call; bottlenecks removed or justified
[ ] Simplifications proven against the four invariants (correctness, perf, cost, quality)
[ ] Gate green; PRs opened
```

## Anti-patterns

- **Reports instead of patches** — a confirmed hole without a re-tested fix isn't done.
- **Silent swallow** — catching an error without logging context or surfacing it.
- **Prose logs** — unstructured, unqueryable output with no trace id.
- **Either/or thinking** — trading security for speed, or simplicity for quality. It's both/and.
- **Over-abstraction** — introducing generality nothing uses yet; and its inverse, cutting corners to
  look lean.
- **Patching from assumption** — guessing on security/infra instead of sourcing it.
- **Uniform lenses** — one reviewer, one angle; adversarial review needs distinct lenses and a refuter.
