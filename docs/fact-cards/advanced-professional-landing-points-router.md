---
fact_id: advanced-professional-landing-points-router
title: 高度専門職 — ポイント制ソースへ接続する上陸基準ルーター
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
citation_label: "高度専門職のポイント制ルーター"
citation_summary: "高度専門職の上陸基準は、上陸基準省令だけで完結せず、高度専門職の基準省令・ポイント制・ISAの高度専門職ページへ接続して確認する必要がある。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-110
  authority_layer: L2 Ordinance + L4 ISA Page
  legal_source_type: ordinance_status_page
  law_article_ref: "上陸基準省令 高度専門職 row / 高度専門職基準省令"
  source_locator: "高度専門職 row / ISA 在留資格「高度専門職」"
  claim_type: routing_boundary
  applicable_statuses:
    - "高度専門職1号"
    - "高度専門職2号"
  application_type:
    - landing
    - change
    - renewal
  exclusion_scope:
    - "ポイント具体配点"
    - "永住短縮の最終判断"
    - "J-Skip/J-Find詳細"
  deep_water_candidate: true
applies_when:
  - "用户问高度専門職申请条件、点数、70点、80点"
  - "用户把高度専門職和永住短缩直接混为一个结论"
does_not_cover:
  - "点数精算、永住申请材料、J-Skip/J-Find"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-highly-skilled-professional
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
    title: 在留資格「高度専門職」（高度人材ポイント制）
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "高度専門職 routing"
direct_fact_fields:
  - advanced_professional_points_source_router
  - advanced_professional_not_immediate_permanent_residence_answer
ai_inferred_fields: []
needs_review_flags:
  - id: point_calculation_not_extracted
    reason: "具体点数、加算、永住短缩路径需要对应来源和既有高度専門職卡确认。"
related_fact_cards:
  - kodo-senmon-shoku-points
  - kodo-senmon-shoku-eijuu
evidence_points:
  - claim: "The landing-criteria ordinance points Highly Skilled Professional 1 to the separate standards ordinance for highly skilled professional activities."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "高度専門職 row"
    display_label: "上陸基準省令 高度専門職 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA explains Highly Skilled Professional status through the points system and categories for Highly Skilled Professional 1 and 2."
    source_title: "在留資格「高度専門職」（高度人材ポイント制）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭説明"
    display_label: "ISA 高度専門職ページ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職 — ポイント制ソースへ接続する上陸基準ルーター

## current_date_logic

```text
Checked against e-Gov current law text and ISA status page on 2026-05-12.
```

## current_effective_fact

高度専門職の上陸基準省令 row は、高度専門職の別基準省令への適合を参照している。ISAの高度専門職ページも、高度人材ポイント制で学歴・職歴・年収等の項目ごとにポイントを付け、その合計が一定点数以上に達した人を対象にする制度として説明している。

> "高度専門職"
> source: egov-landing-criteria-ordinance

> "ポイント"
> source: isa-highly-skilled-professional

## exceptions_or_transition

- This is a router card.
- It does not calculate points.
- It does not decide permanent residence timing or guarantee approval.
- It should route 永住 questions to existing 高度専門職/永住 cards.

## common_user_phrases

- 高度専門職 points 点数表
- 高度人才70分怎么判断
- 高度専門職 评分表
- 高度人才 点数制
- 高度専門職申请条件
- 高度専門職 永住 能不能马上
- 高度人才 70点 80点
- 高度専門職 ポイント計算
- 高度人材ポイント制

## must_say

- 高度専門職问题要接到点数制和对应高度専門職来源确认。
- 本卡只负责路由，不计算点数，也不判断永住。
- 涉及永住时应转到高度専門職永住/点数相关卡。

## must_not_say

- 不要说70点就马上永住。
- 不要在本卡里直接计算点数或判断能否获批。
- 不要覆盖既有高度専門職点数和永住卡。

## qa_cases

### QA-1

**user**: 高度人才70分怎么判断？

**must_have**:

- 点数制
- 路由到点数来源

**must_not_have**:

- 直接算分

### QA-2

**user**: 高度人才70点可以马上永住吗？

**must_have**:

- 不能马上下结论
- 转高度永住规则

**must_not_have**:

- 70点马上永住

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-110 |
