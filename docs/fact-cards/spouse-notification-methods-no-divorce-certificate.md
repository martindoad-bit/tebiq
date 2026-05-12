---
fact_id: spouse-notification-methods-no-divorce-certificate
title: 配偶者届出 — オンライン・郵送・窓口で届出でき、離婚届受理証明書等は不要
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
citation_label: "配偶者届出の方法と添付資料"
citation_summary: "ISA Q&A と手続ページは、配偶者届出をオンライン、郵送、窓口で行えること、届出事項を証する資料は不要で郵送時は在留カード写しを同封することを説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-045
  authority_layer: L4 ISA Page / Q&A
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の16第3号"
  source_locator: "配偶者に関する届出：届出方法; Q&A Q2-Q3"
  claim_type: procedure_method
  applicable_statuses:
    - "家族滞在"
    - "日本人の配偶者等"
    - "永住者の配偶者等"
  application_type:
    - notification
  exclusion_scope:
    - "在留資格変更申請の提出書類"
  deep_water_candidate: false
applies_when:
  - "用户问配偶者届出怎么交、要不要离婚证明"
does_not_cover:
  - "离婚后变更申请需要哪些材料"
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
  - spouse_notification_methods
  - spouse_notification_no_supporting_materials
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that spouse notification can be filed online, by mail, or at a regional office, and that materials proving the notification matter such as a divorce acceptance certificate are not required; when filing by mail, a residence card copy is enclosed."
    source_title: "配偶者に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出方法; Q&A Q2-Q3"
    display_label: "配偶者届出：オンライン・郵送・窓口、証明資料不要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 配偶者届出 — オンライン・郵送・窓口で届出でき、離婚届受理証明書等は不要

## current_date_logic

Checked against the current ISA procedure page and Q&A page on 2026-05-12.

## current_effective_fact

配偶者に関する届出は、オンライン、郵送、地方官署窓口で行える。離婚届受理証明書など届出事項を証する資料は不要で、郵送の場合は在留カードの写しを同封する。

## exceptions_or_transition

- 在留資格変更申請を行う場合の提出書類とは別。
- 郵送では受付連絡がないため、追跡できる方法が推奨されている。

## common_user_phrases

- 配偶者届出 オンライン
- 配偶者届出 郵送 在留カード コピー
- 離婚届受理証明書 配偶者届出 必要
- 日配 離婚 届出 書類
- 配偶者に関する届出 資料不要
- 死別 配偶者届出 窓口

## must_say

- オンライン、郵送、窓口で届出できる。
- 離婚届受理証明書などの証明資料は不要。
- 郵送では在留カード写しを同封する。

## must_not_say

- 離婚証明がないと配偶者届出できない。
- 変更申請の資料も不要だと混同する。

## qa_cases

### QA-1

**user**: 日配で離婚した14日届出に離婚届受理証明書はいりますか？

**must_have**:

- 届出事項を証する資料は不要
- 郵送なら在留カード写し

**must_not_have**:

- 離婚証明が必須

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-045 |
