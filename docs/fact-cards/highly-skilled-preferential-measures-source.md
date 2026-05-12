---
fact_id: highly-skilled-preferential-measures-source
title: "高度専門職 — 優遇措置の公式入口"
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
citation_label: "高度専門職: 優遇措置"
citation_summary: "ISA は高度外国人材の優遇措置として、複合的な在留活動、5年の在留期間、永住要件緩和、配偶者就労、親の帯同、家事使用人、優先処理などを案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-004
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度人材優遇措置"
  source_locator: "どのような優遇措置が受けられる？"
  claim_type: benefit_source_anchor
  applicable_statuses:
    - "高度専門職"
  application_type:
    - current-status
  exclusion_scope:
    - "各優遇措置の個別条件"
    - "家族の就労可否"
    - "永住許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職の優遇措置を聞く相談"
direct_fact_fields:
  - highly_skilled_preferential_measures_source
ai_inferred_fields: []
needs_review_flags:
  - id: benefit_specific_condition_review
    reason: "配偶者、親、家事使用人、永住短縮などは個別条件を別途確認する必要がある。"
evidence_points:
  - claim: "ISA は高度外国人材の優遇措置として、複合的な在留活動、5年の在留期間、永住要件緩和、配偶者就労、親の帯同、家事使用人、優先処理などを案内している。"
    source_title: "どのような優遇措置が受けられる？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "優遇措置一覧"
    display_label: "高度専門職: 優遇措置"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職 — 優遇措置の公式入口

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は高度外国人材の優遇措置として、複合的な在留活動、5年の在留期間、永住要件緩和、配偶者就労、親の帯同、家事使用人、優先処理などを案内している。

## exceptions_or_transition

- このカードは、各優遇措置の個別条件や許可見込みを判断しない。

## common_user_phrases

- 高度専門職 優遇措置
- 高度人材 メリット
- 高度専門職 配偶者 働く
- 高度専門職 親 呼び寄せ
- 高度人材 家事使用人
- 高度専門職 5年

## must_say

- 優遇措置は項目ごとに条件を分けて確認する。
- 親、配偶者、家事使用人は特に個別条件を確認する。

## must_not_say

- 高度専門職なら家族が全員自由に働ける。
- 高度専門職なら親を常に呼び寄せられる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-004 |
