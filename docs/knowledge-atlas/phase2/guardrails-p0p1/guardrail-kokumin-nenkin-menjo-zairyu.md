---
asset_id: guardrail-kokumin-nenkin-menjo-zairyu
title: 国民年金免除申請と在留審査 — 免除申請≠未加入・滞納；公的義務の適正履行として評価される
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 007"
---

## What This Document Is

This guardrail prevents two categories of error in answering questions about 国民年金 (National Pension) exemption and its relationship to 在留 (residence) review:

1. **"免除を申請したら年金義務違反になる"** — incorrect. 免除申請 is a legally-provided procedure; using it properly is itself an act of compliance.
2. **"免除されているから全く問題ない"** — incomplete. The system distinguishes between:
   - 適正な免除申請 (properly filed exemption) = 公的義務の適正な履行 → PR and renewal review: compliant
   - 未加入・未申請のまま放置 = compliance failure → PR and renewal review: risk
   - 免除中に支払能力があるのに申告しない = integrity issue
3. **"国民年金は外国人には関係ない"** — incorrect. Foreign nationals aged 20-59 residing in Japan are subject to 国民年金 enrollment obligation (unless exempt via employer-based 厚生年金).

## Trigger

Use this card when the user says:

- "国民年金の免除申請をしているが，在留更新や永住申請に影響しますか？"
- "収入が少ないので国民年金を払っていませんが，永住申請は大丈夫ですか？"
- "国民年金の免除と滞納はどう違いますか？在留への影響は？"
- "在留更新のとき，年金の未払いは問題になりますか？"
- "外国人も国民年金に加入しなければなりませんか？"
- any pattern treating non-payment (by whatever route) as equal to proper exemption, or treating exemption as fully problem-free.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-eijuu-kijun | L4 | 出入国在留管理庁「永住許可に関するガイドライン」 | https://www.moj.go.jp/isa/applications/status/permanent_index.html | 2026-05-15 | G4 cross-ref. 「公的義務（納税義務，社会保険料の納付義務，公的年金及び公的医療保険への加入義務）を適正に履行していること」— PR criterion. |
| nenkin-kikou-menjo | L4 | 日本年金機構「国民年金保険料の免除・猶予」 | https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html | 2026-05-15 | Confirms: 免除は法定手続き（国民年金法第89条〜90条の3）に基づく正規の手続き。免除期間も受給資格期間に算入される（一部）。 |
| nenkin-law | L1 | 国民年金法 第89条・第90条 | (法令) | 2026-05-15 | 法定免除（第89条）・申請免除（第90条〜）の根拠条文。 |
| isa-pr-qa | L4 | 出入国在留管理庁「永住申請Q&A」 | https://www.moj.go.jp/isa/applications/status/permanent_index.html | 2026-05-15 | G4 cross-ref. 公的義務の適正履行が永住判断の独立要件として明記。 |

## Official Rule Or Source Fact

**PR guideline — confirmed from G4 (ISA 永住許可ガイドライン):**

> 「公的義務（納税義務，社会保険料の納付義務，公的年金及び公的医療保険への加入義務）を適正に履行していること」

This is an independent, explicit requirement in the PR guideline. The keyword is **適正に履行** (properly fulfilled).

**What "適正な履行" means for 国民年金:**

| 状況 | 評価 |
|---|---|
| 厚生年金加入（会社員等） | 適正（問題なし） |
| 国民年金加入・定期納付 | 適正（問題なし） |
| 収入不足で免除申請→承認 | 適正（法定手続きを正しく使用） |
| 学生納付特例を利用 | 適正（法定手続き） |
| 未加入（加入手続きを怠っている） | 不履行 → PR・更新リスク |
| 加入後に滞納（申請なし放置） | 不履行 → PR・更新リスク |
| 免除期間中に所得が回復したが申告せず | 虚偽申告リスク |

**Key distinction — 免除 vs. 滞納:**
- **免除 (免除申請)**: A statutory procedure under 国民年金法第90条. Filing and receiving exemption = compliance. Exempted periods are partially counted toward pension eligibility.
- **滞納 (non-payment without application)**: Failure to pay without proper exemption application = non-compliance with public obligation.

**Enrollment obligation for foreign nationals:**
- Foreign nationals residing in Japan aged 20-59, not enrolled in 厚生年金 via employment, are subject to 国民年金 enrollment obligation (same as Japanese nationals).
- Exception: Some temporary statuses (e.g., 短期滞在, certain 特定活動) may be excluded in practice, but this requires confirmation by status.

