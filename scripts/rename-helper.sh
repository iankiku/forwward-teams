#!/bin/bash
# Run this to complete the repo setup after rename
cd /Users/iankiku/starbase/forwward-teams

# Update remote
git remote set-url origin git@github.com:iankiku/forwward-teams.git

# Stage all changes
git add -A

# Show what will be committed
echo "=== Remote ==="
git remote -v
echo ""
echo "=== Status ==="
git status
echo ""
echo "=== Recent commits ==="
git log --oneline -5
