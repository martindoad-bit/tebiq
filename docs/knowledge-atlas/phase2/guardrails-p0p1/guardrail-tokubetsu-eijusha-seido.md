---
asset_id: guardrail-tokubetsu-eijusha-seido
title: 特別永住者制度 — 特別永住者は旧植民地出身者・その子孫に与えられる特別な在留資格；一般永住者とは法的根拠・更新不要・退去強制要件が異なる；二世以降は出生後60日以内の申請が必要
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

This guardrail prevents errors about Japan's Special Permanent Residency (特別永住者) system and how it differs from general permanent residency (一般永住者). Key errors to block:

1. **"特別永住者と一般永住者は同じ。"** — incorrect. 特別永住者と一般永住者は，法的根拠・対象者・在留カード更新要件・退去強制要件・取消事由が異なる完全に別個の制度。
2. **"特別永住者は永遠に在留資格を更新しなくてよい。"** — partially incorrect. 特別永住者証明書は有効期限があり，定期的な更新（証明書の更新申請）が必要。ただし，在留期間そのものは（一般永住者と同様に）無期限。
3. **"在日韓国人・朝鮮人・中国人はすべて特別永住者になれる。"** — incorrect. 特別永住者の対象は，旧植民地出身者（主に戦前から日本に居住していた朝鮮・台湾・中国出身者）とその子孫に限定される。出身国・民族であれば自動的に資格を得るわけではない。
4. **"特別永住者の子（日本生まれ）は自動的に特別永住者になる。"** — incorrect. 特別永住者の子として日本で出生した者は，出生後60日以内に法務大臣に申請することで特別永住許可を受ける必要がある。申請しないと特別永住者にはならない。

## Trigger

Use this card when the user says:

- "特別永住者とは何ですか？"
- "在日韓国人は特別永住者になれますか？"
- "特別永住者と一般永住者の違いは何ですか？"
- "特別永住者の子どもが生まれました。何か手続きが必要ですか？"
- "特別永住者は在留カードを持たなくていいのですか？"
- any pattern conflating 特別永住者 with 一般永住者, or treating 特別永住者 as a self-executing status for ethnic Japanese Koreans/Chinese/Taiwanese without application.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tokubetsu-eijusha | L4 | 出入国在留管理庁「特別永住者」 | https://www.moj.go.jp/isa/applications/procedures/tokubetsu_eijusha_index.html | 2026-05-15 | 特別永住者の定義・対象・申請手続き・特別永住者証明書の更新; 子の申請期限（出生後60日以内）. |
| isa-tokubetsu-card | L4 | 出入国在留管理庁「特別永住者証明書」 | https://www.moj.go.jp/isa/applications/procedures/tokubetsu_eijusha_card.html | 2026-05-15 | 特別永住者証明書の有効期限（16歳以上=7年; 16歳未満=誕生日）; 更新申請手続き. |
| g22-crossref | guardrail | guardrail-zairyu-card-expiry-vs-status-period (G22) | internal | 2026-05-15 | G22: 在留カード（一般永住者）の有効期限と在留資格の無期限性の区別; 特別永住者証明書との対比に使用. |
| g53-crossref | guardrail | guardrail-eijusha-card-kosin-soko (G53) | internal | 2026-05-15 | G53: 一般永住者の在留カード更新要件（7年; 16歳未満は16歳誕生日）; 特別永住者証明書との類似点・相違点. |

## Official Rule Or Source Fact

**特別永住者制度の法的根拠:**

特別永住者制度は，「日本国との平和条約に基づき日本の国籍を離脱した者等の出入国管理に関する特例法」（入管特例法）に基づく制度。一般の「出入国管理及び難民認定法」（入管法）とは別の法律で規律される。

**特別永住者の対象者:**

| 対象 | 内容 |
|---|---|
| **原初取得者** | 平和条約発効（1952年4月28日）時点で日本に居住していた朝鮮（韓国・朝鮮民主主義人民共和国）・台湾出身者（旧植民地出身者）; これらの者は旧協定に基づき，または入管特例法施行時に特別永住者として認定された |
| **子・子孫** | 特別永住者の子として日本で出生した者（出生後60日以内の申請が必要）; 以後の世代も同様 |
| **国籍** | 国籍（韓国・中国・朝鮮・その他）を問わない（ただし，対象は歴史的経緯に基づく）|

