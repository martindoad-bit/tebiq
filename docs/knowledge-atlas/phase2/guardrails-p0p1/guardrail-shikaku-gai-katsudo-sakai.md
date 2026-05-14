---
asset_id: guardrail-shikaku-gai-katsudo-sakai
title: 在留資格の活動範囲と資格外活動の境界 — 在留資格が許可する活動の範囲外の就労・活動は資格外活動（不法就労）；許容される活動の判断は在留資格名だけでなく指定書・資格外活動許可の有無で行う；「ボランティア」「業務委託」「無報酬」も就労認定されうる
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

This guardrail prevents errors about what constitutes permitted activity within a residence status, and when activities cross into 資格外活動（unauthorized activity）. Key errors to block:

1. **"無報酬のボランティア活動は，在留資格の活動制限を受けない。"** — incorrect. 在留資格が就労を制限している場合（例: 文化活動・短期滞在），無報酬であっても，実質的に業務と評価される活動（継続的・定期的な労働提供）は資格外活動となりうる。報酬の有無だけが判断基準ではなく，活動の性質・継続性・事業への貢献度が総合的に判断される。
2. **"業務委託（フリーランス）契約なら，在留資格外の業種でも就労できる。"** — incorrect. 入管法上の就労規制は，雇用契約の有無・契約形態に関わらず，「就労」の実態で判断される。業務委託・請負・フリーランス契約であっても，在留資格が許可していない業種・業態の活動は資格外活動に該当する。
3. **"技人国の在留資格であれば，同じ会社の経営に関与してよい。"** — incorrect (G47/G103 cross-ref). 技人国は技術・人文知識・国際業務に係る活動が許可されるものであり，経営管理活動（意思決定・執行・監督）は含まれない。同一会社でも，経営管理活動を行うためには「経営・管理」への変更が必要（G47参照）。
4. **"在留資格が許可する活動であれば，副業も自由にできる。"** — partially incorrect. 就労可能な在留資格でも，「在留資格に基づく活動」として認められる副業は，当該在留資格が許可する活動の範囲に限られる（例: 技人国の範囲外の肉体労働・販売業務は原則不可）。包括的な資格外活動許可（留学・家族滞在のみ対象）とは異なる。

## Trigger

Use this card when the user says:

- "ボランティアなら在留資格外の活動をしてもいいですか？"
- "業務委託契約なら就労制限を受けませんよね？"
- "技人国で副業（アルバイト・フリーランス）はできますか？"
- "在留資格の許可する活動の範囲はどうやって確認しますか？"
- "無報酬なら何をやっても問題ないですか？"
- any pattern treating contract form or absence of pay as a bypass for immigration work restrictions.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shikaku-gai | L4 | 出入国在留管理庁「資格外活動許可」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00012.html | 2026-05-15 | 資格外活動許可の対象・包括許可と個別許可; 就労制限の概念説明. |
| nyukan-ho-19jo | L4 | 入管法第19条 | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 資格外活動の禁止（在留資格が許可する活動以外の就労の禁止）; 資格外活動許可の根拠規定. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | G47: 技人国保有者の経営管理活動は在留資格外活動のリスク. |
| g87-crossref | guardrail | guardrail-fuho-shuro-josho-zai (G87) | internal | 2026-05-15 | G87: 不法就労助長罪（入管法第73条の2）; 雇用主の在留資格確認義務. |
| g105-crossref | guardrail | guardrail-zairyu-shikaku-naiyo-kakunin (G105) | internal | 2026-05-15 | G105: 就労可否確認の方法（在留カード・資格外活動許可スタンプ確認）. |

## Official Rule Or Source Fact

**入管法第19条（資格外活動の禁止）:**

> 在留資格を有する外国人は，その在留資格に応ずる活動以外の就労活動（収入を伴うものに限らない）を行ってはならない（ただし，資格外活動許可を受けた場合はこの限りでない）。

「就労」の認定: 入管法上の「就労」は，雇用契約の有無・報酬の有無だけでなく，**活動の性質・継続性・事業への実質的な貢献度**によって判断される。

**活動の許容範囲の判断方法:**

| 在留資格の種別 | 活動範囲の確認方法 |
|---|---|
| **就労系資格**（技人国・特定技能等）| 在留カードの「就労制限の有無」欄 + 活動範囲の具体的な業務内容の確認（在留資格が許可する職種・業務内容の範囲）|
| **特定活動** | 指定書（パスポートに貼付）の記載内容に従う（G105参照）|
| **資格外活動許可（包括）**（留学・家族滞在）| 在留カード裏面のスタンプ確認; 週28時間以内の制限 |
| **資格外活動許可（個別）**| 許可書記載の内容（時間・職種・雇用主等）に従う |
| **就労不可**（文化活動・短期滞在等）| 原則として収入を伴う就労不可; ボランティア・無報酬でも実質就労と評価されうる |

