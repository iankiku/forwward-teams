---
name: data
description: (forwward) Designs analytics systems, writes SQL queries, plans event tracking, and builds dashboards for product and user metrics. Triggers on SQL, analytics, dashboards, tracking, data pipelines, or user behavior analysis.
---

# Data — Analytics & Intelligence

Measure what matters. Every metric should drive a decision. If it doesn't, stop tracking it.

## Metric Hierarchy

| Level | Metric | Cadence |
|-------|--------|---------|
| North Star | 1 metric that defines success (e.g., WAU, MRR) | Weekly |
| Health | 3-5 metrics that predict north star (retention, activation, NPS) | Weekly |
| Feature | Per-feature usage, conversion, time-to-value | Per release |
| Debug | Granular events for troubleshooting | On-demand |

**Rules:**
- North star is singular. Two north stars = zero north stars.
- Vanity metrics (page views, total signups) are not health metrics.
- Every feature ships with tracking. No "we'll add analytics later."

## SQL Patterns

### Cohort Retention
```sql
SELECT
  DATE_TRUNC('week', u.created_at) AS cohort_week,
  DATE_TRUNC('week', e.created_at) AS activity_week,
  COUNT(DISTINCT e.user_id) AS active_users
FROM users u
JOIN events e ON e.user_id = u.id
GROUP BY 1, 2
ORDER BY 1, 2;
```

### Funnel Analysis
```sql
WITH steps AS (
  SELECT user_id,
    MAX(CASE WHEN event = 'signup' THEN 1 END) AS step_1,
    MAX(CASE WHEN event = 'onboard_complete' THEN 1 END) AS step_2,
    MAX(CASE WHEN event = 'first_action' THEN 1 END) AS step_3,
    MAX(CASE WHEN event = 'paid' THEN 1 END) AS step_4
  FROM events
  WHERE created_at > NOW() - INTERVAL '30 days'
  GROUP BY user_id
)
SELECT
  COUNT(*) AS total,
  SUM(step_1) AS signup,
  SUM(step_2) AS onboarded,
  SUM(step_3) AS activated,
  SUM(step_4) AS converted
FROM steps;
```

### Rolling Averages
```sql
SELECT
  date,
  value,
  AVG(value) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS rolling_7d
FROM daily_metrics;
```

## Event Tracking Design

Every event needs:

| Field | Example |
|-------|---------|
| `event_name` | `button_clicked`, `page_viewed`, `feature_used` |
| `user_id` | Authenticated user |
| `anonymous_id` | Pre-auth (cookie/device) |
| `timestamp` | ISO 8601, UTC always |
| `properties` | `{ page: "/pricing", plan: "pro" }` |

**Naming convention:** `noun_verb` — `form_submitted`, `file_uploaded`, `subscription_cancelled`

**Never:** `click`, `event1`, `trackThis`, `misc`

## Dashboard Rules

- **One question per dashboard.** "How is acquisition?" not "Everything."
- **Top-left = most important metric.** Eye lands there first.
- **Comparison always.** This week vs last week. This month vs last month.
- **No pie charts.** Use bar charts. Humans can't compare angles.
- **Annotate changes.** "Launched feature X" on the timeline.

## Data Pipeline Defaults

| Layer | Tool | Purpose |
|-------|------|---------|
| Collection | PostHog, Segment, or custom | Event ingestion |
| Storage | Postgres or BigQuery | Queryable warehouse |
| Transform | dbt or SQL views | Business logic layer |
| Visualization | Metabase, Grafana, or PostHog | Dashboards |

Keep it simple. You don't need Kafka until you have 10M events/day.
