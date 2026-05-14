---
asset_id: guardrail-zairyu-ninteisho-kakucho
title: 在留認定証明書（COE）の有効期限・失効・再交付と緊急時の入国手続き — COEは3か月の有効期限があり失効したら再申請が必要；COEは入国保証ではない；ビザなし国籍者はCOEだけでは入国できない；在外ビザの有効期限とCOEの有効期限は独立
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 023"
---

## What This Document Is

This guardrail prevents errors about the Certificate of Eligibility (在留資格認定証明書, COE) system, its validity, and how it interacts with visa applications. Key errors to block:

1. **"COEを持っていれば，いつでも日本に入国できる。"** — incorrect. COEの有効期限は3か月（発行日から）。有効期限が切れたCOEは入国の根拠にならない。また，COEはビザ申請の補助書類であり，入国保証ではない（入管審査で不許可になる場合もある）。
2. **"COEの有効期限が切れたら，ビザも取れなくなる。"** — incorrect framing. COEの有効期限とビザの有効期限は独立している。有効なCOEがあれば在外公館でビザを申請できるが，COEが失効した場合は再申請が必要。ビザが発給された後は，ビザの有効期限内に入国すればよい。
3. **"ビザなし（査証免除）協定の国籍者は，COEがなくても日本で在留資格を取得できる。"** — incorrect for most employment/long-term stay purposes. 査証免除協定の国籍者（米国・EU等）でも，就労・長期滞在を目的とする場合はCOEを取得し，在外公館でビザの申請が必要（または入国後に在留資格変更申請）。
4. **"COEは在留資格の許可確定を意味する。"** — incorrect. COEは「在留資格の要件を一応満たしている」ことの証明であり，入国審査での最終許可を保証するものではない（入管審査で上陸拒否される場合もありうる）。

## Trigger

Use this card when the user says:

- "COEの有効期限が切れてしまいました。どうすればいいですか？"
- "COEを持っていれば，日本に入国できますか？"
- "査証免除国なのですが，COEは必要ですか？"
- "COEをもらいましたが，ビザの申請が間に合いませんでした。"
- "COEは在留資格の許可証ですか？"
- any pattern suggesting that COE is an entry guarantee, that it has indefinite validity, or that visa-waiver nationals do not need COE for long-term stays.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-ho-7-2 | L1 | 出入国管理及び難民認定法第7条の2（在留資格認定証明書） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | COEの法的根拠（第7条の2）; COEの性格（在留資格の認定証明; 入国の保証ではない）; 有効期限3か月. |
| coe-isa-page | L4 | 出入国在留管理庁「在留資格認定証明書交付申請」 | https://www.moj.go.jp/isa/applications/procedures/16-1.html | 2026-05-15 | COEの申請手続き; 有効期限3か月（発行日から）; 申請者・申請窓口（在日のスポンサーが申請）. |
| isa-faq-coe | L4 | 出入国在留管理庁「在留資格認定証明書に関するQ&A」 | https://www.moj.go.jp/isa/applications/procedures/16-1_FAQ.html | 2026-05-15 | COEの有効期限（3か月）; 失効後の再申請; COVID延長制度終了. |
| g43-coe | guardrail | guardrail-zairyu-nintei-shomeisho-coe (G43) | internal | 2026-05-15 | G43: COEの有効期限3か月確認（ISA FAQ Q6）; 入国保証ではない; COVID延長制度終了; スポンサーがCOE申請→申請者がビザ取得→入国の手順. |
| g68-route | guardrail | guardrail-shinsei-kokunai-kaigai-rute (G68) | internal | 2026-05-15 | G68: 海外在住者→COEルート（スポンサーがISAに申請→在外公館でビザ申請→入国）; 在日者→在留資格変更（ISA）. |

## Official Rule Or Source Fact

**COEの法的性格（入管法第7条の2）:**

- COEは，申請者が日本の在留資格の要件を一応充足していることを証明する書類
- 入国審査（上陸審査）での最終許可を確約するものではない
- 入管審査官は，入国時に独自の上陸審査を行い，上陸拒否事由（入管法第5条）があれば上陸を拒否できる

