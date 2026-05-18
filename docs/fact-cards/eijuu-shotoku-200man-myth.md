---
fact_id: eijuu-shotoku-200man-myth
title: 永住申請 — 公式の固定年収ラインはない
state: ai_extracted
risk_level: high
confidence: low
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 年収300万目安"
citation_summary: "永住の独立生計要件について、ISA公式ページは固定の年収額を示していない。家族構成、扶養人数、収入の安定性、資産などを個別に確認する必要がある。"
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
  - 固定の年収額はISA公式ページには記載なし
  - 家族構成、扶養人数、収入の安定性、資産などで個別確認
  - 安定継続性が重要
ai_inferred_fields:
  - 実務目安として語られる金額があるが、公式の固定ラインではない
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
  - claim: "永住の独立生計要件について、ISA公式ページは固定の年収額を示していない。家族構成、扶養人数、収入の安定性、資産などを個別に確認する必要がある。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "独立生計"
    display_label: "永住申請の固定年収ラインなし"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住申請の独立生計要件について、ISA公式ページに固定の年収額は示されていない。家族構成、扶養人数、収入の安定性、資産などを個別に確認する必要がある。

## must_say

- ISA公式ページに固定の年収額はない
- 家族構成、扶養人数、収入の安定性、資産などを確認する
- 「年収○万円なら必ず許可／必ず不許可」と断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
