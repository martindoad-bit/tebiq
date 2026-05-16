---
fact_id: eijuu-vs-kika-key-diff
title: 永住 vs 帰化 — 国籍/参政権/再入国/失効リスクの違い
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住と帰化の違い"
citation_summary: "永住は外国籍維持・在留資格上の地位。帰化は日本国籍取得・在留資格不要。永住は再入国期限・失効リスクあり、帰化は政治参加可。"
source_display_names:
  - "出入国在留管理庁・法務省民事局"
applies_when:
  - "永住 帰化 違い"
  - "どっちがいい"
does_not_cover:
  - "二重国籍問題の詳細（個別国別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省 — 帰化
    accessed: "2026-05-17"
applies_to:
  - 永住・帰化検討中の外国人
direct_fact_fields:
  - 永住：外国籍維持、在留資格上の地位、再入国許可必要、失効リスクあり
  - 帰化：日本国籍取得、在留資格不要、選挙権・被選挙権あり、パスポート日本
  - 永住手数料：1万円、処理4-6か月
  - 帰化処理：1年以上が一般的（実務）
ai_inferred_fields:
  - 帰化は原国籍喪失原則
  - 子供への影響（永住の子は永住者の子の在留資格、帰化の子は日本国籍）
needs_review_flags:
  - kika_processing_period_2026
  - children_status_difference
  - tax_treatment_difference
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "永住"
    relation: "official_reference"
evidence_points:
  - claim: "永住は外国籍維持の在留資格、帰化は日本国籍取得。帰化は政治参加可、原国籍喪失原則。"
    source_title: "ISA/法務省"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "比較"
    display_label: "永住vs帰化"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住は外国籍・帰化は日本国籍取得。

## must_say

- 永住は外国籍維持
- 帰化は日本国籍取得
- 帰化は原国籍喪失原則

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
