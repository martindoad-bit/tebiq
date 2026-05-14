---
asset_id: guardrail-kaigo-visa-yoken
title: 在留資格「介護」の要件と技能実習・特定技能との違い — 介護福祉士国家資格が前提；技能実習「介護」は職場限定；特定技能「介護」は試験合格が必要
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

This guardrail prevents errors about the multiple immigration pathways for foreign nationals working in Japan's care/nursing sector (介護). Key errors to block:

1. **"介護の仕事をするには『介護ビザ』が必要。"** — oversimplified. 介護分野での在留資格は4種類ある（EPA, 技能実習「介護」, 特定技能「介護」, 在留資格「介護」）。それぞれ要件・対象・就労範囲が異なる。「介護ビザ」という単一の資格は存在しない。
2. **"在留資格『介護』は介護の仕事をする人なら誰でも取れる。"** — incorrect. 在留資格「介護」の取得には，**介護福祉士の国家資格**が必要。国家試験合格または養成校修了が前提となる。介護の実務経験だけでは取れない。
3. **"技能実習で介護の仕事をしていれば，在留資格『介護』に変更できる。"** — incorrect. 技能実習「介護」で在留している者は，技能実習修了後に特定技能「介護」への移行が可能（要件を満たせば）。在留資格「介護」への変更には別途介護福祉士資格の取得が必要。
4. **"特定技能『介護』と在留資格『介護』は同じ。"** — incorrect. 在留資格「介護」は介護福祉士資格保持者が対象で，就労期間・活動範囲が広い。特定技能「介護」は特定の試験合格が要件で，通算5年の在留上限あり（特定技能1号）または上限なし（特定技能2号: 介護は2号も設定）。

## Trigger

Use this card when the user says:

- "介護の仕事をしたいですが，どのビザが必要ですか？"
- "介護ビザとはどういうビザですか？"
- "技能実習で介護をしていましたが，在留資格を変更できますか？"
- "特定技能の介護と在留資格の介護はどう違いますか？"
- "介護福祉士の資格があれば，在留資格は変わりますか？"
- any pattern treating 介護 as a single unified visa category, or treating care work experience alone as sufficient for 在留資格「介護」.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kaigo-status | L4 | 出入国在留管理庁「在留資格『介護』」 | https://www.moj.go.jp/isa/applications/status/nursing.html | 2026-05-15 | 在留資格「介護」の活動定義（介護福祉士の業務）; 取得要件（介護福祉士資格が前提）; 在留期間（5年・3年・1年・3か月）. |
| isa-tokutei-kaigo | L4 | 出入国在留管理庁「特定技能（介護）」 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00147.html | 2026-05-15 | 特定技能「介護」の試験要件（介護技能評価試験・日本語試験）; 技能実習2号修了者の試験免除; 1号と2号の違い. |
| isa-gijutsu-kaigo | L4 | 出入国在留管理庁「技能実習（介護）」 | https://www.moj.go.jp/isa/applications/status/traineeship.html | 2026-05-15 | 技能実習「介護」の対象業務・監理団体・技能実習計画の概要. |
| g46-crossref | guardrail | guardrail-ginou-jisshu-tokutei-gino-iten (G46) | internal | 2026-05-15 | G46: 技能実習2号修了者の特定技能1号への試験免除条件（介護: 関連分野→技能試験免除; 日本語試験=全分野免除）. |
| g63-crossref | guardrail | guardrail-tokutei-gino-bunya-shiken (G63) | internal | 2026-05-15 | G63: 特定技能「介護」は3種類の試験（介護技能評価試験・介護日本語評価試験・日本語能力試験）が必要. |

## Official Rule Or Source Fact

**介護分野における在留資格の4つの枠組み:**

| 在留資格 | 主な要件 | 就労の幅 | 在留期間 |
|---|---|---|---|
| **EPA（経済連携協定）** | 二国間EPA（インドネシア・フィリピン・ベトナム）; 現地研修+日本語研修 | EPA候補者として特定施設に限定 | 最長4年（資格合格後は在留資格「介護」へ）|
| **技能実習「介護」** | 技能実習計画（監理団体通じて）; 日本語N4以上; 対面サービス要件 | 技能実習計画に定められた実習施設に限定 | 最長5年（1号1年+2号2年+3号2年）|
| **特定技能「介護」** | 介護技能評価試験+介護日本語評価試験+日本語能力試験（またはN4相当）合格; または技能実習2号良好修了（試験免除部分あり）| 介護施設全般（転職可・施設限定なし）| 1号: 通算5年上限; **2号: 上限なし（介護は2号も設定）** |
| **在留資格「介護」** | **介護福祉士の国家資格取得が前提**（試験合格または養成校卒業）| 介護福祉士の業務全般（制限なし）| 5年・3年・1年・3か月（更新可）|

