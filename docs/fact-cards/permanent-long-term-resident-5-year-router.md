---
fact_id: permanent-long-term-resident-5-year-router
title: 永住許可ガイドライン — 定住者の5年以上在留ルート
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "定住者の永住年数例外ルート"
citation_summary: "ISA の永住許可ガイドラインは、定住者の在留資格で引き続き5年以上日本に在留していることを、原則10年在留の特例の一つとして示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-008
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "2(2)"
  claim_type: exception_router
  applicable_statuses:
    - "long_term_resident"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "定住者以外の資格"
  deep_water_candidate: false
applies_when:
  - "用户问定住者几年能走永住"
does_not_cover:
  - "定住者个案是否满足其他要件"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 定住者の在留資格を持つ外国人
direct_fact_fields:
  - permanent_long_term_resident_5_year_router
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、定住者の在留資格で引き続き5年以上日本に在留していることを、原則10年在留の特例の一つとして示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2(2)"
    display_label: "永住ガイドライン：定住者5年以上ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 定住者の5年以上在留ルート

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、定住者の在留資格で引き続き5年以上日本に在留していることを、原則10年在留の特例の一つとして示している。

## exceptions_or_transition

- 定住者5年以上は例外ルートであり、永住許可の保証ではない。

## common_user_phrases

- 定住者 永住 5年
- 定住者 永住 何年
- 定住 永住 特例
- 定住者 5年以上 永住
- 定住签 永住
- long term resident 永住

## must_say

- 定住者資格で引き続き5年以上在留する例外ルートがある。
- 他の永住要件は別途確認する。

## must_not_say

- 定住者5年で必ず永住できる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-008 |
