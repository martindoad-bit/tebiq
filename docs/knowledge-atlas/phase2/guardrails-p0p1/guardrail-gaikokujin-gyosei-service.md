---
asset_id: guardrail-gaikokujin-gyosei-service
title: 外国人住民の行政サービスと在留資格 — 中長期在留者は国民健康保険・教育・福祉等の行政サービスに在留資格の種別に関わらず原則アクセス可；不法在留者は緊急医療等の限定サービスのみ；特定技能・技能実習生には追加支援義務あり
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 019"
---

## What This Document Is

This guardrail prevents errors about which public administrative services are available to foreign residents in Japan based on their immigration status. Key errors to block:

1. **"永住者でなければ，市区町村の行政サービスを利用できない。"** — incorrect. 中長期在留者（在留期間3か月超）は，在留資格の種別に関わらず，住民登録を行った市区町村の各種行政サービス（国民健康保険・住民票・印鑑登録・公営住宅・生活保護申請等）に原則としてアクセスできる。
2. **"外国人の子どもは，公立学校に通えない。"** — incorrect. 外国人の子どもも，義務教育年齢（6〜15歳）であれば，公立小・中学校に就学する権利がある（入学手続きは市区町村の教育委員会が担当）。就学義務は日本国籍者と同様に実質的に適用される。
3. **"技人国・留学等の在留資格では，生活保護は受けられない。"** — partially correct but nuanced. 日本の生活保護法（生活保護法第1条）は，日本国民を対象とする。外国人には法律上の受給権はないが，行政実務上，永住者・定住者・日本人の配偶者等については，生活保護に準じた生活困窮者支援が行われている自治体もある。就労系の在留資格（技人国・特定技能等）を持つ外国人は一般的に対象外。
4. **"不法在留者は，いかなる行政サービスも受けられない。"** — partially incorrect. 不法在留者であっても，緊急医療（救急対応）は在留資格に関わらず提供される（医療機関の義務）。また，不法在留状態の外国人の子どもの就学問題は，個別に対応される場合がある。

## Trigger

Use this card when the user says:

- "外国人でも国民健康保険に入れますか？"
- "子どもを日本の公立学校に通わせられますか？"
- "在留資格があれば，市区町村の行政サービスを利用できますか？"
- "特定技能1号の外国人にはどのような支援がありますか？"
- "不法在留でも病院にかかれますか？"
- any pattern suggesting that administrative services are limited to permanent residents, or that foreign children cannot access Japanese public education.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| soumu-gaikokujin-service | L4 | 総務省「外国人住民の行政サービスへのアクセス」 | https://www.soumu.go.jp/main_sosiki/jichi_zeisei/c-zeisei/gaikokujin.html | 2026-05-15 | 中長期在留者の住民登録・行政サービスアクセス; 外国人住民の権利. |
| mext-gaikokujin-kyoiku | L4 | 文部科学省「外国人の子どもの就学」 | https://www.mext.go.jp/a_menu/shotou/clarinet/003.htm | 2026-05-15 | 外国人の子どもの就学権; 市区町村教育委員会の受入義務; 義務教育年齢の外国人への対応. |
| g84-crossref | guardrail | guardrail-iryo-hoken-gaikokujin (G84) | internal | 2026-05-15 | G84: NHI強制加入義務（中長期在留者）; 医療保険制度の全体像. |
| g70-crossref | guardrail | guardrail-tokutei-gino-shien-keikaku (G70) | internal | 2026-05-15 | G70: 特定技能1号の雇用主による10項目支援義務; 生活支援を含む. |

## Official Rule Or Source Fact

**外国人住民の行政サービスへのアクセス（在留資格別）:**

| 在留資格の状態 | 主な行政サービスのアクセス |
|---|---|
| **中長期在留者**（在留期間3か月超; 適法在留）| 住民登録・国民健康保険・国民年金（強制加入）・公立学校就学・印鑑登録・公営住宅申請等 |
| **特別永住者・永住者** | 中長期在留者と同様 + 一部自治体での生活保護準用（行政通達上）|
| **定住者・日本人の配偶者等** | 中長期在留者と同様 + 生活保護準用対象（行政通達上）|
| **就労系・留学系資格**（技人国・特定技能・留学等）| 中長期在留者としての行政サービスにアクセス可; 生活保護は対象外 |
| **短期滞在** | 住民登録なし; NHI加入義務なし; 緊急医療以外の行政サービスは限定的 |
| **不法在留** | 緊急医療; 外国人の子どもの就学（個別対応）; 一般的な行政サービスへのアクセスは制限される |

