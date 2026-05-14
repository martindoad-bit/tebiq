---
asset_id: guardrail-tokutei-katsudo-scope-boundary
title: 特定活動 — Permitted Activities Are Individually Designated; Not A General "Catch-All" Status
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 004"
---

## What This Document Is

This guardrail prevents answers from treating 特定活動 (Designated Activities) as a flexible "catch-all" status that permits a broad range of activities. 特定活動 is the opposite: the holder's permitted activities are **individually designated** on the 指定書 (designation document) attached to their residence card. Only the specific activities named on the 指定書 are permitted.

Key errors to block:
- "特定活動があれば，なんでも仕事できる。"
- Treating 特定活動 as equivalent to 技人国 or 就労 statuses without checking the 指定書 content.
- Assuming an 内定者 特定活動 holder can start work immediately upon receiving an offer.
- Assuming a 求職者特定活動 holder can take on paid employment while job-searching.
- Not explaining that the 指定書 is the binding document — not just the status category label.

## Trigger

Use this card when the user says:

- "特定活動ビザで働ける？"
- "特定活動（内定者）で研究のアルバイトをしていい？"
- "特定活動だから，就職先が決まり次第働いてもいい？"
- "特定活動（求職者）で日本で働きながら就職活動できる？"
- "特定活動とはどんなビザ？何でもできる？"
- "特定活動のビザがあれば，日本でどんな仕事もできますか？"
- any pattern assuming 特定活動 = broad or flexible work permission.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tokutei-main | L4 | 出入国在留管理庁「特定活動」 | https://www.moj.go.jp/isa/applications/status/designatedactivities.html | 2026-05-15 | Key quote: 「法務大臣が個々の外国人について特に指定する活動」 — activities are individually designated by the Minister of Justice for each foreign national. Legal basis: 出入国管理及び難民認定法 第7条第1項第2号. Approximately 30 designated activity categories exist. Designation period: 「５年、３年、１年、６月、３月又は法務大臣が個々に指定する期間（５年を超えない範囲）」. |
| isa-tokutei-internship | L4 | 出入国在留管理庁「特定活動（短期滞在中のインターンシップ・サマージョブ等）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities03.html | 2026-05-15 | Lists specific 告示 category numbers: 告示9号 (インターンシップ), 告示12号 (サマージョブ), 告示15号 (国際文化交流). Confirms that each category is governed by a specific ministerial notification (法務省告示). |
| isa-tokutei-household | L4 | 出入国在留管理庁「特定活動（家事使用人）」 | https://www.moj.go.jp/isa/applications/status/designatedactivities01.html | 2026-05-15 | Confirms that permitted activities are 「活動の内容、雇用期間、報酬等の待遇を記載したもの」 — bounded by contract content, period, and compensation as specified in the designation. Activities outside this scope are not covered. |
| moj-kokuji | L3 | 法務省告示第百三十一号（特定活動告示一覧） | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h02.html | 2026-05-15 | Ministerial Notification No. 131; initially May 24, 1990; most recent amendment April 8, 2024 (Notification No. 31). Defines the enumerated 特定活動 categories. |

**Source gap note:** The 内定者 and 求職者 specific 告示 category text was not extracted in this session. This card is `needs_domain` for those specific 告示 categories pending official text confirmation.

## Official Rule Or Source Fact

**Confirmed general framework:**
- 特定活動 is a 在留資格 (status of residence) category where the specific permitted activities are designated by the Minister of Justice on a case-by-case basis.
- The binding document for a 特定活動 holder is the **指定書** (designation document) attached to the 在留カード.
- Activity types under 特定活動 include (not exhaustive): 内定者（就職活動終了後の待機）, 求職者（卒業後就職活動）, EPA介護福祉士候補者, ワーキングホリデー, 研究活動, 特定の文化活動補助, etc.
- These are defined by **法務大臣告示** (Ministerial Notification) — the ISA website lists them separately, not as a single unified permission.

**Key points for safe answers:**
- **内定者 特定活動**: the holder is waiting between receiving a job offer and starting work. The designated activity is generally limited to pre-employment preparation activities, NOT employment itself. Starting work before receiving a new status (typically 技人国 or 特定技能) would exceed the 指定書 scope.
- **求職者 特定活動**: the holder is job-searching after graduation. This does NOT include paid employment — job searching activities only within the designated scope.
- **ワーキングホリデー**: designated scope includes limited part-time work under specific conditions; this is not equivalent to general work permission.

**What the card cannot confirm without domain review:**
- The exact 指定書 text for any specific 特定活動 category.
- Whether specific incidental activities (e.g., a few hours of paid research assistance) fall within or outside a given 指定書 scope.
- How ISA interprets borderline activities for specific 告示 categories.

