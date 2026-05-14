---
asset_id: guardrail-kazoku-taizai-shuro-seigen
title: 家族滞在の就労制限 — 資格外活動許可なしでは就労不可；28h/week上限（G16補完）
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 008"
---

## What This Document Is

This card is a focused complement to G16 (guardrail-shikaku-gai-katsudo-28h-limit) and G24 (guardrail-shikakugai-hokatsu-vs-kobetsu). G16 established the 28h/week rule for 包括許可 holders. This card (G48) addresses the specific pattern for 家族滞在 (Dependent) status holders, who are often mistakenly believed to be free to work because they are in Japan with a working family member.

Key errors to block:

1. **"家族ビザ（家族滞在）なら，普通に働ける。"** — incorrect. 家族滞在 is NOT a work-permitted status without a separate 資格外活動許可 application.
2. **"家族滞在でも，学生と同じように28時間働けるはず。"** — partially correct but incomplete: the 28h/week limit applies once 資格外活動許可 is obtained; but it is not automatically granted.
3. **"配偶者が働いているから，家族滞在の私も当然働いていい。"** — incorrect. The principal visa holder's work permission does not extend to dependents.
4. **"家族滞在の資格外活動許可は留学と同じ包括許可だ。"** — needs clarification: 家族滞在 can obtain 包括許可 via the same ISA application route, but it is NOT automatically granted at the time of status issuance (unlike many 留学 grants).

## Trigger

Use this card when the user says:

- "家族ビザで日本に来たが，働いてもいいですか？"
- "家族滞在の資格外活動許可はどうやって取りますか？"
- "夫（妻）が技術ビザで働いているが，私（家族滞在）も働けますか？"
- "家族滞在で何時間まで働けますか？"
- "家族滞在でパートをしているが，特に問題ないですか？"
- any pattern assuming 家族滞在 automatically permits employment.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kazoku-taizai | L4 | 出入国在留管理庁「在留資格『家族滞在』」 | https://www.moj.go.jp/isa/applications/status/dependent.html | 2026-05-15 | Confirms: 家族滞在 = status for dependents of certain status holders; employment not included in the designated activity. |
| isa-shikakugai-kazoku | L4 | 出入国在留管理庁「在留資格『留学』及び『家族滞在』を有する者等の『資格外活動許可』」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html | 2026-05-15 | G16/G24 source. Lists 家族滞在 alongside 留学 as statuses eligible for 包括許可 under 資格外活動許可. Same 28h/week limit applies. Same 風俗禁止. |
| isa-shikakugai-app | L4 | 出入国在留管理庁「資格外活動許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-8.html | 2026-05-15 | G16 source. Application procedure for 資格外活動許可; separate application required. |

## Official Rule Or Source Fact

**家族滞在 activity designation:**
家族滞在 is designated for: 日常的な家事・育児などの家庭生活 (daily household activities, childcare, etc.) and education. Employment is NOT a designated activity under 家族滞在.

**Work without 資格外活動許可 = 資格外活動:**
Engaging in employment without 資格外活動許可 while holding 家族滞在 constitutes 資格外活動 (unauthorized activity) — a violation under 入管法, subject to criminal penalties and 在留資格取消 risk (G26 cross-ref).

**資格外活動許可 — 包括許可:**
家族滞在 holders CAN apply for 包括許可 (comprehensive work permission) under 資格外活動許可. If granted:
- Same 28h/week limit as 留学 holders (G16 cross-ref)
- Same 風俗業 prohibition (unconditional)
- Same 1日8時間 limit during educational long-vacation periods (if applicable — primarily designed for 留学)

**Key differences from 留学 (important):**
| | 留学 | 家族滞在 |
|---|---|---|
| 包括許可の自動付与 | 多くの場合，在留資格許可時に付与 | 自動付与なし — 別途申請が必要 |
| 28h/week 上限 | 適用 | 適用（許可後） |
| 風俗禁止 | 適用 | 適用 |
| 許可前の就労 | 違反 | 違反 |

**What "included in 在留カード" means:**
If the 在留カード of a 家族滞在 holder states 「就労不可」 (cannot work), they have NOT been granted 資格外活動許可 and must NOT work.
If the card states 「資格外活動許可（包括）」or similar, they have been granted work permission within the stated limits.

**Application route:**
A 家族滞在 holder who wants to work must:
1. Apply for 資格外活動許可 at the local ISA office
2. Wait for approval
3. Begin working only after 許可 is received
Starting work before approval = unauthorized activity regardless of application status (G17 cross-ref: pending application ≠ permission).

