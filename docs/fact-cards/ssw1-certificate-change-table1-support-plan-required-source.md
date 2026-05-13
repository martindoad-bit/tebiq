---
fact_id: ssw1-certificate-change-table1-support-plan-required-source
title: "特定技能1号 — 認定・変更では支援計画書が第1表に出る"
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
citation_label: "特定技能1号: 支援計画書"
citation_summary: "特定技能1号の認定・変更用第1表は、1号特定技能外国人支援計画書を必要書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-005
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能1号 第1表"
  source_locator: "認定用第1表 項番10 / 変更用第1表 項番9"
  claim_type: material_requirement
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - certificate
    - status-change
  exclusion_scope:
    - "支援計画の内容適合性"
    - "登録支援機関への委託可否"
    - "更新申請の個別書類"
  deep_water_candidate: true
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
  - "特定技能1号の認定・変更で支援計画書が必要かを聞く相談"
direct_fact_fields:
  - ssw1_certificate_change_table1_support_plan_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_support_plan_substance_review
    reason: "支援計画書の提出と、支援計画の基準適合性は区別が必要。"
evidence_points:
  - claim: "特定技能1号の認定用第1表は、1号特定技能外国人支援計画書を必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格認定証明書交付申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459969.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番10"
    display_label: "特定技能1号: 認定用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能1号の変更用第1表は、1号特定技能外国人支援計画書を必要書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459971.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番9"
    display_label: "特定技能1号: 変更用第1表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 認定・変更では支援計画書が第1表に出る

## current_date_logic

Checked against ISA SSW1 material tables revised 2026-04-01.

## current_effective_fact

特定技能1号の認定申請と変更申請では、第1表に1号特定技能外国人支援計画書が必要書類として出ている。

## exceptions_or_transition

- 支援計画を提出することと、その内容が基準を満たすことは別の確認事項。
- 登録支援機関へ委託する場合は別の関連書類も確認する。

## common_user_phrases

- 特定技能1号 支援計画書 認定 変更
- 特定技能1号 第1表 支援計画
- 特定技能 支援計画書 必要
- 特定技能1号 COE 支援計画
- 特定技能1号 変更 支援計画書
- 特定技能 support plan application

## must_say

- 特定技能1号の認定・変更では、支援計画書が第1表に出ている。

## must_not_say

- 特定技能1号は支援計画なしで申請できる。
- 支援計画書を出せば支援基準は自動的に満たす。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-005 |
