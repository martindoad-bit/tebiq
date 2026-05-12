---
fact_id: residence-address-notification-new-landing-fourteen-day
title: 新規上陸後の住居地届出 — 住居地決定から14日以内
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
citation_label: "新規上陸後の中長期在留者は住居地を定めた日から14日以内"
citation_summary: "ISA は、新規上陸後の中長期在留者について、住居地を定めた日から14日以内に住居地の市区町村担当窓口へ届出るとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-097
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の7第1項"
  source_locator: "手続対象者・届出期間・届出先"
  claim_type: deadline_window
  applicable_statuses:
    - "new_landing_mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "在留資格変更等に伴う住居地届出"
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问刚入境后中长期在留者什么时候登记住址"
does_not_cover:
  - "在留資格変更等で新たに中長期在留者となった場合"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-new-landing-address-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00021.html
    title: 新規上陸後の住居地の届出（中長期在留者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 新規上陸後の中長期在留者
direct_fact_fields:
  - new_landing_address_notification_14_day_deadline
  - municipality_window
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA states that a mid- to long-term resident after new landing must notify within 14 days from the date they determine a residence, at the municipal office for that residence."
    source_title: "新規上陸後の住居地の届出（中長期在留者）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00021.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者・届出期間・届出先"
    display_label: "新規上陸後：住居地決定から14日以内・市区町村窓口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 新規上陸後の住居地届出 — 住居地決定から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

新規上陸後の中長期在留者は、住居地を定めた日から14日以内に、住居地の市区町村の担当窓口へ届出を行う。

## exceptions_or_transition

- 在留カード又は後日在留カードを交付する旨の記載を受けた旅券を提示する。
- 在留資格変更等により新たに中長期在留者となった場合は別入口。

## common_user_phrases

- 新規上陸後 住居地届出
- 入国後 住所登録 14日
- 在留カード 後日交付 住所登録
- 刚到日本 地址登记 14天
- 新入境 在留卡 地址登记
- 住居地を定めた日から14日以内 新規上陸

## must_say

- 新規上陸後の中長期在留者は住居地を定めた日から14日以内。
- 届出先は住居地の市区町村窓口。

## must_not_say

- 入国後の住所登録は在留資格変更後の手続きだけだと言う。
- 入管窓口だけへ案内する。

## qa_cases

### QA-1

**user**: 刚到日本拿到在留卡后，地址什么时候登记？

**must_have**:

- 新規上陸後
- 住居地を定めた日から14日以内
- 市区町村窓口

**must_not_have**:

- 次回更新時でよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-097 |
