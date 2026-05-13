---
fact_id: ssw-skill-japanese-not-only-requirements-source
title: "特定技能 — 試験合格だけで全体要件を判断しない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能: 試験以外の確認点"
citation_summary: "ISA の特定技能ページは、特定技能を雇用契約に基づく活動として案内し、提出書類も申請人・所属機関・分野に分けている。試験合格だけで全体要件を判断しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-011
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 活動内容・提出書類"
  source_locator: "在留資格「特定技能」活動欄 / 提出書類一覧表"
  claim_type: criteria_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "技能試験・日本語試験の個別合否"
    - "受入機関の適格性"
    - "支援計画の十分性"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "技能試験や日本語試験に合格すれば特定技能が取れるかを聞く相談"
direct_fact_fields:
  - ssw_skill_japanese_not_only_requirements
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_full_requirements_review
    reason: "試験、雇用契約、所属機関、分野別書類、支援計画は分けて確認する必要がある。"
evidence_points:
  - claim: "ISA は、特定技能を法務大臣が指定する機関との雇用契約に基づく活動として案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "活動欄"
    display_label: "特定技能: 雇用契約"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の提出書類一覧表は、申請人、所属機関、分野に関する書類を分けて案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類一覧表"
    display_label: "特定技能: 書類区分"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 試験合格だけで全体要件を判断しない

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能は、試験合格だけで全体要件を判断しない。活動は指定された機関との雇用契約に基づき、提出書類も申請人、所属機関、分野に関する書類に分かれる。

## exceptions_or_transition

- このカードは技能試験・日本語試験の具体的な免除や合格基準を判断しない。

## common_user_phrases

- 特定技能 試験 受かれば 取れる
- 特定技能 日本語 合格 だけ
- 特定技能 技能試験 だけ
- 特定技能 N4 合格 会社なし
- 特定技能 雇用契約 必要
- 特定技能 会社 書類 分野
- 特定技能考试过了是不是一定拿到

## must_say

- 試験合格は重要でも、それだけで特定技能全体を判断しない。
- 雇用契約、所属機関、分野別書類も確認する。

## must_not_say

- 試験と日本語に受かれば必ず特定技能が取れる。
- 会社や分野別書類は関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-011 |
