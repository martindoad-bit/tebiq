---
asset_id: guardrail-gaikokujin-zeimukokuchi
title: 外国人の税務申告義務と在留資格 — 日本居住者は国内外所得に申告義務；住民税は翌年課税；税務申告義務の不履行は在留審査（素行・公的義務）に影響
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 016"
---

## What This Document Is

This guardrail prevents errors about tax filing obligations for foreign nationals residing in Japan and the impact on their immigration status. Key errors to block:

1. **"外国人は日本の税金を払わなくていい。"** — incorrect. 日本に居住する外国人は，在留資格にかかわらず，日本の所得税法・地方税法上の「居住者」として国内外のすべての所得について課税対象になる（国際条約・租税条約による例外はあり）。
2. **"会社が源泉徴収をしているから，確定申告は必要ない。"** — partially incorrect. 給与収入のみで年末調整が完了している場合は確定申告不要の場合がある。ただし，副業収入・海外所得・医療費控除等の申告が必要な場合は確定申告が必要。
3. **"住民税はいつから課税されるか分からない。"** — source of confusion. 住民税は**前年の1月1日から12月31日の所得**に対して，**翌年6月から課税**される（その年の1月1日時点に住民票を持つ市区町村に課税）。来日初年は住民税が翌年から発生する。
4. **"税務申告の義務不履行は，在留審査に関係ない。"** — incorrect. 所得税・住民税の未申告・滞納は，在留申請（特に永住申請）の「公的義務の適正な履行」要件で不利な評価を受ける可能性がある（G60・G71 cross-ref）。特定技能1号の更新申請では，税の納付状況を証明する書類が求められる。

## Trigger

Use this card when the user says:

- "外国人でも日本で確定申告が必要ですか？"
- "会社で年末調整をしてもらいましたが，それで十分ですか？"
- "住民税はいつから払うのですか？"
- "海外の収入も日本で申告しなければなりませんか？"
- "税務申告と在留資格は関係がありますか？"
- any pattern treating tax obligations as inapplicable to foreigners, or misunderstanding the 住民税 timing.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nta-kyojusha | L4 | 国税庁「居住者と非居住者の区分」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1910.htm | 2026-05-15 | 居住者（国内に住所または1年以上の居所を持つ者）は国内外のすべての所得が課税対象. |
| nta-shotoku | L4 | 国税庁「確定申告が必要な方」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2020.htm | 2026-05-15 | 確定申告が必要なケース（副業所得20万円超・2社以上から給与等）; 年末調整で完結する場合. |
| soumu-juuminzei | L4 | 総務省「個人住民税」 | https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/149767_03.html | 2026-05-15 | 住民税=前年所得×税率; 1月1日時点の住所地市区町村が課税; 翌年6月から課税開始. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の公的義務要件（直近2年間の所得税・住民税・年金・社保の適正納付）. |
| g71-crossref | guardrail | guardrail-kouteki-gimu-koshin-hyoka (G71) | internal | 2026-05-15 | G71: 公的義務（税・年金・保険）の不履行は更新・変更審査の「素行」評価でも参照. |

## Official Rule Or Source Fact

**外国人の税務上の居住者判定:**

日本の所得税法では，外国人であっても:
- 日本国内に「住所」がある者，または
- 1年以上日本に「居所」がある者

は「居住者」として扱われ，**国内外のすべての所得（全世界所得）が課税対象**となる。

在留資格は居住者判定の直接の基準ではないが，在留資格を持って日本に在留している場合は通常「居住者」として課税される。

**所得税の確定申告が必要なケース（外国人労働者）:**

| ケース | 確定申告の要否 |
|---|---|
| 給与1社（年末調整済み・副業なし） | 不要（年末調整で完結）|
| 給与2社以上から受け取り | **必要** |
| 給与収入＋副業所得（年20万円超） | **必要** |
| 海外収入・海外口座利息等 | **必要**（居住者として全世界所得課税）|
| フリーランス・自営業 | **必要** |
| 帰国前に在職中だった場合 | 通常，年末調整または確定申告 |

**住民税の仕組みと外国人への適用:**

住民税（地方税）は前年の所得に対して翌年に課税される（賦課課税方式）:

- **課税年度**: 1月1日から12月31日の所得が基準
- **課税する市区町村**: その年（翌年）の**1月1日時点に住所（住民票）がある市区町村**が課税
- **納税開始**: 翌年6月から（給与所得者は特別徴収で毎月の給与から天引き）
- **来日初年（例: 4月来日）**: 来日年の住民税はなし（1月1日時点に日本の住所がなかったため）; 翌年6月から課税開始

**住民税の実務的注意点（外国人）:**

- 転出届（海外転出）を出した後は翌年から住民税課税なし（ただし，転出届なしで出国すると課税が続く; G82 cross-ref）
- 住民税の滞納: 差押え・徴収の対象; 在留申請の「公的義務」評価に影響

**税務申告と在留資格の関係（G60・G71 cross-ref）:**

| 在留申請の種類 | 税務関連の影響 |
|---|---|
| **永住申請** | 直近2年間の所得税・住民税の適正納付が要件（納税証明書「その3」が必要; G60参照）|
| **特定技能1号更新** | 住民税の課税証明書・納税証明書等が提出書類に含まれる（G66 cross-ref）|
| **通常の在留更新・変更** | 「素行」評価の一部として税務義務の不履行が考慮される可能性（G71参照）|

**外国からの所得と租税条約:**

日本は多くの国と租税条約を締結しており，条約によっては外国からの所得の二重課税が軽減・免除される。ただし，これは課税額の問題であり，申告義務がなくなるわけではない（申告は必要）。

## Safe Answer Behavior

