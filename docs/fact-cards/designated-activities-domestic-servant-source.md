---
fact_id: designated-activities-domestic-servant-source
title: "特定活動 — 家事使用人"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: 家事使用人"
citation_summary: "ISA は特定活動の一類型として、家事使用人のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 家事使用人"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "雇用主の地位判断"
    - "家事使用人の就労範囲"
    - "労働条件の評価"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01.html
    title: 在留資格「特定活動」（家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "家事使用人として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_domestic_servant_source
ai_inferred_fields: []
needs_review_flags:
  - id: domestic_servant_employer_scope_needs_review
    reason: "雇用主の地位、労働条件、同伴経緯は個別確認が必要。"
evidence_points:
  - claim: "ISA は特定活動の一類型として、家事使用人のページを設けている。"
    source_title: "在留資格「特定活動」（家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 家事使用人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 家事使用人

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は特定活動の一類型として、家事使用人のページを設けている。

## exceptions_or_transition

- このカードは、雇用主の地位、労働条件、同伴経緯、転職可否を判断しない。

## common_user_phrases

- 家事使用人 特定活動
- メイド ビザ 日本
- 家政婦 特定活動
- 外交官 家事使用人
- 家事労働者 在留資格
- domestic worker visa Japan

## must_say

- 家事使用人は特定活動の個別類型として確認する。
- 一般の家事代行就労や通常の就労ビザとは分けて確認する。

## must_not_say

- 家事使用人なら誰でも特定活動で雇える。
- 家事使用人は通常の就労ビザと同じ。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-005 |
