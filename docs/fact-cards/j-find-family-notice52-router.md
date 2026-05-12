---
fact_id: j-find-family-notice52-router
title: "J-Find 家族 — 未来創造人材の配偶者・子"
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "J-Find 家族"
citation_summary: "ISA の J-Find ページは、未来創造人材制度を活用する者の配偶者・子に必要な書類を本人の書類と分けて掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-009
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材の配偶者等"
  source_locator: "必要な書類 / 配偶者・子"
  claim_type: family_route
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_acquisition
  exclusion_scope:
    - "家族関係証明"
    - "就労可否"
    - "本人のJ-Find該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Find利用者の配偶者・子の相談"
direct_fact_fields:
  - j_find_family_route
ai_inferred_fields: []
needs_review_flags:
  - id: j_find_family_notice_number_confirm
    reason: "告示番号と家族の活動範囲は告示本文との照合が必要。"
evidence_points:
  - claim: "ISA の J-Find ページは、未来創造人材制度を活用する者の配偶者・子に必要な書類を本人の書類と分けて掲載している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "必要な書類 / 配偶者・子"
    display_label: "J-Find: 配偶者・子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Find 家族 — 未来創造人材の配偶者・子

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

J-Find ページには、未来創造人材制度を活用する本人と、その配偶者・子に必要な書類が分けて掲載されている。

## exceptions_or_transition

- 家族滞在と同じものとして扱わない。
- 家族の就労可否や活動範囲は告示本文と指定書で確認する。

## common_user_phrases

- J-Find 配偶者 子供
- J-Find 家族
- 未来創造人材 家族 帯同
- J-Find spouse child
- J-Find 家属 日本

## must_say

- J-Find 本人と配偶者・子は分けて確認する。

## must_not_say

- J-Find本人が使えれば家族も自動的に同じ活動ができる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-009 |
