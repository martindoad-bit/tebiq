---
fact_id: kazoku-taizai-shotoku-280
title: 家族滞在 — 扶養能力と収入資料の確認
state: ai_extracted
risk_level: high
confidence: low
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家滞 扶養所得"
citation_summary: "家族滞在では扶養者の在職・収入・預金・生活費支弁能力などが確認される。ISA公式ページに固定の年収額は示されておらず、家族構成や生活状況により個別確認が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家滞 年収 必要"
  - "家族 呼び寄せ 収入"
does_not_cover:
  - "高度人材の家族呼び寄せ（緩和あり）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 家族呼び寄せ予定の在留者
direct_fact_fields:
  - 扶養能力：必要（法定要件）
  - 具体的な固定年収額：ISA公式ページには記載なし
  - 扶養者の収入、預金、住居、家族構成などを確認
  - 預金通帳・住居資料も補強材料になることがある
ai_inferred_fields:
  - 実務目安として語られる金額があるが、公式の固定ラインではない
needs_review_flags:
  - jisshou_amount_2026
  - kazoku_kosei_specific_multiplier
  - kodo_jinzai_specific_relaxation
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "扶養能力"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在では扶養者の在職・収入・預金・生活費支弁能力などが確認される。ISA公式ページに固定の年収額は示されていない。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "扶養能力"
    display_label: "家族滞在の扶養能力確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

家族滞在では扶養者の在職・収入・預金・生活費支弁能力などが確認される。ISA公式ページに固定の年収額は示されていない。

## must_say

- ISA公式ページに固定の年収額はない
- 扶養者の収入、預金、住居、家族構成などを確認する
- 「年収○万円なら必ず許可／必ず不許可」と断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