**特別永住者 vs 一般永住者の主な違い:**

| 比較項目 | 特別永住者 | 一般永住者 |
|---|---|---|
| **法的根拠** | 入管特例法 | 入管法 |
| **在留期間** | 無期限（証明書の更新は必要）| 無期限 |
| **証明書類** | 特別永住者証明書（在留カードとは別様式）| 在留カード |
| **証明書有効期限** | 16歳以上=7年; 16歳未満=16歳誕生日 | 16歳以上=7年; 16歳未満=16歳誕生日 |
| **退去強制事由** | 内乱・外患・政府暴力転覆・内乱扇動等（きわめて重大な犯罪のみ; 通常犯罪での退去強制は一般外国人より厳格に制限）| 入管法第24条の要件（重大犯罪等）|
| **再入国許可** | 原則5年（出国前に申請不要; 出国時に空港等で確認）| 5年以内（みなし再入国=1年）|
| **活動制限** | なし（就労・活動内容を問わない）| なし（就労・活動内容を問わない）|
| **取得方法** | 歴史的経緯に基づく（申請制）| ISAに申請（在留期間・素行・生計等の要件を充足）|

**子の申請（出生後60日以内）:**

特別永住者の子として日本で出生した子については:
- 出生後**60日以内**に法務大臣に申請することで，特別永住許可が与えられる
- 申請窓口: 市区町村役場（住所地の市区町村が申請を受理し，法務大臣に送付）
- 期限（60日）を過ぎた場合: 特別永住者にはならず，出生時の親権者の国籍等に応じた在留資格の申請が必要になる可能性がある

**特別永住者証明書の更新:**

- 有効期限が近づいたら，住所地の市区町村役場で更新申請
- 有効期限内に更新しないと，証明書の効力が失われる（在留資格そのものが消滅するわけではないが，証明書なしでは在留・出入国に支障）

**一般永住者とならない:**

在日韓国人・朝鮮人・台湾人・中国人であっても，特別永住者の対象（旧植民地出身者またはその子孫）でない者は，一般の永住許可申請（入管法上の要件を充足）が必要。

## Safe Answer Behavior

- When asked what 特別永住者 is: explain the historical basis (旧植民地出身者・その子孫); distinguish from 一般永住者; note the different legal framework.
- When asked about eligibility: clarify it is not based on ethnicity/nationality alone, but on historical circumstances; warn that not all Koreans/Chinese/Taiwanese qualify.
- When asked about children: immediately flag the 60-day application deadline; route to 市区町村役場 for procedure.
- When asked about renewal: clarify that the 特別永住者証明書 has a validity period (7 years for adults) and must be renewed, even though the status itself is indefinite.

## Must Say

- 特別永住者制度は，旧植民地出身者（戦前から日本に居住していた朝鮮・台湾出身者）とその子孫を対象とした，入管法とは別の特例法に基づく制度。一般永住者と法的根拠・退去強制要件が異なる。
- 特別永住者の子として日本で出生した子は，出生後60日以内に市区町村役場で特別永住許可の申請が必要。申請しなければ特別永住者にはならない。
- 特別永住者証明書には有効期限があり（16歳以上=7年），期限前に住所地の市区町村役場で更新申請が必要。

## Must Not Say

- 「特別永住者と一般永住者は同じ制度。」（法的根拠・退去強制要件が異なる）
- 「在日韓国人・朝鮮人はすべて特別永住者になれる。」（対象は旧植民地出身者・その子孫に限定）
- 「特別永住者の子どもは自動的に特別永住者になる。」（出生後60日以内の申請が必要）
- 「特別永住者は在留資格の更新が一切不要。」（証明書の更新申請は必要）

## Deep Water Triggers

