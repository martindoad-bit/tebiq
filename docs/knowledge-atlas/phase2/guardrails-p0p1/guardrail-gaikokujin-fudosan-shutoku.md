---
asset_id: guardrail-gaikokujin-fudosan-shutoku
title: 外国人の不動産取得と在留資格の関係 — 外国人も不動産取得は原則自由；ただし取得が在留資格・永住申請に有利に働くわけではない；住所登録・税務上の義務が連動する
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

This guardrail prevents errors about the relationship between real estate ownership by foreign nationals in Japan and their immigration status. Key errors to block:

1. **"外国人は日本で不動産を購入できない。"** — incorrect. 日本では，在留資格・国籍を問わず，外国人も原則として不動産（土地・建物）を取得できる。取得に特別な許可は不要（外国為替及び外国貿易法〔外為法〕上の届出義務が生じる場合はある）。
2. **"不動産を買えば，在留資格の更新・永住申請に有利になる。"** — incorrect/misleading. 不動産取得は在留資格の更新・永住申請の審査上，**直接的にプラス要素とはならない**。在留資格の審査は活動内容・収入・公的義務の履行が主軸であり，不動産所有はその一要素にすぎない（「生活基盤の安定」の間接的証拠になることはあるが，明示的な加点要素ではない）。
3. **"日本の不動産を取得しても，税金・住所登録は関係ない。"** — incorrect. 不動産を取得すると，固定資産税・不動産取得税の納付義務が生じる。また，住所登録（住民登録）と不動産所在地が異なる場合，税務上の住所をめぐる問題が生じる可能性がある。
4. **"日本に不動産を持っていれば，海外に長期滞在しても永住を維持できる。"** — incorrect. 永住者の在留資格は，長期出国（原則1年以上の出国）により消滅リスクがある（G82 cross-ref）。不動産所有は永住在留資格の維持要件ではない。

## Trigger

Use this card when the user says:

- "外国人でも日本でマンションや土地を買えますか？"
- "不動産を買えば永住申請に有利になりますか？"
- "日本に家を持っていれば，海外に長期滞在しても在留資格は維持できますか？"
- "外国人が日本の不動産を買うときに必要な手続きはありますか？"
- "不動産を買っても在留資格はもらえないのですか？"
- any pattern suggesting that real estate ownership confers immigration status benefits, or that ownership replaces actual residence requirements.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| mof-gaitame-fudosan | L4 | 財務省「外為法に基づく不動産取得の届出」 | https://www.mof.go.jp/policy/international_policy/gaitame_kawase/gaitame/fudosan.htm | 2026-05-15 | 外国人・外国法人による不動産取得に係る外為法上の届出義務（特定の条件下で事後届出が必要）. |
| moj-eijuu-yoken | L4 | 出入国在留管理庁「永住許可に関するガイドライン」 | https://www.moj.go.jp/isa/applications/procedures/16-4_00001.html | 2026-05-15 | 永住申請の審査要件（独立生計・公的義務・素行善良等）; 不動産所有は明示的要件ではない. |
| g82-crossref | guardrail | guardrail-choki-shukoku-zairyu-card (G82) | internal | 2026-05-15 | G82: 長期出国（1年以上）による在留資格消滅リスク; 永住者も例外ではない. |
| g90-crossref | guardrail | guardrail-gaikokujin-zeimukokuchi (G90) | internal | 2026-05-15 | G90: 外国人居住者の全世界所得課税; 住民税の1月1日ルール; 税務申告義務と在留審査の連動. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の審査要件（独立生計・公的義務・在留期間）; 不動産所有は補助証拠にすぎない. |

## Official Rule Or Source Fact

**外国人による不動産取得の自由:**

日本では，在留資格・国籍を問わず，外国人（個人・法人）も不動産（土地・建物）を取得できる。特別な許可制度は設けられていない。

**外為法に基づく届出義務（特定の場合）:**

| 条件 | 内容 |
|---|---|
| 外国人・外国法人による土地取得 | 外為法第26条に基づき，一定の条件下で財務大臣への**事後届出**（取得後2週間以内）が必要 |
| 届出が必要なケース | 非居住者（日本に住所・居所を有しない者）が不動産を取得する場合等（詳細は財務省届出ガイド参照）|
| 届出が不要なケース | 日本に居住する外国人（中長期在留者・特別永住者等）が居住用に取得する場合は届出不要が多い |

