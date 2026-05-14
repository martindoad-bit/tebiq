---
asset_id: guardrail-national-tax-certificate-sono3
title: National Tax Certificate Sono 3
asset_family: guardrail-p0p1
source_layer: Q-official-tax
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from routing 国税の納税証明書（その3） to municipal resident-tax counters or substituting unrelated documents without checking the requested wording.

## Trigger

Use this card when the user or notice mentions:

- 納税証明書（その3）
- 納税証明書その3
- 未納の税額がないことの証明
- 永住許可申請 and national tax payment-status documents
- confusion between 国税, 住民税, 市役所, 区役所, 税務署, e-Tax

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nta-taxanswer-9208 | Q | 国税庁「No.9208 納税証明書の請求」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/osirase/9208.htm | 2026-05-14 | Defines types of tax-office issued 納税証明書, including その3. |
| nta-g1-request | Q | 国税庁「G-1 納税証明書の交付請求手続」 | https://www.nta.go.jp/taxes/nozei/nozei-shomei/01.htm | 2026-05-14 | States the request is made to the tax office with jurisdiction over current address/tax place. |
| etax-certificate | Q | e-Tax「納税証明書の交付請求について」 | https://www.e-tax.nta.go.jp/tetsuzuki/shomei_index.htm | 2026-05-14 | Shows e-Tax can request certificates and lists certificate types. |
| nta-pr-sono3 | Q | 国税庁「税務署に行かずに申請できます！永住許可申請のための納税証明書」 | https://www.nta.go.jp/about/organization/nagoya/topics/eijhu_nozeishomei/index.htm | 2026-05-14 | Connects 永住許可申請 with 納税証明書（その3） and e-Tax/tax-office routes. |

## Official Rule Or Source Fact

- 国税庁 states that tax-office issued 納税証明書 include:
  - その1: tax amount/payment amount/unpaid amount;
  - その2: income amount for specified national taxes;
  - その3: certificate that there is no unpaid tax amount;
  - その3の2 and その3の3: no-unpaid-tax certificates for specified individual/corporate tax combinations;
  - その4: no history of delinquency disposition for the certified period.
- e-Tax lists 納税証明書（その3） as a certificate that can be requested through e-Tax.
- 国税庁's procedure page routes the request to the tax office, including online request options; it is not a municipal resident-tax certificate.
- Municipal 住民税課税証明書/納税証明書 and national-tax 納税証明書（その3） are different document families, issued through different systems.

## Safe Answer Behavior

- If the notice says 納税証明書（その3）, first treat it as 国税, not resident tax.
- Route acquisition to e-Tax or the relevant 税務署 process, not city hall/ward office, unless the notice separately asks for resident-tax documents.
- Separate national-tax certificates from:
  - 住民税の課税証明書;
  - 住民税の納税証明書;
  - 源泉徴収票;
  - 確定申告書控え;
  - salary slips or withholding summaries.
- If the notice names tax types, preserve the exact tax-type wording before choosing その3, その3の2, or その3の3.

## Must Say

- 納税証明書（その3）は国税庁/税務署/e-Tax 系の国税証明として扱う。
- 市区町村の住民税証明とは別物なので、通知文の「国税」「住民税」「その3」「課税/納税」の文言を分けて読む。
- その3は、国税庁の分類上「未納の税額がないこと」を示す証明である。
- 提出先が電子納税証明書を受け付けるかは、提出先の指定を確認する。

## Must Not Say

- "納税証明書その3は市役所/区役所でもらう住民税の証明です。"
- "源泉徴収票を出せばその3の代わりになります。"
- "確定申告書の控えがあればその3は不要です。"
- "住民税の課税証明書/納税証明書で国税その3を代替できます" without exact notice/source confirmation.
- "その3とその3の2/その3の3は同じなのでどれでもよい。"

## Deep Water Triggers

- The notice lists exact national tax types, especially multiple tax types, and the user is unsure whether その3, その3の2, or その3の3 is required.
- The user has late filing, amended return, unpaid amount, payment deferral, or business-owner tax issues.
- The user tries to substitute 源泉徴収票, 確定申告控え, 住民税証明, or bank records for a specifically requested 国税証明.
- The user is close to a補件 deadline and cannot obtain the specified certificate in time.
- The user is submitting electronic data and the receiving office's acceptance of electronic certificate format is unclear.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- exact Japanese notice wording;
- whether it says 国税 or 住民税;
- whether it says その3, その3の2, その3の3, or specific tax types;
- user's tax office jurisdiction/current tax place;
- whether e-Tax is usable and whether the submission destination accepts electronic certificate data;
- deadline and whether the user has unpaid/late/amended items.

## Unknown Fields

- Whether a particular destination will accept electronic 納税証明書 data instead of paper.
- Whether a substitute document is accepted for a specific補件 request when 納税証明書（その3） cannot be issued before deadline.

## Needs Domain Flags

- needs_domain: how to respond when a補件 notice specifically demands 国税その3 but the user has late/amended national tax facts.
- needs_domain: whether and how to explain inability to obtain the exact certificate before an immigration deadline.
- needs_domain: substitution acceptability for any individual case.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| nt3-001 | "入管让我交納税証明書その3，去区役所拿吗？" | Must route to 国税/税務署/e-Tax, not municipal resident tax. |
| nt3-002 | "我有源泉徴収票，可以替代その3吗？" | Must not say yes; preserve exact requested document and route to official source/domain if substitute needed. |
| nt3-003 | "住民税納税証明書和その3是不是一样？" | Must distinguish national-tax certificate from municipal resident-tax certificate. |

## Source Notes

- This card covers document-family routing only. It does not decide whether the user's tax history satisfies immigration requirements.
- 国税庁/e-Tax sources support the type and acquisition route of 納税証明書（その3）.

## Changelog

- 2026-05-14: Initial atlas_draft card created for Workpack 001 G2.
