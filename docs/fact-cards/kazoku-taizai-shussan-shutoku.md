---
fact_id: kazoku-taizai-shussan-shutoku
title: 家族滞在 — 在日出生子的「在留資格取得申請」（30日内、超60日要求）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
reviewer:
sprint: "fact-window-bulk-1"
citation_label: "在留資格取得許可申請（出生子）"
citation_summary: "外国人夫妇在日本生下的孩子，若出生后超过60天还要继续在日本生活，则需在出生事由发生日起30日内提出「在留資格取得許可申請」。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户家族滞在或工签夫妇在日本生下孩子"
  - "用户问新生儿是否需要单独办在留资格"
  - "用户问出生后多少天内要去入管"
does_not_cover:
  - "出生证明书的取得（区役所手续）"
  - "新生儿护照办理（本国大使馆）"
  - "子女从短期访问入境后的在留资格变更（属于变更许可）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html
    label: 出入国在留管理庁 — 在留資格取得許可申請
    accessed: "2026-05-17"
applies_to:
  - 在日出生した外国人の子の親
  - 家族滞在・技人国・永住者等の在留資格を持つ親
direct_fact_fields:
  - 申請期限：資格取得事由が生じた日から30日以内（ISA公式）
  - 60日ルール：出生後60日を超えて在留する場合に申請が必要（ISA公式）
  - 手数料：無料（ISA公式）
  - 標準処理期間：60日以内（即日処理の場合あり）（ISA公式）
  - 申請場所：住居地を管轄する地方出入国在留管理官署 / オンライン申請可（ISA公式）
ai_inferred_fields:
  - 60日以内に出国予定であれば申請不要（ISA記述からの解釈）
  - 新生児の在留資格は通常親の在留資格に対応（家滞→家滞、永住→永住者の配偶者等の子の取扱は別ロジック）
needs_review_flags:
  - newborn_visa_inherit_rule
  - applies_to_special_permanent_resident_child
  - online_application_eligibility_for_newborn
related_links:
  - title: "出入国在留管理庁 — 在留資格取得許可申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 在留資格取得許可申請"
    locator: "ページ内「申請期限」「30日以内」「60日」"
    relation: "official_reference"
evidence_points:
  - claim: "出生など上陸手続を経ない事由で在留することになり、当該事由発生日から60日を超えて滞在しようとする場合は、30日以内に在留資格取得許可申請が必要。手数料無料。標準処理期間は60日以内。"
    source_title: "出入国在留管理庁 — 在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「申請期限」「30日以内」「60日」"
    display_label: "出生子の在留資格取得 — 30日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードは {{TODAY_ISO}} 時点のISA公式情報に基づく。出生子の在留資格取得は、出生事由発生から30日以内の申請が必要、60日を超える在留時に必須。

## current_effective_fact

外国人夫婦が日本で出産した場合、新生児は出生日から60日以内であれば在留資格なしで在留可能。60日を超えて在留する場合は、出生日から30日以内に「在留資格取得許可申請」を行う必要がある。

## exceptions_or_transition

- 60日以内に出国予定なら申請不要
- 在留資格の種別は通常親の在留資格に応じる（needs_review_flag）

## common_user_phrases

- 日本で生まれた赤ちゃんの在留資格はどうしたらいい
- 子どもの在留資格 30日 60日
- 新生児 在留資格 取得
- 在日产子需要去入管吗

## must_say

- 申請期限は出生から30日以内
- 60日を超えて在留する場合に必須
- 手数料無料

## must_not_say

- 「子どもは親の在留カードで自動的に登録される」（誤り）
- 「60日を超えても申請しなくていい」

## qa_cases

**Q: 日本で子供が生まれました。在留資格はどうすればいい？**
A: 60日を超えて日本に在留する場合、出生から30日以内に住居地を管轄する地方入管に「在留資格取得許可申請」を行ってください。手数料は無料です。

## injection_format

### injection_certain_block

```
【在留資格取得（出生子）／ {{TODAY_ISO}} 公式確認】
・申請期限：出生から30日以内
・必要となる条件：出生後60日を超えて在留する場合
・手数料：無料
・申請場所：住居地を管轄する地方入管
```

### injection_needs_review_addendum

```
※ 取得される在留資格の種別（親の資格との関係）は個別判断が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
