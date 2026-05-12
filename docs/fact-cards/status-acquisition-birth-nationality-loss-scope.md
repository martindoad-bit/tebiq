---
fact_id: status-acquisition-birth-nationality-loss-scope
title: 在留資格取得 — 出生・日本国籍離脱等で上陸手続なしに在留する人の手続
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
citation_label: "在留資格取得は出生・日本国籍離脱等の手続"
citation_summary: "在留資格取得許可申請は、日本国籍離脱や日本での出生などにより、上陸手続を経ずに日本に在留することになった外国人が在留資格を取得する手続。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-017
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第22条の2 / 第22条の3"
  source_locator: "在留資格取得許可申請ページ：手続概要・手続根拠"
  claim_type: procedure_scope
  applicable_statuses:
    - "all"
  application_type:
    - status_acquisition
  exclusion_scope:
    - "在留資格認定証明書"
    - "在留資格変更"
    - "在留期間更新"
  deep_water_candidate: false
applies_when:
  - "用户问日本出生的小孩办什么在留手续"
  - "用户问放弃日本国籍后如何取得在留资格"
does_not_cover:
  - "小孩应申请哪个具体在留资格"
  - "国籍法最终判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-status-acquisition-16-10
    url: https://www.moj.go.jp/isa/applications/procedures/16-10.html
    title: 在留資格取得許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取得許可申請
direct_fact_fields:
  - status_acquisition_for_birth_or_japanese_nationality_loss_without_landing_procedure
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA describes status acquisition as the procedure for people who become foreign nationals staying in Japan without landing procedure due to reasons such as Japanese nationality loss or birth in Japan."
    source_title: "在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続根拠"
    display_label: "在留資格取得：出生・日本国籍離脱等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取得 — 出生・日本国籍離脱等で上陸手続なしに在留する人の手続

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格取得許可申請は、日本国籍を離脱したことや日本で出生したことなどにより、上陸手続を受けずに日本に在留することとなった外国人が、在留資格を取得するための手続である。

## exceptions_or_transition

- どの在留資格を取得するかは、親の在留資格や身分関係などで別途確認する。
- COE、変更、更新とは別の手続として扱う。

## common_user_phrases

- 日本出生 小孩 在留資格取得
- 孩子在日本出生 办在留
- 出生后60天 在留资格
- 日本国籍离脱 在留資格取得
- 上陸手続なし 在留资格取得
- 新生儿 在留卡 取得许可

## must_say

- 出生や日本国籍離脱等で上陸手続を経ずに在留する場合の手続。
- 具体的な取得資格は別途確認する。

## must_not_say

- 日本出生就自动有在留资格。
- 这是普通 COE 或更新手续。

## qa_cases

### QA-1

**user**: 外国人夫妻的小孩在日本出生，要办什么？

**must_have**:

- 在留資格取得の可能性
- 出生後の期限確認

**must_not_have**:

- 自动取得日本国籍

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-017 |
