---
fact_id: hsp-parent-one-side-only-boundary
title: "高度専門職等の親 — 両方の親を同時に扱わない境界"
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
citation_label: "高度専門職の親: 片方の親"
citation_summary: "ISA は、本人側の親が特定活動34号で在留している場合は配偶者側の親を、配偶者側の親が在留している場合は本人側の親を同時に扱わない条件を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-009
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示34号"
  source_locator: "要件・特定活動告示34号"
  claim_type: family_parent_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "個別世帯の在留状況評価"
    - "特定活動34号の詳細解釈"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親 — 両方の親を同時に扱わない境界を聞く相談"
direct_fact_fields:
  - hsp_parent_one_side_only_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_one_side_only_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、本人側の親が特定活動34号で在留している場合は配偶者側の親を、配偶者側の親が在留している場合は本人側の親を同時に扱わない条件を示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "要件・特定活動告示34号"
    display_label: "高度専門職の親: 片方の親"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 両方の親を同時に扱わない境界

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の親の経路では、本人側の親と配偶者側の親を同時に広げて扱わない条件が示されている。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 双方父母
- J-Skip 两边父母 都来
- HSP 両方の親
- 高度人材 本人父母 配偶者父母
- 特定活動34号 両親
- 高度専門職 父母 同时

## must_say

- 本人側と配偶者側のどちらの親かを分けて確認する。

## must_not_say

- 両方の親を同時に呼べると断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-009 |
