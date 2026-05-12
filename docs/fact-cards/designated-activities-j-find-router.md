---
fact_id: designated-activities-j-find-router
title: "特定活動 — J-Find 未来創造人材"
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
citation_label: "J-Find 未来創造人材"
citation_summary: "ISA の J-Find ページは、2023年4月から優秀な海外大学等卒業者が日本で就職活動又は起業準備活動を行う場合に特定活動（未来創造人材）を付与され、最長2年間在留可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-014
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材"
  source_locator: "J-Find page overview"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "対象大学ランキング該当性"
    - "卒業後5年以内の確認"
    - "個別許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが海外大学卒業後に日本で就職活動・起業準備したいと相談している"
does_not_cover:
  - "J-Skip"
  - "高度専門職ポイント計算"
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
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Find / 未来創造人材の相談"
direct_fact_fields:
  - designated_activities_j_find_router
ai_inferred_fields: []
needs_review_flags:
  - id: target_university_latest_list
    reason: "対象大学一覧はランキング時点に依存し、申請時の最新確認が必要。"
evidence_points:
  - claim: "ISA の J-Find ページは、2023年4月から未来創造人材制度が導入され、対象者が日本で就職活動又は起業準備活動を行う場合に特定活動（未来創造人材）を付与され、最長2年間在留可能と説明している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭の制度説明"
    display_label: "特定活動: J-Find"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — J-Find 未来創造人材

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、J-Find 未来創造人材制度のページを設け、対象者が日本で就職活動又は起業準備活動を行う場合の特定活動として説明している。

## exceptions_or_transition

- 対象大学、卒業後年数、ランキング時点などは最新確認が必要。
- J-Skip、高度専門職、通常の就職活動特定活動とは分ける。

## common_user_phrases

- J-Find 特定活動
- J-Find
- 未来創造人材
- 未来創造人材 ビザ
- 海外大学 卒業 日本 就職活動
- 海外大学 起業準備 日本
- top university Japan job hunting visa
- 海外名校 日本 找工作 签证

## must_say

- J-Find は対象大学等の条件確認が必要な特定活動類型である。

## must_not_say

- 海外大学卒なら誰でもJ-Findを使える。
- J-FindとJ-Skipを同じ制度として扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-014 |
