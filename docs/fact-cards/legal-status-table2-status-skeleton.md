---
fact_id: legal-status-table2-status-skeleton
title: 入管法別表第二 — 身分又は地位に基づく在留資格
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 1
citation_label: "入管法別表第二（居住資格）"
citation_summary: "入管法別表第二の在留資格は、活動資格ではなく身分又は地位を基礎とする居住資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法第二条の二第2項 / 別表第二"
  source_locator: "別表第二の上欄・身分若しくは地位"
  claim_type: qualification_distinction
  applicable_statuses:
    - "永住者"
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "定住者"
  application_type:
    - current-status
  exclusion_scope:
    - "身份关系真实性或持续性"
    - "离婚、分居、身份基础丧失后的风险"
    - "个案许可概率"
  deep_water_candidate: false
applies_when:
  - "用户询问身份系在留资格是否有活动范围限制"
  - "用户把永住者、日配、定住者误当活动资格时"
does_not_cover:
  - "离婚或身份基础变化后的在留风险"
  - "永住、定住、配偶者等个案许可判断"
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
  - "別表第二の居住資格"
direct_fact_fields:
  - table2_status_skeleton
ai_inferred_fields: []
needs_review_flags:
  - id: status_basis_change_risk
    reason: "身份基础变化、虚假婚姻、离婚后续签等需要独立卡和 DOMAIN review，不能由本骨架卡直接回答。"
evidence_points:
  - claim: "入管法別表第二は身分又は地位を基礎とする在留資格の骨格である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第二条の二第2項・別表第二"
    display_label: "入管法別表第二"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 入管法別表第二 — 身分又は地位に基づく在留資格

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
Identity-basis change scenarios remain outside this card.
```

## current_effective_fact

入管法別表第二に掲げられる在留資格は、身份或地位为基础，而不是按別表第一那样列举具体活动范围。

> "別表第二の上欄"
> source: egov-immigration-act

> "身分若しくは地位"
> source: egov-immigration-act

ISA 在留資格一覧表では、別表第二側が「居住資格」として整理されている。

> "居住資格"
> source: isa-status-list

## exceptions_or_transition

- This card does not judge whether the identity/status basis is real or continuing.
- Divorce, separation, status loss, and residence cancellation risks require separate cards.

## common_user_phrases

- 永住者能工作吗
- 日配能打工吗
- 定住者可以换工作吗
- 身份签有没有工作限制
- 別表第二
- 居住資格

## must_say

- 別表第二资格的核心是身份或地位。
- 身份系资格的就劳限制不能按家族滞在/留学等活动资格机械套用。

## must_not_say

- 不要说身份系资格需要资格外活动许可才能工作。
- 不要忽略身份基础变化带来的在留风险。

## qa_cases

### QA-1

**user**: 永住者换工作要申请资格外活动许可吗？

**must_have**:

- 別表第二
- 身份或地位
- 不按別表第一活动范围限制

**must_not_have**:

- 需要资格外活动许可
- 一周28小时

### QA-2

**user**: 日配能打工吗？

**must_have**:

- 日本人の配偶者等
- 別表第二

**must_not_have**:

- 家族滞在
- 只能28小时

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 1 |

