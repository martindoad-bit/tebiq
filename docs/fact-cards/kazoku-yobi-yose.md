---
fact_id: kazoku-yobi-yose
title: 家族呼び寄せ — 在日外国人が配偶者・子を日本に招聘するCOEの流れ
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 14)
sprint: "cycle2-new-batch14"
citation_label: "家族呼び寄せ（配偶者・子のCOE申請・家族滞在・定住者・日本人配偶者等・在留資格別）"
citation_summary: "日本在留中の外国人が海外にいる配偶者・子を日本に呼び寄せるための在留資格認定証明書（COE）申請の流れと、家族が取得する在留資格（家族滞在・定住者・日本人配偶者等）の選択を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本在住の外国人が海外にいる配偶者・子を日本に呼び寄せたい"
  - "家族を日本に招聘するCOEの申請方法・処理期間を確認したい"
  - "家族が取得すべき在留資格（家族滞在・定住者等）を確認したい"
does_not_cover:
  - "在留資格認定証明書（COE）の一般的な申請手続き（zairyu-nintei-shomeisho 参照）"
  - "家族滞在の詳細要件（kazoku-taizai-yoken 参照）"
  - "永住者の配偶者等の在留資格（eijuu-haigusha-visa 参照）"
  - "日本人配偶者等の在留資格（nihonjin-haigusha-visa 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: 出入国在留管理庁 — 家族滞在（在留資格）
    accessed: "2026-05-11"
applies_to:
  - 就労ビザ等で日本在留中の外国人で、海外にいる家族を呼び寄せたい者
  - 招聘する家族の在留資格選択・COE申請手続きを確認したい外国人
direct_fact_fields:
  - 家族滞在の主な対象：就労系・留学等の在留資格を持つ者の「扶養を受ける配偶者または子」
  - 家族滞在で就労するには資格外活動許可が必要（包括許可の場合は週28時間以内）
  - COE申請先：家族が日本在留中の場合は居住地管轄の地方出入国在留管理官署（窓口またはオンライン）
  - 標準処理期間：1〜3か月（zairyu-nintei-shomeisho 参照）
  - COE取得後：家族が在外公館で査証申請 → 日本入国
ai_inferred_fields:
  - 取得すべき在留資格は「扶養者（日本在留中の外国人）」の在留資格によって異なる（ai推定）：技人国・留学等の就労/非就労ビザ → 「家族滞在」；永住者 → 「永住者の配偶者等」；日本人 → 「日本人の配偶者等」
  - 特定技能1号の扶養者は家族滞在で呼び寄せ不可（tokuteiginou-ichigou-youken 参照）（ai推定）
  - 招聘できる「子」は、扶養される未成年の子が基本（成年子は別の在留資格が必要な場合あり）（ai推定）
needs_review_flags:
  - kazoku_zairyu_shikaku_selection: 扶養者の在留資格別に家族が取得すべき在留資格の詳細マトリクスは DOMAIN確認要。
  - codomo_nenrei_seigenchi: 「子」として家族滞在で呼び寄せできる年齢・成年/未成年の境界の詳細はISA確認要。
related_links:
  - title: "出入国在留管理庁 — 家族滞在（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 家族滞在（在留資格）"
    locator: "ページ内で「家族滞在（在留資格）」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在の主な対象：就労系・留学等の在留資格を持つ外国人の「扶養を受ける配偶者または子」。就労には資格外活動許可が必要（週28時間以内）。COE申請先：居住地管轄の地方出入国在留管理官署（窓口またはオンライン）。標準処理期間：1〜3か月。取得後は在外公館で査証申請 → 日本入国。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「家族滞在の対象（扶養される配偶者・子）」「就労は資格外活動許可必要」「COE申請（入管窓口/オンライン）」の記述を確認"
    display_label: "家族呼び寄せ：家族滞在は扶養される配偶者・子が対象・就労は資格外許可要・COE取得後に在外公館で査証申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "呼び寄せる家族が取得する在留資格は扶養者の在留資格によって異なる：扶養者が技人国・留学等（就労系・非就労系）→家族滞在；扶養者が永住者→永住者の配偶者等；扶養者が日本人の外国人配偶者→日本人の配偶者等。特定技能1号は家族帯同原則不可。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「家族滞在の対象（就労系・留学等の扶養を受ける配偶者・子）」「在留資格の種類による違い」の記述を確認"
    display_label: "家族呼び寄せ：扶養者の在留資格で異なる（技人国→家族滞在・永住者→永住者配偶者等）"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
  - claim: "COE申請後の流れ：在日の扶養者がCOEを地方出入国在留管理官署に申請（窓口またはオンライン）→ 処理期間1〜3か月でCOE取得 → 海外の家族にCOEを送付（電子メール転送も可能） → 家族が在外公館（日本大使館等）でビザ申請 → 来日・在留カード取得。"
    source_title: "出入国在留管理庁：家族滞在（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「COEの申請（窓口/オンライン）」「処理期間1〜3か月」「在外公館での査証申請」「COEの電子化・電子メール転送」の記述を確認"
    display_label: "COE申請の流れ：申請（1〜3か月）→メール転送可→在外公館でビザ申請→来日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。

