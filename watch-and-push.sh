#!/bin/bash

# Watch for file changes and auto-commit/push
# Usage: ./watch-and-push.sh

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}📁 Watching for file changes...${NC}"
echo "Press Ctrl+C to stop"

# Function to commit and push
commit_and_push() {
    echo -e "${YELLOW}📝 Changes detected, committing...${NC}"

    git add -A

    if git diff --cached --quiet; then
        echo "No staged changes"
        return
    fi

    TIMESTAMP=$(date +'%Y-%m-%d %H:%M:%S')
    git commit -m "Auto-update: $TIMESTAMP"

    echo -e "${GREEN}📤 Pushing to GitHub...${NC}"
    git push origin main

    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Successfully pushed to GitHub${NC}"
    else
        echo -e "${RED}❌ Failed to push to GitHub${NC}"
    fi
}

# Watch for changes using fswatch (if available) or inotify
if command -v fswatch &> /dev/null; then
    fswatch -r src/ index.html package.json vite.config.js netlify.toml | while read file; do
        commit_and_push
    done
elif command -v inotifywait &> /dev/null; then
    while true; do
        inotifywait -r -e modify,create,delete src/ index.html package.json vite.config.js netlify.toml
        commit_and_push
    done
else
    echo -e "${RED}Error: fswatch or inotify-tools not installed${NC}"
    echo "Install with: brew install fswatch  (macOS)"
    echo "or: apt-get install inotify-tools  (Linux)"
    exit 1
fi
