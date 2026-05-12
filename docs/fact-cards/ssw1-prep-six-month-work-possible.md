---
fact_id: ssw1-prep-six-month-work-possible
title: "特定技能1号準備 — 6月・就労可の特定活動"
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
citation_label: "特定技能1号準備"
citation_summary: "ISA は、特定技能1号への変更を希望し、在留期間満了日までに必要書類を揃えられないなど移行準備に時間を要する場合、特定活動（6月・就労可）への変更申請ができると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-014
  authority_layer: L4 ISA SSW Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（特定技能1号準備）"
  source_locator: "ページ冒頭の制度説明"
  claim_type: transition_router
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "通常の特定技能変更申請"
    - "一般的な転職活動"
    - "受入機関変更"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-prep
    url: https://www.moj.go.jp/isa/applications/ssw/10_00025.html
    title: 特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定技能1号への移行準備中の在留相談"
direct_fact_fields:
  - ssw1_prep_six_month_work_possible
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_prep_reasonable_reason
    reason: "合理的理由、受入機関、予定業務などの要件は個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号への移行準備に時間を要する場合、予定受入機関で就労しながら準備できる特定活動（6月・就労可）への変更申請を説明している。"
    source_title: "特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00025.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭の制度説明"
    display_label: "特定技能1号準備: 6月・就労可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号準備 — 6月・就労可の特定活動

## current_date_logic

Checked against ISA SSW page on 2026-05-12.

## current_effective_fact

特定技能1号への移行準備に時間を要する場合、予定受入機関で就労しながら準備するための特定活動（6月・就労可）が説明されている。

## exceptions_or_transition

- できる限り特定技能1号への変更申請を行うよう案内されている。
- 一般的な転職活動の在留資格ではない。

## common_user_phrases

- 特定技能1号 準備 特定活動 6月
- 特定技能 書類 間に合わない
- 特定技能 6月 就労可
- 特定技能 移行準備 働ける
- 特定技能 转换 准备 六个月

## must_say

- 特定技能1号への変更が前提の準備ルートとして確認する。

## must_not_say

- 書類が間に合わなければ誰でも使える。
- 一般の転職活動用に使える。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-014 |
