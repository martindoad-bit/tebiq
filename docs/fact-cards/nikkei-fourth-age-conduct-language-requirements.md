---
fact_id: nikkei-fourth-age-conduct-language-requirements
title: "日系四世 — 年齢・素行・日本語能力"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "日系四世の基本要件"
citation_summary: "ISA は、日系四世制度の対象者について、18歳以上35歳以下、犯罪歴がないこと、日本語能力について年齢や更新段階に応じた水準を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-012
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "日系四世の更なる受入制度"
  source_locator: "対象となる日系四世の方"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - period_renewal
  exclusion_scope:
    - "日系四世該当性"
    - "日本語能力証明"
    - "更新時水準"
  deep_water_candidate: true
official_sources:
  - id: isa-nikkei-fourth
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html
    title: 日系四世の更なる受入制度
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系四世制度の対象者要件確認"
direct_fact_fields:
  - nikkei_fourth_age_conduct_language_requirements
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_fourth_language_stage_review
    reason: "年齢別・更新時の日本語能力水準は手引きと照合して案内する必要がある。"
evidence_points:
  - claim: "ISA は、日系四世制度の対象者について、18歳以上35歳以下、犯罪歴がないこと、日本語能力要件を示している。"
    source_title: "日系四世の更なる受入制度"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象となる日系四世の方"
    display_label: "日系四世: 年齢・素行・日本語"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日系四世 — 年齢・素行・日本語能力

## current_date_logic

Checked against ISA resource page on 2026-05-12.

## current_effective_fact

日系四世制度では、対象者について18歳以上35歳以下、犯罪歴がないこと、日本語能力について年齢や更新段階に応じた水準が示されている。

## exceptions_or_transition

- 日本語能力は入国時と更新時で確認ポイントが異なる。

## common_user_phrases

- 日系四世 年齢 35歳
- 日系4世 日本語 N4
- 日系四世 N3 更新
- 日系4世 犯罪歴
- 日裔四世 日语要求

## must_say

- 年齢、素行、日本語能力を分けて確認する。

## must_not_say

- 日系の血筋だけで対象になると言う。
- 日本語能力を見なくてよいとする。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-012 |
