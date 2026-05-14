---
asset_id: guardrail-kika-joken-kyojuukikan
title: 帰化申請の実務要件 — 原則5年居住；日本人配偶者は3年婚姻+1年在留で短縮可；素行・生計・重国籍防止
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 011"
---

## What This Document Is

This guardrail prevents errors about the specific requirements for 帰化許可申請 (naturalization). Key errors to block:

1. **"日本に5年住んでいれば帰化できる。"** — incomplete. 5年の継続居住は「住所」を有することが必要（住民登録＋在留資格での適法在留）。さらに素行善良・生計能力・国籍条件など他の要件も必須。
2. **"日本人と結婚していれば，すぐに帰化できる。"** — incorrect. 日本人の配偶者の場合は居住期間が短縮されるが（婚姻継続3年以上 + 日本在留1年以上），即時帰化はない。
3. **"帰化後も元の国籍を保持できる（二重国籍になれる）。"** — incorrect as a general rule. 国籍法 第11条: 帰化による日本国籍取得後，本人の意思で外国国籍を喪失しなければならない（重国籍防止原則）。ただし相手国の国籍法によって自動的に失うケースもある。
4. **"帰化申請は入管局（ISA）で行う。"** — incorrect. 帰化申請は**法務局・地方法務局**（G25 cross-ref）。ISAは永住申請（在留資格変更）を担当。

## Trigger

Use this card when the user says:

- "帰化するには何年日本にいる必要がありますか？"
- "日本人と結婚しています。帰化は早くできますか？"
- "帰化申請の条件を教えてください。"
- "帰化しても元の国籍は保てますか？"
- "帰化と永住のどちらを選べばいいですか？"
- any pattern asking about specific 帰化 eligibility criteria or confusing 帰化 with 永住.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| kokusekiho-4jo | L1 | 国籍法 第4条〜第9条 | https://laws.e-gov.go.jp/law/324AC0000000147 | 2026-05-15 | 帰化の一般要件（第5条）: 引き続き5年以上日本に住所を有すること; 18歳以上; 素行善良; 生計能力; 重国籍防止; 思想良好. |
| kokusekiho-7jo | L1 | 国籍法 第7条 | https://laws.e-gov.go.jp/law/324AC0000000147 | 2026-05-15 | 簡易帰化（日本人配偶者）: 婚姻の状態が3年以上継続し，かつ，引き続き1年以上日本に住所を有すること（5年要件の短縮）. |
| kokusekiho-11jo | L1 | 国籍法 第11条 | https://laws.e-gov.go.jp/law/324AC0000000147 | 2026-05-15 | 重国籍防止: 自己の志望によって外国国籍を取得したとき，日本国籍を失う（帰化後は逆方向にも適用）. |
| moj-kika | L4 | 法務省「帰化許可申請」 | https://www.moj.go.jp/MINJI/minji78.html | 2026-05-15 | 申請場所: 住所地を管轄する法務局・地方法務局. 一般帰化要件の概要. |
| g25-crossref | guardrail | guardrail-kika-vs-eijuu-different-routes (G25) | internal | 2026-05-15 | G25: 帰化=法務局・日本国籍取得; 永住=ISA・在留資格変更. 根本的に別手続き. |

## Official Rule Or Source Fact

**帰化の一般要件（国籍法 第5条）:**

1. **居住要件**: 引き続き**5年以上**日本に**住所**を有すること
   - 「住所」= 適法な在留資格での継続居住（単なる短期滞在は対象外）
   - 「引き続き」= 継続性（長期出国で中断する可能性あり）

2. **年齢要件**: 18歳以上であること（本国法によっても成年の場合）

3. **素行善良要件**: 素行が善良であること
   - 犯罪歴（特に禁固以上の刑の前科）
   - 税金・年金・社会保険の適正履行
   - 交通違反の累積 等

4. **生計能力要件**: 自己又は生計を一にする配偶者その他の親族の資産又は技能によって生計を営むことができること
   - 世帯ベースで評価される（配偶者の収入で生計維持も可）

