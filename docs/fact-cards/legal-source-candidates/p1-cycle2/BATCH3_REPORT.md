# P1 Cycle 2 Batch 3 Report — HSP / J-Skip Integration Boundaries

**Date**: 2026-05-13
**State**: all new cards remain `ai_extracted`
**Count**: 18 cards

## Added Cards

| # | fact_id | Purpose |
|---:|---|---|
| 1 | `guard-hsp-working-spouse-is-special-activity-not-dependent` | 高度専門職配偶者就労 — 家族滞在とは別の特定活動 |
| 2 | `guard-hsp-working-spouse-not-28hour-qoa` | 高度専門職配偶者就労 — 28時間の資格外活動とは別 |
| 3 | `guard-hsp-parent-is-special-activity-not-dependent-parent` | 高度専門職等の親 — 家族滞在の親ではない |
| 4 | `guard-hsp-domestic-servant-is-special-activity-not-family` | 高度専門職家事使用人 — 家族滞在や一般雇用ではない |
| 5 | `guard-hsp-family-benefits-require-main-hsp-jskip` | 高度専門職家族特例 — 主たる高度専門職等が前提 |
| 6 | `guard-hsp-jskip-family-benefits-not-automatic-package` | 高度専門職等の家族優遇 — 自動セットではない |
| 7 | `guard-jskip-vs-jfind-separate-programs` | J-Skip と J-Find — 別制度として分ける |
| 8 | `guard-jfind-family-not-hsp-family-benefit` | J-Find家族 — 高度専門職家族特例とは別 |
| 9 | `guard-hsp2-not-permanent-residence` | 高度専門職2号 — 永住許可とは別 |
| 10 | `guard-hsp2-activity-scope-not-pr-freedom` | 高度専門職2号の活動範囲 — 永住者の自由とは別 |
| 11 | `guard-hsp-pr-shortening-not-automatic-pr` | 高度人材永住短縮 — 自動永住ではない |
| 12 | `guard-jskip-manager-not-business-manager-3000man` | J-Skip経営管理型 — 経営管理3000万円要件と混同しない |
| 13 | `guard-business-manager-hsp1ha-criteria-link` | 経営管理と高度専門職1号ハ — 関連はあるが同一ではない |
| 14 | `guard-hsp1-institution-change-not-14day-only` | 高度専門職1号転職 — 14日届出だけで終わらせない |
| 15 | `guard-shozoku-notification-does-not-replace-status-change` | 所属機関届出 — 変更許可の代わりではない |
| 16 | `guard-online-jskip-jfind-input-caveat-specific` | J-Skip/J-Findオンライン — 専用入力注意を一般化しない |
| 17 | `guard-online-availability-not-substantive-eligibility` | オンライン申請 — 申請経路と許可要件を分ける |
| 18 | `guard-hsp-materials-not-approval-guarantee` | 高度専門職等の提出資料 — 許可保証ではない |

## Source Set

- ISA 高度専門職 / J-Skip working spouse page
- ISA 高度専門職 / J-Skip parent page
- ISA 高度専門職 / J-Skip domestic servant page
- ISA 特別高度人材制度（J-Skip） page
- ISA J-Find page
- ISA 家族滞在 page
- ISA 高度人材優遇措置 page
- ISA 永住許可ガイドライン
- ISA 経営管理改正 page
- ISA 所属機関等に関する届出 Q&A
- ISA J-Skip/J-Find online application page
- ISA general online application page

## Gate Notes

- All cards remain outside production injection.
- The batch is intentionally defensive: it catches answers that confuse special HSP/J-Skip routes with ordinary dependent stay, J-Find, permanent residence, business-manager criteria, organization notifications, or generic online application rules.
- No card decides approval probability, document sufficiency, family eligibility, job-change timing, or permanent-residence outcome.

## Fixture Coverage

- Positive coverage: 18 prompts, one per new card.
- Negative coverage: 16 prompts for ordinary dependent work and 28-hour work permission, 技人国 family stay, tourist parent visits, housekeeping-service questions, ordinary J-Find, ordinary business-manager capital questions, 技人国 job change and organization notification, generic online dependent and renewal application, ordinary PR years, PR card renewal, and HSP material download-only questions.
- Production gate coverage: every card stays `drop` because all are `ai_extracted` and injection blocks are empty.
