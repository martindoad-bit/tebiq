---
asset_id: guardrail-kazoku-taizai-shutoku-yoken
title: 家族滞在ビザの取得要件 — 主たる在留資格者が安定した在留資格と扶養能力を持つことが必要；内縁関係・同居でない家族は対象外
asset_family: guardrail-p0p1
source_layer: L4-official-procedure
state: atlas_draft
risk_level: P1
confidence: high
source_quality: official
last_checked_at: 2026-05-15
batch: "Batch 014"
---

## What This Document Is

This guardrail prevents errors about the eligibility requirements for 家族滞在 (dependent visa) status in Japan. Key errors to block:

1. **"技人国や特定技能があれば，誰でも家族を呼び寄せられる。"** — partially incorrect. 家族滞在の取得には，扶養者（主たる在留者）の在留資格の種類・安定性と，扶養能力（所得・生活能力）が要件となる。特定技能1号は家族帯同が原則不可（G33 cross-ref）。
2. **"内縁の妻（夫）を家族滞在として呼び寄せられる。"** — incorrect. 家族滞在の対象となる「配偶者」は法律上の婚姻関係（法律婚）に基づく配偶者に限る。内縁関係・事実婚は原則として対象外。
3. **"留学生が卒業後就職したら，すぐに家族を呼べる。"** — partially incorrect. 就職後に技人国等の就労系在留資格に変更してから，家族滞在の申請が可能。留学中は家族滞在の主たる扶養者たる資格として不安定な場合がある（留学ビザでの家族呼び寄せは可能だが扶養能力審査が行われる）。
4. **"子どもだけなら簡単に家族滞在ビザが取れる。"** — partially incorrect. 「実子または特別養子縁組による養子」が対象。認知されていない非嫡出子や，法律上の養子関係がない子どもは対象外となる可能性がある。

## Trigger

Use this card when the user says:

- "家族を日本に呼びたいのですが，どのビザが必要ですか？"
- "技人国があれば妻（夫）を呼べますか？"
- "特定技能1号で家族を帯同できますか？"
- "内縁のパートナーを家族滞在として申請できますか？"
- "子どもを日本に呼ぶには何が必要ですか？"
- any pattern assuming any work visa holder can bring any dependent, or treating de-facto relationships as eligible for 家族滞在.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-kazoku | L4 | 出入国在留管理庁「在留資格『家族滞在』」 | https://www.moj.go.jp/isa/applications/status/kazokutaizai.html | 2026-05-15 | 家族滞在の対象: 就労・文化・留学等の在留資格保有者の配偶者（法律婚）または子（実子・特別養子）. 内縁関係や認知未済の子は通常対象外. |
| g33-crossref | guardrail | guardrail-tokutei-gino-1go-2go-boundary (G33) | internal | 2026-05-15 | G33: 特定技能1号は家族帯同原則不可（1号の制約）. 特定技能2号は家族帯同可能. |
| g48-crossref | guardrail | guardrail-kazoku-taizai-shuro-seigen (G48) | internal | 2026-05-15 | G48: 家族滞在は就労許可なし（資格外活動許可が別途必要）; 28h/week上限. |
| g31-crossref | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 更新・変更審査は大臣裁量; 扶養能力も素行・生計要件の一環. |
| egov-nyukan-app | L1 | 出入国管理及び難民認定法 別表第一の五 | https://laws.e-gov.go.jp/law/326CO0000000319 | 2026-05-15 | 家族滞在の法的根拠 = 入管法 別表第一の五「家族滞在」定義. |

## Official Rule Or Source Fact

**家族滞在の対象者（在留資格保有者の「家族」の定義）:**

在留資格「家族滞在」の対象者（呼び寄せられる家族）は:

| 関係 | 対象 | 備考 |
|---|---|---|
| **配偶者** | 法律婚（法律上の婚姻関係）の配偶者のみ | 内縁・事実婚は原則対象外 |
| **子** | 実子または特別養子縁組による養子 | 認知未済の非嫡出子・普通養子は要確認 |

**扶養者（主たる在留資格者）の在留資格の種類:**

