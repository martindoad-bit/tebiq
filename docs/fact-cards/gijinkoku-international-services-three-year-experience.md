---
fact_id: gijinkoku-international-services-three-year-experience
title: 技人国 — 国際業務の三年以上実務経験
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
citation_label: "国際業務の実務経験"
citation_summary: "技人国の国際業務ルートでは、原則として関連業務三年以上の実務経験が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-014
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 2号ロ"
  source_locator: "技人国 row 2号ロ"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "大学卒業者の翻訳・通訳・語学指導例外"
    - "経験証明方法"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问国际业务、翻译、海外业务需要几年经验"
does_not_cover:
  - "大学毕业翻译/通译/语学指导例外的完整适用判断"
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
  - "技人国 international services experience route"
direct_fact_fields:
  - gijinkoku_international_services_three_year_experience
ai_inferred_fields: []
needs_review_flags:
  - id: exception_interaction
    reason: "Must be read together with the translation/interpreting/language-instruction exception card."
evidence_points:
  - claim: "The international-services route generally requires three or more years of practical experience."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 2号ロ"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技人国 — 国際業務の三年以上実務経験

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技人国の国際業務ルートでは、原則として関連業務について三年以上の実務経験が示されている。

> "三年以上の実務経験"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- University-graduate translation/interpreting/language-instruction exception is handled by a separate card.
- This card does not decide whether a particular experience record is acceptable.

## common_user_phrases

- 国际业务经验
- 3年经验
- 三年经验
- 翻译经验
- 海外业务经验
- 广报经验
- 宣传经验

## must_say

- 国际业务路线原则上有三年以上相关实务经验要求。
- 翻译、通译、语学指导存在大学毕业者例外，需要另看。

## must_not_say

- 不要说所有国际业务都免经验。
- 不要忽略例外。

## qa_cases

### QA-1

**user**: 国际业务需要几年经验？

**must_have**:

- 三年以上

**must_not_have**:

- 不需要经验

### QA-2

**user**: 翻译也一定要3年吗？

**must_have**:

- 有例外需看

**must_not_have**:

- 一律三年

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-014 |

