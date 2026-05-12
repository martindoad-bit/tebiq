---
fact_id: long-term-resident-nikkei-spouse-router
title: "定住者 — 日系2世・3世の配偶者路径"
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
citation_label: "日系2世・3世配偶者の定住者ページ"
citation_summary: "ISA の定住者ページは、日系2世の配偶者、日系3世の配偶者に関する個別ページを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『定住者』日系配偶者ページ"
  source_locator: "日系2世の配偶者 / 日系3世の配偶者"
  claim_type: subtype_router
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "婚姻実態の判断"
    - "配偶者本人の日系証明"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが日系人の配偶者として定住者を検討している"
does_not_cover:
  - "日本人配偶者等"
  - "離婚後の配偶者資格変更"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 3
  self_verification_passed_at:
official_sources:
  - id: isa-long-term-resident-status
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-long-term-resident-nikkei-second-spouse
    url: https://www.moj.go.jp/isa/applications/status/longtermresident01.html
    title: 在留資格「定住者」（日系２世の配偶者の場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-long-term-resident-nikkei-third-spouse
    url: https://www.moj.go.jp/isa/applications/status/logntermresident03.html
    title: 在留資格「定住者」（日系３世の配偶者の場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系2世・3世の配偶者の定住者相談"
direct_fact_fields:
  - long_term_resident_nikkei_spouse_router
ai_inferred_fields: []
needs_review_flags:
  - id: marriage_substance_review
    reason: "婚姻実態や扶養状況は個別確認が必要。"
evidence_points:
  - claim: "ISA の定住者ページは、日系2世の配偶者及び日系3世の配偶者の場合の個別ページを掲げている。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "日系2世の配偶者 / 日系3世の配偶者"
    display_label: "定住者: 日系配偶者路径"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 日系2世・3世の配偶者路径

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、日系2世の配偶者及び日系3世の配偶者の場合の定住者個別ページを設けている。

## exceptions_or_transition

- 婚姻実態、配偶者の日系関係、扶養・生活状況は別途確認が必要。
- 日本人配偶者等や永住者配偶者等とは別の路径である。

## common_user_phrases

- 日系2世の配偶者 定住者
- 日系2世の配偶者
- 日系3世の配偶者 定住者
- 日系3世の配偶者
- 日系人の妻 定住ビザ
- 日系人の夫 定住者
- 日裔配偶者 定住签证

## must_say

- 日系2世・3世の配偶者路径は専用ページで確認する。

## must_not_say

- 日系人と結婚していれば必ず定住者になる。
- 日本人配偶者等と同じ扱いだと説明する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-005 |
