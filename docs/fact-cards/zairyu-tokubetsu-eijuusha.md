---
fact_id: zairyu-tokubetsu-eijuusha
title: 特別永住者 — 在日韓国・朝鮮・台湾系の特例制度
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特別永住者"
citation_summary: "特別永住者は終戦前から日本に居住する朝鮮半島・台湾出身者とその子孫向けの特例資格。在留カードではなく「特別永住者証明書」（7年更新）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特別永住者 違い"
  - "在日 韓国 朝鮮"
does_not_cover:
  - "通常の永住者（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/tetuduki_tokubetu_shomeisho_00001.html
    label: ISA — 特別永住者
    accessed: "2026-05-17"
applies_to:
  - 戦前からの在日韓国・朝鮮・台湾系
direct_fact_fields:
  - 対象：戦前から日本居住の朝鮮半島・台湾系とその子孫
  - 証明書：特別永住者証明書（在留カードではない）
  - 有効期間：7年（更新は誕生月の前後3か月）
  - 再入国：最大6年（みなし2年）
  - 通常永住より権利範囲広い
ai_inferred_fields:
  - 帰化は通常永住者と比較して簡素化なし
needs_review_flags:
  - re_entry_2_year_official
  - children_inheriting_status
  - update_period_specific_method
related_links:
  - title: "ISA — 特別永住者"
    url: "https://www.moj.go.jp/isa/applications/procedures/tetuduki_tokubetu_shomeisho_00001.html"
    organization: "出入国在留管理庁"
    display_label: "特別永住者"
    locator: "特例"
    relation: "official_reference"
evidence_points:
  - claim: "特別永住者は戦前から在日の朝鮮半島・台湾系とその子孫向けの特例。特別永住者証明書（7年更新）、再入国最大6年。"
    source_title: "ISA — 特別永住者"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tetuduki_tokubetu_shomeisho_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特別永住者"
    display_label: "特別永住者"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

特別永住者：戦前在日子孫・特別永住者証明書（7年）。

## must_say

- 戦前在日系
- 特別永住者証明書
- 通常永住と別

## injection_format

### injection_certain_block

```text
- 特別永住者は通常の永住者とは別の制度で、在留カードではなく特別永住者証明書を持つ。
- 証明書の有効期間更新など、特別永住者証明書に関する手続は別ページで確認する。
- 出典: ISA — 特別永住者証明書有効期間更新申請 https://www.moj.go.jp/isa/applications/procedures/tetuduki_tokubetu_shomeisho_00001.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
