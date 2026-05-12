---
fact_id: permanent-application-does-not-extend-current-status
title: 永住許可申請中 — 現在の在留期限は別に管理する
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住申請は現在の在留期限を延ばさない"
citation_summary: "ISA の在留申請時の注意は、永住許可申請の結果が出ないまま在留期限が迫る場合、別途在留期間更新許可申請を行う必要がある旨を案内している。永住申請は現在の在留期限を自動延長しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-015
  authority_layer: L4 ISA Notice
  legal_source_type: official_operation_page
  law_article_ref: "在留申請時のお知らせ及び注意"
  source_locator: "永住許可申請中の在留期間"
  claim_type: procedure_guardrail
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
    - renewal
  exclusion_scope:
    - "在留期間更新申請済みの特例期間"
  deep_water_candidate: false
applies_when:
  - "用户问永住申请中当前签证到期是否还要续签"
does_not_cover:
  - "已经提交更新后的特例期间"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-application-notice
    url: https://www.moj.go.jp/isa/11_00037.html
    title: 在留申請時のお知らせ及び注意
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請中で現在の在留期限が近い外国人
direct_fact_fields:
  - permanent_application_does_not_extend_current_status
ai_inferred_fields: []
needs_review_flags:
  - id: renewal_special_period_separate
    reason: "更新申請済みの特例期間はCycle 3カードで扱う。"
evidence_points:
  - claim: "ISA の在留申請時の注意は、永住許可申請の結果が出ないまま在留期限が迫る場合、別途在留期間更新許可申請を行う必要がある旨を案内している。永住申請は現在の在留期限を自動延長しない。"
    source_title: "在留申請時のお知らせ及び注意"
    source_url: "https://www.moj.go.jp/isa/11_00037.html"
    source_organization: "出入国在留管理庁"
    source_locator: "永住許可申請中の在留期間"
    display_label: "永住申請中：現在の在留期間更新は別管理"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請中 — 現在の在留期限は別に管理する

## current_date_logic

Checked against current ISA application notice on 2026-05-12.

## current_effective_fact

永住許可申請の結果が出ないまま在留期限が迫る場合、別途在留期間更新許可申請を行う必要がある。永住申請は現在の在留期限を自動延長しない。

## exceptions_or_transition

- 在留期間更新申請を提出済みの場合の特例期間は別カードで扱う。

## common_user_phrases

- 永住申請中 更新 必要
- 永住申请中 签证到期
- 永住 没下来 现在签证
- 永住申請 在留期限 迫る
- 永住申请 自动延长
- 永住中 续签 要不要

## must_say

- 永住申請は現在の在留期限を自動延長しない。
- 在留期限が迫る場合は在留期間更新を別途確認する。

## must_not_say

- 永住を申請していれば今の在留期限は気にしなくてよい。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-015 |
