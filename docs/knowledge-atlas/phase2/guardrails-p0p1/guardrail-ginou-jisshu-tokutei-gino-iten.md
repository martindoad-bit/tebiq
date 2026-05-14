---
asset_id: guardrail-ginou-jisshu-tokutei-gino-iten
title: 技能実習2号→特定技能1号 移行 — 日本語試験免除（全分野）；技能試験は関連分野のみ免除
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

This guardrail prevents errors about the 技能実習2号 → 特定技能1号 transition route — specifically about the exam exemption conditions. Key errors to block:

1. **"技能実習2号を修了すれば，どの特定技能分野でも技能試験が免除される。"** — incorrect. The 技能試験 exemption only applies when there is a recognized 関連性 between the 技能実習2号 occupation/work and the intended 特定技能 activity.
2. **"技能実習2号の修了で日本語試験も技能試験も全部免除。"** — partially correct: 日本語試験 IS unconditionally exempt; 技能試験 is only exempt if the field/role is related.
3. **"技能実習2号を少しでもやればすぐ移行できる。"** — incorrect. 「良好に修了」 requires completing at minimum 2 years and 10 months according to the approved plan.
4. **"技能実習1号や3号修了でも試験免除になる。"** — only 技能実習2号 「良好修了」 triggers the exemption; 1号 or early termination does not.

## Trigger

Use this card when the user says:

- "技能実習2号から特定技能1号に移行したいが，試験を受けなければなりませんか？"
- "技能実習修了者は特定技能の試験が免除されると聞いたが，どの試験ですか？"
- "別の分野（職種）の特定技能に移行しても試験免除になりますか？"
- "技能実習2号を修了したが，特定技能への移行はどうすればいいですか？"
- "良好に修了とはどういう意味ですか？何年修了すれば試験免除？"
- any pattern treating all exams as uniformly exempt, or treating any 技能実習 completion as triggering exemption.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-faq | L4 | 出入国在留管理庁「特定技能制度に関するＱ＆Ａ」 | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | Key quotes on both trial exemption conditions: 日本語試験免除 (unconditional across all sectors if 2号良好修了); 技能試験免除 (conditional on 関連性 to target occupation). Also: 「良好に修了」 definition. |

## Official Rule Or Source Fact

**Japanese text — confirmed from ISA Q&A (faq.html):**

> 「外国人が技能実習２号を良好に修了している場合には原則として技能実習の職種・作業にかかわらず日本語試験が免除されます。さらに、従事しようとする業務と技能実習２号の職種・作業に関連性が認められる場合は技能試験も免除されます。」

**「良好に修了」 — confirmed definition from ISA:**

> 「技能実習２号を良好に修了しているとは、技能実習を計画に従って２年１０月以上修了していることをいいます。」

Minimum period: **2 years and 10 months** completed according to the approved plan.

**Exam exemption matrix:**

| 試験 | 免除条件 |
|---|---|
| 日本語試験 | 技能実習2号良好修了 → **原則すべての分野で免除**（職種・作業の一致不要）|
| 技能評価試験 | 技能実習2号良好修了 + **従事しようとする業務と技能実習2号の職種・作業に関連性が認められる場合**のみ免除 |

**Key practical implications:**

1. **Same-sector move**: If the target 特定技能 field is the same as or related to the 技能実習2号 occupation → BOTH exams are exempt.
2. **Different-sector move**: If moving to an unrelated 特定技能 sector → 日本語試験 is still exempt; but 技能試験 must be taken.
3. **Premature departure / early termination**: Completing only 2 years (instead of 2 years 10 months) does NOT satisfy the 「良好修了」 definition — no exemption.
4. **技能実習1号 only**: Only completing 1号 does NOT trigger any exemption.
5. **技能実習3号**: Completing 3号 implies 2号 was also completed; qualifies for exemption (assuming 良好修了 of 2号).

**Relevant cross-reference:**
The 育成就労制度 (starting April 1, 2027) will replace 技能実習 (G37 cross-ref). The transition route from 育成就労 to 特定技能 is separately being established. This card covers the current 技能実習2号 → 特定技能1号 route under existing rules.

## Safe Answer Behavior

- When a user asks about exam exemption for all sectors: clarify that 日本語試験 exemption is across all sectors, but 技能試験 exemption requires related occupation.
- When a user asks about the 「良好修了」 condition: confirm the 2 years 10 months requirement according to plan.
- When a user asks about moving to a completely different field: confirm they must take the 技能試験 in the target field; 日本語試験 is still exempt.
- Do not say "技能実習2号を修了すれば，すべての試験が免除される."

