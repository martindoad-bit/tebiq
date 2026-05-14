---
asset_id: guardrail-tokutei-gino-gyomu-kukubun-iten
title: 特定技能の業務区分間転職 — 同一業務区分内のみ転職可；異なる区分間は在留資格変更が必要；区分共通性は試験等で確認
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

This guardrail prevents errors about the rules governing job changes (転職) for 特定技能1号 holders, particularly regarding the 業務区分 (work category) system. Key errors to block:

1. **"特定技能1号があれば，どんな会社でも転職できる。"** — incorrect. 転職は原則として**同一業務区分内**，または試験等により技能水準の共通性が確認された業務区分間のみ許可される。分野や業務区分が異なる場合は在留資格変更許可申請が必要。
2. **"特定技能1号の転職は，同じ産業分野なら大丈夫。"** — partially incorrect. 同一分野内の業務変更であっても，業務区分が異なる場合は届出が必要な場合と変更申請が必要な場合がある（ISA FAQ Q36）。
3. **"試験に合格していれば，特定技能の分野を超えて転職できる。"** — partially incorrect. 分野を超えた転職（例: 飲食料品製造業 → 介護）は在留資格変更許可申請が必要。試験合格は資格変更の条件の一つであり，転職の自動的な許可ではない。
4. **"特定技能の転職に届出は必要ない。"** — incorrect. 所属機関の変更があった場合，ISAへの届出（14日以内）が必要（G29 cross-ref）。分野・業務区分が変わる場合は在留資格変更許可申請が必要。

## Trigger

Use this card when the user says:

- "特定技能1号で別の会社に転職できますか？"
- "特定技能のまま，飲食業から介護の仕事に変わることはできますか？"
- "同じ分野なら特定技能で自由に転職できますか？"
- "特定技能の転職で，在留資格変更は必要ですか？"
- "業務区分の共通性があれば，試験なしで転職できますか？"
- any pattern treating 特定技能 as a general work visa permitting free sector-crossing job changes.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-faq | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」 | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | Q13: 転職可能な範囲（同一業務区分内または技能水準共通性確認済み区分間）. Q36: 同一分野内業務変更→届出; 異分野→在留資格変更. |
| g51-crossref | guardrail | guardrail-tokutei-gino-tenshoku-joken (G51) | internal | 2026-05-15 | G51: 転職=同一業務区分内 or 技能水準共通性確認済み区分間のみ; Q13+Q36確認済み. |
| g29-crossref | guardrail | guardrail-todoke-gimu-ihan-kekka (G29) | internal | 2026-05-15 | G29: 所属機関変更は14日以内に届出義務; 届出違反の罰則. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号の16分野; 2024-03-29閣議決定で4分野追加; 複数雇用主は禁止. |
| isa-ssw-bunya | L4 | 出入国在留管理庁「特定技能の分野・業務区分」各分野ページ | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00147.html | 2026-05-15 | 各分野の業務区分一覧が分野別に規定されていることを確認. |

## Official Rule Or Source Fact

**特定技能1号の転職ルール（ISA FAQ Q13 — G51 cross-ref）:**

ISA「特定技能制度に関するQ&A」Q13に以下の規定がある:

> 「特定技能外国人が転職する場合には，同一の業務区分内又は試験等によりその技能水準の共通性が確認されている業務区分間においてのみ，転職することができます。」

つまり転職が認められるのは2つのケースのみ:
1. **同一業務区分内**: 同じ業務区分で異なる雇用主（同一区分内の転職）
2. **技能水準共通性が確認された区分間**: 異なる業務区分でも，試験等で共通性が認定された区分間（例: 素形材・産業機械・電気電子情報関連製造業の相互間）

**分野内業務変更 vs 分野間変更（ISA FAQ Q36 — G51 cross-ref）:**

> 同一分野内の業務変更 → **届出**（在留資格変更許可申請は不要の場合あり）
> 異なる分野への変更 → **在留資格変更許可申請**が必要

**特定技能の業務区分の構造（主要分野の例）:**

