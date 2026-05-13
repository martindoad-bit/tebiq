---
fact_id: ssw-organization-workers-comp-insurance-source
title: "特定技能所属機関 — 労災保険関係の措置"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能所属機関: 労災保険"
citation_summary: "省令は、事業に関する労働者災害補償保険の保険関係成立届出その他これに類する措置を講じていることを所属機関の基準としている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-023
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第10号"
  source_locator: "第2条第1項第10号"
  claim_type: receiving_organization_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "労災保険の加入義務の個別判断"
    - "労災事故対応"
    - "労務保険手続の実務"
  deep_water_candidate: false
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能所属機関の労災保険措置を聞く相談"
direct_fact_fields:
  - ssw_organization_workers_comp_insurance_source
ai_inferred_fields: []
needs_review_flags:
  - id: workers_comp_detail_review
    reason: "労災保険成立届出や類似措置の個別状況は労務確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第10号は、事業に関する労働者災害補償保険の保険関係成立届出その他これに類する措置を講じていることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第10号"
    display_label: "特定技能所属機関: 労災保険"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能所属機関 — 労災保険関係の措置

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関について、労働者災害補償保険の保険関係成立届出その他これに類する措置を講じていることを確認する。

## exceptions_or_transition

- 労災保険の具体的手続や事故対応は労務面で確認する。

## common_user_phrases

- 特定技能 労災保険
- 特定技能 会社 労災
- 特定技能 労働者災害補償保険
- 特定技能 受入機関 労災加入
- 特定技能 労災 未加入
- 特定技能 workers compensation

## must_say

- 労災保険関係の成立届出等の措置も所属機関側の確認点になる。

## must_not_say

- 特定技能では労災保険は関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-023 |
