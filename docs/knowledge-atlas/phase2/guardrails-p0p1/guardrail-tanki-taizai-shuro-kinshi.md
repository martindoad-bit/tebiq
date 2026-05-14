---
asset_id: guardrail-tanki-taizai-shuro-kinshi
title: 短期滞在（観光・商用）での就労禁止 — 報酬を受ける活動は不可；資格外活動許可の取得も不可
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P0
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 010"
---

## What This Document Is

This guardrail prevents errors about work during 短期滞在 (Temporary Visitor) status — one of the highest-risk misunderstandings because the misconception can lead directly to unlawful employment (不法就労). Key errors to block:

1. **"短期滞在（観光ビザ）で90日いられるから，その間働いてもいい。"** — critically incorrect. 短期滞在 does NOT permit work/remuneration regardless of stay duration.
2. **"短期滞在でも資格外活動許可を取れば働ける。"** — incorrect. 短期滞在 holders cannot obtain 資格外活動許可 (G16 cross-ref: 包括許可 is for 留学/家族滞在; 短期滞在 is not eligible).
3. **"商用ビザ（短期滞在）なら取引先で打ち合わせ程度は問題ない。"** — partially correct nuance: business meetings, negotiations without receiving remuneration from a Japanese source are generally within 商用 scope; but performing work-for-pay for a Japanese entity is not.
4. **"内定をもらったから，短期滞在のまま働き始めていい。"** — critically incorrect. Receiving a job offer does not authorize any work before the appropriate status is obtained (G36 cross-ref: 内定者特定活動期間の就労禁止).

Risk level: P0. Unauthorized employment on 短期滞在 = 不法就労 with potential criminal consequences for both the worker and the employer (入管法 第73条の2: employer hiring unlawful workers = penalties up to 300万円 fine and 3 years imprisonment).

## Trigger

Use this card when the user says:

- "観光ビザ（短期滞在）で日本に来ていますが，働いてもいいですか？"
- "短期滞在の90日間，仕事をしてもいいですか？"
- "短期ビザで来て，内定をもらいました。そのまま働いていいですか？"
- "商用ビザで日本に来ているが，日本のクライアントの仕事をしてもいい？"
- "短期滞在で資格外活動許可を取れますか？"
- any pattern treating 短期滞在 as compatible with remunerated work in Japan.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-tanki-main | L4 | 出入国在留管理庁「在留資格『短期滞在』」 | https://www.moj.go.jp/isa/applications/status/shortterm.html | 2026-05-15 | 活動定義: 「観光，保養，スポーツ，親族の訪問，見学，講習又は会合への参加，業務連絡その他これらに類似する活動」. 報酬を受ける活動は含まれない. |
| g16-crossref | guardrail | guardrail-shikaku-gai-katsudo-28h-limit (G16) | internal | 2026-05-15 | 資格外活動許可（包括）is available to 留学/家族滞在; NOT available to 短期滞在 holders. |
| isa-fuhouroudou | L4 | 出入国在留管理庁「不法就労について」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00011.html | 2026-05-15 | 不法就労の定義: (1) 在留資格なし; (2) 就労が認められない在留資格での就労（短期滞在を含む）; (3) 資格外活動. |
| g36-crossref | guardrail | guardrail-tokutei-katsudo-naitei-kyushoku (G36) | internal | 2026-05-15 | 内定者 on 特定活動 cannot work at 内定先 either; confirms that job offer ≠ work authorization before status change. |

## Official Rule Or Source Fact

**短期滞在 activity scope (confirmed from ISA status page):**
> 「観光，保養，スポーツ，親族の訪問，見学，講習又は会合への参加，業務連絡その他これらに類似する活動」

**What is NOT included:**
- 報酬を受ける活動 (remunerated activities) — not listed in the above
- Employment (雇用関係に基づく就労) — not permitted
- Contractor work for Japanese entities — not permitted (if remuneration is received)

**Business activities within 短期滞在 scope (nuance):**
「業務連絡」 (business liaison/contact) is listed. This covers:
- Business meetings, negotiations
- Contract signing as a company representative
- Market research / fact-finding visits

This does NOT cover:
- Actually performing contracted work services for a Japanese entity in exchange for Japanese-source payment
- Employment at a Japanese company
- Client-facing service delivery with remuneration from Japan

**No 資格外活動許可 route:**
短期滞在 holders cannot obtain 資格外活動許可. The 包括許可 system is specifically for 留学 and 家族滞在 (G16 cross-ref). The 個別許可 is also not available for short-term visitors for employment purposes.

**不法就労 — definition confirmed (ISA 不法就労 page):**
> 在留資格が就労を認めていない者が、就労活動を行う場合 = 不法就労

Short-term visitors who work for remuneration = 不法就労.

**Employer liability (入管法 第73条の2):**
> 外国人に不法就労をさせた者（雇用主等）に対しても罰則が適用される。

The employer who knowingly employs a 短期滞在 holder = criminal liability (up to 3 years imprisonment or 3 million yen fine).

