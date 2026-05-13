---
fact_id: guard-hsp-pr-shortening-not-automatic-pr
title: "高度人材永住短縮 — 自動永住ではない"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度人材永住短縮: 自動許可ではない"
citation_summary: "ISA の永住ガイドラインは高度人材の在留歴特例を示しているが、永住許可申請の審査そのものは別に残る。70点・80点・特別高度人材を自動許可として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-009
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "永住許可ガイドライン 高度人材特例"
  source_locator: "原則10年在留に関する特例"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "永住者"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "永住許可見込み"
    - "点数維持の証明判断"
    - "税・年金・素行等の総合判断"
  deep_water_candidate: true
official_sources:
  - id: isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度人材の永住在留歴短縮を自動許可と誤解している相談"
direct_fact_fields:
  - hsp_pr_shortening_not_automatic_pr
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_pr_shortening_review
    reason: "永住許可は在留歴以外に税・年金・素行等の確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、高度人材70点以上、80点以上、特別高度人材について、原則10年在留に関する特例を示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "原則10年在留に関する特例"
    display_label: "永住許可: 高度人材の在留歴特例"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の高度人材優遇措置ページは、在留歴に係る永住許可要件の緩和を優遇措置として案内している。"
    source_title: "どのような優遇措置が受けられる？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留歴に係る永住許可要件の緩和"
    display_label: "高度人材: 在留歴要件の緩和"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度人材永住短縮 — 自動永住ではない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度人材の70点・80点・特別高度人材の永住在留歴特例は、永住許可の在留歴要件を短縮する入口として扱う。永住許可そのものが自動で出るとは扱わない。

## exceptions_or_transition

- このカードは、点数維持、税・年金・素行、年収資料、永住許可見込みを判断しない。

## common_user_phrases

- 80点 一年 永住 自動
- 70点 三年 永住 自動
- 高度人材 永住 必ず
- J-Skip 一年 永住 必ず
- 特別高度人材 永住 一年
- 高度専門職 永住 自動

## must_say

- 70点・80点・特別高度人材は永住の在留歴特例として確認する。
- 永住許可は他の要件も含めて別に審査される。

## must_not_say

- 80点なら1年で必ず永住できる。
- J-Skipなら自動的に永住者になる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-009 |
