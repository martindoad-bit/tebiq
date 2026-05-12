---
fact_id: permanent-permission-legal-three-part-core
title: 永住許可 — 法律上の三つの中核要件
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住許可の法律上の中核は素行・生計・国益"
citation_summary: "入管法第22条第2項は、永住許可について、素行善良、独立生計、永住が日本国の利益に合すると認められることを中核要件として置いている。単一項目だけで許可が決まる制度ではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: C4-002
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条第2項"
  source_locator: "永住許可の要件"
  claim_type: eligibility_core
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "永住許可の個別可否判断"
  deep_water_candidate: false
applies_when:
  - "用户问永住主要看什么、住满年数是否就够"
does_not_cover:
  - "个案获批概率"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_permission_legal_three_part_core
ai_inferred_fields: []
needs_review_flags:
  - id: approval_probability_not_inferred
    reason: "三要件の存在は個別許可を保証しない。"
evidence_points:
  - claim: "入管法第22条第2項は、永住許可について、素行善良、独立生計、永住が日本国の利益に合すると認められることを中核要件として置いている。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第22条第2項"
    display_label: "永住許可：素行善良・独立生計・国益適合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可 — 法律上の三つの中核要件

## current_date_logic

Checked against the current law text on 2026-05-12.

## current_effective_fact

永住許可の法律上の中核には、素行善良、独立生計、永住が日本国の利益に合すると認められることがある。単一項目だけで許可が決まる制度ではない。

## exceptions_or_transition

- 日本人・永住者・特別永住者の配偶者又は子については、法律上の一部要件の扱いが異なるため、別途確認する。

## common_user_phrases

- 永住 条件 三つ
- 永住 素行善良 独立生計 国益
- 永住 住满 就可以
- 永住申请 主要看什么
- 永住 要件 法律
- 永住 是否一定批

## must_say

- 法律上の中核は素行善良、独立生計、国益適合。
- 単一項目だけでは許可判断を決められない。

## must_not_say

- 住んだ年数だけで永住が決まる。
- 税や年金だけで永住が必ず許可される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-002 |
