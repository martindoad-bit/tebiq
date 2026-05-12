---
fact_id: secondment-dispatch-destination-change-notification-required
title: 所属機関届出 — 出向先・派遣先が変わる場合は届出が必要
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
citation_label: "出向先・派遣先変更の届出"
citation_summary: "ISA Q&A は、他機関への出向や派遣先変更では、離脱と新しい出向先・派遣先への移籍の届出が必要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-041
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q16-Q17"
  claim_type: notification_trigger
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "派遣就労の在留資格該当性"
    - "派遣契約書類"
  deep_water_candidate: true
applies_when:
  - "用户问出向、派遣先变化是否需要所属机构届出"
does_not_cover:
  - "派遣劳动是否本身符合在留资格要求"
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
  - secondment_destination_notification_required
  - dispatch_destination_change_notification_required
ai_inferred_fields: []
needs_review_flags:
  - id: dispatch_status_fit_separate
    reason: "Dispatch work often has separate residence-status fit and document issues."
evidence_points:
  - claim: "ISA explains that secondment to another institution requires notification of leaving the current institution and transfer to the secondment destination; when a dispatch company remains the same but the dispatch destination changes, notification of leaving the former dispatch destination and transfer to the new dispatch destination is required."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q16-Q17"
    display_label: "出向先・派遣先変更：離脱と移籍の届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 出向先・派遣先が変わる場合は届出が必要

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

他の機関に出向する場合は、現在の所属機関からの離脱と出向先への移籍の届出が必要。派遣会社は変わらず派遣先が変わる場合も、従前の派遣先からの離脱と新しい派遣先への移籍の届出が必要。

## exceptions_or_transition

- 派遣就労の在留資格該当性、派遣先確定、派遣契約書類は別途確認する。
- 出向や派遣は実務判断が絡みやすい。

## common_user_phrases

- 出向 所属機関 届出
- 派遣先 変わった 届出
- 派遣会社 同じ 派遣先変更 入管
- 出向先 14日届出
- 派遣 技人国 所属機関
- 従前の派遣先 離脱 新しい派遣先 移籍

## must_say

- 出向先への移籍、派遣先変更は届出が必要と説明されている。
- 派遣就労の在留上の適合性は別確認。

## must_not_say

- 派遣会社が同じなら派遣先変更は届出不要。
- 派遣先届出を出せば在留上の問題はすべて解消。

## qa_cases

### QA-1

**user**: 派遣会社は同じですが派遣先が変わりました。14日届出はいりますか？

**must_have**:

- 派遣先変更は届出が必要
- 従前派遣先からの離脱と新派遣先への移籍

**must_not_have**:

- 派遣元が同じなら不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-041 |
