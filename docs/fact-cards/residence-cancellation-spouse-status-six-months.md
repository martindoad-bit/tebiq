---
fact_id: residence-cancellation-spouse-status-six-months
title: 在留資格取消 — 配偶者としての活動を継続していない場合の6か月入口
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
citation_label: "配偶者身份の活動不継続は取消入口になり得る"
citation_summary: "入管法第22条の4と ISA の取消案内は、日本人の配偶者等又は永住者の配偶者等のうち配偶者として在留する者が、正当な理由なく配偶者としての活動を継続して6か月以上行わない場合を取消事由として示している。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-018
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条の4"
  source_locator: "配偶者活動の取消事由"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "spouse_or_child_of_japanese_spouse"
    - "spouse_or_child_of_permanent_resident_spouse"
  application_type:
    - cancellation
  exclusion_scope:
    - "実子・特別養子としての在留"
    - "正当な理由がある場合"
  deep_water_candidate: true
applies_when:
  - "用户问日配、永配离婚分居后是否马上取消"
does_not_cover:
  - "离婚后的资格变更策略"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 日本人の配偶者等又は永住者の配偶者等のうち配偶者として在留する外国人
direct_fact_fields:
  - residence_cancellation_spouse_status_six_months
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_status_strategy_requires_review
    reason: "離婚、別居、正当な理由、変更申請の戦略は個別確認が必要。"
evidence_points:
  - claim: "入管法第22条の4と ISA の取消案内は、日本人の配偶者等又は永住者の配偶者等のうち配偶者として在留する者が、正当な理由なく配偶者としての活動を継続して6か月以上行わない場合を取消事由として示している。"
    source_title: "在留資格の取消し"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由"
    display_label: "在留資格取消：配偶者活動6か月入口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 配偶者としての活動を継続していない場合の6か月入口

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

日本人の配偶者等又は永住者の配偶者等のうち配偶者として在留する者が、正当な理由なく配偶者としての活動を継続して6か月以上行わない場合は、在留資格取消の事由として示されている。

## exceptions_or_transition

- 離婚・別居そのものが即時自動取消を意味するわけではない。
- 子・特別養子としての在留とは分ける。

## common_user_phrases

- 日配 離婚 取消
- 配偶者ビザ 6ヶ月 取消
- 永配 離婚 在留資格取消
- 別居 6ヶ月 日配
- 日配 离婚 会马上失效吗
- 配偶签 分居 取消

## must_say

- 配偶者としての活動を6か月以上行わない場合の取消入口がある。
- 正当な理由や資格変更戦略は個別確認する。

## must_not_say

- 離婚した当日に自動失効する。
- 別居だけで必ず取消される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-018 |
