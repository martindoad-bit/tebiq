---
asset_id: guardrail-kaigo-visa-gyomu-han
title: 在留資格「介護」の業務範囲と技能実習・特定技能との実務的違い — 在留資格「介護」=介護福祉士国家資格が前提；特定技能「介護」=技能試験+日本語試験（または実習修了）；技能実習「介護」=実習計画に基づく監理型研修；制度間の移行は自動ではなく在留資格変更が必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 023"
---

## What This Document Is

This guardrail prevents errors about the distinctions between the four care/nursing care pathways for foreign nationals in Japan. Key errors to block:

1. **"介護の仕事をする外国人はみんな『介護』ビザで働いている。"** — incorrect. 介護分野で働く外国人は，在留資格「介護」「技能実習（介護）」「特定技能1号（介護）」「特定技能2号（介護）」「EPA（経済連携協定）」等の複数の制度を通じて就労しており，それぞれ要件・活動範囲・期間が異なる。
2. **"技能実習「介護」を修了したら，自動的に在留資格『介護』に移行できる。"** — incorrect. 在留資格「介護」への移行には，介護福祉士国家資格の取得が前提。技能実習修了は「介護」資格への自動的な移行根拠にはならない（特定技能1号へのルートは別途ある）。
3. **"在留資格『介護』と特定技能1号（介護）は，同じ業務ができる。"** — partially incorrect. 両者の業務範囲は重複するが，「介護」資格保持者は介護福祉士として専門的業務を行う；特定技能1号（介護）は試験・実習修了に基づく制度であり，活動範囲は技術水準の確認された業務に限定される。また，「介護」資格は在留期間に上限がなく（更新可能），特定技能1号は通算5年上限（G77参照）。
4. **"EPAで来た介護候補者は，試験に合格しなくても日本に残れる。"** — incorrect. EPA介護福祉士候補者は，来日後一定期間内に介護福祉士国家試験に合格しなければ帰国しなければならない（試験不合格=在留期間延長不可が原則）。

## Trigger

Use this card when the user says:

- "介護の仕事をしたいのですが，どのビザが必要ですか？"
- "技能実習（介護）を終わったら，そのまま働き続けられますか？"
- "在留資格『介護』と特定技能の介護は何が違いますか？"
- "EPA介護候補者として来日しましたが，試験に失敗したらどうなりますか？"
- "介護福祉士の資格を取ったら，在留資格は変わりますか？"
- any pattern suggesting that care-sector immigration pathways are interchangeable or that transitions between them are automatic.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| kaigo-zairyu | L4 | 出入国在留管理庁「在留資格『介護』」 | https://www.moj.go.jp/isa/applications/status/nursing.html | 2026-05-15 | 在留資格「介護」の活動定義（介護福祉士の資格を有する者が介護福祉士として行う活動）; 要件. |
| kaigo-tokutei-gino | L4 | 出入国在留管理庁「特定技能1号・2号（介護）」 | https://www.moj.go.jp/isa/content/001335118.pdf | 2026-05-15 | 特定技能「介護」の要件（技能試験・日本語試験・実習修了免除）; 活動範囲; 通算5年上限（1号）. |
| kaigo-jisshu | L4 | 外国人技能実習機構「介護職種の技能実習」 | https://www.otit.go.jp/ | 2026-05-15 | 技能実習「介護」の実習計画; 監理団体; 移行ルート（特定技能・EPA）. |
| epa-kaigo | L4 | 厚生労働省「EPA（経済連携協定）に基づく外国人看護師・介護福祉士候補者の受入れ」 | https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/other22/index.html | 2026-05-15 | EPA候補者の受入れ国（インドネシア・フィリピン・ベトナム）; 国家試験受験義務; 試験不合格の場合の帰国義務. |
| kaigofukushishi-ho | L1 | 社会福祉士及び介護福祉士法（国家資格要件） | https://laws.e-gov.go.jp/law/362AC0000000030 | 2026-05-15 | 介護福祉士の国家資格要件（試験合格または養成施設修了等）; 在留資格「介護」の前提資格. |
| g85-kaigo | guardrail | guardrail-kaigo-visa-yoken (G85) | internal | 2026-05-15 | G85: 介護分野4枠組みの概要; 在留資格「介護」=介護福祉士国家資格前提; 特定技能2号も設定. |

## Official Rule Or Source Fact

**介護分野4つの主要制度の比較:**

