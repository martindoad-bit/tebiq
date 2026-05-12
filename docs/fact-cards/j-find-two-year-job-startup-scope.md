---
fact_id: j-find-two-year-job-startup-scope
title: "J-Find — 就職活動又は起業準備で最長2年"
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
citation_label: "J-Find 活動範囲"
citation_summary: "ISA は、J-Find について、優秀な海外大学等卒業者が日本で就職活動又は起業準備活動を行う場合に特定活動（未来創造人材）を付与され、最長2年間在留可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材"
  source_locator: "J-Find page overview"
  claim_type: activity_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "対象大学"
    - "卒業後年数"
    - "就労開始可否"
  deep_water_candidate: true
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Findで就職活動又は起業準備をしたい相談"
direct_fact_fields:
  - j_find_job_startup_scope_two_years
ai_inferred_fields: []
needs_review_flags:
  - id: j_find_activity_boundary_pending
    reason: "起業準備と実際の経営活動、就職活動と就労開始の境界確認が必要。"
evidence_points:
  - claim: "ISA は、J-Find を、優秀な海外大学等卒業者が日本で就職活動又は起業準備活動を行う場合の特定活動として説明し、最長2年間在留可能としている。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭の制度説明"
    display_label: "J-Find: 就職活動又は起業準備"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Find — 就職活動又は起業準備で最長2年

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

J-Find は、対象となる海外大学等卒業者が日本で就職活動又は起業準備活動を行う場合の特定活動で、最長2年間の在留が説明されている。

## exceptions_or_transition

- 通常の留学生の卒業後就職活動特定活動とは分ける。
- 起業準備と経営管理は同一ではない。

## common_user_phrases

- J-Find 就職活動 起業準備
- 未来創造人材 最長2年
- 海外大学 日本 就職活動 J-Find
- 海外大学 日本 起業準備
- 海外名校 日本 找工作 创业准备

## must_say

- J-Find は就職活動又は起業準備の特定活動として確認する。

## must_not_say

- J-Findならすぐ就労や正式営業ができると断定する。
- 日本の大学卒業後の就職活動特定活動と混同する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-005 |
