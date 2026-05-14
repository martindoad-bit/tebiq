---
asset_id: guardrail-iryo-hoken-gaikokujin
title: 在留資格と医療保険制度 — 外国人でも在留資格と雇用形態に応じて健康保険または国民健康保険に強制加入；短期滞在・外交・公用は対象外
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

This guardrail prevents errors about how Japan's medical insurance system applies to foreign nationals. Key errors to block:

1. **"外国人は日本の健康保険・国民健康保険に入れない。"** — incorrect. 日本に在留する外国人は，在留資格の種別と雇用状況に応じて，健康保険（社会保険）または国民健康保険（NHI）に強制加入する義務がある。
2. **"どの在留資格でも同じ健康保険に入ればいい。"** — incorrect. 加入すべき保険は在留状況と雇用形態によって異なる: 適用事業所でのフルタイム相当雇用→健康保険（社保）; 上記以外の中長期在留者→国民健康保険（市区町村）.
3. **"短期滞在でも国民健康保険に加入できる。"** — incorrect. 短期滞在（90日以下）の在留資格を持つ者は，国民健康保険の適用対象外。外交・公用の在留資格者も対象外。
4. **"国民健康保険は任意加入だから，入らなくていい。"** — incorrect. 国民健康保険は，健康保険（社保）に加入していない中長期在留者には強制加入（義務）。任意ではない。

## Trigger

Use this card when the user says:

- "外国人でも日本の健康保険に入れますか？"
- "国民健康保険と健康保険はどう違いますか？"
- "短期滞在ビザで国民健康保険に入れますか？"
- "在留資格によって医療保険が変わりますか？"
- "フリーランスですが，どの保険に入ればいいですか？"
- any pattern treating health insurance as optional for mid-to-long-term residents, or assuming 短期滞在 holders can enroll in NHI.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| kokuho-law | L1 | 国民健康保険法 第5条・第6条 | https://laws.e-gov.go.jp/law/333AC0000000192 | 2026-05-15 | 第5条: 市区町村住民のうち健保適用者等以外=NHI強制加入. 第6条: 除外規定（短期滞在・外交・公用等）. |
| kenko-hoken-law | L1 | 健康保険法 第3条 | https://laws.e-gov.go.jp/law/211AC0000000070 | 2026-05-15 | 被保険者の定義（適用事業所の常時使用される労働者; 国籍不問）. |
| mhlw-nhi-gaijin | L4 | 厚生労働省「国民健康保険の外国人加入について」 | https://www.mhlw.go.jp/bunya/iryouhoken/iryouhoken09/dl/h27_01_04.pdf | 2026-05-15 | 在留資格別の加入要件（3か月超の在留者は原則加入義務; 短期滞在は除外）. |
| g58-crossref | guardrail | guardrail-shakai-hoken-gaikokujin-gimu (G58) | internal | 2026-05-15 | G58: 社会保険（健保・厚年）は雇用形態が基準（国籍・在留資格は基準でない）; 強制適用. |

## Official Rule Or Source Fact

**日本の医療保険制度の二本柱:**

| 制度 | 正式名称 | 主な対象 | 運営主体 |
|---|---|---|---|
| **健康保険（社保）** | 被用者健康保険 | 適用事業所で常時雇用される労働者（外国人含む） | 全国健康保険協会（協会けんぽ）・各健保組合 |
| **国民健康保険（NHI）** | 国民健康保険 | 健康保険に加入していない市区町村住民（外国人含む） | 市区町村 |

**加入すべき保険の判断フロー:**

```
在留期間が3か月超（中長期在留者）?
  Yes →
    適用事業所でフルタイム相当雇用?
      Yes → 健康保険（社保）に強制加入（G58 cross-ref）
      No  → 国民健康保険（NHI）に強制加入（市区町村で手続き）
  No（短期滞在・外交・公用等）→ どちらの制度も適用外
```

**国民健康保険の加入要件（外国人）:**

