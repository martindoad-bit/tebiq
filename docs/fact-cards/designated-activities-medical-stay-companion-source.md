---
fact_id: designated-activities-medical-stay-companion-source
title: "特定活動 — 医療滞在及び同伴者"
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
citation_label: "特定活動: 医療滞在"
citation_summary: "ISA は特定活動の一類型として、医療滞在及びその同伴者のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 医療滞在及びその同伴者"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "治療内容の適合判断"
    - "同伴者範囲の判断"
    - "医療費支弁能力の判断"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-medical-stay
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities06.html
    title: 在留資格「特定活動」（医療滞在及びその同伴者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "治療目的又は同伴者として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_medical_stay_companion_source
ai_inferred_fields: []
needs_review_flags:
  - id: medical_stay_scope_needs_review
    reason: "治療内容、滞在期間、同伴者、費用支弁は個別確認が必要。"
evidence_points:
  - claim: "ISA は特定活動の一類型として、医療滞在及びその同伴者のページを設けている。"
    source_title: "在留資格「特定活動」（医療滞在及びその同伴者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities06.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 医療滞在"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 医療滞在及び同伴者

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は特定活動の一類型として、医療滞在及びその同伴者のページを設けている。

## exceptions_or_transition

- このカードは、治療目的の適合、同伴者の範囲、費用支弁、短期滞在との違いを判断しない。

## common_user_phrases

- 医療滞在 特定活動
- 治療目的 日本 ビザ
- 入院 同伴者 特定活動
- 医療ビザ 日本
- 治療 同伴者 在留資格
- medical stay visa Japan

## must_say

- 医療滞在と同伴者は、特定活動の個別類型として確認する。
- 治療内容や同伴者範囲は個別資料で確認する。

## must_not_say

- 病院に行くなら必ず医療滞在の特定活動になる。
- 同伴者は誰でも同じ条件で滞在できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-003 |
