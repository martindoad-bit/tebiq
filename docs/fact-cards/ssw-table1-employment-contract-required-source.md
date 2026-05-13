---
fact_id: ssw-table1-employment-contract-required-source
title: "特定技能 — 雇用契約書の写しは主要な第1表に出る"
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
citation_label: "特定技能: 雇用契約書"
citation_summary: "特定技能1号・2号の認定・変更・更新用第1表は、特定技能雇用契約書の写しを必要書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-007
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表"
  source_locator: "第1表 特定技能雇用契約書の写し"
  claim_type: material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "雇用契約の基準適合性"
    - "報酬額の妥当性"
    - "派遣契約の個別条件"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-change-table1
    url: https://www.moj.go.jp/isa/content/001459971.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw1-renew-table1
    url: https://www.moj.go.jp/isa/content/001459973.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能申請で雇用契約書が必要かを聞く相談"
direct_fact_fields:
  - ssw_table1_employment_contract_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_contract_substance_review
    reason: "雇用契約書の提出と、契約内容が基準を満たすことは別確認。"
evidence_points:
  - claim: "特定技能1号の変更用第1表は、特定技能雇用契約書の写しを必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459971.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番5"
    display_label: "特定技能: 変更用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能1号の更新用第1表は、特定技能雇用契約書の写しを必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番4"
    display_label: "特定技能: 更新用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 雇用契約書の写しは主要な第1表に出る

## current_date_logic

Checked against ISA SSW material tables revised 2026-04-01.

## current_effective_fact

特定技能の主要な第1表では、特定技能雇用契約書の写しが必要書類として出ている。

## exceptions_or_transition

- 雇用契約書を提出することと、契約内容が特定技能の基準を満たすことは別の確認事項。

## common_user_phrases

- 特定技能 雇用契約書 写し 必要
- 特定技能 第1表 雇用契約書
- 特定技能 契約書 書類
- 特定技能 更新 雇用契約書
- 特定技能 変更 雇用契約書
- 特定技能 employment contract document

## must_say

- 特定技能では雇用契約書の写しが第1表に出ている。

## must_not_say

- 試験に合格していれば契約書なしで申請できる。
- 契約書を出せば契約内容の審査は不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-007 |
