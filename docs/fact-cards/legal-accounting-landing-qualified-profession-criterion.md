---
fact_id: legal-accounting-landing-qualified-profession-criterion
title: 法律・会計業務 — 法定資格業務の上陸基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 5
citation_label: "法律・会計業務の資格基準"
citation_summary: "法律・会計業務の上陸基準では、弁護士、司法書士、公認会計士、税理士、行政書士など列挙された資格者として業務に従事することが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-101A
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 法律・会計業務 row"
  source_locator: "法律・会計業務 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "法律・会計業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "外国資格の日本での執業可否"
    - "一般法務・会計補助"
    - "経営・管理との業務境界"
  deep_water_candidate: true
applies_when:
  - "用户问律师、会计师、税理士、行政书士等能否用法律会计业务资格"
  - "用户把普通法务或会计助理当作法律会计业务"
does_not_cover:
  - "具体专业资格取得、注册、执业范围"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "法律・会計業務 landing criteria"
direct_fact_fields:
  - legal_accounting_listed_profession_criterion
ai_inferred_fields: []
needs_review_flags:
  - id: licensed_profession_scope
    reason: "具体法律・会計职业资格和执业范围需要专业确认。"
related_fact_cards:
  - legal-accounting-qualified-profession-scope
  - business-manager-excludes-legal-accounting-qualified-business
evidence_points:
  - claim: "法律・会計業務 landing criteria list lawyer, judicial scrivener, land and house investigator, foreign law solicitor, CPA, tax accountant, labor and social security attorney, patent attorney, maritime procedure agent, administrative scrivener, and related listed professions."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "法律・会計業務 row"
    display_label: "上陸基準省令 法律・会計業務 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 法律・会計業務 — 法定資格業務の上陸基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

法律・会計業務の上陸基準省令 row は、弁護士、司法書士、土地家屋調査士、外国法事務弁護士、公認会計士、外国公認会計士、税理士、社会保険労務士、弁理士、海事代理士又は行政書士としての業務に従事することを示している。

> "弁護士"
> source: egov-landing-criteria-ordinance

> "行政書士"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether a foreign qualification allows practice in Japan.
- It does not cover generic legal assistant, accounting assistant, consulting, translation, or administrative support work.
- It does not replace professional registration or practice-scope checks.

## common_user_phrases

- 法律会计业务 法定资格
- 法律会计 法定资格
- 外国律师 会计师
- 律师签证 资格
- 会计师签证 资格
- 税理士 行政书士 在留资格
- 外国律师 日本执业 在留
- 法务助理 法律会计业务
- 会计助理 法律会计业务
- 法律会计 上陆基准
- 专业资格 业务范围

## must_say

- 法律・会计业务 row 是列举资格者从事对应业务的框架。
- 在留资格判断不能替代职业资格或执业范围判断。
- 普通法务、会计助理、咨询、翻译支持不能直接等同本资格业务。

## must_not_say

- 不要说有海外律师或会计资格即可在日本执业。
- 不要把公司法务、会计助理直接归入法律・会計業務。
- 不要给出最终执业许可结论。

## qa_cases

### QA-1

**user**: 外国律师可以直接办法律会计业务在日本执业吗？

**must_have**:

- 法定资格
- 不能直接判断执业

**must_not_have**:

- 海外资格即可

### QA-2

**user**: 会计助理属于法律会计业务吗？

**must_have**:

- 资格业务边界

**must_not_have**:

- 助理一定属于

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-101 split |
