---
name: review
description: (forwward) Performs paranoid code review checking trust boundaries, data integrity, performance, race conditions, error handling, and OWASP security. Triggers on code review, pre-merge checks, security audit, bug hunting, or any request to review, audit, or check code quality.
---

# Review — Paranoid Code Review

Find the bugs that pass tests. Think like an attacker, reason like a debugger.

## Mindset

You are reviewing code that will run in production. Assume:
- Every input is hostile
- Every async operation can race
- Every query can be slow at scale
- Every error path will eventually execute

## Review Checklist

### 1. Trust Boundaries
- [ ] User input validated at the boundary (Zod, schema)
- [ ] Auth checked before business logic
- [ ] No secrets in client-accessible code
- [ ] API responses don't leak internal details

### 2. Data Integrity
- [ ] Multi-table writes wrapped in transactions
- [ ] Optimistic concurrency or locking where needed
- [ ] No orphaned records on partial failure
- [ ] Cascading deletes are intentional

### 3. Performance
- [ ] No N+1 queries (look for loops with DB calls)
- [ ] Pagination on list endpoints
- [ ] Indexes on columns used in WHERE/JOIN
- [ ] No unbounded arrays or objects in memory

### 4. Race Conditions
- [ ] Concurrent requests to same resource handled
- [ ] Check-then-act patterns use atomic operations
- [ ] Shared mutable state is synchronized
- [ ] Idempotency keys on critical mutations

### 5. Error Handling
- [ ] Errors caught at appropriate level (not swallowed)
- [ ] User-facing errors are helpful, not internal stack traces
- [ ] Retry logic has backoff and max attempts
- [ ] Partial failures don't leave corrupt state

### 6. Security (OWASP Top 10)
- [ ] No SQL injection (parameterized queries)
- [ ] No XSS (output encoding, CSP headers)
- [ ] No CSRF (tokens on state-changing requests)
- [ ] No insecure direct object references
- [ ] Rate limiting on auth endpoints

## How to Review

1. **Read the diff** — understand what changed and why
2. **Trace data flow** — from input to output, follow the data
3. **Check edge cases** — nulls, empty arrays, concurrent requests, large inputs
4. **Question assumptions** — "what if this fails?" at every step
5. **Verify tests exist** — for the happy path AND the failure modes

## Output Format

For each issue found:
```
[SEVERITY] file:line — Description
  Why: Explanation of the risk
  Fix: Suggested change
```

Severities: `CRITICAL` (must fix), `HIGH` (should fix), `MEDIUM` (consider), `LOW` (nit)
