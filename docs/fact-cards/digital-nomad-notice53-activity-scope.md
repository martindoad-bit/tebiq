---
fact_id: digital-nomad-notice53-activity-scope
title: "デジタルノマド — 告示53号の活動範囲"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "デジタルノマド告示53号"
citation_summary: "ISA は、特定活動告示53号のデジタルノマドについて、日本に6月を超えない期間滞在して国際的なリモートワーク等を行う活動として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示53号"
  source_locator: "デジタルノマド / 該当する活動"
  claim_type: activity_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "対象国・地域"
    - "年収・保険要件"
    - "日本国内雇用"
  deep_water_candidate: true
official_sources:
  - id: isa-digital-nomad
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html
    title: 在留資格「特定活動」（デジタルノマド及びその配偶者・子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "デジタルノマド特定活動の活動範囲確認"
direct_fact_fields:
  - digital_nomad_notice53_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: digital_nomad_work_scope_individual_check
    reason: "具体的なリモートワーク内容が告示53号の活動範囲に収まるかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、告示53号の活動として、日本に6月を超えない期間滞在して国際的なリモートワーク等を行う場合を掲げている。"
    source_title: "在留資格「特定活動」（デジタルノマド及びその配偶者・子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "デジタルノマド / 該当する活動"
    display_label: "デジタルノマド: 告示53号の活動範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# デジタルノマド — 告示53号の活動範囲

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

デジタルノマドは、告示53号の特定活動として、日本で6月を超えない期間、国際的なリモートワーク等を行う活動として説明されている。

## exceptions_or_transition

- 具体的な業務形態、契約相手、提供先は別カードで確認する。
- 日本国内の通常就労資格と混同しない。

## common_user_phrases

- デジタルノマド 特定活動 告示53号
- デジタルノマド 日本 リモートワーク
- digital nomad Japan visa
- 日本で海外の仕事 リモート
- 数字游民 日本 远程工作

## must_say

- デジタルノマドは告示53号の特定活動として活動範囲を確認する。

## must_not_say

- リモートワークなら誰でも該当すると言う。
- 日本国内の雇用就労と同じ扱いにする。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-001 |
