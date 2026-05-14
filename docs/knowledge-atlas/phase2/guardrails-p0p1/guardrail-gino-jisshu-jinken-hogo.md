---
asset_id: guardrail-gino-jisshu-jinken-hogo
title: 技能実習・育成就労の人権保護と相談窓口 — 外国人技能実習機構（OTIT）が監理・相談を担当；技能実習生は労働基準法・最低賃金法が適用される労働者；実習先からの逃走後も就労支援・法律相談が受けられる；2024年育成就労法により制度が大幅改正
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 020"
---

## What This Document Is

This guardrail prevents errors about the rights and protections available to technical intern trainees (技能実習生) and the new "育成就労" workers under Japan's revised system. Key errors to block:

1. **"技能実習生は，実習先企業のルールに従うだけでよく，日本の労働法は適用されない。"** — incorrect. 技能実習生は，入管法上の在留資格と関係なく，労働基準法・最低賃金法・労働安全衛生法等の日本の労働法が適用される労働者（G99 cross-ref）。雇用主が技能実習生に対してこれらを違反した場合，労働基準監督署が監督する。
2. **"技能実習生が実習先から逃げると，在留資格を失い強制送還される。"** — partially incorrect. 実習先を離れること自体は，直ちに在留資格の失効・強制送還を意味しない。失踪後の在留資格の維持・変更には条件があるが，深刻な人権侵害（強制労働・暴行等）から逃れた場合には，外国人技能実習機構（OTIT）や支援団体・弁護士を通じて保護を求めることができる。
3. **"外国人技能実習機構（OTIT）は，技能実習生を監視するための機関で，生活相談には対応しない。"** — incorrect. OTITは，監理団体・実習実施者の監査・指導とともに，技能実習生からの生活・労働・人権に関する相談を受け付ける窓口を設けており，多言語（15言語以上）で対応している。
4. **"育成就労と技能実習は同じ制度。"** — incorrect. 2024年に成立した育成就労法（技能実習法の廃止・移行）は，技能実習制度を廃止して新設された制度。育成就労は「人材育成・確保」を目的とし，転籍の自由化・監理団体制度の見直し等が行われ，技能実習とは制度目的・内容が大幅に異なる。

## Trigger

Use this card when the user says:

- "技能実習生ですが，実習先で残業代が払われません。"
- "技能実習先から逃げたいのですが，どうなりますか？"
- "OTITとは何ですか？相談できますか？"
- "技能実習生と育成就労はどう違いますか？"
- "実習先でパワハラ・暴力を受けています。どこに相談すればいいですか？"
- any pattern suggesting that 技能実習生 have no labor rights, or treating flight from abusive employers as immediately triggering deportation.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| otit-official | L4 | 外国人技能実習機構（OTIT）公式サイト | https://www.otit.go.jp/ | 2026-05-15 | OTITの役割（監査・相談窓口・多言語対応）; 技能実習生からの相談受付. |
| isa-gino-jisshu | L4 | 出入国在留管理庁「技能実習制度」 | https://www.moj.go.jp/isa/policies/policies/nyuukokukanri06_00071.html | 2026-05-15 | 技能実習の在留資格・制度概要; 監理団体・実習実施者の義務. |
| ikusei-shuro-ho | L4 | 育成就労法（技能実習法の廃止・移行）2024年成立 | https://www.mhlw.go.jp/stf/newpage_40715.html | 2026-05-15 | 育成就労制度の概要（目的・転籍・監理団体改革）; 技能実習からの移行スケジュール. |
| g99-crossref | guardrail | guardrail-rodoho-gaikokujin-tekiyo (G99) | internal | 2026-05-15 | G99: 労働基準法・最低賃金法・安全衛生法は在留資格問わず全外国人労働者に適用. |
| g70-crossref | guardrail | guardrail-tokutei-gino-shien-keikaku (G70) | internal | 2026-05-15 | G70: 特定技能1号の雇用主支援義務（技能実習からの移行者を含む）. |

## Official Rule Or Source Fact

**技能実習生の法的地位（労働者としての権利）:**

技能実習生は，「研修」「実習」の名目にかかわらず，労働基準法・最低賃金法・労働安全衛生法・労働者災害補償保険法が適用される**労働者**（G99 cross-ref）。

主な労働者としての権利:
- **最低賃金**: 地域別最低賃金以上の賃金（在留資格・国籍問わず）
- **時間外労働**: 労基法36条に基づく残業協定（36協定）の範囲内での残業のみ
- **労災保険**: 業務上の傷病・事故に対する補償
- **パスポート・預金通帳の取り上げ禁止**: 労基法・入管法違反（人身売買の指標）
- **強制的な貯金管理の禁止**: 労基法第18条違反

