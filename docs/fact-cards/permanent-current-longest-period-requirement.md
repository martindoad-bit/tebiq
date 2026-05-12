---
fact_id: permanent-current-longest-period-requirement
title: 永住許可ガイドライン — 現有資格で最長在留期間を有していること
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住ガイドラインの現有在留期間要件"
citation_summary: "ISA の永住許可ガイドラインは、現に有している在留資格について、入管法施行規則別表第二に規定されている最長の在留期間をもって在留していることを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-012
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)ウ"
  claim_type: status_condition
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "令和9年3月31日までの3年取扱い"
  deep_water_candidate: false
applies_when:
  - "用户问现在1年签、3年签、5年签是否能申请永住"
does_not_cover:
  - "2027年过渡处理"
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
  - 永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_current_longest_period_requirement
ai_inferred_fields: []
needs_review_flags:
  - id: transition_rule_separate
    reason: "3年在留期間の期限付き取扱いは別カードで扱う。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、現に有している在留資格について、入管法施行規則別表第二に規定されている最長の在留期間をもって在留していることを掲げている。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)ウ"
    display_label: "永住ガイドライン：現有資格で最長在留期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 現有資格で最長在留期間を有していること

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、現に有している在留資格について、入管法施行規則別表第二に規定されている最長の在留期間をもって在留していることを掲げている。

## exceptions_or_transition

- 3年在留期間の期限付き取扱いは別カードで扱う。
- 永住申請により現在の在留期間が延びるわけではない。

## common_user_phrases

- 永住 1年签 可以申请
- 永住 3年签 要求
- 永住 5年 在留期間
- 永住 最長 在留期間
- 永住 当前签证 年限
- 永住 在留期間 要几年

## must_say

- ガイドラインは現有資格で最長在留期間を有していることを掲げる。
- 現在の在留期間要件は永住申請とは別に確認する。

## must_not_say

- 1年でも必ず問題ない。
- 永住申請を出せば現在の在留期間が伸びる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-012 |
