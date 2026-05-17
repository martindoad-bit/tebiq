---
fact_id: eijuu-children-direct-route
title: 永住申請 — 日本人/永住者等の実子は在留1年以上の例外ルート
state: ai_verified   # LOOP3 2026-05-17: rewritten from misleading "direct" to guideline exception route
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住者実子永住"
citation_summary: "日本人・永住者・特別永住者の実子等は、引き続き1年以上日本に在留していれば、永住の10年在留原則の例外対象となる。自動付与ではなく申請・審査が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者の子 永住"
  - "日本生まれ 子供 永住"
does_not_cover:
  - "永住者の海外生まれ子の取扱"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住許可に関するガイドライン
    accessed: "2026-05-17"
applies_to:
  - 永住者の実子
direct_fact_fields:
  - 日本人・永住者・特別永住者の実子等
  - 引き続き1年以上日本に在留
  - 10年在留原則の特例対象
  - 自動付与ではなく永住許可申請と審査が必要
ai_inferred_fields:
  - 海外生まれの子は別資格（家滞等）取得後、永住申請ルート
needs_review_flags:
  - oversea_birth_route_diff
  - dual_filing_documents_specifics
  - automatic_grant_status_alternative
related_links:
  - title: "ISA — 永住許可に関するガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "実子"
    relation: "official_reference"
evidence_points:
  - claim: "日本人・永住者・特別永住者の実子等は、引き続き1年以上日本に在留している場合、10年在留原則の特例対象となる。"
    source_title: "ISA — 永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "実子"
    display_label: "実子等1年在留特例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

日本人/永住者等の実子等は在留1年以上の10年原則例外がある。

## must_say

- 在留1年以上の例外ルート
- 自動付与ではない
- 許可保証ではない

## injection_format

### injection_certain_block

```text
- 日本人・永住者・特別永住者の実子等については、永住の「原則10年在留」に対する例外がある。
- 公式ガイドラインでは、引き続き1年以上日本に在留していることが示されている。
- これは永住が自動で付与されるという意味ではない。永住許可申請を行い、入管の審査を受ける必要がある。
- 出典: 出入国在留管理庁「永住許可に関するガイドライン」 https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | direct route表現を削除し、実子等1年在留特例としてruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
