---
fact_id: ikuji-kyugyo-shotoku-67
title: 育児休業給付 — 6か月までは67%・以降50%
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "育休給付"
citation_summary: "雇用保険被保険者で育児休業を取得した者に給付される。育休開始180日まで休業前賃金の67%、以降50%。最長子が2歳まで。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "育休 給付金"
  - "育児休業 67%"
does_not_cover:
  - "出産手当金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/
    label: 厚労省 — 育児休業
    accessed: "2026-05-17"
applies_to:
  - 雇用保険被保険者で育休取得者
direct_fact_fields:
  - 給付率：開始180日まで67%、以降50%
  - 給付期間：原則子1歳まで（最長2歳まで延長可）
  - 申請：ハローワーク/会社経由
  - 男性育休もパパ・ママ育休プラスで取得可
  - 外国人も対象（雇用保険加入なら）
ai_inferred_fields:
  - 2025年4月から「出生時育児休業給付金」追加で実質80%
needs_review_flags:
  - 2025_post_birth_specifics
  - kourou_shorui_for_renewal_zairyu
  - kosen_haigusha_kyugyou_no_shori
related_links:
  - title: "厚労省 — 育児休業"
    url: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/"
    organization: "厚生労働省"
    display_label: "育児休業"
    locator: "67%"
    relation: "official_reference"
evidence_points:
  - claim: "育児休業給付は開始180日まで67%、以降50%。子1歳まで（最長2歳）。雇用保険加入の外国人も対象。"
    source_title: "厚労省 — 育児休業"
    source_url: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/"
    source_organization: "厚生労働省"
    source_locator: "67%・50%"
    display_label: "育休給付"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

育休給付：180日まで67%・以降50%・子1歳（最長2歳）。

## must_say

- 180日まで67%
- 子1歳（最長2歳）
- 外国人も対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
