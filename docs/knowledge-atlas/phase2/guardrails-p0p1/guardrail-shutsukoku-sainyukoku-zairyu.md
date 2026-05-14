---
asset_id: guardrail-shutsukoku-sainyukoku-zairyu
title: 在留中の出国・再入国管理 — 出国中も在留期間は進行；みなし再入国1年以内；正規再入国許可は最長5年
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 011"
---

## What This Document Is

This guardrail prevents errors about the rules for leaving and re-entering Japan while holding a 在留資格. Key errors to block:

1. **"出国中は在留期間が止まる（停止する）。"** — critically incorrect. 在留期間は出国中も進行し続ける。海外滞在中に在留期間が満了すれば，帰国時に新たな在留資格取得が必要になる。
2. **"みなし再入国許可（Special Re-entry Permission）があれば，何年でも海外にいられる。"** — incorrect. みなし再入国許可の上限は**出国日から1年以内**。在留期間満了日が1年以内であれば，そちらが先に到来する（G19 cross-ref）。
3. **"再入国許可を取れば在留期間が延びる。"** — incorrect. 再入国許可は「帰ってきても在留資格を維持できる」という許可であり，在留期間自体を延長するものではない。
4. **"日本を出国したら，在留資格は自動的に消える。"** — incorrect. 有効な在留資格を保有した状態で出国した場合，みなし再入国許可または正規再入国許可を取得していれば，在留資格は維持される。

## Trigger

Use this card when the user says:

- "日本を出国している間，在留期間は止まりますか？"
- "海外出張で3か月日本を離れる予定です。在留資格は大丈夫ですか？"
- "みなし再入国許可で何年海外にいられますか？"
- "再入国許可を取れば在留期間が伸びますか？"
- "日本を出国したら，ビザ（在留資格）はどうなりますか？"
- any pattern treating 在留期間 as paused during overseas stays, or conflating re-entry permission with period extension.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-26jo | L1 | 出入国管理及び難民認定法 第26条・第26条の2 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 再入国許可の定義（第26条）: 在留資格を保持したまま出国・再入国することを許可する制度. みなし再入国許可（第26条の2）: 出国日から1年以内に帰国する場合に許可不要. |
| isa-sainyukoku | L4 | 出入国在留管理庁「再入国許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-5.html | 2026-05-15 | みなし: 1年以内; 正規再入国許可: 最長5年（在留期間内）; 短期滞在・3か月以下の在留資格者はみなし対象外. Used for G19 cross-ref. |
| g19-crossref | guardrail | guardrail-minashi-sainyukoku-one-year-limit (G19) | internal | 2026-05-15 | G19 core fact: みなし再入国許可の1年上限（直接引用確認済み）. 永住 status も1年で失効. 短期滞在除外. |
| g1-crossref | guardrail | guardrail-special-period-two-month-boundary (G1) | internal | 2026-05-15 | G1: 在留期間満了前申請で特例期間が発生するが，これは国内申請に限る。海外在住中の特例期間は原則として生じない。 |

## Official Rule Or Source Fact

**在留期間の進行（出国中も経過）:**
在留期間は在日・出国問わず一律に経過する（時計は止まらない）。
- 在留期間満了日 = 帰国のデッドラインを意味する
- 海外出張・長期出国で在留期間満了が近づいた場合: 帰国後すぐに更新申請が必要
- 帰国前に在留期間が満了した場合: 新たな在留資格認定証明書（CoE）が必要（= 一から再申請）

**みなし再入国許可（入管法 第26条の2）:**
有効な在留資格を保有し，かつ再入国の意図がある者が出国する場合，以下の条件で許可不要:
- 出国日から**1年以内**に帰国すること（確認：G19 cross-ref 官式直接引用）
- 在留期間が1年以内に満了する場合は，**満了日が優先**（在留期間 < 1年 → 在留期間が実質的な上限）
- 対象外: 短期滞在・3か月以下の在留資格者・特別永住者を除く

みなし再入国許可の仕組み:
- 出国時に「みなし再入国許可」を選択（一般的に空港でパスポートへのスタンプや選択が行われる）
- 帰国先の在留資格は維持される（ただし期間は進行し続ける）

**正規再入国許可（入管法 第26条）:**
長期出国（1年超の予定）や将来の再入国を確実にしたい場合は，事前に正規再入国許可を取得する:
- 有効期間: **最長5年**（ただし在留期間を超えることはできない）
- 申請場所: ISA（出国前に申請）または在外公館（一部）
- 1回用と数次用（複数回帰国可能）がある

正規再入国許可と在留期間の関係:
| | 正規再入国許可 | みなし再入国許可 |
|---|---|---|
| 最長期間 | 5年（在留期間内） | 1年 |
| 在留期間延長効果 | **なし** | **なし** |
| 取得場所 | ISA（出国前）| 出国時（自動） |

**重要: 再入国許可≠在留期間延長:**
再入国許可は「帰ってきた時に在留資格を維持する権利」を保障するものであり，**在留期間そのものを延長する機能はない**。

例:
- 在留期間満了: 2026年8月31日
- 2026年6月に出国（正規再入国許可: 5年有効 → 2031年6月まで）
- 2026年9月に帰国した場合 → 在留期間は8月31日で満了済み → 在留資格は維持されない（再入国許可があっても無効）

**出国中の在留更新申請はできない:**
在留期間の更新申請は日本国内に在住していることが前提。出国中に更新申請を提出することは原則できない。
- 在留期間満了が近い状態で出国する場合: 帰国後に申請する時間的余裕があるか確認が必要
- 海外にいる間に在留期間が満了する場合: 帰国できなくなるリスク

