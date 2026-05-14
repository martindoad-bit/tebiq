---
asset_id: guardrail-tokutei-gino-tenshoku-joken
title: 特定技能の転職・雇用主変更 — 同一業務区分内のみ届出で転職可；異分野は在留資格変更必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 009"
---

## What This Document Is

This guardrail prevents errors about job changes (転職) for 特定技能1号 workers. Key errors to block:

1. **"特定技能1号なら，どこへでも自由に転職できる。"** — incorrect. Transfer is limited to the same 業務区分 (job category), or between categories where technical equivalence has been confirmed.
2. **"特定技能で別の分野に転職する場合も，届出だけでいい。"** — incorrect. Cross-sector transfers require 在留資格変更許可申請 (status change application), not just notification.
3. **"特定技能には転職制限がない（技能実習と違うから）。"** — partially correct but incomplete. Unlike 技能実習 (where employer change was prohibited in principle), 特定技能 DOES allow job changes, but with sector/job-category restrictions.
4. **"農業・漁業なら特定技能で複数雇用主はいつでも可。"** — oversimplification. Multiple employer arrangements in agriculture/fisheries have specific rules that differ from standard one-employer arrangements.

## Trigger

Use this card when the user says:

- "特定技能で転職したいが，どうすればいいですか？"
- "特定技能で別の会社（同じ業種）に移るとき，何か手続きが必要ですか？"
- "特定技能で飲食業から宿泊業に転職できますか？"
- "特定技能は技能実習と違って転職自由ですよね？"
- "特定技能の転職で在留資格変更は必要ですか？"
- any pattern treating 特定技能 job changes as fully unrestricted, or not understanding the sector/category boundary.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-faq-q13 | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」(Q13) | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | 転職条件: 「同一の業務区分内又は試験等によりその技能水準の共通性が確認されている業務区分間」; 分野・受入機関変更の場合は在留資格変更許可申請が必要. |
| isa-ssw-faq-q36 | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」(Q36) | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | 同一産業分野内の業務変更 → 特定技能雇用契約の変更に係る届出が必要. 異なる分野 → 在留資格変更許可申請が必要. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | 特定技能1号: 16 sectors; specific 産業分野 designation in 在留資格. Cross-sector move = different 在留資格 required. |

## Official Rule Or Source Fact

**Confirmed from ISA FAQ (Q13 — official Japanese text):**

> 「入管法上、特定技能外国人は、「相当程度の知識又は経験を必要とする」又は「熟練した」技能を有する業務に従事することが求められるところ、同一分野内であっても、使われる技能が異なる業務が複数存在し得る分野があります。そのような分野については、当該外国人が従事する業務に対応する技能を有していることが確保されてはじめて転職が認められることとなります。政府基本方針においては、分野内にさらに「業務区分」という区分けを設け、転職が認められる場合について、「同一の業務区分内又は試験等によりその技能水準の共通性が確認されている業務区分間」としています。なお、転職に当たり、受入れ機関又は分野を変更する場合は、在留資格「特定技能」の変更許可申請を行っていただく必要があります。」

**Confirmed from ISA FAQ (Q36 — official Japanese text):**

> 「従前の特定産業分野の範囲内で従事する業務を変更する場合には特定技能雇用契約の変更に係る届出を行う必要があります。」

> 「異なる分野への変更は在留資格変更許可申請が必要となります。」

**Transfer rules — matrix:**

| 転職ケース | 手続き |
|---|---|
| 同一業務区分内の転職（別の受入機関へ） | 在留資格変更許可申請 + 特定技能雇用契約変更届出 |
| 同一産業分野内で業務変更（業務区分内） | 特定技能雇用契約の変更に係る届出 |
| 異なる産業分野への転職 | 在留資格変更許可申請（必須） |
| 技能水準共通性確認済みの業務区分間 | 変更許可申請 + 技能確認 |

**Note on "受入機関変更" (changing the receiving organization):**
When the employer/receiving organization changes — even within the same sector and same 業務区分 — a formal 在留資格変更許可申請 is generally required (not just a notification). The notification covers changes to the employment contract within the current arrangement; changing the employer itself is a status-defining parameter.

**Comparison with 技能実習 (old system):**
| | 技能実習 | 特定技能1号 |
|---|---|---|
| 転職可否 | 原則不可（雇用主変更ほぼ禁止）| 同一業務区分内で可（手続き必要）|
| 分野変更 | 不可 | 在留資格変更申請が必要 |
| 手続き | 実習計画変更認定 | 変更許可申請 or 届出（区分による）|

**Comparison with 育成就労 (new system from April 2027, G37 cross-ref):**
育成就労 will allow employer change (転籍) after 1-2 years under more flexible conditions.

## Safe Answer Behavior

