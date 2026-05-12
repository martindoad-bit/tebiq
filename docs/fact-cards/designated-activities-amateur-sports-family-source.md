---
fact_id: designated-activities-amateur-sports-family-source
title: "特定活動 — アマチュアスポーツ選手及び家族"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: アマチュアスポーツ"
citation_summary: "ISA は特定活動の一類型として、アマチュアスポーツ選手及びその家族のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: アマチュアスポーツ選手及びその家族"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "競技実績の評価"
    - "家族該当性の判断"
    - "就労可否の一般化"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-amateur-sports
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02.html
    title: 在留資格「特定活動」（アマチュアスポーツ選手及びその家族）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "アマチュアスポーツ選手又はその家族として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_amateur_sports_family_source
ai_inferred_fields: []
needs_review_flags:
  - id: amateur_sports_fit_needs_review
    reason: "競技実績、受入先、家族範囲は個別資料で確認する必要がある。"
evidence_points:
  - claim: "ISA は特定活動の一類型として、アマチュアスポーツ選手及びその家族のページを設けている。"
    source_title: "在留資格「特定活動」（アマチュアスポーツ選手及びその家族）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: アマチュアスポーツ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — アマチュアスポーツ選手及び家族

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は特定活動の一類型として、アマチュアスポーツ選手及びその家族のページを設けている。

## exceptions_or_transition

- このカードは、競技実績、受入機関、家族範囲、更新可否を判断しない。

## common_user_phrases

- アマチュアスポーツ 特定活動
- アマチュアスポーツ選手 ビザ
- スポーツ選手 特定活動
- スポーツ 家族 特定活動
- amateur sports visa Japan
- 特定活動 スポーツ選手 家族

## must_say

- アマチュアスポーツ選手及び家族は、特定活動の個別類型として確認する。
- 特定活動全般のルールだけで就労可否や家族範囲を判断しない。

## must_not_say

- 特定活動ならスポーツ活動はすべてできる。
- 家族も必ず同じ条件で滞在できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-001 |
