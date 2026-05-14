---
asset_id: guardrail-kogyou-visa-yoken
title: 在留資格「興行」の要件と芸能活動の規制 — 興行ビザは芸能活動に必要；申請要件が厳格（受入機関の認定等）；人身売買対策の強化で審査が厳しい
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 017"
---

## What This Document Is

This guardrail prevents errors about Japan's 興行 (entertainment/performance) residence status. Key errors to block:

1. **"音楽公演のために来日するだけなら，短期滞在（観光ビザ）でいい。"** — incorrect. 報酬を受ける公演活動（コンサート・ライブ等）は不法就労になる。報酬を受ける芸能活動には，在留資格「興行」または「芸術」（収入を伴う芸術活動; G86 cross-ref）が必要。
2. **"興行ビザは誰でも簡単に取れる。"** — incorrect. 在留資格「興行」の申請は，受入機関（興行主・イベント主催者等）の実績・規模の要件，または申請者本人の芸術上の実績要件（一定水準以上の者）などが求められる。人身売買対策のため，審査は厳格化されている。
3. **"観光目的で来日し，日本で急遽公演することになっても問題ない。"** — incorrect. 短期滞在での報酬を受ける公演活動は不法就労。公演予定がある場合は，事前に在留資格「興行」を取得する必要がある（在日中の在留資格変更は原則困難）。
4. **"在留資格『興行』は大手プロダクションとの契約がなければ取れない。"** — partially incorrect. 大規模施設・一定水準以上の施設での公演であれば，受入機関の要件を満たしやすい。ただし，申請者本人が「一定水準以上の芸術上の実績」を持つ場合は，受入機関の規模要件が緩和される場合がある。

## Trigger

Use this card when the user says:

- "コンサートやライブのために日本に来るにはどのビザが必要ですか？"
- "興行ビザの取り方を教えてください。"
- "アーティストとして日本でツアーをしたい。どのビザが必要？"
- "短期滞在で日本に来て，報酬をもらって演奏することはできますか？"
- "芸能人やアイドルは興行ビザで来日しますか？"
- any pattern treating performance activities under tourist/short-term status as permissible when remuneration is involved.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kogyou | L4 | 出入国在留管理庁「在留資格『興行』」 | https://www.moj.go.jp/isa/applications/status/entertainment.html | 2026-05-15 | 活動定義（演劇・演芸・演奏・スポーツ等の興行に係る活動）; 上陸基準省令の要件; 審査の厳格化. |
| g59-crossref | guardrail | guardrail-tanki-taizai-shuro-kinshi (G59) | internal | 2026-05-15 | G59: 短期滞在での報酬を受ける就労=不法就労; 雇用主罰則も適用. |
| g86-crossref | guardrail | guardrail-kenkyu-kyoju-geijutsu-shukyo (G86) | internal | 2026-05-15 | G86: 在留資格「芸術」との比較（収入を伴う芸術活動）; 「興行」は興行の場（ステージ等）での公演活動; 「芸術」は一般的な芸術家の活動. |

## Official Rule Or Source Fact

**在留資格「興行」の活動定義:**

> 演劇，演芸，演奏，スポーツ等の興行に係る活動又はその他の芸能活動（インターネットを利用した興行に係る活動を含む。）

主な対象:
- プロのミュージシャン・バンドによる公演・コンサート
- 舞台俳優・ダンサー・コメディアン等による演技活動
- プロスポーツ選手（試合出場）
- モデル（ファッションショー等の興行に係るもの）
- インターネット配信による有料興行

**上陸基準省令による申請要件（2つのルート）:**

在留資格「興行」の申請には，以下のいずれかのルートで要件を満たす必要がある:

**ルート①: 受入機関の要件（一定規模以上の会場・施設）**

- 公演が行われる施設の規模（収容人数・施設の種類等）の要件
- 受入機関（興行主・プロダクション）の事業規模・実績の要件
- 具体的な規模基準: needs_domain（詳細は上陸基準省令から要確認）

**ルート②: 申請者本人の芸術上の実績（一定水準以上）**

- 相当程度の芸術上の実績を持つ外国人（具体的な水準: 受賞歴・国際的な評価等）
- このルートでは受入機関の規模要件が一部緩和される
- 「相当程度の実績」の基準: needs_domain（官式基準は開示されていない）

**人身売買対策と審査の厳格化:**

在留資格「興行」は，フィリピン等からの興行名目の人身売買問題があったため，2006年以降審査が大幅に厳格化された。現在の審査では:
- 受入機関の信頼性・実態の確認
- 申請者の実際の活動内容と興行の関係性
- 報酬・労働条件の適正性

**「興行」と「芸術」の区別（G86 cross-ref）:**

| 在留資格 | 主な違い |
|---|---|
| **興行** | 興行の場（ステージ・会場・イベント等）での公演活動; プロとして対価を受けての商業的パフォーマンス |
| **芸術** | 収入を伴う芸術上の活動（音楽・美術・文学等); 必ずしも「興行」（ステージ公演）の形を取らない |

**短期滞在での公演活動の制限（G59 cross-ref）:**

- 短期滞在（観光・商談・会議等）: 報酬を受ける公演活動は**不法就労**
- 「無報酬の文化交流活動」であれば短期滞在で可能な場合があるが，境界は曖昧（needs_domain）

**在留期間:**

- 3年・1年・3か月・30日・15日（公演の期間・内容による）

## Safe Answer Behavior

