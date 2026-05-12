---
fact_id: special-permanent-resident-special-reentry-two-years
title: 特別永住者のみなし再入国許可 — 有効期間は出国日から2年以内
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
citation_label: "特別永住者のみなし再入国は2年以内"
citation_summary: "ISA は、特別永住者が有効な旅券と特別永住者証明書を所持してみなし再入国許可で出国する場合、有効期間は出国日から2年以内としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-106
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "特別永住者のみなし再入国許可"
  claim_type: validity_limit
  applicable_statuses:
    - "special_permanent_resident"
  application_type:
    - special_reentry
  exclusion_scope:
    - "一般の中長期在留者"
  deep_water_candidate: false
applies_when:
  - "用户问特别永住者みなし再入国多久"
does_not_cover:
  - "普通永住者"
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
  - 特別永住者
direct_fact_fields:
  - special_permanent_resident_special_reentry_two_years
ai_inferred_fields: []
needs_review_flags:
  - id: distinguish_pr_and_special_pr
    reason: "一般の永住者と特別永住者を混同しない。"
evidence_points:
  - claim: "ISA は、特別永住者が有効な旅券と特別永住者証明書を所持してみなし再入国許可で出国する場合、有効期間は出国日から2年以内としている。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特別永住者のみなし再入国許可"
    display_label: "特別永住者のみなし再入国：2年以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特別永住者のみなし再入国許可 — 有効期間は出国日から2年以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

特別永住者が有効な旅券と特別永住者証明書を所持してみなし再入国許可で出国する場合、有効期間は出国日から2年以内。

## exceptions_or_transition

- 一般の永住者とは異なる。一般の中長期在留者のみなし再入国は原則1年以内。

## common_user_phrases

- 特別永住者 みなし再入国 2年
- 特別永住者 再入国 何年
- 特別永住者証明書 みなし再入国
- 永住者 みなし再入国 2年 違い
- 特别永住者 再入国 两年
- special permanent resident みなし再入国

## must_say

- 特別永住者のみなし再入国は出国日から2年以内。
- 一般の永住者とは区別する。

## must_not_say

- 一般の永住者もみなし再入国が2年である。
- 特別永住者は再入国手続を全く気にしなくてよい。

## qa_cases

### QA-1

**user**: 特別永住者はみなし再入国で2年帰れますか？

**must_have**:

- 特別永住者
- 有効旅券と特別永住者証明書
- 2年以内

**must_not_have**:

- 一般永住者も同じ

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-106 |
