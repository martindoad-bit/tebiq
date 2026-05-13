# P1 Cycle 3 Batch 2 Report — 特定技能 Contract / Support Plan Boundaries

**Date**: 2026-05-13
**State**: all new cards remain `ai_extracted`
**Count**: 24 cards

## Added Cards

| # | fact_id | Purpose |
|---:|---|---|
| 1 | `ssw-contract-labor-law-compliance-source` | 特定技能雇用契約と労働法令適合 |
| 2 | `ssw-contract-field-work-scope-source` | 契約業務が特定技能分野に属する技能業務であること |
| 3 | `ssw-contract-working-hours-equal-source` | 所定労働時間が通常労働者と同等であること |
| 4 | `ssw-contract-remuneration-japanese-equal-source` | 報酬が日本人と同等以上であること |
| 5 | `ssw-contract-no-discriminatory-treatment-source` | 外国人であることを理由とする差別的待遇の防止 |
| 6 | `ssw-contract-temporary-return-paid-leave-source` | 一時帰国希望時の有給休暇 |
| 7 | `ssw-contract-dispatch-destination-period-source` | 派遣時の派遣先・派遣期間記載 |
| 8 | `ssw-contract-return-travel-support-source` | 契約終了後の帰国旅費を負担できない場合の措置 |
| 9 | `ssw-org-labor-social-tax-compliance-source` | 所属機関の労働・社会保険・租税法令遵守 |
| 10 | `ssw-org-no-recent-same-work-layoff-source` | 直近同種業務離職の確認 |
| 11 | `ssw-org-no-missing-foreigner-source` | 所属機関責任による行方不明者発生の確認 |
| 12 | `ssw-no-deposit-penalty-contract-source` | 保証金・違約金契約の確認 |
| 13 | `ssw1-support-cost-not-borne-by-foreigner-source` | 1号支援費用の本人負担禁止 |
| 14 | `ssw-dispatch-organization-criteria-source` | 派遣元・派遣先の追加確認 |
| 15 | `ssw-wage-payment-bank-verifiable-source` | 報酬支払方法の確認 |
| 16 | `ssw1-support-plan-ten-supports-source` | 1号支援計画の支援内容 |
| 17 | `ssw1-support-plan-language-copy-source` | 支援計画の理解可能言語・写し交付 |
| 18 | `ssw1-support-plan-registered-support-org-delegation-source` | 登録支援機関への全部委託時の記載 |
| 19 | `ssw1-support-plan-partial-delegation-scope-source` | 支援一部委託時の範囲明示 |
| 20 | `ssw1-support-neutral-regular-interview-source` | 中立的支援担当と定期面談体制 |
| 21 | `ssw-contract-health-life-status-monitoring-source` | 健康・生活状況を把握する措置 |
| 22 | `ssw-organization-activity-document-retention-source` | 活動内容文書の契約終了後1年以上保存 |
| 23 | `ssw-organization-workers-comp-insurance-source` | 労災保険関係の措置 |
| 24 | `ssw1-support-plan-key-support-understandable-language-source` | 重要支援を理解できる言語で実施すること |

## Source Set

- e-Gov: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
- ISA: 特定技能関係の申請・届出様式一覧
- ISA: 特定技能関係手続

## Gate Notes

- All cards remain outside production injection.
- The batch replaces old broad cards that mixed direct facts and inferred fields with smaller source-backed atoms.
- No card decides final approval, exact wage sufficiency, labor-law violation, dispatch availability by field, support-plan sufficiency, registered-support-organization eligibility, or individual document completeness.

## Fixture Coverage

- Positive coverage: 26 prompts, one per new card plus 2 high-risk natural-language variants.
- Negative coverage: ordinary labor consultation, generic tax/social-insurance questions, ordinary dependent/support questions, 技人国 dispatch, generic wage questions, J-Find/HSP/経営管理, and Batch1 period/family/status-mix questions.
- Production gate coverage: every card stays `drop` because all are `ai_extracted` and injection blocks are empty. The test checks full-card production predictions and official URL constraints for both declared sources and evidence URLs.
