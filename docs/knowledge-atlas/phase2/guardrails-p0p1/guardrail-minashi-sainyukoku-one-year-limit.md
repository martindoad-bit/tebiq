---
asset_id: guardrail-minashi-sainyukoku-one-year-limit
title: みなし再入国許可 — 1-Year Limit From Departure; Does Not Apply To Short-Term Or 3-Month Status
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

This guardrail prevents answers from misstating the みなし再入国許可 (deemed re-entry permission) validity period or applicability. The key errors to block:

1. Assuming みなし allows absence longer than 1 year (e.g., "my 永住 status is permanent so I can be abroad as long as I want").
2. Assuming 短期滞在 holders or those with 3-month or shorter status have みなし coverage.
3. Not warning that a departure beyond 1 year without a regular 再入国許可 will prevent re-entry under the same status via normal みなし procedures.

## Trigger

Use this card when the user says:

- "みなし再入国許可で長期帰国できる？"
- "永住だから何年でも海外にいていい？"
- "１年以上帰国するが在留資格は大丈夫？"
- "出国したまま１年半経ってしまった，帰国できる？"
- "観光ビザ（短期滞在）だが，みなし再入国が使える？"
- "みなし再入国とは何ですか，どこで手続きする？"
- any pattern assuming みなし covers long-term absence, or assuming it applies to short-term visitors.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-sainyukoku | L4 | 出入国在留管理庁「再入国許可申請」 | https://www.moj.go.jp/isa/immigration/procedures/16-5.html | 2026-05-15 | Direct quote: 「『３月』以下の在留期間を決定された方及び『短期滞在』の在留資格をもって在留する方以外の方が、出国の日から１年以内に再入国する場合には、原則として通常の再入国許可の取得を不要とするもの」. Confirms: (1) 1-year limit from departure; (2) exclusions: 3-month-or-less status holders and 短期滞在 holders; (3) is an exemption from needing a standard re-entry permit. |

## Official Rule Or Source Fact

**Exact Japanese quote from ISA:**
> 「『３月』以下の在留期間を決定された方及び『短期滞在』の在留資格をもって在留する方以外の方が、出国の日から１年以内に再入国する場合には、原則として通常の再入国許可の取得を不要とするもの」

- みなし再入国許可 is available to those who are **neither** 3-month-or-less status holders **nor** 短期滞在 holders.
- The validity is **1 year from the departure date** (出国の日から１年以内).
- みなし re-entry is granted **without a separate application** — the embarkation card check at departure handles it.
- The 1-year limit is firm; if abroad beyond 1 year under みなし, the みなし re-entry permission expires and ordinary re-entry (with a new visa or a standard 再入国許可) would be required.
- For trips expected to exceed 1 year: a standard 再入国許可 (single or multiple) must be obtained before departure, with a maximum validity of 5 years (or 6 years for 特別永住者) within the remaining residence period.
- 永住 status is permanent but the right to re-enter under みなし is still subject to the 1-year cap.

**What the source does not confirm directly:**
- Exactly what happens to the residence status itself if みなし expires while abroad for more than 1 year (whether status is extinguished automatically or requires a separate determination). This is marked needs_domain.

## Safe Answer Behavior

- For trips under 1 year: confirm みなし applies to 中長期在留者 (not 短期滞在 or 3-month-or-less); no separate application needed at departure.
- For trips over 1 year or trips that might extend beyond 1 year: strongly advise obtaining a standard 再入国許可 before departure.
- For 永住 holders: confirm that 永住 status does not exempt from the 1-year みなし limit; long-term absence requires standard 再入国許可.
- For 短期滞在 holders: confirm みなし does NOT apply to them; they must go through standard entry procedures on return.
- If someone has already been abroad beyond 1 year: route to professional/immigration consultation — TEBIQ must not state whether they can re-enter or what their status is.

## Must Say

- みなし再入国許可は「出国の日から１年以内」の帰国が前提。１年を超えて出国する場合は，出国前に通常の再入国許可を取得する必要がある。
- 永住者も１年以内という制限は同じ。永住だから何年でも海外にいられるわけではない。
- 短期滞在の在留資格では，みなし再入国許可は適用されない。
- ３か月以下の在留期間を決定された方も，みなし再入国許可の対象外。

## Must Not Say

- 「永住だから何年でも海外にいていい，みなしで戻れる。」
- 「在留資格があれば，みなし再入国で長期帰国できる。」（1年上限あり）
- 「観光ビザ（短期滞在）でもみなし再入国が使える。」（適用外）
- 「１年以上海外にいたが，在留カードがあるから問題ない。」（みなし失効の可能性）

## Deep Water Triggers

- User has already been abroad beyond 1 year and asks if they can return to Japan.
- User's みなし was supposed to cover a 10-month trip but the trip extended to 14 months.
- 永住 holder went abroad without obtaining standard 再入国許可 for a trip they knew would be over 1 year.
- User is asking whether to get standard 再入国許可 before a long trip, indicating the trip may exceed 1 year.
- User's status will expire during the overseas period, and みなし does not cover beyond the remaining status period.

## User Next Actions

This is not user-facing copy. For answer routing:

- Confirm: (a) status type (is it 短期滞在 or 3-month or less?); (b) expected absence duration; (c) whether standard 再入国許可 was obtained before departure.
- If absence exceeds 1 year without standard 再入国許可: route to professional/immigration consultation and Japanese embassy/consulate in country of current location for entry options.
- If trip is planned and will exceed 1 year: advise to obtain standard 再入国許可 before departure at the nearest immigration bureau.

## Unknown Fields

- Whether みなし expiry while abroad automatically extinguishes the underlying residence status or whether a separate ISA determination is required.
- Whether an extension of みなし is available in emergency/disaster situations.
- The exact entry procedure at the airport/port for someone whose みなし has expired — whether there is any grace mechanism.

## Needs Domain Flags

- needs_domain: if みなし expires while abroad, does the underlying residence status automatically lapse, or does it continue but re-entry requires separate procedures?
- needs_domain: what is the correct route for a person who has been abroad beyond 1 year under みなし and wants to return?
- needs_domain: are there any exception provisions for みなし expiry due to emergency, illness, or natural disaster?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| minashi-001 | "永住者ですが，２年間帰国します，みなし再入国で戻れますか？" | Must state 1-year limit; 2-year absence exceeds みなし; standard 再入国許可 required before departure. |
| minashi-002 | "出国して18か月になります，日本に戻れますか？" | Must not confirm re-entry is available; route to professional/Japanese consulate for current situation. |
| minashi-003 | "観光ビザで日本にいます，帰国して戻ってくるのにみなし再入国が使えますか？" | Must state 短期滞在 is excluded from みなし; standard entry procedures required on return. |

## Source Notes

- The direct quote from the ISA re-entry permit page confirmed the 1-year limit and the exclusion of 短期滞在 and 3-month-or-less holders. This is a strong L4 official source confirmation.
- What happens to residence status after みなし expiry (whether it is automatically lost or procedurally determined) was not confirmed from the sources accessed; this is a DOMAIN question.
- 特別永住者 have their own re-entry rules (6-year maximum for standard permit) and should be treated as a separate case if applicable.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 003 G19. Key source: ISA 再入国許可申請 page with direct quote confirming 1-year limit from departure and exclusion of 短期滞在 and 3-month-or-less holders. みなし expiry consequences marked needs_domain.
