---
fact_id: ordinary-reentry-before-departure
title: 通常再入国許可 — 出国前に申請する手続
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "通常再入国許可は出国前申請"
citation_summary: "ISA は、通常の再入国許可について、日本を出国する前に地方出入国在留管理官署で申請する手続として案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-097
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可申請"
  source_locator: "手続対象者・申請期間"
  claim_type: procedure_timing
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国"
    - "出国後の申請"
  deep_water_candidate: false
applies_when:
  - "用户问长期离境前办普通再入国许可的时点"
does_not_cover:
  - "みなし再入国で足りる短期出国"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-application
    url: https://www.moj.go.jp/isa/immigration/procedures/16-5.html
    title: 再入国許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 通常再入国許可を申請する外国人
direct_fact_fields:
  - ordinary_reentry_before_departure
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA は、通常の再入国許可を、日本を出国する前に申請する手続として案内している。"
    source_title: "再入国許可申請"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者・申請期間"
    display_label: "通常再入国許可：出国前に申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 通常再入国許可 — 出国前に申請する手続

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

通常再入国許可は、日本を出国する前に申請する手続である。申請先は住居地を管轄する地方出入国在留管理官署。

## exceptions_or_transition

- みなし再入国許可を利用できる場合は、通常再入国許可申請は原則不要と案内されている。
- 出国後に通常再入国許可を新規申請する手続ではない。

## common_user_phrases

- 再入国許可 出国前 申請
- 再入国許可 いつ申請
- 再入国許可 どこで申請
- 1年以上 帰国 再入国許可
- 長期出国 再入国許可 入管
- 普通再入国许可 出国前

## must_say

- 通常再入国許可は出国前に申請する。
- 申請先は住居地を管轄する地方出入国在留管理官署。

## must_not_say

- 出国後でも普通に申請できる。
- 空港でいつでも通常再入国許可を取れる。

## qa_cases

### QA-1

**user**: 2年帰国する予定です。再入国許可はいつ取りますか？

**must_have**:

- 出国前に申請
- 住居地管轄の地方入管

**must_not_have**:

- 出国後に申請

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-097 |
