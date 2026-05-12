---
fact_id: residence-cancellation-to-deportation-ground-boundary
title: 在留資格取消 — 退去強制につながる取消事由と出国期間指定を分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "取消事由ごとに退去強制との関係が異なる"
citation_summary: "入管法第24条と ISA の在留資格取消案内は、在留資格取消の一部事由が退去強制事由に接続する一方、その他の事由では出国期間が指定される場合があると示している。取消を一律に即時退去強制として扱わない。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-064
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第22条の4 / 第24条"
  source_locator: "在留資格取消後の扱い / 退去強制事由"
  claim_type: procedure_boundary
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
    - deportation
  exclusion_scope:
    - "個別の退去強制手続"
    - "出国命令制度の適用判断"
    - "刑事罰や収容の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问在留资格取消后是否必然马上退去强制"
does_not_cover:
  - "具体案件属于第22条の4哪一号"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取消手続の対象となる外国人
direct_fact_fields:
  - residence_cancellation_to_deportation_ground_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: cancellation_to_deportation_path_review
    reason: "取消事由、逃亡疑い、出国期間指定、退去強制、出国命令の関係は個別確認が必要。"
evidence_points:
  - claim: "入管法第24条は、第22条の4第1項の一部事由による在留資格取消を退去強制事由として掲げている。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第24条第2号の2から第2号の4"
    display_label: "入管法：取消と退去強制事由"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ISA の案内は、取消事由により直ちに退去強制対象となる場合と、30日を上限に出国期間が指定される場合があると示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消後の扱い"
    display_label: "ISA：取消後の扱い"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 退去強制につながる取消事由と出国期間指定を分ける

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

入管法第24条と ISA の在留資格取消案内は、在留資格取消の一部事由が退去強制事由に接続する一方、その他の事由では出国期間が指定される場合があると示している。

## exceptions_or_transition

- 出国期間内に出国しない場合や、逃亡疑いがある場合は別途高リスク。
- 取消事由の号、退去強制、出国命令、刑事罰を一つにまとめない。

## common_user_phrases

- 在留資格取消 退去強制
- ビザ取消 すぐ強制送還
- 取消後 30日 出国
- 取消されたら 出国命令
- 签证取消 马上遣返
- 在留资格取消 后果

## must_say

- 取消事由によって退去強制との関係が異なる。
- 取消を一律に即時退去強制とは扱わない。

## must_not_say

- 在留資格取消なら全件すぐ退去強制。
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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-064 |
