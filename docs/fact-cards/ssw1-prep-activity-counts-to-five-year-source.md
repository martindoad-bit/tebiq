---
fact_id: ssw1-prep-activity-counts-to-five-year-source
title: "特定技能1号準備 — 6か月の特定活動も通算5年に含まれる"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能1号準備: 通算算入"
citation_summary: "ISA は、特定技能1号への移行準備のための特定活動で在留した期間も、特定技能1号の通算在留期間に含まれると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-006
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（特定技能1号移行準備）"
  source_locator: "特定技能関係の特定活動 / 通算在留期間"
  claim_type: period_count_boundary
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status-change
  exclusion_scope:
    - "移行準備特定活動の許可可否"
    - "残余通算期間の個別計算"
    - "受入機関変更時の例外"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-prep-activity
    url: https://www.moj.go.jp/isa/applications/ssw/10_00025.html
    title: 特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）
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
  - "特定技能1号移行準備の特定活動が5年上限に含まれるかを聞く相談"
direct_fact_fields:
  - ssw1_prep_activity_counts_to_five_year
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_prep_period_review
    reason: "特定活動の対象可否・更新回数・受入機関変更は別途確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号への移行準備の特定活動で在留した期間が、特定技能1号の通算在留期間に含まれると案内している。"
    source_title: "特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00025.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注意書き"
    display_label: "特定技能1号準備: 通算算入"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の通算在留期間ページも、特定技能1号への移行を希望する場合の特定活動期間を通算在留期間に含むと案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "通算在留期間"
    display_label: "通算在留期間: 移行準備"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号準備 — 6か月の特定活動も通算5年に含まれる

## current_date_logic

Checked against the ISA SSW preparation and total-period pages on 2026-05-13.

## current_effective_fact

特定技能1号への移行準備のための特定活動で在留した期間は、特定技能1号の通算在留期間に含まれる。

## exceptions_or_transition

- この特定活動を使えるか、更新できるか、受入機関変更が認められるかは別論点。
- 通算期間は個別の在留履歴で確認する。

## common_user_phrases

- 特定技能1号準備 6か月 5年
- 特定活動 6月 特定技能 通算
- 特定技能準備 算入 五年
- 特定技能1号 移行準備 期間
- 特定技能 残り期間 8月
- 特定技能 4年6月 準備

## must_say

- 移行準備の特定活動期間も、特定技能1号の通算期間に含まれる。

## must_not_say

- 準備特定活動は5年上限とは無関係。
- 6か月を別枠として足せる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-006 |
