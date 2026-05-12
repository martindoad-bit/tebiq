---
fact_id: prohibited-work-categories
title: 資格外活動許可 — 风俗营业等禁止或高风险工作类别
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
citation_label: "資格外活動許可の禁止・高风险类别"
citation_summary: "资格外活动许可框架不覆盖所有行业；风俗营业等相关类别和违法活动必须作为排除或高风险确认点。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-070
  authority_layer: L2 Ordinance + L4 ISA Page
  legal_source_type: ordinance_isa_page
  law_article_ref: "入管法施行規則第19条5項1号 / ISA資格外活動許可"
  source_locator: "風俗営業等の排除"
  claim_type: prohibited_work_category
  applicable_statuses:
    - "別表第一の在留資格"
  application_type:
    - current-status
  exclusion_scope:
    - "风营法全部类别解释"
    - "具体店铺是否属于风俗营业等"
    - "普通深夜便利店或普通餐饮的最终判断"
  deep_water_candidate: true
applies_when:
  - "用户询问留学生、家族滞在等能否在夜店、酒吧、风俗相关场所工作"
  - "用户以为有资格外活动许可就能做任何行业"
does_not_cover:
  - "具体店铺行业分类"
  - "劳动法、雇佣合同、税社保"
  - "犯罪/违法事实认定"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 3
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-regulation-article19
    url: https://laws.e-gov.go.jp/law/356M50000010054
    title: 出入国管理及び難民認定法施行規則
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-shikakugai-application
    url: https://www.moj.go.jp/isa/applications/procedures/16-8.html
    title: 資格外活動許可申請
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-shikakugai-general
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "資格外活動許可の禁止/高风险工作类别"
direct_fact_fields:
  - prohibited_work_categories
ai_inferred_fields: []
needs_review_flags:
  - id: nightlife_business_classification
    reason: "夜店、酒吧、陪酒、按摩、后台岗位等具体业态需确认是否落入限制类别。"
  - id: ordinary_late_night_work_not_auto_prohibited
    reason: "普通深夜便利店或普通餐饮不应被本卡自动判为禁止类别。"
evidence_points:
  - claim: "资格外活动许可框架对风俗营业等类别有排除或限制。"
    source_title: "出入国管理及び難民認定法施行規則"
    source_url: "https://laws.e-gov.go.jp/law/356M50000010054"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条5項1号"
    display_label: "入管法施行規則第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 风俗营业等禁止或高风险工作类别

## current_date_logic

```text
This card reflects e-Gov regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is a guardrail card and does not classify individual businesses.
```

## current_effective_fact

### Permission does not cover every work category

資格外活動許可の枠組みでは、風俗営業等に関連する業態や法令違反活動を排除又は高リスクとして扱う必要がある。许可、28小时以内、短时间工作，都不能单独覆盖这些类别。

> "風俗営業"
> source: egov-immigration-regulation-article19

> "法令に違反すると認められる活動"
> source: egov-immigration-regulation-article19

## exceptions_or_transition

- 本卡不展开风营法全部类别，也不直接判断具体店铺。
- 不要把普通深夜便利店或普通餐饮自动判成禁止类别；要看具体业态。

## common_user_phrases

- 风俗店
- 风俗相关
- 夜店打工
- 酒吧打工
- 陪酒
- 按摩店
- 禁止工作
- 留学生可以在酒吧打工吗
- 家族滞在可以做夜店吗
- 28小时以内可以在风俗店吗

## must_say

- 资格外活动许可不是所有行业都覆盖。
- 风俗营业等类别应作为高风险排除/确认点。
- 具体店铺是否属于限制类别，需要确认业态。

## must_not_say

- 不要说只要28小时以内就能做风俗相关工作。
- 不要说有资格外活动许可就可以做任何夜间工作。
- 不要仅凭中文店名判断是否合法。

## qa_cases

### QA-1

**user**: 留学生28小时以内可以在风俗店打工吗？

**must_have**:

- 禁止/限制类别
- 不能只看28小时

**must_not_have**:

- 28小时内可以
- 有许可就可以

### QA-2

**user**: 普通便利店夜班也算禁止吗？

**must_have**:

- 具体业态需确认
- 不要自动等同风俗营业

**must_not_have**:

- 一律禁止
- 一律可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-070 |
