---
fact_id: long-term-resident-spouse-notification-separate-from-status-change
title: "配偶者離婚・死別届出 — 定住者変更とは別手続"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "配偶者届出と資格変更の区別"
citation_summary: "ISA は、配偶者と離婚又は死別した場合、対象となる中長期在留者は14日以内に届出が必要と説明している。これは日配・永配から定住者への変更許可申請とは別に扱う必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-014
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "配偶者に関する届出"
  source_locator: "配偶者に関する届出 / 届出期間"
  claim_type: notification_vs_permission_boundary
  applicable_statuses:
    - "日本人の配偶者等"
    - "永住者の配偶者等"
    - "家族滞在"
    - "定住者"
  application_type:
    - notification
    - status_change
  exclusion_scope:
    - "届出後の在留資格変更判断"
    - "取消リスク"
    - "定住者許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-spouse-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    title: 配偶者に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "離婚・死別後の届出と定住者変更の混同"
direct_fact_fields:
  - spouse_notification_separate_from_status_change
ai_inferred_fields: []
needs_review_flags:
  - id: notification_and_change_timing
    reason: "届出、資格変更、取消リスクのタイミングは個別確認が必要。"
evidence_points:
  - claim: "ISA は、配偶者と離婚又は死別した対象者は14日以内に届出が必要と説明している。"
    source_title: "配偶者に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "配偶者届出: 14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 配偶者離婚・死別届出 — 定住者変更とは別手続

## current_date_logic

Checked against ISA procedure page on 2026-05-12.

## current_effective_fact

配偶者と離婚又は死別した対象者は14日以内に届出が必要と説明されている。これは定住者への変更許可申請とは別に扱う。

## exceptions_or_transition

- 届出しただけで定住者へ変更されたことにはならない。

## common_user_phrases

- 離婚 14日 届出 定住者
- 配偶者 死別 届出 在留資格変更
- 日配 離婚 届出 変更
- 永配 離婚 定住者 申請
- 离婚 14天 届出 定住者

## must_say

- 配偶者届出と在留資格変更申請は別手続として分ける。

## must_not_say

- 14日届出をすれば定住者に変わる。
- 定住者申請をすれば届出は不要になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-014 |
