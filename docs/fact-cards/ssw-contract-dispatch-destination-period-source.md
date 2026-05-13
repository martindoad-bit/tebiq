---
fact_id: ssw-contract-dispatch-destination-period-source
title: "特定技能雇用契約 — 派遣時は派遣先と期間を契約で定める"
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
citation_label: "特定技能雇用契約: 派遣先と期間"
citation_summary: "特定技能雇用契約の基準省令は、外国人を労働者派遣等の対象とする場合、派遣先となる機関の氏名又は名称・住所と派遣期間が定められていることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-007
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第6号"
  source_locator: "第1条第1項第6号"
  claim_type: dispatch_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "派遣が認められる分野"
    - "派遣元・派遣先の適格性"
    - "偽装請負・偽装派遣判断"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の派遣契約で派遣先や期間が必要かを聞く相談"
direct_fact_fields:
  - ssw_contract_dispatch_destination_period_source
ai_inferred_fields: []
needs_review_flags:
  - id: dispatch_field_eligibility_review
    reason: "派遣が認められる分野・派遣元・派遣先の適格性は別途確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第6号は、外国人を労働者派遣等の対象とする場合、派遣先となる機関の氏名又は名称・住所と派遣期間が定められていることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第6号"
    display_label: "特定技能雇用契約: 派遣先と期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 派遣時は派遣先と期間を契約で定める

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能で労働者派遣等の対象とする場合、派遣先となる機関の氏名又は名称、住所、派遣期間を契約で定める必要がある。

## exceptions_or_transition

- このカードは、派遣が認められる分野や派遣元・派遣先の適格性を判断しない。

## common_user_phrases

- 特定技能 派遣先 期間
- 特定技能 派遣契約 書くこと
- 特定技能 派遣先 決まってない
- 特定技能 派遣 労働者派遣
- 特定技能 派遣先 住所
- 特定技能 派遣期間

## must_say

- 派遣扱いでは派遣先と派遣期間を契約で確認する。

## must_not_say

- 特定技能の派遣先は後から自由に決めればよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-007 |
