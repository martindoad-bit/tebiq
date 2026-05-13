---
fact_id: ssw-vs-technical-intern-training-status-boundary-source
title: "特定技能と技能実習 — 別の在留資格として確認する"
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
citation_label: "特定技能と技能実習: 別資格"
citation_summary: "ISA の在留資格一覧表では、特定技能と技能実習は別の在留資格として並び、活動内容も別に案内されている。移行ルートがある場合でも同じ制度として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-014
  authority_layer: L4 ISA Status List
  legal_source_type: official_status_page
  law_article_ref: "在留資格一覧表 特定技能 / 技能実習"
  source_locator: "入管法別表第一 二の表"
  claim_type: integration_boundary
  applicable_statuses:
    - "特定技能"
    - "技能実習"
  application_type:
    - current-status
    - status-change
  exclusion_scope:
    - "技能実習良好修了による試験免除"
    - "移行ルートの可否"
    - "育成就労制度"
  deep_water_candidate: true
official_sources:
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "技能実習と特定技能を同じ制度として聞く相談"
direct_fact_fields:
  - ssw_vs_technical_intern_training_status_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: titp_to_ssw_transition_review
    reason: "技能実習から特定技能への移行可否や試験免除は分野・修了状況で別途確認が必要。"
evidence_points:
  - claim: "ISA の在留資格一覧表では、特定技能と技能実習は別の在留資格として案内されている。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "二の表"
    display_label: "特定技能・技能実習: 別資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能と技能実習 — 別の在留資格として確認する

## current_date_logic

Checked against the ISA status list on 2026-05-13.

## current_effective_fact

特定技能と技能実習は、ISA の在留資格一覧表で別の在留資格として案内されている。移行ルートがある場合でも、同じ制度や単純な更新として扱わない。

## exceptions_or_transition

- 技能実習良好修了による試験免除や移行可否は、分野と修了状況を別途確認する。

## common_user_phrases

- 技能実習 特定技能 同じ
- 技能实习 转 特定技能
- 技能実習2号 特定技能 免試験
- 技能実習 終了 特定技能
- 特定技能 技能実習 違い
- 技能实习续签特定技能

## must_say

- 特定技能と技能実習は別の在留資格。
- 移行や免除があるかは別に確認する。

## must_not_say

- 技能実習の続きがそのまま特定技能。
- 技能実習から特定技能へ自動更新できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-014 |
