---
fact_id: ssw-support-implementation-difficulty-notification-source
title: "特定技能1号 — 支援計画の実施困難は認知日から14日以内届出を確認する"
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
citation_label: "特定技能1号: 支援実施困難"
citation_summary: "ISA は、1号特定技能外国人支援計画に基づく支援について実施困難となる事由が生じた所属機関を対象に、その事由を認知した日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-012
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "1号特定技能外国人支援計画の実施困難に係る届出"
  source_locator: "支援計画の実施困難に係る届出 / 手続対象者 / 届出期間"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - notification
  exclusion_scope:
    - "支援実施困難に当たるかの判断"
    - "支援計画変更届出との分岐"
    - "基準不適合届出との重複"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-support-implementation-difficulty
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00191.html
    title: 特定技能所属機関による1号特定技能外国人支援計画の実施困難に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の支援計画に基づく支援が実施できなくなった相談"
direct_fact_fields:
  - ssw_support_implementation_difficulty_notification
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_support_implementation_difficulty_review
    reason: "認知日、支援未実施の理由、支援計画変更や基準不適合との分岐が必要。"
evidence_points:
  - claim: "ISA は、1号特定技能外国人支援計画に基づく支援について実施困難となる事由が生じた特定技能所属機関を届出対象としている。"
    source_title: "特定技能所属機関による1号特定技能外国人支援計画の実施困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00191.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "特定技能1号: 支援実施困難"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、届出期間をその事由を認知した日から14日以内と案内している。"
    source_title: "特定技能所属機関による1号特定技能外国人支援計画の実施困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00191.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "特定技能1号: 支援実施困難届出期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 支援計画の実施困難は認知日から14日以内届出を確認する

## current_date_logic

Checked against the ISA support-implementation difficulty notification page on 2026-05-13.

## current_effective_fact

1号支援計画に基づく支援について実施困難となる事由が生じた場合、特定技能所属機関はその事由を認知した日から14日以内の届出を確認する。

## exceptions_or_transition

- 支援計画変更、支援委託契約変更、基準不適合、受入れ困難との分岐は個別に確認する。

## common_user_phrases

- 特定技能 支援 実施困難 届出
- 特定技能 支援できない 14日
- 特定技能 支援計画 実施できない
- 特定技能 支援計画を変更
- 特定技能 支援計画 変更 支援実施困難 不要
- 特定技能 登録支援機関 支援できない
- 特定技能 支援 未実施 理由書
- 特定技能 support implementation difficulty

## must_say

- 支援計画の実施困難は認知日から14日以内届出を確認する。

## must_not_say

- 支援ができなくても支援計画を後で直せば届出確認は不要。
- 実施困難の14日は必ず事由発生日から数える。
- 支援実施困難届出を出せば支援未実施の問題が当然に解消する。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-012 |
