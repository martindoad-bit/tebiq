---
asset_id: guardrail-gaikokujin-ginko-koza
title: 外国人の銀行口座開設と在留資格 — 口座開設は在留資格の種別ではなく「3か月超の在留」が主要件；在留カードが本人確認書類；短期滞在では開設困難；口座開設が在留を合法化するわけではない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 018"
---

## What This Document Is

This guardrail prevents errors about foreign nationals opening bank accounts in Japan and the relationship between bank accounts and immigration status. Key errors to block:

1. **"外国人は日本で銀行口座を開けない。"** — incorrect. 中長期在留者（在留期間3か月超）であれば，在留カードを本人確認書類として銀行口座を開設できる（各銀行の審査基準による）。ただし，すべての銀行がすべての在留資格・在留期間の外国人の口座開設を受け付けるわけではない。
2. **"短期滞在ビザ（観光ビザ）でも銀行口座を開設できる。"** — incorrect. 短期滞在（90日以下）の外国人は，在留期間が3か月以下のため，マネーロンダリング防止規制（犯罪収益移転防止法）上の要件を満たさず，口座開設が拒否されることが多い。一部の銀行は特定条件下で開設を認める場合があるが，原則として困難。
3. **"銀行口座を開設すれば，不法在留でも日本に居続けられる。"** — incorrect. 銀行口座の保有は在留資格とは無関係。不法在留中に口座を開設しても，在留を合法化するものではない。また，不法在留者が日本の銀行口座を利用することは，他の法的問題を生じさせる可能性がある。
4. **"マイナンバーがなければ銀行口座を開設できない。"** — partially incorrect. マイナンバー（個人番号）は，一定の条件（特定取引）で金融機関への告知義務が生じる場合があるが，口座開設自体の必須要件ではない（ただし各銀行の方針によって対応が異なる）。マイナンバーカードとマイナンバー（番号）は区別が必要。

## Trigger

Use this card when the user says:

- "外国人でも日本で銀行口座を開けますか？"
- "在留カードがあれば銀行口座を作れますか？"
- "短期滞在のビザで日本の銀行口座を開きたい。"
- "来日してすぐ銀行口座を開設するにはどうすればいいですか？"
- "マイナンバーがないと口座を作れませんか？"
- any pattern suggesting bank account ownership validates residence status, or treating short-term stay holders as eligible for standard bank accounts.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| fsa-hanzai-boshi | L4 | 金融庁「犯罪収益移転防止法に基づく取引時確認」 | https://www.fsa.go.jp/policy/aml/index.html | 2026-05-15 | 口座開設時の本人確認義務（在留カードによる確認); 短期滞在者の取扱い. |
| jba-koza | L4 | 全国銀行協会「外国人の方の口座開設について」 | https://www.zenginkyo.or.jp/article/tag-i/15302/ | 2026-05-15 | 中長期在留者（在留期間3か月超）が口座開設の主要件; 在留カードが本人確認書類; 各銀行による対応差異. |
| g61-crossref | guardrail | guardrail-zairyu-card-keitai-gimu (G61) | internal | 2026-05-15 | G61: 在留カードの常時携帯義務・提示義務; 在留カードが中長期在留者の法定証明書類. |

## Official Rule Or Source Fact

**外国人の銀行口座開設の主要件:**

全国銀行協会（JBA）のガイドラインによれば，外国人が日本の銀行口座を開設する際の主な要件:

| 要件 | 内容 |
|---|---|
| **在留期間** | 3か月超の在留（犯罪収益移転防止法の要件として，原則として在留期間が3か月を超えていることが確認できること）|
| **本人確認書類** | 在留カード（中長期在留者）; 特別永住者証明書（特別永住者）; パスポート（他の書類と組み合わせる場合あり）|
| **住所確認** | 日本国内の住所（住所を証明できる書類）|
| **各銀行の審査** | 各銀行が独自の基準で審査（在留資格の種別・雇用状況等を考慮する場合がある）|

**在留期間3か月以下の外国人（短期滞在等）の扱い:**

- 在留期間が3か月以下の外国人は，犯罪収益移転防止法の本人確認要件の観点から，多くの金融機関で口座開設を断られる
- 一部の金融機関（ゆうちょ銀行・一部ネット銀行等）が条件付きで対応する場合があるが，原則として困難
- 短期滞在（90日以内の観光・業務等）での口座開設は原則不可

