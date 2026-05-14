---
asset_id: guardrail-kika-haigusha-tokure
title: 日本人の配偶者による簡易帰化（国籍法第7条） — 婚姻3年かつ日本に引き続き1年以上住所；5年居住要件の短縮であって即時取得ではない
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

This guardrail prevents errors about the simplified naturalization route for spouses of Japanese nationals under 国籍法第7条. Key errors to block:

1. **"日本人と結婚すれば，すぐに日本国籍が取れる。"** — incorrect. 国籍法第7条の簡易帰化は，婚姻後3年以上経過 **かつ** 引き続き1年以上日本に住所を有することが要件。結婚直後の取得は不可。
2. **"日本人の妻（夫）になれば，帰化は自動的に行われる。"** — incorrect. 帰化は自動取得制度ではない。日本人と婚姻していても，申請手続きを経て法務大臣の許可を受けなければ日本国籍は取得できない。
3. **"婚姻届を出してから1年で簡易帰化ができる。"** — incorrect. 国籍法第7条の要件は「婚姻後3年以上経過 + 引き続き1年以上日本に住所」。1年では「3年以上の婚姻継続」要件を満たさない。
4. **"離婚後でも，以前日本人配偶者がいたので簡易帰化を申請できる。"** — incorrect. 国籍法第7条は現在の婚姻関係が継続していることが前提。離婚後は第7条の簡易帰化ルートは使えない（一般要件 第5条に戻る）。

## Trigger

Use this card when the user says:

- "日本人と結婚したらすぐに日本国籍が取れますか？"
- "日本人の配偶者なので，帰化は簡単にできますか？"
- "婚姻から何年で帰化できますか？"
- "結婚1年で帰化申請できますか？"
- "日本人と離婚しましたが，簡易帰化はまだできますか？"
- any pattern treating marriage to a Japanese national as immediate or automatic naturalization, or misunderstanding the 3-year marriage requirement.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| kokusekih-7 | L1 | 国籍法 第7条 | https://laws.e-gov.go.jp/law/324AC0000000147 | 2026-05-15 | 第7条: 日本人の配偶者である外国人で引き続き婚姻後3年以上経過し，かつ引き続き1年以上日本国内に住所を有するものは，帰化許可申請ができる（5年居住要件を短縮）. |
| kokuseikh-5 | L1 | 国籍法 第5条 | https://laws.e-gov.go.jp/law/324AC0000000147 | 2026-05-15 | 第5条: 一般帰化要件（引き続き5年以上日本に住所+満18歳以上+素行+生計能力+重国籍防止）. |
| moj-kika | L4 | 法務省「帰化許可申請」 | https://www.moj.go.jp/MINJI/minji78.html | 2026-05-15 | 帰化は申請制（法務局申請）→法務大臣許可。自動取得制度ではない。G64 cross-ref。 |
| g64-crossref | guardrail | guardrail-kika-joken-kyojuukikan (G64) | internal | 2026-05-15 | G64: 帰化の一般要件（5年居住）; 第7条簡易帰化（婚姻3年+日本在住）; 法務局申請; 重国籍防止（第11条）. |
| g25-crossref | guardrail | guardrail-kika-vs-eijuu-different-routes (G25) | internal | 2026-05-15 | G25: 帰化（法務局・国籍取得）vs 永住（ISA・在留資格変更のみ）の根本的な違い. |
| g8-crossref | guardrail | guardrail-spouse-divorce-death-remarriage (G8) | internal | 2026-05-15 | G8: 日本人配偶者との離婚後の在留資格変更・帰化・永住の各ルート. |

## Official Rule Or Source Fact

**国籍法第7条（日本人配偶者の簡易帰化）の条文:**

> 「日本国民の配偶者たる外国人で引き続き婚姻の後三年を経過し，かつ，引き続き一年以上日本に住所を有するものについては，第五条第一項第一号の条件（引き続き5年以上住所）を緩和する。」

要件の整理:

