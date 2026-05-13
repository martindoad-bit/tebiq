---
fact_id: hsp-parent-evidence-boundary
title: "高度専門職等の親 — 証明資料の構造"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "高度専門職の親: 提出資料"
citation_summary: "ISA は、高度専門職等の親について、世帯年収、同居、親族関係、7歳未満の子又は妊娠を示す資料などを申請類型ごとに案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-011
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の親"
  source_locator: "提出書類"
  claim_type: materials_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "完全な材料表"
    - "外国文書翻訳の個別要否"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親 — 証明資料の構造を聞く相談"
direct_fact_fields:
  - hsp_parent_evidence_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_evidence_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の親について、世帯年収、同居、親族関係、7歳未満の子又は妊娠を示す資料などを申請類型ごとに案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類"
    display_label: "高度専門職の親: 提出資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 証明資料の構造

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の親の資料は、世帯年収、同居、親族関係、7歳未満の子又は妊娠を示す資料を、申請類型ごとに確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 親 材料
- HSP parent documents
- 高度人材 父母 亲属关系 证明
- J-Skip 父母 母子健康手帳
- 父母 特定活動 提出書類
- 高度専門職 親 世帯年収 証明

## must_say

- 養育目的と妊娠支援目的で証明資料を分けて確認する。

## must_not_say

- 親子関係証明だけで足りると断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-011 |
