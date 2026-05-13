---
fact_id: ssw2-certificate-change-table1-support-plan-not-listed-source
title: "特定技能2号 — 1号支援計画書の表をそのまま使わない"
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能2号: 第1表の確認"
citation_summary: "特定技能2号の認定・変更用第1表は、1号用の支援計画書欄をそのまま掲げていないため、2号の書類は2号用の表で確認する必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-006
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能2号 第1表"
  source_locator: "認定用第1表 / 変更用第1表"
  claim_type: material_boundary
  applicable_statuses:
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
  exclusion_scope:
    - "2号申請の全書類列挙"
    - "支援計画制度の法的範囲"
    - "家族滞在可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw2-coe-table1
    url: https://www.moj.go.jp/isa/content/001459970.xlsx
    title: 「特定技能2号」に係る提出書類一覧表（在留資格認定証明書交付申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw2-change-table1
    url: https://www.moj.go.jp/isa/content/001459972.xlsx
    title: 「特定技能2号」に係る提出書類一覧表（在留資格変更許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能2号にも1号支援計画書が必要かを聞く相談"
direct_fact_fields:
  - ssw2_certificate_change_table1_support_plan_not_listed
ai_inferred_fields: []
needs_review_flags:
  - id: ssw2_support_plan_scope_review
    reason: "第1表上の違いからの材料境界であり、支援制度全体の法的整理は DOMAIN 確認が必要。"
evidence_points:
  - claim: "特定技能2号の認定用第1表は、2号用の必要書類を掲げており、1号用の支援計画書欄をそのまま掲げていない。"
    source_title: "「特定技能2号」に係る提出書類一覧表（在留資格認定証明書交付申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459970.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表"
    display_label: "特定技能2号: 認定用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能2号の変更用第1表は、2号用の必要書類を掲げており、1号用の支援計画書欄をそのまま掲げていない。"
    source_title: "「特定技能2号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459972.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表"
    display_label: "特定技能2号: 変更用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号 — 1号支援計画書の表をそのまま使わない

## current_date_logic

Checked against ISA SSW2 material tables revised 2026-04-01.

## current_effective_fact

特定技能2号の認定・変更書類は2号用の第1表で確認する。1号用の支援計画書欄をそのまま2号に当てはめない。

## exceptions_or_transition

- このカードは提出書類表の違いを示すもので、2号申請の全書類や家族帯同可否を確定しない。

## common_user_phrases

- 特定技能2号 支援計画書 必要
- 特定技能2号 第1表 支援計画
- 特定技能2号 認定 書類 支援
- 特定技能2号 変更 書類 支援
- 特定技能1号 2号 支援計画 違い
- 特定技能2号 support plan

## must_say

- 特定技能2号は2号用の提出書類表で確認する。

## must_not_say

- 特定技能1号の第1表をそのまま2号にも使えばよい。
- 2号の書類は1号と完全に同じ。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-006 |
