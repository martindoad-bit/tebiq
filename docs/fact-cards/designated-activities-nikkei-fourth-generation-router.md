---
fact_id: designated-activities-nikkei-fourth-generation-router
title: "日系4世 — 定住者ではなく専用制度として分ける"
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
citation_label: "日系4世の更なる受入制度"
citation_summary: "ISA の特定活動一覧は日系四世ページを掲げ、日系四世受入制度ページは所定要件を満たせば通算最長5年間滞在可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-016
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "日系四世の更なる受入制度"
  source_locator: "日系四世 page"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - period_renewal
  exclusion_scope:
    - "日系4世要件の充足"
    - "サポーター要件"
    - "定住者告示路径"
  deep_water_candidate: true
applies_when:
  - "ユーザーが日系4世として日本に滞在したいと相談している"
does_not_cover:
  - "日系3世の定住者路径"
  - "サポーター適格性"
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
  - id: isa-nikkei-fourth-generation
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html
    title: 日系四世の更なる受入制度
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系4世の在留相談"
direct_fact_fields:
  - designated_activities_nikkei_fourth_generation_router
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_fourth_generation_requirements_pending
    reason: "対象者、年齢、日本語、サポーターなどの詳細要件は別カード化する。"
evidence_points:
  - claim: "ISA の特定活動一覧は日系四世ページを掲げ、日系四世受入制度ページは所定要件を満たせば通算最長5年間滞在可能と説明している。"
    source_title: "日系四世の更なる受入制度"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要"
    display_label: "日系4世制度"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 日系4世 — 定住者ではなく専用制度として分ける

## current_date_logic

Checked against ISA status/resource pages on 2026-05-12.

## current_effective_fact

ISA の特定活動一覧には日系四世ページがあり、日系四世受入制度ページは所定要件を満たす場合の通算最長5年間の滞在を説明している。

## exceptions_or_transition

- 日系4世を日系3世の定住者路径と混同しない。
- 対象者、サポーター、日本語能力などは詳細確認が必要。

## common_user_phrases

- 日系4世 ビザ
- 日系4世
- 日系四世 日本 滞在
- 日系4世 定住者
- 日系4世 特定活動
- 日裔四世 日本签证

## must_say

- 日系4世は定住者ではなく専用制度として分けて確認する。

## must_not_say

- 日系4世も日系3世と同じ定住者路径でよい。
- 日系4世なら必ず最長5年滞在できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-016 |
