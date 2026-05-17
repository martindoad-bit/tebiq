---
fact_id: zairyu-nintei-shomeisho-application-method
title: COE申請 — 在留資格認定証明書交付申請の提出方法
state: ai_verified   # LOOP3 2026-05-17: source repaired to ISA COE grant application page
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE申請方法"
citation_summary: "在留資格認定証明書交付申請（COE）は地方出入国在留管理官署で行う。郵送提出は不可、オンライン申請や電子メールでの電子COE受領が利用できる場合がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "COE 代理 誰"
  - "雇用主 COE 申請"
does_not_cover:
  - "申請取次資格の要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格認定証明書交付申請
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/isa/applications/procedures/10_00136.html
    label: ISA — 電子化された在留資格認定証明書Q&A
    accessed: "2026-05-17"
applies_to:
  - COE申請関連の代理人
direct_fact_fields:
  - 申請場所：地方出入国在留管理官署
  - 郵送での申請不可
  - オンライン申請可
  - 電子化されたCOEは電子メールで受領・海外転送可能
  - 標準処理期間：1か月〜3か月
ai_inferred_fields:
  - 申請者/代理人の範囲は在留資格や受入機関によって確認が必要
needs_review_flags:
  - registration_procedure_for_tori-tsugi
  - online_for_tori-tsugi
  - faciliating_factors_for_speed
related_links:
  - title: "ISA — 在留資格認定証明書交付申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "COE"
    locator: "申請先・オンライン申請"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格認定証明書交付申請は地方出入国在留管理官署で行い、郵送提出不可。オンライン申請や電子化されたCOEのメール受領が利用できる場合がある。"
    source_title: "ISA — 在留資格認定証明書交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請先・オンライン申請"
    display_label: "COE交付申請方法"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

COE交付申請：地方入管へ提出、郵送不可、オンライン/電子COEあり。

## must_say

- 地方入管へ申請
- 郵送提出不可
- オンライン申請・電子COEの利用可

## injection_format

### injection_certain_block

```text
- 在留資格認定証明書交付申請（COE）は、地方出入国在留管理官署に提出する手続。
- 郵送での申請はできない。オンライン申請や、電子化されたCOEをメールで受け取って海外に転送する方法が利用できる場合がある。
- 標準処理期間は1か月から3か月。個別案件の進み方や結果を保証するものではない。
- 出典: 出入国在留管理庁「在留資格認定証明書交付申請」 https://www.moj.go.jp/isa/applications/procedures/16-1.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | COE申請方法を公式ページに合わせて書き換えruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
