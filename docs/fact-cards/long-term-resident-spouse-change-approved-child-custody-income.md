---
fact_id: long-term-resident-spouse-change-approved-child-custody-income
title: "日配・永配から定住者 — 子の監護養育・収入がある事例"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "子の監護養育と収入の事例"
citation_summary: "ISA の認められた事例には、日本人実子の監護・養育実績、養育費支払い、一定の収入などが特記事項として示されている事例が含まれる。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-011
  authority_layer: L4 ISA Case PDF
  legal_source_type: official_case_pdf
  law_article_ref: "日配・永配から定住者への変更事例"
  source_locator: "認められた事例"
  claim_type: case_factor_signal
  applicable_statuses:
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "定住者"
  application_type:
    - status_change
  exclusion_scope:
    - "親権・監護の個別判断"
    - "収入十分性"
    - "許可保証"
  deep_water_candidate: true
official_sources:
  - id: isa-spouse-to-long-term-resident-cases
    url: https://www.moj.go.jp/isa/content/930002823.pdf
    title: 「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への在留資格変更許可が認められた事例及び認められなかった事例について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "離婚後に子の監護養育を理由に定住者変更を検討する相談"
direct_fact_fields:
  - spouse_change_child_custody_income_case_signals
ai_inferred_fields: []
needs_review_flags:
  - id: custody_income_case_not_rule
    reason: "監護養育実績や収入の評価は個別事情で異なる。"
evidence_points:
  - claim: "ISA の認められた事例には、日本人実子の監護・養育実績、養育費の支払い、一定の収入が特記事項として示されている事例が含まれる。"
    source_title: "日配・永配から定住者への変更事例"
    source_url: "https://www.moj.go.jp/isa/content/930002823.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "認められた事例"
    display_label: "定住者変更事例: 子の監護養育・収入"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日配・永配から定住者 — 子の監護養育・収入がある事例

## current_date_logic

Checked against ISA case PDF on 2026-05-12.

## current_effective_fact

認められた事例には、日本人実子の監護・養育実績、養育費支払い、一定の収入などが特記事項として示されているものがある。

## exceptions_or_transition

- これは事例であり、子がいるだけで許可されるという意味ではない。

## common_user_phrases

- 離婚 日本人 子供 定住者
- 日本人実子 監護 養育 定住者
- 養育費 定住者 変更
- 日配 離婚 子供 在留
- 离婚 有日本孩子 转定住者

## must_say

- 子の監護養育や収入は事例上の要素として慎重に扱う。

## must_not_say

- 日本人の子がいれば必ず定住者になる。
- 養育費を払えば必ず許可される。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-011 |
