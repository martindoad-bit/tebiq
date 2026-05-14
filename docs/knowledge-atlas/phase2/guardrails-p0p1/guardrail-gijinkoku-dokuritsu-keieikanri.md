---
asset_id: guardrail-gijinkoku-dokuritsu-keieikanri
title: 技人国保持者の独立・起業 — 経営管理活動の開始前に在留資格変更が必要；役員就任のみでは不十分
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 008"
---

## What This Document Is

This guardrail prevents errors for 技術・人文知識・国際業務 (技人国) holders who want to start their own business or become executives/managers of a company. Key errors to block:

1. **"会社を設立してから，在留資格変更を申請すればいい。"** — incorrect. Engaging in business management/administration activities (経営・管理) while holding 技人国 constitutes unauthorized 資格外活動 — the status change must precede or coincide with the commencement of management activities.
2. **"役員に就任するだけなら，技人国のままでいい。"** — incorrect. Becoming a director with substantive involvement in business management = 経営管理 activity; requires the appropriate status.
3. **"副業で小さな会社を作るくらいなら問題ない。"** — incorrect. The activity test for 経営管理 is based on the nature of the activity, not its scale.
4. **"技人国から経営管理への変更は簡単にできる。"** — oversimplification. Specific office, business continuity, and financial requirements apply; the application is substantively reviewed.

## Trigger

Use this card when the user says:

- "技人国で働いているが，自分でも会社を作りたい。"
- "副業として別会社の代表取締役になっても問題ないですか？"
- "技人国のまま独立・起業はできますか？"
- "経営管理ビザへの変更はどうすればいいですか？"
- "会社設立後に在留資格変更を申請したい。"
- "技人国で役員に就任してもいいですか？"
- any pattern assuming 技人国 covers management/executive activities at a self-owned company.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-keiei-kanri-main | L4 | 出入国在留管理庁「在留資格『経営・管理』」 | https://www.moj.go.jp/isa/applications/status/businessmanager.html | 2026-05-15 | Activity definition for 経営管理: 「本邦において貿易その他の事業の経営を行い又は当該事業の管理に従事する活動」. Qualifying examples: 企業等の経営者・管理者. |
| isa-keiei-meikaku | L4 | 出入国在留管理庁「外国人経営者の在留資格基準の明確化について」 | https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan43.html | 2026-05-15 | Substantive participation requirement; 役員就任 alone insufficient; establishment requires: 事業の重要事項の決定・執行・監査への実質的参画. Business continuity and office requirements also addressed. Tax/labor/social insurance compliance required. |
| g35-crossref | guardrail | guardrail-gijinkoku-gyomu-youken-boundary (G35) | internal | 2026-05-15 | 技人国 activity scope: 技術/人文知識/国際業務 = employment-based activities. Does not include business management/administration at self-owned companies. |

## Official Rule Or Source Fact

**経営管理 activity definition (confirmed from ISA businessmanager.html):**
> 「本邦において貿易その他の事業の経営を行い又は当該事業の管理に従事する活動（入管法別表第一の二の表の法律・会計業務の項に掲げる資格を有しなければ法律上行うことができないこととされている事業の経営又は管理に従事する活動を除く。）」

Qualifying examples: 企業等の経営者・管理者

**Substantive participation requirement (confirmed from ISA nyukan43.html):**
> 「外国人が我が国において事業を起こし、又は既存の事業の経営又は管理に従事する場合、その活動は「経営・管理」の在留資格に該当することとなりますが、この場合、その前提として、当該外国人が事業の経営又は管理に実質的に参画していること、すなわち、事業の運営に関する重要事項の決定、事業の執行又は監査の業務に従事する活動を行っていることが必要となります。」

**Director-title alone insufficient:**
> 「２名以上の外国人が共同で事業を経営する場合、役員に就任しているということだけでは、「経営・管理」の在留資格に該当するものとはいえません。」

**Business continuity requirement:**
> 「事業は継続的に運営されることが求められることから、月単位の短期間賃貸スペース等を利用したり、容易に処分可能な屋台等を利用したりする場合には、上陸基準省令の要件に適合しているとは認められません。」

**Regulatory compliance:**
> 「事業者としての義務の履行について、租税関係法令を遵守し、労働関係法令・社会保険関係法令を遵守していることが必要です。」

**Why 技人国 does NOT cover 経営管理 activity:**
技人国 permits:
- Technical work (技術 subcategory)
- Humanities/international services (人文知識/国際業務 subcategories)
under an employment relationship with a Japanese organization.

It does NOT cover:
- Acting as the business owner/manager responsible for management decisions
- Having executive authority over business operations
- Running one's own business

When a 技人国 holder starts running their own company and exercises management authority over it, this constitutes 経営管理 activity outside the permitted scope of 技人国 → 資格外活動 violation.

**When status change is needed:**
- Before starting to exercise management authority at a self-owned business
- The 在留資格変更許可申請 for 経営管理 should be filed and approved before commencing management activities

**Financial and infrastructure requirements (from 上陸基準省令):**
- 500万円 capital investment OR employing 2+ full-time Japanese/permanent resident employees (alternative condition)
- Permanent and stable office space (not month-to-month rental; no easily-dismantled setups)
- Business must be viable and continuously operated

