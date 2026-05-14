---
asset_id: guardrail-gaikokujin-unten-menkyo
title: 外国人の運転免許と在留資格 — 外国免許の日本での有効期間は入国後1年；1年超の在留には日本免許の取得または外国免許の切り替えが必要；切り替えは国によって試験免除の有無が異なる
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 019"
---

## What This Document Is

This guardrail prevents errors about the validity of foreign driving licenses in Japan and the requirements for driving on a Japanese license. Key errors to block:

1. **"外国の運転免許証があれば，日本で永遠に運転できる。"** — incorrect. 外国の運転免許証は，日本入国後**1年間**のみ有効（国際運転免許証の場合も同様）。1年を超えて日本に在留する場合は，日本の運転免許証に切り替えるか，日本の運転免許証を取得する必要がある。
2. **"国際運転免許証があれば，日本でも有効。"** — partially correct. ジュネーブ条約に基づく国際運転免許証は，日本で有効だが，**入国後1年間のみ**有効。日本入国後1年を超えた後は，国際免許証があっても運転できない。
3. **"外国免許から日本免許への切り替えには，必ず運転試験を受けなければならない。"** — incorrect. 切り替えは国によって異なり，一定の国・地域（スイス・ドイツ・フランス等）の免許保持者は，学科試験および技能試験の一部または全部が免除される場合がある。
4. **"在留資格がなくなれば，日本の運転免許証も取り消される。"** — incorrect. 日本の運転免許証は，在留資格とは独立した制度（道路交通法が根拠）。在留資格が失効しても，運転免許証が直ちに取り消されるわけではない（ただし不法在留状態での運転は別問題）。

## Trigger

Use this card when the user says:

- "外国の運転免許証で日本でも運転できますか？"
- "国際運転免許証はどのくらい日本で使えますか？"
- "日本免許に切り替えるにはどうすればいいですか？"
- "外国免許の切り替えは試験なしでできますか？"
- "在留資格がなくなったら，日本の運転免許証も失効しますか？"
- any pattern treating foreign licenses as permanently valid in Japan, or assuming uniform test exemption across all countries.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| npa-gaimen-kirikae | L4 | 警察庁「外国免許の切り替え（外国免許の審査）」 | https://www.npa.go.jp/policies/application/license_renewal/gaimen.html | 2026-05-15 | 外国免許の日本での有効期間（入国後1年）; 切り替え手続き; 国・地域別の試験免除有無. |
| npa-kokusai-menkyo | L4 | 警察庁「国際運転免許証について」 | https://www.npa.go.jp/policies/application/license_renewal/kokusaimenkyo.html | 2026-05-15 | ジュネーブ条約に基づく国際運転免許証の日本での有効期間（入国後1年）. |

## Official Rule Or Source Fact

**外国の運転免許証・国際運転免許証の日本での有効期間:**

道路交通法上，外国の運転免許証（または国際運転免許証）は，以下の条件下で日本での運転に使用できる:

| 条件 | 内容 |
|---|---|
| **有効期間** | **入国の日から1年間**（または外国免許の有効期限のいずれか短い方）|
| **国際運転免許証** | ジュネーブ条約に基づく国際運転免許証=入国後1年間のみ有効（条約加盟国が発行したもの）|
| **対象外の国** | 中華人民共和国・韓国・フィリピン等，ジュネーブ条約の締約国でない国の免許は，直接の使用不可（要切り替え）|

**重要**: 入国後1年を超えて日本に在留する場合は，外国免許証・国際免許証に関わらず，日本の運転免許証への切り替えまたは新規取得が必要。

**外国免許から日本免許への切り替え手続き（外国免許の審査）:**

切り替えの申請先: 都道府県の運転免許センター（試験場）

必要書類:
- 外国の運転免許証（+ 日本語の公的翻訳）
- パスポート（入国日の確認）
- 在留カード
- 住民票
- 申請書等

**国・地域別の試験免除:**

切り替えの際，日本の学科試験および技能試験の免除は，免許を発行した国・地域によって異なる:

| 国・地域 | 免除の状況（概要）|
|---|---|
| スイス・ドイツ・フランス・英国・ニュージーランド・オーストラリア・カナダ・米国等（ジュネーブ条約加盟国・特定国） | 学科試験・技能試験の一部または全部が免除（書類確認・視力検査等のみで切り替え可能な場合がある）|
| 韓国・中国・その他多くの国 | 学科試験および/または技能試験の受験が必要 |

※ 具体的な免除条件は国・地域ごとに異なり，詳細は都道府県の運転免許センターまたは警察庁ウェブサイトで確認が必要。

**日本免許切り替えの際の在留期間要件:**

切り替えの際，現在の在留資格・在留期間の確認が行われる。在留期間が残り少ない場合，短期間の免許しか発行されないことがある。

**日本の運転免許証と在留資格の独立性:**

- 日本の運転免許証は，道路交通法に基づく制度（入管法とは独立）
- 在留期間が満了・在留資格が取り消されても，運転免許証の効力が直ちに消滅するわけではない
- ただし，不法在留状態での運転は，入管法上の問題と交通法規上の問題が並存する
- 日本の免許証の更新には，在留カードの確認が行われる（外国人は免許証の有効期限が在留期間と連動する場合がある）

**長期在留者の日本免許証有効期限:**

外国人が日本の運転免許証を取得した場合，その有効期限は在留期間と関連する場合がある:
- 在留期間が免許の通常有効期限より短い場合，在留期間満了日に合わせた有効期限が設定される
- 在留期間が更新された場合，免許証も更新申請が可能

## Safe Answer Behavior

