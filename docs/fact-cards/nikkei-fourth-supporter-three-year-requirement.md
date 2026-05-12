---
fact_id: nikkei-fourth-supporter-three-year-requirement
title: "日系四世 — 受入れサポーターの支援"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "日系四世受入れサポーター"
citation_summary: "ISA は、日系四世制度では通算3年間、日系四世受入れサポーターの支援を受けることを必須とし、サポーターは無償で生活・医療情報や入管手続の援助等を行うと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-013
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "日系四世の更なる受入制度"
  source_locator: "日系四世受入れサポーター"
  claim_type: support_requirement
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - period_renewal
  exclusion_scope:
    - "サポーター適格性"
    - "団体掲載の最終判断"
    - "手続実費"
  deep_water_candidate: true
official_sources:
  - id: isa-nikkei-fourth
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html
    title: 日系四世の更なる受入制度
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系四世受入れサポーターの相談"
direct_fact_fields:
  - nikkei_fourth_supporter_three_year_requirement
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_fourth_supporter_eligibility
    reason: "個人・団体サポーターの適格性は手引きと個別状況確認が必要。"
evidence_points:
  - claim: "ISA は、日系四世制度では通算3年間サポーターの支援を受けることを必須とし、無償支援を行う存在として説明している。"
    source_title: "日系四世の更なる受入制度"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html"
    source_organization: "出入国在留管理庁"
    source_locator: "日系四世受入れサポーター"
    display_label: "日系四世: 受入れサポーター"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日系四世 — 受入れサポーターの支援

## current_date_logic

Checked against ISA resource page on 2026-05-12.

## current_effective_fact

日系四世制度では、通算3年間、日系四世受入れサポーターの支援を受けることが必須と説明されている。

## exceptions_or_transition

- サポーターの掲載や承諾だけで適格性が確定するわけではない。

## common_user_phrases

- 日系四世 サポーター
- 日系4世 受入れサポーター
- 日系四世 支援者
- 日系4世 サポーター 必要
- 日裔四世 支援人

## must_say

- サポーター要件は日系四世制度の中核として確認する。

## must_not_say

- サポーターなしでも当然使えると言う。
- サポーター掲載だけで在留許可が決まると言う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-013 |
