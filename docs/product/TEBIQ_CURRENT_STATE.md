# TEBIQ Current State

> Short-lived engineering snapshot. Codex Production Lead owns this file.  
> Long-term product principles live in `TEBIQ_CONTEXT_PACK.md`; decisions live in
> `TEBIQ_DECISION_LOG.md`. If this file conflicts with production smoke,
> `origin/main`, or `/api/build-info`, treat this file as stale and update it.

| Field | Value |
|---|---|
| `last_verified` | 2026-05-18 |
| `verified_by` | Codex Production Lead / AI Engineering Lead |
| `production_url` | https://tebiq.jp |
| `production_build_info_before_loop16_merge` | `gitSha=aab31bb55c6c6d52e6598b85899c8a006c4906e9`, `builtAt=2026-05-18T06:38:16.426Z`, `version=answer-core-v1.1-llm` |
| `active_branch_when_updated` | `codex/knowledge-runtime-loop16` |
| `current_focus` | Knowledge Runtime Expansion Goal: 400+ high-quality knowledge assets, answer product 85+, Materials Tab 85+ |

## Current Phase

TEBIQ is in **1.0 RC / Knowledge Runtime Expansion**, not yet a final 1.0
release.

The system has moved beyond 0.8 safety gates. Current work is about making the
knowledge layer thicker without letting unsafe or practice-heavy cards pollute
ordinary answer runtime.

## User-Facing Surfaces

| Surface | Route | Current status |
|---|---|---|
| 提问 | `/ai-consultation` | AI consultation with fixed 4-section answer format, fact-card injection, route gates, validators, and L5/deep-water handoff |
| 材料 | `/quick-reference`, `/materials` | Scenario checklists plus 15 reusable material entities; still needs deeper material binding and source refresh |
| 咨询记录 | `/me/consultations` | History surface with feedback / matter bridge |
| 我的事项 | `/me/matters` | L2 matter surface exists; closure and basic navigation were fixed in RC polish |
| 找书士 | `/scrivener` | Lead-gen entry exists; commercial metric loop is not yet mature |
| Eval Lab | `/internal/eval-lab` | Admin-only answer evaluation, feedback summary, and regression tooling |

## Knowledge Layer Waterline

As of Loop16 branch state:

| State | Count | Runtime meaning |
|---|---:|---|
| `human_reviewed` | 5 | Strong runtime injection |
| `ai_verified` | 218 | Runtime injection candidate |
| `ai_extracted` | 38 | Quarantine; not used in production answer runtime |
| `disabled` | 8 | Rejected / disabled |
| Total fact cards | 269 | Excludes guardrail-only FACT_PROGRESS rows as separate route-gate provenance |

Runtime-injectable fact cards: **223** (`human_reviewed` + `ai_verified`).

Important: 400+ target means **high-quality knowledge assets**, not "400
ordinary answer-injection cards." The count includes answer runtime facts,
materials-only assets, L5/guardrail assets, and rewritten narrow official facts.
Unsafe strategy cards must not be promoted just to increase the number.

## Recent Knowledge Runtime Loops

| Loop | Result |
|---|---|
| Loop13 | Bound high-risk spouse/overstay/landing/status-cancellation cards into L5 route gates instead of answer runtime |
| Loop14 | Promoted only one narrow runtime card (`tokutei-katsudou-17go`), disabled two unsafe cards, fixed nonpermission smoke |
| Loop15 | Resolved 49 guardrail-only route-gate source assets from `FACT_PROGRESS.md`; unresolved provenance reduced from 50 to 1 |
| Loop16 | Processed remaining 39 quarantine cards: 0 runtime promote, 4 materials-only, 15 L5-only, 18 rewrite, 1 reject, 1 unknown |

## Product Judgment

What is strong:

- P0/P1 safety gates and validators are much stronger than the original 0.8
  baseline.
- The answer chain can inject official-source fact cards and show reference
  materials.
- L5/deep-water routing now catches many dangerous "AI should not decide this"
  situations.
- Materials Universe has a real entity structure and is no longer only a loose
  quick-reference page.

What is still not 1.0:

- The product has 223 runtime-injectable fact cards, not 400+ high-quality total
  assets.
- Many cards still need rewrite into narrow official facts before promotion.
- Materials Tab is structurally improved, but not yet 85+ in depth; cross-links,
  source freshness, and more material entities are still needed.
- AQL/user feedback loops exist but are not yet a mature daily quality flywheel.
- Commercial metrics are still secondary and not part of the current Knowledge
  Runtime goal.

## Active Product Boundaries

### 提问

- Answer summaries must keep the product labels: `先看这里 / 当前判断 / 建议动作 / 暂缓事项`.
- Codex itself should not speak in those labels when reporting to the founder.
- TEBIQ does not judge immigration approval probability as a final authority.
- High-risk, under-specified, or practice-heavy questions must route to L5 /
  professional confirmation.

### 材料

- The tab should feel like a practical material universe, not a random copy
  patching surface.
- Material entities can explain what a document is, who issues it, where to get
  it, validity, reuse, and common mistakes.
- Material pages must not imply that having the documents guarantees permission.

### Knowledge Runtime

- `ai_verified` / `human_reviewed` are for answer runtime.
- `ai_extracted` is quarantine. It may support future rewrite, materials, or L5
  planning, but does not enter production answer injection.
- `needs_review` is visible as hint-only in the UI; do not use it casually for
  dangerous cards.
- L5-only cards should be expressed through route gates / handoff panels, not
  ordinary reference cards.

## Known Residual Risks

| Area | Status |
|---|---|
| `aql-rur-037-jfind-employment-bridge` provenance | Only unresolved route-gate source asset after Loop15; needs AQL-origin asset record |
| Materials depth | 15 entity base is online, but support-program/material-only candidates such as `koukou-mukyo-shogakukin` need proper product placement |
| Rewrite queue | 18 remaining quarantine cards need narrow official-source rewrites |
| L5 content depth | Existing L5 route gates catch risk, but many panels still need richer practical preparation content |
| Production latency | Long answers can still be slow; not part of current knowledge loop |
| Commercial metrics | Lead-gen exists, but analytics loop is not yet mature |

## Next Work

1. Finish Loop16 validation and merge if clean.
2. Start rewrite loops for the 18 `NEEDS_REWRITE` cards, creating narrow cards
   only when official-source support is strong.
3. Expand Materials Universe with document/material entities that users actually
   reuse across scenarios.
4. Add AQL-origin provenance for `aql-rur-037-jfind-employment-bridge`.
5. Continue production answer and materials regression after each loop.

