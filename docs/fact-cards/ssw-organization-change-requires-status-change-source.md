---
fact_id: ssw-organization-change-requires-status-change-source
title: "特定技能 — 所属機関変更は変更許可申請を確認する"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能: 所属機関変更"
citation_summary: "ISA は、在留資格「特定技能」の人が所属機関を変更する場合は、在留資格変更許可申請が必要と案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-013
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 所属機関変更"
  source_locator: "この在留資格で在留中の方に必要な届出"
  claim_type: job_change_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - status-change
  exclusion_scope:
    - "個別転職の許可可否"
    - "所属機関に関する届出の要否"
    - "受入困難時の特定活動"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能で転職・受入機関変更を聞く相談"
direct_fact_fields:
  - ssw_organization_change_requires_status_change
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_job_change_procedure_review
    reason: "変更許可申請、届出、受入困難、現在の在留期限は個別に確認する必要がある。"
evidence_points:
  - claim: "ISA は、在留資格「特定技能」の方が所属機関を変更する場合は、在留資格変更許可申請が必要と案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "この在留資格で在留中の方に必要な届出"
    display_label: "特定技能: 所属機関変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 所属機関変更は変更許可申請を確認する

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

ISA は、在留資格「特定技能」の人が所属機関を変更する場合は、在留資格変更許可申請が必要と案内している。普通の14日届出だけで終わる話として扱わない。

## exceptions_or_transition

- 所属機関に関する届出、受入困難時の手続、在留期限は別途確認する。

## common_user_phrases

- 特定技能 転職 14日届出
- 特定技能 所属機関 変更
- 特定技能 会社変える
- 特定技能 受入機関 変更
- 特定技能 転職 変更許可
- 特定技能 job change employer change
- 特定技能 换公司 只要14天届出

## must_say

- 特定技能で所属機関を変える場合は、変更許可申請を確認する。
- 普通の所属機関届出だけで終わるとは扱わない。

## must_not_say

- 14日以内に届出すれば特定技能の転職は完了。
- 新しい会社で働き始めてから手続すればよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-013 |
