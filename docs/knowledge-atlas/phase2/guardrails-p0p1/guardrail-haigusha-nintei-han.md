---
asset_id: guardrail-haigusha-nintei-han
title: 「日本人の配偶者等」の認定範囲と内縁・同性パートナーの扱い — 在留資格「日本人の配偶者等」は法律婚のみが対象；内縁・事実婚・同性パートナーシップは原則対象外；外国での同性婚は日本の在留資格認定根拠にならない；内縁パートナーは特定活動（内縁）で個別申請が必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 022"
---

## What This Document Is

This guardrail prevents errors about the scope of 在留資格「日本人の配偶者等」 and what types of relationships qualify for it. Key errors to block:

1. **"内縁関係（事実婚）でも，日本人の配偶者等ビザを申請できる。"** — incorrect. 在留資格「日本人の配偶者等」は，法律婚の配偶者を対象としている。内縁・事実婚のパートナーは「配偶者等」の「配偶者」ではなく，別途「特定活動（内縁関係にある者）」として申請が必要。
2. **"外国で同性婚をしているから，日本でも配偶者ビザを取れる。"** — incorrect under current Japanese law. 日本は同性婚を認めていない（2026年5月現在）。法の適用に関する通則法第24条は，婚姻の成立要件について各当事者の本国法を適用するとしており，外国での同性婚は日本の在留資格「配偶者等」の認定根拠とならないとする取扱いが一般的である。
3. **"同性パートナーシップ証明書（地方自治体発行）があれば，配偶者ビザを申請できる。"** — incorrect. 地方自治体のパートナーシップ制度（渋谷区等）は，国法上の婚姻と異なる行政上の取扱いであり，在留資格申請の根拠にはならない。
4. **"「永住者の配偶者等」ビザも，内縁・同性パートナーに適用される。"** — incorrect by the same logic. 「永住者の配偶者等」も法律婚の配偶者が対象であり，内縁・同性パートナーは対象外。

## Trigger

Use this card when the user says:

- "日本人のパートナーと一緒に暮らしたいけど，結婚はしていません。ビザはどうなりますか？"
- "外国で同性婚をしました。日本でも配偶者ビザを申請できますか？"
- "内縁関係（事実婚）でも配偶者ビザを取れますか？"
- "自治体のパートナーシップ証明書があれば，ビザの申請に使えますか？"
- "同性パートナーの就労ビザのために，配偶者ビザを取れますか？"
- any pattern suggesting that common-law, de facto, or same-sex partnerships qualify for 日本人の配偶者等 visa.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-ho-beppyo | L1 | 出入国管理及び難民認定法別表第二「日本人の配偶者等」 | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 「日本人の配偶者等」の活動定義: 「日本人の配偶者若しくは特別養子又は日本人の子として出生した者の行う日常的な活動」. |
| kokusai-shiho-konrei | L3 | 法の適用に関する通則法第24条（婚姻の成立） | https://laws.e-gov.go.jp/law/418AC0000000078 | 2026-05-15 | 婚姻の成立は各当事者の本国法によって判断。外国での同性婚が日本の準拠法上の「婚姻」に該当するかの判断根拠. |
| minkho-konin | L1 | 民法第739条（婚姻の届出） | https://laws.e-gov.go.jp/law/129AC0000000089 | 2026-05-15 | 婚姻は届出によって効力を生じる（日本法上の婚姻=法律婚のみ）. |
| tokutei-naien | L4 | 出入国在留管理庁「特定活動告示（内縁関係）」 | https://www.moj.go.jp/isa/applications/status/tokutei_katsudo.html | 2026-05-15 | 特定活動（内縁関係にある者）: 法律婚に準じた内縁関係のあるパートナーへの特定活動による在留許可の実務. |
| g76-kazoku-taizai | guardrail | guardrail-kazoku-taizai-shutoku-yoken (G76) | internal | 2026-05-15 | G76: 家族滞在=法律婚配偶者と実子・特別養子のみ対象; 内縁・事実婚は対象外. |
| g8-haigusha | guardrail | guardrail-spouse-divorce-death-remarriage (G8) | internal | 2026-05-15 | G8: 配偶者ビザ関連の離婚・死亡後の在留資格変更ルート; 法律婚の前提. |

