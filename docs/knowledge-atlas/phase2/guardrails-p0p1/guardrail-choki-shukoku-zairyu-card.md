---
asset_id: guardrail-choki-shukoku-zairyu-card
title: 長期出国時の在留カード返納・住民票抹消 — 1年超の出国は在留資格喪失リスク；住民票は出国前に転出届が必要；永住者はみなし再入国1年超過で永住失効
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 015"
---

## What This Document Is

This guardrail prevents errors about what happens to residence status and residence card when a foreign national leaves Japan for an extended period. Key errors to block:

1. **"長期出国しても，在留資格は有効のまま。"** — incorrect. みなし再入国許可での出国から1年以内に帰国しなければ，在留資格は失効する（G19 cross-ref）。正規の再入国許可（最長5年・在留期間内）を取得していれば，その有効期間内は在留資格が維持される。
2. **"出国中も住民票はそのまま。"** — incorrect. 日本を出国して1年以上（または住所を日本に置かなくなる場合）は，出発前または出国後遅滞なく**転出届**（海外転出）を市区町村役場に提出する必要がある。転出届を出さない場合，住民税の課税対象になり続けるなどの問題が生じる。
3. **"永住ビザがあれば何年でも出国できる。"** — incorrect. 永住者もみなし再入国許可（1年）または正規再入国許可（最長5年）の範囲内で帰国しなければ，永住資格が失効する（G74 cross-ref；G19 cross-ref）。永住資格は日本に在留する「資格」であり，無期限の出国権ではない。
4. **"在留カードは出国後も手元に持っていてよい。"** — nuanced. 正規再入国許可で出国する場合は在留カードを保持（再入国の際に必要）。しかし，在留資格を放棄・失効させる形で出国する場合（みなし再入国許可の超過・資格放棄等）は，在留カードの返納義務が生じる場合がある。

## Trigger

Use this card when the user says:

- "長期間日本を離れますが，在留資格はどうなりますか？"
- "1年以上出国しますが，ビザは維持できますか？"
- "出国中の住民票はどうすればいいですか？"
- "永住ビザがあれば，長期出国しても問題ないですか？"
- "海外転出届とは何ですか？"
- any pattern treating the residence status as automatically preserved during long-term absence, or ignoring the re-entry permit time limits.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-sainyukoku | L4 | 出入国在留管理庁「再入国許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-5.html | 2026-05-15 | 正規再入国許可の最長有効期間（5年・在留期間内が上限）; みなし再入国許可（1年）との比較. |
| soumu-kaigai-tenshutsu | L4 | 総務省「住民基本台帳制度における海外転出者の取り扱い」 | https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/080116_4.html | 2026-05-15 | 海外転出届の義務; 転出届を出さないリスク（住民税課税継続等）. |
| g19-crossref | guardrail | guardrail-minashi-sainyukoku-one-year-limit (G19) | internal | 2026-05-15 | G19: みなし再入国許可1年上限の公式テキスト確認済み; 永住者も対象; 短期滞在は除外. |
| g65-crossref | guardrail | guardrail-shutsukoku-sainyukoku-zairyu (G65) | internal | 2026-05-15 | G65: 在留期間は出国中も進行（停止しない）; 正規再入国許可=最長5年（在留期間内）; みなし再入国=1年. |
| g74-crossref | guardrail | guardrail-eijusha-zairyu-torikeshi-risk (G74) | internal | 2026-05-15 | G74: 永住者もみなし再入国1年超過で永住資格喪失リスク確認済み. |

## Official Rule Or Source Fact

**みなし再入国許可と正規再入国許可の違い（G19・G65 cross-ref）:**

| 種別 | 有効期間 | 特徴 |
|---|---|---|
| **みなし再入国許可** | 出国から1年以内（在留期間満了までが上限） | 申請不要（出国時に自動適用）; 延長不可 |
| **正規再入国許可** | 最長5年（在留期間満了日が上限） | ISAへの事前申請が必要; 在留期間内が上限; 延長可（条件あり）|

