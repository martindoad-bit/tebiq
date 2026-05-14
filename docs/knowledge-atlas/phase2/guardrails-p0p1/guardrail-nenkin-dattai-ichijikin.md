---
asset_id: guardrail-nenkin-dattai-ichijikin
title: 外国人の年金・脱退一時金 — 厚生年金は6か月以上加入で帰国後2年以内に脱退一時金請求可；社会保障協定があれば二重加入免除；10年加入で老齢年金受給権
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 017"
---

## What This Document Is

This guardrail prevents errors about pension rights for foreign nationals in Japan, specifically the lump-sum withdrawal (脱退一時金) and the conditions for receiving a Japanese old-age pension (老齢年金). Key errors to block:

1. **"外国人は日本の年金に入っても，帰国したら年金はもらえない。"** — partially incorrect. 日本に10年以上の年金加入期間がある場合は，帰国後も老齢年金を受給できる可能性がある。10年未満の場合は脱退一時金（帰国後2年以内に請求）として受け取ることができる。
2. **"脱退一時金は日本にいる間に申請できる。"** — incorrect. 脱退一時金の申請は，**日本を出国後**に行う（日本在住中は申請不可）。日本に住所を持っている間は申請できない。
3. **"社会保障協定があれば，日本の年金に入らなくていい。"** — partially correct. 社会保障協定のある国（米国・英国・ドイツ・韓国等）からの派遣社員等は，日本の厚生年金・国民年金への加入が免除される場合がある（本国の年金制度に加入している場合）。ただし，協定の適用を受けるには手続きが必要。
4. **"年金の免除申請をしていれば，年金を納める必要がない。"** — incorrect（misunderstanding）. 国民年金保険料の免除（G42 cross-ref）は，支払いが困難な場合の法定制度。免除を受けても受給資格期間に一部算入される。免除を申請しないまま未納は，義務不履行として在留審査で不利に評価される（G71・G60 cross-ref）。

## Trigger

Use this card when the user says:

- "帰国するとき，年金は返してもらえますか？"
- "脱退一時金とはどういうものですか？"
- "日本の年金は10年以上払わないともらえないと聞きました。"
- "アメリカから来ている社員ですが，日本の年金に入らなくていいですか？"
- "国民年金の免除申請をしていれば年金を払わなくていいですか？"
- any pattern treating pension withdrawal as automatic, or misunderstanding the 10-year threshold for old-age pension eligibility.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nenkin-dattai | L4 | 日本年金機構「脱退一時金」 | https://www.nenkin.go.jp/service/jukyu/taishokukyufu/dattai/20150406.html | 2026-05-15 | 脱退一時金の受給要件（6か月以上加入; 外国籍; 帰国後2年以内; 日本居住中は申請不可）; 計算式. |
| nenkin-jukyu | L4 | 日本年金機構「老齢年金の受給資格」 | https://www.nenkin.go.jp/service/jukyu/roureinenkin/jukyu-yoken/20150401-01.html | 2026-05-15 | 受給資格期間10年（合算対象期間含む）; 外国人にも同様に適用. |
| nenkin-kyotei | L4 | 日本年金機構「社会保障協定」 | https://www.nenkin.go.jp/int/treaty/index.html | 2026-05-15 | 社会保障協定国一覧; 適用対象（派遣期間5年以内等）; 適用手続き（相手国機関に申請）. |
| g42-crossref | guardrail | guardrail-kokumin-nenkin-menjo-zairyu (G42) | internal | 2026-05-15 | G42: 国民年金保険料の免除は法定手続き（公的義務の適正な履行として評価）; 免除申請なし未納は義務不履行. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の公的義務要件（年金の適正納付が含まれる）. |

## Official Rule Or Source Fact

**脱退一時金（Lump-sum Withdrawal Payment）:**

| 要件 | 内容 |
|---|---|
| **国籍** | 日本国籍を持たない外国人 |
| **年金加入期間** | 厚生年金保険・国民年金に通算6か月以上加入 |
| **申請時期** | **日本を出国後**から2年以内（日本に住所があるうちは申請不可）|
| **申請方法** | 日本年金機構への申請（郵送または帰国前にまとめて手続きの準備）|
| **支給額** | 加入月数・平均標準報酬月額等に基づいて計算（全額ではない）|

