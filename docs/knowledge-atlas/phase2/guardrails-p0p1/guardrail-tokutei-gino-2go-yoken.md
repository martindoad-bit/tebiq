---
asset_id: guardrail-tokutei-gino-2go-yoken
title: 特定技能2号の対象分野と要件 — 特定技能2号は全分野対象ではなく確定した対象分野がある；特定技能1号からの自動昇格ではなく別途試験・申請が必要；特定技能2号は在留期間上限なし・家族帯同可；1号の5年経過後は2号申請か帰国・他資格変更の3択
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 023"
---

## What This Document Is

This guardrail prevents errors about the 特定技能2号 system, its eligible sectors, and how it relates to 特定技能1号. Key errors to block:

1. **"特定技能1号で5年働けば，自動的に特定技能2号になる。"** — incorrect. 特定技能2号への移行は自動ではなく，別途の試験合格・在留資格変更申請が必要。特定技能1号での5年経過は，2号申請の機会を与えるものではあるが，2号への「自動昇格」ではない。
2. **"特定技能2号はすべての分野で取得できる。"** — incorrect. 特定技能2号の対象分野は，2023年の制度拡大により増えたが，すべての特定技能1号対象分野が2号に対応しているわけではない（2026年5月現在の対象分野を確認が必要）。
3. **"特定技能2号を取れば永住と同じ。"** — incorrect. 特定技能2号は在留期間の上限がなく（更新可能）家族帯同も可能だが，活動制限（特定技能2号の業務範囲内での就労が原則）があり，永住者の「一切の活動」許容とは異なる。また，特定技能2号の在留歴は永住申請の在留期間要件に算入されうるが，自動的に永住を付与するわけではない。
4. **"特定技能1号の5年が終わったら，何もしなくても在留できる。"** — incorrect. 特定技能1号の通算5年に達した後は: ①特定技能2号へ変更; ②他の就労資格（技人国等）へ変更; ③帰国，のいずれかを選択する必要がある。何もしなければ在留根拠がなくなる。

## Trigger

Use this card when the user says:

- "特定技能1号で5年経ったら，自動的に2号になりますか？"
- "特定技能2号はどの仕事なら取れますか？"
- "特定技能2号を取ったら，永住と同じですか？"
- "特定技能1号の5年が終わったら，どうすればいいですか？"
- "特定技能2号は家族を呼べますか？"
- any pattern suggesting that 特定技能2号 is automatic, covers all sectors, or is equivalent to permanent residency.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| tokutei-gino-2go-isa | L4 | 出入国在留管理庁「特定技能2号の対象分野」 | https://www.moj.go.jp/isa/content/001395002.pdf | 2026-05-15 | 特定技能2号の対象分野（2023年改正後）; 2号の要件・在留期間・家族帯同の概要. |
| tokutei-gino-bepyo | L2 | 特定技能基準省令・分野別省令 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00002.html | 2026-05-15 | 特定技能1号・2号の分野区分; 各分野での業務区分・要件. |
| g33-1go-2go | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号→2号は自動移行ではない; 1号家族帯同不可; 2号=11分野（2023年拡大前）の確認. |
| g77-tsusanzairyu | guardrail | guardrail-tokutei-gino-tsusanzairyu-5nen (G77) | internal | 2026-05-15 | G77: 特定技能1号=通算5年上限; 5年到達後のルート（2号移行・他資格変更・帰国）. |
| g60-eijuu | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の基本要件; 特定技能2号の在留歴が永住申請に算入されるかの文脈. |

## Official Rule Or Source Fact

**特定技能2号の対象分野（2023年拡大後）:**

2023年6月の閣議決定により，特定技能2号の対象分野が大幅に拡大された:

対象分野（2023年拡大後の確定分野; 2026年5月現在）:
1. 建設
2. 造船・舶用工業
3. 自動車整備
4. 航空
5. 宿泊
6. 介護
7. ビルクリーニング
8. 素形材・産業機械・電気電子情報関連製造業（工業製品製造業）
9. 建築物清掃業（ビルメンテナンス）
10. 農業
11. 漁業
12. 飲食料品製造業
13. 外食業
14. 造園

