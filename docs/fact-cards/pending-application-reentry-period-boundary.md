---
fact_id: pending-application-reentry-period-boundary
title: 更新・変更申請中の出国 — みなし再入国は1年と特例期間の早い方に注意
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "申請中の出国は1年・在留期限後2か月・結果受領の境界を見る"
citation_summary: "ISA Q&A は、更新・変更申請中に再入国許可又はみなし再入国許可で出国すること自体は可能としつつ、みなし再入国の場合は出国日から1年又は在留期限満了日から2か月の早い日までに再入国し、満了日から2か月以内に処分を受ける必要がある旨を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-107
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "申請中の再入国"
  source_locator: "Q61・オンライン Q4-18"
  claim_type: permission_boundary
  applicable_statuses:
    - "pending_renewal_or_change_application"
  application_type:
    - renewal
    - change
    - reentry
  exclusion_scope:
    - "不許可後の出国"
    - "申請未提出の期限切れ"
  deep_water_candidate: true
applies_when:
  - "用户问更新或变更申请中能不能出国、特例期间能不能みなし再入国"
does_not_cover:
  - "申请中个案是否应出境"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-general-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html?hl=ja
    title: 入国・在留審査要領等に関する Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-online-qa
    url: https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja
    title: 在留申請オンラインシステム Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新又は在留資格変更申請中の外国人
direct_fact_fields:
  - pending_application_reentry_period_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: travel_while_pending_requires_case_review
    reason: "申請結果通知、在留カード受領、雇用・活動状況への影響は個別確認が必要。"
evidence_points:
  - claim: "ISA Q&A は、更新・変更申請中に再入国許可又はみなし再入国許可で出国すること自体は可能としつつ、みなし再入国の場合は出国日から1年又は在留期限満了日から2か月の早い日までに再入国し、満了日から2か月以内に処分を受ける必要がある旨を示している。"
    source_title: "入国・在留審査要領等に関する Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q61"
    display_label: "申請中の出国：1年・満了後2か月・結果受領の境界"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 更新・変更申請中の出国 — みなし再入国は1年と特例期間の早い方に注意

## current_date_logic

Checked against current ISA Q&A pages on 2026-05-12.

## current_effective_fact

更新・変更申請中に再入国許可又はみなし再入国許可で出国すること自体は可能とされている。ただし、みなし再入国の場合は、出国日から1年又は在留期限満了日から2か月の早い日までに再入国し、満了日から2か月以内に処分を受ける必要がある。

## exceptions_or_transition

- 申請結果を受け取れない、在留カードを受領できない、連絡が取れないなどの実務リスクがある。
- 「出国可能」と「個案として出国してよい」は別。

## common_user_phrases

- 更新申請中 出国 みなし再入国
- 在留期間更新 申請中 一時帰国
- 変更申請中 出国
- 特例期間 みなし再入国
- 在留カード 申請中 シール 出国
- 更新申请中 回国 可以吗

## must_say

- 申請中でも再入国許可又はみなし再入国による出国自体は可能と案内されている。
- みなし再入国の場合は、1年又は満了日から2か月の早い方に注意する。
- 満了日から2か月以内に処分を受ける必要がある。

## must_not_say

- 申請中でも自由にいつでも出入国できる。
- 申請中なら2か月を超えても問題ない。

## qa_cases

### QA-1

**user**: 更新申請中で在留期限は切れました。みなし再入国で一時帰国できますか？

**must_have**:

- 申請中の出国自体は可能とされる
- 1年又は満了後2か月の早い方
- 結果受領のリスク

**must_not_have**:

- いつ戻ってもよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-107 |
