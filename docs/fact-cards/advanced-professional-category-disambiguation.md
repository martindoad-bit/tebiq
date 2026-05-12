---
fact_id: advanced-professional-category-disambiguation
title: 高度専門職 — 1号イ・ロ・ハを混同しない
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
citation_label: "高度専門職1号の活動分類"
citation_summary: "高度専門職1号はイ・ロ・ハの活動分類で整理され、研究、専門・技術、経営・管理などの活動を同じ条件として混同してはいけない。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-111
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_status_page
  law_article_ref: "入管法別表第一二の表 高度専門職 / 上陸基準省令 高度専門職 row"
  source_locator: "高度専門職 row / ISA 高度専門職説明"
  claim_type: disambiguation
  applicable_statuses:
    - "高度専門職1号イ"
    - "高度専門職1号ロ"
    - "高度専門職1号ハ"
    - "高度専門職2号"
  application_type:
    - landing
    - change
    - current-status
  exclusion_scope:
    - "具体点数計算"
    - "永住短縮の最終判断"
    - "各カテゴリの全資料"
  deep_water_candidate: true
applies_when:
  - "用户问高度専門職1号イロハ区别"
  - "用户把研究、技术、经营类高度人才条件混在一起"
does_not_cover:
  - "具体分类适用和点数精算"
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
  - "高度専門職 category disambiguation"
direct_fact_fields:
  - advanced_professional_category_disambiguation
ai_inferred_fields: []
needs_review_flags:
  - id: category_fit_not_decided
    reason: "具体活动属于イ、ロ、ハ哪一类以及点数适用需另行确认。"
related_fact_cards:
  - advanced-professional-landing-points-router
  - kodo-senmon-shoku-points
  - kodo-senmon-shoku-eijuu
evidence_points:
  - claim: "高度専門職1号 is organized by activity categories, and the ordinance cross-references whether the intended activity falls in the relevant activity rows."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "高度専門職 row"
    display_label: "上陸基準省令 高度専門職 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職 — 1号イ・ロ・ハを混同しない

## current_date_logic

```text
Checked against e-Gov current law text and ISA status page on 2026-05-12.
```

## current_effective_fact

高度専門職1号は、研究・専門技術・経営管理などの活動分類を区別して確認する必要がある。ユーザーが「高度人才」とだけ言っている場合、研究者型、専門・技術型、経営管理型などを混ぜて答えてはいけない。

> "高度専門職"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide the applicant's category.
- It does not calculate points.
- It does not decide permanent residence timing.

## common_user_phrases

- 高度専門職1号イ ロ ハ
- 高度専門職1号イロハ
- 高度1号分类
- 高度人才 研究 技术 经营 区别
- 高度専門職类别怎么分
- 高度専門職 イロハ 区别
- 高度人材 活动分类
- 高度1号ロ 高度1号ハ
- 高度専門職 研究人员 公司职员 经营者

## must_say

- 高度専門職1号要区分イ、ロ、ハ等活动分类。
- 研究、技术/专业、经营管理不能混成一个条件。
- 分类和点数适用需看具体活动与对应来源。

## must_not_say

- 不要把高度人才所有分类写成一个条件。
- 不要把经营类高度条件套到研究类或技术类。
- 不要在本卡判断点数或永住。

## qa_cases

### QA-1

**user**: 高度専門職1号イロハ有什么区别？

**must_have**:

- 分类
- 不能混用

**must_not_have**:

- 条件都一样

### QA-2

**user**: 我是研究人员/公司职员/经营者，高度専門職类别怎么分？

**must_have**:

- 先按活动分类

**must_not_have**:

- 直接给最终分类

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-111 |
