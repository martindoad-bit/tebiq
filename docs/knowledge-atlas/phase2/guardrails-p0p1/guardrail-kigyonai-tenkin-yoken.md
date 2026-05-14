---
asset_id: guardrail-kigyonai-tenkin-yoken
title: 在留資格「企業内転勤」の要件と技人国との違い — 企業内転勤は同一企業グループからの転勤が前提；1年以上の海外勤務要件；技人国と異なり転籍・雇用主変更で失効；在日子会社への配属でも本社との雇用関係維持が重要
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

This guardrail prevents errors about the requirements for the 企業内転勤 (intra-company transferee) residence status and how it differs from 技人国 (Engineer/Specialist in Humanities/International Services). Key errors to block:

1. **"企業内転勤ビザは，外国から日本の会社に転職するためのビザ。"** — incorrect. 企業内転勤は「転職」ではなく「転勤」のための在留資格。同一企業グループ（親会社・子会社・関連会社）の海外拠点から日本拠点への異動が前提であり，外国の別企業から日本企業への「転職」には使えない。
2. **"企業内転勤と技人国は似たような在留資格で，どちらでも同じ業務ができる。"** — partially incorrect. 企業内転勤と技人国は，許可される活動の範囲はほぼ同様（専門的・技術的業務）だが，適用要件が大きく異なる。企業内転勤は同一企業グループからの転勤・1年以上の海外勤務歴が必須だが，技人国は学歴・実務経験要件が必要（転職自由）。また，企業内転勤は転籍・雇用主変更で原則失効する点が技人国と大きく異なる。
3. **"企業内転勤の在留資格で，在日している間に別の会社に転職できる。"** — incorrect. 企業内転勤の在留資格は，特定の企業グループ内での転勤を前提とするため，グループ外の別会社に転籍・転職する場合は，在留資格変更（技人国等への変更）が必要。グループ外への転職後も企業内転勤のまま就労することは在留資格外活動に該当する可能性がある。
4. **"企業内転勤は，日本子会社が雇用主なので，外国本社との雇用関係は関係ない。"** — partially incorrect. 企業内転勤の本質は，外国の企業グループ内での転勤であり，外国拠点との雇用関係・帰属関係が審査で確認される。実務上，日本子会社が雇用主となるケースでも，本社からの転勤の実態（出向等）が審査される。

## Trigger

Use this card when the user says:

- "企業内転勤ビザとは何ですか？どうやって取りますか？"
- "技人国と企業内転勤の違いは何ですか？"
- "外資系企業の社員として日本に来ます。企業内転勤ビザが必要ですか？"
- "企業内転勤ビザのまま，日本で転職できますか？"
- "1年未満しか海外本社で働いていませんが，企業内転勤ビザは取れますか？"
- any pattern conflating 企業内転勤 with 技人国, or treating it as a general work visa.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kigyonai-tenkin | L4 | 出入国在留管理庁「在留資格『企業内転勤』」 | https://www.moj.go.jp/isa/applications/status/intratransfer.html | 2026-05-15 | 企業内転勤の活動定義; 上陸基準省令の要件（1年以上勤務・同一企業グループ・業務内容・報酬）; 技人国との比較. |
| nyukan-ho-beppyo | L4 | 入管法別表第一の二（企業内転勤の活動定義）| https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 企業内転勤の法的定義（「本邦に本店，支店その他の事業所のある公私の機関の外国にある事業所に勤務していた者」）. |
| g10-crossref | guardrail | guardrail-gijinkoku-yoken (G10) | internal | 2026-05-15 | G10: 技人国の要件（学歴・実務経験・業務内容・報酬）; 技人国と企業内転勤の比較の基礎. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | G47: 技人国・企業内転勤での経営管理活動の在留資格外活動リスク. |

## Official Rule Or Source Fact

**在留資格「企業内転勤」の法的定義（入管法別表第一の二）:**

> 本邦に本店，支店その他の事業所のある公私の機関の外国にある事業所に勤務していた者が，当該事業所から本邦にある事業所に転勤して当該事業所において行うこととなる技術・知識・感受性を必要とする業務

**上陸基準省令「企業内転勤」の主要件:**

| 要件 | 内容 |
|---|---|
| **転勤元** | 本邦に本店・支店・事業所のある企業グループの**外国にある事業所** |
| **在籍期間** | 転勤直前に当該外国事業所に**継続して1年以上**勤務していること |
| **業務内容** | 技術・人文知識・国際業務に係る専門的業務（技人国と同様の職種）|
| **報酬** | 日本人が同種業務に従事する場合の通常の報酬以上 |

