---
fact_id: residence-cancellation-procedure-not-automatic
title: 在留資格取消 — 取消事由は自動失効ではなく手続を伴う
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "在留資格取消は自動失効ではなく手続を伴う"
citation_summary: "入管法第22条の4と ISA の取消案内は、在留資格取消に際して意見聴取などの手続があり、取消後の扱いも事由により退去強制又は出国期間指定などに分かれることを示している。取消事由への該当可能性は即時自動失効を意味しない。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-020
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条の4"
  source_locator: "取消の手続"
  claim_type: procedure_guardrail
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "取消事由の個別該当性"
    - "退去強制手続の詳細"
  deep_water_candidate: true
applies_when:
  - "用户问是否一触发取消事由就马上失效"
does_not_cover:
  - "退去强制、出国期间指定的具体个案"
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
  - 在留資格取消リスクを確認する外国人
direct_fact_fields:
  - residence_cancellation_procedure_not_automatic
ai_inferred_fields: []
needs_review_flags:
  - id: enforcement_path_requires_review
    reason: "退去強制又は出国期間指定の具体的扱いは個別確認が必要。"
evidence_points:
  - claim: "入管法第22条の4と ISA の取消案内は、在留資格取消に際して意見聴取などの手続があり、取消後の扱いも事由により退去強制又は出国期間指定などに分かれることを示している。取消事由への該当可能性は即時自動失効を意味しない。"
    source_title: "在留資格の取消し"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消の手続"
    display_label: "在留資格取消：意見聴取などの手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 取消事由は自動失効ではなく手続を伴う

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

在留資格取消には意見聴取などの手続があり、取消後の扱いも事由により退去強制又は出国期間指定などに分かれる。取消事由への該当可能性は即時自動失効を意味しない。

## exceptions_or_transition

- 退去強制や出国期間指定の具体的扱いは高リスクで個別確認が必要。

## common_user_phrases

- 在留資格取消 自動
- 签证取消 马上失效
- 在留資格取消 意見聴取
- 取消事由 即失効
- 更新不许可 和 取消 区别
- 永住不许可 现在签证 取消

## must_say

- 取消には手続がある。
- 取消事由への該当可能性と即時自動失効は別。
- 更新不許可や永住不許可とも分ける。

## must_not_say

- 取消事由に触れたらその場で自動失効。
- 永住不許可や更新不許可は在留資格取消と同じ。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-020 |
