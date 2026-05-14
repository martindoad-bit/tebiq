---
asset_id: guardrail-fuhoshurou-jocho-sekinin
title: 不法就労助長罪と雇用主責任 — 雇用主は外国人の在留資格を確認する義務；知らなかったでは免責されない；3年以下の懲役または300万円以下の罰金
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 016"
---

## What This Document Is

This guardrail prevents errors about employer liability for employing foreign nationals without proper work authorization. Key errors to block:

1. **"外国人が在留資格を持っていれば，どんな仕事でも雇用できる。"** — incorrect. 在留資格があっても，その資格で許可された活動の範囲内でしか就労できない。雇用主は外国人の在留資格の種類と就労可能な活動範囲を確認する義務がある。
2. **"知らなかった（在留資格を確認しなかった）ならば，雇用主は処罰されない。"** — incorrect. 入管法第73条の2では，「知らなかった」ことが直ちに免責にならない。雇用主が「在留カードの確認を怠った」場合，過失による不法就労助長として処罰対象になりうる。
3. **"外国人雇用状況届出をしていれば，不法就労の問題はない。"** — incorrect. ハローワークへの外国人雇用状況届出（G67 cross-ref）は雇用・離職の報告義務であり，就労可能な在留資格の確認義務とは別の制度。届出をしても，在留資格を確認しなければ不法就労助長のリスクがある。
4. **"アルバイトは不法就労助長罪の対象にならない。"** — incorrect. 雇用形態（正社員・アルバイト・業務委託等）にかかわらず，就労を許可していない外国人に就労させた場合は不法就労助長罪の対象。

## Trigger

Use this card when the user says:

- "外国人を雇用する際，在留資格の確認は必要ですか？"
- "在留カードを見せてもらえば，雇用できますか？"
- "外国人アルバイトを雇ったが，在留資格を確認しなかった — 問題がありますか？"
- "不法就労助長罪とはどういう罪ですか？"
- "在留資格のない外国人を雇ったらどうなりますか？"
- any pattern treating employer confirmation duty as optional, or assuming ignorance of status is an automatic defense.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-73-2 | L1 | 出入国管理及び難民認定法 第73条の2 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 不法就労助長罪の定義（業として外国人に不法就労させる・不法就労させるために自己の支配下に置く・業として不法就労あっせんする）; 3年以下懲役または300万円以下罰金. |
| isa-fuhoshurou | L4 | 出入国在留管理庁「不法就労について」 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00011.html | 2026-05-15 | 不法就労の定義; 雇用主の確認義務; 在留カード確認のガイダンス. |
| mhlw-gaikokujin-koyo | L4 | 厚生労働省「外国人雇用はルールを守って適正に」 | https://www.mhlw.go.jp/bunya/koyou/gaikokujin06/index.html | 2026-05-15 | 雇用主の在留資格確認義務のガイダンス; 在留カードの確認方法; ハローワーク届出義務（G67 cross-ref）. |
| g67-crossref | guardrail | guardrail-koyohoken-gaikokujin-gimu (G67) | internal | 2026-05-15 | G67: 外国人雇用状況届出義務（ハローワーク）; 不届出=30万円以下罰金; 労働保険・雇用保険の適用. |
| g59-crossref | guardrail | guardrail-tanki-taizai-shuro-kinshi (G59) | internal | 2026-05-15 | G59: 短期滞在での就労=不法就労; 雇用主への刑事罰（第73条の2）; 資格外活動許可は短期滞在に適用不可. |

## Official Rule Or Source Fact

**不法就労助長罪（入管法第73条の2）:**

> 次の各号のいずれかに該当する者は，三年以下の懲役若しくは三百万円以下の罰金に処し，又はこれを併科する。
> 一 事業活動に関し，外国人に不法就労活動をさせた者
> 二 外国人に不法就労活動をさせるため，自己の支配下に置いた者
> 三 業として，外国人に不法就労活動をさせる行為又は前号の行為に関しあっせんした者

**「不法就労活動」の定義（入管法第19条・第70条）:**

