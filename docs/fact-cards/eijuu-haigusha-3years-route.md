---
fact_id: eijuu-haigusha-3years-route
title: 永住申請 — 日本人/永住者配偶者の3年短縮ルート
state: ai_verified   # LOOP3 2026-05-17: official guideline exception route; no permission guarantee
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 配偶者3年ルート"
citation_summary: "日本人/永住者/特別永住者の配偶者は、実体を伴う婚姻3年以上＋日本在留1年以上で永住申請可。所得証明は直近3年分（通常永住の5年分と異なる）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本人配偶 永住 早く"
  - "永住者配偶 何年で永住"
  - "永住申請 婚姻3年"
does_not_cover:
  - "通常永住の10年要件（別カード）"
  - "高度人材の1年/3年ルート（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住許可に関するガイドライン
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者/特別永住者の配偶者
direct_fact_fields:
  - 実体を伴った婚姻生活：3年以上継続
  - 日本在留：引き続き1年以上
  - 10年在留原則の特例
  - 申請は許可保証ではなく、素行・独立生計・国益等の総合審査
ai_inferred_fields:
  - 別居/偽装婚姻は実体なしと判断され不許可
  - 3年は連続継続が原則
needs_review_flags:
  - bekkyou_during_marriage_handling
  - calculation_starting_point_marriage
  - resident_card_chronology_evidence
related_links:
  - title: "ISA — 永住許可に関するガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住申請"
    locator: "3年"
    relation: "official_reference"
evidence_points:
  - claim: "日本人・永住者・特別永住者の配偶者は、実体を伴った婚姻生活が3年以上継続し、引き続き1年以上日本に在留している場合、10年在留原則の特例対象となる。"
    source_title: "ISA — 永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "婚姻3年・在留1年"
    display_label: "配偶者永住3年+1年特例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

配偶者永住には婚姻3年＋在留1年の10年原則例外がある。

## common_user_phrases

- 配偶者 永住 3年
- 日本人配偶 永住
- 永住者の配偶者 永住

## must_say

- 婚姻3年＋在留1年
- 実体ある婚姻必須
- 許可保証ではない

## injection_format

### injection_certain_block

```text
- 日本人・永住者・特別永住者の配偶者については、永住の「原則10年在留」に対する例外ルートがある。
- 公式ガイドラインでは、実体を伴った婚姻生活が3年以上継続し、かつ引き続き1年以上日本に在留していることが示されている。
- これは「申請できる可能性のあるルート」であり、許可を保証するものではない。素行、独立生計、公的義務履行などは別途審査される。
- 出典: 出入国在留管理庁「永住許可に関するガイドライン」 https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | ガイドライン特例として範囲を狭めruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
