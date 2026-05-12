---
fact_id: designated-activities-hsp-domestic-servant-source
title: "特定活動 — 高度専門職等の家事使用人"
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
citation_label: "特定活動: 高度人材の家事使用人"
citation_summary: "ISA は特定活動の一類型として、高度専門職外国人・特別高度人材外国人の家事使用人のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-006
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の家事使用人"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "高度人材側の該当性"
    - "帯同・雇用条件の判断"
    - "通常の家事使用人類型との違い"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職又は特別高度人材の家事使用人として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_hsp_domestic_servant_source
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_needs_review
    reason: "高度人材側の条件、収入、家族構成、雇用条件は個別確認が必要。"
evidence_points:
  - claim: "ISA は高度専門職外国人・特別高度人材外国人の家事使用人について、特定活動の個別ページを設けている。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 高度人材の家事使用人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 高度専門職等の家事使用人

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は高度専門職外国人・特別高度人材外国人の家事使用人について、特定活動の個別ページを設けている。

## exceptions_or_transition

- このカードは、高度人材側の該当性、収入条件、雇用条件、帯同経緯を判断しない。

## common_user_phrases

- 高度専門職 家事使用人
- 高度人材 家政婦 ビザ
- 特別高度人材 家事使用人
- J-Skip 家事使用人
- 高度専門職 メイド 特定活動
- 高度人材 家事労働者

## must_say

- 高度専門職等の家事使用人は、通常の家事使用人類型と分けて確認する。
- 高度人材本人の条件と家事使用人側の条件を分ける。

## must_not_say

- 高度専門職なら必ず家事使用人を呼べる。
- 家事使用人の条件はすべて同じ。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-006 |
