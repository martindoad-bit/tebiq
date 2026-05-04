#!/usr/bin/env bash
# Retry DeepSeek channel only, reusing an existing batch output directory.
#
# Usage:
#   BASE_URL=https://tebiq.jp BATCH_DIR=scripts/eval/output/round1-20260504-231231 \
#     bash scripts/eval/retry-deepseek.sh
#
# Re-uses the tag_id.tsv from the existing batch run so we don't need to
# re-seed. Overwrites deepseek_*.json files in BATCH_DIR only for tags that
# are still missing or failed.

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
BATCH_DIR="${BATCH_DIR:?BATCH_DIR must be set to the existing round1 output directory}"
REVIEWER="${REVIEWER:-eval-round1}"

LOG="$BATCH_DIR/deepseek-retry.log"
TAG_ID_TSV="$BATCH_DIR/tag_id.tsv"

if [ ! -f "$TAG_ID_TSV" ]; then
  echo "ERROR: $TAG_ID_TSV not found — run the full batch first" >&2
  exit 1
fi

log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }

get_question_id()   { grep "^$1	" "$TAG_ID_TSV" | cut -f2 | head -1; }
get_question_text() { grep "^$1	" "$TAG_ID_TSV" | cut -f3 | head -1; }

TAGS=(
  "eval-lab-v1-A01" "eval-lab-v1-A05" "eval-lab-v1-A09"
  "eval-lab-v1-J04" "eval-lab-v1-J06" "eval-lab-v1-J08"
  "eval-lab-v1-F01" "eval-lab-v1-F02" "eval-lab-v1-F05"
  "eval-lab-v1-F08" "eval-lab-v1-J03"
  "eval-lab-v1-C03" "eval-lab-v1-C07"
  "eval-lab-v1-D01" "eval-lab-v1-D02" "eval-lab-v1-D03"
  "eval-lab-v1-B01" "eval-lab-v1-B05" "eval-lab-v1-B07"
  "eval-lab-v1-I01" "eval-lab-v1-I08"
  "eval-lab-v1-E01" "eval-lab-v1-E02" "eval-lab-v1-E07" "eval-lab-v1-H09"
  "eval-lab-v1-D05" "eval-lab-v1-D06" "eval-lab-v1-D09"
  "eval-lab-v1-G04" "eval-lab-v1-H05"
)

log "=== DeepSeek retry: ${#TAGS[@]} tags, batch dir=$BATCH_DIR ==="

DS_SUCCESS=0; DS_TIMEOUT=0; DS_FAILED=0; DS_SKIPPED=0

for TAG in "${TAGS[@]}"; do
  QID=$(get_question_id "$TAG")
  if [ -z "$QID" ]; then
    log "  SKIP $TAG — not in tag_id.tsv"
    DS_SKIPPED=$((DS_SKIPPED + 1))
    continue
  fi

  D_FILE="$BATCH_DIR/deepseek_${TAG}.json"
  # Skip if already succeeded
  if [ -f "$D_FILE" ] && jq -e '.ok == true' "$D_FILE" >/dev/null 2>&1; then
    log "  SKIP $TAG — already ok"
    DS_SKIPPED=$((DS_SKIPPED + 1))
    DS_SUCCESS=$((DS_SUCCESS + 1))
    continue
  fi

  QTEXT=$(get_question_text "$TAG")
  DS_PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')

  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" \
    -d "$DS_PAYLOAD" \
    --max-time 90 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  echo "$RESP" > "$D_FILE"

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    LATENCY=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)
    log "  ✅ DeepSeek $TAG → ok (${LATENCY}ms)"
    DS_SUCCESS=$((DS_SUCCESS + 1))
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    if [[ "$ERR" == *"timeout"* ]]; then
      log "  ⏱ DeepSeek $TAG → $ERR (transient)"
      DS_TIMEOUT=$((DS_TIMEOUT + 1))
    else
      log "  ❌ DeepSeek $TAG → $ERR"
      DS_FAILED=$((DS_FAILED + 1))
    fi
  fi
done

log ""
log "=== DeepSeek retry complete ==="
log "  Success: $DS_SUCCESS  Timeout: $DS_TIMEOUT  Failed: $DS_FAILED  Skipped(already ok): $DS_SKIPPED"

# Re-classify
FULL_COMP=0; TEBIQ_ONLY=0; GEN_FAILED=0
FULL_COMP_LIST=""; TEBIQ_ONLY_LIST=""; FAILED_LIST=""

for TAG in "${TAGS[@]}"; do
  T_OK=false; D_OK=false
  T_FILE="$BATCH_DIR/tebiq_${TAG}.json"
  D_FILE="$BATCH_DIR/deepseek_${TAG}.json"

  [ -f "$T_FILE" ] && jq -e '.ok == true' "$T_FILE" >/dev/null 2>&1 && T_OK=true
  [ -f "$D_FILE" ] && jq -e '.ok == true' "$D_FILE" >/dev/null 2>&1 && D_OK=true

  if $T_OK && $D_OK; then
    FULL_COMP=$((FULL_COMP + 1))
    FULL_COMP_LIST="${FULL_COMP_LIST} $TAG"
  elif $T_OK; then
    TEBIQ_ONLY=$((TEBIQ_ONLY + 1))
    TEBIQ_ONLY_LIST="${TEBIQ_ONLY_LIST} $TAG"
  else
    GEN_FAILED=$((GEN_FAILED + 1))
    FAILED_LIST="${FAILED_LIST} $TAG"
  fi
done

log ""
log "=== Post-retry classification ==="
log "  FULL_COMPARABLE:         $FULL_COMP"
log "  TEBIQ_ONLY_TECH_SAMPLE:  $TEBIQ_ONLY"
log "  GENERATION_FAILED:       $GEN_FAILED"

if [ -n "$FULL_COMP_LIST" ]; then
  log "  FULL_COMPARABLE tags:$FULL_COMP_LIST"
fi
