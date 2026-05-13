---
fact_id: ssw-org-labor-social-tax-compliance-source
title: "特定技能所属機関 — 労働・社会保険・租税法令の遵守"
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
citation_label: "特定技能所属機関: 法令遵守"
citation_summary: "特定技能雇用契約の相手方となる機関の基準として、省令は労働、社会保険及び租税に関する法令の規定を遵守していることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-009
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第1号"
  source_locator: "第2条第1項第1号"
  claim_type: receiving_organization_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別法令違反の判断"
    - "滞納・未加入の是正評価"
    - "受入機関適格性の最終判断"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の受入会社が社会保険や税務を守っている必要があるかを聞く相談"
direct_fact_fields:
  - ssw_org_labor_social_tax_compliance_source
ai_inferred_fields: []
needs_review_flags:
  - id: org_compliance_detail_review
    reason: "労働・社会保険・税務の違反、滞納、是正状況は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第1号は、特定技能雇用契約の相手方となる機関について、労働、社会保険及び租税に関する法令の規定を遵守していることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第1号"
    display_label: "特定技能所属機関: 法令遵守"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能所属機関 — 労働・社会保険・租税法令の遵守

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関は、労働、社会保険、租税に関する法令を遵守していることを確認する。会社側の状態も審査上の確認対象になる。

## exceptions_or_transition

- 滞納、未加入、違反歴、是正状況は個別確認が必要。

## common_user_phrases

- 特定技能 会社 社会保険
- 特定技能 受入機関 税金
- 特定技能 会社 労働法 違反
- 特定技能 所属機関 法令遵守
- 特定技能 会社 年金 未加入
- 特定技能 受入会社 税金 滞納

## must_say

- 会社側の労働・社会保険・租税法令遵守も確認する。

## must_not_say

- 本人が合格していれば会社側の法令遵守は関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-009 |