## Safe Answer Behavior

- When a user with 特定活動 asks if they can work: ask what is written on their 指定書; do not confirm work permission without 指定書 content.
- When a user identifies as 内定者 特定活動: clarify that employment begins only when status change is complete (to 技人国 or other work-eligible status); the 内定者 period is a waiting period, not a work permission.
- When a user identifies as 求職者 特定活動: clarify this status is for job-searching activities, not employment; paid work is not within the designated scope.
- Do not treat 特定活動 as equivalent to any standard work-eligible status.
- The 指定書 is always the definitive document — TEBIQ should not advise activity permission without knowing what the 指定書 says.

## Must Say

- 特定活動の在留資格では，認められる活動は在留カードに添付された指定書に記載された活動のみ。
- 指定書の内容によって，就労・アルバイト・研究補助などが認められるかどうかが異なる。
- 内定者として特定活動の許可を受けた場合，内定先での就労は在留資格変更後（例：技術・人文知識・国際業務）に行う。内定段階での就労は許可されていない。
- 求職者の特定活動は就職活動のための在留資格であり，報酬を受ける就労活動は認められていない。
- 特定活動 = 何でもできる，というわけではない。

## Must Not Say

- 「特定活動があれば，就職活動しながらアルバイトもできる。」
- 「内定が出たから，特定活動のまま働き始めてもいい。」
- 「特定活動は自由度が高いから，指定書に書いてないことでも多少はできる。」
- 「特定活動と技人国はほぼ同じ。」

## Deep Water Triggers

- User is an 内定者 with 特定活動 and employer wants them to start working before status change is processed.
- User is on 求職者 特定活動 and received a short-term paid assignment while job-searching.
- User's 指定書 has expired or the designated activities no longer match their actual activities.
- User is a ワーキングホリデー holder asking if their work hours have any limits.
- User's 特定活動 was granted for a specific activity (e.g., research supplement) and they want to know if a side job is allowed.

## User Next Actions

This is not user-facing copy. For answer routing:

- Ask user: what does your 指定書 say about permitted activities? (If they don't know, advise them to check the document attached to their 在留カード.)
- For 内定者: advise that status change application must be filed and approved before starting work; consult 行政書士/会社の担当者 for timing.
- For 求職者: advise that paid work is not within the designated scope; consult 行政書士 if they received a paid offer.
- For other 特定活動 types: TEBIQ cannot determine permitted activities without knowing the 指定書 content; route to professional.

## Unknown Fields

- The complete list of 法務大臣告示 categories and their exact permitted activity descriptions.
- Whether a 特定活動 holder can have a 資格外活動許可 layered on top of their designated activities.
- The specific 指定書 text for 内定者, 求職者, EPA, ワーキングホリデー categories.
- How ISA determines activity boundary violations under 特定活動 (vs. ordinary 資格外活動 violations).

## Needs Domain Flags

- needs_domain (P1): confirm the exact 告示 categories and their designated activity descriptions — TEBIQ cannot currently state precise 内定者/求職者 activity boundaries from confirmed sources.
- needs_domain (P1): can a 特定活動 holder hold a concurrent 資格外活動許可 for activities not in the 指定書?
- needs_domain (P1): what is the correct route when an 内定者 特定活動 holder has started work before status change, and what remediation options exist?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tokutei-001 | "内定者で特定活動ビザをもらいました，もう働いてもいいですか？" | Must clarify: 内定者 特定活動 = waiting period; work starts only after status change to work-eligible status; advise status change procedure. |
| tokutei-002 | "求職者の特定活動で就職活動していますが，アルバイトしていいですか？" | Must clarify: 求職者 特定活動 = job-search activities only; paid work is not within designated scope; route to professional for assessment. |
| tokutei-003 | "特定活動ビザですが何ができますか？" | Must ask: what does the 指定書 say? Cannot confirm activity permissions without 指定書 content. Explain the 指定書-based permission structure. |

## Source Notes

- The agent fetching the ISA 特定活動 page returned general confirmation of the designated-activities structure but did not extract specific 告示 category text. This card is therefore `needs_domain` for the specific 内定者/求職者 activity descriptions.
- The 内定者 and 求職者 categories are widely documented in immigration practice but must be confirmed from official 告示 text before runtime use.
- ワーキングホリデー hour limits were mentioned in ISA material but not extracted with sufficient precision for inclusion as Must Say facts.

## Changelog

- 2026-05-15: Initial needs_domain card as Batch 004 G28. Core framework: 特定活動 = 指定書-bound, not catch-all. 内定者 and 求職者 patterns documented. Specific 告示 text marked needs_domain pending official source confirmation.
