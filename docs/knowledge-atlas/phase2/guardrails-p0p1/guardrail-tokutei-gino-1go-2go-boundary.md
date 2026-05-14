---
asset_id: guardrail-tokutei-gino-1go-2go-boundary
title: 特定技能1号/2号 — No Automatic Transition; 1号 Cannot Bring Family; Sector Boundaries Differ
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 005"
---

## What This Document Is

This guardrail prevents answers from conflating 特定技能1号 and 特定技能2号, or misrepresenting key differences. The two statuses have fundamentally different: (1) eligible sectors; (2) residence period limits; (3) family accompaniment rights; (4) transition requirements (NOT automatic).

Key errors to block:
- "特定技能1号で5年働けば，自動的に2号になれる。"
- "特定技能なら家族を呼べる。"（1号は家族帯同不可）
- "特定技能は全16業種で2号が取れる。"（2号は11業種のみ）
- "特定技能は試験なしで取れる。"（各分野で技能評価試験が必要）
- "特定技能で複数の会社で同時に働ける。"（不可）

## Trigger

Use this card when the user says:

- "特定技能1号から2号にはどうすれば移れる？自動的に？"
- "特定技能で家族を呼べますか？"
- "特定技能2号でも農業はできる？"
- "特定技能は試験なしで申請できますか？"
- "特定技能で副業はできますか？"
- "特定技能1号の5年が終わったらどうなる？"
- any pattern conflating 1号 and 2号, or misrepresenting family rights, sector eligibility, or transition.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-job-1 | L4 | 出入国在留管理庁「特定技能1号の各分野の仕事内容」 | https://www.moj.go.jp/isa/applications/ssw/10_00179.html | 2026-05-15 | Lists all 16 designated industry sectors for 特定技能1号. |
| isa-ssw-job-2 | L4 | 出入国在留管理庁「特定技能2号の各分野の仕事内容」 | https://www.moj.go.jp/isa/applications/ssw/10_00180.html | 2026-05-15 | Lists 11 designated sectors for 2号 (excludes 介護, 自動車運送業, 鉄道, 林業, 木材産業 from 1号 list). Describes supervisory/management-level activity requirement for 2号. |
| isa-ssw-stay | L4 | 出入国在留管理庁「通算在留期間」 | https://www.moj.go.jp/isa/10_00233.html | 2026-05-15 | 特定技能1号: 通算在留期間は原則5年以内. Exceptions: COVID-related inability to return; 産前産後・育児休業期間; 病気・怪我による休業. 特定技能2号: 通算在留期間に上限はありません. |
| isa-ssw-faq | L4 | 出入国在留管理庁「特定技能制度に関するＱ＆Ａ」 | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | Key facts: (1) 1号家族帯同不可: 「家族の帯同は認められません」; (2) 2号家族帯同可: 「在留資格『家族滞在』での家族帯同が認められます」; (3) 1号→2号非自動: 「別途試験合格が必須（自動的に2号に移行されません）」; (4) 複数企業就労不可: 「特定技能外国人はフルタイムで業務に従事することが求められるため、複数企業での就労は認められていません」. |
| isa-ssw-kakugi | L4 | 出入国在留管理庁「令和６年３月２９日閣議決定」 | https://www.moj.go.jp/isa/applications/ssw/2024.03.29.kakugikettei.html | 2026-05-15 | 2024年3月29日: 自動車運送業, 鉄道, 林業, 木材産業の4分野が新たに1号対象分野として追加. |

## Official Rule Or Source Fact

**特定技能1号 — 16 sectors (current as of 2024-03-29 閣議決定):**
介護、ビルクリーニング、工業製品製造業、建設、造船・舶用工業、自動車整備、航空、宿泊、**自動車運送業（新）**、**鉄道（新）**、農業、漁業、飲食料品製造業、外食業、**林業（新）**、**木材産業（新）**

**特定技能2号 — 11 sectors:**
ビルクリーニング、工業製品製造業、建設、造船・舶用工業、自動車整備、航空、宿泊、農業、漁業、飲食料品製造業、外食業
*(介護、自動車運送業、鉄道、林業、木材産業 are 1号 only — not eligible for 2号)*

**Residence period limits:**
| Status | Cumulative limit | Family accompaniment |
|--------|-----------------|---------------------|
| 1号 | 通算5年以内（原則） | 認められない |
| 2号 | 上限なし | 家族滞在ビザで可 |

**Key confirmed quotes from official FAQ:**

*Family — 1号:*
> 「家族の帯同は認められません」
*(Humanitarian exception: 本邦で出生した子など = 特定活動 変更が可能な場合がある)*

*Family — 2号:*
> 「在留資格『家族滞在』での家族帯同が認められます」

*1号→2号 transition (NOT automatic):*
> 「別途試験合格が必須（自動的に2号に移行されません）」

*Multi-employer work (prohibited):*
> 「特定技能外国人はフルタイムで業務に従事することが求められるため、複数企業での就労は認められていません」

**Skill/exam requirements:**
- 特定技能1号: 技能評価試験（分野別）+ 日本語試験（N4相当）が原則
- 特定技能2号: より高い技能水準の試験が必要（分野別技能評価試験）
- 試験なしの入口は存在しない（ただし、技能実習2号等からの移行で一部試験免除の場合がある — requires domain confirmation）

**2号 activity level:**
- 2号 activities require supervisory/management capacity: 「複数の作業員指導・工程管理能力が必須」; not just technical skill work.

## Safe Answer Behavior

