#!/usr/bin/env bash
# Eval Round 1 — Phased Batch Generation
#
# Generates FULL_COMPARABLE samples in 4 phases with quality gates.
# Each phase must pass before the next begins.
#
# Sample classification (per question):
#   FULL_COMPARABLE         — TEBIQ ok + DS ok + no llm_timeout + not out_of_scope
#   TEBIQ_FALLBACK_SAMPLE   — TEBIQ ok + fallback_reason=llm_timeout
#   TEBIQ_OUT_OF_SCOPE_SAMPLE — TEBIQ ok + status=out_of_scope
#   DEEPSEEK_FAILED_SAMPLE  — TEBIQ FULL (non-fallback, non-oos) + DS failed
#   INVALID_SAMPLE          — TEBIQ failed entirely
#
# Only FULL_COMPARABLE samples are eligible for formal DOMAIN annotation.
#
# Usage:
#   BASE_URL=https://tebiq.jp bash scripts/eval/run-round1-phased.sh
#
# Prerequisites (run health-check.sh first):
#   1. DeepSeek raw: 3/3 pass in health-check.sh
#   2. TEBIQ LLM: 3/3 pass, 0 llm_timeout fallback
#   3. FULL_COMPARABLE pairs confirmed in probe

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUT_DIR="scripts/eval/output/round1-phased-${TIMESTAMP}"
REVIEWER="${REVIEWER:-eval-round1}"

mkdir -p "$OUTPUT_DIR"
LOG="$OUTPUT_DIR/run.log"

log() { echo "[$(date +%H:%M:%S)] $*" | tee -a "$LOG"; }
abort() { log ""; log "❌ ABORT: $*"; log "Output: $OUTPUT_DIR"; exit 1; }

# ---- Phase definitions ----
# Phase 1: 3 probe questions (lowest-risk, previously confirmed LLM-capable)
PHASE1_TAGS=(
  "eval-lab-v1-G04"
  "eval-lab-v1-H05"
  "eval-lab-v1-F05"
)

# Phase 2: 5 mini-batch questions
PHASE2_TAGS=(
  "eval-lab-v1-A09"
  "eval-lab-v1-D03"
  "eval-lab-v1-E02"
  "eval-lab-v1-J06"
  "eval-lab-v1-F08"
)

# Phase 3: 10 questions
PHASE3_TAGS=(
  "eval-lab-v1-A01"
  "eval-lab-v1-A05"
  "eval-lab-v1-C03"
  "eval-lab-v1-C07"
  "eval-lab-v1-D01"
  "eval-lab-v1-D02"
  "eval-lab-v1-B01"
  "eval-lab-v1-B05"
  "eval-lab-v1-E01"
  "eval-lab-v1-E07"
)

# Phase 4: remaining 12 (completing 30-question set)
PHASE4_TAGS=(
  "eval-lab-v1-J04"
  "eval-lab-v1-J08"
  "eval-lab-v1-F01"
  "eval-lab-v1-F02"
  "eval-lab-v1-J03"
  "eval-lab-v1-B07"
  "eval-lab-v1-I01"
  "eval-lab-v1-I08"
  "eval-lab-v1-H09"
  "eval-lab-v1-D05"
  "eval-lab-v1-D06"
  "eval-lab-v1-D09"
)

# ---- Setup ----
log "=== Eval Round 1 Phased Batch ==="
log "Output: $OUTPUT_DIR"
log "BASE_URL: $BASE_URL"

log ""
log "--- Step 1: Seed ---"
SEED_RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/seed" \
  -H "Content-Type: application/json" -d '{}' --max-time 15 2>/dev/null || echo '{}')
log "Seed: $SEED_RESP"

log ""
log "--- Step 2: Build tag→id map ---"
STATE_RESP=$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" \
  --max-time 15 2>/dev/null || echo '{}')
echo "$STATE_RESP" > "$OUTPUT_DIR/state.json"
echo "$STATE_RESP" | jq -r '.questions[] | [.starterTag, .id, .questionText] | @tsv' \
  2>/dev/null > "$OUTPUT_DIR/tag_id.tsv"
Q_COUNT=$(wc -l < "$OUTPUT_DIR/tag_id.tsv")
log "Tag-ID map: $Q_COUNT entries"

get_id()   { grep "^$1	" "$OUTPUT_DIR/tag_id.tsv" | cut -f2 | head -1; }
get_text() { grep "^$1	" "$OUTPUT_DIR/tag_id.tsv" | cut -f3 | head -1; }

# ---- Per-question generation ----
run_tebiq() {
  local TAG="$1"
  local QID; QID=$(get_id "$TAG")
  local QTEXT; QTEXT=$(get_text "$TAG")
  [[ -z "$QID" ]] && echo '{"ok":false,"error":"unknown_tag"}' && return
  local PAYLOAD; PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  curl -sf -X POST "$BASE_URL/api/internal/eval-lab/tebiq-answer" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 70 2>/dev/null || echo '{"ok":false,"error":"curl_failed"}'
}

