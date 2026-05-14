---
asset_id: guardrail-ryugakusei-shusseki-shinchoku
title: 留学生の在留更新 — 出席率・学習進捗は更新審査の判断要素；低出席率は更新不許可リスク
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official-indirect
last_checked_at: 2026-05-15
batch: "Batch 007"
---

## What This Document Is

This guardrail prevents answers from treating 留学 (Student) status renewal as purely procedural (i.e., "just renew if the visa period ends"), ignoring the substantive academic performance requirements that ISA reviews in renewal decisions. Key errors to block:

1. "出席率が低くても，期間内に申請すれば更新できる。"
2. "留学ビザの更新は書類を出せばほぼ自動で通る。"
3. "学校に通っていなくても，在籍しているなら在留更新できる。"
4. "留学生の出席率は入管には関係ない，学校内部のルールだ。"

**Important**: The specific attendance rate threshold (commonly cited as 70% in practice) was not confirmed from official ISA source text in this session. This card is marked `needs_domain` until official ISA text explicitly confirming the threshold is found. The underlying principle — that attendance and academic progress are material to renewal — is well-established from the ISA renewal criteria framework.

## Trigger

Use this card when the user says:

- "出席率が低いけど留学ビザの更新できますか？"
- "学校をあまり行っていないが，留学更新は問題ないですか？"
- "留学ビザの更新に成績や出席は関係ありますか？"
- "留学先の学校を休学したまま在留更新できますか？"
- "進学せず在籍し続けるだけで留学在留が維持できますか？"
- any pattern treating 留学 renewal as automatic without academic performance review.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ryugaku-main | L4 | 出入国在留管理庁「在留資格『留学』」 | https://www.moj.go.jp/isa/applications/status/student.html | 2026-05-15 | Confirms 留学 status definition and application procedures; specific attendance requirements not stated on main page. |
| isa-renewal-criteria | L4 | 出入国在留管理庁「在留期間更新許可申請」（G31 cross-ref） | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00058.html | 2026-05-15 | General renewal criteria: behavior, activities conforming to status, alignment with national interests. Attendance not named explicitly but "活動内容の適正" is a core criterion. |
| isa-nyusatsu-school | L4-indirect | 出入国在留管理庁（学校向け通知・在籍管理報告義務） | (school-side notice, not directly accessed) | 2026-05-15 | Schools with 留学 track are required to report on-roll status and attendance records; ISA uses these records in renewal review. Confidence: medium (general knowledge, not directly verified from ISA text). |

## Official Rule Or Source Fact

**Confirmed from general renewal criteria framework (G31 cross-reference):**

The renewal criteria for all statuses including 留学 require:
1. 素行が善良であること (good conduct)
2. 在留目的に沿った活動を行っていること (activities conform to status purpose)
3. 申請事由が在留の継続を必要とするものであること
4. 日本国の利益に合すると認められること

For 留学 specifically, "在留目的に沿った活動" means **actual academic study**. Persistent non-attendance or non-progress directly undermines the statutory basis for the status.

**School reporting obligations (medium confidence):**
- ISA-recognized educational institutions (告示校) are required to submit student status reports, including attendance records.
- ISA uses these reports when processing 留学 renewal applications.
- Systematically low attendance (commonly cited threshold: 70%, but not confirmed from official ISA text) is a flag in renewal review.

**Key practical distinctions:**
| | 状況 | 在留更新への影響 |
|---|---|---|
| High attendance + normal progress | 通常通り就学 | 低リスク |
| Low attendance (documented medical/valid reason) | 理由あり欠席 | 要書面説明 |
| Low attendance (no valid reason) | 不当欠席 | 更新不許可リスク高 |
| Enrolled but essentially not studying | 名義在籍 | 活動不適合 → 資格取消リスク |
| Withdrawn/expelled, no status change application | 在籍なし放置 | 即時リスク (G26 cross-ref) |

**Status change after leaving school:**
- If a student withdraws (中退) or is expelled (除籍), the 留学 status basis is eliminated.
- The student must either apply for a status change or depart.
- Remaining in Japan without applying for a status change constitutes an 活動不適合 situation (see G26).

## Safe Answer Behavior

