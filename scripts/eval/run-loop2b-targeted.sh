#!/usr/bin/env bash
# Run TEBIQ 0.8 Loop2B targeted provider-backed regression.
#
# This wrapper intentionally fails before execution if provider/eval env is not
# healthy. It prevents another 17-case run from being consumed by an invalid
# provider key.
#
# Usage:
#   ADMIN_KEY=local-admin-test EVAL_LAB_ENABLED=1 DEEPSEEK_API_KEY=... npm run start -- --hostname 127.0.0.1 --port 3000
#   npx tsx --env-file=.env.local scripts/eval/preflight-provider-env.ts --live --base-url=http://127.0.0.1:3000
#   bash scripts/eval/run-loop2b-targeted.sh

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
RUN_ID="${RUN_ID:-tebiq-0.8-rur-loop2b-targeted}"
OUTPUT="${OUTPUT:-docs/eval/${RUN_ID}-production-answer-results.json}"
CONCURRENCY="${CONCURRENCY:-1}"
PRIVATE_AQL_OUTPUT="${PRIVATE_AQL_OUTPUT:-/tmp/${RUN_ID}-aql.json}"

IDS="RUR-006,RUR-024,RUR-036,RUR-037,RUR-035,RUR-039,RUR-090,RUR-041,RUR-019,RUR-023,RUR-029,RUR-054,RUR-065,RUR-085,RUR-018,RUR-031,RUR-087"
TSX_ENV_ARGS=()
if [[ -f .env.local ]]; then
  TSX_ENV_ARGS=(--env-file=.env.local)
fi

echo "[loop2b] base=${BASE_URL}"
echo "[loop2b] run_id=${RUN_ID}"
echo "[loop2b] output=${OUTPUT}"
echo "[loop2b] concurrency=${CONCURRENCY}"

npx tsx "${TSX_ENV_ARGS[@]}" scripts/eval/preflight-provider-env.ts \
  --live \
  --base-url="${BASE_URL}"

npx tsx "${TSX_ENV_ARGS[@]}" scripts/eval/run-real-user-regression.ts \
  --execute \
  --resume \
  --run-id="${RUN_ID}" \
  --ids="${IDS}" \
  --concurrency="${CONCURRENCY}" \
  --base-url="${BASE_URL}" \
  --output="${OUTPUT}"

npx tsx scripts/eval/summarize-real-user-regression-sidecar.ts \
  --input="${OUTPUT}"

npx tsx "${TSX_ENV_ARGS[@]}" scripts/eval/export-real-user-regression-aql.ts \
  --run-id="${RUN_ID}" \
  --output="${PRIVATE_AQL_OUTPUT}"

echo "[loop2b] private AQL packet: ${PRIVATE_AQL_OUTPUT}"
