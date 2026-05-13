---
fact_id: ssw-standard-nonconformity-notification-14day-source
title: "特定技能 — 雇用契約・支援計画の基準不適合を知った場合は14日以内届出を確認する"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 基準不適合届出"
citation_summary: "ISA は、特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令の基準不適合であることを知った所属機関を対象に、事由発生日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-011
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令"
  source_locator: "基準不適合に係る届出 / 手続対象者 / 届出期間"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "基準不適合の有無判断"
    - "不適合解消の可否"
    - "処分・許可取消しの個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-standard-nonconformity
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00194.html
    title: 特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令の基準不適合に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能雇用契約や1号支援計画が基準に合わない可能性がある相談"
direct_fact_fields:
  - ssw_standard_nonconformity_notification_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_standard_nonconformity_review
    reason: "基準不適合の内容、認知時期、是正対応は個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令の基準不適合であることを知った特定技能所属機関を届出対象としている。"
    source_title: "特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令の基準不適合に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00194.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "特定技能: 基準不適合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、届出期間を事由発生日から14日以内と案内している。"
    source_title: "特定技能雇用契約及び1号特定技能外国人支援計画の基準等を定める省令の基準不適合に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00194.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "特定技能: 基準不適合届出期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 雇用契約・支援計画の基準不適合を知った場合は14日以内届出を確認する

## current_date_logic

Checked against the ISA standard-nonconformity notification page on 2026-05-13.

## current_effective_fact

特定技能雇用契約又は1号支援計画の基準不適合であることを知った場合、特定技能所属機関は14日以内の基準不適合届出を確認する。

## exceptions_or_transition

- 基準不適合に当たるか、いつ知ったか、どの届出と重なるかは個別確認が必要。

## common_user_phrases

- 特定技能 基準不適合 届出 14日
- 特定技能 給料 条件 違反 届出
- 特定技能 支援計画 基準不適合
- 特定技能 雇用契約 条件 合ってない
- 特定技能 不適合 知った 入管
- 特定技能 nonconformity notification

## must_say

- 雇用契約・支援計画の基準不適合を知った場合は14日以内届出を確認する。

## must_not_say

- 基準に合わない可能性があっても社内で直せば届出確認は不要。
- 基準不適合届出は登録支援機関だけが考える手続。
- 基準不適合届出を出せば基準不適合が当然に治癒される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-011 |
