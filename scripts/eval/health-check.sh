#!/usr/bin/env bash
# Eval Lab — LLM Health Check
#
# Confirms both DeepSeek raw and TEBIQ LLM channels are alive before
# committing to a formal batch run.  Run this first; only proceed to
# run-round1-phased.sh when all gates pass.
#
# Usage:
#   BASE_URL=https://tebiq.jp bash scripts/eval/health-check.sh
#
# Pass criteria (all must hold):
#   1. Eval Lab access gate: /seed returns 200/405 (not 404)
#   2. TEBIQ channel: 3/3 ok=true
#   3. TEBIQ channel: 0/3 fallback_reason=llm_timeout
#   4. DeepSeek channel: ≥2/3 ok=true (≥66%)
#   5. At least one FULL_COMPARABLE pair (TEBIQ non-fallback + DeepSeek ok)
#
# Output: human-readable report + HC_RESULT env var (pass/fail) on exit

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
REVIEWER="${REVIEWER:-eval-health-check}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TMP_DIR=$(mktemp -d "/tmp/tebiq-hc-${TIMESTAMP}-XXXX")
trap 'rm -rf "$TMP_DIR"' EXIT

log() { echo "[$(date +%H:%M:%S)] $*"; }

# Probe questions: low-risk, previously confirmed LLM-capable (no llm_timeout)
# G04 = 在留卡丢了; H05 = 離職後健保; F05 = 不許可通知書
PROBE_TAGS=("eval-lab-v1-G04" "eval-lab-v1-H05" "eval-lab-v1-F05")

log "=== TEBIQ Eval Lab Health Check ==="
log "BASE_URL: $BASE_URL"

# ---- Gate 1: Access gate ----
log ""
log "--- Gate 1: Eval Lab access gate ---"
ACCESS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
  -X POST "$BASE_URL/api/internal/eval-lab/seed" \
  -H "Content-Type: application/json" \
  -d '{}' --max-time 10 2>/dev/null || echo "000")
if [[ "$ACCESS_STATUS" == "200" || "$ACCESS_STATUS" == "405" ]]; then
  log "  ✅ PASS: Eval Lab gate alive (HTTP $ACCESS_STATUS)"
  GATE1="pass"
elif [[ "$ACCESS_STATUS" == "404" ]]; then
  log "  ❌ FAIL: 404 — EVAL_LAB_ENABLED not set or not production"
  GATE1="fail"
else
  log "  ❌ FAIL: Unexpected HTTP $ACCESS_STATUS (network issue?)"
  GATE1="fail"
fi

if [[ "$GATE1" == "fail" ]]; then
  echo ""
  echo "HEALTH CHECK RESULT: FAIL (gate1 — access)"
  exit 1
fi

# ---- Seed (idempotent) ----
curl -sf -X POST "$BASE_URL/api/internal/eval-lab/seed" \
  -H "Content-Type: application/json" -d '{}' \
  --max-time 15 >/dev/null 2>&1 || true

# ---- Build tag→id+text map ----
log ""
log "--- Fetching question state ---"
STATE_RESP=$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" \
  --max-time 15 2>/dev/null || echo '{}')
echo "$STATE_RESP" | jq -r '.questions[] | [.starterTag, .id, .questionText] | @tsv' \
  2>/dev/null > "$TMP_DIR/tag_id.tsv" || true
Q_COUNT=$(wc -l < "$TMP_DIR/tag_id.tsv" 2>/dev/null || echo "0")
log "  Question map: $Q_COUNT entries"

if [[ "$Q_COUNT" -lt 3 ]]; then
  log "  ❌ FAIL: Could not load question list (seed may have failed)"
  echo "HEALTH CHECK RESULT: FAIL (question map empty)"
  exit 1
fi

get_id()   { grep "^$1	" "$TMP_DIR/tag_id.tsv" | cut -f2 | head -1; }
get_text() { grep "^$1	" "$TMP_DIR/tag_id.tsv" | cut -f3 | head -1; }

