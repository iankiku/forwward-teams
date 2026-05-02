#!/usr/bin/env bash
# Runs after `gh pr merge` — bumps version, updates changelog, publishes npm + packages skill.
set -euo pipefail

cd /Users/iankiku/starbase/forwward-teams

echo "[post-merge] Bumping version and updating changelog..."
npm run changeset:version 2>/dev/null || true

# Commit version bump if files changed
if ! git diff --quiet; then
  git add package.json CHANGELOG.md .changeset/
  git commit -m "chore: version bump and changelog"
  git push
fi

echo "[post-merge] Publishing npm package..."
npm run changeset:publish 2>/dev/null || npm publish --access public

echo "[post-merge] Packaging standup skill..."
python3 /Users/iankiku/.claude/plugins/cache/claude-plugins-official/skill-creator/unknown/skills/skill-creator/scripts/package_skill.py \
  /Users/iankiku/starbase/forwward-teams/skills/standup 2>/dev/null || true

echo "[post-merge] Done."
