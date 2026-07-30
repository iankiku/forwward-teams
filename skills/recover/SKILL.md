---
name: recover
description: (forwward) Responds to a production incident — stop the bleeding first (roll back the last release / disable the bad change), then diagnose from logs and alerts, keep a status thread, and write the follow-up. The reverse of a normal deploy. Triggers on "prod is down", "roll back", "revert the last deploy", "the service is erroring", or an alert firing.
---

# Recover — Stop the Bleeding, Then Diagnose

Get production healthy fast and safely, in the right order: recover first, root-cause second. A live
incident is not the time to debug in prod or to fix forward a change you don't understand yet — revert
to the last known-good, then investigate calmly.

**North star:** shortest safe path back to known-good, a clear status thread while it's open, and a
written follow-up so it doesn't recur — without a panicked command making it worse.

## Step 0 — Triage (60 seconds)

- **What's the blast radius?** One endpoint, one tenant, or everything? How many users affected?
- **What changed most recently?** The last deploy is the prime suspect — check deploy history, `git log`
  on the release branch, and recent config/flag changes.
- **Open a status thread now** in your incident channel: one line — what's wrong, who's on it,
  "investigating." Update it, don't spawn new messages.

## Step 1 — Stop the bleeding (recover before you diagnose)

Discover the project's own rollback path — the safe options, cheapest first:

- **Roll back the release** — redeploy the previous known-good revision. Most platforms (ECS, Cloud Run,
  Vercel, Fly.io) keep prior revisions one command away.
- **Revert the change** — if a specific merge caused it, revert that commit and ship the revert, rather
  than a speculative hotfix.
- **Flip the flag off** — if the break is behind a feature flag, disable it and redeploy to hydrate.
  Fastest when it applies.
- **Relieve pressure** — scale up replicas or bump a stuck queue/concurrency limit if it's load, not a bug.

Do the minimum that restores service. Then confirm recovery (health endpoint, error rate falling, a real
request succeeding) and update the status thread: "mitigated."

### ⚠️ Do NOT make it worse

- **Never scale to zero** to "restart" — that's 100% downtime.
- **Never run a destructive infra apply** (destroy, refresh, or apply from an unmerged branch) mid-incident
  — state churn compounds the outage.
- **Never force-delete a secret** to "reset" it — the service won't boot without it.
- **Don't migrate or roll back the database** as a reflex — a schema change mid-incident is high-risk;
  only if the migration *is* the cause and the down-migration is proven safe.
- Don't debug in prod by editing live config — reproduce after you've recovered.

## Step 2 — Diagnose (now that it's stable)

- **Logs + errors** — your error tracker for the exception + stack; platform logs around the failure
  window; alerting context if you have it wired up.
- **Correlate to the change** — does the error start exactly at the deploy/flag time? What did that
  change touch?
- **Reproduce off-prod** (local/staging) to confirm root cause before writing the real fix.
- Common silent causes: an unseeded or misformatted secret, a column too small for new data, an expired
  token, a config flag that no-op'd on a bad edit.

## Step 3 — Fix forward through the normal gates

Once you understand it: write the real fix, run `/gate`, get it reviewed, and deploy through the normal
pipeline — the fix ships with the same discipline as anything else, not shoved straight to prod. Then
re-enable any flag you turned off.

## Step 4 — Close out

- Update the status thread: "resolved," with a one-line cause.
- Write a short follow-up (timeline, root cause, what stopped it, prevention). If it revealed a new
  failure mode, add it to your team's runbook or gate so it can't recur silently.
- File the prevention work as a ticket.

## Incident checklist

```
[ ] Triaged: blast radius + most-recent-change identified; status thread open
[ ] Bleeding stopped via the SAFE path (rollback / revert / flag-off / scale) — service confirmed healthy
[ ] No destructive "fixes" run (no scale-to-zero, destructive infra apply, force-delete-secret, reflex migration)
[ ] Root cause found from logs/alerts and reproduced off-prod
[ ] Real fix shipped through the normal gate/review/deploy pipeline; flags restored
[ ] Status thread resolved; follow-up written; prevention ticket filed
```

## Anti-patterns

- Fixing forward a cause you don't understand instead of rolling back to known-good.
- A panicked scale-to-zero or destructive apply that deepens the outage.
- Silent recovery with no status thread and no follow-up — the next person relearns it.
- Shipping the real fix straight to prod, skipping review because "it's an incident."
