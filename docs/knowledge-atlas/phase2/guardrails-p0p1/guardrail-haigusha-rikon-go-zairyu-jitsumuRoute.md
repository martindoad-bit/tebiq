---
asset_id: guardrail-haigusha-rikon-go-zairyu-jitsumu-route
title: 配偶者ビザ離婚後の在留実務ルート — 届出・変更・継続の具体的分岐（G8補完）
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

This card is a focused practical complement to G8 (guardrail-spouse-divorce-death-remarriage), which established the core legal rules (14-day notification, 6-month continued stay, G29 cross-ref). G8 does not cover the practical decision routing after divorce is confirmed — what the user should actually do next, what options exist, and which patterns are dangerous.

This card (G45) blocks:

1. **"離婚してもとりあえず黙っていれば大丈夫。"** — 14-day notification obligation exists; see G8+G29.
2. **"配偶者ビザのままずっと日本に居続けられる。"** — status basis is eliminated at divorce; 6-month window only for transition, not indefinite continuation.
3. **"離婚したら即座に強制退去になる。"** — incorrect; there is a transition period and multiple legitimate route options.
4. **"仕事をしていれば就労ビザに変更できる。"** — oversimplification; 在留資格変更 requires meeting the requirements of the target status; past activity scope matters.

## Trigger

Use this card when the user says:

- "離婚しました。配偶者ビザはどうなりますか？次は何をすればいいですか？"
- "離婚後もしばらく日本に住み続けたい，どの在留資格に変更できますか？"
- "離婚後，就労ビザに変更できますか？"
- "配偶者ビザ離婚後に永住申請できますか？"
- "離婚後の定住者ビザはどういう場合に認められますか？"
- "離婚してから何か月以内に手続きをしなければなりませんか？"
- any pattern asking about next steps after divorce for a spouse-visa holder.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| g8-crossref | guardrail | guardrail-spouse-divorce-death-remarriage (G8) | internal | 2026-05-15 | Core rules: 14-day notification (G29 cross-ref); 6-month transition window; status continues during pending change application. |
| isa-haigusha-main | L4 | 出入国在留管理庁「在留資格『日本人の配偶者等』」 | https://www.moj.go.jp/isa/applications/status/spouse01.html | 2026-05-15 | G8 source. Basis for status: marriage relationship. |
| isa-teijusha | L4 | 出入国在留管理庁「在留資格『定住者』」 | https://www.moj.go.jp/isa/applications/status/long_term_resident01.html | 2026-05-15 | 定住者 is a recognized route for certain divorced former-spouses of Japanese nationals (告示外定住 via discretionary grant). |
| isa-henkou | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-15 | 在留資格変更 procedure; applicant must meet requirements of target status. |
| isa-tokutei-katsudo-rikon | L4-indirect | 出入国在留管理庁（特定活動・定住者の運用） | (告示外定住 — operational guidance) | 2026-05-15 | Medium confidence. 告示外定住 for former spouses of Japanese nationals is a recognized discretionary route; based on children, Japan-based life circumstances. Needs domain confirmation for details. |

## Official Rule Or Source Fact

**Core rule (from G8, confirmed):**
- Upon divorce, the 配偶者 (Spouse of Japanese National / Spouse of Permanent Resident) status basis is eliminated.
- **14-day notification** to ISA is required (G29 cross-ref: 届出義務).
- The status itself continues during the remaining 在留期間, but renewal is not automatically granted.
- **6-month window**: ISA reviews whether the person has "正当な理由" to remain; a pending 在留資格変更 application preserves lawful status during processing (特例期間 — G1 cross-ref).

**Post-divorce route options:**

