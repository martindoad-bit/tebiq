---
fact_id: rousai-hoken-foreign-worker
title: 労災保険 — 外国人労働者も自動適用・事業主全額負担
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "労災保険外国人"
citation_summary: "労災保険は1人でも労働者を雇用すれば自動適用。保険料は全額事業主負担、外国人労働者も国籍/在留資格にかかわらず保護対象。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人 労災"
  - "アルバイト 労災"
does_not_cover:
  - "労災給付の具体手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousaihoken/index.html
    label: 厚労省 — 労災保険
    accessed: "2026-05-17"
applies_to:
  - 全ての労働者（外国人含む）
direct_fact_fields:
  - 自動適用：1人雇用から
  - 保険料：全額事業主負担
  - 対象：国籍/在留資格問わず全労働者
  - 給付：療養補償、休業補償、障害補償、遺族補償等
  - 不法就労者も労災給付対象
ai_inferred_fields:
  - 通勤災害も対象
needs_review_flags:
  - 不法就労_specific_practice
  - kaigai_haken_workers
  - special_kanyū_for_executives
related_links:
  - title: "厚労省 — 労災保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousaihoken/index.html"
    organization: "厚生労働省"
    display_label: "労災保険"
    locator: "外国人"
    relation: "official_reference"
evidence_points:
  - claim: "労災保険は1人雇用から自動適用、保険料は全額事業主負担、外国人労働者も国籍/在留資格問わず保護対象。"
    source_title: "厚労省 — 労災保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousaihoken/index.html"
    source_organization: "厚生労働省"
    source_locator: "自動適用"
    display_label: "労災保険外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

労災：1人雇用から自動適用・全額事業主負担・外国人対象。

## must_say

- 自動適用
- 全額事業主負担
- 外国人/不法就労も対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
