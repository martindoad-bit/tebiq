---
fact_id: resident-card-non-address-change-scope
title: 在留カード記載事項変更 — 住所以外の変更対象
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード記載事項変更は氏名・生年月日・性別・国籍地域の変更"
citation_summary: "ISA は、氏名、生年月日、性別又は国籍・地域に変更が生じた中長期在留者を、住居地以外の在留カード記載事項変更届出の対象者としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-081
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の10"
  source_locator: "手続対象者"
  claim_type: procedure_scope
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地変更届出"
    - "在留資格変更許可申請"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡姓名、国籍、性别或出生日期变更"
does_not_cover:
  - "搬家后的住所变更"
  - "在留资格或在留期间的变更"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-non-address-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html
    title: 住居地以外の在留カード記載事項の変更届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_non_address_change_scope
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists mid- to long-term residents whose name, date of birth, sex, or nationality/region has changed as the target of this notification."
    source_title: "住居地以外の在留カード記載事項の変更届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "在留カード記載事項変更：氏名・生年月日・性別・国籍地域"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード記載事項変更 — 住所以外の変更対象

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

住居地以外の在留カード記載事項変更届出は、氏名、生年月日、性別又は国籍・地域に変更が生じた中長期在留者が対象。

## exceptions_or_transition

- 住所変更は別の住居地届出として扱う。
- 在留資格そのものの変更や更新とは別手続き。

## common_user_phrases

- 在留カード 氏名変更
- 在留卡 姓名变更
- 在留カード 国籍変更
- 在留卡 国籍变更
- 在留カード 性別変更
- 在留カード 生年月日 変更
- 在留カード 記載事項変更 対象

## must_say

- 対象は氏名、生年月日、性別、国籍・地域の変更。
- 住居地変更とは別手続き。

## must_not_say

- 住所変更も同じ地方入管手続きとして案内する。
- 在留資格変更許可申請と同じ手続きとして扱う。

## qa_cases

### QA-1

**user**: 在留カードの名前を変えたいです。

**must_have**:

- 氏名変更は住居地以外の記載事項変更届出
- 住所変更とは別

**must_not_have**:

- 市区町村の住所変更だけで完了

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-081 |
