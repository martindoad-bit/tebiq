---
fact_id: qualification-outside-activity-prohibited-activities-exclusion
title: 資格外活動許可 — 違法活動・風俗営業等は一般原則で除外される
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "違法活動・風俗営業等は資格外活動許可の一般原則で除外"
citation_summary: "ISA の資格外活動許可一般原則は、法令違反と認められる活動や風俗営業等に関係する活動を除外している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-028
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動許可について：一般原則"
  claim_type: exclusion_scope
  applicable_statuses:
    - "table1"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "違法活動"
    - "風俗営業等"
  deep_water_candidate: true
applies_when:
  - "用户问夜店、风俗、酒吧、违法活动是否可用资格外活动许可"
  - "用户问28小时内是否任何行业都可以"
does_not_cover:
  - "具体店铺是否属于风俗营业"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-general-principles
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - illegal_activity_excluded
  - adult_entertainment_related_activity_excluded
ai_inferred_fields: []
needs_review_flags:
  - id: specific_business_classification
    reason: "Whether a specific venue falls into prohibited categories requires review."
evidence_points:
  - claim: "ISA's general principles exclude activities considered to violate law and activities at adult-entertainment-type business places or related adult-entertainment businesses."
    source_title: "資格外活動許可について"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 資格外活動許可の要件（一般原則）"
    display_label: "資格外活動：違法活動・風俗営業等は除外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 違法活動・風俗営業等は一般原則で除外される

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

資格外活動許可の一般原則では、法令違反と認められる活動や、風俗営業等に関係する活動は除外される。

## exceptions_or_transition

- 店舗や業務が具体的にどの分類に当たるかは個別確認。
- 28時間以内でも禁止カテゴリなら許可されるとは言わない。

## common_user_phrases

- 夜店 打工 资格外活动
- 风俗店 打工 留学生
- 28小时内 任何行业
- 资格外活动 禁止行业
- 風俗営業 資格外活動
- 违法工作 打工许可

## must_say

- 違法活動・風俗営業等は一般原則で除外。
- 28時間以内でも活動内容と場所の確認が必要。

## must_not_say

- 28小时以内任何店都可以。
- 有资格外活动许可就能做夜店风俗。

## qa_cases

### QA-1

**user**: 留学生一周28小时内可以去夜店打工吗？

**must_have**:

- 風俗営業等は除外
- 具体店铺需确认

**must_not_have**:

- 28小时内就可以

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-028 |
