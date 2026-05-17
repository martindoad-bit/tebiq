---
fact_id: rousai-hoken-foreign-worker
title: 労災保険 — 外国人労働者も自動適用・事業主全額負担
state: ai_verified   # LOOP3 2026-05-17: rewritten to foreign-worker coverage; illegal-work subclaim removed
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "労災保険外国人"
citation_summary: "労災保険は国籍を問わず、日本で労働者として働く外国人にも適用される。留学生アルバイト中の事故も対象例として示されている。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人 労災"
  - "アルバイト 労災"
does_not_cover:
  - "労災給付の具体手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/content/11200000/001628620.pdf
    label: 厚労省 — 外国人労働者向け労災保険給付パンフレット
    accessed: "2026-05-17"
  - url: https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/roudoukijun/hoken/tokusetusaito/about.html
    label: 厚労省 — 労働保険とは
    accessed: "2026-05-17"
applies_to:
  - 全ての労働者（外国人含む）
direct_fact_fields:
  - 対象：国籍を問わず、日本で労働者として働く外国人
  - 留学生アルバイト中の事故もパンフレットで対象例
  - 労災保険料は全額事業主負担
  - 給付：療養補償、休業補償、障害補償、遺族補償等
ai_inferred_fields:
  - 通勤災害も対象
needs_review_flags:
  - 不法就労_specific_practice
  - kaigai_haken_workers
  - special_kanyū_for_executives
related_links:
  - title: "厚労省 — 外国人労働者向け労災保険給付パンフレット"
    url: "https://www.mhlw.go.jp/content/11200000/001628620.pdf"
    organization: "厚生労働省"
    display_label: "労災保険"
    locator: "外国人"
    relation: "official_reference"
evidence_points:
  - claim: "労災保険は国籍を問わず、日本で労働者として働く外国人にも適用され、留学生アルバイト中の事故も対象例として示されている。"
    source_title: "厚労省 — 外国人労働者向け労災保険給付パンフレット"
    source_url: "https://www.mhlw.go.jp/content/11200000/001628620.pdf"
    source_organization: "厚生労働省"
    source_locator: "外国人にも適用"
    display_label: "労災保険外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

労災：外国人労働者にも適用。

## must_say

- 全額事業主負担
- 国籍を問わず外国人労働者にも適用
- 留学生アルバイト中の事故も対象例

## injection_format

### injection_certain_block

```text
- 労災保険は、日本で労働者として働く外国人にも国籍を問わず適用される。
- 厚労省パンフレットでは、留学生がアルバイト中にけがをした場合も労災保険給付の対象例として示されている。
- 会社が「外国人だから」「アルバイトだから」と言っても、それだけで労災の対象外にはならない。実際の請求や認定は労働基準監督署で確認する。
- 出典: 厚生労働省「外国人労働者向け労災保険給付パンフレット」 https://www.mhlw.go.jp/content/11200000/001628620.pdf
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 不法就労断定を外し、外国人労働者にも適用される範囲でruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