run_deepseek() {
  local TAG="$1"
  local QID; QID=$(get_id "$TAG")
  local QTEXT; QTEXT=$(get_text "$TAG")
  [[ -z "$QID" ]] && echo '{"ok":false,"error":"unknown_tag"}' && return
  local PAYLOAD; PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 65 2>/dev/null || echo '{"ok":false,"error":"curl_failed"}'
}

classify_sample() {
  local TAG="$1"
  local T_FILE="$OUTPUT_DIR/tebiq_${TAG}.json"
  local D_FILE="$OUTPUT_DIR/deepseek_${TAG}.json"
  local T_OK=false D_OK=false T_FB="" T_STS=""

  [ -f "$T_FILE" ] && jq -e '.ok == true' "$T_FILE" >/dev/null 2>&1 && T_OK=true
  T_FB=$([ -f "$T_FILE" ] && jq -r '.fallback_reason // ""' "$T_FILE" 2>/dev/null || echo "")
  T_STS=$([ -f "$T_FILE" ] && jq -r '.status // ""' "$T_FILE" 2>/dev/null || echo "")
  [ -f "$D_FILE" ] && jq -e '.ok == true' "$D_FILE" >/dev/null 2>&1 && D_OK=true

  if $T_OK && $D_OK && [[ "$T_FB" != "llm_timeout" ]] && [[ "$T_STS" != "out_of_scope" ]]; then
    echo "FULL_COMPARABLE"
  elif $T_OK && [[ "$T_FB" == "llm_timeout" ]]; then
    echo "TEBIQ_FALLBACK_SAMPLE"
  elif $T_OK && [[ "$T_STS" == "out_of_scope" ]]; then
    echo "TEBIQ_OUT_OF_SCOPE_SAMPLE"
  elif $T_OK && ! $D_OK; then
    echo "DEEPSEEK_FAILED_SAMPLE"
  else
    echo "INVALID_SAMPLE"
  fi
}

run_phase() {
  local PHASE_NAME="$1"; shift
  local TAGS=("$@")
  local T_OK=0 T_FB=0 T_FAIL=0 DS_OK=0 DS_TIMEOUT=0 DS_FAIL=0

  log ""
  log "=== Phase $PHASE_NAME (${#TAGS[@]} questions) ==="

  for TAG in "${TAGS[@]}"; do
    # TEBIQ channel
    RESP=$(run_tebiq "$TAG")
    echo "$RESP" > "$OUTPUT_DIR/tebiq_${TAG}.json"
    if jq -e '.ok == true' "$OUTPUT_DIR/tebiq_${TAG}.json" >/dev/null 2>&1; then
      STS=$(jq -r '.status // "?"' "$OUTPUT_DIR/tebiq_${TAG}.json" 2>/dev/null)
      FB=$(jq -r '.fallback_reason // ""' "$OUTPUT_DIR/tebiq_${TAG}.json" 2>/dev/null)
      EV=$(jq -r '.engine_version // "?"' "$OUTPUT_DIR/tebiq_${TAG}.json" 2>/dev/null)
      if [[ "$FB" == "llm_timeout" ]]; then
        log "  ⚠️  TEBIQ $TAG → $STS (llm_timeout, $EV)"
        T_FB=$((T_FB + 1))
      else
        log "  ✅ TEBIQ $TAG → $STS ($EV)"
        T_OK=$((T_OK + 1))
      fi
    else
      ERR=$(jq -r '.error // "unknown"' "$OUTPUT_DIR/tebiq_${TAG}.json" 2>/dev/null)
      log "  ❌ TEBIQ $TAG → $ERR"
      T_FAIL=$((T_FAIL + 1))
    fi

    # DeepSeek channel
    RESP=$(run_deepseek "$TAG")
    echo "$RESP" > "$OUTPUT_DIR/deepseek_${TAG}.json"
    if jq -e '.ok == true' "$OUTPUT_DIR/deepseek_${TAG}.json" >/dev/null 2>&1; then
      LAT=$(jq -r '.latency_ms // "?"' "$OUTPUT_DIR/deepseek_${TAG}.json" 2>/dev/null)
      log "  ✅ DeepSeek $TAG → ok (${LAT}ms)"
      DS_OK=$((DS_OK + 1))
    else
      ERR=$(jq -r '.error // "unknown"' "$OUTPUT_DIR/deepseek_${TAG}.json" 2>/dev/null)
      if [[ "$ERR" == *"timeout"* ]]; then
        log "  ⏱ DeepSeek $TAG → $ERR"
        DS_TIMEOUT=$((DS_TIMEOUT + 1))
      else
        log "  ❌ DeepSeek $TAG → $ERR"
        DS_FAIL=$((DS_FAIL + 1))
      fi
    fi
  done

  # Classify
  local FC=0 TFB_C=0 OOS_C=0 DSF_C=0 INV_C=0
  for TAG in "${TAGS[@]}"; do
    CLS=$(classify_sample "$TAG")
    case "$CLS" in
      FULL_COMPARABLE)           FC=$((FC + 1)) ;;
      TEBIQ_FALLBACK_SAMPLE)     TFB_C=$((TFB_C + 1)) ;;
      TEBIQ_OUT_OF_SCOPE_SAMPLE) OOS_C=$((OOS_C + 1)) ;;
      DEEPSEEK_FAILED_SAMPLE)    DSF_C=$((DSF_C + 1)) ;;
      INVALID_SAMPLE)            INV_C=$((INV_C + 1)) ;;
    esac
  done

  local TOTAL=${#TAGS[@]}
  log ""
  log "  Phase $PHASE_NAME classification:"
  log "    FULL_COMPARABLE:           $FC / $TOTAL"
  log "    TEBIQ_FALLBACK_SAMPLE:     $TFB_C"
  log "    TEBIQ_OUT_OF_SCOPE_SAMPLE: $OOS_C"
  log "    DEEPSEEK_FAILED_SAMPLE:    $DSF_C"
  log "    INVALID_SAMPLE:            $INV_C"
  log "    TEBIQ: ok=$T_OK fallback=$T_FB fail=$T_FAIL"
  log "    DeepSeek: ok=$DS_OK timeout=$DS_TIMEOUT fail=$DS_FAIL"

  # Return classification counts via globals for gate check
  PHASE_FC=$FC
  PHASE_TFB=$TFB_C
  PHASE_TOTAL=$TOTAL
}

