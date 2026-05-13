---
fact_id: ssw1-support-plan-partial-delegation-scope-source
title: "特定技能1号 — 支援の一部委託は範囲を明示"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能1号: 一部委託"
citation_summary: "省令は、1号特定技能外国人支援の一部を他の者に委託する場合、その委託範囲が明示されていることを支援計画の基準としている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-019
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第4条第4号"
  source_locator: "第4条第4号"
  claim_type: support_plan_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "委託範囲の十分性"
    - "委託先の適格性"
    - "支援責任の分担"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号支援を一部だけ外部委託できるかを聞く相談"
direct_fact_fields:
  - ssw1_support_plan_partial_delegation_scope_source
ai_inferred_fields: []
needs_review_flags:
  - id: partial_delegation_detail_review
    reason: "一部委託の範囲、委託先、責任分担は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第4条第4号は、1号特定技能外国人支援の一部を契約により他の者に委託する場合、その委託範囲が明示されていることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第4条第4号"
    display_label: "特定技能1号: 一部委託範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 支援の一部委託は範囲を明示

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

1号特定技能外国人支援の一部を外部に委託する場合は、その委託範囲を明示する必要がある。

## exceptions_or_transition

- 委託範囲、委託先、責任分担は個別確認が必要。

## common_user_phrases

- 特定技能 支援 一部委託
- 特定技能 支援 委託範囲
- 登録支援機関 一部だけ
- 特定技能 支援 外注
- 特定技能 自社支援 一部委託
- 特定技能 support partial outsourcing

## must_say

- 一部委託では委託範囲を明示する。

## must_not_say

- 支援の一部委託は口約束で足りる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-019 |
