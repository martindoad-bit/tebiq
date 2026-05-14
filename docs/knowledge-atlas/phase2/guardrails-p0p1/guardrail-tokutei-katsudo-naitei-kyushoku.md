---
asset_id: guardrail-tokutei-katsudo-naitei-kyushoku
title: 特定活動（内定者・求職者）— Cannot Work At The Employer During 内定者 Period; Job-Seeker Has 28h/Week Limit Only
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

This guardrail is a focused companion to G28 (guardrail-tokutei-katsudo-scope-boundary). G28 establishes that 特定活動 = 指定書-bound. This card (G36) covers the two most common 特定活動 categories for university graduates — 内定者 (job-offer holders) and 求職者 (job-seekers) — with confirmed official source data on their specific permitted and prohibited activities.

Key errors to block:
1. "内定が出たから，内定先でもう働いてもいい。"（在留資格変更が先）
2. "内定者の特定活動ならアルバイトし放題。"（包括許可の28h/week上限適用）
3. "求職者の特定活動があれば，どこかで働きながら就職活動できる。"（28h/week + 資格外活動許可が必要）
4. "求職者の期間は無制限に延長できる。"（最大1年: 6か月+1回更新）

## Trigger

Use this card when the user says:

- "内定をもらいました，特定活動で内定先で働いてもいいですか？"
- "内定者の特定活動でアルバイトはできますか？"
- "卒業後，就職が決まらなければ求職者の特定活動を延長できますか？"
- "求職者の特定活動でアルバイトをしながら就職活動したい"
- "内定者特定活動と求職者特定活動，何が違いますか？"
- any pattern about employment or part-time work permissions during the 内定者 or 求職者 period.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-naitei | L4 | 出入国在留管理庁「特定活動（本邦大学等卒業者・内定者）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities15.html | 2026-05-15 | Confirms: (1) 内定先での就労は在留資格変更後; (2) 包括許可下で28h/week以内のアルバイト可; (3) 内定先でのインターンシップは28h超えが可能な場合あり. |
| isa-naitei-guide | L4 | 出入国在留管理庁「内定者に係る特定活動案内」 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html | 2026-05-15 | Confirms: 内定者は就職先での就労は認められない（「原則、就職先で働くことはできません」）; must change status to work-eligible 在留資格 before starting work. |
| isa-kyushoku | L4 | 出入国在留管理庁「特定活動（本邦大学等卒業者・求職者）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities14.html | 2026-05-15 | Confirms: (1) 初回6か月; (2) 1回延長で最大1年; (3) 推薦状（在籍していた教育機関）が必要; (4) 包括許可下で28h/week以内のアルバイト可. |
| isa-kyushoku-guide | L4 | 出入国在留管理庁「求職者に係る特定活動案内」 | https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html | 2026-05-15 | Confirms the 求職者 category requirements and restrictions including the 28h/week part-time work limit under 資格外活動（包括）許可. |

## Official Rule Or Source Fact

**内定者 (Job-offer holder) — 特定活動:**

Key confirmed quote:
> 「原則、『就職先』で働くことはできません」

- The designated activity is: waiting between job offer and start of employment (内定後の就職待機活動).
- Work at the 内定先 (the employer who made the offer) is NOT permitted during this period.
- Employment starts only after the status change to a work-eligible 在留資格 (typically 技術・人文知識・国際業務 or other qualifying status) is approved.
- Part-time work (アルバイト): permitted under 包括許可 up to **28h/week** at employers OTHER than the 内定先.
- Exception: internship at the 内定先 may be permitted for more than 28h/week in some cases — but this is a separate 個別許可 situation and must be confirmed with the individual's 指定書.

**求職者 (Job-seeker) — 特定活動:**

- Target: university graduates who have not yet found employment and are continuing their job search.
- Duration: **6 months initial + 1 renewal = maximum 1 year** total.
- Requirement: **推薦状** from the educational institution attended is required for application.
- Part-time work: permitted under 包括許可 up to **28h/week** — for general employment, not specifically job-search activities only.
- The 求職者 period does NOT permit unlimited employment — work is limited to 28h/week under 資格外活動許可.

**Common confusion points:**
| | 内定者 | 求職者 |
|---|---|---|
| Main activity | Waiting for job offer employer | Active job-searching |
| Work at 内定先 | 不可（在留資格変更が先） | N/A |
| Part-time (アルバイト) | 28h/week (包括) | 28h/week (包括) |
| Maximum duration | Until 在留資格変更 | 最大1年（6か月+1回更新） |
| School recommendation | Not required | 要 推薦状 |

## Safe Answer Behavior

