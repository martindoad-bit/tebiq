# Knowledge Runtime Expansion Loop15 Report

Date: 2026-05-18
Branch: `codex/knowledge-runtime-loop15`
Scope: Route-gate source asset ledger integration

## Goal

Loop15 handled the hidden knowledge-assets behind the route gate layer. The product already uses many `sourceAssetIds` in `lib/consultation/route-gates.ts`, but the audit tool previously treated most of them as unresolved because it only recognized:

- runtime fact cards under `docs/fact-cards`
- standalone knowledge-atlas markdown files under `docs/knowledge-atlas/phase2/guardrails-p0p1`

It did not recognize the completed guardrail rows inside `docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md`.

This caused a false knowledge-ledger gap: route gates were already backed by FACT work, but the audit report still showed 50 unresolved source assets.

## Batch Size

Processed 49 guardrail source assets in this loop.

These assets are classified as `GUARDRAIL_ONLY` / `L5_ONLY` knowledge assets, not answer-runtime fact cards. They support route gates, must-say/must-not-say rules, deep-water routing, and auditability.

## Changes

Updated `scripts/qa/card-import-audit.ts` to treat completed rows in `FACT_PROGRESS.md` as resolved guardrail source assets.

Also calibrated two production answer-smoke assertions:

- `R22-overstay-departure-order`: avoid false failure when the answer says "not necessarily / not guaranteed" before the one-year reentry phrase.
- `R1-management-to-humanities`: accept ordinary Chinese wording for the current business-manager context, such as "经营者" or "公司", instead of requiring only the exact `经营管理/经管` string.

The audit now separates route-gate provenance into four buckets:

| Bucket | Meaning |
|---|---|
| `resolvedAsFactCard` | The source id is a runtime or quarantined fact card under `docs/fact-cards` |
| `resolvedAsKnowledgeAtlasFile` | The source id has a standalone knowledge-atlas markdown file |
| `resolvedAsGuardrailSourceAsset` | The source id is a completed guardrail row inside `FACT_PROGRESS.md` |
| `unresolved` | No recognized source asset exists yet |

## Results

Before Loop15:

| Metric | Count |
|---|---:|
| Route gate patterns | 56 |
| Unique `sourceAssetIds` | 61 |
| Resolved as fact cards | 9 |
| Resolved as knowledge-atlas files | 2 |
| Unresolved | 50 |

After Loop15:

| Metric | Count |
|---|---:|
| Route gate patterns | 56 |
| Unique `sourceAssetIds` | 61 |
| Resolved as fact cards | 9 |
| Resolved as knowledge-atlas files | 2 |
| Resolved as guardrail source assets | 49 |
| Unresolved | 1 |

Remaining unresolved source asset:

- `aql-rur-037-jfind-employment-bridge`

This is intentionally left unresolved for now because it appears to be an AQL/RUR regression asset, not a FACT guardrail row. It should either get its own guardrail-only source asset or be documented as an AQL-origin asset in a future loop.

## Bucket Decisions

| Bucket | Count | Notes |
|---|---:|---|
| `ANSWER_RUNTIME` | 0 | No answer-runtime cards were promoted in this loop |
| `MATERIALS_ONLY` | 0 | No material entity bindings changed |
| `GUARDRAIL_ONLY / L5_ONLY` | 49 | Completed FACT_PROGRESS guardrail rows now count as resolved route-gate provenance |
| `NEEDS_REWRITE` | 0 | No card content rewritten |
| `REJECT` | 0 | No card disabled |
| `UNKNOWN` | 1 | `aql-rur-037-jfind-employment-bridge` needs AQL/provenance decision |

## Validation

Commands run:

```bash
npm run qa:card-import-audit
npm run fact-layer:sync:dry
npm test
npm run lint
npx tsc --noEmit --pretty false
npm run qa:production-smoke
PRODUCTION_URL=https://tebiq.jp SMOKE_STREAM_TIMEOUT_MS=150000 npm run smoke:production-answer
```

Results:

| Check | Result |
|---|---|
| Card import audit | PASS: unresolved route-gate source assets reduced from 50 to 1 |
| Fact layer dry sync | PASS: scanned=269, upserted=0, errors=0 |
| Unit tests | PASS: 264/264 |
| Lint | PASS |
| TypeScript | PASS |
| Materials / route production smoke | PASS: 70/70 checked routes |
| Production answer smoke | PASS: 25/25 |

## Product Impact

This loop does not change front-end behavior or runtime answer injection. It improves the product knowledge ledger:

- route-gate sources are no longer falsely reported as missing
- guardrail FACT work is visible to future audit and handoff windows
- runtime fact-card counts remain honest
- safety gates remain separate from answer-runtime RAG cards

## Next Loop

Loop16 should handle the remaining provenance gap and then return to content expansion:

1. Decide how to represent `aql-rur-037-jfind-employment-bridge` as an AQL-origin source asset.
2. Continue expanding product-visible knowledge by processing the remaining `ai_extracted` cards or binding more verified cards into Materials/L5.
3. Keep the distinction between answer-runtime cards and guardrail-only assets explicit.
