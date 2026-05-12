---
fact_id: long-term-resident-spouse-change-approved-dv-death-business
title: "日配・永配から定住者 — DV・死別・事業継続の事例"
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
citation_label: "DV・死別・事業継続の事例"
citation_summary: "ISA の認められた事例には、家庭内暴力による婚姻関係の事実上の破綻、死別後の事業継続、一定の収入などが特記事項として示されているものがある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-012
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
    - "DV証明"
    - "事実上破綻の認定"
    - "事業継続の必要性"
  deep_water_candidate: true
official_sources:
  - id: isa-spouse-to-long-term-resident-cases
    url: https://www.moj.go.jp/isa/content/930002823.pdf
    title: 「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への在留資格変更許可が認められた事例及び認められなかった事例について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "DV・死別・事業継続を含む配偶者資格から定住者への変更相談"
direct_fact_fields:
  - spouse_change_dv_death_business_case_signals
ai_inferred_fields: []
needs_review_flags:
  - id: dv_death_business_case_individual_review
    reason: "DV、死別、事業継続、収入は証明資料と個別事情の確認が必要。"
evidence_points:
  - claim: "ISA の認められた事例には、家庭内暴力による事実上の破綻、死別後の事業継続、一定の収入などが示されている事例が含まれる。"
    source_title: "日配・永配から定住者への変更事例"
    source_url: "https://www.moj.go.jp/isa/content/930002823.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "認められた事例"
    display_label: "定住者変更事例: DV・死別・事業継続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日配・永配から定住者 — DV・死別・事業継続の事例

## current_date_logic

Checked against ISA case PDF on 2026-05-12.

## current_effective_fact

認められた事例には、家庭内暴力による事実上の破綻、死別後の事業継続、一定の収入などが示されているものがある。

## exceptions_or_transition

- DVや死別があっても、個別事情と資料確認が必要。

## common_user_phrases

- DV 離婚 定住者
- 配偶者 死別 定住者
- 事実上破綻 定住者
- 日配 DV 在留資格変更
- 家暴 离婚 定住者

## must_say

- DV、死別、事実上破綻は事例として存在するが個別確認が必要。

## must_not_say

- DVを主張すれば必ず定住者になる。
- 死別なら自動的に定住者になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-012 |
