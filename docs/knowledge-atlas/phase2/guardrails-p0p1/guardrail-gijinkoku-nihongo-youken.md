---
asset_id: guardrail-gijinkoku-nihongo-youken
title: 技人国と日本語能力 — JLPT特定レベルの義務なし；業務遂行能力として実質的に要求される
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official-indirect
last_checked_at: 2026-05-15
batch: "Batch 009"
---

## What This Document Is

This guardrail prevents errors about the relationship between Japanese language ability and the 技術・人文知識・国際業務 (技人国) residence status. Key errors to block:

1. **"JLPT N2（またはN3）を取らないと技人国は取れない。"** — incorrect. 技人国 has no statutory JLPT level requirement. Language ability is evaluated contextually based on job duties.
2. **"日本語が全くできなくても技人国なら問題ない。"** — oversimplification. For roles where Japanese language ability is necessary for job performance, inability to communicate may affect the application.
3. **"国際業務なら英語だけできればいい，日本語は不要。"** — partially correct. 国際業務 (international business) subcategory focuses on language/cultural knowledge, but Japanese work environment requirements still apply for specific roles.
4. **"日本語能力検定を取得すれば技人国要件を満たせる。"** — incorrect framing. There is no JLPT-based criterion in the 技人国 statutory requirements; the evaluation is job-duties-based.

## Trigger

Use this card when the user says:

- "技人国（技術・人文知識・国際業務）を取るためにJLPTが必要ですか？"
- "JLPT N3しかないが，技人国ビザを申請できますか？"
- "日本語能力と技人国の関係を教えてください。"
- "技人国で働くには何級の日本語が必要ですか？"
- "国際業務なら日本語能力は不要ですか？"
- any pattern treating JLPT certification as a formal requirement for 技人国, or treating language ability as irrelevant.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-gijinkoku-main | L4 | 出入国在留管理庁「在留資格『技術・人文知識・国際業務』」 | https://www.moj.go.jp/isa/applications/status/gijinkoku.html | 2026-05-15 | Confirms activity subcategories (技術/人文知識/国際業務). No statutory JLPT requirement stated. Business requirement: 専門的・技術的分野 or 翻訳・通訳・語学指導 etc. |
| nyukan-gijinkoku-kijun | L1/L4 | 出入国管理及び難民認定法施行規則 別表第二（技術・人文知識・国際業務） | (法令) | 2026-05-15 | The 上陸基準省令 criteria for 技人国 focus on: educational background (専門学校/大学 graduation matching the field) OR 10 years practical experience. No JLPT level is specified. |
| g35-crossref | guardrail | guardrail-gijinkoku-gyomu-youken-boundary (G35) | internal | 2026-05-15 | Activity scope: three subcategories. Employment must match the subcategory. G35 established needs_domain on official exclusion language. |

## Official Rule Or Source Fact

**技人国 statutory requirements (confirmed — no JLPT requirement):**

The 上陸基準省令 (landing standards regulation) for 技術・人文知識・国際業務 requires:
1. **Educational background**: 大学卒業 (university graduation) or equivalent specialized training in a field matching the intended work; OR
2. **Experience**: 10 years of practical experience in the relevant field (for 技術/人文知識 subcategories); 3 years for 国際業務 in translation/interpretation/language education roles.

There is NO explicit statutory JLPT threshold (e.g., N2, N3) in the 上陸基準省令 for 技人国.

**However — practical relationship with language ability:**

The 国際業務 subcategory specifically covers activities requiring "knowledge of foreign cultures" — including:
- 翻訳・通訳 (translation, interpretation)
- 語学指導 (language instruction)
- 広報 involving foreign cultural knowledge
- 国際間の商取引 (international commercial transactions)

For roles within 国際業務 such as interpretation, Japanese proficiency is inherent in the job function. For translation/interpretation roles, ISA expects the applicant to actually be able to perform the work — but the specific JLPT level is not the gate.

**For 技術 and 人文知識 subcategories:**
The educational/experience criteria are the primary evaluation axes. Japanese language ability is not an explicit requirement for these subcategories — though practical ability to function in a Japanese workplace may be implicitly relevant to the employer's hiring decisions.

**What ISA actually evaluates:**
- Whether the applicant's education/experience matches the stated job duties
- Whether the job duties fall within the permitted subcategory
- The viability of the employment relationship (is the employer real? is the salary appropriate?)
- Conduct and prior compliance history

**Confidence note:** This card is needs_domain because the exact ISA operational guidance on language ability was not confirmed from directly-accessed official text. The framing is based on the statutory framework (上陸基準省令) and G35 cross-reference. The "no JLPT requirement" conclusion is structurally correct from the law text, but the operational nuance for borderline cases is not fully confirmed.

