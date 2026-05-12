---
fact_id: business-manager-activity-anchor
title: 経営・管理 — 事業の経営又は管理に従事する活動
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 2
citation_label: "入管法別表第一二の表（経営・管理）"
citation_summary: "経営・管理は、事業の経営又は管理に従事する活動を対象とする別表第一二の表の活動資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-019
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表"
  source_locator: "経営・管理の項"
  claim_type: activity_scope
  applicable_statuses:
    - "経営・管理"
  application_type:
    - current-status
  exclusion_scope:
    - "2025年改正要件、資本金、常勤職員、事業計画"
    - "会社赤字、事務所、経営実態の個案判断"
    - "他社雇用労働や副業の可否"
  deep_water_candidate: true
applies_when:
  - "用户询问経営・管理的基本活动范围"
  - "用户把経営・管理误当成任何工作都能做的签证"
does_not_cover:
  - "経営・管理の許可基準"
  - "副业、雇佣劳动、店内劳动的个案可否"
  - "2025年10月改正后的具体申请要件"
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
  - "経営・管理の活動範囲"
direct_fact_fields:
  - business_manager_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: business_manager_side_work
    reason: "経営・管理で他社雇用労働、副業、現場労働ができるかは、本カードだけでは判断しない。"
  - id: business_manager_2025_amendment
    reason: "2025年改正要件は別カードで扱う。"
evidence_points:
  - claim: "経営・管理は、事業の経営又は管理に従事する活動を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 経営・管理"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 経営・管理 — 事業の経営又は管理に従事する活動

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is a routing/activity-scope skeleton only.
```

## current_effective_fact

### 経営・管理 is an activity qualification

経営・管理は入管法別表第一二の表に置かれる活動資格であり、対象は日本で事業の経営を行う活動又はその事業の管理に従事する活動である。

> "事業の経営を行い"
> source: egov-immigration-act

> "当該事業の管理に従事する活動"
> source: egov-immigration-act

This does not make 経営・管理 a generic open work permission.

## exceptions_or_transition

- 2025年10月改正の資本金、常勤職員、経営能力、事業計画要件は別カードで扱う。
- 他社での雇用労働、コンビニ勤務、現場労働、副業は本カード単独では判断しない。

## common_user_phrases

- 経営管理
- 経営・管理
- 经管签
- 经营管理签证
- 开公司
- 公司经营
- 管理者
- 役员
- 经管签可以打工吗
- 去别家公司上班

## must_say

- 経営・管理は事業の経営又は管理を対象とする活動資格である。
- 他社雇用労働や単純な打工を当然に含むわけではない。
- 具体的な副業、現場労働、会社実態は別途確認が必要。

## must_not_say

- 不要说経営・管理可以自由打工。
- 不要把経営・管理当作任何工作都能做的签证。
- 不要用本卡回答资本金、常勤职员、事业计划等新要件。

## qa_cases

### QA-1

**user**: 经管签可以去别的公司打工吗？

**must_have**:

- 経営又は管理
- 他社雇用労働は当然に含まれない
- 需要另行确认资格外活动或变更

**must_not_have**:

- 自由工作
- 等同永住

### QA-2

**user**: 经管现在要3000万吗？

**must_have**:

- 本卡只处理活动范围
- 进入经营管理要件/改正卡

**must_not_have**:

- 本卡直接判断
- 500万即可

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-019 |