| 要件 | 内容 | 一般帰化（第5条）との比較 |
|---|---|---|
| **婚姻継続** | 日本国民との婚姻が**現在も継続**していること | 一般帰化に婚姻要件なし |
| **婚姻後の期間** | 婚姻後**3年以上**継続 | 一般帰化には婚姻期間要件なし |
| **日本国内住所** | 引き続き**1年以上**日本に住所 | 一般帰化は引き続き5年以上 |
| **素行** | 良好であること（第5条第1項第3号）| 同じ要件 |
| **生計能力** | 自己または生計を同一にする配偶者等が生計を営めること | 同じ要件 |
| **重国籍防止** | 日本国籍取得後，外国国籍を離脱できること（第5条第1項第5号）| 同じ要件 |

**「婚姻後3年以上 + 日本在住1年以上」の計算:**

典型的な適用パターン:
- 日本人配偶者と婚姻してから一定期間海外に住み，その後日本に転居 → 婚姻継続3年以上 + 日本在住1年以上で申請可能
- 日本で婚姻し，そのまま日本に住み続ける → 婚姻から3年後に申請可能（日本在住1年の要件は婚姻直後から充足）

**第7条が適用されないケース:**

1. **婚姻が継続していない（離婚）**: 第7条は現在の婚姻を前提とする。離婚後は第5条（一般帰化）の5年居住要件に戻る
2. **婚姻後の経過が3年未満**: 例外なし — 3年の継続が必要
3. **日本に引き続き1年住んでいない**: 途中で長期海外在住があった場合は「引き続き」の要件を満たさない可能性
4. **日本人配偶者の死亡**: 死亡後も婚姻実績があれば第5条（1号の5年要件緩和として第8条の「日本人の子等」の特例）が問題になるが，第7条の「配偶者」要件は消滅

**帰化の自動取得について（重要）:**

日本国籍は申請によってのみ取得できる（国籍法第4条以降）。日本人との婚姻は国籍法上，自動的な国籍取得事由ではない。婚姻によって:
- 在留資格「日本人の配偶者等」への変更が可能（ISA手続き）
- 帰化申請の要件緩和（第7条）が可能 — しかし帰化は申請して法務大臣の許可を受けて初めて国籍が付与される

**申請手続き（G64 cross-ref）:**

- 申請先: 住所地管轄の**法務局または地方法務局**（ISAではない）
- 必要書類: 申請書・住民票・戸籍等（婚姻事実を証明する書類を含む）
- 審査期間: 通常1年前後（法務局によって異なる）
- 審査内容: 国籍法上の全要件（素行・生計・婚姻継続・住所要件・重国籍防止能力）を審査

**重国籍防止（国籍法第11条 — G64 cross-ref）:**

帰化後は原則として元の国籍を失わなければならない。元の国籍国の法律が日本国籍取得後の自動的な国籍喪失を規定している場合は問題ないが，そうでない場合は自発的に喪失手続きが必要。一部の国では国籍喪失が認められない場合があり，このような場合の扱いは needs_domain。

## Safe Answer Behavior

- When asked if marriage to a Japanese person means immediate naturalization: clearly state NO — naturalization requires a formal application and Law Minister permission; marriage is not automatic.
- When asked about the timeline: explain the 3-year marriage + 1-year Japan residence requirement under Article 7; emphasize that 1 year post-marriage is not sufficient.
- When asked after divorce: clearly state that Article 7 no longer applies; the general 5-year residence route (Article 5) is the path available.
- When asked about the application: route to professional (行政書士) and 法務局 for guidance on document preparation.
- Do not say "you can get Japanese nationality because you're married to a Japanese person."

## Must Say

- 国籍法第7条の簡易帰化は，日本人配偶者との婚姻が「引き続き3年以上継続」し，かつ「引き続き1年以上日本国内に住所を有する」場合にのみ申請できる。結婚直後・1年後の申請は要件を満たさない。
- 帰化は自動取得ではない。婚姻後も，正式な帰化申請を法務局に提出し，法務大臣の許可を受けて初めて日本国籍が取得できる。
- 離婚後は第7条の簡易帰化ルートは使えない。国籍法第5条の一般要件（5年居住等）に基づく申請に戻る。

## Must Not Say

- 「日本人と結婚すればすぐに日本国籍が取れる。」（婚姻3年+日本在住1年の要件がある）
- 「結婚1年で帰化申請できる。」（婚姻継続3年の要件がある）
- 「離婚後も簡易帰化（第7条）が使える。」（第7条は現在の婚姻継続が前提）
- 「婚姻届を出すと自動的に帰化できる。」（帰化は申請制・法務大臣許可制）

