---
fact_id: kika-documents-list
title: 帰化許可申請の必要書類リスト
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "帰化必要書類"
citation_summary: "帰化申請には帰化許可申請書、親族概要書、動機書、履歴書、生計説明書、事業概要書、住民票、国籍証明書類、親族関係証明書、納税証明書、収入証明書等が必要。"
source_display_names:
  - "法務省民事局"
applies_when:
  - "帰化 必要書類"
  - "帰化 何を準備"
does_not_cover:
  - "国別の国籍離脱手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局 — 帰化
    accessed: "2026-05-17"
applies_to:
  - 帰化申請者
direct_fact_fields:
  - 帰化許可申請書
  - 親族概要書
  - 動機書
  - 履歴書
  - 生計説明書
  - 事業概要書
  - 住民票
  - 国籍証明書類
  - 親族関係証明書
  - 納税証明書
  - 収入証明書
ai_inferred_fields:
  - 個別事情で追加書類要求あり（実務）
  - 本国書類は翻訳必須
needs_review_flags:
  - country_specific_documents_variation
  - translation_certification_requirements
  - jika_recent_changes_post_2024
related_links:
  - title: "法務省 — 帰化"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "帰化"
    locator: "必要書類"
    relation: "official_reference"
evidence_points:
  - claim: "帰化申請の主要書類：帰化許可申請書、親族概要書、動機書、履歴書、生計説明書、事業概要書、住民票、国籍証明書類、親族関係証明書、納税証明書、収入証明書。"
    source_title: "法務省 — 帰化"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "必要書類列挙"
    display_label: "帰化書類リスト"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

帰化書類は11種類前後。

## common_user_phrases

- 帰化 書類
- 帰化 動機書

## must_say

- 動機書・履歴書・生計説明書必須
- 本国書類は翻訳

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
