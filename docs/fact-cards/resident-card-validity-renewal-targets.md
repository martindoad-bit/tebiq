---
fact_id: resident-card-validity-renewal-targets
title: 在留カード有効期間更新 — 対象者
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード有効期間更新の対象は永住者・高度専門職2号・16歳到達前"
citation_summary: "ISA は、在留カード有効期間更新申請の対象者を、永住者、高度専門職2号、又は在留カード有効期間満了日が16歳の誕生日等とされている中長期在留者としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-091
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の11"
  source_locator: "手続対象者"
  claim_type: procedure_scope
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
    - "mid_long_term_resident_under_16_card_expiry"
  application_type:
    - application
  exclusion_scope:
    - "在留期間更新許可申請"
    - "紛失等再交付申請"
  deep_water_candidate: false
applies_when:
  - "用户问永住者在留卡、高度专门职2号或孩子的卡面有效期更新"
does_not_cover:
  - "普通就劳签证的在留期间更新"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
  - 高度専門職2号
  - 在留カード有効期間満了日が16歳到達時期の中長期在留者
direct_fact_fields:
  - resident_card_validity_renewal_targets
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists permanent residents, highly skilled professional no. 2 holders, and mid- to long-term residents whose residence-card validity expires at around the 16th birthday as targets."
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "対象：永住者・高度専門職2号・16歳到達前"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード有効期間更新 — 対象者

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カード有効期間更新申請の対象者は、永住者、高度専門職2号、又は在留カード有効期間満了日が16歳の誕生日等とされている中長期在留者。

## exceptions_or_transition

- これは在留カードの有効期間更新であり、在留期間更新許可申請とは別。
- 紛失、盗難、滅失等は再交付申請の軸で見る。

## common_user_phrases

- 永住者 在留カード 有効期間 更新
- 高度専門職2号 在留カード 更新
- 子供 在留カード 16歳 更新
- 在留カード 有効期間 更新 対象
- 永住卡 到期 更新
- 在留卡有效期 更新 永住
- 在留カード 期限 在留期間 違い

## must_say

- 対象は永住者、高度専門職2号、16歳到達前のカード有効期間更新対象者。
- 在留期間更新とは別。

## must_not_say

- 永住者の在留資格更新と表現する。
- カード有効期間更新を紛失再交付と混同する。

## qa_cases

### QA-1

**user**: 永住者の在留カードが切れそうです。永住を更新しますか？

**must_have**:

- 在留カード有効期間更新
- 永住者の在留資格更新とは別

**must_not_have**:

- 永住資格の期間更新

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-091 |
