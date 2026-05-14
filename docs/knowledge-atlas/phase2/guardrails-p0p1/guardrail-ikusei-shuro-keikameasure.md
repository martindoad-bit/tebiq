---
asset_id: guardrail-ikusei-shuro-keikameasure
title: 技能実習から育成就労への移行と経過措置 — 2027年4月廃止・新制度開始；既存技能実習生は経過措置で継続；新制度は転籍が可能
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 014"
---

## What This Document Is

This guardrail prevents errors about the transition from 技能実習 to 育成就労 (the replacement system starting April 2027). Key errors to block:

1. **"2027年4月に技能実習ビザが無効になる。"** — incorrect. 2027年4月1日に技能実習法が廃止されて育成就労法が施行されるが，既存の技能実習生は経過措置（移行期間）の下で実習を継続できる。技能実習ビザが即日無効になるわけではない。
2. **"育成就労と技能実習は同じ制度で名称変更しただけ。"** — incorrect. 育成就労は技能実習とは異なる制度設計を持ち，特に**転籍（雇用主変更）が可能**になる点が大きな違い。技能実習では原則として転籍ができなかった。
3. **"育成就労が始まったら，自動的に特定技能1号に移行できる。"** — incorrect. 育成就労の修了は特定技能1号の申請要件を充足する可能性があるが，移行は自動ではなく別途在留資格変更許可申請が必要。
4. **"技能実習2号修了者は育成就労の経過措置なしに特定技能1号に移行できる。"** — partially incorrect. 技能実習2号の良好修了者は特定技能1号への試験免除（一部）が適用されるが，育成就労→特定技能1号の移行要件は技能実習→特定技能と異なる可能性がある（移行後の確認が必要）。

## Trigger

Use this card when the user says:

- "技能実習は2027年に廃止されますか？"
- "育成就労と技能実習は何が違いますか？"
- "技能実習ビザを持っていますが，2027年4月以降どうなりますか？"
- "育成就労から特定技能1号に移行するにはどうすればいいですか？"
- "技能実習で転籍はできますか？"
- any pattern treating 技能実習 abolition as immediate loss of status, or treating 育成就労 as an identical replacement to 技能実習.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ikusei-main | L4 | 出入国在留管理庁「育成就労制度について」 | https://www.moj.go.jp/isa/policies/ikusei/index.html | 2026-05-15 | 育成就労制度の概要・施行日（2027年4月1日）・既存技能実習生の経過措置. |
| isa-ikusei-qa | L4 | 出入国在留管理庁「育成就労制度に関するQ&A」 | https://www.moj.go.jp/isa/policies/ikusei/qa.html | 2026-05-15 | 経過措置の内容; 転籍可能条件; 特定技能1号への移行要件. |
| g37-crossref | guardrail | guardrail-ikusei-shuro-ginou-jisshu-haishi (G37) | internal | 2026-05-15 | G37: 技能実習廃止日2027年4月1日確認済み; 経過措置; 転籍1-2年後に可能; 目的=特定技能1号移行. |
| g46-crossref | guardrail | guardrail-ginou-jisshu-tokutei-gino-iten (G46) | internal | 2026-05-15 | G46: 技能実習2号良好修了者の特定技能1号への試験免除（日本語全分野免除; 技能は関連分野のみ）. |

## Official Rule Or Source Fact

**技能実習法廃止と育成就労法施行（G37 cross-ref）:**

- **廃止日**: 技能実習法（外国人の技能実習の適正な実施及び技能実習生の保護に関する法律）: **2027年4月1日** 廃止
- **施行日**: 育成就労法（外国人育成就労機構法）: **2027年4月1日** 施行
- **経過措置**: 2027年4月1日時点で既に技能実習中の者は，経過措置の下で技能実習を継続できる

**技能実習と育成就労の主な違い:**

