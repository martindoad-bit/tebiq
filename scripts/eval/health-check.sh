#!/usr/bin/env bash
# Eval Lab — LLM Health Check (M3-C ready, Issue #34)
#
# Confirms both DeepSeek raw and TEBIQ LLM channels are alive before
# committing to a formal batch run.  Run this first; only proceed to
# run-round1-phased.sh / m3c-phased-run.sh when all gates pass.
#
# Two probes run sequentially:
#   1. Fast Interactive Probe (3 questions, 65s curl timeout) — gates
#      whether user-facing /internal/preview interactive is healthy.
#   2. Batch Generation Probe (5 questions, 95s curl timeout) — gates
#      whether the eval-lab batch path (90s server timeout, M3-C ready)
#      is healthy.
#
# Compatibility: macOS bash 3.x supported. We avoid `declare -A`
# (associative arrays were added in bash 4) and use a tiny kv-on-disk
# helper instead. Tested on bash 3.2.57 (macOS default) and bash 5.x.
#
# Usage:
#   BASE_URL=https://tebiq.jp bash scripts/eval/health-check.sh
#   BASE_URL=https://tebiq.jp SKIP_BATCH=1 bash scripts/eval/health-check.sh
#
# Pass criteria — Fast (Gates 1-5, existing):
#   1. Eval Lab access gate: /seed returns 200/405 (not 404)
#   2. TEBIQ channel: 3/3 ok=true
#   3. TEBIQ channel: 0/3 fallback_reason=llm_timeout
#   4. DeepSeek channel: ≥2/3 ok=true (≥66%)
#   5. At least one FULL_COMPARABLE pair (TEBIQ non-fallback + DeepSeek ok)
#
# Pass criteria — Batch (Gate 6, new for §3.2):
#   6. DeepSeek batch (90s timeout, concurrency 1): ≥4/5 ok=true
#
# Output: human-readable report ending in HEALTH CHECK RESULT: PASS/FAIL.

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
REVIEWER="${REVIEWER:-eval-health-check}"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TMP_DIR=$(mktemp -d "/tmp/tebiq-hc-${TIMESTAMP}-XXXX")
trap 'rm -rf "$TMP_DIR"' EXIT

log() { echo "[$(date +%H:%M:%S)] $*"; }

# --- bash 3.x-compatible key/value store -------------------------------------
# kv_set <namespace> <key> <value>   appends a tab-separated row to the file
# kv_get <namespace> <key>           prints first matching value (empty if none)
#
# We sanitize the namespace as a filename. Keys may contain any printable
# non-tab characters. The store is per-run (TMP_DIR cleaned on exit).
kv_file() {
  echo "$TMP_DIR/kv-$1"
}
kv_set() {
  local ns="$1"; local k="$2"; local v="$3"
  printf "%s\t%s\n" "$k" "$v" >> "$(kv_file "$ns")"
}
kv_get() {
  local ns="$1"; local k="$2"
  local f
  f="$(kv_file "$ns")"
  [[ -f "$f" ]] || { echo ""; return; }
  awk -F'\t' -v key="$k" '$1==key { print $2; exit }' "$f"
}

# Probe questions for the fast interactive probe (3 short, in-scope, low-risk
# tags previously confirmed LLM-capable).
PROBE_TAGS_FAST="eval-lab-v1-G04 eval-lab-v1-H05 eval-lab-v1-F05"

# Probe questions for the batch probe — 5 of varied length per Work Packet
# §3.2 ("5 条不同长度问题（短 / 中 / 长）").
#   - G04 在留卡丢了           — short Q, short A
#   - B01 経管 事務所移転 通知 — short Q, medium A
#   - A01 経管→技人国          — medium Q, long A
#   - F01 入管补材料期限       — medium Q, medium-long A
#   - B07 经管签放弃回国       — medium Q, long A (清算 case)
PROBE_TAGS_BATCH="eval-lab-v1-G04 eval-lab-v1-B01 eval-lab-v1-A01 eval-lab-v1-F01 eval-lab-v1-B07"

