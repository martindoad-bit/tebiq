---
fact_id: ssw-wage-payment-bank-verifiable-source
title: "特定技能雇用契約 — 報酬支払方法も確認点"
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
citation_label: "特定技能雇用契約: 報酬支払方法"
citation_summary: "省令は、特定技能雇用契約に基づく外国人の報酬について、本人指定の銀行口座等への振込み又は現実に支払われた額を確認できる方法で支払うことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-015
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第12号"
  source_locator: "第2条第1項第12号"
  claim_type: remuneration_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
  exclusion_scope:
    - "現金払いの個別可否"
    - "控除・未払い賃金"
    - "支払記録の十分性"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の給与支払方法を聞く相談"
direct_fact_fields:
  - ssw_wage_payment_bank_verifiable_source
ai_inferred_fields: []
needs_review_flags:
  - id: wage_payment_method_detail_review
    reason: "現金払い、控除、未払い、証拠資料は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第12号は、特定技能雇用契約に基づく外国人の報酬を、本人指定の銀行口座等への振込み又は現実に支払われた額を確認できる方法で支払うことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第12号"
    display_label: "特定技能雇用契約: 報酬支払方法"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 報酬支払方法も確認点

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能の報酬は、本人指定の銀行口座等への振込み又は現実に支払われた額を確認できる方法で支払うことを確認する。

## exceptions_or_transition

- 現金払い、控除、未払い、証拠資料の十分性は個別確認が必要。

## common_user_phrases

- 特定技能 給料 現金払い
- 特定技能 給与 振込
- 特定技能 報酬 支払方法
- 特定技能 給料 手渡し
- 特定技能 給与明細 証拠
- 特定技能 bank transfer salary

## must_say

- 報酬支払方法も確認点になる。

## must_not_say

- 特定技能の給与は記録なしの現金払いでよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-015 |
