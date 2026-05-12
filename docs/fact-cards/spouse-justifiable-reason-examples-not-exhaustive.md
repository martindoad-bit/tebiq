---
fact_id: spouse-justifiable-reason-examples-not-exhaustive
title: 配偶者活動6か月取消入口 — 正当な理由の公式例示は限定列挙ではない
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
citation_label: "配偶者活動不履行の正当な理由例示"
citation_summary: "法務省資料は、配偶者活動を継続して6か月以上行わない場合でも、DV避難、子の養育等で別居し同一生計、本国親族の傷病による長期出国、離婚調停・訴訟中などを取消しを行わない主な例として示している。ただし判断は個別具体的状況に基づき、例示に限定されない。"
source_display_names:
  - "法務省"
legal_source:
  candidate_id: C4-047
  authority_layer: L4 Ministry Procedure Material
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第7号"
  source_locator: "配偶者取消しを行わない具体例"
  claim_type: exception_boundary
  applicable_statuses:
    - "spouse_or_child_of_japanese_spouse"
    - "spouse_or_child_of_permanent_resident_spouse"
  application_type:
    - cancellation
  exclusion_scope:
    - "正当な理由の成立判断"
    - "離婚後の在留資格変更戦略"
  deep_water_candidate: true
applies_when:
  - "用户问日配、永配离婚或别居后6个月取消是否一定发生"
does_not_cover:
  - "用户个案是否已经构成正当理由"
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
  - spouse_justifiable_reason_examples_not_exhaustive
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_justifiable_reason_individual_review
    reason: "公式例示に当たるか、また例示外でも正当な理由になるかは個別確認が必要。"
evidence_points:
  - claim: "法務省資料は、DV避難、子の養育等で別居し同一生計、本国親族の傷病による長期出国、離婚調停・訴訟中などを、配偶者活動6か月不継続でも取消しを行わない主な例として示している。判断は個別具体的状況に基づき、例示に限定されない。"
    source_title: "配偶者の身分を有する者としての活動を行わないことに正当な理由がある場合等在留資格の取消しを行わない具体例について"
    source_url: "https://www.moj.go.jp/isa/content/920000161.pdf"
    source_organization: "法務省入国管理局"
    source_locator: "本文及び具体例1-4"
    display_label: "配偶者活動6か月：正当な理由の公式例示"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 配偶者活動6か月取消入口 — 正当な理由の公式例示は限定列挙ではない

## current_date_logic

Checked against the Ministry spouse-cancellation example PDF on 2026-05-12.

## current_effective_fact

法務省資料は、配偶者活動を継続して6か月以上行わない場合でも、DV避難、子の養育等で別居し同一生計、本国親族の傷病による長期出国、離婚調停・訴訟中などを取消しを行わない主な例として示している。ただし判断は個別具体的状況に基づき、例示に限定されない。

## exceptions_or_transition

- 例示に該当するように見えても、実際の正当な理由の有無は個別確認する。
- 6か月以内なら常に安全、6か月を超えたら必ず取消、のどちらにも倒さない。

## common_user_phrases

- 日配 別居 6ヶ月 取消
- 配偶者ビザ DV 避難 取消
- 離婚調停中 在留資格取消
- 日本人配偶者 子育て 別居
- 永配 長期出国 配偶者活動
- 离婚诉讼中 签证取消

## must_say

- 公式例示はあるが、最終判断は個別具体的状況に基づく。
- 例示は限定列挙ではない。

## must_not_say

- 例示に当たれば必ず取消されない。
- 離婚・別居後6か月以内なら絶対安全。

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
| 2026-05-12 | FACT/Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-047 |
