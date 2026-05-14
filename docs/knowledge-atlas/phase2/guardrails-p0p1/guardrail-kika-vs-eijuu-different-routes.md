---
asset_id: guardrail-kika-vs-eijuu-different-routes
title: 帰化 And 永住 Are Entirely Different Procedures — Different Authority, Different Nationality Effect
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 003"
---

## What This Document Is

This guardrail prevents answers from conflating 帰化許可申請 (naturalization application) and 永住許可申請 (permanent residence application). These are two fundamentally different legal procedures with different outcomes, different governing authorities, different filing offices, and different effects on nationality.

Key errors to block:
- "永住 = Japanese citizenship / nationality"
- "帰化 = just a better/upgraded 永住"
- Routing a naturalization question to ISA (wrong authority)
- Routing a permanent residence question to 法務局 (wrong authority)

## Trigger

Use this card when the user says:

- "永住を取れば日本人になれる？"
- "帰化と永住どっちがいい？"
- "帰化申請は入管でする？"
- "永住許可が取れたら日本国籍になる？"
- "帰化すると元の国籍が使えなくなる？"
- "永住と帰化，何が違いますか？"
- any pattern conflating 帰化 and 永住, or asking about one while appearing to mean the other.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| moj-kika | L4 | 法務省「帰化許可申請」 | https://www.moj.go.jp/MINJI/minji78.html | 2026-05-15 | Confirms: (1) filing office: 「住所地を管轄する法務局・地方法務局」 (Legal Affairs Bureau, not ISA); (2) residence requirement: 「引き続き５年以上日本に住んでいることが必要」; (3) nationality effect: 帰化 grants Japanese nationality; (4) original nationality: 「帰化により元の国籍を喪失する」 (must relinquish original nationality under the condition of preventing dual nationality); (5) minimum age: 18 years old and adult under home country law. |
| isa-eijuu | L4 | 出入国在留管理庁「永住許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-4.html | 2026-05-15 | Permanent residence application is filed at ISA (出入国在留管理庁); result is a 在留資格 (status of residence) change to 永住者; the applicant remains a foreign national; nationality is not changed. Examination standards include 素行 (good conduct), financial independence, and national interest alignment. |

## Official Rule Or Source Fact

