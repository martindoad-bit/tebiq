---
fact_id: zairyu-shinsei-form-paper-online
title: 在留申請 — 全申請書はA4片面1枚印刷・外国語書類は翻訳必須
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "申請書印刷規格"
citation_summary: "在留申請書類は標準サイズA4用紙に片面1枚ずつ印刷が原則。外国語書類には日本語訳の添付が必須。日本発行証明書は発行から3か月以内。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "申請書 印刷"
  - "翻訳 添付"
does_not_cover:
  - "オンライン申請のフォーマット詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/instructor.html
    label: ISA — 教育（共通記述）
    accessed: "2026-05-17"
applies_to:
  - 全ての在留申請者
direct_fact_fields:
  - 印刷：A4片面1枚
  - 外国語書類：日本語訳添付必須
  - 日本発行証明書：発行から3か月以内
  - 翻訳者：通常本人可（翻訳者名・連絡先明記）
ai_inferred_fields:
  - オンライン申請は別フォーマット
  - 翻訳の公証は通常不要（実務）
needs_review_flags:
  - public_notary_translation_requirement_case
  - online_filing_format_specifics
  - foreign-language_specific_treatment
related_links:
  - title: "ISA — 教育"
    url: "https://www.moj.go.jp/isa/applications/status/instructor.html"
    organization: "出入国在留管理庁"
    display_label: "教育"
    locator: "申請書"
    relation: "official_reference"
evidence_points:
  - claim: "在留申請書類はA4片面1枚印刷、外国語書類は日本語訳添付必須、日本発行証明書は発行から3か月以内のもの。"
    source_title: "ISA — 教育"
    source_url: "https://www.moj.go.jp/isa/applications/status/instructor.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請書"
    display_label: "申請書印刷規格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

申請書：A4片面・翻訳必須・3か月有効。

## must_say

- A4片面1枚
- 翻訳必須
- 証明書3か月有効

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
