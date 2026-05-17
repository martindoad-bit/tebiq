---
fact_id: gijinkoku-shihon-jugyou-strict
title: 技人国 — 専門性ある業務が対象、単純労働は対象外
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: '2026-05-17'
sprint: fact-window-bulk-1
citation_label: 技人国 単純労働対象外
citation_summary: 技人国は専門性ある業務が対象。接客（特活46号対象外を除く）、製造現場の単純労働、清掃等は技人国の活動範囲外で不認容となる。
source_display_names:
  - 出入国在留管理庁
applies_when:
  - 技人国 接客 不可
  - 工場 単純労働 技人国
does_not_cover:
  - 特活46号・特定技能対応分野（別カード）
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html'
    label: ISA — 技人国
    accessed: '2026-05-17'
applies_to:
  - 技人国申請者・受入企業
direct_fact_fields:
  - 技術・人文知識・国際業務は専門性ある業務が対象
  - 単純労働、現場作業、一般接客だけの業務は通常対象外
ai_inferred_fields:
  - 専門性の境界判断は実務上頻発
needs_review_flags:
  - boundary_case_practice
  - hosa_byoumu_inclusion_specifics
  - manager_role_in_production_specifics
related_links:
  - title: ISA — 技人国
    url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html'
    organization: 出入国在留管理庁
    display_label: 技人国
    locator: 専門性
    relation: official_reference
evidence_points:
  - claim: 技術・人文知識・国際業務は専門性ある業務を対象とし、単純労働・現場作業・一般接客だけの業務は通常対象外。
    source_title: ISA — 技人国
    source_url: 'https://www.moj.go.jp/isa/applications/status/gijinkoku.html'
    source_organization: 出入国在留管理庁
    source_locator: 専門性
    display_label: 技人国 単純労働対象外
    support_level: direct
    user_visible: true
    needs_domain_review: false
reviewer: Loop8 FACT/DOMAIN intersect
controlled_alpha_eligible: false
---

## current_effective_fact

技人国：専門性必要・単純労働対象外。

## must_say

- 専門性必要
- 接客・単純労働対象外
- 特活46号・特技で対応

## injection_format

### injection_certain_block

```text
【技人国 業務範囲／{{TODAY_ISO}} 公式】
・技術・人文知識・国際業務は、専門性ある業務が対象。
・単純労働、現場作業、一般接客だけの業務は通常対象外。
・混在業務や実際に範囲外作業をしているケースは、個別確認・L5 深水に回す。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
