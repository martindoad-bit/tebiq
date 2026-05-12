---
fact_id: institution-side-no-criminal-penalty-review-caution
title: 所属機関による届出 — 未届出でも刑罰はないが審査で慎重確認される場合
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "機関側届出漏れの審査リスク"
citation_summary: "ISA 手続ページは、所属機関による届出を行わなくても刑罰は科されないが、外国人の更新等申請時に事実関係確認など審査を慎重に行うことがあると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-047
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の17"
  source_locator: "所属機関による届出手続：手続概要"
  claim_type: consequence_boundary
  applicable_statuses:
    - "institution_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "外国人本人の届出義務違反"
    - "個別審査結果"
  deep_water_candidate: true
applies_when:
  - "用户或公司问机构侧届出漏了是否会罚、是否影响续签"
does_not_cover:
  - "具体更新申请是否不许可"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-institution-notification-page
    url: https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html
    title: 所属機関による届出手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関による届出
direct_fact_fields:
  - institution_side_no_criminal_penalty
  - institution_side_review_caution
ai_inferred_fields: []
needs_review_flags:
  - id: institution_notification_review_consequence
    reason: "The page describes possible careful review but does not decide an individual application outcome."
evidence_points:
  - claim: "ISA states that no criminal penalty is imposed when the accepting organization does not file this notification, but residence period renewal and other applications by the foreign nationals may be reviewed carefully, including checks of the circumstances."
    source_title: "所属機関による届出手続"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要"
    display_label: "機関側届出：刑罰なし、審査で慎重確認の場合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関による届出 — 未届出でも刑罰はないが審査で慎重確認される場合

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

所属機関による届出を行わなかったとしても、刑罰を科されることはない。ただし、所属している外国人の在留期間更新等の許可申請時に、事実関係の確認を行うなど審査を慎重に行うことがある。

## exceptions_or_transition

- これは機関側届出についての説明であり、外国人本人の所属機関届出とは区別する。
- 個別申請の許否をこの説明だけで断定しない。

## common_user_phrases

- 会社側 届出 忘れた 罰則
- 所属機関による届出 未提出 刑罰
- 会社側 入管届出 忘れた 续签
- 機関側届出 審査 慎重
- 外国人社員 更新 会社届出漏れ
- 会社が届出してない 不利

## must_say

- 機関側届出の未届出に刑罰はないと説明されている。
- ただし更新等で事実確認など慎重審査になる場合がある。

## must_not_say

- 機関側届出漏れは必ず刑罰。
- 機関側届出漏れは必ず更新不許可。
- 本人側の届出義務と同じ罰則だと混同する。

## qa_cases

### QA-1

**user**: 会社が入管への受入開始届出を忘れていました。罰則ありますか？

**must_have**:

- 機関側は刑罰なしと説明
- 更新等で慎重確認の可能性

**must_not_have**:

- 必ず不許可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-047 |
