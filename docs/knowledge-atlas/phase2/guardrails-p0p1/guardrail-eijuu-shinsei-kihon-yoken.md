---
asset_id: guardrail-eijuu-shinsei-kihon-yoken
title: 永住申請の基本要件 — 原則10年居住（内就労等5年以上）；素行・納税・年金の適正履行；一発合格条件
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 010"
---

## What This Document Is

This guardrail prevents errors about the requirements for permanent residency (永住許可申請) in Japan. Key errors to block:

1. **"日本に10年住んでいれば永住申請できる。"** — incomplete and potentially incorrect. The principal requirement is 10 years of continuous residence, but during that period at least 5 years must have been on a work-authorized or other qualifying status (就労資格・居住資格等). Merely holding short-term or study visas for 10 years may not suffice.
2. **"永住申請は居住年数だけが問題で，他の要件は形式的。"** — incorrect. 素行（conduct）, 納税義務の履行（tax compliance）, 社会保険・公的義務の適正な履行, and sufficient assets/income are all substantive requirements.
3. **"永住申請中に在留期間が切れたら不法在留になる。"** — incorrect (specific clarification needed). If the application is filed before the current period expires, the 特例期間 (special continuation period) applies — the applicant can remain legally until a disposition is made (G1 cross-ref). But this is separate from the requirement to hold an appropriate status when applying.
4. **"外国人登録さえしていれば，途中で出国していても『継続居住』として認められる。"** — incorrect. Continuous residence (継続居住) can be broken by extended absences; ISA assesses the actual continuity of residence.

## Trigger

Use this card when the user says:

- "永住申請の条件は何ですか？"
- "日本に10年いれば永住できますか？"
- "就労ビザ何年で永住申請できますか？"
- "永住申請に必要な書類や要件を教えてください。"
- "観光ビザ（短期滞在）の期間も永住の10年に含まれますか？"
- "永住申請のための年金・税金の要件は何ですか？"
- any pattern asking about 永住 eligibility requirements or conflating residential years with full eligibility.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-pr-16-4 | L4 | 出入国在留管理庁「永住許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-4.html | 2026-05-15 | 要件概要（ISA 公式）: 素行が善良であること; 独立の生計を営むに足りる資産又は技能を有すること; その者の永住が日本国の利益に合すると認められること。不服申立方法：なし。|
| nyukan-22jo | L1 | 入管法 第22条 | (法令) | 2026-05-15 | 永住許可の要件: 素行善良; 独立生計能力; 日本国の利益。大臣裁量あり。 |
| isa-pr-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン（令和6年改定版）」 | https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00115.html | 2026-05-15 | 10年居住要件（内就労・居住系5年以上）; 最長在留期間（最長の在留期間を持つ在留資格）取得要件; 納税・社会保険等公的義務の適正履行; 直近2年の税・年金滞納なし要件。|
| g4-crossref | guardrail | guardrail-late-payment-not-erased (G4) | internal | 2026-05-15 | PR 審査での公的義務適正履行要件 — 過去の納税・年金滞納は審査マイナス材料. |
| g32-crossref | guardrail | guardrail-shakai-hoken-mishukaku-risk (G32) | internal | 2026-05-15 | 社会保険未加入 → 公的義務不履行 → PR 素行評価リスク. |
| g1-crossref | guardrail | guardrail-special-period-two-month-boundary (G1) | internal | 2026-05-15 | 特例期間: 永住申請中も在留の法的根拠となる（在留期間満了前に申請した場合）. |

## Official Rule Or Source Fact

**永住許可の基本三要件（入管法 第22条 + ISA procedure page）:**

1. **素行善良要件**: 法律を遵守し，日常生活においても住民として社会的に非難されることのない生活を営んでいること
2. **独立生計要件**: 日常生活において公共の負担にならず，その有する資産又は技能等から見て将来において安定した生活が見込まれること
3. **国益要件**: その者の永住が日本国の利益に合すると認められること

