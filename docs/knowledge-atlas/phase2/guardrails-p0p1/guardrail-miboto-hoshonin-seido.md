---
asset_id: guardrail-miboto-hoshonin-seido
title: 在留申請の身元保証人制度 — 身元保証は一部の在留資格申請で任意の添付書類；法的拘束力は限定的；保証人が法的に費用支払義務を負うわけではない；招聘状と身元保証書は別物
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

This guardrail prevents errors about the identity guarantee (身元保証) system in Japanese immigration applications. Key errors to block:

1. **"身元保証人がいなければ，在留資格の申請ができない。"** — incorrect（for most statuses）. 身元保証書は，一部の在留資格（例: 日本人・永住者の配偶者等，家族滞在等）の申請において，ISA提出書類の一部として添付することが求められる場合がある。ただし，すべての在留資格申請で必須となるわけではない。
2. **"身元保証人は，外国人が日本で起こした損害・債務を法的に責任を負う。"** — mostly incorrect. 身元保証書における保証の内容は，「出国旅費の負担・帰国の確保・法令遵守の働きかけ」等の道義的な誓約が主であり，法的に外国人の一切の債務・損害を補償する義務を負うものではない（入管法上の身元保証は民法上の保証契約とは異なる）。
3. **"招聘状と身元保証書は同じもの。"** — incorrect. 招聘状（招へい理由書）は，外国人を日本に招く理由・目的を説明する書類（主に短期滞在の招へい時に使用）。身元保証書は，申請者の身元を保証する書類。用途・内容・法的性格が異なる。
4. **"外国人の友人・知人が身元保証人になれる。"** — generally incorrect for formal applications. 身元保証人の要件は申請種別によって異なるが，多くの場合，配偶者・雇用主・日本在住の親族等の関係者であることが求められ，単なる友人・知人が認められる保証書は審査上の効果が限定的。

## Trigger

Use this card when the user says:

- "在留資格の申請に身元保証人が必要ですか？"
- "身元保証人になるとどのような責任を負いますか？"
- "身元保証書と招聘状の違いは何ですか？"
- "友人に身元保証人になってもらえますか？"
- "身元保証人が亡くなったら，在留資格はどうなりますか？"
- any pattern treating identity guarantors as having full legal financial liability, or conflating guarantee letters with invitation letters.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-miboto-hoshonin | L4 | 出入国在留管理庁「身元保証書」 | https://www.moj.go.jp/isa/applications/procedures/16-4_00006.html | 2026-05-15 | 身元保証書の内容（旅費・帰国の確保・法令遵守の助力）; 法的拘束力の限定性; 提出が求められる申請種別. |
| isa-tanki-shodai | L4 | 出入国在留管理庁「招へい理由書」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html | 2026-05-15 | 招へい理由書（招聘状）の内容・目的（主に短期滞在の招へい申請に使用）. |

## Official Rule Or Source Fact

**身元保証書の法的性格:**

ISA（出入国在留管理庁）の公式説明によれば，在留申請における身元保証書は:

- 保証する内容: 被保証人（申請者）の**旅費の負担，帰国の確保，及び法令遵守の助力**を約束するもの
- 法的効果: **入管法上の行政上の書類**として提出されるものであり，民法上の保証契約（連帯保証等）とは異なる
- 損害賠償責任: 身元保証人が申請者の全ての債務・損害について民法上の連帯保証を負うものではない
- 実際の法的拘束力: 保証内容（特に帰国旅費の負担等）について，実際に法的強制執行が行われた例は限定的

**身元保証書が求められる主な申請種別:**

| 申請種別 | 身元保証書の要否 |
|---|---|
| 日本人の配偶者等（在留資格変更・CoE申請）| 多くの場合，日本人配偶者が身元保証人となる身元保証書を提出 |
| 家族滞在 | 扶養者（主たる在留資格保有者）が保証人となる場合あり |
| 短期滞在（招へい申請）| 主に招へい理由書（招聘状）を提出; 身元保証書を求める場合もある |
| 就労系資格（技人国・特定技能等）| 一般的に雇用主が各種証明書を提出（身元保証書は必須ではない）|
| 永住許可申請 | 永住許可申請書類には身元保証書が含まれる（日本人・永住者等の保証人）|

**身元保証人の要件（申請種別によって異なる）:**

| 申請種別 | 保証人の条件（一般的な例）|
|---|---|
| 配偶者等 | 日本人配偶者・永住者等の配偶者本人 |
| 家族滞在 | 日本に在留する扶養者（主たる在留資格保有者）|
| 永住申請 | 日本に住む安定した収入・生活基盤を持つ者（日本人・永住者等が望ましい）|

**招聘状（招へい理由書）との違い:**

| 比較項目 | 身元保証書 | 招へい理由書（招聘状）|
|---|---|---|
| **目的** | 申請者の身元・行動を保証する | 日本への招聘・訪問の理由・目的を説明する |
| **主な使用場面** | 在留資格変更・永住申請等 | 主に短期滞在（観光・ビジネス等）の招へい申請 |
| **内容** | 旅費負担・帰国確保・法令遵守の助力の誓約 | 招聘の経緯・目的・受入期間・活動内容の説明 |
| **法的効果** | 限定的な行政上の誓約 | 招聘の事実証明（短期滞在の上陸許否判断資料）|

**身元保証人が死亡・転居等した場合:**

- 身元保証人の死亡・連絡不能等で在留資格が自動的に取り消されることはない
- ただし，永住申請等で保証人の変更が必要になる場合には，新たな保証人を用意して再申請・更新が必要

## Safe Answer Behavior

