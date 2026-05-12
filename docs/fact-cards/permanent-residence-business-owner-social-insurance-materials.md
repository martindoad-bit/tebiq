---
fact_id: permanent-residence-business-owner-social-insurance-materials
title: 永住許可申請 — 社会保険適用事業所の事業主は事業所分の保険料資料も対象
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
citation_label: "永住申請では事業主側の社会保険料資料も問題になる"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、申請時に社会保険適用事業所の事業主である場合、事業所における公的年金及び公的医療保険の保険料資料も提出対象としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-022
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "8(3)"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "社会保険適用事業所該当性の個別判断"
    - "会社側未納が永住審査に与える最終評価"
  deep_water_candidate: true
applies_when:
  - "用户是公司经营者或事业主，问永住申请是否查公司社会保险"
does_not_cover:
  - "会社の社会保険未納がある場合の許可可否"
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
  - 就労資格者等向け永住許可申請
direct_fact_fields:
  - permanent_residence_business_owner_social_insurance_materials
ai_inferred_fields: []
needs_review_flags:
  - id: business_owner_social_insurance_outcome_review
    reason: "事業主側資料の不足や未納の最終評価は専門確認が必要。"
evidence_points:
  - claim: "申請時に社会保険適用事業所の事業主である場合、直近2年間のうち事業主である期間について、事業所における公的年金及び公的医療保険の保険料資料も提出対象として示されている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "8(3)"
    display_label: "永住申請資料：事業主の社会保険料資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 社会保険適用事業所の事業主は事業所分の保険料資料も対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

申請時に社会保険適用事業所の事業主である場合、直近2年間のうち事業主である期間について、事業所における公的年金及び公的医療保険の保険料資料も提出対象として示されている。

## exceptions_or_transition

- 健康保険組合管掌の適用事業所で領収証書の提供が困難な場合の追加資料も示されている。
- 会社側の未納や資料不足の最終評価は、このカードでは判断しない。

## common_user_phrases

- 永住 会社 社会保険
- 経営管理 永住 社保
- 永住 会社の厚生年金
- 永住 事業主 社会保険料
- 永住 会社 未納
- 永住 法人 社保 資料

## must_say

- 申請者が社会保険適用事業所の事業主の場合、個人側だけでなく事業所側資料も問題になる。
- 会社側資料は高リスクなので、未納や不足がある場合は確認が必要。

## must_not_say

- 経営者でも個人の年金資料だけ見れば足りる。
- 会社の社保未納があっても永住には関係ない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-022 |
