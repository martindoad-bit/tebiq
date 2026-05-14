---
asset_id: guardrail-tokutei-gino-tsusanzairyu-5nen
title: 特定技能1号の通算在留期間5年上限 — 5年は特定技能1号としての累積在留日数；在留カードの期間ではなく実際の在日日数で計算
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

This guardrail prevents errors about the 5-year cumulative stay limit for 特定技能1号 holders. Key errors to block:

1. **"特定技能1号は5年のビザで，5年後に自動的に更新できる。"** — incorrect. 5年は「在留カードの期間」ではなく，特定技能1号として日本に在留した「通算日数の上限」。5年を超えた後，特定技能1号での更新は不可。
2. **"特定技能1号の5年は，日本に住んでいた全期間で計算される。"** — incorrect. 通算在留期間の計算は「特定技能1号として在留した期間」の累計。他の在留資格（例: 技人国→特定技能1号→技人国）での期間は通算されない。
3. **"5年を超えたら日本を出国しなければならない。"** — partially incorrect. 5年到達時の選択肢: ①特定技能2号に移行（条件を満たせば）, ②他の在留資格に変更（技人国等）, ③帰国。強制退去ではないが，特定技能1号としての継続はできない。
4. **"出国していた期間は5年に含まれない。"** — nuanced. 通算在留期間は日本に「在留」していた期間の合計であり，出国中の期間（日本に在留していない期間）は原則含まれない。ただし，みなし再入国許可期間中の短期出国の扱いは確認が必要。

## Trigger

Use this card when the user says:

- "特定技能1号は何年いられますか？"
- "特定技能1号の5年は，どのように計算しますか？"
- "5年が近づいてきましたが，どうすればいいですか？"
- "5年後に特定技能1号を更新できますか？"
- "特定技能1号のまま5年を超えることはできますか？"
- any pattern confusing the 5-year cumulative in-Japan period limit with a simple visa expiry, or treating 5 years as renewable.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-5nen | L4 | 出入国在留管理庁「特定技能制度の概要」 | https://www.moj.go.jp/isa/policies/ssw/nyuukokukanri07_00147.html | 2026-05-15 | 特定技能1号 = 通算5年を上限とする在留が可能（1回の在留期間は1年・6か月・4か月のいずれか）. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号の通算5年上限; 1号→2号移行は自動でない; 2号は通算期間上限なし. |
| isa-ssw-faq-q | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」 | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | FAQに通算在留期間の計算方法（特定技能1号として在留した期間の合計; 出国期間は除く）の説明あり. |

## Official Rule Or Source Fact

**特定技能1号の通算在留期間上限:**

特定技能1号の在留資格は，**通算で5年**を超えて在留することができない（법令上の上限）。

**通算在留期間の計算方法（ISA FAQ）:**

> 特定技能1号として日本に在留していた期間の合計が5年を超えることはできない。日本国外に出国していた期間（日本に在留していない期間）は，通算在留期間に含まれない。

計算例:
- 特定技能1号で3年在日 → 帰国1年（特定技能1号の期間は外にいる間は止まっている） → 再入国後，残り2年間が特定技能1号として在留可能（合計5年）
- 技能実習2号修了後に特定技能1号へ移行 → 技能実習期間は通算に含まれない（別の在留資格のため）

**「1回あたりの在留期間」と「通算上限」の区別:**

| 概念 | 内容 |
|---|---|
| **1回の在留期間** | 1年・6か月・4か月のいずれか（在留カードに記載）|
| **通算在留期間上限** | 特定技能1号としての合計在留日数が5年 |
| **更新の可否** | 通算5年未満であれば，引き続き更新可能 |
| **5年到達後の更新** | 不可（特定技能1号としての継続は不可）|

**5年到達時の選択肢:**

1. **特定技能2号への移行（G33 cross-ref）**: 対象分野（11分野）の特定技能2号試験等の要件を満たす場合，在留資格変更許可申請で2号へ移行可能。2号は通算在留期間の上限なし。
2. **他の在留資格への変更**: 要件を満たせば技人国等の就労系在留資格への変更可能（業務内容が対応する場合）。
3. **帰国**: 特定技能1号として5年経過後，他の資格への変更も2号移行も困難な場合は帰国。

**5年上限と「5年前」の準備:**

5年の期限が近づいた時点で選択肢を検討する必要がある:
- 特定技能2号試験の準備（試験日程・受験資格の確認）
- 技人国変更の可能性確認（業務内容が技人国に該当するか）
- 雇用主との協議

**他の在留資格での在日期間との関係:**

| 在留資格 | 特定技能1号の通算期間への算入 |
|---|---|
| 技能実習（1号/2号/3号）| 算入されない（別の在留資格）|
| 技人国や他の就労系 | 算入されない |
| **特定技能1号** | **算入される**（累積）|
| 出国期間（日本外在住） | 算入されない |

**特定技能1号の1回の在留期間の上限:**

特定技能1号の1回の在留期間は最長1年。在留期間は1年，6か月，4か月のいずれかが付与される。1回あたりの在留期間を超えて在留するには更新が必要（通算5年の範囲内であれば更新可）。

## Safe Answer Behavior

