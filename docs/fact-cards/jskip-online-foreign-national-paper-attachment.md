---
fact_id: jskip-online-foreign-national-paper-attachment
title: "J-Skipオンライン申請 — 本人利用時の紙申請添付"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "J-Skip: オンライン申請"
citation_summary: "ISA は、J-Skipを利用したオンライン申請に対応している一方、外国人本人が利用者区分の場合はシステム入力だけでは不足するため紙申請書の添付が必要だと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-020
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "J-Skip オンライン申請"
  source_locator: "特別高度人材制度を利用したオンライン申請について"
  claim_type: procedure_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "オンラインシステム操作支援"
    - "添付書式の個別記入"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip-online
    url: https://www.moj.go.jp/isa/applications/online/11_00017.html
    title: 特別高度人材制度・未来創造人材制度を利用したオンライン申請について（令和８年１月修正）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skipオンライン申請 — 本人利用時の紙申請添付を聞く相談"
direct_fact_fields:
  - jskip_online_foreign_national_paper_attachment
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_online_foreign_national_paper_attachment_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、J-Skipを利用したオンライン申請に対応している一方、外国人本人が利用者区分の場合はシステム入力だけでは不足するため紙申請書の添付が必要だと説明している。"
    source_title: "特別高度人材制度・未来創造人材制度を利用したオンライン申請について（令和８年１月修正）"
    source_url: "https://www.moj.go.jp/isa/applications/online/11_00017.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特別高度人材制度を利用したオンライン申請について"
    display_label: "J-Skip: オンライン申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skipオンライン申請 — 本人利用時の紙申請添付

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

J-Skipのオンライン申請は対応しているが、外国人本人として申請する場合は、所属機関等作成用の項目不足を補うため紙申請書添付を確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- J-Skip 在线申请 纸申请书
- J-Skip オンライン 外国人本人 紙申請書
- 特別高度人材 オンライン 所属機関等作成用
- J-Skip online paper application
- J-Skip 本人申请 系统输入不足
- J-Skip オンライン 令和8年1月

## must_say

- オンライン対応と材料完備を分けて確認する。

## must_not_say

- オンライン入力だけで必ず申請項目が足りる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-020 |
