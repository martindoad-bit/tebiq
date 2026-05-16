---
fact_id: kazoku-taizai-zairyu-period
title: 家族滞在 — 在留期間は最長5年・主签证人の期間に揃える原則
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家滞 在留期間"
citation_summary: "家族滞在の在留期間は最長5年。実務上は主签证人（扶養者）の在留期間に揃えるのが原則。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家滞 何年もらえる"
  - "技人国5年 家滞も5年"
does_not_cover:
  - "家滞の対象範囲（別カード）"
  - "資格外活動許可（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 家族滞在資格保持者
direct_fact_fields:
  - 最長：5年
  - 個別指定（5年を超えない範囲）
  - 主签证人の在留期間に揃える実務（ai推定）
ai_inferred_fields:
  - 主签证人の在留が短い場合、家滞も同等以下になる
needs_review_flags:
  - kihon_practice_aligning_with_sponsor
  - independent_renewal_after_sponsor_expiry
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "5年"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在の在留期間は法務大臣が個別に指定する5年を超えない期間。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "5年"
    display_label: "家滞最長5年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

家滞最長5年・主签证人と揃える原則。

## common_user_phrases

- 家滞 何年
- 家族滞在 在留期間

## must_say

- 最長5年
- 個別指定
- 主签证人と揃える実務

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
