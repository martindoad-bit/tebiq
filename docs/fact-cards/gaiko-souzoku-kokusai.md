---
fact_id: gaiko-souzoku-kokusai
title: 外国人の相続 — 本国法準拠・日本国内財産は日本法併用
state: disabled
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
  - url: https://laws.e-gov.go.jp/law/418AC0000000078
    label: e-Gov — 法の適用に関する通則法
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

このカードは Loop11 で disabled。国際相続は、準拠法、国籍、住所、財産所在地、遺言の有無などにより判断が複雑で、旧カードの「日本国内不動産は日本法併用」「遺言で準拠法選択可」は過度に単純化されていた。

## must_say

- 国際相続は専門家確認が必要
- 日本に住んでいる／日本に財産があるだけで準拠法を断定しない
- このカードは普通回答 runtime に使わない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | Codex Loop11 | FACT review で source mismatch と危険な過度単純化を確認。runtime/material から除外するため disabled。 | ai_extracted | disabled | loop11-reject |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
