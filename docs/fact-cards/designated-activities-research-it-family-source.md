---
fact_id: designated-activities-research-it-family-source
title: "特定活動 — 特定研究・特定情報処理及び家族"
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
citation_label: "特定活動: 研究・情報処理"
citation_summary: "ISA は特定活動の一類型として、特定研究等活動、特定研究等活動等の親・家族、特定情報処理活動のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-010
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 特定研究等活動・特定情報処理活動"
  source_locator: "3つの関連ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "研究機関・情報処理機関の該当性"
    - "親・家族の範囲"
    - "高度専門職や技人国との区別"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-specific-research
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities07.html
    title: 在留資格「特定活動」（特定研究等活動）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-designated-specific-research-family
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities09.html
    title: 特定活動（特定研究等活動等の親・特定研究等活動等の家族）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-designated-specific-it
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities08.html
    title: 在留資格「特定活動」（特定情報処理活動）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "特定研究等活動、特定情報処理活動、又はその家族として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_research_it_family_source
ai_inferred_fields: []
needs_review_flags:
  - id: research_it_conditions_needs_review
    reason: "機関認定、活動内容、家族範囲、高度専門職・技人国との違いは個別確認が必要。"
evidence_points:
  - claim: "ISA は特定研究等活動、特定研究等活動等の親・家族、特定情報処理活動について、特定活動の個別ページを設けている。"
    source_title: "特定研究等活動・特定情報処理活動関連ページ"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities07.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 研究・情報処理"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 特定研究・特定情報処理及び家族

## current_date_logic

Checked against the ISA status pages on 2026-05-12.

## current_effective_fact

ISA は特定研究等活動、特定研究等活動等の親・家族、特定情報処理活動について、特定活動の個別ページを設けている。

## exceptions_or_transition

- このカードは、機関認定、活動内容、親・家族の範囲、技人国や高度専門職との違いを判断しない。

## common_user_phrases

- 特定研究等活動
- 特定情報処理活動
- 研究者 特定活動
- IT 特定活動
- 特定研究 家族
- 特定研究 親 特定活動

## must_say

- 特定研究等活動、特定情報処理活動、家族関連は個別類型として分けて確認する。
- 技人国や高度専門職の一般論で置き換えない。

## must_not_say

- 研究者や IT 人材ならすべてこの特定活動になる。
- 特定研究等活動の家族範囲を一般の家族滞在と同じと断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-010 |
