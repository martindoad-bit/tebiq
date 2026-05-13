---
fact_id: ssw1-total-period-five-year-source
title: "特定技能1号 — 通算在留期間は原則5年以内"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能1号: 通算5年"
citation_summary: "ISA は、特定技能1号について通算在留期間が原則5年以内である必要があると案内している。更新手続だけから無制限更新とは扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-002
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能1号 通算在留期間"
  source_locator: "在留資格「特定技能」注2 / 通算在留期間"
  claim_type: period_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - current-status
    - renewal
    - status-change
  exclusion_scope:
    - "5年を超えて在留できる例外"
    - "個別更新可否"
    - "2号移行可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-total-period
    url: https://www.moj.go.jp/isa/10_00233.html
    title: 通算在留期間
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の通算在留期間や5年上限を聞く相談"
direct_fact_fields:
  - ssw1_total_period_five_year_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_five_year_exception_review
    reason: "5年を超えて在留できる場合は別途条件確認が必要。"
evidence_points:
  - claim: "ISA の特定技能ページは、特定技能1号で在留できる期間が通算で原則5年以内である必要があると案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注2"
    display_label: "特定技能1号: 通算原則5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の通算在留期間ページも、特定技能1号の通算在留期間は原則5年以内でなければならないと案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭"
    display_label: "通算在留期間: 1号原則5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 通算在留期間は原則5年以内

## current_date_logic

Checked against the ISA status and total-period pages on 2026-05-13.

## current_effective_fact

特定技能1号は、通算在留期間が原則5年以内である必要がある。更新できる在留資格というだけで、無制限に更新できるとは扱わない。

## exceptions_or_transition

- 5年を超えて在留できる場合は、通算在留期間ページの条件を別に確認する。

## common_user_phrases

- 特定技能1号 5年
- 特定技能 通算 5年
- 特定技能1号 何年まで
- 特定技能 5年以上 延長
- 特定技能1号 更新 無限
- specified skilled worker five years
- 特定技能1号 4年半 续多久

## must_say

- 特定技能1号は通算で原則5年以内という入口を確認する。

## must_not_say

- 特定技能1号はずっと更新できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-002 |