1. 在留資格なしでの就労（不法入国・不法残留等）
2. 資格外活動許可なしでの就労（在留資格の活動範囲を超えた就労）
3. 資格で認められた活動範囲を超えた就労（在留資格の活動定義に合致しない業務）

**雇用主の確認義務と実務:**

雇用主は採用時に以下を確認する義務がある:

| 確認事項 | 確認方法 |
|---|---|
| 在留カードの真正性 | 在留カードを提示させ，在留資格・在留期間・就労制限の有無を確認 |
| 就労可能な活動範囲 | 在留カード表面の「就労制限の有無」欄; 「資格外活動許可欄」（裏面） |
| 在留カードの有効期限 | 在留期間（在留期間満了日前であること）を確認 |
| 資格外活動許可の有無 | 裏面の資格外活動許可スタンプを確認（留学・家族滞在等） |

**確認義務の詳細:**

- 在留カードを**目視で直接確認**（コピーだけでは不十分; 本物のカードを確認）
- ISAの在留カード番号確認サービス（オンライン）を活用することも推奨
- 確認しなかった場合: 知らなかったことは原則として免責にならない（過失が問われる）

**罰則:**

| 違反類型 | 罰則 |
|---|---|
| 不法就労させた雇用主 | 3年以下懲役または300万円以下罰金（またはその両方）|
| 不法就労のあっせん業者 | 同上 |
| 外国人雇用状況届出を怠った雇用主（G67 cross-ref）| 30万円以下罰金 |

**外国人労働者の在留資格別・就労可能範囲の一般的整理:**

| 在留カードの表示 | 意味 |
|---|---|
| 「就労不可」 | 就労は一切認められない（短期滞在・留学等で資格外活動許可なし）|
| 「在留資格に基づく就労活動のみ可」 | 在留資格で定められた活動の範囲内でのみ就労可 |
| 「資格外活動許可あり」（裏面スタンプ）| 資格外活動許可の範囲内（週28時間以内等）での就労も可 |
| 「就労制限なし」 | 永住者・日本人の配偶者・定住者等; 就労業種制限なし |

**外国人雇用状況届出（G67 cross-ref）との関係:**

外国人雇用状況届出（ハローワーク）は，採用・離職時の報告義務。在留資格の確認義務とは別制度。届出をしても，在留資格を確認しなければ不法就労助長罪のリスクは残る。

## Safe Answer Behavior

- When asked whether employer has obligation to check status: clearly state yes — checking the residence card is legally required; failure to check does not automatically exempt from liability.
- When asked about "not knowing": explain that ignorance is not automatically a defense if the employer failed to check the card.
- When asked about part-time employment: confirm that the obligation applies regardless of employment type (正社員, アルバイト, 業務委託).
- When asked about the 外国人雇用状況届出: confirm it is separate from the obligation to check work authorization; both must be done.
- Route to professional (labor lawyer / 社会保険労務士) for specific compliance advice.

## Must Say

- 雇用主は外国人を雇用する際に，在留カードを直接確認して在留資格・就労可能な活動範囲・在留期間を確認する義務がある。確認を怠った場合，「知らなかった」は原則として免責にならない。
- 不法就労助長罪（入管法第73条の2）の罰則は3年以下の懲役または300万円以下の罰金（またはその両方）。正社員・アルバイト・業務委託を問わず適用される。
- 外国人雇用状況届出（ハローワーク; G67参照）は別制度。届出をしても在留資格確認義務は残る。

## Must Not Say

- 「在留カードがあれば，どんな仕事でも雇用できる。」（在留資格の活動範囲内でしか就労できない）
- 「知らなかったなら雇用主は問題ない。」（確認義務の懈怠は免責事由にならない）
- 「アルバイトなら不法就労助長罪は関係ない。」（雇用形態を問わず適用）
- 「ハローワーク届出をしていれば大丈夫。」（在留資格確認義務とは別制度）

## Deep Water Triggers

