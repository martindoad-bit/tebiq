---
asset_id: guardrail-gaikokujin-kakutei-shinkoku
title: 外国人の確定申告義務と年末調整（所得税の実務） — 在留資格問わず日本居住者は全世界所得の確定申告義務がある；年末調整は会社が行う給与所得の精算であり確定申告の代替ではない；副業・海外収入・帰国年の申告は自己申告が必要；住民税の申告は別制度
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 023"
---

## What This Document Is

This guardrail prevents errors about the income tax filing obligations of foreign nationals in Japan. Key errors to block:

1. **"会社が年末調整をしてくれたので，確定申告は不要。"** — partially correct but incomplete. 年末調整は給与所得のみを対象とした会社による税務精算手続きであり，副業収入・海外収入・不動産収入・株式譲渡益等がある場合は，確定申告が別途必要。また，年末調整を受けた場合でも，医療費控除・寄付金控除等の追加控除を受けるためには確定申告が必要。
2. **"外国人は確定申告する必要がない（在留期間が短いから）。"** — incorrect. 日本の所得税法上，居住者（日本に住所を有する者，または1年以上居所を有する者）は，在留資格の種別・在留期間の長短に関わらず，確定申告義務を負う。
3. **"海外の口座に振り込まれた収入は，日本で申告しなくていい。"** — incorrect for residents. 居住者は全世界所得（海外口座への振込を含む）が課税対象（G115・G90参照）。所得の支払い場所が日本外であることは，申告義務を免除しない。
4. **"住民税は会社が処理するので，外国人には関係ない。"** — incorrect as an absolute statement. 住民税は前年の所得に基づき，翌年1月1日時点の住所地の市区町村が課税する（G90参照）。会社員の場合，会社が特別徴収（給与天引き）で処理するが，退職・転職・副業収入があった場合は追加申告が必要になる場合がある。

## Trigger

Use this card when the user says:

- "外国人でも確定申告をする必要がありますか？"
- "会社が年末調整をしてくれましたが，確定申告も必要ですか？"
- "海外の銀行口座に入った収入も，日本で申告が必要ですか？"
- "副業収入がありますが，確定申告は必要ですか？"
- "帰国する年の税金はどうすればいいですか？"
- any pattern suggesting that foreigners or short-term residents are exempt from Japanese income tax filing.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| shotoku-zei-ho | L1 | 所得税法（居住者・非居住者の区分・課税範囲） | https://laws.e-gov.go.jp/law/340AC0000000033 | 2026-05-15 | 居住者=全世界所得課税; 非居住者=国内源泉所得のみ; 確定申告義務（第120条等）. |
| nta-kakutei | L4 | 国税庁「確定申告が必要な方」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/2020.htm | 2026-05-15 | 確定申告が必要な場合（給与2,000万円超・副業20万円超・複数の給与所得等）. |
| nta-nenmatsu | L4 | 国税庁「年末調整」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/gensen/2662.htm | 2026-05-15 | 年末調整=給与所得の精算（会社が行う）; 他の所得や追加控除は確定申告が必要. |
| nta-shuttaiji | L4 | 国税庁「出国する場合の所得税の申告（準確定申告）」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1942.htm | 2026-05-15 | 帰国（出国）時の準確定申告義務; 出国前・出国後の申告期限. |
| g90-cross | guardrail | guardrail-gaikokujin-zeimukokuchi (G90) | internal | 2026-05-15 | G90: 日本居住の外国人=全世界所得課税; 住民税の前年所得・1月1日ルール. |
| g115-cross | guardrail | guardrail-kokusai-zeimu-gaikokujin (G115) | internal | 2026-05-15 | G115: 居住者の全世界所得課税; 出国税; 国外財産調書. |

## Official Rule Or Source Fact

**確定申告義務の基本ルール（所得税法）:**

日本の居住者（住所または1年以上の居所）は，以下の場合に確定申告が必要:
1. 給与収入が2,000万円を超える場合
2. 給与以外の所得（副業・不動産・海外収入・株式配当・譲渡益等）が20万円を超える場合
3. 複数の会社から給与を受けている場合（主たる給与以外の給与所得がある場合）
4. 医療費控除・寄付金控除（ふるさと納税）・住宅ローン控除（初年度）等を受ける場合

