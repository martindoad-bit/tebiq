---
fact_id: long-term-resident-spouse-divorce-case-router
title: "配偶者等から定住者への変更 — 事例ページにルートする"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "配偶者等から定住者への変更事例"
citation_summary: "ISA は『日本人の配偶者等』又は『永住者の配偶者等』から『定住者』への変更許可が認められた事例及び認められなかった事例の資料を掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-008
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_case_resource
  law_article_ref: "配偶者等から定住者への変更事例"
  source_locator: "認められた事例及び認められなかった事例"
  claim_type: deep_water_router
  applicable_statuses:
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "定住者"
  application_type:
    - status_change
  exclusion_scope:
    - "離婚後に定住者へ変更できるかの結論"
    - "子の養育・同居・収入・在留実績の評価"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが離婚・死別後に定住者へ変更できるか相談している"
does_not_cover:
  - "離婚届出義務"
  - "現在の在留資格取消リスクの全体判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-long-term-resident-status
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-spouse-to-long-term-resident-cases
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00057.html
    title: 「日本人の配偶者等」又は「永住者の配偶者等」から「定住者」への在留資格変更許可が認められた事例及び認められなかった事例について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "配偶者等から定住者への変更相談"
direct_fact_fields:
  - long_term_resident_spouse_divorce_case_router
ai_inferred_fields: []
needs_review_flags:
  - id: case_pdf_detail_pending
    reason: "許可・不許可事例の内容を一般化するにはPDF読取とDOMAINレビューが必要。"
evidence_points:
  - claim: "ISA は、日本人の配偶者等又は永住者の配偶者等から定住者への変更許可が認められた事例及び認められなかった事例の資料を掲載している。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "関連情報リンク"
    display_label: "配偶者等から定住者への変更事例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 配偶者等から定住者への変更 — 事例ページにルートする

## current_date_logic

Checked against ISA status and resource pages on 2026-05-12.

## current_effective_fact

ISA は、日本人の配偶者等又は永住者の配偶者等から定住者への変更許可について、認められた事例及び認められなかった事例の資料を掲載している。

## exceptions_or_transition

- このカードは「離婚したら定住者になれる」とは言わない。
- 子の養育、同居、収入、婚姻期間、在留実績などの個別評価は専門確認に回す。

## common_user_phrases

- 離婚後 定住者 変更
- 離婚後 定住者
- 日本人配偶者 離婚 定住者
- 配偶者 離婚 定住者
- 永住者配偶者 離婚 定住者
- 配偶者ビザから定住者
- 离婚后 定住签证
- 有孩子 离婚 定住者

## must_say

- 配偶者等から定住者への変更は事例があるが、結果は個別事情で分かれる。

## must_not_say

- 離婚したら定住者に必ず変更できる。
- 子どもがいれば必ず許可される。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-008 |