## Safe Answer Behavior

- When a user asks if JLPT is required: confirm there is no statutory JLPT requirement for 技人国; language ability is evaluated contextually based on job duties.
- When a user asks what Japanese level is needed: explain the evaluation is job-duties-based, not JLPT-level-based; for roles requiring Japanese communication, functional ability is expected but no specific exam score is required.
- When a user asks about 国際業務 and whether Japanese is needed: explain 国際業務 focuses on foreign cultural/language knowledge; some roles within it do require Japanese (interpretation); for others (e.g., foreign-language instruction), Japanese ability may be less central.
- Do not promise that JLPT N2 guarantees 技人国 — visa approval is based on job duties, not test score.

## Must Say

- 技術・人文知識・国際業務（技人国）には，法令上JLPTの特定レベルを取得しなければならないという要件はない。
- 在留資格審査では，申請者の学歴・職歴が業務内容に合致しているかが主な評価軸。日本語能力試験のスコアは直接の判断基準ではない。
- 業務内容によっては（例：通訳・語学指導），日本語または外国語の実質的な運用能力が求められるが，これはJLPT合格を意味するのではなく，業務遂行能力の問題。

## Must Not Say

- 「JLPTを取らないと技人国は申請できない。」
- 「JLPT N2以上が技人国の条件。」
- 「日本語能力は技人国に関係ない。」（業務によっては実質的に必要）
- 「JLPT N3取れば技人国の日本語要件を満たせる。」

## Deep Water Triggers

- User has JLPT N5 only and wants to work in a Japanese company in a technical role.
- User's employer claims they need JLPT N2 as a condition — is this an ISA requirement or employer preference?
- User works in a 通訳 (interpretation) role but has no formal JLPT certification — is 技人国 available?
- User previously worked in an IT role but wants to switch to a customer-facing Japanese-language sales role — different language expectations.
- User's application was denied and the denial reason mentioned inadequate job description — user asks if Japanese ability is the real issue.

## User Next Actions

This is not user-facing copy. For answer routing:

- For users asking about JLPT requirements: clarify no statutory requirement; if they are concerned about the application, route to professional (行政書士) for job-duties assessment.
- For employers asking about hiring foreign nationals without high JLPT: confirm no ISA requirement; individual job-duty matching is what matters.
- For 国際業務 roles: clarify the subcategory requires foreign cultural/language knowledge; the applicant must have the relevant ability for the job, not a specific exam score.

## Unknown Fields

- Whether ISA has issued specific internal guidance on how language ability affects 技人国 application evaluations for borderline cases.
- Whether the assessment of language ability differs between ISA regional offices.
- The official position on applicants who have graduated from a Japanese university (where instruction was in Japanese) — does this serve as language-ability evidence?

## Needs Domain Flags

- needs_domain (P1): in practice, does ISA factor in an applicant's Japanese language test score (JLPT) in evaluating 技人国 applications, even if it is not a statutory criterion?
- needs_domain (P1): for 国際業務 roles requiring Japanese (e.g., 通訳), what evidence of language ability is expected in the application — is JLPT the expected evidence or are there alternatives?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| nihongo-001 | "技人国にはJLPTが必要ですか？" | State: no statutory JLPT requirement; evaluation is job-duties-based; language ability relevant to specific role functions, not a formal exam requirement. |
| nihongo-002 | "JLPT N3しかないが技人国を申請できますか？" | State: JLPT level is not a statutory criterion for 技人国; the question is whether education/experience matches the intended job duties; JLPT alone does not determine eligibility. |
| nihongo-003 | "国際業務なら日本語能力は不要ですか？" | State: 国際業務 focuses on foreign cultural/language knowledge; some roles within it require Japanese proficiency (interpretation); others may not; the role-specific functional ability is what matters, not a JLPT level. |

## Source Notes

- No statutory JLPT requirement in 上陸基準省令 for 技人国 — confirmed from the statutory framework analysis.
- The job-duties-based evaluation approach is derived from the G35 cross-reference and general 技人国 activity scope confirmed from ISA status page.
- ISA operational guidance on how language ability is actually weighted in practice was not accessed in this session — marked needs_domain.
- Cross-ref G35 (技人国 activity boundary), G31 (renewal/change discretion).

## Changelog

- 2026-05-15: Initial needs_domain as Batch 009 G54. Core fact: no JLPT statutory requirement for 技人国. Job-duties-based evaluation. 国際業務 requires foreign cultural/language knowledge — functional ability relevant, not specific test score. Needs domain: ISA operational practice on language ability weighting.
