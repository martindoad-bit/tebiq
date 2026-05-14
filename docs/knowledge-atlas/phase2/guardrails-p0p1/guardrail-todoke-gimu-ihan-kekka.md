---
asset_id: guardrail-todoke-gimu-ihan-kekka
title: 届出義務違反の法的結果 — Notification Duty Failures Are Not Harmless; Criminal Penalty And Cancellation Risk
asset_family: guardrail-p0p1
source_layer: L1-law
state: atlas_draft
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 004"
---

## What This Document Is

This guardrail prevents answers from treating immigration notification duty failures (届出義務違反) as administrative oversights with no real consequence. Three types of notifications have 14-day deadlines under 入管法:

1. **所属機関等に関する届出** — job/affiliation change notification
2. **配偶者に関する届出** — divorce/death of spouse notification
3. **住居地変更の届出** — address change notification

Failures to file, or filing with false information, each carry legal consequences:
- **False notifications**: criminal penalty under 入管法 第71条 (up to 1 year imprisonment or 20万円 fine)
- **Late/non-filing of address changes**: 在留資格取消 ground under 入管法 第22条の4第1項 (grounds 8–10)
- **Application accuracy**: subsequent renewal/change applications must be consistent with notification history

Key errors to block:
- "14日の期限を過ぎても，後で届けれれば大丈夫。"
- "会社が届け出てくれるから，自分では届出不要。"（G14 cross-ref — employer notification is parallel, NOT substitute）
- "住所変更の届出をしていないが，問題ない。"
- "虚偽の届出をしても，実態が合っていれば問題ない。"

## Trigger

Use this card when the user says:

- "転職して１か月経ったが届出をしていない，問題ある？"
- "離婚したが入管への届出をしていなかった，どうすれば？"
- "住所を変えたが入管への届出をしていない，大丈夫？"
- "届出期限を過ぎてしまった，今からでも届けられる？"
- "届出を忘れていた，在留更新に影響する？"
- "届出をしなかった場合，どんな罰則がある？"
- any pattern treating notification duty failures as harmless or easily corrected.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shozoku-duty | L4 | 出入国在留管理庁「所属機関等に関する届出（中長期在留者本人からの届出）」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html | 2026-05-15 | Confirms 14-day deadline for employment/affiliation change notification. Source: "契約機関との契約が終了した場合、新たな契約を締結した場合は、１４日以内に...届出を行う必要があります。" Penalty text not included on this page — cross-ref to 入管法 第71条の3. |
| isa-haigusha-duty | L4 | 出入国在留管理庁「配偶者に関する届出」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | 2026-05-15 | Confirms 14-day deadline for divorce/death notification. Source: "配偶者と離婚した場合、死別した場合は、１４日以内に...届出を行う必要があります。" Penalty text not on this page. |
| isa-juusho-duty | L4 | 出入国在留管理庁「住居地の届出（住居地変更の届出）」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html | 2026-05-15 | Confirms 14-day deadline for address change. Penalty text not on this page. |
| isa-torikeshi | L4 | 出入国在留管理庁「在留資格の取消し（入管法第22条の4）」 | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | 2026-05-15 | Grounds (8)–(10): 住居地届出に関する事由 — address notification failures are a 在留資格取消 ground under Article 22-4. |
| nyukan-art71-2 | L1 | 出入国管理及び難民認定法 第71条（虚偽届出） | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 「住居地、所属機関等の届出に関し、虚偽の届出をした者」→ 1年以下の懲役または20万円以下の罰金. **Confidence: medium** — consistent with secondary professional sources but not directly quoted verbatim from e-Gov text in this session. |
| nyukan-art71-3 | L1 | 出入国管理及び難民認定法 第71条の3（届出不履行） | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | Non-filing or late filing of required notifications → 20万円以下の罰金. **Confidence: medium** — same sourcing note. |

**Confidence note:** The ISA procedure pages confirm 14-day deadlines but do NOT include penalty text on the pages themselves. The 入管法 第71条 and 第71条の3 text was obtained via e-Gov database (agent access) and corroborated by secondary professional sources. Direct e-Gov verbatim quote not available from this session.

## Official Rule Or Source Fact

**Notification deadlines (confirmed from ISA official pages):**
- 所属機関変更（転職・退職・就職）: 14日以内
- 配偶者に関する変更（離婚・死別）: 14日以内
- 住居地変更（引越し）: 14日以内（在留カードを市区町村窓口に持参して届出）

**Criminal penalty for false notifications (入管法 第71条, medium confidence):**
> 「住居地、所属機関等の届出に関し、虚偽の届出をした者」
→ 1年以下の懲役 または 20万円以下の罰金

**Criminal penalty for non-filing (入管法 第71条の3, medium confidence):**
- 届出不履行（正当な理由なく届け出なかった場合）→ 20万円以下の罰金

**Cancellation ground for address notification failures (confirmed from ISA 第22条の4 page):**
- 入管法 第22条の4第1項 (8)–(10): 住居地届出に関する事由 — address notification violations are a 在留資格取消 ground

