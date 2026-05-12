---
fact_id: long-term-resident-special-reason-status-scope
title: "定住者 — 特別な理由を考慮して居住を認める在留資格"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "定住者の status scope"
citation_summary: "ISA の定住者ページは、この在留資格に該当する方を『法務大臣が特別な理由を考慮し一定の在留期間を指定して居住を認める者』として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-002
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『定住者』"
  source_locator: "この在留資格に該当する方"
  claim_type: status_scope
  applicable_statuses:
    - "定住者"
  application_type:
    - current-status
    - status_change
  exclusion_scope:
    - "特別な理由の個別評価"
    - "就労範囲の詳細"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが定住者という資格の意味を聞いている"
does_not_cover:
  - "離婚後に定住者へ変えられるか"
  - "日系・養子・未成年子などの具体路径"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-long-term-resident-status
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "定住者の資格概要"
direct_fact_fields:
  - long_term_resident_special_reason_status_scope
ai_inferred_fields: []
needs_review_flags:
  - id: special_reason_requires_case_review
    reason: "特別な理由の中身は個別事情により異なるため、このカードでは判断しない。"
evidence_points:
  - claim: "ISA の定住者ページは、定住者を法務大臣が特別な理由を考慮し一定の在留期間を指定して居住を認める者として説明している。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "この在留資格に該当する方"
    display_label: "定住者の該当者説明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 特別な理由を考慮して居住を認める在留資格

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は定住者を、法務大臣が特別な理由を考慮し一定の在留期間を指定して居住を認める者として説明している。

## exceptions_or_transition

- 「特別な理由」があるかどうかは、このカードだけでは判断しない。
- 具体路径は、日系、未成年子、養子、配偶者等からの変更などに分けて確認する。

## common_user_phrases

- 定住者とは
- 定住ビザ 意味
- 定住者 どんな資格
- 定住者 特別な理由
- 特別な理由
- 定住者 在留期間
- 定住者 能不能申请

## must_say

- 定住者は個別事情と路径の確認が必要な在留資格である。

## must_not_say

- 特別な理由があると本人が言えば申請できる。
- 定住者は誰でも自由に選べる資格である。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-002 |
