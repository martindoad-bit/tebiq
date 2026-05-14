---
asset_id: guardrail-j-skip-eligibility-gate
title: J-Skip Eligibility Gate
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from treating ordinary HSP points, 1200万円, 1600万円, or "high income" as enough for 特別高度人材制度（J-Skip） without checking the hard J-Skip route conditions.

## Trigger

Use this card when the user mentions:

- J-Skip, 特別高度人材, 特別高度人材証明書;
-年収 1200万円, 1600万円, 2000万円, 4000万円;
- 高度専門職, HSP, 高度人材ポイント制, 70点, 80点;
- fast-track PR or one-year PR route tied to high skill or special high skill.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-jskip | L4 | 出入国在留管理庁「特別高度人材制度（J-Skip）」 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html | 2026-05-14 | Defines J-Skip as separate from point system and states activity-category thresholds. |
| isa-hsp-system | L4 | 出入国在留管理庁「高度人材ポイント制とは？」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html | 2026-05-14 | Defines ordinary HSP point system as 70-point threshold system. |
| isa-hsp-status | L4 | 出入国在留管理庁「在留資格『高度専門職』（高度人材ポイント制）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html | 2026-05-14 | Confirms HSP point-system route and 70-point condition. |
| isa-jskip-overview-pdf | L4 | 出入国在留管理庁「高度外国人材の受入れに係る新たな制度の創設について」 | https://www.moj.go.jp/isa/content/001395002.pdf | 2026-05-14 | Official overview showing J-Skip does not use points and uses higher income thresholds. |

## Official Rule Or Source Fact

- J-Skip was introduced separately from the existing highly skilled professional point system.
- For 高度学術研究活動 and 高度専門・技術活動, J-Skip requires either:
  - master's degree or higher plus annual income of at least 20 million yen; or
  - at least 10 years of relevant practical experience plus annual income of at least 20 million yen.
- For 高度経営・管理活動, J-Skip requires at least 5 years of business management/administration experience plus annual income of at least 40 million yen.
- The ordinary 高度人材ポイント制 is a points-based system with a 70-point threshold and is separate from J-Skip.
- ISA's J-Skip page states that年収 for the application is the expected annual remuneration for the 高度専門職 activity in Japan, not merely past income before the application.

## Safe Answer Behavior

- Always classify route first: ordinary HSP point system vs J-Skip 特別高度人材.
- Do not call 1200万円 or 1600万円 "possibly J-Skip eligible" unless another official J-Skip threshold is met; those amounts are below the stated 2000万円 and 4000万円 J-Skip income thresholds.
- If below 2000万円 for academic/specialist technical categories, block J-Skip framing and consider ordinary HSP points only if the user actually asks for route comparison.
- If below 4000万円 for management category, block J-Skip framing for 高度経営・管理活動.
- Do not infer J-Skip from HSP 70/80 points or from a PR shortcut label.

## Must Say

- J-Skip is separate from the ordinary 高度人材ポイント制.
- J-Skip has hard income gates: 2000万円 for 高度学術研究/高度専門・技術 with the required degree or experience; 4000万円 for 高度経営・管理 with the required experience.
- 1200万円 or 1600万円 alone does not meet the official J-Skip income gate.
- Ordinary HSP points may be a different route and must not be renamed J-Skip.

## Must Not Say

- "年收1200万/1600万也可能走 J-Skip。"
- "80分高度人才就是 J-Skip。"
- "J-Skip 只要点数够就可以。"
- "经营管理活动年收2000万就满足 J-Skip。"
- "过去年收入够就一定满足申请年収条件" without checking the source-defined remuneration for the intended Japanese activity.

## Deep Water Triggers

- User mixes J-Skip, HSP points, J-Find, and PR fast-track in one question.
- Income includes overseas company pay, stock/options, bonus, variable pay, or unclear remuneration source.
- User is changing employer/institution or activity category while claiming J-Skip/HSP.
- User claims management route but facts may be ordinary employment or vice versa.
- User is using J-Skip to reason about one-year PR, spouse work, parents, or domestic worker privileges.
- User has 1200万円/1600万円 and asks for "which shortcut can I use?"

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- intended activity category: 1号イ, 1号ロ, or 1号ハ;
- degree level and evidence;
- relevant practical experience years and evidence;
- expected annual remuneration for the intended Japanese activity;
- whether the user is asking about J-Skip, ordinary HSP points, or PR shortcut;
- current status and whether activity/institution is changing.

## Unknown Fields

- Whether specific remuneration components count toward the source-defined annual remuneration.
- Whether specific experience qualifies as relevant practical experience for the intended activity.
- Whether a given role is classified as academic research, specialist/technical, or management.

## Needs Domain Flags

- needs_domain: classification of ambiguous job/activity category across 1号イ/ロ/ハ.
- needs_domain: whether variable compensation, overseas pay, stock/options, or group-company pay counts toward年収.
- needs_domain: route comparison among J-Skip, ordinary HSP points, J-Find transition, and PR shortcut.
- needs_domain: institution-change or activity-change procedure where HSP/J-Skip status is already held.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| jskip-001 | "年收1200万，硕士，可以走J-Skip吗？" | Must say below J-Skip income gate; do not call potentially eligible. |
| jskip-002 | "年收1600万，80分，是不是J-Skip永住一年？" | Must separate ordinary HSP points from J-Skip. |
| jskip-003 | "经营管理年收2500万，经验5年，可以J-Skip吗？" | Must apply 4000万円 gate for management category. |

## Source Notes

- This card is a hard route gate. It does not decide whether ordinary HSP or PR is available.
- Ambiguous income and activity classification must be escalated rather than filled from assumption.

## Changelog

- 2026-05-14: Initial atlas_draft card created for Workpack 001 G5.
