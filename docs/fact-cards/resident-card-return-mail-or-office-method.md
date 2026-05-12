---
fact_id: resident-card-return-mail-or-office-method
title: 在留カード返納 — 持参又は送付
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード返納は地方入管へ持参又は指定先へ送付"
citation_summary: "ISA は、在留カード等の返納方法として、住居地を管轄する地方出入国在留管理官署への直接持参、又は参考書式と返納理由を証する文書を添付した送付を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-095
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留カード等の返納手続"
  source_locator: "返納方法・送付による場合の返納先"
  claim_type: procedure_method
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - return
  exclusion_scope:
    - "空港で直ちに返納する出国場面"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡返纳寄到哪里、能不能邮寄"
does_not_cover:
  - "出国港で直ちに返納する場面"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-return
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    title: 在留カード等の返納
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留カードを所持する外国人
direct_fact_fields:
  - resident_card_return_method
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that return can be made by bringing the card to the regional immigration office with jurisdiction over the residence, or by sending it with the reference form and documents proving the reason for return to the listed destination."
    source_title: "在留カード等の返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "返納方法・送付による場合の返納先"
    display_label: "返納方法：地方入管へ持参又は指定先へ送付"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード返納 — 持参又は送付

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カード等の返納は、住居地を管轄する地方出入国在留管理官署へ直接持参するか、参考書式と返納理由を証する文書を添付して指定先へ送付する方法が案内されている。

## exceptions_or_transition

- 再入国許可によらず出国する場合は出入国港で直ちに返納する場面がある。
- 返納理由を証する文書には死亡証明書、戸籍謄本等が例示されている。

## common_user_phrases

- 在留カード 返納 郵送
- 在留カード 返納 送付先
- 在留カード 返納 持参
- 在留卡 返还 邮寄
- 在留卡 交回 寄到哪里
- 在留カード等返納 封筒
- 在留カード 返納 地方入管

## must_say

- 直接持参又は送付の方法が案内されている。
- 送付時は参考書式と返納理由を証する文書を添付する。

## must_not_say

- どの場面でも郵送だけでよい。
- 返納理由資料が不要と断定する。

## qa_cases

### QA-1

**user**: 在留カード返納は郵送できますか？

**must_have**:

- 持参又は送付
- 参考書式と返納理由を証する文書

**must_not_have**:

- 何も添付せず送るだけ

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-095 |