| 比較項目 | 技能実習 | 育成就労 |
|---|---|---|
| **制度の目的** | 技能の移転（技術・技能・知識の習得） | 人材育成＋特定技能1号への移行 |
| **転籍（雇用主変更）** | 原則として禁止（やむを得ない事情のみ）| **1〜2年後に一定の条件下で可能** |
| **目標資格** | 技能実習修了後に帰国が建前 | **特定技能1号への移行が目的の一つ** |
| **実習期間** | 最長5年（1号1年+2号2年+3号2年）| 最長3年（育成就労から特定技能1号を想定）|
| **主管機関** | 外国人技能実習機構（OTIT）| 外国人育成就労機構（JITCO的役割を担う新機関）|
| **保護体制** | OTIT が監理; 問題があれば転籍困難 | 新機関が管理; 転籍制度で権利強化 |

**経過措置の内容（2027年4月1日時点で技能実習中の場合）:**

- 既存の技能実習生（2027年4月1日時点で在籍中）は，引き続き技能実習として在留を継続できる
- 技能実習の残余期間は技能実習制度の下で完了できる
- 技能実習2号/3号修了後，特定技能1号への移行は引き続き可能（G46 cross-ref）
- 強制的に育成就労制度に切り替えられることはない

**育成就労における転籍（雇用主変更）の要件（G37 cross-ref）:**

育成就労では，一定の条件を満たした後に転籍（雇用主変更）が可能となる:
- **転籍可能時期**: 育成就労開始から1年（特定分野）または2年（通常）経過後
- **転籍の条件**: 同一の業務区分・産業分野内での転籍が原則
- **転籍の手続き**: 育成就労機構を通じた手続き
- これは技能実習との最大の制度的違いの一つ

**育成就労から特定技能1号への移行（G37 cross-ref; G46 cross-ref）:**

育成就労修了後の特定技能1号への移行は，以下の要件確認が必要:
- 育成就労で習得した技能・業務が特定技能1号の対応分野に該当すること
- 在留資格変更許可申請が必要（移行は自動ではない）
- 試験免除要件: 育成就労修了者の試験免除については，技能実習2号修了者と同様の扱いが予定されているが，詳細は needs_domain

**新制度導入後の就労系在留資格の全体像（2027年4月以降）:**

```
  新規入国者:
  → 育成就労（3年間育成）
  → 特定技能1号（技能・分野試験で判断）
  → 特定技能2号（対象分野の試験合格等）

  既存技能実習生（2027年4月1日時点在籍）:
  → 技能実習の残余期間継続（経過措置）
  → 技能実習2号良好修了後 → 特定技能1号（G46参照）
```

**重要な実務的注意点:**

育成就労制度は2026年5月時点ではまだ施行前（施行は2027年4月1日）。以下は現時点での注意事項:
- 制度の詳細は施行前にさらに官式情報が追加される可能性がある
- 経過措置の細則は ISA 公式サイトで随時更新予定
- 施行後の運用実態は経験の蓄積が必要

## Safe Answer Behavior

- When asked if 技能実習 is abolished immediately in April 2027: clarify it's the law abolition, not immediate status loss; existing 技能実習生 continue under transition rules.
- When asked about the differences: highlight the key difference — 転籍 is now possible in 育成就労 after 1-2 years; this was essentially impossible in 技能実習.
- When asked about 育成就労 → 特定技能: confirm the path exists but is not automatic; a formal status change application is required.
- When asked about current 技能実習 holders: confirm they continue under transition rules; route to ISA for the latest guidance.
- Always recommend checking the latest ISA official information given the system is new and guidance may be updated.

## Must Say

- 技能実習法は2027年4月1日に廃止され，育成就労法が施行される。2027年4月1日時点で技能実習中の者は，経過措置として技能実習を継続できる（即日無効にはならない）。
- 育成就労と技能実習の最大の違いは「転籍（雇用主変更）が可能になる」こと。育成就労開始から1〜2年後に，一定条件下で転籍が認められる。
- 育成就労修了から特定技能1号への移行は，在留資格変更許可申請が必要（自動移行ではない）。

## Must Not Say

- 「2027年4月に技能実習ビザが無効になる。」（既存技能実習生は経過措置で継続可）
- 「育成就労と技能実習は名称変更だけで同じ制度。」（転籍可能等の重要な制度的違いがある）
- 「育成就労が終わったら自動的に特定技能1号になる。」（在留資格変更申請が必要）
- 「技能実習中でも転籍ができる。」（技能実習での転籍は原則禁止; 育成就労では1-2年後に可能）

