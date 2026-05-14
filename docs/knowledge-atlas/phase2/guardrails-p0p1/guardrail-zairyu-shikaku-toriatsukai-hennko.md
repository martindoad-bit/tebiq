---
asset_id: guardrail-zairyu-shikaku-toriatsukai-hennko
title: 在留資格の「取り扱いの変更」と資格変更の区別 — 配偶者・子等の身分系資格は婚姻・出生で自動変更されない；事実変更後も申請が必要；在留カードの記載内容と実態不一致は申請上のリスク
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 018"
---

## What This Document Is

This guardrail prevents errors about the misconception that changes in personal status (marriage, divorce, birth of a child, etc.) automatically change or update a person's immigration status. Key errors to block:

1. **"日本人と結婚したら，自動的に日本人の配偶者等の在留資格になる。"** — incorrect. 日本人と婚姻しても，在留資格は自動的に変更されない。「日本人の配偶者等」への在留資格変更許可申請（または在留資格認定証明書交付申請）を行い，許可を得る必要がある。
2. **"永住者と結婚したら，永住者の配偶者等の在留資格に自動的になる。"** — incorrect. 上記と同様。「永住者の配偶者等」への在留資格変更許可申請が必要。
3. **"子どもが生まれたら，子どもは自動的に在留資格を持つ。"** — partially incorrect. 子が日本国籍を取得する場合（父または母が日本国民の場合）は在留資格は不要。外国籍の子として生まれた場合（両親が外国籍）は，在留資格を取得するための申請（在留資格認定証明書交付申請等）が別途必要。出生後60日以内の申請義務がある（G97 cross-ref 特別永住者は例外）。
4. **"離婚したら，日本人の配偶者等の在留資格はそのまま有効。"** — partially incorrect. 離婚後も在留期間満了まで在留は可能だが，次の更新では「日本人の配偶者等」として更新できない（G8/G45 cross-ref）。14日以内に届出義務あり（G29 cross-ref）。

## Trigger

Use this card when the user says:

- "日本人と結婚しました。自動的にビザが変わりますか？"
- "永住者と結婚しました。すぐに永住者の配偶者等になれますか？"
- "在留資格はそのままで結婚だけ届けました。問題ありませんか？"
- "外国籍の子どもが生まれました。子どものビザはどうなりますか？"
- "離婚しましたが，在留資格は有効なままですか？"
- any pattern treating marital status changes as automatically updating immigration status, or assuming that in-Japan foreign children automatically receive status.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-henkou-shinsei | L4 | 出入国在留管理庁「在留資格変更許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | 2026-05-15 | 在留資格変更は許可申請が必要（自動変更なし）; 変更前の活動を継続しつつ申請可能. |
| isa-kodomo-coe | L4 | 出入国在留管理庁「在留資格認定証明書交付申請（子の出生後の申請）」 | https://www.moj.go.jp/isa/applications/procedures/16-1.html | 2026-05-15 | 出生後60日以内の申請（外国籍の子）; CoE申請手順. |
| g8-crossref | guardrail | guardrail-spouse-divorce-death-remarriage (G8) | internal | 2026-05-15 | G8: 離婚後の14日以内届出義務; 在留資格変更の必要性; 再婚後の取扱い. |
| g29-crossref | guardrail | guardrail-todoke-gimu-ihan-kekka (G29) | internal | 2026-05-15 | G29: 配偶者関係変更の14日以内届出義務; 届出違反の法的結果. |
| g45-crossref | guardrail | guardrail-haigusha-rikon-go-zairyu-jitsumu-route (G45) | internal | 2026-05-15 | G45: 離婚後の在留資格変更・定住者への移行ルート; 6か月の猶予期間. |

## Official Rule Or Source Fact

**在留資格の自動変更がない原則:**

日本の出入国管理制度では，個人の身分・家族関係の変化によって，在留資格が**自動的に変更されることはない**。在留資格の変更は，常に許可申請を経て初めて効力が生じる。

**婚姻による在留資格変更の必要性:**