## Safe Answer Behavior

- When a 家族滞在 holder asks if they can work: confirm they cannot work without a separate 資格外活動許可; they must apply first.
- When a 家族滞在 holder says they have been working informally: this is a P1 risk; they may be committing 資格外活動; route to professional immediately.
- When asked about the 28h/week limit: confirm it applies to 家族滞在 holders with 包括許可, but emphasize that the permit must be obtained first.
- Check their 在留カード for the work-permission notation before advising.
- Do not say "家族ビザでも配偶者が仕事をしているから大丈夫."

## Must Say

- 家族滞在は就労が認められていない在留資格。資格外活動許可を別途取得しなければ，アルバイトを含む就労は認められない。
- 資格外活動許可（包括）を取得した場合，週28時間以内の就労が可能。ただし風俗営業等は禁止。
- 留学と異なり，家族滞在への資格外活動許可は在留資格許可時に自動付与されるわけではない。入管で別途申請し，許可を得てから就労を開始する必要がある。
- 在留カードに「就労不可」と記載されている場合は，資格外活動許可を取得していないため，就労は認められない。

## Must Not Say

- 「家族ビザだから働いても問題ない。」
- 「配偶者が就労ビザを持っているから，家族滞在でも当然働ける。」
- 「資格外活動許可は申請中だから，とりあえず働いていい。」（申請中 ≠ 許可）
- 「家族滞在と留学は同じルールで，自動的に28時間働ける。」

## Deep Water Triggers

- 家族滞在 holder has already been working without 資格外活動許可 for several months.
- 家族滞在 holder's principal visa holder changed status (e.g., from employment to business manager) — does this affect the dependent's work permission?
- 家族滞在 holder's principal visa holder lost their job — does this affect the dependent's status?
- 家族滞在 holder wants to become a freelancer or start a business.
- 家族滞在 holder working 28h/week in one job + additional hours in another job — cumulative limit applies.

## User Next Actions

This is not user-facing copy. For answer routing:

- For 家族滞在 holders with no current 資格外活動許可 but wanting to work: route to ISA 資格外活動許可申請 (16-8.html).
- For those already working without permission: flag as unauthorized activity (G26/G27 cross-ref risk); route to professional immediately for remediation assessment.
- For those working within 包括許可: confirm compliance if within 28h/week and not 風俗業.
- For status change questions (principal lost job): route to professional — 家族滞在 basis may be affected.

## Unknown Fields

- Whether ISA grants 包括許可 simultaneously with the initial 家族滞在 status grant in some prefectures (practice may vary).
- The exact form of the 在留カード notation for 家族滞在 holders with 包括許可.
- Whether a 家族滞在 holder can apply for 個別許可 for activities beyond 28h/week in specific circumstances.

## Needs Domain Flags

- needs_domain (P1): if the principal 在留資格 holder's status changes or is revoked, does the 家族滞在 dependent's 資格外活動許可 automatically lapse?
- needs_domain (P1): can a 家族滞在 holder apply for 個別許可 for a specific employment situation that would exceed 28h/week?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kazoku-001 | "家族ビザで日本に来ました。働いてもいいですか？" | State: 家族滞在 cannot work without 資格外活動許可; must apply separately; cannot work before approval. |
| kazoku-002 | "家族滞在の資格外活動許可があれば，週何時間働けますか？" | Confirm: 28h/week under 包括許可; 風俗業 prohibited; same rules as G16; must have permit in hand first. |
| kazoku-003 | "配偶者が技人国を持っているから，私（家族滞在）も働いていいですか？" | State: principal holder's permission does NOT extend to dependent; separate 資格外活動許可 required for the 家族滞在 holder. |

## Source Notes

- 家族滞在 as a non-work status and the 資格外活動許可 requirement are confirmed from ISA 家族滞在 status page and G16/G24 sources (nyuukokukanri07_00003.html).
- The 28h/week limit and 風俗禁止 apply equally to 家族滞在 holders with 包括許可 — confirmed from G16 source.
- The "not automatically granted at status issuance" point is widely documented in practice but the exact ISA statement was not extracted in this session; marked in source quality as official-indirect for this specific sub-point.
- Cross-ref G16 (28h/week rule), G17 (pending ≠ permission), G24 (包括 vs 個別), G26 (cancellation risk for unauthorized activity).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 008 G48. G16 complement focused on 家族滞在. Core facts: no automatic work permission; 資格外活動許可 must be separately obtained; 28h/week after 包括許可 granted; pending application ≠ permission (G17 cross-ref). Cross-ref G16, G17, G24, G26.
