---
fact_id: residence-change-activity-purpose-change
title: 在留資格変更 — 在留目的・活動を別資格へ変える手続
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
citation_label: "在留資格変更は別資格に該当する活動へ移る手続"
citation_summary: "在留資格変更許可申請は、現在の在留目的とする活動を変更し、別の在留資格に該当する活動を行おうとする場合に行う手続。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-005
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第20条"
  source_locator: "在留資格変更許可申請ページ：手続概要・手続根拠"
  claim_type: procedure_scope
  applicable_statuses:
    - "all"
  application_type:
    - change
  exclusion_scope:
    - "在留期間更新"
    - "資格外活動許可"
    - "許可確率"
  deep_water_candidate: false
applies_when:
  - "用户问换工作、毕业就职、家族滞在转工作是否要换签"
  - "用户问变更和更新区别"
does_not_cover:
  - "新活动是否符合具体资格的条件"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-change-16-2
    url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    title: 在留資格変更許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格変更許可申請
direct_fact_fields:
  - change_application_for_new_status_activity
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA describes status change as the application used when a foreign national changes the activity that is the purpose of stay and intends to conduct an activity corresponding to another residence status."
    source_title: "在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続根拠"
    display_label: "在留資格変更：別資格に該当する活動へ移る手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格変更 — 在留目的・活動を別資格へ変える手続

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格変更許可申請は、在留目的とする活動を変更し、別の在留資格に該当する活動を行おうとする場合に、新しい在留資格へ変更するための手続である。

## exceptions_or_transition

- 同じ在留資格内で活動が続く場合は、変更ではなく更新や届出の問題になることがある。
- 新活動を始めてよいかは、変更許可の有無と現在資格の活動範囲で分ける。

## common_user_phrases

- 在留資格変更 换签 活动变更
- 毕业后工作要不要变更
- 家族滞在转工作要换签吗
- 留学转技人国 变更
- 换工作是更新还是变更
- 在留目的改变 别的签证

## must_say

- 別の在留資格に該当する活動へ移る場合は、在留資格変更の対象になる。
- 変更是否需要，要看新活动是否超出当前资格。

## must_not_say

- 活动变了也只要续签即可。
- 变更申请提交后就可以开始新活动。

## qa_cases

### QA-1

**user**: 家族滞在拿到正社员 offer，可以先上班再换签吗？

**must_have**:

- 工作活动通常要看在留资格変更
- 开始前需确认许可边界

**must_not_have**:

- 先上班再说

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-005 |