**永住者の出国:**
永住者も みなし再入国許可の1年ルールが適用される（G19 cross-ref）。1年を超えて海外在住する場合は正規再入国許可が必要。なお永住者の在留期間はないが（「永住者」の在留資格自体は無期限）、在留カードの有効期限は別途管理が必要（G22 cross-ref）。

## Safe Answer Behavior

- When asked if 在留期間 pauses during overseas stay: firmly correct — 在留期間は出国中も進行し続ける。
- When asked about みなし再入国 duration: confirm 1 year from departure (or 在留期間 expiry, whichever comes first).
- When asked if re-entry permission extends 在留期間: clarify it does NOT extend the period; it only preserves the right to return within the period.
- When asked about long overseas stays: advise to calculate 在留期間 expiry carefully; if there is a risk of expiry during absence, recommend renewal before departure or route to professional.

## Must Say

- 在留期間は日本を出国中も経過し続ける。海外滞在中に在留期間が満了した場合，帰国時に在留資格を維持できない（新たな手続きが必要）。
- みなし再入国許可は，出国日から**1年以内**に帰国する場合に有効。在留期間が1年未満の場合は，在留期間の満了日が実質的な帰国期限になる（G19参照）。
- 再入国許可（みなし・正規いずれも）は在留期間を延長するものではない。帰国時に在留期間が残っていることが条件。
- 長期出国を予定している場合，出国前に在留期間の満了日を確認し，必要であれば更新申請を済ませてから出国することが重要。

## Must Not Say

- 「出国中は在留期間が止まる（停止する）。」
- 「みなし再入国許可があれば，何年でも海外にいられる。」（1年上限）
- 「再入国許可を取れば在留期間が延びる。」（延長効果なし）
- 「出国したら在留資格は自動的になくなる。」（みなし/正規再入国許可の範囲内で維持される）

## Deep Water Triggers

- Person has 在留期間残り9か月で海外出張10か月の予定 — what are the options?
- 永住者が1年3か月間日本を離れる場合 — what happens to their status?
- Person is outside Japan and 在留期間が今日満了した — can they still return?
- Person has a 正規再入国許可（5年有効）but has been abroad for 3 years — can they return to their original 在留資格?
- 在留期間更新申請中（特例期間中）に出国した場合 — what happens?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons planning long overseas stays with 在留期間 close to expiry: advise to calculate dates carefully; if expiry will occur during absence, renewal before departure or CoE route upon return; route to professional.
- For 永住者 planning 1+ year absence: confirm the need for regular re-entry permission (not みなし); route to ISA or professional.
- For persons already abroad with 在留期間 expired: route to professional immediately; return and reapplication may require CoE process (G43 cross-ref).
- For 特例期間中に出国: clarify the 特例期間 ends (G1 cross-ref details needed); route to professional for timing-specific advice.

## Unknown Fields

- Whether the 特例期間 (during a pending renewal application) continues if the applicant departs Japan temporarily — this is a significant gray area.
- The ISA practice for 永住者 who overstay the 1-year みなし limit abroad and attempt return — whether consular procedures exist.

## Needs Domain Flags

- needs_domain (P1): does the 特例期間 (special period during a pending renewal application) continue if the applicant makes a brief overseas trip during the review period? If the 特例期間 terminates upon departure, the applicant would be returning without a valid status.
- needs_domain (P1): for a 永住者 who has been overseas 1+ years (みなし期限超過) — what is the actual re-entry process? Is there a consular procedure to restore the 永住 status, or is the status lost permanently?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shutsukoku-001 | "海外出張で6か月離れます。在留期間は止まりますか？" | State: NO — 在留期間は出国中も経過する。帰国時に在留期間が残っているか確認が必要。みなし再入国許可の1年ルール内であれば在留資格は維持される。 |
| shutsukoku-002 | "みなし再入国許可で何年でも海外にいられますか？" | State: NO — みなし再入国許可は出国日から1年以内が上限（G19参照）。1年を超える出国は正規再入国許可の取得が必要。いずれも在留期間は延長されない。 |
| shutsukoku-003 | "再入国許可を取れば在留期間が延びますか？" | State: NO — 再入国許可は在留期間を延長するものではない。帰国した時点で在留期間内であることが条件。在留期間の延長は別途更新申請が必要。 |

## Source Notes

- 在留期間の進行（出国中も経過）は 入管法の在留期間規定（第20条・第21条）の解釈上の原則; 「停止」の規定は存在しない。
- みなし再入国許可の1年上限: G19 cross-ref（ISA 16-5.html から直接引用確認済み）. 在留期間 < 1年の場合は在留期間が先に到来する原則も G19 で確認。
- 正規再入国許可（最長5年）confirmed from 入管法 第26条 + ISA 16-5.html (G19 cross-ref source).
- 「再入国許可 ≠ 在留期間延長」は入管法の構造から必然（第26条は出国・再入国の権利を認めるもの; 在留期間の変更は別規定第21条による更新許可申請が必要）.
- 出国中の更新申請不可 = 国内在住要件は ISA 申請手続きの一般的要件（申請人自身の出頭または取次が必要）。
- Cross-ref G19 (みなし再入国1年上限), G1 (特例期間 — 出国との交差は needs_domain), G22 (在留カード有効期限 — 永住者の別途管理義務), G43 (CoE — 在留資格を失った場合の再入国手続き).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 011 G65. Key sources: 入管法 第26条・第26条の2（再入国許可・みなし再入国許可）; ISA 16-5.html （G19 cross-ref). Core facts: 在留期間は出国中も進行; みなし=1年; 正規=最長5年（在留期間内）; 再入国許可≠期間延長. Cross-ref G19, G1, G22, G43.
