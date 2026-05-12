---
fact_id: organization-notification-future-event-not-accepted
title: 所属機関届出 — 未来日の届出事由では提出できない
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
citation_label: "未来日の所属機関届出は不可"
citation_summary: "ISA Q&A は、来月転職予定など未来日を届出事由発生日とする届出はできず、事実発生後に届け出ると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-037
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関に関する届出制度全般 Q6"
  claim_type: timing_boundary
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "事前相談"
    - "在留資格変更許可申請"
  deep_water_candidate: false
applies_when:
  - "用户问还没转职能不能提前提交14日届出"
does_not_cover:
  - "转职前是否需要就労資格証明書或变更申请"
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
  - future_event_notification_not_accepted
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that a notification using a future date as the notification event date cannot be filed; notification is made after the transfer or other event occurs."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所属機関に関する届出制度全般 Q6"
    display_label: "所属機関届出：事実発生後に提出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 未来日の届出事由では提出できない

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

未来日を届出事由発生日とする所属機関届出はできない。実際に転職等の事実が発生してから届け出る。

## exceptions_or_transition

- 事前に相談することや、必要に応じて別手続を検討することとは別。
- 高度専門職など、転職前に在留資格変更が絡む場合がある。

## common_user_phrases

- 来月転職 先に届出
- 転職前 14日届出
- 所属機関 届出 未来日
- 入社予定 届出 先に出す
- まだ辞めてない 所属機関届出
- 事実発生前 届出

## must_say

- 未来日を届出事由発生日とする届出はできない。
- 実際に事実が発生してから届け出る。

## must_not_say

- 転職予定が決まったらすぐ所属機関届出を出す。
- 未来日でもオンラインなら出せる。

## qa_cases

### QA-1

**user**: 来月転職します。14日届出を先に出せますか？

**must_have**:

- 未来日では提出できない
- 転職の事実発生後に届出

**must_not_have**:

- 先に提出すればよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-037 |
