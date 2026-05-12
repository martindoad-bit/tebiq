---
fact_id: long-term-resident-status-anchor
title: 定住者 — 法務大臣が特別な理由を考慮して居住を認める者
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 2
citation_label: "入管法別表第二（定住者）"
citation_summary: "定住者は、法務大臣が特別な理由を考慮して一定の在留期間を指定し居住を認める別表第二の在留資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-043
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第二"
  source_locator: "定住者の項"
  claim_type: status_scope
  applicable_statuses:
    - "定住者"
  application_type:
    - current-status
  exclusion_scope:
    - "定住者告示、日系、離婚後定住等の個別路径"
    - "特別な理由の个案判断"
    - "永住との同一視"
  deep_water_candidate: true
applies_when:
  - "用户询问定住者是否按活动资格限制工作"
  - "用户把定住者等同永住或通用家庭带同资格"
does_not_cover:
  - "定住者告示路径"
  - "离婚后定住、日系定住等个案"
  - "续签或永住申请判断"
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
  - "定住者の身分又は地位"
direct_fact_fields:
  - long_term_resident_status_scope
ai_inferred_fields: []
needs_review_flags:
  - id: teijusha_notice_path_required
    reason: "定住者の具体路径需要定住者告示等后续来源。"
  - id: not_equivalent_to_permanent_residence
    reason: "定住者不应被表述为等同永住。"
evidence_points:
  - claim: "定住者は別表第二の在留資格であり、特別な理由を考慮して居住を認める者を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第二 定住者"
    display_label: "入管法別表第二"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 法務大臣が特別な理由を考慮して居住を認める者

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is a status-scope skeleton only.
```

## current_effective_fact

### 定住者 is a status qualification

定住者は入管法別表第二に置かれる在留資格であり、法務大臣が特別な理由を考慮して一定の在留期間を指定し居住を認める者を対象とする。

> "特別な理由を考慮し"
> source: egov-immigration-act

> "一定の在留期間を指定して居住を認める者"
> source: egov-immigration-act

## exceptions_or_transition

- 定住者告示、日系、離婚後定住などの具体路径は本カードで判断しない。
- 定住者は永住と同じではない。

## common_user_phrases

- 定住者
- 定住签证
- 定住者可以工作吗
- 定住者夜班
- 日系定住
- 离婚后定住
- 身份签
- 定住者父母

## must_say

- 定住者属于別表第二身份/地位系资格。
- 不应机械套用技人国、特定技能等活动资格范围。
- 具体定住路径和续签判断需要独立来源。

## must_not_say

- 不要把定住者套用技人国/特定技能活动范围。
- 不要说定住者等同永住。
- 不要说定住者路径都一样。

## qa_cases

### QA-1

**user**: 定住者可以换工作吗？

**must_have**:

- 別表第二
- 身份/地位系
- 不按活动资格范围回答

**must_not_have**:

- 技人国范围
- 特定技能分野

### QA-2

**user**: 离婚后能不能拿定住？

**must_have**:

- 需要具体路径和个案确认
- 本卡不能直接判断

**must_not_have**:

- 一定能拿
- 本卡即可判断

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-043 |
