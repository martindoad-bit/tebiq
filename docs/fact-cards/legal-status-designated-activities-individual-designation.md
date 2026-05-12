---
fact_id: legal-status-designated-activities-individual-designation
title: 特定活動 — 個別指定される活動
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
citation_label: "特定活動（個別指定）"
citation_summary: "特定活動は単一の固定活動ではなく、個々の外国人について特に指定される活動であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一五の表 特定活動"
  source_locator: "特定活動欄"
  claim_type: special_designation_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - current-status
  exclusion_scope:
    - "個別の告示内・告示外特定活動類型"
    - "指定書の具体内容"
    - "就労可否・更新可否・家族帯同可否"
  deep_water_candidate: false
applies_when:
  - "ユーザーが特定活動という資格名だけで活動範囲を質問している"
does_not_cover:
  - "特定活動46号など個別類型"
  - "指定書の具体的な活動内容"
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
  - "特定活動の活動範囲確認"
direct_fact_fields:
  - tokutei_katsudo_individual_designation
ai_inferred_fields: []
needs_review_flags:
  - id: specific_designated_activity_type_required
    reason: "特定活動の具体類型は告示・指定書・個別制度ページで確認する必要があり、本カードでは回答しない。"
evidence_points:
  - claim: "特定活動は、法務大臣が個々の外国人について特に指定する活動である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一五の表 特定活動"
    display_label: "特定活動の個別指定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — 個別指定される活動

## current_date_logic

```text
This card reflects the current e-Gov law text and ISA status list checked on 2026-05-12.
Specific designated-activity types require separate source cards.
```

## current_effective_fact

特定活動の活動内容は単一固定ではなく、法務大臣が個々の外国人について特に指定する活動である。

> "特に指定する活動"
> source: egov-immigration-act

> "特定活動"
> source: isa-status-list

## exceptions_or_transition

- This card does not enumerate all designated activity types.
- This card does not answer whether a specific 特定活動 holder can work, renew, or bring family.

## common_user_phrases

- 特定活动可以工作吗
- 特定活動是不是都一样
- 特定活动指定书
- 告示特定活动
- 個別指定
- 特に指定する活動

## must_say

- 看到特定活動时，应确认指定书或具体指定活动内容。
- 不能只凭“特定活動”四个字判断能否工作或能否续签。

## must_not_say

- 不要把所有特定活動当成同一种签证。
- 不要脱离指定内容回答工作范围。

## qa_cases

### QA-1

**user**: 我特定活动签证可以打工吗？

**must_have**:

- 需要看指定活动内容
- 不能只凭特定活動判断

**must_not_have**:

- 一定可以
- 一律不能

### QA-2

**user**: 特定活动是不是就等于找工作签？

**must_have**:

- 个别指定
- 有不同类型

**must_not_have**:

- 等同找工作
- 等同工作签

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

