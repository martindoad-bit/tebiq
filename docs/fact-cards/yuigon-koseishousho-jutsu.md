---
fact_id: yuigon-koseishousho-jutsu
title: 遺言公正証書 — 公証役場作成・国際相続で実務的に有利
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "遺言公正証書"
citation_summary: "公証役場で作成する遺言公正証書は、自筆証書遺言と異なり検認不要で執行が容易。外国人居住者の国際相続では実務的に有利。"
source_display_names:
  - "法務省"
applies_when:
  - "外国人 遺言"
  - "日本財産 遺言"
does_not_cover:
  - "本国での遺言の効力（国別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局
    accessed: "2026-05-17"
applies_to:
  - 日本に財産を持つ外国人
direct_fact_fields:
  - 作成場所：公証役場
  - 必要：本人＋証人2名
  - 検認不要（自筆証書と差異）
  - 通訳同伴可
  - 手数料：相続財産価額により段階制
ai_inferred_fields:
  - 自筆証書遺言保管制度（法務局）でも検認不要に
  - 多言語対応の公証役場あり
needs_review_flags:
  - hokan_seido_jisitsu_2026
  - tugoku_yuigon_validity
  - tsuyaku_specific_requirements
related_links:
  - title: "法務省 — 公証役場"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "公証"
    locator: "遺言"
    relation: "official_reference"
evidence_points:
  - claim: "遺言公正証書は公証役場で作成、検認不要で執行容易。証人2名必要、通訳同伴可。"
    source_title: "法務省"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "公正証書遺言"
    display_label: "公正証書遺言"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

公正証書遺言：公証役場作成・検認不要・通訳可。

## must_say

- 公証役場で作成
- 証人2名必要
- 検認不要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
