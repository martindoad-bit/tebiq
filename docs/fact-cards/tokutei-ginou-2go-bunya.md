---
fact_id: tokutei-ginou-2go-bunya
title: 特定技能2号 — 2023年拡大後の対象分野と在留更新
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 16)
sprint: "cycle2-new-batch16"
citation_label: "特定技能2号（2023年9月拡大・対象11分野・在留更新上限なし）"
citation_summary: "2023年9月の政府決定で特定技能2号の対象分野が2分野から11分野に拡大されたことと、在留更新に通算上限がない点を確認するカード。家族帯同や永住申請との関係は別途要件確認が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能2号の対象分野を確認したい"
  - "特定技能1号から2号への移行要件を確認したい"
  - "特定技能2号で家族を日本に呼び寄せられるか確認したい"
  - "特定技能2号から永住申請ができるか確認したい"
does_not_cover:
  - "特定技能1号の各分野別試験（tokutei-ginou-siken 参照）"
  - "特定技能1号の家族帯同不可（kazoku-yobi-yose 参照）"
  - "永住申請の要件詳細（eijuu-shinsei-shorui 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/tokutei2.html
    label: 出入国在留管理庁 — 特定技能2号
    accessed: "2026-05-11"
applies_to:
  - 特定技能1号保持者で2号移行を検討している外国人
  - 特定技能2号の家族帯同・長期在留を目指している外国人
direct_fact_fields:
  - 特定技能2号の対象分野（2023年9月拡大後）：建設・造船・舶用工業・自動車整備・航空・宿泊・農業・漁業・飲食料品製造・外食業・ビルクリーニング（計11分野）
  - 在留期間：3年・1年・6か月の更新が可能で、更新回数に上限なし（長期在留可能）
ai_inferred_fields:
  - 特定技能2号の家族帯同可否・手続き要件は別途確認が必要（ai推定）
  - 特定技能2号から永住申請を検討する場合は、通常の永住要件・在留履歴・公的義務等を別途確認する必要がある（ai推定）
  - 特定技能1号から2号への移行：各分野の試験に合格または同一分野での実務経験・技能検定等の要件が必要（ai推定）
  - 特定技能2号の試験：各分野の所管省庁が定める試験（建設：建設技能試験2号等）に合格が必要（ai推定）
  - 2023年の拡大前は建設・造船の2分野のみが特定技能2号の対象だった（ai推定）
needs_review_flags:
  - 2go_iko_yoken_detail: 特定技能1号から2号への移行に必要な分野別試験・実務経験要件の詳細はISA確認要。
  - 2go_kazoku_taizai_youtai: 特定技能2号の家族帯同（家族滞在）の手続き・要件の詳細はkazoku-yobi-yoseと合わせて確認要。
  - 2go_eijuu_path_scope: 特定技能2号と永住申請要件の関係は、通常の永住要件・在留履歴・公的義務を含めてDOMAIN確認要。
related_links:
  - title: "出入国在留管理庁 — 特定技能2号"
    url: "https://www.moj.go.jp/isa/applications/status/tokutei2.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 特定技能2号"
    locator: "ページ内で「特定技能2号」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "特定技能2号（2023年9月拡大後）：対象11分野（建設・造船・舶用工業・自動車整備・航空・宿泊・農業・漁業・飲食料品製造・外食業・ビルクリーニング）。在留更新に通算上限はない。家族帯同や永住申請との関係は別途要件確認が必要。"
    source_title: "出入国在留管理庁：特定技能2号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定技能2号の対象分野（2023年拡大後11分野）」「在留期間・更新上限」の記述を確認。家族帯同・永住申請との関係は別途要件確認"
    display_label: "特定技能2号：2023年9月に11分野に拡大・更新上限なし"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "特定技能2号の対象分野（2023年9月11分野に拡大）：建設・造船・舶用工業・自動車整備・航空・宿泊・農業・漁業・飲食料品製造・外食業・ビルクリーニング。介護は対象外。"
    source_title: "出入国在留管理庁：特定技能2号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定技能2号の対象分野（2023年9月拡大後11分野）」「介護は対象外」の記述を確認"
    display_label: "特定技能2号の対象11分野（2023年9月拡大）：建設・造船・農業・漁業等・介護は対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "特定技能1号と2号の主な違い：在留更新上限（1号：通算5年、2号：上限なし）と対象分野。家族帯同や永住申請との関係は、特定技能2号取得だけで自動的に決まるものではなく、別途要件確認が必要。"
    source_title: "出入国在留管理庁：特定技能2号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「特定技能1号と2号の比較（在留上限・対象分野）」の記述を確認。家族帯同・永住申請は別途要件確認"
    display_label: "1号vs2号：在留上限（1号5年・2号なし）・対象分野"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。特定技能2号の対象分野は2023年9月に大幅拡大された。

