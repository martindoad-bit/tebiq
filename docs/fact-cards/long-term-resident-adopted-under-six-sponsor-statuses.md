---
fact_id: long-term-resident-adopted-under-six-sponsor-statuses
title: "定住者 — 6歳未満の養子"
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
citation_label: "6歳未満の養子"
citation_summary: "ISA は、日本人、永住者、定住者又は特別永住者のいずれかの方の扶養を受けて生活する6歳未満の養子について、定住者ページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-004
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 6歳未満の養子"
  source_locator: "longtermresident05 page title"
  claim_type: family_route
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "養子縁組の成立"
    - "6歳到達日"
    - "扶養実態"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident-adopted-child
    url: https://www.moj.go.jp/isa/applications/status/longtermresident05.html
    title: 在留資格「定住者」（6歳未満の養子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "6歳未満の養子の定住者相談"
direct_fact_fields:
  - long_term_resident_adopted_under_six_sponsor_statuses
ai_inferred_fields: []
needs_review_flags:
  - id: adopted_child_under_six_adoption_validity
    reason: "養子縁組の成立、年齢、扶養者資格は個別確認が必要。"
evidence_points:
  - claim: "ISA は、日本人、永住者、定住者又は特別永住者の扶養を受ける6歳未満の養子について、定住者ページを設けている。"
    source_title: "在留資格「定住者」（6歳未満の養子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident05.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "定住者: 6歳未満の養子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 6歳未満の養子

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

日本人、永住者、定住者又は特別永住者の扶養を受けて生活する6歳未満の養子について、定住者ページが設けられている。

## exceptions_or_transition

- 実子、特別養子、家族滞在とは分けて確認する。

## common_user_phrases

- 定住者 6歳未満 養子
- 養子 定住者 日本人
- 永住者 養子 定住者
- 6歳 養子 ビザ
- 日本 收养 孩子 定住者

## must_say

- 6歳未満の養子は専用ルートとして確認する。

## must_not_say

- 養子なら年齢に関係なく定住者になる。
- 実子ルートと同じ扱いにする。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-004 |
