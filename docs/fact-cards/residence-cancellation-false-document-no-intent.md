---
fact_id: residence-cancellation-false-document-no-intent
title: 在留資格取消 — 不実記載文書提出は故意要件なしの取消入口
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
citation_label: "不実記載文書は高リスク取消入口"
citation_summary: "ISA の在留資格取消案内は、虚偽の書類を提出して上陸許可等を受けた場合について、偽りその他不正の手段によることや申請人の故意を要しないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-031
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第3号"
  source_locator: "取消事由(3)"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "単純な記載ミスの評価"
    - "取消処分の自動発生"
  deep_water_candidate: true
applies_when:
  - "用户问入管申请材料错误、虚假、不实是否影响当前在留资格"
does_not_cover:
  - "该材料错误是否属于不实记载文书"
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
  - 在留資格を持つ外国人
direct_fact_fields:
  - residence_cancellation_false_document_no_intent
ai_inferred_fields: []
needs_review_flags:
  - id: factual_error_vs_false_document_review
    reason: "単純な記載ミス、不正、虚偽文書の区別は個別確認が必要。"
evidence_points:
  - claim: "ISA は、虚偽の書類を提出して上陸許可等を受けた場合について、偽りその他不正の手段によることや申請人の故意を要しないと説明している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(3)"
    display_label: "在留資格取消：不実記載文書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 不実記載文書提出は故意要件なしの取消入口

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、虚偽の書類を提出して上陸許可等を受けた場合について、偽りその他不正の手段によることや申請人の故意を要しないと説明している。

## exceptions_or_transition

- 普通の誤記と取消事由の不実記載文書は同じではない。
- 具体的な事実評価は深水区として扱う。

## common_user_phrases

- 入管 材料 错了 取消
- 虚偽 書類 在留資格取消
- 假材料 签证取消
- 申請書 職歴 間違い
- 不実記載 文書
- 资料写错 会取消吗

## must_say

- 不実記載文書は高リスクの取消入口になり得る。
- 普通の誤記か虚偽文書かは個別確認が必要。

## must_not_say

- 本人に故意がなければ常に問題ない。
- 一つの記載ミスで必ず取消される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-031 |
