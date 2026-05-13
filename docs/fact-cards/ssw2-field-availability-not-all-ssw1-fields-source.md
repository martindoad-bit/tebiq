---
fact_id: ssw2-field-availability-not-all-ssw1-fields-source
title: "特定技能2号 — 1号と同じ分野範囲とは限らない"
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
citation_label: "特定技能2号: 分野確認"
citation_summary: "ISA の特定技能ページは、2号の分野別提出書類表を1号とは別に案内し、工業製品製造業では対象業務区分の注記も置いている。2号を1号と同じ分野範囲として即答しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-018
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能2号 分野別書類表"
  source_locator: "在留資格認定証明書交付申請 / 変更許可申請の2号分野表"
  claim_type: field_boundary
  applicable_statuses:
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "2号対象分野の完全列挙"
    - "個別分野の技能水準"
    - "1号から2号への移行可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能2号の対象分野や1号から2号へ行けるかを聞く相談"
direct_fact_fields:
  - ssw2_field_availability_not_all_ssw1_fields_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw2_field_availability_review
    reason: "2号対象分野、業務区分、分野別要領は個別確認が必要。"
evidence_points:
  - claim: "ISA の特定技能ページは、特定技能2号の分野別提出書類表を1号とは別に案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類一覧表"
    display_label: "特定技能2号: 分野別表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の特定技能ページは、2号の工業製品製造業について対象となる業務区分の注記を置いている。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2号分野表の注記"
    display_label: "特定技能2号: 業務区分注記"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号 — 1号と同じ分野範囲とは限らない

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能2号は、1号と同じ分野範囲として即答しない。ISA の特定技能ページでは2号の分野別表が1号とは別に案内され、工業製品製造業には対象業務区分の注記もある。

## exceptions_or_transition

- 2号対象分野、業務区分、分野別要領、移行可否は別途確認する。

## common_user_phrases

- 特定技能2号 分野
- 特定技能1号 2号 同じ分野
- 外食 特定技能2号
- 介護 特定技能2号
- 工業製品製造業 特定技能2号 業務区分
- 特定技能2号 対象業種

## must_say

- 特定技能2号の対象分野や業務区分は、2号側の表・分野別資料で確認する。

## must_not_say

- 1号にある分野は全部2号も同じ。
- どの1号分野でも2号へ進める。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-018 |
