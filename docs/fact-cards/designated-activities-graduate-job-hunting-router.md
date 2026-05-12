---
fact_id: designated-activities-graduate-job-hunting-router
title: "特定活動 — 本邦大学等卒業後の就職活動"
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
citation_label: "卒業後就職活動の特定活動"
citation_summary: "ISA の特定活動一覧には、本邦の大学等を卒業した留学生が就職活動を行う場合の個別ページがある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-012
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 卒業後就職活動"
  source_locator: "本邦の大学等を卒業した留学生が就職活動を行う場合"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "就労資格者の転職活動"
    - "内定後採用待機"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後に日本で就職活動を続けたいと相談している"
does_not_cover:
  - "技人国保持者の退職後就職活動"
  - "ワーキングホリデー"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-designated-activities-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities.html
    title: 在留資格「特定活動」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-designated-activities-job-hunting
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities14.html
    title: 本邦の大学等を卒業した留学生が就職活動を行う場合
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "卒業後就職活動の特定活動相談"
direct_fact_fields:
  - designated_activities_graduate_job_hunting_router
ai_inferred_fields: []
needs_review_flags:
  - id: school_type_and_recommendation_detail_pending
    reason: "対象学校・推薦状・更新条件は詳細カード化が必要。"
evidence_points:
  - claim: "ISA の特定活動一覧には、本邦の大学等を卒業した留学生が就職活動を行う場合の個別ページがある。"
    source_title: "在留資格「特定活動」"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本邦の大学等を卒業した留学生が就職活動を行う場合"
    display_label: "特定活動: 卒業後就職活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — 本邦大学等卒業後の就職活動

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、本邦の大学等を卒業した留学生が就職活動を行う場合の特定活動ページを設けている。

## exceptions_or_transition

- 留学生向けの卒業後就職活動と、就労資格者の退職後転職活動を混同しない。
- 詳細な対象学校、推薦、更新条件は別途確認する。

## common_user_phrases

- 卒業後 就職活動 特定活動
- 留学生 卒業後 就職活動
- 留学生 就活 ビザ 延長
- 大学卒業後 日本で就職活動
- 専門学校卒業 就職活動 特定活動
- 毕业后 找工作 特定活动

## must_say

- 卒業後就職活動の特定活動は、留学からの移行場面として確認する。

## must_not_say

- 技人国を辞めた人にも同じ就職活動特定活動が当然使える。
- 卒業したら誰でも自動で就職活動特定活動になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-012 |
