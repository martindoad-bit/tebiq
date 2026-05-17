---
fact_id: eijuu-haigusha-zairyu-1year
title: 永住申請 — 配偶者ルートの「在留1年以上」要件
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "配偶者永住 在留1年"
citation_summary: "日本人/永住者配偶者の永住申請は婚姻3年継続＋日本在留1年以上が必要。海外在住の婚姻期間と日本在留期間は別カウント。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "配偶者 永住 海外婚姻"
  - "海外婚姻3年 日本在留"
does_not_cover:
  - "配偶者以外の永住ルート"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者の配偶者
direct_fact_fields:
  - 配偶者ルール：婚姻3年継続+日本在留1年以上
  - 海外婚姻期間も含む（3年カウント）
  - 日本在留：継続1年以上
  - 子の場合：在留1年以上で可
ai_inferred_fields:
  - 婚姻実体が伴うことが審査の鍵
  - 別居期間は実体ある婚姻か個別判断
needs_review_flags:
  - kaigai_marriage_counting_method
  - bekkyou_handling_practice
  - resident_card_required_evidence
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "配偶者"
    relation: "official_reference"
evidence_points:
  - claim: "配偶者ルートの永住申請は婚姻3年継続+日本在留1年以上。海外婚姻期間も3年カウントに含まれる。子は在留1年以上で可。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "配偶者"
    display_label: "配偶者永住在留1年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

配偶者永住：婚姻3年（海外含む）+在留1年以上。

## must_say

- 婚姻3年（海外含む）
- 日本在留1年以上
- 実体ある婚姻必要

## injection_format

### injection_certain_block

```text
- 永住ガイドラインでは、日本人・永住者等の配偶者は、実体を伴う婚姻が3年以上継続し、日本に1年以上継続在留していることが一つの短縮ルートとして示される。
- この条件は許可保証ではなく、婚姻実体や他の永住要件は別途確認が必要。
- 出典: ISA — 永住ガイドライン https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
