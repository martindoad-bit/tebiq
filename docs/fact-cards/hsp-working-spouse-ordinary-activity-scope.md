---
fact_id: hsp-working-spouse-ordinary-activity-scope
title: "高度専門職配偶者就労 — 通常制度の活動範囲"
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
citation_label: "高度専門職配偶者: 通常制度の範囲"
citation_summary: "ISA は通常の高度専門職外国人の就労配偶者について、研究、教育、技術・人文知識・国際業務、一定の興行関連活動を対象としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-002
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示別表第5"
  source_locator: "高度専門職外国人の就労する配偶者・要件"
  claim_type: family_work_scope
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "J-Skip配偶者の拡大範囲"
    - "各活動の詳細な在留資格該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職配偶者就労 — 通常制度の活動範囲を聞く相談"
direct_fact_fields:
  - hsp_working_spouse_ordinary_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_working_spouse_ordinary_activity_scope_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は通常の高度専門職外国人の就労配偶者について、研究、教育、技術・人文知識・国際業務、一定の興行関連活動を対象としている。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職外国人の就労する配偶者・要件"
    display_label: "高度専門職配偶者: 通常制度の範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 通常制度の活動範囲

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

通常の高度専門職外国人の就労配偶者は、研究、教育、技術・人文知識・国際業務、一定の興行関連活動など、指定された範囲で確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 普通高度専門職 配偶者 活動範囲
- 高度専門職 配偶者 研究 教育 技人国
- HSP 配偶者 研究 教育
- 高度専門職 配偶者 技術 人文 国際
- 高度専門職 配偶者 興行
- 通常高度人材 配偶者 工作范围

## must_say

- 通常の高度専門職配偶者とJ-Skip配偶者の活動範囲を分ける。

## must_not_say

- 通常の高度専門職配偶者にもJ-Skipと同じ範囲を当然に認める。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-002 |
