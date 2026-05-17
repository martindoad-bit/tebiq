---
fact_id: koushin-shinsei-fee-6000
title: 在留期間更新許可申請 — 手数料6000円・処理2週間〜1か月
state: ai_verified   # Knowledge Runtime Loop 1 promote: DOMAIN can_promote_now + FACT source verified/fixed.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留更新申請 手数料"
citation_summary: "在留期間更新許可申請の手数料は6000円（オンライン5500円）、処理期間2週間〜1か月。原則3か月前から申請可能（在留6か月以上保有時）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问更新签证要多少钱"
  - "用户问最早什么时候开始办更新"
does_not_cover:
  - "永住者カード更新（無料・別カード）"
  - "在留期間更新の必要書類別カード"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    label: ISA — 在留期間更新
    accessed: "2026-05-17"
applies_to:
  - 在留期間更新申請者
direct_fact_fields:
  - 手数料：6000円（オンライン5500円）
  - 旧手数料（〜2025-03-31）：4000円
  - 処理期間：2週間〜1か月
  - 申請時期：在留期間満了前（6か月以上の在留期間ある場合は概ね3か月前から）
  - 法的根拠：入管法第21条
ai_inferred_fields:
  - 処理が長引く場合は特例期間制度で2か月猶予あり
needs_review_flags:
  - online_application_fee_payment_method
  - renewal_required_documents_by_status
related_links:
  - title: "ISA — 在留期間更新"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "在留期間更新"
    locator: "6000円・2週間"
    relation: "official_reference"
evidence_points:
  - claim: "在留期間更新許可申請の手数料は6000円（オンライン5500円・旧4000円）、処理期間2週間〜1か月、6か月以上保有時は概ね3か月前から申請可。"
    source_title: "ISA — 在留期間更新"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "6000円・2週間〜1か月・3か月前"
    display_label: "更新手数料・処理期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

更新手数料6000円・処理2週間-1か月・最早3か月前から申請可。

## common_user_phrases

- 在留更新 手数料
- ビザ更新 何ヶ月前
- 在留更新 処理期間

## must_say

- 6000円（オンライン5500円）
- 2週間〜1か月
- 最早3か月前から

## injection_format

### injection_certain_block

```text
在留期間更新許可申請の手数料は、2025年4月以降、通常6,000円（オンライン申請は5,500円）です。標準処理期間はおおむね2週間〜1か月で、在留期間満了前に申請する必要があります。更新中・特例期間・不許可後の扱いは個別リスクが高いため、期限が近い場合は入管または行政書士に確認します。
```

### injection_needs_review_addendum

```text
このカードは一般的な公式事実のみを注入します。個別の許可可否、例外、期限超過、違反後対応は断定せず、入管・行政書士等への確認に回してください。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Knowledge Runtime Loop 1 | DOMAIN/FACT確認済み範囲で runtime 注入可能化。 | ai_extracted | ai_verified | promote |
