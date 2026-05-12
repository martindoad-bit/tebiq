---
fact_id: organization-notification-event-types
title: 所属機関届出 — 消滅・名称変更・離脱・移籍が主な届出事由
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "所属機関届出の主な事由"
citation_summary: "ISA Q&A は、所属機関の消滅・名称所在地変更、機関からの離脱、新たな機関への移籍、離脱と移籍を届出事由として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-033
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関に関する届出制度全般 Q1"
  claim_type: notification_trigger
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "配偶者関係届出"
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问什么情况要做所属机构届出"
does_not_cover:
  - "组织重组后的具体法人连续性判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関に関する届出
direct_fact_fields:
  - organization_notification_event_types
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA identifies institution disappearance, name or location change, leaving the current institution, transfer to a new institution, and combined leaving/transfer as organization notification events."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所属機関に関する届出制度全般 Q1"
    display_label: "所属機関届出：消滅・名称変更・離脱・移籍"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 消滅・名称変更・離脱・移籍が主な届出事由

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

所属機関に関する届出は、現在の機関の消滅、名称・所在地変更、現在の機関からの離脱、新たな機関への移籍、離脱と移籍があった場合に必要になる。

## exceptions_or_transition

- 在留資格によって、活動機関を届け出るか契約機関を届け出るかが異なる。
- 会社再編などでは、所属が実際に変わったかどうかの確認が必要。

## common_user_phrases

- 所属機関 届出 どんな時
- 会社辞めた 届出 入管
- 新しい会社 入社 14日 届出
- 会社名 変わった 所属機関 届出
- 会社移転 所属機関 届出
- 離脱 移籍 届出

## must_say

- 主な届出事由は消滅、名称・所在地変更、離脱、移籍。
- どの様式かは事由により変わる。

## must_not_say

- 会社に関係する変化は全部同じ届出。
- 届出の対象外でも在留上の確認は不要。

## qa_cases

### QA-1

**user**: 会社を辞めて新しい会社に入ったら何の届出ですか？

**must_have**:

- 離脱と移籍が届出事由
- 14日以内の期限も確認

**must_not_have**:

- 何も不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-033 |
