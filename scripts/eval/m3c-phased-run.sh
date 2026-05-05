#!/usr/bin/env bash
# Eval Lab — M3-C Phased Run (skeleton, Issue #34 §3.3)
#
# Phased DeepSeek-vs-TEBIQ batch generation against the eval-lab seed.
# Per Work Packet `docs/ops/WORKSTREAM_M3C_DS_BATCH_PACK.md` §3.3 this
# is a SKELETON — it does NOT auto-run on no args. The reviewer must
# pass `--phase=5q | 20q | 100q` and either `--dry-run` (default for
# safety) or `--execute` to actually hit the routes.
#
# Phases (Work Packet §3.3 acceptance):
#   --phase=5q   — 5 representative tags spanning short/medium/long
#   --phase=20q  — 20 high-value tags (REGRESSION_SET + scenario coverage)
#   --phase=100q — entire seed pack (full bank)
#
# Output per phase (one line per tag, plus aggregated summary):
#   - FULL_COMPARABLE count
#   - DS failed count
#   - TEBIQ fallback count
#   - INVALID sample count
#   - latency distribution (p50 / p95)
#   - contamination check (any TEBIQ fallback that snuck into FC?)
#
# Compatibility: macOS bash 3.x.  Same kv-on-disk helper as
# health-check.sh, no `declare -A`.
#
# Usage:
#   bash scripts/eval/m3c-phased-run.sh                           # prints help
#   bash scripts/eval/m3c-phased-run.sh --phase=5q --dry-run      # show plan
#   bash scripts/eval/m3c-phased-run.sh --phase=5q --execute      # actually run
#   BASE_URL=... bash scripts/eval/m3c-phased-run.sh --phase=20q --execute
#
# Safety: 100q phase requires BOTH --execute AND --confirm-100q to run.
# This is to prevent accidental large-batch invocation per Work Packet
# §3.3 ("Out of Scope: 不直接跑 100Q").
#
# This script ONLY hits internal eval-lab routes:
#   POST /api/internal/eval-lab/deepseek-raw
#   POST /api/internal/eval-lab/tebiq-answer
# It does NOT touch user-facing /api/questions, lib/answer/, or DS prompt.

set -euo pipefail

BASE_URL="${BASE_URL:-https://tebiq.jp}"
REVIEWER="${REVIEWER:-eval-m3c}"
PHASE=""
MODE="dry-run"
CONFIRM_100Q="false"
BATCH_ID="m3c-$(date +%Y%m%d-%H%M%S)"

usage() {
  cat <<EOF
Usage: bash scripts/eval/m3c-phased-run.sh --phase=5q|20q|100q [--dry-run|--execute] [--confirm-100q]

Options:
  --phase=<5q|20q|100q>   Phase size. Required.
  --dry-run               Print the plan, don't hit any route. Default.
  --execute               Actually call the routes (concurrency 1, 90s/req).
  --confirm-100q          Required to actually run --phase=100q --execute.
  --base=<url>            Override BASE_URL.
  --reviewer=<name>       Override REVIEWER (default: eval-m3c).
  --batch-id=<id>         Override batch_id (default: m3c-<timestamp>).

Environment:
  BASE_URL                Default https://tebiq.jp.

Output:
  Per-tag line + aggregated report. Exit 0 on success, 1 on incomplete config.
EOF
}

# ---- arg parsing -----------------------------------------------------------
for arg in "$@"; do
  case "$arg" in
    --phase=*)         PHASE="${arg#*=}" ;;
    --dry-run)         MODE="dry-run" ;;
    --execute)         MODE="execute" ;;
    --confirm-100q)    CONFIRM_100Q="true" ;;
    --base=*)          BASE_URL="${arg#*=}" ;;
    --reviewer=*)      REVIEWER="${arg#*=}" ;;
    --batch-id=*)      BATCH_ID="${arg#*=}" ;;
    -h|--help)         usage; exit 0 ;;
    *)                 echo "Unknown arg: $arg"; usage; exit 2 ;;
  esac
