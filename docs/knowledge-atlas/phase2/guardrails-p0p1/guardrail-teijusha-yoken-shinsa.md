---
asset_id: guardrail-teijusha-yoken-shinsa
title: 在留資格「定住者」の要件と審査 — 大臣裁量の定性的審査；告示定住と告示外定住に分かれる；日本人配偶者との離婚後の元配偶者の定住者は告示外で高度に裁量的
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

This guardrail prevents errors about the 定住者 (long-term resident) status in Japan — both the 告示定住 (officially designated) and 告示外定住 (non-designated, discretionary) categories. Key errors to block:

1. **"日本人と離婚したら，定住者ビザに変更できる。"** — overstated. 離婚後の 元配偶者（former spouse of Japanese national）に対する定住者付与は**告示外定住（大臣裁量）**であり，法律上の自動的な資格ではない。子の養育・長期居住実績・生計能力等が総合的に考慮される。
2. **"定住者は永住と同じで，活動制限がない。"** — partially correct. 定住者は就労活動に制限がない（就労系在留資格のような業務範囲制限がない）が，**在留期間は有限**（5年・3年・1年・6か月のいずれか）。永住とは本質的に異なる。
3. **"日系人（日本人の孫等）なら自動的に定住者になれる。"** — incorrect. 告示定住（日系人定住者）の場合も，法務大臣の告示で定められた要件を満たし，申請許可を受けなければならない。自動取得ではない。
4. **"告示定住と告示外定住の違いは関係ない。どちらでも同じ。"** — incorrect. 告示定住は要件が告示（法令）で明確化されており，要件を満たせば比較的予測可能に許可される。告示外定住は法務大臣の高度な裁量であり，要件が明文化されておらず，個別事情の評価が決め手になる。

## Trigger

Use this card when the user says:

- "日本人と離婚したら，定住者ビザに変更できますか？"
- "定住者ビザと永住はどう違いますか？"
- "日本人の配偶者ビザから定住者に変更する方法を教えてください。"
- "定住者になれば，どんな仕事でもできますか？"
- "日系人ですが，定住者ビザを申請できますか？"
- any pattern treating 定住者 as automatic post-divorce, or conflating 定住者 with 永住.

## Source Refs

| ref_id | layer | source | URL | checked_at | fact use |
|---|---|---|---|---|---|
| isa-teijusha | L4 | 出入国在留管理庁「在留資格『定住者』」 | https://www.moj.go.jp/isa/applications/status/teijusha.html | 2026-05-15 | 定住者の概要; 告示定住の種類（日系人等）; 告示外定住（大臣裁量）の存在を確認. |
| moj-kokuji | L1 | 法務省「定住者の在留資格を決定する基準を定める省令」（いわゆる告示） | https://laws.e-gov.go.jp/law/362M50000010135 | 2026-05-15 | 告示定住の具体的な対象カテゴリー（日系2世・3世等）と在留期間. |
| g31-crossref | guardrail | guardrail-koshin-henkou-shinsa-kijun (G31) | internal | 2026-05-15 | G31: 在留資格変更・更新は大臣裁量; 素行・生計・活動実態が評価される. |
| g45-crossref | guardrail | guardrail-haigusha-rikon-go-zairyu-jitsumu-route (G45) | internal | 2026-05-15 | G45: 日本人配偶者との離婚後の実務ルート; 定住者は裁量的; DV事案は別ルート（G9）. |
| g25-crossref | guardrail | guardrail-kika-vs-eijuu-different-routes (G25) | internal | 2026-05-15 | G25: 帰化（法務局・国籍取得）vs 永住（ISA・在留資格変更）の根本的違い. 定住者は第3の選択肢（在留資格であり活動制限なし・期間有限）. |

## Official Rule Or Source Fact

**定住者（在留資格）の2種類:**

定住者には大きく2種類がある:

| 種類 | 定義 | 許可の予測可能性 |
|---|---|---|
| **告示定住** | 法務省告示で定められた特定のカテゴリーに該当する者 | 告示の要件を満たせば比較的予測可能 |
| **告示外定住** | 法務大臣が特別な事情を考慮して「定住者」として認める者（告示に該当しない）| 高度に裁量的; 個別事情による |

**告示定住の主なカテゴリー（代表例）:**

