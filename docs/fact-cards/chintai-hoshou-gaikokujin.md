---
fact_id: chintai-hoshou-gaikokujin
title: 賃貸 — 外国人入居の保証会社必須化・連帯保証人代替
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人賃貸保証"
citation_summary: "民法改正（2020年4月）で連帯保証人の極度額明記が義務化されて以降、賃貸では保証会社利用がほぼ必須化。外国人入居も保証会社加入で対応する流れ。"
source_display_names:
  - "国土交通省"
applies_when:
  - "外国人 賃貸 保証人"
  - "保証会社 外国人"
does_not_cover:
  - "敷金・礼金の慣行"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 賃貸を希望する外国人
direct_fact_fields:
  - 民法改正：2020年4月、連帯保証人極度額義務化
  - 保証会社加入：実務上必須
  - 月額家賃の50-100%が初期費用（保証会社）
  - 外国人専用保証会社あり
ai_inferred_fields:
  - 在留資格期間が短いと審査厳しい
  - 母国語対応の保証会社あり
needs_review_flags:
  - guaranter_company_specifics_for_foreigners
  - low_credit_alternative_routes
  - kuyakusho-jutaku_subsidies
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "賃貸"
    relation: "official_reference"
evidence_points:
  - claim: "民法改正で連帯保証人極度額明記義務化以降、賃貸は保証会社加入が実務上必須化。外国人専用保証会社もある。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    source_organization: "国土交通省"
    source_locator: "賃貸"
    display_label: "外国人賃貸保証"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

賃貸保証会社必須化（2020-04民法改正）。外国人専用保証会社あり。

## must_say

- 保証会社実務上必須
- 民法改正の影響
- 外国人専用あり

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
