---
fact_id: kazoku-taizai-zairyu-period
title: 家族滞在 — 在留期間は最長5年・主签证人の期間に揃える原則
state: ai_verified   # LOOP3 2026-05-17: rewritten to official max-5-years individual designation only
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家滞 在留期間"
citation_summary: "家族滞在の在留期間は、法務大臣が個々に指定する5年を超えない期間。実際に何年付与されるかは個別審査。"
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
  - 実際の付与期間は個別審査
ai_inferred_fields:
  - 扶養者の在留期間・扶養状況が実務上考慮される可能性
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

家族滞在の在留期間は5年を超えない範囲で個別指定。

## common_user_phrases

- 家滞 何年
- 家族滞在 在留期間

## must_say

- 最長5年
- 個別指定
- 付与年数は保証しない

## injection_format

### injection_certain_block

```text
- 家族滞在の在留期間は、法務大臣が個々に指定する期間で、5年を超えない範囲とされている。
- 「必ず5年もらえる」「必ず扶養者と同じ年数になる」とは言えない。実際の年数は個別審査で決まる。
- 更新や呼び寄せでは、扶養者の在留資格・在留期間・扶養能力などもあわせて確認する。
- 出典: 出入国在留管理庁「家族滞在」 https://www.moj.go.jp/isa/applications/status/dependent.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 5年以内個別指定に限定しruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
