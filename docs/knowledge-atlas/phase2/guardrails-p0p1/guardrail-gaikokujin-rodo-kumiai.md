---
asset_id: guardrail-gaikokujin-rodo-kumiai
title: 外国人の労働組合加入権と集団的労使紛争 — 外国人労働者も在留資格に関わらず労働組合に加入できる；不法就労者も組合活動の保護を受けうる；労働組合法・労働関係調整法は外国人に適用される；組合活動を理由とした不利益取扱いは禁止
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 021"
---

## What This Document Is

This guardrail prevents errors about the labor union rights of foreign workers in Japan and how collective labor disputes interact with immigration status. Key errors to block:

1. **"外国人は日本の労働組合に加入できない。"** — incorrect. 労働組合法は，労働者の定義において国籍・在留資格を区別していない。外国人労働者も，適法に就労している場合（および不法就労状態であっても，実質的に労働関係にある場合）は，労働組合に加入し，団体交渉権・争議権等の団体行動権を行使できる。
2. **"不法就労状態の外国人は，労働組合に加入しても意味がない（保護されない）。"** — partially incorrect. 不法就労状態の外国人であっても，実質的に雇用関係にある場合，労働組合法上の「労働者」に該当し，労働組合に加入・活動する権利を有するとされている（最高裁判例・労働委員会実務）。ただし，不法就労状態そのものは入管法上の問題として残る。
3. **"組合活動を理由に外国人が解雇された場合，不利益取扱いが禁止されるのは日本人だけ。"** — incorrect. 労働組合法第7条（不当労働行為の禁止）は，外国人労働者にも適用される。組合活動を理由とした解雇・降格・差別的取扱い等は，外国人労働者に対しても不当労働行為として禁止されている。
4. **"労働争議（ストライキ）に参加した外国人は，在留資格を失う。"** — incorrect. 適法なストライキ（法律の定める手続きに従った争議行為）への参加は，在留資格の取消し事由にはならない。労働組合活動・争議行為の参加は，在留資格の正当な行使範囲内の活動と解される。

## Trigger

Use this card when the user says:

- "外国人でも日本の労働組合に加入できますか？"
- "組合活動をしたら，在留資格に影響しますか？"
- "ストライキに参加してもいいですか？"
- "不法就労状態でも，未払い賃金を労働組合に相談できますか？"
- "会社が組合活動を理由に外国人を解雇しました。どうすればいいですか？"
- any pattern suggesting that labor union rights are limited to Japanese nationals or lawful visa holders.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| rodo-kumiai-ho | L4 | 労働組合法（第2条・第7条） | https://laws.e-gov.go.jp/law/324AC0000000174 | 2026-05-15 | 「労働者」の定義（国籍・在留資格を区別せず）; 不当労働行為の禁止（第7条; 組合活動を理由とした不利益取扱い禁止）. |
| rodo-kankei-chousei-ho | L4 | 労働関係調整法 | https://laws.e-gov.go.jp/law/321AC0000000025 | 2026-05-15 | 争議行為（ストライキ等）の手続き・制限; 適法な争議行為の保護. |
| g99-crossref | guardrail | guardrail-rodoho-gaikokujin-tekiyo (G99) | internal | 2026-05-15 | G99: 労働基準法・最低賃金法は在留資格問わず全外国人労働者に適用; 労基署相談は在留状況問わず可能. |
| g107-crossref | guardrail | guardrail-gino-jisshu-jinken-hogo (G107) | internal | 2026-05-15 | G107: 技能実習生の労働権保護; OTIT相談窓口; 実習先からの失踪と在留資格. |

## Official Rule Or Source Fact

**労働組合法における「労働者」の定義:**

労働組合法第3条: 「労働者とは，職業の種類を問わず，賃金，給料その他これに準ずる収入によって生活する者をいう。」

→ 国籍・在留資格による区別はなし。外国人労働者も，この定義に該当すれば労働組合法上の「労働者」として保護される。

**外国人の労働組合加入権:**

- 外国人労働者（適法在留・不法在留を問わず，実質的な雇用関係がある場合）は，労働組合に加入できる
- 加入後は，団体交渉権・争議権を含む労働組合活動の保護を受ける
- 外国人のみを対象とした労働組合（コミュニティユニオン・合同労組等）も多数存在し，未払い賃金・ハラスメント等の労使紛争を支援している

