---
fact_id: hsp-working-spouse-evidence-structure
title: "高度専門職配偶者就労 — 提出資料の構造"
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
citation_label: "高度専門職配偶者: 提出資料"
citation_summary: "ISA は、就労配偶者の提出資料として活動に応じた申請書・資料、身分関係証明、本人側の在留カード等、代表者申告書などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-006
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職等の就労する配偶者"
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
    - "活動別の完全な材料表"
    - "追加資料要求の予測"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職配偶者就労 — 提出資料の構造を聞く相談"
direct_fact_fields:
  - hsp_working_spouse_evidence_structure
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_working_spouse_evidence_structure_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、就労配偶者の提出資料として活動に応じた申請書・資料、身分関係証明、本人側の在留カード等、代表者申告書などを示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類"
    display_label: "高度専門職配偶者: 提出資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 提出資料の構造

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の就労配偶者の資料は、行う活動に応じた在留資格資料と、配偶者関係・高度専門職等本人を示す資料を組み合わせて確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 配偶者 就劳 材料
- HSP 配偶者 申请材料
- 高度人材 配偶者 所属機関 代表者 申告書
- J-Skip 配偶者 提出書類
- 配偶者工作 结婚证明 在留卡
- 高度専門職 配偶者 资料结构

## must_say

- 材料は結婚証明だけでなく活動対応資料も確認する。

## must_not_say

- 結婚証明と在留カードだけで足りると断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-006 |
