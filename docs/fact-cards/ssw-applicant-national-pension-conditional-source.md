---
fact_id: ssw-applicant-national-pension-conditional-source
title: "特定技能 — 国民年金加入者は年金記録を条件付きで確認する"
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
citation_label: "特定技能: 国民年金書類"
citation_summary: "特定技能の第1表は、申請時点で申請人が国民年金の被保険者である場合、被保険者記録照会回答票や納付記録等を条件付き書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-014
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表 国民年金"
  source_locator: "更新用第1表 項番11から12"
  claim_type: conditional_material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - status-change
    - renewal
  exclusion_scope:
    - "年金納付状況の許可可否"
    - "免除・猶予の評価"
    - "個別の納付記録確認"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-renew-table1
    url: https://www.moj.go.jp/isa/content/001459973.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で国民年金の書類が必要かを聞く相談"
direct_fact_fields:
  - ssw_applicant_national_pension_conditional
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_national_pension_review
    reason: "国民年金加入者か、厚生年金か、免除・猶予・未納の扱いは個別確認が必要。"
evidence_points:
  - claim: "特定技能1号の更新用第1表は、申請時点で申請人が国民年金の被保険者である場合、被保険者記録照会回答票や納付記録等を条件付き書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番11から12"
    display_label: "特定技能: 国民年金書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 国民年金加入者は年金記録を条件付きで確認する

## current_date_logic

Checked against ISA SSW1 renewal material table revised 2026-04-01.

## current_effective_fact

申請時点で申請人が国民年金の被保険者である場合、特定技能の第1表では被保険者記録照会回答票や納付記録等が条件付き書類として出ている。

## exceptions_or_transition

- 厚生年金か国民年金かで必要書類が変わる。
- 免除、猶予、未納、記録取得方法は個別確認が必要。

## common_user_phrases

- 特定技能 更新 国民年金 書類
- 特定技能 年金 記録 照会回答票
- 特定技能 国民年金 領収証書
- 特定技能 续签 年金
- 特定技能 国民年金 未納
- 特定技能 pension record document

## must_say

- 国民年金加入者は、年金記録や納付記録を条件付きで確認する。

## must_not_say

- 特定技能申請では年金記録は一切見られない。
- 国民年金と厚生年金は書類上同じ扱いでよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-014 |