**外国人技能実習機構（OTIT）の役割と相談窓口:**

| 機能 | 内容 |
|---|---|
| **監査・指導** | 監理団体・実習実施者の業務適正化の監督・検査 |
| **相談窓口** | 技能実習生・特定技能外国人からの生活・労働・人権相談 |
| **多言語対応** | 日本語・英語・中国語・ベトナム語・タガログ語等15言語以上 |
| **不正行為の申告** | 実習先・監理団体の不正行為の通報受付 |

OTIT相談窓口: 0120-250-168（フリーダイヤル; 平日9時〜12時・13時〜17時）
外国語対応: 各言語対応窓口あり（OTITウェブサイト参照）

**実習先からの「失踪」後の在留資格と支援:**

- 実習先を離れること自体は，在留資格の即時失効を意味しない
- ただし，在留期間の更新・次の在留資格の申請には，新たな受入機関または在留資格変更が必要
- 深刻な人権侵害（強制労働・暴行・賃金不払い等）から逃れた場合の支援先:
  - OTIT（相談・通報）
  - 労働基準監督署（未払い賃金・労基法違反の申告）
  - 支援NGO（例: 移住者と連帯する全国ネットワーク/移連; 外国人技能実習生問題弁護士連絡会）
  - 法テラス（Legal Aid Japan）

⚠️ 実習先からの失踪後に在留期間が満了した場合，不法在留となるリスクがある。早急に弁護士・支援団体に相談することが重要。

**育成就労制度（2024年法改正）:**

2024年に技能実習法が廃止され，「育成就労法」が成立（施行は段階的）。主な変更点:

| 比較項目 | 技能実習 | 育成就労 |
|---|---|---|
| **目的** | 国際貢献（技術移転）| 人材育成・確保（日本の労働力確保）|
| **転籍** | 原則禁止（一部例外のみ）| 条件付き転籍可（1〜2年後・同一業種内）|
| **在留期間** | 最長5年（技能実習3号）| 最長3年（育成就労）|
| **監理団体** | 非営利法人（許可制）| 監理支援機関（許可・要件強化）|
| **移行先** | 特定技能1号（試験免除ルートあり）| 特定技能1号（移行ルート整備）|

育成就労への完全移行スケジュール: 法施行後3年間（2027年頃目途）

**人身売買・強制労働の指標（注意すべきケース）:**

以下は，深刻な人権侵害・人身売買の指標（速やかに弁護士・OTIT・入管に相談）:
- パスポート・在留カードの取り上げ
- 借金（渡航費・手数料）の返済を理由にした労働の強制
- 外出・連絡の自由の制限
- 賃金の全額または大部分の会社による管理
- 性的ハラスメント・暴力

## Safe Answer Behavior

- When asked about labor rights: confirm that 技能実習生 are workers subject to Japanese labor law regardless of immigration status; route to G99 for the cross-ref.
- When asked about fleeing an abusive employer: clearly state that flight does not immediately = deportation; explain the support network (OTIT, 労基署, NGO, 法テラス); emphasize urgency of legal consultation.
- When asked about OTIT: explain its dual role (oversight AND support/complaints); provide the free phone number; note multilingual availability.
- When asked about 育成就労 vs 技能実習: explain they are separate systems; the new system prioritizes worker mobility (転籍) and workforce retention over international technology transfer.

## Must Say

- 技能実習生は，在留資格の種別に関わらず，日本の労働基準法・最低賃金法・労災保険法が適用される労働者。賃金不払い・パスポート取り上げ・強制労働等は法律違反であり，OTIT・労働基準監督署・法テラスに相談できる。
- 外国人技能実習機構（OTIT）は，技能実習生・特定技能外国人からの生活・労働・人権に関する相談を多言語（15言語以上）で受け付けている（フリーダイヤル 0120-250-168）。実習先の不正行為の通報も受け付けている。
- 育成就労は，2024年に成立した新制度で，技能実習とは目的・転籍の可否・監理団体の要件が大幅に異なる（技能実習法は廃止される）。

## Must Not Say

- 「技能実習生には日本の労働法は適用されない。」（在留資格問わず労働法適用）
- 「実習先を離れると即座に強制送還される。」（在留資格の即時失効ではない; 支援を求めることができる）
- 「育成就労と技能実習は同じ制度。」（2024年改正で別制度として新設）

## Deep Water Triggers

