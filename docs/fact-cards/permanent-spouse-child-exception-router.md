---
fact_id: permanent-spouse-child-exception-router
title: 永住許可ガイドライン — 配偶者・子の在留年数例外ルート
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "配偶者・子の永住年数例外ルート"
citation_summary: "ISA の永住許可ガイドラインは、日本人・永住者・特別永住者の配偶者について、実体を伴った婚姻生活3年以上かつ引き続き日本在留1年以上、実子等について引き続き日本在留1年以上という例外ルートを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-007
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "2(1)"
  claim_type: exception_router
  applicable_statuses:
    - "spouse_or_child_of_japanese"
    - "spouse_or_child_of_permanent_resident"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "婚姻実体の個別評価"
    - "離婚・別居後の資格戦略"
  deep_water_candidate: false
applies_when:
  - "用户问日配、永配、孩子永住是否有年数例外"
does_not_cover:
  - "婚姻实态或个案是否满足"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 日本人・永住者・特別永住者の配偶者又は実子等
direct_fact_fields:
  - permanent_spouse_child_exception_router
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_reality_requires_review
    reason: "実体を伴った婚姻生活の評価は個別確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、日本人・永住者・特別永住者の配偶者について、実体を伴った婚姻生活3年以上かつ引き続き日本在留1年以上、実子等について引き続き日本在留1年以上という例外ルートを示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2(1)"
    display_label: "永住ガイドライン：配偶者・子の年数例外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 配偶者・子の在留年数例外ルート

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、日本人・永住者・特別永住者の配偶者について、実体を伴った婚姻生活3年以上かつ引き続き日本在留1年以上、実子等について引き続き日本在留1年以上という例外ルートを示している。

## exceptions_or_transition

- 例外ルートは許可保証ではない。
- 離婚、別居、婚姻実体、現在資格は別途確認する。

## common_user_phrases

- 日配 永住 3年 1年
- 日本人配偶者 永住 何年
- 永住者配偶者 永住 例外
- 日配 结婚三年 永住
- 子供 永住 1年
- 配偶者 永住 年数

## must_say

- 配偶者は実体を伴った婚姻生活3年以上かつ日本在留1年以上が例外ルート。
- 実子等は日本在留1年以上の例外ルートがある。
- 例外ルートは許可保証ではない。

## must_not_say

- 日配なら必ず1年で永住できる。
- 婚姻届だけで必ず例外を満たす。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-007 |
