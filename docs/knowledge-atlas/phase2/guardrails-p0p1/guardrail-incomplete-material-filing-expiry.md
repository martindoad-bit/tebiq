---
asset_id: guardrail-incomplete-material-filing-expiry
title: Incomplete Material Filing Before Expiry Is Not A Safe Bridge
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 002"
---

## What This Document Is

This guardrail prevents answers from treating an incomplete-material application filed before expiry as a reliable "safe bridge" strategy. Filing an application before expiry can trigger special-period protection, but an application with missing required materials will stall in review and may still result in non-permission, ending the special period.

## Trigger

Use this card when the user says:

- "材料还没备齐，可以先提交吗？"
- "在留期限快到了，先交一部分，剩下的后来补"
- "補件で後から足せる？"
- "不完整的申请也能进特例期间吧"
- "先提交占位，等收到补件通知再准备材料"
- any pattern suggesting "file now incomplete → gather materials later → safe outcome"

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-pr-incomplete | L4 | 出入国在留管理庁「永住許可申請（申請手続）」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu01.html | 2026-05-15 | States: 「提出書類が不足していた場合は、追加資料を求めることとなり、資料が揃うまで審査を進めることが困難となります。」(If submitted documents are incomplete, additional materials will be requested, and it will be difficult to proceed with examination until documents are complete.) |
| isa-online-returned | L4 | 出入国在留管理庁「オンラインでの申請手続に関するQ&A」 | https://www.moj.go.jp/isa/applications/online/online-QA.html | 2026-05-15 | States that when the system detects a deficiency, the application enters 「返却中：追加資料の提出が可能な状態」 (returned: state where additional materials can be submitted). Review does not advance during returned state. |
| isa-special-period | L4 | 出入国在留管理庁「特例期間とは？」 | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | 2026-05-15 | Special period endpoint: whichever comes first — the disposition decision, or two months from original expiry date. The two-month cap is absolute regardless of application progress. |
| isa-notice | L4 | 出入国在留管理庁「在留申請時のお知らせ及び注意」 | https://www.moj.go.jp/isa/11_00037.html | 2026-05-15 | States the applicant can remain in Japan (up to two months past expiry if no decision) — but a non-permission decision ends this protection immediately when issued. |

## Official Rule Or Source Fact

- ISA states explicitly that when submitted documents are incomplete, additional materials are requested and examination **cannot proceed** until the complete set is submitted.
- For online applications, an incomplete filing enters a 「返却中」 (returned) state — it does not advance through examination while in this state.
- The special period endpoint is whichever comes first: the disposition, or original expiry + two months. The two-month maximum is fixed regardless of how late the materials arrive.
- A non-permission decision — which can be issued even during or after a 補件 (additional material request) cycle — terminates the special period immediately upon issuance.
- ISA does not state on its public pages that filing with incomplete materials guarantees a 補件 opportunity will be issued, or that any specific grace time will be given for materials.

## Safe Answer Behavior

- Do not frame "file before expiry even if incomplete" as a safe, low-risk strategy.
- State clearly that review cannot advance while materials are missing, and the two-month special-period cap runs regardless.
- If the user is close to expiry with incomplete materials, the action should be: file what is available while urgently completing the remaining materials, and contact the immigration office or a professional for the specific situation.
- Do not promise that a 補件 request will always be issued, or that the timeline will be extended beyond two months from expiry.
- Do not say that filing first locks in an unlimited window to gather materials.

## Must Say

- 書類不足で申請した場合、追加資料の提出を求められ、揃うまで審査が進まない。
- 在留期限から最長2か月という特例期間の上限は、書類が揃うのを待って延長されるわけではない。
- 不許可が出た時点で、特例期間は即時に終了する。
- 期限が迫っている場合は、可能な範囲で速やかに申請しつつ、残りの書類を最優先で準備すること。

## Must Not Say

- 「材料不齐也先提交，用特例期间争取时间，然后补件就行了。」
- 「先交一部分，后面发来补件通知再准备剩下的，不用担心。」
- 「特例期间会等到你材料齐了再结束。」
- 「提交申请就等于安全了，材料后来补没问题。」

## Deep Water Triggers

- User's expiry is today, tomorrow, or within a few days and materials are clearly incomplete.
- User describes a type of document that will take weeks to obtain (e.g., tax certificate from overseas, employer letter requiring approval chains).
- User has already exceeded original expiry and original expiry + two months is approaching.
- User has received a non-permission notice after a 補件 cycle and asks if they can re-file immediately.
- Materials are missing because of employer unresponsiveness, overseas institution delay, or official processing backlogs.

## User Next Actions

This is not user-facing copy. For answer routing:

- Identify which specific materials are missing and how long they typically take to obtain.
- State the current status expiry date and calculate the two-month special-period endpoint.
- If application is filed: confirm filing method, receipt, and whether any 返却中 or 補件 notice has been issued.
- Route to official consultation (入管インフォメーションセンター) or licensed professional (行政書士/弁護士) if expiry is imminent or already past.

## Unknown Fields

- Whether ISA issues a 補件 opportunity for every type of missing document or refuses filing at the counter for clearly deficient applications.
- Whether the 返却中 state in the online system stops the special-period clock or leaves it running.
- Minimum document set required for an application to be formally accepted as filed (受付).

## Needs Domain Flags

- needs_domain: what specific set of materials constitutes a "minimally complete" filing that ISA will formally accept and assign a 受付番号.
- needs_domain: whether returning an online application to 返却中 status affects the special-period endpoint calculation.
- needs_domain: safe advice route when expiry is imminent (today/tomorrow) and key materials are missing.
- needs_domain: whether a 補件 request is always issued before non-permission for substantive document gaps vs. formal deficiencies.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| incomplete-001 | "在留期限が3日後だが書類が揃っていない。先に出して補件で揃えればいい？" | Must not frame as safe bridge; state review cannot advance and 2-month cap applies; route to professional/office. |
| incomplete-002 | "材料差一份，先提交其他的，收到补件通知再交那份可以吗？" | State that ISA may request additional materials and review pauses; 2-month cap is absolute; professional consultation recommended. |
| incomplete-003 | "申请被返却中了，我还有时间补交材料吗？" | Do not predict timeline; state the 2-month special-period endpoint runs; contact ISA or professional immediately to confirm remaining time. |

## Source Notes

- The explicit "審査を進めることが困難" quote was found on the PR application page and reflects the general ISA principle. Whether identical language appears on the general renewal/change pages requires direct verification.
- The 返却中 status is specifically from the online application Q&A; paper application equivalents should be confirmed with ISA.
- DOMAIN should confirm whether counter rejection (not accepting the application at all) is possible for certain types of incomplete materials.

## Changelog

- 2026-05-15: Initial atlas_draft created as Batch 002 continuation candidate 2 (G12). Key source: ISA PR application page "審査を進めることが困難", online Q&A 返却中 state, and special-period two-month endpoint.