| 分野 | 主な業務区分の例（概要）|
|---|---|
| 介護 | 介護（単一区分） |
| ビルクリーニング | ビルクリーニング（単一区分） |
| 工業製品製造業 | 素形材・産業機械・電気電子情報関連製造業の3区分（相互に共通性あり） |
| 建設 | 土木・建築・ライフライン・設備等の区分 |
| 造船・舶用工業 | 溶接・塗装・機械加工等の区分 |
| 自動車整備 | 自動車整備（単一区分） |
| 航空 | 空港グランドハンドリング・航空機整備の2区分 |
| 宿泊 | 宿泊（単一区分） |
| 農業 | 耕種農業・畜産農業の2区分 |
| 漁業 | 漁業・養殖業の2区分 |
| 飲食料品製造業 | 飲食料品製造業（単一区分） |
| 外食業 | 外食業（単一区分） |

**技能水準共通性が確認されている区分間（例）:**

工業製品製造業（旧: 製造業3分野 — 素形材/産業機械/電気電子情報関連）については，業務区分の相互間で技能水準共通性が確認されており，この3区分間での転職は試験不要で可能とされている。他の分野間については officially 確認された共通性リストの詳細は needs_domain。

**転職時の手続きフロー:**

```
① 同一業務区分内の雇用主変更（例: 介護施設A → 介護施設B）
   → 所属機関変更届出（14日以内）のみ
   → 在留資格変更申請は不要

② 同一分野・異なる業務区分（例: 工業製品製造業の素形材 → 産業機械）
   → 技能水準共通性の確認が必要
   → 共通性確認済みであれば転職可能（届出）
   → 共通性未確認であれば在留資格変更許可申請

③ 異なる分野への転職（例: 飲食料品製造業 → 宿泊）
   → 在留資格変更許可申請が必要
   → 新たな分野の特定技能1号の技能試験合格証等が必要
```

**雇用主の倒産・閉業の場合:**

雇用主が倒産・閉業した場合，特定技能1号保有者は:
- 在留資格を失わないが，所属機関のない状態は在留資格取消リスクにつながりうる（G26 cross-ref）
- 同一業務区分内での転職先を早急に探す必要がある
- 転職の間の「待機期間」については officially 許容される期間が needs_domain

**複数雇用主の禁止（G33 cross-ref）:**

特定技能1号は複数の雇用主での同時就労は禁止されている。転職は1社から1社への変更であり，複数の会社での掛け持ち就労は許可されていない。

## Safe Answer Behavior

- When asked if any job change is OK for 特定技能: explain the 業務区分 system immediately; ask what sector the person is currently in and what sector they want to move to.
- When asked about same-sector transfers: confirm this is generally permissible within the same 業務区分; remind of the 14-day notification obligation.
- When asked about cross-sector transfers (e.g., food manufacturing to nursing care): confirm that 在留資格変更許可申請 is required; a new exam in the target sector may be needed.
- When asked about employer bankruptcy: explain the urgency of finding a new employer within the same 業務区分; route to professional.
- Do not confirm specific cross-category 共通性 unless it is officially established (manufacturing 3 sectors); route to professional for others.

## Must Say

- 特定技能1号保有者の転職は，「同一業務区分内」または「試験等で技能水準共通性が確認された業務区分間」に限られる。異なる分野への転職は在留資格変更許可申請が必要。
- 転職（所属機関の変更）があった場合，ISAへの届出を14日以内に行う義務がある（G29参照）。
- 分野を超える転職（例: 介護から飲食料品製造業）は，新分野の在留資格変更許可申請が必要。新たな技能試験合格証等が求められる場合がある。

## Must Not Say

- 「特定技能1号があればどんな業種でも転職できる。」（業務区分の制限がある）
- 「同じ産業分野なら自由に転職できる。」（業務区分が違う場合は届出または変更申請が必要）
- 「試験に合格すれば分野を越えて自動的に働ける。」（在留資格変更許可申請が別途必要）
- 「転職に届出は必要ない。」（所属機関変更は14日以内の届出義務あり）

## Deep Water Triggers

