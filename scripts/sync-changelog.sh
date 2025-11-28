#!/bin/bash
# Script to manually sync CHANGELOG.md from platform repository
# Usage: ./scripts/sync-changelog.sh [branch] [token]
# Example: ./scripts/sync-changelog.sh LTR $GITHUB_TOKEN

set -euo pipefail

# Configuration
PLATFORM_REPO="${PLATFORM_REPO:-AsobaCloud/platform}"
PLATFORM_BRANCH="${1:-LTR}"
GITHUB_TOKEN="${2:-${GITHUB_TOKEN:-}}"
CHANGELOG_FILE="changelog.md"

echo "🔄 Syncing CHANGELOG from ${PLATFORM_REPO} (branch: ${PLATFORM_BRANCH})..."

# Build URL
CHANGELOG_URL="https://raw.githubusercontent.com/${PLATFORM_REPO}/${PLATFORM_BRANCH}/CHANGELOG.md"

# Download the changelog
if [ -n "$GITHUB_TOKEN" ]; then
  echo "📥 Fetching with authentication token..."
  curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3.raw" \
    -o /tmp/platform-changelog.md "$CHANGELOG_URL" || {
    echo "❌ Failed to fetch CHANGELOG from platform repository"
    exit 1
  }
else
  echo "📥 Fetching without authentication (public repo)..."
  curl -s -o /tmp/platform-changelog.md "$CHANGELOG_URL" || {
    echo "❌ Failed to fetch CHANGELOG from platform repository"
    echo "💡 If repository is private, provide GITHUB_TOKEN:"
    echo "   GITHUB_TOKEN=your_token ./scripts/sync-changelog.sh"
    exit 1
  }
fi

# Check if file was downloaded successfully
if [ ! -s /tmp/platform-changelog.md ]; then
  echo "❌ Downloaded changelog is empty"
  echo "💡 Check that the repository, branch, and file path are correct"
  exit 1
fi

echo "✅ Downloaded $(wc -l < /tmp/platform-changelog.md) lines"

# Extract the content (skip front matter if present)
if grep -q "^---" /tmp/platform-changelog.md; then
  echo "📝 Extracting content (removing front matter)..."
  # Has front matter, extract content after second ---
  sed -n '/^---$/,/^---$/!{ /^---$/d; p; }' /tmp/platform-changelog.md | sed '1d' > /tmp/changelog-content.md
else
  # No front matter, use as-is
  cp /tmp/platform-changelog.md /tmp/changelog-content.md
fi

# Preserve the front matter from our changelog.md
echo "📋 Preserving Jekyll front matter..."
head -n 5 "$CHANGELOG_FILE" > /tmp/front-matter.md

# Combine front matter with new content
cat /tmp/front-matter.md > /tmp/new-changelog.md
echo "" >> /tmp/new-changelog.md
cat /tmp/changelog-content.md >> /tmp/new-changelog.md

# Check if content has changed
if ! cmp -s "$CHANGELOG_FILE" /tmp/new-changelog.md; then
  echo "📝 Content has changed, updating changelog.md..."
  cp /tmp/new-changelog.md "$CHANGELOG_FILE"
  echo "✅ Successfully updated changelog.md"
  echo ""
  echo "📊 Summary:"
  echo "   - Old: $(wc -l < "$CHANGELOG_FILE") lines"
  echo "   - New: $(wc -l < /tmp/new-changelog.md) lines"
  echo ""
  echo "💡 Next steps:"
  echo "   git add changelog.md"
  echo "   git commit -m 'chore: sync changelog from platform repository'"
  echo "   git push"
else
  echo "ℹ️  No changes detected - changelog is already up to date"
fi
