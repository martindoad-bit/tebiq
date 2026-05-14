---
asset_id: guardrail-shakai-hoken-gaikokujin-gimu
title: 外国人の社会保険加入義務 — 在留資格・国籍に関係なく，雇用形態が要件を満たせば強制加入
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 010"
---

## What This Document Is

This guardrail prevents errors about social insurance (社会保険: 健康保険 and 厚生年金) obligations for foreign nationals working in Japan. Key errors to block:

1. **"外国人だから社会保険に加入しなくていい。"** — incorrect. Social insurance obligations apply regardless of nationality.
2. **"短期在留（特定活動等）だから社会保険は不要。"** — incorrect in most employment contexts. The obligation depends on employment structure, not visa category (with some narrow exceptions).
3. **"社会保険は本人が選べる（任意加入）。"** — incorrect for applicable workplaces. At qualifying workplaces (適用事業所), enrollment is mandatory (強制適用) for eligible workers.
4. **"フルタイムで働いているが，社会保険は一切払っていない。"** — this is a potential legal violation and a PR assessment risk (G4/G32 cross-ref).

## Trigger

Use this card when the user says:

- "外国人は健康保険や厚生年金に入らなくていいですか？"
- "在留ビザを持っているが，会社が社会保険に入れてくれない。"
- "フルタイムで働いているが，社会保険未加入の会社で働いている。"
- "短期在留だから社会保険に入る必要はないですよね？"
- "国民健康保険と健康保険はどう違いますか？外国人に関係ありますか？"
- any pattern treating social insurance as optional for foreign workers, or treating nationality/visa type as an exemption basis.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| kenpo-law | L1 | 健康保険法 第3条・第36条・第39条 | (法令) | 2026-05-15 | 適用事業所の強制適用被保険者: 適法に在留する外国人を含む。国籍・在留資格による除外なし（一部例外を除く）。 |
| nenkin-law | L1 | 厚生年金保険法 第6条・第9条 | (法令) | 2026-05-15 | 適用事業所の使用される者: 外国人も強制加入。国籍・在留資格による除外なし（一部例外を除く）。 |
| g32-crossref | guardrail | guardrail-shakai-hoken-mishukaku-risk (G32) | internal | 2026-05-15 | G32 established: 社会保険未加入 = 公的義務不履行 → PR 素行 assessment risk. This card provides the affirmative enrollment obligation. |
| g4-crossref | guardrail | guardrail-late-payment-not-erased (G4) | internal | 2026-05-15 | PR guideline: 公的義務の適正な履行 is a PR requirement. |
| mhlw-hoken | L4 | 厚生労働省「社会保険に関する総合情報」 | https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/hoken/index.html | 2026-05-15 | General overview of social insurance enrollment obligations including for foreign workers. |

## Official Rule Or Source Fact

**Basic rule — nationality/visa-type irrelevant for enrollment obligation:**

健康保険法 and 厚生年金保険法 impose enrollment obligations based on:
1. Whether the workplace qualifies as an 適用事業所 (applicable establishment)
2. Whether the worker meets the employment threshold (effectively full-time, or at least 3/4 of regular full-time hours)

The law does not provide a general exemption based on nationality or 在留資格 type.

**Two coverage systems — which applies to whom:**

| 状況 | 加入する社会保険 |
|---|---|
| 適用事業所でフルタイム（またはそれに近い時間）で働く | 健康保険 + 厚生年金（強制適用）|
| 自営業・フリーランス・アルバイトで適用要件を満たさない | 国民健康保険 + 国民年金（加入義務あり）|
| 短期滞在（90日以下，就労なし） | 一般的に適用外（ただし就労自体が不可）|

**Key rule for each system:**

**健康保険（雇用ベース）:**
- 適用事業所で働く場合: 強制適用（mandatory）
- 外国人であっても: 加入義務あり
- 例外: 特定の短期在留者で社会保障協定締結国の社会保険に加入している場合（社会保障協定による適用除外）

**国民健康保険（非雇用ベース）:**
- 健康保険に加入していない者で，3か月超在留する外国人: 市区町村の 国民健康保険 に加入義務あり
- 国籍・在留資格による除外はない（ただし短期滞在 = 90日以下の観光等は対象外）

**厚生年金（雇用ベース）:**
- 適用事業所で強制適用: 外国人も含む
- 社会保障協定（例：日独、日英、日韓、日仏、日米等）が締結されている国の者: 本国の年金制度に加入しているなら日本の厚生年金が免除される場合あり

**The employer's obligation:**
雇用主（会社）には、適用事業所として届出義務があり、条件を満たす労働者を社会保険に加入させる義務がある。外国人を雇用する場合も同じ。会社が加入させていない場合、会社が法律違反を犯している。

**Connection to 在留審査:**
G4/G32 cross-ref: 社会保険の未加入 or 未納 = 公的義務不履行 → PR 審査でのリスク要因。外国人本人の責任ではない場合（雇用主が未加入手続きをしていない）の扱いは needs_domain。

