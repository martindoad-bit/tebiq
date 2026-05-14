---
asset_id: guardrail-tokutei-gino-shien-keikaku
title: 特定技能の支援計画義務（所属機関直接実施） — RSOは任意だが支援計画の実施は義務；10項目の支援が必須
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 012"
---

## What This Document Is

This guardrail prevents errors about the support plan (支援計画) obligations for employers of 特定技能1号 workers, particularly when not using a registered support organization (登録支援機関/RSO). Key errors to block:

1. **"登録支援機関を使わなければ特定技能1号外国人を雇用できない。"** — incorrect. RSOの使用は義務ではない（G44 cross-ref）。ただし使用しない場合は，所属機関（雇用主）が10項目の支援を自ら実施しなければならない。
2. **"登録支援機関を使わない場合，支援計画書は形式的なものでよい。"** — incorrect. 支援計画は実質的な内容が必要で，ISAの申請時に提出し，実際に実施する義務がある。
3. **"支援計画さえ提出すれば，実際に支援しなくてもよい。"** — incorrect. 支援計画の不実施は，在留資格の更新拒否・取消リスクに直結する可能性がある。
4. **"特定技能2号では支援計画は不要。"** — correct, but important nuance. 支援計画義務は特定技能**1号**のみに適用される。2号への移行後は支援計画義務は消滅する。

## Trigger

Use this card when the user says:

- "登録支援機関を使わずに特定技能外国人を雇用できますか？"
- "特定技能の支援計画とは何ですか？どんなことをすればいいですか？"
- "登録支援機関に委託しないで，自社で支援してもいいですか？"
- "特定技能の支援計画書の提出は必須ですか？"
- "特定技能2号でも支援計画が必要ですか？"
- any pattern misunderstanding RSO as mandatory, or treating the support plan as optional or formalistic.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-support | L4 | 出入国在留管理庁「１号特定技能外国人支援・登録支援機関について」 | https://www.moj.go.jp/isa/policies/ssw/supportssw.html | 2026-05-15 | 10項目の義務支援内容確認; RSO委託は任意; 全部委託ルールあり（G44 cross-ref）. |
| isa-ssw-keikaku | L4 | 出入国在留管理庁「１号特定技能外国人支援計画」 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00047.html | 2026-05-15 | 支援計画の法的根拠・内容・提出要件. |
| g44-crossref | guardrail | guardrail-tokutei-gino-toroku-shien-kikan (G44) | internal | 2026-05-15 | G44: RSO definition; full-delegation-only rule; RSO use NOT mandatory; 14-day reporting obligation. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号/2号の違い; 支援計画は1号のみに適用. |

## Official Rule Or Source Fact

**支援計画（支援プログラム）の法的根拠:**

特定技能1号外国人を受け入れる所属機関（雇用主）は，入管法に基づき，当該外国人の日本での安定した就労と生活を支援する義務を負う（入管法 第19条の23等）。

**10項目の義務的支援（１号特定技能外国人支援計画の必須事項）:**

1. **事前ガイダンス（入国前情報提供）**: 在留資格・日本での活動内容・給与・労働条件・保険等について，本国語で情報提供
2. **出入国時の送迎**: 入国時の空港等から住居・就労先への送迎；帰国時も同様
3. **適切な住居の確保等（住居支援）**: 住居確保の支援または宿泊施設の提供; 住居に関する契約支援
4. **生活オリエンテーション**: 生活に必要な情報（銀行口座・携帯電話・医療機関・各種行政手続き等）の提供（本国語で）
5. **日本語学習の機会提供**: 日本語学習の機会の確保（オンライン学習等）
6. **相談・苦情への対応**: 生活・労働上の相談や苦情への対応（本国語または日本語で，本国語が可能な担当者を通じて）
7. **日本人との交流促進**: 地域住民や日本人との交流・地域行事への参加機会の提供
8. **非自発的離職時の転職支援**: 雇用主都合による離職の場合，転職先探しの支援・ハローワークへの同行等
9. **定期的な面談と行政機関への通報**: 受け入れ中，定期的に（少なくとも3か月に1回）面談を行い，労働基準法違反・違法行為があれば行政機関に通報
10. **その他**: 上記に準じて必要と認められる支援事項

**所属機関（雇用主）が自ら実施する場合の要件:**

所属機関が支援を自ら行う場合（RSOを使わない場合）は，以下の基準を満たす必要がある（自己実施能力要件）:
- 支援に必要な体制（担当者・多言語対応能力等）を有すること
- 過去に特定技能外国人の受け入れ実績があるか，または支援実施のための計画を具体的に示せること
- 5年以内に入管法等の法令違反がないこと

**RSOに全部委託する場合 vs 自社実施の比較（G44 cross-ref）:**

| | RSO全部委託 | 所属機関（雇用主）自己実施 |
|---|---|---|
| 義務の主体 | 引き続き所属機関（雇用主）が主体；RSOが代行 | 所属機関（雇用主）が直接実施 |
| RSO使用 | 任意（使わなくてもよい）| なし |
| 費用 | RSOへの委託料が発生 | 内製コスト |
| 多言語能力 | RSOが担う場合多い | 自社で担う必要あり |
| リスク | RSO不履行→雇用主も責任（G44 cross-ref）| 雇用主が直接責任 |

**支援計画の提出と審査:**

- 特定技能1号の在留資格認定証明書または変更許可申請の際，**支援計画書を添付して提出**
- ISAが審査し，支援計画が適切かどうかを判断
- 計画内容が実質的でない場合（形式的な記載のみ）は申請が不許可になるリスク

**支援計画と在留資格更新の関係:**