| 状況 | 必要な手続き |
|---|---|
| 現在「技人国」等の就労系資格を持つ外国人が日本人と婚姻 | 引き続き「技人国」等で在留可能（変更しなくてよい）; 婚姻に合わせて「日本人の配偶者等」に変更することも可能（申請必要）|
| 現在「留学」等を持つ外国人が日本人と婚姻 | 「留学」での活動が継続する場合は変更不要; 就労を希望する場合は「日本人の配偶者等」または就労系資格への変更許可申請が必要 |
| 現在適法な在留資格がない外国人が日本人と婚姻 | 婚姻しても在留資格は自動付与されない; 在外公館でのビザ申請またはCoE申請が必要 |

**海外在住の外国人配偶者が来日する場合:**

- 配偶者ビザ（「日本人の配偶者等」）のCoEを日本から申請し，在外公館でビザを取得してから入国
- 婚姻後すぐに日本に来られるわけではなく，CoE発行・ビザ取得のプロセスが必要（G43 cross-ref）

**外国籍の子が日本で生まれた場合:**

| 状況 | 取り扱い |
|---|---|
| 父または母のいずれかが日本国民 | 子は日本国籍取得（国籍法第2条）; 在留資格は不要 |
| 両親が外国籍（適法在留） | 子は外国籍; **出生後60日以内**に在留資格取得の申請が必要 |
| 特別永住者の子 | 出生後60日以内に特別永住許可の申請（G97 cross-ref）|
| 両親が不法在留（出産目的等） | 子は外国籍; 在留資格取得の申請が別途必要; 親の在留問題と子の在留問題は独立 |

**外国籍の子の在留資格申請期限:**

「出入国管理及び難民認定法」上，出生後60日以内に在留資格を取得しなければならない。60日を超えると，不法在留の状態になりうる。

申請窓口: 日本にいる親または親権者がISA（出入国在留管理庁）に申請。

**在留カードの記載内容（婚姻状況等）との関係:**

在留カードには配偶者の名前・婚姻状況は記載されない。ただし，在留資格の種別（「日本人の配偶者等」等）から婚姻関係が推定される。離婚・死別後も「日本人の配偶者等」という資格で在留カードが有効な場合，在留資格の実態と記載が乖離するが，14日以内の届出義務（G29 cross-ref）が生じる。

**その他の身分変化と在留資格:**

| 身分変化 | 在留資格への影響 |
|---|---|
| 配偶者の死亡 | 死亡後も在留期間満了まで在留可能; 14日以内届出; 次回更新時に要変更（G8 cross-ref）|
| 日本国籍取得（帰化） | 帰化後は外国人ではなくなるため，在留資格は消滅（帰化=日本国籍取得; G64 cross-ref）|
| 永住者の配偶者等が離婚 | G49 cross-ref; 定住者等への変更を要検討 |

## Safe Answer Behavior

- When asked if marriage automatically changes status: clearly state there is NO automatic change; an application must be filed.
- When asked about children born in Japan to foreign parents: immediately flag the 60-day deadline for 在留資格 application; distinguish Japanese citizenship case (if one parent is Japanese).
- When asked about whether a person can stay after divorce: explain they can stay until 在留期間 expires, but renewal requires a different status; flag the 14-day notification obligation.
- Do not advise "just get married and the visa will be sorted" or similar patterns.

## Must Say

- 婚姻・離婚・子の出生等の身分変化によって，在留資格は自動的に変更されない。変更が必要な場合は，在留資格変更許可申請を行うことが必要。
- 外国籍の子が日本で生まれた場合，出生後60日以内に在留資格を取得するための申請が必要。期限を過ぎると不法在留になりうる。
- 離婚・配偶者の死亡後は，14日以内に届出義務がある（G29参照）。次の在留期間更新では「日本人の配偶者等」としての更新はできないため，在留資格の変更を要検討（G45参照）。

## Must Not Say

- 「日本人と結婚すれば，自動的にビザが変わる。」（変更許可申請が必要）
- 「外国籍の子は生まれれば自動的に在留資格を持つ。」（60日以内申請が必要）
- 「婚姻関係が変わっても，在留カードはそのまま有効なので問題ない。」（届出義務あり; 次回更新に影響）

## Deep Water Triggers

