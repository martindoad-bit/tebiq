---
fact_id: eijuu-application-fee-10000
title: 永住許可申請 — 手数料10000円（許可時支払）・処理4〜6か月
state: ai_verified   # Knowledge Runtime Loop 1 promote: DOMAIN can_promote_now + FACT source verified/fixed.
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住手数料1万円"
citation_summary: "永住許可申請の手数料は2025年4月以降10000円（収入印紙、許可時支払）。旧手数料は8000円。処理期間は4〜6か月。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請 費用"
  - "永住 何ヶ月かかる"
does_not_cover:
  - "更新・変更の手数料（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住許可申請
    accessed: "2026-05-17"
applies_to:
  - 永住許可申請者
direct_fact_fields:
  - 手数料：10000円（収入印紙・許可時支払）
  - 旧手数料（〜2025-03-31）：8000円
  - 処理期間：4〜6か月
  - 不許可時：支払不要
ai_inferred_fields:
  - 書類不足は審査大幅遅延または不利益処分
needs_review_flags:
  - online_application_fee_for_eijuu
  - waiver_for_low_income_applicants
related_links:
  - title: "ISA — 永住申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住申請"
    locator: "10000円・4〜6か月"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請の手数料は10000円（許可時支払）、処理期間4〜6か月。"
    source_title: "ISA — 永住申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "10000円・4〜6か月"
    display_label: "永住手数料・期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住申請手数料1万円・処理4-6か月。

## common_user_phrases

- 永住 費用
- 永住 何ヶ月
- 永住 1万円

## must_say

- 10000円（許可時支払）
- 4〜6か月
- 不許可なら支払不要

## injection_format

### injection_certain_block

```text
永住許可申請の手数料は、許可時に10,000円です。標準処理期間はおおむね4〜6か月とされています。手数料や書類を準備できることは永住許可を保証するものではなく、在留歴、公的義務、生活基盤などの審査は別に行われます。
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
