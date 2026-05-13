---
fact_id: guard-shozoku-notification-does-not-replace-status-change
title: "所属機関届出 — 変更許可の代わりではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "所属機関届出: 変更許可とは別"
citation_summary: "ISA の所属機関Q&Aは届出制度を説明しつつ、高度専門職1号の転職では在留資格変更許可申請が必要と説明している。届出を許可の代替として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-013
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "所属機関等に関する届出 / 在留資格変更許可"
  source_locator: "所属機関等Q&A"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "技術・人文知識・国際業務"
    - "経営・管理"
  application_type:
    - notification
    - status-change
  exclusion_scope:
    - "個別の届出要否"
    - "変更許可申請要否"
    - "副業・二重所属の可否"
  deep_water_candidate: true
official_sources:
  - id: isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "所属機関届出を在留資格変更許可の代わりに扱っている相談"
direct_fact_fields:
  - shozoku_notification_does_not_replace_status_change
ai_inferred_fields: []
needs_review_flags:
  - id: notification_status_change_review
    reason: "届出対象資格、活動変更、所属機関指定の有無で手続の関係が変わるため。"
evidence_points:
  - claim: "ISA の所属機関Q&Aは、対象となる在留資格ごとに所属機関に関する届出を説明している。"
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象者・届出区分"
    display_label: "所属機関届出: 対象資格ごとの届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同Q&Aは、高度専門職1号では所属機関が指定されるため、転職して所属機関が変わる場合は在留資格変更許可申請が必要と説明している。"
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q27"
    display_label: "所属機関届出: 高度専門職1号の変更申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 所属機関届出 — 変更許可の代わりではない

## current_date_logic

Checked against the ISA page on 2026-05-13.

## current_effective_fact

所属機関に関する届出は、在留資格変更許可申請の代わりとして扱わない。特に高度専門職1号では、転職して所属機関が変わる場合の変更申請注意がある。

## exceptions_or_transition

- このカードは、個別の届出要否、変更許可要否、副業・二重所属の可否を判断しない。

## common_user_phrases

- 所属機関届出 在留資格変更 代わり
- 转职 届出 许可 代替
- 14日届出 在留資格変更
- 高度専門職 届出 変更許可
- 技人国 所属機関届出 変更申請
- 换公司 届出 就可以

## must_say

- 所属機関届出と在留資格変更許可申請は分けて確認する。
- 届出を出せば新しい活動が当然許可されるとは扱わない。

## must_not_say

- 所属機関届出は在留資格変更許可の代わりになる。
- 14日届出を出せばどんな転職・活動変更も問題ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-013 |
