---
fact_id: change-approval-before-new-activity-guardrail
title: 在留資格変更 — 新資格活動は許可前に開始したと扱わない
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
citation_label: "変更申請中は新資格活動の開始許可ではない"
citation_summary: "在留資格変更は別資格の活動を行うための変更許可申請であり、申請中や特例期間を新しい活動の許可として扱ってはいけない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-074
  authority_layer: L4 ISA Page + L4 ISA Explainer
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第20条 / 第19条 / 特例期間"
  source_locator: "在留資格変更許可申請ページ：手続概要; 特例期間とは？：本文第1段落"
  claim_type: permission_boundary
  applicable_statuses:
    - "all"
  application_type:
    - change
  exclusion_scope:
    - "新資格活動の開始許可"
    - "資格外活動許可"
  deep_water_candidate: true
applies_when:
  - "用户问变更申请中能否先开始新工作"
  - "用户问特例期间能否做新资格活动"
does_not_cover:
  - "当前资格活动范围是否覆盖该工作"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-change-16-2
    url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    title: 在留資格変更許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-special-period
    url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    title: 特例期間とは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格変更許可申請中
direct_fact_fields:
  - change_application_for_new_status_activity
  - special_period_previous_activity_only
ai_inferred_fields:
  - approval_before_new_status_activity_guardrail
needs_review_flags:
  - id: current_status_scope_or_shikakugai_exception
    reason: "Some work may be within current status or require qualification-outside-activity analysis."
evidence_points:
  - claim: "ISA frames status change as the procedure for changing into a new residence status to conduct another status's activity; the special-period explainer says activity continuation is under the previous status and previous activity."
    source_title: "在留資格変更許可申請 / 特例期間とは？"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "変更ページ：手続概要; 特例期間ページ：本文第1段落"
    display_label: "変更申請中：新資格活動の許可とは別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 在留資格変更 — 新資格活動は許可前に開始したと扱わない

## current_date_logic

Checked against current ISA procedure and special-period pages on 2026-05-12.

## current_effective_fact

在留資格変更申請は、新しい在留資格に変更するための申請である。特例期間中に継続できるのは従前の在留資格・従前の活動であり、変更申請中であることを新しい資格活動の許可として扱ってはいけない。

## exceptions_or_transition

- 予定している仕事が現在の在留資格の範囲内か、資格外活動許可で扱えるかは別途確認する。
- 本カードは個別の職務適合性を判断しない。

## common_user_phrases

- 变更申请中 能先上班吗
- 换签还没下来 可以开始工作吗
- 家族滞在转技人国 先工作
- 留学转工作 审查中 上班
- 申请中 等于许可吗
- 新资格活动 许可前

## must_say

- 変更申請中であること自体は、新しい資格活動の許可ではない。
- 特例期間中に継続できるのは従前資格・従前活動。
- 新活動は、現在資格内か、資格外活動許可か、変更許可後かを切り分ける。

## must_not_say

- 申请交了就可以开始新工作。
- 特例期间可以做任何新活动。
- 先上班等许可下来就行。

## qa_cases

### QA-1

**user**: 留学转技人国已经申请了，公司让我先上班，可以吗？

**must_have**:

- 申请中不是新资格许可
- 需要确认当前资格和资格外活动边界，通常等许可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-074 |
