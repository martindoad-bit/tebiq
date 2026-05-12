---
fact_id: special-reentry-excluded-cancellation-proceeding
title: みなし再入国 — 取消手続中など対象外の人がいる
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "みなし再入国の対象外"
citation_summary: "ISA は、在留資格取消手続中の者、出国確認の留保対象者、収容令書の発付を受けている者、特定活動で難民認定申請中の者などを、みなし再入国許可の対象外としている。取消・収容・難民申請などが絡む出国は一般案内で済ませない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-062
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条の2"
  source_locator: "みなし再入国許可の対象外"
  claim_type: exclusion_boundary
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
    - cancellation
  exclusion_scope:
    - "個別の出国可否判断"
    - "通常再入国許可の取得可能性"
  deep_water_candidate: true
applies_when:
  - "用户问取消手続中、収容、難民申請中还能不能みなし再入国"
does_not_cover:
  - "通常再入国許可が取れるか"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - みなし再入国を利用しようとする外国人
direct_fact_fields:
  - special_reentry_excluded_cancellation_proceeding
ai_inferred_fields: []
needs_review_flags:
  - id: departure_under_proceeding_requires_review
    reason: "取消手続、収容、難民申請、公安上の理由などが絡む場合は個別確認が必要。"
evidence_points:
  - claim: "ISA は、在留資格取消手続中の者、出国確認の留保対象者、収容令書の発付を受けている者、特定活動で難民認定申請中の者などを、みなし再入国許可の対象外としている。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象外"
    display_label: "みなし再入国：取消手続中などは対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# みなし再入国 — 取消手続中など対象外の人がいる

## current_date_logic

Checked against the ISA special reentry page on 2026-05-12.

## current_effective_fact

ISA は、在留資格取消手続中の者、出国確認の留保対象者、収容令書の発付を受けている者、特定活動で難民認定申請中の者などを、みなし再入国許可の対象外としている。取消・収容・難民申請などが絡む出国は一般案内で済ませない。

## exceptions_or_transition

- 対象外の場合、通常再入国許可を含めて個別確認が必要。
- 取消通知や出頭要請がある場合は、出国前に専門確認する。

## common_user_phrases

- 在留資格取消手続中 みなし再入国
- 取消通知 旅行 出国
- 難民申請中 みなし再入国
- 収容令書 再入国
- 入管から通知 出国
- 永住取消手続中 海外
- 在留資格取消 手続中 みなし再入国
- 取消手続 特別再入国

## must_say

- 取消手続中など、みなし再入国の対象外になる人がいる。
- 通知や手続中の出国は個別確認する。

## must_not_say

- 在留カードがあれば誰でもみなし再入国を使える。
- 取消手続中でも普通の旅行と同じ。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-062 |
