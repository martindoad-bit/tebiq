---
fact_id: designated-activities-ssw-transition-prep-router
title: "特定活動 — 特定技能1号への移行準備"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "特定技能1号への移行準備特定活動"
citation_summary: "ISA は、特定技能1号への変更を希望し、在留期限までに必要書類を揃えられないなど移行準備に時間を要する場合の特定活動（6月・就労可）ページを掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-017
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能関係の特定活動"
  source_locator: "特定技能1号への移行を希望する場合"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "試験合格等の要件充足"
    - "受入機関変更時の例外"
    - "通算在留期間計算"
  deep_water_candidate: true
applies_when:
  - "ユーザーが特定技能1号への移行準備中の在留を相談している"
does_not_cover:
  - "通常の特定技能1号変更申請"
  - "技人国から技人国への転職活動"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-designated-activities-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities.html
    title: 在留資格「特定活動」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-ssw-transition-prep
    url: https://www.moj.go.jp/isa/applications/ssw/10_00025.html
    title: 特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定技能1号への移行準備の特定活動相談"
direct_fact_fields:
  - designated_activities_ssw_transition_prep_router
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_transition_requirements_detail_pending
    reason: "合理的理由、試験合格、受入機関、通算期間は詳細カード化が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号への変更を希望し、在留期限までに必要書類を揃えられないなど移行準備に時間を要する場合の特定活動（6月・就労可）ページを掲載している。"
    source_title: "特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00025.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭の制度説明"
    display_label: "特定活動: 特定技能1号への移行準備"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — 特定技能1号への移行準備

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、特定技能1号への変更を希望し、移行準備に時間を要する場合の特定活動ページを掲載している。

## exceptions_or_transition

- この特定活動は、通常の転職活動全般のための資格ではない。
- 特定技能1号への変更が前提となるため、試験、受入機関、通算期間を確認する。

## common_user_phrases

- 特定技能 移行準備 特定活動
- 特定技能 移行準備
- 特定技能1号 書類 間に合わない
- 特定活動 6月 就労可 特定技能
- 6月 就労可 特定技能
- 特定技能へ変更 準備期間
- 特定技能 转换 准备 特定活动

## must_say

- 特定技能1号への移行準備と、一般的な転職活動を分ける。

## must_not_say

- 技人国から技人国への転職でもこの特定活動が当然使える。
- 書類が間に合わなければ誰でも6か月就労可になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-017 |