**「内定 + 短期滞在」scenario:**
Even if a person has received a formal job offer (内定) from a Japanese company, they may NOT commence work while holding 短期滞在 status. They must:
1. Leave Japan and apply via CoE route (G43 cross-ref)
2. OR already be in Japan with a different status and change to the appropriate work status before commencing
(G36 cross-ref for 内定者特定活動)

## Safe Answer Behavior

- When a 短期滞在 holder asks about working: clearly state NO — 短期滞在 does not permit remunerated work; no 資格外活動許可 available.
- When someone asks about business activities during 短期滞在: distinguish business liaison/meetings (within scope) from performing contracted services for pay (not within scope); the line is remuneration from Japanese sources.
- When someone has received a job offer during 短期滞在: confirm they cannot start work; must obtain appropriate work status first; route to professional for next steps.
- Flag P0 risk clearly: unlawful employment = serious legal consequences for both worker and employer.

## Must Say

- 短期滞在（観光・商用ビザ）では，報酬を受ける就労活動は認められていない。在留期間が90日であっても，就労は許可されない。
- 短期滞在で資格外活動許可を取得することはできない。短期滞在で働くための合法的な方法は存在しない。
- 短期滞在中に就労した場合，「不法就労」（入管法違反）となり，本人だけでなく雇用主にも刑事罰が科される可能性がある。
- 内定をもらった場合でも，適切な在留資格（就労ビザ等）を取得するまでは，就労を開始できない。

## Must Not Say

- 「短期滞在でも，少しなら働いていい。」
- 「商用ビザなら，日本で仕事をしても問題ない。」（報酬を受ける就労は不可）
- 「資格外活動許可を取れば短期滞在で働ける。」
- 「内定があるから，ビザ変更前に働き始めても大丈夫。」

## Deep Water Triggers

- Person is currently in Japan on 短期滞在 and has been working for 2 months.
- Person flew to Japan on a tourist visa to do a paid consulting project for a Japanese client (1 week).
- Overseas freelancer visiting Japan for a week: is online work for foreign clients (non-Japanese source income) permitted during 短期滞在?
- Japanese company wants to "try out" a foreign candidate during their tourist visa stay before hiring.
- Person received 内定 during their 短期滞在 job-hunting visit — employer is asking them to start immediately.

## User Next Actions

This is not user-facing copy. For answer routing:

- For those currently working on 短期滞在: P0 situation; route to lawyer immediately; unauthorized work has already occurred.
- For those asking prospectively: confirm the prohibition; if they want to work in Japan, they must obtain the appropriate status first; route to CoE process (G43) or status-change process.
- For 内定 + 短期滞在: route to G36 (内定者特定活動); and confirm they must either return and obtain a work visa, or change status in Japan if eligible.
- For overseas freelancers wondering about online work during tourist visit: this is a gray area (income from non-Japanese sources may not constitute "work for a Japanese entity") — route to professional for specific assessment; TEBIQ cannot advise on this gray area.

## Unknown Fields

- Whether online work for foreign clients (non-Japan-source income) is clearly permitted during 短期滞在 — technically outside ISA jurisdiction but potentially an issue at entry for repeated visits.
- The exact definition of where the line falls between legitimate 商用 (business liaison) activities and remunerated contracted services during a short-term stay.

## Needs Domain Flags

- needs_domain (P1): for a foreign freelancer doing online work for non-Japanese clients while physically in Japan on 短期滞在 — is this a 不法就労 issue?
- needs_domain (P0): for a person who has been working on 短期滞在 for 2 months — what is the realistic remediation route? (P0: lawyer required; departure + entry ban risk; unlawful employment for employer too.)

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| tanki-001 | "観光ビザ（短期滞在）で90日いられますが，その間働いてもいいですか？" | State: P0 — categorically NOT permitted; 短期滞在 does not include remunerated work regardless of duration; no 資格外活動許可 available. |
| tanki-002 | "商用ビザで来ました。日本のクライアントのために仕事をしても大丈夫ですか？" | State: business liaison/meetings = within scope; performing contracted work-for-pay = NOT permitted; remuneration from Japanese sources is the key line. |
| tanki-003 | "短期滞在中に内定をもらいました。すぐ働き始めてもいいですか？" | State: NO; internal offer ≠ work authorization; must obtain appropriate work status first; route to G36 (内定者特定活動) and G43 (CoE route). |

## Source Notes

- 短期滞在 activity scope confirmed from ISA status page (shortterm.html) — "業務連絡" included; remunerated work not listed.
- 不法就労 definition confirmed from ISA 不法就労 page (nyuukokukanri07_00011.html).
- 資格外活動許可 inapplicability for 短期滞在 is structural (G16 source covers 留学/家族滞在 only).
- Employer criminal liability: confirmed from 入管法 第73条の2 (general knowledge; ISA 不法就労 page references it).
- Cross-ref G16 (資格外活動許可 scope), G36 (内定者 cannot work during waiting period), G43 (CoE overseas application route).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 010 G59. Risk level: P0 (unlawful employment = criminal consequences). Core facts: 短期滞在 activity scope excludes remunerated work; no 資格外活動許可 route; 不法就労 applies; employer also liable. Cross-ref G16, G36, G43.
