---
fact_id: koyo-hoken-kihon-teate-12months
title: 雇用保険基本手当 — 離職前2年に被保険者12か月で受給資格
state: ai_verified   # Knowledge Runtime Loop 1 promote: DOMAIN can_promote_now + FACT source verified/fixed.
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "失業給付 受給要件"
citation_summary: "基本手当の受給資格は離職前2年間に被保険者期間通算12か月以上（特定受給資格者は1年間に6か月）。受給期間は離職翌日から1年（病気等で最大3年延長可）。給付日数90〜360日。"
source_display_names:
  - "ハローワーク"
applies_when:
  - "失業手当 もらえる"
  - "退職後 ハローワーク"
does_not_cover:
  - "再就職手当・育児休業給付（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html
    label: ハローワーク — 基本手当
    accessed: "2026-05-17"
applies_to:
  - 雇用保険被保険者で離職した者
direct_fact_fields:
  - 受給要件：離職前2年間に被保険者期間12か月以上（特定受給は1年間6か月）
  - 受給期間：離職翌日から1年（病気/妊娠/育児等で最大3年延長）
  - 給付日数：90〜360日
  - 基本手当日額：離職前6か月賃金の50〜80%（60-64歳は45-80%）
  - 自己都合は給付制限あり（実務）
ai_inferred_fields:
  - 自己都合は2025年4月以降1か月の給付制限（実務）
needs_review_flags:
  - jiko_tsugou_seigen_period_2026
  - tokutei_jukyu_definition
  - foreign_resident_specific_handling
related_links:
  - title: "ハローワーク — 基本手当"
    url: "https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html"
    organization: "厚生労働省"
    display_label: "基本手当"
    locator: "12か月・1年"
    relation: "official_reference"
evidence_points:
  - claim: "基本手当の受給資格は離職前2年に被保険者期間12か月以上、受給期間1年（延長最大3年）、給付日数90-360日。"
    source_title: "ハローワーク — 基本手当"
    source_url: "https://www.hellowork.mhlw.go.jp/insurance/insurance_basicbenefit.html"
    source_organization: "厚生労働省"
    source_locator: "12か月・1年・90〜360日"
    display_label: "基本手当要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

基本手当：12か月+1年受給期間+90-360日。

## must_say

- 12か月（離職前2年内）
- 1年以内に申請
- 90〜360日給付

## injection_format

### injection_certain_block

```text
雇用保険の基本手当は、原則として離職日前2年間に被保険者期間が12か月以上あることが受給資格の基準になります。受給期間や給付日数は離職理由、年齢、被保険者期間などで変わります。具体的な受給可否や金額はハローワークで確認します。
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
