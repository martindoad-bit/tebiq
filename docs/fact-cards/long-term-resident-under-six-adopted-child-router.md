---
fact_id: long-term-resident-under-six-adopted-child-router
title: "定住者 — 6歳未満の養子路径"
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
citation_label: "6歳未満の養子の定住者ページ"
citation_summary: "ISA の定住者ページは、日本人・永住者・定住者・特別永住者の扶養を受けて生活する6歳未満の養子の場合の個別ページを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『定住者』6歳未満の養子ページ"
  source_locator: "6歳未満の養子"
  claim_type: subtype_router
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "養子縁組の有効性"
    - "扶養実態"
    - "年齢到達前後の期限管理"
  deep_water_candidate: true
applies_when:
  - "ユーザーが養子を定住者として呼ぶ相談をしている"
does_not_cover:
  - "特別養子や日本人の配偶者等路径"
  - "民法上の養子縁組要件"
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
  - id: isa-long-term-resident-adopted-child
    url: https://www.moj.go.jp/isa/applications/status/longtermresident05.html
    title: 在留資格「定住者」（6歳未満の養子である場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "6歳未満の養子の定住者相談"
direct_fact_fields:
  - long_term_resident_under_six_adopted_child_router
ai_inferred_fields: []
needs_review_flags:
  - id: adoption_validity_requires_domain
    reason: "養子縁組の有効性や国際私法上の扱いは別確認が必要。"
evidence_points:
  - claim: "ISA の定住者ページは、対象資格者の扶養を受けて生活する6歳未満の養子の場合の個別ページを掲げている。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "6歳未満の養子"
    display_label: "定住者: 6歳未満の養子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 6歳未満の養子路径

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、日本人・永住者・定住者・特別永住者の扶養を受けて生活する6歳未満の養子の場合の定住者個別ページを設けている。

## exceptions_or_transition

- 養子縁組の有効性、扶養実態、年齢管理は個別確認が必要。

## common_user_phrases

- 養子 定住者 6歳
- 6歳未満 養子
- 6歳未満 養子 定住ビザ
- 永住者 養子 呼び寄せ
- 日本人 養子 定住者
- 收养 小孩 定住签证

## must_say

- 養子路径は6歳未満という条件と扶養者資格を分けて確認する。

## must_not_say

- 養子なら年齢に関係なく定住者にできる。
- 養子縁組があれば必ず在留が認められる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-007 |