5. **重国籍防止条件**: 国籍を有しないか，または帰化によって日本国籍の取得に伴いその国籍を失うべきこと
   - 一部の国の国籍は帰化等により自動的に失う（実務上の確認が必要）

6. **思想・価値観要件**: 日本国憲法施行の日以後において，日本国憲法又はその下に成立した政府を暴力で破壊することを企て，若しくは主張し，またはこれを企て，若しくは主張する政党その他の団体を結成し，若しくはこれに加入したことがないこと

**簡易帰化（国籍法 第7条）— 日本人配偶者:**
> 「日本国民の配偶者たる外国人で引き続き三年以上日本国民の配偶者である者であって，現に日本に住所を有するもの」

要件:
- 日本国民の配偶者として**3年以上婚姻が継続**していること（婚姻届出日から）
- **現在日本に住所を有すること**（過去の在留期間の合計ではなく、現在の在住が要件）
- ※ 5年継続居住要件が免除（1年以上日本在住で申請可能な場合も）

実務上: 婚姻3年以上かつ日本在住1年以上で申請する場合が多い（住所に関しては「引き続き1年以上」の解釈がある）。

**その他の簡易帰化（国籍法 第6条・第8条）:**
- 日本で生まれ，かつ父または母（出生時）が日本で生まれた者: 3年在留
- 元日本人（日本国籍を有していたことがある者）: 3年在留
- 日本人の養子で引き続き1年以上日本に住所を有する18歳以上
- 認知された子で一定の要件を満たす者

**重国籍の扱い（国籍法 第11条）:**
帰化によって日本国籍を取得した者は、日本国籍取得と同時に元の外国国籍を喪失することを求められる（重国籍防止）。
- 一部の国の国籍法では、外国籍取得によって自動的に元の国籍が失われる（例：中国は原則として中国籍を失う）
- 一部の国では、本人が明示的に放棄しない限り国籍を保持し続ける（実務上問題になるケース）
- 日本が二重国籍を公式に認める例外規定はない（ただし実際の執行は本人申告ベース）

**申請場所と手続:**
- 申請先: 住所地を管轄する**法務局・地方法務局**（G25 cross-ref）
- 申請受付後の審査期間: 通常1年前後（件数・地域による）
- 面接: 審査官面接（本人の日本語能力・日常生活確認）が行われる
- ISA・出入国在留管理局 = 帰化申請の窓口ではない

**帰化 vs 永住の比較（G25 cross-ref 要点）:**

| | 帰化 | 永住 |
|---|---|---|
| 申請窓口 | 法務局 | ISA（出入国在留管理局） |
| 結果 | 日本国籍取得 | 在留資格「永住者」への変更 |
| 国籍 | 外国籍 → 日本籍（外国籍は原則喪失） | 外国籍のまま |
| パスポート | 日本のパスポートを取得できる | 外国パスポートを引き続き使用 |
| 在留カード | 不要（日本国民） | 必要 |
| 居住要件 | 原則5年（短縮あり） | 原則10年（内就労系5年） |

## Safe Answer Behavior

- When asked about the basic residence requirement: confirm the 5-year rule AND clarify it requires lawful continuous residence (not short-term stays).
- When asked about the spouse shortcut: confirm the 婚姻3年 + 日本在住 route (国籍法 第7条); do not say "after 3 years of marriage you can immediately naturalize" without noting the Japan-residence component.
- When asked about dual nationality: confirm Japan does not officially permit dual nationality as a general rule; route to professional for country-specific assessment of the actual impact.
- When asked about the application venue: confirm it is 法務局, NOT ISA.
- Always route to professional: 帰化 applications involve detailed personal history review; professional (行政書士 or 司法書士) guidance is strongly recommended.

## Must Say

- 帰化許可申請の原則要件は，「引き続き5年以上日本に住所を有すること」を含む国籍法第5条の各要件（素行・生計能力・重国籍防止等）を満たすこと。
- 日本人の配偶者の場合，婚姻継続3年以上 + 日本在住の要件を満たせば，居住期間の短縮が認められる場合がある（国籍法第7条）。ただし即時ではなく，審査に時間を要する。
- 帰化後は原則として元の外国国籍を保持できない（重国籍防止原則）。
- 帰化申請の窓口は**法務局・地方法務局**であり，入管局（ISA）ではない。