## Deep Water Triggers

- 外国人が日本で婚姻後2年間日本在住，その後1年間海外在住して戻ってきた — 「引き続き」住所の要件を満たすか？
- 日本人配偶者が死亡した — 第7条ルートはどうなるか？他の帰化ルートは？
- 婚姻3年以上・日本在住1年以上を満たしているが，税金の滞納歴がある — 素行要件に影響するか？
- 元の国籍国が国籍離脱を認めない（強制二重国籍になる）場合，日本は帰化を認めるか？
- 日本人配偶者との法律婚ではなく事実婚（内縁関係）の場合，第7条は適用されるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who just married a Japanese national: explain the 3-year marriage + 1-year Japan residence requirement; let them know when they can apply.
- For persons approaching the 3-year marriage + 1-year Japan mark: route to 行政書士 and 法務局 for document preparation.
- For divorced persons: route to G64 for the general naturalization requirements (5-year residence); route to G25 for the 帰化 vs 永住 comparison.
- For persons with conduct issues (tax, criminal): route to G64 (素行要件) and professional assessment before applying.

## Unknown Fields

- Whether "引き続き" (continuous) residence or marriage allows for short-term interruptions (e.g., overseas travel) and what threshold ISA/法務省 uses to assess continuity.
- Whether de facto (common-law) marriage (事実婚) is recognized under Article 7, or only formal legal marriage (法律婚).
- What happens when the home country does not allow voluntary nationality relinquishment — does 法務省 accept this and permit dual nationality or refuse the application?

## Needs Domain Flags

- needs_domain (P1): What is the 法務省 operational standard for "引き続き" (continuous) residence — specifically, how much time abroad breaks continuity for Article 7 purposes?
- needs_domain (P1): Is Article 7 available for same-sex couples where the foreign national has entered a legal same-sex marriage recognized in Japan?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kika-haigusha-001 | "日本人と結婚しました。すぐに日本国籍が取れますか？" | State: NO — 結婚直後の取得は不可。国籍法第7条の簡易帰化は「婚姻継続3年以上かつ日本在住1年以上」が要件。帰化は申請制であり、自動取得ではない。法務局への申請が必要。 |
| kika-haigusha-002 | "日本人の妻と婚姻して2年たちました。帰化申請できますか？" | State: まだ申請できない。国籍法第7条の要件は婚姻継続「3年以上」。2年の時点では要件未充足。婚姻3年+日本在住1年の両方を満たした時点で法務局に申請可能。 |
| kika-haigusha-003 | "日本人の夫と離婚しましたが，簡易帰化（第7条）はまだ使えますか？" | State: NO — 国籍法第7条は現在の婚姻継続を前提とする。離婚後は第7条の適用なし。一般要件（国籍法第5条: 引き続き5年以上日本在住等）に基づく帰化申請に戻る。専門家に相談を。 |

## Source Notes

- 国籍法第7条（配偶者簡易帰化）条文: e-Gov法令検索（国籍法）から確認. 「婚姻の後三年を経過し，かつ，引き続き一年以上日本に住所を有する」という具体的な数値要件.
- 国籍法第5条（一般帰化要件）: e-Gov法令検索; 5年居住要件・素行・生計・重国籍防止の各要件確認.
- 帰化の申請制・法務大臣許可制: 法務省 minji78.html + G64 cross-ref.
- 離婚後の第7条不適用: 条文上「配偶者たる外国人」とある（現在形）から導かれる構造的結論.
- Cross-ref G25 (帰化vs永住の根本的違い), G64 (帰化一般要件・法務局申請), G8 (日本人配偶者との離婚後の在留資格ルート).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 013 G75. Key sources: 国籍法第7条・第5条（e-Gov法令検索）; 法務省 minji78.html（帰化申請制）; G64 cross-ref（一般要件・法務局申請）; G25 cross-ref（帰化vs永住）. Core facts: 婚姻3年+日本在住1年の両方必要; 帰化は申請制で自動取得ではない; 離婚後は第7条不適用; 重国籍防止（第11条）は第7条ルートにも適用. Cross-ref G25, G64, G8.
