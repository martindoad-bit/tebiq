---
fact_id: kaiko-yokoku-30days
title: 解雇予告 — 30日前通知または平均賃金30日分支払
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "解雇予告30日"
citation_summary: "事業主が労働者を解雇する場合、30日前の予告または平均賃金30日分の解雇予告手当の支払いが必要（労基法第20条）。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "解雇 30日"
  - "解雇予告手当"
does_not_cover:
  - "懲戒解雇の例外"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html
    label: 厚労省 — 労働基準
    accessed: "2026-05-17"
applies_to:
  - 全労働者（外国人含む）
direct_fact_fields:
  - 30日前予告 or 平均賃金30日分の解雇予告手当
  - 例外：懲戒解雇（事前申請）/天災等で事業継続不能
  - 試用期間14日以内は適用外
  - 違反：6か月以下懲役/30万円以下罰金
ai_inferred_fields:
  - 整理解雇は4要件あり
needs_review_flags:
  - seiri-kaiko_4_conditions
  - choukai-kaiko_application_specifics
  - foreign_worker_specific_practice
related_links:
  - title: "厚労省 — 労働基準"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    organization: "厚生労働省"
    display_label: "労働基準"
    locator: "解雇予告"
    relation: "official_reference"
evidence_points:
  - claim: "労基法第20条により事業主の解雇は30日前予告または平均賃金30日分の手当支払が必要。違反は6か月以下懲役/30万円罰金。"
    source_title: "厚労省 — 労働基準"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    source_organization: "厚生労働省"
    source_locator: "20条"
    display_label: "解雇予告30日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

解雇：30日前予告 or 30日分手当。

## must_say

- 30日前予告 or 30日分手当
- 試用14日以内は適用外
- 違反は罰則

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
