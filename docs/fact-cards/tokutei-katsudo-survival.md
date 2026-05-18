---
fact_id: tokutei-katsudo-survival
title: 特定活動 — 法務大臣が個々に指定する活動
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "特定活動概要"
citation_summary: "特定活動は、法務大臣が個々の外国人について特に指定する活動を行う在留資格。ISA公式ページの在留期間は、5年、3年、1年、6月、3月又は法務大臣が個々に指定する期間（5年を超えない範囲）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定活動 種類"
  - "特活 何号"
does_not_cover:
  - "個別号別の要件詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/designatedactivities.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 非定型ケースの在留者
direct_fact_fields:
  - 活動：法務大臣が個々の外国人について特に指定する活動
  - 該当例：外交官等の家事使用人、ワーキング・ホリデー、EPAに基づく外国人看護師・介護福祉士候補者等
  - 在留期間：5年、3年、1年、6月、3月又は法務大臣が個々に指定する期間（5年を超えない範囲）
ai_inferred_fields:
  - 個別の活動類型・号数ごとの要件は別資料で確認する
needs_review_flags:
  - latest_kojiakaichi_list_2026
  - shitei-sho_specific_format
related_links:
  - title: "ISA — 特定活動"
    url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    organization: "出入国在留管理庁"
    display_label: "特定活動"
    locator: "この在留資格に該当する活動・在留期間"
    relation: "official_reference"
evidence_points:
  - claim: "特定活動は法務大臣が個々の外国人について特に指定する活動で、在留期間は5年、3年、1年、6月、3月又は法務大臣が個々に指定する期間（5年を超えない範囲）。"
    source_title: "ISA — 特定活動"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    source_organization: "出入国在留管理庁"
    source_locator: "この在留資格に該当する活動・在留期間"
    display_label: "特活概要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

特定活動は、法務大臣が個々の外国人について特に指定する活動を行う在留資格。

## must_say

- 法務大臣が個々の外国人について特に指定する活動
- 在留期間は5年、3年、1年、6月、3月又は個別指定期間
- 個別指定期間は5年を超えない範囲
- 活動類型ごとの要件は個別確認する

## injection_format

### injection_certain_block

```text
- 「特定活動」は、法務大臣が個々の外国人について特に指定する活動を行う在留資格。
- 在留期間は5年、3年、1年、6月、3月又は法務大臣が個々に指定する期間（5年を超えない範囲）。
- 具体的な活動類型・号数ごとの要件は個別に確認する。
- 出典: 出入国在留管理庁「在留資格『特定活動』」 https://www.moj.go.jp/isa/applications/status/designatedactivities.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 告示/告示外・指定書など公式ページ単体で支えない説明を外し、活動定義と在留期間に限定してruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
