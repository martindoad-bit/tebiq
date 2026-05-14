---
asset_id: guardrail-eijusha-zairyu-torikeshi-risk
title: 永住者の在留資格取消リスク — 永住は活動制限がないが取消制度は適用される；長期出国・届出義務違反・刑事罰等が主な事由
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 013"
---

## What This Document Is

This guardrail prevents errors about the risks of 在留資格 cancellation for 永住者 (permanent residents). Key errors to block:

1. **"永住者は在留資格が取り消されることはない。"** — incorrect. 永住者も 入管法 第22条の4 による在留資格取消の対象となる。活動制限がないことと，取消対象から除外されることは別の話。
2. **"永住者が長期間海外に行っても在留資格は失われない。"** — partially incorrect. みなし再入国許可（1年）または通常の再入国許可（最長5年）の期限を超えた場合，永住資格を失う可能性がある（G19 cross-ref）。
3. **"永住者になれば在留カードの更新も必要ない。"** — incorrect. 在留カード自体は 7年ごとに更新が必要（G53 cross-ref）。在留資格（永住者ステータス）は永続するが，在留カードの有効期間は別途管理が必要。
4. **"軽い刑事事件で有罪になっても，永住ビザは取り消されない。"** — partially incorrect. 刑事罰の有無・内容によっては在留資格取消の事由または実質的な影響がある場合がある。禁錮以上の刑に処せられた場合は素行不良として評価される。

## Trigger

Use this card when the user says:

- "永住者になれば，在留資格を取られる心配はなくなりますか？"
- "永住者のまま長期間海外に住んでもよいですか？"
- "永住者なら刑事事件があっても大丈夫ですか？"
- "在留カードが切れたら，永住ビザも無効になりますか？"
- "永住者になった後に届出を忘れても大丈夫ですか？"
- any pattern treating 永住者 status as immune from cancellation, or conflating card validity with status permanence.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-torikeshi | L4 | 出入国在留管理庁「在留資格の取消し（入管法第22条の4）」 | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | 2026-05-15 | 在留資格取消の対象は在留外国人（永住者含む）. 取消事由（1）〜（10）. 永住者は活動非実施（第22条の4第1項3〜8号）からは除外の可能性あるが，届出違反・虚偽記載は適用. |
| egov-nyukan-22-4 | L1 | 出入国管理及び難民認定法 第22条の4 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 法文: 第22条の4が適用される在留資格の範囲に 「永住者」が除外規定なしで含まれる（活動関連事由については永住者に課す活動要件がないため実質的に適用対象外の事由が多い）. |
| g19-crossref | guardrail | guardrail-minashi-sainyukoku-one-year-limit (G19) | internal | 2026-05-15 | G19: みなし再入国=1年以内; 超過で在留資格喪失リスク. 永住者も適用対象. |
| g26-crossref | guardrail | guardrail-zairyu-shikaku-torikeshi-22-4 (G26) | internal | 2026-05-15 | G26: 取消事由（1）〜（10）; 虚偽申請・届出違反・住所不登録等; 永住者も適用対象. |
| g53-crossref | guardrail | guardrail-eijusha-card-kosin-soko (G53) | internal | 2026-05-15 | G53: 永住者の在留カード = 7年有効（16歳以上）; カード更新≠在留資格更新だが義務. |
| g29-crossref | guardrail | guardrail-todoke-gimu-ihan-kekka (G29) | internal | 2026-05-15 | G29: 届出義務違反（住所・所属機関変更の14日以内届出）の罰則; 届出違反は取消事由にも. |
| g65-crossref | guardrail | guardrail-shutsukoku-sainyukoku-zairyu (G65) | internal | 2026-05-15 | G65: 在留期間は出国中も進行; みなし再入国許可の限界; 永住者も適用対象. |

## Official Rule Or Source Fact

**永住者に対する在留資格取消（入管法 第22条の4）:**

在留資格取消制度（入管法第22条の4）は，永住者を含む在留外国人全般に適用される。ただし，永住者は就労・活動に制限がないため，**活動非実施に関する取消事由（第22条の4第1項第3号〜第8号相当の活動要件）は実質的に適用されない**。永住者に関連して実際に問題となり得る取消事由は以下の通り:

