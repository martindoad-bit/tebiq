---
fact_id: designated-activities-foreign-entrepreneur-startup-source
title: "特定活動 — 外国人起業活動促進事業"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: 外国人起業家"
citation_summary: "ISA は、外国人起業活動促進事業に関するページを特定活動一覧から案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-012
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "外国人起業活動促進事業"
  source_locator: "特定活動一覧からリンクされるページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
    - "経営・管理"
  application_type:
    - status_identification
  exclusion_scope:
    - "自治体プログラムの対象判断"
    - "事業計画の評価"
    - "経営・管理への移行判断"
  deep_water_candidate: true
official_sources:
  - id: isa-foreign-entrepreneur-startup
    url: https://www.moj.go.jp/isa/03_00097.html
    title: 外国人起業家（外国人起業活動促進事業）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "外国人起業家、スタートアップ、経営管理前の特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_foreign_entrepreneur_startup_source
ai_inferred_fields: []
needs_review_flags:
  - id: startup_program_needs_review
    reason: "対象自治体、事業計画確認、期間、経営・管理移行は個別確認が必要。"
evidence_points:
  - claim: "ISA は外国人起業活動促進事業に関するページを特定活動一覧から案内している。"
    source_title: "外国人起業家（外国人起業活動促進事業）"
    source_url: "https://www.moj.go.jp/isa/03_00097.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 外国人起業家"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 外国人起業活動促進事業

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は、外国人起業活動促進事業に関するページを特定活動一覧から案内している。

## exceptions_or_transition

- このカードは、自治体プログラムの対象、事業計画、期間、経営・管理への移行可否を判断しない。

## common_user_phrases

- 外国人起業家 特定活動
- 起業活動促進事業
- スタートアップビザ 日本
- 経営管理 取る前 起業
- 起業準備 特定活動
- startup visa Japan entrepreneur

## must_say

- 外国人起業活動促進事業は、経営・管理そのものや卒業後起業活動と分けて確認する。
- 対象自治体と事業計画確認の有無を確認する必要がある。

## must_not_say

- 起業したい人は誰でもこの特定活動を使える。
- 起業活動促進事業を使えば経営・管理が必ず取れる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-012 |
