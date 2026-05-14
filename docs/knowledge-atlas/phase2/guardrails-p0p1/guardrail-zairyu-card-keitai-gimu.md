---
asset_id: guardrail-zairyu-card-keitai-gimu
title: 在留カード常時携帯義務 — 16歳以上は常時携帯必須；提示義務あり；不携帯は罰則対象
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 011"
---

## What This Document Is

This guardrail prevents errors about the obligation to carry (常時携帯義務) and present (提示義務) the 在留カード. Key errors to block:

1. **"在留カードは家に置いておいてもいい。外出時は持ち歩かなくていい。"** — incorrect. 16歳以上の中長期在留者は常時携帯が法律上の義務（入管法第23条第1項）。
2. **"在留カードの提示を求められても見せなくていい場合もある。"** — incorrect. 入国審査官・入国警備官・警察官・海上保安官等からの提示要求には応じる義務がある（入管法第23条第2項）。
3. **"在留カードを忘れても罰則はない。"** — incorrect. 不携帯は20万円以下の罰金対象（入管法第76条）。
4. **"16歳未満でも在留カードを常時携帯しなければならない。"** — incorrect. 16歳未満は常時携帯義務が免除される（ただしカード自体は保有）。

## Trigger

Use this card when the user says:

- "在留カードはいつも持ち歩く必要がありますか？"
- "在留カードを携帯しないと罰則はありますか？"
- "警察に在留カードの提示を求められたら見せないといけませんか？"
- "子ども（16歳未満）も在留カードを持ち歩かなければなりませんか？"
- "在留カードを家に置いて外出してもいいですか？"
- any pattern treating 在留カード携帯 as optional, or misunderstanding the presentation obligation.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| nyukan-23jo | L1 | 出入国管理及び難民認定法 第23条 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 第23条第1項: 16歳以上の中長期在留者は在留カードを常時携帯しなければならない。第23条第2項: 入国審査官・入国警備官・警察官・海上保安官・刑事施設職員からの提示要求に応じる義務。 |
| nyukan-76jo | L1 | 出入国管理及び難民認定法 第76条 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 第76条: 第23条第1項違反（不携帯）= 20万円以下の罰金。 |
| isa-card-info | L4 | 出入国在留管理庁「在留カードについて」 | https://www.moj.go.jp/isa/applications/zairyu_card01.html | 2026-05-15 | 在留カードの常時携帯義務および提示義務の案内。 |
| g22-crossref | guardrail | guardrail-zairyu-card-expiry-vs-status-period (G22) | internal | 2026-05-15 | G22: カード有効期限 ≠ 在留期間。この card は携帯義務・提示義務に集中。 |

## Official Rule Or Source Fact

**常時携帯義務（入管法 第23条第1項）:**
> 「中長期在留者は、在留カードを常時携帯しなければならない。ただし、十六歳に満たない者については、この限りでない。」

Key points:
- 対象: **中長期在留者**（短期滞在・特別永住者等を除く）で**16歳以上**の者
- 義務の内容: **常時携帯**（always carry — not just when at immigration offices）
- 例外: 16歳未満 = 常時携帯義務なし（ただし在留カード自体は交付される）

**提示義務（入管法 第23条第2項）:**
> 「前項の規定による在留カードの携帯を要する者は、入国審査官、入国警備官、警察官、海上保安官その他法務省令で定める国又は地方公共団体の職員から、在留カードの提示を求められたときは、これを提示しなければならない。」

提示を求める権限がある者:
- 入国審査官
- 入国警備官
- 警察官（都道府県警察）
- 海上保安官
- 刑事施設（拘置所・刑務所）職員
- その他法務省令で定める国・地方公共団体の職員

**罰則（入管法 第76条）:**
> 第23条第1項の規定に違反した者（在留カード不携帯）= **20万円以下の罰金**

**Who is a 中長期在留者（定義）:**
中長期在留者 = 在留カードを交付された者、具体的には:
- 3か月を超える在留期間を有する者（一定の在留資格を保有）
- 短期滞在・外交・公用を除く者で在留カードを交付されている者
- ※ 特別永住者は別法（入管特例法）が適用されるため、在留カード制度の対象外（特別永住者証明書を別途保有）

**16歳未満の扱い:**
- 在留カード自体は交付される（就学・入学手続き等で必要）
- 常時携帯義務は**免除**（入管法 第23条第1項ただし書き）
- 提示義務: 携帯義務がない者には提示義務も原則として生じない

