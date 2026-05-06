#!/bin/bash
# PreToolUse hook for Bash — blocks common destructive patterns.
# Defense in depth, not a security boundary: regex-based command filtering is fundamentally bypassable.
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
if echo "$COMMAND" | grep -iE '(git push (--force|-f|--force-with-lease)|git reset --hard|git checkout -- |git clean -fd|rm -rf (/|~|\$HOME|\*)|sudo rm -rf|DROP TABLE|DROP DATABASE|TRUNCATE TABLE)' > /dev/null; then
  echo "Blocked: Destructive command detected. Use with explicit user approval." >&2
  exit 2
fi
exit 0