| ルート | 要件（概要） | 難易度 |
|---|---|---|
| 就労ビザへ変更 (技術・人文知識・国際業務等) | 日本の会社等と雇用契約、学歴/職歴が要件に合致 | 中〜高（要件審査） |
| 永住申請 (PR) | 通算在留年数、素行、公的義務要件 等 (G4 cross-ref); 配偶者ビザでの在留年数は算入可 | 高（要件次第） |
| 定住者への変更 | 日本人との子の養育、長期在留実績、生活基盤が日本にある等（告示外定住扱いが多い） | 要個別判断 |
| 家族滞在 | 日本に在留する別の親族（子等）の扶養を受ける場合 | 状況依存 |
| 特定活動（告示）| 状況に応じた個別指定 | 要ISA判断 |
| 帰国 | 上記いずれも該当しない場合 | — |

**就労ビザへの変更 — key guardrail:**
- Past work experience during 配偶者 status does not automatically qualify the person for a 就労 status.
- The target status (e.g., 技術・人文知識・国際業務) has its own requirements: education level, job content matching the subcategory, employer stability, etc.
- A short-term part-time job during 配偶者 status ≠ sufficient basis for 技術・人文知識・国際業務.

**定住者 — key points (medium confidence for detail):**
- "告示外定住" is ISA's discretionary grant (法務大臣の個別裁量).
- Recognized by practice for former-spouses of Japanese nationals who:
  - Have joint custody or are primary caregiver of children with Japanese nationality
  - Have long-term residence and established life in Japan
  - Have no serious conduct issues
- There is no statutory checklist; ISA evaluates holistically.
- Must be applied for; not automatic.

**Permanent Residence from 配偶者 status:**
- In-period stay on 配偶者 status counts toward total residence period for PR.
- Minimum residence period requirement for PR (typically 10 years continuous, with 3+ years on a qualifying status, or 5 years PR-shortcut if HSP/special categories — G4 cross-ref).
- Divorce itself does not bar PR, but the basis (marriage to Japanese/PR) that gave a shortened route may no longer apply.
- PR application requires current lawful status; a pending 在留資格変更 must be resolved first.

**The 6-month rule (from G8):**
- Under 入管法 第22条の2第1項, when the basis for the status (marriage) ceases to exist, the status continues but renewal will scrutinize whether circumstances justify continued stay.
- ISA guidance: within 6 months of divorce, pursue status change or PR if remaining.
- Exceeding 6 months without a status change application is a significant risk factor for non-renewal.

## Safe Answer Behavior

- When a recently divorced spouse-visa holder asks what to do: confirm the 14-day notification obligation (G8+G29); explain the 6-month window; outline the main route options without recommending.
- When asked about 就労ビザ: confirm it is possible if requirements are met, but past activity during 配偶者 status is not automatic qualification; advise professional assessment.
- When asked about PR: explain the total-period calculation; advise professional for whether they meet the years/conduct/obligation requirements.
- When asked about 定住者: explain it is a possibility (especially with children), but it is discretionary; route to professional.
- Do not promise any specific route will work without knowing the individual circumstances.

## Must Say

- 離婚後は，14日以内に入管へ届出をする義務がある（G8・G29参照）。届出後，速やかに在留資格変更の手続きを検討することが重要。
- 配偶者ビザの在留期間中は日本に滞在できるが，期間内であっても離婚後の更新は自動的には認められない。在留資格変更申請が在留期間内に受理されれば，特例期間として審査中も適法に在留できる（G1参照）。
- 離婚後の在留継続ルートとしては，就労ビザへの変更，定住者（告示外・裁量的判断）への変更，永住申請（要件を満たす場合）などがある。状況に応じた専門家への相談が不可欠。
- 就労ビザへの変更は，対象ビザの要件（学歴・職歴・雇用契約内容）を個別に満たす必要があり，配偶者ビザ中の在職経験だけでは自動的に認められない。

## Must Not Say

- 「離婚してもしばらく黙っていれば大丈夫。」（届出義務あり，G29）
- 「離婚したら即座に強制退去になる。」（6か月の猶予あり，在留期間中は合法滞在）
- 「就労経験があれば就労ビザに変更できる。」（対象ビザの独立した要件審査が必要）
- 「定住者への変更は自動的に認められる。」（告示外定住は裁量的判断）

