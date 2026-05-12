---
fact_id: permanent-residence-resident-tax-five-year-materials
title: 永住許可申請 — 住民税は直近5年分の課税・納税証明が資料対象
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
citation_label: "永住申請の住民税資料は直近5年分"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、直近5年分の住民税の課税又は非課税証明書及び納税証明書を提出資料として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-020
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "7(1)ア"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "永住許可の可否判断"
    - "日本人配偶者等ルートなど別ページの書類年数"
  deep_water_candidate: false
applies_when:
  - "用户问从就劳资格申请永住时住民税材料要几年"
does_not_cover:
  - "直近5年分を出せば永住が许可されるという判断"
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
  - permanent_residence_resident_tax_five_year_materials
ai_inferred_fields: []
needs_review_flags:
  - id: other_pr_routes_may_differ
    reason: "本カードは就労資格者等向けページの資料年数に限定する。"
evidence_points:
  - claim: "就労資格者等向け永住許可申請では、直近5年分の住民税の課税又は非課税証明書及び納税証明書が提出資料として掲げられている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7(1)ア"
    display_label: "永住申請資料：住民税は直近5年分"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 住民税は直近5年分の課税・納税証明が資料対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

就労資格者等向け永住許可申請では、直近5年分の住民税の課税又は非課税証明書及び納税証明書が提出資料として掲げられている。

## exceptions_or_transition

- 市区町村で直近5年分の証明書が発行されない場合は、発行される最長期間分を提出する扱いが示されている。
- 入国後間もない場合や転居等で証明書が発行されない場合は、地方出入国在留管理官署への確認が必要。

## common_user_phrases

- 永住 住民税 何年分
- 永住 納税証明 5年
- 永住 課税証明書
- 永住 税証明 直近5年
- 永住 就労資格 書類 税
- 永住 住民税証明 出せない

## must_say

- この資料年数は就労資格者等向けページの扱い。
- 証明書は材料であり、提出だけで許可を保証しない。

## must_not_say

- 5年分の住民税資料があれば必ず永住できる。
- すべての永住申請ルートで同じ年数だと断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-020 |
