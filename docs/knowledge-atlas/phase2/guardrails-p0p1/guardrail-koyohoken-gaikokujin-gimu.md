---
asset_id: guardrail-koyohoken-gaikokujin-gimu
title: 雇用保険・労働保険の外国人加入義務 — 国籍・在留資格問わず雇用形態で強制加入；外国人雇用状況届出も義務
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 012"
---

## What This Document Is

This guardrail prevents errors about labor insurance (雇用保険 and 労災保険) obligations for foreign workers, and the 外国人雇用状況届出 obligation for employers. Key errors to block:

1. **"外国人は雇用保険に加入しなくていい。"** — incorrect. 雇用保険の加入義務は国籍・在留資格問わず，雇用形態（週所定労働時間20時間以上・31日以上の雇用見込み）で決まる。
2. **"短期間の在留ビザだから，労災保険は関係ない。"** — incorrect. 労災保険（労働者災害補償保険）は，すべての労働者に自動適用される。外国人であっても，就労中の労働災害には日本の労災保険が適用される。
3. **"外国人を雇用しても届出義務はない。"** — incorrect. 雇用主は外国人労働者を雇用したとき・離職したとき，ハローワーク（公共職業安定所）への**外国人雇用状況の届出**が義務付けられている（雇用対策法 第28条）。
4. **"外国人労働者が退職しても，日本で雇用保険の給付は受けられない。"** — partially incorrect. 要件を満たす外国人労働者は，離職後に雇用保険の給付（失業給付等）を受けられる（出国後一定期間内の申請も可能）。

## Trigger

Use this card when the user says:

- "外国人労働者も雇用保険に入る必要がありますか？"
- "短期の在留資格（特定活動・特定技能）でも労災保険は使えますか？"
- "外国人を採用したとき，ハローワークへの届出は必要ですか？"
- "退職した外国人が雇用保険の給付をもらえますか？"
- "外国人だから雇用保険は任意加入ですよね？"
- any pattern treating labor insurance as optional for foreign workers, or treating nationality/visa type as an exemption basis.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| koyohoken-law | L1 | 雇用保険法 第4条・第6条 | https://laws.e-gov.go.jp/law/349AC0000000116 | 2026-05-15 | 被保険者定義: 週所定20時間以上・31日以上雇用見込みの労働者（一部除外を除く）. 国籍・在留資格による除外規定なし（ただし短期滞在・外交・公用在留者等は別途). |
| rosai-law | L1 | 労働者災害補償保険法 第3条 | https://laws.e-gov.go.jp/law/322AC0000000050 | 2026-05-15 | 適用事業の労働者はすべて対象（外国人含む）. 国籍・在留資格による除外なし. |
| koyotaisaku-28jo | L1 | 雇用対策法 第28条（現: 労働施策総合推進法 第28条） | https://laws.e-gov.go.jp/law/341AC0000000132 | 2026-05-15 | 外国人を雇用する事業主: 雇入れ・離職時にハローワークへ外国人雇用状況の届出義務. |
| mhlw-gaikokujin | L4 | 厚生労働省「外国人労働者の雇用管理の改善等に関して事業主が適切に対処するための指針」 | https://www.mhlw.go.jp/content/001215081.pdf | 2026-05-15 | 外国人労働者の雇用保険・労災保険の適用; 外国人雇用状況届出の義務内容. |
| g58-crossref | guardrail | guardrail-shakai-hoken-gaikokujin-gimu (G58) | internal | 2026-05-15 | G58: 健康保険・厚生年金の外国人加入義務（社会保険）. このcard は雇用保険・労災保険（労働保険）を補完。 |

## Official Rule Or Source Fact

**二種類の「保険」の区別:**

| 保険 | 種類 | 管轄 | 外国人への適用 |
|---|---|---|---|
| 健康保険・厚生年金 | **社会保険** | 厚生労働省・日本年金機構 | G58参照 |
| 雇用保険 | **労働保険** | ハローワーク（公共職業安定所）| 本カードで解説 |
| 労働者災害補償保険（労災保険）| **労働保険** | 労働基準監督署 | 本カードで解説 |

**雇用保険（失業給付・育休給付等）:**

