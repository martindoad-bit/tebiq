---
asset_id: guardrail-eijuu-go-zairyu-henkou
title: 永住者の在留資格変更と永住地位の維持 — 永住者は活動制限がないため他の就労資格への変更は不要；永住者が別の在留資格に変更すると永住地位を失う；永住資格は一度失うと再申請が必要；永住者が永住を「維持しながら」別の在留資格を追加することはできない
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 022"
---

## What This Document Is

This guardrail prevents errors about 永住者's rights, the need (or lack thereof) to change visa status after obtaining 永住, and what happens if a 永住者 changes their status. Key errors to block:

1. **"永住者は就労活動もできるし，別の在留資格（技人国等）に変更する必要はない。"** — correct, but needs clear affirmation because many people are confused about this. 永住者（在留資格「永住者」）は，活動制限がない在留資格であり，就労・事業・勉学等，ほぼすべての活動が許容される。別の就労系在留資格（技人国・特定技能・経営管理等）に変更する必要はない。
2. **"永住を持ったまま，技人国も取得できる。"** — incorrect. 在留資格は1つしか持てない。永住者が技人国等に変更すると，「永住者」の在留資格を失い，「技人国」の在留資格を取得することになる。
3. **"永住者が一時的に別の在留資格に変更しても，また永住に戻れる。"** — not straightforward. 永住者が別の在留資格に変更すると永住地位を失う。永住に「戻る」には，改めて永住許可申請（10年居住等の要件を再び満たすことが必要）をしなければならない。一度失った永住は自動的には戻らない。
4. **"永住者は出国・帰国を繰り返しても在留資格に問題はない。"** — partially incorrect. みなし再入国許可（1年）を超えた出国・海外長期居住は永住資格を失効させるリスクがある（G19・G74・G82参照）。

## Trigger

Use this card when the user says:

- "永住ビザを持っていますが，就職したら技人国に変更する必要がありますか？"
- "永住者でも別のビザを追加で取ることはできますか？"
- "永住者が技人国ビザに変更するとどうなりますか？"
- "一度永住ビザを取ったら，絶対に他のビザに変更してはいけないのですか？"
- "永住者として働くのと，技人国で働くのはどう違いますか？"
- any pattern suggesting that permanent residents need to change to employment visas, or that visa status can be combined or switched back easily.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-ho-beppyo-eijuu | L1 | 出入国管理及び難民認定法別表第二「永住者」 | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-15 | 「永住者」の活動定義: 「法務大臣が永住を許可した者の行う一切の活動」→ 活動制限なし. |
| eijuu-isa-page | L4 | 出入国在留管理庁「永住許可申請」 | https://www.moj.go.jp/isa/applications/procedures/16-4.html | 2026-05-15 | 永住許可の要件・手続き; 在留資格「永住者」の内容. |
| g60-eijuu-yoken | guardrail | guardrail-eijuu-shinsei-kihon-yoken (G60) | internal | 2026-05-15 | G60: 永住申請の基本三要件（素行・生計・国益）と10年居住要件. |
| g19-minashi | guardrail | guardrail-minashi-sainyukoku-one-year-limit (G19) | internal | 2026-05-15 | G19: みなし再入国1年超過で在留資格失効リスク（永住者も対象）. |
| g74-eijusha-risk | guardrail | guardrail-eijusha-zairyu-torikeshi-risk (G74) | internal | 2026-05-15 | G74: 永住者の在留資格取消リスク（虚偽申請・届出違反・みなし超過等）. |
| g83-eijuu-route | guardrail | guardrail-eijuu-route-hikaku (G83) | internal | 2026-05-15 | G83: 永住への各ルート比較（技人国・特定技能・HSP）. |

## Official Rule Or Source Fact

**在留資格「永住者」の活動範囲（入管法別表第二）:**

「法務大臣が永住を許可した者の行う一切の活動」

→ 活動制限なし。就労・事業経営・勉学・봉사활동（ボランティア）等，いかなる活動も許容される。

**永住者が就労するために在留資格変更は不要:**

- 永住者は「技人国」「特定技能」「経営管理」等の就労系在留資格に変更する必要は一切ない
- 雇用主（日本法人）は，永住者の採用に際して在留資格の種別を「技人国」等に変更させる法的権限はなく，変更を求めること自体が誤り
- 永住者の在留カードには「就労制限なし」と記載されており，これが就労可能であることの証明

**在留資格は1つのみ保有可能:**

- 日本の在留資格制度では，複数の在留資格を同時に保有することはできない
- 永住者が別の在留資格（技人国等）に変更申請し許可された場合: 「永住者」の資格を失い，「技人国」等の資格を取得する
- これは不可逆的ではないが，永住に「戻る」には改めて永住許可申請が必要

**永住者が別の在留資格に変更した場合のリスク:**

- 永住地位の喪失: 変更後は就労活動の制限が生じる在留資格（技人国であれば業務内容制限等）に変わる
- 永住への再申請: 改めて永住許可の要件（10年居住等）を満たした上で申請が必要。変更後から再度10年必要とは限らないが，要件の充足確認が必要
- 実務上は，永住者が別の在留資格に変更する合理的理由はほぼない（活動制限がないため）

**永住者が在留資格変更を検討すべきまれなケース（参考）:**

- HSP2（高度専門職2号）への変更: 永住者の活動範囲はHSP2と同等かそれ以上だが，所属機関・配偶者の就労許可の観点でHSP2固有の優遇がある場合（ただしHSP2は活動継続が前提で取消リスクあり）
- 「教授」「研究」等の特定在留資格が必要とされる制度的文脈（一部の国際機関・外交特権が絡む制度等）: 実際には永住者でも業務遂行に支障はないことが多く，変更の実益は限定的

