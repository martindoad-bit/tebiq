---
fact_id: qualification-outside-activity-comprehensive-permission-boundary
title: 資格外活動許可 — 包括許可は万能許可ではない
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "包括許可は原則週28時間等の範囲の許可"
citation_summary: "資格外活動の包括許可は、原則として週28時間以内で、活動場所が風俗営業等でないことなどを条件とする。万能の就労許可ではない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-025
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動の許可（入管法第19条）：包括的許可"
  claim_type: permission_boundary
  applicable_statuses:
    - "student"
    - "dependent"
    - "other_eligible_statuses"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "無制限就労"
    - "風俗営業等"
  deep_water_candidate: true
applies_when:
  - "用户问打工许可是否什么工作都能做"
  - "用户问包括许可范围"
does_not_cover:
  - "具体工作地点是否属于禁止行业"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-law19
    url: https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html
    title: 資格外活動の許可（入管法第19条）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - comprehensive_permission_generally_28_hours_and_no_adult_entertainment_location
ai_inferred_fields: []
needs_review_flags:
  - id: specific_activity_place_check
    reason: "Specific work content and place require review."
evidence_points:
  - claim: "ISA explains that comprehensive permission can be granted without specifying employer or business details under conditions such as generally within 28 hours per week and no adult-entertainment-type activity place."
    source_title: "資格外活動の許可（入管法第19条）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "包括的許可"
    display_label: "包括許可：週28時間等の範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 包括許可は万能許可ではない

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

資格外活動の包括許可は、原則として1週28時間以内であること、活動場所で風俗営業等が営まれていないことなどの条件を前提とする。どんな仕事でも無制限にできる許可ではない。

## exceptions_or_transition

- 留学生の長期休業中の扱い、個別許可、就労資格者の追加活動は別カードへルーティングする。

## common_user_phrases

- 包括许可 什么工作都可以吗
- 打工许可 万能吗
- 資格外活動 包括許可 28小时
- 留学生打工许可 范围
- 资格外活动许可 不是万能
- 包括的許可 風俗営業

## must_say

- 包括許可は範囲と条件がある。
- 万能の就労許可ではない。

## must_not_say

- 有资格外活动许可就什么都能做。
- 28小时内任何行业都可以。

## qa_cases

### QA-1

**user**: 有了资格外活动许可，去任何店打工都行吗？

**must_have**:

- 包括许可有条件
- 风俗营业等要排除

**must_not_have**:

- 什么都可以

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-025 |