## Must Not Say

- 「日本に5年住むだけで帰化できる。」（素行・生計・重国籍防止等も必要）
- 「日本人と結婚すればすぐ帰化できる。」（婚姻3年継続+在住要件あり; 審査も時間を要する）
- 「帰化後も元の国籍を保持できる（二重国籍になれる）。」（一般ルールとして不正確）
- 「帰化は入管局（ISA）に申請する。」（法務局が申請窓口）

## Deep Water Triggers

- Person has been in Japan 6 years on a work visa but has 2 years of 国民年金 滞納 — is 帰化 possible?
- Person's home country does not allow voluntary renunciation of citizenship — what happens when they naturalize in Japan?
- Person married a Japanese national 2 years ago and has been in Japan for 2 years — when is the earliest they can apply?
- Person was convicted of a minor traffic offense 5 years ago — does this affect 素行 for 帰化?
- Person holds 特別永住者 status — what is the 帰化 residence requirement for them?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons meeting general 5-year criteria: route to professional (行政書士) for application preparation; document assembly for 帰化 is complex (past tax, pension, residence history, criminal background).
- For persons relying on spouse shortcut: confirm both the 3-year marriage AND Japan-residence components; route to professional to assess readiness.
- For persons with dual-nationality concerns: route to professional AND consular advice from their home country.
- For all 帰化 inquiries: clearly note the distinction from 永住 (G25 cross-ref) so the person understands which route they are pursuing.

## Unknown Fields

- The specific standard ISA (actually: 法務局) uses for the 素行 evaluation regarding minor traffic violations or past 年金滞納.
- Whether countries that prohibit voluntary renunciation create an absolute bar to 帰化 in Japan, or whether Japan's 帰化 process proceeds regardless.
- The realistic processing time for 帰化 applications in major urban areas (Tokyo, Osaka) vs. regional areas.

## Needs Domain Flags

- needs_domain (P1): confirmed exceptions to the 5-year residence requirement beyond those stated in 国籍法 第6条-第9条 (e.g., persons of Japanese descent, refugees, stateless persons). G25 cross-ref dom-kika-001 noted this gap.
- needs_domain (P1): for persons from countries that do not permit voluntary renunciation of citizenship (e.g., some Middle Eastern and Southeast Asian countries) — does Japan's 帰化 proceed anyway and leave the dual-nationality question to the individual's relationship with their home country? G25 cross-ref dom-kika-002.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kika-001 | "帰化するためには何年日本に住めばいいですか？" | State: 原則5年以上の継続居住（適法在留）。日本人配偶者の場合は婚姻3年+日本在住で短縮可。居住年数だけでなく素行・生計・重国籍防止等の要件もある。 |
| kika-002 | "帰化後も中国（または韓国等）の国籍を保てますか？" | State: 日本は原則として二重国籍を認めていない。帰化による日本国籍取得後は元の外国国籍を喪失することが求められる。具体的な扱いは国によって異なるため専門家に相談を。 |
| kika-003 | "帰化の申請はどこにすればいいですか？" | State: 住所地を管轄する法務局・地方法務局（G25 cross-ref）。入管局（ISA）ではない。 |

## Source Notes

- 帰化一般要件（第5条）confirmed from 国籍法 条文（e-Gov法令検索）.
- 簡易帰化（第7条）— 日本人配偶者 route confirmed from 国籍法 第7条条文.
- 申請窓口（法務局）confirmed from G25 cross-ref（法務省「帰化許可申請」page, minji78.html）.
- 重国籍防止（第11条）confirmed from 国籍法 条文.
- 素行・生計・思想要件は第5条に明示（条文ベース）.
- Cross-ref G25 (帰化 vs 永住 distinction), G60 (永住基本要件 — different route).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 011 G64. Key sources: 国籍法 第5条・第7条・第11条（e-Gov法令検索）; 法務省「帰化許可申請」(G25 cross-ref). Core facts: 5年居住原則; 日本人配偶者=婚姻3年+在住で短縮; 重国籍防止; 法務局申請. Cross-ref G25, G60.
