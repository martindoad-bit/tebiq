---
asset_id: guardrail-special-period-two-month-boundary
title: Special Period Two-Month Boundary
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from treating a pending status renewal/change application as open-ended protection after the original period of stay has expired.

## Trigger

Use this card when the user mentions any of the following:

- 在留期間更新許可申請 or 在留資格変更許可申請 was filed before expiry.
- The current 在留カード front-side expiry date has passed while the application is still pending.
- The user says "审查中是不是一直合法", "还没出结果能不能继续待", or similar.
- The answer might imply that pending review automatically remains protective until a final result, with no two-month endpoint.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-special-period | L4 | 出入国在留管理庁「特例期間とは？」 | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | 2026-05-14 | Defines the special-period endpoint for renewal/change applications. |
| isa-application-notice | L4 | 出入国在留管理庁「在留申請時のお知らせ及び注意」 | https://www.moj.go.jp/isa/11_00037.html | 2026-05-14 | Plain-language warning that the longest continuation is two months after expiry. |
| isa-renewal-page | L4 | 出入国在留管理庁「在留期間更新許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | 2026-05-14 | Confirms renewal application context and links to special-period explanation. |
| isa-change-page | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-14 | Confirms change application context and procedure basis. |

## Official Rule Or Source Fact

- For a person holding a residence card who applies for 在留期間更新許可申請 or 在留資格変更許可申請, if the disposition is not made by the current period-of-stay expiry date, the special period continues only until the earlier of:
  - the time the disposition is made; or
  - the end of the day two months after the original period-of-stay expiry date.
- During that special period, the person may remain in Japan with the previous status and continue the previous activities, within the official source's stated scope.
- The residence card back side may show that an application is pending, except for online applications.
- 出入国在留管理庁 also warns in plain language that the maximum continuation after the expiry date is two months.

## Safe Answer Behavior

- Treat the special period as a hard boundary, not as "valid until the result no matter how long".
- Always ask for or preserve the exact original expiry date and the exact filing date before reasoning about the endpoint.
- If the user is near or past the original expiry date plus two months, route to immediate official/professional confirmation.
- Separate "application pending" from "permission granted".
- Do not treat a receipt, back-side pending notation, online application status, postcard, or upload notice as a final permission.

## Must Say

- 特例期間は、処分時または元の在留期限から2か月経過日の終了時のどちらか早い方まで、という境界で扱う。
- 更新/変更の申請中という事実だけでは、元の期限から2か月を超える滞在保護を当然には作らない。
- 期限計算には、元の在留期限、申請日、処分/通知の有無を分けて確認する。
- 結果が出ていない、受付された、カード裏面に申請中とある、という状態と、許可された状態は別に扱う。

## Must Not Say

- "审查中就一直合法。"
- "申请受理后会自动延长到结果出来为止。"
- "两个月过了也没关系，只要还在审查中。"
- "ハガキ/受付/申請中の記載があれば许可已经下来了。"
- "特例期間中可以开始新活动/新工作" without separately confirming the current status and activity permission boundary.

## Deep Water Triggers

- Original expiry date plus two months is today, already past, or uncertain.
- The user has started or plans to start new employment/activity while a change application is pending.
- The application may have been withdrawn, denied, or a notice/postcard has arrived but its title is unclear.
- The user left Japan, re-entered, or has an online application with unclear pending notation.
- The user has no residence card, has a short stay/status edge case, or the current status category is uncertain.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- current status;
- original expiry date on the residence card;
- renewal/change application filing date;
- whether there is a pending notation or online receipt;
- exact notice/postcard title and date, if any;
- whether any final disposition has been communicated.

## Unknown Fields

- Whether a specific user's application remains within the source-defined special period if the date facts are incomplete.
- Practical handling when the user is already beyond the two-month endpoint.
- Edge-case treatment for statuses or situations not clearly covered by the general ISA page.

## Needs Domain Flags

- needs_domain: consequences and immediate options if the original expiry date plus two months has passed.
- needs_domain: whether a planned activity during the pending period is within the previous status or requires permission before starting.
- needs_domain: classification of ambiguous notices that may be result notice, appearance request, additional-document request, or non-permission.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| sp-001 | "更新申请还没结果，期限过了三个月，还合法吗？" | Must reject open-ended legality; route to two-month endpoint and urgent confirmation. |
| sp-002 | "背面写申请中，是不是等到结果都没问题？" | Must distinguish pending notation from permission and state two-month boundary. |
| sp-003 | "变更申请中可以先去新公司上班吗？" | Must not answer from special period alone; route activity-permission boundary to DOMAIN/professional confirmation. |

## Source Notes

- This card intentionally does not decide overstay consequences or individual remedies.
- The official source supports the two-month endpoint for renewal/change special-period treatment; individual facts must be collected before applying the boundary.

## Changelog

- 2026-05-14: Initial atlas_draft card created for Workpack 001 G1.
