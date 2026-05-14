---
asset_id: guardrail-fukugyo-kengyo-zairyu-seigen
title: 副業・兼業と在留資格 — 就労ビザの活動範囲外の副業は資格外活動；永住者・高度専門職は例外
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

This guardrail prevents errors about side jobs (副業) and concurrent employment (兼業) for holders of work-specific residence statuses. Key errors to block:

1. **"就労ビザを持っているなら，副業も自由にできる。"** — incorrect. Employment-based 在留資格 permits only activities within the specified scope; activities outside = 資格外活動.
2. **"副業が少額なら問題ない。"** — incorrect. The 資格外活動 assessment is based on the nature of the activity, not its compensation level.
3. **"永住者も副業制限がある。"** — incorrect. 永住者 can work in any job without restriction.
4. **"高度専門職は副業も全て認められる。"** — partially correct but oversimplified; HSP2 has broad scope; HSP1 has specific permitted scope.
5. **"特定技能で副業するなら，資格外活動許可を取ればいい。"** — incorrect for most cases; 特定技能 is an employment-based status with specific sector restrictions; side jobs in different sectors cannot be authorized by 資格外活動許可 in the same way.

## Trigger

Use this card when the user says:

- "就労ビザ（技人国）で副業できますか？"
- "メインの仕事の他に別の会社でも働きたい。"
- "永住者になったら副業は自由にできますか？"
- "高度専門職で副業はどこまで認められますか？"
- "特定技能で兼業はできますか？"
- "フリーランス的な副収入があるが，就労ビザに影響しますか？"
- any pattern assuming employment-visa holders can freely add side jobs.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| g35-crossref | guardrail | guardrail-gijinkoku-gyomu-youken-boundary (G35) | internal | 2026-05-15 | 技人国 activity scope: must match designated subcategory. Employer-assigned work outside scope = violation. |
| g16-crossref | guardrail | guardrail-shikaku-gai-katsudo-28h-limit (G16) | internal | 2026-05-15 | 資格外活動許可 framework: 包括許可 for 留学/家族滞在; 個別許可 for non-standard. Employment-based statuses do NOT have 包括許可 for side jobs. |
| g38-crossref | guardrail | guardrail-hsp2-henkou-youken (G38) | internal | 2026-05-15 | HSP2 = nearly all employment activities permitted alongside HSP activities (broad scope). |
| isa-eijuu-activity | L4 | 出入国在留管理庁「在留資格『永住者』」 | https://www.moj.go.jp/isa/applications/status/permanent.html | 2026-05-15 | 永住者 activity: 在留資格の範囲内で全ての活動（no restriction on employment type). |

## Official Rule Or Source Fact

**General principle — activity scope binds the holder:**
All 在留資格 (except 永住者, 定住者, 日本人の配偶者等, 永住者の配偶者等) specify permitted activities. Engaging in work outside those specified activities = 資格外活動.

**Status-specific rules for side jobs:**

**技術・人文知識・国際業務 (技人国):**
- Primary employer's activities: must fall within 技術/人文知識/国際業務 subcategory scope (G35 cross-ref).
- Side job / second employer: ALSO must fall within the same subcategory scope.
- A 技人国 holder taking a part-time job in a food/beverage establishment = 資格外活動 (if not within 技術/人文知識/国際業務 scope at that employer).
- A 技人国 holder doing freelance work in the same technical field: gray area — activity classification matters.
- Route for side job within scope: must notify ISA if changing primary affiliation (G6 cross-ref for HSP1; G29 for notification duty); secondary employment within scope may not always require ISA action, but the activity must remain within scope.

**特定技能1号:**
- Activity: specific 産業分野 (sector); specific 業務区分 within the sector.
- Multiple employers (concurrent employment): 特定技能 generally requires a specific 雇用契約 with one receiving organization; multiple employers in same sector have specific rules.
- Side job in a different sector: requires 在留資格変更 (new status) — cannot be done under current status.
- Key danger: "特定技能で副業" is generally restricted by the sector/job-category confinement.

**高度専門職1号 (HSP1):**
- Activity: designated by 指定書; tied to the specific employer and activity category (イ/ロ/ハ).
- Side job: generally requires the activity to be within the scope of the 指定書.
- G6 cross-ref: institution/activity changes for HSP1 require 在留資格変更 permission.

**高度専門職2号 (HSP2):**
- Activity: nearly all employment-type visa activities are permitted alongside HSP activities (G38 cross-ref).
- Quote: 「イ・ロ・ハの活動とほぼすべての就労資格の活動を並行実施可能」
- Side jobs within most employment-visa categories = permitted under HSP2.
- Practical note: any activity must still be lawful under Japanese labor/business law.

**永住者:**
- No employment restriction by activity type.
- 永住者 can work in any job, in any sector, for any employer, without limit.
- Side jobs, freelance, multiple employers: all permitted.
- No 資格外活動 issue for employment activities.

**定住者, 日本人の配偶者等, 永住者の配偶者等:**
- Similarly no employment-activity restriction (activity-unrestricted group under 入管法 別表第二).
- Can work in any role, including side jobs.

