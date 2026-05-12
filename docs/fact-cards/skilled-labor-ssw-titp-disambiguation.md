---
fact_id: skilled-labor-ssw-titp-disambiguation
title: 技能・特定技能・技能実習は別制度
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "技能・特定技能・技能実習の区別"
citation_summary: "技能、特定技能、技能実習は別の在留資格・制度であり、それぞれの活動範囲、上陸基準、転入・免除ルールを混同してはいけない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-092
  authority_layer: L1 Law + L2 Ordinance
  legal_source_type: statute_ordinance_current_text
  law_article_ref: "入管法別表第一二の表 / 上陸基準省令 技能・特定技能・技能実習 rows"
  source_locator: "技能 row / 特定技能 row / 技能実習 row"
  claim_type: disambiguation
  applicable_statuses:
    - "技能"
    - "特定技能"
    - "技能実習"
  application_type:
    - landing
    - change
    - current-status
  exclusion_scope:
    - "技能実習良好修了ルールの技能資格への転用"
    - "技能10年ルールの特定技能への転用"
    - "特定技能を技能実習の単純延長として扱うこと"
  deep_water_candidate: true
applies_when:
  - "用户说技能签证但可能指特定技能或技能实习"
  - "用户把技能、特定技能、技能实习混为一谈"
does_not_cover:
  - "具体制度之间的完整转换路径"
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
  - "技能 / 特定技能 / 技能実習 disambiguation"
direct_fact_fields:
  - skilled_labor_ssw_titp_are_distinct
ai_inferred_fields: []
needs_review_flags:
  - id: transition_paths_not_extracted
    reason: "This disambiguation card does not extract full change-of-status or transition rules between systems."
related_fact_cards:
  - skilled-labor-occupation-specific-criteria
  - specified-skilled-worker-1-designated-field-skill-scope
  - technical-intern-training-plan-type-scope
evidence_points:
  - claim: "技能, 特定技能, and 技能実習 are distinct status/system rows and their criteria must not be interchanged."
    source_title: "出入国管理及び難民認定法 / 上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技能 / 特定技能 / 技能実習 rows"
    display_label: "上陸基準省令 技能・特定技能・技能実習 rows"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技能・特定技能・技能実習は別制度

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技能、特定技能、技能実習は、入管法と上陸基準省令上で別々の在留資格・制度として扱われる。中文で「技能签证」と言われた場合でも、`技能`、`特定技能`、`技能実習` のどれを指すのか確認せずに答えてはいけない。

> "技能"
> source: egov-landing-criteria-ordinance

> "特定技能"
> source: egov-landing-criteria-ordinance

> "技能実習"
> source: egov-immigration-act

## exceptions_or_transition

- This is a disambiguation card.
- It does not decide all transition routes.
- It does not import one system's exemption or experience rule into another system.

## common_user_phrases

- 技能 特定技能 技能实习 区别
- 技能签证 是特定技能吗
- 技能实习结束 免考试 技能签
- 技能实习2号良好修了 特定技能
- 技能实习2号良好修了
- 特定技能和技能实习一样吗
- 技能和特定技能区别
- 技能签证 歧义
- 技能实习2号 特定技能
- 技能签到底是哪种
- 技能実習

## must_say

- 技能、特定技能、技能实习是不同制度。
- 用户说“技能签证”时要先澄清。
- 不能把一个制度的免除、经验、考试规则套给另一个制度。

## must_not_say

- 不要把技能实习2号良好修了免除边界套到技能在留资格。
- 不要把技能厨师10年经验套到特定技能。
- 不要把特定技能说成技能实习的简单续签。

## qa_cases

### QA-1

**user**: 我技能实习2号结束了，是不是可以免考试办技能签证？

**must_have**:

- 先区分技能、特定技能、技能实习
- 免除边界不能互套

**must_not_have**:

- 可以直接免考试办技能

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-092 |
