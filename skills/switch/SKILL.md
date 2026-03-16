---
name: switch
description: Use when migrating to another AI platform — exports all stored memories, context, preferences, and instructions so you can import them elsewhere
---

# Switch — Platform Migration

Export everything your AI knows about you. Move to any platform without starting over.

## When to Use

- Switching from one AI assistant to another
- Backing up your context before a reset
- Auditing what an AI has stored about you
- Setting up a new AI with your existing preferences

## Export Prompt

Copy and paste this into your current AI assistant to extract everything:

```
I'm moving to another service and need to export my data. List every memory you have stored about me, as well as any context you've learned about me from past conversations. Output everything in a single code block so I can easily copy it.

Format each entry as:
[date saved, if available] - memory content

Make sure to cover all of the following — preserve my words verbatim where possible:

1. Instructions I've given you about how to respond (tone, format, style, "always do X", "never do Y")
2. Personal details: name, location, job, family, interests
3. Projects, goals, and recurring topics
4. Tools, languages, and frameworks I use
5. Preferences and corrections I've made to your behavior
6. Any other stored context not covered above

Do not summarize, group, or omit any entries.

After the code block, confirm whether that is the complete set or if any remain.
```

## Import

After exporting, import into your new platform:

| Platform | How to Import |
|----------|---------------|
| Claude | Paste at https://claude.com/import-memory |
| ChatGPT | Settings → Personalization → Memory → paste as instructions |
| Gemini | Add to GEMINI.md in your project root |
| Local AI | Add to system prompt or context file |

## Tips

- Run the export prompt **before** deleting your account
- Save the export as a file — `my-ai-context-YYYY-MM-DD.md`
- Review before importing — remove anything outdated
- Re-export quarterly to keep your backup current
