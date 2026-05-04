#!/usr/bin/env bash
# Eval Round 1 batch generation script
# Generates 30 comparable samples (TEBIQ + DeepSeek) for Round 1 sample pack
#
# Usage: BASE_URL=https://tebiq.jp bash scripts/eval/run-round1-batch.sh
#
# Output: scripts/eval/output/round1-YYYYMMDD-HHMMSS/

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT_DIR="scripts/eval/output/round1-${TIMESTAMP}"
REVIEWER="${REVIEWER:-eval-round1}"

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

mkdir -p "$OUTPUT_DIR"
LOG="$OUTPUT_DIR/run.log"

log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }

# ---- Step 1: Seed ----
log "=== Step 1: Seed 100 questions ==="
SEED_RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/seed" \
  -H "Content-Type: application/json" 2>&1)
log "Seed: $SEED_RESP"

# ---- Step 2: Get question list + build tag→id map ----
log "=== Step 2: Get question list ==="
STATE_RESP=$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" 2>/dev/null)
echo "$STATE_RESP" > "$OUTPUT_DIR/state.json"

Q_COUNT=$(echo "$STATE_RESP" | jq '.questions | length' 2>/dev/null || echo "?")
log "Got $Q_COUNT questions"

# Build tag→id+text map using jq (TSV: tag \t id \t questionText)
echo "$STATE_RESP" | jq -r '.questions[] | [.starterTag, .id, .questionText] | @tsv' 2>/dev/null > "$OUTPUT_DIR/tag_id.tsv"
log "Tag-ID map: $(wc -l < "$OUTPUT_DIR/tag_id.tsv") entries"

get_question_id() {
  local tag="$1"
  grep "^$tag	" "$OUTPUT_DIR/tag_id.tsv" | cut -f2 | head -1
}

get_question_text() {
  local tag="$1"
  grep "^$tag	" "$OUTPUT_DIR/tag_id.tsv" | cut -f3 | head -1
}

# ---- Step 3: TEBIQ channel ----
log "=== Step 3: TEBIQ channel (${#TAGS[@]} questions) ==="
TEBIQ_SUCCESS=0; TEBIQ_FAILED=0

for TAG in "${TAGS[@]}"; do
  QID=$(get_question_id "$TAG")
  if [ -z "$QID" ]; then
    log "  SKIP $TAG — not in question list"
    continue
  fi

  QTEXT=$(get_question_text "$TAG")
  PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/tebiq-answer" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" \
    --max-time 70 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  echo "$RESP" > "$OUTPUT_DIR/tebiq_${TAG}.json"

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    STATUS=$(echo "$RESP" | jq -r '.status // "?"' 2>/dev/null)
    log "  ✅ TEBIQ $TAG → $STATUS"
    TEBIQ_SUCCESS=$((TEBIQ_SUCCESS + 1))
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    log "  ❌ TEBIQ $TAG → $ERR"
    TEBIQ_FAILED=$((TEBIQ_FAILED + 1))
  fi
done

log "TEBIQ done: $TEBIQ_SUCCESS success, $TEBIQ_FAILED failed"

# ---- Step 4: DeepSeek channel ----
log "=== Step 4: DeepSeek channel (${#TAGS[@]} questions) ==="
DS_SUCCESS=0; DS_TIMEOUT=0; DS_FAILED=0

