---
asset_id: guardrail-shuroshikaku-shomeisho-jitsumuyo
title: 就労資格証明書 — Evidence Document, Not A Work Permission Or Transfer Authorization
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

This guardrail is a focused complement to G7 (guardrail-work-qualification-certificate-boundary). G7 establishes the core definition of 就労資格証明書. This card (G40) covers the specific practical misunderstandings that arise in job-change and employer-verification contexts:

1. **"就労証明書があれば転職できる"** — the certificate proves existing permission, not new permission. It does not authorize work at the new employer if the new job is outside the current status scope.
2. **"就労証明書 = visa change"** — obtaining the certificate does not change the 在留資格; it only certifies what activities are currently permitted.
3. **"就労証明書は義務"** — the certificate is voluntary and optional for the applicant; employers may request it but the applicant is not legally required to obtain one.
4. **"就労証明書があれば次の更新は安全"** — the certificate is point-in-time evidence; it does not guarantee future renewal approval.

## Trigger

Use this card when the user says:

- "転職したいが，就労資格証明書を取れば転職できる？"
- "就労資格証明書を持っていれば，どんな仕事でもできる？"
- "新しい職場が就労証明書を要求した，これは何ですか？"
- "就労証明書を取れば，在留資格変更しなくていい？"
- "就労資格証明書は必ず取らないといけないもの？"
- "就労資格証明書があれば，次の更新は絶対通る？"
- any pattern treating the certificate as a work permission, transfer approval, or renewal guarantee.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shuroshikaku | L4 | 出入国在留管理庁「就労資格証明書（入管法第19条の2）」 | https://www.moj.go.jp/isa/applications/procedures/syuurou_00001.html | 2026-05-15 | G7 cross-ref. Confirmed: certificate proves current permitted activities; not a new permission; not mandatory. Does not authorize activities beyond the current 在留資格 scope. |
| isa-shuroshikaku-app | L4 | 出入国在留管理庁「就労資格証明書交付申請」 | https://www.moj.go.jp/isa/applications/procedures/16-9.html | 2026-05-15 | G7 cross-ref. Confirms the application procedure (voluntary); certificate issued by ISA confirming scope of permitted work activities. |
| isa-change-app | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-15 | Status-change permission is the route for changing permitted activity scope; 就労資格証明書 is not a substitute. |

## Official Rule Or Source Fact

**Confirmed from G7 (cross-reference — high confidence):**

**What the certificate IS:**
- 「就労資格証明書」 is issued by ISA confirming what work activities are currently permitted under the holder's 在留資格.
- Legal basis: 入管法 第19条の2.
- The certificate is a snapshot in time — it confirms what the applicant's current status permits at the time of issuance.
- Useful for job-seekers to show prospective employers the scope of their permitted work.

**What the certificate IS NOT:**
- It does NOT authorize activities beyond the current 在留資格 scope.
- It does NOT constitute a change of status or expansion of permitted activities.
- It is NOT mandatory — the applicant is not legally required to obtain one.
- It does NOT guarantee renewal or change permission approval.

**In job-change context specifically:**
- If the new job is within the same activity scope as the current 在留資格: the certificate can confirm this to the new employer, but no status change is needed.
- If the new job is OUTSIDE the current 在留資格 scope: the certificate cannot authorize the new job. A 在留資格変更 (status change) is required.
- The certificate's main practical value: reassuring new employers that the applicant has legal authority to do the type of work they are applying for.

**Voluntary nature:**
- Obtaining the certificate is the applicant's choice; it is not a legal requirement for changing jobs or for employers to verify work authorization.
- Employers who require it are seeking assurance about the applicant's work scope — but the legal obligation for the employer to verify work authorization (確認義務) does not specifically require the certificate.

## Safe Answer Behavior

