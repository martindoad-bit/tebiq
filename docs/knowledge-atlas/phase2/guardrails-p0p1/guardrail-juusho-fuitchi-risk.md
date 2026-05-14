---
asset_id: guardrail-juusho-fuitchi-risk
title: 住民票住所と在留カード住所の不一致 — Dual Address Obligations Must Match; Mismatch Creates Legal and Application Risk
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 004"
---

## What This Document Is

This guardrail prevents answers from treating 住民票 address registration and 在留カード address as separate, independent choices where the resident can simply update one and not the other. In reality:

- Foreign residents have a **dual obligation**: update 住民票 at city hall (住民基本台帳法) AND update the immigration address record (入管法).
- The two obligations are linked but require a specific action: **bringing the 在留カード to the city hall window** satisfies both simultaneously (G18 / guardrail-address-change-dual-obligation).
- When a person updates only the 住民票 (e.g., by online or proxy means without presenting the card) without satisfying the immigration duty, a mismatch arises.
- When a person's actual residence differs from their registered address (either 住民票 or 在留カード), this can affect:
  - Renewal/change application scrutiny (actual residence must match registered facts)
  - Whether notices (はがき/郵便) from ISA reach the applicant
  - The validity of the address declaration on renewal/change applications

## Trigger

Use this card when the user says:

- "住民票の住所と在留カードの住所が違うが大丈夫？"
- "引っ越したが住民票だけ移した，入管への届出は別にいる？"
- "入管の住所と実際に住んでいる場所が違う"
- "在留カードの住所を変更していなかった，更新に影響する？"
- "会社の寮に登録しているが実際は別の場所に住んでいる"
- "同居人の住所に住民票を置いているが実際は別"
- any pattern where the user's registered address (either type) may differ from their actual residence or from the other registry.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-address-duty | L4 | 出入国在留管理庁「住居地の届出（住居地変更の届出）」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html | 2026-05-15 | Confirmed: bringing 在留カード to city hall window satisfies BOTH 住民票 and ISA duties simultaneously. Without card, ISA duty may not be satisfied. 14-day deadline. (Cross-ref: G18 guardrail-address-change-dual-obligation.) |
| isa-torikeshi | L4 | 出入国在留管理庁「在留資格の取消し（入管法第22条の4）」 | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | 2026-05-15 | Grounds (8)–(10) of Article 22-4: 住居地届出に関する事由 — address notification failures are a cancellation ground. (Cross-ref: G26 guardrail-zairyu-shikaku-torikeshi-22-4.) |

## Official Rule Or Source Fact

**From G18 (confirmed official source):**
- 住居地変更の届出: when moving, 在留カードを市区町村の窓口に持参して転入・転居の届出を行った場合には，入管法上の届出を行ったものとみなされます。
- Deadline: 14 days from moving date.
- Without presenting the card at the window (e.g., online registration, proxy without card): the immigration address duty may NOT be satisfied.

**From G26 (confirmed official source):**
- 在留資格取消 grounds (8)–(10) include 住居地届出に関する事由 (address notification-related grounds). Persistent address non-compliance can be a cancellation trigger.

**Logical extension (not directly quoted from a single source, but derived from confirmed facts):**
- If 住民票 address and 在留カード address differ because the person failed to bring the card to the window: the immigration address has not been updated.
- If the person's actual residence differs from registered addresses: renewal/change application truthfulness is at risk (application forms require current actual address).
- ISA result notices (postcard/letter) go to the registered immigration address — if wrong, notices may be missed.

**Source gap:** The specific consequence for an address mismatch that is discovered by ISA during a renewal/change application (vs. the automatic cancellation pathway) is not directly quoted from the sources accessed. This card is `needs_domain` pending confirmation of:
1. Whether ISA considers a 住民票-only update (without card) as satisfying the address change requirement.
2. The exact application risk of submitting a renewal with a current address different from the card's registered address.

## Safe Answer Behavior

- When a user mentions their 住民票 address and 在留カード address differ: clarify the dual-obligation rule and that card must be brought to city hall window to satisfy both duties.
- When a user says they only updated 住民票 online: clarify this may not satisfy the ISA address duty; advise to visit city hall with card.
- When a user's actual residence differs from both registered addresses: this is a mismatch that affects application accuracy and notice delivery; route to professional for assessment.
- Do not say "住民票 is enough" — the two registries have separate obligations.
- Do not say "just update the 在留カード separately at immigration office" — the standard dual-satisfaction route is city hall with card.

