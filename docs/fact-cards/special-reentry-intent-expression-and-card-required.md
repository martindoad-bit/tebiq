---
fact_id: special-reentry-intent-expression-and-card-required
title: みなし再入国 — 有効旅券・在留カードと出国時の意思表示が必要
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
citation_label: "みなし再入国は出国時の意思表示が必要"
citation_summary: "ISA は、みなし再入国許可で出国する場合、有効な旅券と中長期在留者は在留カードを所持し、出国時に入国審査官へみなし再入国許可による出国を希望する意思を表明する必要があると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-061
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条の2"
  source_locator: "出国時の手続"
  claim_type: procedure_guardrail
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - special_reentry
  exclusion_scope:
    - "出国後の記録訂正・補救"
    - "通常再入国許可"
  deep_water_candidate: true
applies_when:
  - "用户问みなし再入国是否自动、出国卡勾选、在留卡要不要带"
does_not_cover:
  - "已出国后是否能补救"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - みなし再入国で出国する中長期在留者
direct_fact_fields:
  - special_reentry_intent_expression_and_card_required
ai_inferred_fields: []
needs_review_flags:
  - id: post_departure_uncertainty_review
    reason: "出国後に意思表示忘れが判明した場合の扱いは個別確認が必要。"
evidence_points:
  - claim: "ISA は、みなし再入国許可で出国する場合、有効な旅券と中長期在留者は在留カードを所持し、出国時に入国審査官へみなし再入国許可による出国を希望する意思を表明する必要があると説明している。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "出国時の手続"
    display_label: "みなし再入国：有効旅券・在留カード・意思表示"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# みなし再入国 — 有効旅券・在留カードと出国時の意思表示が必要

## current_date_logic

Checked against the ISA special reentry page on 2026-05-12.

## current_effective_fact

ISA は、みなし再入国許可で出国する場合、有効な旅券と中長期在留者は在留カードを所持し、出国時に入国審査官へみなし再入国許可による出国を希望する意思を表明する必要があると説明している。

## exceptions_or_transition

- すでに出国済みでチェック忘れが疑われる場合は個別確認が必要。
- 通常再入国許可とは別。

## common_user_phrases

- みなし再入国 チェック 忘れた
- 出国カード チェック
- みなし再入国 自動
- 永住者 みなし再入国 在留カード
- 再入国EDカード チェック欄
- 出国時 みなし再入国 伝える
- みなし再入国 EDカード チェック
- みなし再入国 在留カード 必要

## must_say

- 有効な旅券と在留カードを持ち、出国時に意思表示する。
- 自動的に成立するものとして扱わない。

## must_not_say

- みなし再入国は何もしなくても自動。
- 在留カードを持たずに出国しても同じ。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-061 |
