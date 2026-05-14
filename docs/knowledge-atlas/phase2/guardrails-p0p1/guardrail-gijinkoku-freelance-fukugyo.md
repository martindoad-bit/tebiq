---
asset_id: guardrail-gijinkoku-freelance-fukugyo
title: 技人国保有者の副業・フリーランス — 業務内容が在留資格の活動範囲内でなければ不法就労；雇用形態は問わない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 013"
---

## What This Document Is

This guardrail prevents errors about freelance work and side jobs for 技術・人文知識・国際業務 (技人国) holders. Key errors to block:

1. **"技人国を持っていれば，副業やフリーランス収入はどんな仕事でも問題ない。"** — incorrect. 技人国の活動範囲は「技術・人文知識・国際業務」に分類される知識系・専門職業務のみ。雇用形態（正社員か業務委託かフリーランスか）を問わず，業務の内容が在留資格の活動範囲に合致する必要がある。
2. **"会社を設立して副収入を得るだけなら，経営管理ビザへの変更は不要。"** — incorrect. 会社の実質的な経営管理活動（意思決定・業務執行・監督）を継続的に行う場合は，経営管理在留資格が必要。技人国のまま経営管理活動を行うことは活動範囲超過。
3. **"フリーランスの業務委託は就労ではないから，技人国の範囲制限が適用されない。"** — incorrect. 在留資格の活動範囲制限は雇用契約の有無に関わらず適用される。業務委託・請負・フリーランス形態でも，行う業務の内容が活動範囲内でなければならない。
4. **"副業なので時間が少なければ許可は必要ない。"** — incorrect. 活動の時間的な量に関わらず，活動範囲外の業務を行えば不法就労となる可能性がある。

## Trigger

Use this card when the user says:

- "技人国のビザで副業をしたいのですが，何でもできますか？"
- "フリーランスとして仕事を受けることはできますか？"
- "会社を作って副収入を得ることは問題ありませんか？"
- "副業で飲食店のアルバイトをしても大丈夫ですか？"
- "週末だけ別の仕事をすることはできますか？"
- any pattern assuming that 技人国 permits any side income activity regardless of job content, or that self-employment / freelance is exempt from activity scope restrictions.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-gijinkoku | L4 | 出入国在留管理庁「在留資格『技術・人文知識・国際業務』」 | https://www.moj.go.jp/isa/applications/status/gijinkoku.html | 2026-05-15 | 活動定義確認: 「本邦の公私の機関との契約に基づいて行う…業務に従事する活動」. |
| g35-crossref | guardrail | guardrail-gijinkoku-gyomu-youken-boundary (G35) | internal | 2026-05-15 | G35: 技人国の3サブカテゴリー（技術/人文知識/国際業務）; 手作業・生産ラインは除外; 雇用主の割当 ≠ 在留資格の拡張. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | G47: 経営管理に実質的参画が始まった場合は経営管理在留資格が必要; 役員就任だけでも実質参画が伴えば超過の可能性あり. |
| g55-crossref | guardrail | guardrail-fukugyo-kengyo-zairyu-seigen (G55) | internal | 2026-05-15 | G55: 就労系在留資格での副業は活動範囲内でなければならない; 技人国は同サブカテゴリー内の副業なら可能性あり. |
| g26-crossref | guardrail | guardrail-zairyu-shikaku-torikeshi-22-4 (G26) | internal | 2026-05-15 | G26: 入管法第22条の4 — 活動非実施（3か月/6か月）で取消対象; 逆に活動範囲超過も違法就労問題. |
| egov-nyukan | L1 | 出入国管理及び難民認定法 第19条 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 第19条: 在留資格保有者は許可された範囲内の活動のみ可能. 範囲外活動 = 資格外活動. |

## Official Rule Or Source Fact

**技人国の活動範囲（入管法 第19条 + ISA 在留資格定義）:**

在留資格制度の基本原則として，在留資格保有者は**許可された在留資格の活動範囲内の活動のみ**を行うことができる（入管法第19条）。技人国の活動範囲は以下の3サブカテゴリーに分類される（G35 cross-ref）:

