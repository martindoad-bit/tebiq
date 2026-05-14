---
asset_id: guardrail-kouteki-gimu-koshin-hyoka
title: 公的義務の不履行と在留審査 — PR以外の更新・変更にも素行評価は適用される；税・年金・保険の滞納は更新リスク
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

This guardrail prevents errors about the scope of public-obligation (公的義務) assessment in Japanese residence status decisions. Key errors to block:

1. **"税金・年金・健康保険の滞納は永住申請のときだけ問題になる。"** — incorrect. 公的義務の適正履行は永住に限定されず，在留期間更新許可申請および在留資格変更許可申請における「素行」評価でも参照される（ISA ガイドライン）。
2. **"少し遅れて払ったが全額払ったので問題ない。"** — partially incorrect. 後払い（事後納付）は未納よりは有利だが，「適正に履行」の評価は遅延の事実も含む。在留審査では遅延歴が残る可能性がある。
3. **"アルバイトだから住民税は関係ない。"** — incorrect. 日本では一定以上の所得がある外国人（就労形態問わず）は住民税の課税・納付義務がある。特定技能1号更新でも住民税の納税証明書が必要。
4. **"社会保険は会社が入れてくれなかったから自分には責任がない。"** — partially incorrect. 雇用主側の義務違反であっても，申請人が国民健康保険や国民年金に自ら加入するなどの対応義務がある。会社の未加入は「公的義務不履行」免責にならない場合がある。

## Trigger

Use this card when the user says:

- "住民税を少し遅れて払ったが，技人国の更新には関係ありませんよね？"
- "年金を払っていない期間があるが，永住でなければ問題ないですか？"
- "会社が社会保険に入れてくれなかった場合，自分の在留更新に影響しますか？"
- "特定技能更新に住民税の証明書が必要な理由は何ですか？"
- "健康保険の滞納は永住の時だけ影響しますか？"
- any pattern treating public-obligation evaluation as a PR-only concern, or treating employer-side social insurance failures as irrelevant to the applicant.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-renewal-guideline | L4 | 出入国在留管理庁「在留資格の変更、在留期間の更新許可のガイドライン」 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html | 2026-05-15 | 素行が良好であること = 更新・変更審査の要素. 法定の義務の履行が明示的に言及. |
| isa-pr-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン」（令和6年改定版） | https://www.moj.go.jp/isa/publications/materials/nyuukokukanri07_00115.html | 2026-05-15 | 「直近2年間において，公的義務（納税，公的年金及び公的医療保険の保険料の納付，出入国管理法に定める届出等の義務）を適正に履行していること」を明示的に規定（PR用）. |
| g31-crossref | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 更新・変更は大臣裁量; 素行・生計・活動実態・在留必要性の4要素; 義務履行も素行の一環. |
| g32-crossref | guardrail | guardrail-shakai-hoken-mishukaku-risk (G32) | internal | 2026-05-15 | G32: 社会保険未加入が PR 審査の素行評価に影響（needs_domain: 更新への影響度は未確認）. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住の公的義務要件（直近2年）の詳細. |
| g66-crossref | guardrail | guardrail-koshin-shorui-pattern (G66) | internal | 2026-05-15 | G66: 特定技能1号更新で住民税・年金・健康保険書類が必要な実務構造. |

## Official Rule Or Source Fact

**更新・変更審査における素行評価（G31 cross-ref）:**

出入国在留管理庁の「在留資格の変更、在留期間の更新許可のガイドライン」（nyuukokukanri07_00058.html）では，更新・変更許可の判断要素として「素行が不良でないこと」が明示されている。素行評価の内容には，日本の法令の遵守が含まれ，公的義務（税・保険・年金）の適正な履行はその一部として参照されると解される。

**ガイドラインの文言（G31 source）:**
> 「在留資格の変更許可及び在留期間の更新許可は，専ら法務大臣の自由な裁量に委ねられており，これらの事項にすべて該当する場合であっても，当然に許可されるものではなく，法務大臣の裁量により不許可とすることもあります。」

**永住申請における公的義務要件（G60 source — 最も詳細な明文規定）:**

