---
fact_id: ssw-agriculture-fishery-employment-type-table-source
title: "特定技能 — 農業・漁業は直接雇用と派遣雇用で分野表が分かれる"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 農業・漁業の分野表"
citation_summary: "特定技能の農業・漁業更新用第3表は、直接雇用、法人派遣雇用、個人事業主派遣雇用でシートが分かれている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-017
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 更新用第3表 農業・漁業"
  source_locator: "農業 第3表の2 / 漁業 第3表の3"
  claim_type: field_material_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "派遣可否の分野別判断"
    - "農業・漁業の全書類列挙"
    - "雇用形態の実態判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-renew-agriculture
    url: https://www.moj.go.jp/isa/content/001460054.xlsx
    title: 農業分野に関する必要な書類（特定技能1号・在留期間更新許可申請）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-renew-fishery
    url: https://www.moj.go.jp/isa/content/001459995.xlsx
    title: 漁業分野に関する必要な書類（特定技能1号・在留期間更新許可申請）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の農業・漁業で直接雇用や派遣雇用の書類を聞く相談"
direct_fact_fields:
  - ssw_agriculture_fishery_employment_type_table
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_agri_fishery_dispatch_review
    reason: "農業・漁業の派遣雇用は分野別・雇用形態別の書類と基準を確認する必要がある。"
evidence_points:
  - claim: "特定技能1号の農業分野の更新用第3表は、直接雇用、法人派遣雇用、個人事業主派遣雇用でシートが分かれている。"
    source_title: "農業分野に関する必要な書類（特定技能1号・在留期間更新許可申請）"
    source_url: "https://www.moj.go.jp/isa/content/001460054.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第3表の2"
    display_label: "特定技能: 農業分野表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能1号の漁業分野の更新用第3表は、直接雇用、法人派遣雇用、個人事業主派遣雇用でシートが分かれている。"
    source_title: "漁業分野に関する必要な書類（特定技能1号・在留期間更新許可申請）"
    source_url: "https://www.moj.go.jp/isa/content/001459995.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第3表の3"
    display_label: "特定技能: 漁業分野表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 農業・漁業は直接雇用と派遣雇用で分野表が分かれる

## current_date_logic

Checked against ISA SSW agriculture and fishery renewal tables on 2026-05-13.

## current_effective_fact

特定技能の農業・漁業の更新用分野表は、直接雇用、法人派遣雇用、個人事業主派遣雇用でシートが分かれている。

## exceptions_or_transition

- 派遣雇用が可能か、どの表を使うか、どの書類が必要かは分野と雇用形態で確認する。

## common_user_phrases

- 特定技能 農業 直接雇用 派遣 書類
- 特定技能 漁業 直接雇用 派遣 書類
- 特定技能 農業 派遣 第3表
- 特定技能 漁業 派遣 第3表
- 特定技能 農業 漁業 雇用形態 表
- 特定技能 agriculture fishery dispatch table

## must_say

- 農業・漁業は、直接雇用と派遣雇用で分野表が分かれる。

## must_not_say

- 農業・漁業の更新書類は雇用形態に関係なく一つの表だけで足りる。
- どの分野でも派遣の扱いは同じ。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-017 |
