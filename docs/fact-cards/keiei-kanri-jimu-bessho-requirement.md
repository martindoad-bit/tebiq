---
fact_id: keiei-kanri-jimu-bessho-requirement
title: 経営・管理 — 独立した事業所の確保要件
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "経営管理 事務所"
citation_summary: "経営・管理ビザでは事業を営む独立した事務所（住居と分離・実体ある事業所）の確保が要件。バーチャルオフィスや住居兼用は不認可リスク。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "経営管理 事務所"
  - "バーチャルオフィス 経営管理"
does_not_cover:
  - "経営管理の他要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    label: ISA — 経営管理改正
    accessed: "2026-05-17"
applies_to:
  - 経営・管理ビザ申請者
direct_fact_fields:
  - 事務所要件：独立した事業所
  - バーチャルオフィス：原則不認可
  - 住居兼用：実体ある分離が必要
  - 賃貸借契約書・写真等で証明
ai_inferred_fields:
  - シェアオフィスは個別判断
  - 業種により要件柔軟性異なる
needs_review_flags:
  - share_office_practice_2026
  - virtual_office_partial_acceptance
  - photo_required_specifics
related_links:
  - title: "ISA — 経営管理改正"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "経営管理改正"
    locator: "事務所"
    relation: "official_reference"
evidence_points:
  - claim: "経営・管理ビザは独立した事業所の確保が要件。バーチャルオフィスは原則不認可、住居兼用は実体ある分離が必要。"
    source_title: "ISA — 経営管理改正"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "事務所"
    display_label: "経営管理 事務所"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

経営管理：独立事務所必須・バーチャル原則不可。

## must_say

- 独立事業所
- バーチャル不可
- 住居兼用は分離必要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
