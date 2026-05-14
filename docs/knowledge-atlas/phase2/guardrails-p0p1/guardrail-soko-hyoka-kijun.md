---
asset_id: guardrail-soko-hyoka-kijun
title: 在留資格審査における「素行」の評価基準 — 素行は更新・変更・永住申請の審査要因；交通違反・軽微な刑事罰でも否定的に評価されうる；逮捕歴・起訴歴・前科は在留資格審査に影響する；事後の改善行動と説明が重要
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

This guardrail prevents errors about how 素行（conduct/behavior）is evaluated in Japanese immigration applications. Key errors to block:

1. **"交通違反（スピード違反・駐車違反等）は，在留資格審査に影響しない。"** — partially incorrect. 軽微な交通違反（反則金を支払った場合）は通常の審査に大きく影響しないとされるが，重大な交通違反（飲酒運転・無免許・人身事故等）は刑事事件として扱われ，素行評価に明確に影響する。また，複数の軽微な違反の積み重ねも否定的に評価される可能性がある。
2. **"逮捕されたが不起訴になった。在留資格審査には影響しない。"** — incorrect（partially）. 不起訴処分となった場合でも，逮捕・被疑者となった事実が存在する場合，在留資格審査（特に永住申請）で問題となりうる。ISAは申請者の素行を総合的に評価するため，逮捕歴の存在は審査要素となりうる（前科（有罪判決）でない場合でも）。
3. **"懲役刑を受けたが刑期を終えた。永住申請には問題ない。"** — incorrect. 懲役刑（実刑・執行猶予を問わず）を受けた場合，永住申請の「素行善良」要件において否定的な評価となりうる。特に実刑の場合，刑期終了後も一定期間の経過が審査上必要とされる（一般的な実務では5〜10年以上を要するケースも）。
4. **"税金の未払い・年金の未納は素行とは関係ない。"** — incorrect. 公的義務（税・社会保険）の履行状況は，「素行善良」要件の評価要素に含まれる（特に永住申請では直近2年の公的義務適正履行が求められる）（G60/G71参照）。

## Trigger

Use this card when the user says:

- "交通違反を繰り返していますが，ビザの更新に影響しますか？"
- "以前逮捕されたことがあります。永住申請は難しいですか？"
- "執行猶予付き判決を受けました。在留資格に影響しますか？"
- "在留資格審査の「素行」はどのように評価されますか？"
- "犯罪歴がある場合，在留資格変更や永住申請はできますか？"
- any pattern minimizing the immigration impact of criminal records, arrests, or public obligation failures.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-koshin-guideline | L4 | 出入国在留管理庁「在留資格の変更，在留期間の更新許可のガイドライン」 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html | 2026-05-15 | 素行善良要件; 四つの評価要素（素行・生計・活動・在留必要性）; 許可の裁量性. |
| isa-eijuu-guideline | L4 | 出入国在留管理庁「永住許可に関するガイドライン」（令和6年改定版）| https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html | 2026-05-15 | 永住申請の「素行善良」要件; 公的義務の適正履行; 刑事前科の取り扱い. |
| nyukan-ho-24jo | L4 | 入管法第24条（退去強制事由）| https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 退去強制事由: 刑事事件（禁錮以上）; 在留資格取消との関係. |
| g31-crossref | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 更新・変更許可は裁量; 素行・生計・活動の3要素+在留必要性. |
| g60-crossref | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の「素行善良」要件; 直近2年の公的義務適正履行（令和6年改定）. |
| g71-crossref | guardrail | guardrail-kouteki-gimu-koshin-hyoka (G71) | internal | 2026-05-15 | G71: 公的義務（税・年金・保険）は更新・変更の素行評価でも参照される. |

## Official Rule Or Source Fact

**在留資格更新・変更許可のガイドラインにおける「素行」の評価:**

ISAの更新・変更ガイドラインにおいて，許可の判断要素の一つとして「素行善良」が明記されている。

評価の対象:
- **刑事関係**: 前科（禁錮以上・罰金等）の有無; 逮捕・被疑者歴; 執行猶予中か否か
- **行政違反**: 在留資格違反の有無・届出義務の履行状況
- **公的義務**: 税・社会保険・年金の適正な履行状況（G71 cross-ref）

⚠️ **ISA更新ガイドライン明示:** 「すべての要素に該当する場合でも，許可しないこともあります」（ガイドライン直接引用）→ 素行評価は裁量的であり，全要素が良好でも不許可リスクがある（G31 cross-ref）。

**永住申請における「素行善良」要件:**

