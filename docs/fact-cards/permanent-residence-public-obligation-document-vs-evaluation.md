---
fact_id: permanent-residence-public-obligation-document-vs-evaluation
title: 永住申請 — 公的義務の証明資料と審査評価を分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "公的義務の資料と評価の区別"
citation_summary: "永住許可申請ページは税・年金・公的医療保険の証明資料を列挙し、永住許可ガイドラインは公的義務の適正履行を国益適合性の判断要素として示している。資料提出と審査評価を分けて扱う。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-067
  authority_layer: L4 ISA Procedure Page / L4 Guideline
  legal_source_type: official_procedure_guideline
  law_article_ref: "永住許可申請 / 永住許可に関するガイドライン"
  source_locator: "税・年金・公的医療保険資料 / 公的義務履行"
  claim_type: review_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "未納、免除、猶予、補納の個別評価"
    - "許可可能性判断"
  deep_water_candidate: true
applies_when:
  - "用户把税年金医保材料与能不能获批混在一起问"
does_not_cover:
  - "年金免除・猶予や補缴后的具体审查影响"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-application-employed
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請（就労関係の在留資格）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請者
direct_fact_fields:
  - permanent_residence_public_obligation_document_vs_evaluation
ai_inferred_fields: []
needs_review_flags:
  - id: public_obligation_individual_evaluation_review
    reason: "未納、遅延、免除、猶予、補納、差押えなどは個別評価が必要。"
evidence_points:
  - claim: "永住許可申請ページは税・年金・公的医療保険の証明資料を列挙し、永住許可ガイドラインは公的義務の適正履行を国益適合性の判断要素として示している。資料提出と審査評価を分けて扱う。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "国益適合性 / 公的義務履行"
    display_label: "永住申請：公的義務の資料と評価"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住申請 — 公的義務の証明資料と審査評価を分ける

## current_date_logic

Checked against the ISA permanent-residence application page and guideline on 2026-05-12.

## current_effective_fact

永住許可申請ページは税・年金・公的医療保険の証明資料を列挙し、永住許可ガイドラインは公的義務の適正履行を国益適合性の判断要素として示している。資料提出と審査評価を分けて扱う。

## exceptions_or_transition

- 年金免除・猶予、分納、補納、差押えの扱いは個別確認が必要。

## common_user_phrases

- 永住 税 年金 医保 材料 審査
- 永住 税金 年金 証明 出せば大丈夫
- 永住 公的義務 証明資料 評価
- 永住 年金免除 猶予 影响
- 永住 补缴 风险清零
- 永住 税金材料 和 审查

## must_say

- 公的義務の証明資料と審査評価は分ける。
- 未納、遅延、免除、猶予などは個別確認が必要。

## must_not_say

- 証明書を出せば公的義務は必ず問題ない。
- 補納すれば必ずリスクがなくなる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-067 |
