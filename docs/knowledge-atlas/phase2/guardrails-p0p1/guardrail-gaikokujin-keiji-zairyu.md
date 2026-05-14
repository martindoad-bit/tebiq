---
asset_id: guardrail-gaikokujin-keiji-zairyu
title: 外国人の刑事手続きと在留資格への影響 — 逮捕・勾留中も在留期間は進行する；有罪判決・実刑は退去強制事由となりうる；不起訴・執行猶予は退去強制を自動的に防ぐわけではない；刑事手続きの全段階で弁護士・領事への連絡が必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 023"
---

## What This Document Is

This guardrail prevents errors about the immigration consequences of criminal proceedings for foreign nationals in Japan. Key errors to block:

1. **"逮捕されたが，起訴されなければ（不起訴・釈放）在留資格に影響はない。"** — partially incorrect and dangerously incomplete. 不起訴処分であっても，逮捕歴は在留資格の「素行」評価（永住申請等）に影響しうる（G112参照）。また，勾留期間中も在留期間は進行するため，在留期間が満了に近づいている場合は特に注意が必要。
2. **"執行猶予付きの判決ならば，外国人でも退去強制にはならない。"** — incorrect. 執行猶予付き判決であっても，一定の罪（麻薬・売春・人身売買等）については退去強制事由に該当する場合がある（入管法第24条）。また，執行猶予中の在留資格更新は困難となる場合がある。
3. **"外国人が逮捕・拘留されている間は，在留期間が自動的に停止する。"** — incorrect. 逮捕・勾留中も在留期間は暦日通りに進行する。勾留中に在留期間が満了した場合でも，特例期間が発動するわけではない（申請を出すことができないため）。
4. **"刑事事件に巻き込まれた外国人は，ISAに通報される。"** — partially correct but needs nuance. 警察・検察は逮捕した外国人の情報をISAに通報する義務があり，入管法違反が発覚した場合は退去強制手続きが並行して進む場合がある。

## Trigger

Use this card when the user says:

- "外国人が日本で逮捕されたらどうなりますか？"
- "勾留されている間，ビザはどうなりますか？"
- "不起訴になれば在留資格に影響はないですか？"
- "執行猶予付きの判決なら，在留資格を更新できますか？"
- "刑事事件で有罪になったら，強制退去になりますか？"
- any pattern suggesting that criminal proceedings (arrest, prosecution, conviction) have no immigration consequences for foreign nationals.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-ho-24 | L1 | 出入国管理及び難民認定法第24条（退去強制事由） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 退去強制事由の全項目（第24条各号）: 禁錮以上の刑事判決・麻薬・売春・人身売買等の特定犯罪. |
| nyukan-ho-50 | L1 | 出入国管理及び難民認定法第50条（在留特別許可） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 退去強制手続きの中での在留特別許可（法務大臣の裁量）; G21 cross-ref. |
| keiji-sosho-ho | L1 | 刑事訴訟法（逮捕・勾留・起訴等の手続き） | https://laws.e-gov.go.jp/law/323AC0000000131 | 2026-05-15 | 逮捕後72時間以内の勾留請求; 勾留最大23日間; 不起訴処分（起訴猶予等）の定義. |
| ryoshikan-joho | L4 | 外務省「海外在留邦人・外国人の逮捕・拘留時の領事援助」 | https://www.mofa.go.jp/mofaj/toko/tonan/index.html | 2026-05-15 | 逮捕時の領事通知権利（ウィーン条約）; 領事援助の内容. |
| g112-soko | guardrail | guardrail-soko-hyoka-kijun (G112) | internal | 2026-05-15 | G112: 素行評価=刑事前科・逮捕歴・交通違反等の総合評価; 不起訴でも逮捕歴は在留審査要素. |
| g21-tokubetsu | guardrail | guardrail-tokubetsu-kyoka-not-normal-route (G21) | internal | 2026-05-15 | G21: 在留特別許可=退去強制手続き内の裁量的付与; 通常の申請ルートではない. |

## Official Rule Or Source Fact

**退去強制事由（入管法第24条）:**

