---
fact_id: resident-card-non-address-change-evidence-documents
title: 在留カード記載事項変更 — 変更を証する資料
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "氏名・国籍等の変更は変更を証する資料が必要"
citation_summary: "ISA は、住居地以外の在留カード記載事項変更届出で、変更を生じたことを証する資料を必要書類として挙げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-084
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の10"
  source_locator: "届出書・必要書類等"
  claim_type: required_document
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡姓名、国籍等变更需要什么证明"
does_not_cover:
  - "外国文件翻译、公证是否足够的实务判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-non-address-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html
    title: 住居地以外の在留カード記載事項の変更届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_non_address_change_evidence_documents
ai_inferred_fields: []
needs_review_flags:
  - id: foreign_document_translation_practice_requires_review
    reason: "Foreign document translation and certification details may require practical review."
evidence_points:
  - claim: "ISA lists materials proving the change as required documents for non-address residence card item changes."
    source_title: "住居地以外の在留カード記載事項の変更届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出書・必要書類等"
    display_label: "必要書類：変更を証する資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード記載事項変更 — 変更を証する資料

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

住居地以外の在留カード記載事項変更届出では、変更を生じたことを証する資料が必要書類に含まれる。氏名変更、国籍・地域変更などで例示資料が異なる。

## exceptions_or_transition

- 先に旅券の訂正又は再交付を受けていないと即日交付されない場合がある。
- 変更理由を記載した理由書の提出を求められる場合がある。

## common_user_phrases

- 在留カード 氏名変更 必要書類
- 在留カード 国籍変更 必要書類
- 在留カード 記載事項変更 証明書
- 在留卡 姓名变更 需要什么材料
- 在留卡 国籍变更 证明材料
- 変更を証する資料 在留カード

## must_say

- 変更を証する資料が必要書類に含まれる。
- 変更内容ごとに資料が変わる。

## must_not_say

- 申出書だけで必ず完了すると言う。
- 外国発行書類の扱いを断定する。

## qa_cases

### QA-1

**user**: 在留カードの国籍変更は何を持っていきますか？

**must_have**:

- 変更を証する資料
- 変更内容ごとに資料が異なる

**must_not_have**:

- 何も証明はいらない

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-084 |
