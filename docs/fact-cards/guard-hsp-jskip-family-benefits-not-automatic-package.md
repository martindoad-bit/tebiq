---
fact_id: guard-hsp-jskip-family-benefits-not-automatic-package
title: "高度専門職等の家族優遇 — 自動セットではない"
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
citation_label: "高度専門職等家族優遇: 自動セットではない"
citation_summary: "ISA は J-Skip 等の優遇措置として配偶者就労、親の帯同、家事使用人を案内しているが、それぞれ別ページで要件や資料を示している。家族全体が自動で許可されるとは扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-017
  authority_layer: L4 ISA Resource/Status Page
  legal_source_type: official_resource_page
  law_article_ref: "高度専門職優遇措置 / 特定活動"
  source_locator: "J-Skip優遇措置 / 配偶者・親・家事使用人各ページ"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "配偶者就労の許可可否"
    - "親の帯同可否"
    - "家事使用人の雇用可否"
    - "家族全体の同時申請可否"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
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
  - "高度専門職又はJ-Skip取得後に家族関連優遇が自動で全部使えると誤解している相談"
direct_fact_fields:
  - hsp_jskip_family_benefits_not_automatic_package
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_jskip_family_package_review
    reason: "配偶者、親、家事使用人は別制度・別要件で確認する必要がある。"
evidence_points:
  - claim: "ISA の J-Skip ページは、優遇措置として配偶者の就労、一定条件下での親の帯同、一定条件下での家事使用人の雇用を列挙している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "優遇措置"
    display_label: "J-Skip: 家族関連優遇"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は配偶者就労、親、家事使用人をそれぞれ別の特定活動ページで案内している。"
    source_title: "高度専門職等の配偶者・親・家事使用人ページ"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "各ページ見出し"
    display_label: "家族関連優遇: 別ページで確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の家族優遇 — 自動セットではない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職又はJ-Skipの家族関連優遇は、配偶者就労、親、家事使用人をそれぞれ別に確認する。主たる人が高度専門職等になっただけで、家族全体が自動で許可されるセットとは扱わない。

## exceptions_or_transition

- このカードは、配偶者、親、家事使用人の個別申請が許可されるか、同時申請できるか、又はどの資料で足りるかを判断しない。

## common_user_phrases

- J-Skip 家族 全部 自動
- 高度専門職 家族 優遇 自動
- 高度人材 配偶者 父母 家事使用人 全部
- 特別高度人材 家族 福利 一套
- J-Skip 取得 家族 来日 自动
- 高度専門職 家族 セット

## must_say

- 家族関連優遇は、配偶者就労、親、家事使用人を別々に確認する。
- 主たる人が高度専門職等でも、家族全体が自動で許可されるとは扱わない。

## must_not_say

- J-Skipになれば配偶者、父母、家事使用人が全員自動で来日できる。
- 高度専門職の家族優遇は一つのセットでまとめて許可される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-017 |
