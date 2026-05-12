---
fact_id: ssw1-skill-evaluation-criterion
title: 特定技能1号 — 技能評価方法による証明基準
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
citation_label: "特定技能1号の技能証明基準"
citation_summary: "特定技能1号では、従事しようとする業務に必要な相当程度の知識又は経験を必要とする技能が、試験その他の評価方法で証明されることが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-070
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 特定技能1号 row 1号ハ"
  source_locator: "特定技能1号 row 1号ハ / ただし書"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "分野別技能試験の具体名"
    - "技能実習良好修了の関連性判断"
    - "雇用契約・支援計画"
  deep_water_candidate: true
applies_when:
  - "用户问特定技能1号是否只要技能考试或经验"
  - "用户问技能实习良好修了能否免考试"
does_not_cover:
  - "具体分野考试名或合格证是否有效"
  - "雇用契约和支援计划合规"
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
  - "特定技能1号 skill evaluation criterion"
direct_fact_fields:
  - ssw1_skill_evaluation_required
  - ssw1_titp2_good_completion_exception_signal
ai_inferred_fields: []
needs_review_flags:
  - id: titp2_relation_boundary
    reason: "This card does not decide whether a concrete technical-intern-training completion is related to the target work."
related_fact_cards:
  - specified-skilled-worker-1-designated-field-skill-scope
  - ssw1-contract-support-plan-router
evidence_points:
  - claim: "特定技能1号 requires skill for the intended work to be proven by examination or other evaluation methods."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "特定技能1号 row 1号ハ"
    display_label: "上陸基準省令 特定技能1号 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 技能評価方法による証明基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

特定技能1号では、従事しようとする業務に必要な相当程度の知識又は経験を必要とする技能を有していることが、試験その他の評価方法により証明されていることが示される。

> "技能"
> source: egov-landing-criteria-ordinance

> "試験その他"
> source: egov-landing-criteria-ordinance

技能実習2号を良好に修了し、修得した技能と従事しようとする業務に関連性が認められる場合の例外が同じ row に示される。ただし、その関連性判断は本カードだけでは決めない。

> "良好に修了"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not list field-specific exam names.
- It does not decide technical-intern-training relation for a concrete case.
- It does not replace employment contract or support-plan criteria.

## common_user_phrases

- 特定技能1号 技能水准 指定分野
- 1号 技能试验 分野
- 特定技能1号 技能证明
- 技能考试过了就行吗
- 技能实习2号免考试
- 良好修了
- 相关性认定
- 特定技能考试
- 相当程度の知識

## must_say

- 特定技能1号需要技能由考试等评价方法证明。
- 技能实习2号良好修了例外有相关性边界。
- 技能证明不是全部条件。

## must_not_say

- 不要说技能考试合格就一定许可。
- 不要说技能实习良好修了就所有考试都免。
- 不要编具体分野考试名。

## qa_cases

### QA-1

**user**: 特定技能1号只要技能考试过了就可以吗？

**must_have**:

- 技能证明
- 不是全部条件

**must_not_have**:

- 考试过了就一定可以

### QA-2

**user**: 技能实习2号良好修了是不是所有特定技能考试都免？

**must_have**:

- 相关性边界

**must_not_have**:

- 所有都免

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-070 |