- When a student asks if low attendance is OK for renewal: clearly state attendance is reviewed in renewal; persistent low attendance creates real non-renewal risk; cannot confirm it will be approved without knowing individual circumstances.
- When a student says they are enrolled but rarely attend: flag that "in-roll" is not the same as "studying" for 在留 purposes; ISA reviews actual activity conformance.
- When a student asks about休学: note that suspension of studies should be communicated to ISA; if no activity is occurring, there is no 在留 basis being fulfilled.
- Do not say "就学証明書を出せば更新は問題ない" — documents evidence enrollment, not compliance.

## Must Say

- 留学在留資格の更新では，出席率や学習の進捗状況が審査対象となる。出席率が著しく低い場合，在留目的（就学）に沿った活動が行われていないと判断され，更新不許可になるリスクがある。
- 学校に在籍していても，実質的に通っていない（名義在籍）状態では，在留資格の基礎となる活動がないと判断される可能性があり，資格取消（G26）の対象にもなりうる。
- 中退・除籍した場合は，在留資格変更または帰国が必要。放置は在留資格の活動不適合につながる。

## Must Not Say

- 「在籍証明書があれば出席率は関係ない。」
- 「期間内に申請書を出せば留学更新はほぼ自動で通る。」
- 「学校のルールであって入管の審査とは関係ない。」
- 「出席が低くても更新できた事例はある。」（個別事例を一般化してはならない）

## Deep Water Triggers

- Student has below 50% attendance for the past semester and wants to know if renewal is possible.
- Student has been on leave (休学) for over 6 months and wants to know if 留学 status is still valid.
- Student withdrew from school but has not applied for status change — still in Japan.
- Student's school closed or lost ISA recognition mid-enrollment.
- Student transferred from one school to another without notifying ISA.

## User Next Actions

This is not user-facing copy. For answer routing:

- For students with attendance concerns: route to professional (行政書士/弁護士) and advise consulting their school's international student office for a realistic assessment.
- For withdrawn students still in Japan: flag this as a P0-adjacent situation; route to professional immediately (status change or departure planning needed urgently).
- For休学situations: advise verifying with ISA directly or via a 行政書士 whether the specific休学arrangement maintains 在留 basis.

## Unknown Fields

- The official ISA-stated attendance threshold (if any exists as a fixed number) — commonly cited as 70% in practice but not found in official text in this session.
- Whether ISA has published specific numeric criteria for 留学 renewal in any official 通達 or 運用要領.
- The exact format of school-side attendance reporting obligations to ISA.
- Whether ISA treats student-initiated (自己都合) and school-initiated (処分) absence differently in renewal review.

## Needs Domain Flags

- needs_domain (P1): what is the official ISA-confirmed attendance threshold (if any) for 留学 renewal risk? The 70% figure is widely cited but the session agent could not find official ISA text. Must be confirmed from ISA 通達/運用要領 or direct ISA correspondence.
- needs_domain (P1): does休学 (approved leave of absence from school) interrupt the 在留 basis for 留学? Or is it treated as a continuation of valid status?
- needs_domain (P1): how does a student who has already violated attendance requirements disclose this without prejudicing their renewal application?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ryugaku-001 | "出席率が60%ですが留学ビザは更新できますか？" | State: attendance is reviewed in renewal; low rate creates non-renewal risk; cannot confirm outcome; route to professional. |
| ryugaku-002 | "学校を中退しましたが，まだ日本に滞在しています。留学ビザはどうなりますか？" | State: 中退 = 留学 basis eliminated; must apply for status change or depart; staying without action = 活動不適合 risk (G26 cross-ref). |
| ryugaku-003 | "留学ビザの更新審査で何が見られますか？" | State: general renewal criteria (G31); for 留学 specifically: attendance, academic progress, continuing enrollment; conduct; financial support. |

## Source Notes

- The attendance/progress requirements were not found in official ISA text on the pages accessed by the session agent (student.html, 16-3.html, nyuukokukanri07_00003.html).
- This card relies on the general renewal criteria framework (G31 cross-ref) and widely documented practice, not directly cited ISA text for the attendance threshold.
- State = needs_domain until official source text confirming the threshold is found.
- School-side reporting obligations are medium confidence only.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 007 G41. needs_domain (attendance threshold not confirmed in official ISA text). Core fact pattern: attendance is a renewal factor for 留学; low attendance = real risk; 中退 without status change = P1 issue. Cross-ref G26 (22-4 cancellation) and G31 (renewal criteria discretion).