⚠️ **1年以上の海外勤務が必須**: 転勤直前に1年以上当該外国事業所に継続して勤務していない場合，企業内転勤の要件を満たさない。

**技人国と企業内転勤の比較:**

| 比較項目 | 技人国 | 企業内転勤 |
|---|---|---|
| **適用対象** | 専門的・技術的業務全般（転職者含む）| 同一企業グループの外国事業所からの転勤者のみ |
| **勤務先変更** | 転職自由（在留資格変更届出で対応）| グループ外転籍は在留資格変更が必要 |
| **学歴・実務経験要件** | 必要（大学卒業・10年以上の実務経験等）| 不要（1年以上の海外勤務歴が代替）|
| **1年以上の海外勤務** | 不要 | 必須（転勤直前に継続して1年以上）|
| **企業グループ要件** | 不要 | 必須（本邦事業所と同一企業グループ）|
| **在留期間** | 5年・3年・1年・3か月 | 5年・3年・1年・3か月（同様）|
| **転籍後の在留資格** | 変更届出のみで継続（同種業務の場合）| グループ外転籍=在留資格変更許可申請が必要 |

**企業グループの範囲（「同一企業グループ」の解釈）:**

- 外国本社と日本子会社（資本関係・支配関係あり）
- グループ内の支店・兄弟会社
- ⚠️ 資本・支配関係のない提携先・業務委託先は原則として「企業グループ」に含まれない

**転籍・雇用主変更後の在留資格:**

企業内転勤の在留資格を持つ者が，同一企業グループ外に転籍・転職する場合:
- **在留資格変更許可申請（技人国等）**が必要
- 転職後に企業内転勤のまま新雇用主のもとで就労することは**在留資格外活動**に該当する可能性

企業内転勤→技人国への変更時の注意:
- 技人国の学歴・実務経験要件（大学卒業または10年以上の実務経験等）を満たすことが必要
- 業務内容が技人国が許可する活動範囲内であることの確認も必要

**海外本社の社員証・給与・管理関係の維持:**

企業内転勤の審査では，外国事業所との雇用・帰属関係が確認される。実務上，日本側法人が雇用主となる場合でも:
- 外国本社からの出向・転勤の辞令
- 外国本社との雇用契約の継続（または日本法人への移転の記録）
- 企業グループ内の組織図
が審査書類として求められるケースがある。

## Safe Answer Behavior

- When asked about 企業内転勤 requirements: clearly state the mandatory 1-year prior employment at the foreign entity, and the same corporate group requirement.
- When asked about the difference from 技人国: highlight that 企業内転勤 doesn't require a degree, but does require the group relationship and 1-year prior employment; note that 転籍 is the key operational difference.
- When asked about changing jobs under 企業内転勤: clearly state that leaving the corporate group requires a status change to 技人国 or another status.
- When asked about which status to use for an overseas employee coming to Japan: confirm 企業内転勤 for intra-group transfers; route to 技人国 for external hires.

## Must Say

- 在留資格「企業内転勤」は，本邦に事業所のある企業グループの**外国事業所から日本事業所への転勤**のための在留資格であり，外国の別会社からの「転職」には使えない。転勤直前に外国事業所に継続して**1年以上**勤務していることが必須要件。
- 企業内転勤と技人国の最大の違いは，**転籍・雇用主変更の影響**。技人国は転職しても届出で継続できるが，企業内転勤は同一企業グループ外に転籍・転職する場合，在留資格変更許可申請（技人国等への変更）が必要。変更前の就労は在留資格外活動のリスクがある。
- 企業内転勤の上陸基準省令要件: 同一企業グループの外国事業所に1年以上勤務 + 技術・人文知識・国際業務に係る業務 + 日本人同等以上の報酬。学歴・実務経験要件（技人国）は不要。

## Must Not Say

- 「企業内転勤ビザは，外国から日本の会社に転職するためのビザ。」（転職ではなく転勤; 同一企業グループ内のみ）
- 「企業内転勤と技人国は同じ。転職しても続けて使える。」（企業グループ外転籍は在留資格変更が必要）
- 「1年未満でも企業内転勤ビザを取れる。」（1年以上の継続勤務が必須要件）

## Deep Water Triggers

- 外国本社から日本子会社に転勤後，グループ内で別の日本法人に異動した — 再申請が必要か？
- 企業内転勤で日本に来たが，グループ内買収により所属グループが変わった — 在留資格に影響するか？
- 企業内転勤で日本に来た後，外国本社の事業が廃止された — 在留資格の扱いは？
- 企業内転勤の1年要件：外国事業所での育児休業・病気休業期間は「継続勤務」に含まれるか？
- 企業内転勤で来日した外国人が，日本法人の代表取締役に就任する — 経営管理ビザへの変更が必要か？（G47/G103参照）

