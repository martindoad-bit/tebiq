---
fact_id: guard-hsp-family-benefits-require-main-hsp-jskip
title: "高度専門職家族特例 — 主たる高度専門職等が前提"
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
citation_label: "高度専門職家族特例: 主たる資格が前提"
citation_summary: "ISA の配偶者就労、親、家事使用人の各ページは、高度専門職外国人又は特別高度人材外国人を前提に説明している。家族側だけで独立して判断しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職優遇措置 / 特定活動"
  source_locator: "配偶者就労・親・家事使用人各ページ"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "主たる申請人の高度専門職該当性"
    - "家族側の個別許可可否"
    - "主たる資格喪失後の在留継続判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職等の家族特例を家族側の独立資格として扱っている相談"
direct_fact_fields:
  - hsp_family_benefits_require_main_hsp_jskip
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_family_main_status_review
    reason: "主たる高度専門職等の在留資格、同居、活動継続、家族側の申請類型を確認する必要がある。"
evidence_points:
  - claim: "ISA の就労する配偶者ページは、高度専門職外国人又は特別高度人材外国人の配偶者を前提にしている。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "配偶者就労: 主たる高度専門職等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の親ページは、高度専門職外国人又は特別高度人材外国人等の親を前提にしている。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "親の特例: 主たる高度専門職等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の家事使用人ページは、高度専門職外国人又は特別高度人材外国人の家事使用人を前提にしている。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "家事使用人: 主たる高度専門職等"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家族特例 — 主たる高度専門職等が前提

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職等の配偶者就労、親、家事使用人の特例は、主たる高度専門職外国人又は特別高度人材外国人を前提に確認する。家族側だけで独立した長期資格のように扱わない。

## exceptions_or_transition

- このカードは、主たる高度専門職等が転職、変更、不許可、資格喪失した場合の家族側の処理を判断しない。

## common_user_phrases

- 高度専門職 家族 特例 主申请人
- J-Skip 家族 主申请人
- 高度人才 家属 主申请人 换签
- 特別高度人材 配偶者 親 家事使用人
- 高度専門職 家族 優遇
- 高度人材 家族 独立签证

## must_say

- 高度専門職等の家族特例は、主たる高度専門職等の存在を前提に確認する。
- 家族側だけで独立して可否を決めない。

## must_not_say

- 家族特例は主たる高度専門職等の状態と無関係に続く。
- 家族側が一度許可されれば主たる資格を見なくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-005 |
