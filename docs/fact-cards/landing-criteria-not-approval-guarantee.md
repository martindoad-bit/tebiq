---
fact_id: landing-criteria-not-approval-guarantee
title: 上陸基準 — 条件であって許可保証ではない
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
citation_label: "上陸条件と基準"
citation_summary: "入管法第7条の上陸条件と上陸基準省令の基準は、許可保証ではなく審査条件の一部として扱う。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-002
  authority_layer: L1 Law + L2 Ordinance
  legal_source_type: statute_ordinance_current_text
  law_article_ref: "入管法第7条 / 上陸基準省令"
  source_locator: "入管法第7条、上陸基準省令本則"
  claim_type: permission_boundary
  applicable_statuses:
    - "all"
  application_type:
    - landing
  exclusion_scope:
    - "許可確率"
    - "個別審査結果"
    - "行政判断の保証"
  deep_water_candidate: true
applies_when:
  - "用户询问符合基准是否一定下签"
  - "用户把学历/经验/工资条件当作许可保证"
does_not_cover:
  - "个案是否会被许可"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act-article7
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "landing criteria permission boundary"
direct_fact_fields:
  - landing_criteria_is_condition
ai_inferred_fields:
  - not_approval_guarantee_product_boundary
needs_review_flags:
  - id: permission_probability_not_covered
    reason: "The card does not determine approval probability or individual outcome."
evidence_points:
  - claim: "Landing criteria are part of the statutory landing-condition framework, not an approval guarantee."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第7条"
    display_label: "入管法第7条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 上陸基準 — 条件であって許可保証ではない

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

入管法第7条は上陸のための条件を定め、上陸基準省令は第7条第1項第2号の基準を定める。これらは審査条件の枠組みであり、個別許可の保証ではない。

> "上陸のための条件"
> source: egov-immigration-act-article7

> "第七条第一項第二号の基準"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not state whether a specific applicant will be approved.
- Use DOMAIN review before any future promotion because this boundary affects user-facing certainty.

## common_user_phrases

- 一定下签
- 符合基准
- 许可概率
- 能不能批
- 基准符合就给吗
- 技人国学历符合就一定给吗
- 上陆基准满足

## must_say

- 上陆基准是审查条件之一。
- 符合某个基准不等于个案一定许可。

## must_not_say

- 不要说满足基准就一定获批。
- 不要用本卡预测许可概率。

## qa_cases

### QA-1

**user**: 符合上陆基准是不是一定下签？

**must_have**:

- 不是保证
- 条件之一

**must_not_have**:

- 一定下签
- 保证许可

### QA-2

**user**: 技人国学历符合就一定给吗？

**must_have**:

- 还需整体审查
- 不能保证

**must_not_have**:

- 一定会给

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-002 |

