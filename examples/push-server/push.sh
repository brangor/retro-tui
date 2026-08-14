#!/usr/bin/env bash
# push.sh - Send messages to RetroTUI from shell scripts
#
# Usage:
#   ./push.sh log "Build started..."
#   ./push.sh status '{"cpu": 45, "mem": 2048}'
#   ./push.sh --channel=deploy log "Deploying to prod"
#   echo "Hello" | ./push.sh log
#
# Environment:
#   RETRO_PUSH_URL - Server URL (default: http://localhost:3001/push)
#   RETRO_CHANNEL  - Default channel (default: build)

set -e

URL="${RETRO_PUSH_URL:-http://localhost:3001/push}"
CHANNEL="${RETRO_CHANNEL:-build}"
TYPE=""
DATA=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --channel=*)
      CHANNEL="${1#*=}"
      shift
      ;;
    --url=*)
      URL="${1#*=}"
      shift
      ;;
    log|status|table|clear|error|warn|info)
      TYPE="$1"
      shift
      ;;
    *)
      DATA="$1"
      shift
      ;;
  esac
done

# Default type
TYPE="${TYPE:-log}"

# Read from stdin if no data provided
if [[ -z "$DATA" ]]; then
  if [[ ! -t 0 ]]; then
    DATA=$(cat)
  else
    echo "Usage: ./push.sh [--channel=NAME] TYPE DATA" >&2
    echo "Types: log, status, table, clear, error, warn, info" >&2
    exit 1
  fi
fi

# Build JSON payload
JSON=$(jq -n \
  --arg channel "$CHANNEL" \
  --arg type "$TYPE" \
  --arg data "$DATA" \
  '{channel: $channel, type: $type, data: $data}')

# Send to server
RESPONSE=$(curl -s -X POST "$URL" \
  -H "Content-Type: application/json" \
  -d "$JSON")

# Check response
if echo "$RESPONSE" | jq -e '.ok' > /dev/null 2>&1; then
  DELIVERED=$(echo "$RESPONSE" | jq -r '.delivered')
  echo "✓ Sent to $DELIVERED client(s)"
else
  ERROR=$(echo "$RESPONSE" | jq -r '.error // "Unknown error"')
  echo "✗ Failed: $ERROR" >&2
  exit 1
fi