| 取消事由 | 内容 | 永住者への適用 |
|---|---|---|
| **（1）虚偽の申請・文書** | 偽りの申請書類や文書を提出して在留資格を取得 | 適用あり — 永住申請時の虚偽も含む |
| **（2）在留カード・旅券の偽造等** | 在留カード・旅券を偽造・変造等 | 適用あり |
| **（3）住居地届出義務違反** | 住居地の届出をしない，または虚偽の届出 | 適用あり（G29 cross-ref）|
| **届出不履行の繰り返し** | 住所・所属機関変更届出を繰り返し怠る | 取消審査の対象となりうる |

**永住者の活動範囲と取消リスクの整理:**

永住者は入管法上の「活動に制限がない在留資格」であるため，「活動を3か月行っていない」「活動実態がない」という取消事由（就労系ビザに適用される事由）は原則として適用されない。しかし:
- 虚偽申請 → 適用
- 届出義務違反（住所・カード更新怠慢） → 適用
- 再入国許可失効（長期出国による在留資格喪失）→ 取消ではなく「在留資格の喪失」という形で資格を失う

**長期出国と永住資格のリスク（G19/G65 cross-ref）:**

永住者が長期間海外に滞在した場合:

| 出国方式 | 期限 | 超過の結果 |
|---|---|---|
| **みなし再入国許可（自動適用）** | 出国日から1年以内 | 期限超過 → 永住資格を失う（再入国不可） |
| **通常の再入国許可（別途申請）** | 最長5年（在留期間内） | 永住者の「在留期間」は永続だが，許可の有効期間に注意 |

永住者の場合，在留期間は「無期限」なので通常の再入国許可は最長5年（法令上）とされるが，実際の許可に際しては審査される。5年を超えて海外在住となった場合，日本への帰国に支障が生じる可能性がある。

**在留カードの期限切れと在留資格の関係（G53 cross-ref）:**

| 事象 | 意味 |
|---|---|
| 在留カードの有効期限切れ | カードの物理的な有効期限が切れているが，在留資格「永住者」は消滅しない |
| 在留カードを更新しない状態 | 不携帯・不提示になる可能性（第23条違反）+ カード更新義務不履行 |
| 在留資格の喪失 | みなし再入国期限超過 または 在留資格取消によってのみ発生 |

永住者の在留カードは7年ごとに更新が必要（16歳以上; G53 cross-ref）。更新を怠ると在留カード不携帯・提示義務違反のリスクがある（G61 cross-ref）。

**刑事事件と永住者:**

永住者が刑事事件で有罪判決を受けた場合，在留資格取消の直接の事由にはならない場合が多いが:
- 禁錮以上の刑（実刑・執行猶予付き含む）は **退去強制事由**（入管法第24条）の対象となりうる
- 退去強制事由に該当 → 退去強制手続が開始されうる（在留特別許可 [G21 cross-ref] によって許可される可能性も）
- 素行評価として次回の在留関連申請（帰化申請等）に影響

## Safe Answer Behavior

- When asked if 永住者 status can never be cancelled: correct the misconception; cancellation grounds (fraud, notification failures) apply to 永住者; long-term overseas absence risks losing the status via re-entry expiry.
- When asked about long-term overseas living as a 永住者: explain みなし re-entry = 1 year limit; for longer absences, 正規 re-entry permit (up to 5 years) must be obtained before departure.
- When asked about card expiry: clearly separate card validity from status permanence; the card expires, the status doesn't — but the card must still be renewed.
- When asked about criminal matters: do not advise; route to lawyer; note that serious criminal convictions can lead to deportation proceedings even for 永住者.
- Do not say "永住者は何も心配しなくていい."

## Must Say

- 永住者も入管法第22条の4の在留資格取消制度の対象となる。特に：虚偽申請・届出義務違反（住所・所属機関変更の14日以内届出）・在留カードの偽造等は永住者にも適用される取消事由。
- 永住者がみなし再入国許可（1年）または正規再入国許可（最長5年）の期限を超えて海外に滞在した場合，永住資格を失う可能性がある。長期出国前には再入国許可の申請を確認すること。
- 永住者の在留カードは在留資格の証明書であり，7年ごとに更新が必要（16歳以上）。カードの有効期限が切れても在留資格「永住者」は消滅しないが，カードの更新義務は存在する。

## Must Not Say

- 「永住者になれば在留資格を取り消されることはない。」（虚偽申請・届出違反・長期出国等で喪失リスクあり）
- 「永住者なら海外にずっと住んでいても問題ない。」（みなし/通常再入国許可の期限超過で資格喪失）
- 「在留カードが切れたら永住資格も無効になる。」（カード有効期限 ≠ 在留資格の有効期限）
- 「軽い刑事事件なら永住者は何も心配しなくていい。」（刑事事件の内容によっては退去強制事由に該当する場合あり）

