---
asset_id: guardrail-zairyu-shikaku-naiyo-kakunin
title: 在留資格の内容確認と就労可否の判断方法 — 在留カードの「就労制限の有無」欄と「指定書」が就労可否の確認基準；「就労不可」でも資格外活動許可があれば就労可能；在留資格名だけで判断してはならない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 019"
---

## What This Document Is

This guardrail prevents errors about how to correctly determine whether a foreign national is permitted to work in Japan, based on their 在留カード. Key errors to block:

1. **"在留カードを持っていれば，日本で働ける。"** — incorrect. 在留カードを持っていても，「就労制限の有無」欄が「就労不可」と記載されている場合，就労は原則禁止（資格外活動許可がある場合を除く）。
2. **"在留資格の名前だけで，就労できるかどうかが分かる。"** — not fully correct. 在留資格の名前（技人国・留学・家族滞在等）は就労可否の重要な手がかりだが，在留カードの「就労制限の有無」欄の記載，および「特定活動」の場合は指定書の内容，まで確認しなければ正確な判断はできない。
3. **"在留カードに『就労制限なし』と書いてあれば，どんな仕事もできる。"** — mostly correct（but has exceptions）. 「就労制限なし」は，在留期間中は活動内容に関わらず就労可能という意味。ただし，「特定技能1号」の場合は「就労制限あり」で指定された分野のみ就労可能（指定書の確認が必要）。
4. **"在留カードの『就労制限の有無』欄が空白なら，就労できる。"** — incorrect. 空白または記載なしは，在留カード様式上の問題か，短期滞在等の就労禁止の在留資格である可能性があり，必ずしも就労可能を意味しない。

## Trigger

Use this card when the user says:

- "在留カードを見せてもらいましたが，就労できるか確認したい。"
- "雇用する外国人が就労できるかどうか，どうやって確認すればいいですか？"
- "留学生の在留カードに『就労不可』と書いてあるが，アルバイトできますか？"
- "家族滞在の在留カードで就労できますか？"
- "在留カードの読み方を教えてください。"
- any pattern suggesting that having a residence card is sufficient for work authorization, or that residency status name alone determines work permission.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-card-mitsuru | L4 | 出入国在留管理庁「在留カードの見方（様式と記載事項）」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_card_mitsuru.html | 2026-05-15 | 在留カードの様式; 「就労制限の有無」欄の記載内容と読み方; 「指定書」による就労制限の補足. |
| isa-kakunin | L4 | 出入国在留管理庁「在留資格の確認について（雇用主向け）」 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00011.html | 2026-05-15 | 雇用主の在留カード確認義務; 確認方法; 不法就労助長罪との関係. |
| g61-crossref | guardrail | guardrail-zairyu-card-keitai-gimu (G61) | internal | 2026-05-15 | G61: 在留カードの常時携帯義務・法的地位. |
| g87-crossref | guardrail | guardrail-fuhoshurou-jocho-sekinin (G87) | internal | 2026-05-15 | G87: 不法就労助長罪（入管法第73条の2）; 雇用主の在留カード確認義務. |
| g16-crossref | guardrail | guardrail-shikaku-gai-katsudo-28h-limit (G16) | internal | 2026-05-15 | G16: 資格外活動許可（就労不可の在留資格での就労許可; 留学・家族滞在）. |

## Official Rule Or Source Fact

**在留カードの「就労制限の有無」欄の記載と意味:**

在留カードには，「就労制限の有無」欄があり，以下の記載がある:

| 記載内容 | 意味 |
|---|---|
| **就労制限なし** | 在留期間中は，活動内容・就労先を問わず就労可能（永住者・定住者・日本人配偶者等・永住者配偶者等）|
| **就労不可** | 就労は原則禁止（留学・家族滞在・文化活動等; 資格外活動許可がある場合は別）|
| **在留資格に基づく就労活動のみ可** | 在留資格の活動範囲内での就労のみ可能（技人国・技能・特定技能・介護等の就労系資格; 範囲外は不可）|

※「特定活動」の場合: 指定書（在留カードに添付または別紙）に記載された活動内容のみ可能

**就労可否の確認手順（雇用主向け）:**

1. **在留カードの提示を求める**（16歳以上の中長期在留者は常時携帯義務あり）
2. **在留カードの真正性を確認**（偽造カードの見分け方: ISAのオンライン確認システム利用可）
3. **「就労制限の有無」欄を確認**
4. **「特定活動」の場合: 指定書の内容を確認**（特定活動の場合，在留カード裏面または別紙の指定書に就労範囲が記載）
5. **「就労不可」の場合: 資格外活動許可（スタンプ・シール）の有無を確認**

