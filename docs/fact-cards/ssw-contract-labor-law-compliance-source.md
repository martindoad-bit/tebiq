---
fact_id: ssw-contract-labor-law-compliance-source
title: "特定技能雇用契約 — 労働法令への適合が入口"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能雇用契約: 労働法令"
citation_summary: "特定技能雇用契約の基準省令は、雇用関係に関する事項について、労働基準法その他の労働に関する法令に適合していることを入口としている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-001
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条"
  source_locator: "第1条柱書"
  claim_type: contract_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別労働法違反の判断"
    - "雇用契約全体の適合性"
    - "許可可否"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の雇用契約が労働法令と関係するかを聞く相談"
direct_fact_fields:
  - ssw_contract_labor_law_compliance_source
ai_inferred_fields: []
needs_review_flags:
  - id: labor_law_compliance_detail_review
    reason: "具体的な労働法令違反や是正状況は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条は、特定技能雇用契約の雇用関係に関する事項について、労働基準法その他の労働に関する法令の規定に適合していることを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条柱書"
    display_label: "特定技能雇用契約: 労働法令"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 労働法令への適合が入口

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約は、労働基準法その他の労働に関する法令に適合していることが入口になる。単に会社と契約書があればよいとは扱わない。

## exceptions_or_transition

- 個別の労働法令違反や是正状況は専門確認が必要。

## common_user_phrases

- 特定技能 雇用契約 労働法
- 特定技能 契約 労基法
- 特定技能 会社 契約 違法
- 特定技能 雇用条件 法律
- 特定技能 労働条件 合法
- 特定技能 契約書 あればいい

## must_say

- 特定技能雇用契約は労働法令への適合を確認する。

## must_not_say

- 契約書さえあれば特定技能の雇用契約は問題ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-001 |
