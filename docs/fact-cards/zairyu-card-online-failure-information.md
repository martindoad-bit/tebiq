---
fact_id: zairyu-card-online-failure-information
title: 在留カード等番号失効情報照会 — 雇用主・賃貸保証人の確認手段
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "失効情報照会"
citation_summary: "ISAの在留カード等番号失効情報照会ページで、在留カード番号の有効性を24時間オンラインで確認可能。雇用主の在留資格確認、賃貸保証会社の身元確認等に利用される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留カード 有効 確認"
  - "失効情報 雇用主"
does_not_cover:
  - "在留資格の活動範囲確認（要在留カード現物）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/rcc-support.html
    label: ISA — 失効情報照会
    accessed: "2026-05-17"
applies_to:
  - 雇用主、賃貸保証会社、銀行等
direct_fact_fields:
  - 利用：24時間オンライン
  - 確認内容：在留カード番号の有効/無効
  - 入力：在留カード番号
  - 結果：「有効」/「無効」表示
  - 紛失盗難届出済みも「無効」表示
ai_inferred_fields:
  - 在留資格の種別・期間までは確認不可
needs_review_flags:
  - history_check_unavailable_status
  - employer_kanyo_check_completeness
  - mobile_app_alternative_2026
related_links:
  - title: "ISA — 失効情報照会"
    url: "https://www.moj.go.jp/isa/applications/procedures/rcc-support.html"
    organization: "出入国在留管理庁"
    display_label: "失効情報照会"
    locator: "オンライン"
    relation: "official_reference"
evidence_points:
  - claim: "在留カード等番号失効情報照会は24時間オンラインで利用可。在留カード番号の有効/無効を確認できる。"
    source_title: "ISA — 失効情報照会"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/rcc-support.html"
    source_organization: "出入国在留管理庁"
    source_locator: "失効情報"
    display_label: "失効情報照会"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

失効情報照会：24時間オンライン・番号で有効性確認可。

## must_say

- 24時間オンライン
- 番号で確認可
- 活動範囲は別途現物確認

## injection_format

### injection_certain_block

```text
- 在留カード等番号失効情報照会では、在留カード等番号が失効していないかをオンラインで確認できる。
- この照会は在留カード番号の有効性確認であり、在留資格の活動範囲や就労可否の完全確認ではない。
- 出典: ISA — 在留カード等番号失効情報照会 https://www.moj.go.jp/isa/applications/procedures/rcc-support.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
