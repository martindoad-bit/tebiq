---
fact_id: digital-nomad-domestic-employment-qoa-exclusion
title: "デジタルノマド — 国内雇用と資格外活動の除外"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "デジタルノマド就労除外"
citation_summary: "ISA は、告示53号のデジタルノマドについて、資格外活動許可は原則認められず、日本国内の公私機関との雇用契約等に基づく就労活動は不可と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-002
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示53号"
  source_locator: "デジタルノマド / 注意書き"
  claim_type: exclusion_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "日本企業との雇用"
    - "資格外活動許可"
    - "国内顧客向け役務提供"
  deep_water_candidate: true
official_sources:
  - id: isa-digital-nomad
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html
    title: 在留資格「特定活動」（デジタルノマド及びその配偶者・子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "デジタルノマドで日本企業の仕事をしたい相談"
direct_fact_fields:
  - digital_nomad_domestic_employment_qoa_exclusion
ai_inferred_fields: []
needs_review_flags:
  - id: digital_nomad_domestic_service_boundary
    reason: "国内向け役務提供や日本側契約が混じる場合は活動範囲確認が必要。"
evidence_points:
  - claim: "ISA は、デジタルノマドについて資格外活動許可は原則認められず、日本国内機関との雇用契約等に基づく就労活動は不可と説明している。"
    source_title: "在留資格「特定活動」（デジタルノマド及びその配偶者・子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "デジタルノマド / 注意書き"
    display_label: "デジタルノマド: 国内就労は別確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# デジタルノマド — 国内雇用と資格外活動の除外

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

告示53号のデジタルノマドでは、資格外活動許可は原則認められず、日本国内機関との雇用契約等に基づく就労活動は不可とされている。

## exceptions_or_transition

- 外国法人との契約、外国にある者への有償提供、国内顧客の有無を分けて確認する。

## common_user_phrases

- デジタルノマド 日本企業 就職
- デジタルノマド 日本会社 仕事
- デジタルノマド 資格外活動
- 日本企業と契約 デジタルノマド
- 数字游民 日本公司 工作

## must_say

- 日本国内機関との雇用就労はデジタルノマドの範囲から分けて確認する。

## must_not_say

- デジタルノマドなら日本企業でも自由に働ける。
- 資格外活動許可で補えばよいと決めつける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-002 |
