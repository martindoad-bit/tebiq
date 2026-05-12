---
fact_id: no-reentry-departure-status-extinguishes
title: 再入国許可なし出国 — 従前の在留資格及び在留期間は消滅する
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
citation_label: "再入国許可なし出国は従前資格の消滅につながる"
citation_summary: "ISA は、再入国許可又はみなし再入国許可を受けずに出国すると、その時点で有していた在留資格及び在留期間は消滅し、再び日本に入国するには改めて査証取得・上陸申請が必要になるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-096
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可"
  source_locator: "再入国許可を受けないで出国した場合"
  claim_type: permission_boundary
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国として出国意思を示した一時出国"
    - "普通再入国許可による出国"
  deep_water_candidate: true
applies_when:
  - "用户问没办再入国、忘记手续、离境后还能不能回"
does_not_cover:
  - "离境后个案补救路线或上陆审查结果"
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
  - 在留資格を持つ外国人
direct_fact_fields:
  - no_reentry_departure_status_extinguishes
ai_inferred_fields: []
needs_review_flags:
  - id: post_departure_recovery_requires_review
    reason: "出国後の入国可否、査証取得、上陸申請は個別確認が必要。"
evidence_points:
  - claim: "ISA は、再入国許可又はみなし再入国許可を受けずに出国すると、その時点で有していた在留資格及び在留期間は消滅し、再び日本に入国するには改めて査証取得と上陸申請が必要になるとしている。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可を受けないで出国した場合"
    display_label: "許可なし出国：従前資格・期間の消滅"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 再入国許可なし出国 — 従前の在留資格及び在留期間は消滅する

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

再入国許可又はみなし再入国許可を受けずに出国すると、その時点で有していた在留資格及び在留期間は消滅する。再び日本に入国するには、改めて査証取得と上陸申請が必要になる。

## exceptions_or_transition

- 「出国時にみなし再入国の意思表示をしたか」「在留期限内か」「期限内に戻れるか」の確認が先になる。
- 出国後の補救や再入国可否は個別判断になる。

## common_user_phrases

- 再入国許可なし 出国 在留資格 消える
- みなし再入国 忘れた 海外
- 出国カード チェック 忘れた
- 在留カード 有効 でも 戻れる
- 再入国许可 没办 回日本
- 一時帰国 手続き忘れた

## must_say

- 再入国許可又はみなし再入国許可を受けずに出国すると、従前の在留資格及び在留期間は消滅する。
- 再び入国するには改めて査証取得と上陸申請が必要になる。

## must_not_say

- 在留カードが有効なら必ず戻れる。
- 忘れても空港で説明すれば必ず大丈夫。

## qa_cases

### QA-1

**user**: 出国カードでみなし再入国にチェックし忘れたかもしれません。

**must_have**:

- みなし再入国として出国したか確認
- 許可なし出国なら従前資格消滅の重大リスク
- 個別確認が必要

**must_not_have**:

- 必ず戻れる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-096 |