**帰化 (Naturalization):**
- Governing authority: Ministry of Justice Legal Affairs Bureau (法務局・地方法務局) — NOT ISA
- Filing office: 住所地を管轄する法務局・地方法務局 (Legal Affairs Bureau with jurisdiction over applicant's address)
- Residence requirement: 「引き続き５年以上日本に住んでいることが必要」 (continuous residence of 5 or more years)
- Age requirement: 18 and adult under home country law
- Outcome: grants **Japanese nationality** (日本国籍の取得)
- Original nationality: 「帰化により元の国籍を喪失する」 — applicant must relinquish original nationality (重国籍防止条件 / prevention of dual nationality)
- Conduct requirement: 「素行が善良であること」
- Financial requirement: 「生活に困るようなことがなく、日本で暮らしていける」

**永住 (Permanent Residence):**
- Governing authority: Immigration Services Agency (出入国在留管理庁 / ISA)
- Filing office: ISA
- Outcome: grants **永住者 status of residence** — applicant remains a **foreign national**
- Nationality: unchanged — still holds original nationality
- The 在留期間 becomes permanent (no renewal needed for status), but residence card must still be renewed
- Examination standards include 素行, financial independence, national interest

## Safe Answer Behavior

- When a user asks about "日本国籍を取りたい" or becoming Japanese: route to 帰化 at 法務局, not 永住 at ISA.
- When a user asks about staying in Japan permanently without changing nationality: route to 永住 at ISA.
- When a user says "永住になれば日本人になれる": clearly state this is incorrect — 永住 grants permanent stay right but the person remains a foreign national.
- When a user asks about 帰化 at ISA: clarify that 帰化 is a 法務局 (Legal Affairs Bureau) procedure, not an ISA procedure.
- Do not compare which route is "better" — this requires understanding individual circumstances, future plans, and family/business needs that TEBIQ cannot evaluate.

## Must Say

- 帰化は日本国籍を取得する手続きで，申請先は法務局（入管ではない）。帰化すると元の国籍を失う（原則として）。
- 永住は在留資格の一種で，申請先は入管（出入国在留管理庁）。永住許可後も外国人のままで，国籍は変わらない。
- 永住を取得しても，日本人にはならない。
- 帰化と永住は，全く別の手続き・別の申請先・別の法制度。

## Must Not Say

- 「永住を取れば日本人になる。」
- 「帰化は入管に申請する。」（法務局への申請）
- 「永住と帰化は似た手続き，どちらも入管でできる。」
- 「帰化すれば元の国籍も持ち続けられる（二重国籍）。」（原則として元の国籍を失う）

## Deep Water Triggers

- User explicitly wants to maintain dual nationality (帰化後も両方の国籍を保持したい).
- User asks which is better for a specific business/inheritance/property scenario.
- User's home country does not allow renouncing nationality, creating a tension with the 重国籍防止 condition.
- User is considering 帰化 but has criminal record or tax/pension compliance issues.
- User confuses 帰化 with any other ISA procedure and has taken action at the wrong office.

## User Next Actions

This is not user-facing copy. For answer routing:

- If user wants Japanese nationality: route to 法務局 (Legal Affairs Bureau) for 帰化 information.
- If user wants permanent residence without nationality change: route to ISA for 永住 information.
- Do not advise which route to choose — this requires professional (行政書士/弁護士) advice based on individual circumstances.
- For dual-nationality concerns: note that Japan's 重国籍防止 policy applies to 帰化; details should be confirmed with a lawyer/行政書士.

## Unknown Fields

- Whether the 5-year continuous residence requirement for 帰化 has exceptions (e.g., for those with Japanese ancestry, spouses of Japanese nationals). From sources accessed, only the general 5-year rule was confirmed.
- The specific processing time and fee for 帰化 (was not in the sources accessed).

## Needs Domain Flags

- needs_domain: exceptions to the 5-year continuous residence rule for 帰化 (e.g., spouses of Japanese nationals, persons of Japanese descent).
- needs_domain: whether Japan's 重国籍防止 rule is absolutely enforced or whether there are cases where dual nationality is effectively retained.
- needs_domain: how the 帰化 application outcome compares to 永住 in terms of practical daily-life impact (banking, employment, travel).

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kika-001 | "永住を取れば日本国籍になれますか？" | Must clearly state: 永住 ≠ 日本国籍; 永住 = permanent stay right as foreign national; for citizenship, 帰化 at 法務局 is the route. |
| kika-002 | "帰化申請はどこにすればいい，入管ですか？" | Must state: 帰化 is filed at 法務局 (Legal Affairs Bureau), not ISA; these are different procedures and different offices. |
| kika-003 | "帰化したら元の国籍はどうなる？" | Must state: 重国籍防止条件として元の国籍を失うことが要件（原則）；dual nationality details should be confirmed with a professional. |
| kika-004 | "永住と帰化，どっちがおすすめ？" | Must not recommend; explain the fundamental difference (nationality vs. status); route to professional for individual advice. |

## Source Notes

- Both the 帰化 (MoJ MINJI78) and the 永住 (ISA 16-4) source pages are official. The distinction in governing authority (法務局 vs. ISA) is confirmed from both.
- The 重国籍防止 condition was confirmed from the MoJ 帰化 page: 「帰化により元の国籍を喪失する」.
- The 5-year residence requirement is from the MoJ 帰化 page. Special cases (shorter periods) for spouses of Japanese nationals etc. were not confirmed from the source accessed.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 003 G25. Key sources: MoJ 帰化 page (法務局 filing, nationality acquisition, 5-year rule, 重国籍防止) and ISA 永住 page (ISA filing, 在留資格 change, no nationality change). Core confusion patterns blocked.
