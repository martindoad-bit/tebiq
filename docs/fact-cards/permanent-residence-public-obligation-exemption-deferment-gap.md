---
fact_id: permanent-residence-public-obligation-exemption-deferment-gap
title: 永住許可申請 — 年金免除・猶予は期限後納付とは別論点
state: ai_extracted
risk_level: critical
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "年金免除・猶予は永住申請で要確認"
citation_summary: "ISA の永住許可ガイドラインは公的年金等の公的義務履行と期限後納付の消極評価を示しているが、確認した公式ページだけでは年金免除・猶予の一般的評価を断定できない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-044
  authority_layer: L3 Official Guideline / L4 ISA Procedure Page
  legal_source_type: official_guideline_and_procedure_page
  law_article_ref: "永住許可に関するガイドライン / 永住許可申請３"
  source_locator: "ガイドライン1(3)イ及び永住許可申請3の8(1)"
  claim_type: source_gap
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "年金免除・猶予が安全か危険かの断定"
    - "個別年金記録の評価"
  deep_water_candidate: true
applies_when:
  - "用户问年金免除、猶予、学生纳付特例是否影响永住"
does_not_cover:
  - "承認済み免除・猶予期間の永住審査上の最終評価"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-pr-work-materials
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請３
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請
direct_fact_fields:
  - public_obligation_and_late_payment_guideline
ai_inferred_fields:
  - pension_exemption_deferment_gap_scope
needs_review_flags:
  - id: pension_exemption_deferment_domain_review
    reason: "公的年金の免除・猶予が永住許可審査でどう評価されるかは、確認済み公式ページだけでは断定しない。"
evidence_points:
  - claim: "永住許可ガイドラインは、公的年金を含む公的義務の適正な履行と、当初の納付期間内に履行されていない場合の消極評価を示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)イ"
    display_label: "永住ガイドライン：公的義務と期限内履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "確認した ISA の永住関連ページだけでは、承認済みの年金免除・猶予を永住審査で常に安全又は常に不利とする一般ルールは確認できない。"
    source_title: "永住許可に関するガイドライン / 永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "公的義務及び公的年金資料の記載範囲"
    display_label: "永住申請：年金免除・猶予は別途確認"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

# 永住許可申請 — 年金免除・猶予は期限後納付とは別論点

## current_date_logic

Checked against the ISA permanent residence guideline and work-status application page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、公的年金を含む公的義務の適正な履行と、当初の納付期間内に履行されていない場合の消極評価を示している。一方で、確認した ISA の永住関連ページだけでは、承認済みの年金免除・猶予を永住審査で常に安全又は常に不利とする一般ルールは確認できない。

## exceptions_or_transition

- 年金免除・猶予は「期限後納付」と同じ言葉で扱わない。
- 学生納付特例、失業等による免除、納付猶予などの個別事情は別途確認が必要。

## common_user_phrases

- 永住 年金免除
- 永住 年金猶予
- 永住 学生納付特例
- 永住 年金 承認済み免除
- 永住 年金 免除なら大丈夫
- 永住 年金 猶予 不利

## must_say

- 年金免除・猶予は期限後納付とは別論点。
- 確認した公式ページだけでは、安全又は不利を断定しない。

## must_not_say

- 承認済み免除なら永住に必ず影響しない。
- 猶予や免除があると永住は必ず不許可。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-044 |