家族滞在を申請できる「扶養者」となれる在留資格の主な例:

| 在留資格の例 | 家族帯同 |
|---|---|
| 技術・人文知識・国際業務 | 可（審査あり） |
| 経営・管理 | 可（審査あり） |
| 高度専門職1号・2号 | 可（審査あり）|
| 研究・教育・医療等 | 可（審査あり）|
| **特定技能1号** | **原則不可**（G33 cross-ref）|
| **特定技能2号** | 可（G33 cross-ref）|
| **留学** | 可（ただし扶養能力審査が厳しい）|
| **技能実習・育成就労** | 原則不可（在留資格の性格上）|
| **短期滞在** | 不可（短期滞在自体が一時的） |

**扶養能力の審査:**

家族滞在申請では，扶養者（主たる在留資格者）の**扶養能力（所得・生活能力）**が審査される。明文化された最低所得額はないが，以下が実務上の評価基準とされる:
- 安定した継続的な収入があること
- 家族全員を日本で扶養するに足る所得水準であること
- 生活費・住居費等を賄えること

**審査書類（主なもの — 在留資格変更・認定証明書申請時）:**
- 扶養者の在留資格を証明する書類（在留カード等）
- 扶養者の所得・雇用を証明する書類（課税証明書・在職証明書・給与明細等）
- 扶養関係を証明する書類（婚姻証明書・出生証明書等）
- 住居関連書類

**内縁関係・事実婚への対応:**

内縁関係（事実婚）のパートナーは，法律婚の「配偶者」に当たらないため，家族滞在の対象とならない。ただし:
- 同性パートナーシップ，内縁関係 → 「特定活動」（ビザの種類）での在留が認められる場合がある（一部の都道府県でパートナーシップ制度があり，特定活動での在留が認められた事例あり）
- これは例外的・個別的な取り扱いであり，一般的な制度ではない → needs_domain

**特定技能1号の家族帯同禁止（G33 cross-ref）:**

特定技能1号は，法令上，家族帯同が認められていない（在留資格「家族滞在」の対象扶養者から除外されている）。技能実習と同様，特定技能1号での就労期間中は家族を日本に呼ぶことができない。

例外的なケース:
- 特定技能1号保有者が別の在留資格（例: 技人国に変更）→ その後の家族呼び寄せは可能
- 特定技能2号に変更後 → 家族帯同可能

**家族滞在と就労（G48 cross-ref）:**

家族滞在ビザ自体は就労許可を含まない。家族滞在者が就労するには，別途「資格外活動許可（包括許可）」を取得し，週28時間以内の就労に限られる。

## Safe Answer Behavior

- When asked if any work visa holder can bring family: ask about the specific visa type; confirm 特定技能1号 = no family, 2号 = family OK.
- When asked about common-law partners: clearly state that 内縁・事実婚 is not recognized for 家族滞在; mention the 特定活動 route exists in some cases but is not a general option.
- When asked about children: confirm the "実子 or 特別養子" requirement; ask about the specific child's legal relationship.
- When asked about income thresholds: do not state a specific yen amount (no official threshold); route to professional for income assessment.
- When asked about 家族滞在 and work: route to G48 for the 28h/week rule.

## Must Say

- 家族滞在ビザの対象は，就労・文化・留学等の在留資格を保有する者の「法律婚の配偶者」または「実子・特別養子縁組による養子」に限られる。内縁・事実婚のパートナーは原則として対象外。
- 特定技能1号の在留資格保有者は，家族滞在ビザの扶養者（呼び寄せる側）となることができない（G33参照）。特定技能2号は可能。
- 扶養能力（安定した所得・生活能力）が申請審査の重要な要素。明文の最低所得基準はないが，家族全員を扶養できる収入が必要とされる。

## Must Not Say

- 「就労ビザがあれば誰でも家族を呼べる。」（特定技能1号等は不可; 扶養能力審査あり）
- 「内縁のパートナーも家族滞在で呼べる。」（法律婚の配偶者に限る）
- 「特定技能1号で家族を日本に呼べる。」（G33: 特定技能1号は家族帯同不可）
- 「家族滞在があれば自由に働ける。」（G48: 資格外活動許可が別途必要; 28h/week上限）

