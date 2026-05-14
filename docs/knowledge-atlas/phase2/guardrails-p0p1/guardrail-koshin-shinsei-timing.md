---
asset_id: guardrail-koshin-shinsei-timing
title: 在留期間更新の申請タイミング — 3か月前から申請可；直前申請は特例期間の無駄遣い
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

This guardrail prevents misunderstandings about the correct timing for 在留期間更新許可申請 (residence period renewal applications). Key errors to block:

1. **"更新申請は期限の直前（1〜2週間前）に出せばいい。"** — technically lawful, but impractical and risky. If documents are incomplete or ISA takes longer to process, the original period expires with limited buffer.
2. **"更新申請は期限の6か月前から出せる。"** — incorrect. The official window opens **3 months before expiry**, not 6 months.
3. **"特例期間があるから，期限後に申請しても大丈夫。"** — critically wrong. Special period (特例期間) applies only to applications filed BEFORE the original expiry; filing after expiry = unlawful stay.
4. **"永住申請と更新は同じ申請タイミングルールが適用される。"** — incorrect. 永住 application has no timing restriction; standard renewal applies the 3-month-before rule.
5. **"2か月前より早く出しすぎると申請が受け付けられない。"** — incorrect for most statuses. 3 months before is the official opening; there is no "too early" within that window.

## Trigger

Use this card when the user says:

- "在留期間更新はいつから申請できますか？"
- "更新申請は期限のどのくらい前に出すべきですか？"
- "更新を期限の直前に出しても大丈夫ですか？"
- "特例期間があるから期限後でも申請できると思っていた。"
- "6か月前から更新申請できると聞いたが本当ですか？"
- any pattern treating the special period as a buffer for late applications, or misunderstanding the 3-month window.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-renewal-app | L4 | 出入国在留管理庁「在留期間更新許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | 2026-05-15 | Official filing window: 在留期間満了の3か月前から申請可（原則）. Source of the 3-month rule. |
| isa-tokureikikan | L4 | 出入国在留管理庁「特例期間とは？」 | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | 2026-05-15 | G1 source. 特例期間 = authorizes continued stay ONLY when application was filed before original period expired. Does NOT apply to late filings. 2-month cap from original expiry. |
| isa-notice | L4 | 出入国在留管理庁「在留申請時のお知らせ及び注意」 | https://www.moj.go.jp/isa/11_00037.html | 2026-05-15 | ISA recommendation to apply early; processing times vary; late postcard arrival advice for PR applicants. |

## Official Rule Or Source Fact

**Filing window — confirmed from ISA 16-3.html:**
在留期間更新許可申請は、**在留期間の満了する日の3か月前から**申請できます（原則）。

There is no "too early" within the 3-month window. Applying at 3 months before expiry is the recommended practice.

**Special period — confirmed from G1 cross-ref (ISA tokureikikan page):**
- 特例期間 = the period of continued authorized stay after the original expiry date, arising from a **pending** renewal/change application that was **filed before the original expiry**.
- Maximum: original period expiry + 2 months, or the date of disposition (whichever is earlier).
- **NOT applicable** if the application was filed after the original period expired.

**The timing risk matrix:**
| 申請タイミング | 状況 |
|---|---|
| 3か月前〜満了当日 | 適正（正規申請ウィンドウ）。審査中は特例期間が適用される |
| 満了当日 | 技術的には合法。ただしリスク大（審査中に書類不備で返却 → 残時間が消える）|
| 満了後 | **不法在留**。特例期間が発生しない。在留資格取消・強制退去リスク |
| 6か月前 | **申請不可**（3か月前が開始日）|
| 3か月超〜満了前 | 申請不可（3か月前より前） |

**Why late (but before expiry) applications are risky:**
- If ISA issues a 補件 (additional material request), the applicant may have little time to gather materials before the original period expires.
- If the application is returned (返却中 status), the 2-month special-period cap begins from the original expiry, not from the application date — leaving little processing buffer.
- G12 cross-ref: incomplete filing before expiry = ISA review stalls.

**Recommended practice:**
- Apply **2-3 months before expiry** to allow document gathering time, processing, and buffer for any 補件 requests.
- ISA notice page states that results are communicated by postcard/letter; if no notice arrives near expiry (especially for long PR reviews), contact ISA proactively.

**Exception — 在留カード有効期間 renewal:**
The 在留カード card-validity renewal (card expiry ≠ status period expiry, G22 cross-ref) has its own timing: application window opens 2 months before card expiry (or 6 months for those under 16 on a birthday-based card). This is separate from the status period renewal.

## Safe Answer Behavior