## current_effective_fact

特定技能2号は、2023年9月の政府決定で対象分野が2分野から11分野に拡大された。特定技能1号と異なり、在留更新に通算上限がない。家族帯同や永住申請との関係は、2号取得だけで自動的に決まるものではなく、別途要件確認が必要。

**特定技能2号の対象分野（{{TODAY_ISO}} 現在・11分野）：**

| 分野 | 2号移行 |
|------|---------|
| 建設 | ✅ |
| 造船・舶用工業 | ✅ |
| 自動車整備 | ✅ |
| 航空 | ✅ |
| 宿泊 | ✅ |
| 農業 | ✅ |
| 漁業 | ✅ |
| 飲食料品製造業 | ✅ |
| 外食業 | ✅ |
| ビルクリーニング | ✅ |
| 素形材・産業機械・電気電子情報関連製造業 | ✅ |

**特定技能1号 vs 2号：**

| 比較項目 | 特定技能1号 | 特定技能2号 |
|---------|-----------|-----------|
| 在留期間上限 | 通算5年 | **なし**（更新無制限） |
| 家族帯同 | 原則不可とされることが多い | **別途要件確認** |
| 永住申請 | 通常要件を別途確認 | 通常要件を別途確認 |

## exceptions_or_transition

- **介護分野は2号なし**：介護は特定技能2号の対象外（介護福祉士資格取得ルートで永住を目指す）
- **1号→2号の移行**：分野ごとに定められた試験・実務経験等の要件を満たす必要あり（ai推定）
- **2023年以前**：建設・造船の2分野のみが特定技能2号の対象だった

## common_user_phrases

- 特定技能2号になれる分野を教えてください
- 特定技能1号から2号に移行できますか
- 特定技能2号になれば家族を日本に呼べますか
- 特定技能2号は永住申請できますか
- 特定技能2号の在留期間は何年ですか

技術キーワード（マッチャ用）：

- 特定技能2号 / 特定技能 2号 分野 / 特定技能2号 家族
- 特定技能2号 永住 / 特定技能2号 2023年 拡大 / 特定技能1号 2号 違い
- 特定技能2号 在留期間 / 特定技能2号 対象 / 特定技能2号 移行

## must_say

- 2023年9月に特定技能2号の対象分野が11分野に拡大
- 在留更新に通算上限なし
- 家族帯同や永住申請は、2号取得だけで自動的に進むものではなく、別途要件確認が必要

## must_not_say

- 「特定技能2号は建設・造船だけ」（2023年に11分野に拡大済み）
- 「特定技能2号なら家族帯同や永住申請が自動的に進む」（別途要件確認が必要）

## qa_cases

**Q1: 特定技能2号の対象分野はどこですか？**
A: 2023年9月に大幅拡大され、現在は建設・造船・舶用工業・自動車整備・航空・宿泊・農業・漁業・飲食料品製造・外食業・ビルクリーニングの11分野が対象です（介護は対象外）。

**Q2: 特定技能1号です。2号に移行すれば家族を呼べますか？**
A: 特定技能2号では家族帯同を検討できる場合がありますが、2号取得だけで自動的に呼び寄せが進むわけではありません。家族の在留資格、扶養状況、必要書類などを別途確認してください。2号への移行自体にも各分野の試験等の要件があります。

## injection_format

### injection_certain_block

```
【特定技能2号 ファクト / {{TODAY_ISO}} 確認済み】

・対象分野：11分野（2023年9月拡大）※介護は対象外
・在留更新：上限なし（1号は通算5年上限）
・家族帯同・永住申請：2号取得だけで自動的に進むものではなく、別途要件確認が必要
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 16) | 新規作成。特定技能2号（2023年拡大後）。ISA公式で対象11分野・在留更新上限なしを確認。1号→2号移行要件はai推定。 | — | ai_verified | new |
| 2026-05-12 | Codex | 家族帯同・永住申請を直接確認済み事実として扱う表現を除去し、別途要件確認に統一。 | ai_verified | ai_verified | evidence-boundary |
