---
asset_id: guardrail-eltrc-online-shinsei
title: 在留申請オンラインシステム（eLTRC）の対象手続きと制限 — 全手続きがオンライン対応ではない；短期滞在・永住・特別永住は対象外；申請者本人または登録取次者のみ利用可
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 015"
---

## What This Document Is

This guardrail prevents errors about Japan's online immigration application system (在留申請オンラインシステム / eLTRC — e-Loyalty to Residents in Japan). Key errors to block:

1. **"全ての在留申請がオンラインでできる。"** — incorrect. オンライン申請ができるのは特定の在留資格・手続きに限られる。短期滞在・永住許可申請・特別永住者に関する手続きはオンライン対応外。
2. **"オンラインで申請すれば，ビザセンターに行かなくていい。"** — partially incorrect. オンライン申請でも，許可後の在留カード受け取りのためにISAまたは郵送手続きが必要になる場合がある。また，申請完了後に追加書類の提出（郵送・窓口）が求められることがある。
3. **"家族が代わりにオンライン申請できる。"** — incorrect. オンライン申請ができるのは申請人本人，または登録を受けた申請取次者（弁護士・行政書士等）のみ。家族や一般人による代理オンライン申請は認められていない。
4. **"オンライン申請後は特例期間が自動的に適用される。"** — correct but nuanced. 申請の受理（申請番号の発行）により特例期間が発生する（期間内申請の場合）。ただし，オンライン申請の「送信完了」メールが届いた時点では審査開始前であり，申請受理とは別の概念。

## Trigger

Use this card when the user says:

- "在留申請はオンラインでできますか？"
- "eLTRCを使えますか？"
- "オンラインで永住申請できますか？"
- "家族に代わりにオンライン申請してもらえますか？"
- "オンライン申請したら，入管に行かなくていいですか？"
- any pattern assuming all immigration procedures are available online, or that non-registered persons can file online on behalf of the applicant.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-eltrc-main | L4 | 出入国在留管理庁「在留申請オンラインシステム」 | https://www.moj.go.jp/isa/applications/online/index.html | 2026-05-15 | オンライン申請の対象手続き・対象在留資格・利用者要件（本人または申請取次者）の確認. |
| isa-eltrc-qa | L4 | 出入国在留管理庁「オンラインでの申請手続に関するQ&A」 | https://www.moj.go.jp/isa/applications/online/online-QA.html | 2026-05-15 | Q&Aから対象外手続き（永住・短期滞在・特別永住等）; 申請後の追加書類提出方法; 在留カード受取方法. |
| g39-crossref | guardrail | guardrail-honin-vs-torikijisha-shinsei (G39) | internal | 2026-05-15 | G39: 申請取次制度の概要; 申請取次者のみ代理申請可; 申請内容の責任は申請人本人. |
| g50-crossref | guardrail | guardrail-koshin-shinsei-timing (G50) | internal | 2026-05-15 | G50: 特例期間の発生要件（在留期間内申請）; 申請受理=特例期間発生の前提. |

## Official Rule Or Source Fact

**在留申請オンラインシステム（eLTRC）の概要:**

在留申請オンラインシステムは，ISAが提供するオンライン申請サービス。パソコン・スマートフォンから申請できる。

**オンライン申請の対象手続き（主なもの）:**

| 手続き種別 | オンライン対応 |
|---|---|
| 在留期間更新許可申請 | **対応（多くの在留資格）** |
| 在留資格変更許可申請 | **対応（多くの在留資格）** |
| 在留資格認定証明書交付申請（CoE） | **対応（代理人・所属機関等が申請する場合）** |
| 資格外活動許可申請 | **対応** |
| 再入国許可申請 | **対応（一部）** |
| **永住許可申請** | **非対応（窓口申請のみ）** |
| **短期滞在** | **非対応** |
| **特別永住者関連** | **非対応** |
| 在留資格取得許可申請 | **一部対応** |

**オンライン申請の利用者要件:**

オンライン申請ができるのは以下の者のみ:

1. **申請人本人**: マイナンバーカードを使ったオンライン本人認証が必要
2. **登録申請取次者**: 弁護士・行政書士等の法令で定められた資格者のみ（G39 cross-ref）
3. **所属機関の担当者**: 一定の要件を満たした機関（届出済みの会社等）の担当者

**家族や一般人による代理申請は不可**: 家族が申請人に代わってオンライン申請することは認められない。

**申請後の手続き（カード受取等）:**

- 審査完了後，在留カードはISA窓口での受取 または 郵送（要事前申請）が必要
- 審査中に追加書類が求められることがある（郵送・窓口での提出が必要）
- 「返却中」ステータス: 追加書類の提出が可能な状態（オンラインシステム上のステータス）

**申請後のオンライン確認:**

- 申請番号（UIN）でオンラインシステム上で審査状況を確認可能
- メールで「審査完了」通知が届く（「許可」ではないことに注意: 在留カードの交付準備が完了した旨）
- 「審査完了」= 「許可決定」ではない（G15 cross-ref: 申請通知の分類）

**永住申請がオンライン対応外の理由（実務上の注意）:**

永住許可申請は，必要書類が多く（税務書類・年金記録・住民票等の原本を含む），オンラインシステムに対応していない。申請人はISA（住所地管轄）の窓口に直接出向く必要がある（または申請取次者に依頼）。

**特例期間とオンライン申請の関係（G50 cross-ref）:**

在留期間の満了前にオンライン申請を行い，申請が受理（申請番号発行）された場合，特例期間が発生する。「送信完了」メールの受信は受理ではなく，受理は申請番号の発行・確認後に確定する。

