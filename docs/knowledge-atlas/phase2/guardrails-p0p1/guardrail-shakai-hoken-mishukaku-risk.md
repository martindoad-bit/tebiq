---
asset_id: guardrail-shakai-hoken-mishukaku-risk
title: 社会保険・年金未加入 — Non-Enrollment Is Not A Minor Issue; Affects PR And Renewal Assessment
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 005"
---

## What This Document Is

This guardrail prevents answers from treating social insurance and pension non-enrollment as a separate administrative matter unrelated to immigration status management. In reality:

- **国民年金 / 厚生年金** enrollment and payment status is directly evaluated in PR (永住) applications.
- **健康保険 / 国民健康保険** enrollment is similarly evaluated.
- **Late payment**, **non-enrollment**, and **payment exemption records** can negatively affect PR applications under the "public obligations properly fulfilled" (公的義務の履行) standard.
- This is NOT limited to PR — late payment history can affect renewal/change applications for high-points routes (HSP, J-Skip) and is part of the 素行 (conduct) evaluation.

Key errors to block:
- "会社員だから厚生年金に入っているはずで，問題ない。"（実態確認なし）
- "国保でも入っていれば大丈夫。"（支払い状況も審査対象）
- "免除・猶予をしていたが，それは合法だから問題ない。"（免除はマイナス評価ではないが，不払いとは区別が必要）
- "フリーランスで社会保険に入っていないが在留更新はできる。"（PR等への影響を無視）

## Trigger

Use this card when the user says:

- "社会保険に入っていないが，ビザの更新に影響する？"
- "国民年金を払っていない期間があるが，永住申請に大丈夫？"
- "フリーランスで会社の保険がないが問題ない？"
- "健康保険証がないが在留申請できる？"
- "年金の免除をしていたが，永住に影響する？"
- "社会保険未加入がバレたら問題になる？"
- any pattern where social insurance/pension status is treated as irrelevant to immigration.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-eijuu-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン」 | https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html | 2026-05-15 | "公的義務（納税義務、社会保険料の納付義務及び公的年金保険料の納付義務等）を適正に履行していること" — public obligations, including social insurance and pension payments, must be properly fulfilled. Cross-ref: G4 (guardrail-late-payment-not-erased). |
| isa-eijuu-03 | L4 | 出入国在留管理庁「永住許可申請③（材料一覧）」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html | 2026-05-15 | Application requires: 直近（過去２年間）の年金支払いを証明する資料（ねんきん定期便等）; national health insurance payment records. Late-payment receipt (領収証書) specifically mentioned. Cross-ref: G4. |
| isa-eijuu-04a | L4 | 出入国在留管理庁「永住許可申請④-(2)-ア」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00133.html | 2026-05-15 | Health insurance payment documentation required; late payment receipts specifically mentioned as needed. Cross-ref: G4. |

**Source gap:** The specific consequence for non-enrollment vs. late payment vs. exempt status (免除・猶予) for PR purposes is addressed in G4 at the 永住 level but needs confirmation for standard renewal/change applications. This card is `needs_domain` for the renewal/change impact dimension.

## Official Rule Or Source Fact

**Confirmed from PR guideline (high confidence, from G4 cross-reference):**
- 公的義務（納税義務、社会保険料の納付義務及び公的年金保険料の納付義務等）を適正に履行していること
- This is an explicit requirement in the PR guidelines — not discretionary, not a minor factor.
- Application materials: 年金支払いを証明する資料（直近2年間）; 健康保険料の支払い証明

**Confirmed from G4 (at PR level):**
- Late payment that was later paid is "generally negative" in evaluation.
- Receipts proving "no late payment" (領収証書) are specifically referenced as evidence materials.
- 追納 (later payment of exempt periods) is categorically different from late payment — G4 cross-ref applies.

**Not confirmed from official sources (needs_domain):**
- Whether non-enrollment in health insurance or pension constitutes an independent denial factor for renewal/change applications (as opposed to PR applications).
- The exact threshold or duration of non-enrollment that triggers adverse evaluation.
- Whether company-side social insurance non-enrollment (employer failure to enroll an employee) is treated the same as individual non-enrollment.

## Safe Answer Behavior