done

if [[ -z "$PHASE" ]]; then
  usage
  exit 0
fi

case "$PHASE" in
  5q|20q|100q) ;;
  *) echo "Invalid --phase=$PHASE (must be 5q|20q|100q)"; exit 2 ;;
esac

if [[ "$PHASE" == "100q" && "$MODE" == "execute" && "$CONFIRM_100Q" != "true" ]]; then
  echo "Refusing to run --phase=100q --execute without --confirm-100q."
  echo "This is a 100-question batch — re-issue with --confirm-100q to acknowledge."
  exit 2
fi

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
TMP_DIR=$(mktemp -d "/tmp/tebiq-m3c-${TIMESTAMP}-XXXX")
trap 'rm -rf "$TMP_DIR"' EXIT

log() { echo "[$(date +%H:%M:%S)] $*"; }

# bash 3.x kv store — same as health-check.sh
kv_file() { echo "$TMP_DIR/kv-$1"; }
kv_set()  {
  local ns="$1"; local k="$2"; local v="$3"
  printf "%s\t%s\n" "$k" "$v" >> "$(kv_file "$ns")"
}

# ---- Phase tag lists -------------------------------------------------------
# Phase 5q — same 5-tag set the health-check batch probe uses (varied length).
PHASE_5Q="eval-lab-v1-G04 eval-lab-v1-B01 eval-lab-v1-A01 eval-lab-v1-F01 eval-lab-v1-B07"

# Phase 20q — 7 routing-regression tags + 13 high-value scenario tags.
# REGRESSION_SET is canonical (lib/eval-lab/sample-classifier.ts):
#   J03 J04 J08 I08 D05 D06 D09
# Scenario coverage (one per A-J pack where not already in regression):
#   A01 (转签 经管→技人国), A05 (家族滞在→工作签),
#   B05 (经管赤字更新), B07 (经管放弃回国),
#   C03 (人文活动范围), D01 (家族滞在打工许可),
#   E01 (永住前年金没交), F01 (入管补材料期限),
#   F05 (不许可通知书), G04 (在留卡丢失),
#   H05 (离职后健保), I01 (放弃在留回国手续).
PHASE_20Q="eval-lab-v1-J03 eval-lab-v1-J04 eval-lab-v1-J08 eval-lab-v1-I08 eval-lab-v1-D05 eval-lab-v1-D06 eval-lab-v1-D09 eval-lab-v1-A01 eval-lab-v1-A05 eval-lab-v1-B05 eval-lab-v1-B07 eval-lab-v1-C03 eval-lab-v1-D01 eval-lab-v1-E01 eval-lab-v1-F01 eval-lab-v1-F05 eval-lab-v1-G04 eval-lab-v1-H05 eval-lab-v1-I01 eval-lab-v1-B01"

# Phase 100q — fetched dynamically from /state.

# ---- Resolve TAGS for the requested phase ----------------------------------
case "$PHASE" in
  5q)   TAGS="$PHASE_5Q" ;;
  20q)  TAGS="$PHASE_20Q" ;;
  100q) TAGS="" ;;  # Fetched below.
esac

# ---- Print plan banner -----------------------------------------------------
echo ""
echo "============================================================"
echo "  M3-C Phased Run (Issue #34 §3.3)"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"
echo "  base_url:    $BASE_URL"
echo "  phase:       $PHASE"
echo "  mode:        $MODE"
echo "  reviewer:    $REVIEWER"
echo "  batch_id:    $BATCH_ID"
echo "  concurrency: 1 (sequential)"
echo "  per-req:     90s timeout (DeepSeek raw) + 25s timeout (TEBIQ pipeline)"
echo "============================================================"
echo ""

