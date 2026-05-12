---
fact_id: ssw2-landing-criteria-differs-from-ssw1
title: 特定技能2号 — 1号とは異なる熟練技能基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "特定技能2号の熟練技能基準"
citation_summary: "特定技能2号は、従事業務に必要な熟練した技能を試験その他の評価方法で証明する基準を持ち、特定技能1号の単なる延長ではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-073
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 特定技能2号 row 1号ハ"
  source_locator: "特定技能2号 row 1号ハ"
  claim_type: disambiguation
  applicable_statuses:
    - "特定技能2号"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "特定技能1号の自動延長"
    - "家族滞在可否の最終判断"
    - "分野別2号条件"
  deep_water_candidate: true
applies_when:
  - "用户问特定技能2号和1号差别"
  - "用户问1号到期是否自动变2号"
does_not_cover:
  - "具体分野是否有2号"
  - "家属带同和长期居留结论"
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
  - "特定技能2号 criteria disambiguation"
direct_fact_fields:
  - ssw2_skilled_skill_evaluation
  - ssw2_not_automatic_extension_of_ssw1
ai_inferred_fields: []
needs_review_flags:
  - id: family_stay_not_decided
    reason: "This card does not decide family-accompanying consequences of SSW2."
related_fact_cards:
  - specified-skilled-worker-2-skilled-scope
  - ssw-field-specific-criteria-source-router
evidence_points:
  - claim: "特定技能2号 centers on proving skilled ability for the intended work, and has a different criteria structure from 特定技能1号."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "特定技能2号 row 1号ハ"
    display_label: "上陸基準省令 特定技能2号 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号 — 1号とは異なる熟練技能基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

特定技能2号では、従事しようとする業務に必要な熟練した技能を有していることが、試験その他の評価方法により証明されていることが示される。これは特定技能1号の単なる期間延長や自動更新ではない。

> "熟練した技能"
> source: egov-landing-criteria-ordinance

> "試験その他"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide field-specific SSW2 availability.
- It does not decide family-accompanying or permanent residence consequences.
- It should not import SSW1 Japanese/support-plan wording into SSW2.

## common_user_phrases

- 特定技能2号 与1号差异 熟练技能
- 1号到期自动变2号吗
- 特定技能2号是1号续签吗
- 熟练技能
- 2号 技能证明
- 特定技能2号条件
- 1号和2号区别
- 自动升级2号

## must_say

- 特定技能2号有独立的熟练技能基准。
- 2号不是1号自动续签或自动升级。
- 分野别可否和具体测试另查。

## must_not_say

- 不要说1号满期自动变2号。
- 不要把1号日语/支援计划结构直接套给2号。
- 不要用本卡回答家属带同最终结论。

## qa_cases

### QA-1

**user**: 特定技能1号到期后是不是自动变2号？

**must_have**:

- 不是自动
- 熟练技能

**must_not_have**:

- 自动变2号

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-073 |
