---
fact_id: hsp-domestic-servant-type-router
title: "高度専門職家事使用人 — 4つの型"
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
citation_label: "高度専門職家事使用人: 4類型"
citation_summary: "ISA は、高度専門職等の家事使用人について、入国帯同型、家庭事情型、金融人材型、特別高度人材型を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-012
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の家事使用人"
  source_locator: "ページ冒頭"
  claim_type: subtype_disambiguation
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "各型の許可見込み"
    - "雇用契約の個別適法性"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職家事使用人 — 4つの型を聞く相談"
direct_fact_fields:
  - hsp_domestic_servant_type_router
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_type_router_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の家事使用人について、入国帯同型、家庭事情型、金融人材型、特別高度人材型を案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭"
    display_label: "高度専門職家事使用人: 4類型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 4つの型

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の家事使用人は一つの一般制度ではなく、入国帯同型、家庭事情型、金融人材型、特別高度人材型に分けて確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 家事使用人 四类型
- HSP 家政 保姆 类型
- 高度人材 家事使用人 入国帯同 家庭事情 金融
- J-Skip 家事使用人 種類一覧
- 高度専門職 メイド 特定活動 種類
- 特別高度人材型を含む家事使用人分類

## must_say

- 家事使用人は型ごとに条件が違う。

## must_not_say

- 高度専門職なら同じ条件で家事使用人を呼べる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-012 |