**Important distinction — notification duty is personal:**
- The obligation to notify belongs to the 中長期在留者 personally (cross-ref: G14 guardrail-third-party-cannot-replace-immigration-duty)
- Employer notification (所属機関による届出) is a parallel duty, NOT a substitute for the individual's duty

## Safe Answer Behavior

- When a user says they missed the 14-day deadline: do not say "it's fine, just file now." Advise filing as soon as possible but note that late filing does not erase the past violation; route to professional if the delay is significant.
- When a user says they filed a notification with incorrect information: flag 第71条 risk (false notification criminal penalty); route to professional.
- When a user says their employer handled notifications: clarify that employer notifications are a parallel duty; the person must still file their own notification (G14 cross-ref).
- Do not characterize late notification as a minor administrative error that ISA automatically overlooks.
- Do not advise that late notification is automatically correctable without consequences.

## Must Say

- 所属機関の変更・配偶者の変更・住居地の変更はいずれも，変更があった日から14日以内に届出が必要（中長期在留者本人が届出義務者）。
- 届出を行わなかった場合，入管法第71条の3の罰則（20万円以下の罰金）の対象となる可能性がある。
- 虚偽の届出を行った場合，入管法第71条の罰則（1年以下の懲役または20万円以下の罰金）の対象となる可能性がある。
- 住居地届出の違反は，在留資格取消事由（第22条の4）に該当する場合がある。
- 会社や学校が届出をしても，本人の届出義務は別途存在する。

## Must Not Say

- 「14日を過ぎても，気づいたときに届ければ問題ない。」（遅延自体が違反）
- 「会社が届け出てくれているから，自分での届出は不要。」（本人義務は別個）
- 「少し情報が違っても，届出をしたこと自体は評価される。」（虚偽届出は別の違反）
- 「届出していなくても，在留期間が残っているから影響ない。」（取消事由になる）

## Deep Water Triggers

- User has not filed address notification for many months and now faces renewal application.
- User changed jobs without filing notification and the gap period is long (3+ months may trigger 在留資格取消 ground (6) as well).
- User filed a notification with incorrect information (wrong address, wrong employer name, wrong date).
- User has never filed any notification despite multiple address/job changes over years.
- User wants to know if they can just file now without ISA noticing the historical gap.

## User Next Actions

This is not user-facing copy. For answer routing:

- If late notification: advise to file immediately at the nearest immigration bureau (for affiliationchange/address changes) or via the online system; note that late filing does not retroactively eliminate the violation.
- If false notification already submitted: route to lawyer — this is a criminal exposure matter.
- If multiple missed notifications: route to 行政書士/弁護士 for assessment before the next renewal application.
- If user asks about renewal application impact: note that notification history is checked at renewal; gaps may be questioned; route to professional for assessment.

## Unknown Fields

- Whether there is a voluntary disclosure or correction procedure at ISA for previously false notifications, and whether voluntary correction reduces criminal exposure.
- The exact grace period (if any) between missing the 14-day deadline and when ISA is likely to initiate enforcement.
- Whether a single late notification, without other violations, is routinely enforced via the 20万円 fine or treated as a warning.
- The specific scope of 入管法 第71条の3 — whether it applies to all three notification types or only specific ones.

## Needs Domain Flags

- needs_domain: is there a practical amnesty or reduced-enforcement approach for single-instance late notifications when the delay is short?
- needs_domain: how does ISA treat a renewal application where the applicant discloses a history of missed notifications — is this a routine denial factor?
- needs_domain: is the 入管法 第71条の3 罰則 (non-filing fine) routinely pursued, or is it primarily used as a lever in cancellation/deportation proceedings?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| todoke-001 | "転職して２か月経ちましたが，所属機関の届出をしていません，今からでも大丈夫ですか？" | State: 14-day deadline passed; late filing should be done immediately; late filing does not erase past violation; route to professional if renewal is approaching. |
| todoke-002 | "届出をしていませんが，会社が届け出ているはずです，自分での届出はしなくていいですか？" | State: employer notification is parallel duty, NOT substitute; individual must file own notification; route to G14 cross-reference. |
| todoke-003 | "住所変更の届出をするのを忘れていました，罰則はありますか？" | Explain: late/non-filing may trigger 第71条の3 penalty (20万円以下の罰金); address violation is also 取消 ground; advise to file immediately and consult professional. |

## Source Notes

- The 14-day notification deadlines are confirmed from the three official ISA procedure pages.
- The penalty articles (第71条, 第71条の3) were not directly quoted verbatim from e-Gov in this session; they are medium-confidence based on agent access and secondary professional source corroboration.
- The cancellation ground for address notification violations (第22条の4 grounds 8–10) is high-confidence confirmed from the ISA cancellation page.
- The ISA procedure pages themselves do NOT include penalty text — this is a gap in user-facing official information that contributes to the common misconception that notifications are low-stakes.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 004 G29. Key sources: three ISA notification duty pages (14-day deadline confirmed); ISA cancellation page (grounds 8–10); 入管法 第71条/第71条の3 (medium confidence, agent-sourced). Core pattern blocked: notification failures as harmless. Employer-duty parallel (G14) cross-referenced.
