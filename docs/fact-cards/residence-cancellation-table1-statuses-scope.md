---
fact_id: residence-cancellation-table1-statuses-scope
title: 在留資格取消 — 活動不履行系の取消事由は別表第一の在留資格が対象
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "活動不履行系取消事由の対象資格"
citation_summary: "ISA の在留資格取消案内は、活動不履行系の取消事由に関して、別表第一の在留資格として外交、公用、教授、高度専門職、経営・管理、技術・人文知識・国際業務、留学、家族滞在、特定活動などを列挙している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-033
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第5号・第6号"
  source_locator: "注：入管法別表第1の上欄の在留資格"
  claim_type: scope_boundary
  applicable_statuses:
    - "table1_activity_status_holder"
  application_type:
    - cancellation
  exclusion_scope:
    - "別表第二の身分系資格"
    - "配偶者資格の6か月ルール"
  deep_water_candidate: false
applies_when:
  - "用户问三个月活动不履行规则适用于哪些签证"
does_not_cover:
  - "永住者や配偶者身份资格是否适用同一三个月规则"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 別表第一の活動資格を持つ外国人
direct_fact_fields:
  - residence_cancellation_table1_statuses_scope
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "活動不履行系の取消事由に関して、ISA は別表第一の在留資格として外交、公用、教授、高度専門職、経営・管理、技術・人文知識・国際業務、留学、家族滞在、特定活動などを列挙している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注：入管法別表第1の上欄の在留資格"
    display_label: "在留資格取消：別表第一の対象資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 活動不履行系の取消事由は別表第一の在留資格が対象

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

活動不履行系の取消事由に関して、ISA は別表第一の在留資格として外交、公用、教授、高度専門職、経営・管理、技術・人文知識・国際業務、留学、家族滞在、特定活動などを列挙している。

## exceptions_or_transition

- 配偶者資格の6か月ルールや永住者の取消制度とは分ける。

## common_user_phrases

- 3ヶ月ルール 対象
- 技人国 3ヶ月 在留資格取消
- 経営管理 3ヶ月 取消
- 留学 活動してない 取消
- 家族滞在 活動不履行
- 別表第一 取消

## must_say

- 活動不履行系の取消事由は別表第一の活動資格を対象とする。
- 身分系資格や永住者の話とは分ける。

## must_not_say

- すべての在留資格に同じ3か月ルールを当てる。
- 配偶者資格の6か月ルールと混同する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-033 |
