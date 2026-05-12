---
fact_id: residence-address-notification-fourteen-day-municipality
title: 新たな中長期在留者の住居地届出 — 住居地決定から14日以内
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
citation_label: "新たな中長期在留者は住居地を定めた日から14日以内"
citation_summary: "ISA は、在留資格変更等で新たに中長期在留者となった者の住居地届出期間を、住居地を定めた日から14日以内としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-086
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の8第1項"
  source_locator: "届出期間・届出先"
  claim_type: deadline_window
  applicable_statuses:
    - "new_mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问新成为中长期在留者后多久内登记住址"
does_not_cover:
  - "住居地未定、短期暂住是否构成住居地的事实判断"
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
  - new_mid_long_term_resident_address_14_day_deadline
  - municipality_window
ai_inferred_fields: []
needs_review_flags:
  - id: residence_fact_pattern_requires_review
    reason: "Whether a temporary stay is a residence can depend on facts."
evidence_points:
  - claim: "ISA states that this residence notification is due within 14 days from the date the person determines a residence, and the destination is the municipal office for that residence."
    source_title: "在留資格変更等に伴う住居地の届出（中長期在留者）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間・届出先"
    display_label: "住居地を定めた日から14日以内・市区町村窓口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 新たな中長期在留者の住居地届出 — 住居地決定から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格変更等で新たに中長期在留者となった場合、住居地を定めた日から14日以内に、住居地の市区町村の担当窓口へ届出を行う。

## exceptions_or_transition

- 住居地未定、短期滞在先、実際の生活拠点の判断は事実確認が必要。

## common_user_phrases

- 住居地を定めた日から14日以内
- 新しく中長期在留者 14日以内
- 在留資格変更後 住所登録 14日
- 在留カード 住所空欄 14日
- 新拿到在留卡 14天内 地址登记
- 住居地届出 市区町村 14日

## must_say

- 住居地を定めた日から14日以内。
- 届出先は住居地の市区町村窓口。

## must_not_say

- 住所登録はいつでもよい。
- 入管窓口だけに案内する。

## qa_cases

### QA-1

**user**: 変更許可後、住所はいつまでに登録しますか？

**must_have**:

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-086 |
