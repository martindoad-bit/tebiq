---
fact_id: designated-activities-job-offer-before-start-router
title: "特定活動 — 内定後から採用までの滞在"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "内定後採用待機の特定活動"
citation_summary: "ISA の特定活動一覧には、大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在を希望する場合の個別ページがある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-011
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 内定後採用待機"
  source_locator: "就職先が内定し採用までの滞在"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "内定の十分性"
    - "資格外活動可否"
    - "採用予定日までの具体的期限"
  deep_water_candidate: false
applies_when:
  - "ユーザーが内定後、入社日まで在留できるか相談している"
does_not_cover:
  - "卒業後の就職活動一般"
  - "技人国への変更許可見込み"
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
  - id: isa-designated-activities-job-offer
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities15.html
    title: 大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在を希望する場合
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "内定後採用待機の特定活動相談"
direct_fact_fields:
  - designated_activities_job_offer_before_start_router
ai_inferred_fields: []
needs_review_flags:
  - id: detailed_requirements_pending
    reason: "対象・要件・資格外活動はリンク先資料の詳細カードで確認する。"
evidence_points:
  - claim: "ISA の特定活動一覧には、大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在を希望する場合の個別ページがある。"
    source_title: "在留資格「特定活動」"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    source_organization: "出入国在留管理庁"
    source_locator: "就職先が内定し採用までの滞在"
    display_label: "特定活動: 内定後採用待機"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — 内定後から採用までの滞在

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在を希望する場合の特定活動ページを設けている。

## exceptions_or_transition

- 内定がある場合と就職活動中の場合を分ける。
- このカードは採用待機の許可可否や資格外活動可否を判断しない。

## common_user_phrases

- 内定 入社日まで 特定活動
- 入社日まで 特定活動
- 卒業後 内定 入社待ち ビザ
- 採用までの滞在 特定活動
- 採用までの滞在
- 内定後 入社前 在留
- 拿到offer 入职前 签证

## must_say

- 内定後採用待機と就職活動中は別の相談として分ける。

## must_not_say

- 内定があれば何もしなくても卒業後に滞在できる。
- 就職活動特定活動と同じだと扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-011 |
