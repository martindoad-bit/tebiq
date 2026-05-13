---
fact_id: ssw-renewal-applicant-tax-docs-conditional-source
title: "特定技能 — 更新申請でも住民税・源泉徴収票を条件付きで確認する"
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
citation_label: "特定技能: 更新申請の税関係書類"
citation_summary: "特定技能の更新用第1表は、申請人の個人住民税の納税証明書、課税証明書、源泉徴収票の写しを条件付き書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-012
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 更新用第1表 税関係書類"
  source_locator: "更新用第1表 項番6から8"
  claim_type: conditional_material_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "更新許可可否"
    - "滞納・猶予の評価"
    - "証明年度の個別選択"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-renew-table1
    url: https://www.moj.go.jp/isa/content/001459973.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能更新時に税金関係書類が必要かを聞く相談"
direct_fact_fields:
  - ssw_renewal_applicant_tax_docs_conditional
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_renewal_tax_year_review
    reason: "証明年度、過去提出済み書類の省略可否、滞納・猶予の扱いは個別確認が必要。"
evidence_points:
  - claim: "特定技能1号の更新用第1表は、申請人の個人住民税の納税証明書、課税証明書、給与所得の源泉徴収票の写しを条件付き書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番6から8"
    display_label: "特定技能: 更新申請の税関係書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 更新申請でも住民税・源泉徴収票を条件付きで確認する

## current_date_logic

Checked against ISA SSW1 renewal material table revised 2026-04-01.

## current_effective_fact

特定技能の更新申請では、申請人の住民税納税証明書、課税証明書、給与所得の源泉徴収票の写しが条件付き書類として第1表に出ている。

## exceptions_or_transition

- 過去1年以内に提出済みで内容変更がない場合など、省略可否の条件がある。
- 滞納や納税緩和措置がある場合は個別確認が必要。

## common_user_phrases

- 特定技能 更新 住民税 納税証明書
- 特定技能 更新 課税証明書
- 特定技能 更新 源泉徴収票
- 特定技能 续签 税金 書類
- 特定技能 更新 税金 滞納
- 特定技能 renewal tax certificate

## must_say

- 更新申請でも住民税・課税証明・源泉徴収票を条件付きで確認する。

## must_not_say

- 特定技能更新では税関係書類は一切見られない。
- 税金の滞納があっても書類上は何も確認しなくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-012 |
