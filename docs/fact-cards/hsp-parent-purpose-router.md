---
fact_id: hsp-parent-purpose-router
title: "高度専門職等の親 — 養育または妊娠支援が目的"
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
citation_label: "高度専門職の親: 目的条件"
citation_summary: "ISA は、高度専門職等の親について、7歳未満の子の養育又は妊娠中の本人・配偶者への支援を目的とする場合を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-007
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の親"
  source_locator: "ページ冒頭・要件"
  claim_type: family_parent_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "老親扶養一般"
    - "短期滞在の親族訪問"
    - "個別許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親 — 養育または妊娠支援が目的を聞く相談"
direct_fact_fields:
  - hsp_parent_purpose_router
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_purpose_router_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の親について、7歳未満の子の養育又は妊娠中の本人・配偶者への支援を目的とする場合を案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭・要件"
    display_label: "高度専門職の親: 目的条件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 養育または妊娠支援が目的

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の親の滞在は、一般的な親の同居や扶養ではなく、7歳未満の子の養育又は妊娠中の本人・配偶者への支援という目的で確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 父母 带孩子
- 高度人材 親 呼び寄せ 目的
- HSP parent childcare
- J-Skip 父母 怀孕 照顾
- 高度人才 接父母 带小孩
- 高度専門職 親 妊娠 支援

## must_say

- 親の滞在は目的条件を先に確認する。

## must_not_say

- 高度専門職なら親を一般扶養目的で呼べる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-007 |
