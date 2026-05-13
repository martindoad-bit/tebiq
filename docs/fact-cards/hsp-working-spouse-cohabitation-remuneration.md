---
fact_id: hsp-working-spouse-cohabitation-remuneration
title: "高度専門職配偶者就労 — 同居と同等報酬"
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
citation_label: "高度専門職配偶者: 同居と報酬"
citation_summary: "ISA は、高度専門職等の就労配偶者として許可を受けるには同居し、日本人と同等額以上の報酬を受けることが必要だと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-004
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職等の就労する配偶者"
  source_locator: "ページ説明・要件"
  claim_type: family_work_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "報酬額の個別相当性"
    - "別居理由の個別評価"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職配偶者就労 — 同居と同等報酬を聞く相談"
direct_fact_fields:
  - hsp_working_spouse_cohabitation_remuneration
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_working_spouse_cohabitation_remuneration_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の就労配偶者として許可を受けるには同居し、日本人と同等額以上の報酬を受けることが必要だと説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ説明・要件"
    display_label: "高度専門職配偶者: 同居と報酬"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 同居と同等報酬

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の就労配偶者は、高度専門職等本人と同居し、日本人が同種業務で受ける報酬と同等額以上の報酬を受けることが条件として示されている。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 配偶者 同居 報酬
- HSP 配偶者 同居 条件
- 高度人材 配偶者 日本人 同等報酬
- 高度専門職 配偶者 salary condition
- 配偶者 分居 报酬
- J-Skip 配偶者 同居 報酬

## must_say

- 同居と同等額以上の報酬は別々に確認する。

## must_not_say

- 婚姻関係があれば同居や報酬条件は関係ない。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-004 |
