---
fact_id: permanent-residence-self-checksheet-no-approval-guarantee
title: 永住許可申請 — セルフチェックで全部はいでも許可保証ではない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "永住セルフチェックは許可保証ではない"
citation_summary: "ISA の永住許可申請ページは、セルフチェックシートで一つでもいいえに該当した場合は不許可となる可能性が高くなる一方、いいえが一つもなくても許可を約束するものではないと示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-004
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "申請に当たっての留意事項 重要2"
  claim_type: permission_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "セルフチェック結果による許可予測"
    - "個別申請の不許可断定"
  deep_water_candidate: true
applies_when:
  - "用户问材料、条件都满足是不是永住一定能下"
does_not_cover:
  - "セルフチェックの各項目の個別評価"
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
  - permanent_residence_self_checksheet_no_approval_guarantee
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "永住許可申請セルフチェックシートについて、ISA は一つでもいいえに該当した場合は不許可となる可能性が高くなる一方、いいえが一つもなくても許可を約束するものではないと示している。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請に当たっての留意事項 重要2"
    display_label: "永住セルフチェック：許可保証ではない"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — セルフチェックで全部はいでも許可保証ではない

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

永住許可申請セルフチェックシートについて、ISA は一つでもいいえに該当した場合は不許可となる可能性が高くなる一方、いいえが一つもなくても永住許可申請の許可を約束するものではないと示している。

## exceptions_or_transition

- このカードは「許可保証ではない」という境界を扱い、各チェック項目の個別適合性は扱わない。

## common_user_phrases

- 永住 セルフチェック 全部はい
- 永住 条件 全部満たす
- 永住 材料全部ある 通る
- 永住 必ず許可
- 永住 不許可 可能性
- 永住 チェックシート いいえ

## must_say

- セルフチェックで全部はいでも許可保証ではない。
- いいえがある場合は不許可となる可能性が高くなると示されている。

## must_not_say

- セルフチェックで全部はいなら必ず許可。
- 一つでもいいえなら必ず不許可と断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-004 |