- When asked if foreign licenses work in Japan: confirm they do for the first year after entry; warn that after 1 year, Japanese license or conversion is required.
- When asked about international driving permits: confirm they are valid for 1 year only from entry date, not issue date.
- When asked about conversion: explain the conversion process; note that test exemption varies by country; route to 運転免許センター for their specific country.
- When asked about residency status and driving licenses: clarify they are legally separate systems; the license does not expire when residency status changes (though renewal requires residency documents).

## Must Say

- 外国の運転免許証・国際運転免許証は，日本入国後**1年間のみ**有効。1年を超えて在留する場合は，日本の運転免許証への切り替え（外国免許の審査）または新規取得が必要。
- 外国免許から日本免許への切り替え（外国免許の審査）は，免許の発行国・地域によって学科試験・技能試験の免除の有無が異なる（一部の国は試験が必要; 他は書類確認のみ）。申請先は都道府県の運転免許センター。
- 日本の運転免許証は在留資格とは独立した制度。ただし，免許証の有効期限が在留期間と連動する場合があるため，在留期間更新後は免許証の更新も確認が必要。

## Must Not Say

- 「外国免許があれば，日本でずっと運転できる。」（入国後1年のみ有効）
- 「国際運転免許証は永続的に有効。」（入国後1年のみ有効）
- 「外国免許の切り替えには必ず試験が必要。」（国によって試験免除あり）
- 「在留資格が失効すれば，日本免許も同時に失効する。」（法的に独立した制度）

## Deep Water Triggers

- 来日1年以上が経過したが，外国免許の有効期限が残っている — 日本で運転できるか？（入国後1年の制限=外国免許有効期限に関係なく適用）
- 中国の運転免許証（ジュネーブ条約非加盟）を持って来日した — 日本で運転するにはどうすればよいか？
- 外国免許の切り替えをしたが，在留期間が6か月しかない — 免許証の有効期限はどうなるか？
- 日本で免停になった外国人が帰国し，再来日した — 過去の免停は日本免許に影響するか？
- 在留資格が取り消された状態で日本の運転免許証を持っている — 運転してよいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with foreign licenses asking about driving in Japan: confirm 1-year rule from entry date; route to NPA (警察庁) or 運転免許センター for conversion procedure.
- For persons needing conversion: route to their prefecture's 運転免許センター; note documents needed (外国免許+日本語翻訳+パスポート+在留カード+住民票).
- For persons from non-Geneva-Convention countries (China, Korea, etc.): explain they cannot use their home license directly; must go through formal conversion with tests.
- For persons with expiring residency + Japanese license: remind that after residency renewal, license renewal should also be checked.

## Unknown Fields

- The complete current list of countries/regions for which the 学科試験 and/or 技能試験 are waived in the Japanese foreign license conversion process — NPA maintains this list but it was not directly accessed in this session.
- Whether the 1-year rule resets each time a person exits and re-enters Japan (i.e., is the clock tied to a specific entry or to continuous residence).
- The exact procedure for persons whose foreign license expired while in Japan (entry was within 1 year but the foreign license expired during the stay).

## Needs Domain Flags

- needs_domain (P1): Does the 1-year foreign license validity period reset with each entry into Japan (多入国者のケース), or does it apply from the most recent entry date only? This affects long-term residents who may have thought their clock reset upon re-entry.
- needs_domain (P1): For persons from countries not party to the Geneva Convention on Road Traffic (e.g., China, Philippines) — is there any alternative to full test-based license acquisition, or is the full 技能試験 always required?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| menkyo-001 | "アメリカの運転免許証で日本でも運転できますか？" | State: 入国後1年間は，米国の運転免許証（または国際運転免許証）で日本での運転が可能。1年を超えて日本に在留する場合は，日本の運転免許証への切り替え（外国免許の審査）が必要。米国は特定の条件下で学科試験等が免除される場合がある。詳細は都道府県の運転免許センターに確認を。 |
| menkyo-002 | "中国の運転免許証で日本で運転できますか？" | State: 中国は国際運転免許証（ジュネーブ条約）の締約国ではないため，中国の運転免許証は日本で直接使用できない。日本で運転するには，日本の運転免許証を新規取得するか，所定の手続き（外国免許の審査）で切り替える必要がある（試験が必要な場合が多い）。都道府県の運転免許センターに問い合わせること。 |
| menkyo-003 | "日本に来て2年経ちます。国際運転免許証で運転していましたが，まだ大丈夫ですか？" | State: 国際運転免許証は，日本入国後1年間のみ有効。2年が経過している場合，国際運転免許証での運転は認められず，無免許運転になる可能性がある。至急，都道府県の運転免許センターで外国免許の切り替え（外国免許の審査）手続きを行うこと。 |

## Source Notes

- 外国免許の日本での有効期間: 警察庁「外国免許の切り替え」— 入国後1年間有効; 道路交通法に基づく.
- 国際運転免許証の有効期間: 警察庁「国際運転免許証について」— ジュネーブ条約; 入国後1年間のみ.
- 国別の試験免除: 警察庁外国免許切り替えページ — 国・地域ごとに学科試験・技能試験の免除の有無が異なる.
- Cross-ref G61 (在留カードの本人確認義務), G82 (長期出国と在留資格).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 019 G101. Key sources: 警察庁「外国免許の切り替え」（入国後1年の制限; 国別試験免除）; 警察庁「国際運転免許証」（ジュネーブ条約; 1年間のみ）. Core facts: 外国免許・国際免許=入国後1年のみ有効; 1年超は日本免許切り替え/新規取得が必要; 試験免除は国によって異なる; 日本免許は在留資格と独立した制度. needs_domain P1: 1年の起算点（入国ごとにリセットされるか）; ジュネーブ条約非加盟国（中国等）の代替ルート. Cross-ref G61, G82.
