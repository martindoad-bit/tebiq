---
fact_id: student-japanese-language-education-source-row
title: 留学 — 日本語教育機関は専用分岐で確認する
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
citation_label: "留学の日本語教育機関分岐"
citation_summary: "専ら日本語教育を受ける留学は、告示日本語教育機関や認定日本語教育機関などの専用分岐を確認する必要がある。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-053
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 留学 row 5号イ / 6号"
  source_locator: "留学 row 5号イ / 6号"
  claim_type: source_locator
  applicable_statuses:
    - "留学"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "すべての語学学校の適格性判断"
    - "大学・専修学校一般分岐への外挿"
    - "具体的機関の告示・認定確認"
  deep_water_candidate: true
applies_when:
  - "用户问日本语学校或语言培训是否都能办留学"
  - "用户问专门接受日语教育的留学条件"
does_not_cover:
  - "具体学校是否为告示或认定机构"
  - "令和过渡注记的最终解释"
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
  - "留学 Japanese-language education source row"
direct_fact_fields:
  - student_japanese_language_education_requires_specific_row
ai_inferred_fields: []
needs_review_flags:
  - id: institution_recognition_transition
    reason: "The row references告示日本語教育機関, 認定日本語教育機関, and transition notes; final user wording needs specialist review before promotion."
  - id: concrete_school_not_decided
    reason: "This card does not decide whether a specific language school is告示/認定."
related_fact_cards:
  - student-landing-education-institution-category
  - nihongo-gakko-ryugaku
evidence_points:
  - claim: "The 留学 row has a specific branch for receiving Japanese-language education, referencing designated or certified Japanese-language education institutions."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "留学 row 5号イ / 6号"
    display_label: "上陸基準省令 留学 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 留学 — 日本語教育機関は専用分岐で確認する

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

留学で専ら日本語教育を受けようとする場合、上陸基準省令は告示日本語教育機関や認定日本語教育機関などに関する専用分岐を置いている。したがって、すべての語学学校や民間講座を同じように扱うことはできない。

> "告示日本語教育機関"
> source: egov-landing-criteria-ordinance

> "認定日本語教育機関"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether a specific school is designated or certified.
- It does not generalize Japanese-language education rules to universities or vocational schools generally.
- Transition notes and institution recognition should be reviewed before any promotion.

## common_user_phrases

- 日本语教育机构 上陆基准 row
- 日本语学校 留学基准
- 日语学校能办留学吗
- 任何日语培训班都算吗
- 语言学校 留学
- 告示日本语教育机构
- 认定日本语教育机构
- 日语教育课程
- 私塾能办留学吗

## must_say

- 专门接受日本语教育要看对应分支。
- 不是所有日语学校、培训班、私塾都当然符合。
- 具体机构是否告示或认定，本卡不直接判断。

## must_not_say

- 不要把所有语言培训都视为留学合格机构。
- 不要把日本语教育机构分支外推到大学或专门学校一般情况。
- 不要省略需要进一步核对机构类型的边界。

## qa_cases

### QA-1

**user**: 任何日语培训班都算留学里的日本语教育机构吗？

**must_have**:

- 告示或认定等机构分支
- 不能泛化

**must_not_have**:

- 都算

### QA-2

**user**: 日语学校有录取就一定能办留学吗？

**must_have**:

- 机构类型需确认
- 不是只看录取

**must_not_have**:

- 一定能办

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-053 |
