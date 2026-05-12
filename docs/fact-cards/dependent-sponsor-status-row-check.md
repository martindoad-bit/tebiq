---
fact_id: dependent-sponsor-status-row-check
title: 家族滞在 — 扶養者の在留資格 row 確認
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
citation_label: "家族滞在の扶養者資格確認"
citation_summary: "家族滞在では、扶養者の在留資格が対象 row に入るかを確認する必要がある。留学の扶養者にも上陸基準省令上の限定がある。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-062
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 家族滞在 row"
  source_locator: "家族滞在 row"
  claim_type: source_locator
  applicable_statuses:
    - "家族滞在"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全ての合法在留者が扶養者になるという一般化"
    - "全ての留学生が当然に扶養者になるという一般化"
    - "扶養能力・材料の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问某在留资格能否作为家族滞在扶养者"
  - "用户问留学生能否带配偶或子女"
does_not_cover:
  - "具体扶养能力是否足够"
  - "材料清单或COE流程"
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
  - "家族滞在 sponsor status source row"
direct_fact_fields:
  - dependent_sponsor_status_must_be_checked_by_row
  - student_sponsor_limited_to_specific_student_row
ai_inferred_fields: []
needs_review_flags:
  - id: student_sponsor_scope_boundary
    reason: "The row limits student sponsors to 留学 row 1号イ/ロ; final user-facing handling should be reviewed before promotion."
  - id: sponsor_list_not_exhaustive_product_copy
    reason: "This card is a source-locator card and should not replace a full sponsor matrix."
related_fact_cards:
  - dependent-spouse-child-landing-relationship
  - dependent-support-received-criterion
  - kazoku-taizai-yoken
evidence_points:
  - claim: "The 家族滞在 row requires checking the sponsor's residence status and includes a specific limitation for student sponsors."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "家族滞在 row"
    display_label: "上陸基準省令 家族滞在 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 家族滞在 — 扶養者の在留資格 row 確認

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

家族滞在では、扶養者が対象となる在留資格をもって在留しているかを、家族滞在 row に沿って確認する必要がある。特に留学の在留資格をもって在留する者については、上陸基準省令上、留学 row のうち第一号イ又はロに該当するものに限るという限定が示されている。

> "在留資格"
> source: egov-landing-criteria-ordinance

> "留学"
> source: egov-landing-criteria-ordinance

> "第一号イ又はロ"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card is a source-row locator, not a full sponsor matrix.
- It does not decide concrete maintenance ability.
- It does not say every student can sponsor family stay.

## common_user_phrases

- 家族滞在 sponsor status row
- 扶养者在留资格 row
- 留学生能带配偶吗
- 留学生带孩子家族滞在
- 所有留学生都可以带家属吗
- 技人国可以带老婆孩子吗
- 什么签证能办家族滞在
- 扶养者资格
- 留学一号イロ

## must_say

- 扶养者资格必须按家族滞在 row 检查。
- 留学生作为扶养者有 row 上的限定，不能一概说所有留学生都可以。
- 本卡不判断具体扶养能力或材料是否足够。

## must_not_say

- 不要说任何合法在留者都能担保家族滞在。
- 不要说所有留学生都当然可以带家属。
- 不要把本卡当完整 sponsor matrix。

## qa_cases

### QA-1

**user**: 只要我是留学生，就一定可以给配偶办家族滞在吗？

**must_have**:

- 留学 sponsor row 限定
- 不能泛化所有留学生

**must_not_have**:

- 一定可以

### QA-2

**user**: 什么签证都能给家属办家族滞在吗？

**must_have**:

- 扶养者资格 row
- 不能泛化所有在留资格

**must_not_have**:

- 都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-062 |
