---
fact_id: j-skip-online-points-screen-caveat
title: "J-Skip — オンライン申請でポイント画面が出ても点数計算制度ではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "J-Skip: オンライン入力"
citation_summary: "ISA は、J-Skip ではポイント計算は不要だが、オンライン申請では高度専門職ポイント計算表画面で入力を求められる項目があると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-014
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "J-Skip オンライン申請"
  source_locator: "オンライン手続案内"
  claim_type: procedure_boundary
  applicable_statuses:
    - "高度専門職"
  application_type:
    - online_application
  exclusion_scope:
    - "オンライン入力方法の個別案内"
    - "J-Skip 該当性判断"
    - "ポイント計算の代替判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-j-skip-online
    url: https://www.moj.go.jp/isa/applications/online/11_00017.html
    title: 特別高度人材制度・未来創造人材制度を利用したオンライン申請について（令和8年1月修正）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip オンライン申請でポイント計算画面が出る相談"
direct_fact_fields:
  - j_skip_online_points_screen_caveat
ai_inferred_fields: []
needs_review_flags:
  - id: online_input_caveat_review
    reason: "オンライン画面の入力方法は最新 PDF と申請種別ごとに確認する必要がある。"
evidence_points:
  - claim: "ISA は、J-Skip ではポイント計算は不要だが、オンライン申請では高度専門職ポイント計算表画面で入力を求められる項目があると説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "オンライン手続案内"
    display_label: "J-Skip: オンライン入力"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — オンライン申請でポイント画面が出ても点数計算制度ではない

## current_date_logic

Checked against ISA J-Skip and online application pages on 2026-05-12.

## current_effective_fact

ISA は、J-Skip ではポイント計算は不要だが、オンライン申請では高度専門職ポイント計算表画面で入力を求められる項目があると説明している。

## exceptions_or_transition

- このカードは、オンライン画面の具体的入力方法や J-Skip 該当性を判断しない。

## common_user_phrases

- J-Skip オンライン ポイント計算表
- J-Skip ポイント画面
- 特別高度人材 オンライン申請 入力
- J-Skip 点数 計算 不要
- 高度専門職ポイント計算表 J-Skip
- J-Skip オンライン申請

## must_say

- J-Skip はポイント計算不要だが、オンライン画面ではポイント計算表画面の入力項目が出る場合がある。
- 画面入力と制度上の点数計算を混同しない。

## must_not_say

- オンラインでポイント画面が出たので J-Skip も70点計算が必要。
- J-Skip はオンライン入力をしなくてよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-014 |
