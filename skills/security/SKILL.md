---
name: security
description: (forwward) Implements authentication, authorization, encryption, HIPAA compliance, SOC 2 controls, and security hardening with defense-in-depth defaults. Triggers on auth, encryption, compliance, penetration testing, privacy, or any security concern.
---

# Security — Compliance & Protection

Assume breach. Defense in depth. Least privilege everywhere.

## Security Defaults

Every project ships with:

| Control | Implementation |
|---------|---------------|
| Auth | OAuth 2.0 / OIDC via Auth.js or Supabase Auth |
| Sessions | HTTP-only, Secure, SameSite=Strict cookies |
| Passwords | bcrypt/argon2, min 12 chars, no max limit |
| API auth | Bearer tokens with expiry, refresh rotation |
| CORS | Explicit allowlist, never `*` in production |
| HTTPS | Everywhere. No exceptions. HSTS headers. |
| CSP | Content-Security-Policy header on all pages |
| Rate limiting | Auth endpoints: 5/min. API: 100/min. Adjust per use. |

## OWASP Top 10 Quick Reference

| Vulnerability | Prevention |
|--------------|------------|
| Injection (SQL, NoSQL, OS) | Parameterized queries, ORMs, never string concat |
| Broken Auth | MFA, session timeouts, account lockout |
| Sensitive Data Exposure | Encrypt at rest + transit, minimize data collection |
| XXE | Disable external entity processing |
| Broken Access Control | Check permissions server-side on every request |
| Security Misconfiguration | Defaults off, hardened configs, no debug in prod |
| XSS | Output encoding, CSP headers, sanitize HTML |
| Insecure Deserialization | Validate and type-check all serialized data |
| Known Vulnerabilities | `npm audit`, `pip audit`, automated dependency updates |
| Insufficient Logging | Log auth events, access denied, input validation failures |

## HIPAA Compliance (Health-Tech)

**Required if handling PHI (Protected Health Information):**

| Requirement | Implementation |
|-------------|---------------|
| Encryption at rest | AES-256 for databases and file storage |
| Encryption in transit | TLS 1.2+ everywhere |
| Access controls | Role-based, audit-logged, least privilege |
| Audit trail | Every PHI access logged with who, what, when |
| BAA | Business Associate Agreement with every vendor touching PHI |
| Data minimization | Collect only what's clinically necessary |
| Breach notification | 60-day notification requirement — have a plan |
| Employee training | Annual security awareness training |

**PHI includes:** Names, dates, phone numbers, emails, SSN, medical record numbers, device IDs, biometric data, photos, and any data that could identify a patient.

**Vendor checklist:**
- Does your cloud provider sign BAAs? (AWS, GCP, Azure: yes. Many others: no.)
- Does your analytics tool see PHI? If yes, need BAA or strip PHI first.
- Does your error tracking capture PHI in stack traces? Strip it.

## SOC 2 Basics

| Trust Principle | What to Implement |
|----------------|-------------------|
| Security | Access controls, encryption, firewalls, IDS |
| Availability | Uptime monitoring, incident response, backups |
| Processing Integrity | Input validation, error handling, QA |
| Confidentiality | Encryption, access logging, data classification |
| Privacy | Consent, data retention, deletion, privacy policy |

**Start with:** Security + Availability. Add others when customers require it.

## Security Review Checklist

When reviewing code for security:

1. **Auth on every endpoint?** — Not just the route, but the data query too
2. **Input validated at boundary?** — Zod/Pydantic before any processing
3. **Secrets in env vars?** — Never in code, git, or client bundles
4. **SQL parameterized?** — No string concatenation, no template literals
5. **Error messages safe?** — No stack traces, no internal paths to users
6. **Deps up to date?** — `npm audit` / `pip audit` clean
7. **Logging sufficient?** — Auth events, permission failures, anomalies
8. **Data minimized?** — Only collecting what's needed, only retaining as long as required
