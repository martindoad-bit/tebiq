---
asset_id: guardrail-gaikokujin-sozoku-zairyu
title: 外国人の相続・遺言と在留資格 — 日本での相続手続きは在留資格と独立した民事手続き；外国人が相続人・被相続人となる場合の準拠法は「法の適用に関する通則法」第36条に基づき被相続人の本国法；相続手続きのための長期滞在には相応の在留資格が必要
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 020"
---

## What This Document Is

This guardrail prevents errors about inheritance (相続) and wills (遺言) involving foreign nationals in Japan, and the relationship between inheritance matters and residence status. Key errors to block:

1. **"外国人は日本で相続できない。"** — incorrect. 外国人であっても，日本の相続手続き（相続放棄・遺産分割協議・相続登記等）に参加できる。ただし，準拠法（どの国の法律が適用されるか）は外国人が絡む場合に複雑になりうる。
2. **"日本に不動産を持つ外国人が死亡した場合，日本の相続法が当然に適用される。"** — partially incorrect. 日本の「法の適用に関する通則法」第36条により，相続の準拠法は被相続人の**本国法**（国籍国の法律）。日本国内の不動産であっても，被相続人が外国籍であれば，その国の相続法が原則として適用される。
3. **"相続手続きのために日本に長期滞在する場合，在留資格は不要。"** — incorrect. 相続手続きが長引く場合（数か月以上），相応の在留資格が必要。相続のみを目的とした長期滞在のための在留資格は，通常の短期滞在（90日以内）や「特定活動」の申請等を検討する必要がある。
4. **"日本にいる外国人が死亡した場合，在留資格はその日に失効する。"** — correct for the basis, but incomplete. 死亡した外国人の在留資格は死亡により終了するが，遺産・未払い給与・保険等の相続手続きのために，遺族（相続人）が日本で手続きを行う権利は別途存在する。

## Trigger

Use this card when the user says:

- "外国人の夫（妻）が日本で亡くなりました。相続手続きはどうすればいいですか？"
- "日本の不動産を外国人が相続できますか？"
- "外国籍のまま日本の遺言書（遺言）を作れますか？"
- "日本に住んでいる外国人が亡くなった場合，どの国の相続法が適用されますか？"
- "相続手続きのために，ビザなしで日本に長期滞在できますか？"
- any pattern suggesting that foreign nationals cannot inherit property in Japan, or that Japanese inheritance law automatically applies to non-Japanese deceased persons.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| hoteki-tekiyo-tsusoku-ho | L4 | 法の適用に関する通則法第36条 | https://laws.e-gov.go.jp/law/418AC0000000078 | 2026-05-15 | 相続の準拠法=被相続人の本国法（第36条）; 遺言の準拠法（第37条）. |
| moj-fudosan-touki | L4 | 法務省「不動産登記」 | https://www.moj.go.jp/MINJI/minji05_00002.html | 2026-05-15 | 外国人の不動産登記・相続登記手続き（住所・氏名証明の国際化）. |
| zeimushi-sozoku | L4 | 国税庁「相続税」 | https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/souzoku.htm | 2026-05-15 | 相続税の納税義務（国内財産の相続に係る相続税; 外国人相続人の取り扱い）. |
| g95-crossref | guardrail | guardrail-gaikokujin-fudosan-shutoku (G95) | internal | 2026-05-15 | G95: 外国人の不動産取得と在留資格（取得制限なし）; 相続による不動産取得も同様. |

## Official Rule Or Source Fact

**相続の準拠法（「法の適用に関する通則法」第36条）:**

> 相続は，被相続人の本国法による。

つまり:
- **被相続人（亡くなった人）が外国籍の場合**: その国の法律（本国法）が相続全体に適用される原則
- **被相続人が日本国籍の場合**: 日本の相続法（民法）が適用される（相続人が外国籍でも）
- **例外**: 被相続人が複数の国籍を持つ場合，常居所国の法律が適用されるケースもある（通則法第38条参照）

⚠️ 日本国内の不動産であっても，被相続人が外国籍の場合は，その国の相続法が適用される（ただし，不動産登記手続き自体は日本法に従う）。

**外国人相続人が日本で行う主な手続き:**