| サブカテゴリー | 業務内容の例 |
|---|---|
| **技術** | システムエンジニア，機械設計，化学・工学系の研究・開発 |
| **人文知識** | 経理，法務，マーケティング，経済分析，翻訳・通訳（知識系）|
| **国際業務** | 語学教師，翻訳・通訳，外国語を使用したビジネス業務 |

**技人国の副業における「業務内容」の判断:**

副業・フリーランス・業務委託であっても，従事する業務の内容が上記の技人国活動範囲に該当する必要がある:

- **許可される副業の例（範囲内）**: 本業がシステムエンジニア（技術）→ フリーランスとして同種のプログラミング業務を受注
- **許可されない副業の例（範囲外）**: 本業がエンジニア（技術）→ 副業で飲食店のホールスタッフ（接客・サービス業）
- **グレーゾーン（needs_domain）**: 本業がマーケティング（人文知識）→ 副業でSNSコンテンツ制作（クリエイター的業務）

**雇用形態と活動範囲の関係:**

在留資格の活動範囲制限は，雇用形態（正社員・契約社員・業務委託・請負・フリーランス）に関わらず適用される:

- 正社員であっても業務内容が範囲外なら不法就労
- フリーランス・業務委託であっても業務内容が範囲内なら原則として適法
- ただし: 複数の機関との契約に基づく技人国活動は可能（活動内容が技人国の範囲内であれば）

**会社設立と経営管理ビザの問題（G47 cross-ref）:**

技人国保有者が自分で会社を設立した場合:
- 会社に自分の専門技術を活かすサービスを提供するだけ（技人国範囲内の業務委託）→ 技人国のままで可能
- 会社の経営者として実質的に経営管理活動（意思決定・業務執行・管理・監督）を行う → 経営管理在留資格が必要
- 役員に就任するだけで実質的な経営管理活動がない → グレーゾーン（G47 cross-ref: 実質参画が伴えば経営管理に該当）

**資格外活動許可との関係:**

資格外活動許可（G16 cross-ref）は，主として留学・家族滞在等の活動制限の緩和のために設けられた制度であり，就労系在留資格（技人国等）の活動範囲を拡大するためのものではない。技人国保有者が在留資格の活動範囲外の副業をするために資格外活動許可を取ることは，制度上想定されていない。

**リスクの程度:**

範囲外の副業・フリーランス業務を行った場合のリスク:
- **不法就労**: 入管法違反
- **在留資格取消（第22条の4）**: 規定の活動を行っていないと判断される可能性（G26 cross-ref）
- **更新不許可**: 素行評価への影響（G31 cross-ref）
- **雇用主（発注者）の責任**: 入管法第73条の2 — 不法就労を知りながら業務を委託した発注者も刑事責任

## Safe Answer Behavior

- When asked if any side job is OK for 技人国: immediately clarify that the side job content must be within the 技人国 activity scope; the visa type is defined by what you do, not how many hours.
- When asked about freelance/business commission: confirm that employment form doesn't matter; what matters is whether the work content is within scope.
- When asked about company formation for side income: ask whether the activity is within 技人国 scope (contracting out professional services) or constitutes actual business management (which requires 経営管理).
- When asked about restaurant/retail/manual labor side jobs: clearly state these are outside 技人国 scope.
- Route to professional for borderline cases (e.g., SNS content creation, hybrid roles, company formation scenarios).

## Must Say

- 技人国在留資格での副業・フリーランス業務は，業務の内容（従事する仕事の種類）が技人国の活動範囲（技術・人文知識・国際業務）に該当する場合のみ許可される。雇用形態（業務委託・フリーランス）は問わない。
- 飲食店スタッフ・工場ライン作業・販売員など，技人国の活動範囲外の業務は，副業・アルバイトの形式であっても不法就労となる可能性がある。
- 自社を立ち上げて実質的な経営管理活動（意思決定・業務執行等）を行う場合は，技人国のままでは活動範囲超過となり，経営管理在留資格への変更が必要。

## Must Not Say

- 「技人国があれば副業は何でもできる。」（活動内容が技人国の範囲内であることが必要）
- 「フリーランスや業務委託は在留資格の制限対象外。」（雇用形態問わず業務内容で判断）
- 「時間が少ない副業なら在留資格の制限は適用されない。」（時間量ではなく業務内容で判断）
- 「会社を設立するだけなら経営管理ビザは不要。」（実質的な経営管理活動があれば変更が必要）

