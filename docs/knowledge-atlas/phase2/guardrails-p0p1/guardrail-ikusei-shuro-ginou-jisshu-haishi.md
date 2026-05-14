---
asset_id: guardrail-ikusei-shuro-ginou-jisshu-haishi
title: 技能実習制度廃止・育成就労制度開始（2027年4月）— Existing Trainees Have Transition Rules; New System Has Employer Change Rights
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 006"
---

## What This Document Is

This guardrail prevents answers from treating the 技能実習 (Technical Intern Training) system as ongoing and unchanged after the 2024 legal reform, or conflating the old and new systems. The key facts:

1. **技能実習制度 will be abolished on April 1, 2027** (令和9年4月1日).
2. A new system — **育成就労制度** (Development Employment / Ikusei Shuro) — replaces it.
3. Existing 技能実習 holders can continue under **transition rules** (経過措置) through their approved levels.
4. The new 育成就労 system **allows employer changes (転籍)** after 1-2 years — a fundamental difference from 技能実習.
5. The end goal of 育成就労 is transition to **特定技能1号** — not just skill certification.

Key errors to block:
- "技能実習は今後も変わらず使えるから心配ない。"（2027年4月廃止）
- "技能実習も育成就労も同じ制度。"
- "育成就労でも転籍はできない。"（転籍が認められる根本的な違い）
- "技能実習生はすべて2027年4月に即座に新制度に切り替わる。"（経過措置あり）

## Trigger

Use this card when the user says:

- "技能実習制度はまだ使えますか？"
- "育成就労と技能実習，何が違いますか？"
- "技能実習2号の途中で制度が変わったらどうなる？"
- "育成就労では転籍できますか？"
- "技能実習を辞めて別の会社に移れますか？"
- "育成就労の目的は何ですか？"
- any pattern confusing the old and new systems, or assuming 技能実習 continues after 2027.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-ikusei-main | L4 | 出入国在留管理庁「育成就労制度」 | https://www.moj.go.jp/isa/applications/index_00005.html | 2026-05-15 | Effective date: 2027年4月1日（令和9年4月1日）. 技能実習制度 will be abolished. New system = 育成就労制度. |
| isa-ikusei-qa | L4 | 出入国在留管理庁「育成就労制度Ｑ＆Ａ」 | https://www.moj.go.jp/isa/applications/faq/ikusei_qa_00002.html | 2026-05-15 | Q67: 「令和９年４月１日時点で日本にいる技能実習生は、認定計画に基づき、実習を継続することができます。」— Transition rules confirmed. Q40: 転籍 allowed under (1) unavoidable circumstances and (2) worker-initiated conditions after 1-2 years. Q42: 転籍制限期間は分野により1〜2年. |
| isa-ikusei-overview | L4 | 出入国在留管理庁「育成就労制度の概要（令和7年12月改訂）」 | https://www.moj.go.jp/isa/content/001452485.pdf | 2026-05-15 | Purpose change: 技能実習 = 国際貢献（技能移転）; 育成就労 = 人材育成と人材確保. End goal: 特定技能1号への移行. |
| ikusei-law | L1 | 外国人の育成就労の適正な実施及び育成就労外国人の保護に関する法律（令和6年法律第60号） | (法令) | 2026-05-15 | Enacted June 21, 2024. Amends Immigration Control Act and Technical Intern Training Law. |

## Official Rule Or Source Fact

**Abolition and transition date:**
- 技能実習制度: abolished from **April 1, 2027** (令和9年4月1日).
- 育成就労制度: begins **April 1, 2027**.
- Enacted: June 21, 2024 (Law No. 60 of 2024).

**Existing 技能実習 holders — transition rules (confirmed from ISA Q&A Q67):**
> 「令和９年４月１日時点で日本にいる技能実習生は、認定計画に基づき、実習を継続することができます。」

Specifically:
- Those in Japan on April 1, 2027 (or approved by March 31, 2027 and starting by June 30, 2027) can continue under existing approved plans.
- Level 1 技能実習生 on April 1, 2027 may transition to Level 2.
- Level 2 技能実習生 who have completed at least 1 year may transition to Level 3.
- They do NOT automatically shift to the new 育成就労 system.

**Employer change (転籍) — fundamental new right:**
Under the old 技能実習 system: 原則として転職を認めなかった (employer changes were principally not allowed).

Under the new 育成就労 system, two types of transfers are allowed (from ISA Q&A Q40):
> 「転籍は、(1) 人権侵害等やむを得ない事情がある場合と、(2) 指定された条件下で、労働者本人の意向による場合に認められます。」

**Transition restriction period:** 分野により1〜2年 (1-2 years depending on field) before voluntary transfer is available (Q42).

**Receiving employer limit:** The number of voluntary transfer recipients cannot exceed 1/3 of the total workers at the receiving facility (Q46).

**Purpose change:**
| | 技能実習 | 育成就労 |
|---|---|---|
| Purpose | 国際貢献・技能移転 (International contribution / skill transfer) | 人材育成と人材確保 (Human resource development & workforce securing) |
| End goal | 技能検定資格 | 特定技能1号への移行 |
| Employer change | 原則不可 | 1-2年後に転籍可（条件付き）|
| Duration | 最大3年 | 3年間（基本）|

