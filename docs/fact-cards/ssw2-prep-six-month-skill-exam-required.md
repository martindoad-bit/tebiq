---
fact_id: ssw2-prep-six-month-skill-exam-required
title: "特定技能2号準備 — 6月・就労可と試験等要件"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "特定技能2号準備"
citation_summary: "ISA は、特定技能2号への移行準備に時間を要する場合の特定活動（6月・就労可）を説明し、2号に必要な技能試験・日本語能力試験合格及び実務要件を満たしていることを要件に含めている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-017
  authority_layer: L4 ISA SSW Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（特定技能2号準備）"
  source_locator: "要件の概要"
  claim_type: transition_router
  applicable_statuses:
    - "特定活動"
    - "特定技能2号"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "技能試験等未合格者"
    - "実務要件"
    - "分野別要領"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw2-prep
    url: https://www.moj.go.jp/isa/applications/ssw/10_00001
    title: 特定技能関係の特定活動（「特定技能２号」への移行を希望する場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定技能2号への移行準備相談"
direct_fact_fields:
  - ssw2_prep_six_month_skill_exam_required
ai_inferred_fields: []
needs_review_flags:
  - id: ssw2_prep_field_specific_requirements
    reason: "2号の技能試験、実務要件、分野別要領は分野ごとに確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能2号準備の特定活動を説明し、2号に必要な技能試験等の合格及び実務要件を満たすことを要件としている。"
    source_title: "特定技能関係の特定活動（「特定技能２号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00001"
    source_organization: "出入国在留管理庁"
    source_locator: "要件の概要"
    display_label: "特定技能2号準備: 試験等要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号準備 — 6月・就労可と試験等要件

## current_date_logic

Checked against ISA SSW page on 2026-05-12.

## current_effective_fact

特定技能2号準備の特定活動は、移行準備に時間を要する場合の6月・就労可のルートとして説明され、技能試験等合格と実務要件を満たすことが要件に含まれる。

## exceptions_or_transition

- 技能試験や日本語能力試験に合格していない方は要件に適合しないと注意されている。

## common_user_phrases

- 特定技能2号 準備 特定活動
- 特定技能2号 6月 就労可
- 特定技能2号 試験 合格 準備
- 特定技能2号 実務要件
- 特定技能二号 准备 签证

## must_say

- 2号準備は試験等合格と実務要件の確認が重要である。

## must_not_say

- 2号試験に未合格でも準備特定活動を使えると断定する。
- 1号準備と同じ条件だと扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-017 |
