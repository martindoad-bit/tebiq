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
citation_summary: "永住許可ガイドラインでは原則として継続して日本に在留していることが求められる。長期・頻繁な海外滞在は継続性の個別確認が必要だが、このカードは3か月/180日などの固定線を公式硬線として扱わない。"
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
  - 永住許可ガイドラインでは原則として継続して日本に在留していることが求められる
  - 長期・頻繁な海外滞在がある場合、継続在留性の個別確認が必要
  - 再入国許可の有無だけで永住要件を満たすとは判断できない
ai_inferred_fields:
  - 連続3か月超・年間180日超などの目安
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
  - claim: "永住許可ガイドラインでは原則として継続して日本に在留していることが求められる。長期・頻繁な海外滞在がある場合、継続在留性は個別に確認が必要。3か月/180日などの数値はこのカードでは公式硬線として扱わない。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "継続"
    display_label: "永住 継続在留と海外滞在"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住許可では原則として継続して日本に在留していることが求められる。長期・頻繁な海外滞在がある場合は個別確認が必要で、3か月/180日などの目安を公式の固定線として表示しない。

## must_say

- 継続して日本に在留していることが重要
- 長期・頻繁な海外滞在は個別確認が必要
- 再入国許可があるだけで永住要件を満たすとは判断しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop17 | 3か月/180日を公式硬線のように見せる表現を削除し、継続在留性の個別確認カードへ降温。 | ai_extracted | ai_extracted | loop17-rewrite |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
