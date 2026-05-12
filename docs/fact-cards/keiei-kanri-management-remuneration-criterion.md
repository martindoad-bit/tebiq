---
fact_id: keiei-kanri-management-remuneration-criterion
title: 経営・管理 — 管理従事時の日本人同等報酬基準
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 2
citation_label: "経営管理の管理報酬基準"
citation_summary: "経営・管理では、申請人が事業の管理に従事しようとする場合、日本人が従事する場合に受ける報酬と同等額以上であることが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-037
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 経営・管理 row 5号"
  source_locator: "経営・管理 row 5号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "経営者報酬全般の個別判断"
    - "具体金額の算定"
    - "既存保持者更新の過渡措置判断"
  deep_water_candidate: true
applies_when:
  - "用户问经营管理从事管理时工资或役员报酬是否有要求"
does_not_cover:
  - "具体报酬金额是否足够"
  - "纯经营活动和管理活动的界限"
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
  - "経営・管理 management remuneration criterion"
direct_fact_fields:
  - keiei_kanri_management_remuneration_japanese_comparable
ai_inferred_fields: []
needs_review_flags:
  - id: management_vs_operation_boundary
    reason: "This card does not decide whether the applicant's actual role is management for the remuneration criterion."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "When the applicant will engage in business administration, remuneration must be at least equivalent to what a Japanese person receives for comparable work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 5号"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 管理従事時の日本人同等報酬基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

経営・管理では、申請人が事業の管理に従事しようとする場合、日本人が従事する場合に受ける報酬と同等額以上の報酬を受けることが示されている。

> "事業の管理"
> source: egov-landing-criteria-ordinance

> "同等額以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card applies to the management-remuneration criterion.
- It does not set a concrete salary amount.
- It must not be expanded into a claim that every business owner must receive a fixed salary in every context.

## common_user_phrases

- 经管工资
- 经管报酬
- 役员报酬
- 管理报酬
- 从事管理 报酬
- 不拿工资可以吗
- 工资比日本人低
- 同等额以上
- 日本人同等
- 日本人同等报酬
- 经营管理薪资
- 经管老板 固定工资
- 所有员工工资

## must_say

- 从事事业管理时有日本人同等额以上报酬基准。
- 本卡不计算具体金额。
- 不能扩张成所有经营者所有场景都必须固定工资。

## must_not_say

- 不要说报酬完全无关。
- 不要给具体金额保证。
- 不要把本卡扩大到所有经营者报酬问题。

## qa_cases

### QA-1

**user**: 经管签做管理，工资比日本人低可以吗？

**must_have**:

- 日本人同等额以上

**must_not_have**:

- 没关系

### QA-2

**user**: 我开公司不拿工资也能申请经管吗？

**must_have**:

- 报酬基准的适用边界
- 不能直接保证

**must_not_have**:

- 一定可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-037 |
