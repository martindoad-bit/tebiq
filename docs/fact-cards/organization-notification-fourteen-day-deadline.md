---
fact_id: organization-notification-fourteen-day-deadline
title: 所属機関届出 — 届出事由発生日から14日以内
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
citation_label: "所属機関届出は14日以内"
citation_summary: "ISA Q&A は、会社を辞めた、新しい会社に入社した等の届出事由発生日から14日以内に所属機関届出を提出すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-035
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関に関する届出制度全般 Q4"
  claim_type: deadline_window
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "配偶者関係届出"
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问转职、离职、公司变更后几天内届出"
does_not_cover:
  - "超过14日后的处罚或补救判断"
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
  - organization_notification_14_day_deadline
ai_inferred_fields: []
needs_review_flags:
  - id: late_notification_consequence_requires_review
    reason: "A late filing consequence depends on facts and should not be reduced to an automatic result."
evidence_points:
  - claim: "ISA states that organization notification should be submitted within 14 days from the date the notification event occurs, such as leaving a company or joining a new company."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所属機関に関する届出制度全般 Q4"
    display_label: "所属機関届出：事由発生日から14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 届出事由発生日から14日以内

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

所属機関に関する届出は、会社を辞めた、新しい会社に入社した等の届出事由の発生日から14日以内に提出する。

## exceptions_or_transition

- 14日を過ぎた場合も、速やかに届け出るよう案内されている。
- 14日以内に届出をしたことと、変更・更新が許可されることは別問題。

## common_user_phrases

- 転職 14日 届出
- 会社辞めた 14日 入管 届出
- 入社 14日 届出
- 所属機関 届出 期限
- 14日以内 所属機関
- 离职后14天 入管届出

## must_say

- 届出事由発生日から14日以内。
- 期限が絡むため実際の日付を確認する。

## must_not_say

- 14日を過ぎたら何もできない。
- 14日届出を出せば更新や変更が必ず通る。

## qa_cases

### QA-1

**user**: 会社を辞めてから何日以内に入管へ届出しますか？

**must_have**:

- 事由発生日から14日以内
- 過ぎた場合は速やかに届出

**must_not_have**:

- 過ぎたら届出不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-035 |