**不当労働行為の禁止（労働組合法第7条）:**

使用者は，以下の行為を行うことが禁止されている（外国人労働者にも適用）:
1. 組合員であること・組合活動への参加・組合への加入を理由とした解雇・その他の不利益取扱い
2. 団体交渉の正当な理由のない拒否
3. 組合の結成・運営に対する支配・介入
4. 労働委員会への申立て・証言を理由とした不利益取扱い

**外国人労働者に関連する労働委員会の実務:**

不当労働行為の申立ては，各都道府県の労働委員会に行うことができる（日本人・外国人問わず）。労働委員会は，命令を通じて使用者に対して不当労働行為の是正を命じることができる。

**争議行為（ストライキ等）と在留資格:**

- 適法な争議行為（労働関係調整法の規定に基づく手続きを経たストライキ等）への参加は，在留資格の取消し事由に該当しない
- 争議行為中は「就労」していない状態だが，在留資格の「活動を行っていない」という取消し事由に直ちに該当するわけではない（労働関係上の権利行使として保護される）
- ただし，長期にわたる雇用中断が在留資格の更新審査（「在留中の活動の状況」）に影響する可能性は排除できない（needs_domain P1）

**不法就労状態と労働組合活動:**

不法就労状態の外国人が実質的な雇用関係にある場合:
- 労働組合法上の「労働者」として組合加入・団体交渉が可能とされている（労働委員会の実務・最高裁判例に基づく解釈）
- 未払い賃金・ハラスメント等の労働問題は，労基署・労働委員会・支援NGOを通じて解決を求めることができる（G99 cross-ref）
- ただし，不法就労状態そのものは入管法上の問題として残り，在留資格の問題と労働権の問題は別個に扱われる

**外国人労働者のための相談窓口:**

- **コミュニティユニオン・合同労組**: 外国人を積極的に組合員として受け入れ，多言語で労働相談・団体交渉支援を提供する組合（NPO形式の場合も）
- **労働基準監督署**: 賃金未払い・労基法違反の申告（G99 cross-ref）
- **労働委員会**: 不当労働行為の申立て
- **法テラス**: 弁護士費用の立替制度（法律援助）

## Safe Answer Behavior

- When asked about union membership eligibility: confirm that foreign workers (regardless of visa status) can join Japanese labor unions; explain the legal basis (労働組合法第3条).
- When asked about strike participation: confirm that lawful strike participation does not constitute a visa violation; note that very extended absence might have renewal implications (as a practical matter).
- When asked about unfair labor practices against foreign workers: route to 労働委員会 for 不当労働行為申立て; confirm 労働組合法第7条 applies to foreign workers.
- When asked about undocumented workers seeking union help: confirm they can join and use union support; clearly separate the immigration status issue (remains a problem) from the labor rights issue (protected).

## Must Say

- 外国人労働者も，在留資格・国籍に関わらず，日本の労働組合に加入できる。労働組合法第3条の「労働者」の定義は国籍・在留資格を区別していない。
- 組合活動（加入・団体交渉参加・争議行為等）を理由とした不利益取扱い（解雇・差別等）は，外国人労働者にも適用される労働組合法第7条（不当労働行為の禁止）に違反する。
- 適法なストライキへの参加は，在留資格の取消し事由に該当しない。不法就労状態でも，実質的な雇用関係がある場合，組合加入・活動の権利を有するとされている（労働委員会の実務・最高裁判例）。

## Must Not Say

- 「外国人は日本の労働組合に加入できない。」（国籍・在留資格問わず加入可）
- 「ストライキに参加すると在留資格を失う。」（適法な争議行為への参加は取消し事由にならない）
- 「不法就労状態だと，未払い賃金の相談や組合加入ができない。」（不法就労状態でも労働権は保護されうる）

## Deep Water Triggers

