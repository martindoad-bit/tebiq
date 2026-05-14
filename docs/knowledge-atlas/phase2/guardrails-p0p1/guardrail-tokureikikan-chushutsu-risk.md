---
asset_id: guardrail-tokureikikan-chushutsu-risk
title: 特例期間中の出国リスク — 在留期間内に申請した場合のみ特例期間が発生；特例期間中に出国すると特例期間が終了し不法在留リスクが生じる
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 017"
---

## What This Document Is

This guardrail prevents errors about the legal consequences of departing Japan during the 特例期間 (special period during pending immigration application). Key errors to block:

1. **"申請中（特例期間中）に出国しても，申請は継続する。"** — incorrect. 特例期間中に出国した場合，**特例期間は出国の時点で終了**する。帰国後は在留資格がない状態となる（または在留資格が消滅した状態で入国することになる）。
2. **"特例期間中はみなし再入国許可で出国できる。"** — partially incorrect. 在留期間が満了した後の特例期間中に出国すると，特例期間は終了する（みなし再入国許可は在留資格を持つ者が対象; 特例期間中は在留期間が満了しており，在留資格自体がない状態に準ずる）。
3. **"在留資格変更申請中なら，変更前の在留資格で出国できる。"** — nuanced. 変更申請中の特例期間中に出国すると，特例期間は終了し，変更申請は取り下げ扱いとなりうる。帰国後は新しい在留資格を持っていないため，入国できない可能性がある。
4. **"永住申請中も特例期間が生じる。"** — incorrect（G15 cross-ref）. 永住許可申請は在留期間更新許可申請ではないため，特例期間は発生しない。永住申請中に在留期間が満了する場合は，別途在留期間更新申請が必要。

## Trigger

Use this card when the user says:

- "更新申請中に海外に出国することはできますか？"
- "申請中に出国したら，申請はどうなりますか？"
- "特例期間中に旅行に行きたいのですが，大丈夫ですか？"
- "在留資格変更申請中に出国しても，申請が続きますか？"
- "永住申請中に出国しても大丈夫ですか？"
- any pattern suggesting that departure during a pending application is safe, or treating 特例期間 as allowing unrestricted travel.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tokureikikan | L4 | 出入国在留管理庁「特例期間とは？」 | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | 2026-05-15 | 特例期間の定義（在留期間内申請後・処分が下りるまでの期間または原満了日+2か月のいずれか早い方）; 出国による終了については直接記述なし（needs_domain確認） |
| isa-sainyukoku-16-5 | L4 | 出入国在留管理庁「再入国許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-5.html | 2026-05-15 | 再入国許可の申請対象（中長期在留者）; みなし再入国許可は在留資格を持つ者が対象. |
| g1-crossref | guardrail | guardrail-special-period-risk (G1) | internal | 2026-05-15 | G1: 特例期間は在留期間内の申請が条件; 処分または原満了日+2か月のいずれか早い方で終了. |
| g15-crossref | guardrail | guardrail-pr-special-period-gap (G15) | internal | 2026-05-15 | G15: 永住許可申請は特例期間の対象外（更新・変更申請のみが対象）. |
| g50-crossref | guardrail | guardrail-koshin-shinsei-timing (G50) | internal | 2026-05-15 | G50: 3か月前から申請可; 特例期間は在留期間内申請の場合のみ発生. |
| g65-crossref | guardrail | guardrail-shutsukoku-sainyukoku-zairyu (G65) | internal | 2026-05-15 | G65: 在留期間は出国中も進行（停止しない）; みなし再入国=1年以内. |

## Official Rule Or Source Fact

**特例期間の仕組み（G1 cross-ref）:**

特例期間は，中長期在留者が在留期間の満了前に在留期間更新許可申請または在留資格変更許可申請を行った場合に，その申請に対する処分が下されるまで（または原在留期間満了日から2か月を経過する日のいずれか早い日まで）適法に日本に在留できる期間。

