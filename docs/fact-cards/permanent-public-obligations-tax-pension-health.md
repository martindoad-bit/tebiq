---
fact_id: permanent-public-obligations-tax-pension-health
title: 永住許可ガイドライン — 納税・年金・医療保険など公的義務の履行
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住ガイドラインの公的義務履行"
citation_summary: "ISA の永住許可ガイドラインは、日本国の利益に合することの中で、納税、公的年金、公的医療保険、入管法上の届出などの公的義務を適正に履行していることを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-010
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)イ"
  claim_type: duty_requirement
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "年金免除・猶予の個別評価"
    - "資料提出だけによる許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问税、年金、医保是否影响永住"
does_not_cover:
  - "年金免除・猶予是否等于适正履行"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_public_obligations_tax_pension_health
ai_inferred_fields: []
needs_review_flags:
  - id: pension_exemption_deferment_requires_domain
    reason: "年金免除・猶予の扱いはガイドライン本文に明示がなく、DOMAIN確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、日本国の利益に合することの中で、納税、公的年金、公的医療保険、入管法上の届出などの公的義務を適正に履行していることを掲げている。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)イ"
    display_label: "永住ガイドライン：納税・公的年金・公的医療保険等の履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 納税・年金・医療保険など公的義務の履行

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、日本国の利益に合することの中で、納税、公的年金、公的医療保険、入管法上の届出などの公的義務を適正に履行していることを掲げている。

## exceptions_or_transition

- 年金免除・猶予の扱いは本カードでは断定しない。
- 証明資料がそろっても永住許可が保証されるわけではない。

## common_user_phrases

- 永住 年金 税金 保険
- 永住 公的義務
- 永住 年金免除
- 永住 健康保険 未納
- 永住 住民税 年金 医保
- 永住 税年金 都交了

## must_say

- 納税、公的年金、公的医療保険などは国益適合の中で扱われる。
- 免除・猶予や未納・遅延は個別確認が必要。

## must_not_say

- 税・年金・保険資料があれば必ず許可される。
- 年金免除は必ず安全又は必ず不許可。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-010 |
