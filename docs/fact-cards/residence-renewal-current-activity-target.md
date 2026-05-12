---
fact_id: residence-renewal-current-activity-target
title: 在留期間更新 — 対象者は現資格活動を継続する外国人
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
citation_label: "更新対象者は現資格活動を継続する人"
citation_summary: "在留期間更新許可申請の対象者は、現に有する在留資格の活動を継続しようとする外国人。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-002
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第21条"
  source_locator: "在留期間更新許可申請ページ：手続対象者"
  claim_type: procedure_actor_scope
  applicable_statuses:
    - "all"
  application_type:
    - renewal
  exclusion_scope:
    - "活動変更"
    - "離脱後の個別リスク判断"
  deep_water_candidate: false
applies_when:
  - "用户问离职、退学、活动变了还能不能续签"
  - "用户问更新的对象是谁"
does_not_cover:
  - "已不做原活动时是否取消在留或能否补救"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-renewal-16-3
    url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    title: 在留期間更新許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請
direct_fact_fields:
  - renewal_target_current_activity_continuation
ai_inferred_fields: []
needs_review_flags:
  - id: non_current_activity_case_requires_domain
    reason: "When the user has stopped the original activity, consequence and strategy require individual review."
evidence_points:
  - claim: "ISA identifies the renewal applicant as a foreign national intending to continue the activity under the residence status currently held."
    source_title: "在留期間更新許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "更新対象者：現資格活動を継続する外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留期間更新 — 対象者は現資格活動を継続する外国人

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留期間更新許可申請の対象は、現に有する在留資格の活動を継続しようとする外国人である。

## exceptions_or_transition

- すでに退職・退学・活動停止している場合は、更新対象の一般説明だけでは判断できない。
- 活動が変わる場合は、在留資格変更や届出義務も確認する。

## common_user_phrases

- 现资格活动继续 续签
- 已经离职还能续签吗
- 退学后还能更新留学签吗
- 现在的活动没有继续还可以更新吗
- 更新对象 继续原来的活动
- 不做原来的工作了能不能续签

## must_say

- 更新対象は現資格活動を継続する人。
- すでに活動が変わった、止まった場合は別途確認が必要。

## must_not_say

- 只要在留卡没到期就一定可以续签。
- 离职或退学后也一定按普通更新处理。

## qa_cases

### QA-1

**user**: 我已经离职了，还能直接续签技人国吗？

**must_have**:

- 更新対象は原資格活動の継続
- 离职后需要确认届出、变更、取消风险

**must_not_have**:

- 直接续签没问题

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-002 |
