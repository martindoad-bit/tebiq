---
fact_id: resident-card-return-expiry-triggers
title: 在留カード返納 — 失効する主な場面
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード失効時は返納が必要"
citation_summary: "ISA は、中長期在留者でなくなった、有効期間満了、再入国許可によらない出国、再入国許可期間内に再入国しない、新カード交付、死亡などを在留カード失効場面としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-093
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留カード等の返納手続"
  source_locator: "1 在留カードの返納手続"
  claim_type: procedure_trigger
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - return
  exclusion_scope:
    - "再入国許可による一時出国"
    - "みなし再入国予定の短期出国"
  deep_water_candidate: false
applies_when:
  - "用户问哪些情况下在留卡要交回"
does_not_cover:
  - "再入国许可或みなし再入国许可的可否判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-return
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    title: 在留カード等の返納
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留カードを所持する外国人
direct_fact_fields:
  - resident_card_return_expiry_triggers
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists cases where a residence card expires, including ceasing to be a mid- to long-term resident, card validity expiry, departure other than under re-entry permission, failure to re-enter within the re-entry permission period, receiving a new card, and death."
    source_title: "在留カード等の返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 在留カードの返納手続"
    display_label: "在留カード失効場面：資格喪失・出国・新カード・死亡等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード返納 — 失効する主な場面

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カードは、中長期在留者でなくなったとき、有効期間が満了したとき、再入国許可によらず出国したとき、再入国許可期間内に再入国しなかったとき、新たな在留カードの交付を受けたとき、死亡したときなどに失効し、返納が必要になる。

## exceptions_or_transition

- 再入国許可による出国は「再入国許可によらない出国」と区別する。
- みなし再入国予定の短期出国は、返納だけで判断しない。

## common_user_phrases

- 在留カード 返納 どんな時
- 在留カード 返す 必要
- 永久帰国 在留カード 返納
- 在留卡 要交回 什么情况
- 再入国 在留カード 返納
- 在留カード 失効 返納
- 死亡 在留カード 返納

## must_say

- 返納が必要な場面は、在留カードが失効する場面ごとに分ける。
- 再入国予定の一時出国とは区別する。

## must_not_say

- すべての出国で在留カードを返納すると言う。
- 一時帰国と永久帰国を同じ扱いにする。

## qa_cases

### QA-1

**user**: 旅行で出国するとき在留カードを返しますか？

**must_have**:

- 返納場面は失効場面で分ける
- 再入国予定の出国と区別

**must_not_have**:

- 短期出国でも必ず返納

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-093 |
