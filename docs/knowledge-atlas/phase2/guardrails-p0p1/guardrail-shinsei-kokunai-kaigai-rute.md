---
asset_id: guardrail-shinsei-kokunai-kaigai-rute
title: 就労系在留資格の申請ルート — 在日中は変更申請；海外からはCoE申請＋査証取得；二重申請は不可
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 012"
---

## What This Document Is

This guardrail prevents errors about whether to apply for a work visa from within Japan or from abroad. Key errors to block:

1. **"日本にいながら，在日本大使館に就労ビザを申請できる。"** — incorrect. 日本国内にいる者が在留資格を取得・変更する場合はISAへの申請（在留資格変更許可申請）が必要。在外公館（大使館・領事館）は海外からのビザ申請を処理する機関。
2. **"海外から直接ISA（出入国在留管理庁）に在留資格変更申請できる。"** — incorrect. ISAへの在留資格変更申請は，すでに日本に在留している者が行う手続き。海外在住者はCoE申請（在日スポンサーが申請）→ ビザ申請（在外公館）→ 入国の流れが必要。
3. **"在留資格認定証明書（CoE）があれば，追加のビザ申請は不要。"** — incorrect. CoEは就労ビザの発給要件の証拠として使用するが，短期滞在ビザ免除国以外は別途ビザ申請が必要。また，CoEがあっても入国は保証されない（G43 cross-ref）。
4. **"短期滞在で来日してから，そのまま就労ビザに変更できる。"** — generally incorrect (P0 risk). 短期滞在から就労系在留資格への変更は原則として認められていない。いったん出国してCoEルートで入国し直すか，適切な手続きを取る必要がある。

Risk level: P1 (border P0 for the 短期滞在 → 就労 change point)

## Trigger

Use this card when the user says:

- "海外から日本の就労ビザを申請するにはどうすればいいですか？"
- "日本にいる間に就労ビザを取るにはどうすればいいですか？"
- "在留資格認定証明書（CoE）を取ったら，すぐ働けますか？"
- "短期滞在（観光ビザ）で来日中ですが，就労ビザに変更できますか？"
- "内定をもらいました。日本国内でビザ変更できますか？"
- any pattern confusing overseas visa application with in-Japan status change, or treating CoE as sufficient for work commencement.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-16-2 | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-15 | 在留資格変更は日本に在留している者が対象（在日申請）. |
| isa-16-1 | L4 | 出入国在留管理庁「在留資格認定証明書交付申請」 | https://www.moj.go.jp/isa/applications/procedures/16-1.html | 2026-05-15 | CoE = 在日スポンサーが申請. 海外からの在留資格取得の前提条件. Used for G43 cross-ref. |
| g43-crossref | guardrail | guardrail-zairyu-nintei-shomeisho-coe (G43) | internal | 2026-05-15 | G43: CoE validity=3ヶ月; entry not guaranteed; sponsor in Japan files; overseas direct application impossible. |
| g59-crossref | guardrail | guardrail-tanki-taizai-shuro-kinshi (G59) | internal | 2026-05-15 | G59: 短期滞在=就労禁止（P0）; 短期滞在から就労ビザへの変更は原則不可. |
| g36-crossref | guardrail | guardrail-tokutei-katsudo-naitei-kyushoku (G36) | internal | 2026-05-15 | G36: 内定者は適切な就労資格取得まで就労不可; 内定後の在留資格変更ルートの一環. |

## Official Rule Or Source Fact

**二つの基本ルート:**

| 状況 | 正しい申請ルート |
|---|---|
| **現在、日本国外にいる（海外在住）** | 日本国内のスポンサー（雇用主等）がCoEを申請 → 在外公館でビザ申請 → 入国 |
| **現在、日本に合法的に在留中**（就労系/留学/家族滞在等） | ISAに在留資格変更許可申請（または在留期間更新許可申請） |

**海外からのルート（CoEルート）:**

1. **CoE申請（在留資格認定証明書交付申請）**: 日本国内の雇用主や機関がISAに申請
   - 申請場所: 日本国内のISA
   - 申請者: スポンサー（雇用主等）が代理申請
   - 有効期間: 交付から3か月（G43 cross-ref）