- When a 特定技能 worker asks about job change: confirm same-sector/same-業務区分 transfers are possible but require a formal procedure (not just casual switching); cross-sector requires 在留資格変更.
- When a worker compares 特定技能 and 技能実習: confirm 特定技能 has more flexibility, but it is not unrestricted.
- When a worker asks about changing to a completely different industry: confirm 在留資格変更許可申請 is required; it is not just a notification.
- Do not say "特定技能は自由に転職できる" — procedures are required.

## Must Say

- 特定技能1号の転職は，「同一の業務区分内又は試験等によりその技能水準の共通性が確認されている業務区分間」に限って認められる（ISA Q13確認）。
- 同一産業分野内での業務変更・転職の場合，特定技能雇用契約の変更に係る届出が必要。
- 異なる産業分野への転職には，在留資格「特定技能」の変更許可申請が必要（届出だけでは不可）。
- 特定技能は技能実習と比べて転職の自由度が高いが，完全に自由ではない。分野・業務区分の制限と，適切な手続きが必要。

## Must Not Say

- 「特定技能なら自由に転職できる，手続きは不要。」
- 「分野が違っても，届出するだけで転職できる。」
- 「特定技能は技能実習と違って転職制限がない。」（制限はある——範囲が異なるだけ）

## Deep Water Triggers

- 特定技能 worker wants to move from 飲食料品製造業 to 外食業 — are these different fields?
- 特定技能 worker's current employer closed and they want to find a new employer quickly — is there a grace period?
- 特定技能 worker wants to work for two employers in the same field simultaneously (農業/漁業 exception).
- 特定技能 worker wants to start a new role that requires a higher skill level in the same sector — does this affect the 業務区分?
- 特定技能 worker's status is about to expire and they want to change employers — can they apply for renewal at the new employer?

## User Next Actions

This is not user-facing copy. For answer routing:

- For same-sector transfers: route to professional (行政書士) for the 変更許可申請 and 届出 procedures; timing is critical to maintain continuous lawful status.
- For cross-sector transfers: route to professional; confirm they need to meet the requirements of the target sector (including skill/language tests if not exempt).
- For employer-closure situations: flag urgency; status may be at risk if employment ends and no new arrangement is in place; route to professional immediately.
- For the agricultural/fisheries multiple-employer scenario: route to professional for sector-specific rules.

## Unknown Fields

- The specific 14-day notification deadline (if any) for 特定技能 employer change — the ISA FAQ referenced "事由が発生した際" without specifying a number of days; confirmation from the 特定技能省令 or 施行規則 is needed.
- The grace period (if any) for a 特定技能 worker between employers (e.g., if employer closes and they need time to find a new one).
- The full list of 業務区分 combinations officially certified as having 技能水準共通性 (compatible skills for cross-category transfer).

## Needs Domain Flags

- needs_domain (P1): what is the official 14-day (or other) deadline for notifying ISA when a 特定技能 employer changes? Not confirmed from accessed FAQ text.
- needs_domain (P1): for a 特定技能 worker whose employer closes — what is the maximum permissible gap between employment arrangements before the status is considered inactive?
- needs_domain (P1): what is the correct handling for 農業・漁業 特定技能 where multiple employers in the same sector are a recognized arrangement?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tenshoku-001 | "特定技能で別の会社に転職したいが，何か手続きが必要ですか？" | State: same-sector same-category → 変更許可申請 + 届出; cross-sector → 変更許可申請 required; not just notification for employer change. |
| tenshoku-002 | "特定技能は技能実習と違って転職自由ですよね？" | State: more flexible than 技能実習, but NOT unrestricted; sector/job-category boundary applies; procedures required. |
| tenshoku-003 | "特定技能で飲食業から宿泊業に転職できますか？" | State: different sectors; requires 在留資格変更許可申請; not just notification; must meet 宿泊 sector requirements (including any exam requirements). |

## Source Notes

- Q13 official Japanese text (same-sector/same-category rule + 受入機関変更 = 変更申請) confirmed from ISA FAQ (faq.html).
- Q36 official Japanese text (同一分野内業務変更 = 届出; 異なる分野 = 変更申請) confirmed from ISA FAQ.
- The 14-day specific deadline for 特定技能 employer change was NOT confirmed from the FAQ page — marked needs_domain; likely in 特定技能省令 or 施行規則.
- Cross-ref G33 (特定技能1号/2号 sector structure), G37 (育成就労 転籍 as the new post-2027 system).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 009 G51. Key source: ISA 特定技能 FAQ Q13 + Q36 (official Japanese text). Core facts: same-業務区分 = 届出 (for business change) + 変更申請 (for employer change); different sector = 変更申請 required; not unlimited job change freedom. Cross-ref G33, G37, G55.
