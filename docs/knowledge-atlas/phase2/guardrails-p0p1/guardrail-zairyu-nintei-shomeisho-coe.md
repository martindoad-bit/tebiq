---
asset_id: guardrail-zairyu-nintei-shomeisho-coe
title: 在留資格認定証明書（CoE）— 3か月有効・入国保証ではない；海外から直接在留資格申請はできない
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

This guardrail prevents errors about the 在留資格認定証明書 (Certificate of Eligibility, CoE) — the pre-entry document used for first-time long-term entry to Japan. Key errors to block:

1. **"海外から直接入管に在留資格申請できる。"** — incorrect. For most long-term statuses, the CoE process is the pre-entry route; direct application from overseas is not available.
2. **"CoEがあれば必ず入国できる。"** — incorrect. CoE does not guarantee entry; landing may be denied at immigration.
3. **"CoEは6か月（または1年）有効。"** — incorrect. Standard validity is **3 months** from issuance date. COVID-era extensions have ended.
4. **"CoEが期限切れになっても使えばよい。"** — incorrect. An expired CoE has no effect; a new application must be filed.
5. **"本人が海外から直接CoE申請できる。"** — the sponsor in Japan typically files; the applicant themselves can also apply but this is uncommon in practice.

## Trigger

Use this card when the user says:

- "海外にいますが，日本の在留資格を申請したい。どうすればいいですか？"
- "在留資格認定証明書とは何ですか？"
- "CoEがあれば日本に入国できますか？"
- "在留資格認定証明書の有効期限はいつですか？"
- "CoEが届いたが，３か月を過ぎてしまいました。"
- "海外から直接入国管理局に申請できますか？"
- any pattern treating CoE as an entry guarantee, or misunderstanding the overseas application process.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-coe-main | L4 | 出入国在留管理庁「在留資格認定証明書交付申請」 | https://www.moj.go.jp/isa/applications/procedures/16-1.html | 2026-05-15 | Definition, purpose, who files, return obligation if entry cancelled. |
| isa-coe-faq | L4 | 出入国在留管理庁「出入国審査・在留審査Q&A」 | https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html | 2026-05-15 | Q6: 「有効期間は３か月とされています。したがって，在留資格認定証明書が交付された日から３か月以内に上陸申請をしないとその効力を失います。」 |
| isa-coe-covid | L4 | 出入国在留管理庁「新型コロナウイルス感染症に関する対応（終了）」 | https://www.moj.go.jp/isa/nyuukokukanri01_00155_1.html | 2026-05-15 | 「この取扱いは終了しました。現在の在留資格認定証明書の有効期間は，原則どおり『３か月』です。」— COVID extensions ended. |

## Official Rule Or Source Fact

**Definition and purpose (confirmed from ISA 16-1.html):**
> 「日本で行おうとする活動内容がいずれかの在留資格に該当するものである等の上陸のための条件に適合していることを証明するために，入国前にあらかじめ行う申請」

The CoE is an advance certification, before entry, that the intended activity in Japan meets landing conditions for a particular status.

> 交付後，査証申請や上陸申請時に提出することで，速やかな許可取得が可能になります。

After issuance, presenting it with visa or landing applications enables faster approval.

**Validity — confirmed from ISA FAQ (Q6):**
> 「有効期間は３か月とされています。したがって，在留資格認定証明書が交付された日から３か月以内に上陸申請をしないとその効力を失います。」

**3 months from issuance date**. If landing application is not submitted within 3 months, the CoE loses all effect.

**COVID extensions ended — confirmed from ISA:**
> 「この取扱いは終了しました。現在の在留資格認定証明書の有効期間は，原則どおり『３か月』です。」

As of the date of this card (2026-05-15), the standard 3-month period applies without exception.

**Does not guarantee entry — confirmed from ISA FAQ:**
> 「入国を保証するものではなく，上陸審査時において事情変更等の理由により上陸許可基準に適合しない事実が判明した場合など，上陸が許可されないこともあります。」

The CoE is a facilitating document, not an entry guarantee. Landing can be denied if circumstances change or standards are not met at the port of entry.

**Who files — confirmed from ISA 16-1.html:**

Three parties can apply:
1. The applicant themselves (入国希望者本人)
2. A representative from the receiving institution (受け入れ機関の職員など)
3. Public interest corporation staff, lawyer, 行政書士, or legal representative

**In practice:** The Japan-based sponsor (employer, school, receiving institution) typically files on behalf of the overseas applicant.

**Process flow:**
1. Japan-based sponsor applies for CoE at local ISA office
2. CoE issued → valid for 3 months from issuance
3. Applicant takes CoE to Japanese embassy/consulate overseas to obtain visa (査証)
4. > 「在留資格認定証明書を提示して，必ずビザ（査証）の発給を受けてください。」
5. Applicant enters Japan using CoE + visa
6. If CoE expires before use: effect lost; new application required

