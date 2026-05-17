---
fact_id: houjin-touki-overview
title: 法人登記 — 株式会社/合同会社/合資会社の選択
state: disabled   # Knowledge Runtime Loop 1 REJECT: source/claim mismatch; company-form guidance blends incorporation facts with visa strategy and must be rewritten before use.
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "法人登記種類"
citation_summary: "日本の法人形態は株式会社、合同会社、合名会社、合資会社等。経営管理ビザでは株式会社/合同会社が一般的。資本金は1円から設立可能だが、経営管理ビザは2025年10月から3000万円以上必要。"
source_display_names:
  - "法務省"
applies_when:
  - "会社設立 種類"
  - "合同会社 株式会社"
does_not_cover:
  - "経営管理ビザの4要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局
    accessed: "2026-05-17"
applies_to:
  - 起業希望者
direct_fact_fields:
  - 株式会社：設立費約24万円、定款認証必要
  - 合同会社：設立費約10万円、定款認証不要
  - 資本金：法律上1円から可
  - 経営管理ビザ：資本金3000万円以上必要（2025-10〜）
  - 登記場所：本店所在地の法務局
ai_inferred_fields:
  - 合同会社は経営管理ビザでも可（株式会社優位ではない）
needs_review_flags:
  - shihon-kin_count_eligible_for_3000man
  - dochiraga_visa_yuri
  - electronic_teikan_practice
related_links:
  - title: "法務省民事局"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "法人登記"
    locator: "会社種類"
    relation: "official_reference"
evidence_points:
  - claim: "日本の法人は株式会社/合同会社/合名/合資会社等。資本金1円から可だが経営管理ビザは3000万円必要（2025-10〜）。"
    source_title: "法務省民事局"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "法人登記"
    display_label: "法人登記種類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

法人：株式会社/合同会社一般・経営管理は3000万円要。

## must_say

- 株式/合同会社が一般
- 資本金1円から可（法律上）
- 経営管理は3000万円必要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Knowledge Runtime Loop 1 | DOMAIN/FACT抽样で source/claim mismatch と実務戦略混在を確認。runtime/material binding から外し、再取材まで disabled。 | ai_extracted | disabled | reject |
