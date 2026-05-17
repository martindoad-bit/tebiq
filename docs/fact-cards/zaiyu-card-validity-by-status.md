---
fact_id: zaiyu-card-validity-by-status
title: 在留カード有効期間 — 在留資格別/年齢別
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留カード有効期間"
citation_summary: "通常の在留資格は在留期間と同じ。永住者と高度専門職2号は7年。16歳未満は16歳誕生日まで（永住者・高度2号も同様）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住カード 7年"
  - "在留カード 有効期間 何年"
does_not_cover:
  - "有効期間更新申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    label: ISA — 在留カード有効期間
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 通常資格：在留期間と同じ
  - 永住者：7年
  - 高度専門職2号：7年
  - 16歳未満：16歳誕生日まで
  - 永住者/高度2号で16歳未満：16歳誕生日まで
ai_inferred_fields:
  - 在留資格と在留カード有効期間は概念上別物
needs_review_flags:
  - tokubetsu_eijuusha_card_validity_diff
  - card_validity_during_renewal_application
related_links:
  - title: "ISA — 在留カード有効期間"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    organization: "出入国在留管理庁"
    display_label: "在留カード有効期間"
    locator: "7年・16歳"
    relation: "official_reference"
evidence_points:
  - claim: "通常資格は在留期間と同じ、永住者と高度2号は7年、16歳未満は16歳誕生日まで。"
    source_title: "ISA — 在留カード有効期間"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7年"
    display_label: "在留カード有効期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

通常資格は在留期間と同じ、永住・高度2号は7年。

## must_say

- 永住・高度2号は7年
- 16歳未満は16歳誕生日

## injection_format

### injection_certain_block

```text
- 通常資格は在留期間と同じ、永住・高度2号は7年。
- 永住・高度2号は7年
- 16歳未満は16歳誕生日
- 出典: ISA — 在留カード有効期間 https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
