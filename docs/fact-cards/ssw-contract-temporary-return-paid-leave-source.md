---
fact_id: ssw-contract-temporary-return-paid-leave-source
title: "特定技能雇用契約 — 一時帰国希望時の有給休暇"
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
citation_label: "特定技能雇用契約: 一時帰国"
citation_summary: "特定技能雇用契約の基準省令は、外国人が一時帰国を希望した場合に、必要な有給休暇を取得させるものとしていることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-006
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第5号"
  source_locator: "第1条第1項第5号"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
  exclusion_scope:
    - "有給休暇日数の個別計算"
    - "一時帰国の時期調整"
    - "労務トラブル"
  deep_water_candidate: false
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で一時帰国や有給休暇を聞く相談"
direct_fact_fields:
  - ssw_contract_temporary_return_paid_leave_source
ai_inferred_fields: []
needs_review_flags:
  - id: paid_leave_detail_review
    reason: "実際の日数、取得時期、労使調整は労務面の確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第5号は、外国人が一時帰国を希望した場合には、必要な有給休暇を取得させるものとしていることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第5号"
    display_label: "特定技能雇用契約: 一時帰国"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 一時帰国希望時の有給休暇

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約では、外国人が一時帰国を希望した場合に、必要な有給休暇を取得させるものとしていることを確認する。

## exceptions_or_transition

- 実際の休暇日数や取得時期は労務面の確認が必要。

## common_user_phrases

- 特定技能 一時帰国 有給
- 特定技能 帰国 休暇
- 特定技能 有給休暇 帰省
- 特定技能 一時帰国 会社拒否
- 特定技能 母国に帰る 休み
- 特定技能 paid leave home country

## must_say

- 一時帰国希望時の有給休暇取得が契約基準に含まれる。

## must_not_say

- 特定技能外国人は一時帰国の有給休暇を取れない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-006 |
