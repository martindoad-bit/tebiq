---
fact_id: ssw1-support-plan-registered-support-org-delegation-source
title: "特定技能1号 — 登録支援機関へ全部委託する場合の記載"
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
citation_label: "特定技能1号: 登録支援機関への委託"
citation_summary: "省令は、適合1号特定技能外国人支援計画の全部を登録支援機関に委託する場合、登録支援機関登録簿に登録された事項及び契約内容を支援計画に記載することを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-018
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第3条第1項第2号"
  source_locator: "第3条第1項第2号"
  claim_type: support_plan_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "登録支援機関の登録要件"
    - "委託契約の十分性"
    - "支援実施責任の分担"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関に全部委託する場合の支援計画記載を聞く相談"
direct_fact_fields:
  - ssw1_support_plan_registered_support_org_delegation_source
ai_inferred_fields: []
needs_review_flags:
  - id: registered_support_org_delegation_detail_review
    reason: "登録支援機関の登録状況、委託契約内容、責任分担は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第3条第1項第2号は、適合1号特定技能外国人支援計画の全部を登録支援機関に委託する場合、登録支援機関登録簿に登録された事項及び契約内容を記載することを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第3条第1項第2号"
    display_label: "特定技能1号: 登録支援機関委託"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 登録支援機関へ全部委託する場合の記載

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

1号支援計画の全部を登録支援機関に委託する場合は、登録支援機関登録簿に登録された事項と委託契約の内容を支援計画に記載する。

## exceptions_or_transition

- 委託契約の十分性や登録支援機関の登録状況は個別確認が必要。

## common_user_phrases

- 特定技能 登録支援機関 全部委託
- 特定技能 支援計画 委託契約
- 登録支援機関 支援計画 記載
- 特定技能 支援 全部委託
- 特定技能 登録支援機関 契約内容
- 特定技能 support plan registered support organization
- 登録支援機関 全部委託 会社 何もしない

## must_say

- 全部委託時は登録事項と委託契約内容を支援計画に記載する。

## must_not_say

- 登録支援機関に頼めば支援計画の記載は不要。
- 登録支援機関に全部委託すれば受入機関は何もしなくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-018 |
