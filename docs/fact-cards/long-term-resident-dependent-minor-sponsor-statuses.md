---
fact_id: long-term-resident-dependent-minor-sponsor-statuses
title: "定住者 — 扶養者ステータスと未成年未婚実子"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "扶養を受ける未成年未婚実子"
citation_summary: "ISA は、永住者、定住者、日本人の配偶者等、永住者の配偶者等又は特別永住者のいずれかの方の扶養を受けて生活する未成年で未婚の実子について、定住者ページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 未成年で未婚の実子"
  source_locator: "longtermresident04 page title and sections"
  claim_type: family_route
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "扶養実態"
    - "年齢・婚姻状態"
    - "家族滞在"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident-minor-child
    url: https://www.moj.go.jp/isa/applications/status/longtermresident04.html
    title: 在留資格「定住者」（扶養を受ける未成年で未婚の実子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "身分系在留者が扶養する子の定住者相談"
direct_fact_fields:
  - long_term_resident_dependent_minor_sponsor_statuses
ai_inferred_fields: []
needs_review_flags:
  - id: dependent_minor_support_reality
    reason: "扶養実態、同居、婚姻状態は個別資料確認が必要。"
evidence_points:
  - claim: "ISA は、永住者、定住者、日本人の配偶者等、永住者の配偶者等又は特別永住者の扶養を受ける未成年で未婚の実子を定住者ページで扱っている。"
    source_title: "在留資格「定住者」（扶養を受ける未成年で未婚の実子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident04.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "定住者: 扶養を受ける未成年未婚実子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 扶養者ステータスと未成年未婚実子

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

永住者、定住者、日本人の配偶者等、永住者の配偶者等、特別永住者の扶養を受けて生活する未成年で未婚の実子について、定住者のページが設けられている。

## exceptions_or_transition

- 扶養者の資格、子の年齢、婚姻状態、扶養実態を分けて確認する。

## common_user_phrases

- 定住者 子供 扶養 未成年
- 永住者 子供 定住者
- 日本人配偶者 子供 定住者
- 未成年未婚実子 扶養
- 定住者 扶养 子女

## must_say

- 扶養者の在留資格と子の状態をセットで確認する。

## must_not_say

- 親が日本にいれば子は必ず定住者になる。
- 家族滞在と同じ扱いにする。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-003 |