for TAG in "${TAGS[@]}"; do
  QID=$(get_question_id "$TAG")
  if [ -z "$QID" ]; then
    log "  SKIP $TAG — not in question list"
    continue
  fi

  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" \
    -d "{\"question_id\":\"$QID\",\"reviewer\":\"$REVIEWER\"}" \
    --max-time 90 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  echo "$RESP" > "$OUTPUT_DIR/deepseek_${TAG}.json"

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    STATUS=$(echo "$RESP" | jq -r '.answer.status // .status // "?"' 2>/dev/null)
    log "  ✅ DeepSeek $TAG → $STATUS"
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

log "DeepSeek done: $DS_SUCCESS success, $DS_TIMEOUT timeout, $DS_FAILED failed"

# ---- Step 5: Export ----
log "=== Step 5: Export ==="
FULL_EXPORT=$(curl -sf "$BASE_URL/api/internal/eval-lab/export?type=full" 2>/dev/null || echo '{}')
echo "$FULL_EXPORT" > "$OUTPUT_DIR/export_full.json"
EXP_Q=$(echo "$FULL_EXPORT" | jq '.questions | length' 2>/dev/null || echo "?")
EXP_A=$(echo "$FULL_EXPORT" | jq '.answers | length' 2>/dev/null || echo "?")
EXP_ANN=$(echo "$FULL_EXPORT" | jq '.annotations | length' 2>/dev/null || echo "?")
log "Full export: q=$EXP_Q a=$EXP_A ann=$EXP_ANN"

# ---- Step 6: Classify ----
log "=== Step 6: Classify samples ==="
FULL_COMP=0; TEBIQ_ONLY=0; GEN_FAILED=0
FULL_COMP_LIST=""; TEBIQ_ONLY_LIST=""; FAILED_LIST=""

for TAG in "${TAGS[@]}"; do
  T_OK=false; D_OK=false
  T_FILE="$OUTPUT_DIR/tebiq_${TAG}.json"
  D_FILE="$OUTPUT_DIR/deepseek_${TAG}.json"

  [ -f "$T_FILE" ] && echo "$(<"$T_FILE")" | jq -e '.ok == true' >/dev/null 2>&1 && T_OK=true
  [ -f "$D_FILE" ] && echo "$(<"$D_FILE")" | jq -e '.ok == true' >/dev/null 2>&1 && D_OK=true

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

TARGET=${#TAGS[@]}
DS_FAILED_TOTAL=$((TARGET - TEBIQ_SUCCESS - TEBIQ_FAILED))

# Write summary JSON
jq -n \
  --argjson target $TARGET \
  --argjson full_comparable $FULL_COMP \
  --argjson tebiq_only $TEBIQ_ONLY \
  --argjson gen_failed $GEN_FAILED \
  --argjson tebiq_success $TEBIQ_SUCCESS \
  --argjson tebiq_failed $TEBIQ_FAILED \
  --argjson ds_success $DS_SUCCESS \
  --argjson ds_timeout $DS_TIMEOUT \
  --argjson ds_failed $DS_FAILED \
  --arg full_comparable_tags "${FULL_COMP_LIST# }" \
  --arg tebiq_only_tags "${TEBIQ_ONLY_LIST# }" \
  --arg failed_tags "${FAILED_LIST# }" \
  --arg output_dir "$OUTPUT_DIR" \
  --arg reviewer "$REVIEWER" \
  --arg base_url "$BASE_URL" \
  --arg run_timestamp "$TIMESTAMP" \
  '{
    run_timestamp: $run_timestamp,
    base_url: $base_url,
    reviewer: $reviewer,
    output_dir: $output_dir,
    target: $target,
    tebiq_channel: { success: $tebiq_success, failed: $tebiq_failed },
    deepseek_channel: { success: $ds_success, timeout: $ds_timeout, failed: $ds_failed },
    sample_classification: {
      FULL_COMPARABLE: $full_comparable,
      TEBIQ_ONLY_TECH_SAMPLE: $tebiq_only,
      GENERATION_FAILED: $gen_failed
    },
    full_comparable_tags: ($full_comparable_tags | split(" ") | map(select(length > 0))),
    tebiq_only_tags: ($tebiq_only_tags | split(" ") | map(select(length > 0))),
    failed_tags: ($failed_tags | split(" ") | map(select(length > 0)))
  }' > "$OUTPUT_DIR/summary.json"

log ""
log "=== ROUND 1 BATCH COMPLETE ==="
log "Output: $OUTPUT_DIR"
log "  Target:            $TARGET"
log "  FULL_COMPARABLE:   $FULL_COMP"
log "  TEBIQ_ONLY_TECH:   $TEBIQ_ONLY"
log "  GENERATION_FAILED: $GEN_FAILED"
log "  TEBIQ: $TEBIQ_SUCCESS success / $TEBIQ_FAILED failed"
log "  DeepSeek: $DS_SUCCESS success / $DS_TIMEOUT timeout / $DS_FAILED failed"
log ""
log "Summary written to: $OUTPUT_DIR/summary.json"