加入要件（以下の**両方**を満たす労働者）:
1. 週の所定労働時間が**20時間以上**であること
2. 同一の雇用主に継続して**31日以上**雇用される見込みがあること

国籍・在留資格による原則的除外はない。ただし以下は適用除外（雇用保険法第6条）:
- 65歳以上で新たに雇用される者（高年齢被保険者として別扱い）
- 短期雇用被保険者に該当する者
- **在留資格「短期滞在」の者**: 就労自体が認められていないため（G59 cross-ref）
- **外交・公用** の在留資格者

特定技能・技人国・技能実習等の就労系在留資格保有者 → 雇用保険の加入対象（要件を満たせば）

**雇用保険の給付と外国人:**
- 離職後の失業給付（基本手当）: 外国人も受給可能
- 育児休業給付・教育訓練給付等: 外国人も対象
- 出国後の申請: 帰国した外国人が一定の条件下で給付を受けられる場合あり

**労働者災害補償保険（労災保険）:**

> 「労働者災害補償保険は，業務上の事由又は通勤による労働者の負傷・疾病・障害・死亡等に対して迅速かつ公正な保護をするための保険です。」

- 適用: すべての労働者（国籍・在留資格問わず）
- 外国人労働者が就労中に負傷・疾病 → 日本の労災保険が適用される
- 不法就労者にも適用: 労災保険は不法就労であっても、実際に就労中の事故については適用される（ただし不法就労自体の問題は別途）
- 事業主は一人でも労働者を雇用すれば労災保険の加入義務がある

**外国人雇用状況の届出（雇用対策法 現: 労働施策総合推進法 第28条）:**

> 「事業主は，その雇用する外国人について，離職の際にその者が外国人であることその他厚生労働省令で定める事項を公共職業安定所長に届け出なければならない。」

届出の内容:
- 雇入れ時: 氏名・在留資格・在留期間・生年月日・性別・国籍・雇用保険被保険者番号（加入している場合）
- 離職時: 同上の情報
- 届出先: ハローワーク（公共職業安定所）
- 届出方法: ハローワークへの届出書、またはハローワークインターネットサービス

**罰則（事業主の不届出）:**
雇用状況届出義務に違反した場合: 30万円以下の罰金（雇用対策法 第37条）

**雇用保険加入義務と在留資格の組み合わせ例:**

| 在留資格 | 雇用形態 | 雇用保険 |
|---|---|---|
| 技術・人文知識・国際業務 | 正社員（週40時間） | 加入義務あり |
| 技術・人文知識・国際業務 | 週15時間パート | 加入義務なし（20時間未満）|
| 特定技能1号 | 正社員（週40時間） | 加入義務あり |
| 技能実習 | 通常の実習計画に基づく就労 | 加入義務あり（20時間以上の場合）|
| 短期滞在 | （就労自体が不可） | 適用なし |
| 永住者 | 正社員（週40時間） | 加入義務あり |

## Safe Answer Behavior