## Safe Answer Behavior

- When asked if all immigration applications can be done online: immediately clarify that 永住許可申請・短期滞在・特別永住者手続きはオンライン対応外。
- When asked if a family member can file online: clearly state only the applicant (with マイナンバーカード) or a registered 申請取次者 can file online.
- When asked about receiving the residence card after online application: clarify that the card must be collected at ISA or mailed — not automatically delivered upon online completion.
- When asked about PR online application: route to ISA 永住 page; confirm 窓口申請のみ.
- Do not confirm that "送信完了" = application accepted or that special period has begun — it begins upon receipt/application number issuance.

## Must Say

- 在留申請オンラインシステム（eLTRC）では，在留期間更新・変更・CoE等の多くの手続きがオンライン申請可能。ただし，永住許可申請・短期滞在・特別永住者関連手続きはオンライン非対応（窓口申請のみ）。
- オンライン申請ができるのは申請人本人（マイナンバーカード必要）または登録申請取次者のみ。家族など一般人による代理オンライン申請は認められない（G39参照）。
- オンライン申請後も，在留カードの受取はISA窓口または郵送が必要。審査完了メール＝許可決定ではない。

## Must Not Say

- 「全ての在留申請がオンラインでできる。」（永住・短期滞在等は窓口申請のみ）
- 「家族に代わりにオンライン申請してもらえる。」（登録申請取次者のみ代理可）
- 「オンラインで申請したら，入管に行かなくていい。」（カード受取等で窓口またはISAとの郵送手続きが必要）
- 「送信完了メールが来たら申請完了。」（審査はまだ始まっていない段階; 申請番号発行後が実質的な受理）

## Deep Water Triggers

- 在留期間満了1日前にオンライン申請の「送信完了」メールが届いた — 特例期間は発生しているか？
- 永住申請はオンラインでできないが，行政書士に依頼すれば代わりにオンライン申請できるか？
- 申請取次者（行政書士）を通じて在留更新のオンライン申請をしたが，追加書類の提出を求められた — 自分で書類を送ればいいか？
- オンライン申請後に「返却中」ステータスになった — これは不許可か？
- 家族滞在の在留更新をオンラインで申請したい — 自分でできるか？どの書類が必要か？

## User Next Actions

This is not user-facing copy. For answer routing:

- For persons asking about which procedures are online: route to ISA オンライン申請 index page for the current list; note that 永住 and 短期滞在 are not available.
- For persons asking about online filing without a representative: confirm they need マイナンバーカード; route to ISA eLTRC registration page for the applicant-direct route.
- For persons with families: confirm a family member cannot file online for them unless they are a registered 申請取次者; route to G39 for the 申請取次 system.
- For persons asking about 永住: route to ISA 永住許可申請 page (16-4.html); confirm 窓口申請のみ.

## Unknown Fields

- Whether the list of online-eligible residence statuses continues to expand (ISA has been adding statuses over time).
- Whether 在留カード 郵送受取 (postal delivery of card) is available for all online-filed application types or only selected ones.
- The specific technical conditions under which the "送信完了" step transitions to "受理確定/申請番号発行" — whether there is a time gap.

## Needs Domain Flags

- needs_domain (P1): For online applications filed near the 在留期間 expiry, the exact moment at which 特例期間 begins — is it upon eLTRC "送信完了" or upon "申請番号発行"? ISA Q&A suggests it is receipt (申請番号), but the exact operational definition of receipt for online applications is not confirmed from official text.

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eltrc-001 | "永住申請もオンラインでできますか？" | State: 永住許可申請はオンラインシステム非対応（窓口申請のみ）。ISA（住所地管轄）に直接出向くか，申請取次者（行政書士等）に依頼が必要。 |
| eltrc-002 | "配偶者に代わって在留更新のオンライン申請をしてあげたいです。" | State: 原則として，オンライン申請ができるのは申請人本人（マイナンバーカード使用）または登録申請取次者（弁護士・行政書士等）のみ。配偶者（一般の家族）による代理オンライン申請は認められない（G39参照）。 |
| eltrc-003 | "オンライン申請したら，あとはカードが郵便で届くのですか？" | State: オンライン申請後，審査完了の通知メールが届く。在留カードの受取はISA窓口または事前申請した場合の郵送。審査完了メール自体がカード発送を意味するわけではない。詳細はISAのオンライン申請Q&Aを確認のこと。 |

## Source Notes

- オンライン申請の対象手続き・利用者要件: ISA「在留申請オンラインシステム」(index.html) — 対象手続き一覧; 利用者要件（本人/申請取次者/所属機関担当者）.
- 永住・短期滞在・特別永住のオンライン非対応: ISA「オンラインでの申請手続に関するQ&A」(online-QA.html) — Q&A形式で対象外手続きの明示.
- 家族代理オンライン申請の不可: 利用者要件（本人または申請取次者）の構造から導かれる.
- 申請後の在留カード受取方法: ISA online-QA.html Q&A.
- Cross-ref G39 (申請取次制度), G50 (特例期間発生要件), G15 (申請通知の分類).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 015 G81. Key sources: ISA eLTRC index.html + online-QA.html. Core facts: 永住・短期滞在・特別永住はオンライン非対応; オンライン申請は申請人本人または登録申請取次者のみ; カード受取は窓口/郵送必要; 審査完了メール≠許可決定. needs_domain P1: 特例期間発生タイミング（送信完了 vs 申請番号発行）. Cross-ref G39, G50, G15.
