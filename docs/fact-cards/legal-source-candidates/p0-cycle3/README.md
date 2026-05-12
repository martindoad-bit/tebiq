# Legal Source Candidates — P0 Cycle 3

**Date**: 2026-05-12
**Cycle**: P0 Cycle 3 — Residence Procedure Core
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE3_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE3_WORKPACK.md)

---

## Scope

Cycle 3 builds the procedure backbone for users already in Japan:

- 在留期間更新
- 在留資格変更
- 在留資格取得
- 資格外活動許可
- 所属機関等に関する届出
- 配偶者に関する届出
- 在留カード / 住居地 / 返納
- 再入国許可 / みなし再入国許可
- 申請中特例期間

This is not a materials-checklist cycle. Cards should describe official procedure scope, triggers, deadlines, permission boundaries, and routing.

---

## Batch Plan

| Batch | Scope | Target |
|---|---|---:|
| Batch 1 | 更新 / 変更 / 特例期間 | 15 cards — [`BATCH1_REPORT.md`](./BATCH1_REPORT.md) |
| Batch 2 | 取得 / 資格外活動 | 14 cards — [`BATCH2_REPORT.md`](./BATCH2_REPORT.md) |
| Batch 3 | 所属機関 / 配偶者届出 | 20 cards — [`BATCH3_REPORT.md`](./BATCH3_REPORT.md) |
| Batch 4 | 在留カード / 住所 / 返納 | 19 cards — [`BATCH4_REPORT.md`](./BATCH4_REPORT.md) |
| Batch 5 | 再入国 / みなし再入国 / procedure guardrails | 20 cards — [`BATCH5_REPORT.md`](./BATCH5_REPORT.md) |

All Cycle 3 cards start as `ai_extracted` with empty injection blocks.

---

## Blocking Safety Rules

- Do not imply that submitting an application equals permission.
- Do not imply that special period expands the permitted activity scope.
- Do not treat renewal and change as the same procedure.
- Do not infer late-filing consequences when the source is silent.
- Do not promote deadline-sensitive or permission-boundary cards without DOMAIN review.
