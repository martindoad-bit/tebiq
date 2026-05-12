---
fact_id: permanent-resident-card-expiry-not-pr-period-renewal-boundary
title: 永住カード期限 — 在留カードの期限と永住資格本体を分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "永住カード期限と永住資格本体の区別"
citation_summary: "入管法と ISA 手続ページは、永住者の在留カード有効期間更新をカード手続として定めている。一方、永住者の在留期間は無期限とされるため、カードの有効期限を『永住資格の期間更新』と表現しない。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-057
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第19条の5 / 第19条の11 / 別表第二 永住者"
  source_locator: "在留カードの有効期間 / 永住者の在留期間"
  claim_type: disambiguation
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - resident_card_validity_renewal
    - current_status
  exclusion_scope:
    - "期限切れ後の罰則・個別処理"
    - "永住資格取消"
  deep_water_candidate: true
applies_when:
  - "用户把永住卡期限、永住更新、永住资格取消混在一起问"
does_not_cover:
  - "期限切れ後に何が起きるか"
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
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
direct_fact_fields:
  - permanent_resident_card_expiry_not_pr_period_renewal_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: expired_card_consequence_review
    reason: "カード期限後の罰則、再申請、実務上の影響は別途確認する。"
evidence_points:
  - claim: "永住者には在留カード有効期間更新というカード手続があるが、永住者の在留期間は無期限とされるため、カード期限を永住資格の期間更新と表現しない。"
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続根拠・手続対象者"
    display_label: "永住カード期限と永住資格本体の区別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住カード期限 — 在留カードの期限と永住資格本体を分ける

## current_date_logic

Checked against current law text and ISA procedure page on 2026-05-12.

## current_effective_fact

入管法と ISA 手続ページは、永住者の在留カード有効期間更新をカード手続として定めている。一方、永住者の在留期間は無期限とされるため、カードの有効期限を「永住資格の期間更新」と表現しない。

## exceptions_or_transition

- カード期限切れ後の対応は個別確認が必要。
- 永住資格取消や退去強制とは別の論点。

## common_user_phrases

- 永住ビザ 更新
- 永住カード 期限切れ 永住 消える
- 永住 在留カード 有効期限
- 永住資格 更新 必要
- 永住卡过期是不是永住没了
- 永住カード期限と永住資格

## must_say

- カードの有効期限と永住資格本体を分ける。
- 永住者の在留期間は無期限だが、在留カードは更新が必要。

## must_not_say

- 永住資格を7年ごとに更新する。
- カード期限切れだけで永住資格取消と断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-057 |
