---
asset_id: guardrail-shikakugai-hokatsu-vs-kobetsu
title: 資格外活動許可 — 包括許可 vs 個別許可 Are Different; 包括 Comes With Status, 個別 Requires Separate Application
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 003"
---

## What This Document Is

This guardrail prevents two errors about 資格外活動許可 types:

1. **Error A**: User thinks they need to apply separately for 包括許可 (blanket permission) — when it is typically granted together with the 留学 status at the time of renewal/initial grant.
2. **Error B**: User thinks the 包括許可 they hold covers any activity, including those requiring 個別許可 (individual permission) or prohibited categories.

The two types are fundamentally different: 包括許可 covers a standard range of activities within a fixed hour limit; 個別許可 is case-by-case for activities not covered by 包括許可 and requires a separate formal application.

## Trigger

Use this card when the user says:

- "資格外活動許可を別に申請しないといけない？"
- "留学ビザで働くには何か申請が必要？"
- "包括許可と個別許可，どう違う？"
- "資格外活動許可を持っているが，もっと特殊な仕事がしたい"
- "包括許可があればどんな仕事でもできる？"
- any pattern where the user is unclear about whether additional application is needed or whether their existing permission covers a new activity type.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ryugaku-hokatsu | L4 | 出入国在留管理庁「『留学』の在留資格に係る資格外活動許可について」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html | 2026-05-15 | Describes 包括許可 for 留学 holders as a blanket permission for 「１週について２８時間以内（長期休業中は１日８時間以内）」 of income-generating work. Covered activities: translation/interpretation, language instruction, and standard student part-time work. |
| isa-shikakugai-general | L4 | 出入国在留管理庁「資格外活動許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-8.html | 2026-05-15 | Confirms two types exist: 包括許可 (blanket) and 個別許可 (individual). States that details differ by type: 「許可の種類（包括許可／個別許可）によって異なります」. Lists prohibited activities across both types. |
| isa-shikakugai-conditions | L4 | 出入国在留管理庁「資格外活動許可について（許可の要件等）」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html | 2026-05-15 | Condition for all 資格外活動許可: the proposed activity must not interfere with current-status obligations. Blanket permission grants a standard range; activities outside the standard range require 個別許可. |

## Official Rule Or Source Fact

- Two types of 資格外活動許可 exist: 包括許可 (blanket permission) and 個別許可 (individual permission).
- 包括許可 for 留学 holders: covers standard income-generating part-time work within the 28h/week limit (8h/day during long vacations). Typically granted together with the 留学 status — not a separate standalone application in most cases.
- 個別許可: for activities not covered by 包括許可, or where the activity type requires case-by-case assessment. Requires a separate formal 資格外活動許可申請 at the immigration bureau.
- Prohibited activities apply to BOTH types: 風俗営業、店舗型性風俗特殊営業、特定遊興飲食店営業 and related businesses.
- Condition for all types: the proposed activity must not interfere with the obligations of the current status (e.g., attending school for 留学 holders).

**Source gap:** Whether 包括許可 is automatically stamped on the card at the time of 留学 status grant or requires any explicit action by the applicant was not confirmed from the sources accessed in this session.

## Safe Answer Behavior

- For 留学 holders asking whether they can work part-time: ask whether they have 資格外活動許可 on their card and what type; if 包括許可 is present, standard part-time work within the hour limits is covered.
- For activities beyond the standard range (e.g., unique internship types, activities not clearly "student part-time work"): state that 個別許可 may be needed and a separate application is required.
- Do not say "you need to separately apply for permission to work at コンビニ/restaurant" — standard part-time work under 包括許可 does not require separate application if the card already shows the permission.
- Do not say "包括許可 covers any work" — prohibited categories always apply, and non-standard activities may require 個別許可.

## Must Say

- 包括許可は，通常の留学生アルバイトの範囲をカバーする。在留カードに記載済みであれば，別途申請不要。
- 個別許可は，包括許可の対象外となる活動を行う場合に，別途申請が必要。
- 風俗業等は，包括・個別を問わず，資格外活動許可での就労は不可。
- 在留カードで「資格外活動許可」の種別を確認すること。

## Must Not Say

- 「留学ビザで働くには，必ず別途申請が必要。」（包括許可が既にカードにあれば不要）
- 「包括許可があれば，どんな仕事でも問題ない。」（禁止業種・時間上限あり）
- 「個別許可と包括許可は同じもの。」（別物）

## Deep Water Triggers

- User holds 包括許可 and wants to perform an activity that is clearly in a grey area or unusual category.
- User's 留学 status was recently changed or renewed and they are unsure whether 包括許可 was re-granted.
- User asks whether a specific インターンシップ or 業務委託 arrangement falls under 包括許可 or needs 個別許可.

## User Next Actions

This is not user-facing copy. For answer routing:

- Advise user to check the 在留カード for whether 資格外活動許可 is noted and what type.
- For standard part-time work with 包括許可: confirm hour limits and prohibited categories.
- For unusual activities: advise 個別許可 application inquiry at the nearest immigration bureau.

## Unknown Fields

- Whether 包括許可 is always automatically granted at the time of 留学 status issuance, or whether certain schools or situations result in it not being granted.
- Whether activity-specific 個別許可 examples are published by ISA in a more detailed guidance document.

## Needs Domain Flags

- needs_domain: is 包括許可 always automatically included with the 留学 status, or is there a case where a student must proactively apply for it?
- needs_domain: specific examples of activities that require 個別許可 vs. those covered by 包括許可.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hokatsu-001 | "留学ビザでコンビニバイトしたい，申請が必要？" | Check whether 包括許可 is on the card; if yes, standard part-time work is covered within 28h/week. No separate application needed for standard バイト. |
| hokatsu-002 | "包括許可があればどんな仕事でもできますか？" | Must state: hour limits (28h/week, 8h/day vacation) and prohibited categories (風俗業等) still apply; unusual activities may need 個別許可. |
| hokatsu-003 | "个别许可和包括许可有什么区别？" | Explain: 包括許可 covers standard work within fixed limits; 個別許可 is case-by-case for non-standard activities; both prohibit 風俗業etc. |

## Source Notes

- The 包括許可 description for 留学 holders was confirmed from the ISA 留学資格外活動許可 page with hour limits. The automatic-grant question was not confirmed from sources accessed.
- The two-type distinction (包括/個別) was confirmed from the 資格外活動許可申請 page.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 003 G24. Key sources: ISA 留学資格外活動許可 page (包括許可 hour limits) and 資格外活動許可申請 page (two types). Standard vs. non-standard activity routing captured.
