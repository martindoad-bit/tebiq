---
fact_id: residence-cancellation-address-notification-risk
title: 在留資格取消 — 住居地届出をしない場合の90日入口
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "住居地届出をしない場合の取消入口"
citation_summary: "入管法第22条の4と ISA の取消案内は、新たに中長期在留者となった者が90日以内に住居地を届け出ない場合、住居地を退去後90日以内に新住居地を届け出ない場合、虚偽の住居地を届け出た場合などを取消事由として示している。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-019
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条の4"
  source_locator: "住居地届出に関する取消事由"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - cancellation
    - address_notification
  exclusion_scope:
    - "14日届出義務の単純遅延"
    - "正当な理由がある場合"
  deep_water_candidate: true
applies_when:
  - "用户问搬家没报、住居地没报是否会取消"
does_not_cover:
  - "单纯14天逾期后果"
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
    title: 在留資格の取消し
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - residence_cancellation_address_notification_risk
ai_inferred_fields: []
needs_review_flags:
  - id: late_address_filing_requires_review
    reason: "14日届出義務の遅延と90日取消入口を混同しない。"
evidence_points:
  - claim: "入管法第22条の4と ISA の取消案内は、新たに中長期在留者となった者が90日以内に住居地を届け出ない場合、住居地を退去後90日以内に新住居地を届け出ない場合、虚偽の住居地を届け出た場合などを取消事由として示している。"
    source_title: "在留資格の取消し"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由"
    display_label: "在留資格取消：住居地届出90日入口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 住居地届出をしない場合の90日入口

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

新たに中長期在留者となった者が90日以内に住居地を届け出ない場合、住居地を退去後90日以内に新住居地を届け出ない場合、虚偽の住居地を届け出た場合などは、在留資格取消の事由として示されている。

## exceptions_or_transition

- 14日届出義務の遅延と、90日取消入口を混同しない。
- 正当な理由の有無は個別確認する。

## common_user_phrases

- 住所変更 90日 在留資格取消
- 住居地 届出 90日 取消
- 搬家 没报 会取消签证吗
- 虚偽 住居地 在留資格取消
- 在留カード 住所 未届出 取消
- 住所変更 遅れ 取消

## must_say

- 90日以内に住居地を届け出ない場合などの取消入口がある。
- 14日届出義務の遅延と90日取消入口を分ける。

## must_not_say

- 住所変更14日を過ぎたら必ず即取消。
- 住所を届けなくても在留資格には関係ない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-019 |
