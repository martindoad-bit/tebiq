---
fact_id: organization-notification-methods-and-attachments
title: 所属機関届出 — オンライン・郵送・窓口で届出できる
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "所属機関届出の方法"
citation_summary: "ISA Q&A は、所属機関届出をオンライン、郵送、地方官署窓口で行えること、届出資料は不要で郵送時は在留カード写しを同封することを説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-034
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関に関する届出制度全般 Q2-Q3"
  claim_type: procedure_method
  applicable_statuses:
    - "organization_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "配偶者関係届出"
    - "所属機関による届出"
  deep_water_candidate: false
applies_when:
  - "用户问所属机构届出怎么交、要不要合同"
does_not_cover:
  - "电子届出系统账户注册细节"
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
  - 所属機関に関する届出
direct_fact_fields:
  - organization_notification_methods
  - organization_notification_no_supporting_materials
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that organization notification can be submitted online, by mail, or at a regional immigration office, and that supporting materials are not required; when filing by mail, a residence card copy is enclosed."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所属機関に関する届出制度全般 Q2-Q3"
    display_label: "所属機関届出：オンライン・郵送・窓口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — オンライン・郵送・窓口で届出できる

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

所属機関に関する届出は、オンライン、郵送、地方官署窓口で行える。届出に係る資料は不要で、郵送の場合は在留カードの写しを同封する。

## exceptions_or_transition

- 電子届出システムの利用には登録が必要な場合がある。
- 届出方法と、在留資格変更・更新の申請方法は別の話。

## common_user_phrases

- 所属機関 届出 オンライン
- 所属機関 届出 郵送
- 所属機関 届出 窓口
- 転職 届出 雇用契約書 必要
- 14日届出 在留カード コピー
- 所属機関 届出 資料 不要

## must_say

- オンライン、郵送、窓口で届出できる。
- 届出資料は不要で、郵送では在留カード写しを同封する。

## must_not_say

- 雇用契約書を必ず添付する。
- オンライン以外では届出できない。

## qa_cases

### QA-1

**user**: 転職の14日届出に雇用契約書はいりますか？

**must_have**:

- 届出に係る資料は不要
- 郵送なら在留カード写し

**must_not_have**:

- 契約書がないと届出不可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-034 |