**外国人の子どもの就学権:**

- 義務教育年齢（6〜15歳）の外国人の子どもは，公立小・中学校に就学する権利がある
- 在留資格の種別は，就学権に直接影響しない（在留が適法であれば，在留資格の種別問わず就学可能）
- 市区町村の教育委員会に就学の申し込みをすれば，受け入れる義務がある
- 日本語指導が必要な外国人児童生徒向けの支援体制（日本語指導教室等）も整備されている
- 不法在留状態の子どもについても，就学の問題は個別に対応されることがある（子どもの権利条約の観点から）

**医療保険（NHI; G84 cross-ref）:**

中長期在留者（在留期間3か月超）は，雇用による健康保険に加入していない限り，国民健康保険（NHI）に強制加入義務がある（G84参照）。保険料の支払いにより，日本人と同様の医療サービスにアクセスできる。

**生活保護の外国人への適用:**

日本の生活保護法は，日本国民を対象としている（外国人への適用は法律上ない）。ただし:
- 厚生省通達（1954年）により，永住者・定住者・日本人の配偶者等・永住者の配偶者等・難民認定者については，**準用**として生活保護に相当する支援が行われることがある
- 就労系の在留資格（技人国・特定技能・留学等）では，一般的に生活保護準用の対象外
- 緊急医療・一時的な困窮支援については，個別の自治体の判断による場合がある

**特定技能1号外国人への雇用主支援義務（G70 cross-ref）:**

「特定技能1号」外国人を雇用する事業主（または登録支援機関）には，10項目の支援計画を実施する義務があり，生活支援が含まれる（G70参照）:
- 住居の確保・家庭用品の準備支援
- 銀行口座開設支援
- 行政手続き（住民登録・社会保険加入等）への同行・支援
- 日本語学習機会の確保
- 相談体制の整備

**外国人相談窓口（多言語対応）:**

多くの市区町村は，外国人住民向けの相談窓口（外国人総合相談センター・多文化共生センター等）を設けており，多言語で行政サービスの案内を行っている。

## Safe Answer Behavior

- When asked about administrative services for foreign residents: confirm that 中長期在留者 can access municipal services regardless of specific status type; explain the NHI enrollment obligation.
- When asked about school enrollment: confirm that foreign children have the right to attend public school; route to 教育委員会 for enrollment procedure.
- When asked about 生活保護 for foreigners: clearly state that 生活保護法 applies to Japanese nationals; explain the 準用 system for permanent residents and certain status types; clarify that employment-based status holders are generally not eligible.
- When asked about emergency medical care for undocumented persons: confirm emergency care is provided regardless of status.

## Must Say

- 中長期在留者（在留期間3か月超）は，在留資格の種別に関わらず，住民登録・国民健康保険・公立学校就学等の市区町村の行政サービスに原則アクセスできる。
- 義務教育年齢（6〜15歳）の外国人の子どもは，在留資格の種別にかかわらず，公立小・中学校に就学する権利がある。市区町村の教育委員会に申し込みで受け入れ義務がある。
- 日本の生活保護法は日本国民を対象とする（外国人への法的受給権はない）。ただし，永住者・定住者・日本人配偶者等については，行政通達上の準用により支援が行われる場合がある（就労系在留資格は一般的に対象外）。

## Must Not Say

- 「永住者でなければ，市区町村の行政サービスを利用できない。」（中長期在留者は在留資格問わずアクセス可）
- 「外国人の子どもは公立学校に通えない。」（義務教育年齢の子どもは就学権あり）
- 「不法在留でも全ての行政サービスが受けられる。」（不法在留者は緊急医療等の限定サービスのみ）

## Deep Water Triggers

