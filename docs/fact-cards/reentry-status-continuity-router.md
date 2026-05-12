---
fact_id: reentry-status-continuity-router
title: 再入国 — 出国後も従前資格が続くかは再入国手続で分ける
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
citation_label: "再入国と在留資格の継続"
citation_summary: "ISA は、再入国許可又はみなし再入国許可を受けて出国する場合は従前の在留資格及び在留期間が継続するものとみなされる一方、許可を受けずに出国した場合は従前資格が消滅すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-070
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条 / 第26条の2"
  source_locator: "再入国許可 / みなし再入国許可"
  claim_type: reentry_boundary
  applicable_statuses:
    - "valid_residence_status_holder"
    - "permanent_resident"
  application_type:
    - reentry
    - special_reentry
  exclusion_scope:
    - "出国後の補救可能性"
    - "再入国期限超過後の扱い"
  deep_water_candidate: true
applies_when:
  - "用户问出国后在留资格还在不在"
does_not_cover:
  - "已经出境后忘记手续的补救路径"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-overview
    url: https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html
    title: 再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格保持者
direct_fact_fields:
  - reentry_status_continuity_router
ai_inferred_fields: []
needs_review_flags:
  - id: post_departure_reentry_review
    reason: "出国後、期限超過、手続忘れ、海外滞在中の補救は個別確認が必要。"
evidence_points:
  - claim: "ISA は、再入国許可又はみなし再入国許可を受けて出国する場合は従前の在留資格及び在留期間が継続するものとみなされる一方、許可を受けずに出国した場合は従前資格が消滅すると説明している。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可を受けた場合 / 受けない場合"
    display_label: "再入国：在留資格の継続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 再入国 — 出国後も従前資格が続くかは再入国手続で分ける

## current_date_logic

Checked against ISA reentry and special reentry pages on 2026-05-12.

## current_effective_fact

ISA は、再入国許可又はみなし再入国許可を受けて出国する場合は従前の在留資格及び在留期間が継続するものとみなされる一方、許可を受けずに出国した場合は従前資格が消滅すると説明している。

## exceptions_or_transition

- 出国後の補救可能性や期限超過は個別確認が必要。

## common_user_phrases

- 出国後 在留資格 続く 再入国
- 再入国手续 在留资格还在吗
- 永住者 出国 在留資格 消える
- みなし再入国 忘れた 資格
- 在留カード 有効 戻れる 再入国
- 再入国许可 保留签证

## must_say

- 再入国許可又はみなし再入国許可の有無で分ける。
- 在留カードの有効だけで再入国可否を断定しない。

## must_not_say

- 在留カードが有効なら必ず戻れる。
- 永住者なら再入国手続なしでも資格が続く。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-070 |
