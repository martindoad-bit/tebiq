---
fact_id: gijinkoku-international-services-cultural-basis
title: 技人国 — 国際業務と外国文化基盤
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
citation_label: "技人国の国際業務ルート"
citation_summary: "技人国の国際業務ルートでは、外国の文化に基盤を有する思考又は感受性を必要とする業務が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-013
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 2号"
  source_locator: "技人国 row 2号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全ての国際っぽい職種"
    - "職位名だけの判断"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户询问翻译、市场、海外业务、国际业务是否属于技人国"
does_not_cover:
  - "具体岗位是否满足外国文化基盘"
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
  - "技人国 international services route"
direct_fact_fields:
  - gijinkoku_international_services_cultural_basis
ai_inferred_fields: []
needs_review_flags:
  - id: concrete_business_fit_not_covered
    reason: "Whether a concrete marketing/sales job needs foreign-cultural basis is not decided here."
evidence_points:
  - claim: "The international-services route is tied to work based on foreign culture."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 2号"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技人国 — 国際業務と外国文化基盤

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技人国の国際業務ルートでは、外国の文化に基盤を有する思考又は感受性を必要とする業務が示されている。

> "外国の文化に基盤"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not say every sales, marketing, or overseas-related job qualifies.
- Concrete job fit remains a DOMAIN-sensitive boundary.

## common_user_phrases

- 国际业务
- 翻译
- 通译
- 语学指导
- 海外交易
- 广报
- 宣传
- 市场工作
- 外国文化

## must_say

- 国际业务路线要看是否需要外国文化基础。
- 不能把所有“国际相关岗位”都自动归入国际业务。

## must_not_say

- 不要把所有销售/市场都归入国际业务。
- 不要只按岗位名称判断。

## qa_cases

### QA-1

**user**: 市场工作算国际业务吗？

**must_have**:

- 外国文化基础
- 具体业务

**must_not_have**:

- 市场都可以

### QA-2

**user**: 翻译属于国际业务吗？

**must_have**:

- 翻译被列举
- 仍需看其他条件

**must_not_have**:

- 一定获批

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-013 |