- 在留資格がなくなった外国人の子どもが，学校に通い続けられるか？（子どもの権利条約; 個別対応; 弁護士・学校当局に相談）
- 生活保護の準用対象（定住者）だが，就労能力があると判定されたら支援を打ち切られた — 異議申立は可能か？
- 特定技能1号外国人が，雇用主から支援（住居確保・行政手続き）を受けていない — どこに相談すればよいか？
- 技能実習生が実習先から逃げ出した後，医療保険証がない — 病院にかかれるか？
- 難民申請中の外国人は，行政サービス（医療・教育等）にアクセスできるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about administrative services: route to the local 市区町村 (municipal office) or 外国人総合相談センター for specific service procedures.
- For school enrollment: route to 教育委員会 at the municipal level; note that multilingual support is available in many municipalities.
- For persons in need of social support: route to municipality for 生活困窮者自立支援 and other safety-net programs; recommend 法テラス (Legal Aid Japan) for complex cases.
- For 特定技能 holders not receiving required support: route to ISA or OTIT (外国人技能実習機構) for reporting; route to lawyer for serious violations.

## Unknown Fields

- The specific list of municipalities with 外国人総合相談センター and multi-language consultation services available.
- Whether 生活保護準用 for eligible foreign residents (永住者 etc.) requires a formal application process or is automatically assessed.
- The practical procedure for a school board to enroll a child whose family is in an irregular immigration situation.

## Needs Domain Flags

- needs_domain (P1): What is the official scope of 生活保護準用 for eligible foreign nationals in Japan? Is the 1954 厚生省通達 still the operative legal basis, or has this been updated? The extent and conditions of the 準用 are not confirmed from recent official text.
- needs_domain (P1): For foreign children in irregular immigration situations (親が不法在留) — what is the official 文部科学省 or 市区町村教育委員会 position on school enrollment? Is it a right, a discretionary acceptance, or contingent on the immigration situation?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| service-001 | "技人国のビザを持っていますが，市区町村の行政サービスは使えますか？" | State: 中長期在留者（在留期間3か月超）は，在留資格の種別（技人国も含む）に関わらず，住民登録・国民健康保険・公立学校就学等の市区町村の行政サービスに原則アクセスできる。住民登録（転入届）を住所地の市区町村役場に行うことで，各種サービスが利用できるようになる。 |
| service-002 | "外国籍ですが，子どもを日本の公立小学校に通わせたいです。できますか？" | State: 義務教育年齢（6〜15歳）の外国人の子どもは，在留資格の種別にかかわらず，公立小・中学校に就学する権利がある。住所地の市区町村教育委員会に申し込みをすることで受け入れてもらえる（受入義務がある）。日本語指導が必要な場合は，日本語指導教室等のサポートも利用できる場合がある。 |
| service-003 | "特定技能で働いていますが，雇用主が住居を見つけてくれません。どうすればいいですか？" | State: 特定技能1号外国人を雇用する事業主（または登録支援機関）には，住居の確保支援を含む10項目の支援計画を実施する義務がある。雇用主がこの義務を履行していない場合，ISAまたは登録支援機関（RSO）に相談できる。深刻な場合は弁護士・法テラスに相談することを推奨する。 |

## Source Notes

- 外国人住民の行政サービスアクセス: 総務省「外国人住民の行政サービスへのアクセス」— 中長期在留者の住民登録・サービス利用権.
- 外国人の子どもの就学権: 文部科学省「外国人の子どもの就学」— 義務教育年齢の外国人の就学権; 市区町村教育委員会の受入義務.
- NHI強制加入義務: G84 cross-ref（中長期在留者の医療保険加入義務）.
- 特定技能1号の支援義務: G70 cross-ref（雇用主の10項目支援計画実施義務）.
- 生活保護の外国人への適用: 厚生省通達（1954年）— 永住者・定住者等への準用（法律上の権利ではない）.
- Cross-ref G84 (医療保険), G70 (特定技能支援義務), G94 (難民認定申請中の在留), G97 (特別永住者).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 019 G104. Key sources: 総務省「外国人住民の行政サービスへのアクセス」（中長期在留者のサービス利用権）; 文部科学省「外国人の子どもの就学」（就学権・教委受入義務）; G84/G70 cross-refs. Core facts: 中長期在留者は在留資格問わず行政サービスにアクセス可; 外国人の子どもも就学権あり（義務教育年齢）; 生活保護法は日本国民対象（外国人への準用は特定の在留資格のみ）; 特定技能1号は雇用主の10項目支援義務あり. needs_domain P1: 生活保護準用の現在の法的根拠（1954年通達以降の更新）; 不法在留の子どもの就学権. Cross-ref G84, G70, G94, G97.
