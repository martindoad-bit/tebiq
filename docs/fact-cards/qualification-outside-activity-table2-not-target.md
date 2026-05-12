---
fact_id: qualification-outside-activity-table2-not-target
title: 資格外活動許可 — 別表第二の身分資格は対象外
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "永住者・定住者などは資格外活動許可の対象外"
citation_summary: "ISA は、入管法別表第二の在留資格の人は就労活動に制限がないため、資格外活動許可の対象ではないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-023
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法別表第二 / 第19条"
  source_locator: "資格外活動許可について：冒頭説明"
  claim_type: status_boundary
  applicable_statuses:
    - "table2"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "別表第一資格"
    - "個別就労制限のない身分資格"
  deep_water_candidate: false
applies_when:
  - "用户问永住者、定住者、日配是否需要资格外活动许可"
  - "用户问身份系签证打工"
does_not_cover:
  - "劳动法、税、许可行业资格"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-explainer
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - table2_statuses_not_qoa_targets_due_no_work_activity_restriction
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA states that people with Table 2 statuses such as permanent resident or long-term resident are not targets of qualification outside activity permission because their work activities are not restricted."
    source_title: "資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    source_organization: "出入国在留管理庁"
    source_locator: "冒頭説明"
    display_label: "別表第二資格は資格外活動許可の対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 別表第二の身分資格は対象外

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

永住者、定住者など入管法別表第二に掲げる在留資格の人は、就労活動に制限がないため資格外活動許可の対象ではない。

## exceptions_or_transition

- 就労制限がないことは、職業免許、労働法、税務、事業許認可が不要という意味ではない。

## common_user_phrases

- 永住者 资格外活动许可
- 定住者 打工 资格外
- 日配 副业 资格外活动
- 身份签证 工作限制
- 別表第二 資格外活動
- 永住 副业 许可

## must_say

- 別表第二資格は資格外活動許可の対象外。
- ただし職業資格、事業許認可、税・労務は別問題。

## must_not_say

- 永住者也要资格外活动许可。
- 身分资格可以做任何违法或无照业务。

## qa_cases

### QA-1

**user**: 永住者做副业要资格外活动许可吗？

**must_have**:

- 永住者は対象外
- 其他法律义务另看

**must_not_have**:

- 必须申请资格外活动

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-023 |
