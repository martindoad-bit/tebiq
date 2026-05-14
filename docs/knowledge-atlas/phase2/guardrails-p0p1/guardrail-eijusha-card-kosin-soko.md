---
asset_id: guardrail-eijusha-card-kosin-soko
title: 永住者の在留カード更新 — ステータスは永続だがカードは7年ごとに更新必要（G22補完）
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

This card complements G22 (guardrail-zairyu-card-expiry-vs-status-period), which established that card validity ≠ status period. This card (G53) focuses specifically on 永住者 (Permanent Resident) card renewal — a high-risk area because many 永住者 holders believe their permanent status means the card never needs renewal.

Key errors to block:

1. **"永住者はビザ（在留資格）が永続だから，在留カードの更新も必要ない。"** — incorrect. 永住者 status is indefinite, but the 在留カード itself has its own validity period (7 years for most adults) and must be renewed separately.
2. **"在留カードを更新しなくても，永住者として日本に居続けられる。"** — technically the status does not expire, but carrying an expired card is a violation; employers and public institutions will flag it; it may affect various procedural matters.
3. **"永住者の在留カードは一度取れば一生有効。"** — incorrect. The card validity period for 永住者 is 7 years (for those 16+); renewal is required before the card expires.
4. **"在留カードを更新しないと永住資格が取り消される。"** — overstated. Card expiry does not automatically revoke PR status, but it is a compliance issue with administrative consequences.

## Trigger

Use this card when the user says:

- "永住者になったら在留カードの更新は必要ありませんか？"
- "永住ビザだから在留カードはずっと使えますよね？"
- "永住の在留カードが期限切れです，どうすればいいですか？"
- "永住者の在留カード更新の申請はいつからできますか？"
- "永住者なのに在留カードを更新する義務がありますか？"
- any pattern treating permanent residence as eliminating the card renewal obligation.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-card-kosin | L4 | 出入国在留管理庁「在留カードの有効期間の更新申請」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html | 2026-05-15 | G22 source. Confirms 永住者の在留カード有効期間: 16歳以上 = 7年; 16歳未満 = 16歳の誕生日. Application window: 2 months before card expiry until the day of card expiry. |
| g22-crossref | guardrail | guardrail-zairyu-card-expiry-vs-status-period (G22) | internal | 2026-05-15 | Core rule: card validity ≠ status period. Expired card ≠ must leave Japan (for 永住者). Two separate renewal procedures. |
| isa-nyuukokukanri-card | L4 | 出入国在留管理庁「在留カードについて」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_card.html | 2026-05-15 | General card validity and obligation to carry. |

## Official Rule Or Source Fact

**永住者の在留カード有効期間 (confirmed from ISA card renewal page, G22 source):**
- 16歳以上の永住者: **7年** (from the date of card issuance)
- 16歳未満の永住者: until the 16th birthday

**Card renewal application window (confirmed from ISA 在留カード有効期間の更新申請 page):**
- Opens: 2 months before card expiry date
- Closes: day of card expiry
- After card expiry: late renewal procedure; must contact ISA immediately

**永住者 status vs. card validity — key distinction:**
| 項目 | 永住者ステータス | 在留カード |
|---|---|---|
| 有効期間 | 無期限（有効期限なし） | 7年（16歳以上）|
| 更新の必要性 | 不要（ステータスは消えない） | 必要（7年ごと）|
| 期限切れの影響 | ステータス自体は維持 | カード携帯義務違反；各種手続きで問題が生じる |
| 申請先 | N/A | ISA（在留カード有効期間の更新申請）|

**Obligation to carry valid card:**
中長期在留者 (including 永住者) are required to carry their 在留カード at all times (入管法 第23条). An expired card still counts as a card, but it no longer serves as valid proof of status for third parties.

**Practical consequences of expired card:**
- Banks, employers, and public institutions may reject an expired 在留カード for identity verification.
- 再入国許可 (re-entry) applications and 在留 procedures at ISA may be affected.
- At airports: re-entry with an expired card may trigger additional scrutiny or delays.
- Does NOT automatically revoke permanent residence status.

**Connection to 素行 (conduct) assessment:**
Failing to renew the card when due may be noted in ISA's conduct assessment (if it ever becomes relevant to a future application, e.g., 帰化). However, no direct 素行 penalty is specified in the ISA card renewal rules for this specifically.

