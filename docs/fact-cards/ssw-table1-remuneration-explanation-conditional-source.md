---
fact_id: ssw-table1-remuneration-explanation-conditional-source
title: "特定技能 — 報酬説明書と賃金規程は条件付きで確認する"
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
citation_label: "特定技能: 報酬説明書"
citation_summary: "特定技能の第1表は、報酬に関する説明書や賃金規程の写しを条件付きの必要書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-010
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表 報酬"
  source_locator: "第1表 報酬に関する説明書 / 賃金規程"
  claim_type: conditional_material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
  exclusion_scope:
    - "報酬額の妥当性判断"
    - "省略可否の最終判断"
    - "同一年度内受入実績の確認"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-change-table1
    url: https://www.moj.go.jp/isa/content/001459971.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）
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
  - "特定技能の報酬説明書や賃金規程が必要かを聞く相談"
direct_fact_fields:
  - ssw_table1_remuneration_explanation_conditional
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_remuneration_document_omission_review
    reason: "同一年度内の受入実績や一定実績による省略可否は個別確認が必要。"
evidence_points:
  - claim: "特定技能1号の変更用第1表は、報酬に関する説明書を条件付きの必要書類として掲げ、賃金規程に基づき報酬を決定した場合は賃金規程の写しが必要と案内している。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459971.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番4"
    display_label: "特定技能: 報酬説明書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "特定技能2号の変更用第1表も、報酬に関する説明書と賃金規程の写しを条件付きの必要書類として掲げている。"
    source_title: "「特定技能2号」に係る提出書類一覧表（在留資格変更許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459972.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番4"
    display_label: "特定技能2号: 報酬説明書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 報酬説明書と賃金規程は条件付きで確認する

## current_date_logic

Checked against ISA SSW material tables revised 2026-04-01.

## current_effective_fact

特定技能の第1表では、報酬に関する説明書と賃金規程の写しが条件付き書類として扱われている。

## exceptions_or_transition

- 同一年度内の受入実績などによる省略可否は個別確認が必要。
- 報酬説明書を出すことと、報酬額が基準を満たすことは別の確認事項。

## common_user_phrases

- 特定技能 報酬説明書 必要
- 特定技能 賃金規程 写し
- 特定技能 給料 書類 省略
- 特定技能 同一年度 受入れ 書類省略
- 特定技能 報酬に関する説明書
- 特定技能 salary explanation document

## must_say

- 報酬説明書や賃金規程は条件付き書類として確認する。

## must_not_say

- 給料関係の書類は特定技能申請では関係ない。
- 書類を省略できるかは常に自動で決まる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-010 |
