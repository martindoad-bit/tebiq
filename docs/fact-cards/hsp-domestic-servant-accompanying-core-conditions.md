---
fact_id: hsp-domestic-servant-accompanying-core-conditions
title: "高度専門職家事使用人 — 入国帯同型の主要条件"
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
citation_label: "家事使用人: 入国帯同型条件"
citation_summary: "ISA は、入国帯同型について、世帯年収1000万円以上、1名まで、月額20万円以上、18歳以上、使用言語での日常会話、1年以上の雇用関係などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-014
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示2号の2"
  source_locator: "入国帯同型・要件"
  claim_type: domestic_servant_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "証明資料の十分性"
    - "雇用契約内容の個別評価"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職家事使用人 — 入国帯同型の主要条件を聞く相談"
direct_fact_fields:
  - hsp_domestic_servant_accompanying_core_conditions
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_accompanying_core_conditions_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、入国帯同型について、世帯年収1000万円以上、1名まで、月額20万円以上、18歳以上、使用言語での日常会話、1年以上の雇用関係などを示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "入国帯同型・要件"
    display_label: "家事使用人: 入国帯同型条件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 入国帯同型の主要条件

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

入国帯同型の家事使用人は、世帯年収、人数、報酬、年齢、言語、既往雇用関係など複数条件を合わせて確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 家事使用人 1000万 20万 1年
- HSP 家政 18歳 言語 条件
- 入国帯同型 家事使用人 1000万円
- 高度人材 保姆 月额20万
- 家事使用人 1年以上 雇用
- HSP domestic servant 1000man

## must_say

- 年収だけでなく人数、報酬、年齢、言語、雇用経緯を確認する。

## must_not_say

- 年収1000万円だけで家事使用人を呼べる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-014 |