※ 外為法上の届出義務は在留資格の問題ではなく，外国為替規制上の問題。

**不動産取得と在留資格審査の関係:**

不動産取得は，在留資格の更新・変更・永住申請において**直接的な加点要素ではない**:

| 審査項目 | 不動産所有との関係 |
|---|---|
| 独立生計の証明（永住申請） | 安定した収入・資産の一部として間接的に評価される可能性はあるが，明示的要件ではない |
| 在留資格の活動内容 | 不動産所有は活動内容（就労・学習等）に直接関係しない |
| 素行・公的義務の履行 | 固定資産税の適正納付は公的義務の一部として評価される可能性がある（G90 cross-ref）|

**不動産取得に伴う税務・行政上の義務:**

| 義務 | 内容 |
|---|---|
| 不動産取得税 | 取得時に都道府県に納付（原則: 固定資産税評価額×3%）|
| 固定資産税・都市計画税 | 毎年，不動産所在地の市区町村に納付（1月1日現在の所有者に課税）|
| 確定申告（賃貸収入がある場合）| 不動産所得が生じる場合は確定申告が必要（G90 cross-ref）|

**長期出国と不動産所有（G82 cross-ref）:**

- 永住者が1年以上出国すると，在留資格の消滅リスクがある（G82参照）
- 不動産を所有していることは，この消滅リスクを防ぐ法的根拠にならない
- 「日本に不動産があるから日本に生活基盤がある」という主張は，在留資格の消滅基準とは別問題

**住所登録と不動産所在地の関係:**

- 中長期在留者は，実際の居住地（住所）を住民登録する義務がある
- 不動産所在地（投資用物件等）と住民登録住所が異なる場合，住民税の課税市区町村が異なる
- 住所登録を怠ると，在留資格の更新審査で不利評価の可能性（G90 cross-ref）

## Safe Answer Behavior

- When asked if foreigners can buy real estate in Japan: confirm they can, with no special immigration requirement; note the 外為法 reporting obligation in specific cases.
- When asked about immigration benefits from real estate: clarify there are NO direct immigration benefits; real estate ownership does not improve visa status or PR application.
- When asked about long-term absence and real estate: route to G82; clearly state that real estate ownership does NOT prevent 在留資格 lapse due to long-term absence.
- When asked about tax obligations: briefly note 不動産取得税, 固定資産税, and rental income 確定申告; route to G90 and tax professional.

## Must Say

- 外国人も原則として日本の不動産（土地・建物）を自由に取得できる。在留資格の種類・国籍による制限はない（外為法上の届出義務が生じる場合はある）。
- 不動産取得は，在留資格の更新・永住申請の審査において**直接的な加点要素ではない**。在留資格の審査は活動内容・収入・公的義務の履行が主軸である。
- 不動産を所有していても，永住者が長期出国（原則1年以上）すると在留資格が消滅するリスクがある（G82参照）。不動産所有はこのリスクを防がない。
- 不動産取得後は，固定資産税・不動産取得税の納付義務が生じる。賃貸収入がある場合は確定申告が必要（G90参照）。

## Must Not Say

- 「外国人は日本の不動産を購入できない。」（在留資格・国籍に関わらず原則取得自由）
- 「不動産を買えば永住申請に有利になる。」（直接的な加点要素ではない）
- 「日本に家があれば，長期海外滞在しても在留資格は大丈夫。」（長期出国による在留資格消滅リスクは不動産所有で防げない; G82参照）
- 「不動産を買っても税金は関係ない。」（固定資産税・不動産取得税の義務あり）

## Deep Water Triggers

