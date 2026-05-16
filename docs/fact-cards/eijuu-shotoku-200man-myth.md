---
fact_id: eijuu-shotoku-200man-myth
title: 永住申請 — 年収300万円目安（家族数で変動・公式数値なし）
state: ai_extracted
risk_level: high
confidence: low
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 年収300万目安"
citation_summary: "永住の独立生計要件の実務目安は年収300万円程度（単身）。家族構成（配偶者・子）の人数で増額判断。ISA公式に数値記載はない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 年収 ライン"
  - "永住 300万円"
does_not_cover:
  - "公式記載なし（実務目安）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 法定：独立の生計を営むに足りる資産または技能
  - ISA公式数値記載：なし
  - 実務目安：単身300万円程度
  - 家族構成で変動（配偶者・子の人数）
  - 安定継続性が重要
ai_inferred_fields:
  - 配偶者ありで350-400万円
  - 子1人で50-100万円増額目安
needs_review_flags:
  - 2026_specific_threshold_practice
  - haigusha_zouseii_specifics
  - shisan_offset_calculation
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "独立生計"
    relation: "official_reference"
evidence_points:
  - claim: "永住の独立生計要件はISA公式に具体数値記載なし。実務目安は単身年収300万円程度、家族構成で変動。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "独立生計"
    display_label: "永住年収300万目安"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住年収目安：単身300万・公式数値なし・家族で変動。

## must_say

- 公式数値なし
- 単身300万目安
- 家族構成で変動

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
