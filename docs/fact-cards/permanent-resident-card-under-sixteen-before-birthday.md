---
fact_id: permanent-resident-card-under-sixteen-before-birthday
title: 永住者在留カード — 16歳未満は16歳誕生日の前日まで
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "16歳未満の永住者カード期限"
citation_summary: "入管法第19条の5は、16歳未満の永住者の在留カード有効期間を16歳の誕生日の前日までとしている。ISA の更新申請ページも、2023年11月1日以降に交付された在留カードの有効期限は16歳の誕生日の前日までと案内している。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-053
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_official_procedure_page
  law_article_ref: "入管法第19条の5第1項第2号"
  source_locator: "16歳未満の永住者 / 2023年11月1日以降注記"
  claim_type: card_validity
  applicable_statuses:
    - "permanent_resident_under_16"
  application_type:
    - resident_card_validity_renewal
  exclusion_scope:
    - "2023年10月以前交付カードの経過措置判断"
    - "特別永住者証明書"
  deep_water_candidate: true
applies_when:
  - "用户问孩子永住卡、16岁、生日当天还是前一天"
does_not_cover:
  - "旧卡経過措置の個別判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 16歳未満の永住者
direct_fact_fields:
  - permanent_resident_card_under_sixteen_before_birthday
ai_inferred_fields: []
needs_review_flags:
  - id: old_card_transition_review
    reason: "2023年11月1日前後の交付時期とカード券面を確認する必要がある。"
evidence_points:
  - claim: "入管法第19条の5は、16歳未満の永住者の在留カード有効期間を16歳の誕生日の前日までとしている。ISA の更新申請ページも、2023年11月1日以降に交付されたカードは16歳の誕生日の前日までと案内している。"
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者注2 / 申請期間注3"
    display_label: "16歳未満の永住者カード：誕生日前日まで"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者在留カード — 16歳未満は16歳誕生日の前日まで

## current_date_logic

Checked against current law text and ISA procedure page on 2026-05-12.

## current_effective_fact

入管法第19条の5は、16歳未満の永住者の在留カード有効期間を16歳の誕生日の前日までとしている。ISA の更新申請ページも、2023年11月1日以降に交付された在留カードの有効期限は16歳の誕生日の前日までと案内している。

## exceptions_or_transition

- 2023年11月1日より前に交付されたカードは、券面と経過措置の確認が必要。
- 子どものカード期限は、永住資格本体の期限ではない。

## common_user_phrases

- 子供 永住 在留カード 16歳
- 永住カード 16歳 誕生日 前日
- 16歳未満 在留カード 更新
- 小孩永住卡什么时候更新
- 永住 子供 在留カード 期限
- 2023年11月1日 在留カード 16歳
- 永住者 子ども 16歳 在留カード

## must_say

- 2023年11月1日以降に交付されたカードは、16歳誕生日の前日まで。
- 交付時期とカード券面を確認する。

## must_not_say

- すべての子どもカードは常に16歳誕生日当日まで。
- 16歳のカード期限を永住資格喪失と表現する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-053 |
