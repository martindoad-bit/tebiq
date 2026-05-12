---
fact_id: gijinkoku-background-relevance-required
title: 技人国 — 業務と技術・知識の関連性
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "技人国の関連性基準"
citation_summary: "技人国の自然科学・人文科学系ルートでは、従事業務に必要な技術又は知識との関連性が判断点になる。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-010
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row"
  source_locator: "技術・人文知識・国際業務 row 1号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "职位名だけの可否判断"
    - "単純労働・現場サービスの最終判断"
    - "許可確率"
  deep_water_candidate: true
applies_when:
  - "用户问专业、学历、业务内容和技人国是否相关"
does_not_cover:
  - "个案岗位是否最终符合"
  - "现场服务/单纯劳动边界"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
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
  - "技人国 landing criteria"
direct_fact_fields:
  - gijinkoku_background_relevance_required
ai_inferred_fields: []
needs_review_flags:
  - id: job_content_boundary
    reason: "Specific job-content fit remains a DOMAIN/practice boundary."
evidence_points:
  - claim: "技人国 criteria require looking at the work and the technology/knowledge needed for that work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技術・人文知識・国際業務 row 1号"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技人国 — 業務と技術・知識の関連性

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技術・人文知識・国際業務の自然科学・人文科学系ルートでは、従事しようとする業務と、その業務に必要な技術又は知識との関係を確認する必要がある。

> "従事しようとする業務について"
> source: egov-landing-criteria-ordinance

> "これに必要な技術又は知識"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether a concrete sales/service/store job qualifies.
- Simple labor and on-site service examples remain DOMAIN-held.

## common_user_phrases

- 专业相关
- 学历相关
- 文科销售
- 业务内容
- 技人国专业不一致
- 人文签销售
- 职位名

## must_say

- 技人国不能只看职位名。
- 要看实际业务内容和所需技术/知识的关系。

## must_not_say

- 不要说职位名本身就决定可否。
- 不要直接断言餐厅、便利店、销售一定可或不可。

## qa_cases

### QA-1

**user**: 文科毕业能做销售吗？

**must_have**:

- 业务内容
- 相关性

**must_not_have**:

- 销售一定可以
- 销售一定不行

### QA-2

**user**: 专业不完全一致一定不行吗？

**must_have**:

- 看关联
- 不能绝对化

**must_not_have**:

- 完全一致才可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-010 |