| 制度 | 根拠在留資格 | 主な要件 | 在留期間上限 | 家族帯同 |
|---|---|---|---|---|
| 在留資格「介護」 | 介護 | 介護福祉士国家資格 | 上限なし（更新可） | 可（家族滞在） |
| 特定技能1号（介護） | 特定技能1号 | 介護技能評価試験+日本語試験（または技能実習2号修了） | 通算5年 | 不可 |
| 特定技能2号（介護） | 特定技能2号 | 特定技能2号介護試験 | 上限なし（更新可） | 可 |
| 技能実習（介護） | 技能実習 | 技能実習計画; 監理団体との契約 | 最大5年（1号〜3号） | 不可 |
| EPA介護福祉士候補者 | 特定活動 | 経済連携協定（対象国: インドネシア・フィリピン・ベトナム）; 国家試験受験義務 | 試験合格まで（合格後「介護」へ移行） | 限定的 |

**在留資格「介護」の主要事項:**

- **対象**: 介護福祉士の国家資格を有する者
- **活動範囲**: 介護福祉士として行う介護（身体介護・生活援助・介護指導等）
- **在留期間**: 5年・3年・1年・3か月（更新可; 上限なし）
- **家族帯同**: 配偶者・子への家族滞在資格付与が可能
- 介護福祉士国家資格の取得ルート: ①実務経験3年以上+実務者研修; ②養成施設卒業; ③EPA候補者ルート（試験合格）

**特定技能1号（介護）の主要事項:**

- **対象**: 介護技能評価試験合格+介護日本語評価試験合格+日本語試験合格（または技能実習2号修了→試験免除）
- **活動範囲**: 身体介護等（介護福祉士との業務範囲は類似; 指導業務は制限）
- **在留期間**: 通算5年上限（G77参照）
- **家族帯同**: 不可（特定技能1号の制度上の制限; G33参照）

**技能実習「介護」から特定技能への移行:**

- 技能実習「介護」2号を良好修了 → 特定技能1号（介護）への移行が可能（試験免除）
- ただし，技能実習修了が「在留資格『介護』」への自動移行根拠ではない（介護福祉士国家資格の取得が別途必要）

**EPA介護福祉士候補者:**

- 対象国: インドネシア・フィリピン・ベトナム（二国間協定に基づく）
- 来日後の在留資格: 特定活動（EPA候補者として在留）
- 国家試験受験義務: 一定期間内（通常3年〜4年）に介護福祉士国家試験に合格しなければ帰国
- 試験合格後: 在留資格「介護」に変更（介護福祉士として継続就労可能）
- 試験不合格: 原則として帰国義務（延長は認められない場合が多い）

**特定技能2号（介護）:**

- 2023年に追加（介護分野は特定技能2号設定分野として初期から含まれていなかったが，2023年の制度改正で追加）
- 要件: 特定技能2号介護試験（または技術水準の確認） + 日本語要件
- 在留期間上限なし（更新可）; 家族帯同可

## Safe Answer Behavior

- When asked about care work visa options: explain the four main pathways and their key distinctions (qualification requirement, period limit, family options).
- When asked about technical intern training to regular care visa: clearly state that completing 技能実習 does NOT automatically lead to 在留資格「介護」; the pathway is either 特定技能1号 or obtaining 介護福祉士 national license separately.
- When asked about EPA candidates who failed the exam: confirm the general principle of return obligation; route to 厚生労働省 or employer for specific case handling.
- When asked about the difference between 介護 visa and 特定技能: explain the key practical differences (national license vs. test, unlimited vs. 5-year cap, family presence).

## Must Say

- 在留資格「介護」は介護福祉士の国家資格が前提。技能実習「介護」修了は「介護」資格への自動移行根拠にならない。
- 特定技能1号（介護）は通算5年が上限（更新可能だが累積5年）; 在留資格「介護」には上限がない。
- EPA介護福祉士候補者は，一定期間内に国家試験に合格しなければ帰国義務が生じる。

## Must Not Say

- 「介護の仕事をするなら，全員が『介護』ビザを取る。」（複数の制度・在留資格が存在する）
- 「技能実習（介護）を終われば，そのまま『介護』ビザになる。」（国家資格が別途必要）
- 「特定技能1号（介護）と在留資格『介護』は同じ制度。」（要件・期間・家族帯同等で異なる）

## Deep Water Triggers

