---
fact_id: long-term-resident-nikkei-second-spouse-route
title: "定住者 — 日系2世の配偶者"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "日系2世の配偶者"
citation_summary: "ISA は、外国人申請人が日系2世の配偶者である場合の定住者ページを設け、日系2世が会社勤務、自営業、無職である場合に分けて書類案内を掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-008
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 日系2世の配偶者"
  source_locator: "longtermresident01 page"
  claim_type: spouse_route
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "婚姻実体"
    - "日系2世本人の就労・収入状態"
    - "日系3世配偶者"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident-nikkei-second-spouse
    url: https://www.moj.go.jp/isa/applications/status/longtermresident01.html
    title: 在留資格「定住者」（日系2世の配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系2世の配偶者の定住者相談"
direct_fact_fields:
  - long_term_resident_nikkei_second_spouse_route
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_second_spouse_marriage_substance
    reason: "婚姻実体、扶養・生計、日系2世本人の状態は個別確認が必要。"
evidence_points:
  - claim: "ISA は、日系2世の配偶者である場合の定住者ページを設け、日系2世本人の勤務・自営業・無職の状態別に案内している。"
    source_title: "在留資格「定住者」（日系2世の配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "定住者: 日系2世の配偶者"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 日系2世の配偶者

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

ISA は、日系2世の配偶者である場合の定住者ページを設け、日系2世本人の状態別に案内している。

## exceptions_or_transition

- 日系2世本人、婚姻実体、生計状況を分けて確認する。

## common_user_phrases

- 日系2世 配偶者 定住者
- 日系二世 妻 定住者
- 日系2世 夫 ビザ
- 日系人 配偶者 定住者
- 日裔二世 配偶者

## must_say

- 日系2世本人の状況と婚姻関係を確認する。

## must_not_say

- 日系人と結婚すれば誰でも定住者になる。
- 日系3世配偶者と同じ書類でよいと決めつける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-008 |
