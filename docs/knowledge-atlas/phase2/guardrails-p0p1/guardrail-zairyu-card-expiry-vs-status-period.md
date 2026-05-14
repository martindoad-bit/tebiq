---
asset_id: guardrail-zairyu-card-expiry-vs-status-period
title: 在留カード Validity Period Is Separate From 在留期間 (Status Period)
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

This guardrail prevents answers from treating 在留カードの有効期限 (residence card validity period) and 在留期間 (status of residence period) as the same thing. They are two distinct concepts with separate expiry dates and separate renewal processes:

- **在留期間**: the authorized period to reside in Japan under a specific status of residence (e.g., 3 years, 5 years, 永住). This is what matters for legal authorization to stay.
- **在留カードの有効期限**: the physical validity of the card document itself (e.g., 10 years for residents 16 and over, until the 16th birthday for those under 16).

A classic error: a 永住 holder whose residence card has expired but whose status (永住) is permanent. Their status has not expired, but they are technically carrying an expired card. The reverse error is also possible: confusing the status period expiry with the card validity date.

## Trigger

Use this card when the user says:

- "在留カードの有効期限が切れた，ビザも切れた？"
- "カードの日付が過ぎているが，在留期限も過ぎた？"
- "永住者だがカードが切れた，今すぐ出国しないといけない？"
- "在留期限と在留カードの有効期限，どちらを確認すればいい？"
- "カードの有効期限と在留期限が違う日になっている"
- "16歳前のカードが切れた，在留資格も切れた？"
- any pattern where user may be confusing card validity with status validity.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-card-validity-renewal | L4 | 出入国在留管理庁「在留カードの有効期間の更新申請」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html | 2026-05-15 | Describes the card validity renewal process: for those 16 and over, application window is 「現に有する在留カードの有効期間の満了日の２か月前から有効期間満了日まで」. For those under 16: card expires on 16th birthday, with a 6-month advance application window. Confirms these are card-specific validity renewal procedures, separate from 在留期間更新許可申請 (status renewal). |

## Official Rule Or Source Fact

- 在留カードの有効期間 (card validity) and 在留期間 (status period) are separately managed by ISA.
- The card has its own renewal procedure (在留カードの有効期間の更新申請), separate from the status renewal procedure (在留期間更新許可申請).
- For residents 16 and over: the card validity renewal can be applied for from 2 months before card expiry until the card expiry date.
- For residents under 16: the card expires on the 16th birthday; the renewal application window is 6 months before the 16th birthday until that birthday.
- For 永住 holders: the status is permanent (no 在留期間 expiry), but the 在留カード has its own validity period (typically 7 years for 永住 holders; they must renew the card separately).
- An expired 在留カード does not mean the status of residence has expired; however, holding an expired card may constitute a technical violation and can cause practical problems (e.g., failing checks, employment verification issues).

**Source gap:** The specific card validity periods (e.g., 7 years for 永住 holders, 10 years for others) and whether carrying an expired card is a standalone violation were not directly quoted from the sources accessed in this session; marked as partially confirmed.

## Safe Answer Behavior

- When a user mentions an expired card or asks about the relationship: clearly distinguish between the two dates.
- For 永住 holders with expired cards: status has not expired; card must be renewed at the immigration bureau (在留カードの有効期間の更新申請).
- For non-永住 holders: check both dates — card expiry and status period expiry are different, but status expiry is the critical date for whether the person is legally authorized to remain.
- Do not say "card expired = status expired" or "card expired = must leave Japan."
- Do not say "status valid = no problem with expired card" without noting that the card renewal should be addressed.

## Must Say

- 在留カードの有効期限と在留期間（在留資格の期限）は別物。
- 永住者は在留期間の満了はないが，在留カードの有効期限は別に定められており，更新が必要。
- 在留カードの有効期限が切れても，在留資格（在留期間）が有効であれば，直ちに在留資格が失われるわけではない。ただし，有効期限切れのカードを更新する手続きが必要。
- 在留期間の満了（在留資格の期限）と，在留カードの有効期限は，カードに別々に記載されているため，両方を確認すること。

## Must Not Say

- 「在留カードの有効期限が切れた＝在留資格も切れた。」
- 「永住者でも在留期限がある。」（永住者の在留期間は無期限）
- 「カードの日付さえ大丈夫なら，在留期限も大丈夫。」（別物）
- 「カードが切れても，在留資格が残っているから問題ない。」（カード更新は必要）

## Deep Water Triggers

- User's card expiry date has passed but they don't know if their status has also expired.
- User is 永住 holder and card expired several months ago without renewal.
- User's child turns 16 soon and card will expire on the 16th birthday.
- User has two dates on the card and is confused about which applies to immigration status.
- Employer is refusing to employ user because card appears expired.

## User Next Actions

This is not user-facing copy. For answer routing:

- Ask user to identify: (1) the 在留期間 (status expiry date — the date the status period was granted until); (2) the 在留カード有効期限 (card document validity date). These are both printed on the card but in different fields.
- If status period has not expired: advise to renew the card at the nearest immigration bureau.
- If status period has also expired: handle as a status renewal case; may also need card renewal.
- If 永住: status is permanent; card renewal is the only needed action.

## Unknown Fields

- Whether the specific card validity duration (e.g., 7 years for 永住, 10 years for others over 16) is stated on the ISA card-validity-renewal page — not confirmed from sources accessed.
- Whether carrying an expired 在留カード is a standalone criminal or administrative violation.
- Whether employers are required by law to accept an expired-card holder whose status is still valid.

## Needs Domain Flags

- needs_domain: what is the exact legal consequence of carrying an expired 在留カード while status is still valid?
- needs_domain: what is the standard employer instruction when a worker's card appears expired but they claim status is still valid?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| card-expiry-001 | "永住者ですが在留カードの有効期限が切れました，大丈夫ですか？" | Status (永住) has not expired; card must be renewed; route to immigration bureau for card renewal procedure. |
| card-expiry-002 | "在留カードの日付が来月で切れる，ビザの更新が必要？" | Clarify which date is card validity and which is status period; if card validity is expiring but status is still valid, card renewal is needed not status renewal. |
| card-expiry-003 | "カードの日付が過ぎていると，不法滞在になる？" | Clarify: card expiry ≠ status expiry; status expiry is the relevant date for authorized stay; but card should still be renewed; route to professional if uncertain which date is which. |

## Source Notes

- The card-validity-renewal page confirmed that card validity is a separate procedure from status renewal, and that renewal applications are filed in specific windows relative to card expiry. This is strong official confirmation that the two are distinct.
- The specific validity durations (7 years for 永住, 10 years for others 16+) are commonly stated in ISA publications but were not directly quoted from the sources accessed in this session; they should be confirmed from the card issuance or FAQ pages before runtime use.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 003 G22. Key source: ISA card-validity-renewal page confirming separate procedures for card renewal vs. status renewal. 永住 holder example used as primary scenario (permanent status, expiring card). Specific duration numbers marked as not confirmed.