- When a user asks about social insurance and PR: route to G4 (late-payment-not-erased) and confirm that pension/health insurance payment history is a PR evaluation factor.
- When a user asks about social insurance and standard renewal (non-PR): state that public obligation fulfillment is part of 素行 evaluation; non-enrollment is a risk factor; route to professional for assessment.
- When a user asks about 免除/猶予 (exemption/deferment): clarify this is different from non-payment; 免除 means the government approved a reduction/waiver; still note that 追納 is possible and the status should be disclosed accurately.
- Do not say "non-enrollment has no immigration consequence" for any status route.
- Do not confuse 厚生年金 (company pension), 国民年金 (national pension), 国民健康保険 (NHI), and 健康保険 (company health insurance) — these are separate and have different enrollment rules depending on employment type.

## Must Say

- 社会保険・年金の適正な加入と支払いは，永住許可申請のガイドラインで明示された要件（「公的義務を適正に履行していること」）。
- 年金や健康保険料の未払い・滞納は，永住申請審査においてマイナス評価になる可能性がある。
- 更新・変更申請でも，素行（公的義務の履行）は審査対象となる。
- 免除・猶予は不払いとは異なるが，状況や追納状況によって評価が異なる可能性がある。
- 会社員でも，会社が社会保険に未加入の場合，個人が国民年金・国保に別途加入する義務がある。

## Must Not Say

- 「社会保険未加入でも，在留期間内なら問題ない。」
- 「国保に入っていれば，支払いが少しくらい遅れても問題ない。」
- 「免除をしていたから不払いとは言えず，何も問題ない。」（個別評価が必要）
- 「フリーランスで社会保険に入れないから，仕方ない。」（国民年金・国保加入義務あり）

## Deep Water Triggers

- User is a company employee but employer has not enrolled them in 厚生年金/健康保険 (non-compliant employer).
- User has been self-employed (個人事業主) without enrolling in 国民年金 or 国民健康保険.
- User enrolled late and has a multi-year non-enrollment gap in their history.
- User used 免除/猶予 for many years and now wants to apply for PR.
- User's employer changed from a 厚生年金 company to a non-enrolled sole proprietor situation mid-career.

## User Next Actions

This is not user-facing copy. For answer routing:

- For PR applicants: route to G4 (late-payment-not-erased) for detailed payment history guidance; check 直近2年 coverage requirement.
- For renewal/change applicants with known non-enrollment: route to 行政書士 for assessment before filing.
- For employer non-enrollment situations: note that this may affect both the individual's immigration and the employer's labor compliance; dual professional route (行政書士 + 社会保険労務士 if needed).
- If user asks about 追納: explain the option exists for past exempt periods; route to 年金事務所 for details.

## Unknown Fields

- Whether health/pension non-enrollment is a standalone denial factor for standard renewal (not PR).
- The exact 素行 evaluation weight given to social insurance compliance in renewal/change.
- Whether 会社側 non-enrollment (employer failure to enroll) is separately considered from 個人 non-enrollment.
- The specific documentation required for exempt-period history in PR applications.

## Needs Domain Flags

- needs_domain (P1): what is the official 素行 evaluation weight for social insurance non-enrollment in standard renewal/change applications (not PR)?
- needs_domain (P1): how are employer-side 社会保険未加入 situations treated — does the employee bear immigration risk for the employer's non-compliance?
- needs_domain (P1): what is the correct framing for 免除/猶予 applicants in PR applications — must they 追納, or can exempt periods be disclosed without追納?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hoken-001 | "フリーランスで国民年金に入っていませんでした，永住申請に影響しますか？" | Clearly state: 公的義務の適正履行 = PR requirement; non-enrollment is likely negative factor; route to professional for assessment. |
| hoken-002 | "年金は免除をしていました，永住申請に不利ですか？" | Clarify: 免除 ≠ non-payment; but evaluation depends on circumstances and 追納 status; do not confirm safety; route to professional. |
| hoken-003 | "会社が社会保険に入れてくれていません，ビザ更新に影響しますか？" | State: individual must still enroll in 国民年金/国保 if employer is not complying; non-enrollment creates immigration risk; flag employer non-compliance separately. |

## Source Notes

- The PR guideline explicitly states "公的義務（社会保険料の納付義務及び公的年金保険料の納付義務等）を適正に履行していること." This is high-confidence.
- G4 (guardrail-late-payment-not-erased) covers the late-payment vs. erased-payment distinction in PR context. This card (G32) covers the non-enrollment angle and the renewal/change application impact.
- The renewal/change application impact of non-enrollment is not directly quoted from an official renewal guidance page — marked needs_domain.

## Changelog

- 2026-05-15: Initial needs_domain card as Batch 005 G32. Derived from G4 (PR guideline public-obligation requirement confirmed). Non-enrollment as renewal/change factor: needs_domain. Core pattern blocked: "social insurance is separate from immigration."
