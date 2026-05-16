---
fact_id: mynumber-card-application
title: マイナンバーカード — 申請から1〜2か月で交付・無料
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "マイナンバーカード"
citation_summary: "中長期在留者はマイナンバーカードを無料で申請可。申請から1〜2か月で交付、市区町村窓口で受取。健康保険証機能・電子証明書搭載。"
source_display_names:
  - "デジタル庁"
applies_when:
  - "マイナンバーカード 外国人"
  - "マイナカード 申請"
does_not_cover:
  - "マイナ保険証手続詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.digital.go.jp/en/policies/mynumber_faq_02
    label: デジタル庁 — マイナンバー
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 申請：オンライン/郵送/写真機/窓口
  - 交付：申請から1〜2か月
  - 手数料：無料
  - 機能：身分証、健康保険証（マイナ保険証）、e-Tax、コンビニ証明書発行
  - 有効期間：成人10年（顔写真は5年）、未成年5年
ai_inferred_fields:
  - 在留期間に合わせて有効期間が短縮される
  - 在留更新時にマイナカードも更新必要
needs_review_flags:
  - card_validity_during_zairyu_renewal
  - tetsuzuki_for_lost_card_2026
  - renewal_fee_specifics
related_links:
  - title: "デジタル庁 — マイナンバー"
    url: "https://www.digital.go.jp/en/policies/mynumber_faq_02"
    organization: "デジタル庁"
    display_label: "マイナンバー"
    locator: "外国人"
    relation: "official_reference"
evidence_points:
  - claim: "中長期在留者はマイナンバーカードを無料で申請可。申請から1〜2か月で交付。健康保険証・e-Tax機能あり。"
    source_title: "デジタル庁 — マイナンバー"
    source_url: "https://www.digital.go.jp/en/policies/mynumber_faq_02"
    source_organization: "デジタル庁"
    source_locator: "申請"
    display_label: "マイナカード申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

マイナカード：無料・1-2か月交付・健康保険証等機能。

## must_say

- 無料
- 1-2か月で交付
- 健康保険証機能あり

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