**脱退一時金の受給と将来の年金受給権:**

- 脱退一時金を受け取った場合，その期間の年金受給権は消滅する
- 将来再び日本に在留して年金に加入する場合は，受け取った脱退一時金の期間は通算されない
- 社会保障協定がある国の場合，日本と相手国の加入期間を合算して老齢年金を受給できる可能性がある

**老齢年金受給資格（10年要件）:**

外国人にも同じく，**受給資格期間（合算対象期間等を含む）10年以上**で老齢年金の受給資格が生じる。

- 日本居住後帰国しても，65歳以降に老齢年金を請求可能（外国の銀行口座への送金も可能）
- 社会保障協定のある国では，日本と相手国の年金加入期間を合算して10年要件を満たせる場合がある
- 受給額は加入期間・保険料に基づいて計算

**社会保障協定（二重加入免除）:**

日本は以下の国（代表例）と社会保障協定を締結:

| 協定国（代表例）| 主な効果 |
|---|---|
| アメリカ・イギリス・ドイツ・フランス・韓国等 | 一方の国の年金制度に加入している場合，相手国での二重加入を免除 |
| 適用対象 | 相手国から派遣された者（通常5年以内の派遣）|
| 手続き | 相手国の年金機関に申請し，「適用証明書」の取得が必要 |

- 適用を受けるには必ず手続きが必要（自動適用ではない）
- 協定の詳細は国ごとに異なる（日本年金機構のサイトで確認）

**国民年金免除との関係（G42 cross-ref）:**

- 収入が少なく保険料の支払いが困難な場合は，市区町村に保険料の**免除申請**ができる（法定制度）
- 免除を受けた期間も受給資格期間に一部算入される
- 免除申請なしの未納は義務不履行として在留審査で不利評価（G42・G60・G71 cross-ref）

**在留審査との関係（G60・G71・G42 cross-ref）:**

- 永住申請: 直近2年の年金の適正な納付（または免除申請）が要件（G60参照）
- 更新・変更: 「素行」評価として年金未納が考慮される可能性（G71参照）

## Safe Answer Behavior

- When asked about getting money back from pension: explain the lump-sum withdrawal system; clarify it must be applied for AFTER leaving Japan (not while residing in Japan); note the 2-year deadline.
- When asked about social security agreements: confirm they exist for specific countries; route to Japan Pension Service for details; confirm the application procedure is required.
- When asked about pension for long-term residents: explain the 10-year rule for old-age pension; note that foreign nationals can also receive Japanese old-age pension.
- When asked about NHI/pension non-payment: route to G42 for 免除 option; clearly state that non-payment without 免除 application is a compliance failure.

## Must Say

- 厚生年金・国民年金に6か月以上加入した外国人は，帰国後2年以内に脱退一時金を申請できる。申請は日本を出国した後（住所がある間は申請不可）。脱退一時金を受け取ると，その期間の年金受給権は消滅する。
- 10年以上の年金加入期間（合算対象期間含む）がある場合は，帰国後も老齢年金の受給資格が生じる。外国の銀行口座への送金も可能。
- 社会保障協定（米国・英国・ドイツ・韓国等）がある国からの派遣社員は，所定の手続き（適用証明書の取得）により日本の年金への二重加入が免除される場合がある。

## Must Not Say

- 「外国人は帰国したら年金は全額返ってくる。」（脱退一時金は全額ではない; 期間・金額に基づく計算）
- 「脱退一時金は日本にいる間に申請できる。」（出国後のみ申請可能）
- 「10年以下の加入なら年金は何もない。」（10年未満でも脱退一時金は受け取れる）
- 「社会保障協定があれば自動的に適用される。」（手続きが必要）

## Deep Water Triggers

