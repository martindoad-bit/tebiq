---
asset_id: guardrail-hsp2-henkou-youken
title: 高度専門職2号への変更 — Not Automatic After 3 Years; Formal Application Required; Unlimited Residence
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

This guardrail prevents answers from treating 高度専門職2号 (HSP2) as an automatic upgrade from 高度専門職1号 (HSP1) after 3 years, or conflating the two statuses' benefits. Key errors to block:

1. "高度専門職1号で3年経てば，自動的に2号になれる。"
2. Not knowing that HSP2号 grants unlimited residence period (在留期間 = indefinite).
3. Confusing the 3-year HSP→PR shortcut with the HSP1→HSP2 transition.
4. Assuming HSP2 and PR (永住) are the same thing.

## Trigger

Use this card when the user says:

- "高度専門職1号で3年経ったら自動的に2号になる？"
- "高度専門職2号への変更はどうすればいい？"
- "高度専門職2号と永住，どちらがいい？"
- "高度専門職2号になると在留期限がなくなる？"
- "高度専門職2号は何年在留したら申請できる？"
- any pattern treating HSP2 as automatic, or conflating HSP2 with PR.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-hsp-main | L4 | 出入国在留管理庁「在留資格『高度専門職』（高度人材ポイント制）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html | 2026-05-15 | Confirms HSP1→HSP2 transition requires a formal application (在留資格変更許可申請); not automatic. Three-category structure (イ/ロ/ハ) retained in HSP2. |
| isa-hsp-qa | L4 | 出入国在留管理庁「高度人材ポイント制Ｑ＆Ａ」 | https://www.moj.go.jp/isa/applications/resources/newimmiact_3_qa.html | 2026-05-15 | Confirms: (1) HSP1→HSP2 requires 高度専門職1号で3年以上活動 + 70点以上 + 素行善良 + 日本国の利益に合致; (2) HSP2 = 在留期限を無期限; (3) HSP2 allows nearly all employment visa activities alongside HSP activities; (4) Legacy route: 特定活動で3年以上の高度人材は HSP2 直接申請可能. |

## Official Rule Or Source Fact

