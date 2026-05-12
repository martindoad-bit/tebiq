---
fact_id: spouse-notification-not-status-change-substitute
title: 配偶者届出 — 届出だけで在留資格変更が不要になるわけではない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "配偶者届出と在留資格変更は別"
citation_summary: "ISA Q&A は、配偶者と離婚または死別した場合、原則として在留資格を変更する必要があり、届出をした上で地方官署へ相談するよう説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-044
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16第3号"
  source_locator: "配偶者に関する届出：届出の要否 Q9"
  claim_type: procedure_boundary
  applicable_statuses:
    - "家族滞在"
    - "日本人の配偶者等"
    - "永住者の配偶者等"
  application_type:
    - notification
    - change
  exclusion_scope:
    - "変更先資格の選定"
    - "離婚後の在留継続可否"
  deep_water_candidate: true
applies_when:
  - "用户问离婚后只做届出是否就不用改签"
does_not_cover:
  - "具体应该改成哪种在留资格"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 配偶者に関する届出
  - 在留資格変更許可申請
direct_fact_fields:
  - spouse_notification_not_substitute_for_status_change
ai_inferred_fields: []
needs_review_flags:
  - id: divorce_after_spouse_status_deep_water
    reason: "The source states a general rule, but status-change route and timing require individual review."
evidence_points:
  - claim: "ISA explains that if a person divorces or is bereaved, as a general rule they need to change status, and should file the spouse notification and consult a nearby regional immigration office."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "配偶者に関する届出 届出の要否 Q9"
    display_label: "配偶者届出：在留資格変更とは別に確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 配偶者届出 — 届出だけで在留資格変更が不要になるわけではない

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

配偶者と離婚または死別した場合、原則として在留資格を変更する必要がある。配偶者届出をした上で、近くの地方官署へ相談するよう説明されている。

## exceptions_or_transition

- どの在留資格へ変更できるか、いつまでに何をするかは個別事情で変わる。
- 届出をしたことだけで在留資格変更が不要になるとは扱わない。

## common_user_phrases

- 離婚 届出すれば 在留資格変更 不要
- 日配 離婚 そのまま滞在
- 配偶者届出 だけでいい
- 永配 死別 在留資格変更
- 离婚后 只做14天届出 可以吗
- 日配 离婚 改签 必要

## must_say

- 届出と在留資格変更の要否は別。
- 離婚・死別後は原則として在留資格変更が必要と説明されている。
- 個別ルートは確認が必要。

## must_not_say

- 14日届出だけでそのまま問題ない。
- 離婚したら必ずすぐ退去。
- 変更先は必ず特定活動。

## qa_cases

### QA-1

**user**: 日配で離婚しました。14日届出だけ出せばビザ変更しなくていいですか？

**must_have**:

- 届出だけでは足りない可能性
- 原則として在留資格変更が必要
- 地方官署や専門家確認

**must_not_have**:

- 届出だけで大丈夫

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-044 |
