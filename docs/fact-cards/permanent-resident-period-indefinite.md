---
fact_id: permanent-resident-period-indefinite
title: 永住者 — 在留期間「無期限」の位置づけ
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 5
citation_label: "永住者の在留期間"
citation_summary: "永住者は別表第二の身分又は地位に基づく在留資格であり、ISA 在留資格一覧表では在留期間が無期限とされる。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-061
  authority_layer: L1 Law + L4 ISA Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第二条の二第3項 / 別表第二 永住者"
  source_locator: "永住者の在留期間"
  claim_type: duration_locator
  applicable_statuses:
    - "永住者"
  application_type:
    - current-status
  exclusion_scope:
    - "永住者在留卡更新"
    - "永住取消、再入国、补救手续"
    - "永住申请成功率"
  deep_water_candidate: false
applies_when:
  - "用户询问永住者的在留期间是否有期限"
does_not_cover:
  - "在留卡有效期和更新"
  - "永住取消风险"
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
  - "永住者の在留期間"
direct_fact_fields:
  - permanent_resident_period_indefinite
ai_inferred_fields: []
needs_review_flags:
  - id: permanent_resident_card_validity_not_covered
    reason: "永住者在留カードの有効期間・更新は本カードでは扱わない。"
  - id: revocation_not_covered
    reason: "永住取消・再入国・退去強制等は本カードでは扱わない。"
evidence_points:
  - claim: "永住者の在留期間は ISA 在留資格一覧表で無期限とされる。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "永住者 row"
    display_label: "ISA 在留資格一覧表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者 — 在留期間「無期限」の位置づけ

## current_date_logic

```text
Checked against e-Gov and ISA status list on 2026-05-12.
This card is only about residence-period locator.
```

## current_effective_fact

永住者は別表第二の身分又は地位に基づく在留資格であり、ISA 在留資格一覧表では在留期間が「無期限」とされる。

## exceptions_or_transition

- 無期限は在留資格の在留期間の話であり、在留カードの有効期間や更新手続とは別。
- 永住資格の取消リスクや再入国手続は本カードで扱わない。

## common_user_phrases

- 永住是永久的吗
- 永住者签证几年
- 永住者在留期间
- 永住期限
- 无期限
- 無期限
- 永住卡还要更新吗

## must_say

- 永住者的在留期间框架是无期限。
- 无期限不等于没有在留卡手续或没有取消风险。

## must_not_say

- 不要说永住申请中就已经无期限。
- 不要说永住者在留卡不用更新。
- 不要说永住绝不会被取消。

## qa_cases

### QA-1

**user**: 永住者的在留期间是多久？

**must_have**:

- 无期限
- 永住者

**must_not_have**:

- 5年
- 3年

### QA-2

**user**: 永住者是不是在留卡也不用更新？

**must_have**:

- 在留资格无期限和在留卡有效期要区分

**must_not_have**:

- 在留卡不用更新

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 5; LS-P0C1-061 |
