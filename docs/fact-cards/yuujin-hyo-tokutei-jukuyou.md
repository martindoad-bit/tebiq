---
fact_id: yuujin-hyo-tokutei-jukuyou
title: 住民票 — マイナンバー記載省略可・他項目は記載要
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住民票記載"
citation_summary: "永住申請等で要求される住民票は家族全員（世帯）分、マイナンバー記載は省略可。在留資格・在留期間等の他項目は省略しない。発行日から3か月以内のもの。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "住民票 マイナンバー"
  - "永住 住民票"
does_not_cover:
  - "コンビニ交付詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 在留申請者
direct_fact_fields:
  - 範囲：家族全員（世帯）
  - マイナンバー記載：省略可
  - 在留資格・期間・国籍等：省略不可
  - 有効期限：発行から3か月以内
  - 取得方法：区役所窓口、コンビニ（マイナカード）、郵送
ai_inferred_fields:
  - コンビニ交付は1通200円程度
needs_review_flags:
  - kuyakusho_specific_fee
  - lectronic_jumin_hyo_via_mainapotal_status
  - oversea_jumin_hyo_retrieval
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "住民票"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請に要求される住民票は家族全員分、マイナンバー記載省略可、在留資格等他項目は省略不可、発行から3か月以内。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "住民票"
    display_label: "住民票記載"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住民票：マイナンバー省略可・他項目省略不可・3か月有効。

## must_say

- 家族全員分
- マイナンバー省略可
- 3か月以内発行

## injection_format

### injection_certain_block

```text
- 住民票：マイナンバー省略可・他項目省略不可・3か月有効。
- 家族全員分
- マイナンバー省略可
- 3か月以内発行
- 出典: ISA — 永住申請 https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
