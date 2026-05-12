---
fact_id: special-period-previous-status-activity-only
title: 特例期間 — 継続できるのは従前の在留資格・従前の活動
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "特例期間中は従前資格・従前活動の範囲"
citation_summary: "ISA は、特例期間中に引き続き従前の在留資格で在留し、従前の活動を行えると説明している。新しい活動を開始できる許可ではない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-014
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第20条第5項 / 第21条第4項"
  source_locator: "特例期間とは？：本文第1段落"
  claim_type: permission_boundary
  applicable_statuses:
    - "all"
  application_type:
    - renewal
    - change
  exclusion_scope:
    - "新資格活動の開始許可"
    - "資格外活動許可"
  deep_water_candidate: true
applies_when:
  - "用户问变更申请中特例期间能不能做新工作"
  - "用户问申请中是否可以开始新活动"
does_not_cover:
  - "当前资格下具体活动范围判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-period
    url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    title: 特例期間とは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請中
  - 在留資格変更許可申請中
direct_fact_fields:
  - special_period_previous_status_previous_activity_only
ai_inferred_fields: []
needs_review_flags:
  - id: current_status_activity_scope
    reason: "Whether the planned activity fits the previous status must route to status-specific cards or DOMAIN."
evidence_points:
  - claim: "ISA states that during the special period the person may continue staying under the previous residence status and conduct the previous activity."
    source_title: "特例期間とは？"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本文第1段落"
    display_label: "特例期間中の活動：従前資格・従前活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特例期間 — 継続できるのは従前の在留資格・従前の活動

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

特例期間中に継続できるのは、従前の在留資格による在留と従前の活動である。特例期間は、新しい在留資格の活動を開始する許可ではない。

## exceptions_or_transition

- 「従前の活動」に新しい仕事が含まれるかは、現在の在留資格の活動範囲と職務内容で確認する。
- 資格外活動許可が必要な場合は別途確認する。

## common_user_phrases

- 特例期间 可以开始新工作吗
- 变更申请中 能不能先上班
- 申请中 新活动 可以做吗
- 特例期間 従前の活動
- 申请中特例 旧签证范围
- 换签审查中 新工作

## must_say

- 特例期間中に続けられるのは従前資格・従前活動。
- 新活動は変更許可後か、現在資格の範囲内かを分けて確認する。

## must_not_say

- 变更申请交了就可以开始新资格工作。
- 特例期间让活动范围变宽。

## qa_cases

### QA-1

**user**: 家族滞在转技人国申请中，可以先去公司上班吗？

**must_have**:

- 特例期间不是新活动许可
- 新资格活动通常要等变更许可

**must_not_have**:

- 可以先上班

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-014 |
