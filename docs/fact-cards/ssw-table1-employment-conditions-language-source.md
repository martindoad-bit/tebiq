---
fact_id: ssw-table1-employment-conditions-language-source
title: "特定技能 — 雇用条件書は理解できる言語での記載を確認する"
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
citation_label: "特定技能: 雇用条件書"
citation_summary: "特定技能の第1表は、雇用条件書の写しについて、申請人の署名と申請人が十分に理解できる言語での記載を留意事項として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-008
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表 雇用条件書"
  source_locator: "第1表 雇用条件書の写し"
  claim_type: material_language_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "翻訳の具体的方法"
    - "署名の有効性"
    - "雇用条件の適法性"
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
  - "特定技能の雇用条件書や翻訳言語を聞く相談"
direct_fact_fields:
  - ssw_table1_employment_conditions_language
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_language_understanding_review
    reason: "どの言語で十分に理解できるか、翻訳の質、署名経緯は個別確認が必要。"
evidence_points:
  - claim: "特定技能1号の変更用第1表は、雇用条件書の写しについて、申請人の署名及び申請人が十分に理解できる言語での記載が必要と案内している。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459971.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番6"
    display_label: "特定技能: 雇用条件書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能1号の更新用第1表も、雇用条件書の写しについて、申請人の署名及び申請人が十分に理解できる言語での記載が必要と案内している。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番5"
    display_label: "特定技能: 更新用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 雇用条件書は理解できる言語での記載を確認する

## current_date_logic

Checked against ISA SSW material tables revised 2026-04-01.

## current_effective_fact

特定技能の雇用条件書の写しは、申請人の署名と、申請人が十分に理解できる言語での記載を確認する書類として表に出ている。

## exceptions_or_transition

- どの言語で足りるか、翻訳が適切か、本人が理解して署名したかは個別確認が必要。

## common_user_phrases

- 特定技能 雇用条件書 母国語
- 特定技能 雇用条件書 理解できる言語
- 特定技能 契約書 中国語
- 特定技能 書類 翻訳 雇用条件
- 特定技能 更新 雇用条件書 言語
- 特定技能 employment conditions language

## must_say

- 雇用条件書は、申請人の署名と理解できる言語での記載を確認する。

## must_not_say

- 日本語だけで本人が読めなくても常に問題ない。
- 翻訳があれば雇用条件の中身は見られない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-008 |
