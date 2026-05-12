---
fact_id: residence-cancellation-other-activity-intent-trigger
title: 在留資格取消 — 本来活動を行わず他の活動を行う又は行おうとする場合
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "本来活動を離れて他活動をする場合の取消入口"
citation_summary: "ISA の在留資格取消案内は、別表第一の在留資格者が本来活動を行わず、かつ他の活動を行い又は行おうとして在留している場合を取消事由として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-032
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第5号"
  source_locator: "取消事由(5)"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "table1_activity_status_holder"
  application_type:
    - cancellation
  exclusion_scope:
    - "資格外活動許可の適法範囲"
    - "正当な理由がある場合"
  deep_water_candidate: true
applies_when:
  - "用户问签证对应活动不做、改做其他活动是否会取消"
does_not_cover:
  - "具体活动是否属于本来活动或其他活动"
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
  - residence_cancellation_other_activity_intent_trigger
ai_inferred_fields: []
needs_review_flags:
  - id: activity_classification_review
    reason: "本来活動、他活動、資格外活動許可の関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、別表第一の在留資格者が本来活動を行わず、かつ他の活動を行い又は行おうとして在留している場合を取消事由として示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(5)"
    display_label: "在留資格取消：本来活動外の活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 本来活動を行わず他の活動を行う又は行おうとする場合

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、別表第一の在留資格者が本来活動を行わず、かつ他の活動を行い又は行おうとして在留している場合を取消事由として示している。

## exceptions_or_transition

- 正当な理由がある場合は除くとされている。
- 具体活動が本来活動か他活動かは個別確認が必要。

## common_user_phrases

- 技人国 仕事辞めて フリーランス
- 経営管理 会社やめて バイト
- 本来活動 していない
- 他の活動 在留資格取消
- 工作签 不做工作 做别的
- 签证对应活动没做

## must_say

- 本来活動を離れて他活動をしている場合は取消入口になり得る。
- 活動分類と正当な理由を確認する。

## must_not_say

- 在留期限内ならどんな活動でも問題ない。
- 別の活動を始めたら必ず即取消。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-032 |