→ 在留資格の種別・期間の長短は申告義務の有無に影響しない。

**年末調整の限界（確定申告で補完が必要な場合）:**

年末調整は「1社の給与所得のみ」を精算する会社の手続き。以下の場合は年末調整だけでは不十分:
- 副業収入（フリーランス・業務委託等）: 20万円超なら確定申告必要
- 海外口座への給与振込・海外子会社からの報酬等: 金額に応じて申告必要
- 不動産収入（日本または海外の賃貸収入）: 申告必要
- 株式の譲渡益・配当（特定口座の源泉徴収なし選択の場合等）: 申告必要
- 医療費控除（10万円超の医療費）・ふるさと納税（6団体以上はワンストップ制度不可）: 還付申告が必要

**帰国時の税務（準確定申告）:**

- 日本から帰国（出国）する外国人: 帰国前に「準確定申告」が必要（出国の前日までの所得を申告）
- 申告期限: 出国の日まで（または出国後60日以内に税務代理人（納税管理人）を選任して申告）
- 納税管理人の選任: 出国前に税務署に届け出ることが推奨（G115参照）
- 帰国後も日本の所得（不動産賃貸・利子・配当等）が続く場合: 非居住者として引き続き申告義務あり

**住民税（個人住民税）の仕組み（G90補完）:**

- 課税基準: 前年の所得（所得税の申告内容に基づく）
- 課税タイミング: 翌年6月から翌翌年5月の12か月間に分割支払い
- 課税する市区町村: 1月1日時点の住所地
- 会社員の場合: 会社が特別徴収（給与から天引き）
- 退職・帰国の場合: 残りの住民税を一括納付するか，翌年5月まで普通徴収で支払い
- 来日年の取扱い: 来日した年は通常，住民税の課税はない（1月1日時点で住民登録がないため）

**外国人特有の申告上の注意点:**

- **海外送金**: 日本居住者が海外の口座に受け取る収入も，全世界所得として申告対象
- **海外資産の開示**: 5,000万円を超える国外財産は国外財産調書の提出が必要（G115参照）
- **租税条約**: 特定の所得について，条約上の軽減税率の適用には届出が必要（自動適用ではない）
- **マイナンバー**: 確定申告書へのマイナンバー記載が必要（外国人も中長期在留者はマイナンバーが付番）

**申告・納付窓口・期限:**

- 確定申告期間: 毎年2月16日〜3月15日（還付申告は1月1日から可能）
- 申告窓口: 住所地管轄の税務署; e-Tax（オンライン申告）も利用可能
- 帰国年（準確定申告）: 出国日までに申告; 納税管理人を選任した場合は出国後60日以内

## Safe Answer Behavior

- When asked about whether foreigners need to file: confirm that all residents (regardless of visa type or period) must file if income from non-work sources exceeds 200,000 JPY or other filing triggers are met.
- When asked about 年末調整 vs 確定申告: explain that 年末調整 covers employment income only; any other income requires 確定申告.
- When asked about overseas income: confirm that all worldwide income of Japan residents is taxable and reportable; flag 国外財産調書 for high net worth.
- When asked about the year of departure: explain 準確定申告 obligation and the option of appointing a tax agent.
- All tax advice: route to a tax accountant (税理士) for individual planning; TEBIQ does not provide tax calculations.

## Must Say

- 日本に居住する外国人は，在留資格・在留期間に関わらず，年間所得が一定額を超える場合は確定申告義務を負う（全世界所得課税）。
- 年末調整は会社が行う給与所得の精算であり，副業収入・海外収入等がある場合は確定申告が別途必要。
- 帰国する年は，出国前に「準確定申告」が必要（または納税管理人を選任して出国後60日以内に申告）。

## Must Not Say

- 「外国人は確定申告をしなくていい。」（在留資格に関係なく申告義務あり）
- 「海外の口座に振り込まれた収入は日本で申告不要。」（居住者は全世界所得が課税対象）
- 「年末調整をしてもらったので，確定申告は完全に不要。」（副業・海外収入・追加控除は確定申告が必要）

## Deep Water Triggers

