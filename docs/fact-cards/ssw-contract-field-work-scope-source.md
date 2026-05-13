---
fact_id: ssw-contract-field-work-scope-source
title: "特定技能雇用契約 — 分野に属する技能業務であること"
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
citation_label: "特定技能雇用契約: 分野業務"
citation_summary: "特定技能雇用契約の基準省令は、特定技能の分野に属する技能を要する業務に外国人を従事させる契約であることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-002
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第1号"
  source_locator: "第1条第1項第1号"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別分野の業務範囲"
    - "職務該当性の最終判断"
    - "他分野条件の転用"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で予定業務が分野内かを聞く相談"
direct_fact_fields:
  - ssw_contract_field_work_scope_source
ai_inferred_fields: []
needs_review_flags:
  - id: field_work_scope_detail_review
    reason: "個別業務が分野別要領に入るかは別途確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第1号は、特定技能の分野に属する技能を要する業務に外国人を従事させる契約であることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第1号"
    display_label: "特定技能雇用契約: 分野業務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 分野に属する技能業務であること

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約は、特定技能の分野に属する技能を要する業務に従事させる内容である必要がある。会社が雇いたい業務を自由に特定技能へ載せるものではない。

## exceptions_or_transition

- 個別業務がどの分野に入るかは分野別要領で確認する。

## common_user_phrases

- 特定技能 契約 業務範囲
- 特定技能 分野内 業務
- 特定技能 会社 任意の仕事
- 特定技能 雇用契約 仕事内容
- 特定技能 分野 業務 該当
- 特定技能 店長 事務 分野

## must_say

- 契約内容は特定技能の分野に属する技能業務か確認する。

## must_not_say

- 特定技能なら会社内のどの業務でもよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-002 |