**「国益に合すると認められること」の具体内容（ISA ガイドライン）:**

*(a) 居住年数要件:*
- **原則: 引き続き10年以上本邦に在留** していること
- そのうち、**就労資格（技人国・技能・経営管理等）または居住資格（定住者・日本人の配偶者等・永住者の配偶者等）で5年以上**在留していること
- 短期滞在・留学のみの期間は、「5年」の就労・居住系要件に算入されない

*(b) 在留期間・在留資格要件:*
- 現に**最長の在留期間（3年又は5年）を持つ在留資格**で在留していること（直近において）

*(c) 公的義務の適正履行要件（令和6年改定で強化）:*
- **直近2年間において、所得税・住民税・社会保険料・年金の滞納がないこと**
- 納税証明書・年金記録で確認される
- G4/G32 cross-ref: 過去の滞納・未加入は審査マイナス材料；直近2年がクリーンでも過去分が審査時に問われる場合あり

**「10年」要件のカウント方法:**
- 継続居住であること（長期出国による中断がある場合は要注意）
- 短期滞在（観光・商用）は含まれない
- 留学・研修等は「10年の継続居住」には算入される可能性があるが、「就労・居住系5年」には含まれない

**特例的に短縮される場合（ISA ガイドラインより）:**
- 日本人または永住者の配偶者: 実体ある婚姻継続**3年以上 + 引き続き1年以上在留** → 10年不要
- 特別永住者（在日コリアン等）: 別法（入管特例法）が適用
- 高度専門職1号: ポイント計算で80点以上→1年; 70点以上→3年
- 難民認定者: 認定後5年居住

**永住と在留期間の関係（申請中の特例期間）:**
申請日に在留期間が残っている場合→申請中は特例期間として適法在留継続（G1 cross-ref）。ただし、申請時に在留資格を保有していることが前提。

## Safe Answer Behavior

- When asked about 10-year rule: confirm the 10-year requirement but clarify the 5-year qualifying-status subrequirement; short-term/study visas alone don't satisfy the 5-year prong.
- When asked about tax/pension: confirm the 公的義務適正履行 requirement is substantive (not formality); direct recent violations are disqualifying; route to professional.
- When asked about the current period expiring during application: explain the 特例期間 protection if filed before expiry.
- When asked about shortcut routes: confirm the spouse and high-skilled professional shortcuts exist; provide the basic parameters; route to professional for assessment.
- Do not say "10年住めば自動的に永住申請できる" — the qualifying-status 5-year subrequirement is essential.

## Must Say

- 永住申請の原則要件は**引き続き10年以上の在留**（内，就労資格・居住資格での**5年以上**）。短期滞在・留学のみの10年では，5年の就労・居住系要件を満たせない場合がある。
- 現に**最長の在留期間（3年または5年）**を持つ在留資格で在留していることが必要。短い在留期間の資格しかない状態での申請は原則受け付けられない。
- **直近2年間の納税・社会保険・年金の適正履行**が審査される（令和6年改定）。滞納・未加入がある場合，申請前に解消し，専門家に相談すること。
- 日本人・永住者の配偶者は，実体ある婚姻継続3年以上＋1年以上在留で10年要件が免除されることがある。

## Must Not Say

- 「日本に10年住めば永住申請できる。」（就労・居住系5年の内訳要件を言わないのは不完全）
- 「永住申請は年数だけで決まる。」（素行・納税・年金・在留資格の種類等すべて審査）
- 「短期滞在も10年にカウントされる。」（就労・居住系5年には算入されない）
- 「年金を払っていなくても永住は取れる。」（公的義務適正履行は要件）

## Deep Water Triggers

