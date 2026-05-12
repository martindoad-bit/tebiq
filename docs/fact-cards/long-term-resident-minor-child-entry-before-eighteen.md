---
fact_id: long-term-resident-minor-child-entry-before-eighteen
title: "定住者 — 未成年未婚実子は18歳前入国"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "未成年未婚実子の18歳前入国"
citation_summary: "ISA は、扶養を受けて生活する未成年で未婚の実子として定住者の在留資格認定証明書を受けた方は18歳に達する前日までに入国し、本邦入国時に18歳に達している方は同在留資格で入国できないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-002
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 未成年で未婚の実子"
  source_locator: "longtermresident04 留意事項"
  claim_type: age_boundary
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
  exclusion_scope:
    - "18歳到達後の別ルート"
    - "既に定住者を持つ再入国"
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
  - "未成年未婚実子として定住者で呼び寄せる相談"
direct_fact_fields:
  - long_term_resident_minor_child_entry_before_eighteen
ai_inferred_fields: []
needs_review_flags:
  - id: minor_child_age_boundary_case
    reason: "18歳到達日、COE有効期限、入国予定日の関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、未成年で未婚の実子として定住者COEを受けた方は18歳に達する前日までに入国する必要があり、入国時に18歳に達している場合は同資格で入国できないとしている。"
    source_title: "在留資格「定住者」（扶養を受ける未成年で未婚の実子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident04.html"
    source_organization: "出入国在留管理庁"
    source_locator: "留意事項"
    display_label: "定住者: 未成年未婚実子の18歳前入国"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 未成年未婚実子は18歳前入国

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

扶養を受ける未成年で未婚の実子として定住者で入国する場合、18歳に達する前日までの入国が必要と説明されている。

## exceptions_or_transition

- 既に定住者資格を持つ再入国への影響は別扱い。

## common_user_phrases

- 定住者 未成年 未婚 実子 18歳
- 定住者 子供 18歳 前 入国
- COE 18歳 定住者 子供
- 未成年未婚実子 定住者
- 定住者 孩子 18岁

## must_say

- 年齢は入国時点と18歳到達日を分けて確認する。

## must_not_say

- COEがあれば18歳後でも入国できる。
- 20歳未満なら今も未成年として扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-002 |
