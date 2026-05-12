---
fact_id: long-term-resident-nikkei-third-generation-router
title: "定住者 — 日系3世路径は個別ページで確認する"
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
citation_label: "日系3世の定住者ページ"
citation_summary: "ISA の定住者ページは、外国人申請人が日系3世である場合の個別ページを掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-004
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『定住者』日系3世ページ"
  source_locator: "申請人が日系3世である場合"
  claim_type: subtype_router
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "日系関係の証明十分性"
    - "素行・扶養・生活安定の個別判断"
    - "日系4世制度"
  deep_water_candidate: true
applies_when:
  - "ユーザーが日系3世として定住者を検討している"
does_not_cover:
  - "日系4世制度"
  - "書類不足時の補正判断"
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
  - id: isa-long-term-resident-nikkei-third
    url: https://www.moj.go.jp/isa/applications/status/longtermresident_01.html
    title: 在留資格「定住者」（外国人（申請人）の方が日系３世である場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系3世の定住者相談"
direct_fact_fields:
  - long_term_resident_nikkei_third_generation_router
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_evidence_detail_pending
    reason: "日系関係を証する資料の詳細は個別ページ・チェックシートで別カード化する。"
evidence_points:
  - claim: "ISA の定住者ページは、申請人が日系3世である場合の個別ページを掲げている。"
    source_title: "在留資格「定住者」"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "外国人（申請人）の方が日系3世である場合"
    display_label: "定住者: 日系3世路径"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 定住者 — 日系3世路径は個別ページで確認する

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、定住者の個別路径として「申請人が日系3世である場合」のページを設けている。

## exceptions_or_transition

- 日系3世であることの証明、生活安定、素行などの個別判断はこのカードで結論しない。
- 日系4世は別制度として扱う。

## common_user_phrases

- 日系3世 定住者
- 日系三世 定住ビザ
- 日系人 定住者
- 日系3世 日本に住みたい
- Nikkei third generation long term resident
- 日裔三世 定住签证

## must_say

- 日系3世は定住者の個別ページにルートする。

## must_not_say

- 日系3世なら必ず許可される。
- 日系4世も同じ定住者路径でよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-004 |
