---
fact_id: long-term-resident-spouse-change-cases-source
title: "日配・永配から定住者 — 公式事例資料"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "配偶者資格から定住者への変更事例"
citation_summary: "ISA は、在留資格関係ページで「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への変更が認められた事例及び認められなかった事例の資料を掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-010
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "日配・永配から定住者への変更事例"
  source_locator: "在留資格関係 / 在留資格変更許可及び在留期間更新許可"
  claim_type: case_source_anchor
  applicable_statuses:
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "定住者"
  application_type:
    - status_change
  exclusion_scope:
    - "個別許可見込み"
    - "類似事例の自動適用"
    - "配偶者届出"
  deep_water_candidate: true
official_sources:
  - id: isa-residence-status-resources
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00006.html
    title: 在留資格関係
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-spouse-to-long-term-resident-cases
    url: https://www.moj.go.jp/isa/content/930002823.pdf
    title: 「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への在留資格変更許可が認められた事例及び認められなかった事例について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日配・永配から定住者への変更相談"
direct_fact_fields:
  - spouse_to_long_term_resident_cases_source
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_change_cases_not_rule
    reason: "掲載事例は判断材料であり、同様事情の許可を保証しない。"
evidence_points:
  - claim: "ISA は、日配・永配から定住者への変更が認められた事例及び認められなかった事例の資料を掲載している。"
    source_title: "在留資格関係"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00006.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格変更許可及び在留期間更新許可"
    display_label: "日配・永配から定住者: 公式事例資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日配・永配から定住者 — 公式事例資料

## current_date_logic

Checked against ISA resource page and PDF on 2026-05-12.

## current_effective_fact

ISA は、日本人の配偶者等又は永住者の配偶者等から定住者への変更について、認められた事例と認められなかった事例の資料を掲載している。

## exceptions_or_transition

- 事例は自動ルールではなく、個別事情の比較資料として扱う。

## common_user_phrases

- 日配 離婚 定住者 事例
- 永配 死別 定住者 変更
- 日本人配偶者 離婚後 定住者
- 配偶者ビザ 破綻 定住者
- 离婚后 转 定住者 案例

## must_say

- 公式事例は参考であり、同じ事情なら必ず許可されるものではない。

## must_not_say

- 離婚すれば定住者に変えられる。
- 事例と似ていれば必ず通る。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-010 |
