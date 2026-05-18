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
| `production_build_info_after_loop21_merge` | `gitSha=244db78e4d7d3b28b85ee06818a69e1091e2bcfb`, `builtAt=2026-05-18T12:02:32.259Z`, `version=answer-core-v1.1-llm` |
| `active_branch_when_updated` | `codex/cleanup-loop0` |
| `current_focus` | Answer Supremacy / Cleanup Loop 0: make TEBIQ consultation answers beat DeepSeek 4 Pro with web search, while removing stale docs and answer-UI pollution |

## Current Phase

TEBIQ is in **1.0 RC / Answer Supremacy Cleanup Loop 0**, not yet a final 1.0
release.

The product direction has shifted from broad card-count expansion to answer
experience superiority. Knowledge Runtime remains important infrastructure, but
it is no longer the top-level product goal. The current product question is:

> Does a user get a better consultation here than in DeepSeek 4 Pro with web
> search?

Cleanup Loop 0 exists because old docs were pulling new windows back toward
fixed answer shells, stale work plans, and UI decoration.

## User-Facing Surfaces

| Surface | Route | Current status |
|---|---|---|
| 提问 | `/ai-consultation` | Current implementation still has fixed-label answer output, fact-card injection, route gates, validators, and L5/deep-water handoff. Next target is a lighter native-AI-like answer experience that preserves model reasoning instead of wrapping it in heavy shells |
| 材料 | `/quick-reference`, `/materials` | Scenario checklists plus 15 reusable material entities; still needs deeper material binding and source refresh |
| 咨询记录 | `/me/consultations` | History surface with feedback / matter bridge |
| 我的事项 | `/me/matters` | L2 matter surface exists; closure and basic navigation were fixed in RC polish |
| 找书士 | `/scrivener` | Lead-gen entry exists; commercial metric loop is not yet mature |
| Eval Lab | `/internal/eval-lab` | Admin-only answer evaluation, feedback summary, and regression tooling |

## Knowledge Layer Waterline

As of Loop21 production sync:

| State | Count | Runtime meaning |
|---|---:|---|
| `human_reviewed` | 5 | Strong runtime injection |
| `ai_verified` | 238 | Runtime injection candidate |
| `ai_extracted` | 18 | Quarantine; now mostly L5/material/higher-risk route assets |
| `disabled` | 8 | Rejected / disabled |
| Total fact cards | 269 | Excludes guardrail-only FACT_PROGRESS rows as separate route-gate provenance |

Runtime-injectable fact cards: **243** (`human_reviewed` + `ai_verified`).

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
| Loop17 | Rewrote 16 of the 18 rewrite-queue cards into narrower assets: 4 answer-runtime promotions, 3 materials-only narrowed cards, 9 safer quarantine/L5 cards; 2 source-repair candidates deferred |
| Loop18 | Source-repaired `startup-visa-keiei-transition` into a narrow runtime card and moved `kazoku-yobi-naitei-haigusha` to L5-only; added 3 quick-reference material scenes (`永住者配偶者等`, `家族滞在変更`, `家族滞在COE`); DB sync and production smoke completed on `a6cc73f` |
| Loop19 | Processed the remaining 33 quarantine cards: 10 promoted to answer runtime, 3 kept as materials-only, 15 explicitly marked L5-only, 5 marked needs-rewrite; added `foreign-will-notary-materials`; production DB sync completed with 269/269 upserts, production URL smoke 70/70, and production answer smoke 25/25 |
| Loop20 | Rewrote the 5 Loop19 `NEEDS_REWRITE` cards into narrow official-source runtime facts; added `high-school-tuition-support-materials`; targeted production DB sync completed for 5/5 cards, DB and filesystem aligned at 269 cards, production URL smoke 70/70, new material path 200, and answer smoke 25/25 |
| Loop21 | Fixed the full `npm run fact-layer:sync` production write hang by closing the DB client after CLI sync and adding progress output; verified full 269/269 production sync, DB/filesystem alignment, production URL smoke 70/70, and production answer smoke 25/25 on deployed SHA `244db78` |

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

- The answer experience still loses to strong native AI products in fluency,
  density, and natural structure when the UI/prompt over-wraps the model.
- Official-law fact cards alone miss practical filing behavior. Practitioner
  source / practical-signal layers are required.
- The product has 243 runtime-injectable fact cards, but more cards are not the
  same as a better consultation.
- Materials Tab is structurally improved, but not yet 85+ in depth; cross-links,
  source freshness, and more material entities are still needed.
- AQL/user feedback loops exist but are not yet organized around direct
  comparison against DeepSeek 4 Pro with web search.

## Active Product Boundaries

### 提问

- Legacy runtime may still emit the labels `先看这里 / 当前判断 / 建议动作 / 暂缓事项`.
  These labels are **not** future Answer Experience canon.
- Future answer work should preserve the model's natural logic structure and
  remove product-manager shells when they make the consultation worse.
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
| Materials depth | 15 entity base is online and quick-reference topics are now 48; more source freshness and cross-linking are still needed |
| Rewrite/source-repair queue | `eijuu-jukyo-check-tax-shomeisho` remains the main source-repair candidate; Loop20 rewrote the other named Loop19 rewrite cards |
| L5 content depth | Existing L5 route gates catch risk, but many panels still need richer practical preparation content |
| Sync tooling | Fixed in Loop21: full production `npm run fact-layer:sync` completed 269/269 and exited normally |
| Production latency | Long answers can still be slow; not part of current knowledge loop |
| Commercial metrics | Lead-gen exists, but analytics loop is not yet mature |

## Next Work

1. Finish Cleanup Loop 0: archive stale loop/RC reports and keep current entry
   points aligned with `TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`.
2. Build the DeepSeek 4 Pro web-enabled comparison loop with 30-50 realistic
   high-value questions per round.
3. Rewrite Answer Experience toward a lighter native-AI chat surface and update
   terminal guards/tests deliberately.
4. Start a whitelist practitioner-source crawler / practical-card pipeline so
   real filing behavior can supplement official law cards.
5. Deepen materials cross-linking and source freshness toward Materials Tab 85+.
