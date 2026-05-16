---
fact_id: eijuu-jukyo-period-overseas
title: 永住申請 — 「継続」在留要件と海外出国期間の影響
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 継続在留 海外"
citation_summary: "永住の10年継続在留要件で、長期の海外出国（連続3か月超または年間180日超）は「継続性」を阻害する。再入国許可で繋がっても実体ある滞在が重要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 海外出張 多い"
  - "海外居住期間 永住"
does_not_cover:
  - "再入国許可手続詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 海外滞在多い永住申請予定者
direct_fact_fields:
  - 連続3か月超出国：継続性阻害の可能性
  - 年間180日超出国：継続性阻害の可能性
  - 再入国許可：物理的繋がりのみ
  - 「実体ある滞在」が重要
ai_inferred_fields:
  - 業務出張は理由書で説明
  - 配偶者長期同伴等も影響
needs_review_flags:
  - 3month_180day_official_threshold
  - business_travel_specific_exception
  - jisseki_aru_taizai_definition
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "継続"
    relation: "official_reference"
evidence_points:
  - claim: "永住の10年継続在留要件で、連続3か月超または年間180日超の海外出国は継続性を阻害する可能性あり。再入国許可で繋がっても実体ある滞在が重要。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "継続"
    display_label: "永住 継続在留海外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住「継続」：海外連続3か月/年180日超で阻害可能性。

## must_say

- 連続3か月超で阻害
- 年180日超で阻害
- 実体ある滞在必須

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
