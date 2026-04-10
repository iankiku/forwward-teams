# Phase 5: Refinement Loop + Audit Mode

## Iterative Refinement Loop

Every output goes through refinement. Iterate, not ship first drafts.

### Loop Protocol

```
FOR each variant (1 to N):
  1. Generate initial draft using Phases 1-4
  2. Run AUDIT checks (see below)
  3. Log version with scores
  4. Identify weakest section
  5. Rewrite weakest section only
  6. Re-run AUDIT checks
  7. Log new version with scores
  8. REPEAT until all scores >= 7/10 OR 3 iterations reached
  9. Present final version with change log
```

### Version Log Format

```yaml
version_log:
  variant: 1
  iteration: 1
  scores:
    resonance_vs_direction: 0  # 1-10
    perception_shift_clarity: 0
    context_urgency: 0
    permission_presence: 0
    micro_compliance_chain: 0
    seo_alignment: 0           # landing pages only
    identity_encoding: 0
    overall: 0
  weakest_section: ""
  changes_made: ""
```

### Audit Checklist (Applied Each Iteration)

| Check | Question | Pass Criteria |
|-------|----------|--------------|
| Resonance | Does the H1 resonate or direct? | Reader thinks "this gets me," not "they want my money" |
| Perception Shift | Is there a clear before/after frame? | Old belief → New lens is explicit |
| Context | Is there a "Why Now" trigger? | Specific, novel, verifiable |
| Permission | Are barriers addressed? | At least 2 permission statements |
| Micro-Compliance | Are there progressive agreements? | 3+ "yes" moments before CTA |
| Identity | Does copy encode identity? | Reader self-assigns to aspirational group |
| Script Surfacing | Are internal scripts called out? | At least 1 "you've been told..." moment |
| Non-Performative | Does it feel like truth or marketing? | No hype words, no exclamation marks in body |
| SEO | Keywords natural and well-placed? | Primary in H1, secondaries in H2s |
| CTA | Is the CTA low-friction? | Value-first, not command-first |

### Scoring Guide

| Score | Meaning |
|-------|---------|
| 1-3 | Fundamentally broken — rewrites needed |
| 4-6 | Functional but generic — lacks PCP depth |
| 7-8 | Strong — PCP framework applied well |
| 9-10 | Elite — would study this as a case study |

---

## Audit Mode (Stress Test Existing Copy)

When auditing existing copy, run these 5 tests:

### Test 1: Resonance vs Direction
- Read the first 3 lines. Do they enter the reader's world or push a product?
- **Fail:** Copy starts with features, commands, or "we" statements
- **Pass:** Copy starts with the reader's experience, frustration, or identity

### Test 2: Contextual "Why Now"
- Is there a novel, specific reason to act today?
- **Fail:** Generic urgency ("limited time") or no urgency at all
- **Pass:** Specific industry/technology/market shift that's verifiable

### Test 3: Permission Layer
- Does the copy remove guilt, fear, or confusion?
- **Fail:** Copy creates pressure without release
- **Pass:** At least 2 permission-granting statements

### Test 4: Micro-Compliance Chain
- Are there progressive agreements leading to the CTA?
- **Fail:** Jumps from headline to CTA, or uses only logical arguments
- **Pass:** 3+ observation-based "yes" moments before the ask

### Test 5: SEO Integrity (Landing Pages)
- Is keyword placement natural and complete?
- **Fail:** Keyword stuffing, missing from H1/H2s, no schema
- **Pass:** Primary keyword in H1, secondaries in H2s, FAQ schema present

### Audit Output Format

```yaml
audit_report:
  url_or_title: ""
  overall_score: 0  # /10
  test_results:
    resonance_vs_direction:
      score: 0
      finding: ""
      rewrite_suggestion: ""
    contextual_why_now:
      score: 0
      finding: ""
      rewrite_suggestion: ""
    permission_layer:
      score: 0
      finding: ""
      rewrite_suggestion: ""
    micro_compliance:
      score: 0
      finding: ""
      rewrite_suggestion: ""
    seo_integrity:
      score: 0
      finding: ""
      rewrite_suggestion: ""
  priority_fixes:
    1: ""
    2: ""
    3: ""
  full_rewrite_available: true
```
