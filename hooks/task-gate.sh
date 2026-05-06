#!/bin/bash
# PostToolUse hook for Write/Edit — runs fast lint on changed files.
# Surfaces failures back to Claude via exit 2 so they can be fixed in-loop.
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
if [ -z "$FILE" ]; then exit 0; fi

find_root() {
  local dir="$1"
  while [ "$dir" != "/" ]; do
    if [ -f "$dir/package.json" ]; then echo "$dir"; return 0; fi
    dir=$(dirname "$dir")
  done
  return 1
}

ROOT=$(find_root "$(dirname "$FILE")")
if [ -z "$ROOT" ]; then exit 0; fi

run_check() {
  local out status
  out=$("$@" 2>&1)
  status=$?
  # 127 = command not found; treat as no-op rather than failure
  if [ $status -ne 0 ] && [ $status -ne 127 ]; then
    echo "$out" >&2
    exit 2
  fi
}

case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs)
    cd "$ROOT" && run_check npx --no-install eslint --no-warn-ignored "$FILE"
    ;;
  *.py)
    if command -v ruff >/dev/null 2>&1; then
      run_check ruff check "$FILE"
    fi
    ;;
esac

exit 0