log "=== TEBIQ Eval Lab Health Check (Issue #34, M3-C aware) ==="
log "BASE_URL: $BASE_URL"

# ---- Gate 1: Access gate ---------------------------------------------------
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

# ---- Build tag→id+text map -------------------------------------------------
log ""
log "--- Fetching question state ---"
STATE_RESP=$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" \
  --max-time 15 2>/dev/null || echo '{}')
echo "$STATE_RESP" | jq -r '.questions[] | [.starter_tag, .id, .question_text] | @tsv' \
  2>/dev/null > "$TMP_DIR/tag_id.tsv" || true
# Fallback to legacy camelCase keys (older /state response shape) if the
# snake-case selector returned nothing.
if [[ ! -s "$TMP_DIR/tag_id.tsv" ]]; then
  echo "$STATE_RESP" | jq -r '.questions[] | [.starterTag, .id, .questionText] | @tsv' \
    2>/dev/null > "$TMP_DIR/tag_id.tsv" || true
fi
Q_COUNT=$(wc -l < "$TMP_DIR/tag_id.tsv" 2>/dev/null || echo "0")
log "  Question map: $Q_COUNT entries"

if [[ "$Q_COUNT" -lt 5 ]]; then
  log "  ❌ FAIL: Could not load question list (seed may have failed)"
  echo "HEALTH CHECK RESULT: FAIL (question map empty)"
  exit 1
fi

get_id()   { awk -F'\t' -v t="$1" '$1==t { print $2; exit }' "$TMP_DIR/tag_id.tsv"; }
get_text() { awk -F'\t' -v t="$1" '$1==t { print $3; exit }' "$TMP_DIR/tag_id.tsv"; }

# ---- Gates 2 + 3: TEBIQ channel (fast probe) -------------------------------
log ""
log "--- Gates 2+3: TEBIQ channel (fast probe, 3 questions) ---"
T_OK=0; T_TIMEOUT=0; T_FAIL=0
TOTAL_FAST=0
for TAG in $PROBE_TAGS_FAST; do TOTAL_FAST=$((TOTAL_FAST + 1)); done

for TAG in $PROBE_TAGS_FAST; do
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

  T_STATUS=$(echo "$RESP" | jq -r '.status // "?"' 2>/dev/null)
  T_FB=$(echo "$RESP" | jq -r '.fallback_reason // ""' 2>/dev/null)
  T_ENGINE=$(echo "$RESP" | jq -r '.engine_version // "?"' 2>/dev/null)
  T_LAT=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)
  kv_set t-status "$TAG" "$T_STATUS"
  kv_set t-fallback "$TAG" "$T_FB"

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    if [[ "$T_FB" == "llm_timeout" ]]; then
      log "  ⚠️  $TAG: ok=true BUT fallback=llm_timeout (${T_LAT}ms)"
      T_TIMEOUT=$((T_TIMEOUT + 1))
    else
      log "  ✅ $TAG: ok status=$T_STATUS engine=$T_ENGINE fallback='$T_FB' (${T_LAT}ms)"
      T_OK=$((T_OK + 1))
    fi
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    log "  ❌ $TAG: $ERR"
    T_FAIL=$((T_FAIL + 1))
  fi
done

if [[ $T_OK -eq $TOTAL_FAST ]]; then
  log "  ✅ GATE 2 PASS: TEBIQ $T_OK/$TOTAL_FAST ok"
  log "  ✅ GATE 3 PASS: 0 llm_timeout fallbacks"
  GATE2="pass"; GATE3="pass"
elif [[ $T_TIMEOUT -gt 0 ]]; then
  log "  ❌ GATE 3 FAIL: $T_TIMEOUT/$TOTAL_FAST llm_timeout fallback"
  GATE2="partial"; GATE3="fail"
else
  log "  ❌ GATE 2 FAIL: TEBIQ $T_OK/$TOTAL_FAST ok (need all $TOTAL_FAST)"
  GATE2="fail"; GATE3="unknown"
