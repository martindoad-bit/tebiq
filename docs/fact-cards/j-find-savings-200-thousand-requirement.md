---
fact_id: j-find-savings-200-thousand-requirement
title: "J-Find — 滞在当初の生計維持費20万円"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "J-Find 生計維持費"
citation_summary: "ISA は、J-Find の生計維持費について、申請時点で申請人の預貯金額が日本円換算で20万円以上あることと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-008
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材"
  source_locator: "3 生計維持費"
  claim_type: materials_and_eligibility_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "銀行残高資料の適格性"
    - "円換算の時点"
    - "滞在全期間の資金計画"
  deep_water_candidate: false
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Findの預貯金・生計維持費確認"
direct_fact_fields:
  - j_find_savings_200_thousand_requirement
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA は、J-Find の生計維持費として、申請時点で申請人の預貯金額が日本円換算で20万円以上あることを示している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "3 生計維持費"
    display_label: "J-Find: 生計維持費20万円"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# J-Find — 滞在当初の生計維持費20万円

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

J-Find では、滞在当初の生計維持費として、申請時点で申請人名義の預貯金額が日本円換算20万円以上あることが示されている。

## exceptions_or_transition

- 残高資料の形式や円換算は提出時に確認する。

## common_user_phrases

- J-Find 20万円
- J-Find 預貯金
- 未来創造人材 生計維持費
- J-Find 銀行残高
- J-Find 存款 20万日元

## must_say

- 生計維持費は申請時点の預貯金額として確認する。

## must_not_say

- 資金証明は不要だと言う。
- 20万円があれば他要件は不要だと言う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-008 |
