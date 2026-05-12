---
fact_id: qualification-outside-activity-current-status-not-impeded
title: 資格外活動許可 — 現在の在留資格活動を妨げないことが一般原則
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "資格外活動は現資格活動を妨げないことが一般原則"
citation_summary: "ISA の一般原則は、資格外活動許可の要件として、申請活動が現在の在留資格に係る活動の遂行を妨げないこと等を挙げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-027
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動許可について：一般原則"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "table1"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "本業・学業を阻害する活動"
  deep_water_candidate: true
applies_when:
  - "用户问资格外活动是否影响本业/学业"
  - "用户问留学打工太多"
does_not_cover:
  - "具体学业/本业是否已受妨碍"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-general-principles
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - outside_activity_must_not_impede_current_status_activity
  - applicant_must_be_conducting_current_status_activity
ai_inferred_fields: []
needs_review_flags:
  - id: activity_impediment_assessment
    reason: "Whether study/work is actually impeded is an individual assessment."
evidence_points:
  - claim: "ISA lists as general principles that the outside activity must not impede the activity under the current status and that the applicant must be conducting the current-status activity."
    source_title: "資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 資格外活動許可の要件（一般原則）"
    display_label: "資格外活動：現資格活動を妨げないこと"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 現在の在留資格活動を妨げないことが一般原則

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

資格外活動許可の一般原則には、申請活動によって現在の在留資格に係る活動の遂行が妨げられないこと、現在の在留資格に係る活動を行っていることが含まれる。

## exceptions_or_transition

- 出席率、勤務状況、活動停止などの具体評価は個別確認。

## common_user_phrases

- 打工影响留学签证吗
- 资格外活动 本业 妨げ
- 本职工作 副业 影响签证
- 留学生 不上学 打工
- 资格外活动 一般原则
- 現資格活動 妨げない

## must_say

- 資格外活動は現資格活動を妨げないことが前提。
- 現資格活動を行っていることも一般原則に含まれる。

## must_not_say

- 有许可就不需要上学或做本业。
- 只看28小时，不看本来活动。

## qa_cases

### QA-1

**user**: 留学生有打工许可，但基本不上课，续签会有影响吗？

**must_have**:

- 资格外活动不能妨碍留学活动
- 出席等要个别确认

**must_not_have**:

- 有许可就没关系

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-027 |
