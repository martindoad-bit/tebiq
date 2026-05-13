---
fact_id: ssw-vs-gijinkoku-work-scope-boundary-source
title: "特定技能と技人国 — 業務範囲を混同しない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能と技人国: 業務範囲"
citation_summary: "ISA は、特定技能を特定産業分野の技能を要する業務として案内し、技人国を自然科学・人文科学の知識等を要する業務として案内している。事務職や通訳などを特定技能へ直結しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-016
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 / 技術・人文知識・国際業務"
  source_locator: "在留資格「特定技能」活動欄 / 技術・人文知識・国際業務 page"
  claim_type: integration_boundary
  applicable_statuses:
    - "特定技能"
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
    - status-change
  exclusion_scope:
    - "個別職務の該当性"
    - "現場業務と事務業務の混在判断"
    - "分野別業務範囲"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-gijinkoku-status
    url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    title: 在留資格「技術・人文知識・国際業務」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で事務職・通訳・マーケティング等をできるかを聞く相談"
direct_fact_fields:
  - ssw_vs_gijinkoku_work_scope_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_gijinkoku_work_scope_review
    reason: "職務内容、主従関係、分野別要領により個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能を特定産業分野に属する技能を要する業務に従事する活動として案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "活動欄"
    display_label: "特定技能: 特定産業分野"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は、技術・人文知識・国際業務を自然科学・人文科学の知識や外国文化に基盤を有する思考・感受性を必要とする業務として案内している。"
    source_title: "在留資格「技術・人文知識・国際業務」"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "活動欄"
    display_label: "技人国: 知識等を要する業務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能と技人国 — 業務範囲を混同しない

## current_date_logic

Checked against the ISA SSW and Gijinkoku status pages on 2026-05-13.

## current_effective_fact

特定技能は特定産業分野の技能を要する業務、技術・人文知識・国際業務は自然科学・人文科学の知識等を要する業務として案内されている。事務職、通訳、マーケティングなどを特定技能に直結しない。

## exceptions_or_transition

- 職務内容の主従関係や分野別要領の範囲は個別確認が必要。

## common_user_phrases

- 特定技能 事務職
- 特定技能 通訳 できる
- 特定技能 マーケティング
- 特定技能 技人国 違い
- 外食 特定技能 店長 事務
- 特定技能 オフィスワーク
- 外食 特定技能 事务职

## must_say

- 特定技能と技人国は業務範囲の考え方が違う。
- 事務職・通訳・マーケティングなどは技人国側の確認が必要になりやすい。

## must_not_say

- 特定技能なら一般事務や通訳も自由にできる。
- 技人国の仕事を特定技能でそのままできる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-016 |
