---
fact_id: ordinary-reentry-online-simultaneous-only
title: オンラインの再入国許可申請 — 変更・更新・取得申請との同時申請に限られる
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "オンライン再入国許可申請は同時申請に限る"
citation_summary: "ISA のオンライン申請案内と Q&A は、再入国許可申請について、在留資格変更許可申請・在留期間更新許可申請・在留資格取得許可申請と同時に行う場合にオンライン対象となる旨を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-100
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "オンラインで申請可能な手続"
  claim_type: online_scope
  applicable_statuses:
    - "online_application_user"
  application_type:
    - reentry
  exclusion_scope:
    - "単独の通常再入国許可申請"
    - "みなし再入国"
  deep_water_candidate: false
applies_when:
  - "用户问再入国许可能不能线上单独申请"
does_not_cover:
  - "线上申请账户注册或本人认证失败"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-application
    url: https://www.moj.go.jp/isa/immigration/procedures/16-5.html
    title: 再入国許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-online-qa
    url: https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja
    title: 在留申請オンラインシステム Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - オンラインで再入国許可申請を検討する外国人
direct_fact_fields:
  - ordinary_reentry_online_simultaneous_only
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA は、再入国許可申請をオンライン対象手続に含める一方、在留資格変更許可申請・在留期間更新許可申請・在留資格取得許可申請と同時に行う場合に限る旨を示している。"
    source_title: "在留申請オンラインシステム Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q1-4"
    display_label: "オンライン再入国許可申請：変更・更新・取得との同時申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# オンラインの再入国許可申請 — 変更・更新・取得申請との同時申請に限られる

## current_date_logic

Checked against current ISA online application guidance on 2026-05-12.

## current_effective_fact

再入国許可申請はオンライン対象手続に含まれるが、在留資格変更許可申請・在留期間更新許可申請・在留資格取得許可申請と同時に行う場合に限られる。

## exceptions_or_transition

- 単独の通常再入国許可申請は、オンラインではなく地方出入国在留管理官署での手続確認が必要。
- みなし再入国許可はオンライン申請する手続ではなく、出国時の意思表示を含む制度である。

## common_user_phrases

- 再入国許可 オンライン 申請
- 再入国許可 ネット申請
- 再入国許可 単独 オンライン
- 在留期間更新 再入国許可 同時申請
- 再入国许可 在线申请
- オンライン 再入国 いつ使える

## must_say

- オンラインの再入国許可申請は、変更・更新・取得申請との同時申請に限られる。
- 単独申請の可否は地方出入国在留管理官署で確認する。

## must_not_say

- 再入国許可はいつでもオンライン単独申請できる。
- オンラインならみなし再入国の期限を延ばせる。

## qa_cases

### QA-1

**user**: 再入国許可だけオンラインで申請できますか？

**must_have**:

- 変更・更新・取得申請との同時申請に限る

**must_not_have**:

- 単独でいつでもオンライン可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-100 |