fi

# ---- Gate 4: DeepSeek channel (fast probe) ---------------------------------
log ""
log "--- Gate 4: DeepSeek channel (fast probe, 3 questions) ---"
DS_OK=0; DS_TIMEOUT=0; DS_FAIL=0

for TAG in $PROBE_TAGS_FAST; do
  QID=$(get_id "$TAG"); QTEXT=$(get_text "$TAG")
  if [[ -z "$QID" ]]; then
    DS_FAIL=$((DS_FAIL + 1)); continue
  fi

  PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')
  # NOTE: with §3.1 the route timeout is now 90s. We use --max-time 95
  # to give the route + TLS slop room. Old health-check used 65 because
  # the route was 25s. Keep 95 even for fast probes — it doesn't hurt
  # successful calls; failure mode is the same.
  RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 95 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

  DS_LAT=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)
  DS_PROV=$(echo "$RESP" | jq -r '.provider_status // "?"' 2>/dev/null)

  if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
    log "  ✅ $TAG: DeepSeek ok provider=$DS_PROV (${DS_LAT}ms)"
    DS_OK=$((DS_OK + 1))
    kv_set ds-ok "$TAG" "ok"
  else
    ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
    if [[ "$ERR" == *"timeout"* ]]; then
      log "  ⏱ $TAG: DeepSeek $ERR provider=$DS_PROV"
      DS_TIMEOUT=$((DS_TIMEOUT + 1))
    else
      log "  ❌ $TAG: DeepSeek $ERR provider=$DS_PROV"
      DS_FAIL=$((DS_FAIL + 1))
    fi
    kv_set ds-ok "$TAG" "fail"
  fi
done

MIN_DS=$(( (TOTAL_FAST * 2 + 2) / 3 ))  # ceil(2/3 of total)
if [[ $DS_OK -ge $MIN_DS ]]; then
  log "  ✅ GATE 4 PASS: DeepSeek $DS_OK/$TOTAL_FAST ok (need ≥$MIN_DS)"
  GATE4="pass"
else
  log "  ❌ GATE 4 FAIL: DeepSeek $DS_OK/$TOTAL_FAST ok (need ≥$MIN_DS)"
  GATE4="fail"
fi

# ---- Gate 5: FULL_COMPARABLE pairs from fast probe -------------------------
log ""
log "--- Gate 5: FULL_COMPARABLE pairs ---"
FC_COUNT=0
for TAG in $PROBE_TAGS_FAST; do
  T_FB="$(kv_get t-fallback "$TAG")"
  T_STS="$(kv_get t-status "$TAG")"
  DS_RES="$(kv_get ds-ok "$TAG")"
  [[ -z "$DS_RES" ]] && DS_RES="fail"
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

# ============================================================================
# Gate 6: NEW for Issue #34 §3.2 — DeepSeek batch probe (90s, concurrency 1)
# ============================================================================
GATE6="skipped"
B_OK=0; B_TIMEOUT=0; B_FAIL=0
B_LATENCY_SUM=0
B_LATENCY_COUNT=0
TOTAL_BATCH=0

if [[ "${SKIP_BATCH:-0}" == "1" ]]; then
  log ""
  log "--- Gate 6: SKIPPED (SKIP_BATCH=1) ---"
