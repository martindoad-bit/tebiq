---
fact_id: permanent-three-year-transitional-handling
title: 永住許可ガイドライン — 3年在留期間の期限付き取扱い
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
citation_label: "永住ガイドラインの3年在留期間取扱い"
citation_summary: "ISA の永住許可ガイドラインは、令和9年3月31日まで、在留期間3年を有する場合は最長在留期間をもって在留しているものとして取り扱う旨を注記している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-013
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "注1"
  claim_type: transitional_rule
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "令和9年4月1日以降の一般化"
  deep_water_candidate: true
applies_when:
  - "用户问3年签永住、2027年前后规则"
does_not_cover:
  - "2027年以后个案如何判断"
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
  - 在留期間3年で永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_three_year_transitional_handling
ai_inferred_fields: []
needs_review_flags:
  - id: post_2027_handling_requires_domain
    reason: "令和9年4月1日以降の安全な製品文言はDOMAIN確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、令和9年3月31日まで、在留期間3年を有する場合は最長在留期間をもって在留しているものとして取り扱う旨を注記している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注1"
    display_label: "永住ガイドライン：3年在留期間の期限付き取扱い"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 3年在留期間の期限付き取扱い

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12. The source contains a date-specific transition ending on 2027-03-31.

## current_effective_fact

永住許可ガイドラインは、令和9年3月31日まで、在留期間3年を有する場合は最長在留期間をもって在留しているものとして取り扱う旨を注記している。

## exceptions_or_transition

- 令和9年4月1日以降に同じ文言で案内してよいかは確認が必要。
- 3年在留期間の取扱いは永住許可保証ではない。

## common_user_phrases

- 永住 3年签 2027
- 永住 3年 在留期間 令和9年
- 永住 3年签 最長
- 3年签 永住 过渡
- 2027 永住 3年
- 永住 3年签 可以吗

## must_say

- 令和9年3月31日までの期限付き取扱いがある。
- 3年在留期間でも許可保証ではない。

## must_not_say

- 2027年以降も同じと断定する。
- 3年签なら必ず永住申請が通る。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-013 |
