---
fact_id: zairyu-online-system
title: 在留申請オンラインシステム — 利用者登録要・手数料割安
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留オンライン"
citation_summary: "在留資格変更/更新等の申請をオンラインで行えるシステム。事前に利用者登録が必要。手数料が窓口より500円安く、24時間提出可能。技人国カテゴリー2の認定条件にも該当。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留 オンライン申請"
  - "ビザ オンライン"
does_not_cover:
  - "永住申請のオンライン化（一部不可）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 利用者登録必須
  - 手数料：窓口より500円割安
  - 24時間提出可
  - 技人国カテゴリー2の条件にも該当
  - サポート：ヘルプデスク0570-3786-3053
ai_inferred_fields:
  - 経営管理・永住の一部はオンライン不可
  - 弁護士・行政書士の取次申請もオンライン可
needs_review_flags:
  - online_eligibility_by_status
  - permanent_residency_specific_online_status
  - utilization_registration_period
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "オンライン"
    relation: "official_reference"
evidence_points:
  - claim: "在留申請オンラインシステムは利用者登録要、手数料窓口より500円安く、24時間提出可。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "オンライン"
    display_label: "在留オンライン"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

オンライン申請：利用者登録要・割安・24時間。

## must_say

- 利用者登録必須
- 500円割安
- 24時間提出可

## injection_format

### injection_certain_block

```text
- オンライン申請：利用者登録要・割安・24時間。
- 利用者登録必須
- 500円割安
- 24時間提出可
- 出典: ISA — 在留資格変更 https://www.moj.go.jp/isa/applications/procedures/16-1.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
