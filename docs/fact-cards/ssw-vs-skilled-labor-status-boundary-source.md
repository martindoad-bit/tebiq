---
fact_id: ssw-vs-skilled-labor-status-boundary-source
title: "技能と特定技能 — 名前が似ていても別の在留資格"
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
citation_label: "技能と特定技能: 別資格"
citation_summary: "ISA の在留資格一覧表では、技能と特定技能は別の在留資格として案内され、活動内容や在留期間の欄も別に整理されている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-015
  authority_layer: L4 ISA Status List
  legal_source_type: official_status_page
  law_article_ref: "在留資格一覧表 技能 / 特定技能"
  source_locator: "入管法別表第一 二の表"
  claim_type: integration_boundary
  applicable_statuses:
    - "技能"
    - "特定技能"
  application_type:
    - current-status
    - status-change
  exclusion_scope:
    - "技能資格の職種別基準"
    - "特定技能の分野別基準"
    - "技能実習からの移行"
  deep_water_candidate: true
official_sources:
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "中国語の技能签证が技能か特定技能か曖昧な相談"
direct_fact_fields:
  - ssw_vs_skilled_labor_status_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: skilled_labor_ssw_disambiguation_review
    reason: "中国語の技能签证は技能・特定技能・技能実習のどれを指すか確認が必要。"
evidence_points:
  - claim: "ISA の在留資格一覧表では、技能と特定技能は別の在留資格として案内されている。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "二の表"
    display_label: "技能・特定技能: 別資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技能と特定技能 — 名前が似ていても別の在留資格

## current_date_logic

Checked against the ISA status list on 2026-05-13.

## current_effective_fact

技能と特定技能は、ISA の在留資格一覧表で別の在留資格として案内されている。中国語で「技能签证」と言われた場合は、どちらを指すか確認する。

## exceptions_or_transition

- 技能資格の職種別条件や特定技能の分野別条件は、このカードでは判断しない。

## common_user_phrases

- 技能 特定技能 違い
- 技能签证 是特定技能吗
- 技能签证 厨师 特定技能
- 技能签证 和 特定技能
- 技能 特定技能 同じ
- skilled labor specified skilled worker

## must_say

- 技能と特定技能は別資格。
- 「技能签证」と言われたら先に意味を確認する。

## must_not_say

- 技能と特定技能は同じ。
- 技能の経験要件を特定技能にそのまま使う。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-015 |
