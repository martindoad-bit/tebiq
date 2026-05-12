---
fact_id: spouse-or-child-of-japanese-status-includes-spouse-special-adopted-child-child-born
title: 日本人の配偶者等 — 配偶者・特別養子・日本人の子
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 5
citation_label: "日本人の配偶者等の対象範囲"
citation_summary: "日本人の配偶者等は、日本人の配偶者、特別養子、日本人の子として出生した者を対象とする。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-062
  authority_layer: L1 Law + L4 ISA Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法別表第二 日本人の配偶者等"
  source_locator: "日本人の配偶者等の項"
  claim_type: status_scope_detail
  applicable_statuses:
    - "日本人の配偶者等"
  application_type:
    - current-status
  exclusion_scope:
    - "恋人、婚約者、父母、兄弟姐妹"
    - "婚姻实质、离婚、别居、亲子证明"
    - "更新或许可概率"
  deep_water_candidate: true
applies_when:
  - "用户询问日本人の配偶者等对象范围"
does_not_cover:
  - "离婚后可否续签"
  - "父母或恋人路径"
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
  - "日本人の配偶者等の対象範囲"
direct_fact_fields:
  - spouse_or_child_of_japanese_scope_detail
ai_inferred_fields: []
needs_review_flags:
  - id: divorce_or_status_basis_change
    reason: "离婚、分居、婚姻实态变化不由本对象范围卡判断。"
  - id: parent_child_evidence
    reason: "亲子关系证明和出生事实需独立材料/程序卡。"
evidence_points:
  - claim: "日本人の配偶者等 includes Japanese spouse, special adopted child, and child born as a child of a Japanese national."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第二 日本人の配偶者等"
    display_label: "入管法別表第二"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 日本人の配偶者等 — 配偶者・特別養子・日本人の子

## current_date_logic

```text
Checked against e-Gov and ISA status list on 2026-05-12.
This is only an object-scope detail card.
```

## current_effective_fact

日本人の配偶者等は、日本人の配偶者、特別養子、日本人の子として出生した者を対象とする。

## exceptions_or_transition

- 父母、兄弟姐妹、恋人、婚约者不因此当然进入该范围。
- 离婚、别居、婚姻实态、更新可否需要独立确认。

## common_user_phrases

- 日本人孩子能办日配吗
- 日配是不是只包括老婆老公
- 日配
- 日本人配偶者
- 日本人孩子
- 特别养子
- 特別養子
- 日本人父母
- 日本人男朋友

## must_say

- 该资格不是只限配偶者，也包含特别养子和日本人子。
- 身份基础问题需要具体确认。

## must_not_say

- 不要把父母、兄弟姐妹、恋人、婚约者纳入日配对象范围。
- 不要把日配等同家族滞在。
- 不要说离婚后仍当然符合该身份资格。

## qa_cases

### QA-1

**user**: 日本人的孩子属于日本人配偶者等吗？

**must_have**:

- 日本人の子として出生した者

**must_not_have**:

- 只限配偶者

### QA-2

**user**: 我男朋友是日本人，可以办日配吗？

**must_have**:

- 对象范围不含普通恋人

**must_not_have**:

- 恋人也可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 5; LS-P0C1-062 |