else
  log ""
  log "--- Gate 6: DeepSeek batch probe (5 questions, 90s timeout, concurrency 1) ---"
  for TAG in $PROBE_TAGS_BATCH; do TOTAL_BATCH=$((TOTAL_BATCH + 1)); done

  for TAG in $PROBE_TAGS_BATCH; do
    QID=$(get_id "$TAG"); QTEXT=$(get_text "$TAG")
    if [[ -z "$QID" ]]; then
      log "  ⚠️  $TAG: not in state (skip)"
      B_FAIL=$((B_FAIL + 1)); continue
    fi
    QLEN=${#QTEXT}

    PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
      '{"question":$q,"question_id":$qid,"reviewer":$r}')
    # 95s curl timeout to cover the 90s server timeout + TLS slop. Concurrency
    # 1 — sequential, no parallelism, per Work Packet §3.2.
    RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
      -H "Content-Type: application/json" -d "$PAYLOAD" \
      --max-time 95 2>/dev/null) || RESP='{"ok":false,"error":"curl_failed"}'

    B_LAT=$(echo "$RESP" | jq -r '.latency_ms // "?"' 2>/dev/null)
    B_TO=$(echo "$RESP" | jq -r '.timeout_ms // "?"' 2>/dev/null)
    B_PROV=$(echo "$RESP" | jq -r '.provider_status // "?"' 2>/dev/null)
    B_ATT=$(echo "$RESP" | jq -r '.attempts // "?"' 2>/dev/null)

    if echo "$RESP" | jq -e '.ok == true' >/dev/null 2>&1; then
      log "  ✅ $TAG: ok q_len=$QLEN provider=$B_PROV latency=${B_LAT}ms (timeout_budget=${B_TO}ms, attempts=${B_ATT})"
      B_OK=$((B_OK + 1))
      # Accumulate latency for average (skip ? sentinel)
      if [[ "$B_LAT" =~ ^[0-9]+$ ]]; then
        B_LATENCY_SUM=$((B_LATENCY_SUM + B_LAT))
        B_LATENCY_COUNT=$((B_LATENCY_COUNT + 1))
      fi
    else
      ERR=$(echo "$RESP" | jq -r '.error // "unknown"' 2>/dev/null)
      if [[ "$ERR" == *"timeout"* ]]; then
        log "  ⏱ $TAG: timeout q_len=$QLEN provider=$B_PROV (${B_LAT}ms / ${B_TO}ms budget)"
        B_TIMEOUT=$((B_TIMEOUT + 1))
      else
        log "  ❌ $TAG: $ERR q_len=$QLEN provider=$B_PROV"
        B_FAIL=$((B_FAIL + 1))
      fi
    fi
  done

  if [[ $B_OK -ge 4 ]]; then
    log "  ✅ GATE 6 PASS: DeepSeek batch $B_OK/$TOTAL_BATCH ok (need ≥4/5)"
    GATE6="pass"
  else
    log "  ❌ GATE 6 FAIL: DeepSeek batch $B_OK/$TOTAL_BATCH ok (need ≥4/5)"
    GATE6="fail"
  fi
fi

# Compute batch averages for the report.
if [[ $B_LATENCY_COUNT -gt 0 ]]; then
  B_AVG_LATENCY=$((B_LATENCY_SUM / B_LATENCY_COUNT))
else
  B_AVG_LATENCY="-"
fi

# ---- Status banners ---------------------------------------------------------
# Map gates → the friendly statuses the report needs (Work Packet §3.2):
#   fast_interactive_status:     healthy_interactive | slow_not_interactive | down
#   batch_generation_status:     healthy_batch | slow_batch | unusable_batch | skipped

if [[ "$GATE2" == "pass" && "$GATE3" == "pass" && "$GATE4" == "pass" ]]; then
  FAST_STATUS="healthy_interactive"
elif [[ "$GATE3" == "fail" || "$DS_TIMEOUT" -gt 0 ]]; then
  FAST_STATUS="slow_not_interactive"
elif [[ "$GATE2" == "fail" || "$GATE4" == "fail" ]]; then
  FAST_STATUS="down"
else
  FAST_STATUS="unknown"
fi

if [[ "$GATE6" == "pass" ]]; then
  BATCH_STATUS="healthy_batch"
elif [[ "$GATE6" == "skipped" ]]; then
  BATCH_STATUS="skipped"
elif [[ $B_OK -ge 2 && $B_TIMEOUT -gt 0 ]]; then
  BATCH_STATUS="slow_batch"
elif [[ "$GATE6" == "fail" ]]; then
  BATCH_STATUS="unusable_batch"
else
  BATCH_STATUS="unknown"
fi