**在留資格「介護」の取得要件:**

在留資格「介護」は，以下を満たす者が対象:

- **介護福祉士国家資格の保有**: 介護福祉士試験合格または厚生労働大臣が指定する養成施設の修了
- **日本の介護福祉士登録簿への登録**: 資格取得後，介護福祉士として登録されていること
- **就労先との契約**: 日本の介護施設・事業所等との雇用契約（日本人と同等以上の報酬）

**在留資格「介護」の活動範囲:**

在留資格「介護」保有者は，介護福祉士として行う介護業務全般に従事できる。就労先の変更も（雇用契約の変更として）可能（G29 cross-ref: 届出義務）。

**技能実習「介護」から特定技能「介護」への移行:**

技能実習2号「介護」の良好修了者は，特定技能「介護」1号への移行において:
- **日本語試験**: 全分野免除（G46 cross-ref）
- **技能試験（介護技能評価試験）**: 介護職種の技能実習2号修了者は免除（関連分野として）（G46 cross-ref）
- **介護日本語評価試験**: この点については介護固有の追加試験要件について needs_domain

**特定技能「介護」の追加特徴:**

介護分野は特定技能2号も設定されており（2024年以降），特定技能1号の5年上限後に，2号（上限なし）に移行できる可能性がある。ただし，2号への移行は自動ではなく，別途試験・在留資格変更申請が必要（G33 cross-ref）。

**在留資格「介護」 vs 特定技能「介護」の比較（重要な違い）:**

| 比較項目 | 在留資格「介護」 | 特定技能「介護」 |
|---|---|---|
| **取得の前提** | 介護福祉士国家資格（試験・養成校卒業）| 特定の技能試験合格（または技能実習2号修了）|
| **在留期間の上限** | 上限なし（更新継続可）| 1号: 通算5年; 2号: 上限なし |
| **就労先の制限** | 介護福祉士業務全般（制限なし）| 介護施設全般（限定なし; 転籍可）|
| **家族帯同** | 可（家族滞在として）| 1号: 不可; 2号: 可（G33 cross-ref）|
| **転職の自由度** | 高（届出義務あり）| 同一業務区分内のみ（G73 cross-ref）|

## Safe Answer Behavior

- When asked about 「介護ビザ」: clarify there is no single 介護ビザ; explain the 4 pathways (EPA, 技能実習, 特定技能, 在留資格「介護」).
- When asked about 在留資格「介護」: clearly state 介護福祉士国家資格 is the prerequisite; working in care without the national license does not qualify.
- When asked about transitioning from 技能実習: explain the 特定技能 route (trial exam exemption conditions for 技能実習2号修了者); also explain that 在留資格「介護」 requires a separate national license.
- Do not say "介護の仕事をしていれば在留資格『介護』が取れる" — the national license requirement is firm.

## Must Say

- 介護分野の在留資格は一種類ではなく，EPA・技能実習「介護」・特定技能「介護」・在留資格「介護」の4つの枠組みがある。それぞれ要件・就労範囲・在留期間が異なる。
- 在留資格「介護」の取得には，介護福祉士の国家資格（試験合格または厚生労働省指定養成施設修了）が必要。介護の実務経験・技能実習修了だけでは取れない。
- 技能実習「介護」の2号修了者は，特定技能「介護」1号への移行において技能試験・日本語試験の一部が免除される可能性がある（G46参照）。在留資格「介護」への変更には別途介護福祉士資格が必要。

## Must Not Say

- 「介護の仕事をしているなら在留資格『介護』に変更できる。」（介護福祉士国家資格が必要）
- 「特定技能『介護』と在留資格『介護』は同じ。」（要件・在留期間・活動範囲が異なる）
- 「技能実習で介護をしていれば，在留資格『介護』に自動的に移行できる。」（自動移行はなく，介護福祉士資格の取得が必要）
- 「介護の在留資格は一種類だけ。」（4つの枠組みがある）

## Deep Water Triggers

