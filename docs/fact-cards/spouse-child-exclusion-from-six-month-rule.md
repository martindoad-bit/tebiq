---
fact_id: spouse-child-exclusion-from-six-month-rule
title: 配偶者活動6か月取消入口 — 日本人・永住者の子は除かれる
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "配偶者6か月ルールは子の地位と分ける"
citation_summary: "ISA の在留資格取消案内は、配偶者活動6か月不継続の取消事由について、日本人の子・特別養子、永住者等の子を除くと示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-039
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第7号"
  source_locator: "取消事由(7)"
  claim_type: scope_boundary
  applicable_statuses:
    - "spouse_or_child_of_japanese"
    - "spouse_or_child_of_permanent_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "子としての在留資格全体の審査"
    - "親子関係や扶養関係の評価"
  deep_water_candidate: false
applies_when:
  - "用户问日配/永配中的孩子是否受配偶者6个月规则影响"
does_not_cover:
  - "子としての在留资格更新或变更策略"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 日本人の配偶者等又は永住者の配偶者等の在留資格者
direct_fact_fields:
  - spouse_child_exclusion_from_six_month_rule
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA の取消案内は、配偶者活動6か月不継続の取消事由について、日本人の子・特別養子、永住者等の子を除くと示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(7)"
    display_label: "配偶者活動6か月ルール：子は除外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 配偶者活動6か月取消入口 — 日本人・永住者の子は除かれる

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA の取消案内は、配偶者活動6か月不継続の取消事由について、日本人の子・特別養子、永住者等の子を除くと示している。

## exceptions_or_transition

- 子としての在留資格そのものの更新や変更は別の論点。

## common_user_phrases

- 日配 子ども 離婚 取消
- 永配 子 6ヶ月ルール
- 日本人の子 在留資格取消
- 永住者の子 配偶者6か月
- 子供 签证 离婚 取消
- 特別養子 配偶者活動

## must_say

- 配偶者活動6か月ルールは子の地位と分ける。
- 子としての在留問題は別途確認する。

## must_not_say

- 日配の子にも配偶者活動6か月ルールをそのまま当てる。
- 子であれば在留リスクが一切ない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-039 |
