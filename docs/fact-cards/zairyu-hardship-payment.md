---
fact_id: zairyu-hardship-payment
title: 在留関連手数料 — 現金不可・収入印紙のみ
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "入管手数料収入印紙"
citation_summary: "在留資格変更・更新・永住等の手数料は現金不可、許可時に収入印紙で納付。オンライン申請はクレジットカード・ペイジー・電子マネー等で電子納付。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "入管 手数料 払い方"
  - "収入印紙 どこで"
does_not_cover:
  - "コンビニ収入印紙購入詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 在留申請者
direct_fact_fields:
  - 窓口申請：収入印紙のみ（現金不可）
  - 入管窓口で収入印紙販売（一部）
  - 郵便局・コンビニ（一部）でも購入可
  - オンライン申請：クレジット・ペイジー・電子マネー
  - 許可時に納付（不許可時は不要）
ai_inferred_fields:
  - 入管内で買えないことも多い
needs_review_flags:
  - convenience_store_specific_buy_method
  - online_payment_method_2026
  - permission_to_payment_timeline
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "収入印紙"
    relation: "official_reference"
evidence_points:
  - claim: "在留申請の手数料は窓口は収入印紙のみ（現金不可）、オンラインはクレカ・ペイジー等で電子納付。許可時納付。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "収入印紙"
    display_label: "手数料収入印紙"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

入管手数料：窓口は収入印紙のみ・オンラインは電子納付。

## must_say

- 収入印紙のみ（窓口）
- 許可時納付
- オンラインは電子納付

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
