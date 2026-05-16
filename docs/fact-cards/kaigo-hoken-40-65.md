---
fact_id: kaigo-hoken-40-65
title: 介護保険 — 40歳から保険料・第2号被保険者
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "介護保険40歳"
citation_summary: "40〜64歳は第2号被保険者として介護保険料を健保と合わせて納付。65歳以上は第1号被保険者として独立して保険料納付。外国人も住民登録あれば対象。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "介護保険 何歳"
  - "外国人 介護保険"
does_not_cover:
  - "介護給付の利用手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html
    label: 厚労省 — 介護保険
    accessed: "2026-05-17"
applies_to:
  - 40歳以上の中長期在留者
direct_fact_fields:
  - 第2号被保険者：40-64歳（健保料と一緒に納付）
  - 第1号被保険者：65歳以上（独立納付）
  - 外国人住民票あれば対象
  - 給付：要介護認定後にサービス利用
ai_inferred_fields:
  - 40歳到達月から保険料徴収
needs_review_flags:
  - foreign_short_term_visitor_exclusion
  - tokutei_shippei_2go_kyufu
  - hokenryou_amount_2026_municipality
related_links:
  - title: "厚労省 — 介護保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    organization: "厚生労働省"
    display_label: "介護保険"
    locator: "40歳・第2号"
    relation: "official_reference"
evidence_points:
  - claim: "40-64歳は第2号被保険者として介護保険料を健保料と一緒に納付。65歳以上は第1号被保険者。外国人住民票あれば対象。"
    source_title: "厚労省 — 介護保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    source_organization: "厚生労働省"
    source_locator: "第1号・第2号"
    display_label: "介護保険40歳"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

40歳から介護保険・外国人住民票あれば対象。

## must_say

- 40歳から第2号被保険者
- 65歳から第1号
- 外国人も住民票あれば対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