→ 特定技能1号の16分野すべてが2号対象ではない（現時点での対象分野の最新リストはISAで確認要）

**特定技能2号の要件:**

- **技能試験**: 各分野の特定技能2号試験（1号試験より難易度が高い; 監督者レベルの技術・知識）
- **日本語試験**: 2号は一般的に日本語試験が不要（1号は必要）
- **申請手続**: 1号→2号は「在留資格変更許可申請」が必要（自動昇格なし）

**特定技能2号の主な優遇事項:**

- **在留期間上限**: なし（更新可能）
- **家族帯同**: 可（配偶者・子への家族滞在資格付与が可能）← 1号との最大の違い
- **複数回更新**: 制限なく更新可能（永住申請の在留歴としての活用も可能）

**特定技能2号と永住との違い:**

- 特定技能2号: 特定技能2号の業務区分内での就労が原則（活動制限あり）
- 永住者: 活動制限なし（「一切の活動」可）
- 特定技能2号の在留歴: 永住申請の在留期間要件（10年）に算入されうるが，永住申請には別途の条件（素行・生計・国益）を充足する必要がある（G60参照）

**特定技能1号の5年経過後の選択肢:**

1. **特定技能2号へ変更**: 分野の2号試験に合格し，在留資格変更許可申請
2. **他の就労資格（技人国・介護等）へ変更**: 別の在留資格の要件を充足している場合
3. **帰国**: 5年到達後，在留根拠がなくなれば帰国が必要
4. **永住申請**: 10年以上の在留歴（特定技能1号の期間算入）等の要件を充足している場合，永住申請も選択肢（ただし1号の5年だけでは通常10年要件を満たさない）

**特定技能1号→2号への移行のタイミング:**

- 1号の5年上限を「使い切る前」に2号の試験合格・変更申請を行うことが重要
- 5年経過後に在留根拠がない状態で申請することは，在留状況の問題が生じる
- 試験の受験機会・日程を早期から確認し，計画的な受験が必要

## Safe Answer Behavior

- When asked about automatic transition to 特定技能2号: clearly state it is NOT automatic; a separate exam and application are required.
- When asked about eligible sectors: confirm that not all 16 一号 sectors have 2号; provide the current list with the caveat to verify with ISA for the latest; flag that the list expanded in 2023.
- When asked about 2号 vs PR: explain key differences (activity restriction vs. none; need for further PR application); do not equate the two.
- When asked about what to do after 1号 5 years: clearly lay out the three main options (2号, other visa, return); emphasize the importance of planning before the 5-year mark.

## Must Say

- 特定技能2号は特定技能1号からの自動昇格ではなく，分野別の2号試験に合格し，在留資格変更許可申請をする必要がある。
- 特定技能2号は在留期間上限なし・家族帯同可だが，永住者と異なり活動制限がある。
- 特定技能1号の通算5年に達した後は，2号変更・他資格変更・帰国のいずれかが必要。

## Must Not Say

- 「特定技能1号で5年働けば，自動的に2号になる。」（自動移行なし）
- 「特定技能2号を取れば永住と同じ。」（活動制限がある点で異なる）
- 「特定技能2号はどの仕事でも取れる。」（対象分野が限定されている）

## Deep Water Triggers

- 特定技能2号の試験が実施されていない分野での，実質的な2号移行経路の現状（2026年時点での分野別試験の実施状況）
- 特定技能1号の5年上限に対して，途中での在留資格変更（技人国等）が「特定技能の通算」をリセットするかどうか
- 特定技能2号の在留期間更新回数の制限（「上限なし」の意味；何年毎の更新が実務上求められるか）
- 特定技能2号保持者が会社を変える（転職）場合の手続きと条件（G51・G73と同様の転職ルール）
- 特定技能2号の在留歴を使った永住申請の具体的な計算方法（特定技能1号の5年+2号の5年で10年達成等）

