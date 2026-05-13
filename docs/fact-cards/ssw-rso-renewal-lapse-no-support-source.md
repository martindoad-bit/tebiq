---
fact_id: ssw-rso-renewal-lapse-no-support-source
title: "登録支援機関 — 期限内に更新を受けられない場合は支援業務を行えない点を確認する"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "登録支援機関: 更新未了"
citation_summary: "ISA は、登録支援機関が有効期間満了日までに更新を受けられない場合、特定技能所属機関から1号支援計画の全部実施委託を受けていても支援業務を行えないと案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-021
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "登録支援機関の登録更新申請"
  source_locator: "登録支援機関の登録更新申請 / 申請時期及び審査期間"
  claim_type: registration_boundary
  applicable_statuses:
    - "登録支援機関"
    - "特定技能1号"
  application_type:
    - registration-renewal
  exclusion_scope:
    - "既存受託案件の具体的移管"
    - "期限後申請の許否"
    - "個別救済・特例の適用判断"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-registration-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00198.html
    title: 登録支援機関の登録更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関の更新が間に合わない場合に支援業務を続けられるかの相談"
direct_fact_fields:
  - ssw_rso_renewal_lapse_no_support
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_renewal_lapse_review
    reason: "既存案件の移管、所属機関側の支援体制、支援計画変更届出との関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、登録支援機関が登録有効期間満了日までに更新を受けられない場合、特定技能所属機関から1号支援計画の全部実施委託を受けていても、支援業務を行えないと案内している。"
    source_title: "登録支援機関の登録更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00198.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請時期及び審査期間"
    display_label: "登録支援機関: 更新未了時の支援業務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 期限内に更新を受けられない場合は支援業務を行えない点を確認する

## current_date_logic

Checked against the ISA registered-support-organization renewal application page on 2026-05-13.

## current_effective_fact

登録支援機関が有効期間満了日までに登録更新を受けられない場合、1号支援計画の全部実施委託を受けていても支援業務を行えないと案内されている。

## exceptions_or_transition

- 既存受託案件の移管、所属機関側の支援体制、支援計画変更届出は個別確認が必要。

## common_user_phrases

- 登録支援機関 更新 間に合わない 支援できる
- 登録支援機関 有効期限 切れ 支援業務
- 登録支援機関 更新未了 受託案件
- 登録支援機関 期限内 更新 できない
- 支援機関 更新切れ 特定技能
- 注册支援机构更新没赶上
- registered support organization renewal lapse support

## must_say

- 期限内に更新を受けられない場合は支援業務を行えない点を確認する。

## must_not_say

- 登録支援機関の期限が切れても委託契約があれば支援業務を続けられる。
- 更新申請中なら有効期限後も常に支援業務を行える。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-021 |
