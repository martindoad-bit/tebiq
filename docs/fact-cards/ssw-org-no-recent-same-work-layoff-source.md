---
fact_id: ssw-org-no-recent-same-work-layoff-source
title: "特定技能所属機関 — 直近の同種業務離職に注意"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能所属機関: 同種業務離職"
citation_summary: "省令は、契約日前1年以内又は契約日以後に、特定技能契約で外国人が従事する同種業務の労働者を、一定の例外を除いて離職させていないことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-010
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第2号"
  source_locator: "第2条第1項第2号"
  claim_type: receiving_organization_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "離職理由の個別評価"
    - "同種業務該当性"
    - "例外該当性"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "会社が日本人や既存従業員を辞めさせて特定技能を雇えるかを聞く相談"
direct_fact_fields:
  - ssw_org_no_recent_same_work_layoff_source
ai_inferred_fields: []
needs_review_flags:
  - id: same_work_layoff_exception_review
    reason: "離職理由、同種業務、例外該当性は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第2号は、契約日前1年以内又は契約日以後に、同種業務に従事していた労働者を一定の例外を除いて離職させていないことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第2号"
    display_label: "特定技能所属機関: 同種業務離職"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能所属機関 — 直近の同種業務離職に注意

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関について、契約日前1年以内又は契約日以後に、同種業務の労働者を一定の例外を除いて離職させていないことを確認する。

## exceptions_or_transition

- 定年、本人都合、重大理由による解雇、有期契約満了などの例外は個別確認が必要。

## common_user_phrases

- 特定技能 日本人 辞めさせる
- 特定技能 同じ仕事 離職
- 特定技能 1年以内 解雇
- 特定技能 会社 リストラ
- 特定技能 既存従業員 辞めた
- 特定技能 受入機関 離職者

## must_say

- 直近の同種業務の離職は受入機関側の確認点になる。

## must_not_say

- 既存従業員を辞めさせても特定技能には関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-010 |
