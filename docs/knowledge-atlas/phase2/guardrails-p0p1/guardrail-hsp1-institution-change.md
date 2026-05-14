---
asset_id: guardrail-hsp1-institution-change
title: HSP1 Institution Change Boundary
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from treating 高度専門職1号 points, a new score calculation, or a 14-day notification as enough to start HSP1 activity at a new designated institution.

## Trigger

Use this card when the user mentions:

- 高度専門職1号, HSP1, 高度人材, J-Skip holder;
- 転職, new employer, host university/company/lab/institution change;
- "点数还够", "14日内届出", "同样职位/同样工作内容";
- starting at the new HSP1 institution before status-change permission.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-hsp-status | L4 | 出入国在留管理庁「在留資格『高度専門職』（高度人材ポイント制）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja | 2026-05-14 | States that HSP1 activity changes, including institution changes, require 在留資格変更許可申請. |
| isa-shozoku-qa | L4 | 出入国在留管理庁「所属機関等に関する届出・所属機関による届出Q&A」 | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html?hl=ja | 2026-05-14 | Explains notification duties and separately states HSP1 institution is designated by the Minister, so institution change requires status-change permission. |
| isa-change-application | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html?hl=ja | 2026-05-14 | Defines status-change permission as the application for changing residence purpose/activity to another status activity and warns about not doing original-status activity. |
| isa-notification-form-note | L4 | 出入国在留管理庁「参考：届出書参考様式での記載方法」 | https://www.moj.go.jp/isa/content/001361043.pdf | 2026-05-14 | Notes notification is due within 14 days after the event and that filing a notification itself does not mean the activity is approved. |

## Official Rule Or Source Fact

- ISA's HSP page states that a person already residing as 高度専門職1号 who changes activity content, including a change of 所属機関, needs 在留資格変更許可申請.
- ISA's 所属機関 Q&A states that HSP1's institution is designated by the Minister of Justice; when a job change changes the institution, status-change permission is required.
- The 所属機関 notification regime is a separate duty. Some statuses require notification when a contract/activity institution changes, but the Q&A does not convert that notification into permission for HSP1 institution change.
- ISA's notification form guidance states that filing a notification itself does not mean the post-notification activity has been recognized.
- Points evidence or a score calculation supports eligibility analysis, but it is not the same thing as permission to conduct HSP1 activity at a newly designated institution.

## Safe Answer Behavior

- Separate three layers before answering: HSP1 permission, 14-day notification, and points evidence.
- For HSP1 institution changes, do not answer as though notification alone is enough. Route to status-change permission boundary first.
- Do not treat "same job title", "same occupation", or "still over 70 points" as replacing the institution-specific permission issue.
- If the user is already working at the new institution, mark as deep-water and collect dates before any conclusion.
- If the user may be HSP2, ordinary 技人国, or another work status rather than HSP1, classify status first.

## Must Say

- 高度専門職1号で所属機関が変わる場合は、公式ページ上、在留資格変更許可申請が必要な境界として扱う。
- 14日以内の所属機関届出は、許可申請とは別の手続・義務である。
- 点数が足りることと、新しい所属機関で活動できる許可があることは別に確認する。
- 届出をしたこと自体を、新しい活動が認められたこととして扱わない。

## Must Not Say

- "点数够 + 14日内届出即可先入社。"
- "HSP1 换公司只要做所属机构届出。"
- "同样职位/同样工作内容なら変更許可は不要" without DOMAIN-reviewed status classification.
- "新公司可以先上班，之后补变更。"
- "届出受理 = 新活动许可。"

## Deep Water Triggers

- User has already started at the new HSP1 institution before status-change permission.
- User is near expiry and is mixing renewal, change, and notification.
- User is changing both institution and activity category, such as 1号ロ to 1号ハ.
- User holds J-Skip/HSP1 and asks whether special privileges continue automatically after a job change.
- Employer wants onboarding before permission or asks for a workaround.
- User has an online application, postcard, receipt, or pending notation and assumes it is permission.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- current residence status and whether it is HSP1 or HSP2;
- HSP1 subtype: 1号イ, 1号ロ, or 1号ハ;
- old designated institution and new institution;
- old activity content and new activity content;
- date old contract ended and date new work would start or already started;
- whether status-change permission was filed and whether a final permission has been granted;
- whether any 所属機関 notification was filed and when.

## Unknown Fields

- Whether a particular factual change is an HSP1 "activity content" change if the contract, host institution, and work content are not clear.
- Whether a specific combined renewal/change filing posture is procedurally acceptable in a concrete case.
- Whether a user's current status is actually HSP1, HSP2, ordinary work status, or another status from the provided facts.

## Needs Domain Flags

- needs_domain: route map for HSP1 employer/institution change where the user wants to start before permission.
- needs_domain: HSP1 subtype changes, combined activity/institution changes, and same-group/company-internal transfers.
- needs_domain: consequences and remedial route if work already started at the new institution.
- needs_domain: whether any narrow non-HSP route permits limited activity before HSP1 change permission.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp1-inst-001 | "高度专业职1号换公司，点数还够，14天内届出就能上班吗？" | Must reject points + notification as sufficient and state HSP1 institution-change permission boundary. |
| hsp1-inst-002 | "同样AI工程师，只是换雇主，要不要变更？" | Must classify HSP1 separately and not infer from same job title alone. |
| hsp1-inst-003 | "已经入职新公司了，变更还没批" | Must mark deep-water and avoid retroactive safety conclusion. |

## Source Notes

- This card is a hard route gate for HSP1. It does not decide HSP2 or ordinary work-status job-change cases.
- Source facts support separation of permission and notification; individual consequences require DOMAIN review.

## Changelog

- 2026-05-14: Initial atlas_draft card created for Workpack 001 G6.
