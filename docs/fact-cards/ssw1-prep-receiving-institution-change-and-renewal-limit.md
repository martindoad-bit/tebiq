---
fact_id: ssw1-prep-receiving-institution-change-and-renewal-limit
title: "特定技能1号準備 — 受入機関変更と更新の制限"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "特定技能1号準備の制限"
citation_summary: "ISA は、特定技能1号準備の特定活動中に受入機関変更により改めて同特定活動へ変更申請することは、やむを得ない事情がある場合を除き原則認められず、更新はやむを得ない事情がある場合に1回限りと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-015
  authority_layer: L4 ISA SSW Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動（特定技能1号準備）"
  source_locator: "注意書き"
  claim_type: limitation_boundary
  applicable_statuses:
    - "特定活動"
    - "特定技能1号"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "やむを得ない事情"
    - "受入機関変更"
    - "更新判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-prep
    url: https://www.moj.go.jp/isa/applications/ssw/10_00025.html
    title: 特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定技能1号準備中の受入機関変更・更新相談"
direct_fact_fields:
  - ssw1_prep_receiving_institution_change_renewal_limit
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_prep_unavoidable_reason
    reason: "やむを得ない事情の該当性は個別事情の確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号準備の特定活動中の受入機関変更による再申請は原則認められず、更新はやむを得ない事情がある場合に1回限りと説明している。"
    source_title: "特定技能関係の特定活動（「特定技能１号」への移行を希望する場合）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/10_00025.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注意書き"
    display_label: "特定技能1号準備: 受入機関変更と更新"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号準備 — 受入機関変更と更新の制限

## current_date_logic

Checked against ISA SSW page on 2026-05-12.

## current_effective_fact

特定技能1号準備の特定活動中に受入機関を変更して同特定活動へ再申請することは原則認められず、更新はやむを得ない事情がある場合に1回限りと説明されている。

## exceptions_or_transition

- やむを得ない事情は本人の責めに帰さない事情などとして説明されているが、該当性は個別確認する。

## common_user_phrases

- 特定技能準備 受入機関 変更
- 特定技能1号準備 更新 1回
- 特定活動 6月 就労可 更新
- 特定技能準備 転職
- 特定技能 准备 换公司

## must_say

- 受入機関変更と更新は強い制限がある。

## must_not_say

- 6月ごとに自由に更新できる。
- 受入機関を変えても簡単に同じ準備資格を取り直せる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-015 |
