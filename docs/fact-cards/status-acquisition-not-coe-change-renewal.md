---
fact_id: status-acquisition-not-coe-change-renewal
title: 在留資格取得 — COE・変更・更新とは別の手続
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "在留資格取得はCOE・変更・更新とは別手続"
citation_summary: "在留資格取得許可申請は、出生・国籍離脱等で上陸手続なく在留する人の取得手続であり、COE、変更、更新とは入口が異なる。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-021
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第22条の2 / 第22条の3"
  source_locator: "在留資格取得許可申請ページ：手続概要; 手続種類インデックス"
  claim_type: disambiguation
  applicable_statuses:
    - "all"
  application_type:
    - status_acquisition
  exclusion_scope:
    - "COE"
    - "change"
    - "renewal"
  deep_water_candidate: false
applies_when:
  - "用户把日本出生小孩手续说成COE"
  - "用户问取得、变更、更新区别"
does_not_cover:
  - "具体在留资格选择"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-status-acquisition-16-10
    url: https://www.moj.go.jp/isa/applications/procedures/16-10.html
    title: 在留資格取得許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-procedure-index
    url: https://www.moj.go.jp/isa/applications/procedures/index.html
    title: 手続の種類から探す
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - 在留資格取得許可申請
direct_fact_fields:
  - status_acquisition_separate_from_coe_change_renewal
ai_inferred_fields:
  - procedure_disambiguation_from_isa_procedure_index
needs_review_flags: []
evidence_points:
  - claim: "ISA presents status acquisition as a procedure for people staying without landing procedure due to birth or nationality loss; it is distinct from the ordinary COE, change, and renewal procedure entries."
    source_title: "在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続の種類から探す"
    display_label: "在留資格取得：COE・変更・更新とは別入口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取得 — COE・変更・更新とは別の手続

## current_date_logic

Checked against current ISA procedure pages on 2026-05-12.

## current_effective_fact

在留資格取得許可申請は、出生・国籍離脱等で上陸手続なく在留することになった人のための手続であり、在留資格認定証明書、在留資格変更、在留期間更新とは入口が異なる。

## exceptions_or_transition

- 海外から呼び寄せる手続は COE 側へルーティングする。
- 既に在留資格を持って活動を変える場合は変更へルーティングする。

## common_user_phrases

- 新生儿 COE 还是在留資格取得
- 日本出生 认定证明书
- 取得 变更 更新 区别
- 出生后不是COE
- 在留資格取得 和 认定
- 小孩在日本出生 换签吗

## must_say

- 在留資格取得は、出生等で上陸手続なく在留する場合の手続。
- COE、変更、更新とは入口を分ける。

## must_not_say

- 日本出生的小孩办普通 COE。
- 在留資格取得就是更新。

## qa_cases

### QA-1

**user**: 日本出生的小孩要申请 COE 吗？

**must_have**:

- 日本国内出生は在留資格取得の入口
- 海外呼寄せ COE と分ける

**must_not_have**:

- 普通 COE 即可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-021 |
