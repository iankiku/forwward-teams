---
name: design
description: (forwward) Enforces anti-slop UI/UX standards with deliberate choices for color, typography, layout, and components — fights generic AI aesthetics. Triggers on UI/UX decisions, component design, color choices, layouts, typography, or visual design review.
---

# Design — Anti-Slop UI/UX

You have taste. Generic AI design is the enemy — purple gradients, stock-photo heroes, rounded-everything, glassmorphism-for-no-reason. Build interfaces that look like a human designer made them.

## The Anti-Slop Checklist

Before shipping any design, verify NONE of these are present:

| AI Slop Signal | Fix |
|----------------|-----|
| Purple/blue gradient backgrounds | Use brand colors or neutral tones with purpose |
| Generic hero with "Welcome to [Product]" | Lead with the user's first action or key metric |
| Rounded cards with drop shadows everywhere | Pick one elevation system and be consistent |
| Stock illustration style (Humaaans, unDraw) | Use real screenshots, data, or nothing |
| Glassmorphism / aurora effects | Only if your brand demands it — otherwise, stop |
| 47 different font sizes | Max 4 sizes per page. Type scale or nothing. |
| Rainbow of accent colors | 1 primary, 1 secondary, 1 destructive. Done. |
| Decorative icons on every feature | Icons should aid comprehension, not fill space |
| "Powered by AI" badges everywhere | Users don't care how it works, they care that it works |

## Design Principles

1. **Clarity over decoration.** Every element earns its pixels. If it doesn't help the user, remove it.
2. **Hierarchy is everything.** One primary action per screen. One thing the eye hits first.
3. **Density where it matters.** Dashboards should be dense. Onboarding should breathe. Know the difference.
4. **Consistency beats novelty.** Reuse patterns. Surprise is a bug in UI.
5. **Design for real data.** Names are 3-40 chars. Tables have 200 rows. Empty states exist.

## Color

```
Background:   neutral-50 or white (light) / neutral-900+ (dark)
Surface:      neutral-100 / neutral-800
Border:       neutral-200 / neutral-700
Text primary: neutral-900 / neutral-50
Text secondary: neutral-500 / neutral-400
Primary:      ONE saturated color from your brand
Destructive:  red-600
Success:      green-600
Warning:      amber-500
```

**Rules:**
- Never use color as the only indicator — add icons or text for accessibility
- Test contrast ratios: 4.5:1 minimum for text (WCAG AA)
- Dark mode is not "invert everything" — it's a separate intentional palette

## Typography

| Role | Size | Weight |
|------|------|--------|
| Page title | 24-30px | 600-700 |
| Section heading | 18-20px | 600 |
| Body | 14-16px | 400 |
| Caption / helper | 12-13px | 400 |

- One typeface for UI (Inter, system-ui, or your brand font)
- Second typeface only for marketing pages, if at all
- Line height: 1.5 for body, 1.2 for headings

## Layout

- **Max content width:** 1280px for apps, 720px for text-heavy pages
- **Spacing scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64)
- **Grid:** 12-column for dashboards, single-column for forms
- **Mobile-first:** Design the constrained version first, then expand

## Component Patterns

### Every component needs:
1. **Default state** — normal appearance
2. **Hover/focus** — interactive feedback
3. **Loading** — skeleton or spinner
4. **Empty** — helpful message + action
5. **Error** — what went wrong + how to fix
6. **Disabled** — visually muted, cursor not-allowed

### Navigation
- Top nav for < 5 items
- Sidebar for 5+ items or deep hierarchy
- Never both simultaneously (pick one)

### Forms
- Labels above inputs (not inside as placeholder)
- Inline validation on blur, not on every keystroke
- Error messages next to the field, not in a toast
- Primary action on the right (or full-width on mobile)

## Review Checklist

When reviewing any UI:

1. **Squint test** — Can you tell what's important with blurred vision?
2. **5-second test** — Can a new user identify the primary action in 5 seconds?
3. **Real data test** — Does it work with long names, empty states, 500 items?
4. **Accessibility** — Keyboard navigable? Screen reader labels? Contrast ratios?
5. **Slop check** — Would this look at home in a generic AI template gallery? If yes, redesign.
