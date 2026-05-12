---
fact_id: long-term-resident-notice-source-anchor
title: "定住者告示 — 定住者の地位を定める告示"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "定住者告示"
citation_summary: "ISA の関係法令ページは、定住者告示を『入管法別表第二の定住者の項の下欄に掲げる地位を定める件』として掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-001
  authority_layer: L3 Notice
  legal_source_type: official_notice_page
  law_article_ref: "平成2年法務省告示第132号"
  source_locator: "定住者告示ページ"
  claim_type: authority_boundary
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別の定住者該当性判断"
    - "告示外裁量ケースの可否"
    - "申請許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが定住者の公式根拠を聞いている"
does_not_cover:
  - "定住者に変更できるかどうか"
  - "配偶者離婚後の許可可否"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-legal-index
    url: https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja
    title: 出入国管理関係法令等
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-long-term-resident-notice
    url: https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h07-01-01.html
    title: 出入国管理及び難民認定法第七条第一項第二号の規定に基づき同法別表第二の定住者の項の下欄に掲げる地位を定める件
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "定住者の法源確認"
direct_fact_fields:
  - long_term_resident_notice_source_anchor
ai_inferred_fields: []
needs_review_flags:
  - id: notice_pdf_detail_normalization
    reason: "告示本文の番号ごとの条件は別カードで正規化する。"
evidence_points:
  - claim: "ISA の関係法令ページは定住者告示を掲載し、定住者の項の下欄に掲げる地位を定める件として示している。"
    source_title: "出入国管理関係法令等"
    source_url: "https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "定住者告示リンク"
    display_label: "定住者告示の公式掲載"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者告示 — 定住者の地位を定める告示

## current_date_logic

Checked against ISA legal-index and notice pages on 2026-05-12.

## current_effective_fact

定住者告示は、入管法別表第二の定住者の項に関する地位を定める L3 告示ソースである。

## exceptions_or_transition

- 告示の存在は、個別の定住者該当性や許可可能性を意味しない。
- 配偶者離婚後などの告示外・裁量的な相談は別ソースと専門確認が必要。

## common_user_phrases

- 定住者告示とは
- 定住者告示
- 第132号
- 定住者の公式根拠
- 定住者 根拠
- 定住者 法務省告示
- 定住者 告示 第132号
- 定住者 官方依据

## must_say

- 定住者の具体路径は告示・ISA個別ページ・個別事情を分けて確認する。

## must_not_say

- 告示に名前があるから必ず定住者になれる。
- 定住者告示と離婚後裁量ケースを同じものとして扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-001 |