- 特別永住者の孫（3世）が日本で生まれた — 特別永住者の申請はできるか？（yes; 60日以内申請）
- 特別永住者が外国籍を取得した（帰化等） — 特別永住者の地位はどうなるか？
- 特別永住者の出生後60日の申請期限を過ぎた — どうすればよいか？
- 特別永住者が長期間日本に不在の場合（数年間海外居住）— 在留資格はどうなるか？
- 特別永住者と日本人の子が生まれた — 日本国籍を取得するか，特別永住者として申請するか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about 特別永住者 eligibility: confirm the 旧植民地出身者 lineage requirement; route to 市区町村役場 or lawyer for individual eligibility assessment.
- For persons with newborns (特別永住者の子): urgently flag the 60-day deadline; route to 市区町村役場 immediately.
- For persons asking about 証明書 renewal: route to 市区町村役場 (NOT ISA — 特別永住者証明書 is handled at the municipal level).
- For complex lineage questions (2世・3世以降): route to lawyer or 行政書士 for individual case assessment.

## Unknown Fields

- The exact procedure when the 60-day birth application deadline is missed — whether there is any alternative procedure to acquire 特別永住者 status retroactively.
- Whether 特別永住者 status can be granted to persons who were previously recognized as 特別永住者 but then acquired foreign citizenship and renounced that citizenship to return to Japan.
- The specific heavy-crime threshold for the more restrictive deportation grounds that apply to 特別永住者 compared to general foreign nationals.

## Needs Domain Flags

- needs_domain (P1): What is the practical procedure when the 60-day birth application deadline has been missed for a 特別永住者の子? Is there an administrative remedy or does the child need to apply for standard 在留資格?
- needs_domain (P1): Are there any circumstances where a 特別永住者 who has continuously lived in Japan could lose their status without explicit deportation proceedings — e.g., through long-term overseas absence?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tokubetsu-001 | "特別永住者と一般永住者の違いは何ですか？" | State: 特別永住者は入管特例法に基づく制度で，旧植民地出身者（戦前から日本に居住していた朝鮮・台湾出身者）とその子孫を対象とする。一般永住者は入管法に基づき申請で取得する。退去強制の要件が一般外国人より制限的で，証明書類も「特別永住者証明書」（在留カードとは別様式）。 |
| tokubetsu-002 | "特別永住者の子供が生まれました。何か手続きは必要ですか？" | State: 特別永住者の子として日本で出生した子は，出生後60日以内に住所地の市区町村役場で特別永住許可の申請が必要。申請しなければ特別永住者にはならない。60日以内に必ず手続きを行うこと。 |
| tokubetsu-003 | "在日韓国人ですが，特別永住者になれますか？" | State: 特別永住者制度の対象は，戦前から日本に居住していた旧植民地出身者（主に朝鮮・台湾出身者）とその子孫に限られる。韓国籍であれば自動的に対象となるわけではなく，歴史的経緯に基づく要件を満たすかどうかの確認が必要。個別の資格確認は行政書士または市区町村役場に相談すること。 |

## Source Notes

- 特別永住者の定義・対象・申請手続き: ISA「特別永住者」(tokubetsu_eijusha_index.html) — 旧植民地出身者・子孫; 子の60日以内申請; 市区町村窓口.
- 特別永住者証明書: ISA「特別永住者証明書」(tokubetsu_eijusha_card.html) — 有効期限（16歳以上=7年）; 更新手続き.
- 入管特例法: 「日本国との平和条約に基づき日本の国籍を離脱した者等の出入国管理に関する特例法」(1991年) — 一般入管法との区別.
- Cross-ref G22 (在留カード有効期限と在留期間の区別), G53 (一般永住者の在留カード更新), G74 (永住者の在留資格取消リスク).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 018 G97. Key sources: ISA tokubetsu_eijusha_index.html（特別永住者の定義・子の60日以内申請); ISA tokubetsu_eijusha_card.html（証明書有効期限・更新); 入管特例法（一般入管法との区別）; G22/G53 cross-refs. Core facts: 特別永住者=旧植民地出身者・子孫; 入管特例法に基づく特別制度; 退去強制要件が一般外国人より制限的; 子の60日以内申請必要; 証明書有効期限あり（7年）. needs_domain P1: 60日期限超過後の代替手続き; 長期出国と特別永住者の地位維持. Cross-ref G22, G53, G74.
