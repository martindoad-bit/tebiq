---
fact_id: residence-renewal-application-window
title: 在留期間更新 — 申請時期は満了日前・概ね3か月前から
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
citation_label: "更新申請時期：満了日前・概ね3か月前から"
citation_summary: "在留期間更新許可申請は在留期間満了日前に行う。6か月以上の在留期間を有する場合は概ね3か月前から受付され、特別事情があれば早期受付の可能性がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-003
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第21条"
  source_locator: "在留期間更新許可申請ページ：申請期間"
  claim_type: deadline_window
  applicable_statuses:
    - "all"
  application_type:
    - renewal
  exclusion_scope:
    - "期限後申請の救済"
    - "許可確率"
  deep_water_candidate: true
applies_when:
  - "用户问续签到期前多久可以申请"
  - "用户问已经快到期来不来得及"
does_not_cover:
  - "期限已经过了以后如何处理"
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
  - renewal_application_before_expiry
  - renewal_roughly_three_months_for_six_month_or_longer_period
  - special_reason_early_application_possible
ai_inferred_fields: []
needs_review_flags:
  - id: after_expiry_application_consequence
    reason: "The procedure page states the ordinary window; late application consequences require separate review."
evidence_points:
  - claim: "ISA states the renewal application period as before the period-of-stay expiry; for a period of stay of six months or longer, reception is generally from around three months before expiry."
    source_title: "在留期間更新許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間"
    display_label: "更新申請時期：満了日前・概ね3か月前から"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留期間更新 — 申請時期は満了日前・概ね3か月前から

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留期間更新許可申請は、在留期間の満了日前に行う。6か月以上の在留期間を有する場合は、満了日の概ね3か月前から申請できる。

## exceptions_or_transition

- 入院・長期出張など特別な事情がある場合は、3か月以上前から受け付けることがある。
- 満了後申請の扱いは、このカードだけで断定しない。

## common_user_phrases

- 续签提前多久申请
- 在留更新 3个月前
- 在留期限快到了更新来得及吗
- 签证到期前多久续签
- 在留期間満了日前 更新申请
- 期限过了还能申请更新吗

## must_say

- 更新申请通常要在在留期限届满日前办理。
- 6个月以上在留期间的人，大致可从期限前3个月开始。
- 期限已经过了属于高风险，需要单独确认。

## must_not_say

- 过期后随便补交也一样。
- 3个月前是绝对不可提前一天的硬规则。
- 提交更新就等于许可。

## qa_cases

### QA-1

**user**: 还有一个月到期，现在续签来得及吗？

**must_have**:

- 满了日前申请
- 一般可从约3个月前申请

**must_not_have**:

- 保证获批

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-003 |
