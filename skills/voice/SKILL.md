---
name: voice
description: (forwward) Creates and maintains personal voice guidelines in the voice/ directory that content skills (/write, /gtm, /pcp-engine, /sales) use to match the user's authentic writing style. Triggers on voice setup, tone review, writing style editing, or when content output feels generic.
---

# Voice — Personal Voice Guidelines

Your voice is the only thing AI can't fake well. This skill helps you capture it so every piece of content sounds like you.

## How It Works

All content skills (`/write`, `/gtm`, `/pcp-engine`, `/sales`) check for a `voice/` directory before writing. If found, they load your guidelines and apply them. If not found, they fall back to generic principles.

```
voice/
├── default.md       ← fallback for any platform
├── twitter.md
├── blog.md
├── newsletter.md
└── linkedin.md
```

## Step 1: Check Current State

```bash
ls voice/ 2>/dev/null || echo "No voice/ directory yet"
```

If no directory exists, offer to scaffold it.

## Step 2: Scaffold (if needed)

Create `voice/<platform>.md` for each platform. Each file uses this structure:

```markdown
# Voice — [Platform]

## Tone
<!-- How you sound: direct, warm, irreverent, technical, etc. -->

## What I always do
<!-- Patterns that feel natural: short sentences, open loops, specifics -->

## What I never do
<!-- Things that feel wrong: jargon, hedging, corporate speak -->

## Examples
<!-- Paste 2-3 real posts you wrote and liked -->
```

Start with `voice/default.md` if you only want one file.

## Step 3: Fill It In

Ask the user:

1. **Tone in one word** — how do they want to sound?
2. **One thing they always do** — a writing pattern they're known for
3. **One thing they hate** — what makes them cringe when they read it back
4. **One real example** — a post or paragraph they're proud of

Use their answers to populate the file. Don't paraphrase — use their exact words where possible.

## Step 4: Test It

Run `/write` on something small (a tweet, a paragraph). Ask: does this sound like you? Iterate until it does.

## Platforms

| File | Used when writing |
|------|------------------|
| `default.md` | Any platform not listed |
| `twitter.md` | X/Twitter threads and replies |
| `blog.md` | Long-form posts, essays |
| `newsletter.md` | Email newsletters |
| `linkedin.md` | LinkedIn posts and articles |

Add new files for any platform not listed — skills will pick them up automatically.

## Anti-Patterns

- **Don't describe your ideal voice** — describe your actual one. Review real posts you've written.
- **Don't overthink tone** — one adjective is enough. "Direct" or "warm" beats "I want to be authentic but also strategic."
- **Don't skip examples** — they're the most useful part. Skills use them as a reference anchor.
