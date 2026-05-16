# TEBIQ Document Memory Clearing — 2026-05-16

Owner: Codex Production Lead / AI Engineering Lead
Status: completed documentation clearing pass
Scope: memory / copy / UI-spec / product-state documents + narrow user-facing label cleanup

## Purpose

This pass addresses repeated "memory drift" after many windows and product
turns. The goal was not to change runtime behavior, fact cards, or answer
generation. The goal was to make the repo's document system answer:

1. What is current truth?
2. What is historical?
3. Which copy is frozen?
4. Which naming should not drift again?
5. Which missing or contradictory docs remain as explicit debt?

## Files Reviewed

Core entry points:

- `README.md`
- `CLAUDE.md`
- `AGENTS.md`
- `PROJECT_MEMORY.md`
- `docs/product/TEBIQ_CURRENT_STATE.md`
- `docs/product/TEBIQ_CONTEXT_PACK.md`
- `docs/product/TEBIQ_DECISION_LOG.md`
- `docs/product/TEBIQ_ARTIFACT_REGISTRY.md`

Copy / voice / UI:

- `docs/product/TEBIQ_COPY_SOURCE.md`
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`
- `docs/product/TEBIQ_QA_GATES.md`
- `docs/product/TEBIQ_QUICK_REFERENCE_SPEC.md`
- `docs/product-copy/APP_COPY_FINAL_V2.md`
- `docs/product-copy/ANSWER_APP_COPY_V2.md`
- `docs/product-copy/HOMEPAGE_APP_COPY_V2.md`
- `docs/product-copy/PRODUCT_COPY_BIBLE.md`
- `docs/voice/README.md`
- `docs/ui/README.md`
- `docs/ui/TEBIQ_1_0_UI_HANDOFF.md`
- `docs/ui/TEBIQ_1_0_UI_QA_CHECKLIST.md`

Ops / release / roles:

- `docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md`
- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
- `docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
- `docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
- `docs/ops/TEBIQ_0_8_POST_RELEASE_CONVERGENCE_REPORT.md`
- `docs/ops/TEBIQ_ROLES_V2.md`
- `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md`
- `docs/roles/TEBIQ_*_ROLE.md`
- `docs/ops/README.md`

Targeted searches:

- `速查`
- `Quick Reference`
- `最紧的两件`
- `先看这里`
- `当前判断`
- `建议动作`
- `暂缓事项`
- `DeepSeek`
- internal copy leak patterns

## Main Contradictions Found

| Area | Conflict | Resolution |
|---|---|---|
| Product identity | Old `PROJECT_MEMORY.md` described TEBIQ as a generic in-Japan life tool and said first version does not do AI conversation. Current product is a residence-risk consultation system and 0.8 shipped AI consultation. | Replaced `PROJECT_MEMORY.md` with a current memory router and archived old snapshot under `docs/archive/memory/`. |
| Repo entry | `README.md` told agents to read stale `PROJECT_MEMORY.md` as the primary brief. | Updated README to point to `CLAUDE.md`, `AGENTS.md`, current memory, current state, and context pack. |
| Answer labels | Product-copy "final" docs froze `最紧的两件 / 步骤 / 要带什么 / 复制给客户`, while current runtime and 0.8 docs require `先看这里 / 当前判断 / 建议动作 / 暂缓事项`. | Added `TEBIQ_COPY_CANON.md`; marked old product-copy docs as historical; updated copy source to treat only canon-listed items as frozen. |
| Materials naming | Docs alternated between `速查`, `Quick Reference`, `材料 / 速查`, and Materials Tab. | Current user-facing canon is `材料` / `材料清单`. `Quick Reference` remains internal/historical route/spec naming. `速查` is deprecated for user-facing navigation. |
| Voice source of truth | `docs/voice/README.md` claimed `docs/voice/` was the single copy source, while current copy source and current state live under `docs/product/`. | Updated voice README: voice files are draft/preview-only unless promoted through current copy canon. |
| UI copy routing | `docs/ui/README.md` sent user-visible copy to `docs/voice/`, which is no longer current production truth. | Updated UI README to point to `TEBIQ_COPY_CANON.md` and `TEBIQ_COPY_SOURCE.md`. |
| Missing Materials UI plan | `TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md` listed `docs/ui/TEBIQ_0_8_MATERIALS_TAB_PRODUCT_UI_PLAN.md` as completed, but file was absent. | Restored the file as an active product UI plan and registered it in the artifact registry. |
| Old UI/voice docs | 1.0 Alpha and voice docs are useful but preview-only; later windows could misread them as current. | Left in place, but current entry docs now demote them through canon and README language. |
| Knowledge expansion | Context Pack warned against "大规模知识库扩写", while 0.8 work now includes source-traceable legal-source and materials production. | Clarified that the ban targets blind/unreviewed expansion, not FACT/DOMAIN-reviewed source-traceable production. |
| Business-manager facts | Prior FACT/DOMAIN work mixed old 500万円 shorthand with 2025 reform requirements. | No fact deletion in this pass; current memory now flags `経営・管理` reform as high-risk and requires source/DOCUMENT/DOMAIN review before runtime promotion. |

## Actions Completed

### Entry / Memory

- Replaced `PROJECT_MEMORY.md` with a current memory router.
- Updated `README.md` to stop anchoring the repo on old product memory.
- Confirmed active product truth points to `TEBIQ_CURRENT_STATE.md`, release docs, context pack, and decision log.
- Clarified `TEBIQ_CONTEXT_PACK.md` so source-traceable FACT / legal-source / Materials production is allowed, while blind unreviewed knowledge expansion remains blocked.

### Copy

- Added `docs/product/TEBIQ_COPY_CANON.md`.
- Updated `docs/product/TEBIQ_COPY_SOURCE.md` so the current canon is the frozen exception to the otherwise eval-driven copy process.
- Added `docs/product-copy/README.md`.
- Added historical/superseded notices to:
  - `docs/product-copy/APP_COPY_FINAL_V2.md`
  - `docs/product-copy/ANSWER_APP_COPY_V2.md`
  - `docs/product-copy/HOMEPAGE_APP_COPY_V2.md`
  - `docs/product-copy/PRODUCT_COPY_BIBLE.md`

### Materials / Quick Reference Naming

- Updated `docs/product/TEBIQ_CURRENT_STATE.md` from `材料 / 速查 Tab` to `材料 Tab`.
- Updated `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md` to deprecate `速查` as user-facing label.
- Updated `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md` from Quick Reference rules to Materials Tab rules.
- Updated `docs/product/TEBIQ_QUICK_REFERENCE_SPEC.md` title and language to clarify internal/historical naming.
- Updated `docs/product/TEBIQ_ARTIFACT_REGISTRY.md` to register `TEBIQ_COPY_CANON.md` and the renamed Materials spec.

### Voice / UI Directory Boundaries

- Updated `docs/voice/README.md` so it no longer claims to be production copy truth.
- Updated `docs/ui/README.md` so UI docs route copy decisions through current product copy canon.

### Missing Asset Accounting

- Restored `docs/ui/TEBIQ_0_8_MATERIALS_TAB_PRODUCT_UI_PLAN.md` and updated `docs/ops/TEBIQ_0_8_TRUSTED_CONSULTATION_PRODUCT_PLAN.md`.

### Runtime Label Cleanup

- Renamed user-facing `速查` labels in the app shell and `/quick-reference` metadata to `材料`.
- Renamed user-facing `我的咨询` navigation language to `咨询记录`, matching `TEBIQ_COPY_CANON.md`.

## Confirmed Not Done

This cleanup intentionally did **not**:

- delete fact cards;
- delete Knowledge Atlas / legal-source cards;
- modify runtime answer generation;
- run production smoke or deploy;
- decide any legal / immigration professional conclusion.

## Verification

Completed after the cleanup branch changes:

- `npm run lint`: PASS
- `npx tsc --noEmit --pretty false`: PASS
- `npm test`: PASS, 195 tests
- `npm run audit:user-facing-copy`: PASS, scanned 151 files
- `npm run qa:release-slice -- --all-changed`: PASS, 42 files checked
- local dev smoke for `/quick-reference`: HTTP 200 and rendered `材料` / `咨询记录`, no rendered `速查`

## Remaining Explicit Debt

| Debt | Why It Remains | Recommended Next Step |
|---|---|---|
| Runtime code had contained `速查` in `/quick-reference` page and nav labels | Addressed after this report in the same cleanup branch by renaming user-facing labels to `材料`. | Run mobile QA before release. |
| `docs/ui/TEBIQ_0_8_MATERIALS_TAB_PRODUCT_UI_PLAN.md` was missing | Restored after this report in the same cleanup branch. | Keep it aligned with Materials implementation changes. |
| Many `docs/ops/WORKSTREAM_*` files are historical | Added `docs/ops/README.md` after this report so workstream packets are reference-only unless Current State reactivates them. | Later physical archive pass can reduce noise after reference audit. |
| `docs/roles/TEBIQ_AQL_ROLE.md` had been a placeholder | Replaced after this report in the same cleanup branch. | Keep it aligned with newer AQL window protocols. |
| `docs/product/TEBIQ_ARTIFACT_REGISTRY.md` still contains many older 2026-05-05 assets | Added a consumption rule after this report so old rows are reference-only unless marked active/canonical/current. | A later full row-by-row taxonomy pass can still reduce noise. |
| Product-copy old files still contain old content after the banner | Kept for audit and style history. | Do not consume unless promoted into `TEBIQ_COPY_CANON.md`. |

## New Canonical Priority After Clearing

When a future window sees a conflict, use this priority:

1. User / founder latest explicit instruction.
2. Remote production and open PR state.
3. `docs/product/TEBIQ_CURRENT_STATE.md`.
4. `docs/product/TEBIQ_CONTEXT_PACK.md`.
5. `docs/product/TEBIQ_DECISION_LOG.md`.
6. `docs/product/TEBIQ_COPY_CANON.md` for frozen user-facing labels.
7. `docs/product/TEBIQ_COPY_SOURCE.md` for copy workflow and bans.
8. Historical product-copy / voice / UI docs only as reference.

## Bottom Line

The main memory leak was not lack of documentation. It was too many documents
claiming to be final at different product moments.

After this pass:

- current product state has one entry;
- frozen user-facing copy has one registry;
- old "final" copy has been demoted;
- `速查` is no longer canonical user-facing language in docs or app-shell labels;
- the missing Materials UI plan is visible debt instead of hidden drift.
