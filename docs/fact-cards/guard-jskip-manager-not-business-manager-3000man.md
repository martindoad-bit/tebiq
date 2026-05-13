---
fact_id: guard-jskip-manager-not-business-manager-3000man
title: "J-Skip経営管理型 — 経営管理3000万円要件と混同しない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "J-Skip/経営管理: 金額基準の混同防止"
citation_summary: "ISA は J-Skip の高度経営・管理活動を職歴・年収要件で説明し、経営管理改正ページは3000万円以上の資本金等を別に説明している。金額だけで同一視しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-010
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "特別高度人材制度 / 経営・管理上陸基準省令等改正"
  source_locator: "J-Skip要件 / 経営管理改正の資本金等"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "経営・管理"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "J-Skip高度経営・管理活動の該当性"
    - "経営管理の資本金等充足判断"
    - "経営実態・事業計画の評価"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-business-manager-2025
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "J-Skipの年収要件と経営管理の資本金等要件を混同している相談"
direct_fact_fields:
  - jskip_manager_not_business_manager_3000man
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_business_manager_cross_review
    reason: "高度専門職1号ハ、経営管理、J-Skipの関係は活動内容と申請類型で確認する必要がある。"
evidence_points:
  - claim: "ISA は J-Skip の高度経営・管理活動について、事業の経営又は管理に係る5年以上の実務経験と年収4000万円以上を示している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "J-Skip要件"
    display_label: "J-Skip: 高度経営・管理活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の経営管理改正ページは、経営管理の基準として3000万円以上の資本金等が必要になると説明している。"
    source_title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "資本金の額等"
    display_label: "経営管理: 3000万円以上の資本金等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip経営管理型 — 経営管理3000万円要件と混同しない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

J-Skip の高度経営・管理活動の職歴・年収要件と、経営管理の3000万円以上の資本金等要件は、金額が出てくる別制度として切り分ける。

## exceptions_or_transition

- このカードは、J-Skip高度経営・管理活動、経営管理、又は高度専門職1号ハのどれに該当するかを判断しない。

## common_user_phrases

- J-Skip 経営管理 3000万
- J-Skip 4000万 3000万
- 特別高度人材 経営管理 資本金
- 高度専門職1号ハ 経営管理 J-Skip
- J-Skip 创业 3000万
- 经营管理 J-Skip 年收

## must_say

- J-Skipの年収・職歴要件と経営管理の資本金等要件は分ける。
- 金額だけで同じ制度と扱わない。

## must_not_say

- J-Skipは経営管理の3000万円要件だけ満たせばよい。
- 経営管理の3000万円要件はJ-Skipの年収4000万円要件と同じ意味である。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-010 |
