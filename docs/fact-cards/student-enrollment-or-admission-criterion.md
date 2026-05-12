---
fact_id: student-enrollment-or-admission-criterion
title: 留学 — 入学して教育を受ける基準
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 3
citation_label: "留学の入学・教育基準"
citation_summary: "留学は入学して教育を受ける活動が中核であり、研究生・聴講生など一部形態では入学許可や週10時間以上の聴講が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-052
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 留学 row 1号・3号"
  source_locator: "留学 row 1号 / 3号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "留学"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "录取即许可"
    - "研究生・聴講生以外への週10時間条件泛化"
    - "生活费支弁判断"
  deep_water_candidate: false
applies_when:
  - "用户问录取或入学许可是不是留学核心条件"
  - "用户问研究生或听讲生留学条件"
does_not_cover:
  - "学校类别完整判断"
  - "具体录取材料是否足够"
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
  - "留学 enrollment/admission criterion"
direct_fact_fields:
  - student_enrollment_and_education_activity
  - research_auditor_admission_and_ten_hour_requirement
ai_inferred_fields: []
needs_review_flags:
  - id: narrow_research_auditor_scope
    reason: "The ten-hour listening requirement is for research/auditor-type cases and must not be generalized."
related_fact_cards:
  - student-landing-education-institution-category
  - student-living-expense-support-criterion
evidence_points:
  - claim: "The 留学 row centers on entering an education institution and receiving education, with special research/auditor conditions for certain cases."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "留学 row 1号 / 3号"
    display_label: "上陸基準省令 留学 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 留学 — 入学して教育を受ける基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

留学の基準では、日本の教育機関に入学して教育を受けることが中心的に示されている。専ら聴講による研究生又は聴講生として教育を受ける場合は、入学選考に基づく入学許可と、一週間につき十時間以上聴講することが示されている。

> "入学して教育"
> source: egov-landing-criteria-ordinance

> "十時間以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- The ten-hour condition is for research/auditor-type cases, not all students.
- Admission alone does not decide all eligibility.
- This card does not replace financial-support or school-category checks.

## common_user_phrases

- 留学 入学许可 教育关系
- 入学关系 上陆基准
- 录取通知书就行吗
- 学校录取就行吗
- 录取通知书 是不是留学签一定能下
- 有录取能不能下签
- 研究生 听讲生
- 聴講生
- 研究生留学
- 每周十小时
- 入学許可

## must_say

- 留学围绕入学并接受教育。
- 研究生、听讲生等特定形态要看入学许可和听讲时间。
- 录取不是全部条件。

## must_not_say

- 不要说有录取通知书就一定许可。
- 不要把每周 10 小时条件泛化给所有留学生。
- 不要用入学许可替代资金、学校类别等其他条件。

## qa_cases

### QA-1

**user**: 有录取通知书是不是留学签一定能下？

**must_have**:

- 入学是核心但不是全部
- 还要看其他条件

**must_not_have**:

- 一定能下

### QA-2

**user**: 研究生听讲每周有时间要求吗？

**must_have**:

- 特定研究生/听讲生
- 十小时以上

**must_not_have**:

- 所有学生都十小时

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-052 |