## Official Rule Or Source Fact

**在留資格「日本人の配偶者等」の対象（入管法別表第二）:**

「日本人の配偶者若しくは特別養子又は日本人の子として出生した者の行う日常的な活動」

→ 対象は「配偶者」（法律婚）・「特別養子」・「日本人の子として出生した者」の3カテゴリ。

**「配偶者」の意味（法律婚のみ）:**

- 日本の在留資格制度における「配偶者」は，法律婚（婚姻届出済み）の配偶者を指す
- 内縁関係・事実婚・同性パートナーシップは，日本法上の「婚姻」ではなく，「配偶者」には該当しない

**外国での同性婚と日本の在留資格:**

- 法の適用に関する通則法第24条: 婚姻の成立は各当事者の本国法によって判断
- 日本では同性婚が認められていない（2026年5月現在）ため，両当事者の本国法（または一方が日本人の場合，日本法）を適用すると婚姻として成立しないと解される
- 外国で法的に成立した同性婚であっても，日本の在留資格「日本人の配偶者等」または「永住者の配偶者等」の根拠とはならない（現行の取扱い）

**地方自治体のパートナーシップ制度:**

- 渋谷区・世田谷区等の地方自治体が発行する「パートナーシップ証明書」は，行政上の配慮のための地方制度であり，国法上の婚姻・在留資格申請の根拠とはならない

**内縁関係にある者への対応（特定活動）:**

- 日本人または永住者・定住者等と内縁関係（事実婚）にある外国人は，「特定活動（内縁関係にある者）」として申請することが実務上認められているケースがある
- ただし，この特定活動は告示に基づく個別申請であり，「日本人の配偶者等」より審査が厳しく，法律婚に準じた実態の証明が必要
- 証明書類: 内縁関係を証明する書類（住民票（同居）・当事者の陳述書・知人の証明書等）が必要

**同性パートナーの就労・在留に関する現実的な選択肢（参考）:**

- 就労資格を独自に取得できる場合（技人国・経営管理等）: 就労資格で在留することが現実的
- 就労資格を持たない場合: 配偶者ビザによる在留が困難なため，他の在留資格（留学・文化活動等）か，または帰国を選択せざるを得ないケースが多い
- なお，日本でも同性婚の法的認知に向けた裁判・立法動向があり，今後の法改正に注意が必要

## Safe Answer Behavior

- When asked about de facto/common-law partnerships: confirm that 日本人の配偶者等 requires legal marriage; explain that 特定活動（内縁関係）is a separate route with stricter proof requirements.
- When asked about same-sex marriage from abroad: clearly state that current Japanese law does not recognize same-sex marriage for immigration purposes, regardless of the validity of the foreign marriage under foreign law; note the legal and social context sensitively.
- When asked about local partnership certificates: confirm they are not a basis for visa applications.
- When asked about practical alternatives: route to 就労資格 or other status options where applicable; for same-sex partners in legally complex situations, route to a lawyer for individual advice.

## Must Say

- 在留資格「日本人の配偶者等」は法律婚の配偶者のみを対象とする。内縁・事実婚・同性パートナーシップは「配偶者」として認定されない。
- 外国で成立した同性婚は，日本の在留資格申請において「配偶者」として認定されない（現行法の取扱い）。
- 内縁関係のパートナーには，別途「特定活動（内縁関係にある者）」としての申請ルートがある。

## Must Not Say

- 「内縁関係でも配偶者ビザを申請できる。」（法律婚のみが対象）
- 「外国で同性婚していれば，日本でも配偶者ビザを取れる。」（現行法上は認められていない）
- 「自治体のパートナーシップ証明書があれば在留資格申請に使える。」（国法上の根拠にならない）

## Deep Water Triggers

- 日本人と外国人の「婚姻届出」が市区町村に受理されたが，本国法上の婚姻が成立していない場合の在留資格の扱い
- 外国法が日本での同性婚を認めている場合，法の適用に関する通則法第24条の解釈上，日本での婚姻が「成立する」と解される余地があるか
- 内縁関係の特定活動保持者が出産した子の在留資格（親の法律上の婚姻関係がない場合）
- 同性パートナーの在留資格を日本人パートナーが経済的に支えるための「家族滞在」相当の在留資格が存在するか
- 日本の裁判所が外国の同性婚を日本法上の婚姻として承認した判決例の有無