## Safe Answer Behavior

- When a foreign worker asks if they need social insurance: confirm the obligation applies regardless of nationality; depends on employment type at qualifying employer.
- When a worker says their company has not enrolled them: flag this as a potential employer-side legal violation; advise contacting 日本年金機構 or ハローワーク; route to professional.
- When asked about 国民健康保険: confirm the obligation for those not covered by 健康保険; applies to foreign nationals staying 3+ months.
- When asked about exemptions for short-term visa holders: confirm 短期滞在 (90 days, no work) is generally outside the employment-based system; but if they were working on a different visa, their visa type does not exempt them.
- Do not say "外国人は任意加入."

## Must Say

- 日本の社会保険（健康保険・厚生年金）への加入義務は，国籍や在留資格の種類に関わらず，雇用形態（適用事業所でのフルタイム相当勤務等）に基づいて適用される。外国人だから免除されるということはない。
- 健康保険・厚生年金に加入していない場合は，在留資格の種類にかかわらず，国民健康保険・国民年金への加入義務が生じる（3か月超在留の場合）。
- 社会保険の未加入は「公的義務の適正な履行」の問題となり，永住申請等の在留審査でマイナス評価を受けるリスクがある（G4・G32参照）。

## Must Not Say

- 「外国人は社会保険に加入しなくていい。」
- 「在留ビザの種類によって社会保険の加入義務が変わる。」（ビザの種類は主な判断軸ではない）
- 「社会保険は本人が選べる任意加入。」（適用事業所では強制）
- 「短期在留なら社会保険は関係ない。」（短期滞在で就労しないケースは別；就労している場合は適用）

## Deep Water Triggers

- Worker employed full-time for 2 years; company has not enrolled them in social insurance — who is liable?
- Worker from a country with a bilateral social security agreement (e.g., USA, Germany) working in Japan — can they skip Japanese 厚生年金?
- Part-time worker with multiple jobs — do they need social insurance at each employer?
- 特定技能 worker whose 登録支援機関 (RSO, G44) failed to provide support for social insurance enrollment.
- 技能実習 worker whose host employer did not enroll them in social insurance.

## User Next Actions

This is not user-facing copy. For answer routing:

- For workers whose employer is not enrolling them: route to 日本年金機構 (https://www.nenkin.go.jp) and 労働局; the employer may be in violation.
- For self-employed/freelancers: route to 市区町村 for 国民健康保険 enrollment and 日本年金機構 for 国民年金.
- For workers from bilateral-agreement countries: route to professional or Japan Pension Service for specific agreement confirmation.
- For PR applicants with past non-enrollment: route to professional for assessment of disclosure and remediation.

## Unknown Fields

- The exact list of countries with Japan bilateral social security agreements and which obligations are covered.
- Whether 技能実習 and 特定技能 workers have any specific social insurance provisions in their sector-level agreements.
- How ISA specifically handles cases where a foreign worker proves their employer (not them) was responsible for non-enrollment — does this affect the PR 素行 assessment?

## Needs Domain Flags

- needs_domain (P1): when a foreign worker's employer failed to enroll them in social insurance — and the worker themselves had no control — how does ISA assess this for 素行 evaluation in PR applications? (Cross-ref G32 dom-hoken-002.)
- needs_domain (P1): for 特定技能 workers whose RSO (G44) was responsible for social insurance enrollment support and failed — where does legal liability fall?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hoken-001 | "外国人は日本の社会保険に入らなくていいですか？" | State: nationality is NOT an exemption basis; employment structure determines the obligation; qualifying workers at applicable workplaces must enroll. |
| hoken-002 | "会社が社会保険に加入させてくれません。どうすればいいですか？" | State: employer may be violating the law; route to 日本年金機構 / 労働局; this is an employer-side compliance issue. |
| hoken-003 | "社会保険に入っていないと，在留審査に影響しますか？" | State: 公的義務の適正な履行 is a PR criterion (G4 cross-ref); non-enrollment may be treated as 義務不履行; route to professional for assessment. |

## Source Notes

- The nationality/visa-type irrelevance principle is structural from 健康保険法 and 厚生年金保険法 (L1 sources — law text, not ISA procedure pages).
- 国民健康保険 obligation for 3-month+ foreign residents is general knowledge from municipal and 厚生労働省 guidance.
- Social security agreement exemption availability is general knowledge; specific agreement details require domain confirmation.
- Cross-ref G4 (PR 公的義務 criterion), G32 (社会保険未加入 → PR risk), G44 (RSO support obligations).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 010 G58. Core facts: nationality/visa = NOT exemption basis; employment structure = determining factor; 健康保険法・厚生年金保険法 apply to all workers at applicable workplaces. Cross-ref G4, G32. Blocks: "外国人は任意加入", "ビザ種類で免除", "短期在留だから関係ない".
