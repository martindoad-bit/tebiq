---
fact_id: zairyu-address-change
title: 中長期在留者 — 搬家后的住居地变更届出
state: ai_verified
risk_level: low
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-10
reviewer: ai_self_verified
sprint: Cycle 1 Quality Flywheel / v2
citation_label: "住居地変更届出（中長期在留者・14日以内）"
citation_summary: "中長期在留者が引越し（住居地変更）した場合の市区町村への届出義務（14日以内）と在留カード記載変更の手続きを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "外国人が引越しした場合の住所変更手続きを確認したい"
  - "住居地変更届出の期限・届出先を確認したい"
  - "引越し後に在留カードの住所を変更する方法を確認したい"
does_not_cover:
  - "氏名・国籍・在留資格等の記載事項変更（在留カード記載事項変更手続き）"
  - "住民票の転入届の詳細手続き（各市区町村窓口）"
  - "在留期間更新申請の住所確認書類としての利用"
ai_pipeline:
  collector_run_at: 2026-05-10
  extractor_model: codex-aql-cycle1
  source_count: 2
  self_verification_passed_at: 2026-05-10
official_sources:
  - id: moj-isa-address-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html
    title: 住居地の変更届出（中長期在留者）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-10
    quoted_in_card: true
  - id: moj-isa-new-address
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html
    title: 在留資格変更等に伴う住居地の届出（中長期在留者）
    publisher: 出入国在留管理庁（法務省）
    last_checked_at: 2026-05-10
    quoted_in_card: true
applies_to:
  - 中長期在留者
  - 搬家后的住居地变更
  - 在留卡住址与实际住址不一致
direct_fact_fields:
  - address_change_deadline_14_days
  - city_office_window
  - residence_card_municipality_deemed_notification
  - no_separate_immigration_address_form_when_municipality_notice_done
ai_inferred_fields: []
needs_review_flags: []
---

# 中長期在留者 — 搬家后的住居地变更届出

---

## current_date_logic

```
このカードの事実は常時有効（特定の施行日なし）。
中長期在留者の住居地変更届出は入管法第19条の9に基づく。
```

---

## current_effective_fact

### 新住居地へ移転した日から14日以内

> 「新住居地に移転した日から１４日以内」
> source: moj-isa-address-change

### 届出先は住居地の市区町村

> 「届出先　住居地の市区町村の担当窓口」
> source: moj-isa-address-change

### 市区町村での届出をすれば住居地変更届出をしたものとみなされる

> 「在留カードを市区町村の窓口に持参して、住民基本台帳法第２２条、第２３条又は第３０条の４６に規定する届出を行った場合には、下記の住居地の変更届出を行ったものとみなされます。（下記の住居地届出書の提出は不要です。）」
> source: moj-isa-address-change

### 新たに中長期在留者となった場合の住居地届出も市区町村届出でみなし

> 「在留カードを市区町村の窓口に持参して、住民基本台帳法第３０条の４６又は第３０条の４７に規定する届出を行った場合には、下記の住居地の変更届出を行ったものとみなされます。（下記の住居地届出書の提出は不要です。）」
> source: moj-isa-new-address

---

## exceptions_or_transition

| 状況 | 適用される判断 |
|------|--------------|
| 普通の搬家・転入/転居 | 在留カードを持って市区町村窓口で住所届出をする。通常は別途入管へ住居地届出書を出す必要はない |
| 氏名・生年月日・性別・国籍地域など住居地以外の在留カード記載事項変更 | 住居地変更とは別手続き。地方出入国在留管理官署での届出が必要 |
| 所属機関変更・契約終了・新契約など | 住居地変更とは別手続き。該当する在留資格では入管への所属機関届出が必要 |

---

## common_user_phrases

主要トリガー（中文）：

- 搬家后区役所和入管都要通知吗
- 搬家后在留卡地址什么时候要改
- 在留卡地址和实际住址不一致怎么办
- 搬家后要不要单独去入管
- 地址变更要去入管吗
- 在留卡住址变更
- 住址变更要通知哪里
- 转入届会不会自动通知入管
- 区役所改地址后还要去入管吗
- 搬家后14天内要做什么

技術キーワード（マッチャ用）：

