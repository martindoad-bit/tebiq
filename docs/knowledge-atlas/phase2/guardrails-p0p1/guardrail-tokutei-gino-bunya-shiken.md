---
asset_id: guardrail-tokutei-gino-bunya-shiken
title: 特定技能1号の分野別試験要件 — 分野ごとに技能試験・日本語試験が必要；技能実習2号修了で一部免除
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

This guardrail prevents errors about the exam requirements for 特定技能1号. Key errors to block:

1. **"特定技能は一種類の試験に合格すればどの分野でも働ける。"** — incorrect. Each of the 16 sectors has its own 分野別技能評価試験 (sector-specific skills test). Passing one sector's exam does not qualify the person for a different sector.
2. **"特定技能の試験は日本語試験だけでいい。"** — incorrect. Both a sector-specific 技能試験 AND a Japanese language test (JLPT N4 level minimum, or 日本語能力試験 equivalent) are generally required, unless exempt via 技能実習2号 良好修了.
3. **"技能実習2号を修了していれば，特定技能のすべての試験が免除される。"** — incorrect (nuanced). 日本語試験 = unconditionally exempt across all sectors. 技能試験 = exempt ONLY if the target 特定技能 sector is 関連分野 to the 技能実習 occupation. (G46 cross-ref: this is the most critical nuance.)
4. **"試験に合格すれば，すぐに特定技能で働ける。"** — incomplete. Exam passage grants eligibility; the employer must also execute a 特定技能雇用契約, and the person must hold or obtain the appropriate 在留資格.

## Trigger

Use this card when the user says:

- "特定技能1号になるには何の試験を受ければいいですか？"
- "特定技能の試験はどこで受けられますか？"
- "技能実習2号を修了しています。特定技能の試験は免除されますか？"
- "日本語のN4を持っていれば特定技能の試験は大丈夫ですか？"
- "建設と介護の両方の特定技能で働きたいが，試験は一つでいいですか？"
- any pattern misunderstanding that exam eligibility is sector-specific, or conflating the 日本語試験 and 技能試験 exemption rules.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ssw-faq-general | L4 | 出入国在留管理庁「特定技能制度に関するQ&A」 | https://www.moj.go.jp/isa/policies/ssw/faq.html | 2026-05-15 | 分野別試験の概要; 技能実習2号修了者の試験免除条件（Q13確認: 日本語=全分野免除; 技能=関連分野のみ）. |
| g46-crossref | guardrail | guardrail-ginou-jisshu-tokutei-gino-iten (G46) | internal | 2026-05-15 | G46 core fact: 日本語試験=職種問わず全分野免除; 技能試験=関連性ある分野のみ免除; 「良好修了」=2yr10mo+. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号=16分野; 特定技能2号=11分野; 分野構造confirmed. |
| g51-crossref | guardrail | guardrail-tokutei-gino-tenshoku-joken (G51) | internal | 2026-05-15 | G51: 転職は同一業務区分内のみ; 試験の分野特定性が転職制限の根拠の一つ. |

## Official Rule Or Source Fact

**特定技能1号の試験要件（2本立て）:**

特定技能1号を取得するには、原則として以下の2つの試験の合格が必要:

1. **分野別技能評価試験（技能試験）** — 各産業分野が独自に実施
2. **日本語能力試験** — JLPT N4相当以上（「日本語基礎テスト（JFT-Basic）」も可）

**16産業分野と各分野の試験実施機関（一覧）:**

