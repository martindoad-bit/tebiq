---
fact_id: eijuu-children-direct-route
title: 永住申請 — 永住者の実子（日本生まれ）は別ルート
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住者実子永住"
citation_summary: "永住者の実子で日本で生まれた者は「永住者の配偶者等」資格で在留。永住権を取得するには改めて永住申請が必要だが、配偶者ルートとほぼ同等の取扱。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者の子 永住"
  - "日本生まれ 子供 永住"
does_not_cover:
  - "永住者の海外生まれ子の取扱"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住者の実子
direct_fact_fields:
  - 永住者の実子（日本生まれ）：「永住者の配偶者等」資格
  - 永住申請：改めて必要（自動付与ではない）
  - 配偶者ルート同等の在留1年で申請可
  - 親が永住申請中なら同時申請が一般的
ai_inferred_fields:
  - 海外生まれの子は別資格（家滞等）取得後、永住申請ルート
needs_review_flags:
  - oversea_birth_route_diff
  - dual_filing_documents_specifics
  - automatic_grant_status_alternative
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "実子"
    relation: "official_reference"
evidence_points:
  - claim: "永住者の実子（日本生まれ）は「永住者の配偶者等」資格で在留。永住権取得には改めて申請必要だが、配偶者ルート同等。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "実子"
    display_label: "永住者実子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住者実子：別ルート申請必要・配偶者ルート同等。

## must_say

- 永住自動付与ではない
- 改めて申請必要
- 配偶者ルート同等

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
