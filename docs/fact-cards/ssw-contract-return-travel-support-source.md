---
fact_id: ssw-contract-return-travel-support-source
title: "特定技能雇用契約 — 帰国旅費を負担できない場合の措置"
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
citation_label: "特定技能雇用契約: 帰国旅費"
citation_summary: "特定技能雇用契約の基準省令は、外国人が契約終了後の帰国旅費を負担できないとき、所属機関が旅費負担と円滑な出国のための措置を講じることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-008
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第2項第1号"
  source_locator: "第1条第2項第1号"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
  exclusion_scope:
    - "帰国旅費負担の個別発生時期"
    - "自主退職・解雇時の費用分担"
    - "帰国しない場合の在留手続"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能契約終了時の帰国費用を聞く相談"
direct_fact_fields:
  - ssw_contract_return_travel_support_source
ai_inferred_fields: []
needs_review_flags:
  - id: return_travel_cost_detail_review
    reason: "契約終了理由、本人資力、帰国予定、在留変更予定により個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第2項第1号は、外国人が契約終了後の帰国旅費を負担できないとき、所属機関が旅費を負担し、円滑な出国のための必要な措置を講ずることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第2項第1号"
    display_label: "特定技能雇用契約: 帰国旅費"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 帰国旅費を負担できない場合の措置

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

契約終了後、外国人が帰国旅費を負担できないときは、特定技能所属機関が旅費を負担し、円滑な出国のために必要な措置を講じる内容を確認する。

## exceptions_or_transition

- 契約終了理由、帰国予定、在留資格変更予定がある場合は個別確認が必要。

## common_user_phrases

- 特定技能 帰国費用 会社
- 特定技能 契約終了 帰国旅費
- 特定技能 退職 帰国 チケット
- 特定技能 帰国できない 費用
- 特定技能 雇用契約 帰国
- 特定技能 会社が帰国費用

## must_say

- 帰国旅費を負担できない場合の所属機関側措置を確認する。

## must_not_say

- 契約終了後の帰国費用は常に本人だけの問題。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-008 |
