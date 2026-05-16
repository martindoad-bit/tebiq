---
fact_id: ryugaku-kishu-katsudo-tokkatsu
title: 留学生 — 卒業後就職活動特活（最長1年・本邦大学卒）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "卒業後就活特活"
citation_summary: "本邦大学/大学院/専門学校卒業後、就職活動継続のため最長6か月（更新で最長1年）の特定活動による在留が認められる。J-Findは海外大学卒業者向け別ルート。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "卒業後 就活 ビザ"
does_not_cover:
  - "海外大学卒（J-Find参照）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 本邦学校卒業就活継続者
direct_fact_fields:
  - 在留期間：最長6か月（更新で最長1年）
  - 対象：本邦の大学/大学院/専門学校卒業者
  - 学校推薦書必要
  - 内定取得後は技人国等への変更
ai_inferred_fields:
  - 専門学校は学校により制限あり
needs_review_flags:
  - school_recommendation_format
  - senmon_gakko_eligibility_specifics
  - financial_proof_during_jobsearch
related_links:
  - title: "ISA — 特活"
    url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    organization: "出入国在留管理庁"
    display_label: "特活"
    locator: "就活継続"
    relation: "official_reference"
evidence_points:
  - claim: "本邦学校卒業就活継続者は最長6か月（更新で1年）の特活で在留可。学校推薦書必要。"
    source_title: "ISA — 特活"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    source_organization: "出入国在留管理庁"
    source_locator: "就活継続"
    display_label: "卒業後就活特活"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

卒業後就活特活：最長1年・学校推薦書必要。

## must_say

- 6か月（更新1年）
- 学校推薦書

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