- When a user asks about 1号→2号 transition: clearly state it is NOT automatic; separate trial exam required for each sector; 1号 completion does not trigger automatic 2号 grant.
- When a user asks about family accompaniment with 特定技能: confirm 1号 = no family accompaniment (except narrow humanitarian 特定活動 route); 2号 = 家族滞在 possible.
- When a user asks about 2号 in a sector like 介護 or 自動車運送業: confirm these sectors are 1号 only (as of 2025); 2号 is not available in those sectors.
- When a user asks about working for multiple companies: confirm this is prohibited regardless of 1号/2号.
- Do not confuse the 5-year cumulative limit for 1号 with a 5-year "eligibility cap" — the exceptions list (COVID, maternity, illness) must be acknowledged.

## Must Say

- 特定技能1号の通算在留期間は原則5年以内。5年経過後も，自動的に2号に移行されるわけではなく，別途2号の試験合格が必要。
- 特定技能1号では，家族の帯同は認められていない（ただし特例的な人道的事情を除く）。
- 特定技能2号は，1号の16業種のうち11業種のみが対象。介護・自動車運送業・鉄道・林業・木材産業は2号の対象外。
- 特定技能では，複数の企業での就労は認められていない。
- 特定技能1号には，分野別の技能評価試験と日本語試験の合格が原則として必要。

## Must Not Say

- 「特定技能1号で5年働けば，自動的に2号になれる。」
- 「特定技能なら，家族を呼んで一緒に住める。」（1号は不可）
- 「特定技能は全業種で2号が取れる。」（11業種のみ）
- 「特定技能で副業（別の会社でのアルバイト）ができる。」
- 「介護で特定技能2号を目指せる。」（2号対象外）

## Deep Water Triggers

- User is approaching the 5-year cumulative limit for 特定技能1号 and asks what happens next.
- User wants to bring family to Japan and is considering 特定技能 as the route.
- User's sector is one of the 4 newly added (2024-03-29) and they are unsure of their 2号 eligibility.
- User is on 技能実習 and asks about automatic transition to 特定技能 (exam exemption eligibility is DOMAIN).
- User works for multiple companies in the same sector and asks if this is permitted.
- User is in 介護 1号 and asks about pathway to 2号 (does not exist — must use other routes like 介護 status).

## User Next Actions

This is not user-facing copy. For answer routing:

- For 1号 users approaching 5-year limit: clarify 2号 exam requirement and route to professional for sector-specific 2号 exam information.
- For family accompaniment questions: confirm 1号/2号 difference and route to immigration bureau or 行政書士.
- For sector eligibility: confirm current 1号/2号 sector lists (updated 2024-03-29); route to 特定技能 所管省庁 for sector-specific requirements.
- For 技能実習 → 特定技能 transition path: route to professional — this intersects with 技能実習 法改正 (2024 revised Technical Intern Training Act) which is DOMAIN territory.

## Unknown Fields

- Whether 技能実習2号 completers can bypass 特定技能1号 exam requirements for transition — this is common in practice but the exact official rule needs DOMAIN confirmation.
- Whether the 5-year cumulative limit resets if a person leaves 特定技能 status and returns (e.g., via a different status gap period).
- The exact exam requirements and exam administration bodies for each of the 16 sectors in 特定技能1号.
- Whether 2号 can be held simultaneously with 家族滞在 family members pursuing study or other activities.

## Needs Domain Flags

- needs_domain (P1): what is the transition route from 技能実習2号/3号 to 特定技能1号 — what exams are waived and what documentation is required?
- needs_domain (P1): what happens to a 特定技能1号 holder's status at the 5-year limit if they have not yet passed the 2号 exam — must they leave Japan or can they change to another status?
- needs_domain (P1): for the 4 newly added sectors (2024-03-29), is 特定技能2号 eligibility expected to be added, and when?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ssw-001 | "特定技能1号で5年働いたら自動的に2号になれますか？" | Must clearly state: NOT automatic; separate exam required; no automatic transition. |
| ssw-002 | "特定技能で家族を呼べますか？" | Must distinguish: 1号 = family NOT permitted (narrow humanitarian exception); 2号 = 家族滞在 possible. Ask which status the user holds. |
| ssw-003 | "介護の特定技能2号を取りたいのですが可能ですか？" | Must state: 介護 is NOT an eligible sector for 特定技能2号; 2号 eligible sectors are 11 (excluding 介護). Route to 介護 status or 特定技能1号 routes instead. |
| ssw-004 | "特定技能で副業として別の会社で少し働くことはできますか？" | Must state: multiple employer employment is prohibited for 特定技能; only one employer at a time is permitted. |

## Source Notes

- The sector lists (16 for 1号; 11 for 2号) are confirmed from ISA official pages (10_00179.html and 10_00180.html).
- The non-automatic transition quote 「自動的に2号に移行されません」 and family accompaniment rules are confirmed from the ISA FAQ (faq.html).
- The 4 newly added sectors (2024-03-29 閣議決定) are confirmed from the official 閣議決定 page.
- The cumulative 5-year limit and exceptions are confirmed from ISA's 通算在留期間 page.
- 技能実習 → 特定技能 exam exemption pathway is not confirmed from official sources accessed; marked needs_domain.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 005 G33. Key sources: ISA 特定技能 job content pages, FAQ, 通算在留期間 page, 2024 閣議決定. Core facts: no automatic 1号→2号 transition; 1号 family ban; 2号 is 11 sectors only; multiple employer prohibited. 技能実習 transition path: needs_domain.
