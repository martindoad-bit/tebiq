---
fact_id: ssw-outsourced-support-periodic-report-via-host-source
title: "特定技能1号 — 全部委託時の支援実施状況は所属機関経由で定期届出を確認する"
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
citation_label: "特定技能1号: 全部委託時の定期届出"
citation_summary: "ISA は、登録支援機関に支援計画の全部実施を委託している場合、登録支援機関は所属機関を経由して支援実施状況を届け出、所属機関は支援実施状況を取りまとめて提出する必要があると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-015
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能所属機関による定期届出"
  source_locator: "登録支援機関に支援計画の実施の全部を委託する契約を締結している場合"
  claim_type: responsibility_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - notification
  exclusion_scope:
    - "全部委託か一部委託かの契約判断"
    - "支援実施状況の記載内容評価"
    - "登録支援機関の単独届出要否全般"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "支援全部委託時に誰が定期届出を出すかの相談"
direct_fact_fields:
  - ssw_outsourced_support_periodic_report_via_host
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_outsourced_support_periodic_review
    reason: "全部委託・一部委託、所属機関と登録支援機関の責任分担は個別確認が必要。"
evidence_points:
  - claim: "ISA は、登録支援機関に支援計画の全部実施を委託している場合、登録支援機関は支援委託契約の相手方である特定技能所属機関を経由して支援業務の実施状況を届け出ると案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "定期届出"
    display_label: "特定技能1号: 全部委託時の支援実施状況"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、特定技能所属機関が受入れ・活動状況の届出を作成し、登録支援機関による支援実施状況を取りまとめて提出する必要があると案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "定期届出"
    display_label: "特定技能1号: 所属機関の取りまとめ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 全部委託時の支援実施状況は所属機関経由で定期届出を確認する

## current_date_logic

Checked against the ISA SSW notification page on 2026-05-13.

## current_effective_fact

登録支援機関に支援計画の全部実施を委託している場合、支援実施状況は特定技能所属機関を経由し、所属機関が取りまとめて定期届出を確認する。

## exceptions_or_transition

- 所属機関の随時届出を登録支援機関へ委託できないルールとは別の論点。

## common_user_phrases

- 特定技能 支援 全部委託 定期届出
- 登録支援機関 支援実施状況 所属機関 経由
- 特定技能 支援機関 定期届出 会社
- 特定技能 支援実施状況 取りまとめ
- 特定技能 全部委託 年次届出
- 支援全委托给注册支援机构
- 特定技能 outsourced support periodic report

## must_say

- 全部委託時の支援実施状況は所属機関経由で定期届出を確認する。

## must_not_say

- 支援を全部委託していれば、所属機関は定期届出の取りまとめを確認しなくてよい。
- 登録支援機関が全部委託を受けていれば所属機関の届出責任はなくなる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-015 |
