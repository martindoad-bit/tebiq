---
fact_id: residence-change-application-window
title: 在留資格変更 — 申請時期は変更事由発生後から満了日前
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
citation_label: "変更申請時期：変更事由発生後から満了日前"
citation_summary: "在留資格変更許可申請の申請期間は、変更の事由が生じたときから在留期間満了日以前。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-006
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第20条"
  source_locator: "在留資格変更許可申請ページ：申請期間"
  claim_type: deadline_window
  applicable_statuses:
    - "all"
  application_type:
    - change
  exclusion_scope:
    - "期限後申請の救済"
    - "新活動開始許可"
  deep_water_candidate: true
applies_when:
  - "用户问换签什么时候申请"
  - "用户问变更理由发生后多久内申请"
does_not_cover:
  - "已经超过在留期限后的处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-change-16-2
    url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    title: 在留資格変更許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格変更許可申請
direct_fact_fields:
  - change_application_after_reason_before_expiry
ai_inferred_fields: []
needs_review_flags:
  - id: late_change_application_consequence
    reason: "The procedure page states ordinary filing period, but late application handling requires separate review."
evidence_points:
  - claim: "ISA states the status-change application period as from when the reason for status change arises until before the current period-of-stay expiry."
    source_title: "在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間"
    display_label: "変更申請時期：変更事由発生後から満了日前"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格変更 — 申請時期は変更事由発生後から満了日前

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格変更許可申請の申請時期は、変更の事由が生じたときから在留期間満了日以前である。

## exceptions_or_transition

- 申請できる時期と、新活動を開始できる時期は別問題。
- 満了日を過ぎた場合の扱いは個別確認が必要。

## common_user_phrases

- 变更申请什么时候提交
- 在留資格変更 申请期间
- 换签 变更事由发生后
- 签证变更 到期前
- offer拿到以后什么时候换签
- 变更理由发生 期限前

## must_say

- 变更申请时点是变更事由发生后到当前在留期限届满前。
- 申请时点不等于新活动开始许可。

## must_not_say

- 拿到 offer 就可以先开始新资格活动。
- 期限过了也一样。

## qa_cases

### QA-1

**user**: offer 拿到了，但签证还有半年，什么时候申请变更？

**must_have**:

- 变更事由发生后
- 当前期限届满前

**must_not_have**:

- 现在就一定可以开始做新工作

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-006 |
