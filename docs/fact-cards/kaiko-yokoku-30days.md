---
fact_id: kaiko-yokoku-30days
title: 解雇予告 — 30日前通知または平均賃金30日分支払
state: ai_verified   # LOOP3 2026-05-17: MHLW direct source; narrow labor-law fact
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
  - url: https://www.check-roudou.mhlw.go.jp/qa/roudousya/kaiko/q1.html
    label: 厚労省 — 確かめよう労働条件（解雇予告）
    accessed: "2026-05-17"
applies_to:
  - 全労働者（外国人含む）
direct_fact_fields:
  - 原則：少なくとも30日前に予告
  - 即時解雇：30日分以上の平均賃金を支払う
  - 30日に満たない予告：不足日数分の平均賃金支払
  - 例外・適用除外あり
ai_inferred_fields:
  - 整理解雇は4要件あり
needs_review_flags:
  - seiri-kaiko_4_conditions
  - choukai-kaiko_application_specifics
  - foreign_worker_specific_practice
related_links:
  - title: "厚労省 — 確かめよう労働条件（解雇予告）"
    url: "https://www.check-roudou.mhlw.go.jp/qa/roudousya/kaiko/q1.html"
    organization: "厚生労働省"
    display_label: "労働基準"
    locator: "解雇予告"
    relation: "official_reference"
evidence_points:
  - claim: "原則として、解雇には少なくとも30日前の予告が必要。即時解雇する場合は30日分以上の平均賃金、30日に足りない場合は不足日数分の平均賃金を支払う必要がある。"
    source_title: "厚労省 — 確かめよう労働条件（解雇予告）"
    source_url: "https://www.check-roudou.mhlw.go.jp/qa/roudousya/kaiko/q1.html"
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
- 例外/個別争いは労基署へ

## injection_format

### injection_certain_block

```text
- 原則として、会社が労働者を解雇する場合は少なくとも30日前に予告する必要がある。
- 30日前の予告なしに即時解雇する場合は、30日分以上の平均賃金（解雇予告手当）を支払う必要がある。30日に足りない予告の場合は、不足日数分の平均賃金を支払う。
- 例外や解雇の有効性は個別事情によるため、解雇理由証明書、雇用契約書、勤務記録を持って労働基準監督署や総合労働相談へ確認する。
- 出典: 厚生労働省「確かめよう労働条件 — 解雇予告」 https://www.check-roudou.mhlw.go.jp/qa/roudousya/kaiko/q1.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 解雇予告の狭い労働法factとしてruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
