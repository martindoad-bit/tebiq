---
fact_id: dependent-spouse-child-landing-relationship
title: 家族滞在 — 被扶養配偶者又は子の関係基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 3
citation_label: "家族滞在の配偶者・子範囲"
citation_summary: "家族滞在は、扶養を受ける配偶者又は子として行う日常的な活動を対象とする。父母や兄弟姐妹を普通に含める資格ではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-060
  authority_layer: L1 Law + L2 Ordinance
  legal_source_type: statute_ordinance_current_text
  law_article_ref: "入管法別表第一四の表 家族滞在 / 上陸基準省令 家族滞在 row"
  source_locator: "家族滞在の項 / 家族滞在 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "家族滞在"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "父母・兄弟姐妹・親戚の普通帯同"
    - "婚約者・同居伴侶"
    - "父母の他の在留経路"
  deep_water_candidate: true
applies_when:
  - "用户问父母、兄弟姐妹、配偶或子女能否走家族滞在"
  - "用户把家族滞在理解成全部亲属团聚"
does_not_cover:
  - "父母长期居留其他路径"
  - "特殊人道个案"
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
    quoted_in_card: true
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "家族滞在 spouse/child relationship criterion"
direct_fact_fields:
  - dependent_spouse_or_child_relationship
ai_inferred_fields: []
needs_review_flags:
  - id: parent_other_routes_not_decided
    reason: "This card does not decide other possible routes for parents or special cases."
related_fact_cards:
  - dependent-sponsor-and-family-member-scope
  - kazoku-taizai-yoken
evidence_points:
  - claim: "家族滞在 is for daily activities as a dependent spouse or child; it should not be expanded to all relatives."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一四の表 家族滞在"
    display_label: "入管法別表第一四の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 家族滞在 — 被扶養配偶者又は子の関係基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

家族滞在は、特定の在留資格者又は留学生の扶養を受ける配偶者又は子として行う日常的な活動を対象とする。普通の家族滞在の範囲を、父母、兄弟姐妹、祖父母、親戚、婚約者などへそのまま拡張してはいけない。

> "配偶者又は子"
> source: egov-immigration-act

> "扶養を受けて"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide other visa/status routes for parents.
- Parent care, long-term cohabitation, and special humanitarian cases require separate review.
- Sponsor status must be checked separately.

## common_user_phrases

- 家族滞在 被扶养 配偶者 子 上陆基准
- 家族滞在对象
- 父母家族滞在
- 妈妈能办家族滞在吗
- 兄弟姐妹家族滞在
- 老婆孩子家族滞在
- 配偶者又は子
- 亲属都能办吗
- 婚约者能办家族滞在吗

## must_say

- 家族滞在核心对象是被扶养的配偶者或子。
- 父母、兄弟姐妹等不能普通扩张进家族滞在对象。
- 父母问题需要另查其他路径或个案。

## must_not_say

- 不要说家属都可以办家族滞在。
- 不要说父母可以直接走普通家族滞在。
- 不要绝对化为父母任何情况下都不能来日本。

## qa_cases

### QA-1

**user**: 我是技人国，可以给妈妈办家族滞在吗？

**must_have**:

- 配偶者或子
- 父母不是普通对象

**must_not_have**:

- 可以直接办

### QA-2

**user**: 婚约者能办家族滞在吗？

**must_have**:

- 配偶者或子
- 不直接纳入

**must_not_have**:

- 婚约者当然可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-060 |
