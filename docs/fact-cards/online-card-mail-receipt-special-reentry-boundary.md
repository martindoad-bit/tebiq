---
fact_id: online-card-mail-receipt-special-reentry-boundary
title: オンライン申請後のカード郵送受領中 — 在留カードが手元にないとみなし再入国できない
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
citation_label: "カード郵送受領中に在留カードが手元にない場合はみなし再入国できない"
citation_summary: "ISA のオンライン申請 Q&A は、郵送で在留カード等を受け取る手続中、在留カードが手元にない場合は、有効な在留カード所持が条件となるみなし再入国許可による出国はできないとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-113
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "Q6-3"
  claim_type: permission_boundary
  applicable_statuses:
    - "online_application_user"
  application_type:
    - renewal
    - change
    - special_reentry
  exclusion_scope:
    - "在留カードが手元にない状態でのみなし再入国"
  deep_water_candidate: true
applies_when:
  - "用户问线上申请后邮寄拿卡期间能不能出国"
does_not_cover:
  - "普通再入国许可或窗口领取安排"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-online-qa
    url: https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja
    title: 在留申請オンラインシステム Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - オンライン申請後に在留カード等を郵送で受け取る外国人
direct_fact_fields:
  - online_card_mail_receipt_special_reentry_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: travel_during_card_receipt_requires_review
    reason: "出国予定がある場合の受領方法や普通再入国許可の要否は個別確認が必要。"
evidence_points:
  - claim: "ISA のオンライン申請 Q&A は、郵送で在留カード等を受け取る手続中、在留カードが手元にない場合は、有効な在留カード所持が条件となるみなし再入国許可による出国はできないとしている。"
    source_title: "在留申請オンラインシステム Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q6-3"
    display_label: "カード郵送受領中：在留カードなしではみなし再入国不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# オンライン申請後のカード郵送受領中 — 在留カードが手元にないとみなし再入国できない

## current_date_logic

Checked against current ISA online application Q&A on 2026-05-12.

## current_effective_fact

郵送で在留カード等を受け取る手続中、在留カードが手元にない場合は、有効な在留カード所持が条件となるみなし再入国許可による出国はできない。

## exceptions_or_transition

- 出国予定がある場合は、カード受領方法や普通再入国許可の要否を事前に確認する。
- 在留カードが手元にある通常の場面とは分けて判断する。

## common_user_phrases

- 在留カード 郵送受領中 出国
- オンライン申請 カード 郵送 みなし再入国
- 在留カード 手元にない みなし再入国
- 结果出来了 在留卡 邮寄 出国
- 更新オンライン 在留カード返送中 出国
- カードなし 一時帰国 みなし再入国

## must_say

- 在留カードが手元にない場合、みなし再入国許可による出国はできない。
- みなし再入国には有効な在留カード所持が条件となる。

## must_not_say

- オンライン申請のメールがあれば在留カードなしで出国できる。
- カード郵送中でもみなし再入国は必ず使える。

## qa_cases

### QA-1

**user**: オンライン更新後、在留カードを郵送で受け取る前に出国できますか？

**must_have**:

- 在留カードが手元にない場合はみなし再入国不可
- 事前確認が必要

**must_not_have**:

- メールがあれば出国可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-113 |
