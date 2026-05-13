---
fact_id: jskip-working-spouse-expanded-activity-scope
title: "J-Skip配偶者就労 — 拡大された活動範囲"
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
citation_label: "J-Skip配偶者: 拡大範囲"
citation_summary: "ISA は特別高度人材の就労配偶者について、教授、芸術、宗教、報道、研究、教育、技術・人文知識・国際業務、興行、技能などを対象としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-003
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示別表第5の2"
  source_locator: "特別高度人材外国人の就労する配偶者・要件"
  claim_type: family_work_scope
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "個別職務の該当性"
    - "同居・報酬条件の充足判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip配偶者就労 — 拡大された活動範囲を聞く相談"
direct_fact_fields:
  - jskip_working_spouse_expanded_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_working_spouse_expanded_activity_scope_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は特別高度人材の就労配偶者について、教授、芸術、宗教、報道、研究、教育、技術・人文知識・国際業務、興行、技能などを対象としている。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特別高度人材外国人の就労する配偶者・要件"
    display_label: "J-Skip配偶者: 拡大範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip配偶者就労 — 拡大された活動範囲

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

J-Skipの就労配偶者は通常の高度専門職配偶者より広い活動範囲が示されているが、同居と同等報酬などの条件は別途確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- J-Skip 配偶者 活动范围
- 特別高度人材 配偶者 教授 芸術 技能
- J-Skip 配偶者 技能
- 特別高度人材 配偶者 就労 範囲
- J-Skip spouse work scope
- J-Skip 配偶者 可以工作吗

## must_say

- J-Skip配偶者の活動範囲は通常の高度専門職配偶者と分ける。

## must_not_say

- J-Skip配偶者なら全ての職種に無条件で就ける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-003 |
