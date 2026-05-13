---
fact_id: jskip-domestic-servant-special-type-boundary
title: "J-Skip家事使用人 — 特別高度人材型の条件"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "J-Skip家事使用人: 特別高度人材型"
citation_summary: "ISA は、特別高度人材型について、13歳未満の子や雇用主と共に出国する予定を要件とせず、世帯年収3000万円を境に人数区分を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-017
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示2号の4"
  source_locator: "特別高度人材型・説明と要件"
  claim_type: domestic_servant_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "J-Skip本人該当性"
    - "雇用契約の個別評価"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip家事使用人 — 特別高度人材型の条件を聞く相談"
direct_fact_fields:
  - jskip_domestic_servant_special_type_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_domestic_servant_special_type_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、特別高度人材型について、13歳未満の子や雇用主と共に出国する予定を要件とせず、世帯年収3000万円を境に人数区分を示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特別高度人材型・説明と要件"
    display_label: "J-Skip家事使用人: 特別高度人材型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip家事使用人 — 特別高度人材型の条件

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

J-Skipの家事使用人は特別高度人材型として、世帯年収、雇用人数、月額報酬、年齢、言語などを確認し、通常の家庭事情型とは分ける。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- J-Skip 家事使用人 特別高度人材型
- 特別高度人材 家政 3000万
- J-Skip 保姆 月额20万
- 特別高度外国人 家事使用人 条件
- J-Skip 家事使用人 13歳 不要
- 特別高度人材型 家事使用人

## must_say

- 特別高度人材型は普通の高度専門職家事使用人と分けて確認する。

## must_not_say

- J-Skipなら条件なしで家事使用人を雇える。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-017 |
