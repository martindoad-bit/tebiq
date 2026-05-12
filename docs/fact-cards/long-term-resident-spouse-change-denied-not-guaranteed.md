---
fact_id: long-term-resident-spouse-change-denied-not-guaranteed
title: "日配・永配から定住者 — 認められなかった事例の警告"
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
citation_label: "定住者変更は保証されない"
citation_summary: "ISA の資料は、日配・永配から定住者への変更について、認められた事例だけでなく認められなかった事例も掲載しており、離婚・死別・子の有無だけで許可されるものではないことを示す確認資料となる。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-013
  authority_layer: L4 ISA Case PDF
  legal_source_type: official_case_pdf
  law_article_ref: "日配・永配から定住者への変更事例"
  source_locator: "認められなかった事例"
  claim_type: no_automatic_approval_boundary
  applicable_statuses:
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "定住者"
  application_type:
    - status_change
  exclusion_scope:
    - "不許可理由の断定"
    - "個別許可見込み"
    - "救済ルートの判断"
  deep_water_candidate: true
official_sources:
  - id: isa-spouse-to-long-term-resident-cases
    url: https://www.moj.go.jp/isa/content/930002823.pdf
    title: 「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への在留資格変更許可が認められた事例及び認められなかった事例について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "離婚・死別後に定住者変更が必ず通るか聞く相談"
direct_fact_fields:
  - spouse_change_denied_cases_not_guaranteed
ai_inferred_fields: []
needs_review_flags:
  - id: denied_case_reason_review
    reason: "認められなかった理由は個別事情全体で読む必要がある。"
evidence_points:
  - claim: "ISA の資料は、日配・永配から定住者への変更について、認められなかった事例も掲載している。"
    source_title: "日配・永配から定住者への変更事例"
    source_url: "https://www.moj.go.jp/isa/content/930002823.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "認められなかった事例"
    display_label: "定住者変更: 認められなかった事例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日配・永配から定住者 — 認められなかった事例の警告

## current_date_logic

Checked against ISA case PDF on 2026-05-12.

## current_effective_fact

日配・永配から定住者への変更について、ISA は認められた事例だけでなく認められなかった事例も掲載している。

## exceptions_or_transition

- 離婚、死別、子の有無だけで自動的に許可されるものではない。

## common_user_phrases

- 離婚したら 定住者 必ず
- 日配 離婚 定住者 不許可
- 永配 離婚 定住者 通らない
- 子供いる 定住者 確実
- 离婚 转定住者 一定

## must_say

- 認められなかった事例もあるため、個別事情を確認する。

## must_not_say

- 離婚すれば定住者に変更できる。
- 子がいれば必ず許可される。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-013 |
