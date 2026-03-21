#!/bin/bash
# PostToolUse hook for Write/Edit — runs fast lint on changed files
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [ -z "$FILE" ]; then exit 0; fi

# Walk up from file to find project root (has node_modules or package.json)
find_root() {
  local dir="$1"
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/package.json" ]; then echo "$dir"; return; fi
    dir=$(dirname "$dir")
  done
}

ROOT=$(find_root "$(dirname "$FILE")")
if [ -z "$ROOT" ]; then exit 0; fi

case "$FILE" in
  *.ts|*.tsx)
    cd "$ROOT" && npx eslint --no-warn-ignored "$FILE" 2>/dev/null || true
    ;;
  *.js|*.jsx|*.mjs|*.cjs)
    cd "$ROOT" && npx eslint --no-warn-ignored "$FILE" 2>/dev/null || true
    ;;
  *.py)
    command -v ruff >/dev/null 2>&1 && ruff check "$FILE" 2>/dev/null || true
    ;;
esac

exit 0
