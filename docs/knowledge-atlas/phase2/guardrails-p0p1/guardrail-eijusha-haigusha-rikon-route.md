---
asset_id: guardrail-eijusha-haigusha-rikon-route
title: 永住者の配偶者等・離婚後ルート — 日本人の配偶者等と異なる；定住者移行・PR経路の違い（G8/G45補完）
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official-indirect
last_checked_at: 2026-05-15
batch: "Batch 008"
---

## What This Document Is

This card complements G8 (general spouse-status rules) and G45 (practical routing after divorce for 日本人の配偶者等). It focuses specifically on **永住者の配偶者等** (Spouse / Child of Permanent Resident) — a separate status from 日本人の配偶者等 — where divorce has different implications and different post-divorce routing options.

Key errors to block:

1. **"永住者の配偶者等も日本人の配偶者等と同じルール。"** — the statuses are structurally similar but differ in key ways, especially post-divorce routing and PR eligibility.
2. **"永住者と離婚したから永住申請できる。"** — the 永住 route for 永住者の配偶者等 is subject to general PR requirements (not a spousal shortcut); divorce may remove the basis entirely.
3. **"離婚しても永住者に扶養されているから，在留が続く。"** — after divorce, the marital basis for the status is eliminated; post-divorce continuation requires active status change.
4. **"永住者の配偶者等なら帰化が早くできる。"** — 帰化 has its own requirements; being a 永住者の配偶者等 does not provide the same residence-period shortcuts as being a 日本人の配偶者等 does.

## Trigger

Use this card when the user says:

- "永住者（配偶者）と離婚しましたが，在留はどうなりますか？"
- "日本人ではなく永住者の配偶者ビザを持っています。離婚したらどうすればいいですか？"
- "永住者の配偶者等と日本人の配偶者等は何が違いますか？"
- "永住者の配偶者として長年日本にいますが，離婚後に永住申請できますか？"
- any pattern conflating 永住者の配偶者等 with 日本人の配偶者等, or asking about post-divorce options for this specific status.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-eijusha-haigusha | L4 | 出入国在留管理庁「在留資格『永住者の配偶者等』」 | https://www.moj.go.jp/isa/applications/status/spouseoflpr.html | 2026-05-15 | Status definition: spouse/child of permanent resident. Activity: daily life activities. Work permitted (same as 永住 activity scope). |
| isa-haigusha-todoke | L4 | 出入国在留管理庁「配偶者に関する届出」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | 2026-05-15 | G8 source. 14-day notification obligation applies to 永住者の配偶者等 as well (same as 日本人の配偶者等). |
| g8-crossref | guardrail | guardrail-spouse-divorce-death-remarriage (G8) | internal | 2026-05-15 | Core rules: 14-day notification; 6-month continued stay; status continues during pending change application (G1 cross-ref). |
| g45-crossref | guardrail | guardrail-haigusha-rikon-go-zairyu-jitsumu-route (G45) | internal | 2026-05-15 | Post-divorce routing for 日本人の配偶者等: notification, route options (就労/定住者/PR), 6-month window. |

## Official Rule Or Source Fact

**Status definition:**
永住者の配偶者等 covers:
- Spouse of a 永住者 (Permanent Resident holder)
- Child born in Japan of a 永住者

Key feature: 永住者の配偶者等 holders may engage in employment without restriction — unlike 日本人の配偶者等, the activity scope includes work-type activities broadly (similar to the 永住者 themselves in terms of employment freedom).

**14-day notification — same rule:**
The 14-day notification obligation after divorce/separation applies equally to 永住者の配偶者等 (G8 + G29 cross-ref).

**Post-divorce — key structural differences from 日本人の配偶者等:**

| 項目 | 日本人の配偶者等 | 永住者の配偶者等 |
|---|---|---|
| 離婚後の届出義務 | 14日以内 | 14日以内（同一） |
| 在留の基礎喪失 | 婚姻関係解消で喪失 | 婚姻関係解消で喪失 |
| 定住者（告示外）への移行 | 認められる場合あり（子の養育・長期在留等） | 認められる場合あり（条件同様，裁量的） |
| 永住者との婚姻での PR 特例 | 日本人配偶者の場合：1年継続（入管法第22条第2項）| 永住者配偶者の場合：通常要件（5年等）|
| 帰化への近道 | 日本人と婚姻後3年以上かつ在留1年以上で可能性あり | 永住者配偶者だけでは短縮なし |

**PR application after divorce from 永住者:**
- The shortened PR route applicable to spouses of **Japanese nationals** (G4 cross-ref: continuous residence with 日本人配偶者 = possible 1-year route) does NOT apply to former spouses of 永住者.
- The 永住者の配偶者等 must meet general PR requirements (typically: 10 years continuous residence, with 5+ years of work-status, etc.).
- Divorce from the 永住者 removes the 永住者の配偶者等 basis; the PR application must then be filed under the new qualifying status (if any).

**定住者 after divorce:**
- Similar to 日本人の配偶者等, a 永住者の配偶者等 who divorces may potentially qualify for 定住者 (告示外) if:
  - They are the primary caregiver for a child born of the marriage
  - They have long-term residence and established life in Japan
  - Conduct is favorable
- This is discretionary — no statutory entitlement.

