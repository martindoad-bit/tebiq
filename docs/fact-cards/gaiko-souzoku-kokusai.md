---
fact_id: gaiko-souzoku-kokusai
title: 外国人の相続 — 本国法準拠・日本国内財産は日本法併用
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人相続"
citation_summary: "国際相続では原則として被相続人の本国法が準拠法（法の適用に関する通則法第36条）。ただし日本国内の不動産は日本法が一部適用される。遺言で準拠法選択可。"
source_display_names:
  - "法務省"
applies_when:
  - "外国人 相続"
  - "在日 中国人 相続"
does_not_cover:
  - "相続税申告（10か月以内）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局
    accessed: "2026-05-17"
applies_to:
  - 在日外国人の死亡時の相続関係者
direct_fact_fields:
  - 準拠法：被相続人の本国法（通則法第36条）
  - 日本国内不動産：日本法も部分適用
  - 遺言で準拠法選択可
  - 中国・韓国等は本国法
ai_inferred_fields:
  - 中国は法定相続分が日本法と異なる
  - 公正証書遺言の作成が国際相続では実務的に有利
needs_review_flags:
  - jutsu-koku_specific_law_overview
  - kosei_shomeisho_yuugon_procedure
  - sozoku_zei_filing_timeline
related_links:
  - title: "法務省 — 民事"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "民事"
    locator: "相続"
    relation: "official_reference"
evidence_points:
  - claim: "国際相続では被相続人の本国法が準拠法（通則法第36条）。日本国内不動産は日本法も適用、遺言で準拠法選択可。"
    source_title: "法務省"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "通則法"
    display_label: "国際相続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

国際相続：本国法準拠、日本国内不動産は日本法併用。

## must_say

- 本国法準拠（通則法36条）
- 日本国内不動産は日本法も
- 遺言で準拠法選択可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
