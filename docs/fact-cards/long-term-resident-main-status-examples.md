---
fact_id: long-term-resident-main-status-examples
title: "定住者 — 公式ページの該当例"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "定住者の該当例"
citation_summary: "ISA の定住者ページは、定住者の該当例として第三国定住難民、日系3世、中国残留邦人等を示し、定住者告示第132号を参照している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 平成2年法務省告示第132号"
  source_locator: "在留資格「定住者」 overview"
  claim_type: status_examples
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "個別該当性"
    - "告示外定住者"
    - "許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "定住者の入口分類"
direct_fact_fields:
  - long_term_resident_status_examples
ai_inferred_fields: []
needs_review_flags:
  - id: long_term_resident_not_approval_prediction
    reason: "該当例は入口分類であり、個別許可判断ではない。"
evidence_points:
  - claim: "ISA の定住者ページは、該当例として第三国定住難民、日系3世、中国残留邦人等を示している。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "該当例"
    display_label: "定住者: 公式ページの該当例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 定住者 — 公式ページの該当例

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

定住者ページは、該当例として第三国定住難民、日系3世、中国残留邦人等を示している。

## exceptions_or_transition

- 該当例は入口であり、個別の許可判断ではない。

## common_user_phrases

- 定住者 該当例
- 定住者 どんな人
- 定住者 日系3世
- 定住者 中国残留邦人
- 定住者 告示132号

## must_say

- 定住者は類型ごとに根拠と要件を分けて確認する。

## must_not_say

- 定住者は誰でも事情があれば取れる。
- 該当例だけで許可されると断定する。

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-001 |
