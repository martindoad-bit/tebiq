# docs/ops

**Status:** directory guide / current consumption rules
**Last updated:** 2026-05-16

This directory contains both current operating documents and historical work
packets. Do not assume every file here is current.

## Read First

For current work, read in this order:

1. `../product/TEBIQ_CURRENT_STATE.md`
2. `TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`
3. `TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
4. `TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
5. `TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
6. `TEBIQ_0_8_POST_RELEASE_CONVERGENCE_REPORT.md`
7. `TEBIQ_DOCUMENT_MEMORY_CLEARING_2026-05-16.md`
8. `TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md` only as a workstream map

## Active / Current Families

| Family | Meaning |
|---|---|
| `TEBIQ_0_8_*` release docs | Current 0.8 release / safety-gate evidence unless superseded by Current State |
| `TEBIQ_ADMIN_FAIL_CLOSED_*` | Admin/internal access protection evidence |
| `TEBIQ_ROLES_V2.md` | Current cross-window role model |
| `TEBIQ_DELEGATION_PRINCIPLES.md` | Current delegation principles |
| `TEBIQ_DOCUMENT_MEMORY_CLEARING_2026-05-16.md` | Current docs-memory cleanup map |
| `TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` | Current 0.8.5 -> 1.0 six-program execution plan |

## Historical / Use With Care

| Family | Default Status |
|---|---|
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
4. `docs/product/TEBIQ_COPY_CANON.md`;

then the ops file loses unless a newer Decision Log explicitly says otherwise.