## Deep Water Triggers

- 技人国保有者の所得が年収250万円（月20万円強）だが，妻と子2人を呼びたい — 扶養能力は足りるか？
- 離婚した後に前妻との子を日本に呼びたい — 親権・面会交流と家族滞在の関係は？
- 特定技能1号保有者が技人国に変更後，すぐに家族を呼べるか？
- 日本でのパートナーシップ制度を利用している同性カップル — 家族滞在は使えるか？
- 認知した非嫡出子を家族滞在で呼ぶことはできるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For 特定技能1号 holders: clearly state family accompaniment is not possible; route to G33 for the 1号/2号 boundary; if they want family in Japan, the route is status change first (e.g., to 技人国).
- For holders of 技人国, 経営管理, HSP: confirm family accompaniment is possible; route to ISA 家族滞在 page for specific document requirements; route to professional for income adequacy assessment.
- For common-law/same-sex relationships: acknowledge the limitation; note 特定活動 as a potential route in some cases; strongly route to professional.
- For 家族滞在 holders asking about work: route to G48 (資格外活動許可, 28h/week rule).

## Unknown Fields

- The specific minimum income level that ISA's operational practice uses to assess 扶養能力 for 家族滞在 applications (no official figure has been published).
- Whether ordinary (non-special) 養子縁組 (adoption) qualifies for 家族滞在 as "子."
- ISA's current operational practice for 特定活動 residence for same-sex partners or common-law partners — which municipalities' partnership certificates are recognized and under what conditions.

## Needs Domain Flags

- needs_domain (P1): What is ISA's operational income threshold (if any) for 扶養能力 assessment in 家族滞在 applications? Are there published internal guidelines or examples?
- needs_domain (P1): Can recognized 認知 (paternity acknowledgment) of a non-marital child qualify the child as "子" for 家族滞在 purposes, and what documentation is required?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| kazoku-001 | "特定技能1号で働いていますが，妻を日本に呼べますか？" | State: NO — 特定技能1号は家族滞在の扶養者となることができない（G33参照）。特定技能2号または他の就労系在留資格（技人国等）に変更後であれば家族滞在申請が可能。 |
| kazoku-002 | "内縁の妻を家族滞在で呼べますか？" | State: 原則NO — 家族滞在の「配偶者」は法律上の婚姻関係（法律婚）の配偶者に限られる。内縁・事実婚は通常対象外。一部特定活動での在留が認められる場合があるが，一般的な制度ではなく専門家に相談が必要。 |
| kazoku-003 | "技人国で子どもを日本に呼ぶにはどうすればいいですか？" | State: 技人国保有者の実子または特別養子縁組による養子であれば，家族滞在として申請可能。扶養者の所得・扶養能力の審査がある。婚姻証明書・出生証明書等の書類が必要。詳細は法務局・ISA公式サイトまたは専門家に確認を。 |

## Source Notes

- 家族滞在の対象者・扶養者の在留資格: ISA kazokutaizai.html（家族滞在の在留資格定義）.
- 特定技能1号の家族帯同禁止: G33 cross-ref（ISA FAQ・特定技能制度から確認済み）.
- 家族滞在者の就労制限（28h/week）: G48 cross-ref（ISA 資格外活動許可ページ確認済み）.
- 内縁関係の除外: 家族滞在の「配偶者」定義が法律婚に限定されることは，入管法 別表第一の五の構造的解釈から導かれる.
- Cross-ref G33 (特定技能1号家族帯同禁止), G48 (家族滞在の就労制限), G31 (更新・変更審査の裁量), G25 (帰化との比較).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 014 G76. Key sources: ISA kazokutaizai.html (家族滞在の対象); G33 cross-ref (特定技能1号=家族帯同不可); G48 cross-ref (就労制限). Core facts: 家族滞在=法律婚配偶者+実子/特別養子のみ; 内縁・事実婚は対象外; 特定技能1号は扶養者になれない; 扶養能力の審査あり; 家族滞在保有者の就労は資格外活動許可が必要（28h/week）. Cross-ref G33, G48, G31.
