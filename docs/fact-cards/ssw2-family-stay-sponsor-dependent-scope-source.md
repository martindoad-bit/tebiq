---
fact_id: ssw2-family-stay-sponsor-dependent-scope-source
title: "特定技能2号 — 家族滞在は配偶者・子の扶養活動として確認する"
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
citation_label: "特定技能2号: 家族滞在"
citation_summary: "ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格に特定技能2号が含まれ、家族滞在は扶養を受ける配偶者又は子の日常的な活動として案内されている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-010
  authority_layer: L4 ISA Status List
  legal_source_type: official_status_page
  law_article_ref: "家族滞在 対象在留資格"
  source_locator: "在留資格一覧表 家族滞在 row"
  claim_type: family_boundary
  applicable_statuses:
    - "特定技能2号"
    - "家族滞在"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "家族滞在の許可可否"
    - "扶養能力"
    - "親・兄弟姉妹の帯同"
  deep_water_candidate: true
official_sources:
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能2号で配偶者や子の家族滞在を聞く相談"
direct_fact_fields:
  - ssw2_family_stay_sponsor_dependent_scope_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw2_family_stay_application_review
    reason: "扶養関係・扶養能力・提出書類・家族本人の状況は個別確認が必要。"
evidence_points:
  - claim: "ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格に特定技能2号が含まれている。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家族滞在 row"
    display_label: "家族滞在: 特定技能2号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の在留資格一覧表では、家族滞在は扶養を受ける配偶者又は子として行う日常的な活動として案内されている。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家族滞在 row"
    display_label: "家族滞在: 配偶者又は子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号 — 家族滞在は配偶者・子の扶養活動として確認する

## current_date_logic

Checked against the ISA status list on 2026-05-13.

## current_effective_fact

ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格に特定技能2号が含まれる。家族滞在そのものは、扶養を受ける配偶者又は子として行う日常的な活動として確認する。

## exceptions_or_transition

- 特定技能2号本人であっても、家族滞在の許可可否や扶養能力は別途確認が必要。
- 親・兄弟姉妹の帯同はこのカードでは扱わない。

## common_user_phrases

- 特定技能2号 家族滞在
- 特定技能2号 配偶者 呼ぶ
- 特定技能2号 子供 呼べる
- 特定技能2号 家族帯同
- SSW2 dependent spouse child
- 特定技能2号 家族 ビザ

## must_say

- 特定技能2号は家族滞在の扶養者の列挙に含まれる。
- 家族滞在は配偶者又は子の扶養活動として確認する。

## must_not_say

- 特定技能2号なら家族滞在が必ず許可される。
- 親や兄弟姉妹も家族滞在で当然呼べる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-010 |