永住許可ガイドライン（令和6年改定版）では，「直近2年間において，公的義務を適正に履行していること」が独立した要件として規定されている。対象となる公的義務:
1. **納税義務**: 住民税（地方税）の納付; 国税（所得税等）の納付
2. **公的年金保険料**: 国民年金保険料の納付; 厚生年金保険料の納付（事業主経由）
3. **公的医療保険料**: 国民健康保険料（税）の納付; 健康保険料の納付（事業主経由）
4. **在留関連届出義務**: 住所変更届出・所属機関変更届出等

**PR以外の更新・変更への適用範囲:**

明文化された「2年間」の義務履行要件は**永住申請特有**の規定。ただし，更新・変更審査における「素行」評価は全在留資格に適用される概念であり，公的義務の不履行（税・年金・保険の滞納）が「素行不良」の根拠として機能しうる。

**実務上の整理:**

| 在留資格 | 公的義務の審査上の扱い |
|---|---|
| **永住申請** | 直近2年の明示的・独立的要件（ガイドライン明文） |
| **技人国等就労系更新・変更** | 「素行」評価の一要素（明文化の程度は永住より低いが裁量範囲内で参照） |
| **特定技能1号更新** | 住民税・年金・健康保険の納付証明書類が申請書類として要求（G66 cross-ref） |
| **経営管理・高度専門職等** | 同様に素行評価の中で参照される |

**特定技能1号更新での書類要件（G66 cross-ref）:**

特定技能1号の更新申請（第1表共通書類）では，以下の書類が求められる（前回申請以降変更なしで省略可の条件付き）:
- 個人住民税の納税証明書・課税証明書（直近1年度分）
- 国民健康保険料（税）納付証明書（国民健康保険加入者）
- 被保険者記録照会回答票・国民年金保険料領収証書（国民年金加入者）

これは公的義務の履行を「申請書類」として実質的に確認する仕組みであり，更新審査において公的義務履行が直接的に確認される事例。

**雇用主の社会保険未加入と申請人の責任:**

会社が法令違反で社会保険（健康保険・厚生年金）に加入しなかった場合:
- 申請人（外国人労働者）は国民健康保険・国民年金へ自ら加入する義務がある（代替義務）
- 会社の違反 ≠ 申請人の義務履行免責
- 申請人が国民保険等に加入せず保険料を払っていない場合 → 公的義務不履行のリスク

**遅延納付と事後完済の取り扱い:**

- 事後完済（遅延後に全額納付）は未納より有利だが，「遅延の事実」が審査記録に残る可能性がある
- 永住申請では直近2年間の適正履行が要件 → 遅延があった場合は「適正」に履行していたとは言えない可能性
- 一般就労系更新では遅延の程度・回数・事情が素行評価の中で考慮される（but 絶対的に不許可にはならない場合もある — 裁量事項）

## Safe Answer Behavior

- When asked if public obligations matter only for PR: correct the misconception; 素行 (conduct) evaluation applies to all renewals and changes; PR just has an explicit 2-year rule.
- When asked about late tax payment for 技人国 renewal: do not say "no problem"; frame as a 素行 factor that ISA may consider; recommend professional review if there is a history of delinquency.
- When asked about employer's social insurance failure: confirm that the employee still has a duty to enroll in national health insurance / national pension independently; employer's violation does not excuse the employee.
- When asked about 特定技能 renewal documents: confirm that tax/pension/health insurance documents are mandatory parts of the first table; they serve as public-obligation confirmation.
- Do not predict specific approval/denial outcomes based on delinquency history — route to professional.

## Must Say

- 公的義務（住民税・国税・年金・健康保険）の適正な履行は，永住申請だけでなく，在留期間更新許可申請・在留資格変更許可申請における「素行」評価でも参照される。特定技能1号では申請書類として直接確認される。
- 雇用主が社会保険に加入させなかった場合でも，外国人労働者本人が国民健康保険・国民年金に自ら加入・納付する義務がある。会社の未加入は本人の義務履行免責にはならない。
- 滞納後の事後完済は未納状態よりも評価されるが，遅延の事実は審査に残る可能性がある。特に永住申請（直近2年要件）では，遅延のある期間が「適正な履行」に当たらない場合がある。

## Must Not Say

- 「公的義務の問題は永住申請だけに関係する。」（素行評価は全在留審査に適用）
- 「後から払ったので問題ない。」（遅延の事実は残る可能性がある）
- 「会社が社会保険に入れてくれなかったので自分は関係ない。」（本人の代替加入義務がある）
- 「住民税は更新に関係ない。」（特定技能1号では書類として必要; 他の在留資格でも素行評価の要素）

