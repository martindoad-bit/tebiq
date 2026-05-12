---
fact_id: spouse-or-child-of-japanese-status-anchor
title: 日本人の配偶者等 — 日本人の配偶者・特別養子・日本人の子として出生した者
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 2
citation_label: "入管法別表第二（日本人の配偶者等）"
citation_summary: "日本人の配偶者等は、別表第二の身分又は地位に基づく在留資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-041
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第二"
  source_locator: "日本人の配偶者等の項"
  claim_type: status_scope
  applicable_statuses:
    - "日本人の配偶者等"
  application_type:
    - current-status
  exclusion_scope:
    - "婚姻実体、離婚、別居、更新可否"
    - "就劳可否的个案边界"
    - "永住との同一視"
  deep_water_candidate: true
applies_when:
  - "用户询问日配是否按家族滞在/留学限制工作"
  - "用户把日本人の配偶者等误当家族滞在"
does_not_cover:
  - "离婚、分居、婚姻实态"
  - "续签可否或身份基础丧失风险"
  - "永住申请或永住者身份"
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
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "日本人の配偶者等の身分又は地位"
direct_fact_fields:
  - spouse_or_child_of_japanese_status_scope
ai_inferred_fields: []
needs_review_flags:
  - id: divorce_or_separation_status_basis
    reason: "离婚、分居、婚姻实态变化需要独立卡和 DOMAIN review。"
  - id: not_equivalent_to_permanent_residence
    reason: "日本人の配偶者等不应被表述为等同永住。"
evidence_points:
  - claim: "日本人の配偶者等は別表第二の在留資格である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第二 日本人の配偶者等"
    display_label: "入管法別表第二"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 日本人の配偶者等 — 日本人の配偶者・特別養子・日本人の子として出生した者

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is a status-scope skeleton only; identity-basis change scenarios remain outside this card.
```

## current_effective_fact

### 日本人の配偶者等 is a status qualification

日本人の配偶者等は入管法別表第二に置かれる在留資格であり、日本人の配偶者、特別養子、日本人の子として出生した者を対象とする。

> "日本人の配偶者"
> source: egov-immigration-act

> "特別養子"
> source: egov-immigration-act

> "日本人の子として出生した者"
> source: egov-immigration-act

## exceptions_or_transition

- 離婚、別居、婚姻実体、更新可否は本カードで判断しない。
- 日配は永住と同じではない。

## common_user_phrases

- 日配
- 日本人配偶者
- 日本人の配偶者等
- 日本人孩子
- 日本人配偶者签证
- 身份签
- 日配能打工吗
- 日配离婚后还能工作吗

## must_say

- 日本人の配偶者等は別表第二の身份/地位系资格。
- 工作限制问题和身份基础变化问题要分开。
- 离婚、分居、婚姻实态变化需要独立确认。

## must_not_say

- 不要说日配等同家族滞在或一周28小时。
- 不要说日配等同永住。
- 不要说离婚后只要能工作就没有在留风险。

## qa_cases

### QA-1

**user**: 日本人配偶者签证可以打工吗？

**must_have**:

- 別表第二
- 身份/地位
- 不等同家族滞在

**must_not_have**:

- 28小时
- 资格外活动许可

### QA-2

**user**: 我日配离婚了，还能继续工作吗？

**must_have**:

- 工作限制和身份基础风险分开
- 需确认离婚后的在留处理

**must_not_have**:

- 没事
- 一定可以续签

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-041 |
