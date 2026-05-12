---
fact_id: permanent-residence-health-insurance-card-transition-materials
title: 永住許可申請 — 健康保険証廃止後のマイナ保険証等資料
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
citation_label: "永住申請の医療保険資料はマイナ保険証対応あり"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、2024年12月2日以降の健康保険証廃止に伴い、マイナ保険証所持者と非所持者の提出資料を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-022
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "8(2) 令和6年12月2日以降の注記"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "マイナポータル操作方法"
    - "医療保険加入資格の個別確認"
  deep_water_candidate: false
applies_when:
  - "用户问健康保险证废止后永住申请提交什么"
does_not_cover:
  - "マイナポータルの具体的な画面操作"
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
  - permanent_residence_health_insurance_card_transition_materials
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "2024年12月2日以降の健康保険証廃止に伴い、マイナ保険証所持者はマイナポータルの資格取得年月日が確認できる画面の写し、非所持者は資格確認証の写しを提出する扱いが示されている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "8(2) 令和6年12月2日以降の注記"
    display_label: "永住申請資料：マイナ保険証又は資格確認証"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 健康保険証廃止後のマイナ保険証等資料

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12. The source note refers to the 2024-12-02 health-insurance-card change.

## current_effective_fact

2024年12月2日以降の健康保険証廃止に伴い、永住許可申請資料では、マイナ保険証所持者はマイナポータルの資格取得年月日が確認できる画面の写し、マイナ保険証非所持者は資格確認証の写しを提出する扱いが示されている。

## exceptions_or_transition

- これらの書類提出が困難な場合は、その理由を記載した理由書を提出する扱いが示されている。

## common_user_phrases

- 永住 マイナ保険証
- 永住 健康保険証 廃止
- 永住 資格確認証
- 永住 マイナポータル 健康保険
- 永住 保険証 ない
- 永住 医保 截图

## must_say

- マイナ保険証所持者と非所持者で提出資料が分かれる。
- 画面写しは資格取得年月日が確認できるものが問題になる。

## must_not_say

- 古い健康保険証だけで常に足りる。
- マイナンバーカードを持っていないと永住申請できない。

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
