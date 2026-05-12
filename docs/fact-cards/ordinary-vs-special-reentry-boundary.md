---
fact_id: ordinary-vs-special-reentry-boundary
title: 再入国 — 通常の再入国許可とみなし再入国を分ける
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
citation_label: "通常再入国とみなし再入国の区別"
citation_summary: "ISA は通常の再入国許可とみなし再入国許可を別手続として案内している。通常再入国は在留期間内で最長5年、みなし再入国は原則出国後1年以内で、海外で有効期間を延長できない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-071
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条 / 第26条の2"
  source_locator: "再入国許可 / みなし再入国許可"
  claim_type: disambiguation
  applicable_statuses:
    - "valid_residence_status_holder"
    - "permanent_resident"
  application_type:
    - reentry
    - special_reentry
  exclusion_scope:
    - "期限超過後の救済"
    - "個別の上陸可否"
  deep_water_candidate: true
applies_when:
  - "用户问再入国许可和みなし再入国有什么区别"
does_not_cover:
  - "已经超过期限后还能否回来"
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
  - 再入国予定の在留資格保持者
direct_fact_fields:
  - ordinary_vs_special_reentry_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: reentry_choice_and_deadline_review
    reason: "どちらを選ぶべきか、期限超過や海外滞在中の扱いは個別確認が必要。"
evidence_points:
  - claim: "ISA は通常の再入国許可とみなし再入国許可を別手続として案内している。通常再入国は在留期間内で最長5年、みなし再入国は原則出国後1年以内で、海外で有効期間を延長できない。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "有効期間・注意事項"
    display_label: "再入国：通常とみなしの区別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 再入国 — 通常の再入国許可とみなし再入国を分ける

## current_date_logic

Checked against ISA reentry and special reentry pages on 2026-05-12.

## current_effective_fact

ISA は通常の再入国許可とみなし再入国許可を別手続として案内している。通常再入国は在留期間内で最長5年、みなし再入国は原則出国後1年以内で、海外で有効期間を延長できない。

## exceptions_or_transition

- みなし再入国は在留期限が1年より早く来る場合、その期限まで。
- 期限超過後の扱いは個別確認が必要。

## common_user_phrases

- 再入国許可 みなし再入国 違い
- 普通再入国 みなし再入国 区别
- 再入国许可 5年 みなし 1年
- みなし再入国 海外 延長
- 永住 普通再入国 みなし再入国
- 再入国手续 哪个

## must_say

- 通常再入国許可とみなし再入国許可を分ける。
- みなし再入国は海外で有効期間を延長できない。

## must_not_say

- みなし再入国も普通再入国と同じように延長できる。
- 再入国許可があれば条件を問わず必ず入国できる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-071 |
