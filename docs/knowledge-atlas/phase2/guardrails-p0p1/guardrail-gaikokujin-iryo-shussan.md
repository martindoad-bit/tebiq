---
asset_id: guardrail-gaikokujin-iryo-shussan
title: 外国人の医療・出産と在留資格 — 日本で出産した外国人の子は出生後60日以内に在留資格取得申請が必要；出産・入院中でも在留期間は進行する；緊急医療は在留資格問わず提供される；医療費の未払いは在留審査の「素行」に影響しうる
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 021"
---

## What This Document Is

This guardrail prevents errors about medical care and childbirth for foreign nationals in Japan, and the immigration-related implications. Key errors to block:

1. **"日本で出産した外国人の赤ちゃんは，自動的に日本国籍を取得する。"** — incorrect. 日本の国籍法は血統主義（父または母が日本国籍を持つ場合）を採用しており，日本で生まれた外国人の子は原則として日本国籍を取得しない。外国人の子は，出生後60日以内に在留資格取得申請をする必要がある（G100 cross-ref）。
2. **"入院・療養中は在留期間が停止するので，在留期間を過ぎても問題ない。"** — incorrect. 在留期間は，入院・療養中・出産中であっても進行し，停止しない。在留期間満了前に更新申請を行うか，または特例期間（G1 cross-ref）を理解した上で対応する必要がある。
3. **"緊急の医療を受けるには，在留資格が必要。"** — incorrect. 救急医療（緊急の生命の安全に関わる医療）は，在留資格の有無・不法在留状態に関わらず提供される（医療機関の義務）。ただし，医療費の支払い義務は別途発生する。
4. **"国民健康保険（NHI）に加入していれば，出産費用は全額カバーされる。"** — incorrect. 国民健康保険からの出産費用の給付（出産育児一時金）はあるが，自己負担分や高額療養費の適用外費用が発生することがある。出産費用は医療機関・出産方法によって大きく異なる。

## Trigger

Use this card when the user says:

- "日本で出産しました。子どもはどのような手続きが必要ですか？"
- "妊娠中に在留期間が満了しそうです。どうすればいいですか？"
- "入院中に在留期間が切れてしまいました。"
- "緊急で病院に行く必要があります。在留資格がなくても受診できますか？"
- "NHIに加入していますが，出産費用はどのくらいかかりますか？"
- any pattern suggesting Japan grants citizenship by birth, or that medical/pregnancy situations suspend visa period counting.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-shussan-zairyu | L4 | 出入国在留管理庁「出産に関する在留資格の手続き」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00026.html | 2026-05-15 | 外国人の子の出生後60日以内の在留資格取得申請義務; 出生の在留資格の種類. |
| kosho-ichijikin | L4 | 厚生労働省「出産育児一時金」 | https://www.mhlw.go.jp/content/12401000/001069834.pdf | 2026-05-15 | 出産育児一時金の給付額（50万円）; NHI・健康保険からの給付; 適用条件. |
| g100-crossref | guardrail | guardrail-zairyu-shikaku-toriatsukai-hennko (G100) | internal | 2026-05-15 | G100: 外国籍の子が日本で出生した場合=出生後60日以内に在留資格取得申請が必要; 身分変化は在留資格の自動変更をもたらさない. |
| g84-crossref | guardrail | guardrail-iryo-hoken-gaikokujin (G84) | internal | 2026-05-15 | G84: 中長期在留者のNHI・健康保険の強制加入義務; 医療費の保険適用範囲. |
| g1-crossref | guardrail | guardrail-special-period-two-month-boundary (G1) | internal | 2026-05-15 | G1: 在留期間満了後の特例期間（更新・変更申請中は2か月または処分まで継続）. |

## Official Rule Or Source Fact

**日本で生まれた外国人の子の国籍:**

日本の国籍法（国籍法第2条）は血統主義を採用:
- 父または母が日本国籍を持つ場合→日本国籍を取得
- 父も母も外国籍の場合→日本国籍を取得しない（出生地主義は採用していない）
- 例外: 父も母も不明・無国籍の場合（国籍法第2条第3号）

→ 外国人夫婦の子が日本で生まれた場合，日本国籍は取得せず，**外国籍の子として在留資格取得申請が必要**。

**外国人の子の在留資格取得申請（出生後60日以内）（G100 cross-ref）:**

| 手続き | 内容 |
|---|---|
| **申請期限** | 出生から60日以内（G100参照）|
| **申請先** | 住所地管轄の入国管理局（ISA）|
| **在留資格の種別** | 一般的には親と同じ在留資格（家族滞在等）または「定住者」|
| **必要書類** | 出生証明書・親の在留カード・住民票等 |

