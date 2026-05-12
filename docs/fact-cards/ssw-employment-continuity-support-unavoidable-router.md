---
fact_id: ssw-employment-continuity-support-unavoidable-router
title: "特定活動 — やむを得ない事情による就労継続支援"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "特定技能への就労継続支援"
citation_summary: "ISA は、受入れ機関の経営上・事業上の都合や労使間の諸問題などやむを得ない事情で就労継続が困難となり、特定技能への移行を目指す場合の特定活動（就労可）を説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-018
  authority_layer: L4 ISA SSW Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（就労継続支援）"
  source_locator: "制度説明 / 要件"
  claim_type: exception_router
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "やむを得ない事情"
    - "技能試験・日本語試験未合格"
    - "受入機関要件"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-continuity-support
    url: https://www.moj.go.jp/isa/10_00213.html
    title: やむを得ない事情により活動継続が困難な場合（「特定活動」（就労継続支援））
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "やむを得ない事情で就労継続困難となり特定技能移行を目指す相談"
direct_fact_fields:
  - ssw_employment_continuity_support_unavoidable_router
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_continuity_unavoidable_reason
    reason: "やむを得ない事情、対象在留資格、受入機関要件は個別確認が必要。"
evidence_points:
  - claim: "ISA は、やむを得ない事情で就労継続が困難となり特定技能への移行を目指す場合、試験受験まで移行後予定先で就労できる特定活動を説明している。"
    source_title: "やむを得ない事情により活動継続が困難な場合（「特定活動」（就労継続支援））"
    source_url: "https://www.moj.go.jp/isa/10_00213.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度説明"
    display_label: "特定活動: 就労継続支援"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — やむを得ない事情による就労継続支援

## current_date_logic

Checked against ISA SSW page on 2026-05-12.

## current_effective_fact

やむを得ない事情で就労継続が困難となり、特定技能への移行を目指す場合の特定活動（就労可）が説明されている。

## exceptions_or_transition

- 対象者は複数類型に分かれ、受入機関や試験要件の確認が必要。
- 通常の失業中の在留維持とは分ける。

## common_user_phrases

- 就労継続支援 特定活動
- やむを得ない事情 特定技能 移行
- 会社都合 仕事 続けられない 特定技能
- 技能実習 継続困難 特定技能
- 特定技能 转换 就劳继续支援

## must_say

- やむを得ない事情と特定技能移行意思を分けて確認する。

## must_not_say

- 失業すれば誰でも使える。
- 試験や受入機関の確認なしで使える。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-018 |