| 産業分野 | 試験名（技能） | 備考 |
|---|---|---|
| 介護 | 介護技能評価試験 | 介護日本語評価試験も別途必要 |
| ビルクリーニング | ビルクリーニング分野特定技能1号技能評価試験 | |
| 工業製品製造業（機械・金属系） | 特定技能1号評価試験（製造分野） | 複数区分あり |
| 電気・電子情報関連産業 | 同上（製造分野） | |
| 建設 | 建設分野特定技能1号評価試験 | |
| 造船・舶用工業 | 造船・舶用工業分野特定技能1号試験 | |
| 自動車整備 | 自動車整備分野特定技能評価試験 | |
| 航空 | 航空分野特定技能1号技能評価試験 | |
| 宿泊 | 宿泊業技能測定試験 | |
| 農業 | 農業技能測定試験 | |
| 漁業 | 漁業技能測定試験 | |
| 飲食料品製造業 | 飲食料品製造業特定技能1号技能測定試験 | |
| 外食業 | 外食業特定技能1号技能測定試験 | |
| 林業 | 林業特定技能評価試験 | 2024年追加分野 |
| 木材産業 | 木材産業特定技能評価試験 | 2024年追加分野 |
| 自動車運送業 | 自動車運送業特定技能評価試験 | 2024年追加分野 |

Note: 2024年3月29日閣議決定で4分野が追加（林業・木材産業・鉄道・自動車運送業）。試験体制整備中の分野あり（G33 cross-ref）。

**日本語能力試験の要件:**
- JLPT N4以上（日本語能力試験）
- または JFT-Basic（「国際交流基金日本語基礎テスト」）の合格
- 介護分野: 上記に加え「介護日本語評価試験」も必要

**介護分野の特殊要件:**
介護分野は3種類の試験が必要:
1. 介護技能評価試験
2. 介護日本語評価試験
3. JLPT N4以上 または JFT-Basic

**技能実習2号修了による免除（G46 cross-ref — 最重要）:**

| 試験種類 | 免除条件 |
|---|---|
| **日本語試験** | 技能実習2号を良好修了していれば **分野を問わず全免除** |
| **技能試験（分野別）** | 移行先の特定技能分野が技能実習の職種・作業と **関連性がある場合のみ** 免除 |

例: 飲食料品製造業の技能実習2号 → 同一・関連分野（飲食料品製造業 or 外食業）なら技能試験免除。建設分野の特定技能を目指す場合は技能試験の受験が必要。

**試験合格 ≠ 在留資格取得:**
試験合格は特定技能1号の要件の一部にすぎない。在留資格を得るには:
- 特定技能所属機関との雇用契約の締結
- 在留資格認定証明書（海外から）または在留資格変更許可（国内から）の手続き
- 登録支援機関による支援計画（委託する場合）（G44 cross-ref）

## Safe Answer Behavior

- When asked about exam requirements: confirm the two-test structure (sector-specific skills test + Japanese language test); do not imply a single exam works across all sectors.
- When a 技能実習2号 graduate asks about exemptions: confirm the split rule (Japanese test = unconditionally exempt; skills test = related sector only) with the G46 cross-ref.
- When asked about 介護: flag the three-test requirement (skills + 介護Japanese + general Japanese).
- When asked about working in multiple sectors: confirm separate exams are needed for each target sector.
- Do not say "one exam covers all sectors."

## Must Say

- 特定技能1号の取得には，原則として「分野別技能評価試験（技能試験）」と「日本語能力試験（N4相当以上）」の両方への合格が必要。
- 試験は産業分野ごとに別々に設定されており，一つの分野の試験合格が別の分野への適用にはならない。
- 技能実習2号の良好修了者については，日本語試験は分野を問わず免除されるが，技能試験は移行先分野と技能実習の職種・作業に「関連性」がある場合のみ免除される（G46参照）。
- 介護分野は技能試験・介護日本語評価試験・日本語能力試験（JFT-Basic含む）の3種類が必要。

## Must Not Say

- 「特定技能は一つの試験に合格すれば全分野で使える。」
- 「技能実習2号を修了していれば，特定技能の試験はすべて免除される。」（技能試験の免除は関連分野のみ）
- 「日本語試験だけ合格すれば特定技能1号になれる。」（技能試験も必要）
- 「試験に合格すればすぐ働ける。」（在留資格申請等の手続きが別途必要）

## Deep Water Triggers