**If entry is cancelled after CoE issuance:**
> 「紙の証明書を交付後に入国を取りやめた場合，原本を交付を受けた地方出入国在留管理官署に返納する必要があります。」

The original CoE must be returned to the local ISA office.

**Overseas application route summary:**
| 状況 | 手続き |
|---|---|
| 海外から日本に初めて長期滞在で入国 | CoE申請（日本のスポンサーが申請）→査証取得→入国 |
| すでに日本に在留中 | 在留資格変更/更新申請（在日中にISAへ直接申請） |
| 海外から在留資格を直接申請 | ❌ 不可（CoEが必要な唯一の正規ルート） |

## Safe Answer Behavior

- When an overseas user asks how to get a residence status: explain the CoE process; Japan-based sponsor files; then visa from embassy; then entry.
- When a user asks if CoE guarantees entry: clearly state it does not; landing examination at the port of entry is final; circumstances can change.
- When a user asks about CoE validity: confirm 3 months from issuance date; COVID extensions ended; expired CoE has no effect.
- When a user has an expired CoE: confirm it cannot be used; the sponsor must file a new application.
- Do not tell users they can "apply directly from overseas" for a long-term residence status without a CoE.

## Must Say

- 在留資格認定証明書（CoE）は，日本に上陸するための要件に適合していることを証明する書類であり，発行日から３か月以内に上陸申請をしなければ効力を失う。
- CoEは入国保証ではない。上陸審査で事情変更等があれば入国が認められないこともある。
- 海外から直接，日本の在留資格（長期滞在）を申請することはできない。まず日本のスポンサー等がCoEを申請し，交付後に在外公館でビザを取得し，入国するのが正規のルートである。
- 新型コロナウイルス感染症特例によるCoE有効期間延長措置は終了した。現在の有効期間は原則どおり３か月。

## Must Not Say

- 「CoEがあれば必ず入国できる。」
- 「CoEは６か月（または１年）有効。」
- 「期限が切れてもCoEを使えば大丈夫。」
- 「海外から直接，在留資格の申請ができる。」

## Deep Water Triggers

- User's CoE was issued but they could not travel before it expired — can it be extended?
- User obtained CoE but their circumstances changed (e.g., job offer rescinded, school enrollment cancelled) — what happens?
- User entered Japan without using their CoE but has since applied for a different status.
- User's sponsor applied for the CoE in error (wrong status category) — how to correct?
- User is trying to enter on a CoE issued under a different status than their intended activity.

## User Next Actions

This is not user-facing copy. For answer routing:

- For expired CoE: advise sponsor to re-apply; no emergency extension procedure exists.
- For changed circumstances after CoE issuance: route to professional (行政書士/弁護士) to assess whether the CoE still correctly matches the intended activity.
- For overseas users needing CoE: explain the sponsor-application process; route to employer/school HR for initiation.
- For CoE return after entry cancellation: advise returning to the local ISA office with a written explanation.

## Unknown Fields

- The processing time for CoE applications (varies by ISA office; not confirmed in this session).
- Whether electronic CoE (デジタル在留資格認定証明書) has the same 3-month validity and whether there is a different return procedure.
- The exact format of the return request document when cancelling entry after CoE issuance.

## Needs Domain Flags

- needs_domain (P1): for a user whose employer (CoE sponsor) withdrew the job offer after CoE issuance — what is the correct procedure and what are the risks if the person enters anyway?
- needs_domain (P1): does the electronic/digital CoE system (if active) have different validity rules or overseas-use procedures?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| coe-001 | "海外から日本の在留資格を直接申請できますか？" | State: long-term stay requires CoE; CoE must be filed by Japan-based sponsor; then visa → entry. Direct overseas application is not available. |
| coe-002 | "在留資格認定証明書の有効期限はいつまでですか？" | Confirm: 3 months from issuance date (官Q6 exact quote). COVID extensions ended. Expired CoE = must re-apply. |
| coe-003 | "CoEをもらえれば，入国は確定ですか？" | State: CoE facilitates but does not guarantee landing; ISA at port of entry makes final determination; circumstances can affect landing decision. |

## Source Notes

- Validity period (3 months) confirmed from ISA FAQ Q6 (official Japanese text).
- COVID extension termination confirmed from ISA notice page.
- Entry non-guarantee confirmed from ISA FAQ official text.
- Who-can-file confirmed from ISA 16-1.html.
- Return obligation for cancelled entry confirmed from ISA 16-1.html.
- Digital/electronic CoE system details were not accessed in this session — marked unknown.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 007 G43. Key sources: ISA 16-1.html + FAQ (kanri_qa.html) + COVID notice. Core facts: 3-month validity; no entry guarantee; overseas application route; return obligation. COVID extensions confirmed ended.