# ready_for_M3_C condition (Work Packet §3.2):
#   - batch healthy_batch
#   - no fallback contamination (Gate 3)
#   - at least one FULL_COMPARABLE
if [[ "$BATCH_STATUS" == "healthy_batch" && "$GATE3" == "pass" && "$GATE5" == "pass" ]]; then
  READY_M3C="yes"
else
  READY_M3C="no"
fi

# ---- Summary ----------------------------------------------------------------
echo ""
echo "========================================================="
echo "  TEBIQ Eval Lab Health Check Report (Issue #34)"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "========================================================="
echo ""
echo "Fast Interactive Probe (3 questions, 25s server budget):"
echo "  fast_interactive_status:  $FAST_STATUS"
echo "  TEBIQ ok:                 $T_OK/$TOTAL_FAST"
echo "  TEBIQ llm_timeout:        $T_TIMEOUT/$TOTAL_FAST"
echo "  DeepSeek ok:              $DS_OK/$TOTAL_FAST"
echo "  FULL_COMPARABLE pairs:    $FC_COUNT"
echo ""
echo "Batch Generation Probe (5 questions, 90s server timeout, concurrency 1):"
echo "  batch_generation_status:  $BATCH_STATUS"
echo "  success_count:            $B_OK/$TOTAL_BATCH"
echo "  timeout_count:            $B_TIMEOUT/$TOTAL_BATCH"
echo "  failure_count:            $B_FAIL/$TOTAL_BATCH"
echo "  average_latency_ms:       $B_AVG_LATENCY"
echo "  recommended_concurrency:  1"
echo ""
echo "Gates:"
echo "  Gate 1 (access):                $GATE1"
echo "  Gate 2 (TEBIQ ok):              $GATE2"
echo "  Gate 3 (no llm_timeout):        $GATE3"
echo "  Gate 4 (DeepSeek fast ok):      $GATE4"
echo "  Gate 5 (FULL_COMPARABLE):       $GATE5"
echo "  Gate 6 (DeepSeek batch ok):     $GATE6"
echo ""
echo "ready_for_M3_C:                  $READY_M3C"
echo ""

ALL_GATES=("$GATE1" "$GATE2" "$GATE3" "$GATE4" "$GATE5")
HC_PASS=true
for G in "${ALL_GATES[@]}"; do
  [[ "$G" != "pass" ]] && HC_PASS=false
done

# Gate 6 only blocks when not skipped and failed.
if [[ "$GATE6" == "fail" ]]; then HC_PASS=false; fi

if $HC_PASS; then
  echo "HEALTH CHECK RESULT: PASS"
  echo ""
  if [[ "$READY_M3C" == "yes" ]]; then
    echo "  → M3-C readiness: yes — proceed to scripts/eval/m3c-phased-run.sh --phase=5q"
  else
    echo "  → M3-C readiness: no — see batch_generation_status above"
  fi
  exit 0
else
  echo "HEALTH CHECK RESULT: FAIL"
  if [[ "$GATE3" == "fail" && "$GATE4" == "fail" ]]; then
    echo "  Timeout root cause: provider (DeepSeek API unavailable)"
    echo "  Recommended action: wait for DeepSeek API recovery, re-run health check"
  elif [[ "$GATE3" == "fail" ]]; then
    echo "  Timeout root cause: TEBIQ internal LLM timeout (provider or env)"
    echo "  Recommended action: check DEEPSEEK_API_KEY in production env"
  elif [[ "$GATE4" == "fail" ]]; then
    echo "  Timeout root cause: deepseek-raw route / provider"
    echo "  Recommended action: check DEEPSEEK_API_KEY + model availability"
  elif [[ "$GATE6" == "fail" ]]; then
    echo "  Timeout root cause: batch path (90s) — see provider_status per probe"
    echo "  Recommended action: re-run with SKIP_BATCH=1 to isolate fast probes"
  else
    echo "  Timeout root cause: unknown"
    echo "  Recommended action: inspect Vercel function logs"
  fi
  echo ""
  echo "  → Do NOT run batch generation until all gates pass."
  exit 1
fi
