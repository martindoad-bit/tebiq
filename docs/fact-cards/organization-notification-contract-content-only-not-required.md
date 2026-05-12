---
fact_id: organization-notification-contract-content-only-not-required
title: 所属機関届出 — 所属機関が同じで契約内容だけ変わる場合は不要
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "契約内容変更だけなら所属機関届出は不要"
citation_summary: "ISA Q&A は、所属機関は変わらず契約内容だけ変わった場合、所属機関届出は不要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-039
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q12"
  claim_type: notification_exclusion
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "所属機関自体が変わる場合"
    - "仕事内容が在留資格範囲を外れる場合"
  deep_water_candidate: false
applies_when:
  - "用户问同一公司合同条件变化是否要14日届出"
does_not_cover:
  - "仕事内容変更が在留資格に合うか"
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
  - same_institution_contract_content_change_no_notification
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that if the institution does not change and only the contract terms change, organization notification is not required."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q12"
    display_label: "同じ機関で契約内容だけ変わる場合は届出不要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 所属機関が同じで契約内容だけ変わる場合は不要

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

所属機関が変わらず、契約内容だけが変わった場合、所属機関に関する届出は不要。

## exceptions_or_transition

- 活動機関や契約機関が変わった場合は届出対象になり得る。
- 仕事内容が在留資格の範囲に合うかどうかは別確認。

## common_user_phrases

- 同じ会社 契約内容 変わった 届出
- 給料変わった 所属機関 届出
- 雇用契約 更新 所属機関 届出
- 同じ会社 仕事内容変更 14日届出
- 契約内容だけ変更 入管届出
- 契約機関 変わらない 届出不要

## must_say

- 所属機関が同じで契約内容だけ変わる場合は不要。
- 活動や仕事内容が変わる場合は別途確認する。

## must_not_say

- 契約内容が少しでも変われば必ず届出。
- 仕事内容が大きく変わっても在留資格確認は不要。

## qa_cases

### QA-1

**user**: 同じ会社で給料と契約期間だけ変わりました。14日届出はいりますか？

**must_have**:

- 所属機関が同じで契約内容だけなら不要
- 活動内容の変化は別確認

**must_not_have**:

- 契約変更は全部届出

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-039 |