**「就労」とみなされうる活動の例（報酬なし・形式的な契約形態を問わず）:**

- 業務委託・請負・フリーランス形式での継続的な業務提供
- 法人の経営活動（無報酬でも意思決定・経営管理への関与）
- SNSでの収益活動（広告収入・スポンサー契約等）
- 宗教・文化施設での継続的活動（在留資格が許可する宗教・文化活動以外）
- 「ボランティア」と名目された継続的・組織的な労働提供

**「就労」とみなされない活動の例（一般的に）:**

- 学術研究・教育機関での非商業的な講義・セミナー参加
- 真に個人的・一時的な無報酬の活動（短時間・非継続的・事業性なし）
- 日常的な家事・育児（家族のためのもの）

⚠️ 判断は**ケースバイケース**であり，ISAが個別に評価する。「無報酬だから問題ない」という断定はリスクがある。

**技人国の活動範囲と副業:**

技人国が許可する活動:
- 「本邦の公私の機関との契約に基づいて行う理学，工学その他の自然科学の分野若しくは法律学，経済学，社会学その他の人文科学の分野に属する技術若しくは知識を要する業務又は外国の文化に基盤を有する思考若しくは感受性を必要とする業務に従事する活動」

技人国の範囲内の副業（例）:
- 同種のIT・エンジニアリング業務の業務委託（許可する活動の範囲内）
- 翻訳・通訳業務（国際業務の範囲内）

技人国の範囲外の副業（例、原則として資格外活動に該当）:
- 飲食店・コンビニ等での接客・販売（単純労働）
- 建設・製造等の現場作業
- ウーバーイーツ等の配達業務
- 営業・管理活動（職種の専門性を問わない単純業務）

**資格外活動許可（包括許可）と個別許可の違い:**

| 種別 | 対象在留資格 | 活動範囲 | 時間制限 |
|---|---|---|---|
| **包括的資格外活動許可** | 留学・家族滞在 | 就労可能な在留資格で従事できる活動 | 週28時間（留学の長期休暇中は週40時間）|
| **個別資格外活動許可** | 就労可能資格を含む多くの在留資格 | 許可書記載の具体的な活動 | 許可書記載内容による |

## Safe Answer Behavior

- When asked about volunteer/unpaid activities: explain that immigration work restrictions are based on the nature and continuity of the activity, not just payment; unpaid but substantive work-like activity may still be 資格外活動.
- When asked about business/freelance contracts: clearly state that contract form does not determine the immigration law analysis; the substance of the activity controls.
- When asked about 技人国 副業: confirm that 技人国 holders can only do 副業 within the scope of their permitted activities; simple labor (factory, delivery, restaurant) is not within scope regardless of contract form.
- When asked how to confirm permitted activities: route to G105 for the card-checking procedure; recommend consulting an 行政書士 for ambiguous cases.

## Must Say

- 在留資格の活動制限は，雇用契約・業務委託契約の形式や報酬の有無に関わらず，活動の実態（性質・継続性・事業への貢献度）で判断される。「ボランティア」「業務委託」でも，実質的な就労と評価されれば資格外活動となりうる。
- 技人国の在留資格は，技術・人文知識・国際業務に係る活動が対象であり，飲食・販売・配達等の単純作業は在留資格の範囲外（資格外活動に該当する可能性）。副業・フリーランスも，在留資格が許可する活動範囲内でのみ許容される。
- 包括的な資格外活動許可（週28時間以内）は，「留学」と「家族滞在」のみに認められる制度。他の在留資格保有者が在留資格外の活動を行う場合は，個別の資格外活動許可が必要。

## Must Not Say

- 「ボランティア（無報酬）なら，在留資格の就労制限を受けない。」（実質的な就労と評価されれば制限の対象）
- 「業務委託契約なら，在留資格外の業種でも就労できる。」（契約形式は就労の実態判断に影響しない）
- 「技人国なら副業（アルバイト）は自由にできる。」（技人国の活動範囲外の単純労働は資格外活動）

## Deep Water Triggers

