---
fact_id: guard-online-jskip-jfind-input-caveat-specific
title: "J-Skip/J-Findオンライン — 専用入力注意を一般化しない"
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
citation_label: "J-Skip/J-Findオンライン: 専用入力注意"
citation_summary: "ISA は特別高度人材制度・未来創造人材制度を利用したオンライン申請について、制度専用の入力方法や紙申請書添付の注意を案内している。すべてのオンライン申請へ一般化しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-014
  authority_layer: L4 ISA Online Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留申請オンライン / J-Skip・J-Find入力方法"
  source_locator: "特別高度人材制度・未来創造人材制度オンライン申請"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - online_application
  exclusion_scope:
    - "一般オンライン申請の入力方法"
    - "オンライン利用資格"
    - "申請可否や審査結果"
  deep_water_candidate: false
official_sources:
  - id: isa-jskip-jfind-online
    url: https://www.moj.go.jp/isa/applications/online/11_00017.html
    title: 特別高度人材制度・未来創造人材制度を利用したオンライン申請について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-online-general
    url: https://www.moj.go.jp/isa/applications/online/onlineprocedures.html
    title: 出入国在留管理庁オンライン申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "J-Skip/J-Find専用のオンライン入力注意を一般オンライン手続に広げている相談"
direct_fact_fields:
  - online_jskip_jfind_input_caveat_specific
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_jfind_online_input_review
    reason: "利用者区分と制度によりオンライン入力項目や添付書類が変わるため。"
evidence_points:
  - claim: "ISA は、特別高度人材制度・未来創造人材制度を利用したオンライン申請について、これまでとは入力方法が異なるため専用の入力方法を確認するよう案内している。"
    source_title: "特別高度人材制度・未来創造人材制度を利用したオンライン申請について"
    source_url: "https://www.moj.go.jp/isa/applications/online/11_00017.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度専用の入力注意"
    display_label: "J-Skip/J-Findオンライン: 入力注意"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ISA の一般オンライン申請ページは、在留審査関係のオンライン申請や電子届出システムを案内している。"
    source_title: "出入国在留管理庁オンライン申請"
    source_url: "https://www.moj.go.jp/isa/applications/online/onlineprocedures.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留審査関係・届出関係"
    display_label: "オンライン申請: 一般案内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# J-Skip/J-Findオンライン — 専用入力注意を一般化しない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

J-Skip/J-Find のオンライン入力注意は、特別高度人材制度・未来創造人材制度を利用する申請の専用注意として扱う。すべてのオンライン申請にそのまま広げない。

## exceptions_or_transition

- このカードは、利用者区分、ログイン方法、オンライン利用可否、又は紙申請書添付の個別要否を判断しない。

## common_user_phrases

- J-Skip 在线申请 输入方法
- J-Find 在线申请 纸申请书
- 特別高度人材 オンライン 入力項目
- 未来創造人材 オンライン 入力方法
- J-Skip online paper attachment
- J-Find online 所属機関等作成用

## must_say

- J-Skip/J-Findのオンライン入力注意は制度専用として確認する。
- 一般のオンライン申請にそのまま広げない。

## must_not_say

- J-Skip/J-Findの紙申請書添付注意はすべてのオンライン申請に必ず必要。
- 一般オンライン申請はすべて同じ入力方法でよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-014 |
