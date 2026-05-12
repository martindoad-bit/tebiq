---
fact_id: spouse-notification-vs-cancellation-risk-router
title: 配偶者資格 — 14日届出と6か月取消リスクを分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "配偶者届出と取消リスクの区別"
citation_summary: "ISA は配偶者との離婚・死別について14日以内の届出を案内している。一方、入管法第22条の4は配偶者としての活動を継続して6か月以上行わない場合の取消入口を別に定めている。届出義務と取消リスクを分ける。"
source_display_names:
  - "出入国在留管理庁"
  - "e-Gov 法令検索"
legal_source:
  candidate_id: C4-073
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_page
  law_article_ref: "入管法第22条の4 / 配偶者に関する届出"
  source_locator: "配偶者に関する届出 / 配偶者活動6か月取消入口"
  claim_type: disambiguation
  applicable_statuses:
    - "spouse_or_child_of_japanese_spouse"
    - "spouse_or_child_of_permanent_resident_spouse"
  application_type:
    - notification
    - cancellation
    - status_change
  exclusion_scope:
    - "正当な理由の個別判断"
    - "定住者等への変更可否"
  deep_water_candidate: true
applies_when:
  - "用户问离婚届出、配偶签取消、定住者变更混在一起"
does_not_cover:
  - "离婚后具体能否变更或续签"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-spouse-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    title: 配偶者に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 日本人の配偶者等のうち配偶者
  - 永住者の配偶者等のうち配偶者
direct_fact_fields:
  - spouse_notification_vs_cancellation_risk_router
ai_inferred_fields: []
needs_review_flags:
  - id: spouse_status_change_individual_review
    reason: "離婚後の正当な理由、変更申請、永住申請、子の事情は個別確認が必要。"
evidence_points:
  - claim: "ISA は配偶者との離婚・死別について14日以内の届出を案内している。一方、入管法第22条の4は配偶者としての活動を継続して6か月以上行わない場合の取消入口を別に定めている。届出義務と取消リスクを分ける。"
    source_title: "配偶者に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出事由・期間"
    display_label: "配偶者資格：届出と取消リスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 配偶者資格 — 14日届出と6か月取消リスクを分ける

## current_date_logic

Checked against ISA spouse-notification guidance and current law text on 2026-05-12.

## current_effective_fact

ISA は配偶者との離婚・死別について14日以内の届出を案内している。一方、入管法第22条の4は配偶者としての活動を継続して6か月以上行わない場合の取消入口を別に定めている。届出義務と取消リスクを分ける。

## exceptions_or_transition

- 正当な理由、子の有無、同居・別居、調停、DV、変更申請の可否は個別確認。

## common_user_phrases

- 配偶者 届出 取消 6ヶ月 違い
- 离婚 14日届出 配偶签 取消
- 配偶者ビザ 離婚 届出 失効
- 日配 離婚 定住者 変更 取消
- 配偶者としての活動 6ヶ月
- 离婚不告诉入管 可以到期吗

## must_say

- 14日届出と6か月取消リスクを分ける。
- 離婚後の在留資格変更や取消リスクは個別確認が必要。

## must_not_say

- 届出すれば在留資格が自動で変わる。
- 離婚したら即日失効、又は期限まで絶対安全。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-073 |
