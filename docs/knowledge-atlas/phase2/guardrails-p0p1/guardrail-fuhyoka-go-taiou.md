---
asset_id: guardrail-fuhyoka-go-taiou
title: 在留申請「不許可」後の対応 — 不服申立方法はなし；再申請のみ；期間切れ後不許可は即不法在留
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 009"
---

## What This Document Is

This guardrail prevents errors about options after a 在留資格 application (renewal, change, CoE, PR) is denied (不許可). Key errors to block:

1. **"不許可になっても，異議申立（審査請求）ができる。"** — incorrect for ordinary 在留資格 applications. ISA procedure pages explicitly state 不服申立方法：なし for all major applications.
2. **"不許可後も日本に在留できる特別な期間がある。"** — incorrect. No statutory grace period exists after 不許可 — unlike the special period during a pending application. Lawfulness depends solely on the original period status.
3. **"不許可になったら，一定期間後に再申請できない。"** — incorrect in the opposite direction. ISA does not specify any mandatory waiting period before re-application.
4. **"退去強制手続内の異議申出 = 在留申請の不許可への異議申立。"** — incorrect. The 異議申出 within 退去強制手続 (deportation proceedings) is a completely different procedure from ordinary 在留申請 denials.

## Trigger

Use this card when the user says:

- "在留更新が不許可になりました。どうすればいいですか？"
- "不許可に対して異議申立できますか？"
- "不許可後，再申請はいつできますか？"
- "不許可になったら日本にいられますか？"
- "不許可と言われたが，審査請求はできますか？"
- any pattern assuming formal appeal rights exist for ordinary 在留資格 denials, or asking about post-denial stay options.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-proc-16-3 | L4 | 出入国在留管理庁「在留期間更新許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | 2026-05-15 | 不服申立方法：「なし」— explicitly stated. |
| isa-proc-16-2 | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-15 | 不服申立方法：（記載なし）— no appeal procedure listed. |
| isa-proc-16-4 | L4 | 出入国在留管理庁「永住許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-4.html | 2026-05-15 | 不服申立方法：「なし」— explicitly stated. |
| isa-proc-16-1 | L4 | 出入国在留管理庁「在留資格認定証明書交付申請」 | https://www.moj.go.jp/isa/applications/procedures/16-1.html | 2026-05-15 | 不服申立方法：「なし」— explicitly stated. |
| g1-crossref | guardrail | guardrail-special-period-two-month-boundary (G1) | internal | 2026-05-15 | Special period exists only during PENDING application (before disposition). After 不許可 (disposition), no special period continuation. |
| g20-crossref | guardrail | guardrail-fuhyo-go-zairyu-kikan (G20) | internal | 2026-05-15 | Non-permission = disposition → special period ends immediately. Two scenarios: original period remaining vs. expired. |

## Official Rule Or Source Fact

**不服申立方法：なし — confirmed from ISA procedure pages:**

For all major 在留資格 application types, ISA official pages state:

> 不服申立方法：「なし」

This covers:
- 在留期間更新許可申請 (16-3.html)
- 永住許可申請 (16-4.html)
- 在留資格認定証明書交付申請 (16-1.html)
- 在留資格取得許可申請 (16-10.html)

**Why no 審査請求 exists:**
The 入管法 operates as lex specialis (special law) with respect to the general 行政不服申立法 (Administrative Appeal Act of 2014). The Minister of Justice's 在留 decisions are generally excluded from the standard 審査請求 route.

**Deportation proceedings 異議申出 — NOT the same thing:**
The 異議申出 procedure under 入管法 第61条の2の9 applies only within 退去強制手続 (deportation enforcement proceedings) — i.e., when an immigration officer has determined a person is subject to deportation. This is NOT an appeal right against a routine 在留資格 application denial.

**Post-denial options in practice:**
1. **Re-application (再申請)**: The primary practical route. Address the reason for denial (additional documents, corrected information, changed circumstances) and re-apply.
2. **No mandatory waiting period**: ISA does not specify a minimum time that must pass before re-application.
3. **Judicial review (行政訴訟)**: Theoretically available via administrative litigation (行政事件訴訟法), but extremely difficult for 在留 discretionary decisions and practically almost never succeeds for ordinary applications.

**Stay lawfulness after 不許可:**

The legal status depends on whether the original 在留期間 was still active at the time of 不許可:

| 状況 | 在留の合法性 |
|---|---|
| 不許可時点で元の在留期間がまだ残っている | 元の在留期間の終了日まで適法在留可。その後，在留期間内に再申請するか帰国が必要。 |
| 不許可時点で元の在留期間が（特例期間中に）既に満了している | 即時不法在留（在留する法的根拠がない）→ 帰国または 在留特別許可（G21 cross-ref）しか選択肢なし |

**Key point:** Unlike the 特例期間 (which provides continued legal stay during a pending application), there is NO grace period after 不許可. The 不許可 = disposition → 特例期間 ends (G1/G20 cross-ref).

