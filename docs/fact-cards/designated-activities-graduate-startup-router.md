---
fact_id: designated-activities-graduate-startup-router
title: "特定活動 — 本邦大学等卒業後の起業活動"
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
citation_label: "卒業後起業活動の特定活動"
citation_summary: "ISA の特定活動一覧には、本邦の大学等を卒業した留学生が起業活動を行う場合の個別ページがある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-013
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 卒業後起業活動"
  source_locator: "本邦の大学等を卒業した留学生が起業活動を行う場合"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "経営・管理の許可可否"
    - "自治体スタートアップ制度"
    - "事業計画の評価"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後に起業準備をしたいと相談している"
does_not_cover:
  - "経営管理への変更要件"
  - "外国人起業活動促進事業"
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
  - id: isa-designated-activities-graduate-startup
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities13.html
    title: 本邦の大学等を卒業した留学生が起業活動を行う場合
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "卒業後起業活動の特定活動相談"
direct_fact_fields:
  - designated_activities_graduate_startup_router
ai_inferred_fields: []
needs_review_flags:
  - id: startup_transition_detail_pending
    reason: "経営・管理への移行、自治体制度、大学支援制度は別カードで扱う。"
evidence_points:
  - claim: "ISA の特定活動一覧には、本邦の大学等を卒業した留学生が起業活動を行う場合の個別ページがある。"
    source_title: "在留資格「特定活動」"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本邦の大学等を卒業した留学生が起業活動を行う場合"
    display_label: "特定活動: 卒業後起業活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — 本邦大学等卒業後の起業活動

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、本邦の大学等を卒業した留学生が起業活動を行う場合の特定活動ページを設けている。

## exceptions_or_transition

- 起業活動の特定活動と経営・管理の許可は分ける。
- 事業計画や資本金などの判断はこのカードで扱わない。

## common_user_phrases

- 卒業後 起業 特定活動
- 卒業後 起業準備
- 留学生 起業準備 ビザ
- 大学卒業 起業活動 在留
- 起業 特定活動 経営管理
- 毕业后 创业 特定活动

## must_say

- 卒業後起業活動の特定活動は、経営・管理とは別に確認する。

## must_not_say

- 起業したいならすぐ経営管理か定住者でよい。
- 起業活動の特定活動があれば経営管理も通る。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-013 |