**実務上の重要ポイント:**
- 職務質問に際して警察官から提示を求められた場合: 提示する義務がある
- 就職・役所手続き等での提示要求: 法律上の提示義務の対象ではないが、実務上提示が求められる場面は多い
- カードの有効期限切れでも在留期間中であれば在留資格は有効（G22 cross-ref）だが、不携帯とは別問題

## Safe Answer Behavior

- When asked if 在留カード must be carried at all times: confirm YES for those aged 16+; it is a legal obligation under 入管法 第23条.
- When asked about penalties: confirm 20万円以下の罰金 for non-compliance (入管法 第76条).
- When asked about children under 16: confirm the exemption from 常時携帯義務.
- When asked about the presentation obligation: confirm it is mandatory when requested by specified officials (police, immigration officers, etc.).
- Do not say "you don't need to show it" or "not carrying is usually fine."

## Must Say

- 16歳以上の中長期在留者は，在留カードを常時携帯しなければならない（入管法第23条第1項）。日常的な外出の際も含む。
- 入国審査官・入国警備官・警察官・海上保安官等から在留カードの提示を求められた場合は，これに応じる義務がある（入管法第23条第2項）。
- 在留カードを携帯していなかった場合，20万円以下の罰金が科される可能性がある（入管法第76条）。
- 16歳未満の者は常時携帯義務が免除されている（ただしカード自体は保有）。

## Must Not Say

- 「在留カードは外出時に持ち歩かなくてもいい。」
- 「警察に見せるかどうかは任意だ。」
- 「忘れても罰則はない。」
- 「特別永住者も在留カードを携帯しなければならない。」（特別永住者は別制度）

## Deep Water Triggers

- Person always keeps 在留カード at home for "safety" — is this a violation?
- Person was stopped by police and refused to show 在留カード — what are the consequences?
- 16-year-old got their first 在留カード — do they now have the 常時携帯義務?
- Person's 在留カード is expired (but 在留期間 is still valid under 特例期間) — must they still carry it?
- 特別永住者 asks if they also need to always carry their identification card.

## User Next Actions

This is not user-facing copy. For answer routing:

- For those not currently carrying their 在留カード: advise to carry it at all times going forward; past violations are difficult to remedy but ongoing compliance is the key.
- For those stopped by police: advise to comply with presentation requests; route to professional if there are legal complications.
- For those with expired cards: clarify the card renewal procedure (G22 cross-ref) and confirm the distinct carry obligation still applies even with expired card.
- For 特別永住者: clarify they are under 入管特例法 (a separate law); they carry 特別永住者証明書 not 在留カード.

## Unknown Fields

- Whether refusing to show a 在留カード to a police officer triggers arrest authority or only a fine.
- The exact scope of "その他法務省令で定める国又は地方公共団体の職員" — which specific local government roles are included.
- Whether a digital copy (photo on smartphone) is accepted in practice as a substitute for the physical card in routine workplace/municipal contexts.

## Needs Domain Flags

- needs_domain (P1): what are the practical consequences of refusing to show a 在留カード to a police officer during a 職務質問? Does refusal constitute the violation, or only non-possession?
- needs_domain (P1): are there ISA or government guidelines on acceptable alternatives if the card is lost or stolen and a replacement is in process?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| card-001 | "在留カードは常に持ち歩かないといけませんか？" | State: YES — 16歳以上の中長期在留者は常時携帯義務あり（入管法第23条）。不携帯 = 20万円以下の罰金（第76条）。 |
| card-002 | "警察に在留カードを見せるよう言われました。見せないといけませんか？" | State: YES — 警察官からの提示要求には応じる義務がある（入管法第23条第2項）。拒否すると違反となる可能性あり。 |
| card-003 | "子ども（13歳）の在留カードは常時携帯させないといけませんか？" | State: NO — 16歳未満は常時携帯義務が免除（ただしカード自体は保有・管理が必要）。 |

## Source Notes

- 常時携帯義務（第23条第1項）and 提示義務（第23条第2項） confirmed from 入管法 条文（e-Gov法令検索）.
- 罰則（第76条: 20万円以下の罰金）confirmed from 入管法 条文.
- 16歳未満の免除は第23条第1項「ただし書き」に明示.
- 中長期在留者の定義は入管法第19条の3で規定.
- Cross-ref G22 (在留カード有効期限 ≠ 在留期間; この card はcross-ref用).
- 特別永住者は入管特例法 第7条で別途識別証明書（特別永住者証明書）の携帯義務が規定されている — 入管法第23条の対象外.

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 011 G61. Key sources: 入管法第23条（携帯・提示義務）; 入管法第76条（罰則）. Core facts: 16歳以上=常時携帯必須; 警察官等への提示義務あり; 不携帯=20万円以下罰金; 16歳未満=免除. Cross-ref G22.