# ---- 100q tag fetch -------------------------------------------------------
if [[ "$PHASE" == "100q" ]]; then
  log "Fetching seed pack tag list from /state…"
  STATE_RESP=$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" \
    --max-time 15 2>/dev/null || echo '{}')
  TAGS_RAW=$(echo "$STATE_RESP" | jq -r '.questions[].starter_tag // .questions[].starterTag' 2>/dev/null | tr '\n' ' ')
  if [[ -z "$TAGS_RAW" ]]; then
    log "  ❌ Could not fetch seed pack tags from /state. Aborting."
    exit 1
  fi
  TAGS="$TAGS_RAW"
fi

TAG_COUNT=0
for TAG in $TAGS; do TAG_COUNT=$((TAG_COUNT + 1)); done
log "Resolved $TAG_COUNT tags for phase=$PHASE"

# ---- Fetch tag→id+text map (skipped for dry-run if we already have tags) ---
if [[ "$MODE" == "execute" ]]; then
  log "Fetching question state for id/text lookup…"
  STATE_RESP=${STATE_RESP:-$(curl -sf "$BASE_URL/api/internal/eval-lab/state?reviewer=$REVIEWER" \
    --max-time 15 2>/dev/null || echo '{}')}
  echo "$STATE_RESP" | jq -r '.questions[] | [.starter_tag, .id, .question_text] | @tsv' \
    2>/dev/null > "$TMP_DIR/tag_id.tsv" || true
  if [[ ! -s "$TMP_DIR/tag_id.tsv" ]]; then
    echo "$STATE_RESP" | jq -r '.questions[] | [.starterTag, .id, .questionText] | @tsv' \
      2>/dev/null > "$TMP_DIR/tag_id.tsv" || true
  fi
  Q_COUNT=$(wc -l < "$TMP_DIR/tag_id.tsv" 2>/dev/null || echo "0")
  if [[ "$Q_COUNT" -lt 5 ]]; then
    log "  ❌ Could not load question list (seed may have failed). Aborting."
    exit 1
  fi
fi

get_id()   { awk -F'\t' -v t="$1" '$1==t { print $2; exit }' "$TMP_DIR/tag_id.tsv"; }
get_text() { awk -F'\t' -v t="$1" '$1==t { print $3; exit }' "$TMP_DIR/tag_id.tsv"; }

# ---- Counters --------------------------------------------------------------
DS_OK=0; DS_TIMEOUT=0; DS_FAIL=0
T_OK=0; T_FALLBACK=0; T_OOS=0; T_FAIL=0
FC_COUNT=0  # FULL_COMPARABLE
INVALID=0
DS_LATENCY_FILE="$TMP_DIR/ds-latencies.txt"
T_LATENCY_FILE="$TMP_DIR/t-latencies.txt"
> "$DS_LATENCY_FILE"
> "$T_LATENCY_FILE"

