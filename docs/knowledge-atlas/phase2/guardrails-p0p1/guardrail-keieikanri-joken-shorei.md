---
asset_id: guardrail-keieikanri-joken-shorei
title: 経営管理の具体的要件（上陸基準省令） — 財産3,000万円以上・常勤職員1名以上（両方必須）；500万円は省令上の根拠なし
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: quarantined
risk_level: P0
confidence: low
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 010"
---

## Quarantine Notice — 2026-05-15

This card is **not production-safe** and must not be used for positive-answer fact injection.

FACT and DOMAIN pre-release review found P0 mixed old/new rule errors:

- 500万円 was described as having no source/basis, but ISA's official reform overview identifies 500万円 as the previous requirement context.
- Post-2025-10-16 business-manager criteria were mixed with the old "3,000万円 or two employees" structure.
- Existing-holder renewal transition and 2028-10-16 handling are missing or under-specified.
- The Japanese-equivalent remuneration framing needs renewed source verification before being treated as a current hard criterion.

Use only the runtime guardrail `business-manager-2025-reform-hard-fact-boundary` until this card is rewritten from official source text.

See:

- `docs/domain/TEBIQ_0_8_BUSINESS_MANAGER_2025_REFORM_DOMAIN_REVIEW.md`
- `docs/eval/TEBIQ_0_8_GUARDRAIL_REAL_USER_QUESTIONS_LOOP2M.json`

## What This Document Is

This guardrail prevents critical errors about the specific landing criteria (上陸基準省令) for 経営管理 (Business Manager) visa applications. Key errors to block:

1. **"経営管理ビザは500万円あれば取れる。"** — this figure does NOT appear in the 上陸基準省令 text. The regulation requires 3,000万円 or more in capitalization/assets, OR the employment of one or more full-time employees. The commonly-circulated "500万円" figure has no basis in the 上陸基準省令.
2. **"財産要件か常勤職員要件のどちらかを満たせばよい。"** — incorrect reading. The two conditions in the 上陸基準省令 are structured as alternatives for certain tests, but the core requirement is that the business must demonstrate substantive commercial operation. Professional assessment of which prong applies is required.
3. **"バーチャルオフィス（住所だけ）でも経営管理ビザは取れる。"** — incorrect. A fixed, independently usable office space is required; virtual office addresses without actual business space do not meet the requirement.
4. **"経営者の報酬額は自由に設定できる。"** — incorrect. The 上陸基準省令 requires that the manager's salary be comparable to that received by Japanese nationals engaged in equivalent business activities.

Risk level: P0 — incorrect advice on 経営管理 requirements directly leads to rejected applications, financial loss, and potentially unlawful status.

## Trigger

Use this card when the user says:

- "経営管理ビザに必要な資本金はいくらですか？"
- "500万円あれば経営管理ビザが取れますか？"
- "経営管理ビザのオフィス要件は何ですか？"
- "バーチャルオフィスで経営管理ビザを申請できますか？"
- "経営管理ビザで役員の給料はいくらにすればよいですか？"
- "常勤職員がいれば資本金は少なくてもいいですか？"
- any pattern about the financial or physical requirements for 経営管理 visa applications.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| jorei-keiei | L2 | 上陸基準省令「経営・管理」 | (法令 PDF) | 2026-05-15 | 財産要件: 3,000万円以上の資本金又は出資の総額; 常勤職員: 日本に居住する者で本邦において就労可能な2名以上の常勤職員（役員除く）；または資本金・出資総額が3,000万円以上。報酬: 同種の業務に従事する日本人が通常受ける報酬と同等額以上。 |
| isa-keiei-main | L4 | 出入国在留管理庁「在留資格『経営・管理』」 | https://www.moj.go.jp/isa/applications/status/management.html | 2026-05-15 | 活動定義: 本邦において貿易その他の事業の経営を行い又は当該事業の管理に従事する活動; 事務所要件を含む. |
| g47-crossref | guardrail | guardrail-gijinkoku-dokuritsu-keieikanri (G47) | internal | 2026-05-15 | G47 covers activity definition and change-before-starting rule; this card covers specific 上陸基準省令 financial/office/salary requirements. |

## Official Rule Or Source Fact

