# P1 Cycle 2 Batch 2 Report — HSP / J-Skip Family, Procedure, Materials

**Date**: 2026-05-12
**State**: all new cards remain `ai_extracted`
**Count**: 20 cards

## Added Cards

| # | fact_id | Purpose |
|---:|---|---|
| 1 | `hsp-working-spouse-not-unconditional` | 高度専門職配偶者就労 — 無条件ではない |
| 2 | `hsp-working-spouse-ordinary-activity-scope` | 高度専門職配偶者就労 — 通常制度の活動範囲 |
| 3 | `jskip-working-spouse-expanded-activity-scope` | J-Skip配偶者就労 — 拡大された活動範囲 |
| 4 | `hsp-working-spouse-cohabitation-remuneration` | 高度専門職配偶者就労 — 同居と同等報酬 |
| 5 | `hsp-working-spouse-separation-risk` | 高度専門職配偶者就労 — 別居時の就労リスク |
| 6 | `hsp-working-spouse-evidence-structure` | 高度専門職配偶者就労 — 提出資料の構造 |
| 7 | `hsp-parent-purpose-router` | 高度専門職等の親 — 養育または妊娠支援が目的 |
| 8 | `hsp-parent-income-cohabitation-condition` | 高度専門職等の親 — 世帯年収と同居条件 |
| 9 | `hsp-parent-one-side-only-boundary` | 高度専門職等の親 — 両方の親を同時に扱わない境界 |
| 10 | `hsp-parent-change-update-3month-continuity` | 高度専門職等の親 — 変更・更新時の3か月継続予定 |
| 11 | `hsp-parent-evidence-boundary` | 高度専門職等の親 — 証明資料の構造 |
| 12 | `hsp-domestic-servant-type-router` | 高度専門職家事使用人 — 4つの型 |
| 13 | `hsp-domestic-servant-accompanying-type-boundary` | 高度専門職家事使用人 — 入国帯同型の変更制限 |
| 14 | `hsp-domestic-servant-accompanying-core-conditions` | 高度専門職家事使用人 — 入国帯同型の主要条件 |
| 15 | `hsp-domestic-servant-household-type-boundary` | 高度専門職家事使用人 — 家庭事情型の条件 |
| 16 | `hsp-domestic-servant-financial-type-boundary` | 高度専門職家事使用人 — 金融人材型の条件 |
| 17 | `jskip-domestic-servant-special-type-boundary` | J-Skip家事使用人 — 特別高度人材型の条件 |
| 18 | `jskip-recognition-from-existing-hsp1-procedure` | J-Skip認定 — 既存高度専門職1号からの手続 |
| 19 | `jskip-material-structure-activity-plus-special-evidence` | J-Skip材料 — 活動資料と疎明資料 |
| 20 | `jskip-online-foreign-national-paper-attachment` | J-Skipオンライン申請 — 本人利用時の紙申請添付 |

## Source Set

- ISA HSP/J-Skip working spouse page
- ISA HSP/J-Skip parent page
- ISA HSP/J-Skip domestic servant page
- ISA J-Skip resource page
- ISA J-Skip online application page

## Gate Notes

- All cards stay out of production injection.
- The batch deliberately separates spouse work, parent stay, domestic servant types, J-Skip recognition, materials, and online procedure.
- No card decides approval probability or document sufficiency.