- Person completed 技能実習2号 in seafood processing (漁業) and wants to work in 外食業 — are any exams waived?
- Person has JLPT N2 — is this sufficient for 特定技能 or must they still take JFT-Basic?
- Person wants to work in both 農業 and 飲食料品製造業 simultaneously — do they need two separate exams?
- Person failed the 技能 exam once — is there a waiting period before retaking?
- Person's sector exam is not yet available (新設分野) — how can they qualify?

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons planning to take 特定技能 exams: route to the relevant sector ministry's official exam page for registration and scheduling; exam calendars and overseas test venues vary.
- For 技能実習2号 graduates assessing exemptions: confirm the relevant sector combination; if related sector → both exams exempt; if different sector → only Japanese exempt; route to professional for formal assessment.
- For persons targeting 介護: flag the three-exam requirement explicitly; the 介護日本語評価試験 is often overlooked.
- For all 特定技能 applicants: confirm exam passage is only the eligibility step; the full 在留資格 process requires employer contract and ISA application.

## Unknown Fields

- The exact official definitions of "関連性あり" (related sector) combinations between 技能実習 occupations and 特定技能 sectors — an official mapping list is not confirmed from accessed sources.
- Exam availability schedules and overseas test locations for each sector's test.
- Whether passing 特定技能2号 exams (where they exist) automatically qualifies the person for 特定技能1号 in the same sector.

## Needs Domain Flags

- needs_domain (P1): confirm the complete official list of 技能実習 occupation → 特定技能 sector "関連性あり" combinations (the mapping list). Without this, G63 cannot advise on specific exemption eligibility. Cross-ref G46 dom-jisshu-001.
- needs_domain (P1): for the 4 newly-added sectors (林業・木材産業・鉄道・自動車運送業) — are the skill evaluation exams fully operational as of 2026? Are there interim entry routes before exams are established?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| shiken-001 | "特定技能の試験はどこで何を受ければいいですか？（飲食料品製造業を希望）" | State: 分野別技能評価試験（飲食料品製造業特定技能1号技能測定試験）+ 日本語能力試験（JLPT N4以上 or JFT-Basic）の両方が必要。試験は分野ごとに別実施。 |
| shiken-002 | "技能実習2号（水産加工）を修了しました。介護の特定技能に移行したい。試験は免除されますか？" | State: 日本語試験 = 全分野無条件免除。技能試験（介護技能評価試験）= 水産加工と介護は「関連性なし」のため免除されない。介護日本語評価試験も別途必要。試験受験が必要。 |
| shiken-003 | "JLPT N2を持っています。特定技能の日本語要件を満たしていますか？" | State: JLPT N4以上が要件。N2はN4より上位なので日本語要件は満たす。ただし、介護分野は「介護日本語評価試験」も別途必要。技能試験（分野別）は別に受験が必要。 |

## Source Notes

- Two-test structure (技能試験 + 日本語試験) confirmed from ISA 特定技能 FAQ and G33 framework.
- 16-sector list with 2024-03-29 additions (林業・木材産業・自動車運送業・鉄道) confirmed from G33 source.
- 技能実習2号 exemption split (日本語=全分野免除; 技能=関連分野のみ) confirmed from ISA FAQ Q13 (G46 cross-ref, official Japanese text).
- 介護 three-exam requirement is general knowledge from sector-specific guidance; specific ISA 介護 page not accessed in this session.
- "Exam passage ≠ 在留資格" structural point from G44 (RSO), G51 (transfer procedure) cross-refs.
- Cross-ref G33 (1号/2号 sector structure), G46 (技能実習 → 特定技能 transition, exam exemption official text), G51 (同一分野内転職条件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 011 G63. Key sources: ISA 特定技能 FAQ (Q13 via G46 cross-ref); G33 sector list. Core facts: two-test structure per sector; sector-specific exam required; 日本語=全分野免除 but 技能=関連分野のみ; 介護=3試験. Cross-ref G33, G46, G51.
