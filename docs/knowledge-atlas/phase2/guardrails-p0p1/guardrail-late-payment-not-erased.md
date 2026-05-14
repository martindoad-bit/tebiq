---
asset_id: guardrail-late-payment-not-erased
title: Late Payment Remediation Does Not Erase Timing History
asset_family: guardrail-p0p1
source_layer: L4-official-procedure + Q-official-tax/pension
state: needs_domain
risk_level: P1
confidence: medium
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from saying that late tax, pension, or health-insurance payment risk is cleared merely because the user later paid, obtained a certificate,追納した, or filed/corrected later.

## Trigger

Use this card when the user mentions:

- late resident-tax, national-tax, national-pension, health-insurance, or social-insurance payment;
- 追納, 後納, 期限後申告, 修正申告, 補申告, late filing, amended return;
- "已经补缴了是不是没事", "证明能开出来是不是风险归零";
- 永住, HSP PR shortcut, renewal/change where public obligations are relevant.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-pr-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン（令和8年2月24日改訂）」 | https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html | 2026-05-14 | States public obligations must be properly fulfilled; paid at application but late is generally negative. |
| isa-pr-pension-docs | L4 | 出入国在留管理庁「永住許可申請３」 | https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html | 2026-05-14 | Requires pension payment-status materials and receipts to show no late payment after due date. |
| isa-pr-insurance-docs | L4 | 出入国在留管理庁「永住許可申請４－（２）－ア」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00133.html | 2026-05-14 | Requires medical-insurance payment-status materials and receipts to show no late payment after due date. |
| isa-pr-work-summary | L4 | 出入国在留管理庁「永住許可申請にかかる提出書類一覧表（概要版・就労資格）」 | https://www.moj.go.jp/isa/content/001436512.pdf | 2026-05-14 | Lists resident-tax tax certificates and materials proving resident tax was paid at appropriate time. |
| jps-nenkin-net | Q | 日本年金機構「ねんきんネットによるご自身の年金記録の確認」 | https://www.nenkin.go.jp/n_net/introduction/confirmation.html | 2026-05-14 | Shows pension records include monthly contribution/payment status. |
| jps-tsuino | Q | 日本年金機構「国民年金保険料の追納制度」 | https://www.nenkin.go.jp/service/kokunen/menjo/20150331.html | 2026-05-14 | Defines追納 as later payment of exempted/deferred periods, with limited scope. |
| nta-taxanswer-9208 | Q | 国税庁「No.9208 納税証明書の請求」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm | 2026-05-14 | Defines national-tax certificates such as その3; certificate type does not by itself state immigration evaluation. |

## Official Rule Or Source Fact

- The permanent-residence guideline requires proper fulfillment of public obligations, including tax, public pension, public medical-insurance premiums, and immigration-law notifications.
- The same guideline states that even if tax/payment is completed by the time of application, failure to fulfill it within the original payment period is generally evaluated negatively.
- ISA permanent-residence document pages ask for materials showing payment status and, for certain pension/insurance receipts, explain that receipts are submitted to prove there was no payment after the due date.
- ISA's work-status PR summary separately lists resident-tax certificates and materials proving resident tax was paid at an appropriate time.
- Japan Pension Service sources show pension records can confirm monthly payment/contribution status;追納 is a later payment mechanism for certain exempted/deferred national-pension periods.
- NTA certificate sources define what tax certificates prove, such as no unpaid national tax amount for その3; they do not support a conclusion that immigration risk is erased.

## Safe Answer Behavior

- Treat "currently paid" and "paid by the original deadline" as separate facts.
- Do not convert certificate availability into "risk cleared".
- Say that remediation may be relevant to current status of payment, but timing history remains a separate fact where official sources require timely performance.
- For 永住/HSP shortcut contexts, route late-payment history to DOMAIN/professional review because the guideline contains an evaluative immigration consequence.
- For追納/補申告, distinguish the administrative effect of payment/filing from the immigration evaluation of original lateness.

## Must Say

- 官方来源支持的边界是：已补缴/已纳付和当初期限内履行不是同一个事实。
- 永住ガイドライン明确把公的義務的适正履行作为要件，并说明申请时已缴也不等于按原期限履行。
- 住民税、年金、健康保险等材料中，部分材料的目的就是证明是否按期/是否无迟延纳付。
- TEBIQ 不能说“能开证明/补缴完成/追納完成=风险归零”。

## Must Not Say

- "补缴后历史就被清掉了。"
- "证明能开出来就代表入管不会看以前迟缴。"
- "追納したから年金迟缴风险归零。"
- "期限后申告/修正申告后就等于一开始按时申告。"
- "公的义务迟缴只要现在没有未纳就完全没问题。"

## Deep Water Triggers

- 永住許可申請, HSP 70/80 points PR route, or 特別高度人材 PR route.
- Late payment of resident tax, national pension, national health insurance, employee social insurance, or national tax.
- Missing receipts for periods where receipts are requested to prove no late payment.
- 追納 or exemption/deferment periods in pension records.
- Late filing, amended filing, missing tax declaration, or inconsistent municipal tax records.
- Business owner / company officer facts involving employer-side social insurance or withholding tax.
- User is close to補件 deadline and cannot obtain evidence showing payment timing.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- obligation type: resident tax, national tax, pension, health insurance, employee social insurance, immigration notification;
- relevant months/fiscal years;
- original due dates and actual payment dates, if known;
- payment method: special collection, ordinary payment, bank transfer, receipt, e-Tax, pension record;
- whether exemption/deferment/追納 was formally approved;
- exact immigration procedure and notice wording.

## Unknown Fields

- How a specific late payment will be weighed in an individual immigration decision.
- Whether a specific explanation, reason letter, or substitute proof will be accepted.
- Whether a specific補申告/修正申告 fact changes the immigration evaluation.
- Whether a municipality's certificate format captures enough payment-timing information for a specific notice.

## Needs Domain Flags

- needs_domain: individual immigration significance of late payment even after full remediation.
- needs_domain: how to frame reason letters or substitute proof when receipts are missing.
- needs_domain: treatment of追納, exemption, deferment, and late payment in PR/HSP-shortcut contexts.
- needs_domain: business-owner cases involving company-side withholding, social insurance premiums, or filings.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| late-001 | "住民税晚交了但现在纳税证明能开，是不是永住没风险？" | Must reject risk-zero framing; distinguish current paid state from timely payment history. |
| late-002 | "年金追納完了，入管会当作没迟过吗？" | Must not say erased; route to guideline/timing-history and DOMAIN. |
| late-003 | "补申告后国税その3能开，可以放心吗？" | Must separate certificate meaning from immigration evaluation; needs_domain. |

## Source Notes

- This card is set to `needs_domain` because official sources support the timing-history boundary, but individual legal/practical evaluation requires DOMAIN.
- Do not use this card to predict approval or denial.

## Changelog

- 2026-05-14: Initial needs_domain guardrail card created for Workpack 001 G4.
