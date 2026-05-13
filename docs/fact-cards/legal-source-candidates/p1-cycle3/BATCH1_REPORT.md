# P1 Cycle 3 Batch 1 Report — 特定技能 Core Boundaries

**Date**: 2026-05-13
**State**: all new cards remain `ai_extracted`
**Count**: 18 cards

## Added Cards

| # | fact_id | Purpose |
|---:|---|---|
| 1 | `ssw1-ssw2-status-skill-period-boundary` | 1号と2号の技能水準・在留期間の違い |
| 2 | `ssw1-total-period-five-year-source` | 1号の通算5年入口 |
| 3 | `ssw2-no-total-period-limit-source` | 2号には通算在留期間の上限がないこと |
| 4 | `ssw1-total-period-counts-nonwork-reentry-source` | 1号の非就労期間・再入国出国期間の通算算入 |
| 5 | `ssw1-total-period-exception-periods-source` | 1号通算期間の例外期間 |
| 6 | `ssw1-prep-activity-counts-to-five-year-source` | 1号移行準備特定活動の通算算入 |
| 7 | `ssw-field-work-scope-annex-required-source` | 分野別要領で業務範囲を確認する境界 |
| 8 | `ssw-material-table-field-structure-source` | 提出書類が申請人・所属機関・分野で分かれる構造 |
| 9 | `ssw1-family-stay-not-sponsor-source` | 1号と家族滞在扶養者欄の境界 |
| 10 | `ssw2-family-stay-sponsor-dependent-scope-source` | 2号と家族滞在配偶者・子の範囲 |
| 11 | `ssw-skill-japanese-not-only-requirements-source` | 試験合格だけで全体要件を判断しない |
| 12 | `ssw-change-application-activity-change-prompt-source` | ほかの資格から特定技能活動へ変える場合の変更申請 |
| 13 | `ssw-organization-change-requires-status-change-source` | 所属機関変更時の変更許可申請 |
| 14 | `ssw-vs-technical-intern-training-status-boundary-source` | 技能実習との防混同 |
| 15 | `ssw-vs-skilled-labor-status-boundary-source` | 技能との防混同 |
| 16 | `ssw-vs-gijinkoku-work-scope-boundary-source` | 技人国との業務範囲防混同 |
| 17 | `ssw-vs-qoa-part-time-boundary-source` | 資格外活動アルバイト許可との防混同 |
| 18 | `ssw2-field-availability-not-all-ssw1-fields-source` | 2号分野を1号分野と同一視しない |

## Source Set

- ISA 在留資格「特定技能」
- ISA 通算在留期間
- ISA 特定技能関係の特定活動（「特定技能1号」への移行を希望する場合）
- ISA 在留資格一覧表
- ISA 在留資格「技術・人文知識・国際業務」
- ISA 特定技能制度運用要領 page

## Gate Notes

- All cards remain outside production injection.
- The batch builds the cycle spine: first identify 1号/2号, total-period context, family-stay boundary, field/work-scope source, procedure stage, and common status-mix risks.
- No card decides approval probability, field-specific final eligibility, job-change timing, family-stay approval, or exact total-period calculation.

## Fixture Coverage

- Positive coverage: 24 prompts, one per new card plus 6 natural-language variants.
- Negative coverage: 16 prompts for ordinary dependent, ordinary 技人国, 技能実習-only, 技能-only, generic renewal fee, HSP/J-Skip, J-Find, 経営管理, generic online, and field-only questions without 特定技能 context.
- Production gate coverage: every card stays `drop` because all are `ai_extracted` and injection blocks are empty. The Batch 1 test also checks full-card production predictions and official URL constraints for both declared sources and evidence URLs.
