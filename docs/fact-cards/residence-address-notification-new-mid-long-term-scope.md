---
fact_id: residence-address-notification-new-mid-long-term-scope
title: 新たに中長期在留者となった場合の住居地届出
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "変更許可等で新たに中長期在留者となった場合の住居地届出"
citation_summary: "ISA は、在留資格変更許可等により新たに中長期在留者となった者を、住居地届出の対象としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-085
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の8第1項"
  source_locator: "手続対象者"
  claim_type: procedure_scope
  applicable_statuses:
    - "new_mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "通常の転居後住居地変更"
    - "所属機関届出"
  deep_water_candidate: false
applies_when:
  - "用户问变更许可后新拿到中长期在留者身份怎么登记住址"
does_not_cover:
  - "普通搬家后的住址变更"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-new-address-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html
    title: 在留資格変更等に伴う住居地の届出（中長期在留者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 新たに中長期在留者となった者
direct_fact_fields:
  - new_mid_long_term_resident_address_notification_scope
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA identifies people who newly become mid- to long-term residents through permission such as status change as the target of this residence notification."
    source_title: "在留資格変更等に伴う住居地の届出（中長期在留者）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "新たに中長期在留者となった場合の住居地届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 新たに中長期在留者となった場合の住居地届出

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格変更許可等により新たに中長期在留者となった者は、住居地届出の対象になる。

## exceptions_or_transition

- 既に中長期在留者で、単に引っ越した場合は住居地変更届出の軸で見る。
- 所属機関届出や在留資格変更申請とは別。

## common_user_phrases

- 在留資格変更後 住居地届出
- 新しく中長期在留者 住所登録
- 在留カード 住所 空欄 変更許可
- 变更许可后 地址登记
- 新拿到在留卡 地址登记
- 在留資格変更 住居地 14日

## must_say

- 新たに中長期在留者となった場合は住居地届出の対象。
- 通常の転居後住所変更とは別の入口だが、届出先は市区町村。

## must_not_say

- 在留資格変更許可だけで住所届出も完了すると言う。

## qa_cases

### QA-1

**user**: 在留資格変更が通って在留カードをもらいました。住所はどう登録しますか？

**must_have**:

- 新たに中長期在留者となった場合の住居地届出
- 市区町村で住所届出

**must_not_have**:

- 変更許可だけで住所届出不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-085 |
