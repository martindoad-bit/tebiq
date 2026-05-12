---
fact_id: organization-notification-dual-work-long-term-second-organization
title: 所属機関届出 — 長期の二重契約では別機関への移籍届出が必要になる場合
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
citation_label: "二重契約と所属機関届出"
citation_summary: "ISA Q&A は、現在の会社で働きながら別会社で3日間働く場合は届出不要、長期間働いて所属機関が2か所以上になる場合は別会社への移籍届出が必要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-040
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q14-Q15"
  claim_type: notification_trigger
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "資格外活動許可の要否"
    - "副業の在留資格該当性"
  deep_water_candidate: true
applies_when:
  - "用户问双份工作、副业、长期在另一家公司工作是否要所属机构届出"
does_not_cover:
  - "副业本身是否合法或是否需要资格外活动许可"
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
  - short_second_company_work_no_notification
  - long_term_second_organization_notification_required
ai_inferred_fields: []
needs_review_flags:
  - id: side_work_permission_separate
    reason: "Whether the second work is permitted under the current status or needs permission is separate from organization notification."
evidence_points:
  - claim: "ISA explains that working for another company for three days while continuing the current company does not require notification, but long-term work that results in two or more institutions requires notification as a transfer to another company."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q14-Q15"
    display_label: "二重契約：短期と長期で届出要否が分かれる"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 長期の二重契約では別機関への移籍届出が必要になる場合

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

現在の会社で働きながら別会社で3日間働く場合は所属機関届出は不要。一方、別会社でも長期間働き、所属機関が2か所以上になる場合は、別会社への移籍届出が必要と説明されている。

## exceptions_or_transition

- 副業や二重契約が在留資格上許されるか、資格外活動許可が必要かは別論点。
- 長期間かどうか、所属機関が2か所以上になるかを確認する。

## common_user_phrases

- 副業 別会社 長期間 所属機関届出
- 二重契約 入管 届出
- 別会社 3日だけ 働く 届出
- ダブルワーク 所属機関 14日
- 技人国 副業 14日届出
- 別会社でも働く 移籍届出

## must_say

- 3日間程度の別会社勤務は届出不要と説明されている。
- 長期で所属機関が2か所以上になる場合は届出が必要。
- 副業の可否は別に確認する。

## must_not_say

- 副業ならすべて届出不要。
- 14日届出を出せば副業自体が必ず許される。

## qa_cases

### QA-1

**user**: 技人国で本業を続けながら別会社でも長期で働きます。14日届出はいりますか？

**must_have**:

- 所属機関が2か所以上になる場合は届出
- 副業の在留資格上の可否は別確認

**must_not_have**:

- 届出だけで副業許可になる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-040 |