## Deep Water Triggers

- 技人国保有者が ITフリーランスとして複数企業から業務委託を受けている — 正規の手続きは何か？
- 本業はソフトウェアエンジニアだが，副業で自分のYouTubeチャンネルから収入を得ている — 活動範囲内か？
- 友人と共同で会社を設立し，自分が「技術顧問」として技人国の範囲内の技術業務のみを行う — 問題ないか？
- 技人国保有者が副業先の会社の株主になる — 株式保有と配当収入は活動範囲内か？
- 技人国保有者が副業で経営コンサルタントとして活動する — 「人文知識」に含まれるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with clearly in-scope side jobs (same technical/knowledge field): confirm they can accept business commission; recommend professional review of contract structure.
- For persons with clearly out-of-scope side jobs (manual labor, food service, retail): state the scope violation clearly; do NOT advise starting such work; route to professional if they have already started.
- For persons considering company formation: route to G47 for the 経営管理 boundary assessment; route to professional for specific business structure advice.
- For income tax / filing questions related to side jobs: route to tax professional separately from immigration advice.

## Unknown Fields

- Whether ISA has issued specific guidance on dual-contract 技人国 arrangements (contracting with multiple companies for in-scope work).
- Whether stock ownership and dividend income from a self-founded company constitutes "経営管理" activity under ISA's operational standard.
- The specific ISA operational standard for evaluating whether a company founder who also provides technical services is in 技人国 or 経営管理 territory.

## Needs Domain Flags

- needs_domain (P1): What is the official or operational ISA standard for distinguishing "技人国 business commission" from "経営管理 activity" when a 技人国 holder is also a shareholder/director of their own company?
- needs_domain (P1): Does ISA have a published or operational position on IT freelancers holding 技人国 who contract with multiple companies simultaneously — is this treated as standard 技人国 activity or does it require a separate determination?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| freelance-001 | "技人国を持っています。週末に飲食店でアルバイトしたいのですが大丈夫ですか？" | State: NO — 飲食店スタッフ（接客・調理）は技人国の活動範囲外。業務内容が「技術・人文知識・国際業務」に分類されない手作業・サービス業は不法就労となる可能性がある。 |
| freelance-002 | "技人国でITエンジニアとして働いています。副業でフリーランスのプログラミング業務を受けることはできますか？" | State: 業務の内容が技人国の「技術」に該当するプログラミングであれば，フリーランス・業務委託の形式であっても活動範囲内の可能性がある。ただし具体的な契約内容は専門家に確認を。 |
| freelance-003 | "技人国で働きながら，自分の会社を作って経営したいのですが問題ありませんか？" | State: 会社の「経営管理活動」（意思決定・業務執行・管理）を実質的に行う場合は，経営管理在留資格への変更が必要（G47参照）。会社設立だけで技人国範囲内の技術サービスを提供するだけなら別途確認が必要。専門家に相談を。 |

## Source Notes

- 技人国の活動範囲: ISA gijinkoku.html（活動定義）; G35 cross-ref（3サブカテゴリー・手作業除外）.
- 活動範囲制限の雇用形態への適用: 入管法第19条（在留資格の許可された活動範囲内のみ）の一般原則から導かれる.
- 経営管理との境界: G47 cross-ref（経営管理 = 実質的参画が必要; 役員就任のみでは不十分な場合あり）.
- 副業の一般的枠組み: G55 cross-ref（就労系在留資格の副業は活動範囲内でなければならない）.
- Cross-ref G35 (技人国業務要件境界), G47 (経営管理との境界), G55 (副業の一般的制限), G26 (活動範囲超過の取消リスク), G31 (更新審査の素行評価).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 013 G72. Key sources: ISA gijinkoku.html (activity definition); G35 cross-ref (three subcategory framework); G47 cross-ref (経営管理 boundary); G55 cross-ref (side job rules); 入管法第19条 (general scope principle). Core facts: 活動範囲制限は雇用形態問わず業務内容で判断; 技人国の範囲外業務（飲食店等）は不法就労; 会社設立で実質経営管理=経営管理ビザ要. Cross-ref G35, G47, G55, G26, G31.