- When asked if an identity guarantor is required: clarify that requirements vary by application type; not all applications need one; explain what it covers.
- When asked about liability: clearly state that 身元保証 is NOT the same as full legal/financial liability; it is an administrative pledge with limited legal force.
- When asked about 招聘状 vs 身元保証書: explain they are different documents for different purposes; route to the appropriate application type.
- When asked about friend/acquaintance as guarantor: clarify that while formally possible, the strength of a guarantor relationship matters; close family member or employer is generally preferred.

## Must Say

- 身元保証書は，申請者の旅費負担・帰国の確保・法令遵守への助力を誓約する書類であり，保証人が申請者の全ての債務・損害に対して民法上の連帯保証を負うものではない。
- 身元保証書が必要かどうかは申請種別によって異なり，すべての在留資格申請で必須ではない。就労系在留資格（技人国・特定技能等）では一般的に不要。
- 招聘状（招へい理由書）と身元保証書は別の書類で，目的・内容・使用場面が異なる。招聘状は主に短期滞在の招へい申請で使用される。

## Must Not Say

- 「身元保証人は外国人が起こした事故・損害の費用を全額支払う義務がある。」（民法上の連帯保証とは異なる）
- 「すべての在留資格申請に身元保証書が必要。」（申請種別によって異なる）
- 「招聘状と身元保証書は同じもの。」（別の書類で別の目的）

## Deep Water Triggers

- 身元保証人となった後，申請者が失踪した — 保証人はどのような責任を負うか？（限定的な行政責任; 民法上の賠償義務は通常なし）
- 永住申請の身元保証人として書類を作成したが，申請者が永住を取得した後に保証人を解除したい — 可能か？
- 外国人の雇用主が身元保証人になる場合，どのような書類が必要か？
- 身元保証人に特定の収入要件はあるか？（永住申請の保証人）
- 親族が日本にいない申請者の身元保証人は誰でもなれるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about guarantor requirements: confirm requirement varies by application type; route to ISA's specific application checklist for their category.
- For persons worried about liability: explain the limited legal force of 身元保証; recommend lawyer consultation if liability concerns are serious.
- For persons confusing 招聘状 and 身元保証書: route them to the correct document type based on their intended purpose (invitation = 招へい理由書; identity guarantee = 身元保証書).
- For persons applying for 永住 who need a guarantor: explain that a stable Japanese resident (family member, employer, etc.) is preferred as guarantor; route to 行政書士 for document preparation.

## Unknown Fields

- Whether there is a formal income or asset requirement for persons serving as 身元保証人 in 永住許可申請 — and if so, what the standard is.
- The practical consequence when a 身元保証人 formally withdraws their guarantee during the period of a person's approved 在留資格.
- The extent to which ISA actually enforces the 旅費負担 obligation against 身元保証人 in cases where a foreign national overstays or refuses to depart.

## Needs Domain Flags

- needs_domain (P1): What are the ISA-required qualifications (income, residency status, relationship type) for serving as a 身元保証人 in a 永住許可申請? The ISA 身元保証書 page mentions "相当の収入を有する者" but specific income thresholds are not confirmed.
- needs_domain (P1): Is there any case in which the ISA has formally demanded enforcement of the 旅費負担 obligation against a 身元保証人? This would determine whether TEBIQ should describe the obligation as "legally meaningful" or "practically unenforced."

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| hoshonin-001 | "在留資格の申請に身元保証人が必要ですか？友人に頼めますか？" | State: 身元保証人が必要かどうかは，申請の種別によって異なる。就労系資格（技人国・特定技能等）では一般的に不要。配偶者・家族滞在・永住申請では求められる場合がある。保証人の要件は申請種別によって異なり，配偶者・扶養者・雇用主等の関係者が望ましい。詳細は申請書類チェックリスト（ISAウェブサイト）で確認を。 |
| hoshonin-002 | "身元保証人になったら，その外国人が事故を起こしたときに賠償責任を負いますか？" | State: 在留申請における身元保証書は，旅費負担・帰国の確保・法令遵守への助力を誓約する行政上の書類であり，民法上の連帯保証契約（外国人の全ての債務・損害の賠償義務）とは異なる。身元保証書を提出したことで，第三者への損害賠償責任を自動的に負うものではない。詳細は弁護士に確認を。 |
| hoshonin-003 | "招聘状と身元保証書はどう違いますか？" | State: 招聘状（招へい理由書）は，外国人を日本に招く理由・目的・活動内容を説明する書類で，主に短期滞在の招へい申請で使用される。身元保証書は，申請者の旅費負担・帰国確保・法令遵守への助力を誓約する書類で，在留資格変更・永住申請等で求められる。目的・内容・使用場面が異なる別の書類。 |

## Source Notes

- 身元保証書の内容・法的性格: ISA「身元保証書」(16-4_00006.html) — 「被保証人の本邦旅費の支弁，帰国の確保，及び法令遵守の助力を誓約」; 民法上の連帯保証ではない旨（法的性格の限定性）.
- 招へい理由書（招聘状）: ISA「招へい理由書」— 短期滞在の招へい申請で使用; 招聘の理由・目的・期間等を記載.
- 永住申請の身元保証: ISA 永住許可申請書類 — 身元保証書が必要書類の一つとして列挙されている.
- Cross-ref G43 (CoE申請における招聘), G60 (永住申請の要件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 019 G102. Key sources: ISA「身元保証書」(16-4_00006.html)（内容・法的性格）; ISA「招へい理由書」（招聘状との区別）. Core facts: 身元保証書=行政上の誓約（民法上の連帯保証ではない）; 申請種別によって要否が異なる（就労系では一般不要; 配偶者・永住では求められる場合あり）; 招聘状との区別（別の書類・別の目的）. needs_domain P1: 永住申請保証人の収入要件; 旅費負担義務の実際の執行実績. Cross-ref G43, G60.