**在留カードと在留期間:**

- 永住者の在留資格は無期限だが，在留カードの有効期限は定期的に更新が必要（G53参照）
- みなし再入国1年超過・正規再入国許可失効等による在留資格消滅リスクは永住者にも適用（G19・G74参照）

## Safe Answer Behavior

- When asked if PR holders need to change to work visa: clearly confirm that 永住者 has no activity restriction and no change is needed for any type of work.
- When asked about combining PR with another status: clearly state that only one status can be held at a time; switching to another status means losing 永住.
- When asked about switching back to PR after changing to another status: explain that a new 永住許可 application is required; it is not automatic.
- When asked about long-term overseas stays: flag the みなし再入国 1-year limit (G19) and 永住 cancellation risk (G74).

## Must Say

- 永住者（在留資格「永住者」）は就労活動に制限がないため，技人国・特定技能・経営管理等の就労系在留資格に変更する必要はない。
- 日本の在留資格は1つしか保有できない。永住者が別の在留資格に変更すると，永住地位を失う。永住への復帰は改めての永住許可申請が必要。
- 永住者であっても，みなし再入国許可（1年）を超えた出国は在留資格消滅リスクがある。

## Must Not Say

- 「永住者が就職したら技人国に変更する必要がある。」（不要）
- 「永住を持ちながら技人国も取得できる。」（在留資格は1つのみ）
- 「永住から一時的に別のビザに変えて，すぐ永住に戻れる。」（簡単ではない；再申請が必要）

## Deep Water Triggers

- 永住者（外国籍）が日本の国会議員・地方議員への被選挙権を持つか（在留資格と政治権利の関係）
- 永住者の配偶者（「永住者の配偶者等」）が永住者自身の在留資格変更後にどのような影響を受けるか
- 永住者が日本国籍に帰化した場合，永住地位はどうなるか（帰化と永住は併存できるか）
- HSP2保持者が永住申請する場合と，永住者がHSP2に変更する場合のメリット比較
- 永住者が海外で長期雇用される場合（日本の会社の海外駐在等）の在留資格管理

## User Next Actions

This is not user-facing copy. For answer routing:

- For PR holders asking if they need an employment visa: clearly tell them no; confirm they can work without changing status.
- For PR holders who changed (or are about to change) to another status: flag the loss of PR; route to immigration lawyer for assessment of whether re-application for PR is feasible.
- For PR holders planning extended overseas absence: route to G19/G74 for みなし再入国 risk mitigation; recommend 正規再入国許可 before departure.
- For employers asking to make PR employees change status: clarify that this is legally unnecessary and cannot be required of the employee.

## Unknown Fields

- Whether there is any scenario under ISA's current practice where a 永住者 can hold a secondary activity status or benefit from another status without actually replacing 永住者.
- The specific conditions under which a person who changed from 永住者 to another status can subsequently re-qualify for 永住 without serving the full standard 10-year residence requirement.

## Needs Domain Flags

- needs_domain (P1): After a 永住者 changes to another status (e.g., 技人国), can they qualify for a new 永住 application based on their original 在留歴, or must they restart the residence-period clock? What is ISA's official treatment of prior 永住 holders re-applying?
- needs_domain (P1): Is there any formal mechanism by which a 永住者 can hold a concurrent activity status (e.g., HSP2 recognition for point-based benefits) without losing 永住 — or is the one-status-at-a-time rule absolute?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| eijuu-henkou-001 | "永住ビザを持っています。就職しましたが，技人国ビザに変更する必要がありますか？" | State: 永住者（在留資格「永住者」）は活動制限がなく，就労・事業・勉学等あらゆる活動が許容される。技人国等の就労系在留資格に変更する必要はない。在留カードの「就労制限なし」の記載が就労可能の証明になる。 |
| eijuu-henkou-002 | "永住を持ちながら，技人国ビザも取ることができますか？" | State: 日本の在留資格は1つしか保有できない。永住者が技人国等に変更すると，永住者の資格を失う。永住者のまま就労する場合，技人国への変更は不要（活動制限がないため）。永住と技人国の「両方を持つ」ことはできない。 |
| eijuu-henkou-003 | "永住ビザから一時的に技人国に変更して，また永住に戻ることはできますか？" | State: 永住者が別の在留資格に変更すると永住地位を失う。永住に戻るには，改めて永住許可申請（素行・生計・国益の要件を再充足）が必要。「一時的な変更」から「すぐに永住に戻る」ルートは存在しない。通常は永住者のままで問題ないため，変更の実益がない場合は変更すべきではない。 |

## Source Notes

- 永住者の活動定義: 入管法別表第二（「法務大臣が永住を許可した者の行う一切の活動」; 活動制限なし）.
- 永住許可申請の要件: ISA「永住許可申請」ページ（G60 cross-ref）.
- みなし再入国リスク: G19（1年超過で失効）; G74（永住者の取消リスク）.
- 在留カード有効期限: G53（永住者の在留カード=7年; 在留資格は永久）.
- Cross-ref G19（みなし再入国），G53（永住者カード更新），G60（永住申請要件），G74（永住者取消リスク），G83（永住ルート比較）.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 022 G119. Key sources: 入管法別表第二（永住者の活動定義=制限なし）; ISA「永住許可申請」ページ; G19・G53・G60・G74 cross-refs. Core facts: 永住者は活動制限なし→就労系在留資格変更不要; 在留資格は1つのみ保有可能→変更すると永住地位喪失; 永住再申請は別途必要; みなし再入国1年超過リスクは永住者にも適用. needs_domain P1: 永住→他資格→永住再申請時の在留歴の扱い; 永住とHSP2の同時保有の可否. Cross-ref G19, G53, G60, G74, G83.
