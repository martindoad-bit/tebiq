---
fact_id: saiyuukoku-kyoka-1year-5year
title: 再入国許可 — みなし再入国1年・通常再入国最大5年（特別永住者は6年）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "再入国許可 1年/5年"
citation_summary: "出国時にみなし再入国（1年以内に帰国）または通常再入国（最大5年、特別永住者は6年）を選択。期限内不帰国は在留資格喪失。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户长期回国超过1年"
  - "用户问出国时要不要办再入国"
  - "再入国期限内忘了回怎么办"
does_not_cover:
  - "出国時の在留カード提示手続詳細"
  - "永住者カードの再交付（出国中の更新）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-9.html
    label: ISA — 再入国許可
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
  - 特別永住者（最大6年）
direct_fact_fields:
  - みなし再入国許可：1年以内（在留期限がそれより前なら短い方）
  - 通常再入国許可：最大5年（特別永住者は最大6年）
  - 期限内未帰国：在留資格喪失
  - みなし再入国は出国時の手続のみで取得可（事前申請不要）
ai_inferred_fields:
  - みなし再入国は出国期間延長不可（やむを得ない事情でも原則不可）
  - 通常再入国は出国前に入管で取得が必要
needs_review_flags:
  - extension_from_abroad
  - certificate_holder_at_immigration
  - special_permanent_resident_application_method
related_links:
  - title: "ISA — 再入国許可"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 再入国許可"
    locator: "ページ内「1年」「5年」「6年」"
    relation: "official_reference"
evidence_points:
  - claim: "みなし再入国は1年以内（在留期限がそれより前なら短い方）、通常再入国は最大5年（特別永住者は最大6年）。期限内に帰国しなければ在留資格喪失。"
    source_title: "ISA — 再入国許可"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「みなし再入国」「1年」「5年」"
    display_label: "再入国 1年/5年/6年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

みなし再入国1年、通常再入国5年（特永6年）。期限内不帰国で在留資格喪失。

## common_user_phrases

- 再入国許可 1年
- みなし再入国 期限
- 再入国 5年
- 帰国 在留資格 喪失

## must_say

- みなし1年・通常5年（特永6年）
- 期限内不帰国で在留資格喪失
- みなしは出国時手続のみ

## must_not_say

- 「永住者は出国期間制限なし」（誤り、再入国期限あり）

## qa_cases

**Q: 母国に2年帰る予定です。再入国はどうすれば？**
A: みなし再入国（1年）では足りないので、出国前に地方入管で「通常の再入国許可」（最大5年）を取得してください。期限内に帰国しないと在留資格を失います。

## injection_format

### injection_certain_block

```
【再入国／ {{TODAY_ISO}} 公式】
・みなし：1年以内（出国時手続のみ）
・通常：最大5年（特永6年・事前申請要）
・期限内不帰国：在留資格喪失
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
