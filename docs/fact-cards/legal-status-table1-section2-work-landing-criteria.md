---
fact_id: legal-status-table1-section2-work-landing-criteria
title: 別表第一二の表 — 就労資格と上陸基準レイヤー
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
citation_label: "別表第一二の表（就労資格・上陸基準）"
citation_summary: "別表第一二の表の就労資格は活動範囲に加えて上陸許可基準レイヤーへ接続することを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  authority_layer: L1 Law + L4 ISA Page
  legal_source_type: statute_current_text_with_official_status_list
  law_article_ref: "入管法第七条第1項第2号 / 別表第一二の表"
  source_locator: "在留資格一覧表 二の表・上陸許可基準"
  claim_type: category_scope
  applicable_statuses:
    - "高度専門職"
    - "経営・管理"
    - "技術・人文知識・国際業務"
    - "特定技能"
    - "技能実習"
  application_type:
    - all
  exclusion_scope:
    - "具体的な上陸基準"
    - "更新審査への適用関係"
    - "個別許可可能性"
  deep_water_candidate: false
applies_when:
  - "ユーザーが技人国・経営管理・特定技能などの資格カテゴリを尋ねている"
does_not_cover:
  - "経営管理の資本金要件"
  - "技人国の学歴・職歴・業務関連性"
  - "特定技能の分野別基準"
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
  - "別表第一二の表の就労資格カテゴリ"
direct_fact_fields:
  - table1_section2_work_category
  - landing_criteria_layer_exists
ai_inferred_fields: []
needs_review_flags:
  - id: concrete_landing_criteria_out_of_scope
    reason: "具体的な上陸基準は P0 Cycle 2 の対象であり、本カードでは回答しない。"
evidence_points:
  - claim: "別表第一二の表の資格は活動範囲に加えて上陸許可基準レイヤーへ接続する。"
    source_title: "出入国在留管理庁：在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格一覧表 二の表・上陸許可基準"
    display_label: "二の表と上陸許可基準"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 別表第一二の表 — 就労資格と上陸基準レイヤー

## current_date_logic

```text
This card reflects the current e-Gov law text and ISA status list checked on 2026-05-12.
Concrete landing criteria are intentionally out of scope.
```

## current_effective_fact

別表第一二の表には、技人国、経営・管理、特定技能など多くの就労活動資格が含まれる。これらは活動範囲に加えて、上陸許可基準レイヤーへ接続する。

> "二の表"
> source: isa-status-list

> "上陸許可基準"
> source: isa-status-list

> "法務省令で定める基準"
> source: egov-immigration-act

## exceptions_or_transition

- This card does not state the concrete criteria for 技人国, 経営・管理, 特定技能, or other statuses.
- This card must route concrete criteria questions to Cycle 2/specific cards.

## common_user_phrases

- 技人国属于哪类
- 经营管理是不是工作签
- 特定技能属于什么资格
- 上陆基准是什么
- 二の表
- 上陸許可基準

## must_say

- 二の表资格既有活动范围，也通常连接上陆基准层。
- 若用户问具体能否获批，需要转入对应基准卡或专业确认。

## must_not_say

- 不要在本卡中写经管新五要件或技人国学历职历细节。
- 不要把“符合活动范围”说成“一定许可”。

## qa_cases

### QA-1

**user**: 经管是不是工作签？

**must_have**:

- 別表第一二の表
- 就劳资格
- 经营/管理活动

**must_not_have**:

- 身份资格
- 一定获批

### QA-2

**user**: 经管资本金要多少？

**must_have**:

- 本卡只定位资格类别
- 具体资本金要件需要看经营管理基准卡

**must_not_have**:

- 500万
- 3000万作为本卡直接结论

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

