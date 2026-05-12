---
fact_id: spouse-cancellation-change-or-pr-opportunity
title: 配偶者活動6か月取消入口 — 取消前に変更申請又は永住申請の機会を与える配慮規定
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "配偶者活動不履行時の申請機会"
citation_summary: "法務省資料は、配偶者活動6か月不継続により在留資格取消しをしようとする場合、在留資格変更許可申請又は永住許可申請の機会を与えるよう配慮することとしていると説明している。"
source_display_names:
  - "法務省"
legal_source:
  candidate_id: C4-048
  authority_layer: L1 Law / L4 Ministry Procedure Material
  legal_source_type: statute_official_explainer
  law_article_ref: "入管法第22条の5"
  source_locator: "配偶者取消しを行わない具体例 PDF 注記 / 入管法第22条の5"
  claim_type: procedure_guardrail
  applicable_statuses:
    - "spouse_or_child_of_japanese_spouse"
    - "spouse_or_child_of_permanent_resident_spouse"
  application_type:
    - cancellation
    - status_change
    - permanent_residence
  exclusion_scope:
    - "具体的な変更先資格の判断"
    - "永住許可可能性判断"
  deep_water_candidate: true
applies_when:
  - "用户问日配、永配因离婚或配偶者活动不履行被取消前能否变更"
does_not_cover:
  - "定住者、永住、其他在留资格的成功可能性"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-spouse-cancellation-examples
    url: https://www.moj.go.jp/isa/content/920000161.pdf
    title: 配偶者の身分を有する者としての活動を行わないことに正当な理由がある場合等在留資格の取消しを行わない具体例について
    publisher: 法務省入国管理局
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 日本人の配偶者等のうち配偶者身份者
  - 永住者の配偶者等のうち配偶者身份者
direct_fact_fields:
  - spouse_cancellation_change_or_pr_opportunity
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_change_or_pr_strategy_review
    reason: "変更先資格や永住許可申請の見込みは、家族関係・監護養育・生活基盤等の個別確認が必要。"
evidence_points:
  - claim: "法務省資料は、配偶者活動6か月不継続により在留資格取消しをしようとする場合、在留資格変更許可申請又は永住許可申請の機会を与えるよう配慮することとしていると説明している。"
    source_title: "配偶者の身分を有する者としての活動を行わないことに正当な理由がある場合等在留資格の取消しを行わない具体例について"
    source_url: "https://www.moj.go.jp/isa/content/920000161.pdf"
    source_organization: "法務省入国管理局"
    source_locator: "注記及び入管法第22条の5引用"
    display_label: "配偶者活動6か月：変更又は永住申請機会"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 配偶者活動6か月取消入口 — 取消前に変更申請又は永住申請の機会を与える配慮規定

## current_date_logic

Checked against the Ministry spouse-cancellation example PDF on 2026-05-12.

## current_effective_fact

法務省資料は、配偶者活動6か月不継続により在留資格取消しをしようとする場合、在留資格変更許可申請又は永住許可申請の機会を与えるよう配慮することとしていると説明している。

## exceptions_or_transition

- 申請機会があることと、その申請が許可されることは別。
- 監護養育、生活基盤、現在の在留状況などの確認が必要。

## common_user_phrases

- 日配 離婚 定住者 変更
- 配偶者ビザ 取消前 変更申請
- 永配 離婚 永住申請 機会
- 配偶者活動 6ヶ月 取消 変更できる
- 离婚后 能不能改定住者
- 日配取消前还能申请永住吗

## must_say

- 取消前に変更申請又は永住申請の機会を与える配慮規定がある。
- 申請機会と許可可能性は分ける。

## must_not_say

- 取消手続に入ったら必ず在留資格変更できる。
- 申請機会があるので何もしなくてよい。

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
| 2026-05-12 | FACT/Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-048 |
