---
fact_id: zairyu-tokubetsu-kyoka
title: 在留特別許可 — 退去強制対象者への法務大臣の裁量許可
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留特別許可"
citation_summary: "退去強制対象者でも、日本人配偶者・実子の養育・人道的事情等を理由に、法務大臣の裁量で在留特別許可が出される場合がある。2023年改正で「在留特別許可申請」が明文化。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "オーバーステイ 在留特別許可"
  - "退去強制 救済"
does_not_cover:
  - "退去強制手続自体（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/deportation/procedures/08_00044.html
    label: ISA — 退去強制
    accessed: "2026-05-17"
applies_to:
  - 退去強制対象の外国人
direct_fact_fields:
  - 法務大臣の裁量許可
  - 2023年改正で「在留特別許可申請」明文化
  - 考慮要素：日本人配偶者/実子養育/人道的事情/在日年数/前科有無
  - 申請は法務大臣決定前に可
ai_inferred_fields:
  - 弁護士・行政書士の支援が実務上重要
needs_review_flags:
  - 2023_application_form_specific
  - factors_weight_post_2023
  - failure_consequences
related_links:
  - title: "ISA — 退去強制"
    url: "https://www.moj.go.jp/isa/deportation/procedures/08_00044.html"
    organization: "出入国在留管理庁"
    display_label: "退去強制"
    locator: "在留特別許可"
    relation: "official_reference"
evidence_points:
  - claim: "在留特別許可は退去強制対象者でも法務大臣の裁量で出される場合があり、2023年改正で「申請」が明文化。日本人配偶者・実子養育等が考慮要素。"
    source_title: "ISA — 退去強制"
    source_url: "https://www.moj.go.jp/isa/deportation/procedures/08_00044.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留特別許可"
    display_label: "在留特別許可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

在留特別許可：法務大臣裁量・2023改正で申請明文化。

## must_say

- 法務大臣裁量
- 2023年改正で申請可
- 専門家支援推奨

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
