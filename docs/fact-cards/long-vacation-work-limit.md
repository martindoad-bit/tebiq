---
fact_id: long-vacation-work-limit
title: 留学 — 教育機関の長期休業期間における作業時間枠
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 3
citation_label: "留学の長期休業期間"
citation_summary: "留学生的长假期间工作时间框架只适用于教育机构学则规定的长期休业期间，且仍需在资格外活动许可框架内。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-069
  authority_layer: L2 Ordinance + L4 ISA Page
  legal_source_type: ordinance_isa_page
  law_article_ref: "入管法施行規則第19条5項1号"
  source_locator: "留学の長期休業期間"
  claim_type: work_time_limit
  applicable_statuses:
    - "留学"
  application_type:
    - current-status
  exclusion_scope:
    - "某日是否属于学校正式长假"
    - "休学、毕业后空档、没课期间"
    - "家族滞在工作时间"
  deep_water_candidate: false
applies_when:
  - "用户询问留学生寒暑假、春假能否一天工作8小时"
  - "用户把没课、休学、毕业后空档误当长假"
does_not_cover:
  - "学校学则具体长假认定"
  - "劳动法、社保、雇佣合同"
  - "毕业/退学后工作"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-regulation-article19
    url: https://laws.e-gov.go.jp/law/356M50000010054
    title: 出入国管理及び難民認定法施行規則
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-student-shikakugai
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    title: 留学の資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "留学生の長期休業期間 work-limit routing"
direct_fact_fields:
  - long_vacation_work_limit
ai_inferred_fields: []
needs_review_flags:
  - id: school_vacation_definition
    reason: "某一期间是否属于教育机构学则规定长假，需要确认学校日历/学则。"
evidence_points:
  - claim: "留学生の長期休業期間には日単位の作業時間枠がある。"
    source_title: "出入国管理及び難民認定法施行規則"
    source_url: "https://laws.e-gov.go.jp/law/356M50000010054"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条5項1号"
    display_label: "入管法施行規則第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 留学 — 教育機関の長期休業期間における作業時間枠

## current_date_logic

```text
This card reflects e-Gov regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is limited to school-defined long-vacation routing.
```

## current_effective_fact

### Long-vacation work-limit is limited to official long vacation

留学生の長期休業期間に関する時間枠は、所属教育機関の学則等で定められた長期休業期間に限って扱う。普通の週末、授業がない日、休学、卒業後の空白期間に自動で広がるものではない。

> "長期休業期間"
> source: egov-immigration-regulation-article19

> "一日について八時間以内"
> source: egov-immigration-regulation-article19

## exceptions_or_transition

- 具体日期是否属于学校正式长假，需要学校学则/日历确认。
- 本卡不适用于家族滞在的“假期”。

## common_user_phrases

- 长假打工
- 暑假打工
- 春假打工
- 留学生一天8小时
- 留学生暑假可以一天打8小时吗
- 没课可以一天8小时吗
- 学校没正式放假

## must_say

- 只适用于留学且处于教育机构学则规定的长假期间。
- 仍需在资格外活动许可框架内。
- 不能把“没课”或“自己觉得放假”当成正式长假。

## must_not_say

- 不要把长假8小时套到家族滞在。
- 不要说只要是假期就自动适用。
- 不要说毕业后空档也按长假处理。

## qa_cases

### QA-1

**user**: 留学生暑假可以一天8小时吗？

**must_have**:

- 长假期间
- 学校学则
- 资格外活动许可

**must_not_have**:

- 平时也可以
- 无限制

### QA-2

**user**: 学校没正式放假，但我没课，可以每天8小时吗？

**must_have**:

- 不能自动套用长假规则
- 需要确认学校正式长假

**must_not_have**:

- 没课就可以
- 自己认为放假就可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-069 |
