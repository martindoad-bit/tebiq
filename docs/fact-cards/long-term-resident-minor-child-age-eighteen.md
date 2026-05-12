---
fact_id: long-term-resident-minor-child-age-eighteen
title: "定住者 — 未成年・未婚の実子路径は18歳未満に注意"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "定住者の18歳未満ルール"
citation_summary: "ISA の定住者ページは、定住者告示6号各号の『未成年』が2022年4月1日から18歳未満になり、18歳以上は未成年・未婚の実子として新規入国できないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者告示6号各号"
  source_locator: "成年年齢引下げ注意書き"
  claim_type: condition_anchor
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "個別の扶養実態判断"
    - "18歳到達前後の期限管理"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが未成年の子を定住者で呼ぶ相談をしている"
does_not_cover:
  - "個別の親子関係証明"
  - "18歳以上の別路径"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-long-term-resident-status
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "定住者の未成年・未婚の実子路径"
direct_fact_fields:
  - long_term_resident_minor_child_age_eighteen
ai_inferred_fields: []
needs_review_flags:
  - id: entry_before_birthday_timing
    reason: "在留資格認定証明書取得後の入国タイミングは個別ページで確認する。"
evidence_points:
  - claim: "ISA の定住者ページは、定住者告示6号各号の『未成年』が2022年4月1日から18歳未満になり、同日以降18歳以上の方は未成年・未婚の実子として新規に定住者で入国できないと説明している。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "成年年齢の引下げ等に関する注意書き"
    display_label: "定住者の未成年要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 未成年・未婚の実子路径は18歳未満に注意

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

定住者告示6号各号の「未成年」は、2022年4月1日から18歳未満として扱われる。

## exceptions_or_transition

- 18歳以上の場合、このカードは代替路径を判断しない。
- 扶養実態、親子関係、入国期限などは別途確認が必要。

## common_user_phrases

- 子供 定住者 18歳
- 定住者 18歳
- 未成年 定住者
- 未成年 未婚 実子
- 18歳 子供 定住ビザ
- 永住者の子 定住者
- 定住者 未婚の実子
- 小孩定住签证 18岁

## must_say

- 未成年・未婚の実子路径では18歳未満の条件に注意する。

## must_not_say

- 20歳未満なら今でも未成年子として新規入国できる。
- 18歳以上でも同じ定住者路径で当然いける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-003 |