- When an 内定者 asks if they can start working at their new employer: clearly state NO — they must change their 在留資格 first; work only begins after the new status is approved.
- When an 内定者 asks about アルバイト: confirm 28h/week is permitted (other than at the 内定先 employer) under 包括許可; not unlimited.
- When a 求職者 asks about extending the job-seeking period: state the maximum is 1 year (6 months + 1 renewal only); not extendable beyond that.
- When a 求職者 asks about working during the job-search period: confirm up to 28h/week is allowed under 資格外活動 包括許可; this is a 資格外活動 permission, not the designated activity itself.
- Do not tell an 内定者 they can start working at the 内定先 because "you already have the job offer."

## Must Say

- 内定者の特定活動では，内定先での就労は認められない。内定先で実際に働き始めるためには，在留資格変更許可（例：技術・人文知識・国際業務等）が必要。
- 内定者・求職者ともに，資格外活動（包括）許可の範囲内で，週28時間以内のアルバイトが可能（内定先以外の場合）。ただし無制限ではない。
- 求職者の特定活動は，6か月の初回期間＋1回の延長で最大1年が上限。それ以上の延長は認められない。
- 求職者の特定活動の申請には，在籍していた教育機関の推薦状が必要。

## Must Not Say

- 「内定があるから，今すぐ内定先で働いてもいい。」
- 「内定者の特定活動なら，アルバイトは無制限にできる。」
- 「求職者の特定活動は，就職が決まるまでずっと延長できる。」
- 「求職者の特定活動があれば，フルタイムで働ける。」

## Deep Water Triggers

- 内定者 already started working at the 内定先 before the status change was approved.
- 内定者 is being asked by the employer to start working urgently before the visa change.
- 求職者 has been in the period for 1 year and still has not found a job — what are their options?
- 求職者 wants to take a full-time job offer but still holds 求職者 特定活動.
- 内定者 wants to know if they can work more than 28h/week at a temporary part-time job during the waiting period.

## User Next Actions

This is not user-facing copy. For answer routing:

- For 内定者 starting work issue: route to professional immediately — unauthorized work at the 内定先 is a P0 issue (G17 cross-ref).
- For 求職者 approaching 1-year limit without employment: explain that extensions beyond 1 year are not available; discuss options (change status, return home, etc.) at a high level; route to professional for specific planning.
- For 内定者/求職者 アルバイト within 28h: confirm permitted under 包括許可 (G16 cross-ref for hour rules).
- For internship at 内定先 beyond 28h: this is a borderline case; route to professional or ISA for confirmation of 個別許可 need.

## Unknown Fields

- The exact 告示 category numbers for 内定者 (designatedactivities15) and 求職者 (designatedactivities14).
- Whether the 28h/week limit for 内定者 applies to the 内定先's affiliated companies or only to unrelated employers.
- The specific duration granted for 内定者 特定活動 (appears to be until 在留資格変更 is completed, but official page duration was not extracted in full).

## Needs Domain Flags

- needs_domain (P1): what is the correct TEBIQ answer route when an 内定者 has already started working at the 内定先 before the 在留資格変更 was approved? (P0 risk — cross-ref G17 dom-pending-001/002)
- needs_domain (P1): can a 求職者 who reaches the 1-year limit without finding employment apply for another status to extend their stay for job searching?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| naitei-001 | "内定をもらいました，特定活動で内定先で働いてもいいですか？" | Must state: 内定先での就労は在留資格変更後のみ; 変更申請が必要; route to process guidance. |
| kyushoku-001 | "求職者の特定活動で1年過ぎてしまいましたがどうすればいいですか？" | State: 求職者 特定活動 is maximum 1 year; no further extension; route to professional for status options. |
| naitei-002 | "内定者の特定活動でアルバイトできますか？週何時間まで？" | Confirm: up to 28h/week under 包括許可 (except at 内定先); not unlimited; same 28h/week rule applies. |

## Source Notes

- The "cannot work at 内定先 during 内定者 期間" quote 「原則、就職先で働くことはできません」 is confirmed from the ISA 内定者 guidance page.
- The 求職者 6-month + 1 renewal = maximum 1 year is confirmed from the ISA 求職者 page.
- The 推薦状 requirement for 求職者 is confirmed from the ISA 求職者 guidance page.
- The 28h/week limit under 包括許可 for both categories is confirmed from ISA work-permission pages.
- Exact 告示 category numbers were not confirmed from the accessed pages in this session.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 006 G36. Key sources: ISA 内定者 page (designatedactivities15 + guidance) and 求職者 page (designatedactivities14 + guidance). Core facts confirmed: 内定先 work ban; 28h/week アルバイト limit; 求職者 maximum 1 year; 推薦状 required.
