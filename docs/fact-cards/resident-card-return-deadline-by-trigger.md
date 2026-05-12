---
fact_id: resident-card-return-deadline-by-trigger
title: 在留カード返納 — 返納期限は失効事由で異なる
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
citation_label: "在留カード返納は14日以内又は直ちに"
citation_summary: "ISA は、在留カード返納について、中長期在留者でなくなった、有効期間満了、再入国期間内不帰国等は失効日から14日以内、再入国許可によらない出国や新カード交付等は直ちに返納としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-094
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留カード等の返納手続"
  source_locator: "返納までの期間"
  claim_type: deadline_window
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - return
  exclusion_scope:
    - "みなし再入国予定の短期出国"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡返纳期限、机场是否马上交回"
does_not_cover:
  - "未返纳后的处罚量刑判断"
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
  - resident_card_return_deadline_by_trigger
ai_inferred_fields: []
needs_review_flags:
  - id: card_return_penalty_requires_review
    reason: "Failure to return can be penalized, but concrete consequence is not automatic."
evidence_points:
  - claim: "ISA states different return periods: some expiry causes are within 14 days from expiry, while departure not under re-entry permission and receiving a new card require immediate return; death is within 14 days from death or discovery."
    source_title: "在留カード等の返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "返納までの期間"
    display_label: "返納期限：14日以内又は直ちに"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード返納 — 返納期限は失効事由で異なる

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カード返納期限は失効事由で異なる。中長期在留者でなくなった、有効期間満了、再入国許可期間内に再入国しなかった場合は失効日から14日以内。再入国許可によらず出国した場合や新たなカードの交付を受けた場合は直ちに返納。死亡時は親族又は同居者が死亡日又は発見日から14日以内に返納する。

## exceptions_or_transition

- 期限内に返納しないと罰金に処せられることがあるとされているが、個別結果は断定しない。

## common_user_phrases

- 在留カード 返納 14日以内
- 在留カード 空港 返納 直ちに
- 永久帰国 在留カード 空港 返す
- 在留卡 回国 机场交回
- 在留カード 返納 期限
- 死亡 在留カード 14日
- 新しい在留カード 古いカード 直ちに返納

## must_say

- 返納期限は失効事由で異なる。
- 出国や新カード交付は直ちに返納の場面がある。
- 死亡時は親族又は同居者が14日以内に返納する場面がある。

## must_not_say

- 返納期限はすべて14日以内とだけ言う。
- 期限超過後の結果を自動的に断定する。

## qa_cases

### QA-1

**user**: 永久帰国するとき在留カードはいつ返しますか？

**must_have**:

- 再入国許可によらない出国は直ちに返納
- 返納期限は事由で異なる

**must_not_have**:

- 旅行でも全部返納

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-094 |