**Resource for 資格外活動許可 (for non-work statuses):**
- 留学, 家族滞在: can obtain 包括許可 up to 28h/week for side jobs (G16, G48 cross-ref).
- Employment-based visa holders (技人国, 特定技能, 技能, etc.): 資格外活動許可 is NOT the route for side jobs outside scope. The side job must be within the existing status scope or a new status is needed.

## Safe Answer Behavior

- When a 技人国 holder asks about side jobs: clarify the side job must fall within the same subcategory scope (技術/人文知識/国際業務); work outside the scope = 資格外活動.
- When a 永住者 asks about side jobs: confirm no employment restriction; any job is permitted.
- When a 特定技能 holder asks about side jobs: explain the sector/business-category restriction applies to all employment under that status; a different-sector side job is not permitted.
- When a HSP2 holder asks: confirm broad scope allows most employment activities as side jobs alongside HSP activities.
- Do not advise 資格外活動許可 as the solution for employment-based visa holders wanting out-of-scope side jobs.

## Must Say

- 就労ビザ（技人国等）を持っている場合，副業・兼業は現在の在留資格の活動範囲内の業務に限られる。範囲外の副業は「資格外活動」となり，在留資格取消や刑事罰のリスクがある。
- 永住者（および定住者・日本人の配偶者等・永住者の配偶者等）は，就労に関する制限がなく，副業・兼業を含む任意の仕事ができる。
- 就労ビザ保持者（技人国等）が活動範囲外の副業をする場合，資格外活動許可では対応できない。活動範囲を変えるためには在留資格変更許可が必要。
- 高度専門職2号は，HSP活動と並行してほぼすべての就労資格の活動が可能であり，副業の幅が広い。

## Must Not Say

- 「就労ビザがあれば，どんな副業でも自由にできる。」
- 「副業の収入が少なければ，在留資格の問題にならない。」
- 「資格外活動許可を取れば，就労ビザでも何でも副業できる。」
- 「永住者も副業には制限がある。」

## Deep Water Triggers

- 技人国 holder has been freelancing in a different field (e.g., food delivery, photography) alongside their main job.
- 特定技能1号 holder wants to work a second part-time job in a different sector.
- 技人国 holder's company asked them to take on tasks clearly outside their visa scope (e.g., manual production work) — G35 cross-ref.
- HSP1 holder starts a side consulting business — needs 経営管理 vs. HSP side activity assessment.
- 留学生-turned-技人国: used to be allowed 28h/week side jobs; now confused about whether that continues.

## User Next Actions

This is not user-facing copy. For answer routing:

- For 技人国 holders with out-of-scope side jobs already ongoing: flag as potential 資格外活動 (G26/G27); route to professional immediately.
- For those wanting in-scope side jobs: confirm the activity-scope requirement; advise checking job duties match subcategory; route to professional if unclear.
- For 永住者: confirm freedom; no special routing needed.
- For 特定技能 holders: route to professional for sector/business-category assessment before starting any side work.
- For 留学 → 技人国 transitions: clarify the 28h/week 包括許可 no longer applies after status change to 技人国; different rules now apply.

## Unknown Fields

- The exact ISA guidance on freelance work by 技人国 holders (when the freelance activity is in the same field as their primary job but for a different client).
- Whether secondary employment within the same 技人国 subcategory scope requires any ISA notification.
- How ISA defines "within scope" for incidental tasks performed as part of a primary job (e.g., a software engineer who occasionally translates documents).

## Needs Domain Flags

- needs_domain (P1): for a 技人国 holder who does freelance programming (same field as their primary job) on evenings and weekends — is this within the existing 技人国 scope or does it require a new status?
- needs_domain (P1): what is the exact notification obligation for a 技人国 holder who takes on a legitimate second employer within the same subcategory scope?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| fukugyo-001 | "技人国（技術・人文知識・国際業務）で副業はできますか？" | State: side job must be within same subcategory scope; out-of-scope = 資格外活動; 資格外活動許可 does NOT solve the scope problem. |
| fukugyo-002 | "永住者になったら副業は自由にできますか？" | Confirm: 永住者 has no employment-type restriction; any job/side job permitted; no 資格外活動 issue. |
| fukugyo-003 | "特定技能で副業したいが，別の分野でも大丈夫ですか？" | State: 特定技能 is sector/job-category-bound; different sector side job requires status change; not permitted under current status. |

## Source Notes

- General activity-scope principle is structural (入管法 別表第一 vs. 別表第二 categories).
- 永住者 (and 別表第二 statuses) employment freedom is confirmed from ISA 永住者 status page structure.
- HSP2 broad scope confirmed from G38 (ISA HSP Q&A 「イ・ロ・ハの活動とほぼすべての就労資格の活動を並行実施可能」).
- 技人国 activity scope boundary confirmed from G35.
- 特定技能 sector restriction confirmed from G33 and G51 (being written in this batch) cross-references.
- 資格外活動許可 inapplicability for employment-visa holders wanting out-of-scope work: structural conclusion from G16/G24 framework (包括許可 designed for 留学/家族滞在 students/dependents, not for employment-status holders seeking different employment).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 009 G55. Core facts: activity-scope binds side jobs; 永住者 unrestricted; 技人国 side jobs must be within subcategory scope; 特定技能 sector-confined; HSP2 broad. Cross-ref G16, G26, G33, G35, G38, G48. Blocks "副業自由", "少額なら問題なし", "資格外活動許可で解決".