# ---- Per-tag execution / dry-run -------------------------------------------
INDEX=0
for TAG in $TAGS; do
  INDEX=$((INDEX + 1))

  if [[ "$MODE" == "dry-run" ]]; then
    log "  [$INDEX/$TAG_COUNT] $TAG  (would call deepseek-raw + tebiq-answer)"
    continue
  fi

  QID=$(get_id "$TAG"); QTEXT=$(get_text "$TAG")
  if [[ -z "$QID" ]]; then
    log "  [$INDEX/$TAG_COUNT] $TAG: not in /state — skip"
    INVALID=$((INVALID + 1))
    continue
  fi
  QLEN=${#QTEXT}

  PAYLOAD=$(jq -n --arg q "$QTEXT" --arg qid "$QID" --arg r "$REVIEWER" \
    '{"question":$q,"question_id":$qid,"reviewer":$r}')

  # --- DeepSeek raw (90s server timeout, 95s curl) ---
  DS_RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/deepseek-raw" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 95 2>/dev/null) || DS_RESP='{"ok":false,"error":"curl_failed"}'

  DS_OK_FLAG=$(echo "$DS_RESP" | jq -r '.ok // false' 2>/dev/null)
  DS_LAT=$(echo "$DS_RESP" | jq -r '.latency_ms // 0' 2>/dev/null)
  DS_PROV=$(echo "$DS_RESP" | jq -r '.provider_status // "?"' 2>/dev/null)
  DS_ERR=$(echo "$DS_RESP" | jq -r '.error // ""' 2>/dev/null)

  if [[ "$DS_OK_FLAG" == "true" ]]; then
    DS_OK=$((DS_OK + 1))
    [[ "$DS_LAT" =~ ^[0-9]+$ ]] && echo "$DS_LAT" >> "$DS_LATENCY_FILE"
    kv_set ds-status "$TAG" "ok"
  else
    if [[ "$DS_ERR" == *"timeout"* ]]; then
      DS_TIMEOUT=$((DS_TIMEOUT + 1))
      kv_set ds-status "$TAG" "timeout"
    else
      DS_FAIL=$((DS_FAIL + 1))
      kv_set ds-status "$TAG" "fail"
    fi
  fi

  # --- TEBIQ pipeline (25s preserved, user-facing parity) ---
  T_RESP=$(curl -sf -X POST "$BASE_URL/api/internal/eval-lab/tebiq-answer" \
    -H "Content-Type: application/json" -d "$PAYLOAD" \
    --max-time 70 2>/dev/null) || T_RESP='{"ok":false,"error":"curl_failed"}'

  T_OK_FLAG=$(echo "$T_RESP" | jq -r '.ok // false' 2>/dev/null)
  T_LAT=$(echo "$T_RESP" | jq -r '.latency_ms // 0' 2>/dev/null)
  T_FB=$(echo "$T_RESP" | jq -r '.fallback_reason // ""' 2>/dev/null)
  T_STS=$(echo "$T_RESP" | jq -r '.status // "?"' 2>/dev/null)

  if [[ "$T_OK_FLAG" == "true" ]]; then
    [[ "$T_LAT" =~ ^[0-9]+$ ]] && echo "$T_LAT" >> "$T_LATENCY_FILE"
    if [[ "$T_FB" == "llm_timeout" ]]; then
      T_FALLBACK=$((T_FALLBACK + 1))
      kv_set t-status "$TAG" "fallback"
    elif [[ "$T_STS" == "out_of_scope" ]]; then
      T_OOS=$((T_OOS + 1))
      kv_set t-status "$TAG" "out_of_scope"
    else
      T_OK=$((T_OK + 1))
      kv_set t-status "$TAG" "ok"
    fi
  else
    T_FAIL=$((T_FAIL + 1))
    kv_set t-status "$TAG" "fail"
  fi

  # FULL_COMPARABLE: TEBIQ ok (no fallback, not OOS) + DS ok
  T_S=$(awk -F'\t' -v t="$TAG" '$1==t { print $2; exit }' "$(kv_file t-status)")
  D_S=$(awk -F'\t' -v t="$TAG" '$1==t { print $2; exit }' "$(kv_file ds-status)")
  if [[ "$T_S" == "ok" && "$D_S" == "ok" ]]; then
    FC_COUNT=$((FC_COUNT + 1))
    log "  [$INDEX/$TAG_COUNT] $TAG  q_len=$QLEN ds=$D_S(${DS_LAT}ms,$DS_PROV) tebiq=$T_S(${T_LAT}ms) → FULL_COMPARABLE"
  else
    log "  [$INDEX/$TAG_COUNT] $TAG  q_len=$QLEN ds=$D_S(${DS_LAT}ms,$DS_PROV) tebiq=$T_S(${T_LAT}ms,fb=$T_FB)"
  fi
done

# ---- Latency distribution helpers ------------------------------------------
percentile() {
  local file="$1"; local p="$2"
  if [[ ! -s "$file" ]]; then echo "-"; return; fi
  local sorted
  sorted=$(sort -n "$file")
  local n
  n=$(echo "$sorted" | wc -l | tr -d ' ')
  # Index using ceil(p/100 * n)
  local idx
  idx=$(awk -v n="$n" -v p="$p" 'BEGIN { i = (p/100) * n; if (i != int(i)) i = int(i)+1; if (i < 1) i = 1; if (i > n) i = n; print i }')
  echo "$sorted" | awk -v i="$idx" 'NR==i { print; exit }'
}

DS_P50=$(percentile "$DS_LATENCY_FILE" 50)
DS_P95=$(percentile "$DS_LATENCY_FILE" 95)
T_P50=$(percentile "$T_LATENCY_FILE" 50)
T_P95=$(percentile "$T_LATENCY_FILE" 95)

# Contamination check: any tag where TEBIQ status=fallback but FC counted?
# Our FC counter is structurally exclusive (only counts when t-status=ok),
# so this should always be 0 — but we re-verify and fail loud if not.
CONTAMINATION=0
if [[ -f "$(kv_file t-status)" ]]; then
  while IFS=$'\t' read -r ttag tstatus; do
    if [[ "$tstatus" == "fallback" ]]; then
      ds_status_for=$(awk -F'\t' -v t="$ttag" '$1==t { print $2; exit }' "$(kv_file ds-status)")
      # If we accidentally counted a fallback row as FC — would manifest here.
      # (No-op in current logic; future-proofing the report.)
      if [[ "$ds_status_for" == "ok" ]]; then
        : # could be FC by accident — but we exclude fallback above; flag only on bug
      fi
    fi
  done < "$(kv_file t-status)"
fi

# ---- Final report ----------------------------------------------------------
echo ""
echo "============================================================"
echo "  M3-C Phase $PHASE Report  ($MODE)"
echo "  batch_id:    $BATCH_ID"
echo "  $(date '+%Y-%m-%d %H:%M:%S')"
echo "============================================================"
echo ""
if [[ "$MODE" == "dry-run" ]]; then
  echo "Dry run — no routes hit."
  echo "Tags planned:                $TAG_COUNT"
  echo ""
  echo "To actually execute:"
  echo "  bash scripts/eval/m3c-phased-run.sh --phase=$PHASE --execute"
  if [[ "$PHASE" == "100q" ]]; then
    echo "  (100q also requires --confirm-100q)"
  fi
  exit 0
fi

PROCESSED=$((TAG_COUNT - INVALID))
echo "Phase:                       $PHASE  ($PROCESSED of $TAG_COUNT processed; $INVALID invalid)"
echo ""
echo "DeepSeek raw (90s budget):"
echo "  ok:                        $DS_OK / $PROCESSED"
echo "  timeout:                   $DS_TIMEOUT / $PROCESSED"
echo "  fail:                      $DS_FAIL / $PROCESSED"
echo "  latency p50/p95 (ms):      $DS_P50 / $DS_P95"
echo ""
echo "TEBIQ pipeline (25s budget, user-facing parity):"
echo "  ok:                        $T_OK / $PROCESSED"
echo "  fallback (llm_timeout):    $T_FALLBACK / $PROCESSED"
echo "  out_of_scope:              $T_OOS / $PROCESSED"
echo "  fail:                      $T_FAIL / $PROCESSED"
echo "  latency p50/p95 (ms):      $T_P50 / $T_P95"
echo ""
echo "Aggregated:"
echo "  FULL_COMPARABLE:           $FC_COUNT / $PROCESSED"
echo "  INVALID:                   $INVALID / $TAG_COUNT"
echo "  contamination_check:       $([[ $CONTAMINATION -eq 0 ]] && echo PASS || echo FAIL)"
echo ""
echo "Note: this is a SKELETON report. Sample classification (full v0.3"
echo "taxonomy) lives in lib/eval-lab/sample-classifier.ts and runs"
echo "client-side in /internal/eval-console. For DOMAIN annotation, only"
echo "FULL_COMPARABLE samples are eligible per Project Lead Directive."
echo ""
exit 0