## User Next Actions

This is not user-facing copy. For answer routing:

- For overseas employees coming to Japan: confirm 企業内転勤 if intra-group transfer with 1-year+ prior employment; route to 技人国 if external hire; recommend 行政書士 for application.
- For 企業内転勤 holders considering a job change: route to 在留資格変更（技人国）immediately; emphasize risk of working under 企業内転勤 after leaving the group.
- For companies sponsoring 企業内転勤 applications: route to 行政書士 for document preparation (group relationship evidence, employment history documentation).
- For cases where 企業内転勤 holder has management responsibilities: route to G47 (経営管理活動のリスク) and G103 (経営管理への変更手続き).

## Unknown Fields

- Whether a person who has been on secondment (出向) rather than formal transfer (転籍) from a foreign affiliate meets the "1 year at the foreign entity" requirement when the seconding entity and the receiving entity are both within the same group.
- The specific definition of "継続して" (continuously) — whether short interruptions in employment (e.g., brief sabbaticals) between the foreign and Japan assignments break the 1-year continuity requirement.

## Needs Domain Flags

- needs_domain (P1): What is ISA's operational standard for the "1年以上の継続勤務" requirement? Does it apply to the immediately preceding year, or can it include any 1-year period at the foreign entity?
- needs_domain (P1): When a foreign entity and its Japanese subsidiary are in the same corporate group but have separate legal personalities (e.g., indirect subsidiaries), is a "転勤" between them sufficient for 企業内転勤 purposes, or is a more direct corporate relationship required?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tenkin-001 | "外資系企業の東京オフィスに赴任します。企業内転勤ビザと技人国のどちらを使えばいいですか？" | State: 外資系企業（本社が海外）の日本拠点への転勤の場合，同一企業グループ内の転勤であれば「企業内転勤」が適用できる可能性がある。ただし，転勤直前に当該外国事業所に継続して1年以上勤務していることが必須要件。1年以上の海外勤務がない場合や，転職（グループ外）の場合は「技人国」への申請が必要。詳細な書類準備は行政書士に相談することを推奨。 |
| tenkin-002 | "企業内転勤で日本に来ました。今の会社を辞めて別の会社に転職したいのですが，そのまま働けますか？" | State: 企業内転勤の在留資格は，同一企業グループ内の転勤を前提とする。同一グループ外の別会社に転職する場合，在留資格「企業内転勤」のままでは就労できず，在留資格変更許可申請（技人国等への変更）が必要。変更許可前の就労は在留資格外活動（不法就労）に該当するリスクがある。転職活動中に行政書士に相談して，変更申請の準備を進めることを強く推奨する。 |
| tenkin-003 | "海外本社で8か月しか勤務していませんが，日本支社に転勤することになりました。企業内転勤ビザは取れますか？" | State: 在留資格「企業内転勤」の上陸基準省令は，転勤直前に当該外国事業所に継続して1年以上勤務していることを必須要件としている。8か月の勤務では，この要件を満たさない。この場合，「技人国」（学歴・実務経験要件を満たす場合）等の他の在留資格での申請を検討する必要がある。行政書士に相談することを推奨。 |

## Source Notes

- 企業内転勤の法的定義: 入管法別表第一の二（「外国にある事業所に勤務していた者が本邦にある事業所に転勤して行う専門的業務」）.
- 上陸基準省令の要件: ISA「在留資格『企業内転勤』」— 同一企業グループ + 1年以上の継続勤務 + 専門的業務 + 報酬要件.
- 技人国との比較: G10 cross-ref（技人国の要件; 学歴・実務経験要件; 転職後の届出のみで継続可）.
- 経営管理活動との境界: G47 cross-ref（企業内転勤者の経営管理活動への変更義務）; G103 cross-ref（会社設立と経営管理ビザ）.
- Cross-ref G10 (技人国の要件), G47 (経営管理活動への変更), G55 (副業・兼業), G103 (会社設立と経営管理).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 020 G109. Key sources: ISA「在留資格『企業内転勤』」（活動定義・上陸基準省令要件）; 入管法別表第一の二. Core facts: 企業内転勤=同一企業グループ内の外国→日本への転勤（転職不可）; 1年以上の継続海外勤務が必須; 学歴・実務経験不要（技人国との差）; グループ外転籍=在留資格変更が必要（変更前就労=資格外活動リスク）. needs_domain P1: 1年要件の計算方法（断続勤務の取り扱い）; 間接子会社間の「転勤」の取り扱い. Cross-ref G10, G47, G55, G103.