⚠️ 60日以内に申請しない場合，不法在留状態になるリスクがある。

**在留期間と医療・出産中の特例:**

日本の入管法上，**医療・入院・出産中に在留期間は停止しない**。在留期間は暦日通りに進行する。

在留期間満了前の対応:
- 出産・入院前に在留期間が満了しそうな場合→事前に更新申請を行う（満了の3か月前から申請可）（G50 cross-ref）
- 入院中・出産中で申請が困難な場合→代理人（申請取次者/行政書士）による申請も可能（G39 cross-ref）
- 特例期間（G1 cross-ref）: 満了前に更新申請を提出していれば，処分まで在留可

⚠️ 入院中であっても，在留期間満了後に更新申請をしていない場合は不法在留となる（特例期間は適用されない）。

**緊急医療と在留資格:**

- 救急医療（救急搬送を含む）は，在留資格の有無・合法的在留状態かどうかに関わらず，医療機関は緊急処置を行う義務がある（医師法・医療法上の応召義務）
- 不法在留者であっても，緊急の生命の安全に関わる医療は提供される
- ただし，医療費の支払い義務は発生する（保険未加入の場合は全額自己負担）

**出産育児一時金（NHI・健康保険）:**

NHIまたは健康保険に加入している外国人（G84 cross-ref）:
- **出産育児一時金**: 子一人につき50万円（2023年4月以降）が支給される
- 直接支払い制度: 医療機関が保険から直接受け取る方式（出産費用との差額のみ自己負担）
- 条件: 妊娠12週（85日）以上での出産（流産・死産含む）

⚠️ NHIまたは健康保険に未加入の場合，出産育児一時金は受け取れない。

**医療費の未払いと在留資格への影響:**

医療費の長期未払いは，在留資格審査の「素行」評価において間接的に影響する可能性がある（公的義務の履行状況の評価に準じて考慮される場合がある）。ただし，入院中の医療費の分割払い等の誠実な対応は評価される（needs_domain P1）。

## Safe Answer Behavior

- When asked about citizenship for Japan-born children: clearly state that Japan uses 血統主義 (jus sanguinis); foreign-nationality parents' children do not acquire Japanese citizenship by birth; route to G100 for the 60-day application requirement.
- When asked about visa period during hospitalization: clearly state that in-patient status does NOT pause the visa period; advise proactive renewal before the period expires.
- When asked about emergency medical care: confirm it is available regardless of immigration status; note the payment obligation.
- When asked about 出産育児一時金: confirm the ¥500,000 benefit for NHI/health insurance enrollees; note the enrollment requirement.

## Must Say

- 日本で生まれた外国人の子は，日本国籍を自動取得しない（日本の国籍法は血統主義）。出生後60日以内に在留資格取得申請が必要（G100参照）。
- 入院・出産中でも在留期間は進行し，停止しない。在留期間満了前に在留期間更新許可申請を行う必要がある（代理人による申請も可能）。在留期間満了後に申請していない状態は不法在留となる。
- 緊急医療（救急搬送を含む）は，在留資格の有無・合法的在留状態かどうかに関わらず，医療機関は応召義務に基づいて提供する。ただし，医療費の支払い義務は別途発生する。

## Must Not Say

- 「日本で生まれたので，外国人でも子どもは日本国籍を取得する。」（血統主義；外国人の子は日本国籍を自動取得しない）
- 「入院中は在留期間が止まるので，満了しても問題ない。」（在留期間は停止しない）
- 「緊急の場合でも，在留資格がないと病院に行けない。」（救急医療は在留資格問わず提供される）

## Deep Water Triggers

- 在留期間満了後（不法在留状態）に出産した外国人の子 — 子の在留資格取得申請はどうなるか？また，母親の不法在留状態の解消方法は？
- 未熟児・長期入院が必要な子どもの高額医療費 — 外国人の子が医療費助成（子ども医療費）の対象になるか？
- 母体保護法上の中絶（人工妊娠中絶）を外国人が受ける場合，在留資格上の問題はあるか？
- 不法在留状態の外国人が出産した場合，病院から入管に通報されるか？（医療機関の守秘義務との関係）
- 妊娠中の外国人が在留期間満了前に帰国を求められた場合，在留期間の特例や人道的配慮はあるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who have delivered a baby and need status for the child: route to G100 (60-day application requirement); route to 行政書士 for application preparation.
- For persons whose visa is expiring during pregnancy/hospitalization: route to G50 (renewal timing) and G39 (申請取次 via 行政書士); emphasize urgency.
- For persons with emergency medical needs: confirm access; note payment obligation; route to medical social worker for payment counseling if needed.
- For persons enrolled in NHI asking about 出産費用: confirm 出産育児一時金 (¥500,000); explain direct payment system; route to insurance office for application.

