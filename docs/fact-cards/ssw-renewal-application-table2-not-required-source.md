---
fact_id: ssw-renewal-application-table2-not-required-source
title: "特定技能 — 更新申請では第2表は不要と案内されている"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 更新申請と第2表"
citation_summary: "ISA の特定技能ページは、在留期間更新許可申請では所属機関に関する第2表は不要と案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 在留期間更新許可申請"
  source_locator: "在留期間更新許可申請 / 提出書類一覧表"
  claim_type: material_structure_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "個別追加提出の可能性"
    - "所属機関の適格性判断"
    - "変更申請との混同"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の更新で所属機関書類の表が必要かを聞く相談"
direct_fact_fields:
  - ssw_renewal_application_table2_not_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_renewal_additional_request_review
    reason: "第2表不要という材料構造と、審査上の追加提出依頼は区別が必要。"
evidence_points:
  - claim: "ISA は、特定技能の在留期間更新許可申請について、第2表は不要と案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間更新許可申請 / 提出書類一覧表"
    display_label: "特定技能: 更新申請と第2表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 更新申請では第2表は不要と案内されている

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能の在留期間更新許可申請では、ISA の提出書類一覧表上、第2表は不要と案内されている。

## exceptions_or_transition

- 不要とされるのは提出書類一覧表上の第2表であり、個別事情により追加確認が起きないことを意味しない。
- 所属機関を変更する場合は更新だけでなく変更申請の確認が必要。

## common_user_phrases

- 特定技能 更新 第2表 不要
- 特定技能 更新 第2表不要 会社 審査
- 特定技能 更新 所属機関 書類
- 特定技能 更新 第1表 第3表
- 特定技能 续签 第2表
- 特定技能 在留期間更新 書類 表
- 特定技能 renewal table 2

## must_say

- 更新申請では、一覧表上は第2表不要と案内されている。

## must_not_say

- 更新でも必ず第2表の1から3を全部出す。
- 第2表不要なので所属機関の状況は一切見られない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-003 |
