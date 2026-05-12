---
fact_id: ssw-field-specific-criteria-source-router
title: 特定技能 — 分野別基準は通用 row から推断しない
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
citation_label: "特定技能の分野別基準ルート"
citation_summary: "特定技能の分野別条件は、通用の上陸基準 row だけから推断せず、各分野を所管する関係行政機関と法務大臣の告示・要領を確認する必要がある。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-074
  authority_layer: L2 Ordinance + L4 ISA Page
  legal_source_type: ordinance_current_text_plus_status_page
  law_article_ref: "上陸基準省令 特定技能1号 row 6号 / 特定技能2号 row"
  source_locator: "特定技能1号 row 6号 / ISA 特定技能 page"
  claim_type: routing_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "個別分野の試験・業務範囲・協議会要件"
    - "一分野条件の他分野への外挿"
    - "通用 row だけでの最終判断"
  deep_water_candidate: true
applies_when:
  - "用户问某行业特定技能考试或业务范围"
  - "用户把一个分野条件套到另一个分野"
does_not_cover:
  - "护理、外食、建筑等各分野的具体条件"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-ssw-index
    url: https://www.moj.go.jp/isa/applications/ssw/index.html
    title: 特定技能制度
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "特定技能 field-specific criteria routing"
direct_fact_fields:
  - ssw_field_specific_criteria_must_use_field_sources
ai_inferred_fields: []
needs_review_flags:
  - id: field_sources_not_extracted
    reason: "This router does not extract each field's notices, operation guidelines, or exam requirements."
related_fact_cards:
  - ssw1-skill-evaluation-criterion
  - ssw2-landing-criteria-differs-from-ssw1
evidence_points:
  - claim: "特定技能 field-specific criteria must be checked against field-specific sources and cannot be inferred from the general row alone."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "特定技能1号 row 6号"
    display_label: "上陸基準省令 特定技能 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 分野別基準は通用 row から推断しない

## current_date_logic

```text
Checked against e-Gov current law text and ISA SSW page on 2026-05-12.
```

## current_effective_fact

特定技能では、特定の産業上の分野について、その分野を所管する関係行政機関の長が法務大臣と協議して告示で定める基準に適合することが示される。したがって、外食、建設、介護などの具体的な業務範囲・試験・分野別条件は、通用 row だけから推断してはいけない。

> "特定の産業上の分野"
> source: egov-landing-criteria-ordinance

> "告示で定める基準"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This is a router card.
- It does not answer field-specific exams, work scope, council requirements, or operation guidelines.
- It does not transfer one field's conditions to another field.

## common_user_phrases

- 特定技能 分野别基准 不能从通用row推断
- 外食考试能做建筑吗
- 介护考试能做外食吗
- 农业特定技能 介护领域
- 特定技能 分野别 条件不同
- 分野别要领
- 行业别条件
- 特定技能领域
- 业务范围
- 协议会要求
- 各分野の要領別冊

## must_say

- 特定技能有分野别条件。
- 分野别要求不能从通用 row 或其他分野推断。
- 行业、岗位、考试、业务范围问题要查对应分野来源。

## must_not_say

- 不要说所有行业条件相同。
- 不要把一个分野的考试或业务范围套到另一个分野。
- 不要用通用 row 给具体行业最终结论。

## qa_cases

### QA-1

**user**: 外食考试通过后，能不能用同样条件去做建筑特定技能？

**must_have**:

- 分野别
- 不能互套

**must_not_have**:

- 同样条件都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-074 |