## current_effective_fact

日本在留中の外国人が海外にいる配偶者・子を呼び寄せる場合、家族の在留資格（主に「家族滞在」）に対する在留資格認定証明書（COE）を日本で申請し、取得後に家族が在外公館でビザを申請して来日するのが正規の流れ。

**呼び寄せ先の在留資格の選択（扶養者の在留資格による）：**

| 日本在留の外国人の在留資格 | 呼び寄せる家族の在留資格 |
|--------------------------|------------------------|
| 技人国・研究・教育等（就労系） | **家族滞在** |
| 留学 | **家族滞在** |
| 永住者 | **永住者の配偶者等** |
| 定住者 | **定住者** または **家族滞在** |
| 日本人（配偶者が外国人） | **日本人の配偶者等** |
| 特定技能1号 | **家族帯同不可**（原則） |

**家族呼び寄せの流れ：**
1. 日本在留の扶養者がCOEを入管に申請（窓口またはオンライン）
2. COE取得（処理期間1〜3か月）
3. COEを海外の家族に送付（電子メール転送も可）
4. 家族が在外公館（日本大使館等）でビザ申請
5. 家族が来日・在留カード取得

## exceptions_or_transition

- **特定技能1号は家族帯同原則不可**：特定技能1号保持者は配偶者・子を家族滞在で呼び寄せられない（特定技能2号は可能）（tokuteiginou-ichigou-youken 参照）
- **永住者・日本人と結婚した場合**：より強い在留資格（「永住者の配偶者等」「日本人の配偶者等」）が適用される

## common_user_phrases

- 配偶者を日本に呼びたい、どうすればいいですか
- 子供を日本に呼ぶにはどうしたらいいですか
- 家族を呼ぶためのビザの申請はどこでしますか
- COEを取れば家族が日本に来られますか
- 技人国ビザで家族を日本に呼べますか

技術キーワード（マッチャ用）：

- 家族呼び寄せ / 配偶者 呼び寄せ / 子供 呼び寄せ
- 家族滞在 申請 / 家族滞在 COE / 家族 日本 招聘
- 技人国 家族 連れてくる / 在留資格認定証明書 家族

## must_say

- 家族が取得する在留資格は扶養者（日本在留の外国人）の在留資格によって異なる
- 特定技能1号保持者は原則として家族帯同不可
- COE取得後に家族が在外公館でビザを申請して来日

## must_not_say

- 「どんな在留資格でも家族を呼べる」（特定技能1号等の例外がある）
- 「家族が日本に来てからCOEを申請できる」（海外から来日前にCOEが必要）

## qa_cases

**Q1: 技人国ビザで在留中です。配偶者を日本に呼びたいのですが。**
A: 「家族滞在」の在留資格認定証明書（COE）を日本で申請します。申請先は居住地管轄の地方出入国在留管理官署（窓口またはオンライン）です。処理期間は1〜3か月です。COE取得後、配偶者が在外公館でビザを申請して来日できます。

**Q2: 特定技能1号です。配偶者を日本に呼べますか？**
A: 特定技能1号の保持者は原則として配偶者・子を「家族滞在」で呼び寄せることができません。特定技能2号への移行後は家族帯同が可能になります。

## injection_format

### injection_certain_block

```
【家族呼び寄せ ファクト / {{TODAY_ISO}} 確認済み】

家族が取得する在留資格（扶養者の在留資格による）：
・技人国・留学等 → 家族滞在
・永住者 → 永住者の配偶者等
・日本人（外国人配偶者） → 日本人の配偶者等
・特定技能1号 → 家族帯同原則不可

流れ：COE申請（入管）→ COE取得（1〜3か月）→ 在外公館でビザ申請 → 来日
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 14) | 新規作成。家族呼び寄せ（COE申請・在留資格選択）。ISA公式（dependent.html）で家族滞在の対象・就労資格外許可・COE申請を確認。在留資格別マトリクス・子の年齢制限はai推定。 | — | ai_verified | new |
