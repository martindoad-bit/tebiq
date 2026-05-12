---
fact_id: resident-card-found-old-card-return-after-reissue
title: 紛失後に見つかった旧在留カード — 発見日から14日以内に返納
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
citation_label: "再交付後に旧在留カードを発見したら14日以内に返納"
citation_summary: "ISA は、紛失を理由として新たな在留カードの再交付を受けた後に旧在留カードを発見した場合、発見の日から14日以内に古い在留カードを返納する必要があるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-096
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留カード等の返納手続"
  source_locator: "1 在留カードの返納手続"
  claim_type: deadline_window
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - return
  exclusion_scope:
    - "有効な新在留カードの返納"
  deep_water_candidate: false
applies_when:
  - "用户问补办后旧在留卡又找到了怎么办"
does_not_cover:
  - "旧カードを本人確認書類として使えるか"
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
  - old_resident_card_found_after_reissue_return_14_days
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA states that if a person receives a new residence card after loss and then finds the old lost card, the old card must be returned within 14 days from the day it was found."
    source_title: "在留カード等の返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 在留カードの返納手続"
    display_label: "旧在留カード発見：発見日から14日以内に返納"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 紛失後に見つかった旧在留カード — 発見日から14日以内に返納

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

紛失を理由として新たな在留カードの再交付を受けた後、紛失した旧在留カードを発見した場合は、発見の日から14日以内に古い在留カードを返納する必要がある。

## exceptions_or_transition

- 有効な新しい在留カードを返納する話ではない。
- 古いカードを使い続けてよいとは扱わない。

## common_user_phrases

- 古い在留カード 見つかった
- 在留カード 再交付後 見つかった
- 紛失した在留カード 発見 14日
- 旧在留カード 返納 14日
- 补办后 旧在留卡 找到了
- 在留卡 补办 后 找回 旧卡
- 古いカード 使える 在留カード

## must_say

- 再交付後に旧カードを発見した場合、発見日から14日以内に返納。
- 返すのは古い在留カード。

## must_not_say

- 旧カードをそのまま使ってよい。
- 新しいカードを返すと案内する。

## qa_cases

### QA-1

**user**: 在留卡补办后旧卡又找到了，可以留着吗？

**must_have**:

- 旧カードを発見日から14日以内に返納
- 新カードではなく旧カード

**must_not_have**:

- 旧カードを使い続けてよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-096 |
