---
fact_id: organization-notification-renewal-change-permit-distinction
title: 所属機関届出 — 転職時の更新許可と変更許可で要否が分かれる
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
citation_label: "更新許可と変更許可で届出要否が違う"
citation_summary: "ISA Q&A は、転職と同時に在留期間更新許可を受けても転職届出は必要、在留資格変更許可を受けている場合は転職届出は不要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-038
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q9-Q10"
  claim_type: procedure_disambiguation
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - renewal
    - change
    - notification
  exclusion_scope:
    - "転職先活動の在留資格該当性判断"
  deep_water_candidate: true
applies_when:
  - "用户问转职时续签/变更通过后是否还要14天届出"
does_not_cover:
  - "转职前是否应申请就労資格証明書"
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
  - 在留期間更新許可申請
  - 在留資格変更許可申請
direct_fact_fields:
  - organization_notification_required_even_with_renewal
  - organization_notification_not_required_when_change_permit_granted
ai_inferred_fields: []
needs_review_flags:
  - id: job_change_strategy_requires_review
    reason: "Whether renewal, change, or another confirmation route is appropriate depends on the new activity and status."
evidence_points:
  - claim: "ISA explains that a job-change notification is required even if a period renewal permit was granted at the same time as the job change, but it is not required if a status change permit has been granted."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q9-Q10"
    display_label: "転職時：更新許可と変更許可で届出要否が分かれる"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 転職時の更新許可と変更許可で要否が分かれる

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

転職と同時に在留期間更新許可を受けた場合でも、転職に係る所属機関届出は必要。転職と同時に在留資格変更許可を受けている場合は、転職に係る所属機関届出は不要。

## exceptions_or_transition

- 更新と変更は別手続であり、どちらが必要かは新しい活動内容によって変わる。
- 届出不要という説明は、在留資格変更許可を受けている場合についてのもの。

## common_user_phrases

- 転職 更新許可 14日届出 必要
- 転職 変更許可 14日届出 不要
- 在留期間更新 転職 届出
- 在留資格変更 転職 届出
- 更新と同時に転職 届出
- 变更签证通过 还要14天届出吗

## must_say

- 更新許可を受けても転職届出は必要。
- 変更許可を受けている場合は転職届出は不要と説明されている。

## must_not_say

- 更新も変更も同じ扱い。
- 転職時に許可を受けていれば常に届出不要。

## qa_cases

### QA-1

**user**: 転職と同時に更新許可が出ました。14日届出はいりますか？

**must_have**:

- 更新許可でも転職届出は必要
- 変更許可の場合とは区別

**must_not_have**:

- 許可が出たから届出不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-038 |