- When asked if foreigners need to file taxes: clearly confirm that Japan-resident foreigners are subject to tax as "居住者"; differentiate income types requiring 確定申告 vs those covered by 年末調整.
- When asked about 住民税: explain the lag (前年所得→翌年課税) and the January 1 address rule; note that new arrivals typically have no 住民税 in the first year.
- When asked about overseas income: confirm it must be declared by residents (全世界所得課税); route to tax professional (税理士) for complex situations.
- When asked about the impact on 在留申請: clearly explain the PR requirement (G60) and the general 素行 implication (G71); route to tax professional + immigration professional together if the person has tax arrears.

## Must Say

- 日本に居住する外国人は，在留資格に関わらず「居住者」として日本の所得税・住民税の課税対象。国内外のすべての所得（全世界所得）が対象になる（租税条約による例外あり）。
- 住民税は前年の所得に対して翌年6月から課税される（1月1日時点の住所地市区町村が課税）。来日初年は住民税がかからないが，翌年から発生する。
- 税務申告の不履行・滞納は，在留申請の公的義務評価（素行）に影響し，永住申請では直近2年の適正納付が審査要件（G60・G71参照）。特定技能1号更新では課税証明書等が提出書類に含まれる（G66参照）。

## Must Not Say

- 「外国人は日本で税金を払わなくていい。」（居住者として全世界所得が課税対象）
- 「会社が源泉徴収しているから確定申告は絶対不要。」（副業・海外所得等があれば確定申告が必要）
- 「住民税はすぐにかかる。」（翌年6月から課税開始; 来日年は通常課税なし）
- 「税務申告と在留資格は無関係。」（公的義務評価に影響; 特に永住申請）

## Deep Water Triggers

- 来日2年目で，初年度の確定申告をしていなかった — どうすればよいか？
- フリーランスで日本のクライアントから収入を得ているが，在留資格が家族滞在 — 確定申告は必要か？（G48 cross-ref: 家族滞在の就労制限）
- 日本居住中に，海外の銀行口座で投資利益があった — 申告が必要か？
- 住民税を3年間滞納している — 永住申請への影響は？
- 租税条約がある国（米国）からの給与を日本で申告しない場合の問題は？

## User Next Actions

This is not user-facing copy. For answer routing:

- For basic tax filing questions: route to 国税庁「確定申告が必要な方」; for complex cases (overseas income, freelance) route to 税理士.
- For 住民税 timing questions: explain 1月1日ルール and 翌年6月課税; route to local municipality for specific questions.
- For overseas income: route to 税理士 for Treaty application; route to 国税庁国際税務ページ for information.
- For impact on 在留申請: route to G60 (PR requirement) and G71 (renewal evaluation); recommend addressing tax arrears before filing major immigration applications; route to 行政書士 + 税理士.

## Unknown Fields

- The specific ISA operational criteria for how many years of tax non-compliance constitutes a "material" 素行 concern in renewal/change applications (as opposed to just the 2-year rule for PR).
- Whether a tax amnesty (過去の無申告の修正申告) completed before a PR application fully remedies the 公的義務 deficiency, or whether the late filing itself remains a negative factor.
- The specific procedures for foreign nationals who earned income in Japan but left without filing a final tax return.

## Needs Domain Flags

- needs_domain (P1): Does a completed 修正申告 (amended tax return) for a past undeclared year, filed before a 永住許可 application, fully satisfy the 直近2年の公的義務適正履行 requirement, or does the original non-filing remain as a negative factor in the evaluation?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| zei-001 | "外国人でも日本で確定申告が必要ですか？" | State: 日本に居住する外国人は，在留資格に関わらず，「居住者」として日本の所得税・住民税の課税対象。給与収入のみで年末調整が完了している場合は確定申告不要の場合があるが，副業収入（年20万円超）・海外所得等がある場合は確定申告が必要。詳細は国税庁（nta.go.jp）または税理士に確認を。 |
| zei-002 | "今年日本に来ました。住民税はいつから払いますか？" | State: 住民税は来日年の翌年から発生する。住民税は前年の所得に対して翌年6月から課税される（その年の1月1日時点に住民票がある市区町村が課税）。来日年は1月1日時点に日本の住所がなかったため，通常はその年の住民税はかからない。翌年6月から課税が始まる。 |
| zei-003 | "住民税を払っていませんでした。永住申請への影響はありますか？" | State: 永住申請では直近2年間の所得税・住民税の適正納付が審査要件（G60参照）。住民税の未払いは「公的義務の適正な履行」に反するとして永住申請に影響する可能性がある。まず住民税の滞納分を完済し，税理士・行政書士に相談のこと。 |

## Source Notes

- 居住者・非居住者の区分と課税範囲: 国税庁「居住者と非居住者の区分」(nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1910.htm) — 全世界所得課税.
- 確定申告が必要なケース: 国税庁「確定申告が必要な方」(nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2020.htm).
- 住民税の仕組み（前年所得・翌年課税・1月1日ルール）: 総務省「個人住民税」(soumu.go.jp).
- 税務申告と在留審査の関係: G60 cross-ref（永住申請の公的義務要件）; G71 cross-ref（更新・変更審査の素行評価）.
- Cross-ref G60 (永住申請・公的義務), G71 (更新審査での素行評価), G66 (特定技能更新の書類), G82 (海外転出届と住民税).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 016 G90. Key sources: 国税庁「居住者と非居住者の区分」; 国税庁「確定申告が必要な方」; 総務省「個人住民税」; G60/G71 cross-refs. Core facts: 外国人居住者は全世界所得が課税対象; 確定申告不要ケースは年末調整完了の給与のみ; 住民税=前年所得・翌年6月課税・1月1日ルール; 税務申告不履行=在留申請の公的義務評価に影響. needs_domain P1: 修正申告後の永住申請評価への影響. Cross-ref G60, G71, G66, G82.