- EPA介護候補者として来日し，4年後に介護福祉士試験に合格した — その後の在留資格は？
- 技能実習「介護」3号まで修了（5年）したが，介護福祉士の資格がない — 次の選択肢は？
- 特定技能「介護」2号への移行条件はどうなっているか？
- 在留資格「介護」で10年在留した場合，永住申請の要件を満たすか？
- 介護福祉士資格を取得したが，現在の在留資格は「技術・人文知識・国際業務」 — どう変更すればよいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons new to care sector visa routes: explain the 4 pathways overview; route to ISA nursing.html for 在留資格「介護」; route to ISA SSW page for 特定技能「介護」.
- For 技能実習 care workers: route to G46 for the 特定技能 transition conditions; confirm 在留資格「介護」 requires the national license separately.
- For persons with 介護福祉士 license: confirm 在留資格「介護」 eligibility; route to ISA nursing.html for application procedure; route to professional for application.
- For questions about 特定技能「介護」2号: route to G33 for the 1号/2号 boundary; note 介護 has a 2号 option; route to professional for eligibility assessment.

## Unknown Fields

- The specific conditions for 特定技能「介護」2号 transition — whether it requires a separate exam and what the exam content is (as of 2026-05-15, 介護 was added to 特定技能2号 eligible sectors in 2024 but implementation details are evolving).
- Whether 介護日本語評価試験 (separate from 日本語能力試験) is specifically waived for 技能実習2号 care sector graduates, or if it must still be taken.
- The specific ISA application documents required for 在留資格「介護」 (initial application for new arrivals with 介護福祉士 qualification obtained abroad).

## Needs Domain Flags

- needs_domain (P1): For 技能実習2号「介護」 良好修了者transitioning to 特定技能「介護」1号 — is the 介護日本語評価試験 (a care-sector-specific Japanese evaluation test separate from JLPT) also waived, or is it required in addition to JLPT/standard Japanese test waiver?
- needs_domain (P1): What are the confirmed conditions and exam requirements for 特定技能「介護」2号 (the unlimited stay option for care sector)? ISA sources confirm介護 was added to 2号 eligible sectors but exam details are not fully accessible from official text as of 2026-05-15.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kaigo-001 | "介護の仕事をするために日本に来たいです。どのビザを取ればいいですか？" | State: 介護分野の在留資格は1種類ではなく，EPA（特定国）・技能実習「介護」・特定技能「介護」・在留資格「介護」の4つの枠組みがある。介護福祉士国家資格がある場合は在留資格「介護」が対象。資格がない場合は技能実習または特定技能の試験合格ルート。専門家（行政書士）に相談のこと。 |
| kaigo-002 | "技能実習で介護の仕事を5年しました。在留資格『介護』に変更できますか？" | State: 技能実習「介護」の修了だけでは在留資格「介護」への変更はできない。在留資格「介護」は介護福祉士の国家資格（試験合格または養成校修了）が前提。技能実習2号修了後は特定技能「介護」1号への移行が可能（試験一部免除; G46参照）。介護福祉士を目指す場合は資格試験の受験資格を確認のこと。 |
| kaigo-003 | "介護福祉士の資格を取りました。在留資格を変更できますか？" | State: 介護福祉士の国家資格を取得した場合，在留資格「介護」への変更申請が可能。在留資格変更許可申請（ISAへ）が必要。日本人と同等以上の報酬での雇用契約等の条件を満たす必要がある。具体的な申請書類・要件は行政書士に確認を。 |

## Source Notes

- 在留資格「介護」の活動定義・取得要件: ISA「在留資格『介護』」(nursing.html) — 介護福祉士国家資格が前提; 在留期間（5年・3年・1年・3か月）.
- 特定技能「介護」の試験要件: ISA 特定技能「介護」ページ; G63 cross-ref（3種類の試験確認済み）.
- 技能実習2号修了者の特定技能移行: G46 cross-ref（日本語試験全分野免除・技能試験は関連分野免除）.
- 4つの枠組みの整理: ISA nursing.html + 技能実習・特定技能各ページからの構造的整理.
- Cross-ref G46 (技能実習→特定技能試験免除), G63 (特定技能「介護」試験3種類), G33 (特定技能1号/2号の境界), G73 (特定技能転職条件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 015 G85. Key sources: ISA nursing.html (在留資格「介護」); ISA 特定技能「介護」ページ; G46/G63/G33 cross-refs. Core facts: 介護分野は4枠組み（EPA・技能実習・特定技能・在留資格「介護」）; 在留資格「介護」は介護福祉士国家資格が前提; 技能実習2号修了→特定技能1号（試験一部免除）; 特定技能「介護」は2号も設定（上限なし）. needs_domain P1: 介護日本語評価試験の免除範囲; 特定技能「介護」2号の試験条件. Cross-ref G46, G63, G33, G73.
