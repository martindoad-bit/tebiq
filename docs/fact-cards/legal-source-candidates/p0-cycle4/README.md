# Legal Source Candidates — P0 Cycle 4

**Date**: 2026-05-12
**Cycle**: P0 Cycle 4 — Permanent Residence and Cancellation Anchors
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE4_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE4_WORKPACK.md)

---

## Scope

Cycle 4 builds the high-risk status-stability layer:

- 永住許可
- 永住許可ガイドライン
- 税 / 年金 / 公的医療保険 obligations as permanent-residence evaluation signals
- 在留資格取消
- spouse-status / job-loss / business-closure status-basis risks
- permanent-residence vs card-renewal disambiguation
- deep-water routing where official sources are silent

This is not a permanent-residence approval predictor and not a materials-checklist clone.

---

## Batch Plan

| Batch | Scope | Target |
|---|---|---:|
| Batch 1 | 永住 legal/guideline anchors + cancellation system entry | 20 cards — [`BATCH1_REPORT.md`](./BATCH1_REPORT.md) |
| Batch 2 | 税 / 年金 / 公的医療保険 / materials boundary | 14 cards — [`BATCH2_REPORT.md`](./BATCH2_REPORT.md) |
| Batch 3 | cancellation triggers and status-stability risk signals | 20 cards — [`BATCH3_REPORT.md`](./BATCH3_REPORT.md) |
| Batch 4 | PR card distinction, exception burn-down, source gaps | 13 cards — [`BATCH4_REPORT.md`](./BATCH4_REPORT.md) |
| Batch 5 | integration, duplicate merge, promotion queue | 8-12 cards plus rewrites |

All Cycle 4 cards start as `ai_extracted` with empty injection blocks.

---

## Blocking Safety Rules

- Do not imply permanent residence approval from complete documents.
- Do not decide 年金免除・猶予 handling without official source or DOMAIN review.
- Do not imply divorce, job loss, or business closure automatically cancels status.
- Do not mix 在留資格取消, 更新不許可, 変更不許可, and 永住不許可.
- Do not call 永住許可申請 “永住更新”.
- Do not expose internal source-layer or QA labels to user-visible output.
