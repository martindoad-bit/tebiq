---
fact_id: special-reentry-excluded-persons
title: みなし再入国許可 — 取消手続中など対象外となる場合がある
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "みなし再入国には対象外事由がある"
citation_summary: "ISA は、在留資格取消手続中、出国確認の留保対象、収容令書発付者、難民認定申請中の一部の特定活動など、みなし再入国許可の対象外となる者を列挙している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-104
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "みなし再入国許可の対象とならない者"
  claim_type: exclusion_scope
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "在留資格取消手続中"
    - "出国確認留保対象者"
    - "収容令書発付者"
    - "一部の難民認定申請中の特定活動"
  deep_water_candidate: true
applies_when:
  - "用户有取消、难民申请、收容、出国留保等高风险背景并问みなし再入国"
does_not_cover:
  - "个案是否实际属于排除对象"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - みなし再入国を検討する外国人
direct_fact_fields:
  - special_reentry_excluded_persons
ai_inferred_fields: []
needs_review_flags:
  - id: excluded_person_status_requires_review
    reason: "実際に対象外事由に該当するかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、在留資格取消手続中、出国確認の留保対象、収容令書発付者、難民認定申請中の一部の特定活動など、みなし再入国許可の対象外となる者を列挙している。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "みなし再入国許可の対象とならない者"
    display_label: "みなし再入国：対象外事由"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# みなし再入国許可 — 取消手続中など対象外となる場合がある

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

みなし再入国許可には対象外事由がある。在留資格取消手続中、出国確認の留保対象、収容令書発付者、難民認定申請中の一部の特定活動などは対象外として列挙されている。

## exceptions_or_transition

- 該当するかどうかは個別確認が必要。
- 高リスク背景がある場合は、みなしで出国できると断定しない。

## common_user_phrases

- 在留資格取消 手続中 みなし再入国
- 難民申請中 みなし再入国
- 出国確認 留保 みなし再入国
- 収容令書 再入国
- みなし再入国 対象外
- 取消中 一時帰国 できる

## must_say

- みなし再入国には対象外事由がある。
- 取消手続中など高リスク背景では個別確認が必要。

## must_not_say

- 在留カードがあれば誰でもみなし再入国できる。
- 取消手続中でも必ず短期出国できる。

## qa_cases

### QA-1

**user**: 在留資格取消の通知が来ていますが、みなし再入国で帰国できますか？

**must_have**:

- 対象外事由の可能性
- 個別確認が必要

**must_not_have**:

- 在留カードがあれば問題なし

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-104 |