**PR assessment context:**
- The PR guideline evaluates past compliance, not just current status.
- Retroactive payment of arrears before application does not fully erase the delinquency record; it reduces risk but ISA retains discretion (G31 cross-ref: renewal/change discretion applies equally to PR).

## Safe Answer Behavior

- When a user says they filed for 免除: confirm this is proper legal use of the 国民年金 system; not a compliance failure; if properly processed, it satisfies the 公的義務 criterion.
- When a user says they are not paying and have not applied for anything: flag this as a compliance issue; the PR guideline requires 適正な履行; advise applying for 免除 immediately if they qualify, or starting payment.
- When a user asks whether exemption "counts" for PR: confirm exemption properly filed = compliant; the PR guideline looks at whether the process was correctly used, not whether full premiums were paid.
- Do not say "免除していれば全く問題ない" without noting that the exemption must be properly filed and approved; assumed or informal non-payment is not exempt.

## Must Say

- 国民年金の免除申請は国民年金法に基づく正規の手続きであり，適切に申請・承認されていれば，公的義務の「適正な履行」として評価される。永住申請等への悪影響はない。
- 免除申請をせずに保険料を滞納している場合，これは公的義務の不履行であり，永住申請のガイドライン要件を満たさないリスクがある。できるだけ早く免除申請をするか，支払いを再開することが重要。
- 在日外国人も原則として20歳以上59歳以下は国民年金への加入義務がある（厚生年金加入者を除く）。外国人だから関係ないわけではない。

## Must Not Say

- 「免除申請していれば，在留審査では全く問題にならない。」（必要条件だが，個別状況による）
- 「払っていなくても，永住申請の前にまとめて払えば大丈夫。」（遡及納付は一定リスク軽減になるが保証ではない）
- 「外国人は国民年金に関係ない。」
- 「免除と滞納は同じこと。」

## Deep Water Triggers

- User has 3+ years of non-payment with no exemption application and is now planning to apply for PR.
- User's income exceeded the exemption threshold during a period when they were claiming exemption — potential misrepresentation.
- User enrolled in 国民年金 but then stopped paying when changing jobs, without applying for exemption.
- User is on a short-term temporary status and unsure whether they need to enroll.
- User received a notice from 日本年金機構 demanding back payments — wants to know if paying now affects PR.

## User Next Actions

This is not user-facing copy. For answer routing:

- For compliant 免除 applicants: reassure and route to PR process if that is the main question.
- For users with arrears: route to 日本年金機構 website to check 免除申請 eligibility; route to professional (行政書士) for PR timeline impact assessment.
- For users with status + enrollment confusion: route to professional and local 市区町村 pension window for enrollment status verification.

## Unknown Fields

- The exact degree to which past arrears (retroactively paid) reduce vs. eliminate PR risk — ISA has discretion and no fixed formula is published.
- Whether ISA distinguishes between 1年の滞納 and 3年の滞納 in practice.
- How ISA verifies 国民年金 compliance — whether it is via tax records, 年金機構 data linkage, or submitted documents.

## Needs Domain Flags

- needs_domain (P1): for a user who has 2+ years of 滞納 and is now paying retroactively — what is the realistic PR impact, and how should TEBIQ frame this without making guarantees?
- needs_domain (P1): are there 在留資格 categories where the 国民年金 enrollment obligation does not apply (e.g., 特定活動 for short-term activities, 外交, etc.)?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| nenkin-001 | "収入が少なくて国民年金を免除申請しています。永住申請に影響しますか？" | State: proper exemption filing = 公的義務の適正な履行; does not negatively affect PR criterion; if approved, compliant. |
| nenkin-002 | "国民年金を払っていません。払わなくても大丈夫ですか？" | Ask: did they file an exemption application? If no: flag as compliance risk; advise applying for 免除 if eligible or resuming payment. |
| nenkin-003 | "免除と滞納，在留に関係ありますか？" | Explain the distinction: 免除申請（正規手続き）= 適正履行; 滞納（無申請）= 義務不履行 → PR ガイドライン違反リスク。 |

## Source Notes

- The PR guideline quote (公的義務の適正な履行) is confirmed from ISA official page, cross-referenced from G4.
- The 国民年金法 第90条 basis for exemption is law-layer (L1) — confirmed fact.
- The practical distinction (proper 免除 = compliance; 滞納 without application = non-compliance) is derived from the combination of G4 sources and 国民年金法.
- The retroactive payment impact on PR (partial risk reduction only) is marked needs_domain for the specific quantification.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 007 G42. Cross-ref G4 (PR guideline). Core facts: 免除申請 = 公的義務適正履行 (compliant); 滞納 without application = non-compliance; foreign nationals subject to enrollment obligation (general rule). Needs domain: retroactive payment impact on PR.