外国人が以下の行為を行った場合，退去強制の対象となる（主要なもの）:
- 禁錮以上の実刑判決（短期1年を超える懲役・禁錮の実刑: 即時対象; 短期1年以下: 裁量的）
- 麻薬・大麻・あへん・覚醒剤等の薬物犯罪
- 売春・人身売買・売春強要等の犯罪
- 銃砲刀剣類所持等取締法違反（銃刀法）の一定の犯罪
- 不法就労助長罪（入管法第73条の2）等の入管法違反
- 外国人登録証・在留カードの偽造

**執行猶予付き判決の取扱い:**

- 一般的な犯罪（窃盗等）での執行猶予付き有罪判決: 退去強制事由に直ちに該当しない場合が多いが，在留更新・変更審査の「素行」評価に重大な影響を及ぼす
- 麻薬・売春等の特定犯罪: 執行猶予付きであっても退去強制事由に該当しうる（入管法第24条の構造的解釈）
- 執行猶予期間中の在留更新: ISAの裁量的判断により更新を拒否される場合がある（G31参照）

**逮捕・勾留中の在留期間の進行:**

- 在留期間は逮捕・勾留中も暦日通りに進行する（停止しない）
- 勾留中に在留期間が満了した場合: 特例期間は「申請が係属している場合」に発動するため，勾留中に申請ができない状況では特例期間が適用されない可能性がある（needs_domain P1）
- 弁護人を通じたISAへの申請・在留期間更新手続きが実務上は行われるが，審査は困難になる

**警察・検察からISAへの情報通報:**

- 警察・検察は，逮捕した外国人について入管法違反の疑いがある場合，または退去強制事由に該当しうる犯罪である場合，ISAに通報する義務・慣行がある
- ISAは，退去強制事由に該当する可能性がある場合，退去強制手続きを刑事手続きと並行して進める場合がある

**領事通知権（ウィーン条約）:**

逮捕された外国人は，自国の領事館・大使館への通知を求める権利を有する（ウィーン領事条約第36条）:
- 逮捕した警察官は，外国人の権利について告知する義務がある
- 外国人は自国の領事官に連絡できる（通訳・法律支援の調整等）
- 日本弁護士連合会等が外国人向けの弁護士紹介制度を持つ

**刑事手続きにおける外国人の権利（重要）:**

- 通訳の権利: 外国人被疑者・被告人は，日本語が理解できない場合，通訳の提供を受ける権利がある（刑事訴訟法）
- 弁護人選任権: 勾留された段階で，弁護人を選任する権利がある（国選弁護人の利用も可能）
- 黙秘権: 日本の刑事手続きでも黙秘権が保障されている

## Safe Answer Behavior

- When asked about arrest and immigration: flag that in-custody immigration period keeps running; explain arrest history remains in 素行 evaluation even if not prosecuted.
- When asked about suspended sentences: clarify that suspended sentence ≠ no immigration consequence; specific crimes (drugs, trafficking) remain deportation grounds even with suspension; renewal is at ISA's discretion.
- When asked about deportation vs. criminal conviction: explain the parallel structure (criminal proceedings and deportation proceedings can run simultaneously); route to lawyer immediately.
- When asked about rights during arrest: clearly inform about consular notification rights, right to interpreter, right to counsel — all before any other guidance.

## Must Say

- 逮捕・勾留中も在留期間は暦日通りに進行する。在留期間が満了に近い場合は，弁護人を通じた緊急の在留申請が必要になる場合がある。
- 執行猶予付き有罪判決でも，麻薬・売春等の特定犯罪では退去強制事由に該当しうる。その他の犯罪でも，在留更新審査の「素行」に重大な影響を及ぼす。
- 外国人は逮捕時に自国の領事館に通知を求める権利（ウィーン条約）があり，通訳・弁護人の提供を受ける権利がある。刑事手続きと在留資格の問題は，直ちに弁護士に相談することが最重要。

## Must Not Say

- 「不起訴になれば在留資格に影響はない。」（逮捕歴は素行評価に残る）
- 「執行猶予なら退去強制にならない。」（特定犯罪は執行猶予でも退去強制事由）
- 「逮捕・勾留中は在留期間が停止する。」（停止しない）

## Deep Water Triggers

