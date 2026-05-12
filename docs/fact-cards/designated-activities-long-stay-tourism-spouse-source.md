---
fact_id: designated-activities-long-stay-tourism-spouse-source
title: "特定活動 — 観光・保養等の長期滞在者及び配偶者"
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
citation_label: "特定活動: 長期観光滞在"
citation_summary: "ISA は特定活動の一類型として、観光・保養等を目的とする長期滞在者及びその配偶者のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 観光・保養等を目的とする長期滞在者及びその配偶者"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "対象国・地域の判断"
    - "預貯金・保険等の条件判断"
    - "就労可否の一般化"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-long-stay-tourism
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10.html
    title: 在留資格「特定活動」（観光・保養等を目的とする長期滞在者及びその配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "観光・保養目的の長期滞在又は配偶者として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_long_stay_tourism_spouse_source
ai_inferred_fields: []
needs_review_flags:
  - id: long_stay_tourism_conditions_needs_review
    reason: "対象国・地域、資産、保険、滞在目的、配偶者範囲は個別確認が必要。"
evidence_points:
  - claim: "ISA は特定活動の一類型として、観光・保養等を目的とする長期滞在者及びその配偶者のページを設けている。"
    source_title: "在留資格「特定活動」（観光・保養等を目的とする長期滞在者及びその配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 長期観光滞在"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 観光・保養等の長期滞在者及び配偶者

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は特定活動の一類型として、観光・保養等を目的とする長期滞在者及びその配偶者のページを設けている。

## exceptions_or_transition

- このカードは、対象国・地域、資産、保険、配偶者範囲、就労可否を判断しない。

## common_user_phrases

- 長期滞在 観光 特定活動
- 観光 保養 長期滞在 ビザ
- 富裕層 観光 ビザ 日本
- 長期観光 配偶者 特定活動
- vacation long stay visa Japan
- 観光で半年以上 日本

## must_say

- 観光・保養等の長期滞在は、特定活動の個別類型として確認する。
- 一般の短期滞在や就労可能な特定活動と混同しない。

## must_not_say

- 観光目的なら誰でも長期滞在の特定活動を使える。
- 長期観光の特定活動なら日本で自由に働ける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-007 |