**来日直後の口座開設（在留期間はあるが来日直後）:**

- 在留期間が3か月超でも，来日直後は住所登録が完了していないため，口座開設が困難な場合がある
- 市区町村での転入届（住民登録）完了後に申し込むのが実務上の順序
- 一部の銀行は来日後一定期間（1か月以内等）は口座開設を制限する場合がある（各行の方針による）

**マイナンバー（個人番号）と銀行口座:**

| 項目 | 内容 |
|---|---|
| マイナンバーの告知義務 | 一定の金融取引（配当・利子等の支払い，10万円超の外国送金等）では金融機関へのマイナンバー告知義務あり |
| 口座開設時のマイナンバー | 口座開設自体の法定必要要件ではないが，金融機関によりマイナンバーの提供を求める場合あり |
| マイナンバーカード vs マイナンバー | マイナンバーカード（顔写真付き身分証）とマイナンバー（番号）は区別が必要; 在留カードはマイナンバーカードとは別 |

**銀行口座と在留資格の関係（重要）:**

- 銀行口座の保有は，在留資格の有無・適法性とは**完全に独立した問題**
- 口座を保有していても在留資格が適法であることの証明にはならない
- 不法在留状態での口座開設・保有は，在留問題とは別に法的リスクが生じる可能性がある
- 在留資格の更新・変更への直接の影響はないが，公的義務（税・保険料）の履行は口座振替で行われることが多く，口座がないと履行に支障が出る場合がある（G90 cross-ref）

**在留資格別の銀行口座開設の実務状況:**

| 在留資格 | 口座開設の一般的な状況 |
|---|---|
| 技人国・特定技能・永住等（在留期間3か月超）| 原則として在留カードで口座開設可能（各銀行の審査あり）|
| 留学（在留期間3か月超） | 多くの銀行で開設可能（来日直後は制限する銀行あり）|
| 短期滞在（90日以下） | 原則として困難（一部の金融機関のみ対応）|
| 技能実習・育成就労 | 在留カードで対応可能な銀行あり（実習機関経由で手配されることも）|

## Safe Answer Behavior

- When asked if foreigners can open bank accounts: confirm they can if they have over 3 months of residence; specify 在留カード as the key ID document.
- When asked about short-term stay bank accounts: clearly state it is generally not possible; explain the 3-month rule; suggest alternatives (international bank accounts, pre-paid cards).
- When asked about the relationship between bank account and residence status: clarify they are completely separate; owning a bank account does not validate residence status.
- When asked about マイナンバー for bank accounts: distinguish マイナンバーカード (ID card) from マイナンバー (number); clarify that マイナンバー告知 obligation applies to certain transactions, not to opening the account itself.

## Must Say

- 中長期在留者（在留期間3か月超）は，在留カードを本人確認書類として銀行口座を開設できる（各銀行の審査基準による）。住所登録（住民登録）完了後に申し込むのが実務上の順序。
- 在留期間が3か月以下（短期滞在等）の外国人は，原則として日本の銀行口座の開設が困難（犯罪収益移転防止法上の要件）。
- 銀行口座の保有は在留資格・在留の適法性とは独立した問題。口座を持つことが在留を合法化するわけではない。

## Must Not Say

- 「外国人は日本で銀行口座を開けない。」（中長期在留者は在留カードで開設可能）
- 「短期滞在でも銀行口座を開設できる。」（原則として困難）
- 「銀行口座があれば在留が安定する。」（口座保有は在留資格と無関係）
- 「マイナンバーカードがなければ口座を作れない。」（マイナンバーカードと在留カードは別物; マイナンバー告知と口座開設要件は別問題）

## Deep Water Triggers

