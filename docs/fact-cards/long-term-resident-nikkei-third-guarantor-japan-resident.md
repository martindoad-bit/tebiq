---
fact_id: long-term-resident-nikkei-third-guarantor-japan-resident
title: "日系3世定住者 — 身元保証人"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "日系3世の身元保証人"
citation_summary: "ISA の日系3世定住者ページは身元保証書を提出書類に含め、身元保証人には通常、日本に居住している日本人又は永住者の方になっていただくと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 日系3世"
  source_locator: "身元保証書"
  claim_type: materials_boundary
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "保証人の個別適格性"
    - "保証内容の法的意味"
    - "収入資料"
  deep_water_candidate: false
official_sources:
  - id: isa-long-term-resident-nikkei-third
    url: https://www.moj.go.jp/isa/applications/status/longtermresident_01.html
    title: 在留資格「定住者」（日系3世）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系3世定住者の身元保証人確認"
direct_fact_fields:
  - long_term_resident_nikkei_third_guarantor
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA の日系3世定住者ページは、身元保証人には通常、日本に居住している日本人又は永住者の方になっていただくと説明している。"
    source_title: "在留資格「定住者」（日系3世）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident_01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "身元保証書"
    display_label: "日系3世: 身元保証人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 日系3世定住者 — 身元保証人

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

日系3世定住者ページでは身元保証書が示され、身元保証人は通常、日本に居住する日本人又は永住者と説明されている。

## exceptions_or_transition

- 保証人の資料や個別適格性は申請区分ごとに確認する。

## common_user_phrases

- 日系3世 身元保証人
- 日系三世 保証人 日本人 永住者
- 定住者 身元保証書 日系
- 日系3世 guarantor
- 日裔三世 保证人

## must_say

- 身元保証人の有無と居住・身分を確認する。

## must_not_say

- 保証人は誰でもよい。
- 保証人がいれば許可される。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-007 |
