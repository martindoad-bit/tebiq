---
fact_id: permanent-resident-family-not-automatic-affected
title: 永住者取消・職権変更 — 家族であることだけでは家族の資格対象にならない
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
citation_label: "永住者取消等は家族へ自動連鎖しない"
citation_summary: "ISA の永住許可制度 Q&A は、取消し又は変更の対象は取消事由に該当する者であり、その家族であることを理由として家族の在留資格が取消又は変更の対象となるわけではないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-045
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q14"
  claim_type: family_status_boundary
  applicable_statuses:
    - "permanent_resident_family"
  application_type:
    - cancellation
    - status_change
  exclusion_scope:
    - "永住者の配偶者等から定住者等への変更要否判断"
    - "個別家族の在留資格戦略"
  deep_water_candidate: true
applies_when:
  - "用户问永住者本人取消或变更后家属签证是否自动失效"
does_not_cover:
  - "家属接下来该变更到什么资格"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-system-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html
    title: 永住許可制度の適正化Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者の家族
direct_fact_fields:
  - permanent_resident_family_not_automatic_affected
ai_inferred_fields: []
needs_review_flags:
  - id: family_status_follow_up_review
    reason: "家族の個別在留資格、配偶者等から定住者等への変更は個別確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、取消し又は変更の対象は取消事由に該当する者であり、その家族であることを理由として家族の在留資格が取消又は変更の対象となるわけではないと説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q14"
    display_label: "永住者取消等：家族への影響"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者取消・職権変更 — 家族であることだけでは家族の資格対象にならない

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12.

## current_effective_fact

ISA の Q&A は、取消し又は変更の対象は取消事由に該当する者であり、その家族であることを理由として家族の在留資格が取消又は変更の対象となるわけではないと説明している。

## exceptions_or_transition

- 配偶者の在留資格が永住者の配偶者等の場合は、定住者などへの変更が必要になると Q&A は説明している。
- 家族ごとの現在資格により扱いが変わる。

## common_user_phrases

- 永住 取消 家族
- 永住者 配偶者 子 影響
- 永住者 取消 家族签证
- 永住者の配偶者等 変更
- 父母永住取消 子供
- 永住取消 家族 自动

## must_say

- 家族であることだけで家族の資格が取消や変更対象になるわけではない。
- 家族の現在資格ごとに確認する。

## must_not_say

- 永住者本人が取消なら家族も全員自動取消。
- 家族には一切影響がないと断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-045 |
