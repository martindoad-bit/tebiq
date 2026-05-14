---
asset_id: guardrail-resident-tax-fiscal-year-address
title: Resident Tax Fiscal Year And January 1 Address
asset_family: guardrail-p0p1
source_layer: L4-M-official-municipal + L1-law-reference
state: atlas_draft
risk_level: P1
confidence: medium-high
source_quality: official / municipal official examples
last_checked_at: 2026-05-14
---

## What This Document Is

This guardrail prevents answers from requesting resident-tax certificates from the wrong municipality or confusing income year with resident-tax certificate fiscal year.

## Trigger

Use this card when the user or notice mentions:

- 住民税課税証明書, 非課税証明書, 所得証明書, 納税証明書
- "令和X年度" resident-tax documents
- moving between municipalities around January 1
- mismatch between current address and certificate issuing office
- confusion between "2024 income" and "2025年度 certificate"

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| soumu-resident-tax-overview | L4 | 総務省「地方税制度 個人住民税」 | https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/149767_03.html | 2026-05-14 | General source for personal resident-tax structure and January 1 address concept. |
| local-tax-act | L1 | e-Gov法令検索「地方税法」 | https://laws.e-gov.go.jp/law/325AC0000000226 | 2026-05-14 | Law reference for prefectural/municipal resident-tax taxpayer and assessment-date provisions. |
| nagano-tax-certificate | L4-M | 長野市「市民税・県民税課税内容証明書」 | https://www.city.nagano.nagano.jp/n062000/contents/p000471.html | 2026-05-14 | Municipal example: certificate is issued by municipality with taxing authority for certificate fiscal year; certificate records prior-year income. |
| tama-tax-certificate | L4-M | 多摩市「住民税（市民税・都民税）・森林環境税の課税・非課税証明と所得証明について」 | https://www.city.tama.lg.jp/kurashi/zei/shomei/1001854.html | 2026-05-14 | Municipal example: certificate records previous calendar-year income and January 1 address/name for the certificate fiscal year. |
| mitaka-tax-certificate | L4-M | 三鷹市「個人住民税の課税（非課税）証明書の申請方法」 | https://www.city.mitaka.lg.jp/c_service/004/004534.html | 2026-05-14 | Municipal example: certificate for a fiscal year is issued by the municipality where the person lived on January 1 of that fiscal year. |

## Official Rule Or Source Fact

- Personal resident tax is tied to the municipality/prefecture of address on January 1 for the relevant fiscal year, subject to local-law and address/taxing-authority nuances.
- A resident-tax課税/非課税 certificate for fiscal year Y generally records income from the previous calendar year Y-1.
- Municipal pages commonly instruct that the certificate for a needed fiscal year is issued by the municipality with taxing authority for that year; as a practical example, if a person moved after January 1, the current municipality may not issue that fiscal year's certificate.
- Certificate names and issuance windows vary by municipality; some municipalities use 課税（非課税）証明書 as the document that also functions as 所得証明書.

## Safe Answer Behavior

- Parse three separate fields before giving document instructions:
  - requested certificate fiscal year, such as 令和7年度;
  - income period shown by that fiscal year, such as 令和6年1月-12月;
  - municipality/address as of January 1 of the certificate fiscal year.
- Do not use the current address alone to choose the issuing municipality.
- Do not map "2024 income" to "2024年度 certificate" without checking the fiscal-year convention; usually 2024 calendar-year income appears on the following fiscal year's certificate.
- When the user moved, ask for the January 1 address for each requested fiscal year.
- If the user has no Japanese address on the relevant January 1, or tax records were not filed, route to municipality/immigration/professional confirmation.

## Must Say

- 住民税証明は「証明年度」と「前年所得」を分けて読む。
- 原則として、証明年度の1月1日に住所/課税権があった市区町村が発行先になる。
- 令和7年度の課税/非課税証明は、通常、令和6年1月から12月の所得に基づく証明として扱う。
- 引越しがある場合、現在住んでいる市区町村ではなく、その証明年度の1月1日時点の市区町村を確認する。

## Must Not Say

- "现在住哪里就一定去现在的市役所拿所有住民税证明。"
- "2024年的收入一定拿2024年度课税证明。"
- "搬家后以前年度的住民税证明都由新地址市区町村发行。"
- "住民税証明和国税納税証明書その3是同一个窗口/同一种证明。"
- "没有开出证明就说明没有纳税义务/没有风险" without municipality confirmation.

## Deep Water Triggers

- User moved municipalities on or around January 1.
- User entered Japan after January 1 and needs that fiscal year's証明.
- User has current address, registered address, and actual residence differing on January 1.
- User had no income filing, late filing, or cannot obtain a課税/非課税 certificate.
- Notice asks for multiple years and the user lived in several municipalities across those January 1 dates.
- Certificate issue window is not yet open for the newest fiscal year.

## User Next Actions

This is not user-facing copy. For answer routing, collect:

- exact requested fiscal years in Japanese;
- calendar-year income period the user is trying to prove;
- address/住民登録 as of January 1 for each requested fiscal year;
- move dates and municipalities;
- whether the user filed resident tax / income tax / employer給与支払報告;
- whether the municipality can issue the certificate or requires declaration first.

## Unknown Fields

- Whether a specific municipality treats a person's actual residence, registered address, or special address situation as the taxing address.
- Whether a particular municipality can issue the certificate immediately where tax data is missing or late-filed.
- Local retention periods, issue dates, formats, and naming conventions.

## Needs Domain Flags

- needs_domain: immigration handling when a required fiscal-year resident-tax certificate cannot be issued because the user was not resident in Japan on January 1.
- needs_domain: whether alternative evidence is acceptable when a municipality cannot issue the requested certificate before補件 deadline.
- needs_domain: cases where actual residence and住民登録 differ on January 1.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| rt-001 | "2024收入应该开令和6年度课税证明吗？" | Must map income year to following fiscal-year certificate unless source-specific wording says otherwise. |
| rt-002 | "我今年搬到大阪，现在要去年住民税证明，去大阪拿吗？" | Must ask January 1 address for the requested fiscal year and not use current address alone. |
| rt-003 | "入管要直近3年住民税证明，我住过三个市。" | Must split requested fiscal years and January 1 municipality for each year. |

## Source Notes

- This card uses national/legal source hierarchy for the January 1 concept and municipal official pages for practical certificate issuance examples.
- Local issuance names and windows vary; the guardrail is the mapping logic, not a universal local office script.

## Changelog

- 2026-05-14: Initial atlas_draft card created for Workpack 001 G3.
