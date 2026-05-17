---
fact_id: kazoku-yobi-yose-shorui
title: 家族呼び寄せ — COE申請書類（婚姻証明・所得証明・住宅）
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家族呼び寄せ書類"
citation_summary: "海外の配偶者・子を日本に呼び寄せる際の家族滞在COE申請書類：申請書、写真、扶養者の在留カード写し、戸籍/婚姻証明、扶養者の住民税課税証明・納税証明、在職証明、住宅資料等。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家族 呼び寄せ 書類"
  - "海外配偶者 来日"
does_not_cover:
  - "短期滞在ビザでの呼び寄せ"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 海外の配偶者・子を呼び寄せる中長期在留者
direct_fact_fields:
  - 申請書、写真1葉
  - 扶養者の在留カード写し
  - 戸籍謄本/婚姻証明書（外国語は翻訳添付）
  - 扶養者の住民税課税・納税証明書
  - 在職証明書
  - 預金通帳写し・住宅資料
  - 質問書（外国語版あり）
ai_inferred_fields:
  - 扶養能力の年収目安は実務上重要（要相談）
  - 留学生の家族呼び寄せは収入面で厳しい
needs_review_flags:
  - shotoku_target_for_family_invite
  - jutaku_proof_specifics
  - ryugaku_family_invite_practice
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "必要書類"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在COE申請には申請書、写真、扶養者書類（戸籍/婚姻証明・住民税・在職・住宅）が必要。外国語は翻訳添付。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "必要書類"
    display_label: "家族呼び寄せ書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

家族COE：婚姻証明・所得証明・住宅資料必須。

## must_say

- 戸籍/婚姻証明
- 扶養者の住民税・在職
- 翻訳添付

## injection_format

### injection_certain_block

```text
- 家族COE：婚姻証明・所得証明・住宅資料必須。
- 戸籍/婚姻証明
- 扶養者の住民税・在職
- 翻訳添付
- 出典: ISA — 家族滞在 https://www.moj.go.jp/isa/applications/status/dependent.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
