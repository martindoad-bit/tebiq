---
fact_id: ssw-contract-remuneration-japanese-equal-source
title: "特定技能雇用契約 — 報酬は日本人と同等以上"
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
citation_label: "特定技能雇用契約: 報酬"
citation_summary: "特定技能雇用契約の基準省令は、外国人に対する報酬額が、日本人が従事する場合の報酬額と同等以上であることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-004
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第3号"
  source_locator: "第1条第1項第3号"
  claim_type: remuneration_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "具体的な適正賃金額"
    - "同等以上の比較対象"
    - "控除・手当・残業代の判断"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の給与水準を聞く相談"
direct_fact_fields:
  - ssw_contract_remuneration_japanese_equal_source
ai_inferred_fields: []
needs_review_flags:
  - id: remuneration_comparison_review
    reason: "同等以上の比較対象、賃金項目、控除、最低賃金は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第3号は、外国人に対する報酬額が、日本人が従事する場合の報酬額と同等以上であることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第3号"
    display_label: "特定技能雇用契約: 報酬"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 報酬は日本人と同等以上

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約では、外国人に対する報酬が、日本人が同じように従事する場合の報酬と同等以上であることを確認する。

## exceptions_or_transition

- 比較対象、手当、控除、残業代、最低賃金は個別確認が必要。

## common_user_phrases

- 特定技能 給料 日本人 同等
- 特定技能 報酬 同等以上
- 特定技能 最低賃金
- 特定技能 給料 低い
- 特定技能 日本人より安い
- 特定技能 salary equal Japanese

## must_say

- 報酬は日本人が従事する場合と同等以上か確認する。

## must_not_say

- 外国人だから日本人より低い報酬でよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-004 |
