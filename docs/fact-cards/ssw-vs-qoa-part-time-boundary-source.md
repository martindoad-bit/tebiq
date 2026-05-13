---
fact_id: ssw-vs-qoa-part-time-boundary-source
title: "特定技能 — 資格外活動のアルバイト許可とは別"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能: アルバイト許可ではない"
citation_summary: "ISA は、特定技能を指定された機関との雇用契約に基づく特定産業分野の活動として案内している。留学や家族滞在の資格外活動とは別に確認する。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-017
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 活動内容"
  source_locator: "在留資格「特定技能」活動欄"
  claim_type: integration_boundary
  applicable_statuses:
    - "特定技能"
    - "資格外活動"
  application_type:
    - current-status
    - status-change
  exclusion_scope:
    - "資格外活動許可の個別可否"
    - "留学・家族滞在の28時間制限"
    - "特定技能の副業可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能を留学や家族滞在のアルバイト許可と混同する相談"
direct_fact_fields:
  - ssw_vs_qoa_part_time_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_part_time_side_work_review
    reason: "副業や兼業の可否は雇用契約・活動範囲・個別事情で確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能を指定された機関との雇用契約に基づく特定産業分野の活動として案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "活動欄"
    display_label: "特定技能: 雇用契約に基づく活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 資格外活動のアルバイト許可とは別

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能は、指定された機関との雇用契約に基づく特定産業分野の活動として案内されている。留学や家族滞在の資格外活動によるアルバイト許可とは別に確認する。

## exceptions_or_transition

- 特定技能で副業や兼業ができるかは、このカードでは判断しない。

## common_user_phrases

- 特定技能 アルバイト 28時間
- 特定技能 資格外活動
- 特定技能 留学 バイト
- 特定技能 家族滞在 バイト
- 特定技能 副業 できる
- 特定技能 パート

## must_say

- 特定技能は資格外活動のアルバイト許可とは別。
- 雇用契約と活動範囲を確認する。

## must_not_say

- 特定技能は28時間アルバイト許可の一種。
- 留学や家族滞在の資格外活動ルールをそのまま特定技能に当てる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-017 |
