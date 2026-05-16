---
fact_id: eijuu-letterofunderstanding-2021
title: 永住申請 — 了解書（2021年10月〜必須・多言語版あり）
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住了解書"
citation_summary: "2021年10月1日から永住申請に必須となった了解書。公租公課等の納付義務遵守を誓約する書類。多言語版あり（中国語・英語等）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "了解書 永住"
  - "永住 多言語"
does_not_cover:
  - "了解書違反時の取消事由"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 必須化：2021年10月1日〜
  - 内容：公租公課等の納付義務遵守の誓約
  - 多言語版：中国語、英語、韓国語等
  - 永住許可後も効力（2024年改正で取消事由化）
ai_inferred_fields:
  - 署名のみで実質拘束効力
needs_review_flags:
  - 2024_torikeshi_specific_effect_date
  - language_versions_complete_list
  - signature_alternative_method
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "了解書"
    relation: "official_reference"
evidence_points:
  - claim: "了解書は2021年10月1日から永住申請に必須。公租公課等の納付義務遵守を誓約。多言語版あり。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "了解書"
    display_label: "永住了解書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

了解書：2021-10-01から永住申請必須・多言語版あり。

## must_say

- 2021-10-01〜必須
- 公租公課遵守の誓約
- 多言語版

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
