---
fact_id: long-term-resident-nikkei-third-spouse-main-route
title: "定住者 — 日系3世の配偶者"
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "日系3世の配偶者"
citation_summary: "ISA の定住者ページは、外国人申請人が日系3世の配偶者である場合を、定住者の申請区分の一つとして掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-009
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 日系3世の配偶者"
  source_locator: "在留資格「定住者」 list item 3"
  claim_type: spouse_route
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別提出書類"
    - "婚姻実体"
    - "日系3世本人の該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系3世の配偶者の定住者相談"
direct_fact_fields:
  - long_term_resident_nikkei_third_spouse_route
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_third_spouse_detail_page_gap
    reason: "日系3世配偶者の詳細提出書類ページは本次確認で独立ページ未検出のため、資料は別途確認が必要。"
evidence_points:
  - claim: "ISA の定住者ページは、外国人申請人が日系3世の配偶者である場合を定住者の申請区分として掲載している。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請区分リスト"
    display_label: "定住者: 日系3世の配偶者"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 日系3世の配偶者

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

ISA の定住者ページは、日系3世の配偶者である場合を定住者の申請区分として掲載している。

## exceptions_or_transition

- 日系3世本人の該当性、婚姻実体、提出資料は別途確認する。

## common_user_phrases

- 日系3世 配偶者 定住者
- 日系三世 妻 ビザ
- 日系3世 夫 定住者
- 日系人 配偶者 三世
- 日裔三世 配偶者

## must_say

- 日系3世配偶者は日系3世本人の該当性と婚姻実体を分けて確認する。

## must_not_say

- 日系3世と結婚していれば必ず定住者になる。

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-009 |