**在留資格別の就労可否早見表:**

| 在留資格（代表例）| 就労制限欄 | 就労の可否 |
|---|---|---|
| 永住者・定住者・日本人配偶者等・永住者配偶者等 | 就労制限なし | どんな仕事もOK |
| 技人国・技能・特定技能・介護・教授・研究等 | 在留資格に基づく就労のみ | 在留資格の範囲内のみ |
| 特定活動（指定書あり）| 在留資格に基づく就労のみ（指定書参照）| 指定書記載の活動のみ |
| 留学 | 就労不可 | 原則禁止（資格外活動許可で週28h/week以内のアルバイト可）|
| 家族滞在 | 就労不可 | 原則禁止（資格外活動許可で週28h/week以内可）|
| 短期滞在 | 就労不可 | 完全禁止（資格外活動許可の対象外）|
| 文化活動 | 就労不可（収入を伴わない活動のみ）| 原則禁止（G98 cross-ref）|

**資格外活動許可の確認（G16 cross-ref）:**

「就労不可」の在留資格（留学・家族滞在等）でも，資格外活動許可があれば制限内での就労が可能:
- 資格外活動許可の有無: 在留カードの裏面にスタンプ/シールで確認（「資格外活動許可あり」等）
- 包括許可: 留学・家族滞在は週28時間以内（教育機関長期休業中は1日8時間以内; G16参照）
- 個別許可: 在留カードまたは別紙に就労許可の具体的内容が記載

**偽造在留カードへの対策（G87 cross-ref）:**

雇用主は，在留カードが偽造でないことを確認する義務がある（G87参照）。ISAが提供するオンライン確認システム（在留カード等番号失効情報照会）を使用して確認することが推奨される。

**確認記録の保管:**

雇用主は，確認した在留カードの写し等を保管することで，万一の不法就労助長罪における「適切に確認した」という証拠となる（G87参照）。

## Safe Answer Behavior

- When asked how to check work authorization: explain the three-step process (在留カード確認→就労制限欄確認→必要に応じて指定書/資格外活動許可確認); route to ISA's online verification system.
- When asked about a specific status (留学/家族滞在): explain the 就労不可 status and the 資格外活動許可 option (28h/week cap); warn about 風俗業 prohibition.
- When asked about 永住者/定住者: confirm 就労制限なし; no restrictions on work type.
- When asked about 特定活動: emphasize the need to check the 指定書 for specific permitted activities.

## Must Say

- 外国人が就労できるかどうかは，在留カードの「就労制限の有無」欄を確認することが基本。在留資格の名前だけでは判断できない場合がある（特に「特定活動」は指定書の確認が必要）。
- 「就労不可」と記載されている在留資格（留学・家族滞在等）でも，資格外活動許可（在留カード裏面のスタンプ/シール）があれば，制限内での就労が可能（留学・家族滞在=週28時間以内）。
- 雇用主は，在留カードを直接確認する義務があり（G87参照），確認を怠ると不法就労助長罪のリスクがある。ISAのオンライン確認システムで在留カードの真正性も確認できる。

## Must Not Say

- 「在留カードがあれば就労できる。」（就労制限なしの確認が必要）
- 「在留資格の名前だけで就労可否が分かる。」（特定活動は指定書の確認が必要）
- 「就労不可でもアルバイトはできない。」（資格外活動許可があれば制限内でアルバイト可能）

## Deep Water Triggers

- 在留カードの「就労制限の有無」欄が見当たらない/読めない — どうすればよいか？（ISAオンラインシステムで確認; ISAに問い合わせ）
- 特定活動の指定書が古い（発行から数年経過）— いまでも有効か？（在留資格の有効期間内は有効; 転職した場合は指定書の変更が必要な場合あり）
- 資格外活動許可の包括許可の28時間制限を超えて働かせた雇用主 — 刑事罰の対象か？（雇用主は不法就労助長罪のリスクあり; G87 cross-ref）
- 在留カードの有効期限が切れている外国人を雇用した — 問題があるか？（有効期限切れカードで雇用=不法就労助長罪のリスク; ただし在留資格の有効性と在留カード有効期限は別問題; G22/G53参照）
- 外国人を業務委託で使用する（正社員・アルバイトではない）— 在留カードの確認義務はあるか？（「事業活動に関し，外国人に就労させた」に業務委託も含まれうる）

