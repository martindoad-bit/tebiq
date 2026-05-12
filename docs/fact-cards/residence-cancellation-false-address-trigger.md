---
fact_id: residence-cancellation-false-address-trigger
title: 在留資格取消 — 虚偽の住居地届出は取消事由
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
citation_label: "虚偽の住居地届出は取消入口"
citation_summary: "ISA の在留資格取消案内は、中長期在留者が虚偽の住居地を届け出た場合を取消事由として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-034
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第10号"
  source_locator: "取消事由(10)"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "mid_to_long_term_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "単なる届出遅延の評価"
    - "住所認定の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问虚假地址、借地址、实际不住是否会取消在留资格"
does_not_cover:
  - "特定住所是否构成虚假住居地"
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
  - 中長期在留者
direct_fact_fields:
  - residence_cancellation_false_address_trigger
ai_inferred_fields: []
needs_review_flags:
  - id: false_address_factual_review
    reason: "虚偽住居地に当たるかは具体的居住実態の確認が必要。"
evidence_points:
  - claim: "ISA の在留資格取消案内は、中長期在留者が虚偽の住居地を届け出た場合を取消事由として示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(10)"
    display_label: "在留資格取消：虚偽の住居地届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 虚偽の住居地届出は取消事由

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA の在留資格取消案内は、中長期在留者が虚偽の住居地を届け出た場合を取消事由として示している。

## exceptions_or_transition

- 届出遅延、住所変更忘れ、虚偽住所は分ける。
- 実際の居住実態評価は個別確認が必要。

## common_user_phrases

- 虚偽 住居地 届出
- 假地址 在留資格取消
- 借地址 在留カード
- 住んでない住所 届出
- 地址虚假 签证取消
- 虚偽住所 入管

## must_say

- 虚偽の住居地届出は取消事由として示されている。
- 住所変更遅れと虚偽住所は同じではない。

## must_not_say

- 住所関係は在留資格に関係ない。
- 届出が遅れたら必ず虚偽住所扱いになる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-034 |