ISA永住許可ガイドライン（令和6年改定版）では，素行善良要件として:
- **一般要件**: 犯罪等の前科がなく，日常生活においても法律を遵守し，納税義務を適正に履行していること
- **公的義務の適正履行（令和6年改定）**: 直近2年間において，国税・地方税・社会保険・年金等の公的義務を適正に履行していること
- **刑事前科がある場合**: 永住申請において特に慎重な審査が行われる（具体的な経過年数の公式基準は非公表）

**刑事事件の影響（種別ごとの一般的な評価）:**

| 刑事事件の種別 | 素行評価への影響 |
|---|---|
| **禁錮以上の実刑** | 永住申請に対して特に重大な否定的評価; 一定の経過年数が必要（実務では5〜10年以上とされるケースも）|
| **執行猶予付き判決（禁錮・懲役）** | 執行猶予期間中は永住申請困難; 猶予終了後も経過年数が必要とされることが多い |
| **罰金刑** | 内容・金額によって影響度が異なる; 重大な犯罪（薬物・性犯罪等）は永住申請に重大な影響 |
| **不起訴処分** | 法的には有罪ではないが，逮捕・被疑者歴の存在自体が審査要素となる場合がある |
| **交通違反（反則金処理）** | 軽微な反則金処理は一般的に大きな影響なし; ただし複数回・重大な違反は否定的に評価されうる |
| **飲酒運転・無免許・ひき逃げ等** | 道路交通法違反でも刑事事件として扱われ，素行評価に明確に影響 |

**退去強制事由（入管法第24条）との関係:**

禁錮以上の刑事罰（実刑・執行猶予問わず）を受けた場合，退去強制事由（入管法第24条第4号）に該当する可能性があり，在留資格の取消し・退去強制手続きの対象となりうる。ただし，日本人・永住者との婚姻等の特別の事情がある場合，在留特別許可（入管法第50条）が検討されることがある（G21 cross-ref）。

**事後の改善行動の重要性:**

- 過去の素行問題がある場合，事後の法令遵守・公的義務の適正履行・社会貢献等の継続が審査で参酌される場合がある
- 申請書類での正直な申告が重要（虚偽申告は追加の欠格事由となる; G27 cross-ref）
- 複雑なケースでは弁護士・行政書士への相談が不可欠

## Safe Answer Behavior

- When asked about traffic violations: distinguish between 反則金（non-criminal）and 刑事罰（criminal）violations; confirm that serious traffic offenses affect immigration evaluation.
- When asked about arrest/non-prosecution: clearly state that even non-prosecuted arrests can be a factor in immigration evaluation; recommend lawyer consultation.
- When asked about criminal records: confirm that criminal records (especially 禁錮以上) significantly affect immigration applications; acknowledge uncertainty about specific timeframes; route to lawyer.
- When asked about unpaid taxes/insurance: route to G71 for detailed cross-reference; confirm that public obligation compliance is evaluated in 素行.

## Must Say

- 在留資格更新・変更・永住申請における「素行」評価は，刑事前科・逮捕歴・交通違反（重大なもの）・公的義務（税・社会保険）の不履行状況を含む総合的な評価。ISAのガイドラインでは「素行善良」が許可の判断要素の一つとして明記されている。
- 逮捕されたが不起訴になった場合でも，逮捕・被疑者歴の存在が永住申請等の審査において考慮される場合がある。不起訴イコール審査への影響なし，ではない。
- 懲役・禁錮の実刑・執行猶予判決を受けた場合，永住申請には特に慎重な審査が行われ，一定の経過年数が必要とされることが多い。具体的な基準は公表されていないため，弁護士・行政書士に個別に相談することを強く推奨する。

## Must Not Say

- 「交通違反（反則金）は在留資格審査に全く影響しない。」（重大な交通違反や複数回の違反は影響しうる）
- 「逮捕されたが不起訴になったので，在留資格審査に影響しない。」（逮捕歴自体が審査要素になりうる）
- 「刑期を終えれば永住申請に問題ない。」（刑期終了後も一定期間の経過が必要とされることが多い）

## Deep Water Triggers

- 懲役3年（執行猶予5年）の判決から3年経過した — 永住申請は可能か？（具体的な経過年数の基準は非公表; 弁護士・行政書士に相談）
- 在留資格申請書に過去の逮捕歴を記載しなかった — 問題はあるか？（G27: 虚偽申告の罰則; 申請書に該当設問があれば虚偽記載に該当しうる）
- 薬物犯罪（大麻・覚醒剤等）で有罪判決を受けた場合，日本の在留資格にどのような影響があるか？（退去強制事由に該当する可能性が高い; 弁護士に直ちに相談）
- 配偶者（日本人）が刑事事件を起こした場合，外国人配偶者の在留資格審査に影響するか？
- 少年時代（未成年）の前科・逮捕歴は，成人後の在留資格審査に影響するか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with serious criminal records (禁錮以上): route to 弁護士 immediately; do NOT advise on outcome; flag potential deportation risk.
- For persons with minor violations: explain the 反則金（non-criminal）vs 刑事罰 distinction; confirm public obligation compliance; route to 行政書士 for applications.
- For persons with arrest/non-prosecution history: route to 弁護士 for assessment; emphasize uncertainty.
- For persons approaching permanent residency application: route to G60 (PR requirements) and G71 (公的義務評価); recommend 行政書士 for application strategy.

