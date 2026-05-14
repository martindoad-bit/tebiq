---
asset_id: guardrail-koshin-henkou-shinsa-kijun
title: 在留更新・変更審査基準 — Renewal/Change Is NOT Automatic; Ministerial Discretion Even If All Conditions Met
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

This guardrail prevents answers from treating renewal and status-change permission as automatic once document requirements are satisfied. ISA's official guideline explicitly states that even when all stated conditions are met, approval is not guaranteed — the Minister of Justice exercises free discretion (自由な裁量) based on comprehensive evaluation.

Key errors to block:
- "書類さえ揃えれば更新は通る。"
- "前回許可されたから今回も大丈夫。"
- "条件を全部満たしているから，否定される理由がない。"
- Treating renewal as a right rather than a discretionary grant.
- Failing to disclose 素行（conduct）, 生計（livelihood）, or 活動（activity）issues because they assume documents are the only thing checked.

## Trigger

Use this card when the user says:

- "書類が全部揃っていれば更新できますか？"
- "前回問題なく更新できたから，今回も大丈夫？"
- "条件を全部満たしているのに不許可になることがある？"
- "更新は必ず通りますよね？"
- "在留期間更新は申請すれば自動的に許可される？"
- "変更許可は要件を満たせば権利として取れる？"
- any pattern treating renewal/change as automatic or as a right once checklist items are completed.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-guideline | L4 | 出入国在留管理庁「在留資格の変更、在留期間の更新許可のガイドライン」 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html | 2026-05-15 | Key quotes: (1) 「専ら法務大臣の自由な裁量に委ねられ」 — discretion rests entirely with Minister; (2) 「これらの事項にすべて該当する場合であっても、すべての情況を総合的に考慮した結果、変更又は更新を許可しないこともあります。」 — ALL conditions met ≠ guaranteed approval; (3) Four evaluation factors: 素行, 生計, 在留資格活動, 在留必要性. |

## Official Rule Or Source Fact

**Key Japanese quotes from ISA guideline (high confidence):**

**On discretion:**
> 「法務大臣が適当と認めるに足りる相当の理由があるときに限り許可することとされており、この相当の理由があるか否かの判断は、専ら法務大臣の自由な裁量に委ねられ」

(Permission is granted only when sufficient grounds exist; judgment of whether such grounds exist rests entirely on ministerial discretion.)

**Critical "no guarantee" clause:**
> 「これらの事項にすべて該当する場合であっても、すべての情況を総合的に考慮した結果、変更又は更新を許可しないこともあります。」

(Even if all of these conditions are met, ISA may still deny the change or renewal after comprehensive consideration of all circumstances.)

**Evaluation framework — comprehensive consideration:**
> 「申請者の行おうとする活動、在留の状況、在留の必要性等を総合的に勘案して行う」

Four main evaluation factors:

**1. 素行 (Conduct):**
> 「素行については、善良であることが前提となり、良好でない場合には消極的な要素として評価され」

Good conduct is a baseline premise. Poor conduct is a negative factor. Criminal convictions triggering deportation grounds or immigration violations that cannot be overlooked = poor conduct.

**2. 生計 (Livelihood / Financial Independence):**
> 「日常生活において公共の負担となっておらず、かつ、その有する資産又は技能等から見て将来において安定した生活が見込まれること」

Not a public burden; stable future livelihood expected based on assets or skills.

*Humanitarian exception exists for livelihood factor only:* 「ただし、在留を認めるべき人道上の理由が認められる場合には、その理由を十分勘案して判断される」

**3. 在留資格に応じた活動 (Activity matching status):**
> 「申請人である外国人が、現に有する在留資格に応じた活動を行っていたことが必要」

Applicant must actually be engaged in activities corresponding to their current status. This is evaluated at the time of application, not just at the time of original grant.

**4. 在留の必要性 / 相当性 (Necessity and appropriateness of continued stay):**
Assessed based on totality of circumstances.

**Standard of approval:**
> 「別表第一の下欄に掲げる活動...に該当し、かつ、在留期間の更新を適当と認めるに足りる相当の理由があること」

Activities must fall under the status category AND sufficient grounds for renewal must exist.

## Safe Answer Behavior

