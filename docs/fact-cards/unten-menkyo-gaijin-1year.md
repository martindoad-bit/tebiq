---
fact_id: unten-menkyo-gaijin-1year
title: 運転免許 — 国際運転免許証は1年有効・上陸後1年経過で日本免許要
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "運転免許 外国人 1年"
citation_summary: "ジュネーブ条約締約国発行の国際運転免許証は日本上陸後1年間有効。1年経過後は日本免許の取得（外免切替）が必要。"
source_display_names:
  - "警察庁"
applies_when:
  - "外国人 運転 免許"
  - "国際免許 1年"
does_not_cover:
  - "外免切替の試験詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.npa.go.jp/policies/application/license_renewal/index.html
    label: 警察庁 — 運転免許
    accessed: "2026-05-17"
applies_to:
  - 外国免許保有の外国人居住者
direct_fact_fields:
  - 国際免許有効：上陸日から1年
  - ジュネーブ条約締約国のみ
  - 1年経過後は外免切替必要
  - 外免切替：適性・知識・技能試験（一部国家免除）
ai_inferred_fields:
  - 中国・ベトナム等非締約国は国際免許不可
needs_review_flags:
  - jisshi_exam_exemption_country_list
  - re_entry_resets_1year_or_not
  - chinese_license_specific_procedure
related_links:
  - title: "警察庁 — 運転免許"
    url: "https://www.npa.go.jp/policies/application/license_renewal/index.html"
    organization: "警察庁"
    display_label: "運転免許"
    locator: "1年"
    relation: "official_reference"
evidence_points:
  - claim: "国際運転免許証は上陸後1年有効。1年経過後は外免切替で日本免許取得が必要。"
    source_title: "警察庁 — 運転免許"
    source_url: "https://www.npa.go.jp/policies/application/license_renewal/index.html"
    source_organization: "警察庁"
    source_locator: "1年"
    display_label: "国際免許1年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

国際免許は1年・外免切替必要。

## must_say

- 1年有効
- 外免切替必要
- 中国は非締約国

## injection_format

### injection_certain_block

```text
- 外国の運転免許証や国際運転免許証で日本国内を運転できるかは、発給国・条約・上陸日からの期間などで確認する。
- 国際運転免許証の扱いや外免切替は、住所地の運転免許センター等で確認する。
- 出典: 警察庁 — 運転免許 https://www.npa.go.jp/policies/application/license_renewal/index.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
