---
fact_id: ssw-change-application-activity-change-prompt-source
title: "特定技能 — 活動内容を変えるときは変更申請を確認する"
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
citation_label: "特定技能: 変更申請"
citation_summary: "ISA は、ほかの在留資格から特定技能に該当する活動へ変える場合は変更許可申請の対象であり、活動内容を変更する場合は速やかに申請するよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-012
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 在留資格変更許可申請"
  source_locator: "在留資格変更許可申請"
  claim_type: procedure_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - status-change
  exclusion_scope:
    - "個別変更許可の可否"
    - "現在資格の取消該当性"
    - "転職時の個別手続"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "ほかの在留資格から特定技能の仕事を始める相談"
direct_fact_fields:
  - ssw_change_application_activity_change_prompt
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_activity_change_timing_review
    reason: "現在の在留資格、予定業務、開始時期により個別確認が必要。"
evidence_points:
  - claim: "ISA は、既にほかの在留資格を持つ人が活動内容を変更して特定技能に該当する活動を行おうとする場合を、在留資格変更許可申請として案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格変更許可申請"
    display_label: "特定技能: 変更許可申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 活動内容を変えるときは変更申請を確認する

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

ほかの在留資格から活動内容を変えて特定技能に該当する活動を行う場合は、在留資格変更許可申請を確認する。ISA は活動内容を変更する場合、速やかに申請するよう案内している。

## exceptions_or_transition

- 現在資格で本来の活動をしていない場合の取消リスクは個別確認が必要。

## common_user_phrases

- 留学から特定技能 変更
- 技人国から特定技能 変更
- 特定技能 仕事 始める 前 申請
- 特定技能 在留資格変更 いつ
- 特定技能 活動内容 変更
- 他のビザから特定技能

## must_say

- ほかの資格から特定技能の活動へ変える場合は、変更許可申請を確認する。

## must_not_say

- 仕事を始めてから後で届出すればよい。
- 在留資格を変えなくても特定技能の仕事を始められる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-012 |
