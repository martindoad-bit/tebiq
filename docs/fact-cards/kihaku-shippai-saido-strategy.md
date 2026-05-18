---
fact_id: kihaku-shippai-saido-strategy
title: 在留申請 — 不許可後の再申請ストラテジー
state: disabled
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "不許可後再申請"
citation_summary: "在留申請が不許可となった場合、不許可理由を入管で確認し、不備を修正して再申請可能。再申請までの期間は事案による（在留期限内かを優先確認）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "不許可 再申請"
  - "在留 不許可"
does_not_cover:
  - "上陸特別許可（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 在留申請不許可者
direct_fact_fields:
  - 不許可理由：入管で口頭説明あり
  - 再申請可：不備修正後
  - 在留期限：再申請中も特例期間（更新/変更）が適用される場合あり
  - 専門家相談推奨
ai_inferred_fields:
  - 不許可記録は将来の審査に影響
  - 行政書士・弁護士の活用が実務上重要
needs_review_flags:
  - tokurei-kikan_post_kohukucho_applicability
  - same_reason_resubmission_practical_period
  - shiou_assistance_routes
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "不許可"
    relation: "official_reference"
evidence_points:
  - claim: "在留申請不許可後は入管で不許可理由を確認し、不備修正して再申請可能。在留期限・特例期間の有無を優先確認。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "不許可"
    display_label: "不許可後再申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

不許可後は理由確認＋不備修正で再申請可。

## must_say

- 入管で理由確認
- 在留期限優先確認
- 専門家相談

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop14 | FACT reviewでSOURCE_MISMATCH/UNSUPPORTED判定。不許可後の再申請戦略は既存の深水routeで扱い、このカードはruntime/materialから除外。 | ai_extracted | disabled | loop14-reject |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