**COEの有効期限:**

- 発行日から3か月
- 有効期限内に在外公館でビザ申請（または入国）する必要がある
- 有効期限切れのCOEは無効（ビザ申請には使えない）
- COVID-19で設定された延長制度は終了済み（ISA公式通知で確認済み; G43参照）

**COE失効後の対応:**

- 失効したCOEに基づくビザ申請は原則として受理されない
- 対応: 在日のスポンサー（会社・学校等）が新たなCOE交付申請をISAに行う必要がある
- COEの再申請には，初回申請と同様の書類一式の提出が必要（審査期間: 通常1〜3か月）
- 緊急性がある場合（入社予定が迫っている等）: スポンサーがISAに緊急性を説明して優先審査を求める場合があるが，優先処理は保証されない（needs_domain P1）

**ビザと在外公館の手続き:**

- COE取得後: 申請者（海外在住者）が日本の在外公館（大使館・領事館）にビザ申請
- ビザの有効期限: 在外公館が決定（通常1〜3か月; 入国後の在留期間とは別）
- COEが有効な間にビザを申請し，ビザ有効期限内に入国するという手順
- COE有効期限 vs ビザ有効期限: 独立している（COEが有効でもビザが失効すれば入国できない）

**査証免除（ビザなし）国籍者の取扱い:**

- 日米・日EU等の査証免除協定により，短期滞在（90日以内の観光・商用等）は査証（ビザ）不要
- ただし，就労・長期滞在を目的とする場合は，査証免除国籍者であっても:
  - COEを取得し，在外公館でビザの申請が必要（原則）; または
  - 日本入国後に在留資格変更許可申請（短期滞在→就労系への変更は原則不可; G68参照）
- 例外: 一部の在留資格変更が短期滞在中でも認められる場合があるが，原則は海外からのCOEルート

**COEの申請手続き概要:**

- 申請者: 原則として「法定代理人」または「取次申請者（登録申請取次者）」が在日のスポンサーの名で申請
- 申請窓口: 申請人が入国後に居住する予定の地域を管轄するISA
- 審査期間: 通常1〜3か月（分野・繁忙期により変動）
- 申請人本人は海外に居住していて構わない（スポンサーが在日で申請）

## Safe Answer Behavior

- When asked about expired COE: confirm that expired COEs cannot be used for visa applications; explain that the sponsor must re-apply for a new COE from ISA.
- When asked if COE guarantees entry: clearly state it does NOT guarantee entry; explain that final approval is at the port of entry immigration inspection.
- When asked about visa-waiver nationals: explain that short stays are fine without visa/COE, but long-term/employment purposes still require COE and visa from overseas (or a status change after entry).
- When asked about urgent situations (expiring COE, urgent employment start): explain that ISA does not guarantee expedited processing; recommend contacting the sponsoring organization to communicate urgency.

## Must Say

- COEの有効期限は発行日から3か月。失効後はスポンサーが新たにCOE交付申請をISAに行う必要がある。
- COEは入国の保証ではなく，在留資格要件の証明書。入国時の上陸審査は別途行われる。
- 査証免除（ビザなし）の国籍者でも，就労・長期滞在目的の場合はCOE取得・ビザ申請が原則必要。

## Must Not Say

- 「COEがあれば，いつでも日本に入国できる。」（3か月の有効期限あり; 入国保証ではない）
- 「COEは在留資格の許可証。」（要件充足の証明書; 入国審査は別）
- 「査証免除国籍なので，COEなしで就労ビザで日本に来られる。」（就労・長期滞在はCOE+ビザが原則必要）

## Deep Water Triggers

