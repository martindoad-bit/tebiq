---
fact_id: student-landing-education-institution-category
title: 留学 — 教育機関类别ごとに読む上陸基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 3
citation_label: "留学の教育機関別基準"
citation_summary: "留学の上陸基準は、大学・高専・専修学校・高等学校以下・日本語教育機関など、教育機関や教育形態ごとの分岐として読まれる。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-050
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 留学 row 1号・4号・4号の2・5号・6号・8号"
  source_locator: "留学 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "留学"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "在留期間更新の出席率・成績審査"
    - "材料清单"
    - "個別学校の適格性判断"
  deep_water_candidate: true
applies_when:
  - "用户问某类学校是否能走留学上陆基准"
  - "用户把所有学校录取都当成同一留学规则"
does_not_cover:
  - "具体学校是否属于可接收留学生的机构"
  - "更新材料或出席率审查"
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
  - "留学 landing criteria institution-category routing"
direct_fact_fields:
  - student_education_institution_category_branching
ai_inferred_fields: []
needs_review_flags:
  - id: concrete_school_eligibility_not_decided
    reason: "This card does not decide whether a concrete school or course is within the permitted institution category."
related_fact_cards:
  - student-activity-anchor
  - student-japanese-language-education-source-row
evidence_points:
  - claim: "The 留学 landing-criteria row is structured by education institution and education type, not as one generic school rule."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "留学 row"
    display_label: "上陸基準省令 留学 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 留学 — 教育機関类别ごとに読む上陸基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

留学の上陸基準は、大学・これに準ずる機関、高等専門学校、専修学校、高等学校以下、日本語教育、各種学校等の教育機関や教育形態ごとに分岐している。したがって、どの学校・课程に入るかを確認せずに一条の通用规则として扱うことはできない。

> "大学"
> source: egov-landing-criteria-ordinance

> "専修学校"
> source: egov-landing-criteria-ordinance

> "日本語教育"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide a concrete school's eligibility.
- Japanese-language education has a more specific source row and should route to `student-japanese-language-education-source-row`.
- Renewal attendance/material questions should route to renewal/material cards, not this card alone.

## common_user_phrases

- 留学 上陆基准 学校类别
- 教育机构类别 留学基准
- 留学签 学校种类
- 哪些学校能办留学
- 日语学校和大学一样吗
- 专门学校留学基准
- 高中留学基准
- 留学教育机构

## must_say

- 留学上陆基准要按教育机构类别和教育形态分支看。
- 不能只用“是否被学校录取”来判断全部基准。
- 日本语教育机构要读专门分支。

## must_not_say

- 不要说任何学校录取都符合留学。
- 不要把大学、专门学校、日本语教育机构、研究生、听讲生合并成一条规则。
- 不要用本卡回答出席率或更新材料。

## qa_cases

### QA-1

**user**: 留学签是不是只要学校录取就行？

**must_have**:

- 教育机构类别
- 不只看录取

**must_not_have**:

- 录取就一定可以

### QA-2

**user**: 日语学校和大学留学基准一样吗？

**must_have**:

- 分支不同
- 日本语教育机构专门 row

**must_not_have**:

- 完全一样

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-050 |
