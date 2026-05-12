---
fact_id: technical-humanities-international-activity-anchor
title: 技術・人文知識・国際業務 — 専門知識又は外国文化基盤業務の活動範囲
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
citation_label: "入管法別表第一二の表（技人国）"
citation_summary: "技術・人文知識・国際業務は、本邦の公私機関との契約に基づく専門知識又は外国文化基盤業務の活動資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-024
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表"
  source_locator: "技術・人文知識・国際業務の項"
  claim_type: activity_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
  exclusion_scope:
    - "学历、职历、专业关联、公司稳定性"
    - "餐饮现场、便利店、销售、副业等具体可否"
    - "许可概率"
  deep_water_candidate: true
applies_when:
  - "用户询问技人国的基本活动范围"
  - "用户把职位名直接等同可否时"
does_not_cover:
  - "具体岗位是否符合技人国"
  - "换工作后的材料、届出、更新"
  - "副业或资格外活动许可"
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
  - "技術・人文知識・国際業務の活動範囲"
direct_fact_fields:
  - gijinkoku_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: job_duty_classification
    reason: "职位名不足以判断实际业务是否符合技人国活动范围。"
  - id: simple_labor_boundary
    reason: "现场服务、便利店、送外卖等需结合活动内容和来源进一步确认。"
evidence_points:
  - claim: "技術・人文知識・国際業務は、本邦の公私機関との契約に基づく専門知識又は外国文化基盤業務を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技術・人文知識・国際業務"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技術・人文知識・国際業務 — 専門知識又は外国文化基盤業務の活動範囲

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is an activity-scope skeleton only; concrete job-fit questions require separate cards or review.
```

## current_effective_fact

### 技人国 is an activity qualification

技術・人文知識・国際業務は入管法別表第一二の表に置かれる活動資格であり、日本の公私機関との契約に基づく専門知識又は外国文化基盤業務を対象とする。

> "本邦の公私の機関との契約"
> source: egov-immigration-act

> "自然科学若しくは人文科学の分野"
> source: egov-immigration-act

> "外国の文化に基盤を有する思考若しくは感受性"
> source: egov-immigration-act

## exceptions_or_transition

- 職位名だけでは、活動範囲に入るか判断しない。
- 学歴、職歴、専攻関連、業務実態は別カード又は DOMAIN review が必要。

## common_user_phrases

- 技人国
- 技術・人文知識・国際業務
- 人文签
- 技术人文国际业务
- 工程师签证
- 翻译
- 市场
- 销售
- 餐厅服务员
- 便利店
- 副业送外卖

## must_say

- 技人国是活动资格，要看实际业务是否属于该活动范围。
- 职位名或雇佣合同本身不足以判断可否。
- 具体岗位可否通常需要进一步确认。

## must_not_say

- 不要说有雇佣合同就一定可以。
- 不要把技人国当作任何白领工作都覆盖。
- 不要对餐厅服务、销售、副业等直接给最终可否结论。

## qa_cases

### QA-1

**user**: 技人国可以做餐厅服务员吗？

**must_have**:

- 活动范围
- 实际业务内容
- 需要进一步确认

**must_not_have**:

- 有合同就可以
- 一定可以

### QA-2

**user**: 技人国能做翻译吗？

**must_have**:

- 外国文化基盘
- 实际业务内容
- 契约

**must_not_have**:

- 职位名即可判断
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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-024 |
