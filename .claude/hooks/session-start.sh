#!/bin/bash
set -euo pipefail

# SessionStart hook for Claude Code on the web.
# Installs npm dependencies so the dev server, type-check, and build work.
# Web-only: skip on local machines where the user manages their own setup.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Idempotent: npm install is safe to re-run and benefits from container caching.
npm install
