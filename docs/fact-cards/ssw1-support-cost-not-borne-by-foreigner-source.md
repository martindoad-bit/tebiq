---
fact_id: ssw1-support-cost-not-borne-by-foreigner-source
title: "特定技能1号 — 支援費用を本人に負担させない"
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
citation_label: "特定技能1号: 支援費用"
citation_summary: "省令は、特定技能1号の活動を行おうとする外国人と契約する機関について、1号特定技能外国人支援に要する費用を直接又は間接に本人に負担させないことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-013
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第8号"
  source_locator: "第2条第1項第8号"
  claim_type: support_cost_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "何が支援費用に当たるか"
    - "給与控除や寮費等の個別判断"
    - "登録支援機関との費用契約"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の支援費用や登録支援機関費用を本人負担にできるかを聞く相談"
direct_fact_fields:
  - ssw1_support_cost_not_borne_by_foreigner_source
ai_inferred_fields: []
needs_review_flags:
  - id: support_cost_scope_review
    reason: "支援費用、寮費、実費、控除、委託費の切り分けは個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第8号は、1号特定技能外国人支援に要する費用を直接又は間接に外国人に負担させないことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第8号"
    display_label: "特定技能1号: 支援費用"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 支援費用を本人に負担させない

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能1号の支援に要する費用は、直接又は間接に本人に負担させないことを確認する。

## exceptions_or_transition

- 支援費用と寮費・実費・通常控除の切り分けは個別確認が必要。

## common_user_phrases

- 特定技能 支援費用 本人負担
- 登録支援機関 費用 給料天引き
- 特定技能 支援料 外国人
- 特定技能 サポート費用
- 特定技能 支援 委託費
- 特定技能 support fee worker pay

## must_say

- 1号支援費用を本人に直接又は間接に負担させないことを確認する。

## must_not_say

- 登録支援機関の費用は本人給与から天引きしてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-013 |