## Deep Water Triggers

- 永住者が10年間日本に帰国していない — 永住資格の状態は？帰国する方法は？
- 永住者がDV被害を受けて海外に逃げた — みなし再入国期限が近い — 対応は？
- 永住者が別居中の日本人配偶者と離婚 — 在留資格には影響するか？（答: 原則影響なし — 永住は活動制限なし）
- 永住者が執行猶予付きの刑事判決を受けた — 退去強制のリスクは？
- 永住者が在留カードを紛失して更新していない — どのリスクがあるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For 永住者 concerned about long-term overseas: route to G19 (みなし再入国) and G65 (出国・再入国の在留期間への影響); strongly recommend securing 正規再入国許可 before extended overseas stays.
- For 永住者 with notification failures: route to G29 (届出義務違反の法的結果); encourage prompt retroactive filing where possible; route to professional if history of violations.
- For 永住者 with criminal matters: route to lawyer immediately; do not assess deportation risk.
- For 永住者 with card expiry questions: route to G53 (永住者カード更新) for the card update process.

## Unknown Fields

- Whether ISA has a formal policy or operational practice for 永住者 who were abroad for over 5 years — is there a consular procedure to restore 永住 status if re-entry permit expired?
- The exact legal mechanism by which 永住 status is lost when re-entry permit expires (is it statutory automatic loss, or does it require an ISA administrative act?).
- Whether a 永住者 who obtained the status through an application later found to have minor errors (not fraud) faces retroactive cancellation risk.

## Needs Domain Flags

- needs_domain (P1): For 永住者 who overstayed a みなし re-entry or 正規再入国許可 — what is the actual legal mechanism of status loss and is there any remedy pathway (consular procedure, etc.)?
- needs_domain (P1): What is the realistic ISA enforcement practice for permanent residents who have repeatedly failed address notification duties without any other compliance issue?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijusha-risk-001 | "永住者になれば，在留資格が取り消される心配はなくなりますか？" | State: NO — 永住者も在留資格取消の対象。虚偽申請・届出義務違反・カード偽造は取消事由。また長期出国でみなし/通常再入国許可が失効すると永住資格を失う可能性がある。 |
| eijusha-risk-002 | "永住者として3年間海外に住む予定ですが，永住資格は残りますか？" | State: みなし再入国許可（1年）を超えるので，出国前に正規再入国許可（最長5年）を申請する必要がある。再入国許可なしに1年超滞在すると永住資格を失う可能性がある（G19参照）。 |
| eijusha-risk-003 | "永住者の在留カードが切れましたが，永住資格も失いますか？" | State: NO — 在留カードの有効期限と在留資格「永住者」は別物。カードが切れても永住資格は消滅しない（G53参照）。ただし在留カードの更新義務があり，不更新は在留カード不携帯等のリスクがある。早急にカードを更新すること。 |

## Source Notes

- 在留資格取消（第22条の4）の永住者への適用: ISA torikeshi_00002.html（一般的な取消制度）; 入管法第22条の4条文（e-Gov）.
- 永住者の再入国許可と資格喪失リスク: G19 cross-ref (みなし再入国=1年) + G65 cross-ref (正規再入国許可の限界).
- 永住者の在留カード更新義務: G53 cross-ref (7年有効; 2か月前から申請).
- 在留カード常時携帯義務: G61 cross-ref (16歳以上の中長期在留者).
- 届出義務違反リスク: G29 cross-ref (14日届出; 取消事由への発展可能性).
- Cross-ref G19 (みなし再入国), G26 (取消事由), G29 (届出義務), G53 (永住者カード更新), G61 (カード携帯義務), G65 (出国・再入国).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 013 G74. Key sources: ISA torikeshi_00002.html (取消制度); 入管法第22条の4 (e-Gov); G19/G26/G53/G29/G65 cross-refs. Core facts: 永住者も取消対象（虚偽申請・届出違反等）; みなし再入国1年超過で資格喪失; カード有効期限 ≠ 在留資格有効期限; 刑事事件は退去強制事由と別扱い. Note: G73 (特定技能業務区分間転職マッピング) placed after this card as G75 due to ordering adjustment. Cross-ref G19, G26, G29, G53, G61, G65.