| カテゴリー | 対象 |
|---|---|
| 日系2世 | 日本国籍を有したことのある者の子（本人が外国籍）|
| 日系3世 | 日本国籍を有したことのある者の孫（本人が外国籍）|
| 日系2世・3世の配偶者 | 日系2世・3世の法律婚配偶者 |
| 難民認定者の関係者 | 条約難民として認定された者の家族等 |
| 外国人技能実習制度の修了者 | 一定の条件を満たした特定の修了者 |

**告示外定住（最も実務上問題になるケース）— 日本人配偶者との離婚後の元配偶者:**

日本人（または永住者）の元配偶者が，離婚後も日本在留を続けるために「告示外定住者」として認められることがある。ただし:
- **法律上の権利ではない** — 法務大臣の純粋な裁量による
- 許可に当たって考慮される主な要素（官式の明文規定はないが実務上):
  - 日本人（元配偶者）との間の**子の養育**（特に実子を日本で養育している）
  - 日本での**長期居住の実績**（在留年数）
  - **生計能力**（経済的自立）
  - **素行**の良好性
  - 元配偶者との婚姻・離婚の経緯（離婚原因等）
- 「定住者が与えられる可能性がある」と伝えることはできるが，許可を約束することはできない

**定住者と永住の比較:**

| 比較項目 | 定住者 | 永住者 |
|---|---|---|
| **在留期間** | 有限（5年・3年・1年・6か月）; 更新が必要 | 無期限（カードの更新は別途必要）|
| **就労活動** | 制限なし（業務範囲制限なし）| 制限なし |
| **国籍** | 外国籍のまま | 外国籍のまま |
| **取得方法** | ISAへの在留資格変更/認定申請 | ISAへの永住許可申請 |
| **申請要件の透明性** | 告示外定住は高度に裁量的 | ガイドライン（10年居住等）がある |
| **ステータスの安定性** | 在留期間を更新し続ける必要あり | 在留資格は永続（活動継続要件なし）|

**定住者の就労と活動（G48 cross-ref との比較）:**

定住者は在留資格の性格として「特定の活動に制限されない」ため，家族滞在とは異なり，資格外活動許可なしに就労できる。ただし，在留資格「定住者」の期間を超えて在留するには更新が必要。

**申請手続き:**

- 申請先: ISA（住所地管轄）
- 「日本人の配偶者等」から「定住者」への変更: 在留資格変更許可申請
- 告示外定住の申請では，上記の裁量的考慮要素を示す書類が必要（子の養育実績・在職証明・収入証明等）

## Safe Answer Behavior

- When asked if divorce = automatic 定住者: clearly state it is not automatic; it is discretionary for 告示外定住; highlight the factors considered.
- When asked about 定住者 vs 永住: explain the key difference — 定住者 has a fixed (renewable) period; 永住 is indefinite.
- When asked about 日系人: confirm the 告示定住 category exists; route to professional for specific eligibility.
- When asked about working on 定住者: confirm no activity restriction; clearly distinguish from 家族滞在 (which needs 資格外活動許可).
- Do NOT say that divorce = guaranteed 定住者; do NOT confirm that any specific situation will result in 告示外定住 being granted.

## Must Say

- 定住者には「告示定住」（法務省告示で要件が定められた特定カテゴリー；日系人等）と「告示外定住」（大臣裁量による個別許可）がある。日本人との離婚後の元配偶者への定住者付与は「告示外定住」であり，法律上の権利ではなく裁量的許可。
- 定住者は就労活動に制限がない（業務範囲制限なし）が，在留期間は有限（5年・3年・1年等）で更新が必要。永住者とは在留期間の性格が根本的に異なる。
- 告示外定住の審査では，子の養育実績・日本での長期居住実績・生計能力・素行等が総合的に考慮されるが，要件が明文化されておらず，許可の可否は個別事情次第。

## Must Not Say

- 「日本人と離婚したら定住者に変更できる。」（告示外定住は裁量的; 保証はない）
- 「定住者は永住と同じ。」（在留期間が有限; 性格が根本的に異なる）
- 「告示外定住の許可基準は明確に決まっている。」（明文化された要件はない）
- 「定住者は家族滞在と同じで就労に制限がある。」（定住者は就労制限なし）

## Deep Water Triggers

