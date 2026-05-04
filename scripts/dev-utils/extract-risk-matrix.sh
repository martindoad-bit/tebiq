#!/usr/bin/env bash
# Regenerate lib/eval-lab/risk-matrix-data.ts from the DOMAIN risk matrix
# markdown. Use after DOMAIN-CC updates docs/domain/DOMAIN_100Q_RISK_MATRIX.md.
#
# Usage:
#   bash scripts/dev-utils/extract-risk-matrix.sh
#
# The script parses table rows of shape `| <starter_tag> | <text> | <risk> | ...`
# where starter_tag matches /^[A-J][0-9]+$/ and risk ∈ {HIGH,MEDIUM,LOW}.
# Footnote rows that re-use the tag without a risk-level field are filtered out.

set -euo pipefail

SRC="docs/domain/DOMAIN_100Q_RISK_MATRIX.md"
DEST="lib/eval-lab/risk-matrix-data.ts"

if [[ ! -f "$SRC" ]]; then
  echo "error: $SRC not found" >&2
  exit 1
fi

awk -F'|' '
BEGIN {
  print "// Auto-extracted from docs/domain/DOMAIN_100Q_RISK_MATRIX.md (100 rows)."
  print "// Regenerate by running: scripts/dev-utils/extract-risk-matrix.sh"
  print ""
  print "export type RiskLevel = '\''HIGH'\'' | '\''MEDIUM'\'' | '\''LOW'\''"
  print "export type HandoffNeed = '\''yes'\'' | '\''conditional'\'' | '\''no'\'' | null"
  print ""
  print "export interface RiskMatrixEntry {"
  print "  risk_level: RiskLevel"
  print "  handoff: HandoffNeed"
  print "  /** Short domain label as written by DOMAIN-CC, e.g. \"経管\" or \"家族/身份変更\". */"
  print "  domain: string"
  print "}"
  print ""
  print "/** starter_tag → risk metadata. Entries match Eval Lab V1 seed pack (100 questions)."
  print " *  Source: DOMAIN-CC v0.1, draft / needs GM + 产品负责人 review. */"
  print "export const RISK_MATRIX: Record<string, RiskMatrixEntry> = {"
}
/^\| [A-J][0-9]+ \|/ {
  for (i=1;i<=NF;i++) { gsub(/^ +| +$/, "", $i) }
  if ($4 ~ /^(HIGH|MEDIUM|LOW)$/) {
    handoff = $9
    if (handoff != "yes" && handoff != "conditional" && handoff != "no") handoff = "null"
    else handoff = "'\''" handoff "'\''"
    gsub(/'\''/, "\\'\''", $5)
    printf "  '\''eval-lab-v1-%s'\'': { risk_level: '\''%s'\'', handoff: %s, domain: '\''%s'\'' },\n", $2, $4, handoff, $5
  }
}
END {
  print "}"
  print ""
  print "export function getRiskMatrixEntry(starterTag: string | null | undefined): RiskMatrixEntry | null {"
  print "  if (!starterTag) return null"
  print "  return RISK_MATRIX[starterTag] ?? null"
  print "}"
}
' "$SRC" > "$DEST"

echo "Wrote $DEST ($(grep -c "^  'eval-lab-v1-" "$DEST") entries)"
