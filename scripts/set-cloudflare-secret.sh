#!/usr/bin/env bash
# Sets the CLOUDFLARE_API_TOKEN GitHub Actions secret from a local token file.
# The token is never printed and the file is removed after the secret is set.
set -euo pipefail

TOKEN_FILE="${1:-$HOME/.config/cloudflare/ci-token}"
REPO="${GH_REPO:-owr-tech/owr-clean-landing}"

if [ ! -s "$TOKEN_FILE" ]; then
  echo "Token file missing or empty: $TOKEN_FILE" >&2
  echo "Put the Cloudflare API token in that file, then rerun." >&2
  exit 1
fi

TOKEN=$(tr -d '\r\n' < "$TOKEN_FILE")

RESP=$(curl -sS --max-time 30 \
  -H "Authorization: Bearer $TOKEN" \
  https://api.cloudflare.com/client/v4/user/tokens/verify)

if ! printf '%s' "$RESP" | python3 -c 'import json,sys; sys.exit(0 if json.load(sys.stdin).get("success") else 1)' 2>/dev/null; then
  echo "Cloudflare rejected the token; GitHub secret was not changed." >&2
  exit 1
fi

printf '%s' "$TOKEN" | gh secret set CLOUDFLARE_API_TOKEN --repo "$REPO"
rm -f "$TOKEN_FILE"
echo "CLOUDFLARE_API_TOKEN set on $REPO; local token file removed."
