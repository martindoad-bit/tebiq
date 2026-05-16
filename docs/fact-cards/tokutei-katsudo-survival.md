---
fact_id: tokutei-katsudo-survival
title: 特定活動（特活）— 個別指定で対応する非定型ケース
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特定活動概要"
citation_summary: "特定活動は法務大臣が個別に指定する活動向け資格。告示活動（46号、17号等）と告示外活動（人道的事情等）に分かれる。50号以上の番号で運用。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定活動 種類"
  - "特活 何号"
does_not_cover:
  - "個別号別の要件詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/specact02.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 非定型ケースの在留者
direct_fact_fields:
  - 告示活動：46号（本邦大学卒+N1）、17号（卒業後就活）等
  - 告示外活動：人道的事情、特例措置等
  - 個別指定の証明書（指定書）が交付される
  - 在留期間：個別指定（最長5年）
ai_inferred_fields:
  - 告示外は柔軟だが取扱困難
needs_review_flags:
  - latest_kojiakaichi_list_2026
  - kojigai_specific_examples
  - shitei-sho_specific_format
related_links:
  - title: "ISA — 特定活動"
    url: "https://www.moj.go.jp/isa/applications/status/specact02.html"
    organization: "出入国在留管理庁"
    display_label: "特定活動"
    locator: "号別"
    relation: "official_reference"
evidence_points:
  - claim: "特定活動は法務大臣の個別指定活動向け資格。告示活動（46号、17号等）と告示外活動（人道的事情等）に分かれる。"
    source_title: "ISA — 特定活動"
    source_url: "https://www.moj.go.jp/isa/applications/status/specact02.html"
    source_organization: "出入国在留管理庁"
    source_locator: "号別"
    display_label: "特活概要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

特活：告示活動と告示外活動・指定書で運用。

## must_say

- 告示/告示外
- 指定書交付
- 最長5年

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
