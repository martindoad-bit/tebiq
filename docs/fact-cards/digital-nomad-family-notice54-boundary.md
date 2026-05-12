---
fact_id: digital-nomad-family-notice54-boundary
title: "デジタルノマド家族 — 告示54号の配偶者・子"
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
citation_label: "デジタルノマド家族告示54号"
citation_summary: "ISA は、デジタルノマドの配偶者・子について告示54号として、6月以内・更新不可、資格外活動許可は原則認められない日常的な活動と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-004
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示54号"
  source_locator: "デジタルノマドの配偶者・子"
  claim_type: family_route
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_acquisition
  exclusion_scope:
    - "家族関係証明"
    - "資格外活動許可"
    - "家族の対象国・保険"
  deep_water_candidate: true
official_sources:
  - id: isa-digital-nomad
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html
    title: 在留資格「特定活動」（デジタルノマド及びその配偶者・子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "デジタルノマドの配偶者・子の在留相談"
direct_fact_fields:
  - digital_nomad_family_notice54_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: digital_nomad_family_documents_pending
    reason: "身分関係、保険、家族補償などの提出資料は個別確認が必要。"
evidence_points:
  - claim: "ISA は、デジタルノマドに帯同する配偶者又は子の特定活動を告示54号として説明し、資格外活動許可は原則認められないとしている。"
    source_title: "在留資格「特定活動」（デジタルノマド及びその配偶者・子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "デジタルノマドの配偶者・子"
    display_label: "デジタルノマド家族: 告示54号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# デジタルノマド家族 — 告示54号の配偶者・子

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

デジタルノマドに帯同する配偶者又は子は、告示54号の特定活動として日常的な活動を行うものと説明され、資格外活動許可は原則認められない。

## exceptions_or_transition

- 家族滞在と同じものとして扱わない。
- 家族側も対象国・保険などを確認する。

## common_user_phrases

- デジタルノマド 配偶者 子供
- デジタルノマド 家族 帯同
- デジタルノマド 家族 働ける
- 告示54号 デジタルノマド
- 数字游民 家属 日本

## must_say

- 配偶者・子は告示54号として本人ルートと分ける。

## must_not_say

- 家族滞在と同じように扱う。
- 家族が自由に働けると言う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-004 |
