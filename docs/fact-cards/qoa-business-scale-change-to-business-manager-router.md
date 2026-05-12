---
fact_id: qoa-business-scale-change-to-business-manager-router
title: 資格外活動 — 新法人設立・雇用・事業所設置は経営管理変更を確認する
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
citation_label: "事業規模が大きい場合は経営管理への変更を確認"
citation_summary: "ISA の留学・家族滞在の資格外活動ページは、新たに法人を設立する場合、従業員を雇用する場合、事業所を設ける場合等は経営・管理への変更が必要となると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-030A
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条第2項 / 在留資格変更"
  source_locator: "留学・家族滞在の資格外活動許可ページ：個人事業主等"
  claim_type: routing_boundary
  applicable_statuses:
    - "student"
    - "dependent"
  application_type:
    - qualification_outside_activity
    - change
  exclusion_scope:
    - "資格外活動で大規模事業を処理"
  deep_water_candidate: true
applies_when:
  - "用户问留学/家族滞在能不能开公司、雇人、租办公室"
  - "用户问个体事业、业务委托、经营管理边界"
does_not_cover:
  - "经营管理是否能获批"
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
  - 在留資格変更許可申請
direct_fact_fields:
  - new_corporation_employees_or_office_routes_to_business_manager_change
ai_inferred_fields: []
needs_review_flags:
  - id: actual_business_scale_assessment
    reason: "Actual business scale and business-manager eligibility require DOMAIN review."
evidence_points:
  - claim: "ISA states on Student and Dependent qualification outside activity pages that when establishing a new corporation, hiring employees, or setting up an office, a change to Business Manager status is required."
    source_title: "留学・家族滞在の資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "個人事業主等として活動する場合等"
    display_label: "新法人・雇用・事業所は経営管理変更を確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動 — 新法人設立・雇用・事業所設置は経営管理変更を確認する

## current_date_logic

Checked against current ISA student and dependent qualification-outside-activity pages on 2026-05-12.

## current_effective_fact

留学・家族滞在の資格外活動の文脈で、新たに法人を設立する場合、従業員を雇用する場合、事業所を設ける場合等は、経営・管理の在留資格への変更が必要になると案内されている。

## exceptions_or_transition

- 小規模な個人事業や業務委託でも、稼働時間を客観的に確認できるか等で個別許可の確認が必要。
- 経営・管理の許可可能性は本カードでは判断しない。

## common_user_phrases

- 留学生 开公司 资格外活动
- 家族滞在 开公司 雇人
- 副业 开法人 经营管理
- 资格外活动 租办公室 雇员工
- 個人事業主 家族滞在 许可
- 新法人設立 経営管理 変更

## must_say

- 新法人設立、従業員雇用、事業所設置等は経営・管理への変更確認。
- 資格外活動許可だけで処理できると断定しない。

## must_not_say

- 留学/家族滞在でも资格外活动许可拿到就能开公司雇人。
- 个体事业全部都只要28小时内即可。

## qa_cases

### QA-1

**user**: 家族滞在想开公司雇人，用资格外活动许可可以吗？

**must_have**:

- 新法人/雇人/事务所通常要确认经营管理变更
- 不能仅按28小时回答

**must_not_have**:

- 28小时内可以开公司雇人

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-030A; original C3-030 graduation/withdrawal router remains held |
