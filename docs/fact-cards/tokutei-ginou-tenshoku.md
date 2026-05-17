---
fact_id: tokutei-ginou-tenshoku
title: 特定技能 — 転職時の在留資格変更必須（同分野内のみ）
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特技 転職"
citation_summary: "特定技能は受入機関と特定産業分野を指定する在留資格。転職時は在留資格変更許可申請が必要。分野を超える転職は不可（再度技能試験合格が必要）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能 転職"
  - "特技 分野変更"
does_not_cover:
  - "1号→2号変更（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    label: ISA — 特定技能
    accessed: "2026-05-17"
applies_to:
  - 特定技能保持者
direct_fact_fields:
  - 転職時：在留資格変更許可申請が必要
  - 同一分野内のみ転職可（技人国の業務範囲内転職とは異なる）
  - 分野超転職：当該分野の技能試験合格が必要
  - 通算5年（1号）の在留期間カウントは継続
ai_inferred_fields:
  - 支援機関も変更時届出義務あり
needs_review_flags:
  - bunya_definition_jisitsu_practice
  - shien_kikan_transfer_specifics
  - tsuusan_5year_period_during_transition
related_links:
  - title: "ISA — 特定技能"
    url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    organization: "出入国在留管理庁"
    display_label: "特技"
    locator: "分野"
    relation: "official_reference"
evidence_points:
  - claim: "特定技能の転職は在留資格変更許可が必要、同一分野内のみ可、分野超は技能試験合格要。"
    source_title: "ISA — 特定技能"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "受入機関・分野"
    display_label: "特技転職"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

特技転職：変更許可必要・同分野内のみ。

## must_say

- 変更許可必要
- 同分野内のみ
- 分野超は試験再合格

## injection_format

### injection_certain_block

```
【特定技能・転職／ 2026-05-17 公式】
・特定技能で所属機関が変わる場合、在留資格変更許可申請が必要になる
・同じ分野でも、受入機関、業務区分、支援計画などを確認する
・必要な許可を得る前に新しい会社で働き始めない
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
