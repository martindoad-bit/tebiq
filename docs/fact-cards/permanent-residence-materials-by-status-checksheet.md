---
fact_id: permanent-residence-materials-by-status-checksheet
title: 永住許可申請 — 提出資料は現在の在留資格や身分地位で異なる
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "永住申請資料は在留資格や身分地位で異なる"
citation_summary: "ISA の永住許可申請ページは、提出書類は在留資格や身分・地位によって異なるため、チェックシートで確認するよう示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-045
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "申請に当たっての留意事項 重要1"
  claim_type: materials_router
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "すべての永住申請ルートの網羅的書類列挙"
    - "各ルートの許可可否判断"
  deep_water_candidate: false
applies_when:
  - "用户问永住材料是否所有人一样"
does_not_cover:
  - "日本人配偶者等、永住者配偶者等、定住者等の別ページ書類の全量"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-work-materials
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請３
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請
direct_fact_fields:
  - permanent_residence_materials_by_status_checksheet
ai_inferred_fields: []
needs_review_flags:
  - id: other_route_materials_need_separate_cards
    reason: "本カードは資料がルート別に異なるという入口を扱う。別ルートの書類詳細は別カード化が必要。"
evidence_points:
  - claim: "ISA は、提出書類は在留資格や身分・地位によって異なるため、在留資格や身分・地位に応じた資料をチェックシートで確認するよう示している。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請に当たっての留意事項 重要1"
    display_label: "永住申請資料：在留資格や身分地位で異なる"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 提出資料は現在の在留資格や身分地位で異なる

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

ISA は、提出書類は在留資格や身分・地位によって異なるため、在留資格や身分・地位に応じた資料をチェックシートで確認するよう示している。

## exceptions_or_transition

- このカードは「ルートにより資料が異なる」という入口であり、全ルートの資料を一枚で列挙しない。

## common_user_phrases

- 永住 書類 みんな同じ
- 永住 就労資格 書類
- 永住 家族滞在 書類
- 永住 日配 書類 違う
- 永住 チェックシート
- 永住 材料 按签证不同

## must_say

- 永住申請資料は現在の在留資格や身分地位によって異なる。
- 自分のルートに対応するチェックシートを確認する必要がある。

## must_not_say

- 永住の材料は全員同じ。
- 就労資格者向け5年分資料をすべてのルートにそのまま当てはめる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-045 |
