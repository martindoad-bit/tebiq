---
fact_id: gijinkoku-degree-or-equivalent-route
title: 技人国 — 大学卒業又は同等以上教育ルート
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "技人国の学歴ルート"
citation_summary: "技人国の自然科学・人文科学系ルートには、大学卒業又は同等以上の教育を受けたことが含まれる。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-011
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 1号イ"
  source_locator: "技人国 row 1号イ"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "専攻関連性の個別判断"
    - "実務経験ルート"
    - "許可保証"
  deep_water_candidate: false
applies_when:
  - "用户问海外大学、本科、同等教育是否可作为技人国学历路线"
does_not_cover:
  - "学历与岗位关联是否充分"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "技人国 degree route"
direct_fact_fields:
  - gijinkoku_degree_or_equivalent_route
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "The 技人国 natural/humanities route includes university graduation or equivalent/higher education."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 1号イ"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 大学卒業又は同等以上教育ルート

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技人国の自然科学・人文科学系ルートには、大学卒業又は同等以上の教育を受けたことが含まれる。

> "大学を卒業"
> source: egov-landing-criteria-ordinance

> "同等以上の教育"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide job relevance.
- It does not say only Japanese universities qualify.

## common_user_phrases

- 大学毕业
- 文科毕业
- 同等以上教育
- 学历
- 大学学历
- 本科
- 海外大学
- 日本大学
- 技人国学历

## must_say

- 大学毕业或同等以上教育是自然/人文路线之一。
- 仍需看业务相关性等其他条件。

## must_not_say

- 不要说只有日本大学可以。
- 不要说有大学学历就一定获批。

## qa_cases

### QA-1

**user**: 海外大学本科能走技人国吗？

**must_have**:

- 大学毕业或同等以上教育
- 仍需看其他条件

**must_not_have**:

- 只有日本大学

### QA-2

**user**: 有本科学历是不是一定下签？

**must_have**:

- 不是许可保证

**must_not_have**:

- 一定下签

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-011 |
