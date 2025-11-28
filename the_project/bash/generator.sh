#!/usr/bin/env bash
set -e

echo "Fetching random Wikipedia article..."

URL=$(curl -s -I https://en.wikipedia.org/wiki/Special:Random | grep -i "^location:" | awk '{print $2}' | tr -d '\r')

TODO_DESC="Read $URL"

echo "Creating TODO: $TODO_DESC"

curl -X POST \
  -H "Content-Type: application/json" \
  -d "{\"description\":\"$TODO_DESC\"}" \
  "$BACKEND_SERVICE_URL/todos"
