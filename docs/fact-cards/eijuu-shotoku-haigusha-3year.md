---
fact_id: eijuu-shotoku-haigusha-3year
title: 永住申請 — 配偶者ルートでは住民税3年分（5年分と異なる）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "配偶者永住 3年所得"
citation_summary: "日本人/永住者配偶者経由の永住申請では住民税3年分（通常永住の5年分と異なる）。ただしISA公式ページの記載は別ページ（zairyu_eijyu01.html）を確認要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "配偶者 永住 所得 何年"
does_not_cover:
  - "高度人材の3年（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者の配偶者
direct_fact_fields:
  - 配偶者ルート：所得証明3年分（実務）
  - 通常永住：5年分
  - 高度人材：3年分
  - 年金・健保：2年分（共通）
ai_inferred_fields:
  - ISA公式 zairyu_eijyu01.html (配偶者向け) で詳細確認推奨
needs_review_flags:
  - haigusha_3year_official_page_link
  - calc_starting_date_practice
  - simultaneous_filing_documents_specifics
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "配偶者"
    relation: "official_reference"
evidence_points:
  - claim: "日本人/永住者配偶者ルートの永住申請は所得証明3年分（通常永住の5年分とは異なる）。高度人材も3年分。年金健保は共通2年分。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所得証明"
    display_label: "配偶者永住3年所得"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

配偶者永住は所得3年分（通常5年分と異なる）。

## must_say

- 配偶者は3年分
- 通常は5年分
- 高度人材も3年分

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