## Deep Water Triggers

- User is divorced but has children with the Japanese spouse — wants to stay for childcare.
- User has been in Japan for 2 years total on 配偶者 status and wants PR after divorce.
- User divorced, did not file notification, and is now past the 6-month mark.
- User is experiencing DV (domestic violence) and divorce is happening simultaneously — safety issues override normal routing (G9 cross-ref).
- User's Japanese spouse filed for divorce unilaterally; user did not agree and is contesting.
- User is on 永住者の配偶者等 (Spouse of Permanent Resident) — different status from 日本人の配偶者等; different rules apply.

## User Next Actions

This is not user-facing copy. For answer routing:

- For DV-involved divorces: prioritize G9 (DV safety + ISA consideration of address/safety); route to support center first.
- For users with children: route to professional for 定住者 (告示外) eligibility assessment.
- For users approaching the 6-month mark: flag urgency; status change must be filed while lawful; route to 行政書士 immediately.
- For users wanting PR: route to G4 (PR guideline) for requirement overview; route to professional for timeline calculation.
- For users with no employment and no children: explain limited options frankly; departure may be the realistic outcome if no qualifying status is available.

## Unknown Fields

- The exact ISA criteria for 定住者 (告示外) grant for former spouses of Japanese nationals — no published statutory checklist; operation is by discretion.
- Whether 永住者の配偶者等 divorce has different procedures or windows than 日本人の配偶者等.
- The impact of uncontested vs. contested divorce proceedings on ISA's assessment of the marriage's genuine nature (if relevant to subsequent applications).

## Needs Domain Flags

- needs_domain (P1): for a person divorced after only 1 year of marriage, with no children and no employment history — what is the realistic assessment of 定住者 chances? TEBIQ should not promise this route.
- needs_domain (P1): does a pending divorce (調停中) trigger the 14-day notification obligation or only a final divorce (確定判決/協議離婚成立)?
- needs_domain (P1): for 永住者の配偶者等 after divorce — is the transition window and route structure the same as for 日本人の配偶者等?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| haigusha-rikon-001 | "離婚しました。配偶者ビザのままでいられますか？次は何をすればいいですか？" | State: 14-day notification obligation; status continues during 在留期間 but renewal unlikely without status change; explain route options; route to professional. |
| haigusha-rikon-002 | "離婚後，仕事があるから就労ビザに変更できますか？" | State: possible if requirements of target status are met; past activity alone is insufficient; individual assessment needed; route to professional. |
| haigusha-rikon-003 | "離婚後も子どもがいるので定住者ビザに変更したい。" | State: 定住者 (告示外) is a recognized discretionary route for caregiving parents; no guaranteed outcome; ISA decides holistically; route to professional urgently. |

## Source Notes

- G8 is the base for core legal rules (14-day notification, 6-month window, status continuation during pending application).
- The 就労ビザ route and its independent requirements are derived from G31 (discretionary review) and G35 (gijinkoku activity requirements).
- 定住者 (告示外) information is medium confidence — ISA operational practice, not directly confirmed from accessed official text in this session. Marked as needs_domain for specifics.
- PR route confirmed from G4 cross-reference.
- 定住者 main page (ISA) was identified as a source but specific criteria for divorced former-spouses were not extracted from accessed text.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 007 G45. G8 complement card. Covers post-divorce practical routing: notification obligation, route options (就労/定住者/PR), warnings on automatic assumptions. Cross-ref G1 (特例期間), G4 (PR guideline), G8 (core spouse-status rules), G9 (DV safety), G29 (notification obligation), G31 (renewal discretion), G35 (employment activity scope). Needs domain: 定住者 criteria; pending divorce notification trigger; 永住者配偶者等 differences.
