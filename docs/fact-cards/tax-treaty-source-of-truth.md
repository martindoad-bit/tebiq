---
fact_id: tax-treaty-source-of-truth
title: 租税条約 — 軽減・免除には届出書提出が必要
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "租税条約届出"
citation_summary: "非居住者等が租税条約に基づく源泉所得税等の軽減・免除を受けようとする場合、届出書を支払者経由で支払者の納税地の所轄税務署長に提出する必要がある。原則として最初に支払を受ける日の前日までに提出する。"
source_display_names:
  - "国税庁"
applies_when:
  - "租税条約 軽減"
  - "外国人 源泉 軽減"
does_not_cover:
  - "個別国の租税条約詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2888.htm
    label: 国税庁 — 租税条約
    accessed: "2026-05-17"
applies_to:
  - 租税条約による源泉所得税等の軽減・免除を検討する非居住者等
direct_fact_fields:
  - 対象：源泉徴収の対象となる国内源泉所得の支払を受ける非居住者等
  - 租税条約に基づく所得税・復興特別所得税の軽減又は免除を受けようとする場合は届出書提出が必要
  - 届出書は支払者ごとに作成し、支払者を経由して支払者の納税地の所轄税務署長に提出する
  - 提出期限：最初にその所得の支払を受ける日の前日まで
ai_inferred_fields:
  - 国別の適用可否、対象所得、添付書類は個別の条約・届出様式で確認する
needs_review_flags:
  - latest_treaty_list_2026
  - country_specific_treaty_application
related_links:
  - title: "国税庁 — 租税条約"
    url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2888.htm"
    organization: "国税庁"
    display_label: "租税条約"
    locator: "概要"
    relation: "official_reference"
evidence_points:
  - claim: "非居住者等が租税条約に基づく所得税等の軽減又は免除を受けようとする場合は届出書の提出が必要で、原則として最初の支払日の前日までに支払者経由で所轄税務署長へ提出する。"
    source_title: "国税庁 — 租税条約"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2888.htm"
    source_organization: "国税庁"
    source_locator: "概要"
    display_label: "租税条約届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

租税条約による源泉所得税等の軽減・免除を受けるには、届出書を支払者経由で所轄税務署長に提出する必要がある。

## must_say

- 軽減・免除を受けようとする場合は届出書が必要
- 届出書は支払者ごとに作成し、支払者経由で提出する
- 原則として最初に支払を受ける日の前日までに提出する
- 国別の適用可否や対象所得は個別確認する

## injection_format

### injection_certain_block

```text
- 非居住者等が租税条約に基づく源泉所得税等の軽減又は免除を受けようとする場合は、「租税条約に関する届出書」の提出が必要。
- 届出書は支払者ごとに作成し、支払者を経由して支払者の納税地の所轄税務署長に提出する。
- 原則として、最初にその所得の支払を受ける日の前日までに提出する。
- 国別の適用可否、対象所得、添付書類は個別の条約・届出様式で確認する。
- 出典: 国税庁「No.2888 租税条約に関する届出書の提出（源泉徴収関係）」 https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2888.htm
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 80カ国以上・留学生特例など国別論点を外し、国税庁ページが直接支える届出手続へ限定してruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