## Deep Water Triggers

- 技能実習3号の途中（2025年入国, 3年目の途中）で2027年4月を迎える — 残りの実習はどうなるか？
- 育成就労で劣悪な環境下にある — 1年前でも転籍の緊急例外はあるか？
- 技能実習2号修了者（2026年修了）が2027年4月以降に特定技能1号を申請する — 育成就労修了者と同じ扱いになるか？
- 育成就労の企業が倒産した — 転籍できる期間（1-2年）前でも転籍できるか？
- 2027年4月以降に来日する外国人労働者（農業分野）は，技能実習でなく育成就労になるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For current 技能実習生 (pre-April 2027): confirm they continue under transition rules; route to ISA for the latest official transition guidance.
- For persons expecting to enter under 育成就労 (post-April 2027): route to ISA 育成就労 page for the latest application guidance; note the 転籍 right as a key new feature.
- For 育成就労 workers in difficult conditions: route to the new 外国人育成就労機構 or labor authority; the 転籍 right after 1-2 years is a key protection.
- For 技能実習2号 修了者 approaching 特定技能1号 transition: route to G46 for the exam exemption rules; route to professional for the status change application.

## Unknown Fields

- The specific documentation and process for 育成就労 → 特定技能1号 status change (trial details and exam exemption criteria are not yet officially confirmed for the new system as of 2026-05-15).
- Whether the 転籍 emergency exception (before 1-2 year mark) for abuse/human rights violations has been officially defined in the implementing regulations.
- How the 外国人育成就労機構 (new supervisory organization) will work in practice — registration, oversight, and complaint procedures.

## Needs Domain Flags

- needs_domain (P1): What are the specific exam exemption conditions for 育成就労 修了者 transitioning to 特定技能1号? Are they the same as for 技能実習2号 良好修了者 (G46)?
- needs_domain (P1): What are the confirmed conditions for the early 転籍 exception (before the 1-2 year mark) in cases of abusive working conditions under 育成就労?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ikusei-001 | "2027年4月に技能実習が廃止されると聞きましたが，現在技能実習中の私はどうなりますか？" | State: 2027年4月1日に技能実習法が廃止されるが，既存の技能実習生は経過措置で技能実習を継続できる。技能実習ビザが即日無効になるわけではない。詳細はISA公式サイト（育成就労制度ページ）で確認を。 |
| ikusei-002 | "育成就労と技能実習は何が違いますか？" | State: 最大の違いは「転籍（雇用主変更）が可能になる」こと。育成就労では1〜2年後に一定条件下で転籍が認められる（技能実習では原則禁止）。制度の目的も「技能移転」から「人材育成+特定技能1号移行」に変わる。 |
| ikusei-003 | "育成就労が終わったら，特定技能1号に自動的に移行できますか？" | State: 自動移行ではない。育成就労修了後，特定技能1号へは在留資格変更許可申請が必要。試験免除等の条件については施行後の官式情報を確認する必要がある。専門家に相談を。 |

## Source Notes

- 育成就労制度の概要・施行日・経過措置: ISA ikusei/index.html（G37 cross-ref確認済み）.
- 技能実習2号修了→特定技能1号試験免除: G46 cross-ref（ISA FAQ 直接確認済み）.
- 育成就労→特定技能1号の移行要件: G37 cross-ref + 現時点では実施前のため詳細は needs_domain.
- 転籍可能条件（1-2年後）: G37 cross-ref（ISA 官式情報から確認）.
- Cross-ref G37 (技能実習廃止・育成就労の基本), G46 (技能実習2号→特定技能1号試験免除条件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 014 G79. Key sources: ISA ikusei/index.html + ikusei/qa.html (G37 cross-ref); G46 cross-ref (試験免除条件). Core facts: 技能実習法廃止2027年4月1日; 既存技能実習生は経過措置継続; 育成就労の最大の違い=転籍（1-2年後）; 育成就労→特定技能1号は在留資格変更申請が必要（自動ではない）. needs_domain P1: 育成就労修了者の試験免除条件; 転籍緊急例外条件. Cross-ref G37, G46.
