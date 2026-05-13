---
fact_id: ssw-employment-contract-notification-14day-source
title: "特定技能 — 雇用契約の変更・終了・新規締結は14日以内届出を確認する"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 雇用契約届出"
citation_summary: "ISA は、特定技能雇用契約を変更、終了又は新たに締結した特定技能所属機関を対象に、事由発生日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-004
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第1号"
  source_locator: "特定技能雇用契約に係る届出"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "雇用契約変更が不要となる場合"
    - "所属機関変更時の在留資格変更許可"
    - "契約内容の適法性"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-contract-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00187.html
    title: 特定技能所属機関による特定技能雇用契約に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能雇用契約を変更・終了・新規締結した場合の届出相談"
direct_fact_fields:
  - ssw_employment_contract_notification_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_contract_notification_scope_review
    reason: "所属機関変更や就労開始可否とは別に確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能雇用契約を変更、終了又は新たに締結した特定技能所属機関を対象に、事由が生じた日から14日以内の届出を案内している。"
    source_title: "特定技能所属機関による特定技能雇用契約に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00187.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者 / 届出期間"
    display_label: "特定技能: 雇用契約届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 雇用契約の変更・終了・新規締結は14日以内届出を確認する

## current_date_logic

Checked against the ISA employment-contract notification page on 2026-05-13.

## current_effective_fact

特定技能雇用契約を変更、終了又は新たに締結した特定技能所属機関は、事由発生日から14日以内の届出を確認する。

## exceptions_or_transition

- 所属機関を変更する場合は、届出だけでなく在留資格変更許可申請も別途確認する。

## common_user_phrases

- 特定技能 雇用契約 変更 届出 14日
- 特定技能 契約終了 届出
- 特定技能 新しい雇用契約 届出
- 特定技能 給料変更 契約届出
- 特定技能 同じ会社 契約変更
- 特定技能 employment contract notification

## must_say

- 雇用契約の変更・終了・新規締結は14日以内届出を確認する。

## must_not_say

- 雇用契約が変わっても入管への届出は不要。
- 新しい会社との契約届出だけで所属機関変更は完了する。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-004 |
