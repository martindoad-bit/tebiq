---
fact_id: online-application-channel-not-permission
title: 在留申請オンライン — 提出方法であり許可要件を緩める制度ではない
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "オンライン申請は提出方法であり許可要件は各手続で確認する"
citation_summary: "ISA のオンライン申請案内は、オンラインで利用できる在留手続の範囲と利用条件を案内するものであり、各在留手続の許可要件や審査内容を緩和するものではない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-112
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "オンライン申請可能な手続一覧"
  claim_type: procedure_boundary
  applicable_statuses:
    - "online_application_user"
  application_type:
    - renewal
    - change
    - status_acquisition
  exclusion_scope:
    - "許可要件の緩和"
    - "審査省略"
  deep_water_candidate: false
applies_when:
  - "用户以为网上申请会更容易获批、免材料或放宽条件"
does_not_cover:
  - "各手续具体许可条件"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-online-procedures
    url: https://www.moj.go.jp/isa/applications/online/onlineprocedures.html
    title: 在留申請のオンライン手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - 在留申請オンラインシステムの利用を検討する外国人
direct_fact_fields:
  - online_application_channel_not_permission
ai_inferred_fields:
  - online_application_does_not_relax_permission_criteria
needs_review_flags:
  - id: boundary_from_online_page_structure
    reason: "オンライン案内は手続チャネルの案内であり、許可要件は各手続ページ・法令に従うという構造上の整理。"
evidence_points:
  - claim: "ISA のオンライン申請案内は、オンラインで利用できる在留手続の範囲と利用条件を案内している。各在留手続の許可要件や審査内容は、対応する手続ページと法令で確認する。"
    source_title: "在留申請のオンライン手続"
    source_url: "https://www.moj.go.jp/isa/applications/online/onlineprocedures.html"
    source_organization: "出入国在留管理庁"
    source_locator: "オンライン申請可能な手続一覧"
    display_label: "オンライン申請：提出方法の案内"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

# 在留申請オンライン — 提出方法であり許可要件を緩める制度ではない

## current_date_logic

Checked against current ISA online application guidance on 2026-05-12.

## current_effective_fact

在留申請オンラインシステムは、オンラインで利用できる在留手続の範囲と利用条件を案内する提出方法である。各在留手続の許可要件や審査内容は、対応する手続ページと法令で確認する。

## exceptions_or_transition

- このカードは構造上の境界整理であり、個別手続の許可要件を直接説明するカードではない。

## common_user_phrases

- オンライン申請 早く許可
- オンライン申請 条件 緩い
- ネット申請 免材料
- オンライン 在留更新 審査 簡単
- 网上申请 更容易通过
- 在线申请 不用材料

## must_say

- オンライン申請は提出方法。
- 許可要件や審査内容は各手続ページと法令で確認する。

## must_not_say

- オンラインなら条件が緩くなる。
- オンライン受付は許可と同じ。
- オンラインなら必要書類が不要になる。

## qa_cases

### QA-1

**user**: オンライン申請なら更新が通りやすいですか？

**must_have**:

- 提出方法の違い
- 許可要件は各手続で確認

**must_not_have**:

- 通りやすい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-112 |
