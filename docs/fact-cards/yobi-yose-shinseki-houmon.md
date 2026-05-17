---
fact_id: yobi-yose-shinseki-houmon
title: 親族訪問 — 短期滞在で呼ぶ場合の書類
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "親族短期招聘"
citation_summary: "海外の親族を短期滞在ビザで呼ぶ場合は、招聘理由書、滞在予定表、身元保証書、在留カード写し、住民票、在職証明、課税証明等を在外公館に提出。"
source_display_names:
  - "外務省"
applies_when:
  - "親 短期滞在 招聘"
  - "親族訪問 ビザ"
does_not_cover:
  - "ビザ免除国（外務省リスト参照）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html
    label: 外務省 — 短期滞在
    accessed: "2026-05-17"
applies_to:
  - 海外親族を呼び寄せる在留者
direct_fact_fields:
  - 招聘理由書（呼び寄せ側作成）
  - 滞在予定表
  - 身元保証書（呼び寄せ側）
  - 呼び寄せ側：在留カード写し、住民票、在職証明、課税証明
  - 招聘者：パスポート、写真、申請書（在外公館で）
ai_inferred_fields:
  - ビザ免除国は招聘書類不要
needs_review_flags:
  - visa_exempt_country_2026_list
  - shinseki_proof_documents
  - latest_form_changes
related_links:
  - title: "外務省 — 短期滞在"
    url: "https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html"
    organization: "外務省"
    display_label: "短期滞在"
    locator: "親族訪問"
    relation: "official_reference"
evidence_points:
  - claim: "海外親族の短期滞在ビザは招聘理由書・滞在予定表・身元保証書・呼び寄せ側書類・本人書類が必要。"
    source_title: "外務省 — 短期滞在"
    source_url: "https://www.mofa.go.jp/mofaj/toko/visa/nagare/tanki.html"
    source_organization: "外務省"
    source_locator: "親族訪問"
    display_label: "親族短期招聘書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

親族訪問短期：招聘書類7-8種類。

## must_say

- 招聘理由書必須
- 呼び寄せ側書類（住民票・在職・課税）
- ビザ免除国は不要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