PHASE_FC=0; PHASE_TFB=0; PHASE_TOTAL=0

# ---- Phase 1: Probe (3 questions) ----
# Gate: 3/3 FULL_COMPARABLE (strict — any fallback/DS fail = abort)
run_phase "1-PROBE" "${PHASE1_TAGS[@]}"
P1_FC=$PHASE_FC; P1_TFB=$PHASE_TFB; P1_TOTAL=$PHASE_TOTAL
if [[ $P1_FC -lt $P1_TOTAL ]]; then
  log ""
  log "Phase 1 gate: $P1_FC/$P1_TOTAL FULL_COMPARABLE"
  if [[ $P1_TFB -gt 0 ]]; then
    abort "Phase 1 FAIL — $P1_TFB llm_timeout fallback(s). DeepSeek LLM not available. Re-run health-check.sh."
  else
    abort "Phase 1 FAIL — $P1_FC/$P1_TOTAL FULL_COMPARABLE. Check DeepSeek API. Re-run health-check.sh."
  fi
fi
log ""
log "  ✅ Phase 1 gate PASS: $P1_FC/$P1_TOTAL FULL_COMPARABLE — proceeding to Phase 2"

# ---- Phase 2: Mini-batch (5 questions) ----
# Gate: ≥4/5 FULL_COMPARABLE
run_phase "2-MINI" "${PHASE2_TAGS[@]}"
P2_FC=$PHASE_FC; P2_TFB=$PHASE_TFB; P2_TOTAL=$PHASE_TOTAL
MIN_P2=$(( (P2_TOTAL * 4 + 4) / 5 ))  # ceil(4/5)
if [[ $P2_FC -lt $MIN_P2 ]]; then
  abort "Phase 2 FAIL — $P2_FC/$P2_TOTAL FULL_COMPARABLE (need ≥$MIN_P2). Stopping."
fi
log ""
log "  ✅ Phase 2 gate PASS: $P2_FC/$P2_TOTAL FULL_COMPARABLE — proceeding to Phase 3"

# ---- Phase 3: Batch-10 ----
# Gate: ≥8/10 FULL_COMPARABLE
run_phase "3-BATCH10" "${PHASE3_TAGS[@]}"
P3_FC=$PHASE_FC; P3_TFB=$PHASE_TFB; P3_TOTAL=$PHASE_TOTAL
MIN_P3=$(( (P3_TOTAL * 8 + 9) / 10 ))  # ceil(8/10)
if [[ $P3_FC -lt $MIN_P3 ]]; then
  abort "Phase 3 FAIL — $P3_FC/$P3_TOTAL FULL_COMPARABLE (need ≥$MIN_P3). Stopping."
fi
log ""
log "  ✅ Phase 3 gate PASS: $P3_FC/$P3_TOTAL FULL_COMPARABLE — proceeding to Phase 4"