**Connection to 特定技能:**
- 育成就労 is explicitly designed as a pathway to 特定技能1号.
- The skill development and sector designations are aligned with 特定技能 fields.

## Safe Answer Behavior

- When a user asks if 技能実習 is still available: confirm it continues until April 1, 2027; the new system 育成就労 begins then; existing holders can continue under transition rules.
- When a user confuses the two systems: clearly explain the purpose difference and the employer-change rule as the key new feature.
- When a user asks about transferring employers under 技能実習 (old system): confirm this is principally not allowed under the current rules; the new 育成就労 system will change this.
- When a user (currently in 技能実習) asks about 2027: explain they can continue under their existing approved plan; they do NOT automatically switch to the new system.
- Do not apply 育成就労 rules to current 技能実習 holders (the new rules are not yet in effect for them).

## Must Say

- 技能実習制度は2027年4月1日（令和9年4月1日）に廃止され，新しい育成就労制度に置き換えられる。
- 2027年4月1日時点で日本にいる技能実習生は，認定された計画に基づき実習を継続できる（経過措置）。自動的に育成就労に切り替わるわけではない。
- 育成就労の大きな違いは，1〜2年後に労働者の意向による転籍（雇用主変更）が認められること。技能実習では原則認められなかった。
- 育成就労の目的は，国際貢献ではなく，日本国内での人材育成と人材確保であり，特定技能1号への移行を目指す制度である。

## Must Not Say

- 「技能実習は今後も変わらずに続く。」（2027年4月廃止）
- 「育成就労と技能実習は同じ制度。」
- 「育成就労でも技能実習と同様，転籍は認められない。」（転籍可が大きな違い）
- 「2027年4月に，今の技能実習生は全員自動的に育成就労に切り替わる。」（経過措置あり，継続可）

## Deep Water Triggers

- User is currently in 技能実習 and experiencing abuse/human rights violations — wants to know if they can change employers now (before 2027).
- User wants to know if they can transfer from 技能実習 to the new 育成就労 voluntarily before the April 2027 transition date.
- User's 技能実習 plan expires in 2028 — will they be under old or new rules?
- User is considering applying for 技能実習 now (in 2026) — should they wait for 育成就労 instead?
- User is a business wanting to hire under 技能実習 after 2026 — is this still possible?

## User Next Actions

This is not user-facing copy. For answer routing:

- For 技能実習 holders asking about the transition: explain the April 1, 2027 date and transition rules; route to professional for specific timeline planning.
- For employer-change situations under current 技能実習 (before 2027): the old 原則不可 rule applies; for human rights violations, route to 外国人在留総合インフォメーションセンター + lawyer immediately.
- For businesses asking about new hiring under 技能実習 after 2026: refer to the transition date; new 育成就労 system starts April 2027; route to professional for compliance planning.
- For users asking about 育成就労 → 特定技能 pathway: explain this is the intended end goal; route to professional for specific transition planning.

## Unknown Fields

- The specific sector designations for 育成就労 and how they map to 特定技能 sectors.
- The exact transition rules for 技能実習3号 holders (if any) who would still be mid-program in April 2027.
- Whether 育成就労 workers can directly apply for 特定技能1号 upon completing the 育成就労 period (exam exemption details — needs domain confirmation).
- Implementation details of the 転籍 request process, how workers formally request it, and what protections exist during the transfer request period.

## Needs Domain Flags

- needs_domain (P1): for a current 技能実習 holder experiencing poor working conditions but not meeting the threshold for "human rights violations" — what realistic options exist before April 2027?
- needs_domain (P1): what is the exact pathway from 育成就労 completion to 特定技能1号 — is a separate exam still required or is there a direct transition?
- needs_domain (P1): are there any early transition provisions for current 技能実習 holders to voluntarily move to the 育成就労 system before April 2027?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| ikusei-001 | "技能実習制度はまだ続いていますか？" | State: continues until April 1, 2027; new 育成就労 system replaces it then; existing holders continue under transition rules. |
| ikusei-002 | "育成就労では転籍できますか？技能実習と何が違いますか？" | Explain: old system = 原則不可; new system = 1-2 years after start, voluntary transfer permitted under conditions. This is a fundamental change. |
| ikusei-003 | "2027年4月になったら，今の技能実習生はどうなりますか？" | State: existing holders continue under their approved plans (transition rules); NOT automatically switched to new system; can progress through existing levels. |

## Source Notes

- The effective date (April 1, 2027) and the transition rules are confirmed from the ISA 育成就労 main page and Q&A (Q67).
- The employer change rules (転籍) are confirmed from ISA Q&A Q40/Q42/Q46.
- The purpose change (international contribution → human resource development) is confirmed from ISA 制度概要.
- The 特定技能1号 as end goal is confirmed from ISA 制度概要.
- The exact 育成就労 sector designations and exam exemption pathways from 育成就労 to 特定技能 are not fully confirmed in this session.
- The legal name: 外国人の育成就労の適正な実施及び育成就労外国人の保護に関する法律（令和6年法律第60号）, enacted June 21, 2024.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 006 G37. Key sources: ISA 育成就労 main page (effective date April 1, 2027) + Q&A (transition rules, 転籍 rules). Core facts: system abolition date; transition rules for existing holders; 転籍 as fundamental new right; 特定技能 as end goal.
