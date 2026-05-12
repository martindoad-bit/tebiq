---
fact_id: cancellation-vs-renewal-or-pr-denial-boundary
title: 在留資格取消・更新不許可・永住不許可は別手続として扱う
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "取消・更新不許可・永住不許可の区別"
citation_summary: "ISA の取消案内は在留資格取消の制度と手続を説明しており、所属機関届出 Q&A は届出違反が罰則や在留申請上の不利な扱いにつながり得ると説明している。取消、更新不許可、永住不許可は混同せず、現在の資格、手続段階、通知の有無で分けて扱う。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-049
  authority_layer: L4 ISA Procedure Page / L4 ISA Q&A
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4 / 所属機関等届出Q&A"
  source_locator: "在留資格の取消し / 所属機関等届出Q&A Q7"
  claim_type: procedure_boundary
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
    - renewal
    - permanent_residence
    - notification
  exclusion_scope:
    - "個別不許可理由の判断"
    - "通知を受けた後の対応"
  deep_water_candidate: true
applies_when:
  - "用户把取消、更新不许可、永住不许可、届出违背混在一起问"
does_not_cover:
  - "具体案件是否会被取消或不许可"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - 在留資格取消、在留期間更新、永住許可、所属機関届出が絡む相談
direct_fact_fields:
  - cancellation_vs_renewal_or_pr_denial_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: mixed_procedure_requires_triage
    reason: "取消通知、不許可通知、届出遅延、永住不許可は必要な対応先と期限が異なる。"
evidence_points:
  - claim: "取消、更新不許可、永住不許可、届出違反は同じ手続ではない。現在の資格、手続段階、通知の有無を分けて確認する必要がある。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要及び取消の手続"
    display_label: "取消・更新不許可・永住不許可の区別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 在留資格取消・更新不許可・永住不許可は別手続として扱う

## current_date_logic

Checked against the ISA cancellation page and organization-notification Q&A on 2026-05-12.

## current_effective_fact

取消、更新不許可、永住不許可、届出違反は同じ手続ではない。現在の資格、手続段階、通知の有無を分けて確認する必要がある。

## exceptions_or_transition

- 入管から通知を受けている場合は、通知の種類と期限が最優先。
- 届出違反は罰則や在留申請上の不利な扱いにつながり得るが、それだけで常に取消決定と扱わない。

## common_user_phrases

- 更新不許可 取消 違い
- 永住不許可 今のビザ 取消
- 届出 忘れた 更新 不利
- 在留資格取消 通知 不許可
- 永住落ちたら 今の签证消える
- 14日届出忘れた 取消

## must_say

- 取消、更新不許可、永住不許可、届出違反は分けて確認する。
- 通知がある場合は通知の種類と期限を確認する。

## must_not_say

- 永住不許可なら現在の在留資格も同時に取消。
- 届出を忘れたら必ず取消。

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
| 2026-05-12 | FACT/Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-049 |