- 技能実習「介護」2号良好修了者が，特定技能1号（介護）と在留資格「介護」への2つのルートを同時に検討する場合の最適なキャリアパス
- 介護福祉士養成施設（日本の専門学校）を卒業した外国人が，国家試験前に働きながら勉強できるかどうかの在留資格の扱い（留学→介護への変更タイミング）
- 特定技能2号（介護）の試験・認定内容と，在留資格「介護」との実務上の差異（試験内容・難易度・受験機会）
- 介護福祉士国家資格を有する外国人が日本に新規入国する場合の在留資格「介護」取得手続き（COEルート）
- 国家試験の難易度・合格率と，外国人候補者の実際の試験合格状況（EPA候補者の合格率データ）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking which care pathway applies to them: route to 厚生労働省（介護分野）・ISA for pathway assessment based on their qualifications and background.
- For 技能実習修了者 seeking to continue working in care: route to 特定技能1号（試験経路 or 実習修了免除）for the most direct path; alert that 在留資格「介護」 requires 介護福祉士 national license separately.
- For EPA candidates who failed the exam: route to 厚生労働省 and their sponsoring employer; flag the return obligation and any discretionary extension options.
- For persons with 介護福祉士 qualification: route to 在留資格「介護」 application via COE (if overseas) or status change (if in Japan).

## Unknown Fields

- The specific conditions under which EPA candidates who have narrowly failed the national exam multiple times may be granted any extension.
- The exact exam content and operational requirements for 特定技能2号（介護）.

## Needs Domain Flags

- needs_domain (P1): What are the specific conditions under which EPA care candidate 特定活動 period may be extended beyond the standard exam preparation period for candidates who have failed the national exam multiple times? Is there an official 厚生労働省 standard?
- needs_domain (P1): For 介護福祉士 国家試験 — what is the current pass rate for foreign nationals (especially EPA candidates and former 技能実習 participants), and what support systems are officially available to support exam preparation?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kaigo-han-001 | "介護の仕事がしたい外国人は，どのビザが必要ですか？" | State: 介護分野で働く外国人には複数の制度がある: ①在留資格「介護」（介護福祉士国家資格が前提）; ②特定技能1号（介護）（試験合格または技能実習2号修了; 通算5年上限）; ③技能実習「介護」（監理団体との実習計画に基づく）; ④EPA（経済連携協定; インドネシア・フィリピン・ベトナムのみ）. 本人の資格・経験・出身国に応じてルートが異なる。 |
| kaigo-han-002 | "技能実習（介護）を修了しました。そのまま『介護』ビザに変われますか？" | State: 技能実習「介護」の修了は，在留資格「介護」への自動移行根拠にはならない。在留資格「介護」には介護福祉士の国家資格が必要。技能実習2号を良好修了した場合，特定技能1号（介護）への移行は試験免除で可能（通算5年上限）。介護福祉士国家資格を取得した場合は「介護」資格に変更申請ができる。 |
| kaigo-han-003 | "在留資格『介護』と特定技能（介護）は何が違いますか？" | State: 在留資格「介護」は介護福祉士の国家資格が前提で，在留期間の上限がなく，家族帯同が可能。特定技能1号（介護）は技能試験+日本語試験（または技能実習修了）が前提で，通算5年の上限があり，家族帯同は不可。特定技能2号（介護）は2023年に追加され，上限なし・家族帯同可だが，別途試験が必要。 |

## Source Notes

- 在留資格「介護」: ISA「在留資格『介護』」ページ（介護福祉士国家資格が前提; 在留期間上限なし）.
- 特定技能1号（介護）: ISA「特定技能1号・2号（介護）」PDF（介護技能評価試験+日本語試験+介護日本語評価試験; または技能実習2号修了; 通算5年上限）.
- 技能実習「介護」: OTIT（外国人技能実習機構）.
- EPA介護福祉士候補者: 厚生労働省（EPA介護・看護師候補者の受入れ; 試験合格義務）.
- 介護福祉士法: 社会福祉士及び介護福祉士法（国家資格要件）.
- Cross-ref G33（特定技能1号の家族帯同不可），G77（特定技能1号の通算5年上限），G85（介護分野4枠組みの概要），G107（技能実習の人権保護）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 023 G122. Complements G85 (which provides the overview). Key sources: ISA「在留資格『介護』」; ISA「特定技能（介護）」PDF; OTIT; 厚生労働省「EPA介護候補者」; 社会福祉士及び介護福祉士法. Core facts: 在留資格「介護」=介護福祉士国家資格必須（技能実習修了は自動移行根拠にならない）; 特定技能1号（介護）=通算5年上限・家族帯同不可; 特定技能2号（介護）=2023年追加・上限なし; EPA候補者=試験不合格→帰国義務. needs_domain P1: EPA候補者の試験失敗後の延長条件; 介護福祉士国家試験の外国人合格率・支援. Cross-ref G33, G77, G85, G107.
