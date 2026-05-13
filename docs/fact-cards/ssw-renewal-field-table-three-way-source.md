---
fact_id: ssw-renewal-field-table-three-way-source
title: "特定技能 — 更新申請の分野書類は全分野・農業・漁業で表が分かれる"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 更新申請の分野書類"
citation_summary: "ISA の特定技能ページは、更新申請の分野に関する書類について、全分野（農業・漁業除く）、農業、漁業の表を分けて案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-004
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 在留期間更新許可申請 第3表"
  source_locator: "在留期間更新許可申請 / 第3表の1から3"
  claim_type: field_material_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "各分野書類の全部列挙"
    - "農業・漁業の雇用形態別分岐"
    - "分野適合性判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能更新の分野別書類を聞く相談"
direct_fact_fields:
  - ssw_renewal_field_table_three_way
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_renewal_field_table_review
    reason: "農業・漁業は雇用形態別にさらに表が分かれるため個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能の更新申請の分野に関する書類について、全分野（農業・漁業除く）、農業、漁業の表を分けて案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間更新許可申請 / 第3表"
    display_label: "特定技能: 更新申請の分野書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 更新申請の分野書類は全分野・農業・漁業で表が分かれる

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能の更新申請で確認する分野書類は、全分野（農業・漁業を除く）、農業、漁業で表が分かれる。

## exceptions_or_transition

- 農業と漁業は直接雇用か派遣雇用かでさらに表が分かれる。
- 分野ごとの協議会、許可、誓約書等は該当表を確認する。

## common_user_phrases

- 特定技能 更新 分野 書類 農業 漁業
- 特定技能 更新 第3表 全分野
- 特定技能 更新 分野別 書類
- 特定技能 農業 更新 書類 表
- 特定技能 漁業 更新 書類 表
- 特定技能 renewal field table

## must_say

- 更新申請の分野書類は、全分野、農業、漁業で表が分かれる。

## must_not_say

- 更新申請の分野書類は全分野で同じ。
- 農業と漁業も全分野表だけ見ればよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-004 |