- 日本人の夫と離婚（夫責任の離婚）, 子2人（日本国籍）を引き取り，日本在住3年 — 告示外定住の可能性は？
- 日本人の妻との離婚で，子なし・日本在住2年 — 告示外定住はほぼ見込みがない？
- 日系3世で告示定住を取得後，更新を忘れて在留期間が超過 — どうすればよいか？
- 定住者を持つ外国人が，配偶者（外国人）を日本に呼ぶことはできるか？（家族滞在の扶養者になれるか？）
- 告示外定住の申請で不許可になった — 再申請・異議申立はできるか？

## User Next Actions

This is not user-facing copy. For answer routing:

- For divorced former spouses of Japanese nationals: route to G45 (実務ルート) for the post-divorce routing overview; explicitly state 定住者 is discretionary; route to professional for 告示外定住 application assessment.
- For 日系人: route to ISA teijusha.html for the 告示定住 category details; route to professional for application.
- For 定住者 vs 永住 comparison: route to G60 for the 永住申請 requirements; explain the trade-off (定住者 easier to get but renewable; 永住 permanent but harder to obtain).
- For 定住者 holders asking about work: confirm no activity restrictions; route to G31 for renewal requirements.

## Unknown Fields

- The ISA's unofficial internal criteria weights for 告示外定住 for divorced former spouses — specifically, what length of marriage and what child-related circumstances have historically been accepted.
- Whether 定住者 can serve as a 扶養者 (sponsor) for a non-Japanese spouse's 家族滞在 application.
- The practical processing time for 告示外定住 applications vs. 告示定住 applications.

## Needs Domain Flags

- needs_domain (P1): What are the historically accepted criteria patterns for 告示外定住 for divorced former spouses of Japanese nationals — specifically around child age, custody arrangement, Japan residence length, and income level?
- needs_domain (P1): Can a 定住者 holder sponsor a non-Japanese spouse for 家族滞在 (i.e., is 定住者 a recognized 扶養者 在留資格 for 家族滞在 applications)?

## QA Cases

| case_id | prompt pattern | expected guardrail |
|---|---|---|
| teijusha-001 | "日本人の夫と離婚しました。定住者ビザに変更できますか？" | State: 日本人配偶者との離婚後の定住者（告示外定住）への変更は，法律上の自動的な権利ではなく，法務大臣の裁量による許可。子の養育・日本での長期居住実績・生計能力・素行等が考慮される。行政書士に相談を。 |
| teijusha-002 | "定住者ビザと永住ビザはどう違いますか？" | State: 主な違いは在留期間。定住者は在留期間が有限（5年・3年・1年等）で更新が必要。永住者は在留資格が無期限（カードの更新は別途必要）。どちらも就労活動に制限なし。 |
| teijusha-003 | "日系3世ですが，定住者ビザを申請できますか？" | State: 日系3世は「告示定住」のカテゴリーに該当する可能性がある（法務省告示第135号等で定められた要件）。申請はISAへ。具体的な書類・要件は行政書士に確認を。 |

## Source Notes

- 定住者の概要・告示定住の種類: ISA teijusha.html（告示定住の対象カテゴリーの一覧; 告示外定住の存在確認）.
- 告示定住の具体的カテゴリー（日系人等）: 法務省令・告示（e-Gov法令検索）.
- 告示外定住（離婚後元配偶者）の裁量性: G45 cross-ref (実務ルート; 告示外定住は裁量的と明示); G31 cross-ref (大臣裁量の審査基準).
- 定住者の就労制限なし: 在留資格「定住者」の活動定義（特定の活動に限定されない在留資格）から構造的に導かれる.
- Cross-ref G31 (在留審査の裁量と素行評価), G45 (離婚後の実務ルート), G25 (帰化vs永住の比較), G60 (永住申請基本要件).

## Changelog

- 2026-05-15: Initial atlas_draft as Batch 014 G80. Key sources: ISA teijusha.html (定住者概要; 告示定住); 法務省令（告示定住カテゴリー）; G45 cross-ref (離婚後の実務ルート); G31 cross-ref (審査裁量). Core facts: 告示定住（要件告示明確）vs告示外定住（高度裁量）; 離婚後元配偶者=告示外定住（法的権利ではない）; 定住者は就労制限なし・在留期間有限; 永住との根本的違い（期間の有無）. Cross-ref G31, G45, G25, G60.