国民健康保険法第5条・第6条により:
- **加入義務あり**: 市区町村に住所を持つ者で，健康保険・船員保険等の被保険者でない者（国籍・在留資格は要件ではなく，住所と他保険加入状況が基準）
- **除外**: 短期滞在（90日以下の在留資格）; 外交; 公用; 健康保険等の被保険者またはその被扶養者
- **実務的な目安**: 在留期間が3か月を超える在留資格を持つ外国人は，健康保険に加入していなければNHI加入義務あり

**在留資格別の医療保険加入の一般的な整理:**

| 在留資格 | 典型的な雇用形態 | 加入すべき保険 |
|---|---|---|
| 技術・人文知識・国際業務 | フルタイム雇用（適用事業所）| 健康保険（社保） |
| 特定技能1号/2号 | フルタイム雇用（適用事業所）| 健康保険（社保） |
| 高度専門職 | フルタイム雇用（適用事業所）| 健康保険（社保） |
| 経営・管理 | 代表取締役等 | 健康保険（法人役員として）|
| 留学 | アルバイト（20時間未満等）| 国民健康保険（NHI） |
| 家族滞在 | 就労なし（または資格外活動）| 国民健康保険（NHI）|
| 技能実習 | フルタイム雇用 | 健康保険（社保） |
| 育成就労 | フルタイム雇用 | 健康保険（社保） |
| 永住者・定住者 | 各自の雇用形態による | 雇用形態に応じて健保またはNHI |
| **短期滞在** | — | **どちらも適用外** |
| **外交・公用** | — | **どちらも適用外** |

**保険料の負担:**

- 健康保険（社保）: 保険料を事業主と本人で折半; 給与から天引き
- 国民健康保険: 全額本人負担（市区町村が決定; 収入・世帯人数によって異なる）

**未加入・保険料未払いのリスク（G71 cross-ref）:**

- 国民健康保険の加入義務を怠ると，公的義務の不履行として在留申請（特に永住申請）の審査で不利になる可能性がある（G60・G71 cross-ref）
- 医療費は全額自己負担になる（保険適用外）
- 後から加入手続きをする際に遡及保険料の支払いが求められる場合がある

**社会保障協定（特例）:**

日本はいくつかの国（ドイツ・英国・韓国等）と社会保障協定を締結している。協定国からの駐在員等は，一定の条件のもと日本の社会保険（健保・厚年）の加入が免除される場合がある（G58 cross-ref; needs_domain: 協定国リストと適用条件の詳細）。

## Safe Answer Behavior

- When asked if foreigners can join health insurance: confirm both systems apply to foreigners based on residency and employment type.
- When asked about 短期滞在 and health insurance: clearly state 短期滞在 holders are excluded from both NHI and social health insurance.
- When asked about which insurance to join: explain the 3-month/employment-based rule; for フルタイム employment at 適用事業所 → 社保; for others (mid-to-long-term residents) → NHI.
- When asked about NHI being optional: clearly correct — NHI is mandatory for qualifying mid-to-long-term residents not covered by other insurance.
- Do not quote specific premium amounts (vary by municipality and income).

## Must Say

- 日本に在留する外国人は，在留資格（3か月超の中長期在留者）と雇用形態に応じて，健康保険（社保）または国民健康保険（NHI）に強制加入する義務がある。国民健康保険は任意ではない。
- 短期滞在（90日以下の在留資格）の外国人は，国民健康保険・健康保険のどちらの適用対象にもならない。
- 適用事業所でのフルタイム相当雇用であれば健康保険（社保）に強制加入（G58参照）。それ以外の中長期在留者は国民健康保険（市区町村）に強制加入義務がある。

## Must Not Say

- 「外国人は日本の健康保険に入れない。」（在留状況に応じて強制加入義務がある）
- 「国民健康保険は任意加入。」（強制加入; 義務不履行は公的義務違反）
- 「短期滞在でも国民健康保険に入れる。」（短期滞在は適用除外）
- 「在留資格の種類で保険が決まる。」（雇用形態が主な判断軸; 在留資格は直接の基準ではない）

## Deep Water Triggers

