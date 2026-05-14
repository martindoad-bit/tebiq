---
asset_id: guardrail-hsp-points-miscalculation
title: 高度人材ポイント計算の誤信パターン — Income Allowances, Overtime, And Bonuses Have Different Rules
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 005"
---

## What This Document Is

This guardrail prevents answers from approving incorrect 高度人材ポイント制 (HSP points) calculations or confirming point eligibility without knowing the correct income and component definitions. Common patterns:

1. Including overtime pay, commuting allowance, or housing allowance in 年収 — these are excluded.
2. Treating self-assessed points as final without noting that all points must be documented and verified.
3. Confusing the 70-point threshold (HSP1号 approval) with the 80-point threshold (1-year PR shortcut).
4. Assuming all overseas income counts regardless of context.
5. Not knowing that points must be maintained at 70+ at each renewal, not just at initial approval.

## Trigger

Use this card when the user says:

- "残業代も年収に含めてポイントを計算していい？"
- "住宅手当・通勤手当も年収に入る？"
- "ポイントは自分で計算して自己申告すればいい？"
- "70点あれば永住が取れる？"
- "80点と70点，何が違う？"
- "海外の給料もポイントの年収に含まれる？"
- "ポイント70点なら在留更新は保証される？"
- any pattern where the user is calculating or assuming HSP points without understanding the inclusion/exclusion rules or threshold distinctions.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-hsp-qa | L4 | 出入国在留管理庁「高度人材ポイント制Ｑ＆Ａ」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_qa.html | 2026-05-15 | Key confirmed quotes: (1) 含まれる報酬: 基本給、勤勉手当、調整手当、賞与（ボーナス）; (2) 含まれない: 通勤手当・住宅手当（実費弁償性の手当）、超過勤務手当（入国時点では不確か）、株式運用利益; (3) 海外報酬: 転勤で日本に受け入れられる場合のみ計算対象（立証要）; (4) 閾値: 合計70点以上でHSP1号認定; 70点+3年在留で永住申請; 80点+1年在留で永住申請; (5) 更新時: 更新時には70点以上が必須. |
| isa-hsp-system | L4 | 出入国在留管理庁「高度人材ポイント制とは？」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html | 2026-05-15 | Confirms three activity categories: 高度学術研究活動（イ）, 高度専門・技術活動（ロ）, 高度経営・管理活動（ハ）. 70-point threshold for 高度専門職1号 recognition and preferential treatment. |
| isa-hsp-eval | L4 | 出入国在留管理庁「ポイント評価の仕組みは？」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_evaluate_index.html | 2026-05-15 | Each point category (学歴, 職歴, 年収, 年齢, etc.) requires documentary evidence. Points are not self-declared without verification. |

## Official Rule Or Source Fact

**Confirmed from ISA Q&A (high confidence):**

**年収に含まれる報酬（Included in annual income for points):**
> 「報酬の定義は『一定の役務の給付の対価として与えられる反対給付』とされており、基本給のほか勤勉手当や調整手当が含まれます。」
- 基本給 (base salary) ✓
- 勤勉手当, 調整手当 (performance/adjustment allowances) ✓
- 賞与 (bonuses) ✓
- 海外報酬（転勤による日本企業への受入の場合のみ、立証が必要）✓（条件付き）

**年収に含まれない（Excluded from annual income):**
> 「通勤手当や住宅手当などの実費弁償性の手当は対象外です。超過勤務手当も入国時点では不確かであるため含まれません。」
- 通勤手当 (commuting allowance) ✗
- 住宅手当 (housing allowance) ✗
- 超過勤務手当 / 残業代 (overtime pay) ✗
- 株式運用利益 (investment income) ✗

**Thresholds — NOT interchangeable:**
> 「合計70点以上で『高度専門職1号』の認定を受けます。」
> 「3年以上在留し、ポイント70点以上を維持した場合、『高度専門職2号』に変更でき、在留期限が無期限に拡大されます。」
> 「永住申請の場合、80点以上で1年、70点以上で3年の在留実績が必要です。」

**Three threshold/pathway distinctions:**
| Threshold | Pathway |
|-----------|---------|
| 70+ points | HSP1号 grant; standard path to HSP2号 after 3 years |
| 70+ points + 3 years residence | PR application via HSP shortcut |
| 80+ points + 1 year residence | PR application via accelerated HSP shortcut |

**Points must be maintained at renewal:**
> 「入国時に70点以上あれば、その後の在留中にポイントが低下しても、直ちに在留が認められなくなるわけではありません。ただし在留期間更新時には70点以上が必須となります。」

**Documentary evidence required:**
All claimed points must be supported by documentary evidence. ISA does not accept self-declared points without supporting documents (学位証明書, 雇用確認書, 所得証明 etc.).

## Safe Answer Behavior

