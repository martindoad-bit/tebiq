---
fact_id: hsp-domestic-servant-financial-type-boundary
title: "高度専門職家事使用人 — 金融人材型の条件"
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
citation_label: "家事使用人: 金融人材型"
citation_summary: "ISA は、金融人材型について、特定の金融商品取引業務に従事する高度専門職であること、世帯年収1000万円以上、3000万円以上の場合の人数区分などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-016
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示2号の3"
  source_locator: "金融人材型・説明と要件"
  claim_type: domestic_servant_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "金融業務該当性の個別判断"
    - "登録資料の十分性"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職家事使用人 — 金融人材型の条件を聞く相談"
direct_fact_fields:
  - hsp_domestic_servant_financial_type_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_financial_type_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、金融人材型について、特定の金融商品取引業務に従事する高度専門職であること、世帯年収1000万円以上、3000万円以上の場合の人数区分などを示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "金融人材型・説明と要件"
    display_label: "家事使用人: 金融人材型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 金融人材型の条件

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

金融人材型の家事使用人は、特定の金融関連業務に従事する高度専門職を前提に、世帯年収と雇用人数の区分を確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 家事使用人 金融人材型
- 投資運用 家事使用人 3000万
- HSP 金融 家政 2名
- 金融人材型 家事使用人 1000万円 3000万円
- 高度人材 金融 保姆
- 金融商品取引 家事使用人

## must_say

- 金融人材型を一般の経営者や全ての高度専門職に広げない。

## must_not_say

- 金融人材型は全ての高収入者に使える。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-016 |