- When asked if foreign workers need 雇用保険: confirm YES for those meeting the 20hr/31-day threshold; nationality and visa type are not exemption bases (except 短期滞在 which can't work anyway).
- When asked about 労災保険: confirm it applies to all workers in covered businesses; accident during work = claim available regardless of nationality.
- When an employer asks about 届出: confirm the 外国人雇用状況届出 to ハローワーク is mandatory for both hire and separation events.
- When a foreign worker asks about receiving benefits after leaving: confirm eligibility exists; route to ハローワーク for specific assessment.

## Must Say

- 日本の雇用保険への加入義務は，国籍・在留資格の種類に関わらず，雇用形態（週所定20時間以上・31日以上）によって決まる。就労系在留資格（技人国・特定技能・永住等）を持つ外国人労働者は，要件を満たせば雇用保険に加入する義務がある。
- 労働者災害補償保険（労災保険）は，すべての労働者（外国人含む）に適用される。国籍や在留資格による除外はない。就労中の業務災害・通勤災害には労災保険が使える。
- 外国人を雇用している事業主は，雇入れ時・離職時にハローワークへ「外国人雇用状況の届出」を行う義務がある（労働施策総合推進法第28条）。不届出には30万円以下の罰金。

## Must Not Say

- 「外国人は雇用保険に入らなくていい。」
- 「在留ビザの種類によって労災保険の適用が変わる。」（適用は全労働者）
- 「外国人を雇用しても届出義務はない。」（雇用状況届出は義務）
- 「外国人は短期滞在ビザでも雇用保険に加入できる。」（短期滞在での就労自体が不法就労 — G59 cross-ref）

## Deep Water Triggers

- 特定技能1号の外国人労働者が業務中に負傷した — 労災保険の申請ができるか？
- 技能実習生が実習先を変更したとき，雇用保険の被保険者番号はどうなるか？
- 外国人労働者が帰国後に失業給付を申請したい — 申請はどこにするか？
- 雇用主が雇用保険の加入手続きをしていない状態で外国人労働者が退職した — どうすればいいか？
- 短期滞在ビザで来日し実際に働いていた外国人が業務中に負傷した — 労災保険は適用されるか？（不法就労であっても労災は適用される可能性がある）

## User Next Actions

This is not user-facing copy. For answer routing:

- For foreign workers not enrolled in 雇用保険 by their employer: route to ハローワーク for inquiry; employer may be in violation.
- For foreign workers injured at work: route to 労働基準監督署 for 労災保険 claim; language support may be available through ハローワーク.
- For employers who have not filed 外国人雇用状況届出: advise to file promptly; late filing may be available; route to ハローワーク.
- For those asking about receiving benefits after returning home: confirm the option exists; timing constraints apply; route to ハローワーク for specific assessment.

## Unknown Fields

- The exact timeline for 雇用保険 benefit claims after departure from Japan (how many months after離職 can claims be filed from abroad?).
- Whether 技能実習 workers in the old system (pre-2027) have the same 雇用保険 treatment as 特定技能 workers.
- The specific documentation required for 外国人雇用状況届出 in online submission.

## Needs Domain Flags

- needs_domain (P1): for 技能実習 workers — are there any specific provisions in the 技能実習 law or related regulations that modify the 雇用保険 rules compared to ordinary employees?
- needs_domain (P1): for the "not legally employed on 短期滞在 but injured at work" scenario — does 労災保険 apply even when the employment relationship itself was unlawful? (General labor law principle suggests yes, but specific ISA/MHLW confirmation needed.)

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| rodo-001 | "外国人従業員も雇用保険に加入させないといけませんか？" | State: YES — 国籍問わず週所定20時間以上・31日以上雇用見込みであれば加入義務あり。就労系在留資格（技人国・特定技能等）の外国人も対象。 |
| rodo-002 | "外国人が仕事中に怪我をしました。労災保険は使えますか？" | State: YES — 労災保険はすべての労働者に適用。外国人労働者も業務上の負傷は労災保険の対象。労働基準監督署に申請。 |
| rodo-003 | "外国人を採用しましたが，ハローワークへの届出は必要ですか？" | State: YES — 雇入れ時・離職時ともにハローワークへ外国人雇用状況届出が義務（労働施策総合推進法第28条）。不届出=30万円以下の罰金。 |

## Source Notes

- 雇用保険加入要件（週20時間以上・31日以上）confirmed from 雇用保険法第4条・第6条（e-Gov法令検索）.
- 労災保険の全労働者適用 confirmed from 労働者災害補償保険法第3条.
- 外国人雇用状況届出義務 confirmed from 労働施策総合推進法（旧雇用対策法）第28条.
- 罰則（30万円以下罰金）from 労働施策総合推進法 第37条（一般知識; e-Gov法令検索でも確認可能）.
- Cross-ref G58 (社会保険の外国人加入義務 — 健康保険・厚生年金), G59 (短期滞在での就労禁止).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 012 G67. Key sources: 雇用保険法第4条・第6条; 労災保険法第3条; 労働施策総合推進法第28条（すべてe-Gov法令検索). Core facts: 雇用保険=国籍問わず雇用形態依存; 労災=全労働者適用; 外国人雇用状況届出義務あり（ハローワーク）; 不届出=30万円罰金. Cross-ref G58, G59.
