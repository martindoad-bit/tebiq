---
fact_id: research-education-landing-criteria-locator
title: 研究・教育 — 上陸基準 row を分けて確認する
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 5
citation_label: "研究・教育の上陸基準 locator"
citation_summary: "研究と教育は別の在留資格・上陸基準 row を持ち、大学教員、企業研究員、小中高等の教育活動などをまとめて同じ基準で判断してはいけない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-120
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 研究 row / 教育 row"
  source_locator: "研究 row / 教育 row"
  claim_type: source_locator
  applicable_statuses:
    - "研究"
    - "教育"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "教授の活動範囲"
    - "語学学校・企業研修との境界"
    - "個別学校種別の最終判断"
  deep_water_candidate: true
applies_when:
  - "用户问研究签、教育签、教授签之间的区别"
  - "用户把研究、教育、教授、留学研究生混为一谈"
does_not_cover:
  - "教授在留资格完整条件"
  - "企业语言教师、ALT、大学教师的最终分类"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
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
  - "研究 / 教育 criteria locator"
direct_fact_fields:
  - research_education_separate_rows
  - research_education_not_same_as_professor_or_student_researcher
ai_inferred_fields: []
needs_review_flags:
  - id: professor_boundary_not_extracted
    reason: "教授、研究、教育、留学研究生、企业语言教师之间的具体区分需要另行确认。"
related_fact_cards:
  - kenkyu-kyouiku-visa
  - student-enrollment-or-admission-criterion
evidence_points:
  - claim: "The ordinance contains separate landing-criteria rows for Research and Instructor/Education, so they should be located and evaluated separately."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "研究 row / 教育 row"
    display_label: "上陸基準省令 研究・教育 rows"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 研究・教育 — 上陸基準 row を分けて確認する

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

研究と教育は、上陸基準省令上で別々の row として整理されている。研究者、大学教員、小中高等の教育活動、企業・語学学校での語学指導、留学の研究生を同じ基準で一括判断してはいけない。

> "研究"
> source: egov-landing-criteria-ordinance

> "教育"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This is a locator card, not a final eligibility card.
- It does not extract every research or education criterion.
- It does not decide 教授 vs 研究 vs 教育 vs 技人国 for a concrete job.

## common_user_phrases

- 教授 研究 教育 基准行
- 研究签 教育签 区别
- 教育签和研究签
- 教授 研究 教育 区分
- 教授签证和研究签证
- 教育签和研究签是不是同一个
- 企业研究员 研究签
- 中学老师 教育签
- 研究生留学 研究在留资格
- 大学教授 研究 教育
- 研究 教育 上陆基准

## must_say

- 研究和教育要按不同 row 定位。
- 教授、研究、教育、留学研究生、企业语言教师不能混为一谈。
- 本卡只做 locator，不给最终资格判断。

## must_not_say

- 不要说研究签和教育签一样。
- 不要把大学教授直接说成研究或教育。
- 不要把留学研究生误判为研究在留资格。

## qa_cases

### QA-1

**user**: 教授签证和研究签证的上陆基准要看哪一行？

**must_have**:

- 分开定位
- 教授另查

**must_not_have**:

- 同一个基准

### QA-2

**user**: 研究生留学申请材料是不是研究签？

**must_have**:

- 留学研究生与研究在留资格区分

**must_not_have**:

- 直接等同

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-120 |