- 在日外国人が軽微な刑事事件（万引き・軽微な暴行等）で逮捕・釈放された後の在留更新の具体的リスク
- 刑事事件での有罪確定後，退去強制手続き開始までの典型的なタイムライン
- 退去強制手続きと刑事判決が競合する場合（刑事判決確定後に退去強制令書が発付される場合等）の外国人の対応
- 被害者として刑事事件に関与した外国人（人身売買被害者等）の在留資格上の保護（人身売買防止法による保護措置）
- 日本で起訴された外国人が在留期間満了前に本国送還を求める場合の手続き

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who have been arrested/detained: URGENT — route to 弁護士 (criminal defense lawyer) immediately; flag right to consular notification; flag 在留期間 running; do not advise on substance.
- For persons who have received a suspended sentence: route to 行政書士/弁護士 for assessment of renewal prospects; flag specific crime-type matters for deportation ground determination.
- For persons asking about immigration risk after criminal investigation: explain the 素行 evaluation impact; note ISA's discretion; do not predict outcomes.
- For trafficking victims or other protected crime victims: route to 法テラス and 支援NPO; note that special protection measures (人身売買被害者への在留特別許可等) may apply.

## Unknown Fields

- Whether the 特例期間 applies if a valid renewal application was filed before arrest but the person is in custody at the time of ISA's decision — the interaction between special-period rules and criminal detention is not confirmed from official sources.
- The typical timeline from criminal conviction to deportation order issuance in ISA's practice.

## Needs Domain Flags

- needs_domain (P1): If a foreign national has a valid 在留期間更新申請 pending at the time of arrest — does 特例期間 continue to apply during criminal detention, or does incapacity to appear at ISA affect the application status?
- needs_domain (P1): For minor criminal offenses (軽微な刑事事件: 万引き・軽微な暴行等) resulting in 不起訴 or 略式起訴 (fine only) — is there a published ISA standard on how much weight these carry in 素行 evaluation for renewal vs. PR applications?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| keiji-001 | "友人（外国人）が日本で逮捕されました。ビザはどうなりますか？" | State: 逮捕・勾留中も在留期間は暦日通りに進行する（停止しない）。在留期間が満了に近い場合は弁護人を通じた緊急の在留申請が必要。刑事事件と在留資格は連動するため，直ちに刑事専門の弁護士に連絡することが最重要。また，自国の領事館への通知を求める権利（ウィーン条約）がある。 |
| keiji-002 | "執行猶予付きの判決を受けました。在留資格を更新できますか？" | State: 執行猶予付き有罪判決は在留資格の「素行」評価に重大な影響を及ぼす。麻薬・売春等の特定犯罪では，執行猶予付きでも退去強制事由に該当しうる。その他の犯罪でも更新審査はISAの裁量判断となる。行政書士・弁護士に相談し，早期に対応策を検討することを強く推奨する。 |
| keiji-003 | "不起訴になったので，在留資格に影響はないと聞きました。本当ですか？" | State: 不起訴処分であっても，逮捕歴は在留資格の「素行」評価（永住申請等）に参照される可能性がある。不起訴は刑事上の無罪とは異なり，在留審査の文脈では「問題なし」と断言できない。行政書士・弁護士に相談し，在留資格への影響を確認することを推奨する。 |

## Source Notes

- 退去強制事由: 入管法第24条（禁錮以上の実刑・麻薬・売春等の特定犯罪）.
- 在留特別許可: 入管法第50条（退去強制手続き内の裁量的付与）（G21 cross-ref）.
- 素行評価: G112（刑事前科・逮捕歴・交通違反等の総合評価; 不起訴でも逮捕歴は残る）.
- 領事通知権: ウィーン領事条約第36条（逮捕時の領事館への通知権利）.
- 刑事手続き: 刑事訴訟法（逮捕・勾留・起訴等の手続き; 通訳・黙秘・弁護人の権利）.
- Cross-ref G21（在留特別許可），G31（更新審査の裁量），G112（素行評価基準）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 023 G121. Risk level elevated to P0 due to criminal detention scenarios being life-altering with immediate immigration consequences. Key sources: 入管法第24条（退去強制事由）; 刑事訴訟法（手続き・権利）; ウィーン領事条約第36条. Core facts: 在留期間は逮捕・勾留中も進行; 退去強制事由=禁錮以上の実刑・麻薬・売春等の特定犯罪（執行猶予でも特定犯罪は対象); 逮捕歴は素行評価に残る（不起訴でも）; 領事通知権・通訳権・弁護人選任権. needs_domain P1: 逮捕中の特例期間の扱い; 軽微犯罪の素行評価への影響の官式基準. Cross-ref G21, G31, G112.