# ---- Gate 2 + 3: TEBIQ channel ----
log ""
log "--- Gate 2+3: TEBIQ channel (${#PROBE_TAGS[@]} probes) ---"
T_OK=0; T_TIMEOUT=0; T_FAIL=0
declare -A T_STATUS T_FALLBACK T_ENGINE T_LATENCY

for TAG in "${PROBE_TAGS[@]}"; do
  QID=$(get_id "$TAG"); QTEXT=$(get_text "$TAG")
  if [[ -z "$QID" ]]; then
    log "  ⚠️  $TAG: not in state (skip)"
    T_FAIL=$((T_FAIL + 1)); continue
  fi

  PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/tebiq-answer" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 70 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  T_STATUS[$TAG]=$(echo "$RESP" | jq -r '.status // "?"' 2>/dev/null)
  T_FALLBACK[$TAG]=$(echo "$RESP" | jq -r '.fallback_reason // ""' 2>/dev/null)
  T_ENGINE[$TAG]=$(echo "$RESP" | jq -r '.engine_version // "?"' 2>/dev/null)
  T_LATENCY[$TAG]=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    FB="${T_FALLBACK[$TAG]}"
    if [[ "$FB" == "llm_timeout" ]]; then
      log "  ⚠️  $TAG: ok=true BUT fallback=llm_timeout (${T_LATENCY[$TAG]}ms)"
      T_TIMEOUT=$((T_TIMEOUT + 1))
    else
      log "  ✅ $TAG: ok=${T_STATUS[$TAG]} engine=${T_ENGINE[$TAG]} fallback='$FB' (${T_LATENCY[$TAG]}ms)"
      T_OK=$((T_OK + 1))
    fi
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    log "  ❌ $TAG: $ERR"
    T_FAIL=$((T_FAIL + 1))
  fi
done