- When asked "how many years can I stay": explain 5-year cumulative rule (not a single 5-year period); clarify that 1-year visa intervals require renewals within the 5-year cap.
- When asked how the 5 years is calculated: explain it's total in-Japan time as 特定技能1号; time in other statuses or abroad is not counted.
- When the 5-year mark is approaching: discuss the three options (2号 transition, status change, departure); route to professional for concrete planning.
- Do not say "5年経ったら更新できる" or "5年はビザの有効期間."

## Must Say

- 特定技能1号は通算で5年を超えて在留することができない。5年は在留カードの期間ではなく，特定技能1号として日本に在留した日数の累計（出国期間は含まない）。
- 特定技能1号の1回の在留期間は最長1年で，通算5年の範囲内で更新が可能。5年到達後は特定技能1号での更新はできない。
- 5年経過後の選択肢: 特定技能2号への移行（G33参照）, 他の在留資格への変更, 帰国。特定技能2号への移行は自動ではなく，別途在留資格変更許可申請が必要。

## Must Not Say

- 「特定技能1号は5年のビザで，5年後に更新できる。」（5年は更新不可の通算上限）
- 「5年後は自動的に特定技能2号になる。」（2号への移行は自動ではない — G33参照）
- 「出国していた期間も5年に含まれる。」（出国期間は通算に含まれない）
- 「技能実習期間も特定技能1号の5年に含まれる。」（技能実習は別の在留資格; 含まれない）

## Deep Water Triggers

- 特定技能1号で通算4年11か月在日，残り1か月になった — 今から2号の試験準備は間に合うか？
- 特定技能1号で3年在日後，一度帰国（1年半）し，再入国した — 残りの特定技能1号期間はいくつか？
- 特定技能1号の5年が来月で終わるが，2号の試験に合格していない — どうすればよいか？
- 日本で働いて特定技能1号5年を終えた後，帰国して再度来日したい — 特定技能1号でまた入国できるか？
- 特定技能1号に変更前に技人国で3年在日した — この3年も5年に含まれるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For workers approaching the 5-year mark: route to professional immediately; discuss 2号 options and status change possibilities.
- For workers with time remaining: explain the cumulative rule; route to ISA 特定技能 page for the current in-Japan period tracking.
- For workers who want to know remaining time: if they have been abroad, confirm that overseas periods are not counted.
- For persons asking about 2号: route to G33 for the 1号/2号 boundary and transition requirements.

## Unknown Fields

- Whether short-term departures under みなし再入国（under 1 year） are excluded from the 5-year cumulation (i.e., is the 5 years measured as calendar time minus overseas days, or as continuous stay blocks?).
- Whether there is a possibility of re-entry into 特定技能1号 after a person has exhausted the 5-year limit, departed, and returned — i.e., can the clock restart?

## Needs Domain Flags

- needs_domain (P1): After exhausting the 5-year 特定技能1号 limit, can a person re-enter Japan on a new 特定技能1号 status (i.e., does the cumulative clock reset after departure)? Official ISA position not confirmed.
- needs_domain (P1): For the 5-year calculation, are short departures (under みなし再入国 = less than 1 year) subtracted from the cumulative period, or are they treated as continuous in-Japan time?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tsusanzairyu-001 | "特定技能1号は何年いられますか？ビザが5年のビザだから，5年後に更新できますか？" | State: 特定技能1号は「通算5年」が上限。1回の在留期間は最長1年で，その都度更新が必要。通算5年に達した後は特定技能1号での更新はできない。5年到達後は特定技能2号への移行または他の在留資格への変更が必要。 |
| tsusanzairyu-002 | "特定技能1号で3年日本に住んだ後，2年間帰国しました。また特定技能1号で日本に戻れますか？残りの期間はどうなりますか？" | State: 帰国中の2年間は通算期間に含まれない。特定技能1号として在留した累計は3年。残り2年分の特定技能1号在留が可能（通算5年のうち残り2年）。再入国・在留資格取得手続きは別途必要。 |
| tsusanzairyu-003 | "来月で特定技能1号の通算5年になります。どうすればいいですか？" | State: 特定技能1号での継続は不可。選択肢: ①特定技能2号への移行（G33参照: 試験合格等の要件あり; 移行は自動でない）②他の在留資格（技人国等）への変更③帰国。今すぐ専門家（行政書士）に相談を。 |

## Source Notes

- 特定技能1号通算5年上限: ISA nyuukokukanri07_00147.html（制度概要ページ）; G33 cross-ref（通算5年・1号/2号の境界）.
- 通算在留期間の計算（出国除外）: ISA FAQ（faq.html）の関連Q&Aから確認（出国期間は通算に含まれない）.
- 1回の在留期間（最長1年）: ISA 特定技能制度概要から確認.
- 技能実習期間は通算しない: 別の在留資格であることから構造的に導かれる.
- Cross-ref G33 (特定技能1号/2号の境界・家族帯同・移行要件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 014 G77. Key sources: ISA nyuukokukanri07_00147.html (通算5年上限); ISA FAQ (出国期間は含まない); G33 cross-ref. Core facts: 5年=累積在日日数の上限（出国期間除外）; 1回最長1年で更新可能（5年未満の範囲内）; 5年到達後は特定技能1号継続不可; 技能実習期間は算入されない. needs_domain P1: 5年消費後の再入国可否; みなし出国の扱い. Cross-ref G33.
