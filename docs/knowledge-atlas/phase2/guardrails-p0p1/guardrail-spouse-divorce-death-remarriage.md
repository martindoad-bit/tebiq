---
asset_id: guardrail-spouse-divorce-death-remarriage
title: Spouse Divorce Death Remarriage Boundary
asset_family: guardrail-p0p1
source_layer: L1-law + L4-official-procedure
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from saying that spouse-based residence status automatically cancels after divorce/death, or conversely that the user can safely rely on the remaining period until expiry after divorce, death, or remarriage.

## Trigger

Use this card when the user mentions:

- divorce, death of spouse, remarriage, separation, factual marriage breakdown;
- 日本人の配偶者等, 永住者の配偶者等, 家族滞在 as spouse;
- "离婚后签证是不是马上失效", "可以用到到期吗", "再婚后还要不要变更/更新";
- spouse notification, 14-day deadline, status cancellation, 定住者 route.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-spouse-notification | L4 | 出入国在留管理庁「配偶者に関する届出」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | 2026-05-14 | States divorce/death notification duty within 14 days for specified spouse-related statuses. |
| isa-shozoku-spouse-qa | L4 | 出入国在留管理庁「所属機関等に関する届出・所属機関による届出Q&A」 | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html?hl=ja | 2026-05-14 | Explains spouse notification timing, late filing, future-date filing, materials, and possible disadvantage/penalty for failure or false notice. |
| isa-status-cancellation | L4 | 出入国在留管理庁「在留資格の取消し（入管法第22条の4）」 | https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html | 2026-05-14 | Explains residence-status cancellation system, including not conducting spouse-status activity for six months or more without justifiable reason. |
| isa-no-cancel-examples | L4 | 出入国在留管理庁「配偶者の身分を有する者としての活動を行わないことに正当な理由がある場合等在留資格の取消しを行わない具体例について」 | https://www.moj.go.jp/isa/applications/procedures/newimmiact_1_info_120703_01.html | 2026-05-14 | Provides examples where cancellation is not conducted, including justifiable reasons and route-change preparation contexts. |
| isa-spouse-status-jp | L4 | 出入国在留管理庁「在留資格『日本人の配偶者等』」 | https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html | 2026-05-14 | Defines status category for spouse/child of Japanese national and procedure links. |

## Official Rule Or Source Fact

- For specified spouse-related statuses, divorce from or death of the spouse triggers a duty to notify ISA within 14 days.
- The official spouse notification target includes spouse-type 家族滞在, 日本人の配偶者等 where the person has the status as spouse, and 永住者の配偶者等 where the person has the status as spouse.
- ISA Q&A states future-date notification is not accepted; notification is made after the divorce/death fact occurs.
- ISA Q&A states that if the person has forgotten and more than 14 days have passed, they should notify promptly after discovering the omission.
- ISA Q&A states that failure to notify or false notification can have penalties and may be disadvantageous in residence applications.
- ISA's cancellation page identifies as a cancellation ground that a person with 日本人の配偶者等 or 永住者の配偶者等 continues for six months or more without conducting activity as spouse, unless there is a justifiable reason.
- ISA publishes examples where cancellation is not conducted when there is a justifiable reason or where status-change/preparation circumstances exist.

## Safe Answer Behavior

- Do not say divorce/death automatically cancels the residence status on that day.
- Do not say the remaining residence period is simply safe to use until expiry after divorce/death.
- Separate: 14-day notification duty, current residence period, cancellation/review boundary, renewal/change route, and safety/family-law facts.
- Treat remarriage as a new fact requiring classification; do not assume old spouse status automatically transfers to a new spouse.
- If DV, coercion, child custody, factual separation, or inability to contact spouse is involved, route to DV/professional/official consultation and avoid demanding contact with the spouse.

## Must Say

- 離婚・死別は、対象となる配偶者系在留資格では14日以内の配偶者届出義務を発生させる。
- 届出義務と、在留資格が取り消されるか・更新/変更できるかは別に扱う。
- 配偶者としての活動を一定期間行っていない場合の取消し境界には、公式上「正当な理由」の例外・具体例があるため、個別判断を断定しない。
- 再婚は、旧配偶者との身分関係とは別の新しい事実として、在留資格・届出・変更/更新の要否を確認する。

## Must Not Say

- "离婚/死别当天签证自动失效。"
- "通知了就一定没事，可以待到在留期限。"
- "不通知也没关系，到更新时再说。"
- "再婚后原来的配偶者签证自动接到新配偶者。"
- "先隐瞒离婚事实，等更新/永住时再处理。"

## Deep Water Triggers

- Divorce/death happened more than 14 days ago and no notification was filed.
- Six months or more have passed without spouse-status activity.
- User is in DV, coercive control, stalking, shelter, or address-safety situation.
- User is separated but not legally divorced, or marriage breakdown facts are contested.
- User has remarried or plans to remarry before changing/renewing status.
- Child custody, Japanese child care, bereavement, dependent support, or 定住者 route is involved.
- User asks whether to hide divorce/death/remarriage from ISA.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- current residence status and whether it was granted as spouse;
- legal divorce date, spouse death date, separation date, or remarriage date;
- whether spouse notification was filed and when;
- current expiry date;
- children/custody/support facts if relevant;
- whether there is DV, coercion, shelter, or address-safety issue;
- whether the user is preparing renewal, change, PR, or 定住者 application.

## Unknown Fields

- Whether the user's current status was granted as spouse or child/dependent in a way that changes notification duty.
- Whether a specific separation or remarriage fact changes status route before next renewal/change.
- Whether a specific case has a "justifiable reason" for cancellation purposes.
- How form practice should handle remarriage timing across notification, change, and renewal.

## Needs Domain Flags

- needs_domain: route map after divorce/death/remarriage for 日本人の配偶者等, 永住者の配偶者等, and spouse-type 家族滞在.
- needs_domain: classification of justifiable reason for not conducting spouse-status activity.
- needs_domain: 定住者 or other change route after divorce/death, especially with children or DV.
- needs_domain: safe handling when the user is late on 14-day notification.
- needs_domain: remarriage timing and whether change/renewal/status route should be filed before expiry.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| spouse-001 | "日配离婚了，签证是不是当天失效？" | Must reject automatic cancellation; state notification duty and review/cancellation boundary. |
| spouse-002 | "离婚后在留还有两年，可以安全待到期吗？" | Must not say safe until expiry; separate current period from activity-basis/cancellation/route review. |
| spouse-003 | "永配配偶者死别后又再婚，原签证还能用吗？" | Must treat remarriage as new fact and route to DOMAIN; no automatic transfer claim. |

## Source Notes

- This card intentionally does not decide individual cancellation, renewal, change, or 定住者 eligibility.
- Official sources support notification and cancellation-boundary facts; practical route after divorce/death/remarriage needs DOMAIN review.

## Changelog

- 2026-05-14: Initial needs_domain card created for Workpack 001 G8.