- みなし再入国許可で出国し，1年以内に帰国しなかった場合: **在留資格失効**
- 永住者がみなし再入国許可で出国し，1年以内に帰国しなかった場合: **永住資格失効（G74 cross-ref）**

**長期出国を予定する場合の推奨アクション:**

1. **正規再入国許可の取得**: 1年以上の出国を予定する場合，出国前にISAで正規再入国許可を申請（最長5年・在留期間内）
2. **在留期間の確認**: 正規再入国許可の有効期間は在留期間満了日を超えることができない。在留期間の更新と合わせて計画が必要
3. **海外転出届の提出**: 1年以上（または住所を日本に置かなくなる場合）は市区町村役場に海外転出届を提出

**住民票と長期出国:**

| 状況 | 手続き |
|---|---|
| 1年未満の出国（観光・短期出張等） | 転出届不要（住民票は維持） |
| **1年以上の出国（生活拠点が海外に移る）** | **海外転出届を提出（市区町村役場）** |
| 海外転出届を提出しない場合 | 住民税課税が継続; 行政上の問題が生じる可能性 |
| 転出届を提出した場合 | 住民票が抹消（帰国後に転入届が必要）|

**海外転出届の手続き:**

- 申請先: 住所地の市区町村役場
- 申請時期: 出発の2週間前〜出発日（または出発後遅滞なく）
- 必要書類: 本人確認書類・印鑑等（市区町村により異なる）
- 転出後の在留カード: 転出しても在留資格は別制度。住民票の抹消と在留資格の失効は別問題

**在留カードの返納義務:**

- 在留資格を失った場合（みなし再入国超過・正規再入国超過等）: 在留カードを日本に持ち帰って返納する義務がある（在留カードを保有した状態での不法滞在は問題）
- 正規再入国許可で出国する場合: 在留カードは出国時・帰国時に必要なので保持

**永住者の特別注意事項（G74・G19 cross-ref）:**

永住資格は「在留期間が無期限」であるが，再入国許可の範囲内で帰国しなければ資格が失効する。1年を超えて出国する永住者は必ず正規再入国許可を取得すること。

## Safe Answer Behavior

- When asked about long-term absence: always bring up the re-entry permit limit (1 year for みなし; up to 5 years/in-period for 正規) — do not say status is automatically maintained.
- When asked if 永住 means unlimited departure: clearly state 永住 does NOT protect against loss of status from overstaying re-entry permit limits; route to G19 and G74.
- When asked about 住民票 during long absence: explain the 海外転出届 obligation for 1+ year absences; note the tax consequences of not filing.
- Do not tell users "you can stay abroad as long as you want with a 永住 visa."
- Route to professional for specific planning (re-entry permit application timing, renewal of 在留期間 before departure).

## Must Say

- 長期出国（みなし再入国許可の場合は1年以内，正規再入国許可取得の場合は許可期間内）に帰国しなければ，在留資格は失効する。永住者も同様（みなし再入国1年超過で永住失効リスク; G19・G74参照）。
- 1年以上日本を離れる場合（生活拠点が海外に移る場合）は，市区町村役場に海外転出届を提出する必要がある。転出届を出さないと住民税課税が継続するなどの問題が生じる。
- 1年以上の出国を予定する場合は，出国前にISAで正規再入国許可（最長5年・在留期間内が上限）を取得することを強く推奨。在留期間満了日を超えることはできないため，在留期間の更新も合わせて計画が必要。

## Must Not Say

- 「永住ビザがあれば何年でも出国できる。」（みなし再入国許可の1年制限・正規再入国許可の在留期間内制限が適用される）
- 「出国中も在留資格は維持されている。」（再入国許可の範囲を超えると失効）
- 「住民票はそのままでいい。」（1年以上の出国は海外転出届が必要）
- 「在留カードはどこでも置いておいていい。」（正規再入国許可の場合は出国時・帰国時に必要; 失効後は返納義務）

## Deep Water Triggers

