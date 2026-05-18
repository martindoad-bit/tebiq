# TEBIQ Canonical Workspace Map

**Status:** active / first-stop map for new windows
**Owner:** Codex Production Lead
**Last updated:** 2026-05-18

This file exists because the repo contains many historical plans, loop reports,
and product experiments. New windows must not infer current strategy from file
volume.

## Read First

Read these files in order:

1. `docs/product/TEBIQ_CURRENT_STATE.md`
2. `docs/product/TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`
3. `docs/product/TEBIQ_CONTEXT_PACK.md`
4. `docs/product/TEBIQ_DECISION_LOG.md`
5. `docs/ops/TEBIQ_CANONICAL_WORKSPACE_MAP.md`

If another document conflicts with these files, it is historical unless a newer
Decision Log entry explicitly reactivates it.

## Current Product Target

The current target is **Answer Supremacy**:

- beat DeepSeek 4 Pro with web search on high-value residence consultation questions;
- keep the consultation surface as close to native AI chat as possible;
- improve credibility and accuracy through hidden source layers, not visible
  answer scaffolding;
- keep the Materials surface as the main visible product differentiator and
  reusable business asset.

Knowledge Runtime Expansion remains useful infrastructure, but it is not the
top-level product goal.

## Current Code / Data Assets

| Area | Current assets |
|---|---|
| Fact cards | `docs/fact-cards/*.md` |
| Fact sync | `scripts/fact-layer-sync.ts`, `scripts/fact-layer/` if present |
| Consultation runtime | `lib/consultation/`, `app/api/consultation/` |
| L5 / deep-water | `lib/l5/`, `lib/consultation/deep-water-handoff.ts` |
| Materials | `lib/materials/`, `lib/quick-reference/`, `app/materials/`, `app/quick-reference/` |
| Eval / QA | `docs/eval/`, `scripts/qa/`, `app/internal/eval-lab/` |
| Product canon | `docs/product/TEBIQ_CURRENT_STATE.md`, `docs/product/TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`, `docs/product/TEBIQ_CONTEXT_PACK.md`, `docs/product/TEBIQ_DECISION_LOG.md` |

## Historical / Reference Only By Default

| Family | Default status |
|---|---|
| `docs/ops/KNOWLEDGE_RUNTIME_LOOP*` | historical loop reports; useful evidence, not current strategy |
| `docs/ops/TEBIQ_1_0_RC_*` | RC incident / sprint history; useful evidence, not current strategy |
| `docs/archive/stale-ops-2026-05/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` | historical roadmap; superseded by Answer Supremacy direction |
| `docs/archive/stale-ops-2026-05/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md` | stale workstream map; do not use as current plan |
| `docs/ops/TEBIQ_0_8_*` | historical safety/release evidence unless Current State reactivates a specific file |
| `docs/ops/WORKSTREAM_*`, `docs/ops/TRACK_*`, `docs/ops/QA_*_PACK*` | historical work packets unless Current State reactivates them |

## Copy / UX Pollution Warnings

- `速查` is deprecated as user-facing navigation. Use `材料` / `材料清单`.
- The four fixed answer labels are legacy runtime constraints, not future Answer
  Experience canon.
- Do not expose internal terms such as `route_gate`, `guardrail`,
  `fallback_reason`, `ai_verified`, or `L5` to users.
- Do not add product shells merely because old docs show them. Ask whether the
  user consultation becomes better than DeepSeek 4 Pro with web search.

## Cleanup Rule

When a stale file is still useful as evidence, archive or mark it historical.
When it actively tells new windows to do the wrong thing, update the current
entry point that points to it first, then archive it if safe.
