---
fact_id: permanent-resident-long-absence-special-reentry-one-year
title: 永住者の短期出国 — みなし再入国は原則1年以内
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
citation_label: "永住者もみなし再入国は原則1年以内"
citation_summary: "ISA は、みなし再入国許可について、在留資格をもって在留し有効な旅券を所持する外国人が出国の日から1年以内に再入国する場合、原則として通常再入国許可を不要とする制度と説明している。永住者でも、1年を超える出国は通常再入国許可の検討が必要。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-058
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条の2"
  source_locator: "みなし再入国許可の概要・有効期間"
  claim_type: reentry_validity
  applicable_statuses:
    - "permanent_resident"
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "通常再入国許可"
    - "特別永住者のみなし再入国"
    - "1年超過後の補救"
  deep_water_candidate: true
applies_when:
  - "用户问永住者短期回国、长期海外、みなし再入国能离开多久"
does_not_cover:
  - "1年を超える出国の可否判断"
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
  - 永住者
  - みなし再入国を利用する中長期在留者
direct_fact_fields:
  - permanent_resident_long_absence_special_reentry_one_year
ai_inferred_fields: []
needs_review_flags:
  - id: over_one_year_requires_reentry_review
    reason: "1年超の海外滞在予定は通常再入国許可、在留カード期限、個別事情を確認する。"
evidence_points:
  - claim: "ISA は、みなし再入国許可について、在留資格をもって在留し有効な旅券を所持する外国人が出国の日から1年以内に再入国する場合、原則として通常再入国許可を不要とする制度と説明している。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要・有効期間"
    display_label: "永住者の短期出国：みなし再入国は原則1年以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者の短期出国 — みなし再入国は原則1年以内

## current_date_logic

Checked against the ISA special reentry page on 2026-05-12.

## current_effective_fact

ISA は、みなし再入国許可について、在留資格をもって在留し有効な旅券を所持する外国人が出国の日から1年以内に再入国する場合、原則として通常再入国許可を不要とする制度と説明している。永住者でも、1年を超える出国は通常再入国許可の検討が必要。

## exceptions_or_transition

- 特別永住者は2年ルール。
- 在留資格取消手続中など、みなし再入国対象外の人がいる。
- 1年超予定では通常再入国許可を確認する。

## common_user_phrases

- 永住者 みなし再入国 1年
- 永住 一時帰国 何ヶ月
- 永住者 海外 1年以上
- 永住 长期离开日本
- 永住 みなし再入国 期限
- 永住者 海外駐在

## must_say

- 永住者でも、みなし再入国は原則1年以内。
- 1年を超える予定なら通常再入国許可を検討する。

## must_not_say

- 永住者なら何年海外にいても自由に戻れる。
- 永住者には再入国手続が不要。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-058 |
