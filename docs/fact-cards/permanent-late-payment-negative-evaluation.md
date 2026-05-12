---
fact_id: permanent-late-payment-negative-evaluation
title: 永住許可ガイドライン — 納付期限内に履行していない場合の消極評価
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
citation_label: "永住ガイドラインは期限後納付を消極評価とする"
citation_summary: "ISA の永住許可ガイドラインは、申請時に納付済みであっても、本来の納付期間内に公的義務を履行していない場合は、原則として消極的に評価するとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-011
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)イ 注記"
  claim_type: risk_signal
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "期限内免除・猶予の評価"
    - "個別不許可判断"
  deep_water_candidate: true
applies_when:
  - "用户问补缴、迟缴税年金医保是否影响永住"
does_not_cover:
  - "迟缴后一定不许可或一定没问题"
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
  - permanent_late_payment_negative_evaluation
ai_inferred_fields: []
needs_review_flags:
  - id: exemption_deferment_not_resolved
    reason: "免除・猶予は遅延納付とは別論点であり、本カードでは扱わない。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、申請時に納付済みであっても、本来の納付期間内に公的義務を履行していない場合は、原則として消極的に評価するとしている。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)イ 注記"
    display_label: "永住ガイドライン：期限後納付は原則消極評価"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 納付期限内に履行していない場合の消極評価

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、申請時に納付済みであっても、本来の納付期間内に公的義務を履行していない場合は、原則として消極的に評価するとしている。

## exceptions_or_transition

- 消極評価は不許可の自動結論ではない。
- 免除・猶予の扱いは別途確認する。

## common_user_phrases

- 永住 年金 迟缴
- 永住 住民税 遅れ
- 永住 補缴 年金
- 永住 税金 補交
- 永住 纳付期限 影响
- 永住 期限後納付

## must_say

- 本来の納付期間内に履行していない場合は原則消極評価。
- 申請時に納付済みでも、期限内履行の履歴は別に見られる。

## must_not_say

- 補缴すれば必ず問題ない。
- 遅れたことがあれば必ず不許可。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-011 |
