---
name: legal
description: (forwward) Drafts terms of service, privacy policies, contracts, IP assignments, and open source licensing after gathering industry and jurisdictional context. Triggers on legal documents, terms, privacy policies, contracts, compliance, licensing, or any legal drafting need.
---

# Legal — Startup Legal Counsel

Draft legal documents that protect you without $500/hr bills. Always get real lawyer review before publishing.

**DISCLAIMER: AI-generated legal documents are starting points, not legal advice. Have a licensed attorney review before use.**

## Step 0: Gather Context

Before drafting anything, ask:

1. **What industry?** — Health-tech, fintech, SaaS, marketplace, etc. (determines regulatory requirements)
2. **What jurisdiction?** — US (which state), EU (GDPR), UK, etc.
3. **What data do you collect?** — PII, PHI, financial data, usage data
4. **B2B or B2C?** — Changes liability, dispute resolution, language complexity
5. **Existing docs?** — Read current terms, privacy policy, contracts before drafting new ones

## Step 1: Review Existing Documents

If the company has existing legal documents:

- Read them fully before proposing changes
- Identify gaps vs current requirements
- Note outdated clauses (e.g., pre-GDPR privacy language)
- Preserve custom clauses the company specifically negotiated
- Flag conflicts between documents (privacy policy says X, terms say Y)

## Document Templates

### Terms of Service

| Section | Must Include |
|---------|-------------|
| Service description | What you provide, what you don't |
| User obligations | Acceptable use, account responsibility |
| Payment terms | Billing, refunds, cancellation |
| IP ownership | Who owns what — your platform vs their data |
| Limitation of liability | Cap at fees paid, exclude consequential damages |
| Termination | How either party can end the relationship |
| Dispute resolution | Arbitration vs litigation, jurisdiction |
| Changes to terms | How you notify users of updates |

### Privacy Policy

| Section | Must Include |
|---------|-------------|
| Data collected | Specific types, not "we may collect information" |
| How it's used | Each purpose explicitly stated |
| Who it's shared with | Third parties by name/category |
| Retention period | How long, why, and deletion process |
| User rights | Access, deletion, portability (GDPR/CCPA) |
| Security measures | Encryption, access controls (high level) |
| Cookie policy | What cookies, what for, how to opt out |
| Contact | DPO or privacy contact email |

### Industry-Specific Requirements

| Industry | Additional Requirements |
|----------|----------------------|
| Health-tech | HIPAA BAA, PHI handling, breach notification, patient consent |
| Fintech | PCI DSS compliance, financial data handling, regulatory disclosures |
| EdTech | COPPA (if under 13), FERPA (student records), parental consent |
| Marketplace | Seller terms, buyer protection, dispute resolution between parties |
| AI/ML | Data usage for training disclosure, algorithmic transparency, bias |

## Contractor & Employment

| Document | When Needed |
|----------|-------------|
| IP Assignment | Every contractor and employee — before they write code |
| NDA | Before sharing proprietary information |
| Contractor Agreement | Any non-employee doing work — scope, payment, IP, termination |
| Advisor Agreement | Equity grants, time commitment, confidentiality |
| Employment Offer | Salary, equity, benefits, at-will status, IP assignment |

**Critical:** IP assignment must be signed BEFORE work begins. Retroactive assignment is legally weaker.

## Open Source Licensing

| License | Can Use In Commercial Product? | Must Open Source Your Code? |
|---------|-------------------------------|---------------------------|
| MIT | Yes | No |
| Apache 2.0 | Yes | No (but patent grant) |
| BSD | Yes | No |
| LGPL | Yes (if dynamically linked) | Only modifications to the library |
| GPL | Yes | Yes — entire derivative work |
| AGPL | Yes | Yes — even for SaaS (network use) |

**Rules:**
- Audit dependencies: `license-checker` (npm) or `pip-licenses` (Python)
- GPL/AGPL in your dependency tree = your code may need to be open source
- When in doubt, use MIT for your own projects

## Drafting Rules

1. **Plain language.** If a user can't understand it, it won't hold up well and it erodes trust.
2. **Specific over vague.** "We retain data for 24 months" not "We retain data as needed."
3. **Match what you actually do.** Don't copy Google's terms — your practices are different.
4. **Version and date.** Every document has a "Last updated" date and version number.
5. **Consistent terminology.** If the privacy policy says "Personal Data," terms should too.
