---
asset_id: guardrail-honin-vs-torikijisha-shinsei
title: 本人申請と申請取次 — Professional Filing Does Not Remove Applicant's Legal Responsibility
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 006"
---

## What This Document Is

This guardrail prevents answers from implying that using an authorized immigration representative (申請取次者 — typically a 行政書士 or 弁護士) removes or transfers the applicant's own legal responsibility for the accuracy and truthfulness of the application. The 申請取次 system allows a representative to submit applications at ISA on behalf of the applicant (saving the applicant a trip to the immigration bureau), but:

1. The applicant remains legally responsible for the content of the application.
2. False statements or documents submitted by or through a representative still constitute a violation by the applicant.
3. The representative must be formally authorized (申請取次者) — not just any person or employer can submit.
4. 申請取次 is NOT the same as "the professional handles everything including legal responsibility."

Key errors to block:
- "行政書士に頼んだから，内容が多少間違っていても問題ない。"
- "取次申請すれば本人は窓口に行かなくていいし，内容も任せられる。"
- "代理人が申請したから，不許可になっても本人の問題ではない。"
- Implying that any employer HR staff or friend can serve as an 申請取次者.

## Trigger

Use this card when the user says:

- "行政書士に申請を頼んでいるから，自分は何もしなくていい？"
- "取次申請と本人申請，何が違いますか？"
- "会社の担当者が申請してくれるが，本人は行かなくていい？"
- "弁護士に頼んでいるから，内容に多少虚偽があっても大丈夫？"
- "申請取次者がいれば，本人は窓口に行く必要なし？"
- any pattern where the user believes professional filing eliminates their personal responsibility.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-torikiji | L4 | 出入国在留管理庁「申請取次制度について」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00003.html | 2026-05-15 | Confirms: (1) 申請取次者は，弁護士・行政書士などの資格を有する専門家および適切に指定・承認された機関担当者; (2) 申請取次により本人が窓口に出頭する必要がなくなる (procedural convenience only); (3) 申請内容の正確性・真実性の責任は申請人本人にある. |

## Official Rule Or Source Fact

**Confirmed from ISA 申請取次 page:**

**Who qualifies as 申請取次者:**
- 弁護士 (lawyers)
- 行政書士 (administrative scriveners)
- 機関の職員 (institutional staff, such as company HR or university officials) who are specifically approved/registered by ISA as 取次者

**Important: NOT anyone can file on behalf of another person.** HR staff who are not formally registered as 取次者 and are not acting under a recognized institutional exemption cannot submit applications at ISA as a representative.

**What 申請取次 provides (procedural convenience only):**
- The applicant does not need to appear at the ISA window in person for the filing.
- The representative handles the physical submission.

**What 申請取次 does NOT provide:**
- Transfer of legal responsibility for application content.
- Protection from 不許可 due to the representative's mistake.
- Immunity from 在留資格取消 or criminal liability for false statements made by or through the representative.

**The applicant's responsibility:**
- The applicant must review and confirm all information in the application before the representative files.
- If false information is submitted, the applicant — not the representative — is the subject of cancellation proceedings and potential criminal liability under 入管法.
- The 不正の手段 definition (from G27) applies regardless of whether a representative filed the application.

**Cross-reference:** G27 (申請書記載の正確性義務) — false application = cancellation ground + criminal penalty.

## Safe Answer Behavior

- When a user asks if they can rely entirely on a 行政書士: explain that the professional handles procedural filing, but the applicant must verify and be responsible for all content.
- When a user asks about using company HR to file: clarify that only formally authorized 取次者 can submit on behalf of applicants; general HR staff without 取次者 authorization cannot do this.
- When a user asks about 本人申請 vs 取次申請: explain the practical difference (whether the applicant must appear at ISA) but note that responsibility remains with the applicant either way.
- Do not imply that using a professional eliminates the applicant's need to understand and verify the application.

## Must Say

- 申請取次者（行政書士・弁護士等）が申請を行っても，申請内容の正確性・真実性についての法的責任は申請人本人にある。
- 申請取次は，本人が入管窓口に出頭する必要をなくす手続上の便宜であり，申請内容の責任を代理人に移すものではない。
- 申請取次者として申請できるのは，法務省に登録・承認を受けた弁護士・行政書士等の専門家，または適切に指定された機関の担当者のみ。
- 代理人が申請した場合でも，虚偽の情報・書類が含まれていれば，申請人本人が在留資格取消・刑事罰の対象になる可能性がある。

## Must Not Say

- 「行政書士に頼んでいるから，内容は任せておけば大丈夫。」
- 「代理申請なら，本人は内容を確認しなくていい。」
- 「取次申請者が申請したから，不許可になっても本人の責任ではない。」
- 「会社の担当者が出してくれるから，本人が行かなくていいし，内容も問題ない。」（担当者の取次者資格確認が必要）

## Deep Water Triggers

- User trusted a 行政書士 who submitted false information without the user's knowledge — liability split is legal territory.
- User's employer HR staff (without 取次者 authorization) submitted an application on their behalf.
- User gave an employer blank-signed forms to fill in, and the employer filled in inaccurate information.
- User wants to authorize a family member (not a registered 取次者) to submit the application.
- User is dissatisfied with a 行政書士's work and wants to know their recourse.

## User Next Actions

This is not user-facing copy. For answer routing:

- For general 取次 vs 本人 questions: explain the procedural difference and the responsibility rule.
- For employers or schools submitting applications: confirm whether they are formally registered 取次者; if not, the person must appear in person or use an authorized 行政書士.
- For cases where false information was submitted by a representative: route to lawyer — this is joint-liability territory.
- For 行政書士 malpractice situations: route to lawyer — TEBIQ cannot advise on professional liability claims.

## Unknown Fields

- The exact registration/approval procedure for institutional 取次者 (企業・学校の取次者承認).
- Whether any written authorization from the applicant is required before a 取次者 can file.
- The specific consequences for 行政書士 who submit false applications (professional liability, license issues) — outside TEBIQ's scope but relevant for user trust.

## Needs Domain Flags

- needs_domain (P1): what is the safe answer route when a user's representative (行政書士 or employer) submitted false information that the user claims they did not know about? Both ISA risk and professional liability are involved.
- needs_domain (P1): is written informed consent (e.g., signed declaration that the applicant reviewed the content) required as part of 取次申請 procedure?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| torikiji-001 | "行政書士に申請を任せています，内容は全部先生に任せていいですか？" | Must state: professional handles filing procedure, but applicant must verify and is responsible for all content; do not leave content unchecked. |
| torikiji-002 | "会社の人事担当が申請してくれますが，本人は行かなくていいですか？" | Must ask: is the HR staff formally registered as 取次者 at ISA? If not, applicant must appear in person or use an authorized representative. |
| torikiji-003 | "申請取次と本人申請，何が違いますか？" | Explain: procedural difference (whether applicant appears at window); legal responsibility for content remains with applicant regardless. |

## Source Notes

- The ISA 申請取次制度 page confirms that 取次者 must be formally authorized; unauthorized persons cannot file on behalf of applicants.
- The applicant's retained responsibility for content accuracy is confirmed from the ISA 取次 page and logically from the G27 truthfulness requirement and G26 cancellation grounds.
- Specific 行政書士/弁護士 registration details for 取次 authorization were not fully extracted in this session; the general qualification rule is confirmed.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 006 G39. Key source: ISA 申請取次制度 page. Core rule: 取次 = procedural convenience only; applicant retains legal responsibility for content. Cross-ref G27 (truthfulness) and G26 (cancellation grounds).
