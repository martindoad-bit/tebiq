---
fact_id: ssw-applicant-national-health-insurance-conditional-source
title: "特定技能 — 国民健康保険加入者は保険料書類を条件付きで確認する"
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
citation_label: "特定技能: 国民健康保険書類"
citation_summary: "特定技能の第1表は、申請時点で申請人が国民健康保険の被保険者である場合、資格情報や保険料納付証明書等を条件付き書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-013
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 第1表 国民健康保険"
  source_locator: "変更用第1表 / 更新用第1表 国民健康保険"
  claim_type: conditional_material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - status-change
    - renewal
  exclusion_scope:
    - "健康保険加入資格の判断"
    - "滞納・猶予の評価"
    - "保険者番号等の具体的マスキング方法"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-renew-table1
    url: https://www.moj.go.jp/isa/content/001459973.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で国民健康保険の書類が必要かを聞く相談"
direct_fact_fields:
  - ssw_applicant_national_health_insurance_conditional
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_national_health_insurance_review
    reason: "国民健康保険加入者か、納付証明書の年度、猶予通知書の要否は個別確認が必要。"
evidence_points:
  - claim: "特定技能1号の更新用第1表は、申請時点で申請人が国民健康保険の被保険者である場合、医療保険の資格情報や資格確認書、国民健康保険料納付証明書等を条件付き書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番9から10"
    display_label: "特定技能: 国民健康保険書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 国民健康保険加入者は保険料書類を条件付きで確認する

## current_date_logic

Checked against ISA SSW1 renewal material table revised 2026-04-01.

## current_effective_fact

申請時点で申請人が国民健康保険の被保険者である場合、特定技能の第1表では医療保険の資格情報や国民健康保険料納付証明書等が条件付き書類として出ている。

## exceptions_or_transition

- 会社の健康保険か国民健康保険かで必要書類が変わる。
- 猶予通知書やマスキングの要否は表の留意事項を確認する。

## common_user_phrases

- 特定技能 更新 国民健康保険 書類
- 特定技能 国保 納付証明書
- 特定技能 健康保険 資格情報
- 特定技能 续签 国保
- 特定技能 国民健康保険 滞納
- 特定技能 national health insurance document

## must_say

- 国民健康保険加入者は、保険資格情報や納付証明書を条件付きで確認する。

## must_not_say

- 特定技能申請では健康保険の書類は一切見られない。
- 国民健康保険と会社の健康保険は書類上同じ扱いでよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-013 |
