---
fact_id: ssw-table1-health-check-required-source
title: "特定技能 — 認定・変更では健康診断個人票を確認する"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 健康診断個人票"
citation_summary: "特定技能の認定・変更用第1表は、健康診断個人票と受診者の申告書を必要書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-009
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表 健康診断"
  source_locator: "認定用第1表 項番9 / 変更用第1表 項番8"
  claim_type: material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
  exclusion_scope:
    - "健康診断結果の審査判断"
    - "更新申請時の全材料"
    - "医療上の個別判断"
  deep_water_candidate: false
official_sources:
  - id: isa-ssw1-coe-table1
    url: https://www.moj.go.jp/isa/content/001459969.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留資格認定証明書交付申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw1-change-table1
    url: https://www.moj.go.jp/isa/content/001459971.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能認定・変更時の健康診断書類を聞く相談"
direct_fact_fields:
  - ssw_table1_health_check_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_health_check_scope_review
    reason: "健康診断項目や外国語書類の翻訳要否は書類ごとに確認が必要。"
evidence_points:
  - claim: "特定技能1号の認定用第1表は、健康診断個人票と受診者の申告書を必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格認定証明書交付申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459969.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番9"
    display_label: "特定技能: 認定用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "特定技能1号の変更用第1表は、健康診断個人票と受診者の申告書を必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459971.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番8"
    display_label: "特定技能: 変更用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定技能 — 認定・変更では健康診断個人票を確認する

## current_date_logic

Checked against ISA SSW material tables revised 2026-04-01.

## current_effective_fact

特定技能の認定申請・変更申請では、健康診断個人票と受診者の申告書が第1表に出ている。

## exceptions_or_transition

- 更新申請の材料とは分けて確認する。
- 外国語で作成されている場合の日本語訳など、表の留意事項も確認する。

## common_user_phrases

- 特定技能 健康診断 個人票
- 特定技能 受診者の申告書
- 特定技能 COE 健康診断
- 特定技能 変更 健康診断
- 特定技能 健康診断 日本語訳
- 特定技能 medical check document

## must_say

- 認定・変更では健康診断個人票と受診者の申告書を確認する。

## must_not_say

- 特定技能の認定・変更で健康診断書類は常に不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-009 |