2. **査証（ビザ）申請**: CoEを取得した後，在外公館（日本大使館・領事館）でビザを申請
   - ビザ免除国の国民: 査証なしで入国できる場合あり（ただし国・在留資格によって異なる）
   - ビザ要否: 国籍・在留資格の種類によって異なる

3. **入国**: ビザ（または査証免除）でCoEを持参して入国
   - 入国審査官の判断で最終的に在留資格が付与される（CoEがあっても保証ではない — G43）
   - 入国後に在留カード交付

**在日からのルート（在留資格変更）:**

条件: 現在，日本国内に適法に在留していること（在留期間内）

1. **在留資格変更許可申請**: 現在の在留資格から目的の在留資格へ変更
   - 申請場所: ISA（住所地管轄）
   - 申請者: 本人（または申請取次者 — G39 cross-ref）
   - 結果: 許可 → 新たな在留資格と在留期間が付与される

**短期滞在（観光・商用ビザ）からの就労資格変更 — 原則不可:**

> 法務大臣は，特別に必要と認める場合に限り，「短期滞在」から他の在留資格への変更を許可できるとされているが，実務上これは認められないケースが圧倒的多数。

- 原則: 短期滞在 → 就労系在留資格への直接変更はISAが原則として許可しない
- 理由: 短期滞在は日本への一時的訪問目的での入国であり，就労目的での入国はCoEルートを通じて行われるべき
- 結果として: 短期滞在で来日した者が内定を得た場合 → 一度出国してCoEルートで再入国するか，すでに別の在留資格（留学・家族滞在等）がある場合はそちらから変更申請するのが正規ルート
- G59 cross-ref (P0): 短期滞在での就労自体が不法就労

**特例的に在日申請が認められる場合（参考）:**
- 日本人・永住者の配偶者・子: 婚姻後の配偶者資格申請
- 難民認定後: 特定活動から他の在留資格への変更（特殊ケース）
- 一般的な就労資格: 短期滞在からの直接変更は実質不可

**CoEと在留資格変更の比較:**

| 項目 | CoEルート（海外から）| 在留資格変更（在日）|
|---|---|---|
| 申請場所 | ISA（スポンサーが代理申請）| ISA（本人または取次者）|
| 申請者 | 雇用主等（スポンサー）| 本人 |
| 対象者 | 海外在住者 | 日本在留中の者 |
| 有効期間 | CoE有効3か月 → 入国後に在留期間付与 | 許可後すぐ新在留資格 |
| 開始タイミング | 入国後（在留資格取得後）から就労可 | 変更許可後から就労可 |

## Safe Answer Behavior

- When an overseas person asks about work visa: explain the CoE route (sponsor in Japan files CoE → overseas visa application → entry); clarify that overseas applicants cannot file directly with ISA.
- When an in-Japan person asks about getting a work visa: explain the 在留資格変更 route via ISA; clarify they do NOT apply at the embassy.
- When asked about starting work after CoE: clarify work can start after entering Japan AND the 在留資格 is granted (not from CoE issuance).
- When a 短期滞在 holder asks about changing to a work visa: clearly state this is not possible as a general matter; they must exit Japan and use the CoE route.
- Do not say "apply at the embassy in Japan" for in-Japan status changes.

## Must Say

- 海外在住者が日本の就労ビザを取得するには，日本国内のスポンサー（雇用主等）がISAにCoE（在留資格認定証明書）を申請し，CoE取得後に在外公館でビザを申請するルートが必要（G43参照）。
- 日本に適法に在留中の者が就労資格を取得・変更するには，ISA（出入国在留管理庁）に**在留資格変更許可申請**を行う。在日中の者は在外公館（大使館・領事館）に申請しない。
- 短期滞在（観光・商用ビザ）から就労系在留資格への在留資格変更は，原則として認められていない（実務上はほぼ不許可）。一度出国してCoEルートで再入国するか，別の適切な在留資格からの変更を検討する必要がある。
- 就労は，適切な在留資格（就労可能な在留資格）を取得した後から開始できる。CoE取得時点・ビザ発給時点では就労を開始できない。

