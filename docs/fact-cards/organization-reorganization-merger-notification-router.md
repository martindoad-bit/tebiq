---
fact_id: organization-reorganization-merger-notification-router
title: 所属機関届出 — 合併・吸収・分割では所属先が変わるかを確認する
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
citation_label: "会社再編と所属機関届出"
citation_summary: "ISA Q&A は、合併・吸収・部署分割などで中長期在留者の所属が新しい会社に移る場合は離脱・移籍届出が必要、所属が変わらない場合は不要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-042
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q20-Q23"
  claim_type: notification_router
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "法人再編の法的効力判断"
    - "雇用契約承継の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问公司合并、吸收、分割、事业让渡时是否要届出"
does_not_cover:
  - "公司法上继承关系的最终判断"
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
  - merger_absorption_split_notification_router
ai_inferred_fields: []
needs_review_flags:
  - id: reorganization_belongs_to_new_company
    reason: "Whether the person's institution has legally changed can require document review."
evidence_points:
  - claim: "ISA explains that mergers, absorptions, and department splits may require notification of institution disappearance and transfer, or leaving and transfer, when the long-term resident's affiliation moves to a new company; if the affiliation does not change, notification is not required."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q20-Q23"
    display_label: "会社再編：所属が新会社に移るかを確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 合併・吸収・分割では所属先が変わるかを確認する

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

会社の合併、吸収、部署分割、事業譲渡などでは、中長期在留者の所属が新しい会社に移る場合は届出が必要になり得る。一方、所属が変わらない場合は届出不要と説明されている。

## exceptions_or_transition

- 実際に所属先が変わったかは、雇用契約、法人再編、配属実態などを確認する。
- 単なる会社名変更、機関消滅、新会社移籍では届出事由が異なる場合がある。

## common_user_phrases

- 会社合併 所属機関届出
- 吸収合併 入管 届出
- 部署分割 新会社 届出
- 事業譲渡 所属機関 14日
- 会社名変わった 合併 入管
- 所属が新しい会社に移る 届出

## must_say

- 会社再編では、本人の所属が新会社に移るかを確認する。
- 所属が変わる場合は届出が必要になり得る。

## must_not_say

- 合併なら常に届出不要。
- 会社名が変わっただけなら常に届出不要。

## qa_cases

### QA-1

**user**: 会社が吸収合併されました。14日届出はいりますか？

**must_have**:

- 所属が新会社に移るか確認
- 移る場合は届出が必要になり得る

**must_not_have**:

- 合併なら一律不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-042 |
