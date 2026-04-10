.PHONY: help install pack clean test link unlink changeset version publish release dry-run check

# ─── Default ───
help:
	@echo "forwward-teams — package & release automation"
	@echo ""
	@echo "Setup:"
	@echo "  make install          Install dependencies (bun)"
	@echo "  make link             Link CLI globally for local testing"
	@echo "  make unlink           Remove global link"
	@echo ""
	@echo "Build:"
	@echo "  make pack             Create tarball in dist/"
	@echo "  make clean            Remove dist/"
	@echo "  make test             Test CLI from packed tarball in a temp dir"
	@echo ""
	@echo "Release:"
	@echo "  make changeset        Record a change (intent file) — run after making changes"
	@echo "  make version          Consume changesets, bump version, update CHANGELOG.md"
	@echo "  make dry-run          Preview what would be published"
	@echo "  make check            Verify npm login + package ready to publish"
	@echo "  make publish          Publish to npm (runs check first)"
	@echo "  make release          Full flow: version → pack → publish → tag"
	@echo ""

# ─── Setup ───
install:
	bun install

link:
	bun link
	@echo ""
	@echo "Linked. Try: fwd help"

unlink:
	bun unlink @iankiku/forwward-teams 2>/dev/null || true
	@echo "Unlinked."

# ─── Build ───
pack: clean
	@mkdir -p dist
	npm pack --pack-destination dist
	@echo ""
	@echo "Tarball created in dist/"
	@ls -lh dist/*.tgz

clean:
	rm -rf dist
	@echo "Cleaned dist/"

test: pack
	@TEST_DIR=$$(mktemp -d) && \
		TGZ=$$(ls dist/*.tgz | head -1) && \
		echo "Installing $$TGZ to $$TEST_DIR..." && \
		cd "$$TEST_DIR" && \
		npm init -y > /dev/null && \
		npm install "$(PWD)/$$TGZ" > /dev/null && \
		echo "✓ Install succeeded" && \
		./node_modules/.bin/fwd help && \
		echo "" && \
		echo "✓ CLI works. Test dir: $$TEST_DIR"

# ─── Changesets ───
changeset:
	bunx changeset

version:
	bunx changeset version
	@echo ""
	@echo "Version bumped. Review CHANGELOG.md and package.json, then run: make publish"

# ─── Release ───
dry-run:
	@echo "=== Package Contents ==="
	@npm pack --dry-run 2>&1 | grep "npm notice"
	@echo ""
	@echo "=== Current Version ==="
	@node -p "require('./package.json').name + '@' + require('./package.json').version"

check:
	@echo "=== Pre-publish check ==="
	@echo ""
	@echo "Logged in as:"
	@npm whoami || (echo "Not logged in. Run: npm login" && exit 1)
	@echo ""
	@echo "Package:"
	@node -p "require('./package.json').name + '@' + require('./package.json').version"
	@echo ""
	@echo "Files to publish:"
	@npm pack --dry-run 2>&1 | grep "npm notice" | grep -v "name:\|version:\|filename:\|Tarball\|shasum\|integrity\|package size\|unpacked size\|total files\|@iankiku" | wc -l | xargs echo "  "

publish: check
	@echo ""
	@read -p "Publish to npm? [y/N] " confirm && [ "$$confirm" = "y" ] || exit 1
	npm publish --access public
	@echo ""
	@echo "Published. Verify: npx $$(node -p "require('./package.json').name") help"

release: version pack publish
	@VERSION=$$(node -p "require('./package.json').version") && \
		git add -A && \
		git commit -m "release: v$$VERSION" && \
		git tag "v$$VERSION" && \
		echo "" && \
		echo "Release v$$VERSION complete. Push with: git push --follow-tags"
