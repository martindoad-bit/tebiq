---
fact_id: permanent-resident-no-reentry-departure-status-extinguishes
title: 永住者の出国 — 再入国許可なし出国は従前資格消滅リスク
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
citation_label: "再入国許可なし出国は永住者にも重大"
citation_summary: "ISA は、再入国許可又はみなし再入国許可を受けずに出国した場合、その外国人が有していた在留資格及び在留期間は消滅し、再入国には新たな査証取得と上陸申請が必要になると説明している。永住者でも、在留カードが有効なら戻れるとは扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-060
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第26条 / 第26条の2"
  source_locator: "再入国許可を受けないで出国した場合"
  claim_type: reentry_boundary
  applicable_statuses:
    - "permanent_resident"
    - "valid_residence_status_holder"
  application_type:
    - reentry
    - special_reentry
  exclusion_scope:
    - "すでに海外にいる場合の補救"
    - "上陸審査の個別可否"
  deep_water_candidate: true
applies_when:
  - "用户问永住者忘记みなし再入国、没办再入国、出境后还能不能回"
does_not_cover:
  - "出国後の回復可能性"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
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
  - 永住者
  - 再入国許可なしで出国した在留資格保持者
direct_fact_fields:
  - permanent_resident_no_reentry_departure_status_extinguishes
ai_inferred_fields: []
needs_review_flags:
  - id: post_departure_recovery_requires_review
    reason: "すでに出国済みの場合の査証、上陸申請、補救可能性は個別確認が必要。"
evidence_points:
  - claim: "ISA は、再入国許可又はみなし再入国許可を受けずに出国した場合、その外国人が有していた在留資格及び在留期間は消滅し、再入国には新たな査証取得と上陸申請が必要になると説明している。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可を受けないで出国した場合"
    display_label: "永住者の出国：再入国許可なしは重大リスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者の出国 — 再入国許可なし出国は従前資格消滅リスク

## current_date_logic

Checked against the ISA reentry-permit page on 2026-05-12.

## current_effective_fact

ISA は、再入国許可又はみなし再入国許可を受けずに出国した場合、その外国人が有していた在留資格及び在留期間は消滅し、再入国には新たな査証取得と上陸申請が必要になると説明している。永住者でも、在留カードが有効なら戻れるとは扱わない。

## exceptions_or_transition

- すでに出国済みの場合は、出国時の記録と個別対応を確認する。
- みなし再入国の意思表示をしたか、通常再入国許可があるかを分ける。

## common_user_phrases

- 永住者 みなし再入国 忘れた
- 永住 再入国許可なし 出国
- 永住カード 有効 戻れる
- 永住 海外 失効
- 永住 出国カード チェック忘れ
- PR Japan forgot re-entry
- 永住者 出国 没有再入国許可
- 没勾みなし再入国 在留資格

## must_say

- 再入国許可又はみなし再入国許可なしの出国は、従前資格消滅につながる重大リスク。
- 在留カードが有効なら必ず戻れるとは言わない。

## must_not_say

- 永住者なら再入国許可なしでも戻れる。
- 空港で説明すれば必ず解決する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-060 |