| 手続き | 内容 | 注意点 |
|---|---|---|
| **遺産分割協議** | 相続人全員による遺産の分割協議（書面化）| 外国在住の相続人は，委任状・在外公館発行の証明書が必要 |
| **相続登記（不動産）** | 法務局への不動産相続登記（2024年4月から義務化）| 外国人相続人の氏名・住所の証明（本国書類＋翻訳）が必要 |
| **預貯金の解約・払い戻し** | 被相続人名義の口座の解約・相続人への払い戻し | 各金融機関の手続きに従う（戸籍・死亡証明書等が必要）|
| **相続税申告** | 国内財産の相続に係る相続税の申告・納付 | 相続開始を知った日から10か月以内; 外国人相続人も対象 |

**外国人が絡む相続での特殊な書類要件:**

- **被相続人の死亡証明書**: 外国で死亡した場合，現地の死亡証明書 + 日本語翻訳が必要
- **相続人の証明**: 本国の相続関係証明（戸籍謄本に相当する書類; アポスティーユ付きのもの）
- **外国文書の翻訳**: 法務局・金融機関では日本語翻訳の添付が一般的に求められる
- **不動産相続登記の住所証明**: 外国在住の相続人の住所証明（宣誓供述書等）

**遺言の準拠法（通則法第37条）:**

- 遺言の方式: 遺言作成地の法律・本国法・常居所地法のいずれか一つに適合していればよい
- 遺言の実質（効力・内容）: 遺言作成時の被相続人の本国法
- 日本で作成する外国人の遺言: 日本の公正証書遺言の方式で作成すれば，方式は有効（本国法との関係で内容の有効性は別途検討）

**相続手続きのための在留資格:**

相続手続きのみを目的に日本に長期滞在する場合:
- 短期滞在（90日以内）: 短期滞在ビザで対応（ビザ免除国は免除）
- 90日を超える場合: 「特定活動」（個別許可）等の申請を検討（ISAに相談）
- 日本在住者が相続人の場合: 現在の在留資格を維持しつつ手続きを進める（相続が在留資格に直接影響しない）

**相続税（国税庁）:**

外国人相続人の相続税の取り扱い（概要）:
- 日本国内にある財産を相続した場合，相続税の申告義務が生じる（相続人の国籍・在留資格問わず）
- 相続開始（被相続人の死亡）を知った日から10か月以内に申告・納付
- 海外在住の相続人は，日本の税理士を納税管理人に選任して申告

**外国人被相続人の不動産（G95 cross-ref）:**

外国人も原則として日本の不動産を取得・保有できる（G95参照）。外国人被相続人が不動産を保有していた場合，その不動産は日本の相続登記手続き（法務局）に従って相続手続きを行う必要がある（2024年4月から義務化）。

## Safe Answer Behavior

- When asked about inheritance rights: confirm that foreign nationals can participate in Japanese inheritance proceedings; explain the 準拠法 rule (被相続人の本国法).
- When asked about which law applies: clearly explain the 通則法第36条 rule that the deceased's national law governs; note that Japanese law applies if the deceased is Japanese, regardless of heirs' nationality.
- When asked about long-term stay for inheritance: explain the 90-day short-stay option; note that longer stays require specific status; recommend consulting ISA or a lawyer.
- When asked about wills: explain that foreign nationals can create wills in Japan (Japanese public will format); note the distinction between form validity and substantive validity.

## Must Say

- 相続の準拠法は「法の適用に関する通則法」第36条により，**被相続人（亡くなった人）の本国法**による。被相続人が外国籍の場合，日本国内の不動産であっても，その国の相続法が原則として適用される。
- 外国人（外国在住の相続人を含む）も，日本での相続手続き（遺産分割・相続登記・預金解約等）に参加できる。外国書類はアポスティーユ付きの翻訳が必要になる場合が多い。
- 相続手続きのために日本に90日を超えて滞在する場合，短期滞在では対応できない可能性があり，「特定活動」等の在留資格の申請が必要になる場合がある。法律・税務・在留資格の専門家（弁護士・税理士・行政書士）に相談することを推奨。

## Must Not Say

- 「外国人は日本で相続できない。」（在留資格・国籍問わず相続手続きに参加できる）
- 「日本の不動産を持つ外国人が亡くなった場合，必ず日本の相続法が適用される。」（準拠法は被相続人の本国法）
- 「相続手続きのためなら何日でも日本に在留できる。」（90日超は相応の在留資格が必要）

## Deep Water Triggers

