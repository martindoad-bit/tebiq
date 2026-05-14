---
asset_id: guardrail-address-change-dual-obligation
title: 在留カード Address Change — City Hall With Card Satisfies Both Duties; Without Card May Not
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

This guardrail corrects two common misunderstandings about address change duties for 在留カード holders:

1. **Misconception A**: "I need to separately notify immigration AND do 住民票 at city hall — two separate trips."
   - **Correct**: If you bring your 在留カード to city hall when you submit the 住民票 change, the immigration notification is deemed satisfied simultaneously.

2. **Misconception B**: "I changed my 住民票 online / by mail / by proxy without the card — my immigration address is also updated."
   - **Correct**: If the city hall procedure was done without presenting the 在留カード, the immigration address change notification may NOT be satisfied, and a separate 14-day deadline may still apply.

The practical risk: users who do the 住民票 procedure by mail, online, or through a proxy (without the card) may believe their immigration obligation is also met — when it may not be.

## Trigger

Use this card when the user says:

- "引っ越しした，住民票を移せば入管への連絡は不要？"
- "転居届を出したが，在留カードの住所変更もしないといけない？"
- "市役所でやってもらったので，入管への届出は終わった？"
- "引越しで住民登録を変更した，入管にも連絡が必要？"
- "在留カードの住所欄が古いまま，問題ない？"
- "オンラインで転入届を出した，在留カードも更新される？"
- any pattern assuming city-hall address change automatically satisfies immigration address duty.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-address-change | L4 | 出入国在留管理庁「住居地の変更届出（中長期在留者）」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html | 2026-05-15 | Key text: 「在留カードを市区町村の窓口に持参して、住民基本台帳法第２２条、第２３条又は第３０条の４６に規定する届出を行った場合には、下記の住居地の変更届出を行ったものとみなされます。」(If you bring the 在留カード to the municipal office when filing the 住民基本台帳法 notification, the immigration address change is deemed to have been filed.) Deadline: 「新住居地に移転した日から１４日以内」 (within 14 days of moving). |

## Official Rule Or Source Fact

- ISA states: bringing the 在留カード to the city hall (市区町村の窓口) when filing the 住民基本台帳法 notification (転入届 etc.) is deemed equivalent to filing the immigration address change notification. One stop covers both.
- The deemed-satisfaction clause requires presenting the physical 在留カード at the window.
- If the 住民票 change is done without presenting the 在留カード (e.g., online, by mail, through a representative without the card), the ISA official page does not confirm that the immigration obligation is automatically satisfied in those cases.
- Standalone deadline for immigration address change: **within 14 days of moving to the new address**.
- The notification must be filed at: 住居地の市区町村の担当窓口 (the relevant municipal office of the new address).

## Safe Answer Behavior

- If user says they changed 住民票 at city hall with their 在留カード: confirm both duties are satisfied simultaneously.
- If user says they changed 住民票 online, by mail, or through a representative: clarify that the immigration obligation may NOT be satisfied by those methods; advise to confirm directly with the relevant municipal immigration window or immigration office whether a separate notification is needed.
- Do not say "just change your 住民票 and you're done" without asking whether the 在留カード was presented at the window.
- Remind that the standalone deadline for immigration address change is 14 days from moving.

## Must Say

- 在留カードを持参して市区町村の窓口で転入届等を行った場合は，入管への住居地変更届出を同時に行ったとみなされる。
- 在留カードを持参せず，郵送・オンライン・代理人（カードなし）で転入届を行った場合は，入管への届出が別途必要な可能性がある。
- 転居後14日以内の届出が義務。

## Must Not Say

- 「住民票を変えれば，入管への連絡は自動的に完了する。」（提示方法による）
- 「オンラインで転入届を出したから，在留カードの住所も更新された。」
- 「代理人が市役所に届け出てくれたので，入管も完了している。」（カード提示の有無が不明）

## Deep Water Triggers

- User has moved multiple times and is uncertain which address is on file with immigration.
- User is approaching a renewal application and address on 在留カード differs from current residence.
- User's 住民票 was done by proxy or by mail, and the 在留カード address has not been updated.
- User's 在留カード expired or was misplaced and address change was never completed.
- Address discrepancy is noticed during a police encounter, renewal, or change application.

## User Next Actions

This is not user-facing copy. For answer routing:

- Ask whether the 在留カード was physically presented at the city hall counter when the 住民票 change was filed.
- If presented: both duties are satisfied.
- If not presented (or uncertain): advise to confirm whether the immigration address change was separately processed; if not, the 14-day notification should be filed now and any delay should be noted.
- For address discrepancy found late: route to immigration office or licensed professional for late notification handling.

## Unknown Fields

- Whether online transfer-in (マイナポータル or city online system) with マイナンバーカード and linked 在留カード satisfies the immigration notification duty. (This may depend on whether the system links to ISA — not confirmed from sources accessed.)
- Whether a representative who presents the physical 在留カード on behalf of the mid-to-long-term resident satisfies the deemed-notification clause.
- The specific consequence of late address notification (14-day deadline missed) for renewal/change applications.

## Needs Domain Flags

- needs_domain: does online 転入届 via マイナポータル with linked 在留カード number satisfy the immigration address change duty?
- needs_domain: what is the consequence of late address notification for renewal/change assessment?
- needs_domain: whether a proxy presenting the physical card on behalf of the resident satisfies the card-presentation requirement.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| address-001 | "引越しした．市役所で転入届を出した．在留カードは持っていった．大丈夫？" | Confirm: both duties satisfied simultaneously if card was physically presented. |
| address-002 | "転入届をオンラインで出しました，在留カードの住所変更はもう完了？" | Must not confirm; online method without card presentation may not satisfy immigration duty; advise to verify or file separately. |
| address-003 | "友達に代わりに転入届を出してもらった，在留カードの住所は更新された？" | Ask whether friend brought the physical 在留カード to the window; if not, separate immigration notification may still be needed. |

## Source Notes

- The official ISA page explicitly uses the word 「みなされます」 (deemed to be) for the city-hall-with-card scenario — this is a strong and clear official confirmation.
- The conditions requiring card presentation at the window are explicit; online and proxy routes without card presentation are not mentioned as satisfying the condition.
- Online procedures that may link 在留カード data electronically (e.g., マイナポータル) are a newer development and may have different rules — confirmed from this source only that physical window presentation satisfies the condition.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 003 G18. Key finding: bringing 在留カード to city hall window during 住民票 change satisfies both duties simultaneously (deemed notification). Without card presentation, immigration duty may still apply separately. Source: ISA address change page with direct quote.