- 日本に15年在留して帰国した — 脱退一時金と老齢年金のどちらが有利か？
- 社会保障協定のある国（ドイツ）から来た派遣社員で，帰任が5年を超えた — 協定の適用はどうなるか？
- 国民年金の未納期間が5年ある — 永住申請に影響するか？（G60 cross-ref）
- 脱退一時金を受け取った後，再び日本に在留することになった — 過去の加入期間は通算されるか？
- 日米社会保障協定の適用証明書を取得せずに日本で就労した1年間 — この期間の保険料は払い戻し可能か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about 脱退一時金: route to Japan Pension Service 脱退一時金 page; emphasize must apply AFTER departure; note 2-year deadline.
- For persons with 10+ years: explain the old-age pension option; route to Japan Pension Service for 老齢年金 information; route to professional if complex.
- For social security agreement questions: route to Japan Pension Service 社会保障協定 page for the specific country; route to employer's HR/professional for 適用証明書 procedure.
- For persons with unpaid contributions: route to G42 for 免除申請 guidance; note the PR impact (G60); route to municipality for 免除申請.

## Unknown Fields

- The complete current list of countries with which Japan has active social security agreements and the specific exemption conditions for each.
- Whether the 脱退一時金 calculation formula has changed in recent years and the current applicable formula for 厚生年金 vs 国民年金.
- Whether 脱退一時金 is subject to Japanese withholding tax, and how it is treated in the recipient's home country for tax purposes.

## Needs Domain Flags

- needs_domain (P1): For persons who took 脱退一時金 and then returned to Japan on a new visa and re-enrolled in the pension system — can the prior contribution period (before the lump-sum was taken) be restored by repaying the lump-sum amount? The restoration (追納) mechanism for 脱退一時金 is not confirmed from accessed official text.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| nenkin-001 | "帰国するとき，年金をまとめて受け取れますか？" | State: 厚生年金・国民年金に6か月以上加入した外国人は，帰国後2年以内に脱退一時金を申請できる。ただし，申請は日本を出国した後（日本在住中は申請不可）。脱退一時金を受け取ると，その期間の年金受給権は消滅する。日本年金機構のウェブサイトで詳細を確認のこと。 |
| nenkin-002 | "日本に10年以上住んでいますが，帰国後も日本の年金をもらえますか？" | State: 年金加入期間（合算対象期間を含む）が10年以上あれば，老齢年金の受給資格が生じる。65歳以降に日本年金機構に請求することで，帰国後も外国の銀行口座に送金を受けることができる。詳細は日本年金機構（nenkin.go.jp）に問い合わせを。 |
| nenkin-003 | "アメリカ本社から日本に赴任しています。日本の年金に入らなくてもいいですか？" | State: 日本とアメリカは社会保障協定を締結しており，米国の年金制度に加入している場合，所定の手続き（適用証明書の取得）により日本の年金への二重加入が免除される場合がある。ただし，自動適用ではないため，雇用主のHR部門または社会保険労務士に手続きを確認すること。 |

## Source Notes

- 脱退一時金の要件・手続き: 日本年金機構「脱退一時金」(nenkin.go.jp/service/jukyu/taishokukyufu/dattai/20150406.html) — 6か月以上加入; 帰国後2年以内; 出国後申請.
- 老齢年金受給資格（10年要件）: 日本年金機構「老齢年金の受給資格」— 外国人にも同様に適用.
- 社会保障協定: 日本年金機構「社会保障協定」(nenkin.go.jp/int/treaty/index.html) — 協定国一覧; 二重加入免除; 手続き（適用証明書が必要）.
- 年金免除と在留審査: G42 cross-ref（免除は適正履行); G60 cross-ref（永住申請の公的義務要件）; G71 cross-ref（更新審査での素行評価）.
- Cross-ref G42 (国民年金保険料の免除制度), G60 (永住申請の公的義務), G71 (更新審査での素行評価), G90 (税務申告義務と在留審査).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 017 G92. Key sources: 日本年金機構「脱退一時金」（出国後申請・6か月・2年以内）; 日本年金機構「老齢年金受給資格」（10年要件）; 日本年金機構「社会保障協定」（手続き必要）; G42/G60/G71 cross-refs. Core facts: 脱退一時金=出国後申請・6か月以上加入・2年以内; 老齢年金=10年以上で受給資格; 社会保障協定=手続き必要（自動適用なし）; 未納=在留審査に影響. needs_domain P1: 脱退一時金受領後の再加入・期間復活の可否. Cross-ref G42, G60, G71, G90.