- 被相続人が日本と外国の二重国籍を持っていた場合，どの国の相続法が適用されるか？（通則法第38条の常居所地法の扱い）
- 日本に住民票のある外国人（中長期在留者）が死亡した場合，日本の相続法と本国の相続法のどちらが適用されるか？
- 日本の不動産を外国人が相続する場合，不動産取得税・相続税の申告が必要か？
- 中国・韓国等の本国法では，日本の法定相続分と異なる分配ルールがある — 実際の遺産分割協議にどう影響するか？
- 日本在住の外国人が，本国の親族にだけ遺産を残す遺言書を日本で作成できるか？（遺留分と本国法の適用）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons dealing with inheritance involving foreign nationals: route to 弁護士（国際私法・相続専門）immediately; cross-border inheritance is highly complex.
- For persons needing to stay in Japan for inheritance proceedings: route to ISA for 特定活動 or other status options; route to 行政書士 for application.
- For persons with inheritance tax questions: route to 税理士 for 相続税申告; note 10-month deadline from awareness of death.
- For persons needing to register inherited Japanese real estate: route to 司法書士 for 相続登記; remind of the 2024 mandatory registration requirement.

## Unknown Fields

- The specific procedure for foreign nationals domiciled abroad who need to extend their stay in Japan beyond 90 days solely for inheritance proceedings.
- Whether a Japanese notarial will (公正証書遺言) created by a foreign national in Japan is recognized as formally valid in all countries, or whether recognition depends on the specific country's rules.

## Needs Domain Flags

- needs_domain (P1): What is the specific ISA-accepted route for foreign nationals who need to stay in Japan longer than 90 days solely to complete inheritance proceedings? Is there an established 特定活動 category for this, or does it require case-by-case application?
- needs_domain (P1): For a foreign national who was a 中長期在留者 (lawful resident) in Japan at the time of death, does the constant residence (常居所地法) exception in 通則法第38条 override the 本国法 rule, making Japanese inheritance law applicable?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| sozoku-001 | "外国籍の夫が日本で亡くなりました。日本の相続法が適用されますか？" | State: 「法の適用に関する通則法」第36条により，相続の準拠法は被相続人（亡くなった方）の本国法。夫が外国籍の場合，日本国内の財産であっても，夫の国籍国の相続法が原則として適用される。日本の民法（日本の相続法）が自動的に適用されるわけではない。国際相続は複雑なため，国際私法・相続専門の弁護士に相談することを強く推奨する。 |
| sozoku-002 | "日本の土地を外国在住の兄弟（外国籍）が相続できますか？" | State: 外国国籍・外国在住の相続人であっても，日本の相続手続き（遺産分割協議・相続登記）に参加できる。相続の準拠法は被相続人の本国法によるが，不動産の相続登記手続き自体は日本の不動産登記法に従う。外国在住の相続人は，本国の相続関係証明書類（アポスティーユ付きの翻訳）と委任状等が必要になる。司法書士・弁護士に相談することを推奨する。 |
| sozoku-003 | "相続手続きのために日本に1年間滞在したいのですが，ビザはどうすればいいですか？" | State: 90日以内の相続手続きであれば，短期滞在ビザ（またはビザ免除）で対応できる場合がある。90日を超えて滞在する必要がある場合，短期滞在では対応できないため，「特定活動」等の在留資格の申請が必要になる場合がある。具体的な状況について，入管または行政書士に相談することを推奨する。 |

## Source Notes

- 相続の準拠法: 法の適用に関する通則法第36条（被相続人の本国法）; 第37条（遺言の準拠法）.
- 遺言の方式有効性: ハーグ条約（遺言の方式の準拠法に関する法律）— 日本は締結国; 複数の方式のいずれかに合致すれば方式上有効.
- 不動産相続登記: 法務省「不動産登記」— 外国人相続人の氏名・住所証明の取り扱い; 2024年4月から相続登記義務化.
- 相続税: 国税庁「相続税」— 日本国内財産の相続に係る相続税; 相続開始を知った日から10か月以内の申告義務.
- 外国人の不動産取得: G95 cross-ref（外国人は原則自由に不動産取得可; 相続による取得も同様）.
- Cross-ref G82 (在留資格と長期出国・在留期間), G95 (外国人の不動産取得).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 020 G110. Key sources: 法の適用に関する通則法第36条（相続準拠法=被相続人の本国法）; 法務省「不動産登記」（外国人相続人の登記手続き）; 国税庁「相続税」（相続税の申告義務）. Core facts: 外国人も相続手続きに参加可能; 準拠法=被相続人の本国法（日本の不動産でも外国人被相続人なら外国法が原則）; 外国書類はアポスティーユ+翻訳が必要; 90日超の滞在は相応の在留資格が必要. needs_domain P1: 相続のための特定活動在留の手続き; 中長期在留者の常居所地法例外適用. Cross-ref G82, G95.
