---
fact_id: special-reentry-one-year-or-status-expiry
title: みなし再入国許可 — 1年以内又は在留期限の早い方まで
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "みなし再入国は1年以内又は在留期限まで"
citation_summary: "ISA は、みなし再入国許可の有効期間について、出国日から1年以内だが、在留期限が出国後1年より前に到来する場合は在留期限までとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-102
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "有効期間"
  claim_type: validity_limit
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "普通再入国許可"
    - "特別永住者のみなし再入国2年"
  deep_water_candidate: false
applies_when:
  - "用户问みなし再入国能在海外多久、在留期限早于一年怎么办"
does_not_cover:
  - "期限超過后的补救或新签证路线"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
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
  - みなし再入国で出国する外国人
direct_fact_fields:
  - special_reentry_one_year_or_status_expiry
ai_inferred_fields: []
needs_review_flags:
  - id: expired_or_late_return_requires_review
    reason: "期限を超えた場合の再入国可否や再取得手続は個別確認が必要。"
evidence_points:
  - claim: "ISA は、みなし再入国許可の有効期間について、出国日から1年以内だが、在留期限が出国後1年より前に到来する場合は在留期限までとしている。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "有効期間"
    display_label: "みなし再入国：1年以内又は在留期限まで"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# みなし再入国許可 — 1年以内又は在留期限の早い方まで

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

みなし再入国許可の有効期間は出国日から1年以内。ただし、在留期限が出国後1年より前に到来する場合は、在留期限までとなる。

## exceptions_or_transition

- 「1年以内」だけで判断せず、在留期限が先に来ないかを必ず確認する。
- 特別永住者のみなし再入国は別の期間がある。

## common_user_phrases

- みなし再入国 1年以内 在留期限
- みなし再入国 在留期限 先
- 在留期限 4ヶ月 みなし再入国 1年
- 出国 10ヶ月 在留期限 半年
- みなし再入国 期限 いつまで
- 在留カード 期限 1年以内 戻れる

## must_say

- みなし再入国は原則出国日から1年以内。
- 在留期限が先に来る場合は在留期限まで。

## must_not_say

- みなし再入国なら誰でも必ず1年海外にいられる。
- 在留期限を見なくてよい。

## qa_cases

### QA-1

**user**: 在留期限が4か月後ですが、みなし再入国で10か月帰国できますか？

**must_have**:

- 1年以内だけでなく在留期限を見る
- 在留期限が先なら在留期限まで

**must_not_have**:

- 1年以内なら問題なし

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-102 |