- Person has lived in Japan 12 years on a mix of 留学 (8 years) and 技人国 (4 years) — do they qualify?
- Person has 10 years on 技人国 but 2 years ago had a 6-month period where they didn't pay national pension — does this affect the application?
- Person's current status is 技人国 with a 1-year period (not 3-year or 5-year) — can they apply for PR?
- Person married a Japanese national 2 years ago and has been in Japan on a spouse visa for 2 years — when can they apply?
- Person is a high-skilled professional with 75 ポイント — what is their 3-year shortcut timeline?
- Person left Japan for 9 months continuously during their 10-year residence period — does their clock reset?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons approaching the 10-year mark: confirm status composition (5-year qualifying prong); check for any 公的義務 issues; route to professional for application preparation (typically 6-12 months before target filing date).
- For persons with past tax/pension issues: confirm that recent cleanup may not fully resolve past violations; route to professional for strategic assessment and timing.
- For spouse shortcut: route to professional to confirm 実体ある婚姻 (genuine marriage) documentation requirements.
- For high-skilled professional (高度専門職) shortcuts: route to professional for ポイント assessment; both 80-point and 70-point routes available.
- For all 永住 applicants: note that ISA denials for 永住 have no appeal route (不服申立方法：なし — G52 cross-ref); careful preparation is essential.

## Unknown Fields

- The exact ISA operational standard for "continuous residence" when there are multiple overseas absences (each below the critical threshold) during the 10-year period.
- Whether past tax/pension violations (beyond the "direct 2 years") are formally assessed or only factored informally in the 素行 evaluation.
- The success rate for 永住 applications where the applicant meets all formal criteria but has minor historical 公的義務 issues.

## Needs Domain Flags

- needs_domain (P1): for the "継続居住" standard — ISA has not published precise rules on what length or frequency of overseas absences breaks the continuity of residence requirement. Domain confirmation of ISA operational practice is needed.
- needs_domain (P1): for past tax/pension delinquency that was resolved 3+ years ago — how does ISA's 素行 evaluation treat this in practice? G4 notes it's a negative factor; but is it an absolute bar or a weighting factor?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijuu-001 | "日本に10年住んでいます。永住申請できますか？" | State: 10年居住は必要条件の一つだが、内5年の就労・居住系資格保有、最長在留期間保有、公的義務適正履行も必要。在留資格の内訳と公的義務履歴を確認した上で専門家に相談を。 |
| eijuu-002 | "年金を2年前まで払っていませんでした。永住申請に影響しますか？" | State: 直近2年間の適正履行が要件化（令和6年改定）。過去の滞納も素行評価の文脈で不利要因。早急に納付し、専門家による申請タイミングの検討が必要（G4 cross-ref）。 |
| eijuu-003 | "日本人と結婚して2年経ちます。永住申請できますか？" | State: 日本人配偶者の特例は「実体ある婚姻3年以上 + 引き続き1年以上在留」が要件。婚姻2年ではまだ要件未達。継続して在留し、1年後に要件を満たした時点で専門家に確認を。 |

## Source Notes

- 基本三要件（素行・生計・国益）confirmed from ISA 16-4.html procedure page and 入管法 第22条.
- 10年居住要件（内就労・居住系5年）and 最長在留期間要件 confirmed from ISA 永住許可ガイドライン (令和6年改定版).
- 公的義務適正履行の直近2年要件 confirmed from 令和6年ガイドライン改定.
- Spouse shortcut (3年婚姻 + 1年在留) confirmed from ISA guidelines.
- 高度専門職 shortcuts (80ポイント→1年, 70ポイント→3年) from general ISA guidance; specific details needs_domain for current ポイント calculation rules.
- Cross-ref G4 (公的義務適正履行 general principle), G32 (社会保険未加入リスク), G52 (不許可後の対応 — no appeal for PR denial), G1 (特例期間 during pending application).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 010 G60. Key sources: ISA 永住許可申請 procedure page (16-4.html); ISA 永住許可ガイドライン（令和6年改定版）. Core facts: 10年居住要件（内就労・居住系5年）; 最長在留期間要件; 公的義務適正履行（直近2年）; 配偶者特例（3年婚姻+1年在留）; 高度専門職短縮ルート. Cross-ref G4, G32, G1, G52.