- 海外在住の申請者がCOEを受け取る前に，スポンサーの会社が倒産・採用取り消した場合のCOE失効と対応
- COEを取得したが，入国前に在留資格変更の意向が生じた場合（例: 技人国COEで取得したが，経営管理に変更したい）
- COE交付済みで入国後に在留資格の活動と実際の業務内容が異なる場合の申告・変更義務
- 在外公館でのビザ申請で「不交付」（ビザ拒否）になった場合の原因と再申請の可否
- 日本国内での就労中（在留資格変更申請中）に，並行してCOEを海外の家族に申請する場合の手続き

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons with expired COE: route to the sponsoring employer/school to re-apply for COE; route to ISA for new COE application procedure; flag the 1-3 month re-processing time.
- For persons asking about COE as an entry guarantee: clearly state it is not; route to ISA FAQs on upper-limit inspection at port of entry.
- For visa-waiver nationals planning long-term stays: route to COE + embassy visa application procedure; or if already in Japan, route to 在留資格変更 (with caution per G68 on short-stay-to-employment restrictions).
- For persons facing urgent timelines: route to the sponsoring organization for ISA communication; no guarantee on expedited processing.

## Unknown Fields

- Whether ISA has any official expedited COE processing mechanism for urgent employment/academic start situations (beyond the general priority application claims in practice).
- The typical processing time for COE re-applications when the initial COE has expired.

## Needs Domain Flags

- needs_domain (P1): Does ISA have an official expedited (緊急処理) COE processing pathway, and if so, what are the formal conditions for eligibility? Current guidance is that ISA accepts urgency submissions but does not formally guarantee priority processing.
- needs_domain (P1): For visa-waiver nationals who enter Japan on short-stay and later want to apply for a work visa — what is the complete current list of in-Japan status change options available to them (without having to leave and re-enter)? G68 notes short-stay to employment is generally not allowed; are there confirmed exceptions?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| coe-001 | "COEをもらいましたが，有効期限が切れてしまいました。どうすればいいですか？" | State: COEの有効期限は発行日から3か月。失効した場合，有効期限切れのCOEはビザ申請に使えない。日本のスポンサー（会社・学校等）が新たなCOE交付申請をISAに行う必要がある。再申請には通常1〜3か月の審査期間がかかるため，早めにスポンサーに連絡することを推奨する。 |
| coe-002 | "COEを持っていれば，日本への入国は確定ですか？" | State: COEは在留資格の要件充足を証明する書類だが，入国（上陸）を保証するものではない。入国時の上陸審査（港・空港での入管審査）では，上陸拒否事由（入管法第5条）の有無が独立して審査される。COEがあっても上陸審査で問題があれば上陸を拒否される場合がある。 |
| coe-003 | "アメリカ国籍なのでビザは不要と言われましたが，COEも不要ですか？" | State: 短期滞在（90日以内の観光・商用等）は査証免除協定によりビザ・COEなしで可能。ただし，就労・長期滞在を目的とする場合は，COEを取得した上で在外公館（大使館等）でビザを申請する必要がある（短期滞在から就労系への在留資格変更は原則不可）。 |

## Source Notes

- COEの法的根拠: 入管法第7条の2（在留資格認定証明書の交付申請; 有効期限3か月）.
- COEの手続き: ISA「在留資格認定証明書交付申請」（16-1.html）; ISA FAQ Q6（有効期限3か月; COVID延長終了）.
- G43 cross-ref（COEの有効期限3か月; 入国保証ではない; COVID延長制度終了）.
- G68 cross-ref（海外在住者→COEルート; 在日者→在留資格変更; 短期滞在→就労系変更原則不可）.
- Cross-ref G43（COEの基本事項），G68（申請ルートの全体像）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 023 G125. Complements G43 (which covers the basic COE facts). Key sources: 入管法第7条の2（COEの法的根拠）; ISA「在留資格認定証明書交付申請」（16-1.html）; ISA FAQ Q6（有効期限3か月確認）. Core facts: COE有効期限=3か月（失効後は再申請）; COE=入国保証ではない（上陸審査は別）; 査証免除国籍者でも就労・長期滞在はCOE+ビザが原則必要. needs_domain P1: COEの緊急優先処理の官式条件; 査証免除国籍者の日本国内での就労系在留資格変更の例外リスト. Cross-ref G43, G68.