- 日本人配偶者が失踪（所在不明）した — 「日本人の配偶者等」の在留資格はどうなるか？
- 外国籍の子の出生後60日の申請期限を過ぎた — どうすればよいか？
- 離婚手続き中（調停中; 離婚未成立）に在留期間が切れる — 「日本人の配偶者等」として更新できるか？
- 帰化した（日本国籍取得）が，まだ外国の在留資格がある — 両方保持できるか？（いいえ; 帰化後は外国籍を失う）
- 日本人と事実婚（婚姻届未提出）の状態 — 「日本人の配偶者等」になれるか？（いいえ; 法律婚が要件; G76 cross-ref）

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons who recently married a Japanese national: route to ISA 在留資格変更許可申請 page; recommend 行政書士 for application preparation.
- For persons with newborn foreign national children in Japan: urgently flag 60-day deadline; route to ISA procedures; recommend immediate professional consultation.
- For persons post-divorce: route to G8 (14-day notification) and G45 (post-divorce status route); recommend lawyer/行政書士 consultation immediately.
- For persons whose Japanese national spouse passed away: route to G8 (14-day notification); route to post-death status route; recommend professional consultation.

## Unknown Fields

- The specific procedure (and whether professional assistance is required) for filing a 在留資格 application for a newborn at ISA — whether the in-Japan parent files directly at ISA or at the municipality.
- Whether a foreign national in Japan can maintain "日本人の配偶者等" status during a pending divorce proceeding (調停中) for the purpose of renewal.

## Needs Domain Flags

- needs_domain (P1): What is the official ISA procedure for a foreign national child born in Japan when the birth exceeds the 60-day deadline? Is there a remedy procedure, or does the child need to apply via CoE from abroad?
- needs_domain (P1): For a person in Japan on "日本人の配偶者等" whose Japanese spouse passed away — is there an official ISA guideline on the transition period and how to manage the status before moving to 定住者 or another route?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| henkou-001 | "先月，日本人と結婚しました。在留資格は自動的に変わりますか？" | State: 婚姻しても在留資格は自動的に変更されない。現在の在留資格で引き続き在留するか，「日本人の配偶者等」への在留資格変更許可申請を行うことになる（申請は在留中にISAに対して行う）。行政書士に申請の準備・書類を相談することを推奨。 |
| henkou-002 | "外国籍の子供が日本で生まれました。子供のビザはどうなりますか？" | State: 子が日本国籍（父または母が日本人の場合）を取得しなかった場合，外国籍の子は出生後60日以内に在留資格を取得するための申請が必要。期限を超えると不法在留になりうる。至急，ISAまたは行政書士に相談して申請の手続きを進めること。 |
| henkou-003 | "離婚しましたが，在留カードはまだ『日本人の配偶者等』と書いてあります。そのまま在留できますか？" | State: 離婚後も在留期間満了まで日本に在留することはできる。ただし，離婚後14日以内にISAへの届出義務がある。次の在留期間更新時には「日本人の配偶者等」としての更新はできないため，別の在留資格（就労資格・定住者等）への変更が必要になる。至急行政書士に相談すること。 |

## Source Notes

- 在留資格変更許可申請の必要性: ISA「在留資格変更許可申請」(16-2.html) — 在留資格変更は申請・許可が必要; 自動変更なし.
- 外国籍の子の60日以内申請義務: ISA「在留資格認定証明書交付申請」(16-1.html) + 入管法第22条の4等 — 出生後60日以内申請.
- 離婚後の届出義務・在留資格変更: G8 cross-ref（配偶者の離婚・死亡の届出・在留への影響）; G29 cross-ref（14日以内届出義務）; G45 cross-ref（離婚後の実務ルート）.
- 特別永住者の子: G97 cross-ref（60日以内の特別永住許可申請）.
- Cross-ref G8 (配偶者の届出), G29 (届出義務), G43 (CoE手続き), G45 (離婚後在留ルート), G49 (永住者の配偶者等の離婚後), G64 (帰化の在留資格との関係), G76 (家族滞在=法律婚のみ), G97 (特別永住者の子).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 018 G100. Key sources: ISA 16-2.html（在留資格変更許可申請; 自動変更なし）; ISA 16-1.html（外国籍子の60日以内申請）; G8/G29/G45/G97 cross-refs. Core facts: 婚姻・離婚・子の出生で在留資格は自動変更されない; 外国籍の子=出生後60日以内申請必要; 離婚後=14日以内届出+次回更新時に在留資格変更必要. needs_domain P1: 60日期限超過後の子の申請方法; 配偶者死亡後の移行期間の公式ガイドライン. Cross-ref G8, G29, G43, G45, G49, G64, G76, G97.