## Must Say

- 技能実習2号を良好に修了（計画に従って２年10か月以上）した場合，原則として**日本語試験は職種を問わず免除**される。
- 技能評価試験（技能試験）の免除は，**従事しようとする業務が技能実習2号の職種・作業と関連性がある場合のみ**。異なる分野・職種に移行する場合は技能試験の受験が必要。
- 「良好に修了」の定義は，認定された計画に従って2年10か月以上修了していること。早期離脱や計画未達は「良好修了」とはみなされず，試験免除が適用されない。

## Must Not Say

- 「技能実習2号修了なら，どの特定技能分野でも技能試験が免除される。」
- 「技能実習を少しでもやれば，試験は全部免除。」
- 「2年修了すれば良好修了と認められる。」（2年10か月以上が必要）
- 「技能実習1号修了者も試験免除の対象。」

## Deep Water Triggers

- Worker completed 技能実習2号 but left early (2 years, not 2 years 10 months) — wants to know if exemption applies.
- Worker wants to move to a completely different 特定技能 sector (e.g., from food manufacturing to hospitality) — which exams are needed?
- Worker completed 技能実習2号 and 3号 — does 3号 completion give additional exemptions?
- Worker is under the new 育成就労制度 (starting April 2027) — does the same exemption route apply?
- Worker's 技能実習2号 was "良好修了" but the skill category in the certificate is slightly different from the target 特定技能 sector — how is 関連性 assessed?

## User Next Actions

This is not user-facing copy. For answer routing:

- For same-sector moves: confirm both exams exempt; route to 特定技能 application process and hiring organization guidance.
- For different-sector moves: confirm 日本語試験 exempt; confirm 技能試験 must be taken in target field; route to sector-specific exam information.
- For 「良好修了」 confirmation: advise checking the 技能実習 evaluation certificate; route to the 技能実習機構 (OTIT) or employing organization for documentation.
- For 育成就労 → 特定技能 transition: note this is a separate route under the new system (G37 cross-ref); refer to dom-ikusei-001 for needs_domain status.

## Unknown Fields

- The specific list of occupation/sector pairs that are considered 関連性あり vs. 関連性なし for the 技能試験 exemption — ISA has guidance but this varies by sector.
- Whether the 関連性 assessment is made by ISA or by the 特定技能 receiving organization.
- Whether 技能実習2号 completed under the old 技能実習 law (pre-2027 transition) is treated identically to 技能実習 completed under transition rules.

## Needs Domain Flags

- needs_domain (P1): for a specific 技能実習2号 occupation → 特定技能 sector combination, how is 関連性 assessed? Is there an official mapping list?
- needs_domain (P1): what happens if the worker's 技能実習2号 良好修了 certificate was issued but the worker then had their 技能実習 status revoked — does the exemption still apply?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| jisshu-iten-001 | "技能実習2号修了後，別の分野の特定技能に移行したいが，試験は免除されますか？" | State: 日本語試験 = 分野を問わず免除; 技能試験 = 関連性がある場合のみ免除; 異なる分野では技能試験が必要. |
| jisshu-iten-002 | "技能実習を2年でやめましたが，特定技能の試験は免除されますか？" | State: 「良好修了」 = 2年10か月以上（計画どおり）が必要; 2年のみでは良好修了に該当しない → 免除なし. |
| jisshu-iten-003 | "技能実習2号を良好修了したら，特定技能の試験はすべて免除ですか？" | State: 日本語試験 = 免除; 技能試験 = 関連分野への移行のみ免除; 全面免除ではない. |

## Source Notes

- Both exam exemption rules confirmed from ISA Q&A (faq.html) — official Japanese text extracted directly.
- 「良好修了」 definition (2年10か月以上, 計画どおり) confirmed from same source.
- The 「関連性」 assessment criteria (which pairs qualify) are not detailed on the accessed page — marked needs_domain.
- 育成就労 → 特定技能 transition route is under the new system (G37 cross-ref) and separately tracked as dom-ikusei-001.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 008 G46. Key source: ISA 特定技能 FAQ (faq.html). Core facts: 日本語試験 = unconditionally exempt across all sectors; 技能試験 = exempt only for related occupations; 「良好修了」 = 2yr10mo min. Cross-ref G33 (特定技能1号/2号 boundary), G37 (育成就労 = new system).