- 来日初日に銀行口座を開設しようとしたら断られた — なぜか？（住所登録未完了・銀行の来日直後制限）
- 技能実習生として来日したが，実習機関が銀行口座の開設を管理している — 問題があるか？
- 在留資格がない状態（不法在留）で日本の銀行口座を保有し続けることは許されるか？
- 海外送金（仕送り）のために日本の銀行口座からの送金が必要 — マイナンバーは必要か？
- ネット銀行（PayPay銀行・楽天銀行等）は外国人でも開設しやすいか？在留カードで手続きできるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about account opening procedures: route to the target bank's foreign national opening guide; confirm 在留カード + 住所証明が標準必要書類; advise住民登録を先に完了すること.
- For short-term stay holders: advise that standard bank account opening is generally not possible; suggest international bank card (Wise, Revolut等) or prepaid card alternatives; confirm this is a banking, not an immigration, restriction.
- For persons linking bank accounts to residence status: clarify the independence; route to appropriate ISA pages for actual status questions.
- For questions about マイナンバー and banking: confirm that 告知義務 applies to specific transaction types (外国送金10万円超等), not to basic account opening; route to 国税庁 マイナンバー FAQページ for details.

## Unknown Fields

- The specific list of banks in Japan that currently accept short-term stay (3 months or less) foreign nationals for bank account opening.
- Whether the post-company registration eLTRC-based application creates a 特例期間 that extends the "3-month" threshold recognized by banks for account eligibility.
- The exact conditions under which マイナンバー must be disclosed to a bank for international wire transfers — threshold amounts and transaction types.

## Needs Domain Flags

- needs_domain (P1): Does the 3-month residence threshold for bank account opening in Japan apply uniformly under the 犯罪収益移転防止法, or is it a banking industry guideline that individual banks may waive? The legal basis for the 3-month threshold as a hard rule vs. a soft practice needs confirmation.
- needs_domain (P1): For 技能実習 and 育成就労 workers: is there a regulatory framework that controls how receiving organizations manage workers' bank accounts? Reports of organizations retaining workers' passbooks/bank cards raise a labor rights concern that TEBIQ should route to professional.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ginko-001 | "外国人でも日本の銀行で口座を作れますか？在留カードはあります。" | State: 在留期間が3か月超の中長期在留者であれば，在留カードを本人確認書類として日本の銀行口座を開設できる（各銀行の審査基準による）。まず住民登録（市区町村への転入届）を完了させてから申し込むのが実務上の順序。 |
| ginko-002 | "短期滞在ビザで日本に来ています。銀行口座を開設したいのですが。" | State: 在留期間が3か月以下（短期滞在）の外国人は，犯罪収益移転防止法上の要件から，多くの日本の金融機関で口座開設を断られる。代替手段として国際的なプリペイドカード（Wise等）の利用を検討することを推奨する。日本に長期滞在する予定がある場合は，適切な在留資格を取得してから申し込むことを検討してほしい。 |
| ginko-003 | "銀行口座があれば，在留資格が切れても日本にいられますか？" | State: 銀行口座の保有は，在留資格の有無・適法性とは完全に無関係。口座を持つことは在留を合法化するものではない。在留期間が切れる前に，在留期間更新許可申請（または在留資格変更許可申請）を行うことが必要。在留資格に関する疑問は行政書士に相談すること。 |

## Source Notes

- 外国人の口座開設要件: 全国銀行協会「外国人の方の口座開設について」— 在留期間3か月超・在留カードが主要件; 各銀行によって審査基準が異なる.
- 犯罪収益移転防止法と本人確認: 金融庁「犯罪収益移転防止法」— 口座開設時の本人確認義務; 在留カード等の公的書類が確認書類として認められている.
- マイナンバーと金融機関: 国税庁「マイナンバー制度と金融機関」— 特定取引でのマイナンバー告知義務; 口座開設自体の必須要件ではない.
- 在留カードと身分証: G61 cross-ref（在留カードの法的位置づけ・常時携帯義務）.
- Cross-ref G61 (在留カード常時携帯義務), G90 (外国人の税務申告・公的義務), G84 (医療保険加入義務).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 018 G96. Key sources: 全国銀行協会「外国人の方の口座開設について」（在留期間3か月超・在留カードが主要件）; 金融庁「犯罪収益移転防止法」（本人確認義務）; G61 cross-ref. Core facts: 中長期在留者は在留カードで口座開設可; 短期滞在では原則困難（3か月ルール）; 口座保有は在留資格と無関係; マイナンバー告知義務は口座開設要件ではない. needs_domain P1: 3か月閾値の法的根拠（法定 vs 業界慣行）; 技能実習・育成就労の口座管理問題. Cross-ref G61, G90, G84.