- 外国人労働者が組合を結成する場合，日本人の発起人が必要か？（労働組合法上の要件; 外国人のみで組合を結成できるか）
- 特定技能1号外国人が雇用主に対して組合活動・団体交渉を行う場合，登録支援機関（RSO）はどのような役割を果たすか？
- ストライキが長期化し，その間に在留期間が満了した場合，更新申請はどのような扱いになるか？
- 外国人労働者が組合活動を理由に雇用主から解雇通告された場合の緊急的な対応（仮処分申請）と在留資格への影響
- 技能実習生が労働組合に加入したいと申し出た場合，監理団体・実習先はどのように対応すべきか？（妨害行為は不当労働行為に該当）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who have experienced 不当労働行為: route to 労働委員会 (都道府県) for formal申立て; route to 弁護士 or 法テラス for representation.
- For persons seeking union support: route to コミュニティユニオン/合同労組 for immediate practical support; many accept multilingual consultation.
- For persons with undocumented status: separate the labor rights issue from the immigration issue; route to コミュニティユニオン or 支援NPO first for safety.
- For 技能実習生 denied union access: route to OTIT (G107) and 労働委員会; flag potential 不当労働行為 by 監理団体.

## Unknown Fields

- Whether there is an official 最高裁判所 ruling (最高裁判例) specifically holding that undocumented foreign workers are 「労働者」 under 労働組合法 — this is widely cited in practice but the specific case reference needs confirmation.
- How long-term strike participation (beyond several months) affects immigration renewal applications in practice — ISA's official position on this is not confirmed.

## Needs Domain Flags

- needs_domain (P1): Is there a specific 最高裁判所判決 confirming that undocumented foreign workers are protected as 「労働者」 under 労働組合法? Please identify the specific case reference for this guardrail.
- needs_domain (P1): What is ISA's official position (if any) on the impact of long-term strike participation on visa renewal — specifically, does extended absence from active employment affect "在留中の活動の状況" evaluation in renewal decisions?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kumiai-001 | "外国人でも日本の労働組合に入れますか？" | State: 外国人労働者も，在留資格・国籍に関わらず，日本の労働組合に加入できる。労働組合法第3条の「労働者」の定義は国籍・在留資格を区別していない。コミュニティユニオン・合同労組等，外国人の加入を積極的に受け入れる組合も多数あり，未払い賃金・ハラスメント等の労働問題の解決を多言語で支援している。 |
| kumiai-002 | "組合活動をしたら，ビザを取り消されますか？ストライキに参加してもいいですか？" | State: 組合活動（加入・団体交渉参加・ストライキ）は，在留資格の取消し事由に該当しない。組合活動を理由とした不利益取扱い（解雇等）は，労働組合法第7条（不当労働行為の禁止）に違反する。適法なストライキへの参加は，労働関係上の正当な権利行使であり，在留資格の問題は生じない。 |
| kumiai-003 | "不法就労状態ですが，会社から賃金を払ってもらえていません。組合に相談できますか？" | State: 不法就労状態であっても，実質的な雇用関係にある場合，日本の労働組合法上の「労働者」として保護されうる（労働委員会の実務・判例に基づく解釈）。コミュニティユニオン・合同労組や労働基準監督署に相談して，未払い賃金の回収を求めることができる。なお，不法就労状態そのものは入管法上の問題として別途残る点に注意が必要。法テラス・弁護士にも相談することを推奨。 |

## Source Notes

- 労働組合法第3条（「労働者」の定義）: e-Gov法令検索「労働組合法」— 「職業の種類を問わず，賃金…によって生活する者」（国籍・在留資格の区別なし）.
- 不当労働行為の禁止（第7条）: 労働組合法第7条— 組合活動を理由とした解雇・差別等の禁止; 団体交渉拒否の禁止.
- 争議行為の保護: 労働関係調整法— 適法な争議行為（ストライキ等）の手続き・保護.
- 外国人の労働法適用: G99 cross-ref（労働基準法・最低賃金法は在留資格問わず全外国人労働者に適用）.
- 技能実習生の組合権: G107 cross-ref（技能実習生の人権保護; OTITの役割）.
- Cross-ref G99 (外国人の労働法適用), G107 (技能実習生の人権保護), G113 (素行評価と刑事罰).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 021 G113. Key sources: 労働組合法第3条・第7条（e-Gov法令）（「労働者」の定義; 不当労働行為の禁止）; 労働関係調整法（争議行為の保護）. Core facts: 外国人も在留資格問わず組合加入可（労働組合法第3条）; 組合活動理由の不利益取扱い=不当労働行為（第7条; 外国人にも適用）; 適法ストライキ=在留資格取消し事由にならない; 不法就労者も労働組合法上の「労働者」とされうる（判例・労働委員会実務）. needs_domain P1: 不法就労者の組合加入権に関する最高裁判例の特定; 長期ストライキと在留更新審査へのISA官式見解. Cross-ref G99, G107.