## User Next Actions

This is not user-facing copy. For answer routing:

- For 特定技能1号 holders approaching the 5-year limit: route to sector-specific 特定技能2号 exam information; route to ISA for status change procedures; flag the timeline urgency.
- For persons asking about eligible sectors: route to ISA's official 特定技能2号 sector list; note that the list was expanded in 2023 and verify the latest from ISA.
- For persons comparing 2号 to PR: explain the practical differences; if PR is the goal, explain that 10-year residence requirement applies and 特定技能1号 period counts toward it.
- For persons in sectors without 2号 availability: explain that they must transition to another status (技人国 if qualified) or return home after 1号 5-year limit.

## Unknown Fields

- The specific sectors where 特定技能2号 trials/examinations have already been conducted and where they are still being developed (as of 2026-05-15).
- Whether 特定技能1号 periods accumulated before the system's 2019 launch or from extensions count toward the 10-year PR residency requirement.

## Needs Domain Flags

- needs_domain (P1): For sectors where 特定技能2号 is officially listed as an eligible sector but where the actual exam has not yet been implemented — what is the practical route for persons who have completed 特定技能1号's 5-year period in those sectors and wish to remain in Japan?
- needs_domain (P1): Does the 10-year residence period requirement for 永住 include the years spent in 特定技能1号 and 特定技能2号, and is there an ISA official confirmation of this counting method for PR applications?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| 2go-001 | "特定技能1号で5年働いたら，自動的に2号になりますか？" | State: 特定技能2号は自動昇格ではない。分野ごとの特定技能2号の技能試験に合格し，在留資格変更許可申請をする必要がある。5年の間に計画的に試験を受験し，1号の期間が終了する前に2号への変更申請を完了させることが重要。 |
| 2go-002 | "特定技能2号を取れば，永住と同じですか？" | State: 特定技能2号は在留期間上限なし・家族帯同可だが，永住者（活動制限なし）とは異なり，特定技能2号の業務範囲内での就労が原則。永住取得には別途，永住許可申請（素行・生計・国益の要件）が必要。特定技能2号の在留歴は永住申請の10年居住要件に算入されうる。 |
| 2go-003 | "特定技能1号の5年が終わりそうです。どうすればいいですか？" | State: 特定技能1号の通算5年に達した後は: ①特定技能2号への在留資格変更（分野の2号試験に合格が必要）; ②他の就労資格（技人国・介護等）への変更（要件を充足する場合）; ③帰国，のいずれかを選択する必要がある。5年到達前に計画的に次のステップを準備することが重要。行政書士・弁護士に相談することを推奨。 |

## Source Notes

- 特定技能2号の対象分野: ISA「特定技能2号の対象分野」PDF（2023年6月の閣議決定で大幅拡大）.
- 特定技能基準省令・分野別省令: 1号・2号の分野区分・要件.
- G33 cross-ref（1号→2号は自動移行なし; 1号家族帯同不可）.
- G77 cross-ref（特定技能1号の通算5年上限と5年後のルート）.
- G60 cross-ref（永住申請の基本要件）.
- Cross-ref G33（特定技能1号・2号の境界），G51（特定技能の転職），G63（特定技能の分野別試験），G73（業務区分間の移行），G77（通算5年上限）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 023 G124. Key sources: ISA「特定技能2号の対象分野」PDF（2023年6月閣議決定後の対象分野拡大）; 特定技能基準省令. Core facts: 特定技能2号=自動昇格なし（別途試験・変更申請必要）; 2023年に対象分野が大幅拡大（16分野中多数が対象; 全分野ではない）; 在留期間上限なし・家族帯同可（1号との最大の違い）; 永住とは活動制限の点で異なる; 1号の5年後=2号変更・他資格・帰国の3択. needs_domain P1: 試験未実施分野での実質的な2号移行経路; 特定技能の在留歴と永住申請の10年要件. Cross-ref G33, G51, G63, G73, G77.
