---
fact_id: coe-validity-3months
title: COE — 有効期間3か月・期限内に査証取得と上陸が必要
state: ai_verified   # Knowledge Runtime Loop 1 promote: DOMAIN can_promote_now + FACT source verified/fixed.
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE 3か月有効"
citation_summary: "COE発行日から3か月以内に在外公館で査証を取得し、日本に上陸する必要がある。期限超過は再申請。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "COEもらったが入国できない"
  - "COE 3か月超えた"
does_not_cover:
  - "COE新規申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — COE
    accessed: "2026-05-17"
applies_to:
  - COE受領者
direct_fact_fields:
  - 有効期間：原則発行から3か月
  - 期限内に査証取得＋上陸必要
  - 期限超過：再申請
ai_inferred_fields:
  - COVID等で延長措置があったこともある
needs_review_flags:
  - extension_measure_history
  - reapplication_fee_after_expiry
related_links:
  - title: "ISA — COE"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "COE"
    locator: "3か月"
    relation: "official_reference"
evidence_points:
  - claim: "COEは発行から3か月以内に査証取得と上陸が必要。"
    source_title: "ISA — COE"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "3か月"
    display_label: "COE 3か月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

COE 3か月有効・期限内上陸必須。

## common_user_phrases

- COE 期限切れ
- COE 3ヶ月

## must_say

- 3か月以内に上陸
- 期限超過は再申請

## injection_format

### injection_certain_block

```text
COE（在留資格認定証明書）は、発行日から原則3か月以内に査証取得と日本への上陸が必要です。期限を過ぎた場合、延長できると決めつけず、入管・在外公館で確認し、必要なら再申請を検討します。COEは入国や在留を保証するものではなく、査証申請と上陸審査は別にあります。
```

### injection_needs_review_addendum

```text
このカードは一般的な公式事実のみを注入します。個別の許可可否、例外、期限超過、違反後対応は断定せず、入管・行政書士等への確認に回してください。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Knowledge Runtime Loop 1 | DOMAIN/FACT確認済み範囲で runtime 注入可能化。 | ai_extracted | ai_verified | promote |
