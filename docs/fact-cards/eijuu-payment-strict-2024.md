---
fact_id: eijuu-payment-strict-2024
title: 永住者 — 公租公課不履行と永住許可制度の適正化（要確認）
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住2024改正"
citation_summary: "永住許可制度の適正化に関する公式Q&Aでは、公租公課の支払義務の不履行等が問題となる場合がある。具体的な取消・変更判断は個別事情によるため、このカードは runtime で断定的に使わない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 取消 税金未納"
  - "永住者 義務"
does_not_cover:
  - "永住申請時の納税証明要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html
    label: ISA — 永住許可制度の適正化Q&A
    accessed: "2026-05-17"
applies_to:
  - 永住資格保持者
direct_fact_fields:
  - 永住許可制度の適正化に関する公式Q&Aあり
  - 公租公課の支払義務の不履行等が問題となる場合がある
  - 具体的な取消・変更判断は個別事情による
ai_inferred_fields:
  - 一回の延滞で即取消になるかどうかは個別判断
needs_review_flags:
  - koui_judgment_criteria_official
  - delay_threshold_practice_2026
  - 2024_amendment_effective_date_specific
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "了解書"
    relation: "official_reference"
evidence_points:
  - claim: "永住許可制度の適正化に関する公式Q&Aでは、公租公課の支払義務の不履行等が問題となる場合がある。具体的な取消・変更判断は個別事情による。"
    source_title: "ISA — 永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "了解書"
    display_label: "永住2024改正"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住許可制度の適正化に関する公式Q&Aでは、公租公課の支払義務の不履行等が問題となる場合がある。具体的な取消・変更判断は個別事情による。

## must_say

- 公租公課の支払義務不履行等は問題になり得る
- 具体的な取消・変更判断は個別事情による
- 一回の延滞で即取消などと断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | Codex Loop11 | FACT review に従い、永住申請ページから制度適正化Q&Aへ source repair。取消断定を避ける要確認カードに降温。 | ai_extracted | ai_extracted | loop11-source-repair |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
