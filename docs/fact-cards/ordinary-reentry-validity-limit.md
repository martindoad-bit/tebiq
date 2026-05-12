---
fact_id: ordinary-reentry-validity-limit
title: 通常再入国許可 — 有効期間は現有在留期間内で最長5年
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "通常再入国許可は在留期間内・最長5年"
citation_summary: "ISA は、通常の再入国許可の有効期間について、現に有する在留期間の範囲内で最長5年、特別永住者は最長6年としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-099
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可"
  source_locator: "有効期間"
  claim_type: validity_limit
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国の1年ルール"
  deep_water_candidate: false
applies_when:
  - "用户问普通再入国许可最长多久、能不能超过在留期限"
does_not_cover:
  - "普通再入国许可在国外延长的具体个案"
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
  - 通常再入国許可を申請する外国人
direct_fact_fields:
  - ordinary_reentry_validity_limit
ai_inferred_fields: []
needs_review_flags:
  - id: extension_abroad_requires_separate_card
    reason: "海外での普通再入国許可延長は別論点として扱う。"
evidence_points:
  - claim: "ISA は、通常の再入国許可の有効期間を、現に有する在留期間の範囲内で最長5年、特別永住者は最長6年としている。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "有効期間"
    display_label: "通常再入国許可：在留期間内・最長5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 通常再入国許可 — 有効期間は現有在留期間内で最長5年

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

通常再入国許可の有効期間は、現に有する在留期間の範囲内で最長5年。特別永住者は最長6年。

## exceptions_or_transition

- 在留期限が先に来る場合は、通常再入国許可だけで在留期限を超えて資格が伸びるわけではない。

## common_user_phrases

- 再入国許可 最長 5年
- 再入国許可 在留期限 まで
- 再入国許可 有効期間
- 特別永住者 再入国許可 6年
- 再入国许可 最长几年
- 2年帰国 在留期限 再入国許可

## must_say

- 通常再入国許可は現に有する在留期間の範囲内。
- 通常は最長5年、特別永住者は最長6年。

## must_not_say

- 通常再入国許可を取れば在留期限も自動で延びる。
- すべての人が6年まで取れる。

## qa_cases

### QA-1

**user**: 再入国許可を取れば5年海外にいられますか？

**must_have**:

- 現に有する在留期間の範囲内
- 最長5年

**must_not_have**:

- 在留期限も自動延長

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-099 |