## User Next Actions

This is not user-facing copy. For answer routing:

- For de facto/common-law couples: route to ISA or immigration lawyer for 特定活動（内縁関係）application; explain that evidence of cohabitation and joint life is key.
- For same-sex couples where one is Japanese: sensitively acknowledge the legal barrier; route to 就労資格 options if applicable, or lawyer for strategic immigration planning.
- For same-sex couples where both are foreign nationals: same routing as above; note that neither 日本人の配偶者等 nor 永住者の配偶者等 applies.
- For local partnership certificate holders: clarify that the certificate has administrative value but does not support visa applications.

## Unknown Fields

- Whether any ISA official guidance explicitly addresses the treatment of foreign same-sex marriages for visa purposes (the position described above is derived from the structural reading of Japanese law and general administrative practice, not from a confirmed official ISA statement).
- The specific ISA告示 number and exact conditions for 特定活動（内縁関係にある者）.
- Whether Japan's ongoing same-sex marriage legal developments (court rulings, legislative proposals) have resulted in any change in ISA practice as of 2026-05-15.

## Needs Domain Flags

- needs_domain (P1): What is the specific 法務大臣告示 number and the exact statutory conditions for 特定活動（内縁関係にある者）? What documentary evidence does ISA require in practice to substantiate a de facto partnership claim?
- needs_domain (P1): Has ISA issued any official guidance on the treatment of foreign same-sex marriages — either confirming the current non-recognition position or indicating any evolving practice — as of 2026?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| haigusha-nintei-001 | "日本人の彼氏と内縁関係です。配偶者ビザを申請できますか？" | State: 在留資格「日本人の配偶者等」は法律婚の配偶者のみを対象とする。内縁関係のパートナーは「配偶者」として認定されないが，「特定活動（内縁関係にある者）」として申請できる場合がある。この特定活動は個別申請であり，内縁関係の実態（同居・生計等）を証明する必要がある。詳細は行政書士・弁護士またはISAに相談することを推奨する。 |
| haigusha-nintei-002 | "外国で同性婚しました。日本でも配偶者ビザを申請できますか？" | State: 現行の日本の法律では，外国で成立した同性婚は在留資格「日本人の配偶者等」の認定根拠にならない（日本は同性婚を認めていない）。就労資格（技人国・経営管理等）を独自に申請できる場合はそちらのルートを検討することになる。個人の状況は複雑なため，弁護士・行政書士に相談することを強く推奨する。 |
| haigusha-nintei-003 | "渋谷区のパートナーシップ証明書を持っています。ビザ申請に使えますか？" | State: 地方自治体のパートナーシップ証明書は，国法上の婚姻の証明にはならないため，在留資格申請の根拠にはならない。在留資格「日本人の配偶者等」の申請には法律上の婚姻届（戸籍謄本等）が必要。 |

## Source Notes

- 在留資格「日本人の配偶者等」の定義: 入管法別表第二（「日本人の配偶者若しくは特別養子又は日本人の子として出生した者」）.
- 婚姻の成立準拠法: 法の適用に関する通則法第24条（各当事者の本国法による）.
- 日本法上の婚姻の要件: 民法第739条（届出婚主義）.
- 特定活動（内縁関係にある者）: ISA「特定活動」ページ（告示に基づく個別許可の実務）.
- Cross-ref G76（家族滞在の対象範囲=法律婚配偶者のみ），G8（配偶者ビザの離婚後ルート），G45（離婚後の在留実務）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 022 G117. Key sources: 入管法別表第二（「日本人の配偶者等」定義）; 法の適用に関する通則法第24条（婚姻の準拠法）; 民法第739条; ISA特定活動ページ. Core facts: 配偶者等=法律婚のみ; 内縁・同性パートナー=対象外; 外国同性婚=日本の在留資格根拠にならない; 内縁ルート=特定活動（内縁関係）. needs_domain P1: 特定活動（内縁関係）の告示番号・要件詳細; ISAの外国同性婚の取扱い方針. Cross-ref G76, G8, G45.
