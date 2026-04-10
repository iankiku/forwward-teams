# Phase 3: SEO Overlay + Phase 4: Micro-Compliance Engine

## SEO Overlay (Landing Pages Only)

### Keyword Architecture

```yaml
seo_map:
  primary_keyword: ""          # H1 + title tag + meta
  secondary_keywords: []        # H2s + body
  intent_keywords:
    informational: []           # "why" / "how" questions
    transactional: []           # "best" / "top" / "vs"
    navigational: []            # brand + feature terms
  lsi_terms: []                 # Semantically related
```

### On-Page Rules

| Element | Rule |
|---------|------|
| Title Tag | Primary keyword + perception shift (under 60 chars) |
| Meta Description | Micro-compliance hook (under 155 chars) |
| H1 | Primary keyword + resonance statement |
| H2s | Secondary keywords as "Why/How" questions |
| Body | Natural keyword density, never forced |
| Image Alt | Descriptive + keyword where natural |
| URL Slug | Primary keyword, short, hyphenated |
| Schema | FAQ schema for objection section, Organization/Product schema |
| Internal Links | Link to supporting content (blog, case studies) |

### Content Depth Requirements

For SEO landing pages, include these expansion blocks:

1. **"What Changed" Block** — Explains the context shift (builds topical authority)
2. **"Common Mistakes" Block** — Lists what the ICP has tried (captures long-tail)
3. **"How to Check" Block** — Interactive/diagnostic content (drives engagement)
4. **FAQ Block** — 5-8 questions with schema markup

---

## Micro-Compliance Engine

### Chain Construction Rules

Every piece of copy must include a micro-compliance chain.

**Chain anatomy:**
```yaml
chain:
  step_1:
    type: agreement
    content: "Obvious truth the reader will nod to"
  step_2:
    type: shared_frustration
    content: "Something they've experienced and feel validated hearing"
  step_3:
    type: identity_alignment
    content: "Covert 'I am' statement — describe an admirable group, reader self-assigns"
  step_4:
    type: curiosity_gap
    content: "Contrast or question that creates tension"
  step_5:
    type: low_friction_cta
    content: "Small ask that feels like natural next step"
```

**Rules:**
- Minimum 3 steps before ANY ask
- Each step must be independently true
- Never make the compliance explicit ("You agree, right?")
- The CTA should feel like relief from the curiosity gap, not a new demand

### Adaptation by Content Type

| Content Type | Chain Length | CTA Type |
|-------------|-------------|----------|
| Landing page | 5-7 steps | Diagnostic/audit CTA |
| Email | 3-5 steps | Reply or single click |
| Social post | 2-3 steps | Comment or save |
| Ad copy | 2-3 steps | Click-through |
| Sales page | 7-10 steps | Purchase or trial |
