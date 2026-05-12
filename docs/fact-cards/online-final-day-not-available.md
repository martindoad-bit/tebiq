---
fact_id: online-final-day-not-available
title: 在留申請オンライン — 在留期限当日は利用できない
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "オンライン申請は在留期限当日に使えない"
citation_summary: "ISA のオンライン申請案内は、在留期間満了日当日はオンラインで申請できず、地方出入国在留管理官署で申請する必要があるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-110
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "利用可能期間"
  claim_type: online_scope
  applicable_statuses:
    - "online_application_user"
  application_type:
    - renewal
    - change
  exclusion_scope:
    - "在留期間満了日当日のオンライン申請"
  deep_water_candidate: false
applies_when:
  - "用户问在留期限最后一天能不能在线提交"
does_not_cover:
  - "期限后申请或超期状态"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-online-application
    url: https://www.moj.go.jp/isa/applications/online/onlineshinsei.html
    title: 在留申請オンラインシステム
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留申請オンラインシステムを利用する外国人
direct_fact_fields:
  - online_final_day_not_available
ai_inferred_fields: []
needs_review_flags:
  - id: late_or_expired_application_requires_review
    reason: "期限後申請や超過滞在の扱いは別カード・専門確認が必要。"
evidence_points:
  - claim: "ISA のオンライン申請案内は、在留期間満了日当日はオンラインで申請できず、地方出入国在留管理官署で申請する必要があるとしている。"
    source_title: "在留申請オンラインシステム"
    source_url: "https://www.moj.go.jp/isa/applications/online/onlineshinsei.html"
    source_organization: "出入国在留管理庁"
    source_locator: "利用可能期間"
    display_label: "オンライン申請：在留期限当日は不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留申請オンライン — 在留期限当日は利用できない

## current_date_logic

Checked against current ISA online application guidance on 2026-05-12.

## current_effective_fact

在留期間満了日当日はオンラインで申請できない。地方出入国在留管理官署で申請する必要がある。

## exceptions_or_transition

- 期限後申請や超過滞在は別論点。
- オンラインが使えないだけで、当日の窓口申請の可否・受付時間は管轄官署で確認する。

## common_user_phrases

- 在留期限 当日 オンライン申請
- 在留期間満了日 オンライン 更新
- 今日 期限 ネット申請
- 最終日 オンライン 在留期間更新
- 签证到期当天 网上更新
- 期限ギリギリ オンライン申請

## must_say

- 在留期間満了日当日はオンライン申請できない。
- 地方出入国在留管理官署で申請する必要がある。

## must_not_say

- 最終日でもオンラインで間に合う。
- 期限後でもオンラインなら問題ない。

## qa_cases

### QA-1

**user**: 今日が在留期限ですが、オンライン更新できますか？

**must_have**:

- 満了日当日はオンライン不可
- 地方入管で申請

**must_not_have**:

- オンラインで間に合う

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-110 |
