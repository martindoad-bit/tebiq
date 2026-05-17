#!/usr/bin/env bash
# production-url-smoke.sh
#
# Scans app/**/page.tsx for every Next.js route, then GETs each one against a
# target base URL (default https://tebiq.jp) and asserts HTTP 2xx/3xx. Dynamic
# routes ([param]) are skipped — they need a real sample id and we don't want
# to silently 404 here. Admin / internal routes are expected to 404 to outside
# traffic and are explicitly tagged as expected_404.
#
# Usage:
#   bash scripts/qa/production-url-smoke.sh
#   bash scripts/qa/production-url-smoke.sh --base-url=https://staging.tebiq.jp
#
# Exit:
#   0 = all checked URLs returned an acceptable code
#   1 = at least one unexpected non-2xx/3xx response (or operational failure)
#
# Notes:
#   - macOS bash 3.2 compatible (no associative arrays, no readarray)
#   - Never silently swallows 5xx / timeout — those are hard failures
#   - timeout per request: 15s
set -u

BASE_URL="https://tebiq.jp"
ALLOWLIST_FILE=""
for arg in "$@"; do
  case "$arg" in
    --base-url=*) BASE_URL="${arg#--base-url=}" ;;
    --allowlist=*) ALLOWLIST_FILE="${arg#--allowlist=}" ;;
    -h|--help)
      sed -n '1,35p' "$0"
      exit 0
      ;;
    *)
      echo "[production-url-smoke] unknown argument: $arg" >&2
      exit 2
      ;;
  esac
done

# Default allowlist lives next to this script. Routes listed here are known
# to 404 in production for a documented reason (not yet deployed, deprecated,
# etc). Format: one route per line, '#' for comments. PRs that add a NEW
# route still go through the normal pass/fail path — the allowlist only
# covers pre-existing gaps so the audit isn't held hostage by unrelated debt.
if [ -z "$ALLOWLIST_FILE" ]; then
  ALLOWLIST_FILE="$(cd "$(dirname "$0")" && pwd)/production-url-smoke.allowlist"
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT" || { echo "[production-url-smoke] cannot cd to repo root" >&2; exit 2; }

if [ ! -d app ]; then
  echo "[production-url-smoke] app/ directory not found at $REPO_ROOT" >&2
  exit 2
fi

# Collect every page.tsx, convert to a route path. Strip the leading "app",
# strip trailing "/page.tsx", and treat "" as "/".
PAGES_FILE="$(mktemp -t tebiq-pages.XXXXXX)"
ROUTES_FILE="$(mktemp -t tebiq-routes.XXXXXX)"
RESULTS_FILE="$(mktemp -t tebiq-results.XXXXXX)"

find app -type f -name "page.tsx" | sort > "$PAGES_FILE"

while IFS= read -r f; do
  # app/foo/bar/page.tsx -> /foo/bar
  route="${f#app}"
  route="${route%/page.tsx}"
  if [ -z "$route" ]; then route="/"; fi
  printf '%s\n' "$route" >> "$ROUTES_FILE"
done < "$PAGES_FILE"

total=0
checked=0
skipped_dynamic=0
expected_404_count=0
allowlisted_count=0
unexpected_404=0
hard_fail=0

# Build a temp file of allowlisted routes (one per line, no comments/whitespace).
ALLOWLIST_NORM="$(mktemp -t tebiq-allowlist.XXXXXX)"
trap 'rm -f "$PAGES_FILE" "$ROUTES_FILE" "$RESULTS_FILE" "$ALLOWLIST_NORM"' EXIT
if [ -f "$ALLOWLIST_FILE" ]; then
  # Strip comments and blank lines.
  grep -v '^[[:space:]]*#' "$ALLOWLIST_FILE" \
    | grep -v '^[[:space:]]*$' \
    | awk '{$1=$1};1' \
    > "$ALLOWLIST_NORM" || true
  echo "[production-url-smoke] allowlist: $ALLOWLIST_FILE ($(wc -l < "$ALLOWLIST_NORM" | tr -d ' ') entries)"
else
  echo "[production-url-smoke] allowlist: (none)"
fi

