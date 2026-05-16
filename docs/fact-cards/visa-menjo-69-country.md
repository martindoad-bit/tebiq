---
fact_id: visa-menjo-69-country
title: 短期滞在 — ビザ免除国69カ国（韓国/台湾/香港等）
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "ビザ免除69国"
citation_summary: "日本は69カ国・地域とビザ免除取極あり。短期滞在目的での来日時はビザ取得不要。中国大陸は対象外（短期滞在ビザ必要）。"
source_display_names:
  - "外務省"
applies_when:
  - "ビザ 免除 国"
  - "韓国 ビザ"
does_not_cover:
  - "ビザが必要な国の取得手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mofa.go.jp/mofaj/toko/visa/tanki/himmune.html
    label: 外務省 — ビザ免除
    accessed: "2026-05-17"
applies_to:
  - 短期来日希望者
direct_fact_fields:
  - 免除国・地域：69（米国、英国、韓国、台湾、香港、シンガポール等）
  - 中国大陸：対象外
  - 期間：国により15/30/90日
  - 目的：観光、業務連絡、親族訪問等（就労不可）
ai_inferred_fields:
  - 中国大陸からは数次ビザ・観光ビザ等取得が必要
  - ロシア・ベラルーシは現在免除停止中
needs_review_flags:
  - 2026_specific_country_list_changes
  - russia_belarus_status_2026
  - apec_business_card_alternative
related_links:
  - title: "外務省 — ビザ免除"
    url: "https://www.mofa.go.jp/mofaj/toko/visa/tanki/himmune.html"
    organization: "外務省"
    display_label: "ビザ免除"
    locator: "69カ国"
    relation: "official_reference"
evidence_points:
  - claim: "日本は69カ国・地域とビザ免除取極あり。中国大陸は対象外。期間は国別15/30/90日、就労不可。"
    source_title: "外務省 — ビザ免除"
    source_url: "https://www.mofa.go.jp/mofaj/toko/visa/tanki/himmune.html"
    source_organization: "外務省"
    source_locator: "69カ国"
    display_label: "ビザ免除69国"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

ビザ免除69カ国・中国大陸は対象外。

## must_say

- 69カ国免除
- 中国大陸は対象外
- 就労不可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
