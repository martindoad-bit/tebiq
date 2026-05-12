---
fact_id: gijinkoku-requires-contract-with-japan-organization
title: 技人国 — 本邦機関との契約アンカー
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "技人国の契約アンカー"
citation_summary: "技術・人文知識・国際業務は、本邦の公私の機関との契約に基づく活動として定義される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-047
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 技術・人文知識・国際業務"
  source_locator: "技術・人文知識・国際業務の項"
  claim_type: contract_anchor
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
  exclusion_scope:
    - "合同形式、派遣、委托、自雇可否"
    - "有合同即符合技人国的结论"
  deep_water_candidate: true
applies_when:
  - "用户询问技人国是否需要雇佣/委托/派遣合同"
does_not_cover:
  - "自由职业、自雇、派遣个案可否"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "技人国の契約アンカー"
direct_fact_fields:
  - gijinkoku_contract_with_japan_organization
ai_inferred_fields: []
needs_review_flags:
  - id: contract_type
    reason: "雇用、委任、派遣、自由接单等具体合同形态需进一步确认。"
evidence_points:
  - claim: "技人国は本邦の公私の機関との契約に基づく活動として定義される。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技術・人文知識・国際業務"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 本邦機関との契約アンカー

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This card is a contract anchor and not a job-fit conclusion.
```

## current_effective_fact

技人国の法文入口には、本邦の公私の機関との契約に基づく活動という契約アンカーがある。

## exceptions_or_transition

- 契約があるだけで技人国に該当するわけではない。
- 委托、自雇、派遣、自由接单等需要结合具体业务和合同结构。

## common_user_phrases

- 技人国必须有雇佣合同吗
- 委托合同能做人文签吗
- 技人国
- 人文签
- 雇佣合同
- 委托合同
- 派遣
- 日本公司契约

## must_say

- 技人国需要围绕日本机构契约和实际业务内容判断。
- 合同是入口，不是充分条件。

## must_not_say

- 不要说有合同就一定可以。
- 不要说完全自己接单就当然符合技人国。

## qa_cases

### QA-1

**user**: 有日本公司合同就一定能办技人国吗？

**must_have**:

- 契约只是入口
- 还要看业务范围

**must_not_have**:

- 一定可以

### QA-2

**user**: 技人国可以完全自己接单吗？

**must_have**:

- 日本机构契约需确认

**must_not_have**:

- 自由接单即可

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-047 |
