---
fact_id: residence-renewal-same-status-extension
title: 在留期間更新 — 同一在留資格の期間延長手続
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "在留期間更新は同一在留資格の期間延長手続"
citation_summary: "在留期間更新許可申請は、現に有する在留資格を変更せず、付与された在留期間を超えて引き続き在留するための手続。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-001
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第21条"
  source_locator: "在留期間更新許可申請ページ：手続概要・手続根拠"
  claim_type: procedure_scope
  applicable_statuses:
    - "all"
  application_type:
    - renewal
  exclusion_scope:
    - "在留資格変更"
    - "永住許可"
    - "許可確率"
  deep_water_candidate: false
applies_when:
  - "用户问续签是不是同一签证延长"
  - "用户把更新和变更混在一起"
does_not_cover:
  - "改变活动内容时是否需要在留资格変更"
  - "个案能否获批"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-renewal-16-3
    url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    title: 在留期間更新許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請
direct_fact_fields:
  - renewal_same_status_extension
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA describes renewal as an application to update the period of stay when the person wants to continue staying without changing the current residence status."
    source_title: "在留期間更新許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続根拠"
    display_label: "在留期間更新：同一資格の期間延長手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留期間更新 — 同一在留資格の期間延長手続

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留期間更新許可申請は、現に有する在留資格を変更せず、付与済みの在留期間を超えて引き続き在留したい場合の手続である。

## exceptions_or_transition

- 活動内容や在留目的が別の在留資格に移る場合は、更新ではなく在留資格変更の検討対象になる。
- このカードは許可可能性を判断しない。

## common_user_phrases

- 在留期間更新 续签 同一资格
- 签证更新是不是延长现在的签证
- 更新和变更有什么区别
- 续签不是换签
- 在留期限延长 同一个在留资格
- 现在的签证继续延长

## must_say

- 更新は、原則として現在の在留資格を変えずに在留期間を延長する手続。
- 活動内容が変わる場合は、変更手続との切り分けが必要。

## must_not_say

- 更新和变更是一回事。
- 续签可以自动覆盖新的活动内容。
- 提交更新申请就等于获批。

## qa_cases

### QA-1

**user**: 续签和换签是不是一样？

**must_have**:

- 更新是同一在留资格的期间延长
- 换活动或目的时要看变更

**must_not_have**:

- 两者一样
- 自动许可

### QA-2

**user**: 我还是同一家公司同一工作，是更新吗？

**must_have**:

- 可能属于更新场景
- 仍需看该资格和材料

**must_not_have**:

- 保证许可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-001 |