- When a user asks when to start a renewal application: confirm the 3-month-before-expiry window; recommend applying 2-3 months before expiry to have adequate buffer.
- When a user says they plan to apply 1 week before expiry: explain the risks (no time for 補件; special period may not leave enough processing time); recommend earlier filing.
- When a user says "special period means I can apply after expiry": clearly correct this; special period only applies to pre-expiry applications; post-expiry = unlawful stay.
- When a user asks about 6-month-before filing: confirm this is not the correct window; 3 months before is the standard opening.
- Do not say "直前でも特例期間があるから大丈夫" — this misrepresents the special period's purpose.

## Must Say

- 在留期間更新許可申請は，在留期間満了の3か月前から申請できる。満了日の3か月超前は申請不可。
- 特例期間は，**満了日以前に申請を行った場合に限り**，審査中の在留を保護するもの。満了後に申請しても特例期間は発生しない。満了後の申請は不法在留となる。
- 更新申請は，期限ギリギリに出すと，書類不備があった場合のリスクが大きい。余裕をもって2〜3か月前に申請することが望ましい。

## Must Not Say

- 「特例期間があるから，期限後でも申請できる。」
- 「6か月前から更新申請ができる。」
- 「1週間前に申請すれば問題ない，特例期間がある。」
- 「永住申請と更新は同じタイミングで申請を出す。」（永住には3か月前ルールが適用されない）

## Deep Water Triggers

- User's 在留期間 expires in 2 days and they have not filed — can they still file?
- User filed on the last day, received a 補件 notice, and now the original period has expired — are they protected?
- User thought they filed but the application was rejected at the counter (受付拒否) due to missing a required document — is the special period still active?
- User is a PR holder whose 在留カード expired but status is permanent — they confuse card renewal with status renewal.
- User has multiple visa appointments and doesn't know which "deadline" applies (ISA status period vs. card validity).

## User Next Actions

This is not user-facing copy. For answer routing:

- For users more than 3 months before expiry: route to renewal checklist preparation; advise gathering documents now.
- For users 1-3 months before expiry: advise filing promptly; route to ISA renewal procedure page.
- For users within days of expiry (not yet expired): route to ISA immediately; prioritize filing; flag document completeness urgently (G12 cross-ref).
- For users who have already expired: flag as potential unlawful stay; route to lawyer immediately (G21 cross-ref — 在留特別許可 territory).
- For special-period confusion: route to G1 for the definitive explanation.

## Unknown Fields

- The processing time range for standard renewal applications at each major ISA office — relevant for advising minimum-safe lead time.
- Whether ISA accepts applications from online renewal (オンライン申請) within the same 3-month window or has different conditions.
- The exact handling when an application is returned (returned/rejected at counter) vs. accepted but later issued a 補件 — whether the special period is affected differently.

## Needs Domain Flags

- needs_domain (P1): if an application is accepted at the counter (特例期間 starts) but ISA later returns it due to document incompleteness — does the 2-month special-period cap pause or continue during the 返却中 period? (G12 cross-ref dom-incomplete-002)
- needs_domain (P1): for users who filed exactly on the expiry date — what is ISA's actual practice regarding accepting or rejecting same-day applications?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| timing-001 | "在留更新はいつから申請できますか？期限の6か月前から出せますか？" | State: 3 months before expiry is the opening date; not 6 months; apply 2-3 months before for safety. |
| timing-002 | "特例期間があるから期限が切れてから申請しても大丈夫ですか？" | State: CRITICAL correction — 特例期間 only applies to pre-expiry filings; post-expiry filing = unlawful stay; no protection. |
| timing-003 | "更新申請を期限の1週間前に出す予定ですが，問題ありますか？" | State: technically within the window; but risks include 補件 time pressure; strongly recommend filing earlier (2-3 months before). |

## Source Notes

- 3-month filing window confirmed from ISA 16-3.html (standard renewal procedure page).
- 特例期間 pre-expiry requirement confirmed from ISA tokureikikan_00001.html (G1 source).
- 2-month special-period cap confirmed from G1.
- Cross-ref G1 (特例期間 definition), G12 (incomplete materials + special period interaction), G15 (PR pending vs. current status renewal), G22 (card validity ≠ status period).
- PR application timing: no statutory 3-month restriction; PR can be applied for at any point when requirements are met.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 008 G50. Core facts: 3-month-before window (ISA 16-3.html); special period only for pre-expiry filings (G1 cross-ref); late filing risks. Cross-ref G1, G12, G15, G22. Blocks: "6か月前から申請可", "期限後でも特例期間あり", "直前でいい".
