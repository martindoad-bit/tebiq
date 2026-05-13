---
fact_id: ssw-dispatch-organization-criteria-source
title: "特定技能 — 派遣元・派遣先には追加確認がある"
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
citation_label: "特定技能: 派遣機関"
citation_summary: "省令は、外国人を労働者派遣等の対象とする機関について、分野を所管する関係行政機関の長と協議の上で適当と認められることなど、追加の基準を置いている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-014
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第9号"
  source_locator: "第2条第1項第9号"
  claim_type: dispatch_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "派遣可能分野の最終判断"
    - "派遣元・派遣先の個別適格性"
    - "農業分野の特例該当性"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で派遣会社や派遣先の条件を聞く相談"
direct_fact_fields:
  - ssw_dispatch_organization_criteria_source
ai_inferred_fields: []
needs_review_flags:
  - id: dispatch_organization_detail_review
    reason: "派遣可能分野、派遣元・派遣先の条件、農業特例は分野別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第9号は、外国人を労働者派遣等の対象とする機関について、分野を所管する関係行政機関の長と協議の上で適当と認められることなどを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第9号"
    display_label: "特定技能: 派遣機関"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 派遣元・派遣先には追加確認がある

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能で労働者派遣等を扱う場合、派遣元・派遣先には追加の基準がある。派遣会社なら何でもよいとは扱わない。

## exceptions_or_transition

- 派遣可能分野や具体的な派遣元・派遣先の適格性は個別確認が必要。

## common_user_phrases

- 特定技能 派遣会社 条件
- 特定技能 派遣元 基準
- 特定技能 派遣先 条件
- 特定技能 農業 派遣 会社
- 特定技能 漁業 派遣
- 特定技能 派遣なら何でもいい
- 特定技能 介護 外食 派遣

## must_say

- 派遣扱いには派遣元・派遣先側の追加確認がある。

## must_not_say

- どの派遣会社でも特定技能を派遣できる。
- 特定技能なら全分野で派遣できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-014 |
