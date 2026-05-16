---
fact_id: gijinkoku-shihon-jugyou-strict
title: 技人国 — 単純労働は対象外（接客・製造現場等は不認容）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "技人国 単純労働対象外"
citation_summary: "技人国は専門性ある業務が対象。接客（特活46号対象外を除く）、製造現場の単純労働、清掃等は技人国の活動範囲外で不認容となる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 接客 不可"
  - "工場 単純労働 技人国"
does_not_cover:
  - "特活46号・特定技能対応分野（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 技人国申請者・受入企業
direct_fact_fields:
  - 対象：専門性ある業務
  - 非対象：単純労働（接客・製造現場・清掃等）
  - 接客は特活46号・特定技能で対応
  - 工場現場作業は特定技能・育成就労で対応
ai_inferred_fields:
  - 専門性の境界判断は実務上頻発
needs_review_flags:
  - boundary_case_practice
  - hosa_byoumu_inclusion_specifics
  - manager_role_in_production_specifics
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "専門性"
    relation: "official_reference"
evidence_points:
  - claim: "技人国は専門性ある業務が対象、単純労働（接客・製造現場・清掃等）は技人国の活動範囲外で不認容。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "専門性"
    display_label: "技人国 単純労働対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

技人国：専門性必要・単純労働対象外。

## must_say

- 専門性必要
- 接客・単純労働対象外
- 特活46号・特技で対応

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