printf '%-50s %-10s %-12s %-10s\n' "ROUTE" "HTTP" "TIME(s)" "VERDICT"
printf '%-50s %-10s %-12s %-10s\n' "-----" "----" "-------" "-------"

while IFS= read -r route; do
  total=$((total + 1))

  # Skip dynamic routes — [param] segments need a real id.
  case "$route" in
    *"["*"]"*)
      skipped_dynamic=$((skipped_dynamic + 1))
      printf '%-50s %-10s %-12s %-10s\n' "$route" "-" "-" "skipped_dynamic"
      continue
      ;;
  esac

  # Admin / internal / dev routes are protected and expected to 404 publicly.
  expected_404=0
  case "$route" in
    /admin|/admin/*|/internal|/internal/*|/dev|/dev/*)
      expected_404=1
      ;;
  esac

  url="${BASE_URL}${route}"
  # -L follow redirects, -o /dev/null discard body, -w get code + time,
  # --max-time 15 hard cap. We capture into a single line "code time".
  resp="$(curl -sS -L -o /dev/null --max-time 15 \
    -w '%{http_code} %{time_total}' "$url" 2>&1)"
  curl_exit=$?

  if [ $curl_exit -ne 0 ]; then
    hard_fail=$((hard_fail + 1))
    printf '%-50s %-10s %-12s %-10s\n' "$route" "ERR" "-" "FAIL($curl_exit)"
    printf '%s\t%s\t%s\t%s\n' "$route" "ERR" "-" "FAIL" >> "$RESULTS_FILE"
    continue
  fi

  code="${resp%% *}"
  time_total="${resp##* }"
  checked=$((checked + 1))

  # Check allowlist (exact match). Allowlisted routes that DO 404 are
  # tagged 'allowlisted_404' and don't fail the build. Allowlisted routes
  # that succeed are tagged 'allowlist_stale' (still PASS) so the allowlist
  # gets pruned over time.
  allowlisted=0
  if [ -s "$ALLOWLIST_NORM" ] && grep -Fxq "$route" "$ALLOWLIST_NORM"; then
    allowlisted=1
  fi

  verdict="UNKNOWN"
  case "$code" in
    2*|3*)
      if [ "$allowlisted" -eq 1 ]; then
        verdict="allowlist_stale"
      else
        verdict="PASS"
      fi
      ;;
    404)
      if [ "$expected_404" -eq 1 ]; then
        verdict="expected_404"
        expected_404_count=$((expected_404_count + 1))
      elif [ "$allowlisted" -eq 1 ]; then
        verdict="allowlisted_404"
        allowlisted_count=$((allowlisted_count + 1))
      else
        verdict="FAIL"
        unexpected_404=$((unexpected_404 + 1))
      fi
      ;;
    *)
      verdict="FAIL"
      hard_fail=$((hard_fail + 1))
      ;;
  esac

  printf '%-50s %-10s %-12s %-10s\n' "$route" "$code" "$time_total" "$verdict"
  printf '%s\t%s\t%s\t%s\n' "$route" "$code" "$time_total" "$verdict" >> "$RESULTS_FILE"
done < "$ROUTES_FILE"

pass_count=$((checked - unexpected_404 - hard_fail))
# expected_404 counted inside `checked` but is a "pass" outcome. The above
# `pass_count` already excludes only the hard failures, so it's correct.

echo ""
echo "=== production-url-smoke summary ==="
echo "base_url:         $BASE_URL"
echo "total routes:     $total"
echo "skipped_dynamic:  $skipped_dynamic"
echo "checked:          $checked"
echo "passed:           $pass_count  (incl. expected_404=$expected_404_count, allowlisted_404=$allowlisted_count)"
echo "unexpected_404:   $unexpected_404"
echo "hard_fail:        $hard_fail"

if [ "$unexpected_404" -gt 0 ] || [ "$hard_fail" -gt 0 ]; then
  echo ""
  echo "FAIL — at least one URL returned an unexpected response."
  echo "Offending routes:"
  awk -F'\t' '$4=="FAIL"{print "  " $1 " -> " $2}' "$RESULTS_FILE"
  exit 1
fi

echo ""
echo "PASS — all checked routes returned 2xx/3xx (or expected_404 for protected surfaces)."
exit 0
