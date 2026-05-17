---
fact_id: koyo-todokede-mhlw
title: 外国人雇用状況届出 — 事業主の義務（ハローワーク）
state: ai_verified   # LOOP2 2026-05-17: MHLW direct source; employer-side notice fact only
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人雇用状況届出"
citation_summary: "事業主は外国人を雇用・離職した際、ハローワークに「外国人雇用状況届出」を提出する義務（雇用対策法第28条）。怠ると30万円以下の罰金。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人 雇用 ハローワーク"
  - "雇用対策法"
does_not_cover:
  - "在留資格別の所属機関届出（入管・別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html
    label: 厚労省 — 外国人雇用状況届出
    accessed: "2026-05-17"
applies_to:
  - 外国人を雇用する全事業主
direct_fact_fields:
  - 雇用時/離職時にハローワーク届出
  - 雇用保険被保険者：雇用保険手続と一体
  - 雇用保険非対象者（短期等）：別途届出
  - 期限：翌月10日（雇用保険）または翌月末日（その他）
  - 違反：30万円以下罰金（雇用対策法第40条）
ai_inferred_fields:
  - 永住者・特別永住者・特定活動の一部は対象外
needs_review_flags:
  - non_target_status_complete_list
  - online_filing_status_2026
  - shared_information_with_immigration
related_links:
  - title: "厚労省 — 外国人雇用状況届出"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html"
    organization: "厚生労働省"
    display_label: "外国人雇用状況届出"
    locator: "事業主"
    relation: "official_reference"
evidence_points:
  - claim: "事業主は外国人雇用/離職時に外国人雇用状況届出をハローワークに提出する義務（雇用対策法第28条）。違反は30万円以下罰金。"
    source_title: "厚労省 — 外国人雇用状況届出"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html"
    source_organization: "厚生労働省"
    source_locator: "雇用対策法28条"
    display_label: "外国人雇用状況届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

外国人雇用：事業主はハローワーク届出義務・違反30万円。

## must_say

- 事業主の届出義務
- 雇用対策法28条
- 違反30万円罰金

## injection_format

### injection_certain_block

```text
- 外国人を雇用・離職したとき、事業主にはハローワークへ「外国人雇用状況届出」を行う義務がある。
- これは雇用主側の届出であり、本人の入管への所属機関届出や在留資格変更許可申請とは別の手続。
- 届出を怠ると、雇用対策法上の罰則（30万円以下の罰金）の対象になる。
- 出典: 厚生労働省「外国人雇用状況届出」 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 事業主側の外国人雇用状況届出としてruntime昇格。 | ai_extracted | ai_verified | promote |
