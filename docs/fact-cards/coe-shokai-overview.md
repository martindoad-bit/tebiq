---
fact_id: coe-shokai-overview
title: 在留諸申請の進捗照会 — 電話で個別進捗は原則答えない
state: ai_verified   # LOOP3 2026-05-17: rewritten to ISA progress inquiry page
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE認定証明書"
citation_summary: "在留資格認定証明書交付申請や更新・変更等の個別進捗は、電話では原則答えられない。オンライン申請はシステム上で申請状態を確認できる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户海外亲属/雇员要来日工作或长期居住"
  - "COE是什么"
  - "认定证明书办下来后多久要来日"
does_not_cover:
  - "短期滞在ビザ（査証）"
  - "永住者の家族呼び寄せ"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/10_00210.html
    label: ISA — 在留諸申請の進捗状況について
    accessed: "2026-05-17"
applies_to:
  - 在留資格認定証明書交付申請等の申請者・代理人
direct_fact_fields:
  - 個別進捗は電話では原則回答不可
  - オンライン申請はシステム上で状態確認可能
  - ISAは在留審査処理期間の目安を公表
  - 追加資料通知が届いた場合は通知内容に従う
ai_inferred_fields:
  - 受入機関/代理人を通じて受付情報を確認するのが現実的
needs_review_flags:
  - electronic_coe_visa_submission_procedure
  - validity_extension_history
  - reapplication_after_expiry
related_links:
  - title: "ISA — 在留諸申請の進捗状況について"
    url: "https://www.moj.go.jp/isa/10_00210.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — COE"
    locator: "電話での進捗回答不可"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格認定証明書交付申請等の個別進捗は、電話では原則答えられない。オンライン申請はシステム上で状態確認できる。"
    source_title: "ISA — 在留諸申請の進捗状況について"
    source_url: "https://www.moj.go.jp/isa/10_00210.html"
    source_organization: "出入国在留管理庁"
    source_locator: "電話での進捗回答不可"
    display_label: "在留諸申請の進捗照会"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

在留諸申請の個別進捗は電話で原則回答不可。

## common_user_phrases

- COE 在留資格認定証明書
- COE 期限 3ヶ月
- COE 手数料

## must_say

- 電話で個別進捗は原則回答不可
- オンライン申請はシステム確認
- 追加資料通知を待つ/読む

## injection_format

### injection_certain_block

```text
- COE（在留資格認定証明書交付申請）や更新・変更などの個別進捗は、電話では原則として回答されない。
- オンライン申請を使った場合は、在留申請オンラインシステム上で申請状態を確認できる。
- 審査が長い場合でも、結果や許可見込みを電話で保証してもらうことはできない。追加資料通知が届いたら、その通知の期限と内容を優先して確認する。
- 出典: 出入国在留管理庁「在留諸申請の進捗状況について」 https://www.moj.go.jp/isa/10_00210.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | COE概要から進捗照会カードに書き換えruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
