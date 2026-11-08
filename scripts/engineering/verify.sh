#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT_DIR"

node scripts/engineering/check-docs.mjs
node scripts/engineering/check-workspace.mjs