**特例期間中の出国（P0リスク）:**

特例期間中に出国した場合の法的効果:
- **特例期間は出国の時点で終了**する（在留期間が満了した状態で出国することになる）
- 帰国しようとする場合，有効な在留資格がないため，原則として入国できない
- 申請中の更新・変更許可申請は取り下げ扱い（または消滅）となる可能性がある

**みなし再入国許可と特例期間の関係:**

みなし再入国許可は，**在留期間内**に出国する場合に適用される（在留資格を持ったままでの出国）。特例期間中は在留期間が満了しており，厳密には「在留資格を持ったまま」ではないため，みなし再入国許可の対象にならない可能性がある。

**重要な実務的注意:**

- 申請中に出国が必要な場合は，**出国前に正規の再入国許可を取得**しておく（みなし再入国ではなく，正規の再入国許可申請）
- ただし，正規の再入国許可は「在留資格を持つ者」が対象のため，在留期間が満了した後の特例期間中では取得できない可能性がある
- **申請前（在留期間満了前）に再入国許可を取得する**のが最も安全

**更新申請と変更申請の場合の比較:**

| 状況 | 出国時のリスク |
|---|---|
| 在留期間満了前（特例期間発生前）に再入国許可取得後出国 | 最も安全（在留資格を持った状態で出国）|
| 在留期間満了前に出国（再入国許可なし）| みなし再入国（1年以内帰国が条件）|
| 在留期間満了後・特例期間中に出国 | **P0リスク: 特例期間終了; 申請消滅リスク; 帰国できない可能性** |
| 永住許可申請中に出国 | 永住申請とは別に，在留期間の管理が必要（G15 cross-ref）|

**永住申請中の特別注意（G15 cross-ref）:**

永住許可申請は在留期間更新許可申請ではないため，特例期間は発生しない。永住申請中に在留期間が満了する場合は，**別途在留期間更新許可申請**を行うことで特例期間を維持できる。

## Safe Answer Behavior

- When asked about traveling during pending application: immediately raise the P0 risk — departing during the 特例期間 (i.e., after the original 在留期間 has expired) ends the special period and may result in inability to re-enter.
- When asked about traveling BEFORE the 在留期間 expires: explain the 再入国許可 options (みなし vs 正規); confirm this is safer than traveling after expiry.
- When asked about 永住 application travel: route to G15; confirm no 特例期間 applies; emphasize need for 在留期間 renewal if 永住 takes long.
- Do not say "special period travel is fine" or "you can still come back" without explicit qualification.

## Must Say

- 特例期間中（在留期間が満了した後，申請の処分が出るまでの期間）に出国した場合，特例期間は出国の時点で終了する。帰国後は在留資格がない状態で入国することになるため，原則として入国できない可能性がある（P0リスク）。
- 申請中に出国が必要な場合は，在留期間が満了する前（申請前）に再入国許可を取得しておくのが最も安全。在留期間満了後・特例期間中の出国は避けること。
- 永住許可申請中は特例期間が発生しない（G15参照）。永住申請が長期化する場合は，別途在留期間更新申請が必要。

## Must Not Say

- 「特例期間中でも出国して帰国できる。」（出国で特例期間終了; 帰国できない可能性）
- 「申請中はみなし再入国許可で出国できる。」（特例期間中は在留期間満了後のため，みなし再入国の対象にならない可能性）
- 「永住申請中は申請が続くから，在留期間が切れても大丈夫。」（永住申請は特例期間の対象外; 在留期間更新申請が別途必要）

## Deep Water Triggers