**上陸基準省令「経営・管理」— confirmed financial and staffing requirements:**

The 上陸基準省令 sets out the following conditions for 経営管理 landing criteria (two alternative business-scale prongs):

**Prong A — Staffing:** 日本に居住する者で本邦において就労可能な**2名以上の常勤職員**（役員を除く）を雇用して事業を経営し又は管理する活動。

**Prong B — Financial:** 資本金の総額又は出資の総額が**3,000万円以上**である事業を経営し又は管理する活動。

Key points:
- These are the statutory conditions as written in the 上陸基準省令
- Both prongs relate to demonstrating a substantive business of sufficient scale
- A manager may qualify under either prong

**The "500万円" issue:**
The figure 500万円 does NOT appear in the 上陸基準省令 text for the 経営管理 category. The circulating "500万円 minimum capital" claim may derive from:
- Pre-amendment practice or earlier ISA guidance
- Confusion with other registration thresholds (e.g., old 有限会社 minimum capital before 2006 Companies Act)
- Informal ISA processing practice that is NOT in the regulation text
- Misreading of partial or outdated secondary sources

**CRITICAL**: Applicants relying on 500万円 as a sufficient capital figure are misunderstanding the statutory requirement. ISA officers evaluate against the 上陸基準省令, where the written threshold is 3,000万円.

**Office requirement (confirmed):**
経営管理 applicants must have a fixed business location (事務所) that is:
- A real, independently usable physical space
- Operated as the business's principal place of business
- Not merely a postal/virtual address

Virtual offices (住所レンタルのみ) are generally NOT accepted as satisfying the office requirement.

**Salary/remuneration requirement (confirmed from 上陸基準省令):**
> 「本邦において行われる当該事業の経営又は管理に従事する者に対して支払われる報酬が，本邦において同種の事業の経営又は管理に従事する日本人が通常受ける報酬と同等額以上であること。」

Manager/executive salary must be at least equal to what a Japanese national would receive in a comparable role — low or token salaries do not satisfy this requirement.

**Activity scope (from ISA management.html):**
> 「本邦において貿易その他の事業の経営を行い又は当該事業の管理に従事する活動」

G47 cross-ref: changing the 在留資格 before commencing management activities is required (see G47 for details). This card focuses on the statutory 上陸基準省令 requirements.

**Scale of business commitment required:**
経営管理 is not designed for nominal/shell company arrangements. The combination of:
- Physical office (real space)
- Adequate capital (3,000万円) OR sufficient staffing (2+ full-time employees)
- Market-rate management salary
- Actual business operation

...means that "paper companies" or minimal-investment setups will generally not pass ISA scrutiny.

## Safe Answer Behavior

- When asked about the capital requirement: state that the 上陸基準省令 specifies 3,000万円 for the financial prong; do NOT confirm "500万円 is sufficient."
- When asked about the office requirement: confirm a real physical business location is required; virtual offices generally do not qualify.
- When asked about the staffing alternative: explain the 2-full-time-employees prong as an alternative to the financial prong, but note this still requires actual business operations.
- When asked about management salary: confirm the Japanese-equivalent standard applies; low or nominal salaries do not satisfy the requirement.
- Always route to professional: 経営管理 applications are complex and fact-specific; professional (行政書士 or 弁護士) guidance is essential.

## Must Say

- 上陸基準省令の「経営・管理」に係る要件は，「**資本金・出資総額3,000万円以上**」または「**日本在住・就労可能な常勤職員2名以上（役員除く）**」のいずれかを満たすこと。「500万円あれば取れる」という通説は省令テキストに根拠がない。
- 経営管理ビザには**実体のある事務所（固定された業務拠点）**が必要。バーチャルオフィス（住所のみ）は原則として認められない。
- 役員報酬・管理者の報酬は，**同種業務に従事する日本人が通常受ける報酬と同等額以上**でなければならない（上陸基準省令の要件）。
- 経営管理ビザは形式的な会社設立だけでは取得できない。実体ある事業運営・オフィス・適正な資本または人員の確保が必要。

## Must Not Say

