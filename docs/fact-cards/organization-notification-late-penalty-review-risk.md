---
fact_id: organization-notification-late-penalty-review-risk
title: 所属機関届出 — 未届出・虚偽届出には罰則と審査上の不利益リスク
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
citation_label: "所属機関届出漏れのリスク"
citation_summary: "ISA Q&A は、所属機関届出の未届出や虚偽届出に罰則規定があり、在留諸申請で不利になる場合があると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-036
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関に関する届出制度全般 Q5, Q7"
  claim_type: consequence_boundary
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "自動取消判断"
    - "刑罰の個別成立判断"
  deep_water_candidate: true
applies_when:
  - "用户问14天届出忘了会怎样"
does_not_cover:
  - "具体个案是否会处罚、取消、或不许可"
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
  - organization_notification_late_filing_request
  - organization_notification_penalty_review_risk
ai_inferred_fields: []
needs_review_flags:
  - id: late_notification_individual_consequence
    reason: "The source says penalties are provided and applications may be disadvantaged, but does not determine the result in a specific case."
evidence_points:
  - claim: "ISA asks people who have not filed an organization notification to file promptly, and explains that non-filing or false notification is subject to penalty provisions and may be disadvantageous in residence applications."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所属機関に関する届出制度全般 Q5, Q7"
    display_label: "所属機関届出：未届出・虚偽届出のリスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 未届出・虚偽届出には罰則と審査上の不利益リスク

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

所属機関届出をしていないことが判明した場合は、速やかに届け出るよう案内されている。未届出や虚偽届出には罰則規定があり、在留諸申請で不利になる場合もある。

## exceptions_or_transition

- 個別に罰則が適用されるか、更新・変更がどう扱われるかは、このQ&Aだけでは決められない。
- 自動的に在留資格が取り消されるとは書かない。

## common_user_phrases

- 14日届出 忘れた
- 転職届出 過ぎた どうなる
- 所属機関 届出 罰則
- 所属機関 届出 嘘
- 14日届出 更新 不利
- 入管 届出漏れ 续签

## must_say

- 未届出に気づいたら速やかに届出する。
- 未届出や虚偽届出には罰則や審査上の不利益リスクがある。

## must_not_say

- 14日を過ぎたら届出しなくてよい。
- 届出漏れは必ず不許可になる。
- 届出漏れは必ず在留資格取消になる。

## qa_cases

### QA-1

**user**: 転職の14日届出を半年忘れていました。もう出さなくていいですか？

**must_have**:

- 速やかに届出
- 罰則や審査上不利の可能性

**must_not_have**:

- もう不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-036 |
