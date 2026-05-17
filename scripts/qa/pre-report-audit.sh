#!/usr/bin/env bash
# pre-report-audit.sh
#
# Executable enforcement for TEBIQ_AI_AGENT_WORK_MODE.md §5.3 Pre-Report
# Self-Audit. Before any AI agent files a "done" report, every check below
# must PASS. A single FAIL means the report cannot claim "shipped".
#
# Five checks:
#   1. git status --porcelain is empty (no untracked / unstaged drift)
#   2. npm run lint
#   3. npx tsc --noEmit --pretty false
#   4. npm test
#   5. scripts/qa/production-url-smoke.sh (every public route 2xx/3xx)
#
# Usage:
#   bash scripts/qa/pre-report-audit.sh
#   bash scripts/qa/pre-report-audit.sh --skip-smoke   # for offline runs
#   bash scripts/qa/pre-report-audit.sh --base-url=https://staging.tebiq.jp
#
# Exit:
#   0 = all checks passed, report is allowed to claim "shipped"
#   1 = at least one check failed; report MUST list this in "未做" section
set -u

SKIP_SMOKE=0
BASE_URL_ARG=""
for arg in "$@"; do
  case "$arg" in
    --skip-smoke) SKIP_SMOKE=1 ;;
    --base-url=*) BASE_URL_ARG="$arg" ;;
    -h|--help)
      sed -n '1,30p' "$0"
      exit 0
      ;;
    *)
      echo "[pre-report-audit] unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT" || { echo "[pre-report-audit] cannot cd to repo root" >&2; exit 2; }

# Track each check result. macOS bash 3.2 has no associative arrays so we use
# parallel ordered lists.
NAMES=()
RESULTS=()
DETAILS=()

run_check() {
  local name="$1"; shift
  echo ""
  echo "=== [pre-report-audit] $name ==="
  if "$@"; then
    NAMES+=("$name"); RESULTS+=("PASS"); DETAILS+=("")
    echo "--- $name: PASS"
    return 0
  else
    local code=$?
    NAMES+=("$name"); RESULTS+=("FAIL"); DETAILS+=("exit=$code")
    echo "--- $name: FAIL (exit=$code)"
    return 1
  fi
}

# ---------- Check 1: git status clean ----------
check_git_clean() {
  local out
  out="$(git status --porcelain)"
  if [ -z "$out" ]; then
    echo "git status --porcelain: clean"
    return 0
  fi
  echo "git status --porcelain has output (untracked / unstaged):"
  echo "$out"
  echo ""
  echo "  Failure rule: §5.3 #1. Any drift here is the same fault class as"
  echo "  the 2026-05-17 /me/matters incident. Fix before reporting."
  return 1
}
run_check "git_status_clean" check_git_clean || true

# ---------- Check 2: lint ----------
check_lint() {
  npm run lint
}
run_check "npm_lint" check_lint || true

# ---------- Check 3: tsc --noEmit ----------
check_tsc() {
  npx tsc --noEmit --pretty false
}
run_check "tsc_noemit" check_tsc || true

# ---------- Check 4: npm test ----------
check_test() {
  npm test
}
run_check "npm_test" check_test || true

# ---------- Check 5: production URL smoke ----------
check_smoke() {
  if [ "$SKIP_SMOKE" -eq 1 ]; then
    echo "production-url-smoke: SKIPPED via --skip-smoke (not allowed for"
    echo "  pre-deploy reports; only safe for fully offline dev)."
    return 1
  fi
  if [ -n "$BASE_URL_ARG" ]; then
    bash scripts/qa/production-url-smoke.sh "$BASE_URL_ARG"
  else
    bash scripts/qa/production-url-smoke.sh
  fi
}
run_check "production_url_smoke" check_smoke || true

# ---------- Summary ----------
echo ""
echo "=========================================="
echo "  Pre-Report Self-Audit summary"
echo "=========================================="
fail_total=0
i=0
while [ $i -lt ${#NAMES[@]} ]; do
  printf '  %-25s %s %s\n' "${NAMES[$i]}" "${RESULTS[$i]}" "${DETAILS[$i]}"
  if [ "${RESULTS[$i]}" = "FAIL" ]; then
    fail_total=$((fail_total + 1))
  fi
  i=$((i + 1))
done
echo "------------------------------------------"

if [ "$fail_total" -gt 0 ]; then
  echo "OVERALL: FAIL ($fail_total/${#NAMES[@]} checks failed)"
  echo ""
  echo "Per §5.3, your report MUST NOT claim '完成 / shipped'."
  echo "List every failed check in the '未做（明确边界）' section with"
  echo "root cause, not 'CDN cache' or 'will fix next sprint'."
  exit 1
fi

echo "OVERALL: PASS (${#NAMES[@]}/${#NAMES[@]} checks)"
echo "Report is allowed to claim '完成' for the scoped work block."
exit 0