TOTAL_PROBE=${#PROBE_TAGS[@]}
if [[ $T_OK -eq $TOTAL_PROBE ]]; then
  log "  ✅ GATE 2 PASS: TEBIQ $T_OK/$TOTAL_PROBE ok"
  log "  ✅ GATE 3 PASS: 0 llm_timeout fallbacks"
  GATE2="pass"; GATE3="pass"
elif [[ $T_TIMEOUT -gt 0 ]]; then
  log "  ❌ GATE 3 FAIL: $T_TIMEOUT/$TOTAL_PROBE llm_timeout fallback"
  GATE2="partial"; GATE3="fail"
else
  log "  ❌ GATE 2 FAIL: TEBIQ $T_OK/$TOTAL_PROBE ok (need all $TOTAL_PROBE)"
  GATE2="fail"; GATE3="unknown"
fi

# ---- Gate 4: DeepSeek channel ----
log ""
log "--- Gate 4: DeepSeek channel (${#PROBE_TAGS[@]} probes) ---"
DS_OK=0; DS_TIMEOUT=0; DS_FAIL=0
declare -A DS_LATENCY DS_OK_MAP

for TAG in "${PROBE_TAGS[@]}"; do
  QID=$(get_id "$TAG"); QTEXT=$(get_text "$TAG")
  if [[ -z "$QID" ]]; then
    DS_FAIL=$((DS_FAIL + 1)); continue
  fi

  PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 65 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  DS_LATENCY[$TAG]=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    log "  ✅ $TAG: DeepSeek ok (${DS_LATENCY[$TAG]}ms)"
    DS_OK=$((DS_OK + 1))
    DS_OK_MAP[$TAG]="ok"
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    if [[ "$ERR" == *"timeout"* ]]; then
      log "  ⏱ $TAG: DeepSeek $ERR"
      DS_TIMEOUT=$((DS_TIMEOUT + 1))
    else
      log "  ❌ $TAG: DeepSeek $ERR"
      DS_FAIL=$((DS_FAIL + 1))
    fi
    DS_OK_MAP[$TAG]="fail"
  fi
done

MIN_DS=$(( (TOTAL_PROBE * 2 + 2) / 3 ))  # ceil(2/3 of total)
if [[ $DS_OK -ge $MIN_DS ]]; then
  log "  ✅ GATE 4 PASS: DeepSeek $DS_OK/$TOTAL_PROBE ok (need ≥$MIN_DS)"
  GATE4="pass"
else
  log "  ❌ GATE 4 FAIL: DeepSeek $DS_OK/$TOTAL_PROBE ok (need ≥$MIN_DS)"
  GATE4="fail"
fi

# ---- Gate 5: FULL_COMPARABLE count ----
log ""
log "--- Gate 5: FULL_COMPARABLE pairs ---"
FC_COUNT=0
for TAG in "${PROBE_TAGS[@]}"; do
  T_FB="${T_FALLBACK[$TAG]:-}"
  DS_RES="${DS_OK_MAP[$TAG]:-fail}"
  T_STS="${T_STATUS[$TAG]:-}"
  if [[ $T_OK -gt 0 && "$T_FB" != "llm_timeout" && "$T_STS" != "out_of_scope" && "$DS_RES" == "ok" ]]; then
    FC_COUNT=$((FC_COUNT + 1))
    log "  ✅ $TAG: FULL_COMPARABLE"
  fi
done

if [[ $FC_COUNT -ge 1 ]]; then
  log "  ✅ GATE 5 PASS: $FC_COUNT FULL_COMPARABLE pair(s)"
  GATE5="pass"
else
  log "  ❌ GATE 5 FAIL: 0 FULL_COMPARABLE pairs"
  GATE5="fail"
fi

# ---- Summary ----
echo ""
echo "======================================="
echo "  TEBIQ Eval Lab Health Check Report"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "======================================="
echo ""
echo "LLM Health Status:"
echo "  DeepSeek raw:         $([ "$GATE4" == "pass" ] && echo "pass" || echo "FAIL") ($DS_OK/$TOTAL_PROBE)"
echo "  TEBIQ LLM:            $([ "$GATE2" == "pass" ] && echo "pass" || echo "FAIL") ($T_OK/$TOTAL_PROBE)"
echo "  Fallback rate:        $T_TIMEOUT/$TOTAL_PROBE llm_timeout"
echo "  FULL_COMPARABLE:      $FC_COUNT/$TOTAL_PROBE"
echo ""
echo "  Gate 1 (access):      $GATE1"
echo "  Gate 2 (TEBIQ ok):    $GATE2"
echo "  Gate 3 (no timeout):  $GATE3"
echo "  Gate 4 (DeepSeek ok): $GATE4"
echo "  Gate 5 (FC pairs):    $GATE5"
echo ""

ALL_GATES=("$GATE1" "$GATE2" "$GATE3" "$GATE4" "$GATE5")
HC_PASS=true
for G in "${ALL_GATES[@]}"; do
  [[ "$G" != "pass" ]] && HC_PASS=false
done

if $HC_PASS; then
  echo "HEALTH CHECK RESULT: PASS"
  echo ""
  echo "  → Proceed: bash scripts/eval/run-round1-phased.sh"
  exit 0
else
  if [[ "$GATE3" == "fail" && "$GATE4" == "fail" ]]; then
    echo "  Timeout root cause: provider (DeepSeek API unavailable)"
    echo "  Recommended action: wait for DeepSeek API recovery, re-run health check"
  elif [[ "$GATE3" == "fail" ]]; then
    echo "  Timeout root cause: TEBIQ internal LLM timeout (provider or env)"
    echo "  Recommended action: check DEEPSEEK_API_KEY in production env"
  elif [[ "$GATE4" == "fail" ]]; then
    echo "  Timeout root cause: deepseek-raw route / provider"
    echo "  Recommended action: check DEEPSEEK_API_KEY + model availability"
  else
    echo "  Timeout root cause: unknown"
    echo "  Recommended action: inspect Vercel function logs"
  fi
  echo ""
  echo "HEALTH CHECK RESULT: FAIL"
  echo "  → Do NOT run batch generation until all gates pass."
  exit 1
fi