- 正規再入国許可（5年）を取得したが，許可期間内に在留期間が満了する — 帰国前に在留期間を更新できるか？
- みなし再入国許可で出国し，11か月後に出国期間を延長したい — 海外で延長できるか？
- 海外転出届を出したが，在留資格は維持しているつもり — 帰国して住民票を再び取得するにはどうすればよいか？
- 永住者で正規再入国許可5年を取得したが，5年後に帰国 — 在留資格は維持されているか？
- 在留期間が残り2か月で長期出国を予定 — 出国前に更新と再入国許可のどちらを先にすべきか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For 1+ year departure planning: strongly recommend getting 正規再入国許可 before departure; route to ISA 16-5.html; route to professional for renewal + re-entry permit coordination.
- For 永住 holders: route to G19 (みなし再入国1年ルール) and G74 (永住資格喪失リスク); emphasize 正規再入国許可 necessity.
- For 住民票 questions: route to local municipality for 海外転出届 procedure; mention the tax consequence of not filing.
- For persons who already exceeded the re-entry permit limit: route to lawyer immediately (不法滞在状態の可能性; 在留特別許可ルート).

## Unknown Fields

- Whether there is any administrative pathway to restore a residence status that was lost due to みなし再入国 超過, other than 在留特別許可 within deportation proceedings.
- Whether online applications (オンライン申請) for 在留期間 renewal can be submitted from overseas in certain circumstances.
- The exact impact of not filing 海外転出届 on subsequent 在留申請 (whether failure to file is noted as a negative factor in renewal/change evaluation).

## Needs Domain Flags

- needs_domain (P1): Is there any procedure at an overseas Japanese embassy to extend or restore a みなし再入国 permit that has expired or is about to expire? Official ISA text does not confirm any overseas extension mechanism.
- needs_domain (P1): What is the impact on immigration renewal/change evaluation of a foreign national who failed to file 海外転出届 during a multi-year absence? ISA guideline does not explicitly address this.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| choki-001 | "永住ビザがあれば3年くらい海外に住んでも問題ないですか？" | State: 永住者も再入国許可の範囲内に帰国しなければ永住資格が失効するリスクがある（みなし再入国許可=1年; 正規再入国許可=最長5年・在留期間内）。3年の出国を予定するなら，出国前にISAで正規再入国許可を申請することが必須。G19・G74参照。 |
| choki-002 | "2年間海外赴任が決まりました。住民票はどうしますか？" | State: 1年以上の出国（生活拠点が海外に移る場合）は，市区町村役場に海外転出届を提出する必要がある。出国前または出国後遅滞なく手続きを。転出届を出さないと住民税課税が継続する場合がある。在留資格の維持には正規再入国許可の取得が必要（ISA 16-5.html参照）。 |
| choki-003 | "みなし再入国許可で出国して11か月たちました。まだ帰国できませんが，どうすればよいですか？" | State: みなし再入国許可は1年以内に帰国しなければ在留資格が失効する（G19参照）。海外での延長は認められない（needs_domain）。1か月以内に帰国できない場合，在留資格の失効リスクがある。至急弁護士・行政書士に相談を。 |

## Source Notes

- 再入国許可の種類・有効期間: ISA「再入国許可申請」(16-5.html); G65 cross-ref（在留期間は出国中も進行）; G19 cross-ref（みなし再入国許可1年・永住者も対象）.
- 海外転出届の義務: 総務省「住民基本台帳制度における海外転出者の取り扱い」; 住民基本台帳法の海外転出届規定.
- 永住資格とみなし再入国1年超過: G74 cross-ref（永住者の在留資格取消リスク確認済み）.
- 在留カード返納義務: 入管法上の在留カード返納規定（在留資格失効後）.
- Cross-ref G19 (みなし再入国1年上限), G65 (出国中の在留期間進行), G74 (永住者の取消リスク), G26 (在留資格取消事由).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 015 G82. Key sources: ISA 16-5.html (再入国許可); 総務省（海外転出届）; G19/G65/G74 cross-refs. Core facts: みなし再入国=1年; 正規再入国=最長5年（在留期間内）; 永住者も失効リスクあり; 1年以上出国=海外転出届必要; 在留カード失効後返納義務. needs_domain P1: 海外での再入国許可延長手続き; 海外転出届未提出の在留審査への影響. Cross-ref G19, G65, G74, G26.