## Safe Answer Behavior

- When a 永住者 asks if card renewal is needed: clearly confirm YES, every 7 years (for 16+); the status is permanent but the card must be renewed.
- When a 永住者 has an expired card: explain they should apply for renewal immediately; status is NOT revoked; but card is required for various transactions.
- When asked about the renewal window: confirm 2 months before expiry to the day of expiry.
- Do not say "永住者だからカード更新は必要ない."
- Do not say "カードが切れたら永住資格も取り消される" — overstated.

## Must Say

- 永住者の在留カードは，在留資格（ステータス）の有効期限とは別に，カード自体の有効期限がある（16歳以上：7年）。永住者であっても，カードの更新申請が必要。
- 在留カード有効期間の更新申請は，カードの有効期限の2か月前から有効期限当日まで申請できる。
- カードが期限切れになっても，永住者としての在留資格自体は消滅しない。ただし，有効な在留カードの携帯義務があり，期限切れカードでは各種手続きで支障が生じる。

## Must Not Say

- 「永住者だから在留カードの更新は必要ない。」
- 「在留カードが期限切れになっても，永住ビザは有効だから問題ない。」（携帯義務・手続き上の問題あり）
- 「在留カードの有効期限が切れたら，永住資格が取り消される。」（過度な警告）

## Deep Water Triggers

- 永住者 whose card expired 2+ years ago and has not renewed — status implications?
- 永住者 who left Japan and returned (みなし再入国 within 1 year, G19 cross-ref) with an expired card — what happens at immigration?
- 永住者 child turning 16 — card expires on their birthday; renewal window and process?
- 永住者 who lost their 在留カード — different procedure (紛失届 + card reissuance vs. standard renewal).
- 永住者 considering 帰化 — does card expiry affect 帰化 eligibility?

## User Next Actions

This is not user-facing copy. For answer routing:

- For 永住者 with valid card: remind about 7-year validity; set a calendar reminder for 2 months before expiry.
- For 永住者 with about-to-expire card: confirm the 2-month application window; route to ISA in-person application (or online if available).
- For 永住者 with already-expired card: route to ISA immediately; late renewal is possible but requires explanation; no specific penalty stated in law, but status can be disrupted.
- For re-entry with expired card: route to ISA/airport advice before departure; serious practical complications possible.

## Unknown Fields

- The exact legal penalty (if any) for carrying an expired card as a 永住者 — the carry-obligation (第23条) exists, but the specific enforcement consequence for an expired-but-not-revoked card is not clearly stated on accessed pages.
- Whether the online renewal system (オンライン申請) is available for 在留カード有効期間の更新 applications.

## Needs Domain Flags

- needs_domain (P1): what is the practical consequence at the airport if a 永住者 attempts re-entry with an expired 在留カード that was obtained via みなし再入国? Does this affect the re-entry itself?
- needs_domain (P1): does the 7-year card validity apply without exception, or are there shorter validity periods for 永住者 in any circumstances?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijusha-card-001 | "永住者になりました。在留カードの更新は必要ですか？" | State: YES — 在留カード has 7-year validity (16+); status is permanent but card must be renewed; renewal window: 2 months before expiry. |
| eijusha-card-002 | "永住者の在留カードが期限切れになってしまいました。もう在留できませんか？" | State: permanent status is NOT revoked; but expired card = carry-obligation issue and practical problems; apply for renewal immediately at ISA. |
| eijusha-card-003 | "永住者の在留カード更新はいつから申請できますか？" | Confirm: 2 months before card expiry date until the day of expiry. Cannot apply earlier (3-month rule for status renewal does not apply here). |

## Source Notes

- 永住者 card 7-year validity and 2-month application window confirmed from ISA 在留カード有効期間の更新申請 page (G22 source).
- The distinction between status permanence and card renewal obligation is confirmed from G22 cross-reference.
- The carry-obligation (第23条) is general law; specific enforcement of expired-card carries not directly quoted from accessed pages.
- Cross-ref G22 (card validity ≠ status period), G19 (みなし再入国 1-year limit), G25 (帰化 vs. 永住 distinction).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 009 G53. G22 complement focused on 永住者 card renewal. Core facts: 7-year card validity (16+); separate renewal from status; 2-month window; expired card ≠ status revocation. Cross-ref G19, G22, G25.