## Must Say

- 住民票の住所と在留カードの住所（入管への届出住所）は，引越し時に在留カードを市区町村の窓口に持参して届出を行うことで，両方を同時に更新できる。
- 在留カードを持参せずに住民票の転入届をした場合，入管法上の住居地変更届が完了していない可能性がある。
- 住居地届出の違反は，在留資格取消事由（第22条の4第1項(8)〜(10)号）に該当する場合がある。
- 在留期間更新・在留資格変更申請では，現在の住所を正確に記載する必要があり，登録住所と実際の居住地が異なる場合は問題になる可能性がある。
- ISAからの結果通知（はがき等）は在留カードに登録された住所に届くため，住所が正確でないと通知を受け取れない可能性がある。

## Must Not Say

- 「住民票を変えれば，在留カードの住所も自動的に変わる。」
- 「住民票の住所と在留カードの住所が違っても，在留期間内なら問題ない。」
- 「入管への住所変更は，窓口に行かなくてもオンラインや郵便でできる。」（カード持参が要件）
- 「実際の住所と登録住所が違っても，更新申請には影響しない。」

## Deep Water Triggers

- User's actual residence has been different from both registered addresses for many months.
- User submitted renewal application with an address that doesn't match their 在留カード.
- User missed an ISA postcard/notice because it went to an outdated address.
- User has 住民票 at one address (e.g., parent's house, company dormitory) but actually lives elsewhere.
- User with DV situation where registered address and actual address must be kept separate for safety.
- User in shared housing where 住民票 is not accepted at the actual address.

## User Next Actions

This is not user-facing copy. For answer routing:

- If user has only updated 住民票 without card at window: advise to visit city hall with 在留カード to satisfy both duties; confirm 14-day window from move.
- If 14-day window has passed without ISA duty satisfaction: route to professional — late notification may need remediation.
- If actual residence differs from registered address: route to professional for assessment before next renewal/change application.
- If DV/safety context: route to G9 (DV guardrail) — do not advise standard city-hall address update process.

## Unknown Fields

- The exact ISA consequence when a renewal/change application's stated address differs from the address on the 在留カード record.
- Whether online 転入届 (住民票) is accepted for foreign residents in all municipalities, and what happens to the ISA duty in those cases.
- Whether there is any official guidance on timing — e.g., if a person moves frequently, does the 14-day clock reset each time?
- The specific 入管法 articles for grounds (8)–(10) of Article 22-4 (住所 grounds) — the ISA page listed them but did not quote their specific text.

## Needs Domain Flags

- needs_domain (P1): does online 転入届 or proxy without card satisfy the ISA address duty in any municipality? ISA page implies not, but official per-municipality variation is unclear.
- needs_domain (P1): what is the actual application risk assessment when a renewal applicant's stated current address is different from the address recorded on the 在留カード?
- needs_domain (P1): is there a process for retroactively correcting a missed address change notification at ISA, and what is the route?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| juusho-001 | "引っ越しましたが住民票だけオンラインで変えました，入管への届出は別に必要ですか？" | Must state: online 転入届 without card may not satisfy ISA duty; bring 在留カード to city hall window within 14 days. |
| juusho-002 | "住民票の住所と在留カードの住所が違います，更新申請に影響しますか？" | Flag both the registration mismatch and the renewal application accuracy risk; route to professional for assessment. |
| juusho-003 | "実際に住んでいる場所と住民票の住所が違います，問題ありますか？" | Flag risk: address accuracy required for renewal application; ISA notices go to registered address; route to professional. |

## Source Notes

- The dual-satisfaction rule (card at city hall window = both duties) is confirmed from G18 source (ISA address duty page).
- The cancellation grounds (8)–(10) for address matters are from G26 source (ISA cancellation page). Their exact text was not extracted in full — marked needs_domain.
- The application accuracy risk (stated address vs registered address on renewal) is logically derived but not directly quoted from a renewal guidance page. Needs confirmation.

## Changelog

- 2026-05-15: Initial needs_domain card as Batch 004 G30. Core facts derived from G18 (dual duty) and G26 (cancellation grounds). Application risk angle and consequence details marked needs_domain. Core safe-answer behavior established.