- 技能実習生として来日したが，当初説明された仕事と全く異なる作業をさせられている — どのような権利があるか？
- 技能実習生が実習先で負傷した — 在留資格を失わずに労災申請できるか？（G99参照）
- 育成就労で1年後に転籍したい — 条件と手続きは？（詳細はneeds_domain）
- 監理団体が実習生から手数料を過剰に徴収している — 何が違法か？どこに通報するか？
- 特定技能1号に移行したいが，技能実習修了証明書が発行されない — どうすればよいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons reporting labor violations: route to 労働基準監督署 (most cities) AND OTIT for reporting; route to 法テラス for legal representation.
- For persons in abusive/forced labor situations: route to OTIT (0120-250-168), 支援NGO（移連等）, 弁護士 immediately; flag human trafficking indicators.
- For persons asking about 育成就労 eligibility: route to OTIT and 厚生労働省 for the transition schedule and requirements; note that full transition is phased through 2027.
- For persons with labor disputes: route to 労基署 for wage claims; confirm that 在留資格 status does not prevent 労基署 complaints.

## Unknown Fields

- The specific conditions for 転籍（job change within same industry sector）under 育成就労 and how they will be enforced in practice.
- Whether OTIT will maintain its role under the new 育成就労 system or be replaced/reformed.
- The specific transition pathway for existing 技能実習生 mid-program when 育成就労 is fully implemented.

## Needs Domain Flags

- needs_domain (P1): What are the specific conditions for 転籍（job change）under 育成就労 after 1 year? Is there a uniform standard across all industries, or sector-specific rules?
- needs_domain (P1): After fleeing an abusive 技能実習 employer, what is the official ISA position on the foreign national's status and the available pathways (status change, special stay permit, etc.)? Is there a formal protection pathway equivalent to 被害者保護（trafficking victim support）?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| gino-001 | "技能実習先で残業代が一切払われていません。どうすればいいですか？" | State: 技能実習生には，労働基準法・最低賃金法が適用される。残業代の未払いは労基法違反であり，労働基準監督署に申告できる（在留資格の状況に関係なく申告可能）。また，外国人技能実習機構（OTIT）のフリーダイヤル（0120-250-168）でも多言語で相談を受け付けている。証拠（賃金明細・労働時間の記録等）を保全してから相談することを推奨。 |
| gino-002 | "技能実習先で暴力を受けています。逃げると在留資格を失いますか？" | State: 実習先を離れることは，在留資格の即時失効を意味しない。深刻な人権侵害から逃れることは，法的に保護される行動と認識されている。まず安全な場所に逃れ，OTIT（0120-250-168）・支援NGO・法テラスに連絡することを強く推奨する。在留資格の維持・変更については，弁護士または行政書士に早急に相談すること。 |
| gino-003 | "育成就労と技能実習はどう違いますか？転籍できますか？" | State: 育成就労は2024年に成立した新制度（技能実習法の廃止・移行）。技能実習が原則として転籍を禁止していたのに対し，育成就労では，一定の条件（1〜2年経過後・同一業種内等）を満たした場合の転籍が認められる予定。制度の目的が「国際貢献（技術移転）」から「日本の人材育成・確保」に変更されている。詳細な転籍条件は厚生労働省・OTIT に確認を。 |

## Source Notes

- 技能実習生の労働者としての権利: G99 cross-ref（労働基準法・最低賃金法・安全衛生法は在留資格問わず全外国人労働者に適用）.
- OTITの役割・相談窓口: OTIT公式サイト（otit.go.jp）— フリーダイヤル 0120-250-168; 多言語相談（15言語以上）; 監査・不正行為通報.
- 育成就労法（2024年）: 厚生労働省「育成就労制度の創設」— 技能実習法廃止・転籍要件・監理支援機関.
- 特定技能への移行: G70 cross-ref（特定技能1号の雇用主支援義務; 技能実習修了者の試験免除ルート）.
- Cross-ref G70 (特定技能1号の支援義務), G87 (不法就労助長罪), G99 (外国人の労働法適用), G104 (行政サービスへのアクセス).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 020 G107. Key sources: OTIT公式サイト（役割・相談窓口・多言語対応）; ISA「技能実習制度」; 厚生労働省「育成就労法」（2024年改正）. Core facts: 技能実習生=労働基準法適用の労働者; OTIT=相談・監査窓口（0120-250-168; 15言語以上）; 失踪≠即時在留資格失効; 育成就労=技能実習の廃止・新制度（目的・転籍自由化）. needs_domain P1: 育成就労の転籍条件詳細; 失踪後の在留資格保護ルート. Cross-ref G70, G87, G99, G104.
