#!/usr/bin/env bash
# init-memory.sh — Initialize local memory directories for a team member
#
# Run this once after cloning the teamNebula workspace:
#   .claude/scripts/init-memory.sh
#
# Creates memory/ and agent-memory/ with starter MEMORY.md files.
# These directories are gitignored (session-specific per developer).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_DIR="$(dirname "$SCRIPT_DIR")"

GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
ok()   { printf "${GREEN}  ✓ %s${NC}\n" "$1"; }
info() { printf "${CYAN}  → %s${NC}\n" "$1"; }

# ── Main memory ────────────────────────────────────────────────────────────────

MEMORY_DIR="$CLAUDE_DIR/memory"
MEMORY_FILE="$MEMORY_DIR/MEMORY.md"
LEARNINGS_DIR="$MEMORY_DIR/learnings"
LEARNINGS_FILE="$LEARNINGS_DIR/notes.md"

mkdir -p "$LEARNINGS_DIR"

if [[ ! -f "$MEMORY_FILE" ]]; then
  info "Creating memory/MEMORY.md"
  cat > "$MEMORY_FILE" << 'MEMORY'
# teamNebula Workspace Memory

## Workspace
- Root: `/Users/iankiku/starbase/teamNebula/` (NOT a git repo itself)
- 10 managed repos — see ALL_REPOS in scripts/setup-git-rules.sh

## Git Rules (all repos)
- Branch naming: `feat/fe-*`, `feat/be-*`, `bug-fix/*`, `hot-fix/*`
- Commits: Conventional Commits format — `type(scope): title` + blank line + body (min 10 chars)
- No direct push to `main`, no force push, no `--no-verify`
- Hooks: Husky for JS repos, shell symlinks for non-JS repos

## Key Files
- `.claude/git-hooks/` — central hook scripts (commit-msg, pre-push, utils.sh)
- `.claude/rules/worktree-rules.md` — worktree lock/claim protocol
- `scripts/setup-git-rules.sh` — reinstall hooks across repos (args: --repo, --docs-only)
- `scripts/init-memory.sh` — this script, run after cloning

## JS Repos (Husky)
hyper_flow, Production-maria-chat, neb-meeting-assistant, teamnebula.ai, hyperscaleos, mcp-tools

## Non-JS Repos (shell symlinks)
Nebulanex.ai (archived), hyperreach-x, reddit-machine, neb-server-automation

## Notes
<!-- Add your session learnings here -->
MEMORY
  ok "memory/MEMORY.md created"
else
  ok "memory/MEMORY.md already exists — skipping"
fi

if [[ ! -f "$LEARNINGS_FILE" ]]; then
  info "Creating memory/learnings/notes.md"
  touch "$LEARNINGS_FILE"
  ok "memory/learnings/notes.md created"
else
  ok "memory/learnings/notes.md already exists — skipping"
fi

# ── Agent memory ───────────────────────────────────────────────────────────────

AGENT_MEMORY_DIR="$CLAUDE_DIR/agent-memory"
AGENT_ROLES=("backend-developer" "frontend-developer" "fullstack-developer" "code-reviewer" "general-purpose")

for role in "${AGENT_ROLES[@]}"; do
  role_dir="$AGENT_MEMORY_DIR/$role"
  role_file="$role_dir/MEMORY.md"
  mkdir -p "$role_dir"

  if [[ ! -f "$role_file" ]]; then
    info "Creating agent-memory/$role/MEMORY.md"
    cat > "$role_file" << AGENTMEM
# Agent Memory — $role

## Workspace Context
- This is the NebulaNexus-AI teamNebula workspace
- All 10 repos enforce Conventional Commits and branch naming via git hooks
- DDD (Domain-Driven Design) is required in all repos — see each repo's AGENTS.md

## Notes
<!-- Agent learnings are written here automatically during sessions -->
AGENTMEM
    ok "agent-memory/$role/MEMORY.md created"
  else
    ok "agent-memory/$role/MEMORY.md already exists — skipping"
  fi
done

echo ""
printf "${GREEN}Memory initialized. These files are gitignored (yours only).${NC}\n"
echo "Edit .claude/memory/MEMORY.md to add workspace notes that persist across sessions."
