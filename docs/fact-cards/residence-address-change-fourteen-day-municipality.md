---
fact_id: residence-address-change-fourteen-day-municipality
title: 住居地変更届出 — 新住居地へ移転した日から14日以内
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
citation_label: "搬家后的住居地変更届出は14日以内・市区町村"
citation_summary: "ISA は、中長期在留者が住居地を変更した場合、新住居地に移転した日から14日以内に住居地の市区町村担当窓口へ届出るとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-087
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の9第1項"
  source_locator: "届出期間・届出先"
  claim_type: deadline_window
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "所属機関届出"
    - "在留カード住居地以外記載事項変更"
  deep_water_candidate: false
applies_when:
  - "用户问搬家后在留卡住址和区役所/市役所手续"
does_not_cover:
  - "公司地址、学校地址、银行地址变更"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-address-change-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html
    title: 住居地の変更届出（中長期在留者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - address_change_14_day_deadline
  - municipality_window
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA states that mid- to long-term residents who change residence must notify within 14 days after moving to the new residence, at the municipal office for that residence."
    source_title: "住居地の変更届出（中長期在留者）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間・届出先"
    display_label: "住居地変更：移転日から14日以内・市区町村窓口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 住居地変更届出 — 新住居地へ移転した日から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

中長期在留者が住居地を変更した場合、新住居地に移転した日から14日以内に、住居地の市区町村の担当窓口へ届出を行う。

## exceptions_or_transition

- 会社や学校の住所変更ではなく、本人の住居地変更が対象。
- 所属機関届出や在留資格更新とは別手続き。

## common_user_phrases

- 搬家后在留卡地址
- 搬家后区役所和入管
- 在留カード 住所変更 14日
- 住居地変更届出 市区町村
- 新住居地に移転した日から14日以内
- 地址变更 在留卡 14天
- 搬家 在留カード 住所 市役所

## must_say

- 新住居地へ移転した日から14日以内。
- 届出先は住居地の市区町村窓口。

## must_not_say

- 本人の搬家だけで所属機関届出が必要と決めつける。
- 住所変更は地方入管に必ず行くと案内する。

## qa_cases

### QA-1

**user**: 搬家后在留卡地址要怎么改？

**must_have**:

- 新住居地へ移転した日から14日以内
- 市区町村窓口

**must_not_have**:

- 必ず地方入管へ住所変更

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-087 |
