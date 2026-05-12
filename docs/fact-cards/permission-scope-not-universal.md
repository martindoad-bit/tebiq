---
fact_id: permission-scope-not-universal
title: 資格外活動許可 — 许可范围不是万能工作许可
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 3
citation_label: "資格外活動許可の条件と範囲"
citation_summary: "資格外活動許可は条件や活動要旨に受限，分为包括许可和个别许可；有许可不等于任何工作都能做。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-067
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_isa_page
  law_article_ref: "入管法第19条 / 入管法施行規則第19条"
  source_locator: "資格外活動許可の条件・活動要旨・包括許可/個別許可"
  claim_type: permission_scope
  applicable_statuses:
    - "別表第一の在留資格"
  application_type:
    - current-status
  exclusion_scope:
    - "用户现有许可是否覆盖某具体工作"
    - "自营、开公司、业务委托是否可行"
    - "具体取消风险"
  deep_water_candidate: true
applies_when:
  - "用户以为有资格外活动许可就什么都能做"
  - "用户询问背面许可章、换工作、行业变化、开网店、自营等"
does_not_cover:
  - "具体许可记载内容解释"
  - "个别许可是否需要"
  - "行业分类最终判断"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 4
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act-article19
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: egov-immigration-regulation-article19
    url: https://laws.e-gov.go.jp/law/356M50000010054
    title: 出入国管理及び難民認定法施行規則
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-shikakugai-explainer
    url: https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-shikakugai-general
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "資格外活動許可の範囲限制"
direct_fact_fields:
  - permission_scope_not_universal
ai_inferred_fields: []
needs_review_flags:
  - id: permission_scope_interpretation
    reason: "用户现有许可的具体覆盖范围需看许可记载和活动内容。"
  - id: self_employment_or_company_setup
    reason: "自营、开网店、公司经营可能超出包括许可。"
evidence_points:
  - claim: "资格外活动许可可以附条件，且许可范围需看活动内容和许可类型。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条"
    display_label: "入管法第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 许可范围不是万能工作许可

## current_date_logic

```text
This card reflects e-Gov law/regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is a guardrail card against over-generalizing permission.
```

## current_effective_fact

### Permission scope must be checked

資格外活動許可は、许可条件、活动要旨、包括许可/个别许可等范围限制下运作。有资格外活动许可，不等于任何副业、任何行业、任何工时、任何雇佣形态都被允许。

> "条件を付することができる"
> source: egov-immigration-act-article19

> "包括的に許可"
> source: egov-immigration-regulation-article19

> "個々の活動ごとに許可"
> source: egov-immigration-regulation-article19

## exceptions_or_transition

- 本卡不判断用户现有许可章是否覆盖具体工作。
- 包括许可外的活动可能需要个别许可、资格变更或专业确认。

## common_user_phrases

- 资格外活动不是万能
- 有资格外活动许可可以做任何副业吗
- 打工许可范围
- 包括许可
- 个别许可
- 许可条件
- 背面有章
- 换工作也不用管吗
- 打工许可可以开网店吗

## must_say

- 要看许可内容和条件。
- 包括许可外的活动可能需要个别许可或其他手续。
- 资格外活动许可不是万能工作许可。

## must_not_say

- 不要说有资格外活动许可就什么副业都能做。
- 不要说 28 小时以内任何工作都可以。
- 不要忽略许可取消或条件违反风险。

## qa_cases

### QA-1

**user**: 有资格外活动许可，可以做任何副业吗？

**must_have**:

- 许可范围
- 包括许可/个别许可
- 不是万能

**must_not_have**:

- 任何都可以
- 只看有无许可

### QA-2

**user**: 我有28小时许可，可以开网店吗？

**must_have**:

- 许可范围外需个别判断
- 自营/经营形态需确认

**must_not_have**:

- 28小时内就可以
- 一定可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-067 |