**Requirements for HSP1 → HSP2 transition (confirmed from ISA Q&A):**
1. 高度専門職1号で3年以上活動 (3+ years of activity under HSP1)
2. ポイント合計70点以上 (70+ points, same as HSP1 threshold — must be maintained)
3. 素行が善良であること (good conduct)
4. 日本国の利益に合すると認められること (alignment with Japan's national interests)
5. Activities fall under at least one of イ/ロ/ハ categories

**Transition is NOT automatic:**
> 「1号から2号への変更には別途申請が必要で、自動移行ではない。」

A formal **在留資格変更許可申請** must be filed. Reaching the 3-year milestone does not trigger automatic HSP2 status.

**HSP2号 key benefit — unlimited residence period:**
> 「在留期限を無期限とする」

- Under HSP2号, there is no expiry date for the 在留期間 — unlike HSP1 which has a standard 5-year or shorter period.
- However, HSP2号 is NOT the same as 永住 (permanent residence): the applicant remains on a designated status and their activities must continue to match their HSP2 designation.

**Expanded activity scope under HSP2:**
> 「イ・ロ・ハの活動とほぼすべての就労資格の活動を並行実施可能」

HSP2 holders can conduct their primary HSP activities alongside nearly all employment-visa-type activities (教授, 研究, 技術, 会計, 医療, 専門職等) — much broader than HSP1.

**Three-category structure (same as HSP1):**
- イ: 高度学術研究活動 (academic research)
- ロ: 高度専門・技術活動 (specialized professional/technical)
- ハ: 高度経営・管理活動 (management/executive)

**Legacy provision:**
- 高度外国人材として「特定活動」で3年以上活動している場合, can apply directly to HSP2 without going through HSP1.

**HSP2 vs. PR (永住) — key differences:**
| | HSP2号 | 永住 |
|---|---|---|
| 在留期間 | 無期限 (but status-bound) | 無期限 (status-independent) |
| 活動制限 | Must continue HSP-qualifying activities | No activity restriction |
| 申請先 | ISA (変更申請) | ISA (永住申請) |
| 国籍変化 | なし | なし |
| 在留カード更新 | 必要（在留期限ないが，カードは更新） | 必要 |

## Safe Answer Behavior

- When a user asks if HSP2 is automatic after 3 years: clearly state it is NOT automatic; 在留資格変更許可申請 is required; meeting the timeline does not trigger automatic transition.
- When a user asks about the difference between HSP2 and PR: explain both grant unlimited stay but HSP2 is still a designated-activity status (must maintain qualifying activities); PR is activity-unrestricted and more stable.
- When a user asks about HSP2 benefits: confirm unlimited 在留期間 + expanded activity scope.
- When a user asks if they can skip HSP1 and go directly to HSP2: confirm legacy 特定活動 route exists for those with 3+ years as 高度外国人材 in 特定活動.
- Do not conflate HSP2号 with 永住 — they are different statuses with different implications.

## Must Say

- 高度専門職1号から2号への変更は，3年の活動後に在留資格変更許可申請を行う必要があり，自動的には移行されない。
- 高度専門職2号の在留期間は無期限（在留期限なし）となるが，永住（在留資格「永住者」）とは異なり，活動内容は引き続き高度専門職の活動範囲に限られる。
- 変更要件：高度専門職1号で3年以上活動＋ポイント70点以上＋素行善良＋日本国の利益に合致。
- 高度専門職2号では，HSP活動に加えてほぼすべての就労資格の活動を並行して行うことができる。

## Must Not Say

- 「高度専門職1号で3年経てば，自動的に2号になれる。」
- 「高度専門職2号 = 永住。同じもの。」
- 「高度専門職2号になれば，どんな活動でも自由にできる。」（就労活動の幅は広がるが無制限ではない）
- 「ポイントが3年前に70点以上だったから，2号に変更できる。」（申請時点でも70点以上が必要）

## Deep Water Triggers

- User has been on HSP1 for 3 years and assumes they automatically became HSP2.
- User wants to know which is better — HSP2 or PR — for their specific situation (requires professional assessment).
- User's points have dropped below 70 at the 3-year mark; they want to know if HSP2 is still available.
- User is in a 特定活動 status (pre-HSP era designation) and wants to know if they can go directly to HSP2.
- User wants to take on a side business or secondary employment under HSP2.

## User Next Actions

This is not user-facing copy. For answer routing:

- For HSP1 users approaching 3-year milestone: confirm they must file a formal 在留資格変更許可申請 for HSP2; confirm point and conduct requirements must be met at time of application.
- For HSP2 vs. PR comparison: explain the differences above; route to professional (行政書士/弁護士) for individual situation assessment.
- For 特定活動 legacy users: confirm the direct HSP2 application route exists; route to professional for document requirements.

## Unknown Fields

- The specific document list required for the HSP1→HSP2 change application (beyond the general HSP application materials).
- Whether there is a formal waiting period before ISA processes HSP2 change applications.
- Whether HSP2 allows entirely new types of work not previously listed on the HSP1 指定書.

## Needs Domain Flags

- needs_domain (P1): what is the correct comparative advice framing for HSP2 vs. PR when a user asks which is more advantageous — TEBIQ must not recommend, but what factors should be highlighted?
- needs_domain (P1): if a user's points dropped between HSP1 grant and the 3-year mark, can they strengthen their points score before applying for HSP2?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hsp2-001 | "高度専門職1号で3年経ちました，自動的に2号になれますか？" | Must state: NOT automatic; 在留資格変更許可申請 required; confirm requirements (70pts, conduct, etc.). |
| hsp2-002 | "高度専門職2号と永住，どちらがいいですか？" | Explain differences; must not recommend either; route to professional for individual assessment. |
| hsp2-003 | "高度専門職2号になると在留期限はなくなりますか？" | Confirm: 在留期間は無期限（在留期限なし）; clarify this differs from 永住 in that HSP2 still requires qualifying activities. |

## Source Notes

- The ISA HSP status page and Q&A confirmed: non-automatic transition, 3+year/70pt requirements, unlimited 在留期間, expanded activity scope.
- The legacy 特定活動 → HSP2 direct route (Q48) is confirmed from the Q&A.
- Specific document requirements for the HSP2 変更申請 were not extracted from sources accessed — marked unknown.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 006 G38. Key sources: ISA HSP page + HSP Q&A. Core facts: non-automatic transition; 3yr+70pt requirements; unlimited 在留期間; expanded activity scope; NOT same as 永住.