- When a user asks if a certificate allows them to transfer to a new job: confirm it can show work scope to the new employer, but does NOT expand scope or authorize out-of-scope work; if the new job differs from the current status scope, 在留資格変更 is needed.
- When a user's new employer requests the certificate: explain what it is (evidence of current permitted activities) and that the applicant may voluntarily apply for it at ISA.
- When a user thinks the certificate is mandatory: clarify it is voluntary; the applicant is not legally required to obtain one.
- When a user thinks the certificate guarantees renewal: clarify it is point-in-time evidence, not a future approval commitment.
- Cross-ref G7 for the core definition if needed.

## Must Say

- 就労資格証明書は，現在の在留資格で許可されている就労活動の範囲を証明するものであり，新たな在留資格や就労許可を付与するものではない。
- 転職先の業務内容が現在の在留資格の活動範囲外であれば，就労資格証明書を取得しても転職できるわけではなく，在留資格変更許可申請が必要。
- 就労資格証明書の取得は任意であり，法的に義務付けられたものではない。
- 就労資格証明書は申請時点の在留資格の状況を証明するもので，将来の更新許可を保証するものではない。

## Must Not Say

- 「就労資格証明書を取れば，どんな仕事でも転職できる。」
- 「就労証明書 = 在留資格変更と同じ。」
- 「就労資格証明書は必ず取得しなければならない。」
- 「就労証明書を持っていれば，次の更新は安全。」

## Deep Water Triggers

- User's new job is in a completely different field from their current 在留資格 activity, but they obtained a 就労資格証明書 thinking it covers the new field.
- Employer is demanding a 就労資格証明書 and threatening not to hire without it — user asks if this is a legal requirement.
- User applied for and received a certificate, but the certificate states their activity scope is narrower than they expected.
- User wants the certificate to "lock in" their work scope before a planned job change.
- User received a certificate that is now outdated (job changed, status renewed with different scope).

## User Next Actions

This is not user-facing copy. For answer routing:

- If new job is within current status scope: explain the certificate can be useful to show the employer; voluntary application at ISA; route to G7 for core process.
- If new job may be outside current status scope: route to 在留資格変更許可申請 process; route to professional (行政書士) for activity-scope assessment.
- If employer demands certificate: explain voluntary nature; employer can also check 在留カード and visa-grant document for general status information.
- If user's certificate shows narrower scope than expected: route to professional for assessment of whether current activities are within 在留資格 scope.

## Unknown Fields

- The exact legal basis for employer work-authorization verification obligations — whether a 就労資格証明書 satisfies any formal employer obligation under labor law.
- Whether obtaining a certificate before job change creates any procedural advantage in subsequent renewal applications.
- How ISA determines the stated activity scope in the certificate when the applicant's role is multifaceted.

## Needs Domain Flags

- needs_domain (P1): what is the correct practical route for a worker who changed jobs to an out-of-scope role and realizes they need 在留資格変更 — can they continue the new job during the pending application period?
- needs_domain (P1): does holding a 就労資格証明書 from before a job change provide any protection during the interim period before a 在留資格変更 is processed?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shuroshikaku-001 | "転職したいので就労資格証明書を取ろうと思っています，これで転職できますか？" | Explain: certificate shows current scope; if new job is within current scope = useful evidence; if outside scope = 在留資格変更 required regardless of certificate. |
| shuroshikaku-002 | "就労資格証明書は必ず取らないといけないですか？" | Must state: voluntary; not legally mandatory for applicant; employer may request it voluntarily; no legal requirement to obtain one. |
| shuroshikaku-003 | "就労資格証明書と在留資格変更，どう違いますか？" | Explain: certificate = evidence of what current status permits (no new permission granted); 在留資格変更 = formal change of permitted activity scope (new permission required if activities change). |

## Source Notes

- Core facts are from G7 (guardrail-work-qualification-certificate-boundary) official sources (ISA 第19条の2 page + 16-9.html).
- The voluntary nature and the "not a permission expansion" rule are confirmed in G7.
- This card (G40) focuses on the job-change context and the employer-request context — practical patterns not directly addressed in G7.
- The employer verification obligation (whether certificate satisfies it) is marked needs_domain.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 006 G40. G7 complement card. Core extension: job-change context (certificate ≠ transfer authorization); voluntary nature; renewal not guaranteed. Cross-ref G7 for base definition.