- 非居住者（海外在住）が日本の投資用不動産を購入する — 外為法届出義務・税務上の取り扱いは？
- 永住者として日本に不動産を持ちながら，海外に2年在住した — 在留資格はどうなるか？（G82 cross-ref）
- 在留資格「投資・経営」（現在は「経営・管理」）のために不動産を取得した — 在留資格との関係は？
- 日本の不動産を売却した際の譲渡所得は，外国人でも日本で課税されるか？
- 不動産投資で賃貸収入を得ている外国人 — どの在留資格が必要か，または「経営・管理」への変更が必要か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about buying real estate: confirm the general freedom to purchase; route to real estate professional and 司法書士 for transaction-specific questions.
- For persons linking real estate to PR/visa: clarify there is no direct benefit; route to G60 for PR requirements.
- For permanent residents going abroad with real estate in Japan: urgently route to G82 for long-term absence risk; route to lawyer if absence > 6 months.
- For tax questions related to real estate (rental income, capital gains): route to G90 and 税理士.

## Unknown Fields

- The specific conditions under which the 外為法 reporting requirement applies to Japanese-resident foreign nationals acquiring real estate (as opposed to non-residents).
- Whether real estate ownership (specifically as evidence of stable livelihood) has been used to support 在留特別許可 decisions in practice.
- The tax treatment of capital gains from real estate sales for non-resident foreign nationals (withholding tax obligations for the buyer, etc.).

## Needs Domain Flags

- needs_domain (P1): Under what specific conditions does the 外為法 post-acquisition reporting obligation apply to foreign nationals who are already residing in Japan (中長期在留者 vs 非居住者)? The financial ministry page was accessed but the exact residency-based threshold for reporting was not fully confirmed.
- needs_domain (P1): Can rental income from Japanese real estate, if owned by a foreign national on a non-business visa (e.g., 技人国), constitute a violation of 在留資格's activity restrictions? The boundary between passive investment income and "business activity" requiring 経営・管理 is not clearly confirmed from accessed official sources.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| fudosan-001 | "外国人でも日本でマンションを購入できますか？" | State: 在留資格・国籍に関わらず，原則として外国人も日本の不動産を購入できる。特別な許可は不要。ただし，非居住者の場合は外為法上の届出義務が生じる場合がある。購入に際しては司法書士・不動産会社に相談を。 |
| fudosan-002 | "日本で家を買えば，永住申請に有利になりますか？" | State: 不動産取得は，永住申請の審査において直接的な加点要素ではない。永住申請の要件（在留期間・独立生計・公的義務の履行・素行）は活動内容と収入・義務履行が主軸であり，不動産所有がこれらの要件を充足するわけではない。永住申請の具体的要件は行政書士に相談を。 |
| fudosan-003 | "日本に家を持っていれば，1年以上海外に住んでいても永住ビザは大丈夫ですか？" | State: 不動産所有は，永住在留資格の維持要件ではない。永住者が原則1年以上出国した場合，在留資格が消滅するリスクがある（G82参照）。日本に不動産があっても，長期出国による在留資格消滅を防ぐことはできない。長期出国が必要な場合は，事前に弁護士・行政書士に相談すること。 |

## Source Notes

- 外国人の不動産取得の自由: 日本では外国人土地法（1925年）の適用が極めて限定的であり，実務上は外国人も自由に不動産を取得できる（外国人土地法は実質的に機能していない）.
- 外為法届出義務: 財務省「外為法に基づく不動産取得の届出」— 非居住者の取得には事後届出義務（取得後2週間以内）が生じる場合がある.
- 永住申請と不動産所有: ISA永住許可ガイドライン（16-4_00001.html）— 不動産所有は明示的要件ではない; 独立生計・公的義務・素行が主要件（G60 cross-ref）.
- 長期出国と在留資格消滅: G82 cross-ref（1年以上出国=永住者も消滅リスク）.
- 税務義務: G90 cross-ref（外国人居住者の税務申告義務; 住民税; 全世界所得課税）.
- Cross-ref G60 (永住申請要件), G82 (長期出国リスク), G90 (税務申告義務), G71 (在留更新の素行評価).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 017 G95. Key sources: 財務省外為法届出ページ（非居住者の不動産取得届出義務）; ISA永住許可ガイドライン（不動産所有は明示的永住要件ではない）; G60/G82/G90 cross-refs. Core facts: 外国人も原則自由に不動産取得可; 在留資格への直接的加点なし; 永住者も長期出国で在留資格消滅リスク（不動産所有では防げない）; 固定資産税・不動産取得税の義務. needs_domain P1: 居住外国人の外為法届出条件; 賃貸収入と在留資格（経営・管理）の境界. Cross-ref G60, G82, G90, G71.
