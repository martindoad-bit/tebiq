---
fact_id: student-dependent-qoa-28-hour-router
title: 留学・家族滞在 — 週28時間以内の資格外活動は包括許可ルート
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
citation_label: "留学・家族滞在の週28時間以内活動は包括許可ルート"
citation_summary: "ISA は、留学・家族滞在の在留資格について、週28時間以内で稼働する場合の資格外活動は包括許可の対象として案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-029
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条第2項"
  source_locator: "留学・家族滞在の資格外活動許可ページ：包括許可"
  claim_type: routing_boundary
  applicable_statuses:
    - "student"
    - "dependent"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "週28時間超"
    - "個別許可対象活動"
    - "風俗営業等"
  deep_water_candidate: true
applies_when:
  - "用户问留学生或家族滞在打工28小时"
  - "用户问家族滞在兼职许可"
does_not_cover:
  - "长假每日8小时细节"
  - "具体雇佣形态是否个别许可"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-student-qoa
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    title: 「留学」の在留資格に係る資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-dependent-qoa
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html
    title: 「家族滞在」の在留資格に係る資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 留学
  - 家族滞在
  - 資格外活動許可申請
direct_fact_fields:
  - student_dependent_28_hour_comprehensive_permission_route
ai_inferred_fields: []
needs_review_flags:
  - id: concrete_work_form_boundary
    reason: "Some individual business/contract forms may need individual permission."
evidence_points:
  - claim: "ISA explains that for Student and Dependent statuses, revenue-business or remunerated activity within 28 hours per week is handled through the comprehensive-permission route, subject to scope and conditions."
    source_title: "留学・家族滞在の資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "包括許可（1週について28時間以内）"
    display_label: "留学・家族滞在：週28時間以内は包括許可ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 留学・家族滞在 — 週28時間以内の資格外活動は包括許可ルート

## current_date_logic

Checked against current ISA student and dependent qualification-outside-activity pages on 2026-05-12.

## current_effective_fact

留学・家族滞在の在留資格について、1週28時間以内で稼働する収入・報酬活動は、資格外活動の包括許可ルートで案内されている。

## exceptions_or_transition

- 包括許可の範囲外、業務委託、個人事業、長期休業中、風俗営業等は別途確認する。
- 28時間以内なら何でもよい、とは言わない。

## common_user_phrases

- 留学生 28小时 打工许可
- 家族滞在 28小时 兼职
- 留学 资格外活动 包括许可
- 家族滞在 資格外活動 28時間
- 一周28小时 打工
- 学生 家族滞在 打工许可

## must_say

- 留学・家族滞在の週28時間以内活動は包括許可ルート。
- ただし活動内容、場所、雇用形態の条件がある。

## must_not_say

- 28小时以内任何工作都可以。
- 不用先取得资格外活动许可。

## qa_cases

### QA-1

**user**: 家族滞在可以一周28小时打工吗？

**must_have**:

- 資格外活動の包括許可ルート
- 事前许可和活动条件

**must_not_have**:

- 直接可以

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-029 |
