---
name: alert
description: (forwward) Bootstraps production error alerting — wires app errors to Slack and/or Sentry through a single reporting seam, deduped notifications, and secret/flag/deploy plumbing done in the right order. Triggers on "add alerting", "wire up Slack alerts", "add Sentry", "we need to know when prod breaks", or setting up observability for a new service.
---

# Alert — Error → Slack/Sentry Bootstrap

Make a service tell you when it breaks in production, without a silent no-op. The pattern is the same
across stacks: **one reporting seam → fan out to logging + Sentry + Slack → dedupe → gate behind a flag
→ seed the secret and deploy in the correct order.** Most rollouts get bitten by the *plumbing*, not the
code — this front-loads those traps.

**North star:** every unhandled error and every swallowed-but-important event reaches a human channel,
exactly once per incident, with enough context to act — verified live, not assumed.

## Step 0 — Detect the stack and delivery path

- **Language/runtime** — long-running server, serverless function, background worker? Determines where
  the reporter seam and flush hooks go.
- **Where secrets live** — a cloud secret manager, CI provider secrets, or plain env vars?
- **How config flags are set** — a config service, a YAML file, an env var, a feature-flag provider?
- **Deploy mechanism** — does a fresh deploy clone the *currently running* config forward (common on
  container platforms), or rebuild config from source every time? This decides whether a new secret
  wires itself in automatically or needs a one-time bootstrap (see Step 4).

## Step 1 — One reporting seam, not scattered webhook calls

Create a single module the whole app calls through, with two entry points:

- `report(error, context)` → logging + Sentry + Slack. For unhandled/handled exceptions.
- `notify(message, context)` → Slack only. For "this is fine but a human should know" events (e.g. a
  webhook you ack with 200 but couldn't fully process).

Requirements baked into the seam:

- **Dedupe** — collapse identical errors within a window (~5 min) by a stable key (type + message +
  call-site), so one bad deploy doesn't post thousands of Slack lines.
- **Never throw from the reporter** — an alerting failure must not break the request path. Wrap the
  Slack/Sentry calls; on failure, log and move on.
- **Context every time** — environment, service, request/trace id, and a short human summary.
- **Server-side only** — a Slack webhook URL is a credential (see Step 2). It runs on the server; never
  ship it to a browser/client bundle.

Wire the seam at the real failure points, not just a global handler:

- Global exception handler / middleware → `report`.
- **Background workers** — the silent killer is a `try/except` around the poll loop that swallows
  everything. Route that catch to `report`, add a shutdown-signal flush so queued alerts drain before
  exit, and a one-line recovery notice when it comes back.
- **Webhook endpoints that ack with 200** even on partial failure → `notify` on the swallowed branch.
- Frontend error boundary (if any) → Sentry's error hook.

## Step 2 — Secrets: the Slack webhook URL *is* the credential

- A Slack incoming webhook URL carries no separate token — possessing the URL is the ability to post.
  Treat it as a secret: store it in the secret manager, server-only, never logged, never committed.
- **A Sentry DSN is public by design** — safe as a plain env var / client config. Don't over-protect it.
- Convention that scales to multi-env: one secret per environment (e.g. a dev webhook and a prod
  webhook), and the app selects by its own environment setting. Provision both in every stack so the
  service never fails to start on a missing one.

### ⚠️ Trap A — seed the secret as a plain string, not JSON-wrapped

A generic secret-seeding helper may store `{"KEY":"value"}` while the app injects the bare secret value
as the env var. Result: the env var holds a JSON blob, not a URL, the post silently fails, and you get a
200 with **no Slack message**. Seed the raw value if that's what the runtime expects, and verify what's
actually stored *and* what the running instance received — don't trust "seed succeeded."

### ⚠️ Trap B — an empty secret can crash container startup

On several container platforms, a secret with an empty value throws an initialization error and the task
never starts. Provision each alert secret with a placeholder value at create time (so a fresh stack
boots), then overwrite with the real URL — and make sure your infra tooling won't fight the manual seed
on the next apply.

## Step 3 — Gate behind a flag (off by default), then enable deliberately

- Put delivery behind a config flag, default **false**. Ship the code dark, enable per-environment once
  the secret is verified.
- If the flag lives in a YAML file, watch indentation — a wrong-indent edit can silently no-op. Probe
  the *deployed* value after applying; don't assume the file edit took.
- Correct order to go live: **seed secret → set flag → deploy (re-hydrate config)**. Doing config before
  secret, or forgetting the redeploy, yields a "configured but dead" alerting path.

## Step 4 — ⚠️ Trap C: a clone-forward deploy won't pick up a new secret on its own

If your deploy pipeline clones the currently-running config/task definition forward and treats it as
immutable outside CI, adding a new secret in IaC or a normal deploy can fail to wire it in — the running
instance doesn't have it, so the clone doesn't either. Bootstrap it once:

1. Register a new revision that includes the new secret entry (+ env mapping).
2. Seed the secret value (Step 2).
3. Force a new deployment against that revision.
4. From then on, deploys clone *that* revision forward and it sticks.

This single trap is the most common reason "I added Slack alerts and nothing happens in prod."

## Step 5 — Verify live

- Trigger a real error or send a real test event through the actual ingress (not a unit test). Confirm
  the message lands in the channel for each environment you enabled.
- Confirm the running instance shows the expected revision, the secret resolves to a URL (not JSON, not
  a placeholder), and the flag reads true in the *deployed* config.
- Re-trigger to confirm dedupe collapses repeats.
- For workers: kill/restart to confirm the shutdown flush and recovery notice fire.

## Per-environment go-live checklist

```
[ ] Reporting seam in place; report() + notify() wired at all failure points (incl. worker catch + 200-ack webhooks)
[ ] Slack webhook secret seeded plain (verified server-side), per-env, never client-exposed
[ ] Secret placeholder set so a fresh instance boots; infra tooling won't overwrite the manual seed
[ ] Sentry DSN wired (plain env ok); error boundary hooked up
[ ] Flag default false; enabled deliberately per env; deployed value probed, not assumed
[ ] Clone-forward deploys bootstrapped once with the new secret entry
[ ] Live test fired through real ingress → message seen in channel, per env
[ ] Dedupe + shutdown flush + recovery notice verified
```

## Anti-patterns

- Scattering ad-hoc Slack post calls through the codebase instead of one reporter seam.
- Seeding the webhook JSON-wrapped when the app wants the raw URL → silent no-op.
- Enabling the flag before the secret is verified → "configured but dead."
- Assuming a deploy picks up a new secret on a clone-forward pipeline (Trap C).
- Calling it done after a green deploy without seeing a real alert land in the channel.
- Letting a worker's poll-loop `try/except` swallow errors with no `report()`.