- When asked about performing in Japan: immediately ask whether remuneration is involved; if yes, 興行 or 芸術 status is required.
- When asked about tourist/short-term stay for concerts: clearly state that paid performances under 短期滞在 are unauthorized work; 興行 status must be obtained before entry.
- When asked about 興行 requirements: explain the two routes (venue/agency criteria OR personal artistic achievement criteria); route to professional as the specific standards are complex.
- Do not confirm that 短期滞在 is sufficient for any paid performance activity.

## Must Say

- 報酬を受ける公演活動（コンサート・ライブ・演劇等）には，在留資格「興行」または「芸術」が必要。短期滞在（観光ビザ）での報酬を受ける公演活動は不法就労（G59参照）。
- 在留資格「興行」の申請には，受入機関（会場・主催者）の規模要件を満たすか，申請者本人が相当程度の芸術上の実績を持つことが必要。人身売買対策のため審査が厳格化されている。
- 公演予定がある場合は，日本入国前に在留資格「興行」を取得すること。在日中の在留資格変更は原則困難。

## Must Not Say

- 「観光ビザ（短期滞在）で来日して，公演でギャラをもらっても問題ない。」（不法就労）
- 「興行ビザは簡単に取れる。」（審査が厳格化されており，要件が複数ある）
- 「大手プロダクションとの契約がなければ取れない。」（本人の芸術的実績ルートもある）

## Deep Water Triggers

- 無報酬（ボランティア）で日本のフェスティバルに出演する外国人アーティスト — 興行ビザは必要か？
- オンライン配信のみで，物理的な公演なし — 在留資格「興行」が必要か？
- 日本に家族滞在ビザで住んでいる外国人が，突発的にライブハウスで演奏した — 不法就労か？
- 短期滞在で来日した外国人ミュージシャンが，交通費・宿泊費のみ支給で演奏する — 「報酬」に当たるか？
- 在留資格「芸術」と「興行」はどちらが取りやすいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For performers planning Japan tours: immediately route to professional (行政書士/弁護士); the 興行 application requires detailed documents from both the performer and the receiving organization.
- For short-term visitors wanting to perform: clearly advise that paid performances are not permitted under 短期滞在; they need to apply for 興行 before entry.
- For residents (家族滞在・留学等) wanting to perform: route to G16 for 資格外活動許可; paid professional performances may require separate assessment.
- For questions about 「芸術」 vs 「興行」: route to G86 for the 芸術 card and explain the distinction; both route to professional for specific case assessment.

## Unknown Fields

- The specific venue/capacity thresholds in the current 上陸基準省令 for ルート① (venue/agency requirement) of 興行 applications.
- The specific criteria for "相当程度の芸術上の実績" for ルート② — what awards, recognition levels, or career history qualify.
- Whether internet-only (virtual) performance activities in Japan (streamed live from Japan to overseas audiences for payment) require 興行 status or whether they qualify under a different status.

## Needs Domain Flags

- needs_domain (P1): The specific venue/capacity and agency criteria for 興行 ルート① — official text of 上陸基準省令「興行」 has not been directly accessed. Only ISA guidance page accessed.
- needs_domain (P1): What is the recognized standard for "相当程度の芸術上の実績" for 興行 ルート② applications? Unofficial sources suggest award-winners and internationally recognized artists qualify, but official definition not confirmed.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kogyou-001 | "短期滞在で日本に来ますが，ライブでギャラをもらって演奏できますか？" | State: 短期滞在での報酬を受ける公演活動は不法就労（G59参照）。在留資格「興行」を事前に取得する必要がある。来日前に行政書士に相談のこと。 |
| kogyou-002 | "プロミュージシャンとして日本でツアーをしたいです。どのビザが必要ですか？" | State: プロの音楽公演（対価を伴うもの）には在留資格「興行」が必要。申請には受入機関（会場・主催者）の規模要件または申請者本人の芸術上の実績要件を満たす必要がある。審査が厳格なため，行政書士に相談して早めに申請準備を。 |
| kogyou-003 | "無報酬のボランティアで日本のお祭りに出演するのですが，ビザが必要ですか？" | State: 無報酬の文化交流活動であれば短期滞在での活動が認められる場合がある。ただし，「報酬」の範囲（交通費・宿泊費の支給が報酬に当たるかどうか等）は状況次第。確実性を期すには行政書士に確認を。 |

## Source Notes

- 在留資格「興行」活動定義・申請要件: ISA「在留資格『興行』」(entertainment.html) — 活動定義; 2つの申請ルート（受入機関要件・本人の実績要件）; 人身売買対策による審査厳格化.
- 短期滞在での公演禁止: G59 cross-ref（短期滞在での報酬を受ける就労=不法就労; 確認済み）.
- 「興行」と「芸術」の区別: G86 cross-ref（収入を伴う芸術活動=「芸術」の活動定義から導かれる比較）.
- Cross-ref G59 (短期滞在就労禁止), G86 (「芸術」との区別), G87 (不法就労助長罪).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 017 G91. Key sources: ISA entertainment.html（「興行」活動定義; 2ルート; 審査厳格化）; G59/G86 cross-refs. Core facts: 報酬を受ける公演=「興行」必要; 短期滞在での有償公演=不法就労; 申請は2ルート（受入機関規模 or 本人実績）; 人身売買対策で審査厳格. needs_domain P1: ルート①の会場規模等の具体的基準; ルート②の「相当程度の実績」の定義. Cross-ref G59, G86, G87.