## User Next Actions

This is not user-facing copy. For answer routing:

- For employers asking how to verify work authorization: route to ISA guidance page for employers; route to ISA online verification system; recommend keeping copy of the verified card.
- For workers asking about their own work permission: route them to read their 在留カード; explain the 就労制限 column; route to ISA if uncertain.
- For 留学/家族滞在 holders asking about part-time work: confirm 資格外活動許可 is required; check if they have the permit on their card; explain the 28h/week limit (G16).
- For 特定活動 holders: route to their specific 指定書; emphasize job changes may require new 指定書 or status change.

## Unknown Fields

- Whether the ISA's online 在留カード confirmation system (在留カード等番号失効情報照会) covers all statuses and whether employers should routinely use it.
- The exact format and location of the 資格外活動許可 indication on current-format 在留カード (front vs. back; sticker vs. stamp).

## Needs Domain Flags

- needs_domain (P1): Does the ISA's online 在留カード verification system (在留カード等番号失効情報照会) confirm active validity of the card, or only report known lost/stolen/revoked cards? The scope of the verification system affects how much confidence employers can have after checking it.
- needs_domain (P1): For employers who use foreign nationals on 業務委託 (not direct employment) — is the 在留カード confirmation obligation under the 不法就労助長罪 provision equally applicable? The ISA page uses language about "事業活動に関し外国人に就労させた" which may include service contracts.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kakunin-001 | "留学生を雇いたいのですが，就労できますか？在留カードに何が書いてあれば大丈夫ですか？" | State: 留学の在留資格は「就労不可」だが，資格外活動許可（在留カード裏面のスタンプ等）があれば，週28時間以内のアルバイトが可能（教育機関の長期休業中は1日8時間以内）。在留カードの裏面で「資格外活動許可あり」のスタンプ/シールを確認すること。風俗業は禁止。ISAのオンラインシステムで在留カードの真正性も確認を推奨。 |
| kakunin-002 | "在留カードの見方を教えてください。就労できるかどうかはどこで確認しますか？" | State: 在留カードの「就労制限の有無」欄（表面または裏面）で確認。「就労制限なし」=就労自由; 「就労不可」=原則禁止（資格外活動許可があれば制限内可）; 「在留資格に基づく就労のみ可」=資格の範囲内のみ。「特定活動」の場合は指定書（別紙）で就労範囲を確認。ISAの在留カード等番号失効情報照会システムで真正性確認も推奨。 |
| kakunin-003 | "永住者の在留カードを持つ人を雇いますが，どんな仕事でもしてもらえますか？" | State: 永住者の在留カードには「就労制限なし」と記載されており，活動内容・職種を問わず就労可能。ただし，在留カードの有効期限内であることを確認すること（在留カードの有効期限は7年; 永住者の在留資格そのものの有効期限はない）。在留カードの有効期限が切れている場合は，更新手続きを促すこと。 |

## Source Notes

- 在留カードの「就労制限の有無」欄の読み方: ISA「在留カードの見方」(zairyu_card_mitsuru.html) — 就労制限欄の記載内容と意味; 指定書の位置づけ.
- 雇用主の確認義務: ISA「在留資格の確認について（雇用主向け）」(nyuukokukanri07_00011.html) — 在留カードの確認義務; 不法就労助長罪との関係.
- 資格外活動許可: G16 cross-ref（包括許可=週28h/week; 留学・家族滞在のみ）.
- 不法就労助長罪: G87 cross-ref（雇用主の刑事罰; 確認義務の詳細）.
- 在留カードの法的地位: G61 cross-ref（常時携帯義務; 法定証明書類）.
- Cross-ref G16 (資格外活動許可), G22 (在留カード有効期限), G61 (在留カード携帯義務), G87 (不法就労助長罪), G98 (文化活動=就労不可).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 019 G105. Risk level P0 (雇用主が在留カードを正しく確認しないと不法就労助長罪のリスクがある). Key sources: ISA「在留カードの見方」（就労制限欄の記載と意味）; ISA「在留資格の確認（雇用主向け）」（確認義務）; G16/G61/G87 cross-refs. Core facts: 就労可否は在留カードの「就労制限の有無」欄で確認; 就労不可でも資格外活動許可があれば制限内で就労可; 特定活動は指定書の確認が必要; 雇用主の確認義務（G87）. needs_domain P1: ISAオンライン確認システムの確認範囲; 業務委託での確認義務の適用. Cross-ref G16, G22, G61, G87, G98.