- YouTubeチャンネルの広告収入・投げ銭は「就労」に該当するか？（在留資格との関係でのコンテンツ収益化）
- 在留資格「芸術」で副業（例: IT系フリーランス）をしたい — 資格外活動許可が必要か？
- 技人国の在留者が日本企業の顧問（月額報酬あり）を兼任する — 在留資格の範囲内か否かの判断基準は？
- 「宗教」の在留資格を持つ者が，宗教法人以外のNGO・NPOで活動する — 資格外活動になるか？
- 在留資格「経営・管理」の外国人が，別の会社の非常勤取締役に就任する — 許可が必要か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about specific activity patterns: route to G105 for card-checking procedure; recommend 行政書士 consultation for ambiguous cases.
- For persons already engaged in potentially unauthorized activities: route to G87 (不法就労助長罪 risk for employers); recommend immediate lawyer consultation.
- For 技人国 holders asking about side jobs: route to G47 (if management activities are involved); explain that simple labor side jobs are outside 技人国 scope.
- For persons seeking to engage in freelance/consulting within their permitted scope: route to 行政書士 for advice on individual 資格外活動許可 if the activity may be outside their current status.

## Unknown Fields

- The specific threshold of continuity/regularity that causes unpaid volunteer work to be classified as 資格外活動 — ISA has not published quantitative standards.
- Whether SNS-based income (ad revenue, fan subscriptions) is treated as "work" for immigration purposes and, if so, under which status it would be permissible.
- Whether a 技人国 holder's activities as a non-executive board member (taking fees) require separate 資格外活動 approval.

## Needs Domain Flags

- needs_domain (P1): What is ISA's operational standard for determining when unpaid "volunteer" work constitutes 資格外活動? Is there published guidance on the continuity/regularity/business-contribution threshold?
- needs_domain (P1): For 技人国 holders who receive freelance income from activities arguably within the "国際業務" or "理学・工学" categories — what documentation or prior permission (if any) is required to confirm compliance?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shikaku-gai-001 | "留学ビザで週3日ボランティアをしています。報酬はありません。問題ないですか？" | State: 留学の在留資格では，包括的資格外活動許可（週28時間以内）を取得していれば，就労可能な範囲での活動が認められる。ただし，活動の実態が「就労」と評価されうる場合（継続的・定期的な業務提供），報酬の有無に関わらず週28時間の制限の範囲内に収める必要がある。具体的な活動内容が資格外活動に該当するか不明な場合は，入管または行政書士に確認することを推奨。 |
| shikaku-gai-002 | "技人国でウーバーイーツをやろうと思っています。業務委託だから問題ないですよね？" | State: ウーバーイーツ等の配達業務は，技人国が許可する「技術・人文知識・国際業務」の範囲外の活動（単純作業）に該当する可能性が高い。業務委託・フリーランス契約であっても，在留資格の活動制限は契約形態に関わらず活動の実態で判断される。技人国の活動範囲外の就労は資格外活動（不法就労）となりうる。行政書士または入管に確認することを強く推奨。 |
| shikaku-gai-003 | "技人国で会社に勤めながら，個人で翻訳業務を請け負っています。問題ありますか？" | State: 技人国が許可する「国際業務」の範囲内であれば，翻訳・通訳業務は技人国の活動範囲内の可能性がある。ただし，副業が本業と独立した事業として継続的に行われている場合，個別の資格外活動許可が必要なケースもある。具体的な状況について，行政書士に確認することを推奨する。 |

## Source Notes

- 資格外活動禁止の法的根拠: 入管法第19条（在留資格に応ずる活動以外の就労の禁止）.
- 資格外活動許可: ISA「資格外活動許可」— 包括許可（留学・家族滞在・週28時間）と個別許可の説明.
- 不法就労助長罪リスク（雇用主側）: G87 cross-ref（入管法第73条の2; 3年以下の懲役または300万円以下の罰金）.
- 技人国の活動範囲: G47 cross-ref（技人国保有者が経営管理活動を行う場合の在留資格変更義務）.
- 就労可否確認の方法: G105 cross-ref（在留カード・資格外活動許可スタンプ・ISAオンライン確認）.
- Cross-ref G47 (技人国→経営管理変更義務), G87 (不法就労助長罪), G98 (文化活動の就労制限), G105 (就労可否確認方法).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 020 G106. Key sources: 入管法第19条（資格外活動の禁止）; ISA「資格外活動許可」（包括許可・個別許可）. Core facts: 就労の実態判断（契約形態・報酬の有無は決定的でない）; 技人国の範囲外副業（単純労働は原則不可）; 包括的資格外活動許可（留学・家族滞在のみ週28h）; 業務委託・ボランティアも実態で判断. needs_domain P1: ボランティア就労と資格外活動の境界基準; 技人国の副業（国際業務系）での許可不要ケース. Cross-ref G47, G87, G98, G105.
