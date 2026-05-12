---
fact_id: j-skip-separate-from-points-system
title: "J-Skip — 高度人材ポイント制とは別の制度"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "J-Skip: ポイント制とは別"
citation_summary: "ISA は J-Skip について、これまでの高度人材ポイント制とは別途、学歴又は職歴と年収が一定水準以上であれば高度専門職を付与する制度として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-009
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "特別高度人材制度（J-Skip）"
  source_locator: "制度の概要"
  claim_type: system_boundary
  applicable_statuses:
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "J-Skip 該当性"
    - "ポイント制による高度専門職の点数計算"
    - "永住許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip と高度人材ポイント制の違いを聞く相談"
direct_fact_fields:
  - j_skip_separate_from_points_system
ai_inferred_fields: []
needs_review_flags:
  - id: j_skip_status_fit_review
    reason: "J-Skip は活動類型と年収・学歴・職歴要件を分けて確認する必要がある。"
evidence_points:
  - claim: "ISA は J-Skip について、これまでの高度人材ポイント制とは別途、学歴又は職歴と年収が一定水準以上であれば高度専門職を付与する制度として説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度の概要"
    display_label: "J-Skip: ポイント制とは別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — 高度人材ポイント制とは別の制度

## current_date_logic

Checked against the ISA J-Skip page on 2026-05-12.

## current_effective_fact

ISA は J-Skip について、これまでの高度人材ポイント制とは別途、学歴又は職歴と年収が一定水準以上であれば高度専門職を付与する制度として説明している。

## exceptions_or_transition

- このカードは、J-Skip 該当性や高度専門職許可見込みを判断しない。

## common_user_phrases

- J-Skip ポイント 不要
- 特別高度人材 ポイント制 違い
- J-Skip 70点 必要
- J-Skip 高度専門職
- 特別高度人材制度
- J-Skip 条件

## must_say

- J-Skip は通常の高度人材ポイント制とは別に確認する。
- 学歴又は職歴と年収の基準を活動類型ごとに確認する。

## must_not_say

- J-Skip も70点以上ならよい。
- J-Skip は点数表だけで判断する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-009 |