- 在留カードを確認したが，偽造カードだった — 雇用主は処罰されるか？
- フリーランス契約（業務委託）で外国人を雇っている — 不法就労助長罪は業務委託にも適用されるか？
- 技人国の外国人が，副業として飲食店でアルバイトをしている — 雇用した飲食店の責任は？
- 在留期間が切れた外国人を，在留期間満了を知らずに雇い続けていた — どうすればよいか？
- 留学生を28時間を超えて雇ってしまった — 雇用主の責任はどうなるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For employers asking about compliance: route to ISA 不法就労について page + 厚生労働省 外国人雇用 page for confirmation procedure; route to professional for specific cases.
- For employers who already employed without checking: route to lawyer/行政書士 immediately; assess if the employment is ongoing.
- For foreign nationals whose employer did not check: note that the foreign national themselves may also face legal consequences for working outside their permitted status.
- For 留学生 or 家族滞在 holders: route to G16/G48 for the 28h/week cap; note that exceeding the cap = unauthorized work = the employer also faces liability.

## Unknown Fields

- Whether an employer who checked a fraudulent residence card in good faith (card appeared genuine) has any defense against 不法就労助長罪.
- The specific standard of care for the ISA's online residence card verification system — whether using the online check is sufficient or whether additional visual inspection is required.

## Needs Domain Flags

- needs_domain (P1): What is the established legal standard for employer good-faith defense when a fraudulent residence card was presented — does the prosecution require intent or is strict liability applicable under the current ISA enforcement practice?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| jocho-001 | "外国人アルバイトを雇いました。在留カードを確認しませんでしたが，問題ありますか？" | State: 雇用主は外国人採用時に在留カードを直接確認して，在留資格・就労可能範囲・有効期限を確認する義務がある。確認を怠った場合，「知らなかった」は免責にならない可能性がある。不法就労助長罪（3年以下懲役または300万円以下罰金）のリスクがある。すぐに確認し，問題があれば弁護士・行政書士に相談を。 |
| jocho-002 | "在留カードの『就労制限なし』とはどういう意味ですか？どんな仕事でも雇えますか？" | State: 「就労制限なし」は，永住者・日本人の配偶者等・定住者等の在留資格保有者に表示される。業種・業務の制限なく就労できる。一方，「在留資格に基づく就労活動のみ可」と表示されている場合は，在留資格で定められた活動範囲内でしか就労できない（例: 技人国は技術・人文知識・国際業務の範囲内のみ）。 |
| jocho-003 | "短期滞在ビザの外国人を業務委託で雇いたいのですが，問題ありますか？" | State: 短期滞在の在留資格で報酬を受ける就労は不法就労（G59参照）。業務委託契約であっても就労（報酬を受ける活動）に該当するため，雇用した者は不法就労助長罪（入管法第73条の2; 3年以下懲役または300万円以下罰金）のリスクがある。雇用は避けること。 |

## Source Notes

- 不法就労助長罪の法文: 入管法第73条の2（e-Gov法令検索）— 3年以下懲役または300万円以下罰金. G59 cross-ref（第73条の2を短期滞在就労の文脈で確認済み）.
- 雇用主の確認義務: ISA「不法就労について」(nyuukokukanri07_00011.html); 厚生労働省「外国人雇用はルールを守って適正に」.
- 在留カードの就労制限表示: ISA在留カード関連ページ（就労制限の有無欄・資格外活動許可欄の説明）.
- 外国人雇用状況届出との区別: G67 cross-ref（届出義務は別制度として確認済み）.
- Cross-ref G59 (短期滞在就労=不法就労), G67 (外国人雇用状況届出義務), G16 (資格外活動許可28h制限), G48 (家族滞在就労制限).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 016 G87. Risk level P0 (雇用主刑事罰のため). Key sources: 入管法第73条の2（条文）; ISA不法就労ページ; 厚生労働省外国人雇用ガイダンス; G59/G67 cross-refs. Core facts: 不法就労助長罪=3年以下懲役または300万円以下罰金; 確認義務の懈怠は免責事由にならない; 雇用形態を問わず適用; 外国人雇用状況届出は別制度. needs_domain P1: 偽造カード提示時の雇用主の善意の抗弁の法的地位. Cross-ref G59, G67, G16, G48.