- 更新申請中（在留期間満了前1か月）に、緊急で海外出張が必要になった — どうすればよいか？
- 更新申請が提出済み（在留期間はまだ2か月ある）で出国 — 申請はどうなるか？
- 在留期間が満了して特例期間に入った後に出国した — 帰国できるか？何かできることはあるか？
- 在留資格変更申請中に家族の葬儀のため出国しなければならない — どうすればよいか？
- 永住申請中に在留期間が切れそうになった — 何をすべきか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who need to travel BEFORE expiry: explain 再入国許可 options (みなし if leaving before expiry + within 1 year; 正規 if longer); confirm application continuity if departing before 在留期間 expires with 再入国許可.
- For persons already in 特例期間 wanting to travel: P0 alert — do not travel; route to professional immediately to assess options.
- For persons who already departed in 特例期間: route to lawyer immediately; assess whether 在留特別許可 or new visa from abroad is the only option.
- For 永住 applicants: route to G15; recommend filing a separate 在留期間更新 if application is pending near expiry.

## Unknown Fields

- The official ISA position on whether the 特例期間 specifically ends at the moment of departure (出国) or whether there is any grace period.
- Whether a person who departed during 特例期間 can apply for a new 在留資格 from abroad (e.g., CoE application at overseas embassy) without returning to Japan.
- Whether the pending update/change application is formally withdrawn/cancelled upon departure, or whether it remains pending until formally closed.

## Needs Domain Flags

- needs_domain (P0): Does the 特例期間 definitively end at the moment of departure from Japan during the special period, with no ability to maintain the pending application? ISA's 特例期間 page does not explicitly state the effect of departure; this has been inferred from the legal structure but formal official confirmation is critical given the P0 risk.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tokure-001 | "在留期間更新を申請していますが，特例期間中に旅行で出国できますか？" | State: 在留期間が満了した後の特例期間中に出国すると，特例期間が終了するリスクがある。帰国後は在留資格がない状態となり，入国できない可能性がある（P0リスク）。出国が必要な場合は，在留期間が満了する前（申請前）に再入国許可を取得するのが最も安全。絶対に出国する前に行政書士・弁護士に相談すること。 |
| tokure-002 | "永住申請中ですが，在留期間が来月切れます。どうすればいいですか？" | State: 永住許可申請は在留期間更新の代わりにならない（特例期間が発生しない; G15参照）。在留期間が切れる前に，別途「在留期間更新許可申請」を提出すること。永住申請と在留期間更新申請は並行して行うことができる。至急行政書士に相談を。 |
| tokure-003 | "更新申請を提出した翌日に出国しましたが，在留期間はまだ1か月あります。申請はどうなりますか？" | State: 在留期間が満了する前（特例期間が発生する前）に出国した場合は，みなし再入国許可（1年以内帰国; G19参照）の範囲内であれば，在留資格を維持したまま出国したことになる。申請は通常継続するが，追加書類の提出や連絡が必要な場合もあるため，行政書士に確認を。 |

## Source Notes

- 特例期間の定義・終了条件: ISA「特例期間とは？」(tokureikikan_00001.html); G1 cross-ref（特例期間の法的構造）.
- 特例期間中の出国リスク: 入管法第22条の2・特例期間の法的性格から構造的に導かれる（出国=在留の終了; 特例期間=在留の延長ではなく「在留が許容される期間」）.
- みなし再入国許可との関係: G65 cross-ref; ISA 16-5.html（みなし再入国は在留資格保有者が対象）.
- 永住申請と特例期間: G15 cross-ref（永住申請は特例期間の対象外を確認済み）.
- Cross-ref G1 (特例期間リスク), G15 (永住申請と特例期間のギャップ), G50 (更新申請タイミング), G65 (出国・再入国の在留期間への影響).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 017 G93. Risk level P0 (帰国不能リスク). Key sources: ISA tokureikikan_00001.html; G1/G15/G50/G65 cross-refs. Core facts: 特例期間中の出国=特例期間終了リスク; 帰国できない可能性; 出国前（在留期間満了前）に再入国許可取得が安全; 永住申請中は特例期間が発生しない（G15）. needs_domain P0: 特例期間中の出国で特例期間が即時終了することの公式テキストによる確認（現在は構造的推論）. Cross-ref G1, G15, G50, G65.