**Important note on confidence:**
The detailed comparison above (especially the PR shortcut inapplicability and the 帰化 difference) is derived from the general legal framework and G4/G8 sources. The specific ISA page text for 永住者の配偶者等 divorce procedures was not directly accessed for this session. This card is marked `needs_domain` for confirmation of the specific routing details.

## Safe Answer Behavior

- When a 永住者の配偶者等 asks about divorce consequences: confirm the same 14-day notification obligation; explain that the marital basis for the status is eliminated; explain the route options available.
- When asked if divorce from a 永住者 allows direct PR application: clearly state this does NOT apply the Japanese-spouse PR shortcut; general PR requirements apply.
- When asked about 帰化: explain that the Japanese-spouse 帰化 shortcut (married 3 years + 1 year in Japan) applies only to spouses of Japanese nationals, not 永住者.
- Cross-reference G45 for the practical routing framework; note that the 定住者 option is similarly discretionary.
- Do not conflate the two spouse-status categories.

## Must Say

- 永住者の配偶者等も，離婚後は14日以内に入管への届出が必要（G8・G29参照）。
- 永住者と離婚した場合，「日本人の配偶者等」に認められている永住申請の特例ルート（入管法第22条第2項の短縮）は適用されない。永住申請には通常の要件（継続在留期間等）が必要。
- 帰化の「日本人の配偶者として3年以上婚姻かつ1年以上在留」の短縮ルートは，永住者の配偶者等には適用されない。
- 永住者の配偶者等と日本人の配偶者等は別々の在留資格カテゴリであり，離婚後のルートは一部異なる。

## Must Not Say

- 「永住者の配偶者等と日本人の配偶者等は同じルール。」
- 「永住者と離婚したから，すぐ永住申請できる。」
- 「永住者の配偶者等だから帰化が早くできる。」
- 「永住者の扶養を受けていれば，離婚後も同じ在留資格で続けられる。」

## Deep Water Triggers

- 永住者の配偶者等 holder divorced 永住者 and has been in Japan 8 years total — wants to know PR options.
- 永住者の配偶者等 holder whose spouse's 永住 status was revoked — what happens to the dependent?
- User is a child of 永住者 (born in Japan) — not a spouse — how does this card apply?
- 永住者の配偶者等 holder who is also employed full-time — what post-divorce status change is easiest?
- User confused their own status (e.g., thought they had 日本人の配偶者等 but actually have 永住者の配偶者等).

## User Next Actions

This is not user-facing copy. For answer routing:

- For divorce notification: route to ISA notification procedure (G29 cross-ref).
- For post-divorce status options: explain the same framework as G45 applies, but note the PR shortcut and 帰化 shortcut differences; route to professional urgently if 6-month window is approaching.
- For employment during transition: note that 永住者の配偶者等 holders can work freely during their in-period status continuation; clarify this during the status-change process.
- For PR planning: route to G4 (general PR criteria); emphasize general requirements apply.

## Unknown Fields

- The exact ISA language on 永住者の配偶者等 post-divorce status and notification requirements (official page text not accessed in this session).
- Whether the 定住者 (告示外) criteria differ between former spouses of 日本人 vs. former spouses of 永住者.
- What happens to a 永住者の配偶者等 holder if the principal 永住者's status is revoked.

## Needs Domain Flags

- needs_domain (P1): confirm the exact ISA-stated post-divorce procedure for 永住者の配偶者等 — specifically whether the 6-month window and transition rules are identical to 日本人の配偶者等 or have differences.
- needs_domain (P1): confirm whether the PR shortcut inapplicability (for 永住者の配偶者等 vs. 日本人の配偶者等) is explicitly stated in ISA guidance.
- needs_domain (P1): for a 永住者の配偶者等 who is employed — what is the easiest post-divorce status change if they want to remain in Japan?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijusha-rikon-001 | "永住者（配偶者）と離婚しましたが，永住申請できますか？" | State: general PR requirements apply; Japanese-national-spouse PR shortcut does NOT apply; route to professional for timeline. |
| eijusha-rikon-002 | "永住者の配偶者等と日本人の配偶者等は同じですか？" | Explain: same notification rules; different PR/帰化 shortcuts; separate status categories; post-divorce routing broadly similar but differences apply. |
| eijusha-rikon-003 | "永住者の配偶者として日本にいますが，離婚後も日本に住み続けられますか？" | State: 14-day notification required; 在留 continues during period; status change needed; route options (就労/定住者/PR under general criteria); professional assessment recommended. |

## Source Notes

- The 14-day notification obligation is confirmed from G8/G29 cross-ref (ISA 配偶者に関する届出 page).
- The PR shortcut inapplicability (Japanese-spouse route vs. 永住者-spouse) is derived from 入管法第22条第2項 framework analysis (G4 cross-ref) — not directly quoted from a specifically-accessed 永住者の配偶者等 page in this session.
- The 帰化 shortcut distinction (3yr+1yr for 日本人配偶者) is from 帰化許可 requirements (G25 cross-ref).
- Marked needs_domain because specific 永住者の配偶者等 official page text was not extracted.

## Changelog

- 2026-05-15: Initial needs_domain as Batch 008 G49. G8/G45 complement for 永住者の配偶者等 category. Core distinctions: PR shortcut inapplicable; 帰化 shortcut inapplicable; 定住者 route broadly similar but discretionary. Official page text for 永住者の配偶者等 post-divorce not accessed — needs_domain. Cross-ref G1, G4, G8, G25, G29, G45.
