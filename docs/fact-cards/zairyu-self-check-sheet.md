---
fact_id: zairyu-self-check-sheet
title: 永住セルフチェックシート — ISA推奨の事前確認資料
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住セルフチェック"
citation_summary: "ISAは永住申請者向けに「永住許可申請セルフチェックシート」を公開。在留期間・納税・年金・素行等の事前確認に有用。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 セルフチェック"
  - "永住 自己診断"
does_not_cover:
  - "セルフチェックの法的拘束力（参考のみ）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請検討者
direct_fact_fields:
  - 提供：ISA公式サイト
  - 内容：在留期間、納税、年金、素行等の確認項目
  - 推奨：申請前の事前確認
  - 法的拘束力なし（参考資料）
ai_inferred_fields:
  - 行政書士・弁護士の事前相談と併用が実務上有効
needs_review_flags:
  - sheet_version_2026_specific
  - language_versions_available
  - online_version_link_specifics
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "セルフチェック"
    relation: "official_reference"
evidence_points:
  - claim: "ISAは永住申請者向けに「永住許可申請セルフチェックシート」を公開。在留期間・納税・年金・素行等の事前確認に有用。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "セルフチェック"
    display_label: "永住セルフチェック"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住セルフチェックシート：ISA公開・事前確認用。

## must_say

- ISA公開
- 事前確認推奨
- 法的拘束力なし

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
