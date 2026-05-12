---
fact_id: long-term-resident-dependent-minor-child-router
title: "定住者 — 扶養を受ける未成年・未婚の実子路径"
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
citation_label: "扶養を受ける未成年・未婚の実子"
citation_summary: "ISA の定住者ページは、永住者・定住者・日本人の配偶者等・永住者の配偶者等・特別永住者の扶養を受けて生活する未成年で未婚の実子の場合の個別ページを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-006
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『定住者』未成年・未婚の実子ページ"
  source_locator: "扶養を受けて生活する未成年で未婚の実子"
  claim_type: subtype_router
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "親子関係証明"
    - "扶養実態"
    - "18歳到達前後の期限管理"
  deep_water_candidate: true
applies_when:
  - "ユーザーが子を定住者として呼ぶ相談をしている"
does_not_cover:
  - "家族滞在"
  - "日本人の配偶者等の実子路径"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-long-term-resident-status
    url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    title: 在留資格「定住者」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-long-term-resident-dependent-minor-child
    url: https://www.moj.go.jp/isa/applications/status/longtermresident04.html
    title: 在留資格「定住者」（扶養を受けて生活する未成年で未婚の実子の場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "定住者の未成年・未婚の実子相談"
direct_fact_fields:
  - long_term_resident_dependent_minor_child_router
ai_inferred_fields: []
needs_review_flags:
  - id: support_and_family_relation_detail
    reason: "扶養者の資格別に分岐するため詳細カード化が必要。"
evidence_points:
  - claim: "ISA の定住者ページは、対象資格者の扶養を受けて生活する未成年で未婚の実子の場合の個別ページを掲げている。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "扶養を受けて生活する未成年で未婚の実子"
    display_label: "定住者: 扶養を受ける未成年・未婚の実子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 扶養を受ける未成年・未婚の実子路径

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、対象資格者の扶養を受けて生活する未成年で未婚の実子の場合の定住者個別ページを設けている。

## exceptions_or_transition

- 18歳未満、未婚、扶養実態、親子関係の確認が必要。
- 家族滞在や日本人の配偶者等とは別路径として整理する。

## common_user_phrases

- 永住者の子 定住者
- 定住者の子供 呼び寄せ
- 子供 呼び寄せ
- 未成年 未婚 実子 定住者
- 扶養 未成年 未婚
- 子供 定住ビザ 扶養
- 小孩 定住签证 抚养

## must_say

- 子の定住者路径では年齢、未婚、扶養、親子関係を分けて確認する。

## must_not_say

- 親が永住者なら子は必ず定住者になる。
- 18歳以上でも未成年子路径でよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-006 |
