---
fact_id: resident-card-loss-reissue-fourteen-day
title: 在留カード紛失等再交付 — 知った日から14日以内
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
citation_label: "在留カード紛失等の再交付は知った日から14日以内"
citation_summary: "ISA は、在留カードの紛失、盗難、滅失等で所持を失った場合、当該事実を知った日から14日以内に再交付申請を行うとしている。国外で知った場合は、その後最初に入国した日から数える。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-089
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の12"
  source_locator: "手続対象者・申請期間"
  claim_type: deadline_window
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - application
  exclusion_scope:
    - "在留期間更新許可申請"
    - "在留カード有効期間更新申請"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡丢失、被偷、灭失后多久内补办"
does_not_cover:
  - "护照遗失"
  - "在留资格或在留期间是否失效的判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-loss-reissue
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    title: 紛失等による在留カードの再交付申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_loss_reissue_14_day_deadline
ai_inferred_fields: []
needs_review_flags:
  - id: late_reissue_consequence_requires_review
    reason: "Late reissue consequences and review impact are case-specific."
evidence_points:
  - claim: "ISA states that a mid- to long-term resident who lost possession of the residence card through loss, theft, destruction, or similar cause must apply within 14 days from the day they became aware of the event; if they learned while outside Japan, from the first day of entry thereafter."
    source_title: "紛失等による在留カードの再交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者・申請期間"
    display_label: "在留カード紛失等：知った日から14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード紛失等再交付 — 知った日から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カードを紛失、盗難、滅失その他の事由で所持しなくなった中長期在留者は、その事実を知った日から14日以内に再交付申請を行う。国外で知った場合は、その後最初に入国した日から14日以内。

## exceptions_or_transition

- 14日を超えた場合は理由等を記載した書類が別途必要になる。
- 在留カードをなくしたことと、在留資格そのものの喪失は別問題。

## common_user_phrases

- 在留カード 紛失 14日
- 在留カード なくした 14日以内
- 在留カード 再交付 期限
- 在留卡 丢了 多久内
- 在留卡 被偷 14天
- 在留カード 紛失 再交付
- 在留卡 丢了 等更新

## must_say

- 紛失等を知った日から14日以内。
- 国外で知った場合は、その後最初に入国した日から14日以内。

## must_not_say

- 次の在留期間更新まで待てばよい。
- 在留カードをなくしただけで在留資格が自動的に失効すると言う。

## qa_cases

### QA-1

**user**: 在留卡丢了可以等续签一起补吗？

**must_have**:

- 知った日から14日以内
- 再交付申請は更新とは別

**must_not_have**:

- 次回更新でよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-089 |
