---
fact_id: hsp-working-spouse-not-unconditional
title: "高度専門職配偶者就労 — 無条件ではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "高度専門職配偶者: 就労条件"
citation_summary: "ISA は、高度専門職等の配偶者就労を特定活動として案内し、活動範囲、同居、同等額以上の報酬などの条件を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-001
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の就労する配偶者"
  source_locator: "ページ冒頭・要件"
  claim_type: family_work_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "個別職務の該当性"
    - "許可見込み"
    - "配偶者側の具体的雇用契約評価"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職配偶者就労 — 無条件ではないを聞く相談"
direct_fact_fields:
  - hsp_working_spouse_not_unconditional
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_working_spouse_not_unconditional_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の配偶者就労を特定活動として案内し、活動範囲、同居、同等額以上の報酬などの条件を示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭・要件"
    display_label: "高度専門職配偶者: 就労条件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 無条件ではない

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の配偶者就労は無条件の自由就労ではなく、特定活動として指定された活動範囲と条件を満たす必要がある。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度人才配偶能工作吗
- HSP spouse work
- 高度専門職 配偶者 働けますか
- 高度人材 配偶者 就労 条件
- 配偶者 随便工作
- 高度専門職 配偶者 特定活動

## must_say

- 配偶者就労は普通の家族滞在と分けて確認する。
- 活動範囲、同居、報酬条件を分けて確認する。

## must_not_say

- 高度専門職の配偶者なら自由に何でも働ける。
- 家族滞在だけで全職就労できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-001 |