## Unknown Fields

- Whether long-term unpaid medical bills (especially for complications, extended NICU stays) specifically affect immigration renewal or PR applications as a "素行" factor.
- Whether foreign children born to undocumented parents can access 子ども医療費助成 (municipal child medical fee assistance) programs.

## Needs Domain Flags

- needs_domain (P1): Can medical fee debt (長期未払い医療費) be characterized as a 公的義務 or 素行 factor in immigration renewal/PR applications? Is there official ISA guidance connecting medical fee payment to immigration evaluation?
- needs_domain (P1): For a foreign national in irregular immigration status (不法在留) who gives birth in Japan — what is the official ISA position on whether the birth event (and the 60-day application window for the child) provides any basis for the mother to regularize her own status?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| iryo-001 | "日本で赤ちゃんが生まれました。夫婦とも外国人です。子どもは日本国籍になりますか？" | State: 日本の国籍法は血統主義を採用しており，父も母も外国国籍の場合，日本で生まれた子は日本国籍を取得しない。子どもは外国籍のままであり，出生後60日以内に在留資格取得申請（住所地管轄のISA）が必要。申請しない場合，子どもが不法在留状態になるリスクがある。行政書士または市区町村の外国人相談窓口に相談することを推奨。 |
| iryo-002 | "妊娠中で来月在留期間が切れますが，入院中で役所に行けません。どうすればいいですか？" | State: 在留期間は入院・出産中でも進行し，停止しない。在留期間満了前に更新申請が必要。入院中で窓口に行けない場合，弁護士・行政書士等の申請取次者が代わりに申請することが可能。在留期間満了前に行政書士等に相談して，早急に更新申請の準備を進めることを強く推奨する（満了後の申請は不法在留となるリスクがある）。 |
| iryo-003 | "在留カードがありません。急病で病院に行く必要があります。受診できますか？" | State: 救急医療（緊急の生命の安全に関わる医療）は，在留資格の有無・合法的在留状態かどうかに関わらず，医療機関は応召義務に基づいて提供する。在留カードがなくても，緊急の場合はまず救急車を呼ぶか，病院の救急外来に行くこと。ただし，医療費の支払い義務は発生する（NHI未加入の場合は全額自己負担）。 |

## Source Notes

- 外国人の子の出生後在留資格取得申請: ISA「出産に関する在留資格の手続き」(nyuukokukanri10_00026.html) — 出生後60日以内の申請義務; G100 cross-ref.
- 出産育児一時金: 厚生労働省「出産育児一時金」— 50万円（2023年4月以降）; NHI・健康保険加入者が対象; 直接支払い制度.
- 日本の国籍法（血統主義）: 国籍法第2条（e-Gov法令）— 父または母が日本国籍; 出生地主義は不採用.
- 医療機関の応召義務: 医師法第19条（救急患者への診療拒否の禁止）.
- 在留期間更新の申請タイミング: G50 cross-ref（満了の3か月前から申請可）; G1 cross-ref（特例期間の適用条件）.
- 医療保険の外国人適用: G84 cross-ref（中長期在留者のNHI・健康保険強制加入義務）.
- Cross-ref G1 (特例期間), G39 (申請取次), G50 (更新申請タイミング), G84 (医療保険), G100 (外国籍の子の在留資格取得申請).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 021 G114. Key sources: ISA「出産に関する在留資格の手続き」（子の出生後60日以内申請義務）; 厚生労働省「出産育児一時金」（50万円; NHI/健保加入者）; 国籍法第2条（血統主義; 外国人の子は日本国籍取得せず）; 医師法第19条（応召義務）. Core facts: 外国人の子が日本で生まれても日本国籍を取得しない（血統主義）; 出生後60日以内に在留資格取得申請が必要（G100）; 在留期間は入院・出産中でも停止しない; 緊急医療は在留資格問わず提供（応召義務）; 出産育児一時金=50万円（NHI/健保加入者のみ）. needs_domain P1: 医療費長期未払いと在留審査への影響; 不法在留状態での出産と母親の在留資格の扱い. Cross-ref G1, G39, G50, G84, G100.