- 搬家 / 地址 / 住址 / 住居地 / 住所
- 区役所 / 市役所 / 市区町村 / 役所
- 入管 / 出入国在留管理庁 / 在留カード
- 転入届 / 転居届 / 住居地変更 / 住所変更
- 14日 / 十四天

---

## must_say

1. 中長期在留者が搬家した場合、新住居地へ移転した日から14日以内に住居地変更の届出が必要
2. 届出先は住居地の市区町村窓口
3. 在留カードを持って市区町村で転入・転居等の届出をすれば、入管法上の住居地変更届出をしたものとみなされる
4. 普通の住所変更だけなら、通常は別途入管に住居地届出書を提出する必要はない
5. 氏名・国籍等の住居地以外の記載事項変更、または所属機関変更は別手続きとして扱う

## must_not_say

- ❌ 普通の搬家で「区役所とは別に必ず入管へ住居地届出書を出す」と案内する
- ❌ 「区役所だけでよく、在留カードは不要」と言う
- ❌ 住居地以外の記載事項変更や所属機関届出まで住所変更と混同する
- ❌ 14日以内の期限に触れない

---

## qa_cases

### QA-1 — 搬家后是否还要单独去入管

**user**: 搬家后区役所和入管都要通知吗？

**must_have**:
- 在留カードを持って市区町村で転入/転居届をすれば、住居地変更届出をしたものとみなされる
- 新住居地へ移転した日から14日以内
- 普通の住所変更だけなら通常は別途入管へ住居地届出書を出す必要はない

**must_not_have**:
- 「区役所と入管の両方に必ず行く」
- 「入管へ先に行く」

**good_answer_criteria**: 用户能知道第一步是带在留卡去新住址市区町村窗口，并知道通常不需要再跑一趟入管办住居地届出。

### QA-2 — 在留卡地址与实际地址不一致

**user**: 在留卡地址和实际住址不一致怎么办？

**must_have**:
- 搬家后未更新地址时，应尽快带在留卡到现住址市区町村窗口办理
- 期限是新住居地へ移転した日から14日以内
- 超过期限时不要拖延，尽快补办并解释原因

**must_not_have**:
- 先让用户去入管窗口办住址

**good_answer_criteria**: 行动收束到“带在留卡去现住址市区町村窗口”，并提醒逾期时尽快处理。

### QA-3 — 住居地以外的变更

**user**: 搬家之外，姓名和国籍也变了，是不是也在区役所办？

**must_have**:
- 住居地変更和住居地以外の在留カード記載事項変更是不同手续
- 住居地以外の記載事項変更通常要在地方出入国在留管理官署处理
- 先区分地址变更与姓名/国籍等变更

**must_not_have**:
- 把所有在留卡信息变更都说成区役所自动联动

**good_answer_criteria**: 明确普通地址变更与姓名/国籍等事项变更不是同一类手续。

---

## injection_format

### injection_certain_block

```
【今日の有効な事実 — 中長期在留者の搬家・住居地変更】

以下は出入国在留管理庁の公式情報に基づく現行ルール。

【期限】
中長期在留者が住居地を変更した場合、届出期間は「新住居地に移転した日から１４日以内」。

【届出先】
届出先は「住居地の市区町村の担当窓口」。在留カードを提示する。

【重要】
在留カードを市区町村の窓口に持参して、転入・転居等の住民基本台帳法上の届出を行った場合、
入管法上の住居地変更届出をしたものとみなされる。
つまり、普通の搬家による住所変更だけなら、通常は別途入管に住居地届出書を提出する必要はない。

回答時の注意：
- 「区役所と入管の両方に必ず行く」は誤り
- 第一歩は「在留カードを持って市区町村窓口」
- 氏名・国籍等の住居地以外の記載事項変更、所属機関変更は別手続きとして区別する
```

### injection_needs_review_addendum

```
```

---

## changelog

| date | actor | action | from_state | to_state | note |
|---|---|---|---|---|---|
| 2026-05-10 | Codex (Cycle 1 self-cycle) | official source extraction + scenario mapping + QA cases | — | ai_verified | Fixes AQL P0 G02 wrong-office regression; risk=low; official source only |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
