---
fact_id: permanent-resident-long-absence-ordinary-reentry-five-year
title: 永住者の長期出国 — 通常再入国許可は最長5年の枠で確認する
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
citation_label: "通常再入国許可は最長5年"
citation_summary: "ISA は、再入国許可には1回限り有効のものと数次有効のものがあり、有効期間は現に有する在留期間の範囲内で最長5年、特別永住者は6年と説明している。永住者の1年超の海外滞在予定では、みなし再入国だけでなく通常再入国許可を確認する。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-059
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条"
  source_locator: "再入国許可の有効期間"
  claim_type: reentry_validity
  applicable_statuses:
    - "permanent_resident"
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国1年"
    - "特別永住者6年"
    - "再入国期限超過後の補救"
  deep_water_candidate: true
applies_when:
  - "用户问永住者海外超过一年、普通再入国许可最长多久"
does_not_cover:
  - "再入国許可が実際に何年で許可されるか"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-overview
    url: https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html
    title: 再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
  - 長期出国予定の在留資格保持者
direct_fact_fields:
  - permanent_resident_long_absence_ordinary_reentry_five_year
ai_inferred_fields: []
needs_review_flags:
  - id: actual_reentry_period_review
    reason: "許可期間、出国目的、旅券状況、在留カード期限は個別確認が必要。"
evidence_points:
  - claim: "ISA は、通常再入国許可の有効期間について、現に有する在留期間の範囲内で最長5年、特別永住者は6年と説明している。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可の有効期間"
    display_label: "通常再入国許可：最長5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者の長期出国 — 通常再入国許可は最長5年の枠で確認する

## current_date_logic

Checked against the ISA reentry-permit page on 2026-05-12.

## current_effective_fact

ISA は、再入国許可には1回限り有効のものと数次有効のものがあり、有効期間は現に有する在留期間の範囲内で最長5年、特別永住者は6年と説明している。永住者の1年超の海外滞在予定では、みなし再入国だけでなく通常再入国許可を確認する。

## exceptions_or_transition

- 実際の許可期間は個別確認。
- 通常再入国許可は出国前に確認する。

## common_user_phrases

- 永住者 再入国許可 5年
- 永住 海外 3年 戻れる
- 永住者 長期出国 再入国許可
- 永住 海外駐在 5年
- 普通再入国许可 永住
- 永住 一年以上 海外

## must_say

- 1年超の出国は通常再入国許可を確認する。
- 通常再入国許可は最長5年の枠で案内されている。

## must_not_say

- 永住者なら通常再入国許可なしで5年戻らなくてもよい。
- 申請すれば必ず5年許可される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-059 |
