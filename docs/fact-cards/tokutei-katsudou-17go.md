---
fact_id: tokutei-katsudou-17go
title: 特定活動17号 — 留学からCOE取得後の就職活動延長
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特活17号"
citation_summary: "本邦の大学等を卒業し、卒業後の就職活動継続のための特定活動17号。在留期間6か月、更新で最長1年（卒業後1年6か月）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特活17号"
  - "本邦大学 就活継続"
does_not_cover:
  - "特活46号（接客等含む）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 本邦大学等卒業者
direct_fact_fields:
  - 対象：本邦大学等卒業者の就活継続
  - 在留期間：6か月（更新で最長1年）
  - 学校推薦書必要
  - 卒業1年経過後は対象外
ai_inferred_fields:
  - 就活実績の提出（求人応募、面接記録等）が更新時の鍵
needs_review_flags:
  - shokusho_recommendation_format
  - extension_post_1year_routes
  - specific_documents_for_renewal
related_links:
  - title: "ISA — 特活"
    url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    organization: "出入国在留管理庁"
    display_label: "特活"
    locator: "17号"
    relation: "official_reference"
evidence_points:
  - claim: "特定活動17号は本邦大学等卒業後の就活継続のため、6か月（更新で最長1年）の在留。学校推薦書必要。"
    source_title: "ISA — 特活"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    source_organization: "出入国在留管理庁"
    source_locator: "17号"
    display_label: "特活17号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

特活17号：本邦卒業就活継続6か月（更新1年）。

## must_say

- 6か月（更新1年）
- 学校推薦書
- 本邦大学等卒業者

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
