---
fact_id: status-cancellation-departure-deportation-router
title: 在留資格取消 — 取消・出国期間指定・退去強制を分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "取消後の経路整理"
citation_summary: "ISA の在留資格取消案内は、取消事由により直ちに退去強制対象となる場合と、30日を上限に出国のための期間が指定される場合があると示している。取消、出国期間指定、退去強制を分ける。"
source_display_names:
  - "出入国在留管理庁"
  - "e-Gov 法令検索"
legal_source:
  candidate_id: C4-072
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第22条の4 / 第24条"
  source_locator: "取消後の扱い / 退去強制事由"
  claim_type: procedure_boundary
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
    - deportation
  exclusion_scope:
    - "退去強制手続の詳細"
    - "出国命令制度"
    - "刑事罰や収容の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问在留资格取消是不是马上遣返"
does_not_cover:
  - "具体案件属于哪种取消事由或退去强制事由"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取消手続の対象となる外国人
direct_fact_fields:
  - status_cancellation_departure_deportation_router
ai_inferred_fields: []
needs_review_flags:
  - id: cancellation_path_individual_review
    reason: "取消事由、出国期間、退去強制、出国命令、刑事罰は個別確認が必要。"
evidence_points:
  - claim: "ISA の在留資格取消案内は、取消事由により直ちに退去強制対象となる場合と、30日を上限に出国のための期間が指定される場合があると示している。取消、出国期間指定、退去強制を分ける。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消後の扱い"
    display_label: "在留資格取消：取消後の経路"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 取消・出国期間指定・退去強制を分ける

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA の在留資格取消案内は、取消事由により直ちに退去強制対象となる場合と、30日を上限に出国のための期間が指定される場合があると示している。取消、出国期間指定、退去強制を分ける。

## exceptions_or_transition

- 指定期間内に出国しない場合や逃亡疑いがある場合は別途高リスク。

## common_user_phrases

- 在留資格取消 すぐ強制送還
- 签证取消 马上遣返
- 取消後 30日 出国
- 在留资格取消 出国期间 退去强制
- ビザ取消 出国期間
- 取消 退去強制 違い

## must_say

- 取消、出国期間指定、退去強制を分ける。
- 取消後の扱いは取消事由により異なる。

## must_not_say

- 取消なら全件すぐ退去強制。
- 取消後は必ず30日ある。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-072 |
