---
fact_id: coe-validity-3months
title: COE — 有効期間3か月・期限内に査証取得と上陸が必要
state: ai_extracted
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
  - url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
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
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "COE"
    locator: "3か月"
    relation: "official_reference"
evidence_points:
  - claim: "COEは発行から3か月以内に査証取得と上陸が必要。"
    source_title: "ISA — COE"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
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

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
