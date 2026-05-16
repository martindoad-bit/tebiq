---
fact_id: shussei-todoke-14days
title: 出生届 — 14日以内に市区町村へ提出（戸籍法）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "出生届14日"
citation_summary: "日本国内で出生があった場合は14日以内に市区町村へ出生届を提出する義務（戸籍法第49条）。外国人夫婦の子も対象。"
source_display_names:
  - "法務省"
applies_when:
  - "出生届 14日"
  - "外国人 子 出生"
does_not_cover:
  - "新生児の在留資格取得（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局
    accessed: "2026-05-17"
applies_to:
  - 日本国内で出産した夫婦
direct_fact_fields:
  - 期限：14日以内（戸籍法第49条）
  - 届出先：出生地、本籍地、または届出人住所地市区町村
  - 必要書類：出生証明書、出生届、母子手帳
  - 外国人夫婦の子も対象
ai_inferred_fields:
  - 国籍取得は別途本国大使館で手続
  - 在留資格取得申請は別途30日以内
needs_review_flags:
  - paternity_unmarried_handling
  - kokuseki-shutoku_dual_nationality_implication
related_links:
  - title: "法務省 — 戸籍"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "戸籍"
    locator: "出生届"
    relation: "official_reference"
evidence_points:
  - claim: "日本国内で出生があった場合は戸籍法第49条により14日以内に市区町村へ出生届を提出する義務がある。"
    source_title: "法務省"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "出生届"
    display_label: "出生届14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

出生届：14日以内（戸籍法）。

## must_say

- 14日以内
- 出生地/本籍地/住所地で届出
- 在留資格取得は別途30日

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
