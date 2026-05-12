---
fact_id: designated-activities-hsp-spouse-parent-source
title: "特定活動 — 高度専門職等の就労配偶者・親"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: 高度人材家族"
citation_summary: "ISA は特定活動の一類型として、高度専門職等の就労する配偶者、及び高度専門職等又は配偶者の親のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-008
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の就労配偶者・親"
  source_locator: "2つの高度専門職家族関連ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "配偶者の就労範囲"
    - "親の呼寄せ条件"
    - "高度人材側の該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-designated-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の配偶者就労又は親の滞在として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_hsp_spouse_parent_source
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_family_conditions_needs_review
    reason: "配偶者の就労範囲、親の呼寄せ、世帯条件、子の養育等は個別確認が必要。"
evidence_points:
  - claim: "ISA は高度専門職等の就労配偶者と親について、特定活動の個別ページを設けている。"
    source_title: "高度専門職等の家族関連特定活動ページ"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 高度人材家族"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 高度専門職等の就労配偶者・親

## current_date_logic

Checked against the ISA status pages on 2026-05-12.

## current_effective_fact

ISA は高度専門職等の就労配偶者と親について、特定活動の個別ページを設けている。

## exceptions_or_transition

- このカードは、配偶者の就労範囲、親の呼寄せ条件、世帯条件、高度人材側の該当性を判断しない。

## common_user_phrases

- 高度専門職 配偶者 働く
- 高度人材 配偶者 就労 特定活動
- 高度専門職 親 呼び寄せ
- J-Skip 親 呼べる
- 特別高度人材 配偶者 仕事
- 高度人材 家族 特定活動

## must_say

- 高度専門職等の家族関連特定活動は、配偶者就労と親の滞在を分けて確認する。
- 家族滞在一般とは別の特定活動類型として確認する。

## must_not_say

- 高度専門職の家族は全員自由に働ける。
- 高度専門職なら親を常に呼び寄せられる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-008 |