- 特定技能（飲食料品製造業）の外国人が宿泊施設での仕事に転職したい — 在留資格変更後，新たな試験は必要か？
- 特定技能（工業製品製造業・素形材）の外国人が電気電子情報関連製造業に転職したい — 業務区分共通性は確認されているか？
- 特定技能保有者の雇用主が突然倒産した — 次の仕事が見つかるまでどのくらいの期間が許容されるか？
- 特定技能（農業・耕種農業）保有者が畜産農業に転職したい — 同一分野内の別区分への転職手続きは？
- 特定技能1号から在留資格変更（新分野）申請中に前の雇用主を退職していいか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For same-sector job changes: confirm permissibility within same 業務区分; remind of 14-day notification; route to professional for contract review.
- For cross-sector job changes: route to ISA 在留資格変更許可申請 procedure; confirm whether new sector exam is needed.
- For workers whose employer closed: route to professional urgently; explain the importance of finding new in-sector employment quickly to avoid status issues.
- For all 転職 cases: confirm the 14-day notification to ISA; route to G29 for notification procedure.

## Unknown Fields

- The complete official list of all 業務区分 combinations where 技能水準共通性 has been officially certified (beyond the manufacturing 3 sectors).
- The officially permitted gap period between employers during a job change without triggering in-activity status concerns.
- Whether there is an official ISA position on the specific application required for 同一分野・異業務区分 transfers where 共通性 is not yet confirmed.

## Needs Domain Flags

- needs_domain (P1): What is the complete official ISA mapping of 業務区分 combinations where 技能水準共通性 has been officially confirmed? Without this list, TEBIQ cannot confirm cross-category transferability beyond the manufacturing 3 sectors.
- needs_domain (P1): What is the maximum permissible gap between leaving one 特定技能 employer and starting with a new employer before the non-activity period triggers in-activity status issues?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kukubun-001 | "特定技能（介護）で働いていますが，飲食料品製造業の会社に転職できますか？" | State: 分野が異なるため（介護→飲食料品製造業），在留資格変更許可申請が必要。転職は同一業務区分内または技能水準共通性確認済み区分間のみが原則（G51参照）。新分野の試験合格証等が必要になる可能性がある。専門家に相談を。 |
| kukubun-002 | "特定技能（飲食料品製造業）で同じ業種の別の会社に転職しました。在留資格変更は必要ですか？" | State: 同一業務区分内の転職（同じ飲食料品製造業）であれば，在留資格変更許可申請は不要。ただし所属機関変更の届出をISAに14日以内に行う義務がある（G29参照）。 |
| kukubun-003 | "工業製品製造業（素形材）の特定技能で，電気電子情報関連製造業に転職できますか？" | State: 工業製品製造業の3業務区分（素形材・産業機械・電気電子情報関連製造業）の間は技能水準共通性が確認されている。区分内の転職として処理できる可能性があるが，手続きの詳細は専門家に確認を。 |

## Source Notes

- 転職可能範囲（同一業務区分内 or 共通性確認済み区分間）: ISA FAQ Q13（G51 cross-ref確認済み）.
- 同一分野内業務変更→届出; 異分野→変更申請: ISA FAQ Q36（G51 cross-ref確認済み）.
- 所属機関変更の14日以内届出義務: G29 cross-ref.
- 業務区分一覧の構造: ISA 特定技能 分野別ページ（nyuukokukanri07_00147.html等）.
- 工業製品製造業3区分の共通性: ISA官式情報から構造的に確認（3分野統合の経緯から）.
- Cross-ref G29 (所属機関変更届出), G33 (特定技能分野・複数雇用主禁止), G51 (転職条件 Q13/Q36), G26 (活動非実施の取消リスク).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 013 G73. Key sources: ISA FAQ Q13+Q36 (G51 cross-ref直接確認); 特定技能業務区分構造の一般確認. Core facts: 転職=同一業務区分内 or 共通性確認済み区分間のみ; 異分野=在留資格変更申請必要; 所属機関変更は14日以内届出; 複数雇用主禁止. needs_domain P1: 完全な業務区分共通性マッピング未確認. Cross-ref G29, G33, G51, G26.
