---
fact_id: student-criteria-not-renewal-attendance-materials
title: 留学 — 上陸基準と更新・出席率材料は別层
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
citation_label: "留学基準と更新材料の区別"
citation_summary: "留学の上陸基準、在留期間更新の提出材料、出席率や成績に関する審査材料は別層として扱う。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-054
  authority_layer: L2 Ordinance + L4 ISA Page
  legal_source_type: ordinance_current_text_plus_status_page
  law_article_ref: "上陸基準省令 留学 row / ISA 留学更新ページ"
  source_locator: "留学 row 2号の2 / ISA 留学 status page"
  claim_type: routing_boundary
  applicable_statuses:
    - "留学"
  application_type:
    - landing
    - renewal
  exclusion_scope:
    - "出席率を上陸基準の明文閾値として扱うこと"
    - "更新材料から初次上陸基準を逆算すること"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问出席率低是不是不符合上陆基准"
  - "用户把更新材料清单当成留学资格成立条件"
does_not_cover:
  - "具体出席率对更新的影响"
  - "学校处分或在留状况审查"
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
  - id: isa-student-status-page
    url: https://www.moj.go.jp/isa/applications/status/student.html
    title: 留学（在留資格）
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "留学 criteria/material/attendance routing boundary"
direct_fact_fields:
  - student_landing_criteria_not_renewal_materials
ai_inferred_fields: []
needs_review_flags:
  - id: attendance_review_boundary
    reason: "This card does not decide how concrete attendance rates affect renewal or status maintenance."
related_fact_cards:
  - ryugaku-koushin-shutsusekiRitsu
  - student-landing-education-institution-category
evidence_points:
  - claim: "The 留学 landing-criteria row includes institutional management of attendance and learning status, but this card does not convert renewal attendance review into a fixed landing threshold."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "留学 row 2号の2"
    display_label: "上陸基準省令 留学 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 留学 — 上陸基準と更新・出席率材料は別层

## current_date_logic

```text
Checked against e-Gov current law text and ISA student status page on 2026-05-12.
```

## current_effective_fact

留学の上陸基準、在留期間更新の提出材料、出席率・成績などの在留状況審査は、同じ層ではない。上陸基準省令には教育機関が出席状況や学習状況等を適正に管理する体制が示されているが、これをそのまま「学生本人の出席率 X% が上陸基準」と書き換えてはいけない。

> "出席状況"
> source: egov-landing-criteria-ordinance

> "管理する体制"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide concrete renewal risk from attendance rate.
- It does not provide a fixed attendance threshold.
- Material-checklist questions should route to material/checklist sources.

## common_user_phrases

- 留学 更新材料 出席率 不是上陆基准
- 出席率和上陆基准区别
- 留学出席率是上陆基准吗
- 出席率 90%
- 留学续签成绩证明
- 留学材料清单
- 更新材料是不是条件
- 出席率低能不能续签
- 成绩证明

## must_say

- 上陆基准、更新材料、出席率审查是不同层。
- 出席率可能与更新或在留状况有关，但不能直接改写成上陆基准固定阈值。
- 材料清单不是许可保证。

## must_not_say

- 不要说出席率是留学上陆许可的明文固定阈值。
- 不要用更新材料清单反推初次上陆基准。
- 不要用本卡判断具体出席率能否续签。

## qa_cases

### QA-1

**user**: 留学上陆基准是不是规定出席率必须达到 90%？

**must_have**:

- 区分上陆基准和出席率审查
- 不给固定阈值

**must_not_have**:

- 90% 是上陆基准

### QA-2

**user**: 更新材料里有成绩证明，是不是初次申请也一定要？

**must_have**:

- 更新材料和上陆基准不同层

**must_not_have**:

- 一定一样

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-054 |
