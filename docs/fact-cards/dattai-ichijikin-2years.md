---
fact_id: dattai-ichijikin-2years
title: 脱退一時金 — 出国後2年以内に申請・税率20.42%
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "脱退一時金2年"
citation_summary: "脱退一時金は国民年金/厚生年金加入6か月以上の外国人が出国時に請求できる制度。請求期限は出国後2年以内。源泉税20.42%控除。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "脱退一時金 期限"
  - "出国 年金 払戻"
does_not_cover:
  - "脱退一時金額の具体計算"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金）
    accessed: "2026-05-17"
applies_to:
  - 6か月以上加入し永住権なく出国する外国人
direct_fact_fields:
  - 請求期限：出国後2年以内
  - 加入期間要件：6か月以上
  - 源泉徴収：20.42%
  - 上限：5年（厚生年金は被保険者期間36か月以上で上限額）
  - 還付申告で税還付の可能性あり
ai_inferred_fields:
  - 受給後は再来日しても加入期間リセット
  - 永住希望者は受給しない方が有利
needs_review_flags:
  - upper_limit_period_2026
  - tax_refund_filing_method_specifics
  - reapplication_after_reentry
related_links:
  - title: "ISA — 永住（年金）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "ISA/年金機構"
    display_label: "脱退一時金"
    locator: "2年"
    relation: "official_reference"
evidence_points:
  - claim: "脱退一時金は出国後2年以内に請求、源泉税20.42%控除。加入6か月以上が要件。"
    source_title: "年金機構（公式整合）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "2年・20.42%"
    display_label: "脱退一時金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

脱退一時金：6か月以上加入・出国後2年内請求・20.42%源泉。

## must_say

- 2年期限
- 20.42%源泉
- 受給後はリセット

## injection_format

### injection_certain_block

```text
- 脱退一時金：6か月以上加入・出国後2年内請求・20.42%源泉。
- 2年期限
- 20.42%源泉
- 受給後はリセット
- 出典: ISA — 永住（年金） https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
