---
fact_id: eijuu-shotoku-200man-myth
title: 永住申請 — 独立生計要件は資産・技能等で見る
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "永住 独立生計"
citation_summary: "永住許可ガイドラインは、独立生計要件を「日常生活において公共の負担にならず、その有する資産又は技能等から見て将来において安定した生活が見込まれること」と説明している。公式ページ上の要件説明は固定年収額を示していない。"
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
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住許可に関するガイドライン
    accessed: "2026-05-18"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 永住許可ガイドラインの独立生計要件：独立の生計を営むに足りる資産又は技能を有すること
  - 説明：日常生活において公共の負担にならず、資産又は技能等から見て将来において安定した生活が見込まれること
  - 永住申請ページは申請人又は扶養者の資産を証明する資料として預貯金通帳の写し、不動産の登記事項証明書等を挙げている
  - 公式ページ上の要件説明は固定年収額を示していない
ai_inferred_fields:
  - 実務目安として語られる金額は公式の固定許可ラインとして扱わない
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
  - title: "ISA — 永住許可に関するガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住許可ガイドライン"
    locator: "独立の生計を営むに足りる資産又は技能"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可ガイドラインは、独立生計要件を、日常生活で公共の負担にならず、資産又は技能等から見て将来において安定した生活が見込まれることと説明している。"
    source_title: "ISA — 永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "独立の生計を営むに足りる資産又は技能"
    display_label: "永住 独立生計"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住許可ガイドラインの独立生計要件は、日常生活で公共の負担にならず、資産又は技能等から見て将来において安定した生活が見込まれること。公式ページ上の要件説明は固定年収額を示していない。

## must_say

- 公式ページ上の要件説明は固定年収額を示していない
- 独立生計要件は公共の負担、資産又は技能等、将来の安定生活見込みとして説明されている
- 申請資料には資産を証明する資料が含まれる
- 「年収○万円なら必ず許可／必ず不許可」と断定しない

## injection_format

### injection_certain_block

```text
【永住申請 独立生計ファクト / {{TODAY_ISO}} 公式】
・永住許可ガイドラインは、独立生計要件を「日常生活で公共の負担にならず、資産又は技能等から見て将来において安定した生活が見込まれること」と説明している。
・公式ページ上の要件説明は「年収200万円」「年収300万円」などの固定許可ラインを示していない。
・永住申請資料には、預貯金通帳の写し、不動産登記事項証明書など資産を証明する資料が含まれる。
・年収額だけで「必ず許可／必ず不許可」とは扱わない。
```

### injection_needs_review_addendum

```text
※ 実務上の目安、扶養人数、家族構成、資産でどこまで補えるかは個別確認が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 年収目安・家族構成推論を降温し、永住許可ガイドラインの独立生計要件と申請資料に限定。 | ai_extracted | ai_extracted | rewrite |
| 2026-05-18 | Codex Loop19 | 固定年収ライン否定の窄事实として ANSWER_RUNTIME に昇格。 | ai_extracted | ai_verified | loop19-promote |