## Must Not Say

- 「日本在住中に在外公館（大使館）で就労ビザを申請できる。」
- 「CoEを取ればすぐ働ける。」（入国して在留資格付与後が正しい）
- 「短期滞在（観光ビザ）から就労ビザに変更できる。」（原則不可）
- 「海外からISAに直接申請できる。」（海外在住者のISA直接申請は不可）

## Deep Water Triggers

- Person entered Japan as a 短期滞在 visitor, received a job offer, wants to start a work visa process without leaving — what are their options?
- Person completed a master's degree in Japan (on 留学 status), received a job offer — can they change status within Japan?
- Person is abroad and the CoE has already expired (3 months passed) — can the sponsor re-apply for a new CoE?
- Person entered on a CoE-based work visa for Company A, but Company A went bankrupt before they started — can they change to a new employer while remaining in Japan?
- Person's visa application at the embassy was denied even though they had a valid CoE — what are the options?

## User Next Actions

This is not user-facing copy. For answer routing:

- For overseas persons with job offers: route to employer/sponsor to file CoE application via ISA; do not tell them to apply at the embassy directly.
- For in-Japan persons with job offers and appropriate status (留学, 家族滞在, etc.): route to ISA for 在留資格変更 procedure; recommend professional guidance.
- For short-term visitors who received job offers: state the 原則不可 boundary; route to professional for specific assessment of whether any exceptional path exists; interim job commencement is NOT permitted (G59 cross-ref).
- For all applicants: clarify that work must not start before the appropriate status is confirmed.

## Unknown Fields

- Whether any specific work categories (e.g., intra-company transfer cases) have ISA-approved routes for 短期滞在 → 就労 status change in exceptional circumstances.
- The processing time for CoE applications by ISA (varies by office and visa category).

## Needs Domain Flags

- needs_domain (P1): are there any official ISA-approved exceptional circumstances where 短期滞在 → 就労 in-Japan status change is permitted? If so, what are the precise conditions?
- needs_domain (P1): for persons who entered on a valid CoE-based visa but whose sponsoring employer is no longer operational — what is the correct status-change procedure and timeline within Japan?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| route-001 | "海外から日本の就労ビザを取るにはどうすればいいですか？" | State: 日本国内の雇用主がISAにCoE申請 → CoE取得後に在外公館でビザ申請 → 入国後に在留資格取得. 海外からISAへの直接申請は不可. |
| route-002 | "短期滞在で来日中ですが，就労ビザに変更できますか？" | State: 原則として不可。短期滞在→就労系在留資格の直接変更はISAが実務上ほぼ許可しない。一度出国してCoEルートで再入国が必要。在日中の就労開始も不可（G59参照）。 |
| route-003 | "日本の大学を卒業して就職先も決まりました。在留資格変更はどこに申請しますか？" | State: 日本国内に在留中なので，ISA（出入国在留管理庁）に在留資格変更許可申請を行う。大使館・領事館ではない。許可後から就労開始可。 |

## Source Notes

- 在留資格変更許可申請（在日申請）: ISA 16-2.html (confirmed as in-Japan procedure).
- CoE申請（海外向け）: ISA 16-1.html + G43 cross-ref (sponsor-based in Japan; 3-month validity; not entry guarantee).
- 短期滞在 → 就労変更の原則不可: 入管法の解釈（短期滞在 = 一時的訪問目的; 就労系 = CoEルートが前提）+ G59 cross-ref.
- 「コーディネートの不可」(海外からISA直接申請不可): 入管法の申請者適格（在留者が申請）から導かれる構造的結論.
- Cross-ref G43 (CoE validity and process), G59 (短期滞在就労禁止), G36 (内定者は就労不可), G39 (申請取次制度).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 012 G68. Key sources: ISA 16-2.html (在留資格変更 = 在日申請); ISA 16-1.html + G43 (CoE = スポンサー在日申請). Core facts: 海外→CoEルート; 在日→変更申請; 短期滞在→就労変更=原則不可; CoE取得後も就労開始は入国・在留資格取得後のみ. Cross-ref G43, G59, G36, G39.
