---
fact_id: business-manager-excludes-legal-accounting-qualified-business
title: 経営・管理 — 法律・会計資格業務の排除
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
citation_label: "経営・管理の法律・会計業務排除"
citation_summary: "経営・管理は事業の経営又は管理を対象とするが、法律・会計業務資格がなければ法律上できない事業は排除される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-046
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 経営・管理"
  source_locator: "経営・管理の項"
  claim_type: exclusion_scope
  applicable_statuses:
    - "経営・管理"
  application_type:
    - current-status
  exclusion_scope:
    - "具体事业是否需要法律/会计资格"
    - "本人执业资格、法人经营主体、许可概率"
  deep_water_candidate: true
applies_when:
  - "用户询问经管签能否经营或亲自从事法律/会计类专业业务"
does_not_cover:
  - "行政书士、税理士、律师等具体业务可否"
  - "2025年経営・管理改正要件"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "経営・管理の排除範囲"
direct_fact_fields:
  - business_manager_excludes_legal_accounting_business
ai_inferred_fields: []
needs_review_flags:
  - id: regulated_profession_boundary
    reason: "经营主体、本人执业、专业资格业务的边界需要 DOMAIN review。"
evidence_points:
  - claim: "経営・管理には法律・会計業務資格がなければ法律上できない事業の排除がある。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 経営・管理"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 経営・管理 — 法律・会計資格業務の排除

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This is a routing/exclusion card, not a regulated-profession opinion.
```

## current_effective_fact

経営・管理は事業の経営又は管理を対象とするが、法律・会計業務資格がなければ法律上できない事業については排除がある。

## exceptions_or_transition

- どの事業が法律・会計資格業務に当たるかは本カードで判断しない。
- 経営主体と本人の有資格業務従事は分けて確認する。

## common_user_phrases

- 经管签可以开会计事务所吗
- 经管能做法律咨询公司吗
- 经营管理
- 法律会计业务
- 律师事务所
- 会计事务所
- 行政书士事务所

## must_say

- 经管不是覆盖所有事业经营。
- 涉及法律/会计资格业务时，需要单独确认。

## must_not_say

- 不要说开任何公司都属于经管。
- 不要说经管签即可亲自做法律/会计执业业务。

## qa_cases

### QA-1

**user**: 经管签可以经营会计事务所吗？

**must_have**:

- 法律会计资格业务排除
- 需确认资格

**must_not_have**:

- 经管一定可以

### QA-2

**user**: 经管是不是开任何公司都行？

**must_have**:

- 经营管理活动范围
- 排除项

**must_not_have**:

- 任何公司都行

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-046 |
