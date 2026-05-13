---
fact_id: ssw-contract-health-life-status-monitoring-source
title: "特定技能雇用契約 — 健康・生活状況を把握する措置"
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
citation_label: "特定技能雇用契約: 健康・生活状況"
citation_summary: "省令は、特定技能所属機関が外国人の健康状況その他の生活状況を把握するために必要な措置を講ずることを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-021
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第2項第2号"
  source_locator: "第1条第2項第2号"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
  exclusion_scope:
    - "具体的な把握方法"
    - "健康情報の取扱い"
    - "支援計画の実施詳細"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能所属機関が外国人の生活状況を把握する必要があるかを聞く相談"
direct_fact_fields:
  - ssw_contract_health_life_status_monitoring_source
ai_inferred_fields: []
needs_review_flags:
  - id: health_life_monitoring_detail_review
    reason: "健康・生活状況の把握方法と個人情報取扱いは運用要領で確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第2項第2号は、特定技能所属機関が外国人の健康状況その他の生活状況を把握するために必要な措置を講ずることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第2項第2号"
    display_label: "特定技能雇用契約: 健康・生活状況"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 健康・生活状況を把握する措置

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関は、外国人の健康状況その他の生活状況を把握するために必要な措置を講ずることを確認する。

## exceptions_or_transition

- 具体的な把握方法、記録、個人情報の扱いは運用要領で確認する。

## common_user_phrases

- 特定技能 健康状況 把握
- 特定技能 生活状況 確認
- 特定技能 会社 生活確認
- 特定技能 体調 会社
- 特定技能 受入機関 生活状況
- 特定技能 health life monitoring

## must_say

- 所属機関は健康状況や生活状況を把握する措置を確認する。

## must_not_say

- 雇った後の健康・生活状況は特定技能所属機関に関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-021 |
