---
fact_id: shakai-hoken-kyotei-bilateral
title: 社会保障協定 — 23カ国（脱退一時金との関係）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "社会保障協定"
citation_summary: "日本は23カ国と社会保障協定締結（米国・英国・ドイツ・韓国・中国等）。本国年金加入期間と日本年金加入期間の通算等が可能。脱退一時金との関係に注意。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "社会保障協定 年金"
  - "中国 年金 通算"
does_not_cover:
  - "脱退一時金詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金関連）
    accessed: "2026-05-17"
applies_to:
  - 協定締約国出身の在留者
direct_fact_fields:
  - 締約国：23カ国（米、英、独、韓、中、加、豪等）
  - 効果：本国年金加入期間との通算
  - 短期滞在の二重加入回避
  - 脱退一時金との関係：受給で日本期間消滅
ai_inferred_fields:
  - 中国との協定は2019年9月発効
  - 永住希望者は脱退一時金を受給しない方が有利
needs_review_flags:
  - latest_country_list_2026
  - dattai_ichijikin_optimal_strategy
  - bilateral_specific_provision_diff
related_links:
  - title: "年金機構"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "日本年金機構"
    display_label: "社会保障協定"
    locator: "23カ国"
    relation: "official_reference"
evidence_points:
  - claim: "日本は23カ国と社会保障協定締結。本国年金加入期間との通算・二重加入回避効果あり。脱退一時金受給で日本期間消滅。"
    source_title: "年金機構"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "23カ国"
    display_label: "社会保障協定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

社会保障協定：23カ国・通算可能・脱退一時金との関係注意。

## must_say

- 23カ国締約
- 通算可能
- 脱退一時金受給で日本期間消滅

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