**Note on 500万円:** The 500万円 figure appears in 上陸基準省令別表第二 (not the ISA overview pages), but is widely cited as the standard threshold. The ISA nyukan43 page references the 3,000万円 figure in a different financial context. Professional advice is essential for the capital structure question.

## Safe Answer Behavior

- When a 技人国 holder asks about starting a business: clearly state that exercising management authority at a self-owned company requires 経営管理 status; file the change application BEFORE starting management activities.
- When asked about becoming a director at another company: distinguish nominal directorship (no management activities) vs. substantive management role; substantive = 経営管理 status needed.
- When asked about company establishment first, then status change: strongly caution that starting management activities before status change = potential 資格外活動.
- When asked about requirements for 経営管理: explain substantive participation, office stability, financial requirements; route to professional.
- Do not say "小規模なら技人国のままでいい."

## Must Say

- 技人国（技術・人文知識・国際業務）は，雇用契約に基づく就労活動を許可する在留資格であり，自己の会社の「経営・管理」活動（重要事項の決定，事業の執行，監査等）は含まれない。
- 自社の経営や管理に実質的に参画するためには，在留資格変更許可（技人国→経営管理）が必要。この変更は，経営管理活動を開始する前に行う必要がある。
- 役員に就任するだけでは「経営・管理」の在留資格に該当するとはいえず，実質的な経営参画（重要事項の決定・執行・監査）が伴う場合に初めて該当する。
- 経営管理への変更申請には，事業の実態（継続的な事務所，資本要件，法令遵守等）の審査が必要。専門家（行政書士・弁護士）への相談が不可欠。

## Must Not Say

- 「副業で会社を作るだけなら，技人国のままでいい。」
- 「会社設立後に在留資格変更すれば大丈夫。」（設立後に経営活動を開始してから変更申請 = 違反リスク）
- 「役員に就任するだけなら技人国のままOK。」（実質的参画の有無による）
- 「経営管理ビザは取るのが簡単。」（要件審査あり）

## Deep Water Triggers

- 技人国 holder is already serving as a director/representative of a self-owned company and asking whether they need to change status.
- 技人国 holder wants to continue their salaried job AND run their own business simultaneously.
- 技人国 holder's company went bankrupt and they are now trying to convert to 経営管理 for a new business.
- 技人国 holder is just a nominal director (無報酬, 名義上のみ) with no management involvement.
- The business started as 技人国 employment but the company is now employee-owned and the foreign national became a shareholder with management authority.

## User Next Actions

This is not user-facing copy. For answer routing:

- For those who have NOT yet started management activities: route to 経営管理 変更申請 process; recommend 行政書士 for application preparation.
- For those who have ALREADY started management activities without status change: flag as potential 資格外活動 (G35+G26 cross-ref risk); route to lawyer/行政書士 immediately.
- For the simultaneous employment + own-business scenario: this is complex (some activities under 技人国, others requiring 経営管理); route to professional.
- For nominal directorship (no real management involvement): note the boundary is unclear; professional assessment needed before any action.

## Unknown Fields

- The exact ISA stance on nominal (non-active) directorship with zero management activities — whether this triggers 経営管理 classification even with no actual involvement.
- Whether the 500万円 capital requirement applies universally or has alternatives in all sectors.
- Whether a concurrent employment + 経営管理 combined status is available (generally not — typically must choose one primary status).

## Needs Domain Flags

- needs_domain (P1): can a person hold 技人国 and simultaneously run their own business if the businesses are completely separate and the management activities are minimal — where is the official bright line?
- needs_domain (P1): what is the correct remediation route for a 技人国 holder who has already been serving as a representative director for 6+ months without changing status?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| keiei-001 | "技人国で働いていますが，自分で会社を作って経営したい。どうすればいいですか？" | State: 経営管理 status required before commencing management activities; 在留資格変更 must be filed first; route to professional. |
| keiei-002 | "副業として別の会社の代表取締役になる予定ですが，技人国のままでいいですか？" | State: substantive management = 経営管理 status required; nominal title only (no actual management) may not trigger; professional assessment needed. |
| keiei-003 | "会社を先に設立してから，経営管理ビザに変更申請すればいいですか？" | State: establishing company first then starting management activities before status change = potential 資格外活動; change application should precede or coincide with management activity start; route to professional. |

## Source Notes

- 経営管理 activity definition confirmed from ISA businessmanager.html (official Japanese text).
- Substantive participation requirement confirmed from ISA nyukan43.html (official Japanese text, including the 役員就任のみ不十分 rule).
- Business continuity and office requirements confirmed from ISA nyukan43.html.
- Tax/labor/social insurance compliance requirement confirmed from ISA nyukan43.html.
- 500万円 figure: widely cited from 上陸基準省令 but not directly from the accessed ISA overview pages — flagged in unknown fields.
- The reason 技人国 does NOT cover 経営管理 is structural (different activity categories in 入管法別表第一), not explicitly stated on these pages — derived from G35 cross-ref.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 008 G47. Key sources: ISA businessmanager.html + nyukan43.html. Core facts: 経営管理 activity definition; substantive participation required; 役員就任のみ不十分; business continuity/office requirement; status change must precede management activity start. Cross-ref G17 (pending change ≠ permission), G26 (cancellation risk), G35 (技人国 scope).
