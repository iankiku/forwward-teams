---
name: finance
description: (forwward) Models unit economics, burn rate, projections, pricing, and revenue forecasting with startup-specific frameworks. Triggers on CAC, LTV, burn rate, runway, pricing analysis, financial models, or any CFO-level financial question.
---

# Finance — Unit Economics & Financial Models

Know your numbers. Every dollar in, every dollar out, every dollar you'll need.

## Unit Economics

| Metric | Formula | Healthy Range |
|--------|---------|---------------|
| CAC | Total acquisition spend / new customers | Depends on LTV |
| LTV | ARPU × gross margin × avg lifespan (months) | LTV > 3× CAC |
| LTV:CAC | LTV / CAC | 3:1 to 5:1 |
| Payback period | CAC / (ARPU × gross margin) | < 12 months |
| Gross margin | (Revenue - COGS) / Revenue | > 70% for SaaS |
| Net revenue retention | (Start MRR + expansion - contraction - churn) / Start MRR | > 100% |
| Burn multiple | Net burn / net new ARR | < 2× good, < 1× great |

**Rules:**
- If you don't know your CAC, you don't know if your growth is profitable.
- LTV:CAC < 1 means you lose money on every customer. Stop spending.
- Payback period > 18 months = you need a lot of capital to grow.

## Burn Rate & Runway

```
Monthly burn = monthly expenses - monthly revenue
Runway (months) = cash in bank / monthly burn
```

| Runway | Action |
|--------|--------|
| 18+ months | Comfortable. Invest in growth. |
| 12-18 months | Start fundraising conversations. |
| 6-12 months | Cut non-essential spend. Raise urgently. |
| < 6 months | Survival mode. Cut to break-even or close. |

**Track weekly:** Cash balance, burn rate, revenue. No surprises.

## Revenue Forecasting

### Bottom-Up (Preferred)
```
Monthly revenue = active customers × ARPU
Customer growth = new customers - churned customers
New customers = leads × conversion rate
```

### Top-Down (For Context Only)
```
TAM × achievable market share = revenue potential
```

**Never forecast top-down to investors.** They'll ask how you get there. Bottom-up shows the engine.

## Pricing Math

| Question | How to Answer |
|----------|---------------|
| What should I charge? | 10× the value delivered, or anchor to alternatives |
| Should I raise prices? | If <5% of prospects mention price as objection, yes |
| Free tier? | Only if virality/network effects justify it |
| Annual discount? | 15-20% discount for annual. Improves cash flow + retention |
| Per-seat vs usage? | Per-seat if value scales with people. Usage if value scales with volume. |

## Financial Model Template

Build a 24-month model with these tabs:

| Tab | Contents |
|-----|----------|
| Revenue | MRR by cohort, expansion, churn, net new |
| Costs | People, infra, tools, marketing, G&A |
| Headcount | By function, with start dates and salaries |
| Cash | Opening balance, revenue, expenses, closing balance, runway |
| Metrics | CAC, LTV, burn multiple, gross margin, NRR |

**Rules:**
- Separate assumptions from calculations. Every input in one place.
- Scenario model: base, optimistic, pessimistic. Share base with investors.
- Update monthly with actuals vs forecast. Calibrate assumptions.

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Ignoring COGS | SaaS COGS = hosting + support + payment processing |
| Counting revenue before collection | Cash ≠ bookings ≠ revenue. Know the difference. |
| Hiring ahead of revenue | Every hire adds ~12 months of burn commitment |
| No scenario planning | "Plan for the best, model for the worst" |
| Forgetting payment processing fees | Stripe takes 2.9% + 30¢. At scale, this matters. |
