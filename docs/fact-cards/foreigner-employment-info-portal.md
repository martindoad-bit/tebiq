---
fact_id: foreigner-employment-info-portal
title: 外国人雇用サービスセンター — 求人マッチング・無料相談
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人雇用サービスセンター"
citation_summary: "東京・名古屋・大阪・福岡等の外国人雇用サービスセンターでは、留学生・外国人求職者向けに求人マッチング・キャリア相談・在留資格相談等を無料提供。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人 求職"
  - "ハローワーク 外国人"
does_not_cover:
  - "在留資格申請の具体手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html
    label: 厚労省 — 外国人雇用
    accessed: "2026-05-17"
applies_to:
  - 求職中の外国人・留学生
direct_fact_fields:
  - 設置：東京、名古屋、大阪、福岡等
  - 対象：留学生、外国人求職者
  - サービス：求人紹介、キャリア相談、在留資格相談、面接練習
  - 利用料：無料
  - 多言語対応
ai_inferred_fields:
  - オンライン相談も拡大中
needs_review_flags:
  - branch_complete_list_2026
  - online_consultation_specifics
  - foreign_employer_assist_specifics
related_links:
  - title: "厚労省 — 外国人雇用"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    organization: "厚生労働省"
    display_label: "外国人雇用"
    locator: "サービスセンター"
    relation: "official_reference"
evidence_points:
  - claim: "外国人雇用サービスセンターは東京・名古屋・大阪・福岡等に設置、留学生・外国人求職者向けに求人紹介・キャリア相談等を無料提供、多言語対応。"
    source_title: "厚労省 — 外国人雇用"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
    source_organization: "厚生労働省"
    source_locator: "サービスセンター"
    display_label: "外国人雇用サービスセンター"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

外国人雇用サービスセンター：求人マッチング・無料・多言語。

## must_say

- 東京・名古屋・大阪・福岡等
- 無料相談
- 多言語対応

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
