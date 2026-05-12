---
fact_id: student-work-restriction-router
title: 留学 — 工作问题应接资格外活动许可和活动基础确认
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
citation_label: "資格外活動許可（留学）"
citation_summary: "留学的主活动是受教育；打工问题应确认资格外活动许可、许可范围和活动基础，不能只看在留卡有效期。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-065
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_isa_page
  law_article_ref: "入管法第19条 / 入管法施行規則第19条 / ISA 留学資格外活動許可"
  source_locator: "入管法第19条、施行規則第19条5項1号、留学資格外活動許可ページ"
  claim_type: work_restriction_router
  applicable_statuses:
    - "留学"
  application_type:
    - current-status
  exclusion_scope:
    - "毕业后、退学后、休学后能否工作"
    - "出席率、续签影响、学校处分"
    - "具体平台/业务委托工作可否"
  deep_water_candidate: true
applies_when:
  - "用户询问留学生能否打工、兼职、毕业后打工"
  - "用户只看在留卡有效期判断留学生打工"
does_not_cover:
  - "毕业/退学后的具体可否"
  - "28小时多雇主合计措辞"
  - "求职特定活动路径"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 3
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
  - id: isa-student-shikakugai
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html
    title: 留学の資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "留学の工作限制路由"
direct_fact_fields:
  - student_work_restriction_router
ai_inferred_fields: []
needs_review_flags:
  - id: post_graduation_or_withdrawal
    reason: "毕业、退学、休学后能否继续打工需要独立程序卡和 DOMAIN review。"
  - id: gig_or_platform_work
    reason: "平台接单、业务委托等不能只按小时数判断。"
evidence_points:
  - claim: "留学从事收入事业或报酬活动时，应接资格外活动许可框架。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条"
    display_label: "入管法第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 留学 — 工作问题应接资格外活动许可和活动基础确认

## current_date_logic

```text
This card reflects e-Gov law/regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is a routing/guardrail card, not a standalone work-permission conclusion.
```

## current_effective_fact

### 留学 work questions route to qualification-outside-activity

留学的主活动是受教育。留学生工作、兼职、报酬活动问题，应先确认资格外活动许可和许可范围；毕业、退学、休学等活动基础变化不能只看在留卡有效期。

> "報酬を受ける活動"
> source: egov-immigration-act-article19

> "一週について二十八時間以内"
> source: egov-immigration-regulation-article19

## exceptions_or_transition

- 本卡不直接回答毕业后、退学后、求职期间是否还能打工。
- 本卡不处理 28 小时多雇主合算的最终产品化措辞。

## common_user_phrases

- 留学生打工
- 留学签工作
- 学生签兼职
- 留学副业
- 留学生能打工吗
- 毕业后还能继续打工吗
- 退学后打工
- 留学签没过期
- 留学生Uber

## must_say

- 留学工作问题要确认资格外活动许可和许可范围。
- 留学的主活动是教育，工作不能反客为主。
- 毕业、退学、休学后不能只看在留卡是否过期。

## must_not_say

- 不要说留学签可以自由打工。
- 不要说签证没过期就毕业后仍可照常打工。
- 不要只用小时数判断平台接单或业务委托。

## qa_cases

### QA-1

**user**: 留学签可以打工吗？

**must_have**:

- 资格外活动许可
- 许可范围
- 主活动是受教育

**must_not_have**:

- 自由工作
- 全职没问题

### QA-2

**user**: 毕业后还能用留学签打工吗？

**must_have**:

- 活动基础变化
- 需确认对应资格或许可

**must_not_have**:

- 签证没过期就可以
- 照常打工

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-065 |
