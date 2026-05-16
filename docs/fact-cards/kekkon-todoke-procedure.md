---
fact_id: kekkon-todoke-procedure
title: 婚姻届 — 国際結婚は婚姻要件具備証明書必要
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国際結婚婚姻届"
citation_summary: "日本人と外国人または外国人同士の婚姻届には、外国人配偶者の本国法での婚姻要件具備証明書（独身証明書）が必要。本国大使館で取得。"
source_display_names:
  - "法務省"
applies_when:
  - "国際結婚 手続"
  - "婚姻要件具備証明書"
does_not_cover:
  - "婚姻後の日本人配偶者ビザ申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局
    accessed: "2026-05-17"
applies_to:
  - 国際結婚をする外国人/日本人
direct_fact_fields:
  - 必要書類：婚姻届、戸籍謄本（日本人側）、外国人のパスポート、婚姻要件具備証明書（独身証明書）
  - 婚姻要件具備証明書：本国大使館発行
  - 国によっては取得不可の場合あり（代替書類）
  - 翻訳・公証必要
ai_inferred_fields:
  - 中国は独身公証書、その他国も国別書類
  - 同性婚は日本では不可（一部自治体パートナーシップ証明）
needs_review_flags:
  - country_specific_substitute_documents
  - same_sex_partnership_japan_status
  - translation_official_requirements
related_links:
  - title: "法務省 — 戸籍"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "戸籍"
    locator: "婚姻届"
    relation: "official_reference"
evidence_points:
  - claim: "国際結婚の婚姻届には外国人側の婚姻要件具備証明書（本国大使館発行）が必要。"
    source_title: "法務省"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "婚姻届"
    display_label: "国際結婚婚姻届"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

国際結婚は婚姻要件具備証明書必要。

## must_say

- 婚姻要件具備証明書（本国大使館）
- 翻訳・公証
- 国別取得方法異なる

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