# ---- Phase 4: Complete to 30 ----
# No gate (already validated enough)
run_phase "4-COMPLETE" "${PHASE4_TAGS[@]}"
P4_FC=$PHASE_FC

# ---- Export ----
log ""
log "=== Export ==="
FULL_EXPORT=$(curl -sf "$BASE_URL/api/internal/eval-lab/export?type=full" --max-time 30 \
  2>/dev/null || echo '{}')
echo "$FULL_EXPORT" > "$OUTPUT_DIR/export_full.json"
EXP_Q=$(echo "$FULL_EXPORT" | jq '.questions | length' 2>/dev/null || echo "?")
EXP_A=$(echo "$FULL_EXPORT" | jq '.answers | length' 2>/dev/null || echo "?")
log "Full export: q=$EXP_Q a=$EXP_A"

# ---- Final summary ----
ALL_TAGS=("${PHASE1_TAGS[@]}" "${PHASE2_TAGS[@]}" "${PHASE3_TAGS[@]}" "${PHASE4_TAGS[@]}")
TOTAL_FC=0; TOTAL_TFB=0; TOTAL_OOS=0; TOTAL_DSF=0; TOTAL_INV=0
FC_LIST=""; TFB_LIST=""; OOS_LIST=""; DSF_LIST=""

for TAG in "${ALL_TAGS[@]}"; do
  CLS=$(classify_sample "$TAG")
  case "$CLS" in
    FULL_COMPARABLE)           TOTAL_FC=$((TOTAL_FC + 1)); FC_LIST="$FC_LIST $TAG" ;;
    TEBIQ_FALLBACK_SAMPLE)     TOTAL_TFB=$((TOTAL_TFB + 1)); TFB_LIST="$TFB_LIST $TAG" ;;
    TEBIQ_OUT_OF_SCOPE_SAMPLE) TOTAL_OOS=$((TOTAL_OOS + 1)); OOS_LIST="$OOS_LIST $TAG" ;;
    DEEPSEEK_FAILED_SAMPLE)    TOTAL_DSF=$((TOTAL_DSF + 1)); DSF_LIST="$DSF_LIST $TAG" ;;
    INVALID_SAMPLE)            TOTAL_INV=$((TOTAL_INV + 1)) ;;
  esac
done

jq -n \
  --arg run_timestamp "$TIMESTAMP" \
  --arg base_url "$BASE_URL" \
  --arg reviewer "$REVIEWER" \
  --arg output_dir "$OUTPUT_DIR" \
  --argjson target ${#ALL_TAGS[@]} \
  --argjson full_comparable "$TOTAL_FC" \
  --argjson tebiq_fallback "$TOTAL_TFB" \
  --argjson tebiq_out_of_scope "$TOTAL_OOS" \
  --argjson deepseek_failed "$TOTAL_DSF" \
  --argjson invalid "$TOTAL_INV" \
  --arg fc_tags "${FC_LIST# }" \
  --arg tfb_tags "${TFB_LIST# }" \
  --arg oos_tags "${OOS_LIST# }" \
  --arg dsf_tags "${DSF_LIST# }" \
  '{
    run_timestamp: $run_timestamp,
    base_url: $base_url,
    reviewer: $reviewer,
    output_dir: $output_dir,
    target: $target,
    sample_classification: {
      FULL_COMPARABLE: $full_comparable,
      TEBIQ_FALLBACK_SAMPLE: $tebiq_fallback,
      TEBIQ_OUT_OF_SCOPE_SAMPLE: $tebiq_out_of_scope,
      DEEPSEEK_FAILED_SAMPLE: $deepseek_failed,
      INVALID_SAMPLE: $invalid
    },
    full_comparable_tags: ($fc_tags | split(" ") | map(select(length > 0))),
    tebiq_fallback_tags: ($tfb_tags | split(" ") | map(select(length > 0))),
    tebiq_out_of_scope_tags: ($oos_tags | split(" ") | map(select(length > 0))),
    deepseek_failed_tags: ($dsf_tags | split(" ") | map(select(length > 0)))
  }' > "$OUTPUT_DIR/summary.json"

log ""
log "=== ROUND 1 PHASED BATCH COMPLETE ==="
log "Output: $OUTPUT_DIR"
log "  Target:                    ${#ALL_TAGS[@]}"
log "  FULL_COMPARABLE:           $TOTAL_FC"
log "  TEBIQ_FALLBACK_SAMPLE:     $TOTAL_TFB"
log "  TEBIQ_OUT_OF_SCOPE_SAMPLE: $TOTAL_OOS"
log "  DEEPSEEK_FAILED_SAMPLE:    $TOTAL_DSF"
log "  INVALID_SAMPLE:            $TOTAL_INV"
log ""
log "Summary: $OUTPUT_DIR/summary.json"
