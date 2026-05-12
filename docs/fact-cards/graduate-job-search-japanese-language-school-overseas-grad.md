---
fact_id: graduate-job-search-japanese-language-school-overseas-grad
title: "卒業後就職活動 — 海外大卒者の日本語教育機関卒業後ルート"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "海外大卒者の日本語教育機関卒業後就職活動"
citation_summary: "ISA は、海外大学又は大学院を卒業等し一定要件を満たす日本語教育機関に留学している方について、日本語教育機関卒業後の就職活動特定活動を特例的に認める取扱いを説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-015
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guidance_page
  law_article_ref: "海外大卒者の日本語教育機関卒業後就職活動"
  source_locator: "3 海外大卒者の日本語教育機関卒業後の就職活動について"
  claim_type: exception_router
  applicable_statuses:
    - "留学"
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "日本語教育機関の要件適合"
    - "出席率や経費支弁能力"
    - "推薦状・定期面談"
  deep_water_candidate: true
applies_when:
  - "海外大学卒業後に日本語学校を卒業し日本で就職活動したい"
does_not_cover:
  - "46号の外国大学除外"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-graduate-job-search
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html
    title: 大学等を卒業後就職活動のための滞在をご希望のみなさまへ
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "海外大卒者の日本語教育機関卒業後就職活動"
direct_fact_fields:
  - graduate_job_search_japanese_language_school_overseas_grad
ai_inferred_fields: []
needs_review_flags:
  - id: language_school_requirements_pending
    reason: "日本語教育機関側の要件と経過措置は詳細確認が必要。"
evidence_points:
  - claim: "ISA は、海外大学又は大学院を卒業等し一定要件を満たす日本語教育機関に留学している方について、日本語教育機関卒業後の就職活動特定活動を特例的に認める取扱いを説明している。"
    source_title: "大学等を卒業後就職活動のための滞在をご希望のみなさまへ"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html"
    source_organization: "出入国在留管理庁"
    source_locator: "3 海外大卒者の日本語教育機関卒業後の就職活動について"
    display_label: "卒業後就職活動: 海外大卒者日本語教育機関ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 卒業後就職活動 — 海外大卒者の日本語教育機関卒業後ルート

## current_date_logic

Checked against ISA guidance page on 2026-05-12.

## current_effective_fact

ISA は、海外大学又は大学院を卒業等し、一定要件を満たす日本語教育機関に留学している方の卒業後就職活動特定活動を説明している。

## exceptions_or_transition

- 日本語教育機関の要件、出席、推薦、定期面談などの確認が必要。

## common_user_phrases

- 日本語学校 卒業後 就職活動
- 海外大学卒 日本語学校 特定活動
- 日本語教育機関 就職活動 特定活動
- 日本語学校から就活ビザ
- 语言学校毕业 找工作 特定活动

## must_say

- 海外大卒者の日本語教育機関卒業後ルートは特例的に条件を確認する。

## must_not_say

- 日本語学校卒なら誰でも就職活動特定活動にできる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-015 |

