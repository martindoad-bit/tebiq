---
fact_id: online-zairyu-card-uketori
title: オンライン申請の在留カード — 郵送受取 or 窓口受取
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "オンライン在留カード受取"
citation_summary: "オンライン在留申請の許可後、新しい在留カードは郵送受取または管轄地方入管窓口での受取が選択可能。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "オンライン申請 カード 受取"
does_not_cover:
  - "オンライン申請の利用者登録手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - オンライン申請の在留資格者
direct_fact_fields:
  - 受取方法①：郵送（自宅・本人限定受取）
  - 受取方法②：管轄地方入管窓口
  - 郵送費別途
  - 旧在留カードは返納（窓口持参 or 郵送同封）
ai_inferred_fields:
  - 郵送受取は2週間程度かかる
needs_review_flags:
  - kishu-irai-uketori_specific_method
  - kyu-card-henno_period_specifics
  - oversea_uketori_possibility
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "オンライン"
    relation: "official_reference"
evidence_points:
  - claim: "オンライン在留申請の許可後、新カードは郵送（本人限定受取）または管轄地方入管窓口で受取可能。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "受取"
    display_label: "オンライン受取方法"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

オンライン申請：郵送 or 窓口受取。

## must_say

- 郵送 or 窓口
- 本人限定受取
- 旧カード返納

## injection_format

### injection_certain_block

```text
- オンライン在留申請の許可後、新しい在留カードは郵送受取または地方出入国在留管理官署での窓口受取を選べる場合がある。
- 旧在留カードの返納方法は手続案内に従って確認する。
- 出典: ISA — 在留資格変更許可申請 https://www.moj.go.jp/isa/applications/procedures/16-1.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
