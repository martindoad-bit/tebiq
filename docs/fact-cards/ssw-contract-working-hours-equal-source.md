---
fact_id: ssw-contract-working-hours-equal-source
title: "特定技能雇用契約 — 所定労働時間は通常労働者と同等"
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
citation_label: "特定技能雇用契約: 所定労働時間"
citation_summary: "特定技能雇用契約の基準省令は、外国人の所定労働時間が、特定技能所属機関に雇用される通常の労働者の所定労働時間と同等であることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-003
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第2号"
  source_locator: "第1条第1項第2号"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "短時間勤務の個別可否"
    - "労働時間管理の適法性"
    - "副業・兼業"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能でパート・短時間雇用ができるかを聞く相談"
direct_fact_fields:
  - ssw_contract_working_hours_equal_source
ai_inferred_fields: []
needs_review_flags:
  - id: working_hours_detail_review
    reason: "具体的な労働時間、短時間勤務、休業、兼業は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第2号は、外国人の所定労働時間が、特定技能所属機関に雇用される通常の労働者の所定労働時間と同等であることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第2号"
    display_label: "特定技能雇用契約: 所定労働時間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 所定労働時間は通常労働者と同等

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約では、外国人の所定労働時間が、所属機関の通常の労働者の所定労働時間と同等であることを確認する。

## exceptions_or_transition

- 短時間勤務、休業、副業、兼業はこのカードだけで判断しない。

## common_user_phrases

- 特定技能 パート 勤務
- 特定技能 短時間
- 特定技能 所定労働時間
- 特定技能 フルタイム 必要
- 特定技能 アルバイト契約
- 特定技能 週20時間

## must_say

- 所定労働時間は通常労働者と同等か確認する。

## must_not_say

- 特定技能は自由に短時間パート契約にできる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-003 |
