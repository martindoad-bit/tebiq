---
fact_id: gijinkoku-shotoku-shokuin-naka
title: 技人国 — 給与は日本人同等以上が原則
state: ai_verified
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "技人国 給与同等以上"
citation_summary: "技人国の許可基準として「日本人が同等業務に従事する場合に受ける報酬と同等額以上」が法定要件。最低賃金以下や明らかに低額の給与は不許可事由。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 給料 安い"
  - "外国人 給与 同等"
does_not_cover:
  - "最低賃金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 技人国受入企業/申請者
direct_fact_fields:
  - 給与基準：日本人同等以上（法定）
  - 最低賃金以下は明らかな違反
  - 業界標準を著しく下回ると不許可リスク
ai_inferred_fields:
  - 給与水準は雇用契約書・労働条件通知書で確認
  - 残業代未払いも不利な扱いの根拠
needs_review_flags:
  - douto_proof_method_specifics
  - bonus_inclusion_in_comparison
  - new_grad_starting_salary_practice
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "報酬"
    relation: "official_reference"
evidence_points:
  - claim: "技人国は日本人同等以上の報酬が法定要件。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "報酬"
    display_label: "技人国 給与同等以上"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

技人国：日本人同等以上給与が法定要件。

## must_say

- 日本人同等以上
- 最低賃金以下は不可
- 業界標準考慮

## injection_format

### injection_certain_block

```
【技人国・報酬要件／ 2026-05-17 公式】
・技術・人文知識・国際業務では、日本人が従事する場合に受ける報酬と同等額以上であることが求められる
・具体的な妥当性は職務内容、雇用条件、会社資料で確認する
・特定の年収額だけで許可/不許可は判断しない
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
