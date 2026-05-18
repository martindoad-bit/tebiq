# docs/ops

**Status:** directory guide / current consumption rules
**Last updated:** 2026-05-18

This directory contains both current operating documents and historical work
packets. Do not assume every file here is current.

## Read First

For current work, read in this order:

1. `../product/TEBIQ_CURRENT_STATE.md`
2. `../product/TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`
3. `../product/TEBIQ_CONTEXT_PACK.md`
4. `../product/TEBIQ_DECISION_LOG.md`
5. `TEBIQ_CANONICAL_WORKSPACE_MAP.md`

## Active / Current Families

| Family | Meaning |
|---|---|
| Answer Supremacy docs | Current product direction: beat DeepSeek 4 Pro with web search on consultation quality |
| `TEBIQ_CANONICAL_WORKSPACE_MAP.md` | Current map for what to read and what to treat as historical |
| `TEBIQ_ADMIN_FAIL_CLOSED_*` | Admin/internal access protection evidence |
| `TEBIQ_ROLES_V2.md` | Current cross-window role model |
| `TEBIQ_DELEGATION_PRINCIPLES.md` | Current delegation principles |
| `TEBIQ_DOCUMENT_MEMORY_CLEARING_2026-05-16.md` | Earlier docs-memory cleanup map; reference only if consistent with Current State |

## Historical / Use With Care

| Family | Default Status |
|---|---|
| `KNOWLEDGE_RUNTIME_LOOP*` | historical loop reports unless Current State reactivates a specific item |
| `TEBIQ_1_0_RC_*` | historical RC sprint/evaluation reports unless Current State reactivates a specific item |
| `docs/archive/stale-ops-2026-05/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` | historical roadmap superseded by Answer Supremacy direction |
| `TEBIQ_0_8_*` release docs | historical safety/release evidence unless Current State reactivates a specific file |
| `docs/archive/stale-ops-2026-05/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md` | stale workstream map; do not use as current plan |
| `WORKSTREAM_*` | historical work packets unless Current State reactivates them |
| `TRACK_*` | historical work packets unless Current State reactivates them |
| `QA_*_PACK*` | historical QA packets unless referenced by current release docs |
| `observations/` | evidence / context, not current plan |
| `handoffs/` | handoff history, not automatic source of truth |

## Conflict Rule

If an ops file conflicts with:

1. the user's latest instruction;
2. `origin/main` / production state;
3. `docs/product/TEBIQ_CURRENT_STATE.md`;
4. `docs/product/TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`;
5. `docs/product/TEBIQ_COPY_CANON.md`;

then the ops file loses unless a newer Decision Log explicitly says otherwise.
