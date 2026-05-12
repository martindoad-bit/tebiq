---
fact_id: highly-skilled-permanent-residence-70-80-year-router
title: "高度人材 — 永住申請の70点・80点短縮入口"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "高度人材: 永住短縮"
citation_summary: "ISA は、高度外国人材としての活動を3年間行っている場合、また80点以上で1年間行っている場合に、永住許可の在留歴要件緩和の対象となると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-008
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度人材 永住要件緩和"
  source_locator: "在留歴に係る永住許可要件の緩和"
  claim_type: permanent_residence_router
  applicable_statuses:
    - "高度専門職"
    - "永住者"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "永住許可見込み"
    - "点数維持の証明判断"
    - "税・年金・素行等の総合判断"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度人材ポイントによる永住短縮を聞く相談"
direct_fact_fields:
  - highly_skilled_permanent_residence_70_80_year_router
ai_inferred_fields: []
needs_review_flags:
  - id: pr_points_maintenance_review
    reason: "70点・80点の時点、維持、税年金資料、永住全体要件は個別確認が必要。"
evidence_points:
  - claim: "ISA は、高度外国人材としての活動を3年間行っている場合、また80点以上で1年間行っている場合に、永住許可の在留歴要件緩和の対象となると案内している。"
    source_title: "どのような優遇措置が受けられる？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留歴に係る永住許可要件の緩和"
    display_label: "高度人材: 永住短縮"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度人材 — 永住申請の70点・80点短縮入口

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は、高度外国人材としての活動を3年間行っている場合、また80点以上で1年間行っている場合に、永住許可の在留歴要件緩和の対象となると案内している。

## exceptions_or_transition

- このカードは、永住許可見込み、点数維持、税・年金・素行などの総合判断をしない。

## common_user_phrases

- 高度人材 永住 70点 3年
- 高度人材 永住 80点 1年
- 高度専門職 永住短縮
- 高度人才 永住 一年
- 高度専門職 80点 永住
- 高度人材 70点 永住

## must_say

- 70点・80点は永住の在留歴短縮入口として確認する。
- 永住許可そのものは税・年金・素行など他要件も確認する。

## must_not_say

- 80点なら必ず永住が許可される。
- 70点なら3年で自動的に永住者になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-008 |
