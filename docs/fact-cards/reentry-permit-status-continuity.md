---
fact_id: reentry-permit-status-continuity
title: 再入国許可 — 再入国時の上陸手続を簡略化し従前資格を継続扱いにする
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
citation_label: "再入国許可は従前の在留資格・在留期間を継続扱いにする"
citation_summary: "ISA は、再入国許可又はみなし再入国許可により再入国する場合、査証が免除され、従前の在留資格及び在留期間が継続しているものとみなされるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-095
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可"
  source_locator: "再入国許可の概要"
  claim_type: procedure_effect
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "再入国許可なし出国"
    - "上陸審査の個別可否判断"
  deep_water_candidate: false
applies_when:
  - "用户问再入国许可的作用、是不是重新办签证"
does_not_cover:
  - "已超过再入国期限后的再取得路线"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-overview
    url: https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html
    title: 再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格を持って一時的に出国し再入国する予定の外国人
direct_fact_fields:
  - reentry_permit_status_continuity
ai_inferred_fields: []
needs_review_flags:
  - id: landing_permission_not_guaranteed
    reason: "再入国制度の効果は上陸手続の簡略化であり、個別入国可否の保証ではない。"
evidence_points:
  - claim: "ISA は、再入国許可又はみなし再入国許可により再入国する場合、査証が免除され、従前の在留資格及び在留期間が継続しているものとみなされるとしている。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可の概要"
    display_label: "再入国許可の効果：査証免除・従前資格の継続扱い"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 再入国許可 — 再入国時の上陸手続を簡略化し従前資格を継続扱いにする

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

再入国許可又はみなし再入国許可により再入国する場合、査証が免除され、従前の在留資格及び在留期間が継続しているものとして扱われる。

## exceptions_or_transition

- これは上陸手続の簡略化と従前資格の継続扱いに関する説明であり、個別の入国可否を保証するものではない。

## common_user_phrases

- 再入国許可 何のため
- 再入国許可 ビザ 免除
- 再入国許可 在留資格 継続
- 再入国许可 重新签证
- みなし再入国 在留資格 継続
- 一時帰国 ビザ 取り直し

## must_say

- 再入国許可又はみなし再入国許可により、再入国時の査証が免除される。
- 従前の在留資格及び在留期間が継続しているものとして扱われる。

## must_not_say

- 再入国許可があれば入国が常に保証される。
- 再入国許可は新しい在留資格を与える制度である。

## qa_cases

### QA-1

**user**: 再入国許可があるとビザを取り直さなくていいですか？

**must_have**:

- 査証免除
- 従前の在留資格及び在留期間の継続扱い

**must_not_have**:

- 入国保証

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-095 |
