---
fact_id: ssw-material-table-field-structure-source
title: "特定技能 — 提出書類は申請人・所属機関・分野で分かれる"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能: 提出書類の構造"
citation_summary: "ISA の特定技能ページは、提出書類を申請人、所属機関、分野に関する書類として分け、手続や分野ごとの表を確認する構造で案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-008
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 提出書類一覧表"
  source_locator: "在留資格認定証明書交付申請 / 変更許可申請 / 更新許可申請"
  claim_type: material_structure_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別書類の全部列挙"
    - "分野別書類の最終判断"
    - "書類提出による許可保証"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の提出書類がなぜ分野や手続で違うかを聞く相談"
direct_fact_fields:
  - ssw_material_table_field_structure_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_material_table_detail_review
    reason: "第1表・第2表・第3表の中身は手続と分野ごとに別途確認が必要。"
evidence_points:
  - claim: "ISA の特定技能ページは、在留資格認定証明書交付申請、変更許可申請、更新許可申請それぞれで、申請人・所属機関・分野に関する提出書類表を案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類一覧表"
    display_label: "特定技能: 提出書類一覧表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 提出書類は申請人・所属機関・分野で分かれる

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能の提出書類は、申請人に関する書類、所属機関に関する書類、分野に関する書類に分かれ、認定・変更・更新でも参照する表が異なる。

## exceptions_or_transition

- このカードは提出書類の構造を示すだけで、個別書類の完全リストを確定しない。

## common_user_phrases

- 特定技能 提出書類 第1表
- 特定技能 第2表 第3表
- 特定技能 申請人 所属機関 分野 書類
- 特定技能 変更 書類 分野
- 特定技能 更新 書類 違い
- 特定技能 必要書類 全部

## must_say

- 特定技能の書類は、手続と分野で表が分かれる。
- 分野別書類は該当分野の表を確認する。

## must_not_say

- 特定技能の提出書類は全分野で同じ。
- 一覧だけ揃えれば許可される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-008 |