- 日本と本国の二重課税（租税条約の適用手続きと免除の受け方）
- 日本の会社から株式報酬（RSU・ストックオプション）を受けた外国人の課税時期・申告方法
- 外国籍のまま日本で起業（経営管理）する者の法人税と個人所得税の関係
- 日本の税務署がマイナンバーを通じて在留資格情報にアクセスできるかどうか
- 税務申告の不正確・未申告が発覚した場合の，在留資格審査（素行評価）への影響

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons uncertain whether they need to file: route to NTA's online 確定申告 decision tool (国税庁ウェブサイト); recommend consulting a 税理士 for individual assessment.
- For persons with overseas income: confirm filing obligation; route to 税理士 for worldwide income calculation and 租税条約 application.
- For persons planning to leave Japan: explain 準確定申告 obligation; route to 税理士 for exit tax assessment (G115) and 準確定申告 timing.
- For persons who missed past filings: route to 税理士 for 修正申告 options; note that 在留審査（素行）may be affected by non-compliance history (G71, G90 cross-ref).

## Unknown Fields

- The specific threshold below which the 国税庁 treats failure to report overseas income as negligible for enforcement purposes (unofficial threshold).
- Whether there is an official 国税庁 English-language procedure guide for foreign nationals filing final tax returns.

## Needs Domain Flags

- needs_domain (P1): For persons who have not filed 確定申告 for past years due to lack of awareness — is there an officially recommended procedure (修正申告 vs. voluntary disclosure) that minimizes penalties and resets the 在留審査 素行 record? What is the 国税庁's current practice on voluntary disclosures for unaware foreign residents?
- needs_domain (P1): For foreign nationals with 特定口座（源泉徴収あり）for Japanese securities — is there a confirmed official position that such persons are fully exempt from 確定申告 even with overseas income, or does overseas income always trigger a mandatory filing obligation regardless of 特定口座 status?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kakutei-001 | "外国人でも確定申告は必要ですか？" | State: 日本に居住する外国人（1年以上の在留）は，在留資格に関わらず，給与以外の収入（副業・海外収入等）が年間20万円を超える場合等に確定申告義務を負う。会社が年末調整をしてくれる場合でも，副業収入・海外収入があれば確定申告が必要。 |
| kakutei-002 | "海外の銀行口座に振り込まれた給料は，日本で確定申告しなくていいですか？" | State: 日本の居住者（住所または1年以上の居所を有する者）は全世界所得が課税対象。海外の口座に振り込まれた収入も，金額に応じて日本の確定申告で申告が必要。所得の支払い場所が日本外であることは申告義務を免除しない。税理士に相談することを推奨。 |
| kakutei-003 | "日本を離れて帰国します。最後の年の税金はどうすればいいですか？" | State: 日本から出国（帰国）する際，出国日までの所得について「準確定申告」が必要。出国前に申告するか，納税管理人（税務代理人）を選任して出国後60日以内に申告する。住民税の残額（翌年5月分まで）も一括納付か普通徴収での支払いが必要になる場合がある。税理士に早めに相談することを推奨。 |

## Source Notes

- 確定申告義務: 所得税法（居住者・全世界所得課税）; 国税庁「確定申告が必要な方」.
- 年末調整の範囲: 国税庁「年末調整」（給与所得のみの精算; 副業・海外収入は対象外）.
- 準確定申告: 国税庁「出国する場合の所得税の申告」（帰国前の申告義務; 納税管理人）.
- 住民税の仕組み: G90 cross-ref（前年所得・翌年課税・1月1日ルール）.
- 国際税務: G115 cross-ref（全世界所得課税; 出国税; 国外財産調書）.
- Cross-ref G90（住民税の仕組み），G115（国際税務），G71（公的義務と在留審査）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 023 G123. Key sources: 所得税法; 国税庁「確定申告が必要な方」; 国税庁「年末調整」; 国税庁「出国する場合の所得税の申告（準確定申告）」. Core facts: 在留資格問わず日本居住者=全世界所得確定申告義務; 年末調整=給与所得精算のみ（副業・海外収入は別途申告必要）; 帰国時=準確定申告が必要; 住民税=前年所得・翌年課税（G90）. needs_domain P1: 過去の未申告の自発的修正手続きの実務（修正申告 vs 自主申告）; 特定口座（源泉徴収あり）と海外収入の確定申告義務の相互作用. Cross-ref G71, G90, G115.
