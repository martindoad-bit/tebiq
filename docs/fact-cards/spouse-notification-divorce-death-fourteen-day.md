---
fact_id: spouse-notification-divorce-death-fourteen-day
title: 配偶者届出 — 離婚・死別から14日以内に本人が届け出る
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "配偶者届出は離婚・死別から14日以内"
citation_summary: "ISA 手続ページは、対象資格の中長期在留者が配偶者と離婚または死別した場合、14日以内に本人が届出を行う必要があると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-043
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の16第3号"
  source_locator: "配偶者に関する届出：手続概要・手続対象者・届出期間・届出者"
  claim_type: deadline_trigger
  applicable_statuses:
    - "家族滞在"
    - "日本人の配偶者等"
    - "永住者の配偶者等"
  application_type:
    - notification
  exclusion_scope:
    - "未婚の子"
    - "親族関係一般"
    - "在留資格変更の要否判断"
  deep_water_candidate: true
applies_when:
  - "用户问日配、永配、家族滞在配偶者离婚/死别后14日届出"
does_not_cover:
  - "离婚后能否继续留在日本的个案判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-spouse-notification-page
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    title: 配偶者に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 配偶者に関する届出
direct_fact_fields:
  - spouse_notification_divorce_death_14_days
  - spouse_notification_target_statuses
ai_inferred_fields: []
needs_review_flags:
  - id: post_divorce_status_strategy
    reason: "After divorce or bereavement, whether and when to change status requires individual review."
evidence_points:
  - claim: "ISA states that a mid- to long-term resident in the target spouse statuses who divorces or is bereaved must file a spouse notification within 14 days from the event, and the notifier is the resident themself."
    source_title: "配偶者に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続対象者; 届出期間; 届出者"
    display_label: "配偶者届出：離婚・死別から14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 配偶者届出 — 離婚・死別から14日以内に本人が届け出る

## current_date_logic

Checked against the current ISA procedure page and Q&A page on 2026-05-12.

## current_effective_fact

家族滞在、日本人の配偶者等、永住者の配偶者等のうち配偶者として在留している中長期在留者が、配偶者と離婚または死別した場合、事由発生日から14日以内に本人が配偶者に関する届出を行う必要がある。

## exceptions_or_transition

- 対象は配偶者として在留している人であり、子や一般の親族関係とは区別する。
- 届出と在留資格変更の要否は別論点。

## common_user_phrases

- 日配 離婚 14日 届出
- 永住者配偶者 死別 届出
- 家族滞在 配偶者 離婚 届出
- 配偶者届出 離婚 何日以内
- 离婚后 入管届出 14天
- 死別 配偶者に関する届出

## must_say

- 離婚・死別から14日以内に本人が届け出る。
- 対象資格と配偶者としての在留かを確認する。

## must_not_say

- 離婚しても何も届出しなくてよい。
- 子としての在留者にも同じ配偶者届出が必要。

## qa_cases

### QA-1

**user**: 日本人配偶者ビザで離婚しました。14日以内に何か必要ですか？

**must_have**:

- 配偶者届出が必要
- 事由発生日から14日以内

**must_not_have**:

- 届出不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-043 |
