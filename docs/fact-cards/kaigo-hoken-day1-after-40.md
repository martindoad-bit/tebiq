---
fact_id: kaigo-hoken-day1-after-40
title: 介護保険 — 40歳から対象になる社会保険料
state: ai_verified
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "介護料 40歳到達"
citation_summary: "介護保険制度では、40歳以上の人が被保険者となり、40歳から64歳までは加入している医療保険とあわせて介護保険料を納める。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "介護保険料 始まる"
  - "40歳 給料 減る"
does_not_cover:
  - "国民健康保険加入者の介護保険料計算"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/newpage_10548.html
    label: 厚労省 — 介護保険
    accessed: "2026-05-17"
applies_to:
  - 40歳到達の被保険者
direct_fact_fields:
  - 40歳以上が介護保険の被保険者になる
  - 40歳から64歳までは加入している医療保険とあわせて介護保険料を納める
  - 65歳以上は第1号被保険者として扱われる
ai_inferred_fields:
  - 65歳到達月で第1号への切替
needs_review_flags:
  - 1day_birthday_calc_specifics
  - latest_kaigo_rate_2026
  - jigyounushi_burden_share
related_links:
  - title: "厚労省 — 介護保険"
    url: "https://www.mhlw.go.jp/stf/newpage_10548.html"
    organization: "厚生労働省"
    display_label: "介護保険"
    locator: "40歳"
    relation: "official_reference"
evidence_points:
  - claim: "介護保険制度では40歳以上が被保険者となり、40歳から64歳までは加入中の医療保険とあわせて介護保険料を納める。"
    source_title: "厚労省 — 介護保険"
    source_url: "https://www.mhlw.go.jp/stf/newpage_10548.html"
    source_organization: "厚生労働省"
    source_locator: "40歳以上"
    display_label: "介護料40歳到達"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

介護保険は40歳以上が対象になる。

## must_say

- 40歳以上が対象
- 40-64歳は加入中の医療保険とあわせて納付
- 金額や控除月は保険者・会社で確認

## injection_format

### injection_certain_block

```text
【介護保険料／{{TODAY_ISO}} 公式】
介護保険は40歳以上の人が対象になる制度。
40歳から64歳までは、加入している医療保険とあわせて介護保険料を納める。
給与からいつ・いくら控除されるかは、加入している健康保険や会社の給与計算で確認する。
```

### injection_needs_review_addendum

```text
※ 具体的な料率、控除開始月、1日生まれ等の境界日は保険者・勤務先で確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
