---
fact_id: organization-notification-not-work-permission
title: 所属機関届出 — 届出は新しい活動の許可そのものではない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "所属機関届出と新しい活動の適合性は別"
citation_summary: "ISA Q&A は、転職後の活動が現に有する在留資格に該当する活動であれば引き続き在留できると説明しており、届出そのものが新活動の許可になるとはしていない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-049
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "届出の要否 Q11"
  claim_type: permission_boundary
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
    - change
  exclusion_scope:
    - "新しい活動の在留資格該当性判断"
    - "就労資格証明書"
  deep_water_candidate: true
applies_when:
  - "用户问提交14日届出后是否就能开始新工作"
does_not_cover:
  - "具体工作内容是否符合技人国、特定技能、经管等资格"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関に関する届出
  - 在留資格変更許可申請
direct_fact_fields:
  - organization_notification_not_work_permission
ai_inferred_fields: []
needs_review_flags:
  - id: new_activity_fit_requires_review
    reason: "Whether the new job or activity is covered by the current residence status requires activity-specific review."
evidence_points:
  - claim: "ISA explains that after a job change, organization notification is required, and a person may continue residing if the post-change activity falls under the activity of the residence status currently held."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出の要否 Q11"
    display_label: "所属機関届出：新しい活動が現資格に該当するかは別確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 届出は新しい活動の許可そのものではない

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

転職後の活動が、現に有する在留資格に該当する活動であれば、引き続き在留できると説明されている。所属機関届出は届出であり、新しい活動が在留資格に合うかどうかの確認とは別。

## exceptions_or_transition

- 新しい仕事や活動が現在の在留資格に該当しない場合は、在留資格変更などの検討が必要になり得る。
- 特定技能、技能実習、派遣、経営活動、副業などは特に個別確認が必要。

## common_user_phrases

- 14日届出 出せば 働ける
- 所属機関届出 新しい仕事 許可
- 転職 届出 だけで合法
- 技人国 転職 届出 仕事内容
- 届出すれば 新会社で働ける
- 新しい活動 現在の在留資格 該当

## must_say

- 届出は新しい活動の許可そのものではない。
- 新しい活動が現在の在留資格に該当するかを確認する。

## must_not_say

- 14日届出を出せば新しい仕事は必ず問題ない。
- 所属機関届出が在留資格変更許可を代替する。
- 届出不要なら活動内容の確認も不要。

## qa_cases

### QA-1

**user**: 技人国で転職しました。14日届出を出せば新しい会社でそのまま働けますか？

**must_have**:

- 届出は許可そのものではない
- 新しい仕事内容が現資格に該当するか確認

**must_not_have**:

- 届出だけで必ず合法

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-049 |