- When a user asks to include overtime or housing allowances in their 年収 calculation: state clearly these are excluded per official ISA definition.
- When a user assumes 70 points = PR eligibility now: clarify the 3-year or 1-year (at 80+ points) residence requirement in addition to the point threshold.
- When a user asks about overseas income: confirm this counts ONLY if the person is being transferred to a Japanese company (転勤); freelance/remote-foreign-employer income requires domain clarification.
- When a user says they calculated their points and got 70+: note that points must be verified by ISA with supporting documents; self-calculation is a starting estimate only.
- When a user's income includes substantial bonuses: confirm bonuses (賞与) are included; note that including bonuses means annual income will vary year to year.

## Must Say

- 高度人材ポイントの年収には，基本給・勤勉手当・調整手当・賞与は含まれるが，通勤手当・住宅手当・残業代は含まれない。
- ポイントの申告には，学位証明書・所得証明書・雇用契約書等の証明書類が必要。自己申告だけでは認定されない。
- 70点以上 = 高度専門職1号の認定。永住（PR）への早期申請には，70点+3年在留，または80点+1年在留が必要。70点あれば即座に永住できるわけではない。
- 更新時には，認定時だけでなく更新申請時点でも70点以上を維持していることが要件。
- 海外企業からの報酬は，転勤（日本企業への受入）の場合のみ計算対象となる（立証が必要）。

## Must Not Say

- 「残業代も年収に含めていい，たくさん働いたぶんだけポイントが上がる。」
- 「住宅手当や通勤手当も年収としてカウントできる。」
- 「70点あれば永住申請できる。」（在留年数要件を別途充足する必要）
- 「ポイントは自己計算が正しければ，それで申請できる。」（書類証明が必要）
- 「一度70点でHSPを取れたら，更新もずっと通る。」（更新時再評価）

## Deep Water Triggers

- User's income is partially from stock options or equity grants that vested during employment.
- User's overseas employer pays part of salary directly to a foreign bank account; they want to include this in Japan-side 年収.
- User received a one-time large special bonus last year but income is lower in the application year.
- User's points dropped below 70 during the residence period and they are approaching renewal.
- User is counting a secondary part-time income from a different employer in their points calculation.
- User is close to the 70-point threshold and wants TEBIQ to "help maximize" points — this would require professional advice, not TEBIQ calculation.

## User Next Actions

This is not user-facing copy. For answer routing:

- For income component questions: explain the inclusion/exclusion rules and route to official ISA Q&A or 行政書士 for exact amount calculation.
- For threshold clarification: clearly explain the 70/80-point and 1-year/3-year distinction; do not allow "70 = PR" as a shorthand.
- For self-calculation review: advise that ISA verification requires documents for every claimed point; route to 行政書士 for document preparation.
- For overseas income: confirm transfer context is required; route to professional for non-transfer foreign income scenarios.

## Unknown Fields

- The exact point table values for each category (学歴, 職歴, 年収, 年齢, institutional bonus points) — the agent confirmed these exist but the specific values came from secondary sources; official table confirmation needed from the ISA point-evaluation page directly.
- Whether equity/stock option income is categorically excluded or whether vested-and-paid options count as 賞与.
- How ISA handles years where income varied significantly (e.g., high bonus one year, low the next) in annual income calculation.

## Needs Domain Flags

- needs_domain (P1): confirm the specific point values for each category (学歴, 職歴, 年収 brackets, 年齢) from a direct ISA source read — the table values used by practitioners need official page confirmation.
- needs_domain (P1): how is annual income defined for applications where the applicant has a highly variable compensation structure (RSU, bonuses, multi-employer income)?
- needs_domain (P1): can income from a Japanese subsidiary count if the parent company is overseas and the employment contract is with the overseas entity?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp-001 | "残業代を含めると年収が上がってポイントが増えますか？" | Must state: overtime (超過勤務手当) is excluded from the income definition per ISA Q&A; do not include it. |
| hsp-002 | "ポイントが72点あります，永住申請できますか？" | Must ask: how long have you held 高度専門職 status? 70 points + 3 years required (or 80 points + 1 year for accelerated route). 70 points alone is not sufficient. |
| hsp-003 | "ポイントは自分で計算したら70点でした，このまま申請できますか？" | Must note: self-calculation is a starting estimate; ISA requires documentary evidence for all claimed points; prepare documents for each category before applying. |

## Source Notes

- The income inclusion/exclusion rules (基本給 in; 通勤手当・残業代 out) are directly quoted from the ISA Q&A page — high confidence.
- The threshold table (70/80 points, 1/3 years for PR) is from the ISA Q&A — high confidence.
- The specific point values per education/experience bracket were sourced through secondary sources in this session and are NOT directly from the ISA point-evaluation page text. They need direct ISA page confirmation before runtime use. This is why needs_domain items exist for point values.
- The ISA Q&A URL is confirmed: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_qa.html

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 005 G34. Key source: ISA HSP Q&A (income definitions, thresholds). Income inclusion/exclusion rules and PR shortcut thresholds are confirmed. Specific point bracket values marked needs_domain pending direct ISA evaluation-page confirmation.