## Unknown Fields

- The specific minimum elapsed time after a criminal conviction that ISA requires before a 永住 application will be considered — this has not been officially published.
- Whether ISA automatically accesses Japanese criminal record databases (前科照会) as part of all immigration applications, or only in certain cases.
- The specific treatment of juvenile criminal records (少年審判の保護処分) in immigration applications.

## Needs Domain Flags

- needs_domain (P1): What is the minimum post-conviction waiting period before ISA will consider a 永住 application favorably? Is there any officially published guidance, or is it entirely case-by-case?
- needs_domain (P1): For persons who were arrested but not prosecuted (불기소처분) — is there official ISA guidance on how arrest history (逮捕歴) is evaluated in renewal, change, and PR applications?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| soko-001 | "交通違反（スピード違反・罰金5万円）で罰金刑を受けました。在留資格の更新に影響しますか？" | State: 罰金刑（刑事罰）を受けた場合，在留資格更新の「素行」評価において考慮される要素となりうる。軽微な罰金刑の影響度は事案によって異なるが，重大な交通違反（飲酒運転・ひき逃げ等）での罰金刑は特に影響が大きい。過去の公的義務の適正な履行，継続的な法令遵守の実績と合わせて行政書士に相談し，申請準備を行うことを推奨する。 |
| soko-002 | "以前会社で横領に関与して逮捕されましたが，不起訴になりました。永住申請できますか？" | State: 不起訴処分であっても，逮捕・被疑者となった事実が永住申請の「素行善良」要件の審査において考慮される場合がある。「不起訴=問題なし」ではなく，ISAは申請者の素行を総合的に評価する。具体的な申請可否は個別の事情によって異なるため，必ず弁護士または行政書士に相談してから申請することを強く推奨する。 |
| soko-003 | "5年前に執行猶予付き懲役判決を受けました。今から永住申請できますか？" | State: 執行猶予付き判決を受けた場合，「素行善良」要件において否定的な評価がなされる可能性がある。執行猶予期間の終了後も，一定の経過年数が必要とされることが多い（具体的な期間の公式基準は公表されていない）。個別の状況（犯罪の内容・刑期・その後の生活状況等）によって審査結果が異なるため，弁護士または行政書士に詳細な状況を説明して相談することを強く推奨する。 |

## Source Notes

- 素行善良要件（更新・変更）: ISA「在留資格の変更，在留期間の更新許可のガイドライン」— 四つの評価要素（素行・生計・活動・在留必要性）; 裁量性（「すべて該当する場合でも許可しないこともある」）.
- 素行善良要件（永住申請）: ISA「永住許可に関するガイドライン」（令和6年改定版）— 犯罪等の前科がなく法律を遵守; 直近2年の公的義務適正履行.
- 退去強制事由（刑事罰との関係）: 入管法第24条第4号（禁錮以上の刑事罰を受けた場合の退去強制事由）.
- 公的義務（税・年金・保険）と素行: G71 cross-ref（公的義務の不履行は更新・変更の素行評価でも参照）; G60 cross-ref（永住申請の直近2年の公的義務適正履行要件）.
- Cross-ref G21 (在留特別許可), G26 (在留資格取消), G27 (申請書の正確性・虚偽申告), G31 (更新・変更の裁量性), G60 (永住申請の基本要件), G71 (公的義務と素行評価).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 021 G112. Wait — renumbering as G112. Key sources: ISA「更新・変更ガイドライン」（素行善良要件の評価要素）; ISA「永住許可ガイドライン」（令和6年改定版）（犯罪前科・公的義務適正履行）; 入管法第24条（退去強制事由）. Core facts: 素行評価=刑事前科・逮捕歴・交通違反（刑事）・公的義務履行状況の総合評価; 不起訴でも逮捕歴は審査要素; 禁錮以上の実刑後は永住申請に一定の経過年数が必要（基準非公表）. needs_domain P1: 懲役後の永住申請の最短経過年数; ISAの逮捕歴照会範囲と不起訴案件の評価方針. Cross-ref G21, G26, G27, G31, G60, G71.
