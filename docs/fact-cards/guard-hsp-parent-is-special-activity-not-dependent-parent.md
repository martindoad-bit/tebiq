---
fact_id: guard-hsp-parent-is-special-activity-not-dependent-parent
title: "高度専門職等の親 — 家族滞在の親ではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度専門職等の親: 特定活動"
citation_summary: "ISA は高度専門職外国人又は特別高度人材外国人等の親について、子の養育又は妊娠支援を目的とする特定活動として説明している。普通の家族滞在の親として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示 / 家族滞在"
  source_locator: "高度専門職外国人又はその配偶者の親"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
    - "家族滞在"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "親の呼び寄せ可否"
    - "短期滞在との使い分け"
    - "子の年齢・妊娠支援条件の充足判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-dependent
    url: https://www.moj.go.jp/isa/applications/status/dependent.html
    title: 在留資格「家族滞在」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親を普通の家族滞在で呼べると誤解している相談"
direct_fact_fields:
  - hsp_parent_special_activity_not_dependent_parent
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_route_review
    reason: "親の在留目的、主たる高度専門職等との関係、子の年齢、妊娠支援などを確認する必要がある。"
evidence_points:
  - claim: "ISA は、通常、就労資格で在留する外国人の親の入国・在留は認められていないとした上で、高度専門職外国人等に対する優遇措置として親の入国・在留を説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度説明"
    display_label: "高度専門職等の親: 優遇措置"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は家族滞在を、扶養を受ける配偶者又は子として行う日常的な活動として案内している。"
    source_title: "在留資格「家族滞在」"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し・対象説明"
    display_label: "家族滞在: 配偶者又は子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 家族滞在の親ではない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職外国人又は特別高度人材外国人等の親は、普通の家族滞在の親として扱わない。ISA は、子の養育又は妊娠支援などを目的とする特定活動として案内している。

## exceptions_or_transition

- このカードは、親を呼べるか、短期滞在とどちらにすべきか、又は更新できるかを判断しない。

## common_user_phrases

- 高度専門職 親 家族滞在
- 高度人才 带父母 家族滞在
- J-Skip 父母 家族滞在
- 特別高度人材 親 呼び寄せ
- 高度専門職 親 特定活動
- 高度人材 父母 长期

## must_say

- 高度専門職等の親は、普通の家族滞在ではなく特定活動の特例として確認する。
- 目的は主に7歳未満の子の養育又は妊娠支援として整理されている。

## must_not_say

- 高度専門職なら父母を家族滞在で呼べる。
- 就労資格者の親は一般に長期家族滞在できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-003 |
