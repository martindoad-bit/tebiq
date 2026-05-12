---
fact_id: trainee-technical-intern-training-disambiguation
title: 研修・技能実習 — 別制度として確認する
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
citation_label: "研修と技能実習の区別"
citation_summary: "研修と技能実習は別の在留資格・制度であり、研修 row は研修内容や受入機関等の条件を持ち、技能実習 row は技能実習計画の認定を中心にする。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-122
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 研修 row / 技能実習 row"
  source_locator: "研修 row / 技能実習 row"
  claim_type: disambiguation
  applicable_statuses:
    - "研修"
    - "技能実習"
  application_type:
    - landing
    - change
    - current-status
  exclusion_scope:
    - "技能実習から特定技能への转换"
    - "育成就労制度"
    - "具体研修計画・実務研修比率の最終判断"
  deep_water_candidate: true
applies_when:
  - "用户把研修、实习、技能实习、培训混为一谈"
  - "用户问公司培训能否走研修或技能实习"
does_not_cover:
  - "技能実習计划认定、监督团体、育成就労、转换路线"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
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
  - "研修 / 技能実習 disambiguation"
direct_fact_fields:
  - trainee_and_titp_are_separate_rows
  - technical_intern_training_plan_certification_signal
ai_inferred_fields: []
needs_review_flags:
  - id: transition_and_training_plan_not_extracted
    reason: "研修、技能実習、特定技能、育成就労之间的转换和计划认定需另行确认。"
related_fact_cards:
  - technical-intern-training-plan-type-scope
  - skilled-labor-ssw-titp-disambiguation
evidence_points:
  - claim: "The ordinance has separate rows for Trainee and Technical Intern Training; Technical Intern Training centers on certification of the technical intern training plan."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "研修 row / 技能実習 row"
    display_label: "上陸基準省令 研修・技能実習 rows"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 研修・技能実習 — 別制度として確認する

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

研修と技能実習は、上陸基準省令上で別々の row として扱われる。研修 row は修得しようとする技能等、年齢、帰国後予定、受入機関、実務研修などの条件を持ち、技能実習 row は技能実習計画の認定を中心にする。

> "研修"
> source: egov-landing-criteria-ordinance

> "技能実習計画"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This is a disambiguation card.
- It does not decide training-plan approval, supervising organization issues, or transition to 特定技能.
- It does not cover 育成就労.

## common_user_phrases

- 研修 技能実習 区别
- 研修和技能实习是同一个签证吗
- 公司培训 研修签证
- 先研修再技能实习
- 技能实习计划 研修区别
- 普通培训 能不能研修
- 研修 特定技能 技能实习
- 技能実習計画 認定
- 新人研修 在留资格

## must_say

- 研修与技能実習是不同制度。
- 技能実習中心是技能実習計画认定。
- 用户说培训、实习、研修时要先澄清制度。

## must_not_say

- 不要说研修就是技能实习。
- 不要把技能実習计划、监督团体要求套到研修。
- 不要把研修当成普通就业或低门槛劳动路径。

## qa_cases

### QA-1

**user**: 研修和技能实习是同一个签证吗？

**must_have**:

- 不同制度
- row不同

**must_not_have**:

- 一样

### QA-2

**user**: 公司内部新人研修需要签证吗？

**must_have**:

- 普通培训不直接等于研修在留资格
- 需澄清活动

**must_not_have**:

- 直接办研修即可

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-122 |
