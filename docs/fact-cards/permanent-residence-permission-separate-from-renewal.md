---
fact_id: permanent-residence-permission-separate-from-renewal
title: 永住許可申請 — 在留期間更新とは別の許可手続
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住許可は更新ではなく独立した許可"
citation_summary: "入管法は、永住者の在留資格への変更を希望する外国人が法務大臣に永住許可を申請する仕組みを置いている。これは現在の在留期間を延ばす在留期間更新とは別の手続である。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-001
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条第1項"
  source_locator: "永住許可"
  claim_type: disambiguation
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "在留期間更新許可申請"
    - "永住者の在留カード有効期間更新"
  deep_water_candidate: false
applies_when:
  - "用户把永住申请说成永住更新或普通续签"
does_not_cover:
  - "永住者在留卡有效期间更新"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-pr-application
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_residence_permission_separate_from_renewal
ai_inferred_fields: []
needs_review_flags:
  - id: current_status_deadline_separate
    reason: "永住申請中の現在資格の期限管理は別カードで扱う。"
evidence_points:
  - claim: "入管法は、永住者の在留資格への変更を希望する外国人が法務大臣に永住許可を申請する仕組みを置いている。これは現在の在留期間を延ばす在留期間更新とは別の手続である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第22条第1項"
    display_label: "永住許可：在留期間更新とは別手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 在留期間更新とは別の許可手続

## current_date_logic

Checked against the current law text and ISA procedure page on 2026-05-12.

## current_effective_fact

永住許可申請は、永住者の在留資格への変更を希望する外国人が法務大臣に許可を求める手続であり、現在の在留期間を延ばす在留期間更新とは別の手続である。

## exceptions_or_transition

- 永住申請中でも、現在の在留期限管理は別に確認する。

## common_user_phrases

- 永住申請 更新 違い
- 永住許可 在留期間更新 違う
- 永住更新 申請
- 永住申请 是不是续签
- 永住 没下来 续签
- 永住许可 普通更新 区别

## must_say

- 永住許可申請は在留期間更新とは別の手続。
- 永住申請中でも現在の在留期限管理は別に確認する。

## must_not_say

- 永住申請は在留期間更新の一種である。
- 永住申請を出せば現在の在留期間が自動的に延びる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-001 |
