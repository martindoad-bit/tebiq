---
fact_id: residence-online-procedure-availability-router
title: 在留オンライン手続 — 利用可否は手続別に確認する
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "在留オンライン手続は手続別に利用可否確認"
citation_summary: "ISA の更新・変更ページはオンライン申請への案内を置いているが、オンライン利用可否や運用は手続別に確認する必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-016
  authority_layer: L4 ISA Page
  legal_source_type: official_operation_page
  law_article_ref: "在留手続オンライン案内"
  source_locator: "在留期間更新・在留資格変更ページ：オンライン申請; オンライン手続ページ"
  claim_type: procedure_channel
  applicable_statuses:
    - "all"
  application_type:
    - renewal
    - change
    - online
  exclusion_scope:
    - "オンライン可否の個別保証"
    - "法的要件の変更"
  deep_water_candidate: false
applies_when:
  - "用户问续签或变更能不能线上申请"
  - "用户问线上申请是否改变法定要求"
does_not_cover:
  - "具体账号、系统操作、电子签名问题"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 3
  self_verification_passed_at:
official_sources:
  - id: moj-isa-renewal-16-3
    url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    title: 在留期間更新許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-change-16-2
    url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    title: 在留資格変更許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-online-procedures
    url: https://www.moj.go.jp/isa/applications/online/onlineprocedures.html
    title: オンラインによる在留手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請
  - 在留資格変更許可申請
  - オンラインによる在留手続
direct_fact_fields:
  - renewal_and_change_pages_link_online_application
  - online_channel_does_not_change_substantive_requirement
ai_inferred_fields:
  - online_channel_does_not_change_substantive_requirement
needs_review_flags:
  - id: specific_online_eligibility
    reason: "Specific online eligibility and operational constraints should be confirmed on the current online procedure page."
evidence_points:
  - claim: "ISA renewal and change procedure pages point users to online application information, so channel availability should be checked by procedure."
    source_title: "在留期間更新許可申請 / 在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "オンライン申請"
    display_label: "更新・変更ページ：オンライン申請案内あり"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留オンライン手続 — 利用可否は手続別に確認する

## current_date_logic

Checked against current ISA procedure pages and online procedure page on 2026-05-12.

## current_effective_fact

在留期間更新許可申請と在留資格変更許可申請のページには、オンライン申請への案内がある。オンラインでできるか、どの条件でできるかは手続別に最新ページで確認する。

## exceptions_or_transition

- オンライン申請は提出チャネルであり、許可要件や活動範囲を広げるものではない。
- このカードはオンラインシステム操作の詳細を扱わない。

## common_user_phrases

- 在留更新 online申请
- 签证变更可以网上申请吗
- 在线申请 更新 变更
- オンライン 在留手続
- 线上申请 是否改变要求
- online申请 没有背面贴纸

## must_say

- 更新・変更ページにはオンライン申請案内がある。
- 利用可否と運用は手続別に最新ページで確認する。

## must_not_say

- 网上申请就不用满足实体条件。
- 所有手续都一定可以在线办理。

## qa_cases

### QA-1

**user**: 变更可以 online 申请吗？是不是更容易过？

**must_have**:

- 可以看线上手续页面
- online 是渠道，不是许可保证

**must_not_have**:

- 更容易过

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-016 |
