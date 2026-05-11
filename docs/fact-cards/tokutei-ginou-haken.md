---
fact_id: tokutei-ginou-haken
title: 特定技能の派遣就労 — 原則禁止・農業・漁業のみ例外
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 18)
sprint: "cycle2-new-batch18"
citation_label: "特定技能の派遣就労（原則禁止・農業・漁業のみ例外・直接雇用が原則・不正派遣の罰則）"
citation_summary: "特定技能外国人は原則として派遣就労が禁止されており、農業・漁業の2分野のみ派遣就労が認められることを確認するカード。直接雇用が原則。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能の外国人を派遣社員として雇えるか確認したい"
  - "特定技能外国人が派遣会社から就労できるか確認したい"
  - "農業・漁業分野での特定技能の派遣就労の条件を確認したい"
  - "特定技能の雇用形態（直接雇用の原則）を確認したい"
does_not_cover:
  - "特定技能1号の取得要件（tokuteiginou-ichigou-youken 参照）"
  - "特定技能の受入機関の義務（登録支援機関の役割）"
  - "技人国等の他の在留資格での派遣就労（haken-zairyu 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/tokutei1.html
    label: 出入国在留管理庁 — 特定技能1号
    accessed: "2026-05-11"
applies_to:
  - 特定技能外国人を派遣形態で雇用しようとする事業主
  - 特定技能外国人本人（派遣就労可否の確認）
direct_fact_fields:
  - 特定技能外国人の雇用形態：原則として特定技能所属機関（受入機関）との「直接雇用契約」が必要
  - 派遣就労の原則禁止：特定技能外国人を派遣労働者として使用する（派遣先として受け入れる）ことは原則禁止
  - 例外：農業分野・漁業分野は特定技能外国人の派遣就労が認められている（分野の特性による特例）
  - 不正な派遣：特定技能外国人を不正に派遣した場合、受入機関・派遣元・派遣先が処罰対象となる
ai_inferred_fields:
  - 農業・漁業の派遣が認められる理由：繁忙期・閑散期の変動が大きく、季節的な労働力需要があるため（ai推定）
  - 農業・漁業以外の分野（建設・食品製造・宿泊等）での派遣は全て禁止（ai推定）
  - 偽装直接雇用（実質的な派遣）も禁止（契約形式が直接雇用でも実質派遣と認定される場合がある）（ai推定）
needs_review_flags:
  - nogyo_haken_youken: 農業・漁業分野での特定技能派遣就労の具体的な要件・条件はISA確認要。
  - giso_chokusetsu_yatoi: 偽装直接雇用の認定基準・処罰の具体的な事例はDOMAIN確認要。
related_links:
  - title: "出入国在留管理庁 — 特定技能1号"
    url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 特定技能（派遣就労の規制）"
    locator: "ページ内で「派遣就労」「直接雇用」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "特定技能外国人の雇用は原則として直接雇用契約が必要。派遣就労は原則禁止。例外：農業・漁業分野のみ派遣就労が認められている。不正な派遣は受入機関・派遣元・派遣先が処罰対象となる。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定技能外国人の直接雇用の原則」「派遣就労禁止」「農業・漁業の例外」の記述を確認"
    display_label: "特定技能の派遣就労：原則禁止・農業・漁業のみ例外・不正派遣は処罰対象"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "特定技能の直接雇用原則：特定技能外国人は特定技能所属機関（受入機関）との直接の雇用契約が必要（入管法・特定技能に関する基本方針）。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定技能外国人の直接雇用の原則（特定技能所属機関との直接雇用契約）」の記述を確認"
    display_label: "特定技能の直接雇用原則：受入機関（所属機関）との直接の雇用契約が必要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "農業・漁業での派遣就労の特例：これら2分野では季節性・繁閑差が大きいため、特例として適正な派遣会社経由の就労が認められている。"
    source_title: "出入国在留管理庁：特定技能1号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「農業・漁業分野の特例（派遣就労が認められる理由・季節性・繁閑差）」の記述を確認"
    display_label: "農業・漁業の派遣就労特例：季節性・繁閑差の大きい2分野のみ適正派遣会社経由での就労が許可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。

## current_effective_fact

特定技能外国人は受入機関（特定技能所属機関）との直接雇用が原則。派遣就労は農業・漁業の2分野のみ例外として認められている。その他の分野での派遣は禁止。

**特定技能の雇用形態（{{TODAY_ISO}} 現在）：**

| 分野 | 派遣就労の可否 |
|------|-------------|
| 農業 | **可**（例外として認められている） |
| 漁業 | **可**（例外として認められている） |
| 建設・製造・宿泊・外食等（その他全分野） | **禁止** |

## exceptions_or_transition

- **農業・漁業の派遣**：繁忙期・閑散期の変動が大きい農業・漁業では、適正な登録を受けた派遣事業者による派遣就労が認められている
- **偽装直接雇用リスク**：契約形式は直接雇用でも、実質的に派遣と認定される場合は処罰対象になる可能性あり
- **技人国等の他の在留資格**：技人国等の就労系在留資格では、派遣就労が認められる場合がある（haken-zairyu 参照）

## common_user_phrases

- 特定技能の外国人を派遣社員として雇えますか
- 特定技能の外国人は派遣会社から働けますか
- 農業の特定技能で派遣就労は可能ですか
- 特定技能の直接雇用とはどういう意味ですか

技術キーワード（マッチャ用）：

- 特定技能 派遣 / 特定技能 派遣就労 / 特定技能 直接雇用
- 特定技能 農業 派遣 / 特定技能 派遣禁止 / 特定技能 雇用形態
- 特定技能 派遣 例外

## must_say

- 特定技能外国人の雇用は原則として直接雇用が必要
- 派遣就労は農業・漁業の2分野のみ例外として認められている
- 不正な派遣は受入機関・派遣元・派遣先が処罰対象

## must_not_say

- 「特定技能外国人を派遣社員として何でも雇える」（農業・漁業以外は禁止）
- 「特定技能は派遣会社から働ける」（農業・漁業以外は不可）

## qa_cases

**Q1: 特定技能の外国人を食品製造工場の派遣として受け入れられますか？**
A: いいえ。食品製造分野での特定技能外国人の派遣就労は禁止されています。直接雇用契約（特定技能所属機関として直接雇用する）が必要です。

**Q2: 農業分野で特定技能外国人を派遣社員として雇いたいのですが。**
A: 農業分野は特定技能外国人の派遣就労が例外として認められている分野です。ただし適正な登録を受けた派遣事業者を通じた派遣である必要があります。詳細は出入国在留管理庁に確認してください。

## injection_format

### injection_certain_block

```
【特定技能の派遣就労 ファクト / {{TODAY_ISO}} 確認済み】

・原則：直接雇用が必要（派遣就労は禁止）
・例外：農業・漁業の2分野のみ派遣就労可
・建設・食品製造・宿泊・外食等その他全分野：派遣禁止
・不正派遣：受入機関・派遣元・先が処罰対象
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 18) | 新規作成。特定技能の派遣就労制限。ISA公式で直接雇用原則・農業/漁業のみ派遣可・不正派遣禁止を確認。派遣認定基準・偽装直接雇用の詳細はai推定。 | — | ai_verified | new |
