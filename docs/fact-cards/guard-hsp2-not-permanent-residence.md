---
fact_id: guard-hsp2-not-permanent-residence
title: "高度専門職2号 — 永住許可とは別"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度専門職2号: 永住とは別"
citation_summary: "ISA は高度専門職2号について在留期間が無期限となると説明する一方、永住許可は別にガイドラインがある。無期限在留を永住許可と同一視しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-008
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度専門職2号 / 永住許可"
  source_locator: "高度専門職優遇措置 / 永住許可ガイドライン"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職2号"
    - "永住者"
  application_type:
    - current-status
    - permanent_residence
  exclusion_scope:
    - "永住許可の見込み"
    - "在留カード更新手続"
    - "高度専門職2号から永住への申請判断"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職2号の無期限在留を永住許可と混同している相談"
direct_fact_fields:
  - hsp2_not_permanent_residence
ai_inferred_fields: []
needs_review_flags:
  - id: hsp2_pr_distinction_review
    reason: "高度専門職2号の手続と永住許可申請は別制度として確認する必要がある。"
evidence_points:
  - claim: "ISA は高度専門職2号について、在留期間が無期限となると説明している。"
    source_title: "どのような優遇措置が受けられる？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職2号の優遇措置"
    display_label: "高度専門職2号: 在留期間無期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は永住許可について、永住許可に関するガイドラインとして別に要件を案内している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ガイドライン"
    display_label: "永住許可: 別ガイドライン"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職2号 — 永住許可とは別

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職2号は在留期間が無期限となるが、永住許可そのものとは別に扱う。永住許可は別のガイドラインに沿って確認する。

## exceptions_or_transition

- このカードは、高度専門職2号から永住許可を申請できるか、在留カード更新がどうなるか、又は永住許可見込みを判断しない。

## common_user_phrases

- 高度専門職2号 永住
- 高度専門職2号 無期限 永住者
- HSP2 permanent residence
- 高度人材2号 PR
- J-Skip 2号 永住
- 高度専門職2号 在留カード 永住

## must_say

- 高度専門職2号の無期限在留と永住許可は分ける。
- 永住許可は別の制度として確認する。

## must_not_say

- 高度専門職2号は永住者と同じ。
- 高度専門職2号になれば永住申請は不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-008 |