**If original period had NOT yet expired at time of 不許可:**
The person can remain in Japan during the rest of the original period. However, they are no longer in a "pending" protected status. They must re-apply (and the re-application would start a new 特例期間 if filed before the original period ends), or depart.

## Safe Answer Behavior

- When a user says their application was denied: confirm there is no formal appeal route for ordinary 在留資格 denials; re-application is the path forward.
- When a user asks about 審査請求 or 異議申立: confirm these do not exist for routine application denials; distinguish from deportation-proceeding 異議申出 (completely different).
- When a user asks whether they can stay in Japan after 不許可: assess whether the original period is still running or had already expired; explain accordingly.
- When a user is post-denial with original period expired: flag as potential unlawful stay; route to lawyer immediately (G21 cross-ref — 在留特別許可 territory only if in deportation proceedings).
- Do not advise continuing to stay in Japan after 不許可 if the original period had expired.

## Must Say

- 在留期間更新・変更・永住等の申請が不許可になった場合，日本の入管法の仕組み上，正式な異議申立（審査請求・行政不服申立）は認められていない（不服申立方法：なし）。
- 不許可後の実務上の選択肢は「再申請」。再申請の前に待機期間は定められていない。不許可の理由に対応した書類・事情を整えた上で再申請することが重要。
- 不許可後の在留可否は，元の在留期間がまだ残っているかどうかに依存する。元の在留期間が不許可時点で既に満了していれば，不法在留となり，直ちに帰国か特別の手続きが必要。
- 退去強制手続内の「異議申出」（第61条の2の9）は，通常の在留申請不許可に対する異議申立ではなく，全く異なる手続きである。

## Must Not Say

- 「不許可になっても審査請求（行政不服申立）ができる。」
- 「不許可後も，異議申立中は日本に滞在できる。」
- 「不許可後は○か月は再申請できない。」（待機期間はない）
- 「不許可の後は，何らかの猶予期間がある。」（特例期間は不許可で終了する）

## Deep Water Triggers

- User received 不許可 and their original period has already expired — they are still in Japan.
- User received 不許可 on a PR application while their current work-visa period is still valid — what are their options?
- User received 不許可 and wants to appeal to a court (行政訴訟) — is this theoretically possible?
- User received 不許可 for their 在留資格変更 application and their original status is still valid for 2 months — can they re-apply immediately?
- User received 不許可 but does not understand the stated reason — how to obtain the reason for denial?

## User Next Actions

This is not user-facing copy. For answer routing:

- For users with original period still valid: route to re-application preparation; advise gathering the materials that address the stated denial reason; professional assistance (行政書士) recommended.
- For users with expired original period after 不許可: route to lawyer immediately — this is potential unlawful stay; only 在留特別許可 (within deportation proceedings) may apply (G21 cross-ref).
- For users denied PR while current status is valid: clarify their current status continues; they can re-apply for PR while current status is in force; route to professional for assessment.
- For users confused about appeal rights: clarify the no-appeal framework; do not raise false hope about judicial review succeeding for discretionary decisions.

## Unknown Fields

- The exact process for obtaining the formal denial reason from ISA (whether a written 不許可理由 is always provided or must be requested).
- Whether ISA has any informal "reconsideration" (申出) path for cases where new facts emerge immediately after denial.
- The practical outcome statistics for judicial review (行政訴訟) of 在留 decisions — not publicly available.

## Needs Domain Flags

- needs_domain (P1): can a person request a written explanation of the 不許可 reason from ISA, and is this required before re-application?
- needs_domain (P1): for users denied a renewal while original period has 1-2 months remaining — what is the ISA processing time expectation for a re-application, and is there a risk of the original period expiring before re-application is decided?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| fuhyoka-001 | "在留更新が不許可になりました。異議申立できますか？" | State: 不服申立方法：なし (ISA official); no formal appeal; re-application is the practical route. |
| fuhyoka-002 | "不許可後も日本にいてもいいですか？" | State: depends on whether original period is still valid; if expired → unlawful stay; if still valid → can remain until expiry but must act quickly to re-apply or depart. |
| fuhyoka-003 | "不許可後，再申請はいつできますか？" | State: no mandatory waiting period specified by ISA; re-apply as soon as circumstances are corrected; professional guidance recommended. |

## Source Notes

- 不服申立方法：なし confirmed from ISA procedure pages (16-1, 16-3, 16-4, 16-10.html).
- The 異議申出 in deportation proceedings (入管法 第61条の2の9) confirmed as separate from ordinary application denials.
- No statutory grace period after 不許可 derived from G1/G20 cross-reference (disposition ends special period).
- The "original period status governs stay lawfulness" conclusion is structural from 入管法 第20条・第21条 framework.
- Judicial review (行政訴訟) is theoretically available but practically very difficult — marked unknown for success-rate data.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 009 G52. Key sources: ISA 16-1/16-2/16-3/16-4.html (不服申立方法：なし confirmed). Core facts: no appeal route; re-application only; no waiting period; post-denial lawfulness depends on original period status. Cross-ref G1 (特例期間 ends at disposition), G20 (non-permission consequences), G21 (在留特別許可 — different context).