- 「資本金500万円あれば経営管理ビザは取れる。」（省令上の根拠なし）
- 「バーチャルオフィスでも経営管理ビザの住所要件を満たす。」（原則不可）
- 「役員報酬は自由に設定できる。」（日本人同等以上が要件）
- 「資本金か常勤職員のどちらか一方さえあれば，他の要件は関係ない。」（事務所・報酬等の要件も必要）

## Deep Water Triggers

- Foreign investor wants to open a restaurant with 300万円 capital and no full-time employees — can they get 経営管理?
- An applicant has 3,000万円 capital but only a shared desk at a co-working space — does this meet the office requirement?
- An applicant is a sole officer of a company where they are the only employee — does the "2 full-time employees" prong apply?
- A person holds 経営管理 but the business has effectively stopped operating — will renewal be denied?
- A foreign national wants to be appointed as a director (役員のみ) of an existing company without managing day-to-day operations — is this sufficient for 経営管理?

## User Next Actions

This is not user-facing copy. For answer routing:

- For applicants below 3,000万円 capital without 2+ full-time employees: flag that neither prong is met; do not proceed with application until requirements are satisfied; route to professional.
- For virtual office applicants: flag the office requirement issue immediately; this is a common rejection reason; route to professional to assess alternative office arrangements.
- For low-salary structures: flag the Japanese-equivalent salary requirement; nominal salaries are a red flag and potential rejection ground.
- For all 経営管理 inquiries: route to 行政書士 or 弁護士 with experience in 経営管理 applications.

## Unknown Fields

- Whether ISA has issued any internal guidance treating the 500万円 threshold as an acceptable alternative in specific factual circumstances (this would be informal practice, not statutory).
- The exact standard ISA uses to evaluate "substantive business operations" when the 3,000万円 threshold is not met but 2+ employees exist.
- What level of office space (size, lease terms) ISA considers acceptable for the physical-location requirement.

## Needs Domain Flags

- needs_domain (P0): the "500万円" figure circulates widely in 経営管理 visa guidance materials. Does ISA have any formal or informal position that 500万円 is acceptable in certain circumstances, despite the 上陸基準省令 stating 3,000万円? This is a critical discrepancy requiring domain expert confirmation before any TEBIQ answer uses a 500万円 threshold.
- needs_domain (P1): what is ISA's operational standard for evaluating co-working spaces and shared offices as the required "事務所" for 経営管理?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| keiei-001 | "経営管理ビザには資本金いくら必要ですか？" | State: 上陸基準省令では3,000万円以上（財産プロング）または常勤職員2名以上（人員プロング）。「500万円あれば取れる」という説は省令テキストに根拠なし。専門家に相談を。 |
| keiei-002 | "バーチャルオフィスで経営管理ビザを申請できますか？" | State: 原則として不可。固定した実体のある事務所（業務拠点）が必要。住所貸しのみのバーチャルオフィスは要件を満たさない可能性が高い。専門家に相談を。 |
| keiei-003 | "経営管理ビザで役員報酬はいくらにすればいいですか？" | State: 上陸基準省令上，同種業務に従事する日本人が通常受ける報酬と同等以上が必要。低額・形式的な報酬は要件不適合となるリスクあり。専門家に相談を。 |

## Source Notes

- Financial requirement (3,000万円以上) and staffing requirement (常勤職員2名以上) confirmed from 上陸基準省令「経営・管理」(L2 — regulation text).
- Activity definition confirmed from ISA management.html (L4 — official ISA status page).
- Office requirement (実体ある事務所) is structural from ISA 経営管理 guidance and general ISA practice on this point.
- Salary requirement (日本人同等以上) confirmed from 上陸基準省令 text.
- The "500万円" issue: NOT found in 上陸基準省令 text; source of this figure marked as needs_domain P0.
- Cross-ref G47 (経営管理 activity definition; change-before-starting rule), G16 (資格外活動許可 — inapplicable to 経営管理 context).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 010 G57. CRITICAL FACT: 上陸基準省令 states 3,000万円 (not 500万円). Key sources: 上陸基準省令「経営・管理」(L2); ISA management.html (L4). Core requirements: 3,000万円 financial OR 2+ full-time employees; fixed office; Japanese-equivalent salary. The 500万円 figure has no confirmed 上陸基準省令 basis — marked needs_domain P0 for domain expert verification. Cross-ref G47.
