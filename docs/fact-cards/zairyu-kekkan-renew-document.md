---
fact_id: zairyu-kekkan-renew-document
title: 在留更新書類 — 共通必須書類リスト（カテゴリー別）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留更新書類"
citation_summary: "在留期間更新申請の共通必須書類は申請書、写真、パスポート、在留カード、住民税課税・納税証明書。在留資格別に職務関係書類等が追加される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留更新 書類"
  - "更新 何を持っていく"
does_not_cover:
  - "資格別の個別書類詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    label: ISA — 在留期間更新
    accessed: "2026-05-17"
applies_to:
  - 在留期間更新申請者
direct_fact_fields:
  - 共通：申請書、写真、パスポート、在留カード
  - 住民税：課税・納税証明書（直近年度）
  - 在留資格別：在職証明、給与明細、所得証明等
  - カテゴリー1-2は書類簡略
  - 証明書は3か月以内発行
ai_inferred_fields:
  - 配偶者ビザは婚姻実体を示す資料も補強
needs_review_flags:
  - haigusha_marriage_evidence_specifics
  - kateegori_3-4_complete_documents
  - online_filing_document_format_specifics
related_links:
  - title: "ISA — 在留期間更新"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    organization: "出入国在留管理庁"
    display_label: "在留期間更新"
    locator: "書類"
    relation: "official_reference"
evidence_points:
  - claim: "在留期間更新の共通書類は申請書、写真、パスポート、在留カード、住民税課税・納税証明書。資格別の職務関係書類等が追加。"
    source_title: "ISA — 在留期間更新"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "書類"
    display_label: "在留更新書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

更新書類：共通+資格別。住民税課税納税証明必要。

## must_say

- 申請書・写真・パスポート・カード
- 住民税課税納税証明
- 資格別書類

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
