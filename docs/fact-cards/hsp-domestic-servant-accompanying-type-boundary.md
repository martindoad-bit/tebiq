---
fact_id: hsp-domestic-servant-accompanying-type-boundary
title: "高度専門職家事使用人 — 入国帯同型の変更制限"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "家事使用人: 入国帯同型"
citation_summary: "ISA は、入国帯同型は雇用主と共に出国予定であることが必要で、他の在留資格からの変更や雇用主変更による変更は認められないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-013
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示2号の2"
  source_locator: "高度専門職外国人の家事使用人（入国帯同型）"
  claim_type: domestic_servant_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "雇用主変更時の代替手続判断"
    - "現に有する在留資格の評価"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職家事使用人 — 入国帯同型の変更制限を聞く相談"
direct_fact_fields:
  - hsp_domestic_servant_accompanying_type_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_accompanying_type_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、入国帯同型は雇用主と共に出国予定であることが必要で、他の在留資格からの変更や雇用主変更による変更は認められないと説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職外国人の家事使用人（入国帯同型）"
    display_label: "家事使用人: 入国帯同型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 入国帯同型の変更制限

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

入国帯同型の家事使用人は、雇用主と共に出国予定であることが前提で、他の在留資格からの変更や雇用主変更とは分けて扱う。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 家事使用人 入国帯同 変更できない
- HSP 家政 换雇主 入国帯同
- 家事使用人 他の在留資格から変更
- 高度人材 保姆 雇主変更
- 入国帯同型 家事使用人 转签
- HSP domestic servant employer change

## must_say

- 入国帯同型と他の型の変更可否を分ける。

## must_not_say

- 入国帯同型でも日本国内で雇用主を自由に変えられる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-013 |
