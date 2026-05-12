---
fact_id: qualification-outside-activity-individual-permission-router
title: 資格外活動許可 — 包括許可範囲外は個別許可を確認する
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
citation_label: "包括許可範囲外は個別許可を確認"
citation_summary: "ISA は、包括許可の範囲外の活動や、就労資格者が他の就労資格に該当する活動を行う場合には、個々に許可される個別許可の枠組みを説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-026
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動許可について：個別許可"
  claim_type: routing_boundary
  applicable_statuses:
    - "table1"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "包括許可で一律処理"
  deep_water_candidate: true
applies_when:
  - "用户问业务委托、インターン、资格内外复杂副业"
  - "用户问28小时外是否可个别许可"
does_not_cover:
  - "具体个别许可是否会批"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-general-principles
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-student-qoa
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    title: 「留学」の在留資格に係る資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - individual_permission_for_activity_outside_comprehensive_permission_scope
ai_inferred_fields: []
needs_review_flags:
  - id: individual_permission_approval_probability
    reason: "This card routes to individual-permission analysis; it does not decide approval."
evidence_points:
  - claim: "ISA explains individual permission for activities outside the comprehensive-permission scope and for work-status holders conducting activities corresponding to another work status."
    source_title: "資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2 資格外活動許可の種類; 個別許可"
    display_label: "資格外活動：包括許可範囲外は個別許可を確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 包括許可範囲外は個別許可を確認する

## current_date_logic

Checked against current ISA pages on 2026-05-12.

## current_effective_fact

包括許可の範囲外の活動や、就労資格を有する人が他の就労資格に該当する活動を行う場合は、活動先や事業内容などを定めて個々に許可される個別許可の確認対象になる。

## exceptions_or_transition

- 個別許可が必ず認められるとは言わない。
- 活動内容が現在資格内か、変更が必要かもあわせて確認する。

## common_user_phrases

- 资格外活动 个别许可
- 包括许可范围外
- 28小时超过 インターン
- 業務委託 资格外活动
- 技人国 副业 個別許可
- 个人事业主 外卖 配达 许可

## must_say

- 包括許可の範囲外は個別許可を確認する。
- 個別許可でも一般原則や活動内容の確認が必要。

## must_not_say

- 包括许可解决所有副业。
- 个别许可一定会批。

## qa_cases

### QA-1

**user**: 留学生做業務委託，28小时内也可以只用普通打工许可吗？

**must_have**:

- 包括许可范围外可能要个别许可
- 需看工时客观确认和活动内容

**must_not_have**:

- 普通许可一定够

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-026 |