- 在留期間の更新申請時にも支援実績の確認が行われる
- 支援計画を実施していないことが判明した場合，更新拒否の事由となりうる
- 雇用主の支援義務不履行 → 所属機関としての認定要件不適合 → 特定技能雇用が継続不可

**特定技能2号への適用:**

特定技能2号（G33 cross-ref）は支援計画義務の対象外。ただし2号移行後も雇用主としての一般的な雇用・労働義務（G67 cross-ref: 雇用保険・労災等）は継続する。

## Safe Answer Behavior

- When employer asks if RSO is mandatory: confirm RSO is NOT mandatory; employer can self-implement; but the 10-item support plan must still be fully implemented.
- When asked about what support is required: list the 10 mandatory support items; emphasize the substantive (not formalistic) implementation requirement.
- When asked about the support plan form: confirm it must be submitted with the 在留資格 application; route to professional or ISA official guidance for the form.
- When asked about 特定技能2号: confirm 支援計画義務 does NOT apply to 2号.
- Do not say "if you submit the plan, you don't have to actually implement it."

## Must Say

- 特定技能1号外国人を受け入れる所属機関（雇用主）は，登録支援機関（RSO）を使用するかどうかに関わらず，10項目の義務的支援を確実に実施しなければならない。
- 登録支援機関の使用は任意（G44参照）。使用しない場合は，所属機関自身が支援実施のための体制・能力を有していなければならない。
- 支援計画書はISAへの在留資格申請時に提出が必要。計画の内容は実質的なものでなければならず，実際に実施しない場合は更新拒否・在留資格取消のリスクがある。
- 支援計画義務は特定技能**1号**のみに適用される。特定技能2号には支援計画義務はない。

## Must Not Say

- 「登録支援機関を使わなければ特定技能外国人を雇えない。」（RSOは任意）
- 「支援計画書を提出すれば，実際の支援は最低限でよい。」（実質的な実施が義務）
- 「支援計画はとりあえず提出すれば大丈夫。」（非実施は更新拒否リスク）
- 「特定技能2号でも支援計画が必要。」（2号には支援計画義務なし）

## Deep Water Triggers

- A small employer (5 employees total) wants to hire a 特定技能1号 worker without using an RSO — do they have the required capability to self-implement the 10 support items?
- RSO was hired but only completed 3 of the 10 support items — who is responsible?
- Employer wants to change from RSO-implemented to self-implemented mid-contract — is this possible?
- 特定技能 worker reports that the employer is not providing any of the 10 mandatory support items — what should they do?
- Can an employer use an RSO for some of the 10 support items and self-implement the rest?

## User Next Actions

This is not user-facing copy. For answer routing:

- For employers planning to self-implement: route to professional for review of self-implementation capability requirements; the 10-item plan needs to be substantive.
- For employers using an RSO: route to G44 for RSO selection and full-delegation rule; remind that employer remains responsible even when RSO is delegated.
- For 特定技能 workers whose employer is not implementing support: route to ISA complaint or 労働局 for assistance; support obligations are enforceable.
- For all 特定技能 employers: route to ISA 支援計画 guidance and application form.

## Unknown Fields

- The specific ISA assessment criteria for evaluating whether an employer's self-implementation capability is sufficient (what documentation is required).
- Whether partial RSO delegation (some items to RSO, some self-implemented) is formally permitted under the 全部委託ルール.
- The specific time intervals required for the mandatory face-to-face meetings (the 3-month guideline from ISA guidance).

## Needs Domain Flags

- needs_domain (P1): under the 全部委託ルール for RSOs (G44 cross-ref), can employers delegate some but not all of the 10 support items to an RSO? Or must they either delegate all or implement all?
- needs_domain (P1): what are the specific ISA criteria for determining that a small employer has sufficient "体制" (capacity) to self-implement the 10-item support plan?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shien-001 | "登録支援機関を使わずに特定技能外国人を雇用できますか？" | State: YES — RSOの使用は任意。ただし所属機関（雇用主）が自ら10項目の支援を実施する義務がある。自己実施のための体制・能力要件を満たす必要あり。専門家に相談を。 |
| shien-002 | "特定技能の支援計画で必須の支援は何ですか？" | State: 10項目（事前ガイダンス、出入国時送迎、住居確保、生活オリエンテーション、日本語学習機会、相談対応、交流促進、転職支援、定期面談・通報、その他）。すべて実質的に実施する義務あり。 |
| shien-003 | "特定技能2号の外国人を採用する場合も支援計画が必要ですか？" | State: NO — 支援計画義務は特定技能1号のみ。特定技能2号には支援計画の提出・実施義務はない。 |

## Source Notes

- 10項目の義務的支援内容 confirmed from ISA 特定技能支援ページ (supportssw.html) および ISA 支援計画ページ (nyuukokukanri07_00047.html).
- RSO使用は任意 confirmed from G44 cross-ref (ISA supportssw.html 確認済み).
- 全部委託ルール (RSO を使う場合は全部委託が必要) confirmed from G44.
- 支援計画書の申請時提出要件: ISA 申請手続きの一般的要件として構造的.
- 特定技能1号のみへの適用: G33 cross-ref (特定技能1号/2号の境界).
- Cross-ref G44 (RSO 定義・任意性・14日届出), G33 (1号/2号区別), G67 (雇用保険等の一般的雇用義務).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 012 G70. Key sources: ISA supportssw.html (G44 cross-ref); ISA nyuukokukanri07_00047.html (支援計画). Core facts: RSOは任意; 支援計画の10項目は義務; 実質的実施が必要（形式的不可）; 不実施=更新拒否リスク; 1号のみ対象. Cross-ref G44, G33, G67.
