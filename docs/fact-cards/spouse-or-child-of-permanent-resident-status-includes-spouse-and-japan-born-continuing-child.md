---
fact_id: spouse-or-child-of-permanent-resident-status-includes-spouse-and-japan-born-continuing-child
title: 永住者の配偶者等 — 配偶者と日本出生・継続在留の子
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
citation_label: "永住者の配偶者等の対象範囲"
citation_summary: "永住者の配偶者等は、永住者等の配偶者及び永住者等の子として日本で出生しその後引き続き在留する者を対象とする。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-063
  authority_layer: L1 Law + L4 ISA Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法別表第二 永住者の配偶者等"
  source_locator: "永住者の配偶者等の項"
  claim_type: status_scope_detail
  applicable_statuses:
    - "永住者の配偶者等"
  application_type:
    - current-status
  exclusion_scope:
    - "父母、兄弟姐妹、同居恋人"
    - "海外出生子女路径"
    - "婚姻实质、续签、永住许可"
  deep_water_candidate: true
applies_when:
  - "用户询问永住者の配偶者等对象范围"
does_not_cover:
  - "海外出生子女可否"
  - "永住者父母路径"
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
  - "永住者の配偶者等の対象範囲"
direct_fact_fields:
  - spouse_or_child_of_permanent_resident_scope_detail
ai_inferred_fields: []
needs_review_flags:
  - id: child_birthplace_and_continuity
    reason: "子女出生地和是否继续在留是关键，需要独立事实确认。"
  - id: permanent_resident_etc_scope
    reason: "永住者等的范围和个案身份基础需后续确认。"
evidence_points:
  - claim: "永住者の配偶者等 includes spouse of permanent resident etc. and Japan-born child who continues residing in Japan."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第二 永住者の配偶者等"
    display_label: "入管法別表第二"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者の配偶者等 — 配偶者と日本出生・継続在留の子

## current_date_logic

```text
Checked against e-Gov and ISA status list on 2026-05-12.
This is only an object-scope detail card.
```

## current_effective_fact

永住者の配偶者等は、永住者等の配偶者及び永住者等の子として日本で出生し、その後引き続き日本に在留している者を対象とする。

## exceptions_or_transition

- 父母、兄弟姐妹、恋人はこの対象範囲に当然含まれない。
- 海外出生子女、婚姻实态、永住许可本身は別途確認。

## common_user_phrases

- 永住者孩子是什么签证
- 永住者配偶者能工作吗
- 永配
- 永住者配偶者
- 永住者孩子
- 日本出生
- 永住者の配偶者等
- 永住者父母
- 海外出生孩子

## must_say

- 永配包含配偶者及日本出生并之后继续在留的子这一类。
- 子女出生地和之后是否继续在留是关键。

## must_not_say

- 不要把所有永住者子女都直接归入永配。
- 不要把父母、兄弟姐妹、恋人纳入永配对象范围。
- 不要把永配等同永住者。

## qa_cases

### QA-1

**user**: 永住者在日本出生的孩子属于永配吗？

**must_have**:

- 日本出生
- 之后继续在留

**must_not_have**:

- 任何出生地都可以

### QA-2

**user**: 永住者的父母能办永配吗？

**must_have**:

- 父母不属于配偶者/子对象范围

**must_not_have**:

- 可以按永配

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 5; LS-P0C1-063 |
