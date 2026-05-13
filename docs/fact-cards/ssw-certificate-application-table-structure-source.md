---
fact_id: ssw-certificate-application-table-structure-source
title: "特定技能 — 認定申請の書類は第1表・第2表・第3表で見る"
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
citation_label: "特定技能: 認定申請の書類表"
citation_summary: "ISA の特定技能ページは、在留資格認定証明書交付申請について、申請人、所属機関、分野に関する提出書類表を確認する構造で案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 在留資格認定証明書交付申請"
  source_locator: "在留資格認定証明書交付申請 / 提出書類一覧表"
  claim_type: material_structure_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
  exclusion_scope:
    - "個別分野の全書類列挙"
    - "認定可否"
    - "提出済み書類の省略可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "海外から特定技能で入国する場合の書類構造を聞く相談"
direct_fact_fields:
  - ssw_certificate_application_table_structure
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_certificate_material_detail_review
    reason: "第2表の省略可否と第3表の分野別書類は個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能の在留資格認定証明書交付申請について、申請人に関する第1表、所属機関に関する第2表、分野に関する第3表を確認する構造で案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格認定証明書交付申請 / 提出書類一覧表"
    display_label: "特定技能: 認定申請の提出書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 認定申請の書類は第1表・第2表・第3表で見る

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能で新しく日本へ入国するための在留資格認定証明書交付申請では、申請人に関する書類、所属機関に関する書類、分野に関する書類を分けて確認する。

## exceptions_or_transition

- 所属機関の実績等により一部書類の省略可否が問題になる場合がある。
- 分野別書類は該当分野ごとの表を確認する。

## common_user_phrases

- 特定技能 認定 第1表 第2表 第3表
- 特定技能 COE 書類 表
- 特定技能 海外から呼ぶ 書類
- 特定技能 在留資格認定 書類
- 特定技能 認定 申請人 所属機関 分野
- 特定技能 certificate materials

## must_say

- 認定申請では、申請人・所属機関・分野の表を分けて確認する。

## must_not_say

- 認定申請は申請書と写真だけで足りる。
- 分野別の表を見なくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-001 |
