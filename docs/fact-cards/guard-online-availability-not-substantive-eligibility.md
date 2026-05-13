---
fact_id: guard-online-availability-not-substantive-eligibility
title: "オンライン申請 — 申請経路と許可要件を分ける"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "オンライン申請: 要件緩和ではない"
citation_summary: "ISA のオンライン申請案内は申請経路や対象手続を案内するものであり、J-Skip、J-Find、高度専門職等の実体要件を緩和するものとして扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-015
  authority_layer: L4 ISA Online Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留申請オンライン"
  source_locator: "オンライン申請対象手続"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
    - "経営・管理"
    - "家族滞在"
  application_type:
    - online_application
  exclusion_scope:
    - "オンライン利用者登録"
    - "各在留資格の実体要件"
    - "審査結果・審査期間"
  deep_water_candidate: false
official_sources:
  - id: isa-online-general
    url: https://www.moj.go.jp/isa/applications/online/onlineprocedures.html
    title: 出入国在留管理庁オンライン申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-jskip-jfind-online
    url: https://www.moj.go.jp/isa/applications/online/11_00017.html
    title: 特別高度人材制度・未来創造人材制度を利用したオンライン申請について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "オンライン申請できることを許可要件の緩和と誤解している相談"
direct_fact_fields:
  - online_availability_not_substantive_eligibility
ai_inferred_fields: []
needs_review_flags:
  - id: online_channel_eligibility_review
    reason: "オンライン申請の可否と各在留資格の審査要件は別に確認する必要がある。"
evidence_points:
  - claim: "ISA の一般オンライン申請ページは、在留審査関係のオンライン申請として、認定、変更、更新、取得、再入国、資格外活動、就労資格証明書の手続を案内している。"
    source_title: "出入国在留管理庁オンライン申請"
    source_url: "https://www.moj.go.jp/isa/applications/online/onlineprocedures.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留審査関係"
    display_label: "オンライン申請: 対象手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ISA は J-Skip/J-Find のオンライン申請についても入力方法の注意を案内しており、制度の実体要件とは別に扱う必要がある。"
    source_title: "特別高度人材制度・未来創造人材制度を利用したオンライン申請について"
    source_url: "https://www.moj.go.jp/isa/applications/online/11_00017.html"
    source_organization: "出入国在留管理庁"
    source_locator: "入力方法"
    display_label: "オンライン申請: 入力方法の注意"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# オンライン申請 — 申請経路と許可要件を分ける

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

オンライン申請は申請経路や入力方法の問題として扱う。J-Skip、J-Find、高度専門職、その他在留資格の実体要件が緩くなるとは扱わない。

## exceptions_or_transition

- このカードは、オンライン申請の利用可否、利用者登録、審査期間、又は許可見込みを判断しない。

## common_user_phrases

- 在线申请 条件 放宽
- オンライン申請 許可要件
- online application easier visa
- J-Skip 在线 更容易
- J-Find online 条件
- 高度専門職 オンライン 審査

## must_say

- オンライン申請は申請経路として確認する。
- オンラインで出せることと許可要件の充足は分ける。

## must_not_say

- オンライン申請なら審査が緩くなる。
- オンラインで出せれば要件を満たしたことになる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-015 |
