---
"@iankiku/forwward-teams": minor
---

Add 8 SRE/release skills: `/check` (pre-flight setup validator — `.env` contract, environment wiring), `/alert` (production error alerting bootstrap — Slack/Sentry, dedupe, secret/flag ordering traps), `/prlist` (read-only open-PR table across repos), `/recover` (incident response — stop the bleeding, then diagnose), `/vet` (go/no-go promotion readiness audit — catches the silent unsigned-commit block), `/link` (keeps every PR traced to a tracker issue — Linear/Jira/GitHub Issues), `/promote` (multi-environment release runbook with a destructive-footgun table), and `/harden` (adversarial hardening pass — security red-team, observability, anti-over-engineering).

Fix Dependabot alerts #2-#5: `js-yaml` transitive dependency pinned via `overrides` to `^4.3.0` (direct `@changesets/pre` line) and `^3.15.0` (nested `read-yaml-file` line, which still calls the removed-in-4.x `safeLoad` API — pinned within the 3.x line instead of force-upgrading to avoid breaking `changeset`).