- 特定技能1号でフルタイム勤務しているが，雇用主が社会保険に加入させてくれない — どうすればよいか？
- フリーランスとして技人国を持ち，週20時間未満で複数社と契約 — どの保険に入るべきか？
- 短期滞在で日本に来たが，急病になった — 健康保険は使えるか？
- 永住者だが，自分で事業をしていて従業員はいない — 健康保険か国民健康保険か？
- 社会保障協定のある国（ドイツ）の駐在員として来日 — 日本の社会保険への加入は免除されるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For フルタイム employed workers: confirm 社保 applies regardless of nationality; if employer is not enrolling them, route to 労働基準監督署/年金事務所.
- For students/part-time workers/family dependents: route to local municipality for NHI enrollment procedure.
- For 短期滞在 holders who need medical care: route to travel insurance information; confirm no public health insurance applies.
- For persons with suspected NHI non-enrollment: route to municipality for back-enrollment; note the PR implication (G60/G71 cross-ref).
- For social security agreement questions: needs_domain — route to 日本年金機構 for specific agreement details.

## Unknown Fields

- The complete list of countries with which Japan has social security agreements that exempt foreign workers from Japanese health/pension insurance, and the specific application conditions.
- Whether 特定活動 visa holders (various sub-categories) are treated as "3 months or more" residence status for NHI purposes.
- The exact procedure and timeline for NHI back-enrollment when a foreign national failed to enroll upon arrival.

## Needs Domain Flags

- needs_domain (P1): Does the failure to enroll in NHI (when obligated) appear as a specific negative factor in ISA renewal/change/PR applications, beyond the general "公的義務の適正な履行" requirement? ISA official text does not specify NHI separately from pension/tax.
- needs_domain (P1): Complete list of Japan's social security agreement countries (日独・日英・日韓等) and the conditions under which Japanese social insurance enrollment is exempted for covered workers.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| iryo-001 | "留学ビザで日本に来ましたが，国民健康保険に入れますか？" | State: 留学ビザ（在留期間3か月超）の場合，健康保険（社保）に加入していなければ，国民健康保険（NHI）に強制加入する義務がある。市区町村役場で加入手続きを行うこと。加入は義務であり任意ではない。 |
| iryo-002 | "短期滞在ビザで日本に来ていますが，国民健康保険に加入できますか？" | State: 短期滞在（90日以下の在留資格）の場合，国民健康保険・健康保険のどちらも適用対象外。医療費は全額自己負担になる。旅行者向けの民間医療保険の利用を検討のこと。 |
| iryo-003 | "技人国でフルタイム勤務していますが，会社が社会保険に入れてくれません。" | State: 適用事業所でのフルタイム相当勤務であれば，健康保険・厚生年金保険への加入は事業主の義務。加入させない場合は法令違反。年金事務所（日本年金機構）または労働基準監督署に相談を。公的義務の不履行は在留更新・永住申請にも影響する（G71・G60参照）。 |

## Source Notes

- NHI加入義務・除外規定: 国民健康保険法第5条・第6条（e-Gov法令）; 厚生労働省「外国人の国民健康保険加入」（PDF）.
- 健康保険（社保）の適用（外国人含む）: 健康保険法第3条; G58 cross-ref（社保適用は雇用形態が基準）.
- 在留資格別の整理: 国民健康保険法第6条の除外規定（短期滞在・外交・公用）から構造的に導かれる.
- 公的義務不履行のリスク: G60 cross-ref（永住ガイドライン公的義務要件）; G71 cross-ref（更新・変更審査での素行評価）.
- Cross-ref G58 (社保外国人適用), G60 (永住基本要件・公的義務), G71 (更新審査での公的義務評価).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 015 G84. Key sources: 国民健康保険法第5条・第6条; 健康保険法第3条; 厚生労働省PDF（外国人NHI加入）; G58/G60/G71 cross-refs. Core facts: 外国人も中長期在留者はNHIまたは社保に強制加入義務; 短期滞在・外交・公用は除外; NHIは任意でない; 雇用形態が保険選択の主な判断軸; 未加入=公的義務違反リスク. needs_domain P1: NHI未加入の在留審査への具体的影響; 社会保障協定の適用条件詳細. Cross-ref G58, G60, G71.