## Deep Water Triggers

- Person has 2 years of 住民税 delinquency but paid all at once before renewal — safe to apply?
- Person was not enrolled in 国民健康保険 for 3 years because employer said they didn't need it — what is the remediation route?
- Person applied for 免除 on 国民年金 but has some months of 滞納 — how does this affect PR or renewal?
- 特定技能 worker pays 国民健康保険 but has 3 months in arrears — can they use a 誓約書 instead of payment certificate?
- Person's employer went bankrupt, tax records are missing — how to prove 公的義務 compliance?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with tax/pension/insurance delinquency: route to professional for assessment of risk level before renewal; do not advise "it's fine" without professional review.
- For 特定技能 applicants: route to G66 (koshin-shorui-pattern) for the specific documents required; confirm all items in First Table.
- For persons whose employers failed to enroll them in social insurance: route to professional; confirm retroactive enrollment/payment possibility with the company/labor bureau.
- For 永住 applicants with any delinquency: route to G60 for the explicit 2-year requirement; recommend at minimum 2 years of clean compliance before applying.

## Unknown Fields

- The exact weight of single-instance late payment (e.g., one month late on住民税) in 技人国 standard renewal — whether ISA treats this as a routine deduction in素行 or a significant flag.
- The exact ISA practice for evaluating employer-side social insurance failures when the employee claims they tried but couldn't enroll themselves either.
- Whether the "遅延後に全額完済" pattern is explicitly referenced in any ISA guideline for non-PR renewals.

## Needs Domain Flags

- needs_domain (P1): What is the safe framing for single-instance short-delay late payments (e.g.,住民税 1-2 months late) in 技人国 or 経営管理 renewal contexts? Does ISA treat this as a meaningful素行 flag or a routine minor factor?
- needs_domain (P1): When an employer has not enrolled an employee in social insurance and the employee also failed to join 国民健康保険 — how does ISA assess who bears the immigration risk?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| gimu-001 | "住民税を3か月遅れて払いましたが，技人国の更新に問題はありませんか？" | State: 公的義務の履行状況は更新審査の「素行」評価の一要素。後払いで解消されていることは有利だが，遅延の事実は残る可能性がある。専門家（行政書士）に相談を。 |
| gimu-002 | "会社が健康保険に入れてくれなかったのですが，自分は何もしなくていいですか？" | State: 会社の未加入は本人の代替義務免責にならない。国民健康保険に自ら加入・納付する義務がある。未加入・未払いのまま在留更新や永住申請を行うと素行評価のリスクがある。 |
| gimu-003 | "特定技能1号の更新で住民税の証明書が必要なのはなぜですか？" | State: 特定技能1号更新の第1表（全分野共通）で公的義務履行確認のため住民税の納税証明書・課税証明書の提出が必要（G66参照）。公的義務の履行確認は在留審査全体に関わる要素。 |

## Source Notes

- 更新・変更審査での素行評価: ISA「在留資格の変更、在留期間の更新許可のガイドライン」（nyuukokukanri07_00058.html）— G31 cross-ref確認済み.
- 永住の公的義務要件（直近2年明示）: ISA「永住許可に関するガイドライン」（令和6年改定版）— G60 cross-ref確認済み.
- 特定技能1号更新の公的義務書類: G66 cross-ref（ISA specifiedskilledworker.html + Excel checklists 直接確認）.
- 雇用主社会保険未加入と本人義務: G32 cross-ref + 社会保険加入の一般構造（健康保険法・国民健康保険法の強制加入義務）.
- Cross-ref G31 (更新・変更の裁量・素行), G32 (社会保険未加入リスク), G60 (永住公的義務要件), G66 (特定技能更新書類).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 013 G71. Key sources: ISA renewal guideline (G31 cross-ref); ISA PR guideline 令和6年改定版 (G60 cross-ref); G66 cross-ref (特定技能更新書類). Core facts: 公的義務評価はPRだけでなく更新・変更にも適用; 特定技能1号更新では書類として確認; 雇用主未加入は本人免責にならない; 事後完済でも遅延事実は残る可能性. Cross-ref G31, G32, G60, G66.
