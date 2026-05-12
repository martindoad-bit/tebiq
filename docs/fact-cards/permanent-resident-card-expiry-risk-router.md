---
fact_id: permanent-resident-card-expiry-risk-router
title: 永住者在留カード期限 — 資格本体とカード義務・リスクを分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "永住カード期限の整理"
citation_summary: "入管法は永住者の在留期間を無期限としつつ、永住者の在留カード有効期間とその更新手続を別に定めている。カード期限を永住資格の期間満了と同一視せず、カード更新義務や期限後のリスクは別に扱う。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-069
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第19条の5 / 第19条の11 / 別表第二 永住者"
  source_locator: "在留カード有効期間 / 永住者の在留期間"
  claim_type: risk_router
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - resident_card_validity_renewal
    - current_status
  exclusion_scope:
    - "期限切れ後の罰則や回復可能性"
    - "海外滞在中の再入国可否"
  deep_water_candidate: true
applies_when:
  - "用户问永住卡过期是不是永住没了，或者是不是完全没事"
does_not_cover:
  - "卡过期后的具体处罚、补救、海外入境"
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
  - permanent_resident_card_expiry_risk_router
ai_inferred_fields: []
needs_review_flags:
  - id: expired_card_consequence_review
    reason: "カード期限後の罰則、再交付、海外からの入国可否は個別確認が必要。"
evidence_points:
  - claim: "入管法は永住者の在留期間を無期限としつつ、永住者の在留カード有効期間とその更新手続を別に定めている。カード期限を永住資格の期間満了と同一視せず、カード更新義務や期限後のリスクは別に扱う。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条の5 / 第19条の11 / 別表第二"
    display_label: "永住カード期限：資格本体とカード義務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者在留カード期限 — 資格本体とカード義務・リスクを分ける

## current_date_logic

Checked against current law text and ISA card-renewal page on 2026-05-12.

## current_effective_fact

入管法は永住者の在留期間を無期限としつつ、永住者の在留カード有効期間とその更新手続を別に定めている。カード期限を永住資格の期間満了と同一視せず、カード更新義務や期限後のリスクは別に扱う。

## exceptions_or_transition

- カード期限切れ後の具体的な罰則や回復手続は個別確認。
- 海外滞在中は再入国許可の期限とも分けて確認する。

## common_user_phrases

- 永住カード過期 永住失效 完全没事
- 永住 在留カード 期限切れ リスク
- 永住卡过期 是不是非法滞在
- 永住者 在留カード期限 資格本体
- 永住カード 有効期限 義務
- 永住卡过期 还能工作吗

## must_say

- 永住資格本体と在留カード有効期限を分ける。
- カード期限切れを完全に無リスクとも、即資格喪失とも断定しない。

## must_not_say

- カード期限切れだけで永住資格が失効する。
- 永住者なら在留カード期限を気にしなくてよい。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-069 |
