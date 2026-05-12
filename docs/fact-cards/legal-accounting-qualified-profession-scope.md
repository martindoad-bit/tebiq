---
fact_id: legal-accounting-qualified-profession-scope
title: 法律・会計業務 — 法律上資格者による専門業務
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "法律・会計業務"
citation_summary: "法律・会計業務は、法律上資格を有する者が法律又は会計に係る業務を行う活動資格である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-052
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 法律・会計業務"
  source_locator: "法律・会計業務の項"
  claim_type: activity_scope
  applicable_statuses:
    - "法律・会計業務"
  application_type:
    - current-status
  exclusion_scope:
    - "外国资格在日本执业可否"
    - "一般法务/会计助理"
  deep_water_candidate: true
applies_when:
  - "用户询问律师、会计士、税理士、行政书士相关业务是否可用普通工作签"
does_not_cover:
  - "具体职业资格和业务范围"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "法律・会計業務の活動範囲"
direct_fact_fields:
  - legal_accounting_profession_scope
ai_inferred_fields: []
needs_review_flags:
  - id: licensed_profession_scope
    reason: "具体法律/会计职业资格和执业范围需要 DOMAIN review。"
evidence_points:
  - claim: "法律・会計業務は法律上資格者が法律又は会計に係る業務を行う活動資格である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 法律・会計業務"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 法律・会計業務 — 法律上資格者による専門業務

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This is a professional-qualification boundary card.
```

## current_effective_fact

法律・会計業務は、法律上資格者による法律又は会計に係る業務を対象とする資格であり、一般的な法务助理、会计助理、经管经营活动と同一ではない。

## exceptions_or_transition

- 外国资格、日本资格、具体可执业范围需要 DOMAIN review。

## common_user_phrases

- 律师签证
- 会计师签证
- 外国法事务律师
- 法律会计业务
- 税理士
- 行政书士
- 法务助理
- 会计助理

## must_say

- 核心是法律上资格者进行法律/会计业务。

## must_not_say

- 不要把一般法务助理或会计助理直接归入本资格。
- 不要用经管签直接覆盖专业执业业务。

## qa_cases

### QA-1

**user**: 没有日本法律资格能办法律会计业务吗？

**must_have**:

- 法律上资格者

**must_not_have**:

- 普通法务也可以

### QA-2

**user**: 会计助理属于法律会计业务吗？

**must_have**:

- 需看是否法律上资格业务

**must_not_have**:

- 一定属于

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-052 |
