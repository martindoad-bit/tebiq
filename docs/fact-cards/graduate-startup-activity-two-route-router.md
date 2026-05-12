---
fact_id: graduate-startup-activity-two-route-router
title: "卒業後起業活動 — 通常ルートと大学等受入れ強化ルートを分ける"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "卒業後起業活動の二つの入口"
citation_summary: "ISA の卒業後起業活動ページは、本邦大学等を卒業して起業活動を行うことを希望する方と、優秀な留学生の受入れに意欲的に取り組む大学等を卒業して起業活動を希望する方の二つの入口を掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-018
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "本邦大学等卒業者の起業活動"
  source_locator: "卒業後起業活動 page route list"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "経営・管理の変更許可"
    - "外国人起業活動促進事業"
    - "事業計画の評価"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後に起業活動をしたい"
does_not_cover:
  - "スタートアップビザ全体"
  - "経営管理の新基準"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-graduate-startup-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities13.html
    title: 本邦の大学等を卒業した留学生が起業活動を行う場合
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "卒業後起業活動の特定活動相談"
direct_fact_fields:
  - graduate_startup_activity_two_route_router
ai_inferred_fields: []
needs_review_flags:
  - id: startup_activity_detail_pending
    reason: "各ルートの期間、支援機関、経営管理移行条件は別カード化が必要。"
evidence_points:
  - claim: "ISA の卒業後起業活動ページは、本邦大学等を卒業して起業活動を行うことを希望する方と、優秀な留学生の受入れに意欲的に取り組む大学等を卒業して起業活動を希望する方の二つの入口を掲げている。"
    source_title: "本邦の大学等を卒業した留学生が起業活動を行う場合"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities13.html"
    source_organization: "出入国在留管理庁"
    source_locator: "route list"
    display_label: "卒業後起業活動: 二つの入口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 卒業後起業活動 — 通常ルートと大学等受入れ強化ルートを分ける

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

ISA の卒業後起業活動ページは、本邦大学等卒業後の起業活動について二つの入口を掲げている。

## exceptions_or_transition

- 起業活動特定活動と経営・管理、スタートアップビザを分ける。
- 各ルートの詳細は別途確認する。

## common_user_phrases

- 卒業後 起業活動 特定活動
- 留学生 起業活動 2ルート
- 大学卒業 起業 特定活動
- 起業活動 経営管理 違い
- 毕业后 创业 特定活动 路径

## must_say

- 卒業後起業活動は経営・管理とは別に入口を分けて確認する。

## must_not_say

- 起業活動特定活動があれば経営・管理も当然通る。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-018 |

