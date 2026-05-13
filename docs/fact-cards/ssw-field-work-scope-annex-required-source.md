---
fact_id: ssw-field-work-scope-annex-required-source
title: "特定技能 — 従事できる業務は分野別要領で確認する"
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
citation_label: "特定技能: 分野別要領"
citation_summary: "ISA は、各分野で従事できる業務について、各分野の特定の分野に係る要領別冊を確認するよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 各分野で従事できる業務"
  source_locator: "在留資格「特定技能」注1"
  claim_type: field_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - landing
    - status-change
    - renewal
  exclusion_scope:
    - "個別分野の業務範囲"
    - "個別分野の試験・協議会・追加要件"
    - "他分野条件の転用"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-operation
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri07_00201.html
    title: 特定技能制度運用要領
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の業務範囲や分野別条件を聞く相談"
direct_fact_fields:
  - ssw_field_work_scope_annex_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_field_annex_review
    reason: "分野別要領の本文を個別に確認しないと業務範囲は判断できない。"
evidence_points:
  - claim: "ISA は、特定技能の各分野で従事できる業務について、各分野の特定の分野に係る要領別冊を確認するよう案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注1"
    display_label: "特定技能: 分野別要領"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 従事できる業務は分野別要領で確認する

## current_date_logic

Checked against the ISA SSW status and operation pages on 2026-05-13.

## current_effective_fact

特定技能で従事できる業務は、一般的な在留資格説明だけではなく、各分野の要領別冊で確認する必要がある。

## exceptions_or_transition

- このカードは分野別要領の入口を示すだけで、個別分野の業務範囲を判断しない。

## common_user_phrases

- 特定技能 業務範囲
- 外食試験 建設 行ける
- 介護 特定技能 外食 できる
- 特定技能 分野別 要領
- 特定技能 どの仕事 できる
- 特定技能 業種 仕事内容
- 外食特定技能 能不能去做便利店

## must_say

- 特定技能の仕事内容は分野別に確認する。
- 他分野の試験や業務範囲をそのまま使わない。

## must_not_say

- 特定技能なら分野を問わず同じ仕事ができる。
- 1つの試験合格で別分野の仕事も当然できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-007 |
