---
fact_id: residence-cancellation-minister-can-cancel-discretion
title: 在留資格取消 — 法務大臣は取消事由判明時に取り消すことができる
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
citation_label: "取消事由は直ちに自動失効を意味しない"
citation_summary: "ISA の在留資格取消案内は、法務大臣が一定の事実が判明したときに在留資格を取り消すことができる制度として説明している。取消事由の可能性と即時の自動失効は分けて扱う必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-051
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4"
  source_locator: "制度の概要"
  claim_type: procedure_boundary
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "取消事由への個別該当性"
    - "取消処分の結果予測"
  deep_water_candidate: true
applies_when:
  - "用户问某个风险事实是否马上导致签证失效"
does_not_cover:
  - "个案是否实际被取消"
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
  - 在留資格取消リスクを確認する外国人
direct_fact_fields:
  - residence_cancellation_minister_can_cancel_discretion
ai_inferred_fields: []
needs_review_flags:
  - id: individual_cancellation_decision_required
    reason: "具体的事実が取消事由に当たるか、取消処分となるかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、法務大臣が一定の事実が判明したときに外国人が現に有する在留資格を取り消すことができる制度として、在留資格取消を説明している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度の概要"
    display_label: "在留資格取消：取消事由と手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 法務大臣は取消事由判明時に取り消すことができる

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、法務大臣が一定の事実が判明したときに外国人が現に有する在留資格を取り消すことができる制度として、在留資格取消を説明している。

## exceptions_or_transition

- 取消事由に当たり得る事実があることと、即時に在留資格が失効することは別。

## common_user_phrases

- 在留資格取消 自動
- 签证 马上失效
- 取消事由 すぐ失効
- 在留資格 取消されるか
- 失业 离婚 停业 自动取消
- ビザ 自动取消

## must_say

- 取消事由の可能性と即時失効は分ける。
- 個別事実と手続を確認する。

## must_not_say

- 取消事由がありそうならその場で自動失効する。
- 在留期限が残っていれば取消リスクはない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-051 |
