---
fact_id: business-manager-activity-stop-risk-router
title: 経営・管理 — 事業停止や休眠は活動不履行リスクとして扱う
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
citation_label: "経営管理の事業停止は取消リスク入口"
citation_summary: "ISA の在留資格取消案内は、経営・管理を含む別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。会社休眠や事業停止は自動取消ではなく、活動実態と理由を確認する高リスク事実として扱う。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-037
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第6号"
  source_locator: "取消事由(6)及び別表第一注"
  claim_type: risk_signal
  applicable_statuses:
    - "business_manager"
  application_type:
    - cancellation
  exclusion_scope:
    - "経営状況の改善見通し判断"
    - "更新不許可と取消の混同"
  deep_water_candidate: true
applies_when:
  - "用户问经管公司停业、休眠、倒闭后是否会取消"
does_not_cover:
  - "经营管理更新过渡措施或新规是否满足"
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
  - 経営・管理の在留資格を持つ外国人
direct_fact_fields:
  - business_manager_activity_stop_risk_router
ai_inferred_fields: []
needs_review_flags:
  - id: business_activity_reality_review
    reason: "休眠、赤字、事業停止、オフィス解約が活動不履行に当たるかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、経営・管理を含む別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。会社休眠や事業停止は自動取消ではなく、活動実態と理由を確認する高リスク事実として扱う。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(6)及び別表第一注"
    display_label: "経営・管理：事業停止と活動不履行リスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 事業停止や休眠は活動不履行リスクとして扱う

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、経営・管理を含む別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。会社休眠や事業停止は自動取消ではなく、活動実態と理由を確認する高リスク事実として扱う。

## exceptions_or_transition

- 経営管理の更新基準や既存者過渡措置は別の論点。
- 事業実態の評価は専門確認が必要。

## common_user_phrases

- 経営管理 会社 休眠 取消
- 経営管理 事業停止 ビザ
- 经管 公司停业 签证取消
- 経営管理 赤字 取消
- 経営管理 オフィス 解約
- 经营管理 没有营业

## must_say

- 事業停止や休眠は活動不履行リスクの入口になり得る。
- 更新不許可や新基準の話と取消制度を分ける。

## must_not_say

- 会社が止まったらその日に在留資格が消える。
- 2028年過渡措置中なら事業停止しても取消リスクはない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-037 |