- When a user asks if renewal is "guaranteed" by satisfying the document list: state clearly that the official guideline explicitly says all conditions met ≠ guaranteed approval; discretion rests with the Minister.
- When a user assumes prior approval means next approval: clarify that each renewal is evaluated independently at the time of application; prior approval creates no entitlement.
- When a user has conduct issues (criminal record, immigration violations, late payments): note that 素行 is a named evaluation factor; route to professional for assessment.
- When a user has been not performing status-appropriate activities: note that 在留資格に応じた活動の実施 is a named factor; absence of qualifying activities during the current period is a negative factor.
- Do not give probability estimates ("likely approved," "80% chance") — discretion is broad.

## Must Say

- 在留期間更新・在留資格変更は，法務大臣の「自由な裁量」により判断されるものであり，自動的に許可されるものではない。
- 公式ガイドラインには「これらの事項にすべて該当する場合であっても…変更又は更新を許可しないこともあります」と明記されている。
- 審査では，(1)素行，(2)生計，(3)在留資格に応じた活動の実施，(4)在留の必要性・相当性，を総合的に勘案する。
- 前回の更新が許可されたことは，今回の許可を保証しない。

## Must Not Say

- 「書類が揃っていれば更新は通る。」
- 「前回問題なかったから今回も大丈夫。」
- 「条件をすべて満たしているのだから，不許可になることはない。」
- 「在留期間更新は申請すれば必ず許可される権利。」

## Deep Water Triggers

- User has criminal record (non-deportation-level) and asks if renewal is possible.
- User has been in a non-qualifying job for the past year and now wants to renew.
- User's company changed its business type and their activities no longer match their 技人国 status.
- User has tax or social insurance compliance issues and asks if renewal is affected.
- User received a denial and asks why — ISA does not provide detailed denial reasons; TEBIQ cannot speculate.
- User asks TEBIQ to evaluate their "chances" of approval.

## User Next Actions

This is not user-facing copy. For answer routing:

- If user has clean record and straightforward status: confirm they should prepare standard documents; note that comprehensive evaluation applies.
- If user has any conduct, financial, or activity issues: route to professional (行政書士/弁護士) for pre-application assessment before filing.
- If user received denial: route to lawyer for review; do not speculate on denial reasons.
- Do not provide approval probability estimates — this is outside TEBIQ's fact-layer competence.

## Unknown Fields

- The specific 素行 threshold — what level of tax/insurance non-compliance, traffic violations, or minor offenses triggers negative conduct evaluation?
- Whether ISA provides informal pre-consultation for cases with conduct concerns before formal application.
- Whether an applicant can request a hearing or explanation of denial reasons after non-permission.

## Needs Domain Flags

- needs_domain (P1): what is the safe framing for a user who has conduct issues (e.g., tax late payment, minor violations) but below the automatic denial threshold? TEBIQ must not over-alarm but cannot confirm safety.
- needs_domain (P1): when a user's activities during the period did not fully match their status (partial mismatch), is this a renewal denial risk or a disclosure-and-explain situation?
- needs_domain (P1): what is the correct TEBIQ answer route when a user asks for probability of approval — must TEBIQ refuse entirely, or is there a safe "these factors matter" framing?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kijun-001 | "書類を全部揃えれば更新は絶対通りますよね？" | Must state: official guideline explicitly says all conditions met ≠ guaranteed; discretion rests with Minister; do not confirm. |
| kijun-002 | "去年問題なく更新できたから今年も大丈夫ですか？" | Must state: each renewal is independently evaluated; prior approval creates no entitlement; factors evaluated at time of application. |
| kijun-003 | "在留資格の更新審査では何を見られますか？" | Explain four factors: 素行, 生計, 在留資格に応じた活動, 在留必要性/相当性; confirm comprehensive evaluation approach. |

## Source Notes

- The ISA guideline page (nyuukokukanri07_00058.html) is the primary official source. All quotes are from this page.
- The "even if all conditions met, may still deny" clause is explicitly stated — this is the most important single fact for this guardrail.
- The humanitarian exception for the livelihood (生計) factor is also confirmed from this source.
- Specific thresholds for 素行 evaluation (what level of conduct issue triggers negative assessment) are not defined in the guideline — this is intentionally left to discretion.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 005 G31. Key source: ISA renewal/change guideline (nyuukokukanri07_00058.html). Core facts: ministerial discretion explicit; even all-conditions-met ≠ guaranteed; four evaluation factors. Critical "no guarantee" quote confirmed.
