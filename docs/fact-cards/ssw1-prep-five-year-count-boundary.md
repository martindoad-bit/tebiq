---
fact_id: ssw1-prep-five-year-count-boundary
title: "特定技能1号準備 — 1号通算5年への算入"
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
citation_label: "特定技能1号準備と通算期間"
citation_summary: "ISA は、特定技能1号準備の特定活動で在留した期間は、特定技能1号の通算在留期間上限5年に含まれ、1号で4年6月を超えて在留していた方は対象外と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-016
  authority_layer: L4 ISA SSW Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（特定技能1号準備）"
  source_locator: "注意書き"
  claim_type: period_count_boundary
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status_change
  exclusion_scope:
    - "個別通算期間計算"
    - "残余期間8月推奨の扱い"
    - "分野別条件"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-prep
    url: https://www.moj.go.jp/isa/applications/ssw/10_00025.html
    title: 特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定技能1号準備期間の通算上限確認"
direct_fact_fields:
  - ssw1_prep_five_year_count_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_remaining_period_calculation
    reason: "特定技能1号通算期間と残余期間は在留履歴で個別計算が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号準備の特定活動期間が特定技能1号の通算上限5年に含まれ、4年6月超の在留者は対象外と説明している。"
    source_title: "特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00025.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注意書き"
    display_label: "特定技能1号準備: 通算期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号準備 — 1号通算5年への算入

## current_date_logic

Checked against ISA SSW page on 2026-05-12.

## current_effective_fact

特定技能1号準備の特定活動で在留した期間は、特定技能1号の通算上限5年に含まれ、4年6月を超える方は対象外と説明されている。

## exceptions_or_transition

- 通算期間は在留履歴に基づいて個別計算する。

## common_user_phrases

- 特定技能準備 通算5年
- 特定活動6月 特定技能 5年 含まれる
- 特定技能 4年6月 準備 特定活動
- 特定技能 残り期間 8月
- 特定技能 准备 算入五年

## must_say

- 準備期間も特定技能1号の通算期間に含まれる。

## must_not_say

- 準備特定活動は5年上限に関係ない。
- 残り期間を見ずに使えると判断する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-016 |
